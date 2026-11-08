"""Minimal, dependency-free reader for the .xlsx files that infoelectoral
publishes inside its download zips (stdlib only: zipfile + ElementTree).

The zip and the xlsx are treated as untrusted data: nothing in them is
executed, only XML is parsed (no external entities: ElementTree does not
resolve them).
"""
import io
import re
import zipfile
import xml.etree.ElementTree as ET

NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"


def _col_index(ref):
    letters = re.match(r"[A-Z]+", ref).group(0)
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - 64)
    return n - 1


def _text(el):
    # concatenation of all <t> descendants (handles rich text runs)
    return "".join(t.text or "" for t in el.iter("{%s}t" % NS["m"]))


def read_xlsx_bytes(data):
    """Return {sheet_name: [row, ...]} where each row is a list of cell values
    (str for strings, int/float for numbers, None for empty)."""
    zf = zipfile.ZipFile(io.BytesIO(data))
    shared = []
    if "xl/sharedStrings.xml" in zf.namelist():
        root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
        shared = [_text(si) for si in root.findall("m:si", NS)]
    wb = ET.fromstring(zf.read("xl/workbook.xml"))
    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    target = {r.get("Id"): r.get("Target") for r in rels.findall("{%s}Relationship" % REL_NS)}
    out = {}
    for sh in wb.find("m:sheets", NS).findall("m:sheet", NS):
        rid = sh.get("{%s}id" % NS["r"])
        path = target[rid].lstrip("/")
        if not path.startswith("xl/"):
            path = "xl/" + path
        root = ET.fromstring(zf.read(path))
        rows = []
        for row in root.find("m:sheetData", NS).findall("m:row", NS):
            rnum = int(row.get("r"))
            while len(rows) < rnum - 1:
                rows.append([])
            vals = []
            for c in row.findall("m:c", NS):
                idx = _col_index(c.get("r"))
                while len(vals) < idx:
                    vals.append(None)
                t = c.get("t")
                v = c.find("m:v", NS)
                if t == "s":
                    val = shared[int(v.text)]
                elif t == "inlineStr":
                    val = _text(c)
                elif t == "str":
                    val = v.text if v is not None else None
                elif v is None or v.text is None:
                    val = None
                else:
                    s = v.text
                    f = float(s)
                    val = int(f) if f.is_integer() and "." not in s and "E" not in s.upper() else f
                vals.append(val)
            rows.append(vals)
        out[sh.get("name")] = rows
    return out


def read_xlsx_from_zip(zip_path, member=None):
    with zipfile.ZipFile(zip_path) as z:
        names = [n for n in z.namelist() if n.lower().endswith(".xlsx")]
        if member is None:
            if len(names) != 1:
                raise ValueError("expected exactly one xlsx in %s, got %r" % (zip_path, names))
            member = names[0]
        return member, read_xlsx_bytes(z.read(member))
