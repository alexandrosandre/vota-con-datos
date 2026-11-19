# Junts — Registro de lectura del programa (Fase 3, paso A)

- **Pendiente de publicación oficial.** Programa «Catalunya al centre. Programa electoral 29N» de Junts per Catalunya (90 pp.,
  en catalán), repartido a la prensa el 18-nov-2026. A 19-nov no está en ninguna web oficial de Junts; se analiza la copia que
  aloja el diario Ara (static1.ara.cat, enlazada desde su portada de política el 18-nov). Este análisis solo se publica si Junts
  sube el PDF a un canal oficial con el mismo SHA-256; si cambia, hay que rehacerlo. Detalle en `data/partidos/partidos.json`
  (entrada `junts`, `programa.verificacion`).
- Fichero: `data/sources/programas/junts/programa-electoral-junts-29n.pdf` (SHA-256
  `cde2c5f3f30b66c72dd4f4bae3d22e9f6bc3e0ee4362da72f9e32e85129374b6`, 1.355.756 bytes; «Programa electoral.indd», InDesign 14.0,
  creado el 18-nov a las 16:44 CET), 90 páginas, en catalán; cabeceras de la descarga en `programa-electoral-junts-29n.headers.txt`.
- Texto: `programa-electoral-junts-29n.txt`, extraído con `pdftotext` **sin `-layout`**, como el de Adelante Andalucía: el programa
  va a dos columnas y con `-layout` las columnas se intercalan línea a línea y romperían casi todas las citas. Aun así, en algunas
  páginas (15, 17, 18, 25, 27, 29, 33, 36, 38, 41, 42, 45, 51, 57, 59, 68-70, 74, 75, 77, 83, 85, 86 y 88) pdftotext desordena
  fragmentos de las dos columnas o de las listas de «Competències» y «Objectius»: se comprobó con la imagen de la página a qué punto
  pertenece cada fragmento y las citas usan «[...]» para saltar el texto intercalado. Algunas palabras partidas por guion a final
  de línea quedan unidas en el texto extraído («aprovarne», «condicionarlos», «actualitzarlos»…): se citan tal cual o se saltan.
- Método: cada página se extrajo por separado con `pdftotext -f N -l N` (página N = página del PDF; el número impreso al pie
  coincide). Se leyó **íntegramente, página a página**, en cuatro bloques consecutivos: pp. 1-28, 29-49, 50-70 y 71-90. No se omitió
  ninguna página. Cada cita se comprobó por script contra el texto completo y contra el de su página.
- Páginas sin medidas extraídas: 1 (portada), 2-3 (portadilla e índice), 4 (portadilla de la introducción), 5 (introducción: tres
  principios y los «espais de sobirania»), 6-7 («Retiment de comptes», balance de la legislatura), 8-10 («Catalunya al centre»,
  relato general; sus medidas se repiten en las secciones), las portadillas de bloque (11, 43 y 66), 87-89 (anexo «Principals
  iniciatives de la legislatura», balance) y 90 (contraportada). La introducción, «Catalunya al centre» y el anexo se usan como
  evidencia de prioridades.
- Estructura: tres bloques con 26 secciones «... al centre» (s01-s26 en `extraccion.json`, en el orden del índice). Cada sección
  tiene introducción, «Competències» (a protegir / a reclamar), «Objectius» y «Punts de programa» agrupados por objetivo y numerados
  N.M. No hay numeración global de medidas.
- Fecha de lectura: 2026-11-18 y 19.

## Páginas leídas y resumen por sección

| Páginas | Sección | Resumen (una línea) |
|---|---|---|
| 1-5 | Portada, índice e introducción | El programa se centra en la «agenda catalana»; tres principios: Cataluña en el centro, defensa del autogobierno y ganar soberanía (concierto económico, inmigración y fronteras, ferrocarril y aeropuertos, lengua, educación y sanidad). |
| 6-7 | Retiment de comptes | Balance de la legislatura: amnistía, catalán en el Congreso, oficialidad en la UE en la agenda, ley de multirreincidencia, rebajas fiscales a pymes. |
| 8-10 | Catalunya al centre | Relato del modelo de sociedad: escuela catalana como «línia vermella», TSJC como última instancia, Sareb y Casa 47, ocupación en 48 horas, inmigración gobernada desde Cataluña, IRPF deflactado, concierto, Rodalies y El Prat. |
| 11-15 | Bloc I · s01 Drets i llibertats nacionals i justícia | Autodeterminación, reforma de delitos de expresión, terrorismo, malversación y desórdenes, secretos oficiales, ley mordaza; soberanía judicial (Consell de Justícia, TSJC, traspasos); supresión de la Audiencia Nacional; CGPJ y TC; ocupaciones y multirreincidencia. |
| 16-18 | s02 Propietat i habitatge | Desalojo de ocupaciones en 48 horas; la Administración paga al pequeño propietario; deducciones del 15 % (alquiler, hipoteca, cuenta vivienda); IVA del 5 % en vivienda nueva; Sareb y Casa 47 a la Generalitat; avales. |
| 19-20 | s03 Llengua catalana | Escuela en catalán, catalán exigido en la función pública estatal, plataformas y audiovisual, medios públicos en catalán, oficialidad en la UE. |
| 21-24 | s04 Seguretat | Modelo Nacional de Seguridad, delegación de inmigración, Mossos como policía integral (puertos y aeropuertos), multirreincidencia, protección civil, salvamento marítimo. |
| 24-25 | s05 Cultura | Obligaciones lingüísticas del audiovisual, equipamientos estatales, patrimonio (Sixena), ayudas a la creación en catalán. |
| 26-28 | s06 Política internacional | Independencia en la UE y la OTAN, oficialidad del catalán, apoyo a Ucrania, Oriente Próximo, Corredor Mediterráneo, voto exterior. |
| 29-31 | s07 Administracions públiques | Simplificación (declaración responsable, silencio positivo), transparencia de inversiones y plazos, función pública, secretarios e interventores locales. |
| 32-34 | s08 Igualtat | Brecha salarial y de pensiones, conciliación, violencia machista digital, competencia catalana. |
| 35-37 | s09 Drets LGTBI+ | Ley contra las terapias de conversión, reparación de víctimas de la dictadura, fondos y 0,7 % del IRPF. |
| 38-40 | s10 Persones amb discapacitat | Vida independiente, 50 % estatal de la dependencia, reglamentos con calendario, accesibilidad, voto secreto. |
| 41-42 | s11 Animals | Código Penal, IVA veterinario, reforma de la Ley 7/2023, tauromaquia. |
| 43-46 | Bloc II · s12 Benestar | Modelo preventivo, competencia exclusiva en servicios sociales, financiación estatal de la dependencia, deducciones familiares. |
| 47-49 | s13 Immigració | Ley de delegación, padrón real, catalán en el arraigo y las renovaciones, prohibición del velo integral, Mossos en el control Schengen (26.800 agentes en 2032), menores. |
| 50-52 | s14 Salut | 8 % del PIB y 25 % a primaria, traspaso de hospitales, distrito universitario, MIR, enfermería A1, medicamentos y Alzheimer. |
| 53-55 | s15 Escola i universitat | Inmersión y LEC, concertada, 0-3 y 16-18 gratuitos, universidades (0,6 % del PIB), I+D, IVA de la investigación. |
| 56-58 | s16 Persones grans | Pensiones con el IPC catalán y mínimas a 1.400 €, IRPF deflactado, jubilación sin penalización con 40 años cotizados, sucesiones. |
| 59-62 | s17 Joves | Distrito universitario, deducciones de vivienda, IRPF de los jóvenes, cuota cero de autónomos, Garantía Juvenil, voto a los 16. |
| 63-65 | s18 Esport | Selecciones y Comité Olímpico catalanes, fiscalidad del deporte, quiniela. |
| 66-70 | Bloc III · s19 Economia, empreses i treball | Concierto económico (LOFCA y ley del Concert), deflactar el IRPF, IVA franquiciado y al cobro, sociedades, salario mínimo catalán, jubilación con 40 años, horas extra, mutuas, I+D al 3 %. |
| 71-72 | s20 Infraestructures | Traspaso del 100 % de Rodalies y Media Distancia, plan de choque, El Prat y aeropuertos fuera de Aena, Corredor Mediterráneo, puertos, carreteras. |
| 73-75 | s21 Primer sector | Traspaso de competencias agrarias, rebajas fiscales directas, cadena alimentaria, drones, NGT. |
| 76-78 | s22 Energia | PNIEC territorializado, autoconsumo compartido a 100 km, redes y peajes, calendario nuclear. |
| 79-80 | s23 Digital | Telecomunicaciones y ciberseguridad, fibra y 5G al 100 %, catalán en plataformas e IA, menores. |
| 81 | s24 Medi ambient | Neutralidad climática, agua (pérdidas, desalación, Ebro), residuos. |
| 82-84 | s25 Món local | Remanentes y superávits municipales, financiación local, LRSAL, padrón, delegación de inmigración. |
| 85-86 | s26 Món rural | Pacte Nacional Rural-Urbà, rehabilitación del 30 % del parque rural, servicios, fibra, relevo. |
| 87-90 | Anexo y contraportada | Iniciativas de la legislatura en siete bloques; sin propuestas. |

## Compromisos de campaña anteriores y programa

Hasta el 18-nov, el paso 2 de Junts se basaba en sus compromisos de campaña (`compromisos/seleccion.json`, 7 prioridades evaluadas
y revisadas). Cada compromiso se buscó en las 611 medidas de `extraccion.json` y en el texto completo, por sus términos y por
sinónimos, con el criterio de las revisiones anteriores: si falta el rasgo que define el compromiso, va al complemento; si falta un
elemento accesorio o el programa lo concreta, se descarta.

**Están en el programa (pasan a «descartados»):** concierto económico (c01: s19 1.1, p. 68), traspaso integral de Rodalies (c02:
s20 1.1, p. 72; sin nombrar a FGC), delegación de inmigración (c04: s13 1.1, p. 48), catalán en la UE (c05: s03 4.1, p. 20),
deducción del 15 % por alquiler e hipoteca (c06: s02 3.1-3.2, p. 17), ocupaciones en 48 horas (c08: s02 1.1, p. 17, y s01 6.2,
p. 15) y Corredor Mediterráneo separado del tráfico de pasajeros (c10, no priorizado: s20 2.2, p. 72).

**No está en el programa:** destinar al menos el 30 % del gasto en vías a mantenimiento (c03; el programa pide un plan de choque
con auditorías externas, s20 1.2, p. 72). No entra en el complemento por el criterio único del 18-nov: una sola ocasión, en el
cuerpo de la nota del 3-nov, no en su titular ni en su entradilla.

**Resultado:** complemento vacío (`compromisos/seleccion.json` con base «complemento» y sin prioridades; sin `evaluacion.json`).
La evaluación de la base «compromisos» se retira (queda en el historial) y sus textos se reaprovechan en `evaluacion.json` del
programa cuando el hecho es el mismo.

## Resultado

- `extraccion.json`: índice con páginas del PDF, 611 medidas con cita literal en catalán, traducción y página (puntos de programa;
  competencias u objetivos solo cuando traen una medida que no está en ningún punto de su sección) y 45 omitidas sin medida
  identificable (enumeradas en la nota), y 12 prioridades justificadas con el propio documento (introducción, «Catalunya al
  centre», primer punto de sección, repetición en varias secciones, anexo) y, como corroboración, con lo que los candidatos
  destacaron en campaña. Prioridades: ocupaciones en 48 horas, deducción del 15 % por alquiler, Sareb y Casa 47, catalán en la UE,
  delegación de inmigración, catalán en el arraigo, Mossos en el control Schengen, jubilación con 40 años cotizados, concierto
  económico, deflactar el IRPF, Rodalies y El Prat.
- `evaluacion.json`: las 12 prioridades con los 8 criterios de `data/fase3/criterios.json`; `revision.json`: revisión
  independiente (aprobada, 8 correcciones de texto, ninguna de valoración).
- Las citas se comprueban con `python3 -I pipeline/verify_quotes.py junts`.
