#!/usr/bin/env python3
"""Comprueba que cada cita atribuida a un programa aparece LITERALMENTE en su texto.

Normaliza solo lo que introduce la extracción de PDF (espacios, saltos de línea, guiones de
partición de palabra, comillas tipográficas, ligaduras). Cualquier otra diferencia es un error.

Uso: python3 -I pipeline/verify_quotes.py [partido ...]
Recorre data/programas/<partido>/extraccion.json, posiciones*.json y evaluacion.json.
Sale con código 1 si alguna cita no se encuentra.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIDOS = ROOT / "data" / "partidos" / "partidos.json"


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = s.replace("­", "")  # guion blando
    s = re.sub(r"(\w)-\s*\n\s*(\w)", r"\1\2", s)  # partición de palabra a final de línea
    s = s.translate(str.maketrans({"“": '"', "”": '"', "«": '"', "»": '"', "‘": "'", "’": "'", "–": "-", "—": "-", "•": " ", "…": "..."}))
    s = re.sub(r"\s+", " ", s)
    return s.strip().lower()


def citas(obj, ruta=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == "cita" and isinstance(v, str) and v.strip():
                yield ruta, v
            else:
                yield from citas(v, f"{ruta}/{k}")
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from citas(v, f"{ruta}[{i}]")


def compromisos_con_fuente(obj):
    """Objetos con cita y fuente_local (compromisos y propuestas basadas en ellos)."""
    if isinstance(obj, dict):
        if isinstance(obj.get("cita"), str) and obj["cita"].strip() and "fuente_local" in obj:
            yield obj
        for v in obj.values():
            yield from compromisos_con_fuente(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from compromisos_con_fuente(v)


def main(args):
    partidos = json.loads(PARTIDOS.read_text())["partidos"]
    fallos = total = 0
    for p in partidos:
        pid = p["id"]
        if args and pid not in args:
            continue
        # Compromisos de líderes (partidos sin programa): cada cita contra la copia local de su fuente.
        dc = ROOT / "data" / "programas" / pid / "compromisos"
        for f in sorted(dc.glob("*.json")) if dc.exists() else []:
            for it in compromisos_con_fuente(json.loads(f.read_text())):
                total += 1
                fl = it.get("fuente_local")
                texto_c = norm((ROOT / fl).read_text(errors="replace")) if fl and (ROOT / fl).exists() else ""
                partes = [x for x in re.split(r"\s*(?:\[\.\.\.\]|\(\.\.\.\)|\.\.\.)\s*", it["cita"]) if x.strip()]
                if not texto_c or not all(norm(x) in texto_c for x in partes):
                    fallos += 1
                    print(f"NO ENCONTRADA {pid} compromisos/{f.name} {it.get('id')}: {it['cita'][:120]} (fuente: {fl})")
        txt = (p.get("programa") or {}).get("texto")
        d = ROOT / "data" / "programas" / pid
        if not txt or not d.exists():
            continue
        texto = norm((ROOT / txt).read_text(errors="replace"))
        for f in sorted(d.glob("*.json")):
            for ruta, c in citas(json.loads(f.read_text())):
                total += 1
                partes = [x for x in re.split(r"\s*(?:\[\.\.\.\]|\(\.\.\.\)|\.\.\.)\s*", c) if x.strip()]
                if not all(norm(x) in texto for x in partes):
                    fallos += 1
                    print(f"NO ENCONTRADA {pid} {f.name}{ruta}: {c[:120]}")
    print(f"{total} citas comprobadas, {fallos} no encontradas")
    return 1 if fallos else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
