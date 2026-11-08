# Prompt 3 — Evaluación de las 12 propuestas (Fase 3)

Un agente investigador por partido; después, un agente revisor independiente comprueba cada
valoración y cada fuente.

---

Evalúa las 12 propuestas prioritarias de {PARTIDO} (de `extraccion.json`) con rigor profesional,
como lo haría un think tank independiente o un servicio de estudios parlamentario. Para cada
propuesta y cada criterio de `data/fase3/criterios.json`:

* Investiga en fuentes públicas fiables y **léelas**: BOE y legislación, Tribunal Constitucional y
  TJUE, AIReF, Banco de España, INE, Eurostat, OCDE, FMI, Comisión Europea, servicios de estudios,
  literatura académica revisada por pares, prensa de referencia para hechos.
* `valoracion`: `favorable` (la evidencia o el marco legal la respaldan) · `mixta` (evidencia en
  ambos sentidos o depende del diseño) · `desfavorable` (la evidencia o el marco legal la
  contradicen, o falta lo esencial) · `no_verificable` (no hay base suficiente: dilo, no opines).
* Aplica la `rubrica` de `criterios.json` cuando exista (concreción y financiación): mismos hechos,
  misma valoración, en todos los partidos.
* `texto`: 2–4 frases claras para cualquier ciudadano, con datos concretos y sin adjetivos de valor.
* `fuentes`: URLs que has leído y que sostienen el texto. Sin fuente → `no_verificable`.

En "A quién beneficia" nombra el grupo y su tamaño aproximado con fuente, y quién asume el coste.
En "Antecedentes" indica si se intentó antes en España, cuándo, y qué pasó.

Neutralidad: aplica exactamente los mismos estándares a todos los partidos. Evalúas el fundamento
de la propuesta, no su orientación ideológica. No compares con otros partidos.
