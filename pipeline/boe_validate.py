#!/usr/bin/env python3
"""Validate data/boe/*.json produced by pipeline/boe_parse.py.

Checks:
  1. 52 circunscripciones (50 provinces + Ceuta 51 + Melilla 52), same codes in both files.
  2. Seats sum to 350 and match between files.
  3. Every proclaimed candidatura has n_titulares == escaños (exceptions are listed, not hidden).
  4. No duplicate siglas / orden within a circunscripción; cabeza_lista present.
  5. Spot-check: independent re-reading of the BOE *PDF* (pdftotext -layout) for several
     circunscripciones, compared side by side with the JSON (heading, cabeza de lista,
     number of titulares). Differences explained by the published corrección de errores
     are reported as such.
  6. Summary table: number of circunscripciones in which each siglas stands
     (written to data/boe/resumen_siglas.csv).

Run: python3 -I pipeline/boe_validate.py   (exit code 1 if a hard check fails)
"""
import collections
import csv
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "boe"
SRC = ROOT / "data" / "sources" / "boe"
PDF = SRC / "BOE-A-2026-23103.pdf"

SPOT = ["28", "11", "08", "51", "26", "31", "01", "35", "43", "44"]

EXPECTED_CODES = {f"{i:02d}" for i in range(1, 53)}

failures = []
warnings = []


def fail(msg):
    failures.append(msg)
    print("FAIL", msg)


def warn(msg):
    warnings.append(msg)
    print("WARN", msg)


def ok(msg):
    print("OK  ", msg)


def main():
    circ = json.loads((DATA / "circunscripciones.json").read_text())
    cand = json.loads((DATA / "candidaturas_congreso.json").read_text())
    seats = {c["ine"]: c["escanos"] for c in circ["circunscripciones"]}
    cc = cand["circunscripciones"]

    # 1. codes
    if set(seats) == EXPECTED_CODES and len(circ["circunscripciones"]) == 52:
        ok("circunscripciones.json: 52 circunscripciones, INE 01..52")
    else:
        fail(f"circunscripciones.json codes: {sorted(set(seats) ^ EXPECTED_CODES)}")
    if set(cc) == EXPECTED_CODES:
        ok("candidaturas_congreso.json: 52 circunscripciones, INE 01..52")
    else:
        fail(f"candidaturas_congreso.json codes: {sorted(set(cc) ^ EXPECTED_CODES)}")

    # 2. seats
    total = sum(seats.values())
    (ok if total == 350 else fail)(f"suma de escaños = {total}")
    mism = [k for k in cc if cc[k]["escanos"] != seats.get(k)]
    (ok if not mism else fail)(f"escaños coinciden entre ficheros (discrepancias: {mism})")
    for k, n in (("28", 38), ("11", 8)):
        print(f"     {k} {cc[k]['nombre']}: {seats[k]} escaños (prensa decía {n})")

    # 3./4. per candidatura
    n_cand = 0
    exceptions = []
    for k in sorted(cc):
        c = cc[k]
        if c.get("anomalias_parseo"):
            fail(f"{k} anomalías de parseo: {c['anomalias_parseo']}")
        ordenes = [x["orden"] for x in c["candidaturas"] + c["no_proclamadas"]]
        if sorted(ordenes) != list(range(1, len(ordenes) + 1)):
            warn(f"{k} {c['nombre']}: números de orden no correlativos {sorted(ordenes)}")
        if len(set(ordenes)) != len(ordenes):
            fail(f"{k} orden duplicado {ordenes}")
        sig = [x["siglas"] for x in c["candidaturas"] if x["siglas"] is not None]
        dup = [s for s, n in collections.Counter(sig).items() if n > 1]
        if dup:
            fail(f"{k} siglas duplicadas: {dup}")
        den = [x["denominacion"] for x in c["candidaturas"]]
        dupd = [s for s, n in collections.Counter(den).items() if n > 1]
        if dupd:
            warn(f"{k} denominaciones duplicadas: {dupd}")
        for x in c["candidaturas"]:
            n_cand += 1
            if not x["cabeza_lista"]:
                fail(f"{k} sin cabeza de lista: {x['encabezado_boe']}")
            if x["n_titulares"] != c["escanos"]:
                exceptions.append((k, c["nombre"], c["escanos"], x["orden"], x["encabezado_boe"], x["n_titulares"]))
            if x["siglas"] is None:
                warn(f"{k} {c['nombre']}: '{x['encabezado_boe']}' publicada sin siglas (siglas=null)")
            if x["split_ambiguo"]:
                warn(f"{k} {c['nombre']}: división denominación/siglas ambigua: '{x['encabezado_boe']}' "
                     f"-> den='{x['denominacion']}' siglas='{x['siglas']}'")
    ok(f"{n_cand} candidaturas proclamadas; {sum(len(c['no_proclamadas']) for c in cc.values())} "
       "marcadas 'No proclamada.'")
    ok("sin siglas duplicadas dentro de ninguna circunscripción" if not any(
        "siglas duplicadas" in f for f in failures) else "hay siglas duplicadas")
    if exceptions:
        for e in exceptions:
            fail("n_titulares != escaños: {} {} (escaños {}) orden {} '{}' -> {} titulares".format(*e))
    else:
        ok("todas las candidaturas tienen n_titulares == escaños de su circunscripción")

    # 5. spot-check against the PDF
    spot_check(cc, cand["meta"]["correcciones_aplicadas"])

    # 6. summary table
    by_sig = collections.defaultdict(list)
    for k, c in cc.items():
        for x in c["candidaturas"]:
            by_sig[x["siglas"]].append(k)
    rows = sorted(by_sig.items(), key=lambda kv: (-len(kv[1]), str(kv[0])))
    with (DATA / "resumen_siglas.csv").open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["siglas", "n_circunscripciones", "ine"])
        for s, ks in rows:
            w.writerow(["" if s is None else s, len(ks), " ".join(sorted(ks))])
    print("\nResumen: siglas -> nº de circunscripciones (data/boe/resumen_siglas.csv)")
    for s, ks in rows:
        print(f"  {len(ks):3d}  {s if s is not None else '(sin siglas)'}")

    print(f"\n{len(failures)} fallos, {len(warnings)} avisos")
    return 1 if failures else 0


# ----------------------------------------------------------------- spot-check

NOISE = re.compile(r"^(cve: BOE-A-|Verificable en https://www\.boe\.es|BOLETÍN OFICIAL DEL ESTADO|"
                   r"Núm\. \d+ .* Pág\. \d+|ISSN: |D\. L\.: )")


def pdf_text():
    raw = subprocess.run(["pdftotext", "-layout", str(PDF), "-"], check=True,
                         capture_output=True, text=True).stdout
    lines = [" ".join(l.split()) for l in raw.splitlines()]
    return " ".join(l for l in lines if l and not NOISE.match(l))


def flex(s):
    """Regex matching s with flexible whitespace (PDF line wrapping)."""
    return r"\s*".join(re.escape(tok) for tok in s.split()).replace(r"\.\s*", r"\.\s*")


def count_titulares(segment):
    head = re.split(r"\bSuplentes?:", segment)[0]
    nums = [int(n) for n in re.findall(r"(?:^|\s)(\d+)\.\s+(?=[A-ZÁÉÍÓÚÑÜÀÈÒÇ])", head)]
    k = 0
    for n in nums:
        if n == k + 1:
            k = n
    return k, head


def spot_check(cc, corr_log):
    text = pdf_text()
    corrected = {(e["ine"], e["candidatura"]) for e in corr_log if e["aplicada"] == "si"}
    corrected_any = {e["ine"] for e in corr_log if e["aplicada"] == "si" and e["camara"] == "congreso"}
    print("\nSpot-check contra el PDF del BOE (pdftotext -layout), lado a lado:")
    for k in SPOT:
        c = cc[k]
        jm = re.search(flex(c["junta_boe"]), text)
        if not jm:
            fail(f"spot {k}: no encuentro '{c['junta_boe']}' en el PDF")
            continue
        start = text.find("CONGRESO DE LOS DIPUTADOS", jm.end())
        end = text.find("SENADO", start)
        sec = text[start:end]
        items = sorted(c["candidaturas"] + [dict(x, cabeza_lista=None, n_titulares=0)
                                            for x in c["no_proclamadas"]], key=lambda x: x["orden"])
        # headings replaced by the corrección de errores: look for the original wording
        renamed = {e["debe_decir"][0]: e["donde_dice"][0] for e in corr_log
                   if e["ine"] == k and e["camara"] == "congreso" and e["aplicada"] == "si"
                   and len(e["debe_decir"]) == 1 and re.match(r"\d+\. [^a-z]", e["debe_decir"][0])}
        pos = []
        for x in items:
            m = re.search(r"(?:^|\s)" + flex(x["encabezado_boe"]), sec)
            if not m and x["encabezado_boe"] in renamed:
                m = re.search(r"(?:^|\s)" + flex(renamed[x["encabezado_boe"]]), sec)
                if m:
                    warn(f"spot {k}: PDF original dice '{renamed[x['encabezado_boe']]}'; JSON usa "
                         f"'{x['encabezado_boe']}' según la corrección de errores")
            pos.append(m.start() if m else None)
        print(f"\n  [{k}] {c['nombre']} ({c['escanos']} escaños) — {c['junta_boe']}")
        print(f"   {'ord':>3} {'JSON siglas':<28} {'JSON cabeza':<38} {'tit':>3} | PDF: cabeza  tit")
        for i, x in enumerate(items):
            p = pos[i]
            nxt = next((q for q in pos[i + 1:] if q is not None), len(sec))
            if p is None:
                exp = k in corrected_any
                (warn if exp else fail)(
                    f"spot {k}: encabezado '{x['encabezado_boe']}' no aparece en el PDF original"
                    + (" (esperable: corregido por corrección de errores)" if exp else ""))
                continue
            seg = sec[p:nxt]
            if x["cabeza_lista"] is None:
                okp = "No proclamada" in seg
                print(f"   {x['orden']:>3} {'(no proclamada)':<28} {'':<38} {'':>3} | "
                      f"{'«No proclamada» OK' if okp else 'NO ENCONTRADO'}")
                if not okp:
                    fail(f"spot {k}: '{x['encabezado_boe']}' no figura como No proclamada en PDF")
                continue
            ntit, head = count_titulares(seg)
            cab_ok = re.search(r"(?:^|\s)1\.\s*" + flex(x["cabeza_lista"]), head) is not None
            mark = ("=" if cab_ok else "≠") + ("=" if ntit == x["n_titulares"] else "≠")
            print(f"   {x['orden']:>3} {str(x['siglas'])[:28]:<28} {x['cabeza_lista'][:38]:<38} "
                  f"{x['n_titulares']:>3} | {'OK' if cab_ok else 'DIFIERE':<7} {ntit:>3}  {mark}")
            if not (cab_ok and ntit == x["n_titulares"]):
                cands_corr = [e for e in corr_log if e["ine"] == k and e["camara"] == "congreso"
                              and e["aplicada"] == "si" and (e["candidatura"] in (None, x["encabezado_boe"]))]
                if cands_corr:
                    warn(f"spot {k} orden {x['orden']}: PDF original difiere del JSON; explicado por "
                         f"corrección {cands_corr[0]['boe_id']}: {cands_corr[0]['debe_decir'][:2]}")
                else:
                    fail(f"spot {k} orden {x['orden']}: PDF difiere (cabeza_ok={cab_ok}, "
                         f"titulares_pdf={ntit}, json={x['n_titulares']})")


if __name__ == "__main__":
    sys.exit(main())
