#!/usr/bin/env python3
"""Extract official Congress data for the 29-N-2026 general election from BOE XML.

Inputs (downloaded by pipeline/boe_fetch.py into data/sources/boe/, never edited):
  BOE-A-2026-20742.xml  Real Decreto 806/2026 (annex: Diputados per circunscripción)
  BOE-A-2026-23103.xml  Candidaturas proclamadas (BOE 3-XI-2026)
  BOE-A-2026-23383.xml  Corrección de errores de las candidaturas proclamadas (BOE 7-XI-2026)
  BOE-A-2026-22607.xml  Candidaturas presentadas (BOE 28-X-2026); only used to disambiguate
                        where siglas start in a proclaimed heading (see disambiguate_split)
  ine_cod_provincia.htm INE list of province codes (only used to attach INE codes)

Outputs:
  data/boe/circunscripciones.json
  data/boe/candidaturas_congreso.json

Every value in the outputs is taken programmatically from the BOE text. The only
hand-written input is the Spanish number-word table used to read the annex
("Treinta y ocho." -> 38).

Run: python3 -I pipeline/boe_parse.py
"""
import datetime
import hashlib
import html
import json
import pathlib
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "sources" / "boe"
OUT = ROOT / "data" / "boe"

RD_ID = "BOE-A-2026-20742"
PROC_ID = "BOE-A-2026-23103"
CORR_IDS = ["BOE-A-2026-23383"]
PRES_ID = "BOE-A-2026-22607"

BOE_HTML = "https://www.boe.es/diario_boe/txt.php?id={}"
BOE_XML = "https://www.boe.es/diario_boe/xml.php?id={}"


# --------------------------------------------------------------------------- utils


def norm_space(s):
    return " ".join(s.split())


def ptext(p):
    return norm_space("".join(p.itertext()))


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def name_keys(name):
    """Normalised lookup keys for a province name ('Coruña (A).' -> {'a coruna'})."""
    s = strip_accents(name).lower().strip().rstrip(".").strip()
    keys = set()
    for alt in s.split("/"):
        alt = alt.strip()
        m = re.fullmatch(r"(.+?)\s*\((\w+)\)", alt) or re.fullmatch(r"(.+?),\s*(\w+)", alt)
        if m:
            alt = f"{m.group(2)} {m.group(1)}"
        keys.add(norm_space(alt))
    return keys


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def xml_meta(root):
    md = root.find("metadatos")
    return {
        "boe_id": md.findtext("identificador"),
        "titulo": md.findtext("titulo"),
        "fecha_publicacion": md.findtext("fecha_publicacion"),
        "diario_numero": md.findtext("diario_numero"),
        "pagina_inicial": md.findtext("pagina_inicial"),
        "pagina_final": md.findtext("pagina_final"),
        "url_pdf": md.findtext("url_pdf"),
        "fecha_actualizacion_xml": root.get("fecha_actualizacion"),
    }


def fetched_at(fname):
    """Last successful fetch timestamp for a raw file, from fetch_log.jsonl."""
    last = None
    for line in (SRC / "fetch_log.jsonl").read_text().splitlines():
        e = json.loads(line)
        if e.get("file", "").endswith("/" + fname) and "sha256" in e:
            last = e
    if last is None:
        raise SystemExit(f"no fetch log entry for {fname}")
    if last["sha256"] != sha256(SRC / fname):
        raise SystemExit(f"{fname} changed since it was fetched")
    return last["fetched_at"]


# ------------------------------------------------------------------ number words

UNITS = {
    "uno": 1, "un": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6,
    "siete": 7, "ocho": 8, "nueve": 9, "diez": 10, "once": 11, "doce": 12,
    "trece": 13, "catorce": 14, "quince": 15, "dieciseis": 16, "diecisiete": 17,
    "dieciocho": 18, "diecinueve": 19, "veinte": 20, "veintiuno": 21, "veintidos": 22,
    "veintitres": 23, "veinticuatro": 24, "veinticinco": 25, "veintiseis": 26,
    "veintisiete": 27, "veintiocho": 28, "veintinueve": 29,
}
TENS = {"treinta": 30, "cuarenta": 40, "cincuenta": 50}


def words_to_int(text):
    s = strip_accents(text).lower().strip().rstrip(".").strip()
    if s in UNITS:
        return UNITS[s]
    if s in TENS:
        return TENS[s]
    m = re.fullmatch(r"(\w+) y (\w+)", s)
    if m and m.group(1) in TENS and m.group(2) in UNITS and UNITS[m.group(2)] < 10:
        return TENS[m.group(1)] + UNITS[m.group(2)]
    raise ValueError(f"cannot read number words: {text!r}")


# ------------------------------------------------------------------------- INE


def load_ine():
    raw = (SRC / "ine_cod_provincia.htm").read_bytes().decode("latin-1")
    table = {}
    for row in re.findall(r"<tr[^>]*>(.*?)</tr>", raw, re.S):
        cells = [norm_space(html.unescape(re.sub(r"<[^>]+>", "", c)))
                 for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)]
        if len(cells) == 2 and re.fullmatch(r"\d\d", cells[0]):
            table[cells[0]] = cells[1]
    if len(table) != 52:
        raise SystemExit(f"INE table has {len(table)} provinces, expected 52")
    lookup = {}
    for code, lit in table.items():
        for k in name_keys(lit):
            if k in lookup and lookup[k] != code:
                raise SystemExit(f"ambiguous INE key {k}")
            lookup[k] = code
    return table, lookup


def ine_code(name, lookup):
    hits = {lookup[k] for k in name_keys(name) if k in lookup}
    if len(hits) != 1:
        raise SystemExit(f"cannot map {name!r} to an INE code (hits={hits})")
    return hits.pop()


# ------------------------------------------------------------------- 1. annex


def parse_annex(ine_lookup):
    path = SRC / f"{RD_ID}.xml"
    root = ET.parse(path).getroot()
    rows = []
    for tr in root.find("texto").iter("tr"):
        tds = [ptext(td) for td in tr.findall("td")]
        if not tds:
            continue
        if len(tds) != 2:
            raise SystemExit(f"unexpected annex row {tds}")
        nombre_boe, dip = tds
        rows.append({
            "ine": ine_code(nombre_boe, ine_lookup),
            "nombre": nombre_boe.rstrip("."),
            "nombre_boe": nombre_boe,
            "escanos": words_to_int(dip),
            "escanos_texto_boe": dip,
        })
    meta = xml_meta(root)
    meta.update({
        "url": BOE_HTML.format(RD_ID),
        "url_xml": BOE_XML.format(RD_ID),
        "fetched_at": fetched_at(f"{RD_ID}.xml"),
        "sha256_xml": sha256(path),
        "fuente": "Real Decreto 806/2026, art. 3.1 y anexo",
    })
    return rows, meta


# ------------------------------------------------- 2. candidaturas proclamadas

JUNTA_RE = re.compile(r"^JUNTA ELECTORAL (?:PROVINCIAL )?DE (.+)$")


def split_by_junta(paragraphs, ine_lookup):
    """Return {ine: {"junta": name, "preambulo": [...], "congreso": [(cls, text)], ...}}"""
    juntas = {}
    order = []
    cur = None
    section = None
    for cls, text in paragraphs:
        m = JUNTA_RE.match(text) if cls == "centro_negrita" else None
        if m:
            code = ine_code(m.group(1), ine_lookup)
            if cur is None or code != cur["ine"]:
                if code in juntas:
                    raise SystemExit(f"junta {code} appears twice non-contiguously")
                cur = {"ine": code, "junta": text, "preambulo": [], "congreso": [],
                       "n_congreso_headings": 0}
                juntas[code] = cur
                order.append(code)
                section = "preambulo"
            # repeated heading of the same junta: keep current section
            continue
        if cur is None:
            raise SystemExit(f"text before first junta: {text[:80]}")
        if cls == "centro_negrita" and text.startswith("Circunscripción electoral:"):
            section = "senado"
            continue
        if cls == "centro_cursiva":
            if text == "CONGRESO DE LOS DIPUTADOS":
                section = "congreso"
                cur["n_congreso_headings"] += 1
                continue
            if text == "SENADO":
                section = "senado"
                continue
            raise SystemExit(f"unexpected chamber heading {text!r}")
        if section == "preambulo":
            cur["preambulo"].append(text)
        elif section == "congreso":
            cur["congreso"].append((cls, text))
        elif section == "senado":
            pass
        else:
            raise SystemExit(f"text outside any section: {text[:80]}")
    return juntas, order


def load_paragraphs(boe_id):
    root = ET.parse(SRC / f"{boe_id}.xml").getroot()
    return root, [(p.get("class"), ptext(p)) for p in root.find("texto")]


# ---------------------------------------------------- 3. corrección de errores


def parse_corrections(boe_id, ine_lookup):
    """Return list of {ine, camara, candidatura, donde_dice:[...], debe_decir:[...]}"""
    _, paras = load_paragraphs(boe_id)
    recs = []
    ine = camara = cand = None
    mode = None
    cur = None
    for cls, text in paras:
        m = JUNTA_RE.match(text) if cls == "centro_negrita" else None
        if m:
            ine, camara, cand, mode = ine_code(m.group(1), ine_lookup), None, None, None
            continue
        if cls == "centro_cursiva":
            camara = {"CONGRESO DE LOS DIPUTADOS": "congreso", "SENADO": "senado"}[text]
            cand, mode = None, None
            continue
        if text.startswith("En la candidatura"):
            cand, mode = None, "cand"
            continue
        if text == "Donde dice:":
            cur = {"ine": ine, "camara": camara, "candidatura": cand,
                   "donde_dice": [], "debe_decir": []}
            recs.append(cur)
            mode = "donde"
            continue
        if text == "Debe decir:":
            mode = "debe"
            continue
        if mode == "cand" and cls == "centro_redonda":
            cand = text
            continue
        if mode in ("donde", "debe"):
            key = "donde_dice" if mode == "donde" else "debe_decir"
            cur[key].append((cls, text))
            continue
        if ine is None:
            continue  # introductory paragraph
        raise SystemExit(f"unparsed correction paragraph: {text[:100]}")
    # strip the « » quoting and the bracketing punctuation inside it
    for r in recs:
        for key in ("donde_dice", "debe_decir"):
            lines = r[key]
            if not lines:
                raise SystemExit(f"empty {key} in correction {r}")
            first_cls, first = lines[0]
            last_cls, last = lines[-1]
            if not first.startswith("«"):
                raise SystemExit(f"correction block not quoted: {first}")
            lines[0] = (first_cls, first[1:])
            last = lines[-1][1]
            if last.endswith("»."):
                last = last[:-2] + "."
            elif last.endswith("»"):
                last = last[:-1]
            else:
                raise SystemExit(f"correction block not closed: {last}")
            lines[-1] = (last_cls, last)
    return recs


def apply_corrections(juntas, recs, corr_id):
    """Apply Congress corrections as verbatim text substitutions; return a log."""
    log = []
    for r in recs:
        entry = {
            "boe_id": corr_id, "ine": r["ine"], "camara": r["camara"],
            "candidatura": r["candidatura"],
            "donde_dice": [t for _, t in r["donde_dice"]],
            "debe_decir": [t for _, t in r["debe_decir"]],
        }
        if r["camara"] != "congreso":
            entry["aplicada"] = "no (Senado, fuera de alcance)"
            log.append(entry)
            continue
        lines = juntas[r["ine"]]["congreso"]
        old = [t for _, t in r["donde_dice"]]
        # restrict the search to the block of the named candidatura when given
        lo, hi = 0, len(lines)
        if r["candidatura"]:
            starts = [i for i, (c, t) in enumerate(lines)
                      if c == "centro_redonda" and t == r["candidatura"]]
            if len(starts) != 1:
                raise SystemExit(f"correction candidatura not found once: {r['candidatura']}")
            lo = starts[0]
            hi = next((i for i in range(lo + 1, len(lines)) if lines[i][0] == "centro_redonda"),
                      len(lines))
        hits = [i for i in range(lo, hi - len(old) + 1)
                if [t for _, t in lines[i:i + len(old)]] == old]
        if len(hits) == 1:
            i = hits[0]
            lines[i:i + len(old)] = list(r["debe_decir"])
            entry["aplicada"] = "si"
        elif len(hits) == 0:
            entry["aplicada"] = "no: el texto 'Donde dice' no aparece literalmente en la publicación original"
        else:
            raise SystemExit(f"correction matches several places: {old}")
        log.append(entry)
    return log


# ------------------------------------------------------- 4. candidatura parsing

HEAD_RE = re.compile(r"^(\d+)\.\s+(.+)$")
CAND_RE = re.compile(r"^(\d+)\.\s+(.+)$")


def split_heading(heading):
    """'PARTIDO POPULAR (PP)' -> ('PARTIDO POPULAR', 'PP', ambiguous?, method)."""
    pairs = {")": "(", "]": "["}
    if not heading or heading[-1] not in pairs:
        return heading, None, True, "sin paréntesis final"
    close, open_ = heading[-1], pairs[heading[-1]]
    depth = 0
    for i in range(len(heading) - 1, -1, -1):
        ch = heading[i]
        if ch == close:
            depth += 1
        elif ch == open_:
            depth -= 1
            if depth == 0:
                den = heading[:i].strip()
                sig = heading[i + 1:-1].strip()
                why = []
                if any(c in den for c in "()[]"):
                    why.append("denominación con paréntesis")
                if "," in sig:
                    why.append("siglas con comas (posible lista de integrantes)")
                return den, sig, bool(why), "paréntesis final" + (f" ({'; '.join(why)})" if why else "")
    return heading, None, True, "paréntesis desequilibrados"


def disambiguate_split(heading, presented_headings):
    """For a heading whose mechanical split is ambiguous, look for the same candidatura
    in the 'candidaturas presentadas' BOE text of the same Junta. If that publication
    wrapped the siglas in square brackets ('X (PSOE) [PSE-EE (PSOE)]') and the proclaimed
    heading is exactly that text with the brackets replaced by a space ('X (PSOE) PSE-EE
    (PSOE)'), the bracketed text is the siglas."""
    for ph in presented_headings:
        ph = HEAD_RE.match(ph).group(2)
        m = re.fullmatch(r"(.*\S)\s*\[([^\[\]]+)\]", ph)
        if m and heading == f"{m.group(1)} {m.group(2)}":
            return m.group(1), m.group(2)
    return None


def parse_congreso(ine, lines, presented_headings=()):
    cands, no_proc, anomalies = [], [], []
    presented_by_orden = {}
    for h in presented_headings:
        n, rest = h.split(".", 1)
        presented_by_orden[int(n)] = h
    cur = None
    for cls, text in lines:
        if cls == "centro_redonda":
            m = HEAD_RE.match(text)
            if not m:
                anomalies.append(f"cabecera sin número: {text}")
                continue
            orden = int(m.group(1))
            den, sig, amb, metodo = split_heading(m.group(2))
            pres = presented_by_orden.get(orden)
            if amb:
                alt = disambiguate_split(m.group(2), presented_headings)
                if alt:
                    den, sig = alt
                    amb, metodo = False, f"corchetes en candidaturas presentadas ({PRES_ID})"
            cur = {"orden": orden, "encabezado_boe": text, "pres": pres, "denominacion": den, "siglas": sig,
                   "split": metodo, "ambiguo": amb, "titulares": [], "suplentes": [],
                   "proclamada": True, "_mode": "tit"}
            cands.append(cur)
            continue
        if cur is None:
            anomalies.append(f"texto antes de la primera candidatura: {text}")
            continue
        if text == "No proclamada.":
            cur["proclamada"] = False
            continue
        if re.fullmatch(r"(?i)suplentes?:?", text):
            cur["_mode"] = "sup"
            continue
        if re.fullmatch(r"(?i)titular(es)?:?", text):
            cur["_mode"] = "tit"
            continue
        m = CAND_RE.match(text)
        if m:
            (cur["titulares"] if cur["_mode"] == "tit" else cur["suplentes"]).append(
                (int(m.group(1)), m.group(2)))
            continue
        anomalies.append(f"línea no reconocida en '{cur['encabezado_boe']}': {text}")
    out = []
    for c in cands:
        for kind in ("titulares", "suplentes"):
            nums = [n for n, _ in c[kind]]
            if nums != list(range(1, len(nums) + 1)):
                anomalies.append(f"numeración no correlativa de {kind} en '{c['encabezado_boe']}': {nums}")
        if not c["proclamada"]:
            if c["titulares"]:
                anomalies.append(f"'No proclamada' con candidatos: {c['encabezado_boe']}")
            no_proc.append({"orden": c["orden"], "encabezado_boe": c["encabezado_boe"],
                            "denominacion": c["denominacion"], "siglas": c["siglas"]})
            continue
        if not c["titulares"]:
            anomalies.append(f"candidatura sin titulares: {c['encabezado_boe']}")
        cab = c["titulares"][0][1] if c["titulares"] else None
        if cab is not None and cab.endswith("."):
            cab = cab[:-1]
        out.append({
            "orden": c["orden"],
            "denominacion": c["denominacion"],
            "siglas": c["siglas"],
            "cabeza_lista": cab,
            "n_titulares": len(c["titulares"]),
            "n_suplentes": len(c["suplentes"]),
            "encabezado_boe": c["encabezado_boe"],
            "split_siglas": c["split"],
            "split_ambiguo": c["ambiguo"],
            "encabezado_en_presentadas_boe": c["pres"] if c["pres"] != c["encabezado_boe"] else None,
        })
    return out, no_proc, anomalies


# ------------------------------------------------------------------------- main


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ine_table, ine_lookup = load_ine()
    now = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")

    annex, rd_meta = parse_annex(ine_lookup)
    seats = {r["ine"]: r for r in annex}
    for r in annex:  # cross-check against INE literal
        r["nombre_ine"] = ine_table[r["ine"]]
    circ = {
        "meta": {**rd_meta, "generated_at": now, "generated_by": "pipeline/boe_parse.py",
                 "n_circunscripciones": len(annex),
                 "total_escanos": sum(r["escanos"] for r in annex),
                 "ine_codes_source": "https://www.ine.es/daco/daco42/codmun/cod_provincia.htm"},
        "circunscripciones": [
            {"ine": r["ine"], "nombre": r["nombre"], "escanos": r["escanos"],
             "nombre_boe": r["nombre_boe"], "escanos_texto_boe": r["escanos_texto_boe"],
             "nombre_ine": r["nombre_ine"]}
            for r in sorted(annex, key=lambda r: r["ine"])],
    }
    (OUT / "circunscripciones.json").write_text(json.dumps(circ, ensure_ascii=False, indent=2) + "\n")

    _, pres_paras = load_paragraphs(PRES_ID)
    pres_juntas, _ = split_by_junta(pres_paras, ine_lookup)
    pres_heads = {code: [t for c, t in j["congreso"] if c == "centro_redonda" and HEAD_RE.match(t)]
                  for code, j in pres_juntas.items()}
    proc_root, paras = load_paragraphs(PROC_ID)
    juntas, order = split_by_junta(paras, ine_lookup)
    corr_log = []
    corr_meta = []
    for cid in CORR_IDS:
        recs = parse_corrections(cid, ine_lookup)
        corr_log += apply_corrections(juntas, recs, cid)
        croot = ET.parse(SRC / f"{cid}.xml").getroot()
        corr_meta.append({**xml_meta(croot), "url": BOE_HTML.format(cid), "url_xml": BOE_XML.format(cid),
                          "fetched_at": fetched_at(f"{cid}.xml"), "sha256_xml": sha256(SRC / f"{cid}.xml")})

    proc_meta = {**xml_meta(proc_root), "url": BOE_HTML.format(PROC_ID), "url_xml": BOE_XML.format(PROC_ID),
                 "fetched_at": fetched_at(f"{PROC_ID}.xml"), "sha256_xml": sha256(SRC / f"{PROC_ID}.xml")}
    result = {
        "meta": {
            "descripcion": ("Candidaturas proclamadas al Congreso de los Diputados, elecciones generales "
                            "29-XI-2026 (RD 806/2026), tal como se publicaron en el BOE, con las "
                            "correcciones de errores publicadas en el BOE ya aplicadas."),
            "generated_at": now,
            "generated_by": "pipeline/boe_parse.py",
            "fuentes": {"escanos": rd_meta, "proclamacion": proc_meta, "correcciones": corr_meta,
                        "presentadas_solo_para_desambiguar_siglas": {
                            "boe_id": PRES_ID, "url": BOE_HTML.format(PRES_ID),
                            "fetched_at": fetched_at(f"{PRES_ID}.xml"),
                            "sha256_xml": sha256(SRC / f"{PRES_ID}.xml")}},
            "notas": [
                "orden = número con el que la candidatura aparece en la publicación de su Junta Electoral "
                "Provincial en el BOE; no es el orden de la papeleta.",
                "denominacion/siglas: el encabezado del BOE se divide por su último grupo entre paréntesis "
                "o corchetes; encabezado_boe conserva el texto íntegro.",
                "cabeza_lista: texto del candidato titular n.º 1 tal como lo publica el BOE (sin el número "
                "ni el punto final), incluida cualquier indicación entre paréntesis (p. ej. Independiente).",
                "Las candidaturas marcadas 'No proclamada.' en el BOE se listan en no_proclamadas y no "
                "en candidaturas.",
                "siglas = null cuando el BOE publica el encabezado sin siglas (p. ej. '6. VOX').",
                "encabezado_en_presentadas_boe: si no es null, el encabezado con el mismo número en "
                "la publicación de candidaturas presentadas (BOE-A-2026-22607) era distinto; solo informativo, "
                "manda la proclamación.",
                "split_ambiguo = true cuando la denominación resultante aún contiene paréntesis o las siglas "
                "contienen comas; revisar "
                "encabezado_boe antes de mapear a partidos.",
            ],
            "correcciones_aplicadas": corr_log,
        },
        "circunscripciones": {},
    }
    all_anom = {}
    for code in sorted(order):
        j = juntas[code]
        cands, no_proc, anomalies = parse_congreso(code, j["congreso"], pres_heads.get(code, []))
        if j["n_congreso_headings"] != 1:
            anomalies.append(f"{j['n_congreso_headings']} encabezados CONGRESO DE LOS DIPUTADOS")
        result["circunscripciones"][code] = {
            "nombre": seats[code]["nombre"],
            "escanos": seats[code]["escanos"],
            "junta_boe": j["junta"],
            "boe_id": PROC_ID,
            "boe_url": BOE_HTML.format(PROC_ID),
            "preambulo_boe": j["preambulo"],
            "candidaturas": cands,
            "no_proclamadas": no_proc,
            "anomalias_parseo": anomalies,
        }
        if anomalies:
            all_anom[code] = anomalies
    result["meta"]["n_circunscripciones"] = len(result["circunscripciones"])
    (OUT / "candidaturas_congreso.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")

    print(f"annex: {len(annex)} circunscripciones, {circ['meta']['total_escanos']} escaños")
    print(f"juntas en proclamación: {len(order)}")
    print(f"candidaturas proclamadas: {sum(len(c['candidaturas']) for c in result['circunscripciones'].values())}")
    print(f"no proclamadas: {sum(len(c['no_proclamadas']) for c in result['circunscripciones'].values())}")
    for e in corr_log:
        print("corrección", e["ine"], e["camara"], e["aplicada"], "|", e["candidatura"])
    for code, an in all_anom.items():
        for a in an:
            print("ANOMALÍA", code, a)
    for code, c in result["circunscripciones"].items():
        for k in c["candidaturas"] + c["no_proclamadas"]:
            if k.get("split_ambiguo") or k.get("siglas") is None:
                print("SPLIT?", code, k["encabezado_boe"])


if __name__ == "__main__":
    sys.exit(main())
