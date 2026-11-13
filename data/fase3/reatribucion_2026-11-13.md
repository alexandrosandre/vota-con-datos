# Reatribución de compromisos del paso 2 (13 de noviembre de 2026)

Misma decisión del editor que en `data/fase1/reatribucion_2026-11-13.md`: las entradas `upn`, `upc`, `ara_mes_fa`, `compromis` y `cc` pasan a ser los partidos UPN, NC-BC, Ara Més, Compromís y Coalición Canaria. Cada compromiso seleccionado (`data/programas/<id>/compromisos/seleccion.json`, prioridades) y cada propuesta evaluada se revisa por **quién lo dice**. Si lo dice un líder de otro partido de la coalición, se retira de la selección del partido (sin moverlo al análisis de otro partido) y se apunta aquí como candidato.

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
