"""Empirical calibration of k, the uncertainty parameter of the step-3 seat
simulation (web/src/engine/seats.ts, simular: multiplicative log-normal error
with sigma = k / sqrt(max(share, 0.005)), renormalisation, 3 % + D'Hondt).

Run from anywhere (after pipeline/calibracion_fetch.py):
    python3 -I -B pipeline/calibracion.py            # full run (~10 min, stdlib only)
    python3 -I -B pipeline/calibracion.py --quick    # fewer simulations

Inputs (all hashed in data/sources/historico/manifest.json):
  * Congress results by circunscripción 2015, Apr-2019, Nov-2019: Ministerio
    del Interior xlsx (PROV_02_*), via byte-identical Internet Archive copies.
  * Congress results 2016: Junta Electoral Central, BOE-A-2016-7133 (PDF,
    Cuadros I-III, parsed with pdftotext -layout; every province must add up
    exactly to Cuadro I "votos a candidaturas" and to its seat count).
  * Congress results 2023: data/resultados/generales_2023.json (results_build.py).
  * Final polls: Wikipedia wikitext, pinned revisions (documented secondary source).

Outputs: data/build/calibracion.json (all numbers in the report) and
data/build/calibracion.txt (human-readable tables). The report is
docs/research/calibracion_incertidumbre.md.

Shares are always over valid votes (candidaturas + blancos), as in the app.
"""
import bisect
import json
import math
import os
import random
import re
import subprocess
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import results_boe as boe  # noqa: E402
from results_xlsx import read_xlsx_from_zip  # noqa: E402

ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "data", "sources", "historico")
OUT = os.path.join(ROOT, "data", "build")

ELECCIONES = ["2015", "2016", "2019a", "2019n", "2023"]
FECHAS = {"2015": (2015, 12, 20), "2016": (2016, 6, 26), "2019a": (2019, 4, 28), "2019n": (2019, 11, 10),
          "2023": (2023, 7, 23)}
PARES = [("2015", "2016"), ("2016", "2019a"), ("2019a", "2019n"), ("2019n", "2023")]
SUELO = 0.005  # same floor as seats.ts


AVISOS = []


class DataError(Exception):
    pass


def check(cond, msg):
    if not cond:
        raise DataError(msg)


def norm(s):
    s = unicodedata.normalize("NFKD", (s or "").strip())
    s = "".join(ch for ch in s if not unicodedata.combining(ch)).upper()
    return re.sub(r"[^A-Z0-9+]", "", s)


# =========================================================================== results

def load_ministry(yyyymm):
    """Ministry PROV_02 xlsx -> {code: {nombre, escanos, validos, blancos, listas: [{label, siglas, votos, escanos}]}}"""
    member, sheets = read_xlsx_from_zip(os.path.join(SRC, "infoelectoral", "PROV_02_%s_1.zip" % yyyymm))
    rows = list(sheets.values())[0]
    check(str(rows[2][0]).startswith("Congreso |"), "unexpected title in %s" % member)
    den, sig, lab = rows[3], rows[4], [boe.clean(x) if isinstance(x, str) else x for x in rows[5]]
    need = {"codigo": "Código de Provincia", "nombre": "Nombre de Provincia", "validos": "Votos válidos",
            "cand": "Votos a candidaturas", "blancos": "Votos en blanco"}
    idx = {k: lab.index(v) for k, v in need.items()}
    first = lab.index("Votos")
    cols = []
    last = len(lab)
    while lab[last - 1] is None:  # trailing empty columns (2015 file)
        last -= 1
    for c in range(first, last, 2):
        check(lab[c] == "Votos" and lab[c + 1] == "Diputados", "bad columns at %d in %s" % (c, member))
        cols.append((c, boe.clean(den[c]), boe.clean(sig[c])))
    out = {}
    for r in rows[6:]:
        if not r or not isinstance(r[idx["codigo"]] if len(r) > idx["codigo"] else None, int):
            continue
        r = r + [None] * (len(lab) - len(r))
        code = "%02d" % r[idx["codigo"]]
        listas = [{"label": d, "siglas": s, "votos": r[c] or 0, "escanos": r[c + 1] or 0}
                  for c, d, s in cols if (r[c] or 0) > 0]
        rec = {"nombre": boe.clean(r[idx["nombre"]]), "validos": r[idx["validos"]], "blancos": r[idx["blancos"]],
               "escanos": sum(x["escanos"] for x in listas), "listas": listas}
        resto = r[idx["cand"]] - sum(x["votos"] for x in listas)
        # The 2015 file under-counts minor lists by <0.2 % in 5 provinces (columns missing in
        # the Ministry file itself); the residual is kept as an unlabelled, seatless list.
        check(resto == 0 or (yyyymm == "201512" and 0 < resto < 0.002 * r[idx["validos"]]),
              "%s prov %s: list votes != candidaturas (%d)" % (member, code, resto))
        if resto:
            listas.append({"label": "(sin desglosar en el fichero)", "siglas": "?", "votos": resto, "escanos": 0})
            AVISOS.append("%s prov %s: %d votos a candidaturas sin desglose por lista en el fichero del Ministerio"
                          % (member, code, resto))
        check(rec["validos"] == r[idx["cand"]] + rec["blancos"], "%s prov %s: validos" % (member, code))
        out[code] = rec
    check(len(out) == 52 and sum(p["escanos"] for p in out.values()) == 350, "%s: 52 provs / 350 seats" % member)
    return out


PDF_TOKEN = re.compile(r"\S+")
ROW_RE = re.compile(r"^\s*(\S.*?\S|\S)\s{2,}((?:[\d.]+\s+)*[\d.]+)\s*$")


def _pdf_page(pdf, p):
    return subprocess.run(["pdftotext", "-layout", "-f", str(p), "-l", str(p), pdf, "-"], check=True,
                          capture_output=True).stdout.decode("utf-8")


def _num(t):
    return None if t == "." else boe.parse_int(t)


def load_boe_2016(ref_names):
    """BOE-A-2016-7133 (PDF). Cuadro I (p.2), Cuadro II (pp.3-6: votos+escaños), Cuadro III (pp.7-14: votos).
    Formation label = header words that sit above the formation's columns."""
    pdf = os.path.join(SRC, "boe", "BOE-A-2016-7133.pdf")
    c1 = {boe.norm_name(k): v for k, v in boe.cuadro1_from_pdf(pdf, 2).items()}
    forms = []  # {label, votos:{prov}, escanos:{prov}}
    total_esc = {}
    for page in range(3, 15):
        lines = _pdf_page(pdf, page).splitlines()
        kind = "II" if page <= 6 else "III"
        hdr_end = next(i for i, l in enumerate(lines) if re.match(r"^\s*(Votos\s+Escaños|Votos)\b", l))
        hdr_start = next(i for i, l in enumerate(lines) if "CUADRO" in l)
        while hdr_start < hdr_end and not re.search(r"Relación de votos|Continuación", lines[hdr_start]):
            hdr_start += 1
        data = []
        for l in lines[hdr_end + 1:]:
            m = ROW_RE.match(l)
            if not m or "cve:" in l or "Verificable" in l:
                continue
            name = boe.clean(m.group(1))
            toks = [(t.start(), t.group(0)) for t in PDF_TOKEN.finditer(l) if t.start() >= m.start(2)]
            data.append((name, toks))
        check(len(data) == 53, "2016 p.%d: %d data rows" % (page, len(data)))
        ntok = {len(t) for _, t in data}
        check(len(ntok) == 1, "2016 p.%d: ragged rows %r" % (page, ntok))
        ntok = ntok.pop()
        per = 2 if kind == "II" else 1
        off = 1 if kind == "II" else 0
        check((ntok - off) % per == 0, "2016 p.%d: token count" % page)
        nf = (ntok - off) // per
        # column x-spans from the data rows (right-aligned numbers: use end positions)
        ends = [[pos + len(t) for pos, t in toks] for _, toks in data]
        colend = [max(e[i] for e in ends) for i in range(ntok)]
        spans = []
        for j in range(nf):
            a = colend[off + j * per - 1] + 1 if off + j * per > 0 else 0
            b = colend[off + j * per + per - 1]
            spans.append((a, b + 2))
        words = []
        for l in lines[hdr_start + 1:hdr_end + 1]:
            for t in PDF_TOKEN.finditer(l):
                words.append((t.start() + len(t.group(0)) / 2.0, t.group(0)))
        for j, (a, b) in enumerate(spans):
            label = " ".join(w for c, w in words if a <= c < b and w not in ("Votos", "Escaños", "Total", "escaños"))
            f = {"label": label, "votos": {}, "escanos": {}}
            for name, toks in data:
                v = _num(toks[off + j * per][1])
                if v is not None:
                    f["votos"][name] = v
                if kind == "II":
                    e = _num(toks[off + j * per + 1][1])
                    if e is not None:
                        f["escanos"][name] = e
            if f["votos"]:
                forms.append(f)
        if kind == "II":
            for name, toks in data:
                te = _num(toks[0][1])
                check(total_esc.get(name, te) == te, "2016 total escaños mismatch %s" % name)
                total_esc[name] = te
    out = {}
    names = {boe.norm_name(n): n for n in total_esc}
    for code, mname in ref_names.items():
        k = boe.norm_name(mname)
        k = {"santa cruz de tenerife": "c tenerife/s"}.get(k, k)
        check(k in names and k in c1, "2016: province %r not found" % mname)
        raw = names[k]
        listas = [{"label": f["label"], "siglas": f["label"], "votos": f["votos"][raw], "escanos": f["escanos"].get(raw, 0)}
                  for f in forms if f["votos"].get(raw)]
        q = c1[k]
        check(sum(x["votos"] for x in listas) == q["votos a candidaturas"],
              "2016 %s: formations %d != Cuadro I %d" % (mname, sum(x["votos"] for x in listas), q["votos a candidaturas"]))
        check(sum(x["escanos"] for x in listas) == total_esc[raw], "2016 %s: seats" % mname)
        out[code] = {"nombre": mname, "validos": q["votos válidos"], "blancos": q["votos en blanco"],
                     "escanos": total_esc[raw], "listas": listas}
    tot = [n for n in total_esc if boe.norm_name(n) == "total estatal"][0]
    check(sum(p["escanos"] for p in out.values()) == 350 == total_esc[tot], "2016: 350 seats")
    for f in forms:  # national row must equal the sum of provinces
        check(f["votos"].get(tot) == sum(v for n, v in f["votos"].items() if n != tot), "2016 national row %r" % f["label"])
    return out


def load_2023():
    d = json.load(open(os.path.join(ROOT, "data", "resultados", "generales_2023.json"), encoding="utf-8"))
    out = {}
    for code, c in d["circunscripciones"].items():
        out[code] = {"nombre": c["nombre"], "validos": c["validos"], "blancos": c["blancos"], "escanos": c["escanos"],
                     "listas": [{"label": x["denominacion"], "siglas": x["siglas"], "votos": x["votos"],
                                 "escanos": x["escanos"], "agrupacion": x["agrupacion"]["siglas"]}
                                for x in c["candidaturas"] if x["votos"] > 0]}
    return out


def boe_national_check(res, key, pdf, page):
    """Cross-check of national validos/blancos of a Ministry file against BOE Cuadro I."""
    c1 = {boe.norm_name(k): v for k, v in boe.cuadro1_from_pdf(os.path.join(SRC, "boe", pdf), page).items()}
    t = c1.get("total estatal")
    check(t is not None, "%s: no Total estatal in Cuadro I p.%d" % (pdf, page))
    v = sum(p["validos"] for p in res.values())
    b = sum(p["blancos"] for p in res.values())
    return {"eleccion": key, "boe": pdf, "validos_ministerio": v, "validos_boe": t["votos válidos"],
            "blancos_ministerio": b, "blancos_boe": t["votos en blanco"], "coincide": v == t["votos válidos"] and b == t["votos en blanco"]}


def load_all():
    r = {"2015": load_ministry("201512"), "2019a": load_ministry("201904"), "2019n": load_ministry("201911")}
    r["2023"] = load_2023()
    r["2016"] = load_boe_2016({c: p["nombre"] for c, p in r["2023"].items()})
    return r


# =========================================================================== party families
# A "family" is a list label that is comparable across elections (same party or same
# coalition under a rebrand). Rules are matched in order against "SIGLAS|DENOMINACION"
# (normalised). Anything unmatched becomes its own family keyed by its siglas, so minor
# parties with an identical label (PACMA, RECORTES CERO...) are matched automatically.

FAMILY_RULES = [
    ("UPN-PP", r"UNIONDELPUEBLONAVARROENCOALIC"),               # 2016 BOE
    ("PP", r"PPFORO|PPPAR|^PP\||PARTIDOPOPULARPP$|^PARTIDOPOPULAR"),
    ("PSOE", r"^PSOE|^PSC|PSCPSOE|PSOENCA|PARTIDOSOCIALISTAUNIDOSOBREROESPANOLPSOE|SOCIALISTAOBREROESPANOLNUEVACA"),
    ("CS", r"^CS\||^CS$|CIUDADANOSPARTIDODELACIUDADANIA"),
    ("VOX", r"^VOX"),
    ("UP+COMPROMIS", r"ALAVALENCIANA"),                          # 2016 Valencia (Compromís inside)
    ("PODEMOS15", r"^PODEMOS\||^ENCOMU\||^PODEMOSCOM|^PODEMOSEN\|"),  # 2015 Podemos + confluences
    ("IU", r"^IUUPEC"),
    ("UP", r"PODEMOSIUEQUO|ENCOMUPODEMGUANYEM|ECPGUANYEM|ENMAREAPODEMOSENMAREA|PODEMOSEUMAREAS|^PODEMOSIU\||^PODEMOSEU\|"),
    ("SUMAR", r"^SUMAR"),
    ("MASPAIS", r"^MASPAIS|^MPAISCHA"),
    ("MES-COMPROMIS", r"^MESCOMPROMIS"),
    ("COMPROMIS", r"^COMPROMIS2019"),
    ("ERC", r"^ERC|ESQUERRAREPUBLICANACATALUNYASIERC"),
    ("JUNTS", r"^DL\||CONVERGENCIADEMOCRATICADECATALUNYACDC|^JXCAT|^JUNTS"),
    ("PNV", r"EAJPNV"),
    ("BILDU", r"EHBILDU"),
    ("CC-NC", r"^CCAPNCNC"),
    ("CC", r"^CCAPNC\||^CCA\||CANARIACCA$"),
    ("NC", r"^NCA\||^NCBC"),
    ("BNG", r"^NOS\||BNGNOS|^BNG"),
    ("NA+", r"^NA\+"),
    ("UPN", r"^UPN\|"),
    ("PRC", r"^PRC"),
    ("CUP", r"^CUPPR"),
    ("EXISTE", r"TERUELEXISTE|^EXISTE\|"),
    ("PACMA", r"PACMA"),
    ("UPYD", r"UPYD"),
    ("RECORTESCERO", r"RECORTESCERO"),
    ("GBAI", r"GBAI"),
]
FAMILY_RE = [(f, re.compile(p)) for f, p in FAMILY_RULES]


def family(year, code, lista):
    key = norm(lista["siglas"]) + "|" + norm(lista["label"])
    if year == "2016":
        key = norm(lista["label"]) + "|" + norm(lista["label"])
        key = key.split("|")[0]
        # 2016 labels come from PDF headers: match on the full text
        for f, rx in FAMILY_RE:
            if rx.search(key) or rx.search(key + "|"):
                break
        else:
            f = None
        if f is None:
            for f2, pat in (("PP", r"PARTIDOPOPULARPP$"), ("PSOE", r"PSOE$")):
                if re.search(pat, key):
                    f = f2
        fam = f or "x:" + key[-20:]
    else:
        for f, rx in FAMILY_RE:
            if rx.search(key):
                fam = f
                break
        else:
            fam = "x:" + norm(lista["siglas"])
    if fam == "PP" and code == "31" and year in ("2015", "2016"):
        fam = "UPN-PP"  # Navarra: UPN-PP coalition (Ministry 2015 files it under PP)
    return fam


def by_family(res, year):
    """{code: {"validos", "blancos", "escanos", "fam": {family: votes}, "seats": {family: seats}}}"""
    out = {}
    for code, p in res.items():
        fam, seats = {}, {}
        for x in p["listas"]:
            f = family(year, code, x)
            fam[f] = fam.get(f, 0) + x["votos"]
            seats[f] = seats.get(f, 0) + x["escanos"]
        out[code] = {"validos": p["validos"], "blancos": p["blancos"], "escanos": p["escanos"], "fam": fam, "seats": seats}
    return out


def national(fr):
    V = sum(p["validos"] for p in fr.values())
    tot = {}
    for p in fr.values():
        for f, v in p["fam"].items():
            tot[f] = tot.get(f, 0) + v
    return {f: v / V for f, v in tot.items()}


# Non-trivial correspondences between consecutive elections (coalitions that merge, split or
# change partners). They are NOT used in the strict ("same label") fit; they are used in the
# bloc sensitivity analysis and wherever the poll columns force them (poll scenarios).
BLOC_UNITS = {
    ("2015", "2016"): [("UP", {"PODEMOS15", "IU"}, {"UP", "UP+COMPROMIS"})],
    ("2016", "2019a"): [("UP+COMPROMIS", {"UP+COMPROMIS"}, {"UP", "COMPROMIS"}), ("NA+", {"UPN-PP"}, {"NA+"})],
    ("2019a", "2019n"): [("CC-NC", {"CC", "NC"}, {"CC-NC"}), ("MES-COMPROMIS", {"COMPROMIS"}, {"MES-COMPROMIS"})],
    ("2019n", "2023"): [("SUMAR", {"UP", "MASPAIS", "MES-COMPROMIS"}, {"SUMAR"}), ("CC", {"CC-NC"}, {"CC", "NC"}),
                        ("UPN+PP(Navarra)", {"NA+"}, {"UPN", "PP"})],
}


# =========================================================================== polls (Wikipedia wikitext)

WIKI_FILES = {"2016": "encuestas_2016_rev1381312708.wikitext", "2019a": "encuestas_2019a_rev1381587138.wikitext",
              "2019n": "encuestas_2019n_rev1381587097.wikitext", "2023": "encuestas_2023_rev1381583414.wikitext"}
MESES = {"Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10,
         "Nov": 11, "Dec": 12}
# Established polling firms (fieldwork of their own). Excluded: poll averages/aggregators
# (KeyData), self-selected online panels (ElectoPanel), and anything not listed.
FIRMAS = ["CIS", "GAD3", "40dB", "Sigma Dos", "NC Report", "SocioMétrica", "DYM", "GESOP", "Ipsos", "Celeste-Tel",
          "Simple Lógica", "Hamalgama Métrica", "Invymark", "IMOP", "Metroscopia", "Data10", "Target Point",
          "Opina 360", "Sondaxe", "TNS Demoscopia", "Demoscopia y Servicios", "Netquest", "InvyMark", "Gizaker",
          "Ikerfel", "Cluster17", "Feedback", "Hamalgama", "Encuestamos", "Typol", "Kantar", "Deimos"]
DOW = None


def _wiki_cells(block):
    """Split a wikitext table row block into cell strings (one '|' cell per line or '||' separated)."""
    cells = []
    for line in block:
        if not line.startswith("|") or line.startswith("|-") or line.startswith("|}"):
            if cells and not line.startswith("|") and not line.startswith("!"):
                cells[-1] += " " + line  # continuation line
            continue
        for c in line[1:].split("||"):
            cells.append(c)
    return cells


def _cell_attr_value(c):
    """'style=..| 12.3<br/>..' -> (colspan, text)."""
    colspan = 1
    m = re.match(r"^\s*((?:[^|\[{]|\{\{[^}]*\}\})*?)\|(?!\|)(.*)$", c)
    # attribute part exists only if it contains '=' or a template like {{Party shading/..}}
    if m and ("=" in m.group(1) or "{{" in m.group(1)) and "[[" not in m.group(1):
        attrs, c = m.group(1), m.group(2)
        mc = re.search(r'colspan\s*=\s*"?(\d+)', attrs)
        if mc:
            colspan = int(mc.group(1))
    return colspan, c.strip()


def _num_cell(c):
    c = re.sub(r"<br\s*/?>.*$", "", c).replace("'''", "").strip()
    m = re.match(r"^(\d+(?:\.\d+)?)$", c)
    return float(m.group(1)) if m else None


def _firm(c):
    c = re.sub(r"<ref[^>]*/>", "", c)
    c = re.sub(r"<ref.*?</ref>", "", c, flags=re.S)
    c = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]*)\]\]", r"\1", c)
    c = re.sub(r"\[https?://\S+\s+([^\]]*)\]", r"\1", c)
    return boe.clean(c)


def _end_date(c, year):
    c = boe.clean(re.sub(r"<ref.*?</ref>|<ref[^>]*/>", "", c, flags=re.S))
    m = re.search(r"(\d{1,2})\s+([A-Z][a-z]{2})[a-z]*(?:\s+(\d{4}))?\s*$", c)
    if not m:
        return None
    return (int(m.group(3) or year), MESES[m.group(2)], int(m.group(1)))


def parse_polls(key):
    """First 'Voting intention estimates' table -> list of {firm, raw_firm, end, sample, values{col: pct}}"""
    txt = open(os.path.join(SRC, "wikipedia", WIKI_FILES[key]), encoding="utf-8").read()
    start = txt.index("====Voting intention estimates====")
    t0 = txt.index("{|", start)
    t1 = txt.index("\n|}", t0)
    lines = txt[t0:t1].splitlines()
    # header: first '!' row
    hdr = []
    for l in lines[1:]:
        if l.startswith("|-") and hdr:
            break
        if l.startswith("!"):
            m = re.search(r"\|([^|\]]+)\]\]\s*$", l)
            name = m.group(1) if m else boe.clean(l.split("|")[-1])
            name = name.replace("link=", "")
            hdr.append(name)
    year = FECHAS[key][0]
    rows, block = [], []
    body = lines[next(i for i, l in enumerate(lines) if l.startswith("!")):]
    for l in body + ["|-"]:
        if l.startswith("|-"):
            if block and not block[0].startswith("!"):
                cells = _wiki_cells(block)
                vals = []
                for c in cells:
                    cs, v = _cell_attr_value(c)
                    vals.extend([v] + [None] * (cs - 1))
                if len(vals) >= len(hdr) - 1:
                    rows.append(vals)
            block = []
        else:
            block.append(l)
    polls = []
    for v in rows:
        if v[0] is None or v[1] is None:
            continue
        firm = _firm(v[0])
        end = _end_date(v[1], year)
        if not end:
            continue
        values = {}
        for i, col in enumerate(hdr[4:-1]):
            x = _num_cell(v[4 + i]) if 4 + i < len(v) and v[4 + i] is not None else None
            if x is not None:
                values[col] = x
        polls.append({"raw_firm": firm, "end": end, "sample": boe.clean(v[2] or ""), "values": values})
    return hdr[4:-1], polls


def days_before(end, key):
    import datetime as dt
    return (dt.date(*FECHAS[key]) - dt.date(*end)).days


EXCLUIR_FILAS = ("Periòdic", "Adelaide", "Andorra", "(SocioMétrica)", "AltCIS")


def final_polls(key, window=(6, 30)):
    """Last poll of each established firm whose fieldwork ended 6..30 days before election day
    (publication ban: LOREG art. 69.7, the last 5 days). Rows published abroad during the ban
    (El Periòdic d'Andorra, The Adelaide Review) and Wikipedia's alternative re-projections of
    CIS data are excluded: they are not what a Spanish reader could see before the ban."""
    cols, polls = parse_polls(key)
    best = {}
    for p in polls:
        d = days_before(p["end"], key)
        if not (window[0] <= d <= window[1]) or len(p["values"]) < 3:
            continue
        if any(x in p["raw_firm"] for x in EXCLUIR_FILAS):
            continue
        firm = next((f for f in FIRMAS if p["raw_firm"].lower().startswith(f.lower())), None)
        if firm is None:
            continue
        if firm not in best or days_before(best[firm]["end"], key) > d:
            best[firm] = dict(p, firm=firm, dias_antes=d)
    return cols, sorted(best.values(), key=lambda p: p["firm"])


# Poll column -> (families in the previous election, families in this election).
# Columns not listed (or "within" another) are not projected: those lists keep their base share,
# exactly as the app does for parties a poll does not report.
POLL_UNITS = {
    "2016": {"PP": ({"PP", "UPN-PP"}, {"PP", "UPN-PP"}), "PSOE": ({"PSOE"}, {"PSOE"}),
             "Unidos Podemos": ({"PODEMOS15", "IU"}, {"UP", "UP+COMPROMIS"}), "C's": ({"CS"}, {"CS"}),
             "ERC–CatSí": ({"ERC"}, {"ERC"}), "CDC": ({"JUNTS"}, {"JUNTS"}), "PNV": ({"PNV"}, {"PNV"}),
             "PACMA": ({"PACMA"}, {"PACMA"}), "EH Bildu": ({"BILDU"}, {"BILDU"}), "CC": ({"CC"}, {"CC"})},
    "2019a": {"PP": ({"PP"}, {"PP"}), "PSOE": ({"PSOE"}, {"PSOE"}), "Unidas Podemos": ({"UP", "UP+COMPROMIS"}, {"UP"}),
              "Cs": ({"CS"}, {"CS"}), "ERC–Sobiranistes": ({"ERC"}, {"ERC"}), "PNV": ({"PNV"}, {"PNV"}),
              "PACMA": ({"PACMA"}, {"PACMA"}), "EH Bildu": ({"BILDU"}, {"BILDU"}), "CCa": ({"CC"}, {"CC"}),
              "Vox": ({"VOX"}, {"VOX"}), "JxCat": ({"JUNTS"}, {"JUNTS"}), "NA+": ({"UPN-PP"}, {"NA+"})},
    "2019n": {"PSOE": ({"PSOE"}, {"PSOE"}), "PP": ({"PP"}, {"PP"}), "Cs": ({"CS"}, {"CS"}),
              "Unidas Podemos": ({"UP"}, {"UP"}), "Vox": ({"VOX"}, {"VOX"}), "ERC–Sobiranistes": ({"ERC"}, {"ERC"}),
              "JxCat": ({"JUNTS"}, {"JUNTS"}), "PNV": ({"PNV"}, {"PNV"}), "EH Bildu": ({"BILDU"}, {"BILDU"}),
              "CC–NCa": ({"CC", "NC"}, {"CC-NC"}), "NA+": ({"NA+"}, {"NA+"}), "PRC": ({"PRC"}, {"PRC"})},
    "2023": {"PSOE": ({"PSOE"}, {"PSOE"}), "PP": ({"PP"}, {"PP"}), "Vox": ({"VOX"}, {"VOX"}),
             "Sumar": ({"UP", "MASPAIS", "MES-COMPROMIS"}, {"SUMAR"}), "ERC": ({"ERC"}, {"ERC"}),
             "Junts": ({"JUNTS"}, {"JUNTS"}), "PNV": ({"PNV"}, {"PNV"}), "EH Bildu": ({"BILDU"}, {"BILDU"}),
             "CUP": ({"CUP"}, {"CUP"}), "BNG": ({"BNG"}, {"BNG"})},
}
# Province exclusions where a poll column's composition differs locally (Valencia 2016->2019a:
# Compromís inside "A la valenciana" in 2016, separate in 2019).
POLL_EXCL = {("2019a", "Unidas Podemos"): {"03", "12", "46"}}
PREV = {"2016": "2015", "2019a": "2016", "2019n": "2019a", "2023": "2019n"}


# =========================================================================== statistics

def mean(xs):
    xs = list(xs)
    return sum(xs) / len(xs) if xs else float("nan")


def median(xs):
    xs = sorted(xs)
    n = len(xs)
    return float("nan") if n == 0 else (xs[n // 2] if n % 2 else (xs[n // 2 - 1] + xs[n // 2]) / 2)


def fit_k(obs):
    """MLE of k for x ~ N(0, (k/sqrt(max(s, floor)))^2)."""
    return math.sqrt(mean(max(o["s"], SUELO) * o["x"] ** 2 for o in obs))


def loglik_sigma(obs, sig):
    return sum(-math.log(sig(o["s"])) - 0.5 * (o["x"] / sig(o["s"])) ** 2 - 0.5 * math.log(2 * math.pi) for o in obs)


def fit_forms(obs):
    """Compare sigma(s) forms by maximum likelihood (zero-mean normal on the log-ratio)."""
    res = {}
    k = fit_k(obs)
    res["k/sqrt(s)"] = {"params": {"k": k}, "ll": loglik_sigma(obs, lambda s: k / math.sqrt(max(s, SUELO))), "np": 1}
    c0 = math.sqrt(mean(o["x"] ** 2 for o in obs))
    res["constante"] = {"params": {"sigma": c0}, "ll": loglik_sigma(obs, lambda s: c0), "np": 1}
    best = None
    for a100 in range(0, 151):
        a = a100 / 100.0
        c = math.sqrt(mean(o["x"] ** 2 * max(o["s"], SUELO) ** (2 * a) for o in obs))
        ll = loglik_sigma(obs, lambda s, c=c, a=a: c * max(s, SUELO) ** (-a))
        if best is None or ll > best[0]:
            best = (ll, a, c)
    res["c*s^-a"] = {"params": {"c": best[2], "a": best[1]}, "ll": best[0], "np": 2}
    best = None  # sigma^2 = a^2 + b^2/s  (a: proportional "swing" floor, b: small-party term)
    for ia in range(0, 61):
        a = ia * 0.005
        for ib in range(0, 61):
            b = ib * 0.002
            if a == 0 and b == 0:
                continue
            f = lambda s, a=a, b=b: math.sqrt(a * a + b * b / max(s, SUELO))  # noqa: E731
            ll = loglik_sigma(obs, f)
            if best is None or ll > best[0]:
                best = (ll, a, b)
    res["sqrt(a^2+b^2/s)"] = {"params": {"a": best[1], "b": best[2]}, "ll": best[0], "np": 2}
    for r in res.values():
        r["aic"] = 2 * r["np"] - 2 * r["ll"]
    return res


BINS = [(0.005, 0.01), (0.01, 0.02), (0.02, 0.05), (0.05, 0.10), (0.10, 0.20), (0.20, 0.35), (0.35, 1.0)]


def binned(obs):
    out = []
    for a, b in BINS:
        xs = [o for o in obs if a <= o["s"] < b]
        if not xs:
            continue
        rms = math.sqrt(mean(o["x"] ** 2 for o in xs))
        out.append({"desde": a, "hasta": b, "n": len(xs), "rms_log": rms,
                    "sigma_robusta": median(abs(o["x"]) for o in xs) / 0.6745,
                    "k_implicita": math.sqrt(mean(o["s"] * o["x"] ** 2 for o in xs)),
                    "k_robusta": median(abs(o["x"]) * math.sqrt(o["s"]) for o in xs) / 0.6745,
                    "error_pts_rms": 100 * math.sqrt(mean((o["s"] * (math.exp(o["x"]) - 1)) ** 2 for o in xs))})
    return out


# =========================================================================== observations

def unit_share(p, fams):
    return sum(p["fam"].get(f, 0) for f in fams) / p["validos"]


def baseline_obs(FR, a, b, strict=True):
    """log(s_b/s_a) per (province, unit) for units present in both elections with s_a >= 0.5 %."""
    A, B = FR[a], FR[b]
    na, nb = national(A), national(B)
    units = []
    if strict:
        fams = set(na) & set(nb)
        units = [(f, {f}, {f}) for f in sorted(fams) if not f.startswith("x:?")]
    else:
        units = [(f, {f}, {f}) for f in sorted(set(na) & set(nb)) if not f.startswith("x:?")]
        used = set().union(*[u[1] | u[2] for u in BLOC_UNITS.get((a, b), [])]) if BLOC_UNITS.get((a, b)) else set()
        units = [u for u in units if u[0] not in used] + [(n, set(p), set(c)) for n, p, c in BLOC_UNITS.get((a, b), [])]
    obs = []
    for name, pf, cf in units:
        Sa, Sb = sum(na.get(f, 0) for f in pf), sum(nb.get(f, 0) for f in cf)
        for code in A:
            sa, sb = unit_share(A[code], pf), unit_share(B[code], cf)
            if sa >= SUELO and sb > 0:
                obs.append({"par": "%s→%s" % (a, b), "prov": code, "unidad": name, "s": sa, "s_t": sb,
                            "x": math.log(sb / sa), "nac": math.log(Sb / Sa), "S": Sa,
                            "r": math.log(sb / sa) - math.log(Sb / Sa)})
    return obs


def project(base, poll_vals, units, nat_base, running=None):
    """App method (docs/METODOLOGIA.md): proportional swing for polled units, unpolled lists keep
    their base share, renormalise to 100 % keeping the base blank share. `running`: families that
    stand in the target election; the base vote of the others is dropped before renormalising
    (otherwise e.g. the 6.8 % of Cs in 2019, which did not stand in 2023, would shrink every
    projected share; in the 2026 app the equivalent vote is small). Returns
    {code: {"unidades": {col: share}, "fam": {fam: share}}} over valid votes."""
    out = {}
    factor = {}
    for col, (pf, _) in units.items():
        if col in poll_vals:
            B = sum(nat_base.get(f, 0) for f in pf)
            if B > 0:
                factor[col] = poll_vals[col] / 100.0 / B
    owner = {}
    for col in factor:
        for f in units[col][0]:
            owner[f] = col
    for code, p in base.items():
        sh = {f: v / p["validos"] for f, v in p["fam"].items() if running is None or f in running or f in owner}
        new = {}
        for f, s in sh.items():
            new[f] = s * factor[owner[f]] if f in owner else s
        blank = p["blancos"] / p["validos"]
        tot = sum(new.values())
        scale = (1 - blank) / tot
        new = {f: s * scale for f, s in new.items()}
        uni = {col: sum(new.get(f, 0) for f in units[col][0]) for col in factor}
        out[code] = {"unidades": uni, "fam": new, "blanco": blank}
    return out


def poll_obs(FR, t):
    """(a) national poll errors and (c) provincial errors of the projected poll scenario."""
    a = PREV[t]
    A, B = FR[a], FR[t]
    na, nb = national(A), national(B)
    cols, polls = final_polls(t)
    units = POLL_UNITS[t]
    nat, prov = [], []
    for p in polls:
        proj = project(A, p["values"], units, na, running=set(nb))
        for col, (pf, cf) in units.items():
            if col not in p["values"]:
                continue
            S = sum(nb.get(f, 0) for f in cf)
            P = p["values"][col] / 100.0
            if S > 0 and P > 0:
                nat.append({"eleccion": t, "firma": p["firm"], "col": col, "S": S, "P": P, "s": S,
                            "x": math.log(S / P), "err_pts": 100 * (P - S)})
            for code in A:
                if code in POLL_EXCL.get((t, col), ()):
                    continue
                pred = proj[code]["unidades"].get(col, 0)
                act = unit_share(B[code], cf)
                if pred >= SUELO and act > 0:
                    prov.append({"eleccion": t, "firma": p["firm"], "col": col, "prov": code, "s": pred, "s_t": act,
                                 "x": math.log(act / pred), "S": p["values"][col] / 100.0})
    return polls, nat, prov


def swing_obs(FR, t):
    """(b) provincial deviation from proportional swing applied with the TRUE national result,
    on the same poll units."""
    a = PREV[t]
    A, B = FR[a], FR[t]
    na, nb = national(A), national(B)
    true_vals = {}
    for col, (pf, cf) in POLL_UNITS[t].items():
        S = sum(nb.get(f, 0) for f in cf)
        if S > 0 and sum(na.get(f, 0) for f in pf) > 0:
            true_vals[col] = 100 * S
    proj = project(A, true_vals, POLL_UNITS[t], na, running=set(nb))
    out = []
    for col, (pf, cf) in POLL_UNITS[t].items():
        if col not in true_vals:
            continue
        for code in A:
            if code in POLL_EXCL.get((t, col), ()):
                continue
            pred = proj[code]["unidades"].get(col, 0)
            act = unit_share(B[code], cf)
            if pred >= SUELO and act > 0:
                out.append({"eleccion": t, "col": col, "prov": code, "s": pred, "s_t": act, "x": math.log(act / pred)})
    return out


# =========================================================================== simulation (port of seats.ts)

def dhondt(votos, escanos, validos, umbral=0.03):
    """Same rule as pipeline/dhondt.py / seats.ts (threshold on valid votes, ties -> more votes)."""
    n = len(votos)
    res = [0] * n
    minimo = umbral * validos
    eleg = [i for i in range(n) if votos[i] > 0 and votos[i] >= minimo]
    for _ in range(escanos):
        mejor, mejor_q = -1, -1.0
        for i in eleg:
            q = votos[i] / (res[i] + 1)
            if q > mejor_q or (q == mejor_q and mejor >= 0 and votos[i] > votos[mejor]):
                mejor, mejor_q = i, q
        if mejor < 0:
            break
        res[mejor] += 1
    return res


def sigma_fn(spec):
    """spec: ("k", k) -> k/sqrt(max(s, 0.5 %)) as in seats.ts; ("const", c) -> c; ("pow", c, a)."""
    if spec[0] == "k":
        return lambda s: spec[1] / math.sqrt(max(s, SUELO))
    if spec[0] == "const":
        return lambda s: spec[1]
    if spec[0] == "pow":
        return lambda s: spec[1] * max(s, SUELO) ** (-spec[2])
    raise ValueError(spec)


def p_escano(cuotas, elig, blanco, escanos, specs, n, seed):
    """P(>=1 seat) per contender for each sigma spec, with common random numbers across specs.
    Mirrors simular(): multiplicative log-normal error (mean-preserving), renormalised so that
    candidates + blank keep their total, then threshold + D'Hondt on validos = 1."""
    rnd = random.Random(seed)
    m = len(cuotas)
    Z = [[rnd.gauss(0.0, 1.0) for _ in range(m)] for _ in range(n)]
    suma_base = sum(cuotas) + blanco
    out = []
    for spec in specs:
        f = sigma_fn(spec)
        sig = [f(s) for s in cuotas]
        con = [0] * m
        for z in Z:
            c = [cuotas[i] * math.exp(sig[i] * z[i] - sig[i] * sig[i] / 2) if cuotas[i] > 0 else 0.0 for i in range(m)]
            fac = suma_base / (blanco + sum(c))
            v = [c[i] * fac if elig[i] else 0.0 for i in range(m)]
            rep = dhondt(v, escanos, 1.0)
            for i in range(m):
                if rep[i]:
                    con[i] += 1
        out.append([x / n for x in con])
    return out


# =========================================================================== backtest

BACKTEST_MAP = {  # target-election family -> predecessor families (beyond identical names)
    "2016": {"UP": {"PODEMOS15", "IU"}, "UP+COMPROMIS": {"PODEMOS15", "IU"}},
    "2019a": {"UP": {"UP", "UP+COMPROMIS"}, "NA+": {"UPN-PP"}},
    "2019n": {"CC-NC": {"CC", "NC"}, "MES-COMPROMIS": {"COMPROMIS"}},
    "2023": {"SUMAR": {"UP", "MASPAIS", "MES-COMPROMIS"}, "CC": {"CC-NC"}, "UPN": {"NA+"}},
}


def predecessors(FR, t):
    a = PREV[t]
    na, nb = national(FR[a]), national(FR[t])
    m = {f: {f} for f in nb if f in na and not f.startswith("x:?")}
    m.update(BACKTEST_MAP[t])
    used = set()
    for f, pf in m.items():
        used |= pf
    return m


def backtest_cases(FR, t, scenario, poll=None):
    """Contenders per province as the app builds them: lists standing in t whose predecessor
    has base vote in that province; everything else -> 'otros' (cannot win a seat)."""
    a = PREV[t]
    A, B = FR[a], FR[t]
    pred = predecessors(FR, t)
    if scenario == "base":
        shares = {c: ({f: v / p["validos"] for f, v in p["fam"].items()}, p["blancos"] / p["validos"]) for c, p in A.items()}
    else:
        proj = project(A, poll["values"], POLL_UNITS[t], national(A), running=set(national(B)))
        shares = {c: (proj[c]["fam"], proj[c]["blanco"]) for c in A}
    cases = []
    for code in sorted(A):
        sh, blanco = shares[code]
        conts = []
        for f in sorted(pred):
            if B[code]["fam"].get(f, 0) <= 0:
                continue  # did not stand here in t
            s = sum(sh.get(g, 0) for g in pred[f])
            if s > 0:
                conts.append((f, s, B[code]["seats"].get(f, 0) > 0))
        otros = max(0.0, 1 - blanco - sum(s for _, s, _ in conts))
        cases.append({"prov": code, "escanos": B[code]["escanos"], "blanco": blanco, "otros": otros, "conts": conts})
    return cases


def run_backtest(cases, specs, n, seed_tag):
    """-> list of {prov, fam, won, p: [p per spec]}"""
    rows = []
    for c in cases:
        cuotas = [s for _, s, _ in c["conts"]] + [c["otros"]]
        elig = [True] * len(c["conts"]) + [False]
        seed = int.from_bytes(("%s|%s" % (seed_tag, c["prov"])).encode("utf-8"), "little") % (2 ** 31)
        ps = p_escano(cuotas, elig, c["blanco"], c["escanos"], specs, n, seed)
        for i, (f, s, won) in enumerate(c["conts"]):
            rows.append({"prov": c["prov"], "fam": f, "cuota": s, "won": won, "p": [ps[j][i] for j in range(len(specs))]})
    return rows


VEREDICTO_BINS = [(0.0, 0.05, "muy improbable (<5 %)"), (0.05, 0.33, "improbable (5–33 %)"),
                  (0.33, 0.66, "en disputa (33–66 %)"), (0.66, 0.95, "probable (66–95 %)"),
                  (0.95, 1.0001, "casi seguro (≥95 %)")]


def reliability(rows, j):
    out = []
    for a, b, name in VEREDICTO_BINS:
        xs = [r for r in rows if a <= r["p"][j] < b]
        if xs:
            out.append({"tramo": name, "n": len(xs), "p_media": mean(r["p"][j] for r in xs),
                        "frecuencia": mean(1.0 if r["won"] else 0.0 for r in xs)})
    return out


def brier(rows, j, subset=None):
    xs = rows if subset is None else [r for r in rows if subset(r)]
    return mean((r["p"][j] - (1.0 if r["won"] else 0.0)) ** 2 for r in xs), len(xs)


def fit_two_component(obs):
    """sigma^2 = kn^2/S + kp^2/s (S: national share of the poll column, s: provincial share)."""
    best = None
    for i in range(0, 81):
        kn = i * 0.001
        for j in range(0, 121):
            kp = j * 0.001
            if kn == 0 and kp == 0:
                continue
            f = lambda o, kn=kn, kp=kp: math.sqrt(kn * kn / max(o["S"], SUELO) + kp * kp / max(o["s"], SUELO))  # noqa
            ll = sum(-math.log(f(o)) - 0.5 * (o["x"] / f(o)) ** 2 - 0.5 * math.log(2 * math.pi) for o in obs)
            if best is None or ll > best[0]:
                best = (ll, kn, kp)
    return {"params": {"kn": best[1], "kp": best[2]}, "ll": best[0], "np": 2, "aic": 4 - 2 * best[0]}


def years(a, b):
    import datetime as dt
    return (dt.date(*FECHAS[b]) - dt.date(*FECHAS[a])).days / 365.25


def summarize_bt(rows, specs, labels):
    disputed = lambda r: any(0.01 < x < 0.99 for x in r["p"])  # noqa: E731
    out = []
    for j, lab in enumerate(labels):
        b_all, n_all = brier(rows, j)
        b_d, n_d = brier(rows, j, disputed)
        b_s, n_s = brier(rows, j, lambda r: disputed(r) and r["cuota"] < 0.05)
        dis = [r for r in rows if disputed(r)]
        out.append({"ajuste": lab, "spec": list(specs[j]), "brier": b_all, "n": n_all, "brier_disputados": b_d,
                    "n_disputados": n_d, "brier_disputados_cuota_menor_5": b_s, "n_disputados_cuota_menor_5": n_s,
                    "p_media_disputados": mean(r["p"][j] for r in dis),
                    "frecuencia_disputados": mean(1.0 if r["won"] else 0.0 for r in dis),
                    "fiabilidad": reliability(rows, j)})
    return out


def main(quick=False):
    n_sims = 500 if quick else 2000
    R = load_all()
    FR = {y: by_family(R[y], y) for y in ELECCIONES}
    J = {"avisos": AVISOS, "contraste_boe": [
        boe_national_check(R["2015"], "2015", "BOE-A-2016-867.pdf", 2),
        boe_national_check(R["2019a"], "2019a", "BOE-A-2019-8070.pdf", 3),
        boe_national_check(R["2019n"], "2019n", "BOE-A-2019-17344.pdf", 2)]}
    J["nacional"] = {y: {f: s for f, s in sorted(national(FR[y]).items(), key=lambda z: -z[1]) if s >= 0.003}
                     for y in ELECCIONES}

    # ---- 2. baseline ("repeat the previous election")
    base = {"pares": []}
    allb = []
    for a, b in PARES:
        o = baseline_obs(FR, a, b)
        ob = baseline_obs(FR, a, b, strict=False)
        allb += o
        nat = {}
        for x in o:
            nat.setdefault(x["unidad"], (x["S"], x["nac"]))
        base["pares"].append({"par": "%s→%s" % (a, b), "anos": years(a, b), "n": len(o), "unidades": len(set(x["unidad"] for x in o)),
                              "k": fit_k(o), "k_bloques": fit_k(ob), "n_bloques": len(ob),
                              "sigma_constante": math.sqrt(mean(x["x"] ** 2 for x in o)),
                              "k_residuo_provincial": fit_k([dict(x, x=x["r"]) for x in o]),
                              "swing_nacional": {u: {"S": S, "log": l} for u, (S, l) in sorted(nat.items(), key=lambda z: -z[1][0])}})
    base["formas"] = fit_forms(allb)
    base["tramos"] = binned(allb)
    base["tramos_residuo"] = binned([dict(x, x=x["r"]) for x in allb])
    base["k_residuo_provincial"] = fit_k([dict(x, x=x["r"]) for x in allb])
    long = [x for x in allb if x["par"] in ("2016→2019a", "2019n→2023")]
    base["formas_largo_plazo"] = fit_forms(long)
    base["n"] = len(allb)
    J["base"] = base

    # ---- 3. polls
    pol = {"elecciones": [], "encuestas": {}}
    AN, AP, AS = [], [], []
    per_t = {}
    for t in ["2016", "2019a", "2019n", "2023"]:
        polls, nat, prov = poll_obs(FR, t)
        sw = swing_obs(FR, t)
        AN += nat
        AP += prov
        AS += sw
        per_t[t] = prov
        pol["encuestas"][t] = [{"firma": p["firm"], "fila_wikipedia": p["raw_firm"][:80], "fin_campo": "%04d-%02d-%02d" % p["end"],
                                "dias_antes": p["dias_antes"], "valores": p["values"]} for p in polls]
        cols = sorted(set(o["col"] for o in nat), key=lambda c: -max(o["S"] for o in nat if o["col"] == c))
        pol["elecciones"].append({
            "eleccion": t, "n_encuestas": len(polls), "k_nacional": fit_k(nat), "k_swing_real": fit_k(sw),
            "k_total": fit_k(prov), "n_total": len(prov),
            "rms_pts_nacional": math.sqrt(mean(o["err_pts"] ** 2 for o in nat)),
            "por_partido": [{"col": c, "resultado": 100 * next(o["S"] for o in nat if o["col"] == c),
                             "sesgo_medio_pts": mean(o["err_pts"] for o in nat if o["col"] == c),
                             "rms_pts": math.sqrt(mean(o["err_pts"] ** 2 for o in nat if o["col"] == c))} for c in cols]})
    pol["k_nacional"] = fit_k(AN)
    pol["k_swing_real"] = fit_k(AS)
    pol["k_total"] = fit_k(AP)
    pol["k_combinado_cuadratico"] = math.sqrt(pol["k_nacional"] ** 2 + pol["k_swing_real"] ** 2)
    pol["formas_total"] = fit_forms(AP)
    pol["dos_componentes_total"] = fit_two_component(AP)
    pol["formas_nacional"] = fit_forms(AN)
    pol["formas_swing"] = fit_forms(AS)
    pol["tramos_total"] = binned(AP)
    pol["tramos_nacional"] = binned(AN)
    pol["tramos_swing"] = binned(AS)
    J["encuestas"] = pol

    # ---- 4. backtests
    k_base_all, k_poll_all = fit_k(allb), fit_k(AP)
    const_all = base["formas"]["constante"]["params"]["sigma"]
    pw = base["formas"]["c*s^-a"]["params"]
    bt = {"n_simulaciones": n_sims, "elecciones": {}}
    for t in ["2023", "2019n", "2019a", "2016"]:
        a = PREV[t]
        k_loo_b = fit_k([x for x in allb if not x["par"].endswith("→" + t)])
        c_loo_b = math.sqrt(mean(x["x"] ** 2 for x in allb if not x["par"].endswith("→" + t)))
        k_loo_p = fit_k([x for tt, xs in per_t.items() if tt != t for x in xs])
        specs_b = [("k", 0.0), ("k", 0.03125), ("k", 0.05), ("k", 0.075), ("k", 0.10), ("k", round(k_loo_b, 4)),
                   ("k", 0.15), ("k", 0.20), ("const", 0.25), ("const", round(c_loo_b, 4)), ("const", 0.45),
                   ("pow", round(pw["c"], 4), pw["a"])]
        lab_b = ["sin error (k=0)", "actual baja (k=0,031)", "actual media (k=0,05)", "actual alta (k=0,075)", "k=0,10",
                 "k ajustada sin %s (%.3f)" % (t, k_loo_b), "k=0,15", "k=0,20", "σ=0,25 constante",
                 "σ constante ajustada sin %s (%.2f)" % (t, c_loo_b), "σ=0,45 constante", "σ=c·s^-a (todo)"]
        cases = backtest_cases(FR, t, "base")
        rows_b = run_backtest(cases, specs_b, n_sims, "base" + t)
        specs_p = [("k", 0.0), ("k", 0.025), ("k", 0.04), ("k", 0.06), ("k", 0.08), ("k", round(k_loo_p, 4)), ("k", 0.10),
                   ("k", 0.12), ("k", 0.15)]
        lab_p = ["sin error (k=0)", "actual baja (k=0,025)", "actual media (k=0,04)", "actual alta / k=0,06", "k=0,08",
                 "k ajustada sin %s (%.3f)" % (t, k_loo_p), "k=0,10", "k=0,12", "k=0,15"]
        rows_p = []
        for p in final_polls(t)[1]:
            cp = backtest_cases(FR, t, "poll", poll=p)
            rows_p += [dict(r, firma=p["firm"]) for r in run_backtest(cp, specs_p, n_sims // 2, "poll" + t + p["firm"])]
        bt["elecciones"][t] = {"desde": a, "base": summarize_bt(rows_b, specs_b, lab_b),
                               "encuestas": summarize_bt(rows_p, specs_p, lab_p),
                               "n_casos_base": len(rows_b), "n_casos_encuestas": len(rows_p),
                               "n_encuestas": len(final_polls(t)[1])}
        print("backtest %s done" % t, file=sys.stderr)
    J["backtest"] = bt
    J["k_ajustada"] = {"base_k": k_base_all, "base_sigma_constante": const_all, "base_potencia": pw, "encuestas_k": k_poll_all}
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, "calibracion.json"), "w", encoding="utf-8") as f:
        json.dump(J, f, ensure_ascii=False, indent=1, default=lambda x: sorted(x) if isinstance(x, set) else str(x))
        f.write("\n")
    write_txt(J)


def write_txt(J):
    L = []
    w = L.append
    w("CALIBRACIÓN DE k — generado por pipeline/calibracion.py (no editar a mano)\n")
    for c in J["contraste_boe"]:
        w("Contraste Ministerio vs BOE (total estatal) %s: válidos %d / %d, blancos %d / %d -> %s"
          % (c["eleccion"], c["validos_ministerio"], c["validos_boe"], c["blancos_ministerio"], c["blancos_boe"],
             "OK" if c["coincide"] else "DIFIERE"))
    for a in J["avisos"]:
        w("Aviso: " + a)
    w("\n== 2. Base: log(s_t/s_t-1) por provincia y partido (etiquetas comparables, s_t-1 >= 0,5 %)")
    w("%-14s %5s %5s %7s %8s %9s %11s" % ("par", "años", "n", "k", "σ const", "k bloques", "k residuo"))
    for p in J["base"]["pares"]:
        w("%-14s %5.1f %5d %7.3f %8.3f %9.3f %11.3f" % (p["par"], p["anos"], p["n"], p["k"], p["sigma_constante"],
                                                    p["k_bloques"], p["k_residuo_provincial"]))
    w("Formas (todos los pares, n=%d):" % J["base"]["n"])
    for name, r in J["base"]["formas"].items():
        w("  %-18s %-40s AIC %.1f" % (name, json.dumps({k: round(v, 4) for k, v in r["params"].items()}), r["aic"]))
    w("Formas (solo pares de ~3 años):")
    for name, r in J["base"]["formas_largo_plazo"].items():
        w("  %-18s %-40s AIC %.1f" % (name, json.dumps({k: round(v, 4) for k, v in r["params"].items()}), r["aic"]))
    for key, title in (("tramos", "total"), ("tramos_residuo", "residuo tras swing nacional real")):
        w("Por tramos de cuota (%s):" % title)
        w("  %-12s %5s %8s %8s %8s %8s %9s" % ("cuota", "n", "rms log", "σ robust", "k impl.", "k robust", "rms pts"))
        for b in J["base"][key]:
            w("  %4.1f–%4.1f %% %5d %8.3f %8.3f %8.3f %8.3f %9.2f" % (100 * b["desde"], 100 * b["hasta"], b["n"], b["rms_log"],
                                                             b["sigma_robusta"], b["k_implicita"], b["k_robusta"], b["error_pts_rms"]))
    P = J["encuestas"]
    w("\n== 3. Escenarios de encuesta")
    w("%-6s %4s %8s %10s %8s %6s %10s" % ("elecc.", "enc.", "k nac.", "k swing", "k total", "n", "rms pts nac"))
    for e in P["elecciones"]:
        w("%-6s %4d %8.3f %10.3f %8.3f %6d %10.2f" % (e["eleccion"], e["n_encuestas"], e["k_nacional"], e["k_swing_real"],
                                                   e["k_total"], e["n_total"], e["rms_pts_nacional"]))
    w("Todas: k nacional %.3f, k swing real %.3f, combinación cuadrática %.3f, k total directa %.3f"
      % (P["k_nacional"], P["k_swing_real"], P["k_combinado_cuadratico"], P["k_total"]))
    for name, r in list(P["formas_total"].items()) + [("kn²/S+kp²/s", P["dos_componentes_total"])]:
        w("  %-18s %-40s AIC %.1f" % (name, json.dumps({k: round(v, 4) for k, v in r["params"].items()}), r["aic"]))
    w("Tramos (error total del escenario de encuesta):")
    for b in P["tramos_total"]:
        w("  %4.1f–%4.1f %% %5d rms log %.3f  k impl. %.3f  k robusta %.3f  rms %.2f pts" % (
            100 * b["desde"], 100 * b["hasta"], b["n"], b["rms_log"], b["k_implicita"], b["k_robusta"], b["error_pts_rms"]))
    for e in P["elecciones"]:
        w("Sesgo medio de las encuestas %s (pts, encuesta − resultado): " % e["eleccion"] + ", ".join(
            "%s %+.1f" % (x["col"], x["sesgo_medio_pts"]) for x in e["por_partido"]))
    for t, ps in P["encuestas"].items():
        w("Encuestas %s: " % t + "; ".join("%s (%s, %d d)" % (p["firma"], p["fin_campo"], p["dias_antes"]) for p in ps))
    w("\n== 4. Backtest (%d simulaciones por circunscripción; encuestas: la mitad)" % J["backtest"]["n_simulaciones"])
    for t, e in J["backtest"]["elecciones"].items():
        for sc in ("base", "encuestas"):
            w("-- %s desde %s, escenario %s (casos %d%s)" % (t, e["desde"], sc, e["n_casos_" + sc],
                                                           ", %d encuestas" % e["n_encuestas"] if sc == "encuestas" else ""))
            w("   %-36s %8s %10s %5s %8s %8s %12s %4s" % ("ajuste", "Brier", "Brier disp.", "n", "p media", "frec.", "Brier <5 %", "n"))
            for r in e[sc]:
                w("   %-36s %8.4f %10.4f %5d %8.3f %8.3f %12.4f %4d" % (
                    r["ajuste"], r["brier"], r["brier_disputados"], r["n_disputados"], r["p_media_disputados"],
                    r["frecuencia_disputados"], r["brier_disputados_cuota_menor_5"], r["n_disputados_cuota_menor_5"]))
            for r in e[sc]:
                w("   fiabilidad %-30s " % r["ajuste"] + " | ".join("%s: n=%d p=%.2f obs=%.2f" % (b["tramo"].split(" (")[0], b["n"], b["p_media"], b["frecuencia"]) for b in r["fiabilidad"]))
    w("\n== 4b. Backtest agregado (media ponderada por número de casos)")
    for sc, ts in (("encuestas", ["2016", "2019a", "2019n", "2023"]), ("base", ["2019a", "2023"]),
                   ("base", ["2016", "2019a", "2019n", "2023"])):
        E = [J["backtest"]["elecciones"][t][sc] for t in ts]
        w("-- %s, elecciones %s" % (sc, "+".join(ts)))
        for j in range(len(E[0])):
            lab = E[0][j]["ajuste"]
            if "ajustada sin" in lab:
                lab = lab.split(" ajustada sin")[0] + " ajustada dejando fuera la elección"
            nd = sum(e[j]["n_disputados"] for e in E)
            bd = sum(e[j]["brier_disputados"] * e[j]["n_disputados"] for e in E) / nd
            bins = {}
            for e in E:
                for b in e[j]["fiabilidad"]:
                    x = bins.setdefault(b["tramo"].split(" (")[0], [0, 0.0, 0.0])
                    x[0] += b["n"]
                    x[1] += b["p_media"] * b["n"]
                    x[2] += b["frecuencia"] * b["n"]
            w("   %-38s Brier disp. %.4f (n=%d) | " % (lab, bd, nd) + " | ".join(
                "%s: n=%d p=%.2f obs=%.2f" % (k, v[0], v[1] / v[0], v[2] / v[0]) for k, v in bins.items()))
    with open(os.path.join(OUT, "calibracion.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")
    print("\n".join(L))


if __name__ == "__main__":
    try:
        main(quick="--quick" in sys.argv)
    except DataError as e:
        sys.exit("CALIBRATION FAILED: %s" % e)
