# Notas g3 (protocolo v2, 2026-11-09)

- Celdas de programa (ERC 13, BNG 17, CC 1) se mantienen tal como quedaron tras la verificación; build_fase1.py no da errores de g3.
- Única celda de campaña: Junts q17. Se sustituye la fuente (Crónica Global 27-oct, estilo indirecto) por cita textual de Nogueras en ElNacional.cat (8-nov, acto de Vilanova i la Geltrú). Valor 2 sin cambios.
- Junts q15: Eduard Pujol (8-nov) reivindica que Junts «se ha opuesto» a la regularización extraordinaria: estilo indirecto y actuación pasada; null.
- Búsqueda de declaraciones en primera persona para ampliar celdas nulas (Rufián/Junqueras en Badalona 8-nov, Nogueras en Sant Cugat 7-nov y SER 6-nov, notas del PNV 30-oct a 8-nov, ehbildu.eus 5-8 nov, Clavijo/CC): solo mensajes genéricos o medidas distintas de las 30 afirmaciones. Declaraciones anteriores al 6-oct sin referencia a estas elecciones (p. ej. Rufián sobre topar alquileres) descartadas.
- PNV: programa anunciado para hoy 16:00; no publicado en eaj-pnv.eus al revisar (mañana del 9-nov). No se codifica de él hasta que se catalogue.
- EH Bildu: Otxandiano (6-nov) apoya el segundo decreto de vivienda que «regula los precios»; no es un tope legal por zonas (q01) y se refiere a un decreto de esta legislatura: null.
- La búsqueda web apenas indexa noticias de noviembre de 2026; conviene repetir la ampliación al empezar la campaña (13-nov) y cuando Junts, EH Bildu y PNV publiquen programa.

## Recodificación tras la revisión de redacción (9-11-2026)

Se volvieron a decidir todas las celdas de g3 en q01, q02, q03, q04, q06, q09, q15, q17, q25 y q29 frente al texto nuevo (`revision_redaccion_2026-11-09.md`). Las otras 20 afirmaciones no se tocan.

- **Cambios de valor:** BNG q06 2→1 (propone 35 h, no 37,5 h). BNG q09 −2→2 y ERC q09 −1→1 (la afirmación invierte el sentido y ahora recoge la propuesta del BNG). ERC q17 2→1 (medida 23, p. 12: recaudar todos los impuestos y pagar al Estado un porcentaje, «en la línia d’un concert econòmic solidari»; no habla de regular todos los impuestos ni de un cupo anual). Se cambia la cita a la medida 23.
- **Se mantienen, con nota revisada:** ERC q03 1, q04 2, q06 2, q29 2. BNG q01 2, q02 1, q04 2, q15 1, q17 2, q29 2. Junts q17 2.
- **Siguen siendo null:** CC q03 (incentivos sin concretar; en Canarias rige el IGIC, no el IVA), CC en las demás, ERC q01/q02/q15/q25, BNG q03/q25. También Junts (salvo q17), EH Bildu y PNV. El programa del PNV sigue sin catalogar en `partidos.json` (`no_publicado`), así que no se codifica de él. Las búsquedas web del 9-nov (Nogueras, Matute, Vaquero, Rufián) no devolvieron declaraciones en primera persona de esta campaña.
- **Dudosas:** ERC q09 (solo dice «frenar la privatització» y habla de «gestió pública»; no propone prohibir los conciertos). ERC q03 (rebaja sin cuantificar, para la vivienda habitual y sin límite de edad). BNG q02 (medidas de expropiación más acotadas). BNG q15 (regularización genérica, no «extraordinaria»).
- `build_fase1.py` se ejecuta sin errores.

## PNV: programa publicado (9-11-2026)

El programa del PNV para el 29-N («Defendemos Euskadi», 43 pp.) se publicó y catalogó el 9-nov (`partidos.json`, entrada `pnv`). Se leyó entero y se recodificó la columna PNV de las 30 afirmaciones con su redacción vigente.

- **Resultado: 0 de 30 con valor.** El programa trata vivienda, empleo, pensiones, energía, migración y autogobierno, pero casi siempre como reclamación de competencias o con medidas distintas de las afirmaciones.
- **Medidas relacionadas pero distintas (null):** q08 (fin de la penalización de la jubilación anticipada con más de 40 años cotizados, p. 31), q15 (regularización «prevista en la legislación», p. 25), q21 (perímetros en torno a los centros de IVE, p. 26), q29 (condiciones equivalentes para las importaciones, sin mencionar Mercosur, p. 18), q30 (IVA cero o superreducido para alimentos básicos, p. 21), q03 (medidas genéricas para la primera vivienda de jóvenes, p. 8), q12 (competencias educativas, sin hablar de lengua vehicular, p. 10), q16 (respeto a la «voluntad democrática», sin referéndum, p. 39), q17 (Concierto vasco y Convenio navarro, sin extenderlos a otras comunidades, pp. 38-39).
- **Dudosa: q24 (null).** Pide reformar la «ley mordaza» (p. 27) y modificar la Ley de Seguridad Ciudadana para añadir perímetros en torno a los centros de IVE (p. 26). Es reformar y mantener la ley, no derogarla por completo, pero no rechaza la derogación de forma expresa. ±1 serían defendibles; ante la duda, null.
- **Campaña:** la nota de la presentación del programa (eaj-pnv.eus, 9-nov; Vaquero, Sagastizabal, Urtaran) y las del 30-oct al 8-nov solo contienen mensajes genéricos. La búsqueda web no devolvió declaraciones en primera persona de esta campaña sobre las 30 medidas.
- **Verificación:** el verificador releyó el programa y decidió de nuevo las celdas límite. Coincide en null en todas, sin cambios de valor; `aprobado` sigue en true.

## Revisión de afirmaciones (13-11-2026)

Detalle en `revision_afirmaciones_2026-11-13/` (decisión final en `integracion.md`). Se retiran q02, q07, q10, q14 y q28,
cuyas celdas se conservan como historial, y se añaden q31 a q35, verificadas de forma independiente.

- **ERC:** q31 +1 (grandes tenedores, caso límite), q32 +2 y q34 +2.
- **Junts:**
  - q31: −1 (Cruset, sobre el decreto que entraba en vigor el 15-nov).
  - q32: +1 (nota oficial del 21-oct, encontrada por la verificación).
  - q12: +1 (Nogueras, 19-oct, reactiva).
- **EH Bildu:** q31 +2 y q32 +1.
- **PNV:** q31 −1 (Vaquero, nº 1 por Gipuzkoa), q32 +2 y q35 −2. Son sus primeras posiciones en el cuestionario.
- **BNG:** q31 +2, q32 +2, q34 +2 y q35 −2.
- **CC:**
  - q33: −2.
  - q34: +1 (caso límite, misma vara que UPC).
