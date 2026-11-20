#!/usr/bin/env python3
"""Descarga las votaciones del Pleno del Congreso de la XV Legislatura (datos abiertos oficiales,
https://www.congreso.es/es/opendata/votaciones) a una caché local, para buscar en ellas las votaciones
que corresponden a cada afirmación del paso 1 (data/fase1/votaciones.json).

  python3 -I pipeline/congreso_fetch.py <directorio_cache>

Deja en la caché un JSON por votación, tal como lo publica el Congreso (<fecha>/<fichero>.json), y un
índice (indice.jsonl) con fecha, sesión, número, título, expediente y totales. No toca el repositorio:
las votaciones que se citan se copian después a data/sources/congreso/ (pipeline/build_fase1.py las
comprueba contra esa copia).
"""
import json
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

BASE = "https://www.congreso.es"
LISTADO = (BASE + "/es/opendata/votaciones?p_p_id=votaciones&p_p_lifecycle=0&p_p_state=normal"
           "&p_p_mode=view&targetLegislatura=XV&targetDate={}")
UA = {"User-Agent": "Mozilla/5.0 (vota-con-datos; datos abiertos del Congreso)"}


def get(url, intentos=4):
    for i in range(intentos):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return r.read()
        except Exception:
            if i == intentos - 1:
                raise
            time.sleep(5 * (i + 1))


def fechas():
    html = get(LISTADO.format("12/03/2025")).decode("utf-8", "replace")
    return sorted(set(re.findall(r"\b(20(?:23|24|25|26)\d{4}),", html)))


def por_fecha(cache: Path, f: str):
    dd = f"{f[6:8]}/{f[4:6]}/{f[0:4]}"
    html = get(LISTADO.format(dd)).decode("utf-8", "replace")
    urls = sorted(set(re.findall(r"/webpublica/opendata/votaciones/Leg15/[^\"']+?\.json", html)))
    out = []
    for u in urls:
        dest = cache / f / u.rsplit("/", 2)[-2] / u.rsplit("/", 1)[-1]
        if not dest.exists():
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(get(BASE + u))
        try:
            d = json.loads(dest.read_text())
        except Exception:
            continue
        i = d.get("informacion", {})
        out.append({"fecha": f, "url": BASE + u, "fichero": str(dest.relative_to(cache)), "sesion": i.get("sesion"),
                    "numero": i.get("numeroVotacion"), "titulo": i.get("titulo"), "expediente": i.get("textoExpediente"),
                    "subgrupo": i.get("tituloSubGrupo"), "subtexto": i.get("textoSubGrupo"), "totales": d.get("totales")})
    return out


def main():
    cache = Path(sys.argv[1])
    cache.mkdir(parents=True, exist_ok=True)
    fs = fechas()
    print(f"{len(fs)} días con votaciones ({fs[0]}–{fs[-1]})", flush=True)
    filas = []
    with ThreadPoolExecutor(4) as ex:
        for r in ex.map(lambda f: por_fecha(cache, f), fs):
            filas += r
            print(f"{len(filas)} votaciones", flush=True)
    with open(cache / "indice.jsonl", "w") as fh:
        for x in sorted(filas, key=lambda x: (x["fecha"], x["sesion"] or 0, x["numero"] or 0)):
            fh.write(json.dumps(x, ensure_ascii=False) + "\n")
    print(f"índice: {len(filas)} votaciones en {cache / 'indice.jsonl'}")


if __name__ == "__main__":
    main()
