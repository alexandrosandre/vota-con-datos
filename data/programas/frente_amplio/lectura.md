# Frente Amplio — Registro de lectura del programa (Fase 3, paso A)

- Programa: «Un programa como una casa» (título de la portada, el mismo que encabeza la página oficial del programa), Frente Amplio, publicado el 16-nov-2026 y enlazado desde frenteamplio.info/programa/ («Descargar el programa (PDF)», `/pdf/ProgramaFrenteAmplio.pdf`). La portada del PDF no tiene texto extraíble; renderizada, dice «Elecciones Generales 29N 2026 · Un programa como una casa · Frente Amplio».
- Fichero: `data/sources/programas/frente_amplio/ProgramaFrenteAmplio.pdf` (SHA-256 `df6e4d967a3a41386656273c32c2df3edc6681b6ee047b190b2ebb91f1a36f04`, comprobado el 16-nov), 151 páginas A4, en castellano; texto en `ProgramaFrenteAmplio.txt` (`pdftotext -layout`, que coincide byte a byte con una nueva extracción del PDF).
- Versión republicada el 17-nov-2026 (SHA-256 `516c5c6caaa04d0bd6f28770a49ae312f79ff3ebcf48967db66adc4ce2335424`,
  CreationDate 17-nov 19:06 CET), que sustituye a la anterior en el repositorio: mismas 151 páginas y mismo texto salvo
  cultura (p. 34: «Inversión en cultura del 2 % del gasto público» en lugar del «Suelo de inversión pública del 0,2 % del
  PIB»), una viñeta nueva en salarios (p. 51: «Cláusulas de revisión salarial ligadas al IPC», 909 viñetas en total) y
  autónomos (p. 92: IVA franquiciado opcional, «Tarifa plana mientras se ingrese menos del SMI» de 88 euros en lugar de la
  cotización fija bonificada, convocatoria única de ayudas y Kit Digital; p. 93: «zonas tensionadas» en lugar de «zonas
  tensionadas por el turismo»). La viñeta nueva desplaza el texto de las pp. 51-58 hasta una página. Las páginas de la tabla
  y de las secciones siguientes son las de la versión nueva; la viñeta nueva no está en `extraccion.json`.
- Método: cada página se extrajo por separado con `pdftotext -layout -f N -l N` (página N = página del PDF). No se usan los saltos de página (`\f`) del fichero de texto para numerar. Se leyó **íntegramente, página a página**, en cuatro bloques consecutivos: pp. 1-38, 39-65, 66-101 y 102-151 (la introducción, pp. 7-8, se leyó también con cada bloque para cruzarla con sus medidas). No se omitió ninguna página: las 151 tienen su línea en el registro de trabajo.
- Páginas sin texto de programa: 1 (portada, texto solo en imagen, renderizada), 2 (créditos: «© Frente Amplio, 2026.»), 6 (en blanco) y 151 (contraportada, solo el logotipo, renderizada). Las portadillas de capítulo (pp. 9, 20, 43, 50, 59, 79, 86, 91, 96, 99, 102, 108, 114, 118, 122, 125, 129 y 139) solo llevan el número y el título del capítulo.
- Numeración: el número impreso en la cabecera no es la página del PDF ni guarda un desfase fijo (PDF + 2 en la introducción, + 3 en el capítulo 1, + 4 desde el capítulo 2, y creciente con cada portadilla, hasta + 14 en los capítulos finales). El índice (pp. 3-5) usa la numeración impresa (llega a la «177»), así que no sirve para localizar páginas del PDF; en `extraccion.json` el índice va con páginas del PDF.
- Estructura: introducción sin medidas (pp. 7-8), que resume el programa en «seis grandes transformaciones», y 18 capítulos con apartados numerados (1.1 a 18.8). Las medidas no están numeradas: son 908 viñetas (●), con subviñetas (▶, ▷) en unas pocas, y casi todas llevan un título en negrita. El capítulo 5 empieza (p. 60) con un bloque sin número (3,5 % del PIB y revisión del PNIEC) antes del 5.1.
- Maquetación: en el `.txt` completo, la cabecera de página («NN TÍTULO DEL CAPÍTULO» o «PROGRAMA ELECTORAL FRENTE AMPLIO NN») se intercala en los saltos de página, por lo que ninguna cita cruza un salto ni termina en una palabra partida a final de página (en la versión del 17-nov, la cita de fa-p341 salta con «[...]» la cabecera entre las pp. 56 y 57, y la de frente_amplio-10 en `evaluacion.json` omite con «[...]» la palabra «públicas», partida entre las pp. 57 y 58). Las palabras partidas por guion a final de línea se unen en las citas («REDAL», «LOPIVI»). Cinco medidas concretas están en párrafos o subtítulos sin viñeta (pp. 63, 84, 133, 135 y 140) y se recogen con identificador `fa-t-…`. Hay textos repetidos casi literalmente: el párrafo de «competencias impropias» (fa-p628 y dentro de fa-p651), la auditoría ferroviaria en seis meses (fa-p637 y fa-p638) y el órgano independiente sobre malos tratos policiales (fa-p869 y fa-p870).
- Fecha de lectura: 2026-11-16.

## Páginas leídas y resumen por sección

| Páginas | Sección | Resumen (una línea) |
|---|---|---|
| 1-2 | Portada y créditos | «Un programa como una casa» (imagen); «© Frente Amplio, 2026.» |
| 3-5 | Índice | 18 capítulos y sus apartados, con página impresa. |
| 6 | En blanco | — |
| 7-8 | Introducción | Seis grandes transformaciones: vivienda (art. 47, 1 % del PIB y 1,5 millones de viviendas, tope del 25 %, desahucios, pisos turísticos); trabajo (32 horas empezando por 37,5, SMI al 60 % del salario medio neto, pensiones en la Constitución, democracia en la empresa); bienestar (sanidad al 8 % del PIB con bucodental, visual y auditiva, educación al 7 %, prestación por crianza de 200 €, cuidados); reforma fiscal (Sociedades al 20 %, impuesto a los ultrarricos, IRPF e IVA); transición ecológica (3,5 % del PIB, banca pública, energía pública, tres horas de luz gratis, abono único, tren); democracia (República federal y plurinacional, 0,7 %, Palestina y Sáhara Occidental). |
| 9-19 | 1. Acabar con la especulación y garantizar el derecho a la vivienda (portadilla p. 9) | 1 % del PIB (17.000 M€/año) y 1,5 millones de viviendas públicas en 12 años; ley de expropiación a tenedores corporativos y SAREB a Casa 47; reserva de suelo; cooperativas; prohibición de compra no residencial; fin de los pisos turísticos en zonas tensionadas en 3 años; Agencia Estatal de la Vivienda; sindicatos de inquilinas y huelga de alquileres; tope del alquiler al 25 % de la renta; contrato indefinido; desahucios; escudo hipotecario; rehabilitación de 2,5 millones de viviendas; impuesto del 10 % a la acumulación; SOCIMI; reforma del art. 47. |
| 20-42 | 2. Derechos sociales para una vida digna (portadilla p. 20) | Prestación universal por crianza de 200 €; IPREM; IMV; dependencia al 1,7 % del PIB en 2030; permisos; 0-3 años; servicios sociales; sanidad (8 % del PIB, gestión pública, bucodental, Plan Veo, audífonos, salud mental, aborto en el art. 43, listas de espera, farmacéutica pública, tabaco); educación (7 % del PIB en 2030, ratios, becas); cultura (2 % del gasto público; 0,2 % del PIB en la versión del 16-nov); feminismo y violencia machista; infancia, adolescencia y juventud. |
| 43-49 | 3. Una reforma fiscal en profundidad (portadilla p. 43) | Sociedades con mínimo del 20 % y límite de 4 años a la compensación de pérdidas; gravámenes a energéticas y banca; grandes fortunas (2 % y 3 %), Tasa Zucman, herencias; IRPF (rentas del capital, rebaja a salarios bajos); IVA; fiscalidad verde y del lujo; fraude; transparencia. |
| 50-58 | 4. Salarios y pensiones dignos y precios asequibles (portadilla p. 50) | SMI al 60 % del salario medio neto; revisión salarial con el IPC; negociación colectiva; despido; desempleo; jornada de 37,5 horas en 2026 y 32 horas; registro de jornada; control de precios y márgenes por la CNMC; pensiones en la Constitución con mínimo igual al SMI, jubilación a los 65, tope de cotización. |
| 59-78 | 5. Continuar el impulso hacia una transición ecológica justa (portadilla p. 59) | 3,5 % del PIB; objetivos climáticos; redes eléctricas públicas, comercializadora pública, tres horas de luz gratis, autoconsumo; transporte (abono único, Adif y Renfe unificados, Cercanías, mercancías); adaptación climática; turismo; residuos; agua; bienestar animal. |
| 79-85 | 6. Estado emprendedor y política industrial activa (portadilla p. 79) | I+D+i al 3 % del PIB en 2030; política industrial verde; SEPI y empresas públicas; Banca Pública Estatal (ICO, Correos, CaixaBank). |
| 86-90 | 7. Agricultura, ganadería y pesca (portadilla p. 86) | 25 % de superficie ecológica en 2030; agricultura regenerativa; ganadería extensiva; pago por servicios ambientales; pesca. |
| 91-95 | 8. Autónomos, pymes y economía social (portadilla p. 91) | IVA franquiciado hasta 85.000 €; tarifa plana de 88 € mientras se ingrese menos del SMI (cuota bonificada en la versión del 16-nov); locales comerciales; línea ICO de 3.000 M€; contratación pública; economía social. |
| 96-98 | 9. Lucha contra la despoblación y retos de la insularidad (portadilla p. 96) | Servicios a menos de 30 minutos; vivienda rural; Plan de Empleo Garantizado; islas. |
| 99-101 | 10. Empleo público de calidad (portadilla p. 99) | Temporalidad del 8 %; plantillas (Agencia Tributaria, extranjería). |
| 102-107 | 11. Financiación autonómica y vertebración territorial (portadilla p. 102) | 2,3 % del PIB adicional para la financiación autonómica; condonación de deuda sin dumping fiscal; alta velocidad pública y plan DORA para el tren. |
| 108-113 | 12. Ayuntamientos con recursos y autonomía (portadilla p. 108) | Participación en los tributos del Estado hasta el 2,5 % del PIB; deuda; regla de gasto; IBI, plusvalía y fiscalidad verde local. |
| 114-117 | 13. Democratización económica y poder financiero (portadilla p. 114) | Plantillas en los consejos de administración; reparto obligatorio del 10 % del beneficio; límites a los grandes grupos. |
| 118-121 | 14. Poder digital y pluralismo informativo (portadilla p. 118) | Ley de servicios digitales; responsabilidad penal de directivos de plataformas; algoritmos; IA. |
| 122-124 | 15. Igualdad y más derechos para todas, todos y todes (portadilla p. 122) | Transparencia salarial; Ley Trans y personas no binarias; LGTBI. |
| 125-128 | 16. Migraciones y antirracismo (portadilla p. 125) | Ley Integral Antirracismo; regularización; extranjería; asilo; reagrupación. |
| 129-138 | 17. La seguridad humana: paz, solidaridad y Europa (portadilla p. 129) | Rechazo del 5 % del PIB en defensa; armas nucleares; Palestina y Sáhara Occidental; cooperación del 0,27 % al 0,7 % de la RNB; Europa. |
| 139-150 | 18. Hacia una democracia avanzada (portadilla p. 139) | República Federal y plurinacional; reformas constitucionales (art. 135, pensiones, vivienda); corrupción; protesta social; fuerzas de seguridad; medios; memoria democrática; justicia; laicidad. |
| 151 | Contraportada | Logotipo del Frente Amplio, sin texto. |

## Compromisos de campaña anteriores y programa

Hasta el 16-nov, el paso 2 del Frente Amplio se basaba en sus compromisos de campaña (`compromisos/seleccion.json`, 18 compromisos y 11 prioridades evaluadas y revisadas el 12-nov). Cada compromiso se buscó en las 857 medidas de `extraccion.json` y en el texto completo, por sus términos y por sinónimos, con el criterio de las revisiones de Vox, Compromís y PSOE: si falta el rasgo que define el compromiso, va al complemento; si falta un elemento accesorio (instrumento, plazo, nombre de la norma) o el programa lo concreta, se descarta.

**Están en el programa (pasan a «descartados»):**

- fa-c01, ley de expropiación en tres fases (>1.000, >700 y >50 viviendas): fa-p004, p. 10, con el mismo texto. Prioridad frente_amplio-02.
- fa-c02, inmuebles de la SAREB: fa-p004, p. 10, adscritos a Casa 47 (el compromiso decía «al parque público»). Prioridad frente_amplio-02.
- fa-c03, impuesto del 10 % a la acumulación de viviendas: fa-p053, p. 18, mismos umbrales y exenciones (el programa no dice que sea anual). Prioridad frente_amplio-03.
- fa-c04, 1 % del PIB para vivienda pública: fa-p001, p. 10, y p. 19 (sin ligarlo al impuesto del 10 %). Prioridad frente_amplio-01.
- fa-c05, 2 % desde un millón y 3 % desde 50 millones: fa-p258 y fa-p259, p. 45 (Grandes Fortunas y Tasa Zucman). Prioridad frente_amplio-07.
- fa-c06, más tipo efectivo en Sociedades para gran empresa y banca (suelo del 15 % en la nota del 24-oct) y revisión de la compensación de pérdidas: el programa lo concreta en un mínimo del 20 % y un límite de 4 años (fa-p244 y fa-p246, p. 44). Prioridad frente_amplio-06.
- fa-c07, ninguna pensión por debajo del SMI: en la reforma constitucional del apartado 4.3 (fa-p349, p. 57; «pensión mínima igual al SMI»); cambia el instrumento y no figura el coste de 10.000 M€. Prioridad frente_amplio-10.
- fa-c08, jubilación a los 65: fa-p350, p. 58. Prioridad frente_amplio-10.
- fa-c10, unificar Adif y Renfe: fa-p398, p. 65.
- fa-c11, fondos del plan DORA para el tren: fa-p641, p. 106.
- fa-c13, traspaso de Rodalies: fa-p402 (p. 66) y fa-p643 (p. 106), con la unificación de Adif y Renfe (fa-p398); no menciona un mando propio de Cataluña ni la liberalización de Rodalies. No era prioridad.
- fa-c14, sindicatos de inquilinas y huelga de alquileres: fa-p021 y fa-p022, p. 13, con el depósito en consignación judicial en lugar de un fondo público y limitada a abusos sistémicos o incumplimientos graves de habitabilidad.
- fa-c15, jornada de 37,5 horas: fa-p334, p. 56 (no era prioridad).
- fa-c16, prestación de 200 € por menor: fa-p062, p. 21 (no era prioridad). Prioridad frente_amplio-04.
- fa-c17, pisos turísticos y prohibición de compra por fondos: fa-p014 (p. 12) y fa-p012 (p. 11) (no era prioridad).

**No están en el programa, o no en esos términos (siguen sin priorizar, como antes del programa):**

- fa-c09, financiación de la jubilación a los 65 eliminando el tope máximo de cotización: el programa propone «elevando progresivamente» el tope (fa-p355, p. 58), no eliminarlo, y mantiene la aportación de las empresas automatizadas. Era instrumento de financiación de fa-c08, no prioridad.
- fa-c12, renunciar a los 350 km/h del AVE Madrid-Barcelona y llevar los 1.333 M€ a Rodalies (Ernest Urtasun): no figura.
- fa-c18, transferencia y gratuidad de la AP-9 (Fronte Ampla): no figura (los peajes solo aparecen para vehículos pesados, fa-p412, p. 67). Mismo trato que psoe-c07.

**Resultado:** las 11 prioridades de la base «compromisos» están en el programa, así que el complemento queda vacío (`prioridades` vacío en `compromisos/seleccion.json`, como el PSOE el 15-nov) y no hay evaluación de complemento. `compromisos/evaluacion.json` (base «compromisos», 11 propuestas revisadas el 12-nov) se retira, como la del PSOE: se conserva en el historial del repositorio y sus textos se reaprovechan en `evaluacion.json` del programa cuando el hecho es el mismo.

**Compromisos posteriores al 12-nov** (registro `data/promesas/promesas.json`, que la selección no incluía): también están en el programa la exclusión durante 20 años de la contratación pública por corrupción (fa-p839, p. 142), una oficina independiente contra la corrupción («Oficina Independiente contra la Corrupción», p. 142; la nota del 13-nov decía «Agencia»), el IVA franquiciado hasta 85.000 € para autónomos (fa-p567, p. 92), el contrato de alquiler indefinido (fa-p030, p. 14) y la ampliación de bucodental, Plan Veo y audífonos (fa-p111 a fa-p113, p. 27). No se ha hecho una búsqueda nueva de compromisos tras el 12-nov para este complemento (mismo alcance que Vox, Compromís y PSOE).

## Resultado

- `extraccion.json`: índice con páginas del PDF, 857 medidas con cita literal y página (852 de las 908 viñetas más 5 medidas sin viñeta; se omiten 56 viñetas sin medida identificable, enumeradas en la nota del fichero) y 12 prioridades justificadas con el propio documento (introducción de las «seis grandes transformaciones», repeticiones, subtítulo propio, apertura de capítulo) y, como corroboración, con las 8 medidas que destaca la página oficial del programa (frenteamplio.info/programa/, guardada en `data/sources/programas/frente_amplio/web_2026-11-16/`). Al menos una prioridad por cada una de las seis transformaciones.
- `evaluacion.json`: las 12 prioridades con los 8 criterios de `data/fase3/criterios.json`.
- `compromisos/seleccion.json`: base «complemento», sin prioridades (ver arriba).
- Las citas se comprueban con `python3 -I pipeline/verify_quotes.py frente_amplio`.
