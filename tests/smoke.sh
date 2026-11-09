#!/bin/bash
# Prueba de humo de extremo a extremo: sirve web/dist y comprueba con Chrome sin interfaz que cada
# ruta renderiza su contenido clave con los datos reales. Uso: tests/smoke.sh (tras `npm run build`).
set -u
cd "$(dirname "$0")/../web"
PORT=4179
npx vite preview --port $PORT --strictPort >/dev/null 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null' EXIT
for _ in $(seq 1 40); do curl -sf "http://localhost:$PORT/vota-con-datos/" >/dev/null && break; sleep 0.5; done

CH="${CHROME:-}"
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" google-chrome google-chrome-stable chromium chromium-browser; do
  [ -z "$CH" ] && command -v "$c" >/dev/null 2>&1 && CH="$c"
  [ -z "$CH" ] && [ -x "$c" ] && CH="$c"
done
[ -z "$CH" ] && { echo "Chrome no encontrado"; exit 1; }

FALLOS=0
comprueba() { # ruta texto...
  local ruta="$1"; shift
  local html
  html=$("$CH" --headless=new --disable-gpu --no-sandbox --virtual-time-budget=8000 --dump-dom "http://localhost:$PORT/vota-con-datos/$ruta" 2>/dev/null)
  for t in "$@"; do
    if grep -qF "$t" <<<"$html"; then echo "ok   $ruta · $t"; else echo "FALLO $ruta · $t"; FALLOS=$((FALLOS + 1)); fi
  done
}
comprueba "#/" "Elige." "Suma." "candidaturas proclamadas en el BOE"
comprueba "#/suma" "votar a quien prefieres siempre es legítimo"   # alias del paso 3
comprueba "#/coincide" "afirmaciones"
comprueba "#/contrasta/erc" "el programa de un vistazo" "Programa oficial"
comprueba "?circ=28&partido=pp#/cuenta" "probabilidad de ≥ 1 escaño" "Todas las candidaturas en Madrid"
comprueba "#/metodologia" "Cómo funciona vota con datos"
comprueba "#/marca" "Símbolo y logotipo"
comprueba "#/afinidad" "afirmaciones"   # ruta antigua redirigida
[ $FALLOS -eq 0 ] && echo "Prueba de humo: OK" || { echo "Prueba de humo: $FALLOS fallos"; exit 1; }
