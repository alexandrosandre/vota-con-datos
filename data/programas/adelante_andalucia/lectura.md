# Adelante Andalucía — Registro de lectura del programa (Fase 3, paso A)

- Programa: «Un programa para frenar a las derechas. Programa electoral Generales 29N», Adelante Andalucía, presentado el 10-nov-2026 (la contraportada dice «Versión del 2026-11-10»). Enlazado desde el menú «Programa» de adelanteandalucia.org (programa.adelanteandalucia.org, «Programa completo (PDF)»).
- Fichero: `data/sources/programas/adelante_andalucia/programa-29n-adelante-andalucia.txt` (extracción del PDF, SHA-256 `fde1fe024f94a698e2110c0e25cc569b4d9f3f7272342bdb13dc0c1e7a2d7b43`), 134 páginas, en castellano.
- Método: el texto se dividió por saltos de página (`\f`); página N = N-ésimo bloque, que coincide con el número impreso en el pie. El bloque 135 está vacío (salto final). Se leyó **íntegramente, página a página**, en bloques consecutivos: pp. 1-38, 39-59, 60-83, 84-108, 108-134. No se omitió ninguna página (las pp. 34, 70, 102, 112 y 122 están en blanco).
- Extracción: `pdftotext` sin `-layout`. Con `-layout` la maquetación a dos columnas intercala las columnas línea a línea y rompería casi todas las citas; en modo de lectura (el PDF está etiquetado, generado con Typst) los párrafos quedan enteros, aunque el orden de los bloques dentro de cada página no siempre sigue la numeración. En unas 60 propuestas el texto cambia de columna a mitad de frase y la cita usa «[...]» para saltar el fragmento intercalado.
- Numeración: el programa numera 719 propuestas en 12 áreas. Número, título y texto de cada propuesta se cotejaron con la versión web (programa.adelanteandalucia.org, páginas de cada área) y cada texto se localizó literalmente en el PDF.
- Fecha de lectura: 2026-11-12.

## Páginas leídas y resumen por sección

| Páginas | Sección | Resumen (una línea) |
|---|---|---|
| 1 | Portada | «Un programa para frenar a las derechas»: primero las 29 medidas principales, después el desarrollo por áreas y al final las reclamaciones por provincia. |
| 2-32 | Las 29 del 29N | Una página por medida principal, cada una con remisión a las propuestas numeradas que la desarrollan (la 9, supermercados públicos, dice no tener aún desarrollo). |
| 33 | Índice | Doce áreas con su página. |
| 35-56 | Área 1. Servicios públicos (231 propuestas) | Sanidad (suelo del 8 % del PIB, derogar la Ley 15/1997, fin de conciertos, tiempos máximos, salud mental, aborto), educación (5 % del PIB, red única pública y laica, ratios), universidad y ciencia, vivienda (alquiler al 20 %, zonas tensionadas automáticas, parque público al 9 %), cuidados, servicios sociales, pensiones (IPC, mínimas = SMI neto, jubilación a los 64) y empleo público. |
| 57-69 | Área 2. Economía y empleo (105) | IRPF más progresivo, impuesto sobre la riqueza y la tierra, impuestos permanentes a banca y energéticas, banca pública, reindustrialización, jornada de 32 horas, salarios indexados, despido más caro, renta básica, autónomos, supermercados públicos, topes temporales de precios, PAC. |
| 71-76 | Área 3. Andalucía en el Estado (37) | Financiación sin ordinalidad, condonación de la deuda por infrafinanciación, deuda histórica, traspasos (Cercanías, Guadalquivir, policía autonómica, inspección de trabajo), inversión según población, financiación local. |
| 77-80 | Área 4. Movilidad e infraestructuras (23) | Tren en todas las localidades de más de 20.000 habitantes en diez años, prioridad al tren convencional, desprivatización ferroviaria, administradora andaluza, abonos únicos. |
| 81-88 | Área 5. Bienes comunes (56) | Ley de emergencia climática, empresa pública de energía, salida del gas en 2030, renovables planificadas, agua pública, Doñana, litoral, mundo rural. |
| 89-96 | Área 6. Instituciones limpias y libertades (55) | Sueldo previo para los cargos, fin de aforamientos y pagas vitalicias, autoridad anticorrupción, sin indultos por corrupción, CGPJ por elección directa, derogar la ley mordaza y la prisión permanente revisable, medios, Estado laico. |
| 97-101 | Área 7. Feminismos (26) | Pacto de Estado con presupuesto, violencia vicaria, permisos iguales al 100 %, ley de menopausia. |
| 103-104 | Área 8. LGTBIQA+ (13) | Desarrollo de las leyes trans y LGTBI, plan contra la LGTBIfobia, empleo trans, terapias de conversión como delito. |
| 105-111 | Área 9. Derechos humanos, migraciones, memoria, paz y pueblo gitano (48) | Derogar la Ley de Extranjería, regularización extraordinaria, cierre de los CIE, memoria democrática, no al rearme y referéndum sobre la OTAN, embargo de armas a Israel, Sáhara, pueblo gitano. |
| 113-118 | Área 10. Cultura, hablas andaluzas, derechos digitales y deporte (27) | Estatuto del artista, hablas andaluzas, software libre y nube pública, selecciones deportivas andaluzas, flamenco. |
| 119-121 | Área 11. Derechos de los animales (16) | Ley de bienestar animal sin excepciones, transición hasta la abolición de la tauromaquia, caza. |
| 123-133 | Área 12. Reclamaciones territoriales por provincia (82) | Obras y medidas estatales por provincia (Almería, Cádiz, Campo de Gibraltar, Córdoba, Granada, Huelva, Jaén, Málaga, Sevilla), sobre todo ferrocarril y carreteras. |
| 134 | Contraportada | Web del programa y «Versión del 2026-11-10». |

## Observaciones de lectura (hechos del propio documento)

- El documento no tiene memoria económica ni tabla de financiación. La única indicación de cómo se paga una medida es la renta básica, «financiada con la reforma fiscal» (propuesta 298, p. 66).
- Incoherencias internas:
  - La medida principal 1 promete «Ningún alquiler por encima del 20 % del salario» (p. 4) y la sección 1.4 «Ningún hogar pagará más del 20 % de sus ingresos» (p. 49), pero la propuesta 161 fija el tope en «el 20 % de la renta media de la zona» (p. 49).
  - La p. 101 remite el aborto en la sanidad pública y en la Constitución y la anticoncepción y los productos menstruales a «las Propuestas 49 a 51», pero son las 47, 48 y 49 (las 50 y 51 son test de embarazo e infecciones de transmisión sexual).
  - La medida principal 9 (supermercados públicos, p. 12) dice «todavía no hay propuestas del programa que la desarrollen», aunque la propuesta 313 es una «Red de supermercados públicos» (p. 68).
- Se excluyen como medidas 4 enunciados sin medida identificable: 46 «Salud mental comunitaria» (enfoque), 345 «Andalucía, nacionalidad histórica» y 346 «Hacia un modelo confederal» (posiciones de principio) y 371 «Andalucía de comarcas» (modelo sin medida).

## Resultado

- `extraccion.json`: índice (70 entradas: portada, las 29, índice, 12 áreas con sus secciones y contraportada), 715 propuestas con cita literal y página (719 numeradas menos las 4 excluidas), 116 de ellas cuantificadas, y 12 prioridades justificadas con el propio documento.
- Criterio de las prioridades: el programa presenta como centrales «Las 29 del 29N» (pp. 2-32), sin orden de importancia declarado. Se seleccionan las medidas principales cuya medida concreta anuncia también, como propuesta, la introducción de su área (pp. 35, 57, 71, 77, 81, 89 y 97): son 13 (medidas 1, 3, 4, 6, 7, 11, 18, 19, 20, 21, 23, 24 y 26), y se descarta la 21 («Andalucía, nacionalidad histórica»), que no contiene una medida identificable (su propuesta 345 se excluye como medida). No cuentan: la 2 (la introducción del área 4 cita Adamuz y Urda como diagnóstico, no la desprivatización), la 22 (el área 5 anuncia «el agua como derecho», que es la propuesta 414, no las leyes del agua y de Doñana) y la 25 (el área 9 repite solo el lema «derechos para todas las personas», sin la medida). De cada medida se toma la propuesta numerada que repite la introducción del área o que da título a la medida.
- Las citas se comprueban con `python3 -I pipeline/verify_quotes.py adelante_andalucia`.
