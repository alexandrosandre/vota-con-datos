"""Download the sources used by pipeline/calibracion.py (calibration of the
uncertainty parameter k of the step-3 seat simulation).

Run from anywhere:  python3 -I -B pipeline/calibracion_fetch.py

Sources:
  * Ministerio del Interior, infoelectoral, Congress results by circunscripción
    (PROV_02_<yyyymm>_1.zip) for Dec-2015, Apr-2019 and Nov-2019. infoelectoral
    blocks non-browser clients (Cloudflare), so the byte-for-byte Internet
    Archive capture ("id_" raw mode, pinned timestamp) is used, as in
    results_fetch.py. The June-2016 file was never captured by the Archive.
  * Junta Electoral Central results resolutions in the BOE (LOREG art. 108.6),
    PDF: June 2016 is the primary source for that election (its XML has the
    tables as images); the other three are national cross-checks.
  * Wikipedia (English) "Opinion polling for the ... Spanish general election"
    pages, raw wikitext of a pinned revision: documented SECONDARY source for
    the final polls (the pollsters' own 2016-2023 publications are scattered
    across media sites, many paywalled or gone).

Writes data/sources/historico/manifest.json (url, retrieved_from, sha256).
Downloads are data only; nothing downloaded is ever executed.
"""
import datetime
import hashlib
import json
import os
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "sources", "historico")
INFOELECTORAL = "https://infoelectoral.interior.gob.es/estaticos/docxl/"
WAYBACK = "https://web.archive.org/web/{ts}id_/{url}"
WIKI = "https://en.wikipedia.org/w/index.php?oldid={rev}&action=raw"
UA = "vota-con-datos-research/1.0 (civic, non-commercial)"

SOURCES = [
    {"id": "infoelectoral_congreso_2015_prov", "url": INFOELECTORAL + "PROV_02_201512_1.zip",
     "wayback_ts": "20260105133047", "path": "infoelectoral/PROV_02_201512_1.zip", "expect": "zip",
     "description": "Ministerio del Interior. Congreso diciembre 2015, resultados por circunscripción"},
    {"id": "infoelectoral_congreso_2019a_prov", "url": INFOELECTORAL + "PROV_02_201904_1.zip",
     "wayback_ts": "20251221122224", "path": "infoelectoral/PROV_02_201904_1.zip", "expect": "zip",
     "description": "Ministerio del Interior. Congreso abril 2019, resultados por circunscripción"},
    {"id": "infoelectoral_congreso_2019n_prov", "url": INFOELECTORAL + "PROV_02_201911_1.zip",
     "wayback_ts": "20260107023054", "path": "infoelectoral/PROV_02_201911_1.zip", "expect": "zip",
     "description": "Ministerio del Interior. Congreso noviembre 2019, resultados por circunscripción"},
    {"id": "boe_jec_generales_2016_pdf", "url": "https://www.boe.es/boe/dias/2016/07/22/pdfs/BOE-A-2016-7133.pdf",
     "path": "boe/BOE-A-2016-7133.pdf", "expect": "pdf",
     "description": "BOE-A-2016-7133. Acuerdo JEC 20/07/2016, resumen de resultados Congreso y Senado 26J-2016 "
                    "(fuente principal de 2016: Cuadros I, II y III)"},
    {"id": "boe_jec_generales_2015_pdf", "url": "https://www.boe.es/boe/dias/2016/01/29/pdfs/BOE-A-2016-867.pdf",
     "path": "boe/BOE-A-2016-867.pdf", "expect": "pdf",
     "description": "BOE-A-2016-867. Resolución JEC 26/01/2016, resultados 20D-2015 (contraste del total estatal)"},
    {"id": "boe_jec_generales_2019a_pdf", "url": "https://www.boe.es/boe/dias/2019/05/30/pdfs/BOE-A-2019-8070.pdf",
     "path": "boe/BOE-A-2019-8070.pdf", "expect": "pdf",
     "description": "BOE-A-2019-8070. Resolución JEC 24/05/2019, resultados 28A-2019 (contraste del total estatal)"},
    {"id": "boe_jec_generales_2019n_pdf", "url": "https://www.boe.es/boe/dias/2019/12/02/pdfs/BOE-A-2019-17344.pdf",
     "path": "boe/BOE-A-2019-17344.pdf", "expect": "pdf",
     "description": "BOE-A-2019-17344. Resolución JEC 29/11/2019, resultados 10N-2019 (contraste del total estatal)"},
]
WIKIPAGES = [
    ("2016", "Opinion polling for the 2016 Spanish general election", 1381312708),
    ("2019a", "Opinion polling for the April 2019 Spanish general election", 1381587138),
    ("2019n", "Opinion polling for the November 2019 Spanish general election", 1381587097),
    ("2023", "Opinion polling for the 2023 Spanish general election", 1381583414),
]
for key, title, rev in WIKIPAGES:
    SOURCES.append({"id": "wikipedia_encuestas_%s" % key, "url": WIKI.format(rev=rev),
                    "path": "wikipedia/encuestas_%s_rev%d.wikitext" % (key, rev), "expect": "wikitext",
                    "description": "Wikipedia (en), '%s', revisión %d (wikitext). Fuente secundaria documentada "
                                   "de las últimas encuestas publicadas." % (title, rev)})

MAGIC = {"zip": b"PK\x03\x04", "pdf": b"%PDF", "wikitext": b""}


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.read()


def main():
    manifest = {"generated_by": "pipeline/calibracion_fetch.py", "files": {}}
    for s in SOURCES:
        dest = os.path.join(SRC, s["path"])
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        entry = {"description": s["description"], "url": s["url"], "file": "data/sources/historico/" + s["path"]}
        data = None
        try:
            body = get(s["url"])
            if body.startswith(MAGIC[s["expect"]]) and (s["expect"] != "wikitext" or b"wikitable" in body):
                data = body
                entry["retrieved_from"] = s["url"]
        except Exception as e:  # Cloudflare challenge -> HTTP 403
            entry["direct_download_error"] = "%s" % (e,)
        if data is None and "wayback_ts" in s:
            wb = WAYBACK.format(ts=s["wayback_ts"], url=s["url"])
            body = get(wb)
            if not body.startswith(MAGIC[s["expect"]]):
                sys.exit("unexpected content from %s" % wb)
            data = body
            entry["retrieved_from"] = wb
            entry["note"] = ("infoelectoral blocks non-browser clients (Cloudflare challenge); "
                             "byte-for-byte Internet Archive capture of the official URL used")
        if data is None:
            sys.exit("could not fetch %s" % s["url"])
        with open(dest, "wb") as f:
            f.write(data)
        entry["sha256"] = hashlib.sha256(data).hexdigest()
        entry["bytes"] = len(data)
        entry["fetched_at"] = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat()
        manifest["files"][s["id"]] = entry
        print("%-36s %9d  %s  <- %s" % (s["id"], len(data), entry["sha256"][:16], entry["retrieved_from"]))
    with open(os.path.join(SRC, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
