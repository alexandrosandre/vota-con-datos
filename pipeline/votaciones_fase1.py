#!/usr/bin/env python3
"""Lo que votó cada partido en el Congreso (XV Legislatura, 2023-2026) sobre las afirmaciones del paso 1.

Entradas:
  data/fase1/votaciones.json                 qué votaciones corresponden a cada afirmación (seleccionadas y
                                             verificadas a mano: objeto, qué significa votar «Sí», relación)
  data/fase1/diputados_partido.json          a qué partido de la web cuenta el voto de cada diputado
  data/sources/congreso/votaciones/...json   copia de cada votación tal como la publica el Congreso
                                             (https://www.congreso.es/es/opendata/votaciones)

Salida: el bloque «votaciones» que build_fase1.py publica en fase1.json, con el voto de cada partido
calculado aquí a partir del voto nominal de sus diputados (nunca escrito a mano).

Voto de un partido: el sentido que votan más de las tres cuartas partes de sus diputados que votan
(«Sí», «No», «Abstención»); si ninguno llega, «dividido». Los que no votan no cuentan. Después se traduce
a la afirmación: si votar «Sí» es votar a favor de lo que dice la afirmación, «Sí» = «a_favor»; si es
votar en contra (p. ej., una enmienda de devolución), «Sí» = «en_contra».
"""
import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
D = ROOT / "data"
UMBRAL = 0.75
SENTIDOS = {"a_favor", "en_contra"}
RELACIONES = {"misma", "parecida"}


def mapa_diputados():
    m = json.loads((D / "fase1" / "diputados_partido.json").read_text())
    return m["por_formacion_y_grupo"], m["por_diputado"]


def partido_de(dip, por_formacion_y_grupo, por_diputado, formacion):
    """Partido de la web al que cuenta el voto de un diputado (None si a ninguno).

    Primero, la asignación nominal (con fuente) de por_diputado; si no la hay, la regla por formación electoral y
    grupo en el momento de la votación («PP|GP» -> pp). Un diputado que deja el grupo de su formación (p. ej., pasa
    al Mixto tras salir del partido) no cuenta para ella salvo asignación nominal."""
    nombre = dip["diputado"]
    if nombre in por_diputado:
        return por_diputado[nombre]["partido"]
    return por_formacion_y_grupo.get(f"{formacion.get(nombre)}|{dip['grupo']}")


def voto_partidos(raw, formacion, mapas):
    por = {}
    for v in raw["votaciones"]:
        p = partido_de(v, *mapas, formacion)
        if p:
            por.setdefault(p, Counter())[v["voto"]] += 1
    out = {}
    for p, c in por.items():
        validos = {k: n for k, n in c.items() if k in ("Sí", "No", "Abstención")}
        total = sum(validos.values())
        if not total:
            continue
        sentido, n = max(validos.items(), key=lambda x: x[1])
        out[p] = {"voto": sentido if n / total > UMBRAL else "dividido", "detalle": dict(validos)}
    return out


def construir(errores, fichero=None):
    f = Path(fichero) if fichero else D / "fase1" / "votaciones.json"
    if not f.exists():
        return {}
    if fichero is None:
        # Como las posiciones: solo se publica lo aprobado por una verificación independiente.
        ver = D / "fase1" / "verificacion_votaciones.json"
        if not ver.exists() or not json.loads(ver.read_text()).get("aprobado"):
            print("(omitidas, sin verificación aprobada) votaciones.json")
            return {}
    datos = json.loads(f.read_text())
    formacion = datos_formacion()
    mapas = mapa_diputados()
    out = {}
    for v in datos["votaciones"]:
        vid = v.get("id", "?")
        fich = ROOT / v["fichero"]
        if not fich.exists():
            errores.append(f"votación {vid}: falta la copia {v['fichero']}")
            continue
        raw = json.loads(fich.read_text())
        if v.get("si_significa") not in SENTIDOS or v.get("relacion") not in RELACIONES:
            errores.append(f"votación {vid}: si_significa/relacion inválidos")
            continue
        info = raw["informacion"]
        if v.get("expediente_contiene") and v["expediente_contiene"] not in (info.get("textoExpediente") or "") + " " + (info.get("titulo") or "") + " " + (info.get("textoSubGrupo") or ""):
            errores.append(f"votación {vid}: el expediente del Congreso no contiene «{v['expediente_contiene']}»")
            continue
        partidos = {}
        for p, r in voto_partidos(raw, formacion, mapas).items():
            voto = r["voto"]
            if voto == "Sí":
                s = v["si_significa"]
            elif voto == "No":
                s = "en_contra" if v["si_significa"] == "a_favor" else "a_favor"
            elif voto == "Abstención":
                s = "abstencion"
            else:
                s = "dividido"
            partidos[p] = {"sentido": s, "voto": voto, "detalle": r["detalle"]}
        d, m, a = info["fecha"].split("/")
        out.setdefault(v["pregunta"], []).append({
            "id": vid,
            "fecha": f"{a}-{int(m):02d}-{int(d):02d}",
            "objeto": v["objeto"],
            "relacion": v["relacion"],
            "nota": v.get("nota"),
            "url": v["url"],
            "ficha": v.get("ficha"),
            "expediente": info.get("textoExpediente"),
            "totales": raw.get("totales"),
            "partidos": partidos,
        })
    for qs in out.values():
        qs.sort(key=lambda x: x["fecha"], reverse=True)
    return out


def datos_formacion():
    """Nombre del diputado -> formación electoral, de la lista oficial de diputados de la XV (copia en el repositorio)."""
    out = {}
    for fn in ("DiputadosActivos.json", "DiputadosDeBaja.json"):
        p = D / "sources" / "congreso" / "diputados" / fn
        if p.exists():
            for x in json.loads(p.read_text()):
                out[x["NOMBRE"]] = x.get("FORMACIONELECTORAL")
    return out


if __name__ == "__main__":
    errs = []
    r = construir(errs, sys.argv[1] if len(sys.argv) > 1 else None)
    if errs:
        print("\n".join(errs))
        sys.exit(1)
    for q, vs in r.items():
        for v in vs:
            print(q, v["fecha"], v["objeto"][:60], {p: x["sentido"] for p, x in v["partidos"].items()})
