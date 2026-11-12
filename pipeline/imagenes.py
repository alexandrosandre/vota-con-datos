#!/usr/bin/env python3
"""Fotos de candidatos y logotipos de partidos desde Wikimedia Commons (solo licencias libres).

* Candidatos: los que tienen enlace verificado a Wikipedia (data/boe/afiliaciones_g*.json). Se
  resuelve el artículo a su elemento de Wikidata y se toma su imagen (P18). Al venir del mismo
  elemento que el artículo ya verificado, la foto corresponde a esa persona.
* Partidos: logotipo (P154) del elemento de Wikidata de su artículo en Wikipedia (PARTIDOS_WIKI).
  Si hay varios, el de rango preferente o, si no, el de fecha de inicio más reciente.
* Solo se aceptan CC0, dominio público, CC BY y CC BY-SA (nada NC ni ND). Se guarda autor, licencia
  y enlace a la ficha de Commons para los créditos.
* Las imágenes se copian a web/public/img/ (miniaturas) para que la web no cargue nada de terceros:
  así ninguna visita llega a otros servidores.

Salida: data/imagenes/imagenes.json. Uso: python3 -I pipeline/imagenes.py
"""
import glob
import html
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "imagenes" / "imagenes.json"
IMG = ROOT / "web" / "public" / "img"
UA = "vota-con-datos/1.0 (+https://votacondatos.org; herramienta cívica sin ánimo de lucro)"

PARTIDOS_WIKI = {
    "pp": "Partido_Popular", "upn": "Unión_del_Pueblo_Navarro", "psoe": "Partido_Socialista_Obrero_Español",
    "psc": "Partit_dels_Socialistes_de_Catalunya", "vox": "Vox_(partido_político)", "frente_amplio": "Frente_Amplio_(España)",
    "podemos": "Podemos_(partido_político)", "compromis": "Compromís", "upc": "Unidad_del_Pueblo_Canario",
    "ara_mes_fa": "Ara_Més", "erc": "Esquerra_Republicana_de_Catalunya", "junts": "Junts_per_Catalunya",
    "eh_bildu": "Euskal_Herria_Bildu", "pnv": "Partido_Nacionalista_Vasco", "bng": "Bloque_Nacionalista_Galego",
    "cc": "Coalición_Canaria", "adelante_andalucia": "Adelante_Andalucía_(partido_político)", "salf": "Se_Acabó_La_Fiesta",
}
# «Attribution» y «European Parliament» son plantillas de Commons de reutilización libre con atribución.
LIBRES = re.compile(r"^(cc0|public domain|pd|cc by(-sa)? [\d.]+( [a-z]+)?|cc by(-sa)?|attribution$|european parliament$)", re.I)


def get(url, binario=False):
    for intento in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            time.sleep(0.15)
            return data if binario else json.loads(data)
        except Exception as e:  # noqa: BLE001
            if intento == 3:
                raise
            time.sleep(2 * (intento + 1))


def qid_de(articulo_url):
    m = re.match(r"https?://([a-z]+)\.wikipedia\.org/wiki/(.+)$", articulo_url)
    if not m:
        return None
    lang, title = m.group(1), urllib.parse.unquote(m.group(2))
    q = get(f"https://{lang}.wikipedia.org/w/api.php?action=query&prop=pageprops&redirects=1&format=json&titles="
            + urllib.parse.quote(title))
    for p in q["query"]["pages"].values():
        return p.get("pageprops", {}).get("wikibase_item")
    return None


def fichero(qid, prop):
    ent = get(f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json")["entities"][qid]
    cl = [c for c in ent["claims"].get(prop, []) if c["mainsnak"].get("datavalue") and c["rank"] != "deprecated"]
    if not cl:
        return None
    pref = [c for c in cl if c["rank"] == "preferred"]
    if pref:
        return pref[0]["mainsnak"]["datavalue"]["value"]

    def inicio(c):
        q = c.get("qualifiers", {}).get("P580")
        return q[0]["datavalue"]["value"]["time"] if q and q[0].get("datavalue") else ""
    sin_fin = [c for c in cl if "P582" not in c.get("qualifiers", {})] or cl
    return sorted(sin_fin, key=inicio)[-1]["mainsnak"]["datavalue"]["value"]


def info(nombre_fichero, ancho):
    q = get("https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&format=json"
            f"&iiprop=url|extmetadata|mime&iiurlwidth={ancho}&titles=" + urllib.parse.quote("File:" + nombre_fichero))
    p = next(iter(q["query"]["pages"].values()))
    ii = (p.get("imageinfo") or [None])[0]
    if not ii:
        return None
    md = ii.get("extmetadata", {})
    val = lambda k: html.unescape(re.sub(r"<[^>]+>", "", (md.get(k) or {}).get("value", ""))).strip()  # noqa: E731
    return {"thumb": ii.get("thumburl"), "commons": ii.get("descriptionurl"), "licencia": val("LicenseShortName"),
            "licencia_url": (md.get("LicenseUrl") or {}).get("value"), "autor": val("Artist") or val("Credit"),
            "fichero": nombre_fichero}


def guardar(meta, destino):
    data = get(meta["thumb"], binario=True)
    ext = Path(urllib.parse.urlparse(meta["thumb"]).path).suffix.lower() or ".jpg"
    ruta = destino.with_suffix(ext)
    ruta.parent.mkdir(parents=True, exist_ok=True)
    ruta.write_bytes(data)
    return "img/" + str(ruta.relative_to(IMG))


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", urllib.parse.unquote(s).lower()).strip("-")[:80]


def main():
    previo = json.loads(OUT.read_text()) if OUT.exists() else {"personas": {}, "partidos": {}}
    out = {"meta": {"fuente": "Wikimedia Commons vía Wikidata (P18 foto, P154 logotipo)", "generado": time.strftime("%Y-%m-%d")},
           "personas": {}, "partidos": {}, "descartadas": []}

    def procesar(clave, url_articulo, prop, ancho, destino, cache):
        if clave in cache and (IMG.parent / cache[clave]["src"]).exists():
            return cache[clave]
        qid = qid_de(url_articulo)
        if not qid:
            out["descartadas"].append({"clave": clave, "motivo": "sin elemento de Wikidata"})
            return None
        f = fichero(qid, prop)
        if not f:
            return None
        m = info(f, ancho)
        if not m or not m["thumb"]:
            out["descartadas"].append({"clave": clave, "motivo": "sin miniatura"})
            return None
        if not LIBRES.match(m["licencia"] or "") or re.search(r"\b(nc|nd)\b", m["licencia"] or "", re.I):
            out["descartadas"].append({"clave": clave, "motivo": f"licencia no libre: {m['licencia']}"})
            return None
        m["src"] = guardar(m, destino)
        m["wikidata"] = qid
        m.pop("thumb")
        return m

    for pid, art in PARTIDOS_WIKI.items():
        try:
            r = procesar(pid, "https://es.wikipedia.org/wiki/" + art, "P154", 96, IMG / "partidos" / pid, previo.get("partidos", {}))
        except Exception as e:  # noqa: BLE001
            out["descartadas"].append({"clave": pid, "motivo": f"error: {e}"})
            r = None
        if r:
            out["partidos"][pid] = r
        print("partido", pid, "OK" if r else "—", flush=True)

    enlaces = set()
    for f in sorted(glob.glob(str(ROOT / "data/boe/afiliaciones_g*.json"))):
        for x in json.load(open(f))["personas"]:
            if x.get("enlace_tipo") == "wikipedia" and x.get("enlace"):
                enlaces.add(x["enlace"])
    for i, url in enumerate(sorted(enlaces)):
        try:
            r = procesar(url, url, "P18", 160, IMG / "personas" / slug(url.rsplit("/", 1)[-1]), previo.get("personas", {}))
        except Exception as e:  # noqa: BLE001
            out["descartadas"].append({"clave": url, "motivo": f"error: {e}"})
            r = None
        if r:
            out["personas"][url] = r
        if i % 20 == 0:
            print(f"personas {i}/{len(enlaces)} con foto {len(out['personas'])}", flush=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
    print(f"logotipos: {len(out['partidos'])}/{len(PARTIDOS_WIKI)} · fotos: {len(out['personas'])}/{len(enlaces)} · descartadas: {len(out['descartadas'])}")


if __name__ == "__main__":
    main()
