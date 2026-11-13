#!/usr/bin/env python3
"""Construye web/public/data/fase2.json: circunscripciones, candidaturas del BOE y escenarios.

Entradas (todas verificadas por sus propios scripts de validación):
  data/boe/candidaturas_congreso.json   listas proclamadas 29N (BOE)
  data/resultados/generales_2023.json   resultados oficiales 23J por circunscripción
  data/resultados/europeas_2024.json    resultados oficiales europeas por provincia
  data/resultados/autonomicas_andalucia_2026.json  autonómicas andaluzas 17-may-2026 (BOJA)
  data/encuestas/encuestas.json         últimas encuestas (fuente primaria)
  data/mapeo/candidaturas_2026.json     reglas candidatura 2026 -> partido y base 2023

Modelo (ver docs/METODOLOGIA.md):
  * Escenario base "2023": voto de 2023 de la(s) candidatura(s) predecesora(s) en la misma
    circunscripción. Si una candidatura de 2023 tiene dos sucesoras en 2026 (SUMAR -> Frente
    Amplio + Podemos), sus votos se reparten según el peso relativo de ambas en las europeas de
    2024 en esa provincia. Candidaturas sin predecesora: "sin base".
  * Escenarios de encuesta: swing proporcional. cuota_prov = cuota_base_prov * (encuesta_nac /
    base_nac). Partidos sin base 2023 pero con dato en la encuesta: perfil provincial de las
    europeas 2024 (SALF) o de las autonómicas andaluzas de 2026 (Adelante Andalucía, también en Cádiz,
    donde sí tiene base 2023). Partidos que la encuesta no recoge: conservan su cuota base. Se renormaliza
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
# Adelante Andalucía: en 2023 solo concurrió en Cádiz (sin referencia nacional para el swing); su cifra
# nacional se reparte con el perfil provincial de las autonómicas andaluzas de 2026 (PERFIL_AUTONOMICAS).
ETIQUETAS = {
    "PSOE": "bloque_psoe", "PP": "pp", "Partido Popular (PP)": "pp", "VOX": "vox", "Vox": "vox",
    "SUMAR / Frente Amplio": "bloque_sumar", "Frente Amplio": "bloque_fa", "Sumar": "bloque_sumar",
    "Podemos": "podemos", "ERC": "erc", "Se Acabó la Fiesta": "salf", "SALF": "salf",
    "EH Bildu": "eh_bildu", "Bildu": "eh_bildu", "Junts": "junts", "JuntsxCat": "junts", "BNG": "bng",
    "EAJ-PNV": "pnv", "PNV": "pnv", "CCa": "cc", "Coalición Canaria (CCA)": "cc", "CC": "cc",
    "Front Valencià (FV)": "compromis", "PACMA": "PACMA",
    "Sumar/Frente Amplio + confluencias": "bloque_sumar", "CCa": "cc",
    "Frente Amplio*": "bloque_fa", "Frente Amplio(Sumar 2023)": "bloque_fa", "F. Amplio": "bloque_fa", "SUMAR": "bloque_sumar",
    "Compromís": "compromis", "Compromís-Front V.": "compromis", "Pod.": "podemos", "ERC-Podemos": "erc",
    "Se acabó la fiesta": "salf", "Se acabó la fiesta (SALF)": "salf", "Se Acabó la Fiesta (SALF)": "salf",
    "JxCat": "junts", "JUNTS": "junts", "EH-BILDU": "eh_bildu", "PNV-EAJ": "pnv",
    "Coalición Canaria": "cc", "C. Canaria": "cc",
    # CIS 3584 (preelectoral): da UPC y Ara Més por separado de "Frente Amplio" (ver BLOQUES).
    "EH-Bildu": "eh_bildu", "Compromís: Front Valencià": "compromis", "UPC": "upc",
    "Ara Més-Front Ampli": "ara_mes_fa", "CC-Municipalistas Primero Canarias": "cc",
    "Adelante Andalucía": "adelante_andalucia", "Adelante Andalucía (AA)": "adelante_andalucia",
    "A.Adelante": "adelante_andalucia", "AA": "adelante_andalucia", "Adelante And.": "adelante_andalucia",
    "Adelante AND": "adelante_andalucia",  # Winston/Artículo14
}
IGNORADAS = {"UPN", "Otros partidos", "En blanco", "Otro", "Otro + Blanco", "Cup",
             "PP–UPN (Navarra)", "Otros", "Otros*", "Otras candidaturas",
             "Otros+Blanco", "Regionales**", "CHA", "Més per Mallorca", "Teruel Existe", "Otros y blanco"}
SWING_DE = {"upn": "pp"}
# Partidos de ámbito autonómico cuya cifra nacional de la encuesta se reparte por provincias según su
# voto en las últimas autonómicas (fichero de resultados, siglas en ese fichero). Se usa en todas las
# provincias donde concurren, aunque tengan base 2023 en alguna (AA en Cádiz): su base 2023 no sirve
# de referencia nacional para el swing. Si la encuesta no los recoge, quedan sin estimación en todas
# las provincias (también en Cádiz: su 1,4 % de 2023 no es una estimación para 2026 y, en la media,
# rebajaría su cuota solo allí).
PERFIL_AUTONOMICAS = {"adelante_andalucia": ("resultados/autonomicas_andalucia_2026.json", ["ADELANTE ANDALUCÍA"])}
# La etiqueta genérica "Sumar" de las encuestas corresponde al espacio que en 2023 fue Sumar sin
# Podemos (que ahora se mide aparte): Frente Amplio y sus marcas, Compromís (incluye EUPV) y la
# parte de UPC en Canarias. Si la encuesta da Compromís/Front Valencià por separado (Sigma Dos),
# la etiqueta "Frente Amplio" cubre solo Frente Amplio y UPC.
BLOQUES = {"bloque_sumar": ["frente_amplio", "ara_mes_fa", "compromis", "upc"], "bloque_fa": ["frente_amplio", "ara_mes_fa", "upc"],
           "bloque_psoe": ["psoe", "psc"]}  # las encuestas dan PSOE incluyendo al PSC  # coalición UPN-PP sigue el swing del PP
ESCENARIOS_ENCUESTA = ["cis-2026-11", "sigmados-2026-11-08", "gad3-2026-11", "40db-2026-11"]
NOMBRES = {
    "cis-2026-10": "Encuesta CIS · barómetro de octubre (14-oct)",
    "cis-2026-11": "Encuesta CIS · macroencuesta preelectoral (12-nov)",
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


VENTANA_MEDIA = 21  # días desde el fin del trabajo de campo
NOMBRE_EMPRESA = {"cis": "CIS", "sigmados": "Sigma Dos", "gad3": "GAD3", "40db": "40dB",
                  "ncreport": "NC Report", "targetpoint": "Target Point", "hamalgama": "Hamalgama Métrica",
                  "celestetel": "Celeste-Tel", "imop": "IMOP", "sociometrica": "SocioMétrica",
                  "moreincommon": "More in Common", "winston": "Winston", "ateneodeldato": "Ateneo del Dato",
                  "swdemoscopia": "SW Demoscopia", "dym": "DYM", "data10": "Data10"}
MESES = ["", "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
MESES_LARGOS = ["", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre",
                "noviembre", "diciembre"]


def periodo_txt(ini, fin):
    """Texto legible de un periodo de fechas ISO: «del 3 al 5 de noviembre» (solo para las descripciones)."""
    if not ini or not fin:
        return f"del {ini} al {fin}"
    (_, m1, d1), (_, m2, d2) = ([int(x) for x in f.split("-")] for f in (ini, fin))
    if m1 == m2:
        return f"del {d1} al {d2} de {MESES_LARGOS[m2]}"
    return f"del {d1} de {MESES_LARGOS[m1]} al {d2} de {MESES_LARGOS[m2]}"


def miles_txt(n):
    """Número con punto de millar a la española (desde 10.000)."""
    return f"{n:,}".replace(",", ".") if isinstance(n, int) and n >= 10000 else str(n)
K_BASE = 0.15  # calibrado: docs/research/calibracion_incertidumbre.md (repetir la elección anterior)
K_ENCUESTA = 0.08  # calibrado: error de encuestas finales + desviación provincial del swing (2015–2023)


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def load(p):
    return json.loads((D / p).read_text())


def horquillas_provinciales(dr, prov_esc):
    """Compara los escaños por provincia con las horquillas provinciales publicadas (CIS 3584): celdas
    partido × provincia dentro de la horquilla (las celdas omitidas valen [0-0]). Cada etiqueta cuenta
    sus miembros (bloques sin los que la encuesta da aparte; UPN-PP cuenta como PP)."""
    cols = dr["etiquetas_columnas"]
    en_poll = {ETIQUETAS[lab] for lab in cols}
    dentro, fuera = 0, []
    for c in dr["circunscripciones"]:
        rng = {x["partido"]: (x["min"], x["max"]) for x in c["escanos"]}
        for lab in cols:
            k = ETIQUETAS[lab]
            miembros = [m for m in BLOQUES.get(k, [k]) if m == k or m not in en_poll]
            miembros += [m for m, d in SWING_DE.items() if d in miembros]
            v = sum(prov_esc.get((c["ine"], m), 0) for m in miembros)
            lo, hi = rng.get(lab, (0, 0))
            if lo <= v <= hi:
                dentro += 1
            else:
                fuera.append(f"{c['circunscripcion']} {lab} {v} [{lo}-{hi}]")
    return f"dentro de la horquilla provincial publicada: {dentro} de {dentro + len(fuera)} celdas; fuera: " + "; ".join(fuera)


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

    # Fotos y logotipos con licencia libre (pipeline/imagenes.py), copiados en web/public/img/.
    imgs = load("imagenes/imagenes.json") if (D / "imagenes/imagenes.json").exists() else {"personas": {}, "partidos": {}}
    creditos = {}

    def credito(m, que):
        creditos[m["src"]] = {"src": m["src"], "que": que, "autor": m.get("autor"), "licencia": m.get("licencia"),
                              "licencia_url": m.get("licencia_url"), "commons": m.get("commons")}
        return m["src"]

    def titulares_de(ine, siglas):
        out = []
        for x in sorted(relevantes.get((ine, siglas), []), key=lambda y: y["orden"]):
            a = afil.get((ine, siglas, x["orden"]), {})
            afiliacion = a.get("afiliacion") or (x["marca_boe"] if x.get("marca_boe") else None)
            out.append({"orden": x["orden"], "nombre": x["nombre"], "afiliacion": afiliacion,
                        "fuente_afiliacion": a.get("fuente_afiliacion") if a.get("afiliacion") else None,
                        "enlace": a.get("enlace"),
                        "foto": credito(imgs["personas"][a["enlace"]], x["nombre"]) if a.get("enlace") in imgs["personas"] else None})
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

    # Perfil autonómico (ver PERFIL_AUTONOMICAS): cuota del partido en cada provincia en las autonómicas
    # (votos / válidos). La referencia nacional se calcula sobre los válidos de 2023 de cada provincia y
    # el total de España, para que la suma nacional proyectada sea la cifra de la encuesta.
    def perfil_autonomicas(clave_r):
        if clave_r not in PERFIL_AUTONOMICAS:
            return None
        fichero, siglas = PERFIL_AUTONOMICAS[clave_r]
        res = load(fichero)["circunscripciones"]
        sh = {}
        for c in circs:
            ine = c["ine"]
            if ine not in res or not any(clave_de[(ine, k["id"])] == clave_r for k in c["candidaturas"]):
                continue
            sh[ine] = sum(k["votos"] for k in res[ine]["candidaturas"] if k["siglas"] in siglas) / res[ine]["validos"]
        return sh, sum(v * validos[ine] for ine, v in sh.items()) / total_validos

    def perfil(clave_r):
        return perfil_autonomicas(clave_r) or perfil_eu(clave_r)

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
        "nombre": "Resultados de 2023",
        "descripcion": "Voto real de las elecciones generales de 2023 en tu provincia. Frente Amplio y Podemos se presentaron juntos (en Sumar) en 2023: repartimos ese voto entre los dos según lo que sacó cada uno en las elecciones europeas de 2024 en la provincia.",
        "fecha": "2023-07-23",
        "fuentes": [{"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18907", "titulo": "BOE-A-2023-18907 (resultados oficiales 2023)"}],
        "k": K_BASE,
        "cuotas": cuotas_base(),
        "sin_base": sin_base(),
    }]

    veda = en_veda()
    perfiles = {}  # clave -> perfil provincial (autonómicas o europeas), calculado una vez

    def proyectar(eid):
        """Cuotas por provincia de una encuesta nacional: cada partido sube o baja en cada provincia
        en la misma proporción que en la encuesta respecto a 2023 (swing proporcional)."""
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
            if kp in PERFIL_AUTONOMICAS:  # se reparte con su perfil, no con swing
                continue
            # Un bloque no incluye a los miembros que la encuesta da por separado (CIS 3584: UPC, Ara Més).
            miembros = [m for m in BLOQUES.get(kp, [kp]) if m == kp or m not in poll]
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
                if cl in PERFIL_AUTONOMICAS and cl not in poll:
                    sbi.append(k["id"])
                elif cl in poll and (b is None or cl in PERFIL_AUTONOMICAS):
                    if cl not in perfiles:
                        perfiles[cl] = perfil(cl)
                    pf = perfiles[cl]
                    if pf and ine in pf[0]:
                        q[k["id"]] = pf[0][ine] * poll[cl] / pf[1]
                    else:
                        sbi.append(k["id"])
                elif b is not None:
                    s = b / validos[ine]
                    if cl_sw in factor:
                        s *= factor[cl_sw]
                    q[k["id"]] = s
                else:
                    sbi.append(k["id"])
            q["_otros"] = base[ine]["_otros"] / validos[ine]
            f = (1 - blancos[ine]) / sum(q.values())
            q = {kk: v * f for kk, v in q.items()}
            q["_blanco"] = blancos[ine]
            cu[ine] = q
            sb[ine] = sbi
        return cu, sb

    def empresa(eid):
        return eid.split("-")[0]

    # Media de encuestas: la última de cada empresa con trabajo de campo terminado en los últimos
    # VENTANA_MEDIA días. Media simple (sin ponderar) de las proyecciones provinciales de cada una.
    # Requisitos: publicación original verificable (medio que la encarga o web de la empresa) y fechas
    # de trabajo de campo publicadas; las que no los cumplen llevan "excluir_media" con el motivo.
    hoy = date.fromisoformat(__import__("os").environ.get("VCD_HOY", date.today().isoformat()))
    ultimas = {}
    for eid, e in enc.items():
        if e.get("excluir_media"):  # sin publicación original verificable o sin fechas de campo publicadas
            continue
        fin = (e.get("trabajo_campo") or {}).get("fin")
        if not fin or (hoy - date.fromisoformat(fin)).days > VENTANA_MEDIA:
            continue
        prev = ultimas.get(empresa(eid))
        if prev is None or fin > enc[prev]["trabajo_campo"]["fin"]:
            ultimas[empresa(eid)] = eid
    media_ids = sorted(ultimas.values(), key=lambda i: enc[i]["trabajo_campo"]["fin"], reverse=True)
    if not veda and len(media_ids) >= 2:
        proy = [proyectar(i) for i in media_ids]
        cu, sb = {}, {}
        for c in circs:
            ine = c["ine"]
            q, sbi = {}, []
            for k in [x["id"] for x in c["candidaturas"]] + ["_otros"]:
                vals = [p[0][ine][k] for p in proy if k in p[0][ine] and k not in p[1][ine]]
                if vals:
                    q[k] = sum(vals) / len(vals)
                else:
                    sbi.append(k)
            f = (1 - blancos[ine]) / sum(q.values())
            q = {kk: v * f for kk, v in q.items()}
            q["_blanco"] = blancos[ine]
            cu[ine], sb[ine] = q, sbi
        lista = "; ".join(f"{NOMBRE_EMPRESA.get(empresa(i), empresa(i))} ({enc[i]['fecha_publicacion'][8:10].lstrip('0')}-{MESES[int(enc[i]['fecha_publicacion'][5:7])]})" for i in media_ids)
        escenarios.insert(0, {
            "id": "media",
            "nombre": f"Media de encuestas ({len(media_ids)} empresas)",
            "descripcion": f"Media de la última encuesta de cada empresa cuyas entrevistas terminaron en los últimos {VENTANA_MEDIA} días. Entran estas (con su fecha de publicación): {lista}. Trasladamos cada encuesta a tu provincia (si en España un partido tiene un 10 % más de voto que en 2023, por ejemplo del 20 % al 22 %, le damos un 10 % más en cada provincia) y hacemos la media.",
            "fecha": max(enc[i]["fecha_publicacion"] for i in media_ids),
            "encuestas": media_ids,
            "fuentes": [{"url": (enc[i]["urls"]["primarias"][0] if isinstance(enc[i]["urls"]["primarias"][0], str) else enc[i]["urls"]["primarias"][0].get("url")),
                         "titulo": NOMBRE_EMPRESA.get(empresa(i), empresa(i))} for i in media_ids],
            "k": K_ENCUESTA,
            "cuotas": cu,
            "sin_base": sb,
        })

    for eid in ([] if veda else ESCENARIOS_ENCUESTA):
        e = enc[eid]
        cu, sb = proyectar(eid)
        tc = e.get("trabajo_campo") or {}
        escenarios.append({
            "id": eid,
            "nombre": NOMBRES[eid],
            "descripcion": f"Encuesta con {miles_txt(e.get('muestra_n'))} entrevistas hechas {periodo_txt(tc.get('inicio'), tc.get('fin'))}. La trasladamos a tu provincia: si en España un partido tiene un 10 % más de voto que en 2023, por ejemplo del 20 % al 22 %, le damos un 10 % más en cada provincia. Los partidos que la encuesta no recoge conservan su voto de 2023.",
            "fecha": e["fecha_publicacion"],
            "fuentes": [{"url": u if isinstance(u, str) else u.get("url"), "titulo": "publicación original"} for u in e["urls"]["primarias"][:2]],
            "k": K_ENCUESTA,
            "cuotas": cu,
            "sin_base": sb,
        })

    if errores:
        print("\n".join(errores))
        sys.exit(1)

    nombre_partido = {p["id"]: p["nombre"] for p in load("partidos/partidos.json")["partidos"]}

    # Coste nacional 2023 (votos por diputado) de cada partido; la web solo lo muestra cuando la
    # papeleta es la del partido solo (no una coalición, que en 2023 no concurrió así).
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
    # La agrupación «PSOE» de 2023 incluye al PSC: el PSOE se queda sin él (el PSC tiene la suya).
    tot["_PSOE"] = [tot["PSOE"][0] - tot["_PSC"][0], tot["PSOE"][1] - tot["_PSC"][1]]
    for pid, ag in {"pp": "PP", "psoe": "_PSOE", "vox": "VOX", "erc": "ERC", "junts": "JxCAT - JUNTS", "eh_bildu": "EH Bildu",
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
                           {"url": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-13092", "titulo": "Resultados europeas 2024 (JEC)"},
                           {"url": "https://www.juntadeandalucia.es/boja/2026/108/BOJA26-108-00091-7541-01_00338776.pdf",
                            "titulo": "Resultados autonómicas andaluzas 2026 (Junta Electoral de Andalucía, BOJA núm. 108)"}],
        },
        "circunscripciones": circs,
        "escenarios": escenarios,
        "logos": {pid: credito(m, f"Logotipo de {nombre_partido.get(pid, pid)}") for pid, m in imgs["partidos"].items()},
        "creditos_imagenes": sorted(creditos.values(), key=lambda c: c["que"]),
        "coste_nacional_2023": coste,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))

    # ---- Validación / informe ----
    rep = []
    rep.append(f"Circunscripciones: {len(circs)}; escaños: {sum(c['escanos'] for c in circs)}; candidaturas: {sum(len(c['candidaturas']) for c in circs)}")
    for esc in escenarios:
        tot_esc = defaultdict(int)
        prov_esc = defaultdict(int)  # (ine, clave) -> escaños
        for c in circs:
            q = esc["cuotas"][c["ine"]]
            ids = [k["id"] for k in c["candidaturas"] if k["id"] in q]
            v = [q[i] * c["validos_ref"] for i in ids]
            s = dhondt(v, c["escanos"], c["validos_ref"])
            for i, n in zip(ids, s):
                tot_esc[clave_de[(c["ine"], i)]] += n
                prov_esc[(c["ine"], clave_de[(c["ine"], i)])] += n
            suma = sum(q.values())
            assert abs(suma - 1) < 1e-6, (esc["id"], c["ine"], suma)
        assert sum(tot_esc.values()) == 350, esc["id"]
        rep.append(f"\n[{esc['id']}] escaños del escenario central (2026, 350):")
        rep.append("  " + ", ".join(f"{k} {v}" for k, v in sorted(tot_esc.items(), key=lambda kv: -kv[1]) if v))
        if esc["id"] in enc:
            pe = enc[esc["id"]].get("proyeccion_escanos")
            rep.append(f"  publicado por la encuesta: {json.dumps(pe, ensure_ascii=False)[:400]}")
            dr = enc[esc["id"]].get("desglose_regional")
            if dr and dr.get("nivel") == "provincia" and all(lab in ETIQUETAS for lab in dr.get("etiquetas_columnas") or [None]):
                rep.append("  " + horquillas_provinciales(dr, prov_esc))
    rep.append("\nCuota base nacional por clave: " + ", ".join(f"{k} {v*100:.2f}%" for k, v in sorted(base_nac.items(), key=lambda kv: -kv[1])[:25]))
    rep.append("\nAvisos:\n" + "\n".join(log))
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text("\n".join(rep))
    print("\n".join(rep[:40]))


if __name__ == "__main__":
    main()
