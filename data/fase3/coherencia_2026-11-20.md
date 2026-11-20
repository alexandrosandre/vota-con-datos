# Auditoría de coherencia tras la publicación oficial del programa de Junts (Fase 3, 20-11-2026)

Alcance: las 12 propuestas del programa de Junts (`data/programas/junts/evaluacion.json`, analizado sobre la copia de Ara y
aprobado por su revisión del 19-11) y sus 14 posiciones del paso 1 (`data/fase1/codificacion_g20.json`, verificación aprobada),
comparadas con las propuestas y posiciones equivalentes publicadas de los demás partidos (`*/evaluacion.json`,
`*/compromisos/evaluacion.json` y `fase1.json`), en las dos direcciones; y las dos dudas que la revisión de Junts dejó para esta
auditoría: la financiación de junts-08 frente a pnv-08 y bng-07 (cifra del Gobierno de más de 3.300 M€ citada por la prensa) y
la cifra del DORA para El Prat en psc-c05 (1.765 M€, cuando junts-12 cita 1.294,840 M€ del BOE). Regla: mismos hechos, mismas
cifras, mismas fuentes primarias, misma fuerza en la redacción y misma valoración; hechos distintos, valoraciones distintas
explicadas en el texto. Cada dato que se cambia se comprobó el 20-11 en la fuente primaria (Congreso: respuestas del Gobierno a
preguntas escritas; BOE; Banco de España). Cada corrección figura en el `revision.json` del partido (o de su carpeta
`compromisos/`), en `cambios`, con `fecha` 2026-11-20 y motivo «auditoría de coherencia (20-nov, tras la publicación oficial del
programa de Junts)…»; `aprobado` no cambia. Los textos de `evaluacion.json` no comparan partidos.

**Cambian dos valoraciones**, por el criterio único de la primera sección: junts-08 y pnv-08, financiación, «no_verificable» →
«mixta». bng-07 no cambia. Las demás correcciones son de texto, cifras o fuentes.

## Publicación oficial (catálogo)

Junts publica el programa en tualcentre.cat, su web de campaña «Catalunya al centre» (aviso legal a nombre de Junts per
Catalunya, NIF G01731801; enlazada desde la portada de junts.cat), en la opción «Programa electoral» del menú:
https://www.tualcentre.cat/app/uploads/2026/11/PROGRAMA-ELECTORAL_JUNTS_29N.pdf. Mismo sha256 (`cde2c5f3…`) que la copia de Ara
analizada; Last-Modified 18-11 18:06 CET y subida en WordPress el 18-11; detectado el 20-11 a las 09:55 (las comprobaciones del
18 y el 19-11 miraron solo junts.cat). La url provisional se sustituye por la oficial en todo el repositorio (catálogo, 14
posiciones y `fuentes` de g20, 35 enlaces `#page=` de la evaluación y 7 candidatas del registro), `partidos.json` recoge
`fecha_fuente`, `pagina_campana` y la `verificacion` completa, y el PDF del repositorio pasa a ser el oficial
(`PROGRAMA-ELECTORAL_JUNTS_29N.pdf`); la copia de Ara se retira por redundante y quedan sus cabeceras como trazabilidad. El texto
(`programa-electoral-junts-29n.txt`, sin `-layout`) es el ya validado. Ninguna posición ni valoración cambia por la publicación.

## Criterio único: coste de suprimir los coeficientes reductores con 40 años cotizados (junts-08, pnv-08, bng-07)

Situación de partida: las tres eran «no_verificable» en financiación. junts-08 y pnv-08 decían «No se ha localizado una
estimación oficial publicada del coste de suprimir los coeficientes reductores con 40 o más años cotizados»; bng-07, que no hay
estimación oficial de volver a los 65 años. La revisión de Junts señaló que la crónica de Qué! (12-6-2026) que ya citan en
antecedentes atribuye al Gobierno «más de 3.300 millones de euros», y que junts-04 es «mixta» con una estimación de la Comisión
que solo consta en prensa (132 M€).

Hechos comprobados: la cifra no es solo de prensa. El Gobierno la publicó en sus respuestas a preguntas escritas del Congreso
(184/37144 a 184/37146, de 7-5-2026, y 184/37744, de 27-5-2026; comprobadas el 20-11): eliminar los coeficientes reductores de la
pensión inicial de los jubilados anticipados **actuales** con carreras de 40 o más años «supondría un incremento de gasto para el
Sistema de 3.358 millones de euros anuales», 1.345 M€ por la jubilación anticipada voluntaria (coeficiente medio del 11,36 %) y
2.013 M€ por la involuntaria (18,9 %). No estima las jubilaciones futuras ni atrasos.

Criterio: **el coste es estimable si hay una estimación oficial publicada del coste de la medida o de su parte principal**; una
cifra que solo consta en prensa vale si la prensa la atribuye a un organismo oficial (precedentes: junts-04 y, el 18-11, erc-04 y
salf-12), pero se cita el documento primario cuando existe. El texto dice qué parte cubre la cifra. Con el coste estimable, la
valoración la decide la rúbrica: «mixta» si el programa no explica cómo se paga o lo explica sin cuantificar.

Aplicación:

| Propuesta | Medida | Estimación oficial | Antes | Después |
|---|---|---|---|---|
| junts-08 | sin coeficientes con 40 o más años, con carácter retroactivo | sí, para los ya jubilados (3.358 M€ anuales) | N | **M** (el programa no dice cómo se paga; el texto dice que la cifra no incluye las jubilaciones futuras ni los atrasos) |
| pnv-08 | sin coeficientes con más de 40 años, y corregir los de los ya jubilados | sí, la misma | N | **M** («reforzar las fuentes de financiación», sin cuantificar) |
| bng-07 | volver a la jubilación ordinaria a los 65 años para todos y la parcial a los 61 | no: la cifra del Gobierno es de otra medida (carreras de 40 años ya jubiladas) | N | N (sin cambios; su texto ya dice que no hay estimación de volver a los 65) |

En junts-08 y pnv-08 se corrigen también, sin cambio de valoración, «beneficiarios» (el texto y el campo de cabecera decían que
no había cifra oficial del coste) y «largo_plazo» («del que no se ha localizado una estimación oficial publicada»), con la misma
fuente.

## Parejas comparadas

### Paso 2: las 12 propuestas de Junts

| Junts | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| junts-01 (desalojo en 48 horas) | pp-03, upn-07, vox-08, salf-02 | financiación N en las cinco; evidencia N como pp-03, upn-07 y vox-08 (M en salf-02, que añade el impago de alquiler y cita estudios sobre la ejecución de contratos) | Ley 5/2018, LO 1/2025, 1.845 verbales posesorios y 12 meses (CGPJ), 14.875 hechos (OCU), Ley francesa 2023-668 y WODC, iguales. Sin cambios. |
| junts-02 (deducciones del 15 % por alquiler, hipoteca y cuenta vivienda) | vox-09, upn-11, salf-01 | legal F frente a M en vox-09 (justificada: el IVA del 0 % choca con la Directiva; la deducción en el IRPF cabe por ley ordinaria, como dice vox-09) | Banco de España (2026): **hallazgo 3**. Coste y beneficiarios de la antigua deducción con años distintos: véase dudas. |
| junts-03 (Sareb y Casa 47) | erc-07, frente_amplio-02 | iguales con erc-07 (8/8) | Mismas cifras (13.000 viviendas, 27.790 y 15.303 M€, NAMA). junts-03 añade tres hechos que erc-07 no tenía: **hallazgo 4**. |
| junts-04 (catalán en la UE) | ara_mes_fa-11, erc-11 | — (medidas distintas) | Petición del 17-8-2023 y falta de unanimidad, iguales en ara_mes_fa-11. Financiación M con cifra de la Comisión recogida por prensa: coherente con el criterio único. Sin cambios. |
| junts-05 (delegación de inmigración) | pnv-07 | iguales (MMNMMMMM) | STC 31/2010 (FJ 83), art. 150.2 CE, rechazo del 23-9-2025 (173-177), Canadá (IRCC; Picot, Crossman y Hou), iguales. Sin cambios. |
| junts-06 (catalán para el arraigo) | cc-06, salf-06 | legal M frente a D (justificada en la revisión de Junts: aquellas chocan con el Derecho de la UE) | Sin cambios. |
| junts-07 (Mossos en puertos y aeropuertos) | — | — | Sin equivalente. Financiación M (70.600 € por agente) frente a N en junts-05, explicada en la nota del fichero. |
| junts-08 (pensión sin coeficientes con 40 años) | pnv-08, bng-07, frente_amplio-10 | **financiación N → M con pnv-08** (criterio único); largo plazo D en las cuatro | Ley 21/2021, complemento de menos de 100.000 personas, moción de 2025 y enmienda de junio de 2026, AIReF (16,1 % en 2050), Dolls y Krolage, Devesa y otros, iguales. |
| junts-09 (concierto económico) | bng-01, erc-10, erc-01 | legal D como bng-01 (STC 158/2019); M en erc-10 (solo recaudación, art. 156.2), justificada | Alemania (art. 108 de la Ley Fundamental), Ley 12/2002 y De la Fuente, iguales. Sin cambios. |
| junts-10 (deflactar el IRPF) | pp-10, upn-05 | iguales con pp-10 (8/8); internacional y beneficiarios F en upn-05 (justificada: solo deflactar, sin rebajas sin cuantificar) | 2.294 M€ (0,14 % del PIB), Immervoll, Banco de España, 11 de 27 países, 23,99 millones de declaraciones, iguales. Sin cambios. |
| junts-11 (Rodalies y Media Distancia) | erc-03, psc-c06 | iguales (8/8 M) | 49,9 % y cinco de nueve consejeros, art. 4.3 de la Ley 38/2015, 1.407,6 M€, AIReF (3.600 y 55.888 M€), iguales. Sin cambios. |
| junts-12 (El Prat y aeropuertos de Aena) | psc-c05, ara_mes_fa-08 | — (medidas distintas) | Cifras del DORA: **hallazgo 2** (psc-c05). Art. 149.1.20.ª CE y Ley 18/2014, iguales en las tres. |

### Paso 1: las 14 posiciones de g20

Se comparó cada valor con el de los demás partidos en `fase1.json` y con los criterios ya fijados (precedencia del programa,
fuerza de la propuesta, documentos de legislaturas anteriores). Todas coinciden con el criterio aplicado a los demás: q01 −2 como
el PP (suprimir la limitación de rentas donde ya existe); q03 +1 como ERC, Compromís, Ara Més y Vox (rebaja con otras cifras);
q11 −1 como el PNV, UPN y Vox; q12 +2 como ERC; q15 −1 (no prohíbe; PP, Vox y SALF, −2); q16 +1 (no propone negociarlo con el
Gobierno; ERC y BNG, +2); q17 +2 como el BNG; q18 +1 como Compromís, Ara Més, el Frente Amplio y Adelante Andalucía; q23 +2 como
el PP, Vox y SALF; q24 +2 como ERC, el BNG y Compromís; q32 +1 como Ara Més (no dice que deba superar al estatal; ERC, PNV, BNG y
EH Bildu, +2, lo dicen); q33 −1 como el Frente Amplio y Adelante Andalucía; q35 −2 como el PNV y el BNG; q36 +1 condicionado
(PP y Vox, +2). Entre pasos: junts-01 ↔ q23 +2, junts-09 ↔ q17 +2 y junts-02/q03 (la rebaja del IVA está en el mismo objetivo)
son coherentes; q08 sigue en null con junts-08 como pnv-08 con el null del PNV en q08 (40 años cotizados no es volver a los 65
para todos), y q05 en null con junts-10 como pp-10 con el null del PP. La única corrección del paso 1 es formal: `sustituye.nota`
de q03 y q24 copia la nota de la celda null de su grupo de origen (g3 y g7), como pidió la verificación. Ningún valor cambia.

## Hallazgos

1. **Criterio único de la financiación de las jubilaciones sin coeficientes reductores** (junts-08, pnv-08, bng-07): véase la
   sección anterior. Dos valoraciones cambian (junts-08 y pnv-08); bng-07 no, porque la cifra oficial es de otra medida.
2. **psc-c05, financiación: cifras del DORA según el BOE.** Decía que el DORA III «asigna 1.765 M€ a El Prat, de los que 191,25 M€
   son actuaciones preparatorias y compensaciones ambientales». El BOE (BOE-A-2026-19507, 19-9-2026, comprobado el 20-11) da para
   El Prat 1.294,840 M€ en 2027-2031 (anexo 6, el mismo dato que junts-12) y 191,925 M€ para la inversión estratégica
   «Ampliación de pista y nuevo T1S», con un umbral de 134,4 M€ antes de fin de 2031 y finalización en 06/2038 (tabla 5.5); que
   sean actuaciones previas lo dice la prensa, no el BOE. Se corrige el texto con la fuente primaria y las mismas cifras en
   `psc/compromisos/seleccion.json` (descartes del programa del PSOE y de la ampliación), cuyo `seleccion_sha256` pasa de
   d5ddf5b3… a eb4b1a92… en `evaluacion.json` y `revision.json`. La valoración (M) no cambia: el coste sigue siendo
   estimable (unos 3.200 M€ del acuerdo de 2025) y Hereu no dice cómo se pagaría.
3. **vox-09, evidencia: fuerza de la redacción.** Decía que, según el Banco de España (2026), la supresión de la deducción en
   2011 redujo las nuevas hipotecas «sin efecto en los precios de la vivienda»; el estudio (Revista de Estabilidad Financiera 50,
   comprobado) concluye que fue «sin afectar a los precios de la vivienda ni a los tipos de interés a corto plazo», y junts-02 lo
   dice con ese alcance. Se añade «ni en los tipos de interés a corto plazo».
4. **erc-07: mismos hechos que junts-03.** Las dos piden la cesión gratuita a la Generalitat de los inmuebles de la Sareb y
   Casa 47 y tienen las mismas valoraciones, pero junts-03 citaba tres hechos, ya comprobados por su revisión, que erc-07 no
   tenía: la vía de la cesión gratuita de bienes patrimoniales del Estado (Ley 33/2003, arts. 145 a 147, con decisión estatal;
   legal), el valor de mercado oficial de los inmuebles, «en torno a 5.000 millones de euros», con casi una de cada tres viviendas
   en Cataluña (Orden PJC/784/2025, comprobada el 20-11; financiación), y el traspaso de 1985 de la vivienda pública estatal a la
   Generalitat (Real Decreto 1009/1985; antecedentes). Se añaden con sus fuentes; las valoraciones no cambian.

## Otras comprobaciones sin cambios

- Se buscaron en las demás evaluaciones las cifras y fuentes nuevas del programa de Junts (DORA, 70.600 € por mosso, Fedea,
  Orden PJC/784/2025, STC 341/1993, RD 1155/2024, Euronews y Ara sobre el catalán en la UE): solo afectaban a psc-c05 y erc-07.
- Las 8 correcciones de la revisión de Junts (fechas, atribuciones y condiciones legales en junts-03, 06, 07, 11 y 12) son propias
  de sus textos; la de junts-11 (Real Decreto 1598/2010) no contradice a erc-03 ni a psc-c06, que no lo citan.

## Cambios por partido (F/M/D/N)

| Partido | Antes | Después | Cambios |
|---|---|---|---|
| Junts | 3/84/2/7 | 3/85/2/6 | junts-08 financiación N→M (texto y fuente); textos de beneficiarios y largo plazo |
| PNV | 8/71/3/14 | 8/72/3/13 | pnv-08 financiación N→M (texto y fuente); textos de beneficiarios y largo plazo |

Las demás evaluaciones no cambian de recuento (comprobado contra HEAD). Los `recuento_final` de los `revision.json` son los de
cada revisión y no se reescriben; en el de Junts se añade «oficializacion», que deja constancia de la publicación oficial sin
tocar su veredicto.

## Recuentos y comprobaciones

Entradas registradas el 20-11 por esta auditoría: 26 (erc 7, junts 7, pnv 7, psc/compromisos 4, vox 1). `programa_sha256` no
cambia en ninguna evaluación. Cambian dos `seleccion.json`: el del PSC (hallazgo 2) y el del complemento de Junts (solo su
«nota», que decía «pendiente de publicación oficial»), con su `seleccion_sha256` actualizado (Junts: 499f764f… → 305cd43f…).
`verify_quotes` (5.718 citas, 0 no encontradas), `build_web` y los 23 tests: correctos.

## Dudas que quedan

- **Dos valoraciones cambiadas** (junts-08 y pnv-08, financiación). Aplican el criterio único que pidió la revisión de Junts;
  conviene que el editor lo ratifique. La alternativa era mantener «no_verificable» porque la cifra oficial solo cubre a los ya
  jubilados y no las jubilaciones futuras; se descartó porque es la parte principal y cuantificada de la medida, y el texto dice
  lo que no incluye.
- **Antecedentes de junts-08 y pnv-08.** El Español (27-9-2026) dice que el Congreso dio luz verde a tramitar una ley de Podemos
  sobre la jubilación sin coeficientes con 40 años; no aclara la votación ni la fase, y no se ha encontrado en el Congreso. No se
  ha tocado (los textos citan la toma en consideración de 2024, la moción de 2025 y la enmienda rechazada en junio de 2026).
- **junts-02 y vox-09** dan la antigua deducción por vivienda con años distintos (coste de 4.415,36 M€ en 2010 según Funcas y
  más de siete millones de beneficiarios, frente a 2.523,86 M€ y 5.835.414 beneficiarios en 2012 según la Memoria de beneficios
  fiscales). No se contradicen y no se han tocado.
- **pp-03 y vox-08 (internacional)** citan Francia e Inglaterra y dicen que no hay evaluaciones publicadas; junts-01, upn-07 y
  salf-02 citan además la evaluación del WODC de los Países Bajos (2026, por prensa especializada). Misma valoración (M); no se
  ha tocado.
- **Hora de publicación del PDF oficial.** La cabecera Last-Modified da las 18:06 CET y la API de WordPress de tualcentre.cat,
  las 19:06 (probablemente en otra zona horaria); se recogen las dos en `fecha_fuente`.
