# Reatribución de posiciones del paso 1 (13 de noviembre de 2026)

Decisión del editor: los pasos 1 y 2 tratan de **partidos**; el paso 3, de **papeletas**. Una coalición electoral regional es la forma en que algunos partidos aparecen en la papeleta de una provincia, no un partido con programa propio. Cinco entradas pasan a describir un partido:

| id (sin cambios) | Antes (coalición) | Ahora (partido) |
|---|---|---|
| `upn` | UPN-PP | Unión del Pueblo Navarro (UPN) |
| `upc` | Unidad del Pueblo Canario (NC-BC, Podemos, IU, Sumar) | Nueva Canarias-Bloque Canarista (NC-BC) |
| `ara_mes_fa` | Ara Més-Front Ampli | Ara Més |
| `compromis` | Compromís: Front Valencià | Compromís |
| `cc` | Coalición Canaria-Municipalistas Primero Canarias | Coalición Canaria |

Los ids no cambian (ver «Ids» al final).

## Regla aplicada

Cada posición se atribuye por **quién la dice**: un líder de NC-BC cuenta para NC-BC, uno de Podemos para Podemos, uno de IU/Sumar/EUPV para Frente Amplio, etc. Un documento conjunto de la coalición se mantiene solo en la entrada que es miembro de la coalición y es su partido sustituto; no se copia a los demás socios. Nunca se sobrescribe una posición propia del partido de destino.

## Herencia UPN-PP → PP, retirada

`pipeline/build_fase1.py` ya no tiene `HEREDA`. UPN tomaba la posición del PP en las afirmaciones de alcance estatal: eran **12 posiciones heredadas**, ninguna propia. Ahora UPN solo tiene lo que dice UPN: **0 posiciones conocidas** (sus 30 celdas de `codificacion_g1.json` son nulas: no hay programa UPN-PP publicado y las notas de upn.org y las declaraciones de Leticia San Martín no tratan las afirmaciones). Se retiran también la etiqueta «· PP» de `web/src/pages/Coincide.tsx`, el campo `heredada_de` de `web/src/types.ts` y la frase de `web/src/pages/Metodologia.tsx`.

## Posiciones revisadas, una a una

Ninguna posición se mueve a otra entrada. Se retira una (Ara Més q30, ver abajo); las demás valoradas de estas cinco entradas las dice el propio partido o un documento conjunto de su coalición. A las de documentos conjuntos se les añade una nota «[Reatribución 13-nov…]» en `codificacion_g2.json`.

### `upc` → NC-BC: 5 se mantienen (todas de documento conjunto)

| Afirmación | Valor | Fuente | Decisión |
|---|---|---|---|
| q01 | +1 | Manifiesto electoral de UPC (3-nov), p. 3 | Se mantiene: documento conjunto que firma NC-BC. |
| q04 | +1 | Manifiesto, p. 4 | Igual. |
| q09 | +1 | Manifiesto, p. 3 | Igual. |
| q33 | −1 | Manifiesto, p. 4-5 | Igual. |
| q34 | +1 | Manifiesto, p. 5 | Igual. |

Nota: el Manifiesto lo firman NC-BC, Podemos, IU Canaria y Movimiento Sumar. Por la regla del editor solo cuenta para NC-BC (miembro y partido sustituto de la entrada); **no** se copia a Podemos ni a Frente Amplio.

### `ara_mes_fa` → Ara Més: 2 se mantienen, 1 retirada

| Afirmación | Valor | Fuente | Decisión |
|---|---|---|---|
| q01 | +1 | Nota oficial de Ara Més-Front Ampli (6-nov), con declaraciones de Carme Gomila | Se mantiene: documento de la coalición, cuyo partido principal es Ara Més. |
| q30 | +2 | Carme Gomila en el mitin de Palma (Demócrata, 8-nov) | **Retirada** (queda «sin posición conocida»): la dice Gomila, de ERC. |
| q32 | +1 | Nota oficial de Ara Més-Front Ampli (10-nov) | Se mantiene: documento de la coalición. |

**Carme Gomila (decisión del editor, 13-nov).** Es la cabeza de lista de Ara Més-Front Ampli, pero es de ERC. Fuentes de la afiliación: Ara Balears (`data/boe/afiliaciones_g1.json`, https://en.arabalears.cat/politics/carme-gomila-leaves-the-manacor-city-council-to-seek-new-professional-challenges_1_5623156.html: nueva presidenta de ERC en las Illes Balears) y El Nacional, 12-nov (`data/sources/compromisos/erc/elnacional_tarragona_20261112.txt`: «presidenta d'Esquerra Republicana a Mallorca»). Ara Més es la federación de MÉS per Mallorca, Més per Menorca y Ara Eivissa, sin ERC. Ante la duda, no se atribuye: lo que dice en primera persona no cuenta para Ara Més. Las notas oficiales de la coalición (q01, q32) sí, aunque las presente ella, porque hablan en nombre de la coalición que encabeza Ara Més. Ara Més queda con **2 posiciones conocidas** (antes 3).

### `compromis` → Compromís: 10 se mantienen

q01, q13, q18, q21, q30 (Àgueda Micó, elDiario.es y Alicante Plaza), q22, q23, q24, q34 (Àgueda Micó en el Congreso), todas de Micó, de Més-Compromís: se mantienen. q31 (web electoral de la coalición, frontvalencia.org): se mantiene como documento de la coalición, cuyo partido principal es Compromís.

### `cc` → Coalición Canaria: 4 se mantienen

q19, q33, q34 (programa conjunto CC-Municipalistas Primero Canarias, publicado por Coalición Canaria) y q31 (Cristina Valido, portavoz de CC en el Congreso): se mantienen.

### `upn` → UPN

Sin posiciones propias (ver arriba).

## Conflictos con posiciones del partido de destino

Ninguno: no se ha movido ninguna posición a otra entrada.

## Candidatas para más adelante

- **ERC** (no se mueve): q30, +2. Carme Gomila, mitin de Palma, 8-nov (Demócrata, https://www.democrata.es/ca/politica/ampliacio-ada-colau-adverteix-que-al-psoe-li-falten-forces-per-plantar-cara-a-les-elits/): «Feijóo, Abascal, Prohens, feu-vos a la idea que apujarem el salari mínim, […] i limitarem els preus dels aliments bàsics». Fuentes de la afiliación: Ara Balears (`data/boe/afiliaciones_g1.json`, https://en.arabalears.cat/politics/carme-gomila-leaves-the-manacor-city-council-to-seek-new-professional-challenges_1_5623156.html: nueva presidenta de ERC en las Illes Balears) y El Nacional, 12-nov (`data/sources/compromisos/erc/elnacional_tarragona_20261112.txt`: «presidenta d'Esquerra Republicana a Mallorca»). Ara Més es la federación de MÉS per Mallorca, Més per Menorca y Ara Eivissa, sin ERC.

## Ids

Se mantienen `upn`, `upc`, `ara_mes_fa`, `compromis` y `cc`. Son claves internas: las usan el estado guardado en el navegador (`vcd-estado-v1`: afinidades, orden de preferencia, partido elegido), los enlaces compartidos (`#/contrasta/upc`, `?partido=upc`), las carpetas de datos y la correspondencia con las encuestas. En el paso 3 cada id sigue llevando a la misma papeleta, así que lo guardado por cada persona sigue significando lo mismo y no hace falta migración. Lo que ve la persona (nombre y siglas) sí cambia.
