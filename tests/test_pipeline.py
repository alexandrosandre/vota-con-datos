"""Tests de invariantes del pipeline de datos. Ejecutar tras pipeline/build_web.py:
    python3 -I -m unittest discover -s tests -v
"""
import json
import sys
import unittest
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))

from dhondt import dhondt  # noqa: E402
from verify_quotes import norm  # noqa: E402
import build_fase2  # noqa: E402

F2 = json.loads((ROOT / "web/public/data/fase2.json").read_text())
G23 = json.loads((ROOT / "data/resultados/generales_2023.json").read_text())["circunscripciones"]
E24 = json.loads((ROOT / "data/resultados/europeas_2024.json").read_text())["circunscripciones"]
BASE = next(e for e in F2["escenarios"] if e["id"] == "g2023")
MAD = ZoneInfo("Europe/Madrid")


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


class TestVeda(unittest.TestCase):
    def test_limites(self):
        f = build_fase2.en_veda
        self.assertFalse(f(datetime(2026, 11, 23, 21, 59, tzinfo=MAD)))
        self.assertTrue(f(datetime(2026, 11, 23, 22, 0, tzinfo=MAD)))  # margen de 2 h
        self.assertTrue(f(datetime(2026, 11, 24, 0, 0, tzinfo=MAD)))
        self.assertTrue(f(datetime(2026, 11, 29, 19, 59, tzinfo=MAD)))
        self.assertFalse(f(datetime(2026, 11, 29, 20, 0, tzinfo=MAD)))


class TestCitas(unittest.TestCase):
    def test_normalizacion_solo_de_extraccion(self):
        self.assertEqual(norm("vivien-\nda  «pública»"), norm('vivienda "pública"'))
        self.assertNotEqual(norm("vivienda pública"), norm("vivienda privada"))


if __name__ == "__main__":
    unittest.main()
