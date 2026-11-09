#!/usr/bin/env python3
"""Construye web/public/data/fase2.json: circunscripciones, candidaturas del BOE y escenarios.

Entradas (todas verificadas por sus propios scripts de validación):
  data/boe/candidaturas_congreso.json   listas proclamadas 29N (BOE)
  data/resultados/generales_2023.json   resultados oficiales 23J por circunscripción
  data/resultados/europeas_2024.json    resultados oficiales europeas por provincia
  data/encuestas/encuestas.json         últimas encuestas (fuente primaria)
  data/mapeo/candidaturas_2026.json     reglas candidatura 2026 -> partido y base 2023

Modelo (ver docs/METODOLOGIA.md):
  * Escenario base "2023": voto de 2023 de la(s) candidatura(s) predecesora(s) en la misma
    circunscripción. Si una candidatura de 2023 tiene dos sucesoras en 2026 (SUMAR -> Frente
    Amplio + Podemos), sus votos se reparten según el peso relativo de ambas en las europeas de
    2024 en esa provincia. Candidaturas sin predecesora: "sin base".
  * Escenarios de encuesta: swing proporcional. cuota_prov = cuota_base_prov * (encuesta_nac /
    base_nac). Partidos sin base 2023 pero con dato en la encuesta: perfil provincial de las
    europeas 2024. Partidos que la encuesta no recoge: conservan su cuota base. Se renormaliza
    para que candidaturas + otros + blanco = 100 %.

Uso: python3 -I pipeline/build_fase2.py
"""
import json
import re
import sys
import unicodedata
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from dhondt import dhondt  # noqa: E402

D = ROOT / "data"
OUT = ROOT / "web" / "public" / "data" / "fase2.json"
REPORT = D / "build" / "fase2_validacion.txt"

# Etiquetas de cada encuesta -> clave de regla (partido de la fase 1 o grupo).
# Ver data/encuestas/NOTAS.md. Las etiquetas no listadas (otros, blanco, CUP — que no concurre)
# se ignoran. UPN no se usa: concurre en coalición con el PP y hereda el swing del PP.
# Adelante Andalucía no se usa: en 2023 solo concurrió en una provincia (sin referencia nacional).
ETIQUETAS = {
    "PSOE": "bloque_psoe", "PP": "pp", "Partido Popular (PP)": "pp", "VOX": "vox", "Vox": "vox",
    "SUMAR / Frente Amplio": "bloque_sumar", "Frente Amplio": "bloque_fa", "Sumar": "bloque_sumar",
    "Podemos": "podemos", "ERC": "erc", "Se Acabó la Fiesta": "salf", "SALF": "salf",
    "EH Bildu": "eh_bildu", "Bildu": "eh_bildu", "Junts": "junts", "JuntsxCat": "junts", "BNG": "bng",
    "EAJ-PNV": "pnv", "PNV": "pnv", "CCa": "cc", "Coalición Canaria (CCA)": "cc", "CC": "cc",
    "Front Valencià (FV)": "compromis", "PACMA": "PACMA",
    "Sumar/Frente Amplio + confluencias": "bloque_sumar", "CCa": "cc",
}
IGNORADAS = {"UPN", "Otros partidos", "En blanco", "Otro", "Otro + Blanco", "Cup", "Adelante Andalucía (AA)", "A.Adelante", "AA"}
SWING_DE = {"upn": "pp"}
# La etiqueta genérica "Sumar" de las encuestas corresponde al espacio que en 2023 fue Sumar sin
# Podemos (que ahora se mide aparte): Frente Amplio y sus marcas, Compromís (incluye EUPV) y la
# parte de UPC en Canarias. Si la encuesta da Compromís/Front Valencià por separado (Sigma Dos),
# la etiqueta "Frente Amplio" cubre solo Frente Amplio y UPC.
BLOQUES = {"bloque_sumar": ["frente_amplio", "ara_mes_fa", "compromis", "upc"], "bloque_fa": ["frente_amplio", "ara_mes_fa", "upc"],
           "bloque_psoe": ["psoe", "psc"]}  # las encuestas dan PSOE incluyendo al PSC  # coalición UPN-PP sigue el swing del PP
ESCENARIOS_ENCUESTA = ["cis-2026-10", "sigmados-2026-11-08", "gad3-2026-11", "40db-2026-11"]
NOMBRES = {
    "cis-2026-10": "Encuesta CIS · barómetro de octubre (14-oct)",
    "sigmados-2026-11-02": "Encuesta Sigma Dos · El Mundo (1-nov)",
    "sigmados-2026-11-08": "Encuesta Sigma Dos · El Mundo (8-nov)",
    "gad3-2026-10": "Encuesta GAD3 · ABC (12-oct)",
    "gad3-2026-11": "Encuesta GAD3 · ABC (9-nov)",
    "40db-2026-10": "Encuesta 40dB · El País-SER (9-oct)",
    "40db-2026-11": "Encuesta 40dB · El País-SER (9-nov)",
}
# Veda de encuestas (LOREG art. 69.7): prohibido publicar, difundir o reproducir sondeos durante los
# cinco días anteriores a la votación. Se retiran desde el 24-nov 00:00 hasta el cierre de los
# colegios el 29-nov a las 20:00 (hora peninsular). La web aplica la misma regla en el navegador.
from datetime import datetime  # noqa: E402
from zoneinfo import ZoneInfo  # noqa: E402

VEDA_INICIO = datetime(2026, 11, 24, 0, 0, tzinfo=ZoneInfo("Europe/Madrid"))
VEDA_FIN = datetime(2026, 11, 29, 20, 0, tzinfo=ZoneInfo("Europe/Madrid"))


def en_veda(ahora=None):
    import os
    if os.environ.get("VCD_AHORA"):  # para pruebas: VCD_AHORA=2026-11-25T12:00:00+01:00
        ahora = datetime.fromisoformat(os.environ["VCD_AHORA"])
    ahora = ahora or datetime.now(ZoneInfo("Europe/Madrid"))
    # Margen de 2 h antes del inicio: el despliegue programado sale el 23-nov a las 22:05 y así el
    # fichero publicado ya no contiene encuestas cuando empieza la veda.
    from datetime import timedelta
    return VEDA_INICIO - timedelta(hours=2) <= ahora < VEDA_FIN


K_BASE = 0.15  # calibrado: docs/research/calibracion_incertidumbre.md (repetir la elección anterior)
K_ENCUESTA = 0.08  # calibrado: error de encuestas finales + desviación provincial del swing (2015–2023)


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def load(p):
    return json.loads((D / p).read_text())


def main():
    boe = load("boe/candidaturas_congreso.json")
    g23 = load("resultados/generales_2023.json")["circunscripciones"]
    e24 = load("resultados/europeas_2024.json")["circunscripciones"]
    enc = {e["id"]: e for e in load("encuestas/encuestas.json")["encuestas"]}
    reglas = load("mapeo/candidaturas_2026.json")["reglas"]
    log = []

    def regla(c):
        for r in reglas:
            if c["siglas"] is not None and c["siglas"] in r.get("siglas", []):
                return r
            if c["siglas"] is None and c["denominacion"] in r.get("denominacion", []):
                return r
        return None

    def clave(r, c):
        return r["partido"] if r and r["partido"] else (r["siglas"][0] if r and r.get("siglas") else c["siglas"] or c["denominacion"])

    # Coaliciones (pactos oficiales), titulares relevantes (BOE) y afiliaciones/enlaces documentados.
    coal = load("boe/coaliciones.json") if (D / "boe/coaliciones.json").exists() else {}
    relevantes = defaultdict(list)
    if (D / "build/candidatos_relevantes.json").exists():
        for x in load("build/candidatos_relevantes.json")["personas"]:
            relevantes[(x["ine"], x["siglas"])].append(x)
    afil = {}
    for f in sorted((D / "boe").glob("afiliaciones_g*.json")):
        for x in json.loads(f.read_text())["personas"]:
            afil[(x["ine"], x["siglas"], x["orden"])] = x

    def coalicion_de(siglas):
        c = coal.get(siglas)
        if not c or c.get("tipo") != "coalición" or len(c.get("miembros", [])) < 2:
            return None
        f = c.get("fuente") or {}
        return {"tipo": "coalición", "miembros": [{"nombre": m["nombre"], "siglas": m.get("siglas")} for m in c["miembros"]],
                "fuente": {"url": f.get("url"), "documento": f.get("documento")}, "nota": c.get("nota")}

    def titulares_de(ine, siglas):
        out = []
        for x in sorted(relevantes.get((ine, siglas), []), key=lambda y: y["orden"]):
            a = afil.get((ine, siglas, x["orden"]), {})
            afiliacion = a.get("afiliacion") or (x["marca_boe"] if x.get("marca_boe") else None)
            out.append({"orden": x["orden"], "nombre": x["nombre"], "afiliacion": afiliacion,
                        "fuente_afiliacion": a.get("fuente_afiliacion") if a.get("afiliacion") else None,
                        "enlace": a.get("enlace")})
        return out

    circs = []
    base = {}  # ine -> cand_id -> votos base (float)
    clave_de = {}  # (ine, cand_id) -> clave de regla
    errores = []
    for ine, x in sorted(boe["circunscripciones"].items()):
        r23 = g23[ine]
        votos23 = defaultdict(int)
        for k in r23["candidaturas"]:
            votos23[k["siglas"]] += k["votos"]
        eu = defaultdict(int)
        for k in e24[ine]["candidaturas"]:
            eu[k["siglas"]] += k["votos"]
        cands = []
        partidos_aqui = set()
        for c in x["candidaturas"]:
            r = regla(c)
            if r and r["partido"]:
                partidos_aqui.add(r["partido"])
        usados = defaultdict(float)  # siglas 2023 -> fracción asignada
        base[ine] = {}
        ids = set()
        for c in x["candidaturas"]:
            r = regla(c)
            cid = slug(c["siglas"] or c["denominacion"])
            while cid in ids:
                cid += "-b"
            ids.add(cid)
            clave_de[(ine, cid)] = clave(r, c)
            v = None
            if r and r["base_2023"]:
                presentes = [s for s in r["base_2023"] if votos23.get(s)]
                if presentes:
                    frac = 1.0
                    rep = r.get("reparto")
                    if rep and rep["con"] in partidos_aqui:
                        a = sum(eu.get(s, 0) for s in rep["europeas_propio"])
                        b = sum(eu.get(s, 0) for s in rep["europeas_otro"])
                        frac = a / (a + b)
                    v = sum(votos23[s] for s in presentes) * frac
                    for s in presentes:
                        usados[s] += frac
            if v is not None:
                base[ine][cid] = v
            cands.append({
                "id": cid,
                "siglas": c["siglas"] or c["denominacion"],
                "denominacion": c["denominacion"],
                "partido": r["partido"] if r else None,
                "afines": r.get("afines", []) if r else [],
                "cabeza_lista": c.get("cabeza_lista"),
                "coalicion": coalicion_de(c["siglas"]) if c["siglas"] else None,
                "titulares": titulares_de(ine, c["siglas"]),
            })
            if r is None:
                log.append(f"{ine} sin regla (sin base): {c['siglas']} | {c['denominacion']}")
        for s, f in usados.items():
            if abs(f - 1) > 1e-9 and f > 1:
                errores.append(f"{ine}: votos 2023 de {s} asignados {f:.3f} veces")
        circs.append({
            "ine": ine,
            "nombre": x["nombre"],
            "comunidad": r23.get("comunidad", ""),
            "escanos": x["escanos"],
            "validos_ref": r23["validos"],
            "boe_id": x["boe_id"],
            "boe_url": x["boe_url"],
            "candidaturas": cands,
        })
        asignado = sum(base[ine].values())
        otros = r23["validos"] - r23["blancos"] - asignado
        if otros < -0.5:
            errores.append(f"{ine}: asignado {asignado} > votos a candidaturas")
        base[ine]["_otros"] = max(otros, 0)

    if errores:
        print("\n".join(errores))
        sys.exit(1)

    validos = {c["ine"]: c["validos_ref"] for c in circs}
    blancos = {ine: g23[ine]["blancos"] / g23[ine]["validos"] for ine in validos}

    def cuotas_base():
        out = {}
        for ine, vs in base.items():
            out[ine] = {k: v / validos[ine] for k, v in vs.items()}
            out[ine]["_blanco"] = blancos[ine]
        return out

    def sin_base():
        return {c["ine"]: [k["id"] for k in c["candidaturas"] if k["id"] not in base[c["ine"]]] for c in circs}

    total_validos = sum(validos.values())
    # Cuota base nacional por clave (sobre el total de válidos de España)
    base_nac = defaultdict(float)
    for ine, vs in base.items():
        for cid, v in vs.items():
            if cid != "_otros":
                base_nac[clave_de[(ine, cid)]] += v
    base_nac = {k: v / total_validos for k, v in base_nac.items()}

    # Perfil europeas para partidos sin base (solo SALF en la práctica)
    def perfil_eu(clave_r):
        etiquetas = {"salf": ['AGRUPACIÓN DE ELECTORES "SE ACABÓ LA FIESTA"']}.get(clave_r)
        if not etiquetas:
            return None
        sh = {}
        tot_v = tot_val = 0
        for c in circs:
            ine = c["ine"]
            if not any(clave_de[(ine, k["id"])] == clave_r for k in c["candidaturas"]):
                continue
            v = sum(k["votos"] for k in e24[ine]["candidaturas"] if k["siglas"] in etiquetas)
            sh[ine] = v / e24[ine]["validos"]
            tot_v += v
            tot_val += e24[ine]["validos"]
        return sh, tot_v / tot_val

    escenarios = [{
        "id": "g2023",
        "nombre": "Resultados de 2023 (por defecto)",
        "descripcion": "Voto real de las generales de 2023 en tu provincia. Frente Amplio y Podemos (juntos en Sumar en 2023) se reparten ese voto según su peso en las europeas de 2024 en la provincia.",
        "fecha": "2023-07-23",
        "fuentes": [{"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18907", "titulo": "BOE-A-2023-18907 (resultados oficiales 2023)"}],
        "k": K_BASE,
        "cuotas": cuotas_base(),
        "sin_base": sin_base(),
    }]

    veda = en_veda()
    for eid in ([] if veda else ESCENARIOS_ENCUESTA):
        e = enc[eid]
        poll = {}
        for p in e["estimacion_voto"]:
            lab = p["partido"]
            if lab in IGNORADAS:
                continue
            if lab not in ETIQUETAS:
                errores.append(f"{eid}: etiqueta sin mapear {lab}")
                continue
            poll[ETIQUETAS[lab]] = p["pct"] / 100
        # Si la encuesta no da Compromís por separado, su "Frente Amplio" se interpreta como el
        # bloque completo (FA + confluencias, Compromís incluido): ver docs/METODOLOGIA.md.
        if "bloque_fa" in poll and "compromis" not in poll:
            poll["bloque_sumar"] = poll.pop("bloque_fa")
        # Factor de swing por clave (los bloques comparten un mismo factor)
        factor = {}
        for kp, val in poll.items():
            miembros = BLOQUES.get(kp, [kp])
            ref = sum(base_nac.get(m, 0) for m in miembros)
            if ref > 0:
                for m in miembros:
                    factor[m] = val / ref
        cu = {}
        sb = {}
        for c in circs:
            ine = c["ine"]
            q = {}
            sbi = []
            for k in c["candidaturas"]:
                cl = clave_de[(ine, k["id"])]
                cl_sw = SWING_DE.get(cl, cl)
                b = base[ine].get(k["id"])
                if b is not None:
                    s = b / validos[ine]
                    if cl_sw in factor:
                        s *= factor[cl_sw]
                    q[k["id"]] = s
                elif cl in poll:
                    pf = perfil_eu(cl)
                    if pf and ine in pf[0]:
                        q[k["id"]] = pf[0][ine] * poll[cl] / pf[1]
                    else:
                        sbi.append(k["id"])
                else:
                    sbi.append(k["id"])
            q["_otros"] = base[ine]["_otros"] / validos[ine]
            f = (1 - blancos[ine]) / sum(q.values())
            q = {kk: v * f for kk, v in q.items()}
            q["_blanco"] = blancos[ine]
            cu[ine] = q
            sb[ine] = sbi
        tc = e.get("trabajo_campo") or {}
        escenarios.append({
            "id": eid,
            "nombre": NOMBRES[eid],
            "descripcion": f"Encuesta con trabajo de campo del {tc.get('inicio')} al {tc.get('fin')} (n = {e.get('muestra_n')}), proyectada a tu provincia con swing proporcional sobre 2023. Partidos que no recoge: conservan su voto de 2023.",
            "fecha": e["fecha_publicacion"],
            "fuentes": [{"url": u if isinstance(u, str) else u.get("url"), "titulo": "publicación original"} for u in e["urls"]["primarias"][:2]],
            "k": K_ENCUESTA,
            "cuotas": cu,
            "sin_base": sb,
        })

    if errores:
        print("\n".join(errores))
        sys.exit(1)

    # Coste nacional 2023 (votos por diputado) para partidos que concurrieron igual en 2023.
    coste = {}
    tot = defaultdict(lambda: [0, 0])
    for ine, r in g23.items():
        for k in r["candidaturas"]:
            ag = (k.get("agrupacion") or {}).get("siglas") or k["siglas"]
            tot[ag][0] += k["votos"]
            tot[ag][1] += k["escanos"]
            if k["siglas"] == "PSC":
                tot["_PSC"][0] += k["votos"]
                tot["_PSC"][1] += k["escanos"]
    for pid, ag in {"pp": "PP", "psoe": "PSOE", "vox": "VOX", "erc": "ERC", "junts": "JxCAT - JUNTS", "eh_bildu": "EH Bildu",
                    "pnv": "EAJ-PNV", "bng": "B.N.G.", "cc": "CCa", "upn": "U.P.N.", "psc": "_PSC"}.items():
        v, s = tot[ag]
        if s:
            coste[pid] = {"votos": v, "escanos": s}

    out = {
        "meta": {
            "actualizado": date.today().isoformat(),
            "boe": [{"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103", "titulo": "Candidaturas proclamadas (BOE-A-2026-23103)"},
                    {"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23383", "titulo": "Corrección de errores (BOE-A-2026-23383)"},
                    {"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742", "titulo": "RD 806/2026 (escaños)"}],
            "veda_encuestas": {"activa": veda, "inicio": VEDA_INICIO.isoformat(), "fin": VEDA_FIN.isoformat()},
            "resultados": [{"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18907", "titulo": "Resultados 2023 (JEC)"},
                           {"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-13092", "titulo": "Resultados europeas 2024 (JEC)"}],
        },
        "circunscripciones": circs,
        "escenarios": escenarios,
        "coste_nacional_2023": coste,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))

    # ---- Validación / informe ----
    rep = []
    rep.append(f"Circunscripciones: {len(circs)}; escaños: {sum(c['escanos'] for c in circs)}; candidaturas: {sum(len(c['candidaturas']) for c in circs)}")
    for esc in escenarios:
        tot_esc = defaultdict(int)
        for c in circs:
            q = esc["cuotas"][c["ine"]]
            ids = [k["id"] for k in c["candidaturas"] if k["id"] in q]
            v = [q[i] * c["validos_ref"] for i in ids]
            s = dhondt(v, c["escanos"], c["validos_ref"])
            for i, n in zip(ids, s):
                tot_esc[clave_de[(c["ine"], i)]] += n
            suma = sum(q.values())
            assert abs(suma - 1) < 1e-6, (esc["id"], c["ine"], suma)
        assert sum(tot_esc.values()) == 350, esc["id"]
        rep.append(f"\n[{esc['id']}] escaños del escenario central (2026, 350):")
        rep.append("  " + ", ".join(f"{k} {v}" for k, v in sorted(tot_esc.items(), key=lambda kv: -kv[1]) if v))
        if esc["id"] in enc:
            pe = enc[esc["id"]].get("proyeccion_escanos")
            rep.append(f"  publicado por la encuesta: {json.dumps(pe, ensure_ascii=False)[:400]}")
    rep.append("\nCuota base nacional por clave: " + ", ".join(f"{k} {v*100:.2f}%" for k, v in sorted(base_nac.items(), key=lambda kv: -kv[1])[:25]))
    rep.append("\nAvisos:\n" + "\n".join(log))
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text("\n".join(rep))
    print("\n".join(rep[:40]))


if __name__ == "__main__":
    main()
