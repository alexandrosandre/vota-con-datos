#!/usr/bin/env python3
"""Candidates whose list position is in play in at least one scenario.

Inputs:
  web/public/data/fase2.json      circunscripciones, candidaturas and scenarios (shares per circunscripción)
  data/boe/listas_congreso.json   full BOE lists (pipeline/boe_listas.py)
  pipeline/dhondt.py              legal seat allocation (same call as pipeline/build_fase2.py)

Rule: a candidatura is relevant in its circunscripción if its estimated share is >= 1 % of valid
votes in ANY scenario. For it we list titulares 1..N, N = (max over scenarios of its central D'Hondt
seats) + 1, capped at the number of titulares (= seats). Central seats = dhondt(share * validos_ref,
seats, validos_ref) exactly as build_fase2.py computes the central scenario (no uncertainty band).

fase2 candidaturas are matched to BOE lists by position within the circunscripción (both come from
the same proclamation, in BOE order) and the match is checked on siglas, denominación and head of
list; any mismatch aborts.

Output: data/build/candidatos_relevantes.json
Run: python3 -I pipeline/candidatos_relevantes.py
"""
import datetime
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from dhondt import dhondt  # noqa: E402

FASE2 = ROOT / "web" / "public" / "data" / "fase2.json"
LISTAS = ROOT / "data" / "boe" / "listas_congreso.json"
OUT = ROOT / "data" / "build" / "candidatos_relevantes.json"
UMBRAL_CUOTA = 0.01


def main():
    f2 = json.loads(FASE2.read_text())
    listas = json.loads(LISTAS.read_text())
    escenarios = f2["escenarios"]
    personas, resumen, errores = [], [], []
    for c in f2["circunscripciones"]:
        ine = c["ine"]
        boe = listas["circunscripciones"][ine]["candidaturas"]
        if len(boe) != len(c["candidaturas"]):
            errores.append(f"{ine}: {len(c['candidaturas'])} candidaturas en fase2 vs {len(boe)} en BOE")
            continue
        for k, b in zip(c["candidaturas"], boe):
            cab = b["titulares"][0]["texto_boe"].split(". ", 1)[1][:-1]
            if (k["siglas"] != (b["siglas"] or b["denominacion"]) or k["denominacion"] != b["denominacion"]
                    or k["cabeza_lista"] != cab):
                errores.append(f"{ine}: fase2 {k['id']} no casa con BOE {b['encabezado_boe']}")
        if errores:
            continue
        cuota_max = {k["id"]: 0.0 for k in c["candidaturas"]}
        esc_max = {k["id"]: 0 for k in c["candidaturas"]}
        detalle = {k["id"]: {} for k in c["candidaturas"]}
        for e in escenarios:
            q = e["cuotas"][ine]
            ids = [k["id"] for k in c["candidaturas"] if k["id"] in q]
            v = [q[i] * c["validos_ref"] for i in ids]
            s = dhondt(v, c["escanos"], c["validos_ref"])
            if sum(s) != c["escanos"]:
                errores.append(f"{ine} {e['id']}: reparto de {sum(s)} escaños")
            for i, n in zip(ids, s):
                cuota_max[i] = max(cuota_max[i], q[i])
                esc_max[i] = max(esc_max[i], n)
                detalle[i][e["id"]] = {"cuota": round(q[i], 6), "escanos": n}
        for k, b in zip(c["candidaturas"], boe):
            if cuota_max[k["id"]] < UMBRAL_CUOTA:
                continue
            n = min(esc_max[k["id"]] + 1, len(b["titulares"]))
            resumen.append({"ine": ine, "circunscripcion": c["nombre"], "siglas": b["siglas"],
                            "denominacion": b["denominacion"], "id_fase2": k["id"], "orden_boe": b["orden_boe"],
                            "cuota_max": round(cuota_max[k["id"]], 6), "escanos_max": esc_max[k["id"]],
                            "puestos_listados": n, "por_escenario": detalle[k["id"]]})
            for p in b["titulares"][:n]:
                personas.append({"ine": ine, "circunscripcion": c["nombre"], "siglas": b["siglas"],
                                 "denominacion": b["denominacion"], "id_fase2": k["id"], "orden": p["orden"],
                                 "nombre": p["nombre"], "marca_boe": p["marca_boe"], "texto_boe": p["texto_boe"],
                                 "escanos_max_candidatura": esc_max[k["id"]]})
    if errores:
        for e in errores:
            print("ERROR", e)
        raise SystemExit(1)
    unicos = {(p["nombre"], p["texto_boe"]) for p in personas}
    out = {
        "meta": {
            "descripcion": ("Titulares en los puestos 1..(máximo de escaños centrales en cualquier escenario + 1) de cada "
                            "candidatura con al menos un 1 % de voto estimado en algún escenario de su circunscripción."),
            "generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
            "generated_by": "pipeline/candidatos_relevantes.py",
            "fase2_actualizado": f2["meta"].get("actualizado"),
            "escenarios": [e["id"] for e in escenarios],
            "umbral_cuota": UMBRAL_CUOTA,
            "fuente_listas": "data/boe/listas_congreso.json (BOE-A-2026-23103 con corrección BOE-A-2026-23383)",
            "notas": [
                "escanos_max = máximo, entre escenarios, de los escaños del reparto central (sin banda de incertidumbre).",
                "puestos_listados = escanos_max + 1, sin superar el número de titulares de la lista.",
                "La lista de escenarios depende de fase2.json; durante la veda (LOREG art. 69.7) puede contener solo el de 2023.",
            ],
            "n_candidaturas": len(resumen),
            "n_personas": len(personas),
            "n_nombres_distintos": len(unicos),
        },
        "candidaturas": resumen,
        "personas": personas,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
    print(f"escenarios: {out['meta']['escenarios']}")
    print(f"candidaturas relevantes: {len(resumen)}; personas (puestos): {len(personas)}; "
          f"nombres distintos: {len(unicos)}")


if __name__ == "__main__":
    main()
