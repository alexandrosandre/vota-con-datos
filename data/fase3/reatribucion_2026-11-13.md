# Reatribución de compromisos del paso 2 (13 de noviembre de 2026)

Misma decisión del editor que en `data/fase1/reatribucion_2026-11-13.md`: las entradas `upn`, `upc`, `ara_mes_fa`, `compromis` y `cc` pasan a ser los partidos UPN, NC-BC, Ara Més, Compromís y Coalición Canaria. Cada compromiso seleccionado (`data/programas/<id>/compromisos/seleccion.json`, prioridades) y cada propuesta evaluada se revisa por **quién lo dice**. Si lo dice un líder de otro partido de la coalición, se retira de la selección del partido (sin moverlo al análisis de otro partido) y se apunta aquí como candidato.

## Regla aplicada

Vigente (13-nov-2026, segunda decisión del editor): lo que dice un líder cuenta solo para su partido; los documentos conjuntos de una coalición (manifiesto, acuerdo, nota conjunta, web) cuentan para **cada partido de la web que firma el pacto** (`data/boe/coaliciones.json`; los firmantes del Frente Amplio, para Frente Amplio; ERPV, para ERC). Excepción: lo que dice Pedro Sánchez en actos o documentos del PSC cuenta para el PSC (federado con el PSOE desde 1978, mismo candidato a la Presidencia); Feijóo no cuenta para UPN, porque UPN y el PP son partidos independientes en una coalición electoral. Las selecciones del paso 2 no se han rehecho con la segunda parte de la regla (ver «Documentos conjuntos y prioridades» al final).

Resultado: **2 retiradas, ambas de Ara Més** (ver abajo). En los demás partidos `seleccion.json` y `evaluacion.json` no cambian.

## `upc` → NC-BC: 10 de 10 se mantienen

| Propuesta | Compromiso | Quién | Decisión |
|---|---|---|---|
| upc-01 | upc-c01 | Nota oficial de UPC sobre la propuesta de Luis Campos (secretario general de NC-BC) | Se mantiene: lo dice un líder de NC-BC. |
| upc-03 | upc-c03 | Igual | Se mantiene. |
| upc-08 | upc-c09 | Luis Campos, rueda de prensa del 4-nov (Canarias7), cita literal suya | Se mantiene. |
| upc-02, 04, 05, 06, 07, 09, 10 | upc-c02, c04, c05, c06, c08, c10, c11 | Manifiesto electoral de UPC (documento conjunto) | Se mantienen: documento que firma NC-BC, miembro de la coalición y partido sustituto de la entrada. |

Comprobado también el «veces» de cada compromiso: todas las ocasiones son de Luis Campos o del Manifiesto. La cifra de 1.800 euros de salario mínimo de la misma rueda de prensa es de Iratxe Serrano (Podemos) y **no** está en el análisis (upc-c09 recoge solo la frase de Campos, sin cifra). Se retira de promesas (ver `data/promesas/reatribucion_2026-11-13.md`).

## `ara_mes_fa` → Ara Més: 9 de 11 se mantienen, 2 retiradas

- Se mantienen ara_mes_fa-01 a 05, 07, 08, 10 y 11 (compromisos c01-c06, c09-c11): notas oficiales de Ara Més-Front Ampli, la coalición que encabeza Ara Més, con la cita en voz de la coalición.
- **Retiradas ara_mes_fa-09 (c07, subir el salario mínimo) y ara_mes_fa-06 (c08, topar los precios de los alimentos básicos)**: las dice solo Carme Gomila en primera persona (mitin de Palma, 8-nov; c08 también en Sóller, 7-nov). Decisión del editor (13-nov): Gomila es de ERC y, ante la duda, no se atribuye a Ara Més. Fuentes de la afiliación: Ara Balears (`data/boe/afiliaciones_g1.json`, https://en.arabalears.cat/politics/carme-gomila-leaves-the-manacor-city-council-to-seek-new-professional-challenges_1_5623156.html: nueva presidenta de ERC en las Illes Balears) y El Nacional, 12-nov (`data/sources/compromisos/erc/elnacional_tarragona_20261112.txt`: «presidenta d'Esquerra Republicana a Mallorca»). Ara Més es la federación de MÉS per Mallorca, Més per Menorca y Ara Eivissa, sin ERC.
- Cambios: se quitan de `compromisos` y `prioridades` en `seleccion.json` y pasan a `descartados` con el motivo; se quitan de `evaluacion.json`; `seleccion_sha256` se recalcula; `revision.json` lo anota en `reatribucion_2026-11-13`. Las 9 restantes conservan su id (así siguen valiendo las referencias de `revision.json`); la web las numera por orden, de 1 a 9.
- En el «veces» de c01 cuenta como repetición el mitin de Palma de Gomila; la cita principal de c01 es la nota oficial, así que se mantiene.
- **Candidatos para ERC** (no se mueven): c07 y c08, con las citas de Gomila en Demócrata (8-nov) y Europa Press/Última Hora (7-nov).

## `compromis` → Compromís: 12 de 12 se mantienen

- compromis-01, 03 a 10 (c01, c03, c04, c06-c09, c11, c12): web electoral de la coalición (frontvalencia.org), cuyo partido principal es Compromís. Se mantienen.
- compromis-02, 11, 12 (c02, c13, c14): Àgueda Micó (Més-Compromís). Se mantienen.
- Candidatos para más adelante (no se mueven): en el «veces» de compromis-c01 y compromis-c02 cuenta una rueda de prensa del 4-nov en Madrid que EFE atribuye a María Teresa Pérez, cabeza de lista por Alicante y de Podem. La cita principal de ambos es de Compromís, así que el compromiso se mantiene; esas repeticiones son de un líder de Podemos. En compromis-c01, c03, c06-c10, c12 y c13 cuenta además la presentación de campaña del 10-nov (À Punt), con Micó, Ibáñez y Lara Manyes (EUPV); À Punt atribuye la lista de «principals mesures» a Alberto Ibáñez (Iniciativa del Poble Valencià, de Compromís), no a Manyes.

## `upn` → UPN: 3 de 3 se mantienen

upn-01 a 03: acuerdo de coalición UPN-PP publicado por UPN en upn.org (13-oct). Documento conjunto que firma UPN y publica UPN: se mantienen. No hay ningún compromiso dicho por un líder del PP.

## `cc` → Coalición Canaria: programa y complemento se mantienen

- Las 12 propuestas del programa: «Bases del programa electoral de Coalición Canaria y Municipalistas Primero Canarias», publicado por Coalición Canaria. Documento conjunto que firma CC: se mantiene.
- Complemento cc-c01: Cristina Valido (CC). Se mantiene.
- Teodoro Sosa (cabeza de lista por Las Palmas, de Municipalistas Primero Canarias) no aparece en el análisis. Su promesa del convenio bilateral de vivienda se retira de promesas.

## Revisión posterior (13 de noviembre de 2026): apoyos de otros partidos en lo que se mantiene

Ningún compromiso más se retira y ninguna valoración cambia. Se quitan las ocasiones, justificaciones y fuentes que se apoyaban en personas de otro partido de la coalición:

- **Ara Més.** Fuera las declaraciones en primera persona de Carme Gomila (ERC): el mitin de Palma (8-nov; Demócrata y NacióDigital) sale del «veces» de c01 (de 2 a 1), de las justificaciones de prioridad de c01 y c04 y del criterio de concreción de ara_mes_fa-01 y ara_mes_fa-08. La concreción sigue en «mixta» en las dos: el mitin no añadía instrumento, alcance, cuantía ni plazo, y la nota oficial del 6-nov ya definía la medida sin esos elementos. Las justificaciones de c05, c06, c09 y c10 se apoyan ahora en la nota oficial, no en la comparecencia de la cabeza de lista. En ara_mes_fa-02 y -03 la crónica de mallorca.com se describe como presentación de la coalición. Las citas que quedan son texto de las notas oficiales o crónicas en voz de la coalición; ninguna es primera persona de Gomila (la de c06, «ha anunciat avui la proposta», es narración de la nota oficial con la candidata como sujeto).
- **UPN.** Sergio Sayas es del PP: sale su ocasión del 10-nov del «veces» de upn-c03 (de 2 a 1), la segunda parte de la justificación de prioridad de upn-03 y la frase «Sergio Sayas (10-11-2026) no añadió detalles» de la concreción de upn-03, con su fuente; la valoración («mixta») se basaba en el texto del acuerdo y no cambia. Se reescriben las notas que describían el criterio anterior (los dirigentes del PP contaban si hablaban para la candidatura). Corrige lo dicho arriba: sí había una ocasión de un líder del PP en el «veces» de upn-c03.
- **Compromís.** La rueda de prensa de Madrid del 4-nov (Valencia Plaza/EFE) atribuye la prohibición de compra a fondos buitre y la regulación de los alquileres a María Teresa Pérez (Podem): sale del «veces» de compromis-c01 (de 4 a 3) y c02 (de 3 a 2), de sus justificaciones de prioridad y de la concreción de compromis-01 y -02, con su fuente («mixta» en ambas, sin cambio). Se mantiene en compromis-c14 (comisión de la dana), que EFE atribuye a los tres candidatos, entre ellos Àgueda Micó.

`seleccion_sha256` recalculado en las tres evaluaciones; cada `revision.json` lo anota en `reatribucion_2026-11-13`.

## Documentos conjuntos y prioridades (13 de noviembre de 2026, segunda decisión del editor)

No se rehacen selecciones. Ningún documento conjunto cumple con claridad, para otro firmante, el criterio de prioridad del prompt 1b («que el propio partido lo presente como central»):

- **Podemos** (manifiesto de UPC, web de Compromís: Front Valencià): ya tiene 12 prioridades, que salen de lo que presenta Montero; no consta que Podemos presente como centrales medidas de esos documentos.
- **Frente Amplio** (manifiesto de UPC, notas de Ara Més-Front Ampli, web de Compromís: Front Valencià): 11 prioridades propias; no consta que presente como centrales medidas de esos documentos.
- **ERC** (web de Compromís: Front Valencià): tiene programa y su complemento está vacío; no consta que ERC destaque medidas de la web valenciana.
- **PP** (acuerdo UPN-PP): tiene programa, con 2 de 4 complementos. Los tres puntos del acuerdo no están en su programa (la transitoria cuarta, el Régimen Foral y el Canal de Navarra no aparecen en el texto). El candidato más claro es el bloque de inversiones en Navarra (upn-c03): lo firma el PP en el acuerdo y Sergio Sayas, del PP, aludió al Canal y al TAV en la presentación de campaña del 10-nov. Es una sola alusión de un dirigente del PP en un acto regional; queda para decisión del editor.
- **PNV** (GEROA BAI): no hay ningún documento de la coalición en el análisis.
- **PSC**: se mantienen psc-02 y psc-03 (Sánchez en el acto del PSC en Tarragona); `seleccion.json` y `revision.json` explican ahora la excepción PSC-PSOE, y `seleccion_sha256` se ha recalculado.
