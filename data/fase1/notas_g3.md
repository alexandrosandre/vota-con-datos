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
