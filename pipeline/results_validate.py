"""Validate data/resultados/generales_2023.json and europeas_2024.json.

Run:  python3 -I -B pipeline/results_validate.py      (exit status 1 on any failure)

The official national totals are re-read here straight from the source files
(Ministry xlsx 'España' row, BOE Cuadro I PDF/XML, BOE 'Total estatal' rows,
BOE correction notice), independently of the values stored in the JSON meta.
"""
import json
import os
import re
import sys
from fractions import Fraction

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import results_boe as boe  # noqa: E402
import results_build as build  # noqa: E402

ROOT = os.path.dirname(HERE)
FAILS = []


def ok(cond, msg):
    print(("  OK   " if cond else "  FAIL ") + msg)
    if not cond:
        FAILS.append(msg)


def load(name):
    with open(os.path.join(ROOT, "data", "resultados", name), encoding="utf-8") as f:
        return json.load(f)


def fmt(n):
    return "{:,}".format(n).replace(",", ".")


def dhondt(cands, seats, threshold_base=None):
    """LOREG art. 163: drop lists below 3% of valid votes (valid includes blank),
    D'Hondt, equal quotients -> larger total vote. Returns (seats dict, info)."""
    if threshold_base is None:
        elig = list(cands)
    else:
        elig = [c for c in cands if c["votos"] * 100 >= 3 * threshold_base]
    q = []
    for c in elig:
        for d in range(1, seats + 1):
            q.append((Fraction(c["votos"], d), c["votos"], c["key"]))
    q.sort(key=lambda t: (t[0], t[1]), reverse=True)
    won, last, nxt = q[:seats], q[seats - 1], q[seats] if len(q) > seats else None
    res = {}
    for _, _, k in won:
        res[k] = res.get(k, 0) + 1
    info = {"lottery": bool(nxt and nxt[0] == last[0] and nxt[1] == last[1] and nxt[2] != last[2]),
            "tie_by_votes": bool(nxt and nxt[0] == last[0] and nxt[1] != last[1]),
            "last": last, "next": nxt}
    return res, info


def validate_generales():
    print("\n=== Congreso 23-J 2023: data/resultados/generales_2023.json")
    g = load("generales_2023.json")
    C = g["circunscripciones"]
    ok(sorted(C) == ["%02d" % i for i in range(1, 53)], "52 circunscripciones with INE codes 01..52 (%d found)" % len(C))
    ok(sum(c["escanos"] for c in C.values()) == 350, "seats sum to 350 (%d)" % sum(c["escanos"] for c in C.values()))
    for code, c in C.items():
        sc = sum(x["votos"] for x in c["candidaturas"])
        if not (c["validos"] == sc + c["blancos"] and c["votantes"] == c["validos"] + c["nulos"]
                and c["escanos"] == sum(x["escanos"] for x in c["candidaturas"])):
            ok(False, "internal identities in %s" % code)
    ok(True, "per circunscripción: validos = candidaturas + blancos; votantes = validos + nulos; seats add up")

    # official totals, re-read from sources
    _, _, _, mnat = build.ministry_prov_2023()
    c1 = boe.cuadro1_from_pdf(os.path.join(build.SRC, "boe/BOE-A-2023-18907.pdf"), 2)["Total estatal"]
    print("  Official national totals (Ministerio PROV_02_202307_1.xlsx row 'España' | JEC BOE-A-2023-18907 Cuadro I 'Total estatal'):")
    for k, bk in (("censo", "electores"), ("votantes", "votantes"), ("validos", "votos válidos"),
                  ("blancos", "votos en blanco"), ("nulos", "votos nulos")):
        s = sum(c[k] for c in C.values())
        ok(s == mnat[k] == c1[bk], "%-9s sum %s | Ministry %s | BOE %s" % (k, fmt(s), fmt(mnat[k]), fmt(c1[bk])))

    # per-formation national votes vs BOE 'Total estatal' rows
    summary, forms = build.boe_tables("BOE-A-2023-18907.xml")
    sums = {}
    for c in C.values():
        for x in c["candidaturas"]:
            k = (x["denominacion"], x["siglas"])
            v = sums.setdefault(k, [0, 0])
            v[0] += x["votos"]
            v[1] += x["escanos"]
    bad = 0
    rows = []
    for f in forms:
        den, sig = build.fmt_formation(f)
        tv, ts = f["votos"]["total estatal"], f["escanos"].get("total estatal", 0)
        if sums.get((den, sig)) != [tv, ts]:
            bad += 1
            print("    mismatch %s: ours %r BOE %r" % (sig, sums.get((den, sig)), (tv, ts)))
        rows.append((tv, sig, ts))
    ok(bad == 0 and len(sums) == len(forms), "all %d formations: national votes+seats equal BOE 'Total estatal'" % len(forms))
    rows.sort(reverse=True)
    print("    top formations (BOE Total estatal):", "; ".join("%s %s v / %d esc" % (s, fmt(v), e) for v, s, e in rows[:10]))
    # by Ministry agrupación vs Ministry 'España' row
    _, agr, _, _ = build.ministry_prov_2023()
    asum = {}
    for c in C.values():
        for x in c["candidaturas"]:
            a = x["agrupacion"]["denominacion"]
            asum[a] = [asum.get(a, [0, 0])[0] + x["votos"], asum.get(a, [0, 0])[1] + x["escanos"]]
    mism = [a["siglas"] for j, a in enumerate(agr) if asum.get(a["denominacion"], [0, 0]) != list(mnat["agr"][j])]
    ok(not mism, "all %d Ministry agrupaciones: national votes+seats equal Ministry 'España' row %s" % (len(agr), mism or ""))
    top = sorted(((mnat["agr"][j][0], a["siglas"], mnat["agr"][j][1]) for j, a in enumerate(agr)), reverse=True)[:6]
    print("    top agrupaciones (Ministry España):", "; ".join("%s %s v / %d esc" % (s, fmt(v), e) for v, s, e in top))

    # D'Hondt re-run
    mism, closest = [], []
    for code, c in sorted(C.items()):
        cands = [dict(x, key=i) for i, x in enumerate(c["candidaturas"])]
        res, info = dhondt(cands, c["escanos"], threshold_base=c["validos"])
        official = {i: x["escanos"] for i, x in enumerate(c["candidaturas"]) if x["escanos"]}
        if res != official:
            mism.append(code)
            print("    MISMATCH %s %s: computed %r official %r" % (code, c["nombre"],
                  {c["candidaturas"][k]["siglas"]: v for k, v in res.items()},
                  {c["candidaturas"][k]["siglas"]: v for k, v in official.items()}))
        if info["lottery"]:
            print("    %s %s: last seat decided by lot (equal quotient and equal votes)" % (code, c["nombre"]))
        if info["tie_by_votes"]:
            print("    %s %s: last seat tie on quotient, resolved by total votes" % (code, c["nombre"]))
        if info["next"]:
            last, nxt = info["last"], info["next"]
            # votes the runner-up list would have needed to take the last seat
            d_next = round(nxt[1] / nxt[0])
            need = last[0] * d_next - nxt[1]
            closest.append((float(need), code, c["nombre"], c["candidaturas"][nxt[2]]["siglas"],
                            c["candidaturas"][last[2]]["siglas"]))
        for x in c["candidaturas"]:
            if x["escanos"] and x["votos"] * 100 < 3 * c["validos"]:
                mism.append(code + " (seat below 3%)")
    ok(not mism, "LOREG art.163 (3%% of valid incl. blank, D'Hondt, ties->more votes) reproduces official seats in %d/52 circunscripciones" % (52 - len(set(mism))))
    closest.sort()
    print("    closest last seats (votes the runner-up needed):",
          "; ".join("%s %s: %s needed ~%s more to beat %s" % (cd, n, r, fmt(int(v) + 1), w) for v, cd, n, r, w in closest[:5]))


def parse_correction(xml_path):
    t = open(xml_path, encoding="utf-8").read()
    pairs = re.findall(r"donde aparece «([\d.]+)», debe figurar «([\d.]+)»", t)
    return [(boe.parse_int(a), boe.parse_int(b)) for a, b in pairs]


def validate_europeas():
    print("\n=== Parlamento Europeo 9-J 2024: data/resultados/europeas_2024.json")
    e = load("europeas_2024.json")
    C = e["circunscripciones"]
    ok(sorted(C) == ["%02d" % i for i in range(1, 53)], "52 provinces with INE codes 01..52 (%d found)" % len(C))
    for code, c in C.items():
        sc = sum(x["votos"] for x in c["candidaturas"])
        if not (c["validos"] == sc + c["blancos"] and c["votantes"] == c["validos"] + c["nulos"]):
            ok(False, "internal identities in %s" % code)
    ok(True, "per province: validos = candidaturas + blancos; votantes = validos + nulos")
    ok(all("escanos" not in x for c in C.values() for x in c["candidaturas"]), "no per-province seats")

    summary, forms = build.boe_tables("BOE-A-2024-13092.xml")
    tot = summary["total estatal"]
    print("  Official national totals (JEC BOE-A-2024-13092 Cuadro I 'Total estatal'):")
    for k, bk in (("censo", "electores"), ("votantes", "votantes"), ("validos", "votos válidos"),
                  ("blancos", "votos en blanco"), ("nulos", "votos nulos")):
        s = sum(c[k] for c in C.values())
        ok(s == tot[bk], "%-9s sum %s | BOE %s" % (k, fmt(s), fmt(tot[bk])))

    corr = parse_correction(os.path.join(build.SRC, "boe/BOE-A-2024-15344.xml"))
    fixmap = dict(corr)
    print("    correction BOE-A-2024-15344 (Total estatal):", ", ".join("%s -> %s" % (fmt(a), fmt(b)) for a, b in corr))
    sums = {}
    for c in C.values():
        for x in c["candidaturas"]:
            sums[x["denominacion"]] = sums.get(x["denominacion"], 0) + x["votos"]
    bad, used, rows = 0, set(), []
    for f in forms:
        den, sig = build.fmt_formation(f)
        pub = f["votos"]["total estatal"]
        off = fixmap.get(pub, pub)
        if off != pub:
            used.add(pub)
        if sums.get(den) != off:
            bad += 1
            print("    mismatch %s: ours %s official %s" % (sig, sums.get(den), off))
        rows.append((off, sig or den, f["escanos"].get("total estatal", 0)))
    ok(bad == 0 and used == set(fixmap), "all %d formations: national votes equal BOE 'Total estatal' (corrected)" % len(forms))
    rows.sort(reverse=True)
    print("    top formations:", "; ".join("%s %s v / %d esc" % (s[:20], fmt(v), n) for v, s, n in rows[:9]))
    # national seat allocation (single constituency, no legal threshold in Spain's EP law, D'Hondt)
    cands = [{"key": i, "votos": v} for i, (v, s, n) in enumerate(rows)]
    res, info = dhondt(cands, tot["total_escanos"])
    ok(all(res.get(i, 0) == n for i, (v, s, n) in enumerate(rows)) and not info["lottery"],
       "national D'Hondt over %d seats reproduces official seats" % tot["total_escanos"])
    cv = sum(c["votantes"] for c in C.values()) - sum(c["sin_cera"]["votantes"] for c in C.values())
    print("    CERA voters (BOE minus Ministry municipal file): %s" % fmt(cv))


if __name__ == "__main__":
    validate_generales()
    validate_europeas()
    print("\nRESULT: %s" % ("ALL CHECKS PASSED" if not FAILS else "%d FAILURE(S)" % len(FAILS)))
    sys.exit(1 if FAILS else 0)
