# Vox — Registro de lectura del programa (Fase 3, paso A)

- Programa: «Es sentido común. Programa electoral. 29 de noviembre de 2026», Vox, presentado el 12-nov-2026 y descargado de la web de campaña votasentidocomun.es (enlazada desde voxespana.es).
- Fichero: `data/sources/programas/vox/programa-elecct-vox.txt` (extracción con `pdftotext -layout` del PDF catalogado, SHA-256 `77d2158a9a57b812dc75ebf94529501f009114d5f9a3678afd56bb4c97204567`), 55 páginas, en castellano. Se volvió a extraer el texto del PDF el 13-nov y coincide byte a byte con el fichero catalogado.
- Método: el texto se dividió por saltos de página (`\f`); página N = N-ésimo bloque, que coincide con el número impreso al pie de cada página (el bloque 56 es el salto final vacío). Se leyó **íntegramente, página a página**, en dos bloques consecutivos: pp. 1-28 y 28-55. No se omitió ninguna página.
- Páginas sin texto de programa: 4, 6, 12, 15, 18, 22, 27, 31, 34, 38, 43, 47 y 52 (solo el número de página o nada) y 55 (contraportada). Se renderizaron desde el PDF: son fotografías de portadilla de cada bloque. Dos contienen texto dentro de la imagen: la p. 12 (bloque de inmigración) muestra un avión con el rótulo «REMIGRACIÓN» y la p. 15 (bloque de prioridad nacional) una pancarta en la que se lee en parte «PRIORIDAD N…» y «DESREGU…». La p. 1 es la portada («Vota Vox. Programa electoral. Es sentido común») y la p. 55 la contraportada («Vota Vox. Es sentido común», con un código QR que no se ha seguido).
- Estructura: 115 medidas numeradas en 13 bloques, sin introducción, resumen ni presentación; el índice (p. 3) ordena los bloques. Varias medidas tienen viñetas con medidas distintas (1, 2, 8, 43, 94 y 95).
- Maquetación a una columna en páginas de formato A5; las palabras partidas por guion a final de línea se han unido en las citas. Cinco citas que cruzan un salto de página llevan «[...]» en el punto del salto (el texto intermedio es el número de página y la cabecera «ES SENTIDO COMÚN»).
- Fecha de lectura: 2026-11-13.

## Páginas leídas y resumen por sección

| Páginas | Sección | Resumen (una línea) |
|---|---|---|
| 1 | Portada | «Vota Vox. Programa electoral. Es sentido común», elecciones generales 29N. |
| 2 | Portadilla | «Es sentido común. Programa electoral. Vox. 29 de noviembre de 2026». |
| 3 | Índice | 13 bloques con su página de inicio. |
| 4 | Fotografía | Vistas de Ceuta y Melilla. |
| 5 | Ceuta y Melilla (1) | «Recuperar Ceuta para los ceutíes»: expulsión inmediata de los «invasores», militarización de la frontera, plan de inversiones, procesamiento del Gobierno, sanciones y revisión de relaciones con Marruecos. |
| 6 | Fotografía | Monedas y gráficos. |
| 7-11 | Economía, industria y energía (2-8) | Rebaja de IRPF, IVA y Sociedades, cuota cero de autónomos, deuda, insularidad y Canarias, I+D+i, despoblación, pensiones, reindustrialización: impuestos eléctricos, redes, acuerdos internacionales, Pacto Verde, minería, plan nuclear, Plan Nacional de Reindustrialización, legislación laboral y turismo. |
| 12 | Fotografía | Avión con el rótulo «Remigración». |
| 13-14 | Inmigración (9-17) | «Ni uno más»: prohibición de regularizaciones, nacionalidad, supresión del arraigo, repatriación, remigración, deportación, menores no acompañados, ONG y cooperación al desarrollo. |
| 15 | Fotografía | Acto con banderas y pancarta («PRIORIDAD N…», «DESREGU…»). |
| 16-17 | Prioridad nacional (18-25) | Acceso preferente de los españoles a vivienda pública, guarderías, ayudas y prestaciones; sin ayudas a inmigrantes irregulares; sanidad; gravamen sobre remesas; IMV solo para españoles; retorno de españoles emigrados; plan de inversiones en barrios. |
| 18 | Fotografía | Edificios en construcción. |
| 19-21 | Vivienda (26-35) | Prioridad nacional en vivienda protegida, Ley del Suelo, vivienda protegida, derogación de la Ley de Vivienda, desalojo en menos de 24 horas, alquiler a inmigrantes irregulares, impuestos de la edificación, primera vivienda sin impuestos, fiscalidad agravada a no comunitarios. |
| 22 | Fotografía | Excavadora sobre papeles. |
| 23-26 | Desregulación (36-47) | Revisión de toda actuación administrativa, inteligencia artificial, ventanilla única, fin de la cita previa, tres normas derogadas por cada nueva, silencio positivo, unidad de mercado, auditoría y recorte del gasto, Pacto Verde y ZBE, multas de tráfico, Memoria Democrática, leyes de género. |
| 27 | Fotografía | Tractores en una calle. |
| 28-30 | Sector primario y mundo rural (48-59) | Mercosur y cláusulas espejo, derogación de normas que perjudiquen al campo, fondo de compensación, PAC, pesca, renovables, incendios, silencio positivo rural, seguros agrarios, relevo generacional, caza. |
| 31 | Fotografía | Pasillo de hospital. |
| 32-33 | Sanidad (60-65) | Tarjeta sanitaria única, atención primaria, listas de espera, profesionales, salud de las mujeres, infraestructuras y red de oncología. |
| 34 | Fotografía | Aula. |
| 35-37 | Educación, cultura y deporte (66-78) | Currículo y EVAU únicos, educación en español, libre elección de centro, becas, derogación de la LOMLOE, límite de alumnos de otras culturas por aula, burka y nicab, menús halal, programa de lengua árabe, prioridad nacional educativa, universidad, cultura y mecenazgo, tauromaquia, deporte. |
| 38 | Fotografía | Agente de policía. |
| 39-42 | Seguridad y defensa (79-93) | Responsabilidad penal del menor, prisión permanente revisable, directores de Policía y Guardia Civil, medios, equiparación salarial, prisiones, narcotráfico, violencia contra las mujeres, fronteras con las Fuerzas Armadas, Defensa, protección civil, ciberseguridad, soberanía, Gibraltar. |
| 43 | Fotografía | Mujer embarazada. |
| 44-46 | Familia y vida (94-99) | Plan nacional de natalidad, dependencia y discapacidad, trabas a la dependencia, menores en entornos digitales, derecho a la vida y objeción de conciencia, brecha maternal y conciliación. |
| 47 | Fotografía | Fachada del Tribunal Supremo. |
| 48-51 | Independencia de la justicia y lucha contra la corrupción (100-111) | Elección judicial de los vocales del CGPJ, Tribunal Constitucional, reforma judicial, sedición, malversación e indultos, ilegalización de partidos, símbolos, medios contra la corrupción, auditorías, víctimas del terrorismo, RTVE, libertad de expresión. |
| 52 | Fotografía | Tren de alta velocidad en una estación. |
| 53-54 | Infraestructuras y transportes (112-115) | Plan nacional de infraestructuras, ferrocarril y Cercanías, obras contra inundaciones, Plan Nacional del Agua con interconexión de cuencas. |
| 55 | Contraportada | «Vota Vox. Es sentido común». |

## Resultado

- `extraccion.json`: índice (13 bloques, portadas, índice y fotografías), 127 medidas con cita literal y página (115 números, con las viñetas de las medidas 1, 2, 8, 43, 94 y 95 y las dos partes de la 103 por separado, menos 11 enunciados sin medida identificable, enumerados en la nota del fichero) y 12 prioridades justificadas con el propio documento. El programa no tiene introducción ni resumen; las prioridades se justifican por el orden del índice, los títulos de bloque y de medida, las fotografías con texto, el espacio que ocupan y las repeticiones entre bloques.
- `evaluacion.json`: las 12 prioridades con los 8 criterios de `data/fase3/criterios.json`.
- Las citas se comprueban con `python3 -I pipeline/verify_quotes.py vox`.
