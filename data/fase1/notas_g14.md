# g14: programa del Frente Amplio para el 29-N (16-11-2026)

El Frente Amplio publicó el 16-nov su programa para el 29-N («Un programa como una casa», 151 pp.). Está catalogado en `partidos.json` (entrada `frente_amplio`): URL en frenteamplio.info,
sha256 del PDF df6e4d96…6f04 y del texto 240294d2…08ae (comprobados aquí; el .txt coincide con un `pdftotext -layout`
nuevo del PDF). Se leyó entero, página a página (`pdftotext -layout -f N -l N`), y se revisaron las 30 afirmaciones
vigentes de `preguntas.json` según `docs/prompts/2_codificacion_posiciones.md`, incluida «A qué partido cuenta cada
fuente» y la precedencia.

- **Páginas.** Las de las celdas son las del PDF. La numeración impresa no coincide y el desfase no es fijo: cada
  portadilla de capítulo es una sola página del PDF que equivale a dos impresas. Va de +2 en la introducción (la p. 8
  del PDF lleva impreso «10») a +27 en el capítulo 18 (la p. 141 lleva impreso «168»). La nota de cada celda da también
  la página impresa. Las pp. 1-6 son cubierta, créditos, índice y una página en blanco; el texto va de la p. 7 a la 150.
- **Citas.** Todas son literales del texto catalogado: comprobadas con `norm()` de `verify_quotes.py` contra el .txt y
  contra el texto de la página declarada, y con grep. Tienen 60 palabras o menos (6 a 57). La de q03 salta con [...] la
  cabecera de página entre la p. 18 y la 19; las de q01, q04, q05, q06 y q11 juntan frases de la misma medida con [...].
- **Celdas.** `codificacion_g14.json` solo contiene las posiciones del Frente Amplio que cambian o se añaden (20). En
  cada una, `sustituye` lleva la posición vigente con el grupo del que procede y `motivo_cambio`, por qué cambia.

## A qué partido cuenta el programa

Solo a la entrada `frente_amplio`. Es el programa común de la coalición que firman Izquierda Unida, Movimiento Sumar,
Catalunya en Comú, Más Madrid, Chunta Aragonesista, Izquierda Asturiana, Recortes Cero, Batzarre, Verdes Equo,
Iniciativa del Pueblo Andaluz y Somos (`partidos.json`, «programa_aplicable»).

No cuenta para Ara Més-Front Ampli (`ara_mes_fa`), Compromís (`compromis`), Unidad del Pueblo Canario (`upc`) ni
Podemos (`podemos`). Algunos partidos del Frente Amplio concurren en esas coaliciones, pero son otras candidaturas y otro
documento: la regla de documentos conjuntos va en sentido contrario (lo que firma la coalición regional cuenta para el
Frente Amplio, no al revés). No se toca ninguna celda de otro partido.

## Precedencia aplicada

- **El programa va primero.** Sustituye a la fuente vigente cuando trata la medida al menos tan directamente, también si
  coincide el valor (cambio solo de fuente, como en g11). Aquí sustituye a tres tipos de fuente:
  - documentos conjuntos de coaliciones regionales que firman partidos del Frente Amplio: el programa de Compromís:
    Front Valencià (q03, q04, q06, q08, q18, q24, q34), el manifiesto de Unidad del Pueblo Canario (q09, q33) y notas de
    Ara Més-Front Ampli (q01, q30);
  - discursos de portavoces del Grupo Plurinacional SUMAR anteriores a la convocatoria (q21, q29, q36);
  - una declaración de campaña de Bustinduy (q31).
- **Se conserva la posición vigente** cuando el programa no trata la medida o lo hace de forma menos directa sin
  contradecirla: q13, q17, q22, q23, q32 y q35 (ver abajo).

## Antes y después (las 30 afirmaciones)

| Afirmación | Antes | Ahora | Página PDF (impresa) | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | +1 nota Ara Més-Front Ampli (6-nov) | **+2** programa | 13-14 (16-17) | valor |
| q03 IVA/ITP primera vivienda | +1 programa Compromís: Front Valencià | +1 programa | 18-19 (21-22) | fuente |
| q31 Renovación del alquiler | +2 Bustinduy (12-nov) | +2 programa | 14 (17) | fuente |
| q04 Patrimonio permanente | +2 programa Compromís: Front Valencià | +2 programa | 45 (50) | fuente |
| q05 IRPF de dos tipos | null | **−1** programa | 46 (51) | nueva |
| q06 Jornada de 37,5 h | +1 programa Compromís: Front Valencià | **+2** programa | 55 (61) | valor |
| q32 SMI autonómico | +1 nota Ara Més-Front Ampli (10-nov) | +1 (se conserva) | — | — |
| q08 Jubilación a los 65 | +2 programa Compromís: Front Valencià | +2 programa | 57 (63) | fuente |
| q09 Prohibir pagar a la privada | +1 manifiesto UPC (3-nov) | +1 programa | 26 (30) | fuente |
| q11 Retirar la concertada | null | **+2** programa | 31 (35) | nueva |
| q12 Castellano en las aulas | null | **+1** programa | 32 (36) | nueva |
| q13 Prioridad en vivienda social | −1 Delgado (8-nov) | −1 (se conserva) | — | — |
| q15 Otra regularización | null | null | — | — |
| q33 Reparto de menores | −1 manifiesto UPC (3-nov) | **−2** programa | 41 (45) | valor |
| q16 Referéndum pactado | null | **+1** programa | 140 (167) | nueva |
| q17 Concierto para quien lo pida | +1 programa Compromís: Front Valencià | +1 (se conserva) | — | — |
| q18 Asumir 83.000 M de deuda | +1 programa Compromís: Front Valencià | +1 programa | 104 (118) | fuente |
| q19 Eólica marina | null | null | — | — |
| q36 Alargar las nucleares | −2 Martínez Barbero (9-sep) | −2 programa | 64 (71) | fuente |
| q21 Aborto en la Constitución | +2 Martínez Barbero (30-abr) | +2 programa | 28 (32) | fuente |
| q22 Suprimir Igualdad | −1 Bustinduy (23-oct) | −1 (se conserva) | — | — |
| q23 Desalojo en 48 h | −1 Pisarello (19-may) | −1 (se conserva) | — | — |
| q24 Derogar la ley mordaza | +2 programa Compromís: Front Valencià | +2 programa | 142 (169) | fuente |
| q35 Ampliar la prisión permanente | −2 Santiago (17-mar) | −2 (se conserva) | — | — |
| q25 Indultos por corrupción | null | null | — | — |
| q26 Defensa al 3,5 % | null | **−2** programa | 130 (155) | nueva |
| q27 Ejército en Ceuta | null | null | — | — |
| q34 Referéndum en el Sáhara | +2 programa Compromís: Front Valencià | +2 programa | 132 (157) | fuente |
| q29 Frenar Mercosur | +2 Valero (17-feb) | **null** | 133 (158) | valor |
| q30 Precio máximo de alimentos | +2 nota Ara Més-Front Ampli (7-nov) | **+1** programa | 56 (62) | valor |

Resumen: 20 celdas en g14. 5 nuevas (q05, q11, q12, q16, q26), 5 cambios de valor (q01 y q06 suben, q30 baja, q33
se endurece, q29 pasa a null) y 10 solo de fuente. Cobertura del Frente Amplio: 21 → 25 posiciones conocidas.

## Valores: razonamiento

- **q01 (+1 → +2).** «Limitaremos por ley el precio del alquiler residencial en todas las zonas tensionadas», con una
  fórmula estatal (el menor entre el 25 % de la renta media de la sección censal y el índice SERPAVI), declaración de
  zona tensionada obligatoria y automática y, si la comunidad se niega, activación de oficio por el Ministerio. Es un
  tope estatal que deja de depender de cada comunidad. Mismo criterio que Adelante Andalucía (+2). Ver duda 4.
- **q03 (+1).** Exención total del ITP para la primera vivienda habitual, con topes de ingresos y de precio, a cualquier
  edad; no habla del IVA. Misma dirección con otra medida, como Compromís, ERC, SALF y Vox.
- **q04 (+2).** Reforma el Impuesto de Solidaridad de las Grandes Fortunas para ampliarlo (umbral de 3 a 1 millón,
  tipos más altos) y dice que «mantendrá su carácter estatal y complementario». Mantenerlo sin plazo y ampliarlo
  equivale a hacerlo permanente, como «mantindrem i ampliarem» de Compromís.
- **q05 (null → −1).** Coincide en que quien cobre el SMI no pague IRPF, pero propone más tramos y tipos marginales de
  hasta el 52 %: lo contrario de dos tipos del 15 % y el 25 %. No lo rechaza expresamente: −1, como Adelante Andalucía.
- **q06 (+1 → +2).** El epígrafe «Hacia una jornada laboral máxima de 32 horas semanales sin reducción salarial» empieza
  por la «Implantación inmediata a 37,5 horas en 2026». La introducción (p. 7) lo repite. Es la medida de la
  afirmación como primer paso; el +1 anterior venía de un documento que solo hablaba de 32 horas.
- **q08 (+2).** «Devolveremos la edad de jubilación a los 65 años», sin limitarlo a colectivos (los oficios penosos van
  aparte, a los 60). Como el BNG y Compromís.
- **q09 (+1).** Gestión directa como «vía general», derogar la Ley 15/1997, gestión indirecta «estrictamente
  excepcional» y plan de internalización paulatina. No prohíbe pagar a la privada: la gestión indirecta sigue siendo
  posible y el propio programa cuenta con derivaciones a centros concertados (p. 29). Como Compromís (+1).
- **q11 (null → +2).** «Hoja de ruta progresiva», «periodo de coexistencia con centros concertados» y el objetivo de que
  «el 100 % de los fondos públicos vayan destinados a la educación pública». No dice que empiece por las etapas no
  obligatorias. Mismo criterio que Adelante Andalucía (+2), que tampoco lo dice. Ver duda 5.
- **q12 (null → +1).** «Garantizando la inmersión lingüística en catalán como lengua vehicular en Cataluña»: incompatible
  con un mínimo de castellano fijado por ley o por tribunales, pero solo para Cataluña y sin hablar de porcentajes.
  Indirecta, como el BNG y Junts.
- **q16 (null → +1).** «Derecho a decidir mediante referéndum para resolver definitivamente la cuestión territorial»,
  dentro de un cambio constitucional federal y plurinacional y como objetivo a debatir. Apoya un referéndum territorial,
  con condiciones y sin nombrar la independencia: +1, como Podemos, Junts y EH Bildu. Ver duda 6.
- **q18 (+1).** Condonación de deuda autonómica, para todas las comunidades, «condicionada a la prohibición de efectuar
  dumping fiscal», sin cifra. Con condición y sin cuantía: +1 (PSOE y ERC, +2).
- **q21 (+2).** Reformar el artículo 43 de la Constitución para incluir el derecho al aborto; lo repite en las pp. 37 y
  140.
- **q24 (+2).** «Derogaremos por completo la Ley Mordaza.»
- **q26 (null → −2).** Rechaza «de forma explícita» el 5 % de la OTAN e impulsa «una reducción efectiva de las partidas
  militares». Como Podemos, Adelante Andalucía, EH Bildu y el BNG.
- **q29 (+2 → null).** Ver duda 1.
- **q30 (+2 → +1).** Topes máximos a los alimentos básicos «condicionados a situaciones de emergencia o abuso
  acreditado», y facultad de la CNMC para fijar precios máximos ante márgenes abusivos. A favor con condiciones, como
  Adelante Andalucía (+1). Ver duda 2.
- **q31 (+2).** Alquiler indefinido por defecto y, en la transición, prórroga obligatoria por periodos automáticos de 5
  años (7 si el casero es persona jurídica).
- **q33 (−1 → −2).** «Acuerdo marco vinculante para un reparto solidario y equitativo entre comunidades autónomas» de
  la infancia migrante no acompañada: reparto obligatorio como medida propia, lo contrario de suprimirlo. Como
  Coalición Canaria (−2). Ver duda 3.
- **q34 (+2).** Retirar el apoyo al plan de autonomía marroquí y defender un referéndum de autodeterminación
  supervisado por la ONU.
- **q36 (−2).** Cumplir el calendario de cierre: Almaraz I y II cerrarán en 2027-2028.

## Se conservan las posiciones vigentes

- **q13 (−1, Delgado).** El programa no habla del acceso de extranjeros a la vivienda social; la ley antirracismo
  (p. 126) es otra medida.
- **q17 (+1, programa de Compromís: Front Valencià).** El programa propone reformar el sistema común de financiación
  partiendo de la propuesta del Gobierno, con más autonomía financiera y capacidad tributaria de las comunidades y para
  «acomodar la voluntad de mayor autogobierno que han expresado algunas comunidades autónomas» (p. 103). No habla del
  concierto ni lo rechaza: es menos directo que el documento conjunto y no lo contradice. Ver duda 7.
- **q22 (−1, Bustinduy).** El programa no menciona el Ministerio de Igualdad.
- **q23 (−1, Pisarello).** El programa no trata la ocupación ni los plazos de desalojo. «Ni un desahucio más» (p. 15)
  es otra medida.
- **q32 (+1, nota de Ara Més-Front Ampli).** El programa solo trata el SMI estatal (suelo del 60 % del salario medio
  neto, p. 51). Un suelo estatal es compatible con salarios mínimos autonómicos más altos: no lo contradice.
- **q35 (−2, Santiago).** El programa no menciona la prisión permanente revisable. Ampliar las penas no privativas de
  libertad (p. 149) va en la misma línea.

## Siguen en null

- **q15 Otra regularización.** «Culminar la regularización extraordinaria de 2026» y un «procedimiento estable,
  permanente y reglado de regularización administrativa» (p. 126). Una vía permanente no es otra regularización
  extraordinaria. Mismo criterio que Compromís («vies de regularització»), BNG y ERC (null). Ver duda 8.
- **q19 Eólica marina.** Solo renovables en general, repotenciación y protección marina (pp. 61-62, 71); no menciona la
  eólica marina.
- **q25 Indultos por corrupción.** Muchas medidas anticorrupción (pp. 141-142: Oficina Independiente contra la
  Corrupción, inhabilitación para contratar durante veinte años, sin atenuante de dilaciones), pero nada de indultos.
- **q27 Ejército en Ceuta.** Solo derogar el «rechazo en frontera», un control independiente de derechos humanos en la
  Frontera Sur (p. 126) y desmilitarizar la Guardia Civil (p. 144). Son medidas distintas.

## Descartes

- **Introducción (pp. 7-8).** Resume las medidas (tope de rentas, 37,5 horas, aborto, Sáhara). Se usa como
  confirmación en las notas; las citas son de la medida concreta.
- **q20 (emisiones −65 %).** El programa da objetivos de emisiones para 2035 (−38 %) y 2040 (−85 %), pero q20 está
  retirada.
- **Ley de plurilingüismo (p. 141)**: trata la relación con las instituciones del Estado, no la escuela (q12).
- **Página web de 8 medidas (`web_2026-11-16/`)**: documento programático previo, no el programa. No se usó: el PDF es
  posterior y más completo.

## Dudas para el verificador y el editor

1. **q29 de +2 a null: la primera vez que una celda pasa de un valor a null.** Valero (Pleno, 17-feb-2026) dijo «hay que
   frenar el acuerdo Mercosur». El programa trata el acuerdo en una medida propia («salvaguardas en el Acuerdo
   UE-Mercosur», p. 133) y no pide frenarlo: «Bajo la aplicación del Acuerdo UE-Mercosur, se fiscalizarán los
   compromisos [...] activando cláusulas de salvaguarda». Se ha leído como que el programa, posterior, ya no defiende
   frenarlo. Tampoco lo celebra ni se opone a frenarlo, así que no es −1.
   - Alternativa: conservar +2 (Valero), entendiendo que «bajo la aplicación» quiere decir «mientras se aplique» y que el
     programa no contradice frenarlo. Para eso basta con quitar q29 de g14.
2. **q30 baja de +2 a +1.** La nota de Ara Més-Front Ampli (7-nov) pedía un tope a los alimentos básicos sin
   condiciones. El programa lo condiciona a «situaciones de emergencia o abuso acreditado». Se aplicó «el programa va
   primero» también cuando rebaja el valor.
   - Alternativa: conservar +2 si se considera que el programa es menos directo. No parece el caso: el epígrafe se
     titula «Fijación de precios máximos en la cesta básica de alimentos».
3. **q33 −2 por «acuerdo marco vinculante».** Es un acuerdo entre comunidades, no la orden del Estado de la ley
   vigente, pero vinculante. Se trató como Coalición Canaria («obligatorio y automático», −2).
   - Alternativa: −1, si «acuerdo marco» se lee como pacto entre comunidades y no como reparto obligatorio.
4. **q01 +2 con un tope limitado a las zonas tensionadas.** La afirmación dice «en toda España». El programa lo aplica
   en todas las zonas que cumplan los parámetros legales, con declaración automática y subsidiaria del Estado, igual que
   Adelante Andalucía (+2).
   - Alternativa: +1, como el PSOE y Compromís, si se exige un tope general.
5. **q11 +2 sin «empezando por las etapas no obligatorias».** El programa fija el objetivo («100 % de los fondos públicos»
   a la pública) y la gradualidad, no el orden. Adelante Andalucía tiene +2 en el mismo caso.
6. **q16 +1.** «Derecho a decidir mediante referéndum» dentro de una reforma constitucional federal y como objetivo
   para el que «promoveremos el debate». No nombra la independencia ni un pacto del Gobierno con una comunidad.
   - Alternativa: null, si se exige que se refiera expresamente a la independencia (criterio de Compromís, null por
     «model d'Estat plurinacional» y referendos en general). Aquí se trató como indirecta pero inequívoca, porque
     «derecho a decidir» y «cuestión territorial» son los términos de la autodeterminación.
7. **q17 se conserva el +1 del programa de Compromís: Front Valencià.** El programa del Frente Amplio propone reformar
   el sistema común «a partir de la propuesta presentada por el Gobierno», sin concierto, pero quiere «acomodar la
   voluntad de mayor autogobierno» de algunas comunidades. Se juzgó que no contradice el concierto para la Comunitat
   Valenciana del documento conjunto.
   - Alternativa: null, si se lee la reforma del régimen común como la posición propia del partido sobre la afirmación.
     En g10 ya se anotó que el +1 a dos partidos estatales por el concierto valenciano es llamativo.
8. **q15 null.** Un «procedimiento estable, permanente y reglado de regularización» más culminar la de 2026.
   - Alternativa: +1, si se entiende que regularizar de forma permanente a quienes siguen sin papeles va en la dirección
     de la afirmación con otra medida (como se hace en q03).

## Comprobación del build

En una copia del repositorio (`scratchpad/g14_check`), `python3 -I pipeline/build_fase1.py` no da errores:

- sin `verificacion_g14.json` omite g14 («omitido, sin verificación aprobada»), y el Frente Amplio queda con 21
  posiciones;
- con un `verificacion_g14.json` provisional (`"aprobado": true`, solo en la copia) aplica g14 después de g13 y el
  Frente Amplio pasa a 25 posiciones (20 celdas de g14; q29 en null);
- ningún otro partido cambia.

En el repositorio no se ha creado `verificacion_g14.json`: la verificación la hará otra persona.

## Verificación

Verificación independiente del 16-nov en `verificacion_g14.json` (aprobado). Se abrió cada página citada del PDF
(`pdftotext -layout -f N -l N`): las 19 citas son literales, están en su página y tienen 60 palabras o menos; las 20
`sustituye` coinciden con la celda vigente en `fase1.json`. 19 celdas ok, 1 corregida, ninguna rechazada.

- **q33: −2 → −1 (corregida aquí, en `codificacion_g14.json`).** El «acuerdo marco vinculante para un reparto
  solidario y equitativo entre comunidades autónomas» (p. 41) va en contra de suprimir el reparto, pero no es un rechazo
  expreso ni prioritario: es un acuerdo entre administraciones, en una subordinada del Plan Integral, más cerca del
  «pacto de Estado» de Adelante Andalucía (−1) que de la «solidaridad obligatoria y automática» de Coalición Canaria
  (−2). Ante la duda entre dos valores, el más prudente. La celda vigente ya era −1 (manifiesto de UPC): queda como
  cambio solo de fuente. La tabla y el resumen de arriba conservan el −2 del codificador; el valor final es −1.
- **Dudas resueltas.** q29 null (el programa trata el acuerdo en una medida propia y elige salvaguardas «bajo la
  aplicación»; cuando quiere parar un acuerdo de la UE lo dice, como con Israel y Marruecos-Sáhara, pp. 132 y 137; las
  salvaguardas no equivalen a frenarlo, criterio de g4). q30 +1, q01 +2, q11 +2, q16 +1, q17 conservado (+1) y q15
  null, como propone el codificador; razonamiento en `verificacion_g14.json`.
- **Recuento final.** Frente Amplio: 21 → 25 posiciones. 4 cambios de valor (q01 y q06 suben, q30 baja, q29 a null),
  5 nuevas (q05, q11, q12, q16, q26) y 11 solo de fuente (q03, q04, q08, q09, q18, q21, q24, q31, q33, q34, q36).
- **Pendiente para el editor** (en «dudas»): q29 (alternativa: conservar +2), q33 (alternativa −2), q01 (alternativa
  +1) y q17 (documento conjunto regional frente al modelo de financiación del programa).
