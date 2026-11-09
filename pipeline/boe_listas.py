#!/usr/bin/env python3
"""Full Congress lists (titulares and suplentes) of every proclaimed candidatura, 29-N-2026.

Inputs (raw BOE files in data/sources/boe/, never edited):
  BOE-A-2026-23103.xml  Candidaturas proclamadas (BOE 3-XI-2026)
  BOE-A-2026-23383.xml  Corrección de errores (BOE 7-XI-2026), applied as literal substitution
  BOE-A-2026-23103.pdf  same publication as PDF; only used for the spot-check (--spot-check)
  data/boe/candidaturas_congreso.json  output of pipeline/boe_parse.py (siglas/denominación
                        split, cabeza_lista and n_titulares used for cross-validation)

The XML is split by Junta, chamber and candidatura with the same functions as
pipeline/boe_parse.py (imported, not copied), the 7-XI correction is applied with the same
function, and every candidate line "N. Texto." is kept verbatim in texto_boe.

marca_boe: the BOE prints, after some names, a final parenthesis with the candidate's
affiliation ("(Independiente)", "(PP)", "(Izquierda Unida)"...). The same position is
sometimes used for a nickname ("José Luis Piñeiro García (Xosé Lois)."). Rule, applied
mechanically:
  * the final parenthesis is marca_boe if its text is "Independiente" or "Independent", or if
    at least two candidates (titulares + suplentes) of the same candidatura carry a final
    parenthesis (the list uses a marking scheme);
  * otherwise it stays in nombre and the case is listed in meta.parentesis_final_en_nombre.
Parentheses in the middle of a name ("Ignacio (Iñaki) Dubreuil Churruca") are always part of
nombre. texto_boe always keeps the full printed line.

Output: data/boe/listas_congreso.json

Run: python3 -I pipeline/boe_listas.py [--spot-check INE ...]
"""
import datetime
import json
import pathlib
import re
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
import boe_parse as bp  # noqa: E402

OUT = ROOT / "data" / "boe" / "listas_congreso.json"
CAND = ROOT / "data" / "boe" / "candidaturas_congreso.json"

LINE_RE = re.compile(r"^(\d+)\.\s+(.+)$")
FINAL_PAREN_RE = re.compile(r"^(.*\S)\s+\(([^()]+)\)\.$")
MARCA_SIEMPRE = {"Independiente", "Independent"}


def parse_blocks(lines):
    """Split one Junta's Congress paragraphs into candidatura blocks with raw lines."""
    blocks, cur = [], None
    for cls, text in lines:
        if cls == "centro_redonda":
            m = bp.HEAD_RE.match(text)
            if not m:
                raise SystemExit(f"cabecera sin número: {text}")
            cur = {"orden": int(m.group(1)), "encabezado_boe": text, "proclamada": True,
                   "titulares": [], "suplentes": [], "_mode": "titulares"}
            blocks.append(cur)
            continue
        if cur is None:
            raise SystemExit(f"texto antes de la primera candidatura: {text}")
        if text == "No proclamada.":
            cur["proclamada"] = False
        elif re.fullmatch(r"(?i)suplentes?:?", text):
            cur["_mode"] = "suplentes"
        elif re.fullmatch(r"(?i)titular(es)?:?", text):
            cur["_mode"] = "titulares"
        else:
            m = LINE_RE.match(text)
            if not m:
                raise SystemExit(f"línea no reconocida en '{cur['encabezado_boe']}': {text}")
            cur[cur["_mode"]].append((int(m.group(1)), m.group(2), text))
    return blocks


def build_people(block):
    """Return (titulares, suplentes, nickname_cases) for a candidatura block."""
    finals = {}
    for kind in ("titulares", "suplentes"):
        for n, body, _ in block[kind]:
            if not body.endswith("."):
                raise SystemExit(f"nombre sin punto final: {body!r} en {block['encabezado_boe']}")
            m = FINAL_PAREN_RE.match(body)
            if m:
                finals[(kind, n)] = (m.group(1), m.group(2))
    lista_marcada = len(finals) >= 2
    out, apodos = {}, []
    for kind in ("titulares", "suplentes"):
        nums = [n for n, _, _ in block[kind]]
        if nums != list(range(1, len(nums) + 1)):
            raise SystemExit(f"numeración no correlativa ({kind}) en {block['encabezado_boe']}: {nums}")
        people = []
        for n, body, raw in block[kind]:
            nombre, marca = body[:-1], None
            if (kind, n) in finals:
                base, par = finals[(kind, n)]
                if par in MARCA_SIEMPRE or lista_marcada:
                    nombre, marca = base, par
                else:
                    apodos.append({"tipo": kind, "orden": n, "texto_boe": raw})
            people.append({"orden": n, "nombre": nombre, "marca_boe": marca, "texto_boe": raw})
        out[kind] = people
    return out["titulares"], out["suplentes"], apodos


def build():
    _, ine_lookup = bp.load_ine()
    proc_root, paras = bp.load_paragraphs(bp.PROC_ID)
    juntas, order = bp.split_by_junta(paras, ine_lookup)
    corr_log, corr_meta = [], []
    for cid in bp.CORR_IDS:
        recs = bp.parse_corrections(cid, ine_lookup)
        corr_log += bp.apply_corrections(juntas, recs, cid)
        croot = bp.ET.parse(bp.SRC / f"{cid}.xml").getroot()
        corr_meta.append({**bp.xml_meta(croot), "url": bp.BOE_HTML.format(cid),
                          "fetched_at": bp.fetched_at(f"{cid}.xml"),
                          "sha256_xml": bp.sha256(bp.SRC / f"{cid}.xml")})
    cand = json.loads(CAND.read_text())
    errores, apodos_all, marcas = [], [], {}
    circs = {}
    for code in sorted(order):
        ref = cand["circunscripciones"][code]
        ref_by_orden = {c["orden"]: c for c in ref["candidaturas"]}
        noproc = {c["orden"] for c in ref["no_proclamadas"]}
        lists, no_proclamadas = [], []
        for b in parse_blocks(juntas[code]["congreso"]):
            if not b["proclamada"]:
                if b["titulares"] or b["suplentes"]:
                    errores.append(f"{code} 'No proclamada' con candidatos: {b['encabezado_boe']}")
                if b["orden"] not in noproc:
                    errores.append(f"{code} no proclamada no recogida en candidaturas_congreso: {b['encabezado_boe']}")
                no_proclamadas.append({"orden": b["orden"], "encabezado_boe": b["encabezado_boe"]})
                continue
            r = ref_by_orden.get(b["orden"])
            if r is None or r["encabezado_boe"] != b["encabezado_boe"]:
                errores.append(f"{code} candidatura {b['orden']} no coincide con candidaturas_congreso")
                continue
            tit, sup, apodos = build_people(b)
            for a in apodos:
                apodos_all.append({"ine": code, "candidatura": b["encabezado_boe"], **a})
            for p in tit + sup:
                if p["marca_boe"]:
                    marcas.setdefault(r["siglas"] or r["denominacion"], {}).setdefault(p["marca_boe"], 0)
                    marcas[r["siglas"] or r["denominacion"]][p["marca_boe"]] += 1
            # --- validation against boe_parse output and seats
            if len(tit) != r["n_titulares"]:
                errores.append(f"{code} {b['encabezado_boe']}: {len(tit)} titulares vs n_titulares {r['n_titulares']}")
            if len(tit) != ref["escanos"]:
                errores.append(f"{code} {b['encabezado_boe']}: {len(tit)} titulares vs {ref['escanos']} escaños")
            if len(sup) != r["n_suplentes"]:
                errores.append(f"{code} {b['encabezado_boe']}: {len(sup)} suplentes vs n_suplentes {r['n_suplentes']}")
            if tit[0]["texto_boe"].split(". ", 1)[1][:-1] != r["cabeza_lista"]:
                errores.append(f"{code} {b['encabezado_boe']}: cabeza {tit[0]['texto_boe']!r} vs {r['cabeza_lista']!r}")
            lists.append({
                "orden_boe": b["orden"],
                "siglas": r["siglas"],
                "denominacion": r["denominacion"],
                "encabezado_boe": b["encabezado_boe"],
                "titulares": tit,
                "suplentes": sup,
            })
        if len(lists) != len(ref["candidaturas"]):
            errores.append(f"{code}: {len(lists)} listas vs {len(ref['candidaturas'])} en candidaturas_congreso")
        circs[code] = {"nombre": ref["nombre"], "escanos": ref["escanos"], "junta_boe": ref["junta_boe"],
                       "candidaturas": lists, "no_proclamadas": no_proclamadas}
    if len(circs) != 52:
        errores.append(f"{len(circs)} circunscripciones")
    proc_meta = {**bp.xml_meta(proc_root), "url": bp.BOE_HTML.format(bp.PROC_ID),
                 "fetched_at": bp.fetched_at(f"{bp.PROC_ID}.xml"),
                 "sha256_xml": bp.sha256(bp.SRC / f"{bp.PROC_ID}.xml")}
    meta = {
        "descripcion": ("Listas completas (titulares y suplentes) de las candidaturas proclamadas al "
                        "Congreso, elecciones generales 29-XI-2026, tal como las publica el BOE, con la "
                        "corrección de errores del 7-XI-2026 aplicada."),
        "generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
        "generated_by": "pipeline/boe_listas.py",
        "fuentes": {"proclamacion": proc_meta, "correcciones": corr_meta},
        "notas": [
            "orden_boe = número de la candidatura en la publicación de su Junta Electoral Provincial; "
            "no es el orden de la papeleta.",
            "siglas y denominacion se toman de data/boe/candidaturas_congreso.json (misma publicación, "
            "mismo encabezado_boe); siglas = null cuando el BOE no las imprime.",
            "texto_boe = línea íntegra del BOE (número, nombre, paréntesis y punto final).",
            "nombre = texto sin el número, sin el punto final y sin marca_boe.",
            "marca_boe = paréntesis final que el BOE imprime tras el nombre (afiliación o "
            "'Independiente'). Regla: es marca si su texto es 'Independiente'/'Independent' o si al "
            "menos dos candidatos de la misma lista llevan paréntesis final; si no, se deja en nombre "
            "(posible apodo) y se lista en parentesis_final_en_nombre.",
            "En Tarragona (43), Comuns-Front Ampli, la corrección del 7-XI suprime el sufijo "
            "'(COMUNS-FRONT AMPLI)' de todos los nombres; por eso esa lista no tiene marca_boe.",
        ],
        "correcciones_aplicadas": [e for e in corr_log if e["camara"] == "congreso"],
        "parentesis_final_en_nombre": apodos_all,
        "marcas_por_candidatura": marcas,
        "n_circunscripciones": len(circs),
        "n_candidaturas": sum(len(c["candidaturas"]) for c in circs.values()),
        "n_titulares": sum(len(k["titulares"]) for c in circs.values() for k in c["candidaturas"]),
        "n_suplentes": sum(len(k["suplentes"]) for c in circs.values() for k in c["candidaturas"]),
    }
    return {"meta": meta, "circunscripciones": circs}, errores


# ---------------------------------------------------------------- spot check vs PDF


FURNITURE_RE = re.compile(
    r"BOLETÍN OFICIAL DEL ESTADO|Núm\. \d+ \w+ \d+ de noviembre de 2026 Sec\. III\. Pág\. \d+|"
    r"cve: BOE-A-2026-23103|Verificable en https://www\.boe\.es|"
    r"\b(?:Suplentes|Suplente|Titulares|Titular):")


def spot_check(data, codes):
    """Independent check against the PDF of the 3-XI publication (pdftotext -raw keeps the
    content-stream order). For each circunscripción, the Congress part of its Junta section is
    walked in order: every candidatura heading, every titular line and every suplente line (full texto_boe, with number) must appear in sequence, and whatever lies
    between consecutive matches must be only page furniture, a 'Suplentes:'/'Titular:' label or
    a repeated Junta heading — so an
    extra or missing person in either source is caught. Circunscripciones touched by the 7-XI
    correction differ from the PDF by design; choose others."""
    pdf = bp.SRC / f"{bp.PROC_ID}.pdf"
    with tempfile.TemporaryDirectory() as td:
        txt = pathlib.Path(td) / "p.txt"
        subprocess.run(["pdftotext", "-raw", str(pdf), str(txt)], check=True)
        flat = " ".join(txt.read_text().split())
    report = {}
    for code in codes:
        c = data["circunscripciones"][code]
        head = c["junta_boe"]
        start = flat.find(head + " ")
        nxt = [m.start() for m in re.finditer(r"JUNTA ELECTORAL (?:PROVINCIAL )?DE ", flat)
               if m.start() > start and not flat.startswith(head + " ", m.start())]
        seg = flat[start: nxt[0]] if nxt else flat[start:]
        a = seg.find("CONGRESO DE LOS DIPUTADOS")
        b = seg.find(" SENADO ", a)
        cong = seg[a + len("CONGRESO DE LOS DIPUTADOS"): b if b > 0 else len(seg)]
        seq = []
        for k in c["candidaturas"] + [{"encabezado_boe": x["encabezado_boe"], "titulares": [], "suplentes": [],
                                        "_np": True} for x in c["no_proclamadas"]]:
            seq.append(("cab", k["encabezado_boe"], k))
            if k.get("_np"):
                seq.append(("np", "No proclamada.", k))
            seq += [("tit", p["texto_boe"], k) for p in k["titulares"]]
            seq += [("sup", p["texto_boe"], k) for p in k["suplentes"]]
        # candidaturas appear in the PDF in orden_boe order (no proclamadas interleaved)
        seq_sorted = []
        for k in sorted({id(s[2]): s[2] for s in seq}.values(),
                        key=lambda k: int(k["encabezado_boe"].split(".")[0])):
            seq_sorted += [s for s in seq if s[2] is k]
        pos, n_ok, fallos, sobrante = 0, 0, [], []
        for kind, text, k in seq_sorted:
            i = cong.find(text, pos)
            if i < 0:
                fallos.append(f"{k['encabezado_boe']}: {text}")
                continue
            gap = FURNITURE_RE.sub(" ", cong[pos:i]).replace(head, " ").strip()
            if gap:
                sobrante.append(gap[:200])
            pos, n_ok = i + len(text), n_ok + 1
        tail = FURNITURE_RE.sub(" ", cong[pos:]).replace(head, " ").strip()
        if tail:
            sobrante.append("FINAL: " + tail[:200])
        report[code] = {"lineas_en_orden": n_ok, "lineas_esperadas": len(seq_sorted),
                        "no_encontradas": fallos, "texto_pdf_no_cubierto": sobrante}
    return report


def main(argv):
    data, errores = build()
    if "--spot-check" in argv:
        codes = argv[argv.index("--spot-check") + 1:]
        rep = spot_check(data, codes)
        print(json.dumps(rep, ensure_ascii=False, indent=1))
        return 0
    if errores:
        for e in errores:
            print("ERROR", e)
        raise SystemExit(f"{len(errores)} errores de validación; no se escribe {OUT}")
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n")
    m = data["meta"]
    print(f"{m['n_circunscripciones']} circunscripciones, {m['n_candidaturas']} candidaturas, "
          f"{m['n_titulares']} titulares, {m['n_suplentes']} suplentes")
    print("validación: titulares == escaños == n_titulares, suplentes == n_suplentes, cabeza == cabeza_lista: OK")
    for e in m["correcciones_aplicadas"]:
        print("corrección", e["ine"], e["aplicada"], "|", e["candidatura"])
    for a in m["parentesis_final_en_nombre"]:
        print("paréntesis final dejado en nombre:", a["ine"], a["texto_boe"])
    for s, d in m["marcas_por_candidatura"].items():
        print("marcas", s, d)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
