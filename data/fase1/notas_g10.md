# g10: programa de Compromís: Front Valencià para el 29-N (14-11-2026)

Compromís publicó el 14-nov su programa para el 29-N («Programa electoral 29N. Compromís-Front Valencià», 64 pp., en
valenciano). Está catalogado en `partidos.json` (entrada `compromis`): URL en frontvalencia.org, sha256 del PDF
37b569d6…6b55 (comprobado aquí) y texto en `data/sources/programas/compromis/programa-compromis-front-valencia.txt`.
Se leyó entero, página a página, y se revisaron las 30 afirmaciones de `preguntas.json` según
`docs/prompts/2_codificacion_posiciones.md`, incluida «A qué partido cuenta cada fuente».

- Las páginas son las del PDF; coinciden con la numeración impresa del índice.
- Las páginas 1-2 son el índice y la 3, la introducción (sin medidas).
- Todas las citas son literales del texto catalogado (con `norm()` de `verify_quotes.py` y también sin normalizar), están
  en la página declarada y tienen 60 palabras o menos. La de q08 junta dos guiones seguidos de la p. 8 con [...].
- Las citas van en valenciano. La traducción al castellano abre la `nota` («Traducción: «…»»), como en g4 y g5.

`codificacion_g10.json` solo contiene las posiciones que cambian o se añaden (27). No hay celdas null. En cada una:

- `sustituye`: la posición vigente hasta ahora, con el grupo del que procede (también cuando era null).
- `motivo_cambio`: por qué cambia.

## A qué partido cuenta el programa

El pacto de coalición de Compromís: Front Valencià (JEC C5, `data/boe/coaliciones.json`) lo firman Més-Compromís,
Iniciativa del Poble Valencià, Verds Equo del País Valencià, Coalició Compromís, Podemos, Esquerra Unida del País
Valencià, Esquerra Republicana del País Valencià y Recortes Cero.

- **Compromís.** Es su programa oficial (`partidos.json`). Fuente `programa`, y va primero.
- **Podemos.** Firma el pacto y no tiene programa. Es un documento conjunto: fuente `campaña`, fecha 14-nov,
  `formato` «documento oficial (programa electoral de la coalición)».
- **Frente Amplio.** Firman Esquerra Unida del País Valencià (federación de IU) y Recortes Cero. Sin programa propio.
  Mismo tratamiento que Podemos.
- **ERC.** Firma Esquerra Republicana del País Valencià, su nombre en el País Valencià. ERC tiene programa (5-nov): va
  primero. El documento conjunto solo cubre afirmaciones de las que ni ese programa ni nada posterior de ERC dice nada.

## Precedencia aplicada

- **Compromís: el programa va primero** cuando trata la medida al menos tan directamente como la declaración de campaña.
  Si es menos concreto y no la contradice ni la matiza, se conserva la declaración. Es el criterio de la verificación de
  g6 (Vox) y g4 (PNV q11, q15, q21).
- **Podemos y Frente Amplio: entre declaraciones prevalece la posterior.** El programa (14-nov) es posterior a todas.
  - Si el valor es distinto, prevalece cuando trata la medida al menos tan directamente (q04, q08, q34).
  - Si el valor coincide con una fuente propia del partido, se mantiene la propia.
  - Si el valor coincide con otro documento conjunto, se usa el posterior solo cuando es al menos igual de directo.
    Precedente: Frente Amplio q01 en la reatribución del 13-nov. Así, la web electoral de la misma coalición (12-nov)
    cede ante el programa (Frente Amplio q06, ERC q31). El manifiesto de UPC (Podemos y Frente Amplio q09) y la nota de
    Ara Més-Front Ampli (Frente Amplio q01) se conservan porque son más directos.
- **ERC.** Su programa del 5-nov va primero. Solo se añade q08 y se cambia la fuente de q31; ver abajo.

## Cambios (27)

### Compromís: 11 (4 nuevas, 1 cambio de valor, 6 de fuente)

| Afirmación | Antes | Ahora | Página | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | +1 campaña (Micó, 25-oct) | +1 programa | 4 | fuente |
| q03 IVA/ITP primera vivienda | null | +1 programa | 5 | nueva |
| q04 Patrimonio permanente | null | +2 programa | 18 | nueva |
| q06 Jornada de 37,5 h | +1 campaña (web de la coalición, 12-nov) | +1 programa | 6 | fuente |
| q08 Jubilación a los 65 | null | +2 programa | 8 | nueva |
| q09 Prohibir pagar a la privada | +1 campaña (nota de Compromís, 16-dic-2025) | +1 programa | 9 | fuente |
| q17 Concierto para quien lo pida | null | +1 programa | 57 | nueva |
| q18 Asumir 83.000 M de deuda | +1 campaña (Micó, 25-oct) | +1 programa | 57 | fuente |
| q24 Derogar la ley mordaza | +2 campaña (Micó, 5-oct) | +2 programa | 43 | fuente |
| q31 Renovación del alquiler | +2 campaña (web de la coalición, 12-nov) | +2 programa | 4 | fuente |
| q34 Referéndum en el Sáhara | +1 campaña (Micó, 10-dic-2025) | **+2** programa | 63 | valor |

### Podemos: 6 (4 nuevas, 2 cambios de valor)

| Afirmación | Antes | Ahora | Página |
|---|---|---|---|
| q03 | null | +1 documento conjunto | 5 |
| q04 | +1 (Montero, 6-nov) | **+2** documento conjunto | 18 |
| q08 | null | +2 documento conjunto | 8 |
| q17 | null | +1 documento conjunto | 57 |
| q24 | null | +2 documento conjunto | 43 |
| q34 | +1 (Belarra, 12-nov-2025) | **+2** documento conjunto | 63 |

### Frente Amplio: 8 (4 nuevas, 3 cambios de valor, 1 de fuente)

| Afirmación | Antes | Ahora | Página |
|---|---|---|---|
| q03 | null | +1 documento conjunto | 5 |
| q04 | +1 (nota del Frente Amplio, 5-nov) | **+2** documento conjunto | 18 |
| q06 | +1 (web de la coalición, 12-nov) | +1 documento conjunto (programa) | 6 |
| q08 | +1 (nota del Frente Amplio, 24-oct) | **+2** documento conjunto | 8 |
| q17 | null | +1 documento conjunto | 57 |
| q18 | null | +1 documento conjunto | 57 |
| q24 | null | +2 documento conjunto | 43 |
| q34 | +1 (Martínez Barbero, 12-nov-2025) | **+2** documento conjunto | 63 |

### ERC: 2 (1 nueva, 1 de fuente)

| Afirmación | Antes | Ahora | Página |
|---|---|---|---|
| q08 | null | +2 documento conjunto | 8 |
| q31 | +2 (web de la coalición, 12-nov) | +2 documento conjunto (programa) | 4 |

Cobertura simulada en una copia con g10 aprobado: Compromís 13 → 17, Podemos 18 → 22, Frente Amplio 16 → 20,
ERC 17 → 18. `build_fase1.py` no da errores, ni sin verificación de g10 (lo omite) ni con ella.

## Valores: razonamiento

- **q01 (+1).** «Donarem competències als Ajuntaments perquè puguen declarar zones tensionades […] per impulsar el
  control efectiu de preus de lloguer» (p. 4). Control de rentas por zonas que declara el ayuntamiento, sin depender
  de la comunidad, pero sin un tope estatal en toda España. El mismo valor y el mismo eje que Micó.
- **q03 (+1).** Exención del ITP para la primera vivienda de menos de 350.000 € (p. 5). No habla del IVA ni de la edad.
  Misma dirección con otra medida, como ERC, SALF y Vox.
- **q04 (+2).** «Mantindrem i ampliarem l'Impost a les Grans Fortunes» (p. 18). Nombra el impuesto de la afirmación,
  prorrogado sin fecha fija desde 2023 (contexto de q04), y se compromete a mantenerlo y ampliarlo. Equivale a hacerlo
  permanente, como ERC («fer permanent», +2). Ver duda 1.
- **q06 (+1).** Jornada de 32 horas sin rebaja salarial (p. 6). Va más allá de las 37,5 h: +1, como Podemos (30 h) y
  Adelante Andalucía (32 h).
- **q08 (+2).** «Retornarem l'edat de jubilació als 65 anys» (p. 8), primera medida de pensiones, junto a quitar los
  coeficientes reductores a quien se jubila antes con 40 años trabajados. Como el BNG (+2). Ver duda 2.
- **q09 (+1).** Blindar la gestión pública e impedir la mercantilización y la privatización de la gestión derogando la
  Ley 15/1997 (p. 9). Va en la dirección de la afirmación, pero no prohíbe pagar a centros privados ni revierte lo
  concertado. El BNG (+2) pide financiación, gestión y provisión exclusivamente públicas. Ver duda 4.
- **q17 (+1).** «Apostarem per un concert econòmic responsable o, en el seu defecte, per un sistema […] on la
  Generalitat Valenciana recapte directament la major part dels tributs» (p. 57). Es el modelo de la afirmación, pero
  con una alternativa: +1 (BNG y Junts, sin alternativa, +2; ERC +1).
- **q18 (+1).** Condonar la deuda de la Generalitat Valenciana atribuida a la infrafinanciación (p. 57). Solo la
  valenciana, sin la quita general ni su cuantía: indirecta, como Micó y el PSC.
- **q24 (+2).** «Derogarem la Llei de Protecció de la Seguretat Ciutadana, coneguda com a llei mordassa» (p. 43).
- **q31 (+2).** «Promourem el lloguer indefinit com a règim ordinari» (p. 4), con la excepción de recuperar la vivienda
  por uso propio o familiar. Va más allá de la renovación por cinco años: +2, como la web que sustituye.
- **q34 (+2).** «Donarem suport al dret a la lliure determinació dels pobles […] en casos com el Sàhara Occidental […]
  exigint la celebració d'un referèndum» (p. 63). Pide expresamente el referéndum que Micó no mencionaba.

## Se conservan posiciones de campaña

### Compromís (el programa no trata la medida, o lo hace de forma menos directa sin contradecirla)

- **q13 (−1, Micó).** El programa no habla de la vivienda social. «Accés universal a l'atenció sanitària pública, sense
  discriminacions per origen» (p. 9) es otra medida.
- **q21 (+2, Micó: «blindaje constitucional […] del derecho al aborto»).** El programa garantiza la interrupción del
  embarazo «en els termes previstos legalment» en la red pública (p. 52). No habla de la Constitución.
- **q22 (−1, Micó).** No habla del Ministerio de Igualdad.
- **q23 (−1, Micó).** «Prohibirem legalment els desnonaments sense alternativa habitacional» (p. 6) es otra medida. No
  habla de la ocupación ni de plazos de desalojo.
- **q30 (+2, Micó: «topar el precio de la energía y los alimentos básicos»).** El programa propone ampliar el control público
  de los márgenes de la gran distribución y exigir transparencia de precios (p. 24). Es menos directo que el tope de
  Micó y no lo contradice.
- **q33 (−1, nota con Aitana Mas).** «Exigirem un acolliment digne, protecció de menors» (p. 64) no trata el reparto
  entre comunidades.

### Podemos, Frente Amplio y ERC

- **Fuente propia con el mismo valor:** Podemos q01 (Montero), q06 (web de Montero, 30 h), q18 (Santana) y q31
  (Belarra); Frente Amplio q31 (Bustinduy).
- **Documento conjunto anterior más directo, mismo valor:**
  - Podemos y Frente Amplio q09: el manifiesto de UPC (3-nov) habla de revertir «privatizaciones y externalizaciones»,
    más cerca de dejar de pagar a centros privados que derogar la Ley 15/1997.
  - Frente Amplio q01: la nota de Ara Més-Front Ampli (6-nov) habla de «posar topalls als preus dels lloguers», más
    directo que la declaración de zonas tensionadas por los ayuntamientos.
- **ERC: su programa va primero.**
  - Mismo sentido en q03 (+1), q04 (+2), q06 (+2, 37,5 h, más directo que 32 h), q17 (+1), q18 (+2), q24 (+2) y q34 (+2).
  - q01 y q09 siguen en null. El programa de ERC sí trata esos temas: pide delegar en la Generalitat la ley de
    arrendamientos y «frenar la privatització de la sanitat», que la verificación juzgó medidas distintas. Por tanto,
    el documento conjunto no puede cubrirlas. En q01 además iría en sentido contrario: la medida de ERC deja el
    alquiler en manos de la Generalitat.
- **ERC q08 (nueva).** El programa de ERC solo trata la jubilación anticipada en profesiones penosas (medida 110). Eso
  es compatible con volver a los 65 y no dice nada de la edad ordinaria. En los grupos codificados no consta nada
  posterior de ERC sobre la medida. No se hizo búsqueda web adicional.
- **ERC q31.** El programa de ERC sigue sin tratar la duración de los contratos. El programa conjunto (14-nov)
  sustituye a la web de la misma coalición (12-nov).

## Siguen en null (Compromís, y por tanto sin efecto en los firmantes)

- **q05 IRPF.** Solo deflactar el IRPF para rentas de menos de 30.000 € (p. 18).
- **q11 Concertada.** «Modificarem la normativa bàsica de concerts educatius perquè la xarxa concertada siga realment
  subsidiària de la pública» (p. 10). Hacerla subsidiaria es una medida relacionada pero distinta de retirar la
  financiación hasta suprimirla. Ver duda 7.
- **q12 Castellano en las aulas.** Los derechos lingüísticos (p. 44) tratan la Administración, la justicia y el
  consumo, no la escuela.
- **q15 Otra regularización.** «Regularitzarem i donarem drets per als qui viuen ací. Impulsarem vies de regularització
  i reformes que faciliten la documentació i autorització de treball» (p. 64). Habla de vías y reformas, no de una
  regularización extraordinaria. Mismo criterio que BNG q15 y ERC q15 (null). Ver duda 7.
- **q16 Referéndum de independencia.** Solo un «model d'Estat plurinacional» (p. 60) e impulsar «l'utilització dels
  referèndums» en general (p. 40).
- **q19 Eólica marina.** Solo las zonas de aceleración renovable en tierra (p. 30).
- **q20 Emisiones −65 %.** Revisar la ley de cambio climático, electrificación al 100 % en 2030 y abandono de los
  combustibles fósiles en 2040 (p. 31). No da objetivo de emisiones para 2030 y el horizonte de 2040 no implica por
  sí solo el −65 % en 2030. Ver duda 7.
- **q25 Indultos por corrupción, q27 Ceuta, q32 SMI autonómico** (solo el SMI estatal al 60 % del salario medio, p. 6)
  **y q35 Prisión permanente.** El programa no trata estas medidas.
- **q26 Defensa al 3,5 %.** Una defensa europea que sustituya a la OTAN y «reduïsca duplicitats i despeses militars»,
  pero también «Impedirem que els increments de la despesa militar es facen a costa de reduir la inversió en serveis
  públics» (p. 62). Este último condiciona los aumentos, no los rechaza. Es ambivalente, así que null. Ver duda 7.
- **q29 Mercosur.** «Demanarem que el govern espanyol trasllade al TJUE els acords comercials que desprotegeixen els
  nostres sectors» (p. 64). No nombra Mercosur. La celda ya era null tras la verificación de g5.

## Cambio en `pipeline/build_fase1.py`

El script leía los grupos en orden alfabético (`sorted(glob)`). Con ese orden, `codificacion_g10.json` iba detrás de
g1 y delante de g2, y g2-g9 pisaban sus celdas: g10 no habría tenido efecto. Ahora los ordena por número
(g1 < g2 < … < g10). Para g1-g9 el orden no cambia.

## Dudas para el verificador

1. **q04 +2 (Compromís, y por arrastre Podemos y Frente Amplio, que pasan de +1 a +2).** ¿Equivale «Mantindrem i
   ampliarem l'Impost a les Grans Fortunes» a hacerlo permanente? Si se queda en +1, Podemos y Frente Amplio
   conservan su fuente propia (mismo valor) y solo Compromís gana q04.
2. **q08 +2 (Compromís, Podemos, ERC; Frente Amplio de +1 a +2).** Al Frente Amplio se le dio +1 por «recuperar la
   jubilación a los 65 años» porque no decía expresamente que cambiara la edad ordinaria para todos. «Retornarem l'edat
   de jubilació als 65 anys» habla de la edad de jubilación sin colectivos: se trató como el BNG (+2). Si se queda en
   +1, el Frente Amplio conserva su nota.
3. **ERC q08 desde el documento conjunto.** El programa nacional de ERC no lo propone. Se aplicó la regla porque ERC no
   dice nada de la edad ordinaria y ERPV firma el pacto. Confirmar que la regla alcanza a una medida de este peso.
4. **Compromís q09: programa o nota de diciembre.** ¿Trata el programa la medida al menos tan directamente que la nota
   de Baldoví (revertir las concesiones valencianas)? ERC q09 quedó en null por «frenar la privatització». Aquí hay
   una medida concreta (derogar la Ley 15/1997) e «impedirem la mercantilització de l'atenció sanitària». El valor
   (+1) no cambia en ningún caso.
5. **q34 y q04 bajan o suben posiciones propias de líderes.** Por «la posterior prevalece», el documento conjunto
   (14-nov) sustituye a Belarra y Martínez Barbero (q34, +1 de 2025) y a Montero y la nota del Frente Amplio (q04, +1).
   En los dos casos el documento es más directo. Confirmar que la precedencia se aplica así cuando el valor sube.
6. **q17 para Podemos y Frente Amplio.** Dos partidos de ámbito estatal reciben +1 por pedir un concierto para la
   Comunitat Valenciana. Es la regla de documentos conjuntos tal como está, pero el efecto es llamativo.
7. **Null discutibles en Compromís:**
   - q11: ¿«subsidiària» es +1 en la dirección de la afirmación?
   - q15: ¿«Regularitzarem […] els qui viuen ací» es +1?
   - q20: ¿el abandono de los fósiles en 2040 es un +1 indirecto, simétrico al −1 del PP?
   - q26: ¿«reduïsca […] despeses militars» es un −1 como el de ERC?
   - q29: ¿pedir que el Gobierno lleve al TJUE los acuerdos comerciales es un +1 sin nombrar Mercosur?
8. **Documento conjunto que sustituye a otro con el mismo valor.** Se aplicó «el posterior, si es al menos igual de
   directo»: la web cede ante el programa (Frente Amplio q06, ERC q31); UPC (q09) y Ara Més (Frente Amplio q01) se
   mantienen. Si se prefiere no tocar celdas de otros documentos conjuntos con el mismo valor, Frente Amplio q06 y
   ERC q31 se pueden quitar de g10 sin efecto en los valores.
