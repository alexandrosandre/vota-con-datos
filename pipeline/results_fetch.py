"""Download the official election-result sources used by results_build.py.

Run from the project root:  python3 -I pipeline/results_fetch.py

Sources (all official):
  * Ministerio del Interior, infoelectoral "Área de descargas" (Excel files
    inside zips). infoelectoral.interior.gob.es sits behind a Cloudflare
    browser challenge that blocks non-browser clients, so when the direct
    download does not return a zip we fall back to the byte-for-byte copy kept
    by the Internet Archive (Wayback "id_" raw mode, pinned snapshot). The
    original URL, the snapshot URL and the sha256 of the bytes are recorded.
  * Boletín Oficial del Estado: the Junta Electoral Central resolutions that
    publish the official results (LOREG art. 108.6), XML + PDF, plus their
    correction notices.

Writes data/sources/resultados/manifest.json. Downloads are data only; nothing
downloaded is ever executed.
"""
import datetime
import hashlib
import json
import os
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "sources", "resultados")

INFOELECTORAL = "https://infoelectoral.interior.gob.es/estaticos/docxl/"
WAYBACK = "https://web.archive.org/web/{ts}id_/{url}"

SOURCES = [
    {
        "id": "infoelectoral_congreso_2023_prov",
        "description": "Ministerio del Interior. Congreso julio 2023, resultados por circunscripción (incluye CERA y diputados)",
        "url": INFOELECTORAL + "PROV_02_202307_1.zip",
        "wayback_ts": "20251220144907",
        "path": "infoelectoral/PROV_02_202307_1.zip",
        "expect": "zip",
    },
    {
        "id": "infoelectoral_europeas_2024_muni",
        "description": "Ministerio del Interior. Parlamento Europeo junio 2024, resultados por municipio (sin CERA)",
        "url": INFOELECTORAL + "07_202406_1.zip",
        "wayback_ts": "20251223012722",
        "path": "infoelectoral/07_202406_1.zip",
        "expect": "zip",
    },
    {
        "id": "boe_jec_generales_2023_xml",
        "description": "BOE-A-2023-18907. Resolución JEC 30/08/2023, resumen de resultados Congreso y Senado 23J (XML)",
        "url": "https://www.boe.es/diario_boe/xml.php?id=BOE-A-2023-18907",
        "path": "boe/BOE-A-2023-18907.xml",
        "expect": "xml",
    },
    {
        "id": "boe_jec_generales_2023_pdf",
        "description": "BOE-A-2023-18907 (PDF; Cuadro I is an image in the XML but text in the PDF)",
        "url": "https://www.boe.es/boe/dias/2023/09/01/pdfs/BOE-A-2023-18907.pdf",
        "path": "boe/BOE-A-2023-18907.pdf",
        "expect": "pdf",
    },
    {
        "id": "boe_jec_generales_2023_correccion",
        "description": "BOE-A-2023-19537. Corrección de errores de BOE-A-2023-18907 (solo afecta a Senado, Madrid)",
        "url": "https://www.boe.es/diario_boe/xml.php?id=BOE-A-2023-19537",
        "path": "boe/BOE-A-2023-19537.xml",
        "expect": "xml",
    },
    {
        "id": "boe_jec_europeas_2024_xml",
        "description": "BOE-A-2024-13092. Acuerdo JEC 27/06/2024, resultados Parlamento Europeo 9J por provincia (XML)",
        "url": "https://www.boe.es/diario_boe/xml.php?id=BOE-A-2024-13092",
        "path": "boe/BOE-A-2024-13092.xml",
        "expect": "xml",
    },
    {
        "id": "boe_jec_europeas_2024_pdf",
        "description": "BOE-A-2024-13092 (PDF)",
        "url": "https://www.boe.es/boe/dias/2024/06/28/pdfs/BOE-A-2024-13092.pdf",
        "path": "boe/BOE-A-2024-13092.pdf",
        "expect": "pdf",
    },
    {
        "id": "boe_jec_europeas_2024_correccion",
        "description": "BOE-A-2024-15344. Corrección de errores de BOE-A-2024-13092 (Total estatal PSOE y JUNTS UE)",
        "url": "https://www.boe.es/diario_boe/xml.php?id=BOE-A-2024-15344",
        "path": "boe/BOE-A-2024-15344.xml",
        "expect": "xml",
    },
]

MAGIC = {"zip": b"PK\x03\x04", "pdf": b"%PDF", "xml": b"<?xml"}


def get(url):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.status, r.read()


def ok(data, kind):
    return data.startswith(MAGIC[kind])


def main():
    manifest = {"generated_by": "pipeline/results_fetch.py", "files": {}}
    for s in SOURCES:
        dest = os.path.join(SRC, s["path"])
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        entry = {"description": s["description"], "url": s["url"], "file": "data/sources/resultados/" + s["path"]}
        data = None
        try:
            status, body = get(s["url"])
            if ok(body, s["expect"]):
                data = body
                entry["retrieved_from"] = s["url"]
        except Exception as e:  # Cloudflare challenge -> HTTP 403
            entry["direct_download_error"] = "%s" % (e,)
        if data is None and "wayback_ts" in s:
            wb = WAYBACK.format(ts=s["wayback_ts"], url=s["url"])
            status, body = get(wb)
            if not ok(body, s["expect"]):
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
        print("%-40s %8d  %s  <- %s" % (s["id"], len(data), entry["sha256"][:16], entry["retrieved_from"]))
    with open(os.path.join(SRC, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
