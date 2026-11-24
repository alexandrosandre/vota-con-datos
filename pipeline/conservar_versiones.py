"""Conserva en el nuevo despliegue los ficheros de las últimas versiones publicadas (despliegues sin cortes).

GitHub Pages sustituye la web entera en cada despliegue, y los navegadores guardan la página hasta 10 minutos.
Sin esto, quien tiene abierta (o en caché) una versión anterior pediría un código o unos datos que ya no
existen, y vería una página en blanco o «No se pudieron cargar los datos». Con nombres por contenido
(assets/index-<huella>.js de Vite y data/v/<nombre>-<huella>.json de build_web.py) y las versiones anteriores
copiadas en el nuevo despliegue, cada página pide siempre sus propios ficheros, que siguen ahí.

Uso (en el flujo de publicación, después del build y antes de subir el artefacto):
    python3 -I pipeline/conservar_versiones.py web/dist https://votacondatos.org

Lee data/manifest.json de la web publicada, descarga lo que falte de la versión publicada y de las anteriores
que figuren en su historial (hasta MAX_VERSIONES) y escribe el nuevo data/manifest.json. Si la web publicada no
responde, sigue sin conservar nada (nunca bloquea un despliegue).
"""
import json
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

MAX_VERSIONES = 6
# Solo rutas de ficheros con nombre por contenido: nada que un manifiesto alterado pudiera usar para escribir fuera.
RUTA_VALIDA = re.compile(r"^(assets/[A-Za-z0-9._-]+|data/v/[A-Za-z0-9._-]+\.json)$")


def descargar(url: str, timeout: int = 30) -> bytes | None:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "vota-con-datos-despliegue"}), timeout=timeout) as r:
            return r.read() if r.status == 200 else None
    except Exception as e:  # noqa: BLE001 — cualquier fallo de red: se sigue sin esa copia
        print(f"  aviso: no se pudo descargar {url}: {e}")
        return None


def rutas(version: dict) -> list[str]:
    datos = [f"data/{r}" for r in (version.get("datos") or {}).values()]
    return [r for r in datos + list(version.get("assets") or []) if RUTA_VALIDA.match(r)]


def main(dist: Path, base: str) -> None:
    base = base.rstrip("/")
    nuevo_manifiesto = json.loads((dist / "data" / "manifest.json").read_text())
    actual = {
        "fecha": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "datos": nuevo_manifiesto["actual"]["datos"],
        "assets": sorted(f"assets/{f.name}" for f in (dist / "assets").iterdir() if f.is_file()),
    }

    publicado = descargar(f"{base}/data/manifest.json")
    historial: list[dict] = []
    if publicado:
        try:
            m = json.loads(publicado)
            historial = [m["actual"], *m.get("historial", [])]
        except (ValueError, KeyError):
            print("  aviso: manifiesto publicado ilegible; no se conservan versiones")
    else:
        # Primera vez (la web publicada aún no tiene manifiesto): se conserva al menos el código de la versión
        # publicada, que pide los datos con nombre fijo (siguen existiendo).
        html = descargar(f"{base}/")
        if html:
            assets = sorted(set(re.findall(r'/(assets/[A-Za-z0-9._-]+)', html.decode("utf-8", "replace"))))
            historial = [{"fecha": None, "datos": {}, "assets": assets}]

    # Veda de encuestas (LOREG art. 69.7): no se vuelve a publicar ninguna versión anterior cuyos datos lleven
    # escenarios que el nuevo despliegue ya no publica (las encuestas). Quien la tenga en caché ve el aviso de carga.
    escenarios_actuales = None
    ruta_f2 = actual["datos"].get("fase2.json")
    if ruta_f2 and (dist / "data" / ruta_f2).exists():
        f2 = json.loads((dist / "data" / ruta_f2).read_text())
        if (f2.get("meta", {}).get("veda_encuestas") or {}).get("activa"):
            escenarios_actuales = {e["id"] for e in f2.get("escenarios", [])}

    def con_encuestas(version: dict) -> bool:
        ruta = (version.get("datos") or {}).get("fase2.json")
        if escenarios_actuales is None or not ruta or not RUTA_VALIDA.match(f"data/{ruta}"):
            return False
        contenido = descargar(f"{base}/data/{ruta}")
        try:
            ids = {e["id"] for e in json.loads(contenido).get("escenarios", [])} if contenido else set()
        except (ValueError, KeyError, TypeError, AttributeError):
            return True  # ilegible: ante la duda, no se conserva
        return not ids <= escenarios_actuales

    vistos = {json.dumps(rutas(actual))}
    conservadas = []
    for v in historial:
        clave = json.dumps(rutas(v))
        if clave in vistos or not rutas(v):
            continue
        if con_encuestas(v):
            print(f"  veda: no se conserva la versión del {v.get('fecha')} (datos con encuestas)")
            vistos.add(clave)
            continue
        vistos.add(clave)
        conservadas.append(v)
        if len(conservadas) >= MAX_VERSIONES:
            break

    copiados = 0
    for v in conservadas:
        for r in rutas(v):
            destino = dist / r
            if destino.exists():
                continue
            contenido = descargar(f"{base}/{r}")
            if contenido is None:
                continue
            destino.parent.mkdir(parents=True, exist_ok=True)
            destino.write_bytes(contenido)
            copiados += 1

    (dist / "data" / "manifest.json").write_text(json.dumps({"actual": actual, "historial": conservadas}, ensure_ascii=False, indent=1))
    print(f"conservar_versiones: {len(conservadas)} versiones anteriores, {copiados} ficheros copiados")


if __name__ == "__main__":
    main(Path(sys.argv[1]), sys.argv[2])
