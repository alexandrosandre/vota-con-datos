# Vota con datos — diseño

Herramienta cívica, gratuita y de código abierto para las elecciones generales del
**29 de noviembre de 2026** (Real Decreto 806/2026, BOE-A-2026-20742).

Objetivo: que cada persona vote **sabiendo a qué vota** y que su voto **llegue a donde quería**.

## Principios

1. **Solo fuentes primarias.** Programas oficiales descargados de la web de cada partido; listas
   proclamadas del BOE; resultados del Ministerio del Interior; encuestas en la publicación del
   propio instituto o medio. Cada dato lleva su URL y, cuando es un fichero, su huella SHA-256.
2. **Nada se teclea a mano.** Los datos se extraen con scripts (`pipeline/`) reproducibles.
3. **Lo que no se puede verificar, se dice.** Estados explícitos: "pendiente", "no verificable",
   "sin posición en el programa".
4. **Privacidad total.** Todo se calcula en el navegador. No hay servidor, ni cuentas, ni
   analítica. Las respuestas solo se guardan en el `localStorage` del propio usuario.
5. **Neutralidad.** Mismo tratamiento a todos los partidos; orden alfabético salvo que el
   usuario ordene; colores neutros (no los corporativos) en los gráficos.

## Arquitectura

```
data/            datos verificados (JSON) + fuentes brutas con hash
pipeline/        scripts de extracción, construcción y validación (Python)
web/             aplicación estática (Vite + Preact + TypeScript)
  src/engine/    motores puros y testeados: seats.ts (Fase 2), match.ts (Fase 1)
docs/            diseño, metodología, investigación
```

Publicación: GitHub Pages (gratuito) desde el repositorio público; despliegue con GitHub Actions.

## Los tres pasos: Elige → Contrasta → Suma

(Lema elegido el 9-nov-2026 entre «Coincide · Contrasta · Cuenta» y «Elige · Contrasta · Descarta»;
«Suma» sustituye a «Descarta» para no sugerir que se dejen de lado los partidos pequeños.)

Portada con **tres columnas**; se pueden recorrer en orden o empezar por cualquiera. Cada paso
aprovecha lo anterior: el ranking de afinidad lleva a contrastar a los partidos más afines, y ese
orden de preferencia alimenta la alternativa que sugiere el cálculo de escaños.

**Por qué este orden (cambio respecto al planteamiento inicial 1-afinidad, 2-escaños, 3-análisis).**
Es el orden de una decisión informada: qué quiero → si se sostiene → si mi voto llega. Con el
cálculo de escaños en segundo lugar, la viabilidad condicionaba la preferencia antes de haberla
contrastado, y el análisis solo se hacía del partido "útil", no de los afines. Al final, la
sugerencia de alternativa se basa en una preferencia ya contrastada y la decisión estratégica
queda donde se toma: al final.

### 1 · Elige ("¿Con quién coincides?")
* 30 afirmaciones construidas a partir de **propuestas reales de esta campaña**: programas oficiales
  del 29-N y compromisos públicos de los cabezas de lista (con cita y fuente).
* 5 niveles + "Saltar"; peso de importancia ×0,5/×1/×2.
* Posición de cada partido desde su programa (cita y página) o sus compromisos de campaña (cita,
  medio, fecha); codificación + verificación independiente de cada posición contra su fuente; "sin posición conocida" si no hay fuente.
* Afinidad = distancia de Manhattan normalizada; cobertura visible; empate técnico < 5 puntos.

### 2 · Contrasta ("¿Qué hay detrás?")
* 12 propuestas centrales por programa oficial, evaluadas en 8 criterios verificables con rúbrica,
  fuentes enlazadas, comprobación automática de citas y revisión independiente.
* Atajos a los partidos más afines del paso 1. Compromisos de campaña visibles (no evaluados).

### 3 · Suma ("¿Tu voto tendrá escaño?")
* Candidaturas proclamadas en el BOE en tu circunscripción; escenarios 2023 (por defecto) y
  encuestas (CIS, Sigma Dos, GAD3, 40dB); D'Hondt + umbral + Monte Carlo.
* Probabilidad de escaño, coste en votos por escaño, votos que faltan; alternativa según tu orden.

## Calendario de datos
* Listas BOE: 3-nov (y correcciones posteriores).
* Programas: según publiquen los partidos (campaña 13–27 nov). La fase 1 y la fase 3 se
  completan partido a partido; hasta entonces se indica "pendiente".
* Encuestas: prohibida su publicación desde el 24-nov (LOREG art. 69.7).
