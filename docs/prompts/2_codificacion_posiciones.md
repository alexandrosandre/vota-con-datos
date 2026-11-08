# Prompt 2 — Codificación de posiciones (Fase 1)

Se ejecuta **dos veces por partido con agentes independientes** (codificador A y B) que no ven el
trabajo del otro. Las discrepancias se resuelven en una tercera pasada que relee el programa.

---

Tienes el programa oficial de {PARTIDO} (`{TXT}`) y una lista de afirmaciones (`preguntas.json`).
Para cada afirmación, determina la posición del **programa** (no la que el partido haya tenido en
el pasado ni la que tú supongas por su ideología):

* `2` muy a favor · `1` a favor · `0` neutral/ambivalente explícito · `-1` en contra · `-2` muy en contra
* `null` el programa no se pronuncia (ni directa ni inequívocamente de forma indirecta)

Para cada valor distinto de `null` aporta `cita` literal (≤ 60 palabras) y `pagina`. Si la posición
se deduce de forma indirecta pero inequívoca (p. ej. propone derogar la ley que la afirmación quiere
mantener), explícalo en `nota`. Reserva ±2 para cuando el programa lo propone o rechaza de forma
expresa y prioritaria; ±1 cuando lo apoya o rechaza con matices o condiciones.

Ante la duda entre un valor y `null`, elige `null`: es peor atribuir una posición que no existe
que reconocer que el programa calla.
