#!/usr/bin/env python3
"""Papeletas de cada partido (campo «papeletas» de data/partidos/partidos.json).

Los pasos 1 y 2 muestran partidos; el paso 3, papeletas (candidaturas del BOE). Algunos partidos
concurren en coalición en algunas provincias (el PP dentro de UPN-PP en Navarra, Podemos dentro de
UPC en Canarias...). Este script lo deja escrito, provincia a provincia, a partir de datos oficiales:

  data/boe/candidaturas_congreso.json  candidaturas proclamadas (BOE)
  data/mapeo/candidaturas_2026.json    partido principal ('partido') y socios ('afines') de cada una
  data/boe/coaliciones.json            pactos de coalición (JEC/JEP)

Cada papeleta: siglas y denominación del BOE, circunscripciones, «relacion» del partido con ella
(«propia»: es su candidatura; «coalicion»: concurre en una coalición con otro partido de la web;
«afin»: no se presenta, pero su partido afín sí, p. ej. el PSOE en Cataluña con el PSC), «con» (los
otros partidos de la web en esa papeleta) y la fuente del pacto si es coalición.

Uso: python3 -I pipeline/papeletas.py          (reescribe el campo)
     python3 -I pipeline/papeletas.py --check  (falla si el fichero no está al día)
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
D = ROOT / "data"
F = D / "partidos" / "partidos.json"


def regla(reglas, c):
    for r in reglas:
        if c["siglas"] is not None and c["siglas"] in r.get("siglas", []):
            return r
        if c["siglas"] is None and c["denominacion"] in r.get("denominacion", []):
            return r
    return None


def calcular():
    boe = json.loads((D / "boe" / "candidaturas_congreso.json").read_text())["circunscripciones"]
    reglas = json.loads((D / "mapeo" / "candidaturas_2026.json").read_text())["reglas"]
    coal = json.loads((D / "boe" / "coaliciones.json").read_text())
    out = {}
    for ine, x in sorted(boe.items()):
        for c in x["candidaturas"]:
            r = regla(reglas, c)
            if not r or not r.get("partido"):
                continue
            todos = [r["partido"]] + r.get("afines", [])
            k = coal.get(c["siglas"] or "") or {}
            es_coal = k.get("tipo") == "coalición" and len(k.get("miembros", [])) >= 2
            for pid in todos:
                principal = pid == r["partido"]
                con = [o for o in todos if o != pid]
                rel = ("coalicion" if (con and es_coal) else "propia") if principal else ("coalicion" if es_coal else "afin")
                clave = (c["siglas"] or c["denominacion"], rel)
                lst = out.setdefault(pid, {})
                if clave not in lst:
                    lst[clave] = {
                        "siglas": c["siglas"] or c["denominacion"],
                        "denominacion": c["denominacion"],
                        "relacion": rel,
                        "con": con,
                        "circunscripciones": [],
                        "pacto": ({"miembros": [m["nombre"] for m in k["miembros"]], "url": (k.get("fuente") or {}).get("url")}
                                  if es_coal else None),
                    }
                p = lst[clave]
                if c["denominacion"] != p["denominacion"] and c["denominacion"] not in p.get("otras_denominaciones", []):
                    p.setdefault("otras_denominaciones", []).append(c["denominacion"])
                p["circunscripciones"].append(x["nombre"])
    orden = {"propia": 0, "coalicion": 1, "afin": 2}
    return {pid: sorted(v.values(), key=lambda p: (orden[p["relacion"]], -len(p["circunscripciones"]), p["siglas"]))
            for pid, v in out.items()}


def main():
    s = F.read_text()
    d = json.loads(s)
    pap = calcular()
    cambia = False
    for p in d["partidos"]:
        nuevo = pap.get(p["id"], [])
        if p.get("papeletas") != nuevo:
            cambia = True
            p["papeletas"] = nuevo
    if "--check" in sys.argv:
        if cambia:
            sys.exit("data/partidos/partidos.json: «papeletas» no está al día (python3 -I pipeline/papeletas.py)")
        return
    F.write_text(json.dumps(d, ensure_ascii=False, indent=2))
    for p in d["partidos"]:
        print(p["id"], "; ".join(f"{x['siglas']} ({x['relacion']}, {len(x['circunscripciones'])})" for x in p["papeletas"]))


if __name__ == "__main__":
    main()
