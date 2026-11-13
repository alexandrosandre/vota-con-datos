#!/usr/bin/env python3
"""Genera los JSON que consume la web (web/public/data/) a partir de data/.

  partidos.json  catálogo + estado de cada programa + compromisos de campaña verificados
  fase1.json     preguntas y posiciones (data/fase1/), vacío hasta que haya programas suficientes
  fase2.json     ver pipeline/build_fase2.py
  fase3.json     evaluaciones revisadas (data/programas/<id>/evaluacion.json)

Uso: python3 -I pipeline/build_web.py
"""
import hashlib
import json
import subprocess
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
D = ROOT / "data"
OUT = ROOT / "web" / "public" / "data"
ALIAS_PROMESAS = {"coalicion_canaria": "cc"}
# Nombre corto para mostrar (las siglas exactas del BOE se conservan en "siglas_boe").
NOMBRE_CORTO = {
    "pp": "PP", "upn": "UPN-PP", "psoe": "PSOE", "psc": "PSC", "vox": "Vox", "frente_amplio": "Frente Amplio",
    "podemos": "Podemos", "compromis": "Compromís", "upc": "UPC", "ara_mes_fa": "Ara Més-Front Ampli", "erc": "ERC",
    "junts": "Junts", "eh_bildu": "EH Bildu", "pnv": "PNV", "bng": "BNG", "cc": "CC", "adelante_andalucia": "Adelante Andalucía",
    "salf": "SALF",
}


def load(p):
    return json.loads((D / p).read_text())


def write(name, obj):
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / name).write_text(json.dumps(obj, ensure_ascii=False, separators=(",", ":")))


def main():
    cat = load("partidos/partidos.json")
    prom = load("promesas/promesas.json")["partidos"]
    prom = {ALIAS_PROMESAS.get(k, k): v for k, v in prom.items()}
    comprobado = cat["meta"].get("checked_at") or cat["meta"].get("comprobado")

    partidos = []
    for p in cat["partidos"]:
        pr = p.get("programa") or {}
        pm = prom.get(p["id"], {})
        partidos.append({
            "id": p["id"],
            "nombre": p["nombre"],
            "siglas": NOMBRE_CORTO.get(p["id"], p["siglas"]),
            "siglas_boe": p["siglas"],
            "ambito": p["ambito"],
            "comunidades": p.get("comunidades") or [],
            "candidato": p.get("candidato"),
            "web": p.get("web"),
            "en_congreso_xv": p.get("en_congreso_xv"),
            "programa": {
                "estado": pr.get("estado"),
                "url": pr.get("url"),
                "fecha": pr.get("fecha"),
                "paginas": pr.get("paginas"),
                "sha256": pr.get("sha256"),
                "comprobado": pr.get("comprobado") or pr.get("checked_at") or comprobado,
            },
            "promesas": [
                {"texto": x["texto"], "tipo": x["tipo"], "area": x["area"], "fecha": x.get("fecha"), "quien": x.get("quien"),
                 "fuentes": [{"url": f["url"], "medio": f.get("medio"), "fecha": f.get("fecha")} for f in x.get("fuentes", [])]}
                for x in pm.get("promesas", [])
            ],
        })
    write("partidos.json", {"meta": {"actualizado": date.today().isoformat()}, "partidos": partidos})

    # ---- Fase 1 ----
    publicados = [p for p in partidos if p["programa"]["estado"] == "publicado"]
    if list((D / "fase1").glob("codificacion_g*.json")):
        subprocess.run([sys.executable, "-I", str(ROOT / "pipeline" / "build_fase1.py")], check=True)
    f1 = D / "fase1" / "fase1.json"
    if f1.exists():
        fase1 = json.loads(f1.read_text())
    else:
        fase1 = {"preguntas": [], "posiciones": {}}
    n_prog = sum(1 for qs in fase1.get("posiciones", {}).values() for x in qs.values() if x.get("fuente") == "programa")
    n_camp = sum(1 for qs in fase1.get("posiciones", {}).values() for x in qs.values() if x.get("fuente") == "campaña")
    fase1["meta"] = {
        "actualizado": date.today().isoformat(),
        "provisional": len(publicados) < len(partidos) / 2,
        "nota": (f"Hasta ahora conocemos {n_prog + n_camp} posiciones de los partidos, todas con cita: {n_prog} de programas oficiales "
                 f"y {n_camp} de lo que sus líderes han propuesto en público. Han publicado programa {len(publicados)} de {len(partidos)} "
                 f"partidos. Revisamos las posiciones cada vez que se publica uno."),
    }
    write("fase1.json", fase1)

    # ---- Fase 3 ----
    criterios = load("fase3/criterios.json")
    fase3 = {"meta": {"actualizado": date.today().isoformat(), "modelo": "Claude (Anthropic)"}, "criterios": criterios, "partidos": {}}
    for p in partidos:
        ev = D / "programas" / p["id"] / "evaluacion.json"
        rev = D / "programas" / p["id"] / "revision.json"
        if ev.exists() and rev.exists() and json.loads(rev.read_text()).get("aprobado"):
            e = json.loads(ev.read_text())
            if e.get("programa_sha256") != p["programa"]["sha256"]:
                sys.exit(f"{p['id']}: la evaluación no corresponde al programa publicado (sha256)")
            for pr in e["propuestas"]:
                c = pr["evaluacion"].get("concrecion")
                # La concreción se juzga sobre el propio programa: su fuente es el documento oficial.
                if c is not None and not c.get("fuentes") and p["programa"]["url"]:
                    c["fuentes"] = [{"url": p["programa"]["url"], "titulo": f"Programa oficial, p. {pr.get('pagina')}"}]
            fase3["partidos"][p["id"]] = {"estado": "evaluado", "base": "programa", "propuestas": e["propuestas"], "revision": json.loads(rev.read_text()).get("cambios", []).__len__()}
            # Complemento: compromisos destacados de sus líderes que NO están en el programa (mismo
            # protocolo, docs/prompts/1b; base "complemento"). Solo si pasan la revisión independiente.
            dc = D / "programas" / p["id"] / "compromisos"
            evc, revc, sel = dc / "evaluacion.json", dc / "revision.json", dc / "seleccion.json"
            if evc.exists() and revc.exists() and sel.exists() and json.loads(revc.read_text()).get("aprobado"):
                ec = json.loads(evc.read_text())
                if ec.get("base") == "complemento" and ec.get("propuestas"):
                    if ec.get("seleccion_sha256") != hashlib.sha256(sel.read_bytes()).hexdigest():
                        sys.exit(f"{p['id']}: el complemento de compromisos no corresponde a seleccion.json (sha256)")
                    fase3["partidos"][p["id"]]["complemento"] = ec["propuestas"]
            continue
        # Sin programa (o aún sin analizar): compromisos públicos de sus líderes, mismo protocolo
        # (docs/prompts/1b, 3 y 4). Al aprobarse el programa, las 12 salen de él y los compromisos que no
        # estén en él pasan a complemento (base "complemento", arriba).
        dc = D / "programas" / p["id"] / "compromisos"
        evc, revc, sel = dc / "evaluacion.json", dc / "revision.json", dc / "seleccion.json"
        if evc.exists() and revc.exists() and sel.exists() and json.loads(revc.read_text()).get("aprobado"):
            e = json.loads(evc.read_text())
            if e.get("seleccion_sha256") != hashlib.sha256(sel.read_bytes()).hexdigest():
                sys.exit(f"{p['id']}: la evaluación de compromisos no corresponde a seleccion.json (sha256)")
            for pr in e["propuestas"]:
                c = pr["evaluacion"].get("concrecion")
                if c is not None and not c.get("fuentes") and pr.get("url"):
                    c["fuentes"] = [{"url": pr["url"], "titulo": f"{pr.get('quien') or 'Fuente'} ({pr.get('medio') or 'fuente'}, {pr.get('fecha') or ''})"}]
            s_ = json.loads(sel.read_text())
            fase3["partidos"][p["id"]] = {"estado": "evaluado", "base": "compromisos", "propuestas": e["propuestas"],
                                         "revision": len(json.loads(revc.read_text()).get("cambios", [])),
                                         "compromisos_total": len(s_.get("compromisos", [])), "busqueda": s_.get("busqueda_hasta")}
        else:
            fase3["partidos"][p["id"]] = {
                "estado": "pendiente",
                "motivo": "",
                "propuestas": [],
            }
    write("fase3.json", fase3)

    # ---- Fase 2 ----
    subprocess.run([sys.executable, "-I", str(ROOT / "pipeline" / "build_fase2.py")], check=True, stdout=subprocess.DEVNULL)
    print(f"partidos: {len(partidos)} · programas publicados: {len(publicados)} · fase1 preguntas: {len(fase1['preguntas'])} · "
          f"fase3 evaluados: {sum(1 for v in fase3['partidos'].values() if v['estado'] == 'evaluado')}")


if __name__ == "__main__":
    main()
