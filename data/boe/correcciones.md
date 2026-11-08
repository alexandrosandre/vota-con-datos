# Correcciones y recursos — candidaturas al Congreso, elecciones generales 29-XI-2026

Estado a 8 de noviembre de 2026 (revisión hecha el domingo 8; ese día no hay BOE).

## Qué se ha revisado

| Fuente | Alcance | Fichero bruto |
|---|---|---|
| Sumarios del BOE (API de datos abiertos) | 6-X, 23–24-X, 26–31-X, 2–7-XI-2026 (el 1-XI y el 8-XI son domingo, sin edición: la API devuelve 404) | `data/sources/boe/sumario_*.json` |
| Web de la Junta Electoral Central, página «Elecciones generales 2026 · Candidaturas» | copia del 8-XI-2026 | `data/sources/boe/jec_eg2026_candidaturas_20261108.html` |
| Calendario electoral oficial de la JEC | plazos de los recursos | `data/sources/boe/jec_eg2026_calendario.pdf` |

Los sumarios se filtraron por título y por sección (Juntas Electorales Provinciales, Junta Electoral Central, Tribunal Constitucional) con las palabras electoral, candidatura, proclamación, amparo y sentencia.

## 1. RD 806/2026 (escaños por circunscripción) — sin corrección

En el XML de BOE-A-2026-20742, `analisis/referencias/posteriores` está vacío, así que el BOE no le asocia ninguna corrección de errores ni modificación. El atributo `fecha_actualizacion="20261029…"` es una fecha de mantenimiento del XML, no una corrección.

## 2. Corrección de errores publicada en el BOE — aplicada

**BOE-A-2026-23383**, BOE núm. 278 de 7-XI-2026, págs. 150682–150688.
https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23383

`pipeline/boe_parse.py` la aplica por programa como sustitución literal: busca el texto de «Donde dice» dentro del bloque de la candidatura correspondiente en BOE-A-2026-23103 y lo cambia por «Debe decir». El script falla si el texto aparece más de una vez. El registro completo, con los textos literales, está en `candidaturas_congreso.json → meta.correcciones_aplicadas`.

Correcciones que afectan al **Congreso** (las del Senado se registran, pero quedan fuera de alcance):

| INE | Circunscripción | Candidatura (orden) | Efecto en nuestros campos |
|---|---|---|---|
| 22 | Huesca | 5 SALF | Corrige el nombre del titular n.º 2. No cambia cabeza ni n.º de titulares |
| 26 | La Rioja | 5 PCTE | **Lista de titulares sustituida.** La publicación original tenía 1 titular; la corregida, 4. Cambia la **cabeza de lista**. Tras la corrección, n_titulares = 4 = escaños |
| 31 | Navarra | 1 | **Encabezado corregido**: de «EUSKAL HERRIA BILDU-ESQUERRA REPUBLICANA DE CATALUNYA (EH BILDU-ERC)» a «EUSKAL HERRIA BILDU (EH BILDU)». Cambian la denominación y las **siglas** |
| 31 | Navarra | 8 SALF | Corrige el nombre del titular n.º 2 |
| 31 | Navarra | 11 | El encabezado pasa a mayúsculas: «FRENTE AMPLIO-FRONTE ZABALA (FRENTE AMPLIO-FRONTE ZABALA)» |
| 43 | Tarragona | 7 COMUNS-FRONT AMPLI | Corrige el apellido de la **cabeza de lista** y quita el sufijo «(COMUNS-FRONT AMPLI)» de los nombres. Esta corrección trae dos bloques «Donde dice». El primero no aparece literalmente en el original, porque omite el sufijo, y no se aplica. El segundo sí aparece y ya incluye el cambio del primero. El spot-check confirma la cabeza corregida |
| 44 | Teruel | 1 PSOE | Corrige un acento de la **cabeza de lista** (Íniguez → Íñiguez) |
| 46 | Valencia | 3 PCTE | Corrige el nombre del titular n.º 3 |

## 3. Recursos contencioso-electorales (anulación o rehabilitación de candidaturas)

**No hay ningún documento oficial publicado.** Entre el 4 y el 7-XI-2026 el BOE no recoge ninguna resolución, sentencia ni anuncio que anule o rehabilite una candidatura. La página de candidaturas de la JEC (copia del 8-XI) solo enlaza los PDF de candidaturas presentadas y proclamadas, y el de proclamadas es idéntico byte a byte a BOE-A-2026-23103.pdf.

Plazos según el calendario oficial de la JEC (`jec_eg2026_calendario.pdf`):

- recurso contra la proclamación ante el Juzgado de lo Contencioso-Administrativo: del 4 al 5-XI;
- resolución judicial: en los 2 días siguientes;
- **recurso de amparo ante el TC**: en los 2 días siguientes a la resolución judicial, y el TC resuelve en 3 días. Esta vía puede seguir abierta hasta aproximadamente el **12-XI**;
- recurso del art. 44.4 LOREG ante la Sala Especial del Tribunal Supremo: del 13 al 19-XI.

### Pendiente sin verificar (solo fuente de prensa, no se ha cambiado ningún dato)

- **UNIDAD DEL PUEBLO CANARIO UPC (NC-BC, PODEMOS, IU, SUMAR)**: Las Palmas (35), orden 11, y Santa Cruz de Tenerife (38), orden 9. Según Atlántico Hoy del 6-XI-2026 (https://www.atlanticohoy.com/politica/junta-electoral-paraliza-impresion-papeletas-impugnacion-drago-canarias-siglas-upc_1569638_102.html), Drago Canarias presentó un recurso contencioso-electoral contra su proclamación. Según la misma fuente, la Junta Electoral Provincial de Las Palmas habría aplazado la impresión de esas papeletas. No hemos encontrado documento oficial (acuerdo de la JEP, sentencia ni amparo). En los datos la candidatura **sigue como proclamada**, porque así consta en el BOE.

## 4. Otras observaciones (no son correcciones; se dejan tal como publica el BOE)

- **Ceuta (51), orden 4**: el BOE de proclamación publica «PODEMOS (PAZ,CASA Y TRABAJO)», mientras que en las presentadas (BOE-A-2026-22607) figuraba «PODEMOS (PODEMOS)». En **Asturias (33), orden 7**, ocurre al revés: presentada «PODEMOS (PAZ, CASA Y TRABAJO)» y proclamada «PODEMOS (PODEMOS)». Puede ser una errata del BOE; no hay corrección publicada.
- **Sin siglas en el BOE**: La Rioja «6. VOX» y «7. PODEMOS»; Ceuta «6. FRENTE OBRERO». En estos casos, `siglas = null`.
- **División ambigua entre denominación y siglas** (`split_ambiguo = true`): PSC «(PSC-PSOE) (PSC)» en 08, 17, 25 y 43, y UPC «… UPC (NC-BC, PODEMOS, IU, SUMAR)» en 35 y 38. Hay que revisar `encabezado_boe` al cruzar con partidos.
- Las 21 candidaturas marcadas «No proclamada.» en el BOE están en `no_proclamadas` de cada circunscripción.
- Cada candidatura cuyo encabezado proclamado difiere del de la publicación de presentadas lleva el texto anterior en `encabezado_en_presentadas_boe`. Es información de apoyo; manda la proclamación.

## Volver a comprobar

Después del 12-XI, y otra vez después del 19-XI, conviene repetir `python3 -I pipeline/boe_fetch.py sumario <fechas>` y buscar disposiciones de «Juntas Electorales Provinciales» o del «Tribunal Constitucional» (amparo electoral), y revisar de nuevo la página de candidaturas de la JEC.
