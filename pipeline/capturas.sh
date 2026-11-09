#!/bin/bash
# Capturas de un tema con Chrome headless. Uso: pipeline/capturas.sh <tema> [url_base]
# Requiere el servidor de desarrollo (npm --prefix web run dev -- --port 5179) en marcha.
set -e
T="$1"; BASE="${2:-http://localhost:5179/vota-con-datos/}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/web/public/temas/capturas"; mkdir -p "$OUT"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot() { "$CH" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 --window-size="$2" --screenshot="$OUT/$T-$1.png" "$3" >/dev/null 2>&1; echo "$OUT/$T-$1.png"; }
shot escritorio 1280,860 "${BASE}?tema=$T&modo=claro#/"
shot escritorio-largo 1280,2600 "${BASE}?tema=$T&modo=claro#/"
shot oscuro 1280,860 "${BASE}?tema=$T&modo=oscuro#/"
# Móvil con emulación de dispositivo (Chrome sin interfaz no baja de ~500 px de ventana)
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
node "$ROOT/tools/captura.mjs" "${BASE}?tema=$T&modo=claro#/" "$OUT/$T-movil.png" 390 1600 movil && echo "$OUT/$T-movil.png"
node "$ROOT/tools/captura.mjs" "${BASE}?tema=$T&modo=claro&circ=28&partido=podemos#/cuenta" "$OUT/$T-movil-cuenta.png" 390 1600 movil && echo "$OUT/$T-movil-cuenta.png"
shot contrasta 1280,1800 "${BASE}?tema=$T&modo=claro#/contrasta/erc"
shot cuenta 1280,1600 "${BASE}?tema=$T&modo=claro&circ=28&partido=podemos#/cuenta"
shot coincide 1280,1100 "${BASE}?tema=$T&modo=claro#/coincide"
