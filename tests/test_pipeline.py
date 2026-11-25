"""Tests de invariantes del pipeline de datos. Ejecutar tras pipeline/build_web.py:
    python3 -I -m unittest discover -s tests -v
"""
import json
import sys
import unittest
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

from dhondt import dhondt  # noqa: E402
from verify_quotes import norm  # noqa: E402
import build_fase2  # noqa: E402

F2 = json.loads((ROOT / "web/public/data/fase2.json").read_text())
G23 = json.loads((ROOT / "data/resultados/generales_2023.json").read_text())["circunscripciones"]
E24 = json.loads((ROOT / "data/resultados/europeas_2024.json").read_text())["circunscripciones"]
BASE = next(e for e in F2["escenarios"] if e["id"] == "g2023")


def votos_base(ine, partido):
    c = next(c for c in F2["circunscripciones"] if c["ine"] == ine)
    ids = [k["id"] for k in c["candidaturas"] if k["partido"] == partido]
    return sum(BASE["cuotas"][ine].get(i, 0) for i in ids) * c["validos_ref"]


class TestDhondt(unittest.TestCase):
    def test_ejemplo_loreg(self):
        self.assertEqual(dhondt([168000, 104000, 72000, 64000, 40000, 32000], 8, 480000), [4, 2, 1, 1, 0, 0])

    def test_umbral(self):
        self.assertEqual(dhondt([60000, 37001, 2999], 40, 100000)[2], 0)

    def test_reproduce_2023(self):
        for ine, c in G23.items():
            v = [k["votos"] for k in c["candidaturas"]]
            self.assertEqual(dhondt(v, c["escanos"], c["validos"]), [k["escanos"] for k in c["candidaturas"]], ine)


class TestEscenarios(unittest.TestCase):
    def test_estructura(self):
        self.assertEqual(len(F2["circunscripciones"]), 52)
        self.assertEqual(sum(c["escanos"] for c in F2["circunscripciones"]), 350)

    def test_cuotas_suman_uno_y_cubren_candidaturas(self):
        for esc in F2["escenarios"]:
            for c in F2["circunscripciones"]:
                q = esc["cuotas"][c["ine"]]
                self.assertAlmostEqual(sum(q.values()), 1.0, places=6, msg=(esc["id"], c["ine"]))
                sin = set(esc.get("sin_base", {}).get(c["ine"], []))
                for k in c["candidaturas"]:
                    self.assertTrue((k["id"] in q) != (k["id"] in sin), (esc["id"], c["ine"], k["id"]))

    def test_vox_base_igual_a_2023(self):
        # Vox concurre igual en 2023 y 2026: el escenario base debe reproducir su voto oficial.
        total = sum(votos_base(c["ine"], "vox") for c in F2["circunscripciones"])
        oficial = sum(k["votos"] for c in G23.values() for k in c["candidaturas"] if k["siglas"] == "VOX")
        self.assertAlmostEqual(total, oficial, delta=1)

    def test_reparto_sumar_conserva_votos(self):
        # Donde concurren Frente Amplio y Podemos, se reparten exactamente el voto de SUMAR 2023,
        # en la proporción de las europeas 2024 de esa provincia.
        comprobadas = 0
        for c in F2["circunscripciones"]:
            partidos = {k["partido"] for k in c["candidaturas"]}
            if not {"frente_amplio", "podemos"} <= partidos:
                continue
            fa, pod = votos_base(c["ine"], "frente_amplio"), votos_base(c["ine"], "podemos")
            sumar = sum(k["votos"] for k in G23[c["ine"]]["candidaturas"] if k["siglas"] == "SUMAR")
            self.assertAlmostEqual(fa + pod, sumar, delta=1, msg=c["ine"])
            eu = defaultdict(int)
            for k in E24[c["ine"]]["candidaturas"]:
                eu[k["siglas"]] += k["votos"]
            self.assertAlmostEqual(fa / (fa + pod), eu["SUMAR"] / (eu["SUMAR"] + eu["PODEMOS"]), places=6)
            comprobadas += 1
        self.assertGreater(comprobadas, 20)

    def test_adelante_andalucia_perfil_autonomicas(self):
        # Base 2023: solo Cádiz (único sitio donde concurrió). Encuestas que la recogen: las 8 provincias,
        # proporcional a su cuota en las autonómicas andaluzas de 2026. Encuestas que no: sin estimación.
        and26 = json.loads((ROOT / "data/resultados/autonomicas_andalucia_2026.json").read_text())["circunscripciones"]
        enc = {e["id"]: e for e in json.loads((ROOT / "data/encuestas/encuestas.json").read_text())["encuestas"]}
        aa = {c["ine"]: k["id"] for c in F2["circunscripciones"] for k in c["candidaturas"] if k["partido"] == "adelante_andalucia"}
        self.assertEqual(sorted(aa), sorted(and26))
        self.assertEqual([i for i in aa if aa[i] in BASE["cuotas"][i]], ["11"])
        perfil = {i: sum(k["votos"] for k in r["candidaturas"] if k["siglas"] == "ADELANTE ANDALUCÍA") / r["validos"]
                  for i, r in and26.items()}
        con = 0
        for esc in F2["escenarios"]:
            if esc["id"] not in enc:
                continue
            labs = {p["partido"] for p in enc[esc["id"]]["estimacion_voto"]}
            if any(build_fase2.ETIQUETAS.get(lab) == "adelante_andalucia" for lab in labs):
                r = [esc["cuotas"][i][aa[i]] / perfil[i] for i in aa]
                self.assertLess(max(r) / min(r), 1.1, esc["id"])  # solo difiere por la renormalización
                con += 1
            else:
                self.assertTrue(all(aa[i] in esc["sin_base"][i] for i in aa), esc["id"])
        self.assertGreater(con, 0)

    def test_solo_candidaturas_del_boe(self):
        boe = json.loads((ROOT / "data/boe/candidaturas_congreso.json").read_text())["circunscripciones"]
        for c in F2["circunscripciones"]:
            self.assertEqual(len(c["candidaturas"]), len(boe[c["ine"]]["candidaturas"]), c["ine"])


class TestPartidosYPapeletas(unittest.TestCase):
    """Pasos 1 y 2: partidos; paso 3: papeletas (decisión del editor, 13-nov-2026)."""

    PART = {p["id"]: p for p in json.loads((ROOT / "data/partidos/partidos.json").read_text())["partidos"]}

    def papeleta(self, pid, ine):
        c = next(c for c in F2["circunscripciones"] if c["ine"] == ine)
        return next((k for k in c["candidaturas"] if k["partido"] == pid), None) or \
            next((k for k in c["candidaturas"] if pid in (k.get("afines") or [])), None)

    def test_papeletas_al_dia(self):
        import papeletas
        calc = papeletas.calcular()
        for pid, p in self.PART.items():
            self.assertEqual(p.get("papeletas"), calc.get(pid, []), pid)

    def test_coaliciones_regionales(self):
        self.assertEqual(self.papeleta("pp", "31")["siglas"], "UPN-PP")  # Navarra
        self.assertEqual(self.papeleta("upn", "31")["siglas"], "UPN-PP")
        self.assertEqual(self.papeleta("podemos", "35")["siglas"], "NC-BC, PODEMOS, IU, SUMAR")  # Las Palmas
        self.assertEqual(self.papeleta("frente_amplio", "07")["siglas"], "ARAMÉS-EU-MS")  # Illes Balears
        for ine in ("03", "12", "46"):
            for pid in ("compromis", "podemos", "frente_amplio", "erc"):
                self.assertEqual(self.papeleta(pid, ine)["siglas"], "COMPROMIS-EUPV-PODEM-ERPV", (pid, ine))
        # Coalición cuyo partido principal no está en la web: el PNV va dentro de Geroa Bai en Navarra.
        self.assertEqual(self.papeleta("pnv", "31")["siglas"], "GBAI")

    def test_ningun_partido_de_la_web_sin_su_coalicion(self):
        """Toda coalición del BOE que firma un partido de la web le da papeleta (salvo que no esté en los pasos 1 y 2)."""
        coal = json.loads((ROOT / "data/boe/coaliciones.json").read_text())
        nombres = {"EUZKO ALDERDI JELTZALEA - PARTIDO NACIONALISTA VASCO": "pnv", "UNIÓN DEL PUEBLO NAVARRO": "upn",
                   "PARTIDO POPULAR": "pp", "PODEMOS": "podemos", "ESQUERRA REPUBLICANA DEL PAÍS VALENCIÀ": "erc",
                   "IZQUIERDA UNIDA": "frente_amplio", "IZQUIERDA UNIDA CANARIA": "frente_amplio", "MOVIMIENTO SUMAR": "frente_amplio"}
        for siglas, k in coal.items():
            if k.get("tipo") != "coalición":
                continue
            for m in k.get("miembros", []):
                pid = nombres.get(m["nombre"].upper())
                for ine in (k.get("ambito") or []):
                    if pid:
                        self.assertIsNotNone(self.papeleta(pid, ine), (siglas, pid, ine))

    def test_comunidades_salen_de_las_papeletas(self):
        pub = {p["id"]: p for p in json.loads((ROOT / "web/public/data/partidos.json").read_text())["partidos"]}
        self.assertIn("Comunitat Valenciana", pub["erc"]["comunidades"])
        self.assertIn("Navarra", pub["pnv"]["comunidades"])
        self.assertEqual(pub["upn"]["comunidades"], ["Navarra"])
        self.assertNotIn("Cataluña", pub["psoe"]["comunidades"])  # allí solo está el PSC, su partido afín

    def test_coste_2023_del_psoe_sin_el_psc(self):
        c = F2["coste_nacional_2023"]
        self.assertEqual((c["psoe"]["escanos"], c["psc"]["escanos"]), (102, 19))

    def test_entradas_son_partidos(self):
        self.assertEqual({k: self.PART[k]["siglas"] for k in ("upn", "upc", "ara_mes_fa", "compromis", "cc")},
                         {"upn": "UPN", "upc": "NC-BC", "ara_mes_fa": "Ara Més", "compromis": "Compromís", "cc": "CCa"})

    def test_sin_posiciones_heredadas(self):
        f1 = json.loads((ROOT / "web/public/data/fase1.json").read_text())
        self.assertFalse([(p, q) for p, qs in f1["posiciones"].items() for q, x in qs.items() if x.get("heredada_de")])
        # UPN solo con lo que dicen sus líderes o lo que firma: nada atribuido a dirigentes del PP.
        pp = ("Feijóo", "Sayas", "Alba", "Tellado", "Gamarra")
        self.assertFalse([q for q, x in f1["posiciones"].get("upn", {}).items()
                          if x.get("valor") is not None and any(n in (x.get("quien") or "") for n in pp)])


    def test_grupos_en_orden_numerico(self):
        # g10 se aplica después de g2–g9 (con orden alfabético, g2–g9 pisarían sus celdas).
        f1 = json.loads((ROOT / "web/public/data/fase1.json").read_text())
        q04 = f1["posiciones"]["compromis"]["q04"]
        self.assertEqual((q04["valor"], q04["fuente"]), (2, "programa"))


    def test_psc_asume_el_programa_del_psoe(self):
        # Decisión del editor (15-nov): el paso 2 del PSC muestra el programa del PSOE; el paso 1 toma sus posiciones de programa.
        f3 = json.loads((ROOT / "web/public/data/fase3.json").read_text())["partidos"]
        self.assertEqual((f3["psc"]["base"], f3["psc"].get("programa_de")), ("programa", "psoe"))
        self.assertEqual([x["id"] for x in f3["psc"]["propuestas"]], [x["id"] for x in f3["psoe"]["propuestas"]])
        f1 = json.loads((ROOT / "web/public/data/fase1.json").read_text())["posiciones"]
        self.assertEqual(f1["psc"]["q42"]["valor"], f1["psoe"]["q42"]["valor"])

    def test_programas_retirados_enlazan_la_copia_archivada(self):
        # Si un partido retira su PDF (Compromís, 18-nov, hasta que lo republicó esa tarde), ningún enlace
        # de la web debe llevar a la URL original (404): build_web la sustituye por la copia archivada.
        import re
        import build_web
        cat = json.loads((ROOT / "data/partidos/partidos.json").read_text())["partidos"]
        retirados = [p["programa"] for p in cat if (p.get("programa") or {}).get("url_archivada")]
        for nombre in ("partidos.json", "fase1.json", "fase3.json"):
            s = (ROOT / "web/public/data" / nombre).read_text()
            for pr in retirados:
                self.assertFalse(re.search(r'"' + re.escape(pr["url"]), s), (nombre, pr["url"]))
        # El mecanismo, aunque hoy no haya ningún programa retirado.
        import tempfile
        with tempfile.TemporaryDirectory() as d:
            viejo_out, viejo_arch = build_web.OUT, dict(build_web.ARCHIVADAS)
            try:
                build_web.OUT = Path(d)
                build_web.ARCHIVADAS.clear()
                build_web.ARCHIVADAS["https://x.org/p.pdf"] = "https://web.archive.org/web/1id_/https://x.org/p.pdf"
                build_web.write("t.json", {"a": "https://x.org/p.pdf", "b": "https://x.org/p.pdf#page=3", "c": "https://x.org/p.pdf.bak"})
                s = (Path(d) / "t.json").read_text()
            finally:
                build_web.OUT = viejo_out
                build_web.ARCHIVADAS.clear()
                build_web.ARCHIVADAS.update(viejo_arch)
        self.assertEqual(json.loads(s), {"a": "https://web.archive.org/web/1id_/https://x.org/p.pdf",
                                         "b": "https://web.archive.org/web/1id_/https://x.org/p.pdf#page=3",
                                         "c": "https://x.org/p.pdf.bak"})


class TestDespliegueSinCortes(unittest.TestCase):
    def test_datos_con_nombre_por_contenido(self):
        import hashlib
        m = json.loads((ROOT / "web/public/data/manifest.json").read_text())["actual"]["datos"]
        self.assertEqual(set(m), {"partidos.json", "fase1.json", "fase2.json", "fase3.json"})
        for nombre, ruta in m.items():
            copia = (ROOT / "web/public/data" / ruta).read_bytes()
            self.assertEqual(copia, (ROOT / "web/public/data" / nombre).read_bytes(), nombre)
            self.assertIn(hashlib.sha256(copia).hexdigest()[:12], ruta)

    def test_conservar_versiones(self):
        import tempfile
        import conservar_versiones as cv
        with tempfile.TemporaryDirectory() as d:
            dist = Path(d)
            (dist / "assets").mkdir()
            (dist / "assets" / "index-NUEVO.js").write_text("x")
            (dist / "data" / "v").mkdir(parents=True)
            (dist / "data" / "manifest.json").write_text(json.dumps({"actual": {"datos": {"fase1.json": "v/fase1-nuevo.json"}}}))
            publicado = {
                "actual": {"datos": {"fase1.json": "v/fase1-viejo.json"}, "assets": ["assets/index-VIEJO.js"]},
                # Rutas que un manifiesto alterado podría usar para escribir fuera: se ignoran.
                "historial": [{"datos": {"x": "../../fuera.json"}, "assets": ["../fuera.js", "assets/a/b.js"]}],
            }
            pedidas = []

            def falso(url, timeout=30):
                pedidas.append(url)
                return json.dumps(publicado).encode() if url.endswith("/data/manifest.json") else b"contenido"

            original = cv.descargar
            cv.descargar = falso
            try:
                cv.main(dist, "https://ejemplo.org")
            finally:
                cv.descargar = original
            self.assertTrue((dist / "assets" / "index-VIEJO.js").exists())
            self.assertTrue((dist / "data" / "v" / "fase1-viejo.json").exists())
            self.assertFalse(any("fuera" in u or "a/b.js" in u for u in pedidas))
            m = json.loads((dist / "data" / "manifest.json").read_text())
            self.assertEqual(m["actual"]["assets"], ["assets/index-NUEVO.js"])
            self.assertEqual(m["historial"][0]["assets"], ["assets/index-VIEJO.js"])



class TestCitas(unittest.TestCase):
    def test_normalizacion_solo_de_extraccion(self):
        self.assertEqual(norm("vivien-\nda  «pública»"), norm('vivienda "pública"'))
        self.assertNotEqual(norm("vivienda pública"), norm("vivienda privada"))

    def test_voto_de_cada_partido_en_el_congreso(self):
        # Revisión experta del 20-nov: el voto de un partido sale del voto nominal de sus diputados (más del 75 % en un
        # sentido; si no, «dividido»); quien dejó el grupo de su formación sin asignación nominal no cuenta.
        import votaciones_fase1 as vf
        mapas = ({"PP|GP": "pp", "PSOE|GS": "psoe", "SUMAR|GSUMAR": "frente_amplio"}, {"Belarra, I": {"partido": "podemos"}})
        formacion = {"a": "PP", "b": "PP", "c": "PP", "d": "PP", "e": "PSOE", "f": "PSOE", "g": "PSOE", "h": "PSOE", "x": "PSOE", "Belarra, I": "SUMAR"}
        raw = {"votaciones": [
            {"diputado": "a", "grupo": "GP", "voto": "Sí"}, {"diputado": "b", "grupo": "GP", "voto": "Sí"},
            {"diputado": "c", "grupo": "GP", "voto": "Sí"}, {"diputado": "d", "grupo": "GP", "voto": "Sí"},
            {"diputado": "e", "grupo": "GS", "voto": "No"}, {"diputado": "f", "grupo": "GS", "voto": "No"},
            {"diputado": "g", "grupo": "GS", "voto": "Sí"}, {"diputado": "h", "grupo": "GS", "voto": "No vota"},
            {"diputado": "x", "grupo": "GMx", "voto": "Sí"}, {"diputado": "Belarra, I", "grupo": "GMx", "voto": "Abstención"}]}
        r = vf.voto_partidos(raw, formacion, mapas)
        self.assertEqual(r["pp"]["voto"], "Sí")
        self.assertEqual(r["psoe"]["voto"], "dividido")  # 2 de 3 (67 %) no llega al 75 %; «No vota» no cuenta
        self.assertEqual(r["psoe"]["detalle"], {"No": 2, "Sí": 1})  # el del Mixto no cuenta para el PSOE
        self.assertEqual(r["podemos"]["voto"], "Abstención")

    def test_votaciones_publicadas_coinciden_con_la_copia_oficial(self):
        # Cada votación publicada en el paso 1 tiene su JSON oficial en el repositorio y sus totales coinciden.
        f1 = json.loads((ROOT / "web/public/data/fase1.json").read_text())
        sel = {v["id"]: v for v in json.loads((ROOT / "data/fase1/votaciones.json").read_text())["votaciones"]}
        for q, vs in (f1.get("votaciones") or {}).items():
            for v in vs:
                raw = json.loads((ROOT / sel[v["id"]]["fichero"]).read_text())
                self.assertEqual(v["totales"], raw["totales"], v["id"])
                self.assertEqual(sel[v["id"]]["pregunta"], q)


if __name__ == "__main__":
    unittest.main()
