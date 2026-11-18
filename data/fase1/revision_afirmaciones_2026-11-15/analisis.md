# Revisión de las afirmaciones del paso 1 tras el programa del PSOE (15-nov-2026) · Análisis

Repite la revisión del 13-nov (`../revision_afirmaciones_2026-11-13/integracion.md`) con el programa del PSOE ya
codificado (g11). **Solo es análisis.** No modifica `preguntas.json`, `codificacion_g*.json` ni `fase1.json`, y las
posiciones de las candidatas que aparecen aquí no están verificadas.

**Listón de esta revisión.** La web ya tiene respuestas y se va a difundir. Cambiar una afirmación borra la respuesta
de todos a ella y altera sus resultados. Solo se propone un cambio si cumple las cuatro condiciones:
- la cobertura sube mucho y está documentada;
- la nueva afirmación es concreta, neutral y un desacuerdo real de esta campaña;
- las posiciones se pueden codificar con citas literales (protocolo `docs/prompts/2_codificacion_posiciones.md`);
- no se pierde la única posición de un partido con poca cobertura.

## Resumen

- **Recomendación: un solo cambio, sustituir q20 por una afirmación sobre las centrales nucleares.** q20 es la
  reducción del 65 % de emisiones; la nueva propone alargar las nucleares más allá del calendario de cierre (texto en el
  apartado 4).
  - q20 tiene 3 posiciones. La nuclear tendría 8 posiciones firmes y hasta 11 en total, con 3 a favor y 5–7 en contra.
  - La cobertura pasa de 255 a 260–263 posiciones (media por partido de 14,2 a 14,4–14,6).
  - Ningún partido pierde su posición. Ganan PSOE, Compromís, Podemos, Frente Amplio y Junts (firmes), y EH Bildu,
    Ara Més y PSC (dudosas).
- **El resto se mantiene.** Ninguna otra candidata mejora lo suficiente para compensar que se pierdan las respuestas
  dadas (apartado 3).
- **Si el editor prefiere no tocar nada,** «sin cambios» también es defendible. El coste es mantener q20, que solo
  enfrenta a 3 de 18 partidos y en la que PSOE, PSC, PNV y CC no tienen posición.

## 1. Cobertura actual (fase1.json del 15-nov)

**255 posiciones con valor de 540 posibles (30 × 18), media de 14,2 por partido.**

Por partido:

| Partido | Pos. | Partido | Pos. | Partido | Pos. |
|---|---|---|---|---|---|
| Vox | 25 | ERC | 18 | EH Bildu | 13 |
| Podemos | 22 | PP | 17 | Ara Més | 9 |
| Frente Amplio | 20 | Compromís | 17 | UPC (NC-BC) | 7 |
| BNG | 20 | PSOE | 16 | PNV | 7 |
| Adelante Andalucía | 19 | SALF | 15 | UPN | 6 |
| | | Junts | 15 | PSC | 5 |
| | | | | CC | 4 |

Por afirmación (n = partidos con posición; + a favor; − en contra):

| id | Tema | n | + | − | id | Tema | n | + | − |
|---|---|---|---|---|---|---|---|---|---|
| q31 | Vivienda (renovación 5 años) | 13 | 9 | 4 | q30 | Precio máximo alimentos | 8 | 7 | 1 |
| q34 | Sáhara | 13 | 12 | 1 | q16 | Referéndum independencia | 8 | 5 | 3 |
| q35 | Prisión permanente | 13 | 4 | 9 | q11 | Concertada | 8 | 2 | 6 |
| q01 | Tope estatal alquiler | 12 | 8 | 4 | q03 | IVA/ITP primera vivienda | 8 | 8 | 0 |
| q18 | Quita deuda autonómica | 12 | 9 | 3 | q06 | 37,5 horas | 8 | 8 | 0 |
| q33 | Reparto menores | 11 | 2 | 9 | q12 | Lengua en la escuela | 7 | 4 | 3 |
| q17 | Concierto para quien lo pida | 11 | 7 | 4 | q27 | Ejército en Ceuta | 7 | 3 | 4 |
| q23 | Desalojo en 48 h | 11 | 6 | 5 | q13 | Prioridad vivienda social | 6 | 1 | 5 |
| q29 | Mercosur | 11 | 10 | 1 | q15 | Regularización | 6 | 1 | 5 |
| q21 | Aborto en la Constitución | 10 | 7 | 3 | q08 | Jubilación a los 65 | 6 | 6 | 0 |
| q24 | Derogar ley de seguridad ciudadana | 10 | 9 | 1 | q26 | Defensa 3,5 % PIB | 6 | 0 | 6 |
| q04 | Patrimonio permanente | 9 | 8 | 1 | q05 | IRPF 15/25 % | 4 | 2 | 2 |
| q32 | SMI autonómico | 9 | 8 | 1 | q25 | Sin indultos por corrupción | 4 | 4 | 0 |
| q09 | Conciertos sanitarios | 9 | 6 | 3 | q19 | Eólica marina | 3 | 1 | 2 |
| q22 | Suprimir Igualdad | 9 | 3 | 6 | **q20** | **Emisiones −65 % en 2030** | **3** | **1** | **2** |

**Cambio desde el 13-nov.** La cobertura ha pasado de 7,7 a 14,2 posiciones por partido. Las causas son:
- los programas de Vox, Compromís y PSOE;
- los barridos de campaña del 13 y 14-nov;
- la regla del editor que acepta declaraciones literales desde el 1-nov-2025, incluidos los Diarios de Sesiones.

Las afirmaciones con menos de 5 partidos han bajado de 18 a 4 (q05, q19, q20 y q25).

## 2. Afirmaciones más débiles

| id | n | Por qué es débil | ¿Sustituirla? |
|---|---|---|---|
| **q20** | 3 (PP −1, Vox −1, ERC +2) | La que menos partidos tiene, junto con q19. El programa del PSOE no da cifra de 2030 (g11 leyó el programa entero) y el de Compromís solo habla de neutralidad en 2050. No se espera que suba. | **Sí** (apartado 4) |
| q19 | 3 (Vox −1, BNG −1, CC +1) | Igual de baja, pero es una de las 4 posiciones de CC y la única del programa de CC que no es canaria ni de financiación. Quitarla deja a CC con 3. | No |
| q25 | 4, todos a favor | No hay nadie en contra, y la auditoría ya la marcó como casi de consenso. Es la única afirmación del tema Instituciones. La alternativa (CGPJ, apartado 3.C) añade como mucho 1–4 posiciones, todas dudosas salvo AA. | No |
| q05 | 4 (2 a favor, 2 en contra) | Pocos partidos, pero es el único desacuerdo de rebaja del IRPF entre izquierda y derecha. La alternativa que podría ocupar su sitio (3.B) apenas tiene a nadie en contra. | No |
| q08, q26 | 6, todos en el mismo lado | Nadie a favor de la defensa al 3,5 % y nadie en contra de la jubilación a los 65. Son temas centrales (gasto militar, pensiones) y 6 partidos es una cobertura media. No hay alternativa del mismo tema con más partidos. | No |
| q03, q06 | 8, todos a favor | Igual: cobertura aceptable y sin alternativa mejor. | No |

## 3. Candidatas estudiadas

**Método.**
- Búsqueda por palabras clave en los 10 programas publicados y en el manifiesto de UPC (`data/sources/programas/*/`).
- Las 41 copias locales del Diario de Sesiones del Congreso y las copias de campaña de `data/sources/compromisos/` y
  `data/sources/fase1/`.
- Una sesión nueva: el Pleno núm. 151 del 13-nov-2025, que trata las enmiendas del Senado sobre la prórroga nuclear.
  Copia en `data/sources/fase1/revision_2026-11-15/DSCD-15-PL-151.{pdf,txt}`.
- **Límite de acceso:** congreso.es devolvió 403 a curl, así que no se descargó la serie completa de plenos. El PL-151
  se obtuvo con WebFetch. No se intentó sortear ningún bloqueo.

Valores orientativos, sin verificar. «Firme» significa que la cita es literal, del partido y sobre la medida.
«Dudosa» significa que el verificador podría dejarla en null.

### A. Nucleares: alargar su vida más allá del calendario de cierre (sustituye a q20) — RECOMENDADA

**Contexto de la campaña.**
- El calendario de 2019 cierra los siete reactores entre 2027 y 2035.
- En agosto de 2026 el Gobierno prorrogó Almaraz: 31 meses la unidad 1 y 19 meses la unidad 2, según la
  vicepresidenta en el Pleno núm. 202, 9-sep-2026.
- El PP promete eliminar el calendario en sus primeros cien días. Junts pide revisar el de Ascó y Vandellòs.
- Es un desacuerdo real y concreto, y la afirmación sigue en el tema Energía y clima.

**Posiciones con evidencia literal:**

| Partido | Valor | Fuente | Cita literal | Firmeza |
|---|---|---|---|---|
| PP | +2 | Programa, medida 228 (p. 71 del PDF) | «ELIMINAREMOS EL CALENDARIO DE CIERRE DE ALMARAZ, ASCÓ, VANDELLÓS, COFRENTES Y TRILLO. En los primeros cien días de Gobierno tramitaremos la extensión de su vida útil» | Firme |
| Vox | +2 | Programa (p. 10 del PDF) | «Se garantizará la supervivencia de las centrales nucleares actuales, derogando el calendario de cierre.» | Firme |
| PSOE | −2 (o −1) | Programa, compromiso 240 (p. 66 del PDF) | «Mantener el calendario de cierre de las centrales nucleares hasta 2035» | Firme. El valor −2 o −1 depende de si se lee como prioritario; el Gobierno ya prorrogó Almaraz, y conviene anotarlo. |
| Compromís | −2 | Programa (p. 30 del PDF) | «Mantindrem el calendari de tancament de les centrals nuclears i no acceptarem cap nova pròrroga» | Firme |
| Podemos | −2 | Noemí Santana, Grupo Mixto (Podemos), Pleno 151, 13-nov-2025, p. 31; también el documento conjunto de Compromís: Front Valencià | «ni un euro más para alargar la vida de las centrales nucleares» | Firme |
| Frente Amplio | −2 | Verónica Martínez Barbero, portavoz del Grupo Plurinacional SUMAR, Pleno 202, 9-sep-2026, p. 147; también el documento conjunto | «Las nucleares tienen que cerrarse según el calendario marcado.» (en la copia de texto, un salto de página parte la frase) | Firme |
| ERC | −2 (o −1) | Documento conjunto (ERPV, −2), como en g10; también Teresa Jordà, Pleno 202, p. 94 (versión en castellano del Diario) | «mantenimiento del calendario nuclear sin efecto dominó» | Firme |
| Junts | +1 | Pilar Calvo, Pleno 202, 9-sep-2026, p. 96 | «seria absolutament irresponsable tancar les nuclears catalanes sense haver fet els deures que s’han de fer, prèviament» | Firme. Vale +1 y no +2 porque es condicional y critica que no se revise el calendario. |
| EH Bildu | −1 | Mikel Otero, Pleno 202, p. 127 | «Prácticamente suscribo palabra por palabra lo que ha dicho el señor Badia» | Dudosa. Badia (SUMAR) había dicho «Una prórroga es la peor medida posible». Otero también critica que no se cumpla el calendario y, en el Pleno 151, la prórroga «irregular, irresponsable y chapucera». La adhesión por remisión puede no bastar. |
| Ara Més | −2 | Vicenç Vidal (MÉS per Mallorca, Grupo SUMAR), Pleno 202, p. 87 | «nosaltres ho tenim clar: no a les nuclears» | Dudosa. Hay que confirmar que habla por MÉS y no por el grupo. El 13-nov ya se aceptó Vidal para MÉS en q29. |
| PSC | 0 | Ione Montalvo, cabeza de lista por Tarragona, entrevista en Diari de Tarragona, 14-nov-2026 | «Si hay un nuevo acuerdo, el Consejo de Seguridad Nuclear lo avala y vemos que no tiene un coste que pueda repercutir en los ciudadanos, no hay nada grabado a fuego en este tema.» | Dudosa: es una ambivalencia explícita (0), aunque también podría leerse como +1 condicionado o como null. |
| UPN | null | Alberto Catalán, Pleno 202 | «no quiere decir que no sea compatible con otro tipo de fuentes energéticas, como puede ser la nuclear» | Es demasiado genérico. |
| PNV | null | Idoia Sagastizabal, Pleno 202 | Pregunta por la estrategia del Gobierno sin fijar posición | — |
| SALF, BNG, CC, UPC, AA | null | Sus programas no tratan la prórroga | AA pide el «Fin de las subvenciones a combustibles fósiles y nuclear» (propuesta 407), que es una medida distinta. | — |

**Recuento:**
- 8 firmes (3 a favor, 5 en contra) y 3 dudosas: EH Bildu, Ara Més y PSC.
- Frente a q20, que tiene 3, la ganancia es de **+5 posiciones firmes y hasta +8**.
- PP, Vox y ERC conservan su posición en la nueva afirmación.

**Equilibrio:**
- **Polaridad.** La afirmación es de polaridad conservadora (propone cambiar el calendario vigente). Si q20 cuenta como
  progresista en la clasificación del 13-nov, el reparto pasa de 13–10 a 12–11 (progresistas–conservadoras), así que
  mejora.
- **Temas.** No cambia el número de afirmaciones por tema.

### B. Limitar la compra de vivienda por extranjeros no residentes (podría sustituir a q05) — NO recomendada

| Partido | Valor orientativo | Evidencia literal |
|---|---|---|
| CC | +2 | Programa, medida 26 (p. 11 del PDF): «Limitar la compra de vivienda por extranjeros. Impulsaremos en las Cortes Generales las reformas necesarias para limitar la compra de vivienda en Canarias por extranjeros». Se refiere solo a Canarias. |
| Ara Més | +2 | Carme Gomila, mitin de Palma (Demócrata, 8-nov): «limitarem la compra a no residents». También Vicenç Vidal en el Pleno 185: «Hem de regular la compra per part de no residents». |
| Compromís (y por el documento conjunto Podemos, FA y ERC) | +1 / +2 | Programa (p. 4 del PDF): «Prohibirem temporalment la compravenda d'habitatges a població no-resident en les zones tensionades.» |
| Vox | +1 | Programa (p. 21 del PDF): «Fiscalidad agravada y disuasoria para compradores no comunitarios». Grava, no limita: la equivalencia es dudosa. |
| PSOE | +1 | José Luis Sarrià, Grupo Socialista, Pleno 193, 17-jun-2026: «Ya veremos qué votan cuando el Gobierno traiga [...] medidas para limitar compras por extranjeros no comunitarios». Es reactiva. El programa solo habla de fondos especulativos (medida 71). |
| UPC | +1 | Román Rodríguez, tribuna en Diario de Avisos (oct-2026): «limitando el impacto de la vivienda vacacional y de la compra de viviendas por parte de extranjeros no residentes». Hay que confirmar que cuenta como líder. |
| Junts | −1 | Marta Madrenas, Pleno 185, 19-may-2026: «vostès intenten instal·lar la idea que el problema de l'habitatge és la compra massiva d'habitatges [...] per part d'estrangers no residents». Discute el diagnóstico, no la medida: dudosa. |
| PP, PNV, BNG, EH Bildu, AA, SALF, PSC, UPN | null | No se encontró cita. La búsqueda web no halló ninguna de Feijóo sobre la medida dentro del plazo. |

**Por qué no se recomienda:**
- Tendría de 7 a 10 posiciones y subiría a CC, Ara Més y UPC. Pero **casi nadie está en contra**: solo Junts, y es
  dudoso. Sería otra afirmación de un solo bloque, como q32.
- Varias citas son medidas parecidas pero distintas: Canarias sola en CC, zonas tensionadas y temporal en Compromís,
  un impuesto en Vox.
- La única afirmación que podría sustituir sin perder una posición única es q05, que sí enfrenta a dos bloques.
- La ganancia neta (+3 a +6) no compensa borrar las respuestas.

### C. Elección de los 12 vocales judiciales del CGPJ por los jueces (podría sustituir a q25) — NO recomendada

**Posiciones:**
- **A favor (+2):** PP (programa: «[jueces y magistra]dos de todas las categorías elegirán a los doce vocales judiciales del Con[sejo]»), Vox (medida 100: «doce vocales de procedencia judicial [...]
  elegidos mediante voto personal, directo y secreto por y entre los propios jueces») y SALF («CGPJ sin políticos»).
- **En contra:** Adelante Andalucía (−1/−2): «Reformar el CGPJ [...] mediante la elección directa por la ciudadanía.
  Hasta entonces, mejorar la elección parlamentaria de los vocales».
- **Compromís (y por el documento conjunto FA, Podemos y ERC):** «triat amb criteris de mèrit i capacitat tenint en
  compte la sobirania del poble». Sería −1 por inferencia, porque no habla de quién elige: dudosa.
- **PSOE:** el programa solo presume de haber renovado el CGPJ. Null.

**Por qué no se recomienda:** daría de 4 a 8 posiciones frente a las 4 de q25. Lo que gana depende de una inferencia
dudosa y no sube a ningún partido con poca cobertura.

### D. Otras candidatas

| Candidata | Partidos con posición documentada | Por qué no |
|---|---|---|
| Votar a los 16 años | PSOE (programa), Compromís y por el documento conjunto Podemos, FA y ERC (también en su propio programa), UPC (manifiesto: «incluido el voto a los 16 años») y AA: 7, todos a favor | Ninguna oposición documentada. |
| Gestión autonómica de puertos y aeropuertos (hoy Aena) | CC (medida 8), PNV («modelo aeroportuario vasco [...] con mayor capacidad de decisión»), ERC (medida 179), BNG, Compromís, AA, y Ara Més (Vidal: «La cogestió aeroportuària [...] és una prioritat»): 7–10, todos a favor | Ninguna oposición documentada (ni PP, ni Vox, ni PSOE). Sube a CC y PNV, pero sería un solo bloque. |
| Oficialidad del catalán, el euskera y el gallego en la UE; competencias de inmigración; jubilación con 40 años cotizados | Igual que el 13-nov (4 partidos cada una) | El programa del PSOE no añade nada relevante a ninguna. |

## 4. Recomendación

**Un cambio: retirar q20 y añadir una afirmación nueva** (id nuevo, q36, en el tema Energía y clima). Redacción
propuesta, sujeta a la auditoría de redacción:

> Alargar el funcionamiento de las centrales nucleares más allá del calendario de cierre acordado en 2019 (de 2027 a
> 2035).

**Contexto que hay que comprobar en fuentes primarias antes de integrar:**
- El calendario de cierre, en la orden o el protocolo de 2019 y el 7.º PGRR (BOE).
- La prórroga de Almaraz de agosto de 2026, en la orden ministerial del BOE (31 y 19 meses). Hoy solo consta por lo
  que dijo la vicepresidenta en el Pleno núm. 202.

**Cobertura esperada:**

| | Ahora (q20) | Con la nuclear: firmes | Con la nuclear: firmes + dudosas |
|---|---|---|---|
| Partidos con posición en la afirmación | 3 | 8 | 11 |
| A favor / en contra | 1 / 2 | 3 / 5 | 3 / 7 (+ PSC 0) |
| Total de posiciones (de 540) | 255 | 260 | 263 |
| Media por partido | 14,2 | 14,4 | 14,6 |
| Afirmaciones con menos de 5 partidos | 4 | 3 | 3 |

**Cambios por partido:**
- **Firmes:** PSOE 16→17, Compromís 17→18, Podemos 22→23, Frente Amplio 20→21 y Junts 15→16.
- **Dudosas:** EH Bildu 13→14, Ara Més 9→10 y PSC 5→6.
- **Sin cambio de número:** PP, Vox y ERC, que tienen posición tanto en q20 como en la nuclear.
- **Ningún partido baja.**

**Por qué supera el listón:**
- **Mejora:** q20 es la afirmación con menos partidos (con q19) y no tiene recorrido.
- **Partidos que ganan:** la nuclear mide un desacuerdo real de esta campaña entre PP, Vox y Junts por un lado y PSOE
  y la izquierda por otro. PSOE y PSC no tienen posición en q20.
- **Sin pérdidas:** no quita la única posición de ningún partido.
- **Comparación con el 13-nov:** la ganancia, de +5 a +8, es mayor que la de cualquiera de los cinco cambios de aquel
  día (+2 a +6 cada uno).

**Lo que no consigue:** sube poco a los partidos con menos posiciones.
- Solo Ara Més y PSC, y las dos son dudosas.
- CC, UPN, UPC y PNV no tienen nada documentado sobre las nucleares.
- Para estos partidos no hay ninguna candidata que, además, tenga a alguien en contra (apartado 3.B y 3.D).

**Coste:**
- Se descartan las respuestas a q20 de quien ya haya contestado, y sus resultados cambian.
- El impacto es acotado: q20 solo puntúa contra PP, Vox y ERC, así que hoy no cambia la afinidad con los otros 15
  partidos.

**Si se aprueba:**
1. Recodificación de las 18 celdas con verificación independiente. El verificador debe decidir en especial EH Bildu
   (adhesión por remisión), Ara Més (si Vidal habla por MÉS) y PSC (0 o null).
2. Comprobación del contexto en el BOE.
3. Integración igual que el 13-nov:
   - q20 a `retiradas`, con fecha, motivo y los partidos que tenían posición;
   - q36 al final de Energía y clima;
   - ejecutar `build_fase1.py`.

## 5. Fuentes nuevas o usadas por primera vez

| Fichero | sha256 |
|---|---|
| data/sources/fase1/revision_2026-11-15/DSCD-15-PL-151.pdf | b9cd63c60c6dc6e486ca66bcfda356e3177a770aee192ba083b504fe1c295433 |
| data/sources/fase1/revision_2026-11-15/DSCD-15-PL-151.txt (cabecera + pdftotext -layout) | f56b76977bec570421a19e2a169b81a0c3a7c68946063cb42b7a15357331d6fa |
| data/sources/fase1/g7_2026-11-14/junts/DSCD-15-PL-202.txt (ya existía) | ff22c4848062a679e7a98ca24000bf5f6332c3b8fe59a3f91869c19a98757bbf |
| data/sources/compromisos/psc/diaridetarragona_20261114_montalvo_entrevista.txt (ya existía) | b02b23e4e4d33a247b78a3f7f48648a740a500f30707642dd56109c83323b751 |
| data/sources/compromisos/ara_mes_fa/democrata_20261108_miting_palma.txt (ya existía) | 51f553fa031d14d407064460e0f5b31f431506540ee5f36b34b8072143a84d7d |
| data/sources/fase1/ampliacion_2026-11-13/cc/DSCD-15-PL-185.txt (ya existía) | fe0a8572664293c7d4b2429abdf128537b6f5b159d03ea2dc96b65e4581908dc |
| data/sources/fase1/ampliacion_2026-11-13/compromis/DSCD-15-PL-193.txt (ya existía) | 1611f3720842b7915b7c3071621bbc36aea1a0ea4e7ec0d4642ed7b70534b971 |
| data/sources/compromisos/upc/diariodeavisos_202610_tribuna.txt (ya existía) | dedf61f665386b5d2afa147c8112dbd5e59505331813ba26a045f458649afd18 |

Las citas de programa se han localizado con pdftotext en el PDF catalogado en `partidos.json`. Las páginas son las del
PDF, no las impresas.
