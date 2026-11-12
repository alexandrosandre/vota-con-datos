#!/usr/bin/env python3
"""Resultados oficiales de las elecciones al Parlamento de Andalucía del 17-may-2026, por provincia.

Fuente (oficial): Resolución de 2 de junio de 2026 de la Junta Electoral de Andalucía (LOREG art. 108.6),
BOJA núm. 108 de 8 de junio de 2026, texto núm. 7541. Se descarga el PDF si no está, se comprueba su
SHA-256 y se leen con `pdftotext -layout` el Cuadro I (resumen por circunscripción) y el Cuadro II
(formaciones con escaño, entre ellas Adelante Andalucía). Comprueba que las filas suman el TOTAL publicado.

Uso: python3 -I pipeline/results_andalucia.py
Escribe data/resultados/autonomicas_andalucia_2026.json (lo usa pipeline/build_fase2.py para dar a
Adelante Andalucía un perfil provincial en los escenarios de encuesta; ver docs/METODOLOGIA.md).
"""
import datetime
import hashlib
import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
URL = "https://www.juntadeandalucia.es/boja/2026/108/BOJA26-108-00091-7541-01_00338776.pdf"
PDF = ROOT / "data/sources/resultados/boja/BOJA26-108-00091-7541-01_00338776.pdf"
SHA256 = "402ca0c986268767ebcb9056c859850053fb6d1aa472b486cee5f02a7733ec6c"
OUT = ROOT / "data/resultados/autonomicas_andalucia_2026.json"

PROV = {"ALMERÍA": ("04", "Almería"), "CÁDIZ": ("11", "Cádiz"), "CÓRDOBA": ("14", "Córdoba"),
        "GRANADA": ("18", "Granada"), "HUELVA": ("21", "Huelva"), "JAÉN": ("23", "Jaén"),
        "MÁLAGA": ("29", "Málaga"), "SEVILLA": ("41", "Sevilla")}
# Columnas del Cuadro II, en el orden del BOJA (la cabecera ocupa varias líneas en el PDF).
CUADRO_II = [
    ("PP", "PARTIDO POPULAR"),
    ("PSOE-A", "PARTIDO SOCIALISTA OBRERO ESPAÑOL DE ANDALUCÍA"),
    ("VOX", "VOX"),
    ("ADELANTE ANDALUCÍA", "ADELANTE ANDALUCIA"),
    ("POR ANDALUCÍA", "POR ANDALUCIA-IZQUIERDA UNIDA-PODEMOS-MOVIMIENTO SUMAR-INICIATIVA DEL PUEBLO ANDALUZ-"
                      "VERDES EQUO-ALTERNATIVA REPUBLICANA-ALIANZA VERDE"),
]


def n(s):
    return int(s.replace(".", ""))


def filas(bloque, ncols):
    out = {}
    for line in bloque.splitlines():
        m = re.match(r"\s*(" + "|".join(list(PROV) + ["TOTAL"]) + r")\s+([\d.\s]+)$", line)
        if m:
            nums = [n(x) for x in m.group(2).split()]
            if len(nums) != ncols:
                sys.exit(f"{m.group(1)}: {len(nums)} columnas, esperaba {ncols}: {line!r}")
            out[m.group(1)] = nums
    if set(out) != set(PROV) | {"TOTAL"}:
        sys.exit(f"faltan filas: {set(PROV) | {'TOTAL'} - set(out)}")
    for j in range(ncols):
        if sum(out[p][j] for p in PROV) != out["TOTAL"][j]:
            sys.exit(f"columna {j}: la suma de provincias no coincide con el TOTAL")
    return out


def main():
    if not PDF.exists():
        PDF.parent.mkdir(parents=True, exist_ok=True)
        req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0 (compatible; vota-con-datos)"})
        PDF.write_bytes(urllib.request.urlopen(req, timeout=60).read())
    data = PDF.read_bytes()
    sha = hashlib.sha256(data).hexdigest()
    if sha != SHA256:
        sys.exit(f"SHA-256 distinto: {sha} (esperado {SHA256})")
    txt = subprocess.run(["pdftotext", "-layout", str(PDF), "-"], check=True, capture_output=True, text=True).stdout
    i1, i2, i3 = (txt.index(f"CUADRO {r}.") for r in ("I", "II", "III"))
    # La cabecera del Cuadro II ocupa varias líneas: se comprueba el orden de las columnas en la línea
    # donde aparecen juntas (PP, PSOE-A, Vox, Adelante) y que la última es Por Andalucía.
    cab = txt[i2:i3]
    linea = next((x for x in cab.splitlines() if "ADELANTE ANDALUCIA" in x), "")
    rot = ["PARTIDO POPULAR", "OBRERO ESPAÑOL DE", "VOX", "ADELANTE ANDALUCIA"]
    pos = [linea.find(r) for r in rot]
    if -1 in pos or pos != sorted(pos) or "POR ANDALUCIA-IZQUIERDA" not in cab:
        sys.exit(f"cabecera del Cuadro II inesperada: {pos}")
    c1 = filas(txt[i1:i2], 6)  # electores, votantes, válidos, a candidaturas, blanco, nulos
    c2 = filas(txt[i2:i3], 1 + 2 * len(CUADRO_II))  # escaños; (escaños, votos) por formación
    circ, avisos = {}, []
    for p, (ine, nombre) in PROV.items():
        el, vt, va, vc, bl, nu = c1[p]
        if va != vc + bl:
            sys.exit(f"{p}: Cuadro I incoherente (válidos != candidaturas + blanco)")
        if vt != va + nu:  # el BOJA transcribe las actas tal cual: Granada publica 3 votantes más que válidos + nulos
            avisos.append(f"{nombre}: votantes {vt} != válidos + nulos {va + nu} (dato publicado, se conserva)")
        r = c2[p]
        cands = [{"siglas": s, "denominacion": d, "escanos": r[1 + 2 * j], "votos": r[2 + 2 * j]}
                 for j, (s, d) in enumerate(CUADRO_II)]
        if sum(c["escanos"] for c in cands) != r[0] or sum(c["votos"] for c in cands) > vc:
            sys.exit(f"{p}: Cuadro II incoherente")
        circ[ine] = {"nombre": nombre, "electores": el, "votantes": vt, "validos": va, "votos_candidaturas": vc,
                     "blancos": bl, "nulos": nu, "escanos": r[0], "candidaturas": cands}
    out = {
        "meta": {
            "eleccion": "Elecciones al Parlamento de Andalucía, 17 de mayo de 2026 (8 circunscripciones provinciales)",
            "escrutinio": "definitivo: actas de proclamación de las Juntas Electorales Provinciales (incluye CERA)",
            "sources": [{
                "id": "boja_jea_andalucia_2026",
                "description": "Resolución de 2 de junio de 2026, de la Junta Electoral de Andalucía, de publicación de "
                               "los resultados generales y por circunscripciones (BOJA núm. 108, 8-jun-2026, texto 7541)",
                "url": URL, "file": str(PDF.relative_to(ROOT)), "sha256": sha, "bytes": len(data),
            }],
            "built_by": "pipeline/results_andalucia.py",
            "notes": ["Solo se extraen el Cuadro I y el Cuadro II (formaciones que obtuvieron escaño). "
                      "Las sumas por provincia coinciden con la fila TOTAL publicada."] + avisos,
            "generado": datetime.date.today().isoformat(),
        },
        "circunscripciones": circ,
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
    tot = c2["TOTAL"]
    print(f"OK {OUT.relative_to(ROOT)}: válidos {c1['TOTAL'][2]}; " +
          ", ".join(f"{s} {tot[2 + 2 * j]} ({tot[1 + 2 * j]} esc.)" for j, (s, _) in enumerate(CUADRO_II)))


if __name__ == "__main__":
    main()
