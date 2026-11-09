#!/bin/bash
# Activa el dominio propio en GitHub Pages SOLO cuando el DNS ya apunta a GitHub.
# Uso: pipeline/activar_dominio.sh [dominio]   (por defecto votacondatos.org)
# Si se activase antes, github.io redirigiría a un dominio que aún no resuelve y la web dejaría de verse.
set -euo pipefail
DOM="${1:-votacondatos.org}"
REPO="alexandrosandre/vota-con-datos"
GH_IPS="185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153"

A=$(dig +short A "$DOM" | sort | tr '\n' ' ')
ok=0; for ip in $GH_IPS; do grep -q "$ip" <<<"$A" && ok=$((ok + 1)); done
if [ "$ok" -lt 4 ]; then
  echo "El DNS de $DOM aún no apunta a GitHub Pages (A: ${A:-ninguno}). No se cambia nada."
  exit 2
fi
echo "DNS correcto ($A). Activando $DOM en GitHub Pages…"
gh api -X PUT "repos/$REPO/pages" -f cname="$DOM" >/dev/null
# La web pasa a servirse en la raíz del dominio: base '/' en el build.
python3 - "$DOM" <<'EOF'
import sys, re, pathlib
dom = sys.argv[1]
root = pathlib.Path(__file__).resolve().parent.parent if '__file__' in globals() else pathlib.Path('.')
wf = pathlib.Path('.github/workflows/pages.yml'); s = wf.read_text()
if 'VCD_BASE' not in s:
    s = s.replace("          npm run build\n", "          VCD_BASE=/ npm run build\n", 1)
    wf.write_text(s)
idx = pathlib.Path('web/index.html'); s = idx.read_text()
s = s.replace('https://alexandrosandre.github.io/vota-con-datos/', f'https://{dom}/')
idx.write_text(s)
for p in ['README.md', 'docs/CHECKLIST.md']:
    f = pathlib.Path(p); f.write_text(f.read_text().replace('https://alexandrosandre.github.io/vota-con-datos/', f'https://{dom}/'))
EOF
echo "Hecho. Revisa el diff, haz commit y push; después activa 'Enforce HTTPS' cuando GitHub emita el certificado:"
echo "  gh api -X PUT repos/$REPO/pages -F https_enforced=true"
