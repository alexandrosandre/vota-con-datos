"""Build data/resultados/generales_2023.json and data/resultados/europeas_2024.json
from the official files downloaded by results_fetch.py.

Run from anywhere:  python3 -I -B pipeline/results_build.py

Generales 2023 (Congreso, escrutinio general incl. CERA):
  * censo / votantes / válidos / blancos / nulos and votes + seats per
    national grouping ("agrupación") come from the Ministerio del Interior
    file PROV_02_202307_1.xlsx (infoelectoral, results by circunscripción).
  * The Ministry file merges each provincial list into its national grouping
    (e.g. PSC under PSOE). The per-candidatura split, denominations and siglas
    come from the Junta Electoral Central resolution in the BOE
    (BOE-A-2023-18907, Cuadros II and III); Cuadro I (PDF) is used as a
    cross-check. Every BOE figure must equal the Ministry figure exactly
    (per circunscripción and agrupación), otherwise the build aborts.

Europeas 2024 (single national constituency, votes per province):
  * The Ministry's downloadable file for this election is per municipality and
    does NOT include CERA (residents abroad) votes. The JEC agreement in the BOE
    (BOE-A-2024-13092, corrected by BOE-A-2024-15344) gives per-province results
    from the provincial actas de escrutinio general, CERA included; it is the
    primary source here. The Ministry municipal file, aggregated by province,
    is used as a cross-check (BOE - Ministry must be >= 0 and bounded by the
    CERA voters of the province).

No figure is typed by hand: everything is read from the source files.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import results_boe as boe  # noqa: E402
from results_xlsx import read_xlsx_from_zip  # noqa: E402

ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "data", "sources", "resultados")
OUT = os.path.join(ROOT, "data", "resultados")

# Row labels in the BOE tables that are typographic errors in the BOE itself
# (visible in both the XML and the PDF). Mapped to the intended label.
KNOWN_BOE_LABEL_TYPOS = {"Ceuta.3": "Ceuta."}  # BOE-A-2024-13092, Cuadro II, 1st table

TOTAL_LABEL = "total estatal"


class BuildError(Exception):
    pass


def check(cond, msg):
    if not cond:
        raise BuildError(msg)


def manifest():
    with open(os.path.join(SRC, "manifest.json"), encoding="utf-8") as f:
        return json.load(f)["files"]


def src(path):
    return os.path.join(SRC, path)


# --------------------------------------------------------------------------- Ministry files

def ministry_prov_2023():
    member, sheets = read_xlsx_from_zip(src("infoelectoral/PROV_02_202307_1.zip"))
    rows = list(sheets.values())[0]
    check(str(rows[2][0]).startswith("Congreso | Julio 2023"), "unexpected title %r" % rows[2][:1])
    den, sig, lab = rows[3], rows[4], rows[5]
    lab = [boe.clean(x) if isinstance(x, str) else x for x in lab]
    fixed = {
        "comunidad": "Nombre de Comunidad", "codigo": "Código de Provincia", "nombre": "Nombre de Provincia",
        "poblacion": "Población", "mesas": "Número de mesas", "censo_cer": "Censo electoral sin CERA",
        "censo_cera": "Censo CERA", "censo": "Total censo electoral", "votantes_cer": "Total votantes CER",
        "votantes_cera": "Total votantes CERA", "votantes": "Total votantes", "validos": "Votos válidos",
        "votos_candidaturas": "Votos a candidaturas", "blancos": "Votos en blanco", "nulos": "Votos nulos",
    }
    idx = {}
    for k, label in fixed.items():
        check(lab.count(label) == 1, "column %r not found once" % label)
        idx[k] = lab.index(label)
    agr = []  # (votes_col, seats_col, denominacion, siglas)
    c = max(idx.values()) + 1
    while c < len(lab):
        check(lab[c] == "Votos" and lab[c + 1] == "Diputados", "bad agrupación columns at %d" % c)
        agr.append({"col_votos": c, "col_dip": c + 1, "denominacion": boe.clean(den[c]), "siglas": boe.clean(sig[c])})
        c += 2
    provs, national = {}, None
    for r in rows[6:]:
        if not r or all(v is None for v in r):
            continue
        r = r + [None] * (len(lab) - len(r))
        rec = {k: r[i] for k, i in idx.items()}
        rec["agr"] = [(r[a["col_votos"]] or 0, r[a["col_dip"]] or 0) for a in agr]
        if isinstance(rec["codigo"], int):
            code = "%02d" % rec["codigo"]
            check(code not in provs, "duplicate province %s" % code)
            provs[code] = rec
        elif rec["nombre"] == "España":
            national = rec
        else:
            raise BuildError("unexpected row %r" % r[:4])
    check(len(provs) == 52 and national is not None, "expected 52 provinces + España")
    return member, agr, provs, national


def ministry_muni_2024():
    member, sheets = read_xlsx_from_zip(src("infoelectoral/07_202406_1.zip"))
    rows = list(sheets.values())[0]
    check(str(rows[2][0]).startswith("Parlamento europeo | Junio 2024"), "unexpected title")
    den, lab = rows[4], [boe.clean(x) if isinstance(x, str) else x for x in rows[5]]
    fixed = {"codigo": "Código de Provincia", "nombre": "Nombre de Provincia", "muni": "Código de Municipio",
             "censo": "Total censo electoral", "votantes": "Total votantes", "validos": "Votos válidos",
             "votos_candidaturas": "Votos a candidaturas", "blancos": "Votos en blanco", "nulos": "Votos nulos"}
    idx = {}
    for k, label in fixed.items():
        check(lab.count(label) == 1, "column %r not found once" % label)
        idx[k] = lab.index(label)
    first = max(idx.values()) + 1
    parties = [{"col": c, "denominacion": boe.clean(den[c]), "siglas": boe.clean(lab[c])} for c in range(first, len(lab))]
    provs = {}
    nmun = 0
    for r in rows[6:]:
        if not r or all(v is None for v in r):
            continue
        check(isinstance(r[idx["codigo"]], int) and isinstance(r[idx["muni"]], int), "unexpected row %r" % r[:5])
        r = r + [None] * (len(lab) - len(r))
        nmun += 1
        code = "%02d" % r[idx["codigo"]]
        p = provs.setdefault(code, {"nombre": r[idx["nombre"]], "censo": 0, "votantes": 0, "validos": 0,
                                    "votos_candidaturas": 0, "blancos": 0, "nulos": 0,
                                    "partidos": [0] * len(parties)})
        check(p["nombre"] == r[idx["nombre"]], "province name changes within %s" % code)
        for k in ("censo", "votantes", "validos", "votos_candidaturas", "blancos", "nulos"):
            p[k] += r[idx[k]]
        for i, pa in enumerate(parties):
            p["partidos"][i] += r[pa["col"]] or 0
    check(len(provs) == 52, "expected 52 provinces, got %d" % len(provs))
    return member, parties, provs, nmun


# --------------------------------------------------------------------------- BOE helpers

def boe_tables(xml_name):
    summary, forms = boe.formations(src("boe/" + xml_name))
    fix = lambda n: KNOWN_BOE_LABEL_TYPOS.get(n, n)  # noqa: E731
    summary2 = {}
    for name, rec in summary.items():
        n = boe.norm_name(fix(name))
        for k, v in rec.items():
            if v is None:
                continue
            old = summary2.setdefault(n, {}).get(k)
            check(old is None or old == v, "inconsistent %s for %s" % (k, name))
            summary2[n][k] = v
    for f in forms:
        f["votos"] = {boe.norm_name(fix(k)): v for k, v in f["votos"].items()}
        f["escanos"] = {boe.norm_name(fix(k)): v for k, v in f["escanos"].items()}
    return summary2, forms


def province_key_map(ministry_names, boe_keys):
    """code -> normalised BOE label, matched by normalised name; must be a bijection."""
    m = {}
    keys = set(boe_keys) - {TOTAL_LABEL}
    check(len(keys) == 52, "BOE has %d province rows, expected 52: %r" % (len(keys), sorted(keys)))
    for code, name in ministry_names.items():
        n = boe.norm_name(name)
        check(n in keys, "province %s %r not found in BOE rows" % (code, name))
        m[code] = n
    check(len(set(m.values())) == 52, "province mapping not one-to-one")
    return m


def fmt_formation(f):
    """BOE header -> (denominacion, siglas)."""
    if len(f["header"]) >= 2:  # 2024 layout: [denominación, siglas]
        return boe.clean(f["header"][0]).rstrip("."), boe.clean(f["header"][1]) or None
    return boe.split_denominacion(f["header"][0])


# --------------------------------------------------------------------------- Generales 2023

def build_generales(man):
    member, agr, mp, mnat = ministry_prov_2023()
    summary, forms = boe_tables("BOE-A-2023-18907.xml")
    pk = province_key_map({c: r["nombre"] for c, r in mp.items()}, summary.keys())
    c1 = {boe.norm_name(k): v for k, v in boe.cuadro1_from_pdf(src("boe/BOE-A-2023-18907.pdf"), 2).items()}
    check(set(c1) == set(summary), "Cuadro I (PDF) rows differ from Cuadros II/III rows")

    # map each BOE formation to the Ministry agrupación column whose votes it equals
    # Map each BOE formation to the Ministry agrupación column with identical votes and
    # seats. Normally one column for all provinces; when the BOE groups lists that the
    # Ministry keeps apart (e.g. 'Asturias Existe-España Vaciada' inside 'España Vaciada'),
    # the mapping is made per province and recorded in split_mappings.
    def same(c, j, f):
        return mp[c]["agr"][j] == (f["votos"][pk[c]], f["escanos"].get(pk[c], 0))

    def pick(cands, f):
        if len(cands) > 1:  # disambiguate by name
            cands = [j for j in cands if boe.norm_party(agr[j]["denominacion"]) == boe.norm_party(fmt_formation(f)[0])]
        return cands

    mapping, split_mappings = [], []
    for f in forms:
        provs = [c for c in mp if pk[c] in f["votos"]]
        cands = pick([j for j in range(len(agr)) if all(same(c, j, f) for c in provs)], f)
        if len(cands) == 1:
            mapping.append({c: cands[0] for c in provs})
            continue
        per = {}
        for c in provs:
            cc = pick([j for j in range(len(agr)) if same(c, j, f)], f)
            check(len(cc) == 1, "formation %r prov %s maps to %r agrupación columns" % (f["header"], c, cc))
            per[c] = cc[0]
        mapping.append(per)
        split_mappings.append({"formacion_boe": fmt_formation(f)[0],
                               "agrupaciones_ministerio": {c: agr[j]["denominacion"] for c, j in sorted(per.items())}})

    # every Ministry cell must be fully explained by exactly the BOE formations mapped to it
    for c in mp:
        for j in range(len(agr)):
            hits = [f for f, m in zip(forms, mapping) if m.get(c) == j]
            v = sum(f["votos"][pk[c]] for f in hits)
            s = sum(f["escanos"].get(pk[c], 0) for f in hits)
            check((v, s) == tuple(mp[c]["agr"][j]), "prov %s agr %s: BOE %r vs Ministry %r"
                  % (c, agr[j]["siglas"], (v, s), mp[c]["agr"][j]))
            check(len(hits) <= 1, "prov %s: %d BOE formations in agrupación %s" % (c, len(hits), agr[j]["siglas"]))

    circ = {}
    for code in sorted(mp):
        r, k = mp[code], pk[code]
        # Ministry vs BOE Cuadro I (PDF)
        q = c1[k]
        for mk, bk in (("censo", "electores"), ("votantes", "votantes"), ("validos", "votos válidos"),
                       ("votos_candidaturas", "votos a candidaturas"), ("blancos", "votos en blanco"),
                       ("nulos", "votos nulos")):
            check(r[mk] == q[bk], "prov %s %s Ministry %r != BOE Cuadro I %r" % (code, mk, r[mk], q[bk]))
        cands = []
        for f, m in zip(forms, mapping):
            if k not in f["votos"]:
                continue
            j = m[code]
            den, sig = fmt_formation(f)
            cands.append({
                "codigo": None,
                "siglas": sig,
                "denominacion": den,
                "votos": f["votos"][k],
                "escanos": f["escanos"].get(k, 0),
                "agrupacion": {"siglas": agr[j]["siglas"], "denominacion": agr[j]["denominacion"]},
            })
        cands.sort(key=lambda x: (-x["votos"], x["denominacion"]))
        escanos = summary[k]["total_escanos"]
        check(escanos == sum(x["escanos"] for x in cands) == sum(s for _, s in r["agr"]),
              "prov %s seat totals disagree" % code)
        check(sum(x["votos"] for x in cands) == r["votos_candidaturas"], "prov %s candidate votes != votos a candidaturas" % code)
        check(r["validos"] == r["votos_candidaturas"] + r["blancos"], "prov %s validos != cand + blancos" % code)
        check(r["votantes"] == r["validos"] + r["nulos"], "prov %s votantes != validos + nulos" % code)
        circ[code] = {
            "nombre": r["nombre"],
            "comunidad": r["comunidad"],
            "escanos": escanos,
            "censo": r["censo"],
            "censo_cera": r["censo_cera"],
            "votantes": r["votantes"],
            "votantes_cera": r["votantes_cera"],
            "nulos": r["nulos"],
            "blancos": r["blancos"],
            "validos": r["validos"],
            "votos_candidaturas": r["votos_candidaturas"],
            "candidaturas": cands,
        }

    tot = summary[TOTAL_LABEL]
    official = {
        "fuente": "BOE-A-2023-18907 (Cuadro I PDF y fila 'Total estatal' de Cuadros II/III); coincide con la fila 'España' de PROV_02_202307_1.xlsx",
        "escanos": tot["total_escanos"],
        "censo": c1[TOTAL_LABEL]["electores"],
        "votantes": c1[TOTAL_LABEL]["votantes"],
        "validos": c1[TOTAL_LABEL]["votos válidos"],
        "votos_candidaturas": c1[TOTAL_LABEL]["votos a candidaturas"],
        "blancos": c1[TOTAL_LABEL]["votos en blanco"],
        "nulos": c1[TOTAL_LABEL]["votos nulos"],
        "formaciones": [{"siglas": fmt_formation(f)[1], "denominacion": fmt_formation(f)[0],
                         "votos": f["votos"][TOTAL_LABEL], "escanos": f["escanos"].get(TOTAL_LABEL, 0)} for f in forms],
        "ministerio_espana": {k: mnat[k] for k in ("censo", "votantes", "validos", "votos_candidaturas", "blancos", "nulos")},
        "ministerio_agrupaciones": [{"siglas": a["siglas"], "denominacion": a["denominacion"],
                                     "votos": mnat["agr"][j][0], "escanos": mnat["agr"][j][1]} for j, a in enumerate(agr)],
    }
    keys = ["infoelectoral_congreso_2023_prov", "boe_jec_generales_2023_xml", "boe_jec_generales_2023_pdf",
            "boe_jec_generales_2023_correccion"]
    meta = {
        "eleccion": "Elecciones generales 23 de julio de 2023 - Congreso de los Diputados",
        "tipo_proceso": "02", "fecha_proceso": "202307",
        "escrutinio": "definitivo (escrutinio general de las Juntas Electorales Provinciales, incluye voto CERA)",
        "sources": [dict(man[k], id=k) for k in keys],
        "xlsx_member": member,
        "built_by": "pipeline/results_build.py",
        "notes": [
            "censo/votantes/validos/blancos/nulos y votos+escaños por agrupación: Ministerio del Interior (PROV_02_202307_1.xlsx).",
            "Desglose por candidatura (p. ej. PSC separado de PSOE), denominación y siglas: Junta Electoral Central, BOE-A-2023-18907 Cuadros II y III. Todos los votos y escaños coinciden exactamente con el fichero del Ministerio.",
            "validos = votos a candidaturas + votos en blanco. censo incluye CERA (censo_cera); votantes incluye CERA (votantes_cera).",
            "codigo: los ficheros de texto de ancho fijo (con códigos de candidatura y de cabecera de agrupación) no son descargables sin navegador (infoelectoral está tras un desafío Cloudflare); los ficheros Excel usados no traen códigos, por eso codigo es null. Para agrupar por partido nacional use 'agrupacion' (agrupación nacional del Ministerio).",
            "La corrección BOE-A-2023-19537 solo afecta al Senado (Madrid); no altera datos del Congreso.",
            "Denominaciones a nivel de formación: ni el BOE ni el Excel del Ministerio distinguen las marcas regionales registradas en cada provincia (p. ej. las listas de Sumar en Cataluña, Galicia o Comunitat Valenciana aparecen como 'Sumar'). PSC sí aparece separado (agrupación PSOE).",
            "El BOE agrupa 'Asturias Existe-España Vaciada' (Asturias) dentro de 'España Vaciada'; el Ministerio la trata como agrupación propia (ver boe_vs_ministerio_agrupacion_distinta). Siglas del BOE 'EVR' para Entre Veïns Catalunya; el Ministerio usa 'EVC'.",
        ],
        "boe_vs_ministerio_agrupacion_distinta": split_mappings,
        "official_totals": official,
    }
    return {"meta": meta, "circunscripciones": circ}


# --------------------------------------------------------------------------- Europeas 2024

def build_europeas(man):
    member, parties, mp, nmun = ministry_muni_2024()
    summary, forms = boe_tables("BOE-A-2024-13092.xml")
    pk = province_key_map({c: r["nombre"] for c, r in mp.items()}, summary.keys())

    # map BOE formation -> Ministry party column by denominación, then siglas
    mapping = []
    for f in forms:
        den, sig = fmt_formation(f)
        c = [i for i, p in enumerate(parties) if boe.norm_party(p["denominacion"]) == boe.norm_party(den)]
        if len(c) != 1 and sig:
            c = [i for i, p in enumerate(parties) if boe.norm_party(p["siglas"]) == boe.norm_party(sig)]
        if len(c) != 1:  # data-driven: Ministry (no CERA) <= BOE (CERA) <= Ministry + CERA voters, in every province
            c = [i for i in range(len(parties))
                 if all(0 <= f["votos"][pk[code]] - mp[code]["partidos"][i]
                        <= summary[pk[code]]["votantes"] - mp[code]["votantes"] for code in mp)]
        check(len(c) == 1, "BOE formation %r: %d Ministry matches" % (f["header"], len(c)))
        mapping.append(c[0])
    check(sorted(mapping) == list(range(len(parties))), "BOE formations and Ministry parties are not one-to-one")

    circ = {}
    for code in sorted(mp):
        k, m = pk[code], mp[code]
        s = summary[k]
        cera_votantes = s["votantes"] - m["votantes"]
        check(cera_votantes >= 0, "prov %s BOE votantes < Ministry" % code)
        for kk, bk in (("censo", "electores"), ("blancos", "votos en blanco"), ("nulos", "votos nulos"),
                       ("validos", "votos válidos")):
            d = s[bk] - m[kk]
            check(d >= 0 and (kk == "censo" or d <= cera_votantes), "prov %s %s BOE-Ministry=%d" % (code, kk, d))
        cands = []
        for f, i in zip(forms, mapping):
            v = f["votos"].get(k)
            check(v is not None, "prov %s: no BOE votes for %r" % (code, f["header"]))
            d = v - m["partidos"][i]
            check(0 <= d <= cera_votantes, "prov %s %r BOE-Ministry=%d (CERA voters %d)" % (code, f["header"], d, cera_votantes))
            den, sig = fmt_formation(f)
            cands.append({"codigo": None, "siglas": sig or parties[i]["siglas"], "denominacion": den, "votos": v,
                          "votos_sin_cera": m["partidos"][i]})
        cands.sort(key=lambda x: (-x["votos"], x["denominacion"]))
        check(sum(x["votos"] for x in cands) == s["votos a candidaturas"], "prov %s candidate votes" % code)
        check(s["votos válidos"] == s["votos a candidaturas"] + s["votos en blanco"], "prov %s validos" % code)
        check(s["votantes"] == s["votos válidos"] + s["votos nulos"], "prov %s votantes" % code)
        circ[code] = {
            "nombre": m["nombre"],
            "censo": s["electores"],
            "votantes": s["votantes"],
            "nulos": s["votos nulos"],
            "blancos": s["votos en blanco"],
            "validos": s["votos válidos"],
            "votos_candidaturas": s["votos a candidaturas"],
            "sin_cera": {"censo": m["censo"], "votantes": m["votantes"], "nulos": m["nulos"],
                         "blancos": m["blancos"], "validos": m["validos"]},
            "candidaturas": cands,
        }

    # national totals as published, with the BOE-A-2024-15344 correction applied to the Total estatal row
    corr = open(src("boe/BOE-A-2024-15344.xml"), encoding="utf-8").read()
    tot = summary[TOTAL_LABEL]
    formaciones = []
    for f in forms:
        den, sig = fmt_formation(f)
        formaciones.append({"siglas": sig, "denominacion": den, "votos_boe_publicado": f["votos"][TOTAL_LABEL],
                            "escanos": f["escanos"].get(TOTAL_LABEL, 0)})
    official = {
        "fuente": "BOE-A-2024-13092 (Cuadro I y fila 'Total estatal' de Cuadros II/III), corregido por BOE-A-2024-15344",
        "censo": tot["electores"], "votantes": tot["votantes"], "validos": tot["votos válidos"],
        "votos_candidaturas": tot["votos a candidaturas"], "blancos": tot["votos en blanco"], "nulos": tot["votos nulos"],
        "escanos": tot["total_escanos"],
        "formaciones": formaciones,
        "correccion_BOE-A-2024-15344_texto": [boe.clean(p) for p in re.findall(r"<p class=\"parrafo[^\"]*\">(.*?)</p>", corr, re.S)],
    }
    keys = ["boe_jec_europeas_2024_xml", "boe_jec_europeas_2024_pdf", "boe_jec_europeas_2024_correccion",
            "infoelectoral_europeas_2024_muni"]
    meta = {
        "eleccion": "Elecciones al Parlamento Europeo 9 de junio de 2024 (circunscripción única; desglose por provincia)",
        "tipo_proceso": "07", "fecha_proceso": "202406",
        "escrutinio": "definitivo (actas de escrutinio general de las Juntas Electorales Provinciales, incluye voto CERA)",
        "sources": [dict(man[k], id=k) for k in keys],
        "xlsx_member": member,
        "ministerio_municipios_leidos": nmun,
        "built_by": "pipeline/results_build.py",
        "notes": [
            "Fuente principal: Junta Electoral Central, BOE-A-2024-13092 (votos por provincia con CERA). El fichero descargable del Ministerio (07_202406_1.xlsx) es por municipio y no incluye CERA; se usa como contraste y aparece como 'sin_cera' y 'votos_sin_cera'.",
            "No hay escaños por provincia (circunscripción única nacional de 61 escaños).",
            "codigo: null (los ficheros disponibles no traen códigos de candidatura).",
            "siglas de la Agrupación de electores 'SE ACABÓ LA FIESTA': el BOE no publica siglas; se usa el rótulo del fichero del Ministerio.",
            "La fila 'Total estatal' publicada en el BOE tenía errores en PSOE y JUNTS UE, corregidos por BOE-A-2024-15344; la suma por provincias coincide con los valores corregidos.",
        ],
        "official_totals": official,
    }
    return {"meta": meta, "circunscripciones": circ}


def main():
    man = manifest()
    os.makedirs(OUT, exist_ok=True)
    for name, fn in (("generales_2023.json", build_generales), ("europeas_2024.json", build_europeas)):
        data = fn(man)
        with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
            f.write("\n")
        print("wrote data/resultados/%s (%d circunscripciones)" % (name, len(data["circunscripciones"])))


if __name__ == "__main__":
    try:
        main()
    except BuildError as e:
        sys.exit("BUILD FAILED: %s" % e)
