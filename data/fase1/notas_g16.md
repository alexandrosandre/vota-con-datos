# g16: programa de EH Bildu para el 29-N (16-11-2026)

EH Bildu publicó el 16-nov su programa para el 29-N («Programa. Posible Egin. Garantía y derechos», 30 pp., en castellano;
hay una versión en euskera que no se ha catalogado). Está catalogado en `partidos.json` (entrada `eh_bildu`): PDF de
ehbildu.eus enlazado desde la noticia oficial del 16-nov, sha256 del PDF ceb655c9…6047 (comprobado aquí) y del texto
68fb9b49…2122 (el .txt coincide con un `pdftotext -layout` nuevo del PDF). Se leyó entero, página a página
(`pdftotext -layout -f N -l N`), y se revisaron las 30 afirmaciones vigentes de `preguntas.json` según
`docs/prompts/2_codificacion_posiciones.md`.

- **Páginas.** Las del PDF; coinciden con la numeración impresa. Las pp. 1-3 son portada e índice (el índice va una
  página adelantado desde el capítulo 2: dice p. 24 para el 2.1, que empieza en la 23) y la 30 es la contraportada.
- **Citas.** Literales del texto catalogado: comprobadas con `norm()` de `verify_quotes.py` contra el .txt y contra el
  texto de la página declarada. Tienen 60 palabras o menos (13 a 52). Las de q01 y q16 juntan con [...] dos medidas
  de la misma página.
- **Celdas.** `codificacion_g16.json` solo contiene las posiciones de EH Bildu que cambian o se añaden (11). En cada una,
  `sustituye` lleva la posición vigente con el grupo del que procede y `motivo_cambio`, por qué cambia.

## A qué partido cuenta el programa

Solo a `eh_bildu`. Es el programa único del partido para Euskadi y Navarra (`partidos.json`, «programa_aplicable»).
EH Bildu concurre sola al Congreso (en el Senado va con ERC, pero eso no afecta a los pasos 1 y 2). No se toca ninguna
celda de otro partido.

## Precedencia aplicada

- **El programa va primero.** Sustituye a la fuente vigente cuando trata la medida al menos tan directamente, también si
  coincide el valor (cambio solo de fuente) o si lo rebaja (q36), como en g14.
- **Se conserva la posición vigente** cuando el programa no trata la medida o lo hace de forma menos directa sin
  contradecirla: q23, q27, q29, q30, q31, q33 y q35 (ver abajo).

## Antes y después (las 30 afirmaciones)

| Afirmación | Antes | Ahora | Página | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | null | **+1** programa | 5 | nueva |
| q03 IVA/ITP primera vivienda | null | null | — | — |
| q31 Renovación del alquiler | +2 Matute (9-nov) | +2 (se conserva) | — | — |
| q04 Patrimonio permanente | null | **+1** programa | 14 | nueva |
| q05 IRPF de dos tipos | null | null | — | — |
| q06 Jornada de 37,5 h | +1 Aizpurua (16-sep) | +1 programa | 6 | fuente |
| q32 SMI autonómico | +1 nota EH Bildu-LAB (12-nov) | **+2** programa | 6 | valor |
| q08 Jubilación a los 65 | null | null | — | — |
| q09 Prohibir pagar a la privada | null | **+1** programa | 11 | nueva |
| q11 Retirar la concertada | null | null | — | — |
| q12 Castellano en las aulas | null | null | — | — |
| q13 Prioridad en vivienda social | null | **−1** programa | 20 | nueva |
| q15 Otra regularización | null | null | — | — |
| q33 Reparto de menores | −1 Iñarritu (16-sep) | −1 (se conserva) | — | — |
| q16 Referéndum pactado | +1 nota EH Bildu-ERC (16-sep) | +1 programa | 24 | fuente |
| q17 Concierto para quien lo pida | null | null | — | — |
| q18 Asumir 83.000 M de deuda | null | null | — | — |
| q19 Eólica marina | null | null | — | — |
| q36 Alargar las nucleares | −2 Otero (9-sep) | **−1** programa | 15 | valor |
| q21 Aborto en la Constitución | null | null | — | — |
| q22 Suprimir Igualdad | null | null | — | — |
| q23 Desalojo en 48 h | −1 Matute (19-may) | −1 (se conserva) | — | — |
| q24 Derogar la ley mordaza | +1 Matute (7-nov) | +1 programa | 22 | fuente |
| q35 Ampliar la prisión permanente | −2 Iñarritu (17-mar) | −2 (se conserva) | — | — |
| q25 Indultos por corrupción | null | null | — | — |
| q26 Defensa al 3,5 % | −2 Iñarritu (21-abr) | −2 programa | 28 | fuente |
| q27 Ejército en Ceuta | −1 Iñarritu (16-sep) | −1 (se conserva) | — | — |
| q34 Referéndum en el Sáhara | +2 Iñarritu (10-dic-2025) | +2 programa | 29 | fuente |
| q29 Frenar Mercosur | +1 Goñi (17-feb) | +1 (se conserva) | — | — |
| q30 Precio máximo de alimentos | +1 Matute (18-mar) | +1 (se conserva) | — | — |

Resumen: 11 celdas en g16. 4 nuevas (q01, q04, q09, q13), 2 cambios de valor (q32 sube, q36 baja) y 5 solo de fuente
(q06, q16, q24, q26, q34). Cobertura de EH Bildu: 14 → 18 posiciones conocidas.

## Valores: razonamiento

- **q01 (null → +1).** Financiación estatal para los ayuntamientos que declaren zonas tensionadas «asociados a la
  declaración y regulación del alquiler» y un máximo estructural del 2 % a la actualización anual de la renta cuando
  el IPC lo supere (p. 5). Apoya regular el precio, pero no un precio máximo estatal en toda España: el 2 % limita la
  subida anual, no el precio, y las zonas siguen dependiendo de que se declaren. +1, como Compromís y el PSOE. Ver duda 1.
- **q04 (null → +1).** «Aumentar el peso impositivo del impuesto a la banca y las grandes fortunas» (p. 14). Subirlo
  supone mantenerlo, pero no dice que sea permanente (sí lo dice, en la medida anterior, del impuesto a las
  energéticas). +1, como Unidad del Pueblo Canario; ERC y el BNG (+2) piden expresamente la permanencia. Ver duda 2.
- **q06 (+1, cambia la fuente).** 32 horas o cuatro días sin rebaja salarial por reforma del Estatuto de los
  Trabajadores, con 35 horas como primer paso en las pymes (p. 6). Va más allá de las 37,5 h: +1, como Compromís,
  Adelante Andalucía y Ara Més. Sustituye a Aizpurua, que pedía «recuperar la reducción de la jornada» sin cifra.
- **q32 (+1 → +2).** «Modificación del Estatuto de los Trabajadores para que las CCAA puedan establecer su propio SMI
  [...] constituyendo el SMI fijado por el estado el mínimo legal indisponible» (p. 6). Es la afirmación: competencia
  de cada comunidad y el estatal como suelo. Como el PNV, el BNG y ERC. Resuelve lo que faltaba en la nota con LAB.
- **q09 (null → +1).** Derogar la Ley 15/1997, que permite «la privatización y externalización de los servicios
  sanitarios» (p. 11). No prohíbe pagar a centros privados: +1, como el Frente Amplio y Compromís.
- **q13 (null → −1).** «Eliminación de barreras para acceder a la sanidad, educación, vivienda y protección social,
  independientemente de la situación administrativa» (p. 20), junto a sancionar el racismo «inmobiliario». Incompatible
  con dar prioridad a los españoles en la vivienda social, pero sin nombrarla: −1 indirecto, como el PSOE, Podemos,
  Compromís, Ara Més y el Frente Amplio. Ver duda 3.
- **q16 (+1, cambia la fuente).** Reconocer «el derecho a decidir del pueblo vasco» como mecanismo para la «solución
  política y democrática» del conflicto con el Estado y respetar los nuevos estatus que se acuerden y que refrende la
  sociedad vasca (pp. 23-24). Propuesta propia para el caso vasco, más directa que la nota con ERC, que celebraba
  referendos en Gales, Escocia e Irlanda. Sin nombrar la independencia ni un referéndum pactado: +1, como el Frente
  Amplio.
- **q24 (+1, cambia la fuente).** «Acabar con la Ley Mordaza» volviendo a presentar la proposición de ley de reforma
  pactada hace dos años, que suprime los artículos «contrarios a la libertad de expresión» (p. 22). Es una reforma, no
  la derogación completa de la afirmación: +1, el mismo valor que Matute, que ya dejaba abierta una derogación parcial.
- **q26 (−2, cambia la fuente).** «Rechazaremos el aumento del gasto en defensa que la OTAN está exigiendo» (p. 28), y
  rechazo de la OTAN (3.2.4). Rechazo expreso: −2.
- **q34 (+2, cambia la fuente).** Apartado propio (3.2.8): revertir el cambio de posición del Gobierno de 2022 sobre el
  Sáhara, recuperar el apoyo al derecho de autodeterminación saharaui y rechazar la ocupación marroquí (p. 29). Igual
  de directo que Iñarritu (+2, verificado), que tampoco nombraba el referéndum. Ver duda 4.
- **q36 (−2 → −1).** «Calendario nuclear: Apostaremos por mantener el calendario de cierre nuclear definido en el
  PNIEC» (p. 15). Se opone a alargar las centrales, pero no rechaza expresamente las prórrogas ni menciona la de Almaraz:
  −1, mismo criterio que el PSOE («Mantener el calendario de cierre [...] hasta 2035»). Compromís y el Frente Amplio
  (−2) rechazan las prórrogas de forma expresa. Ver duda 5.

## Se conservan las posiciones vigentes

- **q31 (+2, Matute, 9-nov).** La primera medida de vivienda pide «contratos de arrendamiento ordinarios con prórroga
  automática» (p. 5), sin plazo. Matute anunció como primera iniciativa «recuperar la prórroga automática» del decreto
  de renovaciones por cinco o siete años: es más concreto y el programa no lo contradice. Ver duda 6.
- **q30 (+1, Matute, 18-mar).** El programa propone límites temporales a los precios de la electricidad, el gas, los
  combustibles, el transporte «y determinados productos básicos» en situaciones de emergencia (p. 8) y controles
  obligatorios de precios y márgenes de las grandes distribuidoras (p. 9). Matute pedía expresamente «que limite el
  precio de los alimentos básicos»: es más directo sobre los alimentos y el programa no lo contradice (también lo
  plantea para emergencias).
- **q23 (−1, Matute, 19-may).** La prohibición estructural de desahucios de personas vulnerables sin alternativa (p. 5)
  es otra medida; el programa no habla de la ocupación ni de plazos de desalojo.
- **q27 (−1, Iñarritu, 16-sep).** El programa rechaza las devoluciones sumarias y la externalización de fronteras
  (p. 20), pero no habla del Ejército ni de Ceuta.
- **q29 (+1, Goñi, 17-feb).** El programa no menciona Mercosur ni los acuerdos comerciales (solo la PAC y la cadena
  alimentaria, pp. 16-17).
- **q33 (−1, Iñarritu, 16-sep).** El programa pide transferir las competencias de migración para un «modelo vasco de
  acogida propio» (p. 20) y el interés superior de la infancia, pero no trata el reparto de menores entre comunidades.
- **q35 (−2, Iñarritu, 17-mar).** El programa pide aplicar la legislación penitenciaria ordinaria a todos los presos
  (p. 27), pero no menciona la prisión permanente revisable.

## Siguen en null

- **q03.** Solo IVA del 21 % a los pisos turísticos (pp. 6 y 14); nada sobre la compra de primera vivienda.
- **q05.** No trata el IRPF.
- **q08.** «Rechazando cualquier intento de [...] aumento de la edad de jubilación» y culminar la ley de pensión sin
  penalización con 40 años cotizados (pp. 7-8). No pide volver a los 65: rechazar subidas futuras y la jubilación
  anticipada sin recorte para carreras largas son medidas distintas (mismo criterio que ERC). Ver duda 7.
- **q11.** El apartado de educación (pp. 11-12) no habla de la concertada.
- **q12.** «Un sistema educativo propio para Euskal Herria, de calidad, inclusivo, coeducativo, participativo, laiko,
  euskaldun y soberano» (p. 11): declaración de principios, sin hablar de la lengua de las clases ni de porcentajes.
  Ver duda 8.
- **q15.** «Garantizar una regularización efectiva, accesible y estable» y facilitar las autorizaciones (p. 20). Una vía
  estable no es otra regularización extraordinaria: mismo criterio que el Frente Amplio, Compromís, el BNG y ERC (null).
- **q17.** Defiende y quiere ampliar el Concierto vasco y el Convenio navarro (p. 24), sin hablar de extenderlo a otras
  comunidades (mismo criterio que UPN, que se quitó del origen por eso).
- **q18.** No habla de la deuda autonómica; derogar la reforma del artículo 135 (p. 14) es otra medida.
- **q19.** Solo despliegue renovable en general (p. 15).
- **q21.** «Blindar el derecho al aborto» con «todas las medidas necesarias para garantizar el acceso libre, seguro,
  confidencial y digno» (p. 19). No menciona la Constitución, y las medidas que concreta son de acceso. Ver duda 9.
- **q22.** El apartado de feminismo (p. 19) no menciona el Ministerio de Igualdad.
- **q25.** No habla de indultos.

## Dudas para el verificador y el editor

1. **q01 +1.** El límite del 2 % a la actualización anual es estatal y estructural, pero limita la subida, no el precio;
   y la regulación por zonas sigue dependiendo de que se declaren (aquí, por los ayuntamientos). Se trató como
   Compromís y el PSOE (+1). Alternativa: null, si se considera una medida distinta del precio máximo.
2. **q04 +1.** «Impuesto a la banca y las grandes fortunas» puede leerse como dos impuestos. Se entendió que incluye el
   de grandes fortunas (la introducción, p. 4, habla de ese impuesto concertado con las haciendas forales). Alternativa:
   +2, si subirlo se lee como hacerlo permanente (criterio de Compromís, «mantindrem i ampliarem»); el programa, en
   cambio, sí dice «permanente» del impuesto a las energéticas y no de este.
3. **q13 −1.** Es una medida de acceso sin barreras para los extranjeros, no un rechazo expreso de la prioridad
   nacional. Compromís quedó con la posición de Micó y no con su «accés universal a l'atenció sanitària [...] sense
   discriminacions per origen» porque hablaba de sanidad; aquí se nombra la vivienda. Alternativa: null.
4. **q34 +2 sin nombrar el referéndum.** Compromís tuvo +1 con Micó (autodeterminación sin referéndum) hasta que su
   programa lo pidió. Aquí se mantiene el +2 de Iñarritu, verificado, porque además de la autodeterminación pide revertir
   la posición de 2022 (el apoyo al plan de autonomía). Alternativa: +1.
5. **q36 baja de −2 a −1.** El programa va primero también cuando rebaja el valor (g14, q30). «Mantener el calendario
   definido en el PNIEC» implica, en rigor, cerrar Almaraz en 2027-2028 y no en 2030, pero no lo dice. Alternativa:
   conservar −2 (Otero), si se considera que el programa es menos directo que una intervención contra la prórroga de
   Almaraz; ya se había marcado como dudosa por ser en parte adhesión a otro orador.
6. **q31: se conserva Matute.** Si se prefiere que el programa vaya primero también aquí (prórroga automática, primera
   medida de vivienda), el valor sería +2 igualmente: solo cambiaría la fuente.
7. **q08 null.** Alternativa: +1, si rechazar el aumento de la edad y jubilarse sin recorte con 40 años cotizados se
   leen como la misma dirección con otra medida (como Adelante Andalucía con los 64 años, aunque esa era la edad
   ordinaria para todos).
8. **q12 null.** Alternativa: +1, si «euskaldun y soberano» se lee como que la comunidad decide la lengua de las clases
   (BNG y Frente Amplio, +1 por la lengua propia como vehicular). El texto no habla de lengua vehicular.
9. **q21 null.** «Blindar el derecho al aborto» se usa a menudo para la reforma constitucional (Sánchez en el PSC lo dijo
   «en la Constitución»), pero el programa no la menciona. Alternativa: +1.

## Comprobación del build

En una copia del repositorio (`scratchpad/g1516_check`), `python3 -I pipeline/build_fase1.py` no da errores:

- sin `verificacion_g16.json` omite g16 («omitido, sin verificación aprobada») y `fase1.json` sale idéntico al del
  repositorio;
- con un `verificacion_g16.json` provisional (`"aprobado": true`, solo en la copia; también con g15) aplica g16 después
  de g15: EH Bildu pasa de 14 a 18 posiciones; ningún otro partido cambia por g16.

En el repositorio no se ha creado `verificacion_g16.json`: la verificación la hará otra persona.

## Verificación

Verificación independiente del 17-nov en `verificacion_g16.json` (aprobado). Se leyeron enteras las páginas 4-29 del PDF
(`pdftotext -layout -f N -l N`). Las 11 citas son literales, están en su página y tienen 60 palabras o menos. Las 11
`sustituye` coinciden con la celda vigente en `fase1.json`. Se contrastó con una lectura independiente del mismo
programa, que coincide en todo salvo en q36 (proponía −2) y en dejar q12 como dudosa. Resultado: 11 celdas ok, ninguna
corregida de valor y ninguna rechazada.

- **Nota de q09 corregida aquí, en `codificacion_g16.json`.** Decía «mismo criterio que el Frente Amplio y Compromís
  (derogar la Ley 15/1997)». Compromís no deroga esa ley: revierte las concesiones privatizadas. Ahora la nota los
  distingue. El valor no cambia.
- **Dudas resueltas como propone el codificador.**
  - q01: +1. Limitar la subida de la renta ya cuenta como a favor, como la congelación del PSOE.
  - q04: +1. Solo usa «permanente» para el impuesto a las energéticas, no para este.
  - q13: −1. Nombra la vivienda y pide el acceso sin barreras sea cual sea la situación administrativa.
  - q34: +2. Revertir la posición de 2022, el mismo listón que el BNG y ERC.
  - q36: −1. «Mantener el calendario de cierre» es el mismo texto y el mismo listón que el PSOE y el PSC. Los −2
    rechazan las prórrogas de forma expresa. El programa es posterior a Otero.
  - q31: se conserva Matute.
  - q08, q12 y q21: siguen en null. No piden volver a los 65, no hablan de la lengua de las clases y no mencionan la
    Constitución.
- **Recuento final.** EH Bildu: 14 → 18 posiciones. 2 cambios de valor (q32 sube, q36 baja), 4 nuevas (q01, q04, q09 y
  q13) y 5 solo de fuente (q06, q16, q24, q26 y q34).
- **Pendiente para el editor** (en «dudas»): q36 (alternativa −2), q01 (alternativa null), q04 (alternativa +2) y q12
  (alternativa +1).
