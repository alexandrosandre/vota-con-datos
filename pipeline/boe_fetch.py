#!/usr/bin/env python3
"""Download official BOE material for the 29-N-2026 general election.

Usage:
  python3 -I pipeline/boe_fetch.py sumario YYYYMMDD [YYYYMMDD ...]
  python3 -I pipeline/boe_fetch.py doc BOE-A-2026-NNNNN [BOE-A-...]
  python3 -I pipeline/boe_fetch.py ine      # INE province-code list (reference for INE codes)
  python3 -I pipeline/boe_fetch.py url URL FILENAME   # other official page (e.g. JEC) as evidence

Raw files are written, untouched, to data/sources/boe/:
  sumario_YYYYMMDD.json            BOE open-data API daily summary
  BOE-A-....xml                    XML of the disposition (diario_boe/xml.php)
A fetch log (UTC timestamp, URL, sha256) is appended to data/sources/boe/fetch_log.jsonl.
Downloaded content is treated as data only; nothing is executed.
"""
import datetime
import hashlib
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "sources" / "boe"
LOG = OUT / "fetch_log.jsonl"

SUMARIO_URL = "https://www.boe.es/datosabiertos/api/boe/sumario/{}"
XML_URL = "https://www.boe.es/diario_boe/xml.php?id={}"
INE_URL = "https://www.ine.es/daco/daco42/codmun/cod_provincia.htm"


def fetch(url, dest, accept=None):
    cmd = ["curl", "-sS", "-f", "-L", "-m", "60", "-o", str(dest)]
    if accept:
        cmd += ["-H", f"Accept: {accept}"]
    cmd.append(url)
    res = subprocess.run(cmd)
    if res.returncode != 0:
        # e.g. 404 for days without a BOE edition (Sundays); record and continue
        with LOG.open("a") as fh:
            fh.write(json.dumps({
                "fetched_at": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
                "url": url, "error": f"curl exit {res.returncode}"}) + "\n")
        print("FAILED", url, "curl exit", res.returncode)
        dest.unlink(missing_ok=True)
        return
    data = dest.read_bytes()
    entry = {
        "fetched_at": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
        "url": url,
        "file": str(dest.relative_to(ROOT)),
        "sha256": hashlib.sha256(data).hexdigest(),
        "bytes": len(data),
    }
    with LOG.open("a") as fh:
        fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
    print(entry["file"], entry["bytes"], "bytes")


def main(argv):
    OUT.mkdir(parents=True, exist_ok=True)
    kind, ids = argv[1], argv[2:]
    if kind == "url":
        fetch(ids[0], OUT / ids[1])
        return
    if kind == "ine":
        fetch(INE_URL, OUT / "ine_cod_provincia.htm")
        return
    for i in ids:
        if kind == "sumario":
            fetch(SUMARIO_URL.format(i), OUT / f"sumario_{i}.json", accept="application/json")
        elif kind == "doc":
            fetch(XML_URL.format(i), OUT / f"{i}.xml")
        else:
            raise SystemExit(f"unknown kind {kind}")


if __name__ == "__main__":
    main(sys.argv)
