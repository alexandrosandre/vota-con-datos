"""Parsers for the Junta Electoral Central results resolutions published in the
BOE (XML from boe.es/diario_boe/xml.php, PDF for tables that are images in
the XML). Input files are untrusted data: only parsed, never executed.
"""
import re
import subprocess
import unicodedata
import xml.etree.ElementTree as ET

NUM_RE = re.compile(r"^\d{1,3}(?:\.\d{3})*\.?$")


def clean(s):
    s = (s or "").replace("\xa0", " ")
    return re.sub(r"\s+", " ", s).strip()


def parse_int(s):
    """BOE number: '1.234.567' (dot thousands). Empty -> None. A trailing dot
    ('9.938.') is a typographic artefact present in the BOE tables. Anything
    else raises, so a malformed figure can never slip through silently."""
    s = clean(s)
    if s == "":
        return None
    if not NUM_RE.match(s):
        raise ValueError("unparseable BOE number %r" % s)
    return int(s.rstrip(".").replace(".", ""))


def cell_text(c):
    return clean("".join(c.itertext()))


def _expand_header(thead):
    """Return a grid (list of rows, each a list of texts per physical column)
    honouring rowspan/colspan."""
    rows = thead.findall("tr")
    grid = {}
    for r, tr in enumerate(rows):
        col = 0
        for c in tr:
            while (r, col) in grid:
                col += 1
            rs, cs = int(c.get("rowspan", 1)), int(c.get("colspan", 1))
            txt = cell_text(c)
            for dr in range(rs):
                for dc in range(cs):
                    grid[(r + dr, col + dc)] = (txt, (r, col))  # remember anchor
            col += cs
    nrows = len(rows)
    ncols = max(k[1] for k in grid) + 1
    return [[grid.get((r, c)) for c in range(ncols)] for r in range(nrows)]


def results_tables(xml_path):
    """Yield every results table as dict:
       {'cuadro': 'CUADRO II', 'columns': [...], 'rows': [(name, [cells...]), ...]}
    where columns[i] describes physical column i:
       {'kind': 'name'|'total_escanos'|'votos'|'escanos', 'header': [texts of upper header rows]}
    """
    root = ET.parse(xml_path).getroot()
    cuadro = None
    out = []
    for el in root.find("texto"):
        if el.tag == "p" and el.get("class") == "anexo_num":
            cuadro = clean("".join(el.itertext()))
        if el.tag != "table":
            continue
        grid = _expand_header(el.find("thead"))
        ncols = len(grid[0])
        cols = []
        for c in range(ncols):
            texts = [grid[r][c][0] if grid[r][c] else "" for r in range(len(grid))]
            anchors = [grid[r][c][1] if grid[r][c] else None for r in range(len(grid))]
            last = texts[-1].lower()
            if c == 0:
                kind = "name"
            elif texts[0].lower().startswith("total esca"):
                kind = "total_escanos"
            elif last == "votos":
                kind = "votos"
            elif last.startswith("esca"):
                kind = "escanos"
            elif last in ("electores", "votantes", "votos válidos", "votos a candidaturas",
                          "votos en blanco", "votos nulos"):
                kind = last
            else:
                # single header row tables (Cuadro III 2023): the header is the formation, value = votes
                kind = "votos"
            # header rows that identify the formation: those above the Votos/Escaños row
            ident = texts[:-1] if len(texts) > 1 and last in ("votos", "escaños", "escanos") else texts
            cols.append({"kind": kind, "header": ident, "anchor": anchors[0]})
        rows = []
        for tr in el.find("tbody").findall("tr"):
            cells = [cell_text(c) for c in tr]
            if len(cells) != ncols:
                raise ValueError("row with %d cells, expected %d: %r" % (len(cells), ncols, cells))
            rows.append((cells[0], cells))
        out.append({"cuadro": cuadro, "columns": cols, "rows": rows})
    return out


def split_denominacion(h):
    """'Partido Popular (PP)' -> ('Partido Popular', 'PP'); trailing '.' removed."""
    h = clean(h).rstrip(".").strip()
    m = re.match(r"^(.*\S)\s*\(([^()]*)\)$", h)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    return h, None


def formations(xml_path):
    """Return (summary_rows, formations) from a JEC results XML.
    formations: list of {'header': [...], 'cuadro':..., 'votos': {prov: int}, 'escanos': {prov: int} }
    summary_rows: {prov: {'total_escanos': int}} from Cuadro II tables when present,
    plus Cuadro I figures if Cuadro I is an XML table.
    """
    forms = []
    summary = {}
    for t in results_tables(xml_path):
        cols = t["columns"]
        # group physical columns by anchor of top header cell (= formation)
        groups = {}
        order = []
        for i, c in enumerate(cols):
            if c["kind"] in ("votos", "escanos"):
                key = c["anchor"]
                if key not in groups:
                    groups[key] = {"header": c["header"], "cuadro": t["cuadro"], "cols": {}}
                    order.append(key)
                groups[key]["cols"][c["kind"]] = i
        for name, cells in t["rows"]:
            rec = summary.setdefault(name, {})
            for i, c in enumerate(cols):
                if c["kind"] not in ("name", "votos", "escanos"):
                    v = parse_int(cells[i])
                    if c["kind"] in rec and rec[c["kind"]] != v:
                        raise ValueError("inconsistent %s for %s" % (c["kind"], name))
                    rec[c["kind"]] = v
        for key in order:
            g = groups[key]
            f = {"header": g["header"], "cuadro": g["cuadro"], "votos": {}, "escanos": {}}
            for name, cells in t["rows"]:
                v = parse_int(cells[g["cols"]["votos"]])
                if v is not None:
                    f["votos"][name] = v
                if "escanos" in g["cols"]:
                    e = parse_int(cells[g["cols"]["escanos"]])
                    if e is not None:
                        f["escanos"][name] = e
            forms.append(f)
    return summary, forms


PDF_ROW = re.compile(r"^\s*(\S.*?)\s{2,}" + r"\s+".join([r"([\d.]+)"] * 6) + r"\s*$")


def cuadro1_from_pdf(pdf_path, page):
    """Cuadro I (resumen general) from a BOE PDF page via pdftotext -layout."""
    txt = subprocess.run(["pdftotext", "-layout", "-f", str(page), "-l", str(page), pdf_path, "-"],
                         check=True, capture_output=True).stdout.decode("utf-8")
    out = {}
    keys = ["electores", "votantes", "votos válidos", "votos a candidaturas", "votos en blanco", "votos nulos"]
    for line in txt.splitlines():
        m = PDF_ROW.match(line)
        if m:
            name = clean(m.group(1))
            out[name] = {k: parse_int(m.group(i + 2)) for i, k in enumerate(keys)}
    return out


def norm_name(s):
    """Normalise a province name so BOE ('Coruña (A).', 'Balears (Illes)')
    and Ministry ('A Coruña', 'Illes Balears') spellings compare equal."""
    s = clean(s).rstrip(".").strip()
    m = re.match(r"^(.*?)\s*\((.*)\)$", s)
    if m:
        s = m.group(2) + " " + m.group(1)
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch)).lower()
    s = re.sub(r"\s+", " ", s).strip()
    # bilingual names appear in either order ('Alicante/Alacant' vs 'Alacant/Alicante')
    return "/".join(sorted(p.strip() for p in s.split("/")))


def norm_party(s):
    s = unicodedata.normalize("NFKD", clean(s))
    s = "".join(ch for ch in s if not unicodedata.combining(ch)).upper()
    return re.sub(r"[^A-Z0-9]", "", s)
