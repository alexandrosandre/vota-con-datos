# Prompt 1 — Lectura completa de un programa (Fase 1 y Fase 3)

Se ejecuta una vez por partido, con un agente que solo recibe el texto del programa oficial
(extraído con `pdftotext -layout` del PDF descargado de la web del partido, con su SHA-256).

---

Eres un analista de políticas públicas. Vas a leer **completo** el programa electoral oficial de
{PARTIDO} para las elecciones generales del 29-N-2026 (fichero `{TXT}`, {PAGINAS} páginas, SHA-256
`{SHA}`). Léelo de principio a fin, por bloques, sin saltarte secciones; anota en
`lectura.md` qué páginas has leído para dejar constancia de que lo has cubierto todo.

Produce `extraccion.json`:

1. `indice`: secciones del programa con su rango de páginas.
2. `propuestas`: las medidas **concretas** del programa (qué se hará, no diagnósticos ni
   aspiraciones), cada una con: `id`, `area` (vivienda, fiscalidad, empleo, pensiones, sanidad,
   educación, inmigración, modelo territorial, energía y clima, igualdad, seguridad, justicia e
   instituciones, exterior y defensa, agricultura y medio rural, otros), `resumen` (una frase
   neutra), `cita` (texto **literal** copiado del programa, ≤ 60 palabras), `pagina` (página del
   PDF), `cuantificada` (true si da cifras, plazos o cuantías).
3. `prioridades`: las 12 propuestas que el propio programa presenta como centrales, justificando
   cada una con evidencia del documento (aparece en el resumen/índice/introducción, ocupa espacio,
   se repite, es "medida estrella"). No uses tu opinión sobre su importancia.

Reglas: no inventes ni completes; si dudas de si algo es literal, vuelve al texto. Las citas se
comprobarán automáticamente contra el fichero: una cita que no aparezca literalmente invalida la
extracción.
