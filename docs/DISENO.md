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

## Las tres fases

Pantalla de inicio con **tres columnas**; se pueden recorrer en orden (1 → 2 → 3) o empezar por
cualquiera. El estado pasa de una fase a la siguiente (ranking de la fase 1 → calculadora; partido
elegido en la fase 2 → análisis).

### Fase 1 — Afinidad ("¿Qué partido se parece a ti?")
* ~30 afirmaciones construidas a partir de **propuestas reales** de los programas 29N y de
  compromisos públicos de los cabezas de lista (con cita y fuente).
* Respuesta en 5 niveles + "prefiero no contestar"; marca de "me importa mucho" (peso ×2).
* Posición de cada partido codificada desde su programa con **cita literal y página**; doble
  codificación independiente y resolución de discrepancias; "sin posición" si el programa calla.
* Afinidad = distancia de Manhattan normalizada sobre ítems comunes; se muestra la cobertura.
* Incluye todos los partidos con representación actual o esperada, se presenten o no en la
  circunscripción del usuario. Resultado: ranking + desglose por tema + fuentes.
* Si un partido no ha publicado programa, aparece como "programa pendiente" y no se puntúa.

### Fase 2 — Utilidad del voto ("¿Tu voto tendrá escaño?")
* El usuario elige circunscripción y partido (o usa el ranking de la fase 1).
* Solo aparecen las **candidaturas proclamadas en el BOE** en esa circunscripción.
* Escenario por defecto: **resultados de 2023**; alternativos: últimas encuestas (CIS, Sigma Dos,
  GAD3/40dB) proyectadas por provincia con *swing* proporcional.
* Reparto legal (umbral 3 % + D'Hondt) y simulación Monte Carlo → probabilidad de ≥ 1 escaño,
  escaños esperados, votos por escaño y votos que faltan para el siguiente escaño.
* Si la probabilidad es baja, propone la siguiente opción del ranking (fase 1) o del orden manual
  que sí tenga representación probable.

### Fase 3 — Rigor ("¿Qué hay detrás de sus propuestas?")
* Las 12 propuestas principales del programa del partido elegido (criterio de selección
  documentado: peso en el programa y en la campaña).
* Evaluación por un modelo de IA con investigación documental y fuentes, en criterios
  verificables: concreción, encaje legal (CE, competencias, UE), coste y financiación, evidencia
  académica, experiencia internacional, antecedentes en España, a quién beneficia, efectos a
  largo plazo. Cada criterio: valoración, explicación breve y fuentes; "no verificable" cuando no
  hay base suficiente.
* Generado de antemano (no en vivo) para que sea revisable, reproducible y sin coste por visita.

## Calendario de datos
* Listas BOE: 3-nov (y correcciones posteriores).
* Programas: según publiquen los partidos (campaña 13–27 nov). La fase 1 y la fase 3 se
  completan partido a partido; hasta entonces se indica "pendiente".
* Encuestas: prohibida su publicación desde el 24-nov (LOREG art. 69.7).
