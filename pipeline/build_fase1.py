#!/usr/bin/env python3
"""Construye data/fase1/fase1.json (paso 1 · Coincide) a partir de:

  data/fase1/preguntas.json          30 afirmaciones (con su origen real)
  data/fase1/codificacion_g*.json    posiciones por partido (codificador)
  data/fase1/verificacion_g*.json    verificación independiente; solo se usan grupos con "aprobado": true

Comprobaciones (si falla alguna, termina con error y no se publica nada):
  * cada posición con fuente "programa" cita texto LITERAL del programa oficial del partido
    (misma normalización que verify_quotes.py);
  * cada posición con fuente "campaña" tiene URL y fecha igual o posterior al 2026-10-06 (convocatoria);
  * valores en {-2..2} o null; afirmaciones y partidos conocidos.

Uso: python3 -I pipeline/build_fase1.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from verify_quotes import norm  # noqa: E402

D = ROOT / "data"
CONVOCATORIA = "2026-10-06"


def main():
    preguntas = json.loads((D / "fase1" / "preguntas.json").read_text())["preguntas"]
    qids = {q["id"] for q in preguntas}
    partidos = {p["id"]: p for p in json.loads((D / "partidos" / "partidos.json").read_text())["partidos"]}
    textos = {}
    for pid, p in partidos.items():
        t = (p.get("programa") or {}).get("texto")
        if t and (ROOT / t).exists():
            textos[pid] = norm((ROOT / t).read_text(errors="replace"))

    posiciones = {}
    errores = []
    grupos = sorted((D / "fase1").glob("codificacion_g*.json"))
    usados = []
    for g in grupos:
        ver = g.with_name(g.name.replace("codificacion", "verificacion"))
        if not ver.exists() or not json.loads(ver.read_text()).get("aprobado"):
            print(f"(omitido, sin verificación aprobada) {g.name}")
            continue
        usados.append(g.name)
        cod = json.loads(g.read_text())["posiciones"]
        for pid, qs in cod.items():
            if pid not in partidos:
                errores.append(f"{g.name}: partido desconocido {pid}")
                continue
            out = posiciones.setdefault(pid, {})
            for qid, c in qs.items():
                if qid not in qids:
                    continue
                v = c.get("valor")
                if v not in (-2, -1, 0, 1, 2, None):
                    errores.append(f"{pid}/{qid}: valor inválido {v}")
                    continue
                if v is None:
                    out[qid] = {"valor": None}
                    continue
                f = c.get("fuente")
                if f == "programa":
                    if pid not in textos:
                        errores.append(f"{pid}/{qid}: fuente programa pero el partido no tiene programa catalogado")
                        continue
                    partes = [x for x in re.split(r"\s*(?:\[\.\.\.\]|\(\.\.\.\)|\.\.\.)\s*", c.get("cita") or "") if x.strip()]
                    if not partes or not all(norm(x) in textos[pid] for x in partes):
                        errores.append(f"{pid}/{qid}: cita de programa no literal: {(c.get('cita') or '')[:90]}")
                        continue
                elif f == "campaña":
                    if not c.get("url") or not (c.get("fecha") or "") >= CONVOCATORIA:
                        errores.append(f"{pid}/{qid}: fuente de campaña sin URL o anterior a la convocatoria ({c.get('fecha')})")
                        continue
                else:
                    errores.append(f"{pid}/{qid}: fuente desconocida {f}")
                    continue
                out[qid] = {k: c.get(k) for k in ("valor", "fuente", "cita", "pagina", "url", "medio", "fecha", "nota")}
                if f == "programa" and not out[qid]["url"]:
                    out[qid]["url"] = partidos[pid]["programa"].get("url")

    if errores:
        print("\n".join(errores))
        sys.exit(1)

    pub = [{k: q.get(k) for k in ("id", "tema", "texto", "contexto", "contexto_fuente", "origen")} for q in preguntas]
    fase1 = {"preguntas": pub, "posiciones": posiciones, "grupos": usados}
    (D / "fase1" / "fase1.json").write_text(json.dumps(fase1, ensure_ascii=False, indent=1))
    cob = {p: sum(1 for x in qs.values() if x["valor"] is not None) for p, qs in posiciones.items()}
    print(f"fase1: {len(pub)} afirmaciones; posiciones conocidas por partido: {cob}")


if __name__ == "__main__":
    main()
