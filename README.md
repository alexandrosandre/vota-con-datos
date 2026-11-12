# vota con datos

Herramienta cívica, gratuita y de código abierto para las **elecciones generales del 29 de
noviembre de 2026** en España. Objetivo: que cada persona pueda votar **con los datos en la mano**: qué propone cada partido
y si su voto puede ayudar a lograr un escaño en su provincia.

**Web:** https://votacondatos.org/

**Elige. Contrasta. Suma.**

| Paso | Qué hace | Estado |
|---|---|---|
| 1 · Elige | Cuestionario de 30 afirmaciones nacidas de propuestas reales del 29-N (programas oficiales y compromisos de campaña); afinidad con cada partido con la cita de cada posición | Se recodifica cada vez que se publica un programa |
| 2 · Contrasta | Las 12 propuestas principales de cada programa oficial evaluadas en 8 criterios verificables, con fuentes y revisión independiente | Se completa partido a partido según publican programa |
| 3 · Suma | Probabilidad de que tu candidatura obtenga escaño en tu provincia (umbral 3 % + D'Hondt + Monte Carlo), coste en votos por escaño y alternativa con opciones reales | Operativo: listas proclamadas del BOE, resultados de 2023 y 4 encuestas |

## Principios

* **Solo fuentes primarias**: BOE (RD 806/2026, BOE-A-2026-23103 y su corrección BOE-A-2026-23383),
  Ministerio del Interior/JEC (resultados 2023 y europeas 2024), publicaciones originales de las
  encuestas, programas oficiales descargados de la web de cada partido (identificados por SHA-256).
* **Nada se teclea a mano**: todo se extrae con scripts de `pipeline/` y se valida
  automáticamente en cada publicación (GitHub Actions).
* **Lo que no se puede verificar, se dice.**
* **Privacidad**: web estática; todo se calcula en el navegador; sin cuentas, sin analítica.

## Estructura

```
data/        datos verificados + fuentes brutas (data/sources) con manifiestos y hashes
pipeline/    extracción, construcción y validación (Python, sin dependencias externas salvo poppler)
web/         aplicación (Vite + Preact + TypeScript); motores en web/src/engine con tests
docs/        diseño, metodología, prompts de IA publicados, investigación de estado del arte
```

## Reproducir

```bash
python3 -I pipeline/boe_validate.py        # listas BOE: 52 circunscripciones, 350 escaños, 534 candidaturas
python3 -I pipeline/results_validate.py    # 2023: el reparto recalculado reproduce los 350 escaños oficiales
python3 -I pipeline/verify_quotes.py       # toda cita atribuida a un programa existe literalmente en él
python3 -I pipeline/build_web.py           # genera web/public/data/*.json
cd web && npm ci && npm test && npm run dev
```

## Metodología

Ver [docs/METODOLOGIA.md](docs/METODOLOGIA.md), la página *Metodología* de la web y los prompts
exactos usados con IA en [docs/prompts/](docs/prompts/).

## ¿Has visto un error?

Abre una incidencia con el enlace a la fuente oficial. Corregimos y dejamos constancia en el
historial.

## Licencia

Código: MIT. Datos elaborados y análisis: CC BY 4.0. Los documentos oficiales enlazados pertenecen
a sus autores.
