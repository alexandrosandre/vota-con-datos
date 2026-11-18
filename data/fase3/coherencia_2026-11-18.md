# Auditoría de coherencia tras el análisis del programa de Podemos y los complementos de UPN, PP, PSC y ERC (Fase 3, 18-11-2026)

Alcance: las 12 propuestas del programa de Podemos (`data/programas/podemos/evaluacion.json`, commit 872b088) y su
complemento (podemos-c09), y las propuestas de complemento nuevas o cambiadas en el commit 014399b (upn-10, upn-11, pp-c03,
psc-c06 y erc-c01), comparadas criterio por criterio con las propuestas equivalentes publicadas de los demás partidos
(`*/evaluacion.json` y `*/compromisos/evaluacion.json`), en las dos direcciones; las 20 correcciones de la revisión de Podemos,
buscando cada hecho corregido en las demás evaluaciones; y los cuatro puntos que la revisión de Podemos y las de los
complementos del 18-11 dejaron para esta auditoría (a: Leeds en bng-12; b: coste de los referendos y las reformas
constitucionales; c: STC 126/2016; d: motivo del descarte del tren a Foronda en el complemento de EH Bildu). Regla: mismos
hechos, mismas cifras, mismas fuentes primarias, misma fuerza en la redacción y misma valoración; hechos distintos,
valoraciones distintas explicadas en el texto. Cada dato que se cambia se comprobó el 18-11 en la fuente primaria (BOE, Junta
Electoral Central, Tribunal Constitucional, OTAN, Gobierno de España, Gobierno de los Países Bajos, prensa citada solo donde
no hay otra fuente). Cada corrección figura en el `revision.json` del partido (o de su carpeta `compromisos/`), en `cambios`,
con `fecha` 2026-11-18 y motivo «auditoría de coherencia (18-nov, tras el análisis del programa de Podemos y los complementos
de UPN, PP, PSC y ERC)…»; `aprobado` no cambia. Los textos de `evaluacion.json` no comparan partidos.

**Cambian dos valoraciones**, por el criterio único del punto (b): erc-04 y salf-12, financiación, «no_verificable» →
«mixta». Las demás correcciones son de texto, cifras o fuentes.

## Criterio único: coste de los referendos y las reformas constitucionales (punto b)

Situación de partida: el coste de una votación se valoraba «no_verificable» en erc-04 y eh_bildu-11 («No hay base pública»),
«favorable» en las reformas por el art. 167 (adelante_andalucia-11, psoe-10, compromis-c06, upn-01) y «mixta» en podemos-12
(art. 168, cambio de su revisión del 18-11). salf-12 (dos referendos sobre la UE) era también «no_verificable», y upc-03
(vivienda como derecho fundamental, art. 168) decía que «la reforma en sí no tiene coste presupuestario directo».

Hechos comprobados: organizar una votación estatal tiene un coste presupuestario directo relevante y estimable por referencia:
la organización y la logística de las generales de 2023 costaron unos 220,8 M€ según el Ministerio del Interior (Euronews,
8-10-2026; las subvenciones a partidos, 58 M€, son aparte y no existen en un referéndum). Para una votación en toda Cataluña,
la Generalitat contabilizó 35,8 M€ por las elecciones al Parlament de 2021, encarecidas por la pandemia, y 19 M€ por las de
2017 (Ara, 17-5-2021). No se ha localizado una cifra oficial del coste del referéndum de 2005. El art. 168 CE obliga a disolver
las Cortes, celebrar elecciones y un referéndum; el art. 167 solo exige referéndum si lo pide una décima parte de los miembros
de una Cámara en los quince días siguientes a la aprobación (art. 167.3).

Criterio: cuenta el coste de las votaciones que la propuesta **exige necesariamente**.
1. Si exige alguna (art. 168, o un referéndum que el programa propone), su coste es estimable por referencia a votaciones del
   mismo ámbito; si el programa no lo cuantifica ni dice cómo se pagaría, «mixta» (rúbrica: «Coste conocido o estimable, pero
   el programa no explica cómo se paga»).
2. Si no exige ninguna (art. 167 sin solicitud de referéndum, o cuando el programa no fija el artículo y cabe el art. 167),
   «favorable» («sin coste presupuestario directo relevante»), y el texto dice qué votación tendría coste.
3. Si la propuesta no define si habría votación ni de qué ámbito, o si su coste principal es otro y no puede estimarse,
   «no_verificable», y el texto da la referencia de las votaciones que sí exige.

Aplicación:

| Propuesta | Procedimiento | Antes | Después | Cambio |
|---|---|---|---|---|
| podemos-12 | art. 168 (disolución, elecciones, referéndum) | M | M | Sin cambios (cifra 220,8 M€ ya citada). |
| erc-04 | referéndum en Cataluña | N | **M** | Referencia catalana (Ara) y estatal si fuera por el art. 168; fuentes añadidas. |
| salf-12 | uno o dos referendos estatales (art. 92) | N | **M** | Referencia estatal (Interior); fuente añadida. |
| eh_bildu-11 | no define si habría votación | N | N | Se dice por qué no puede estimarse (el programa no dice si habría reforma, ley o referéndum, ni quién votaría). |
| upc-03 | art. 168 | N | N | Se añade el coste del procedimiento con su referencia; sigue N porque el coste principal (un derecho fundamental exigible a la vivienda) no puede estimarse. |
| adelante_andalucia-11, compromis-c06 | art. 167 (como el proyecto de 2026) o 168, sin definir | F | F | No exigen necesariamente votación; se dice el coste del art. 168 con su referencia (antes: «cuyo coste no hemos estimado» y «no tiene coste presupuestario directo»). |
| psoe-10, upn-01 | art. 167 | F | F | «Una reforma constitucional no tiene coste» se acota al art. 167 y se dice cuándo habría referéndum. |
| psoe-05, compromis-07, frente_amplio-10 | art. 167 (art. 50 o Sección 2.ª) | M | M | «Reformar la Constitución no tiene coste por sí mismo» es correcto para el art. 167; su valoración se debe al gasto en pensiones. Sin cambios. |
| pnv-11 | órganos bilaterales, sin votación | N | N | Sin cambios. |

La nota de `podemos/evaluacion.json`, que citaba la diferencia con erc-04 y eh_bildu-11, se actualiza.

## Parejas comparadas

### Podemos (programa y complemento)

| Podemos | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| podemos-01 (rebaja del 40 % de los alquileres) | adelante_andalucia-01, ara_mes_fa-07, eh_bildu-01, bng-02, compromis-c02, compromis-02, upc-02, pp-09 | iguales salvo concreción (justificada en la nota del fichero) | STC 26/2025, STC 37/2022, 301 municipios (La Moncloa), 16,7 % de hogares, Jofre-Monseny y otros, Diamond y otros, Hahn y otros y RDL 29/2026 (IRAV y 2 % hasta 2027), iguales. «con 8,28 millones» frente a «más de 8,28 millones» en adelante_andalucia-01 y pp-09: duda. |
| podemos-02 (comprar solo para residir) | ara_mes_fa-06, compromis-01, bng-c02, eh_bildu-03, cc-06 | legal D como ara_mes_fa-06 y cc-06; M en compromis-01 y eh_bildu-03 (justificada) | RDL 26/2026 y 29/2026 (70 %, vivienda habitual a precio asequible o social), iguales. Países Bajos: hallazgo 5. |
| podemos-03 (expropiar el uso) | frente_amplio-02, frente_amplio-03, psoe-03 | iguales con frente_amplio-02 | Berlín (57,6 %), 8 % de personas jurídicas (Banco de España), STC 166/1986 y déficit de 400.000 viviendas, iguales. Navarra (STC 16/2018): hallazgo 4. |
| podemos-04 (márgenes de alimentos) | ara_mes_fa-03, eh_bildu-08 | legal F como ara_mes_fa-03; M en eh_bildu-08 (justificada: energía) | Art. 13.2.a de la Ley 7/1996, Hungría (FMI) y RDL 20/2022, iguales. Sin cambios. |
| podemos-05 (Repsol) | adelante_andalucia-08, compromis-14 | financiación M frente a N (justificada en el texto: empresa cotizada con precio de mercado) | Art. 128.2 CE, Ley 40/2015 art. 114, Ley de Aguas art. 53.4, EDF (junio de 2023), iguales. Sin cambios. |
| podemos-06 (OTAN, Rota y Morón) | bng-12, salf-12 | iguales con bng-12 | Leeds (punto a), mayoría del art. 74.2 CE y referéndum de 1986: hallazgo 1. |
| podemos-07 (gasto militar) y podemos-c09 | podemos-06, bng-12, podemos-11 | — | STC 126/2016 (punto c): sin otras evaluaciones. Atribución de los 35.419 M€: hallazgo 6. |
| podemos-08 (SMI de 1.800 €) | frente_amplio-08, psoe-04, bng-05, ara_mes_fa-01, upc-08, erc-08, pnv-02, eh_bildu-05 | concreción M como erc-08 | 735,90 €, 1.221 €, 17.094 €, 24.497 € (mediano), 29.540 € (medio), 173,6 M€, 2,5 y 2,47 millones, Directiva 2022/2041 y C-19/23, iguales. SMI de 2027: hallazgo 3. |
| podemos-09 (30 horas) | adelante_andalucia-03, compromis-05, frente_amplio-09, eh_bildu-04, bng-04 | concreción F como eh_bildu-04 y adelante_andalucia-03 | 6,67 %, 12,5 millones, 178 a 170 (10-9-2025), 35 horas en la AGE, jornada pactada (convenios con efectos económicos en 2026), Batut y otros, Portugal y Francia, iguales. Sin cambios. |
| podemos-10 (horas extra) | — | — | Sin equivalente. |
| podemos-11 (fondo de 1.000 M€) | — | — | Atribución del gasto militar: hallazgo 6. |
| podemos-12 (monarquía o república) | erc-04, eh_bildu-11, upc-03, salf-12, adelante_andalucia-11, psoe-10, compromis-c06, upn-01 | legal M como upc-03 (art. 168); D en erc-04 y eh_bildu-11 (justificada) | Financiación: criterio único (punto b). Reformas constitucionales (1992, 2011, 2024, 2026) y art. 168 nunca usado, iguales que upc-03. |
| podemos-c09 (40.000 sanitarios y maestros) | psoe-06, upn-04 | — | Hallazgo 6. |

### Complementos del 18-11

| Propuesta | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| upn-10 (IVA 0 % en alimentos y 10 % en carburantes) | vox-02, ara_mes_fa-03, eh_bildu-08 | — | 1.703 M€ (AEAT), RDL 20/2022, CNMC, recuperación desde octubre de 2024 y Benzarti y otros (2020), iguales que vox-02. Sin cambios. |
| upn-11 (IVA del 4 % en la primera vivienda nueva) | vox-09, salf-01 | legal M en las tres | Directiva (arts. 98.2, 105 bis y 105 ter), Italia (4 %, DPR 633/1972), 14.207 M€ de base, 155.910 compraventas, RDL 9/2011 y 20/2011, Besley y otros, Best y Kleven, iguales. Sin cambios. |
| pp-c03 (voto en su municipio de quienes se fueron por ETA) | — | — | Sin equivalente. |
| psc-c06 (Rodalies con la empresa mixta) | erc-03, junts-02 | iguales | 49,9 % y cinco de nueve consejeros, art. 4.3 de la Ley 38/2015, contrato de 1.407,6 M€, contrato formalizado en octubre de 2026, iguales. Sin cambios. |
| erc-c01 (30 % de la inversión ferroviaria a mantenimiento) | junts-03, psoe-01 | iguales con junts-03 en los ocho criterios | Mismas cifras y fuentes (Agenda Pública, AIReF 2020, 1.120 M€, 1.781 M€ y 475 M€, 547 millones de viajeros). Sin cambios. |

## Hallazgos

1. **bng-12 (OTAN)**, tres correcciones de la revisión de Podemos que bng-12 tenía igual:
   - Evidencia (punto a): «Con datos de 1816-2000, Leeds (2003) y Johnson y Leeds (2011) hallan…» → Leeds (2003) halla que los
     compromisos de defensa reducen la probabilidad de que se inicie una disputa contra sus miembros, y Johnson y Leeds (2011),
     con datos de 1816-2000, lo confirman y no encuentran riesgo de arrastre. Mismo texto que podemos-06.
   - Encaje legal: «autorización previa de las Cortes por mayoría simple» no tiene respaldo; la mayoría la fija el art. 74.2 CE
     (mayoría de cada Cámara y, sin acuerdo tras la Comisión Mixta, el Congreso por mayoría absoluta).
   - Antecedentes: «algo más del 52 %» (El Debate) → 9.054.509 votos, el 52,5 % de los votantes con blancos y nulos, frente a
     6.872.421 en contra (Junta Electoral Central, BOE 2-4-1986, p. 11631, comprobado; se añade como fuente).
2. **Criterio único del coste de las votaciones** (punto b): véase la sección anterior. Dos valoraciones cambian (erc-04 y
   salf-12) y seis textos se corrigen sin cambio de valoración (eh_bildu-11, upc-03, adelante_andalucia-11, compromis-c06,
   psoe-10 y upn-01).
3. **SMI de 2027** (frente_amplio-08, financiación y beneficiarios; ara_mes_fa-01, financiación). Decían que el Gobierno
   «propone» un 5,3 % en un proyecto «en audiencia pública». El Real Decreto-ley 38/2026 (BOE de 18-11-2026, comprobado) dice que
   el Gobierno «ha aprobado el Real Decreto 1013/2026», que fija el SMI de 2027 en «18.004 euros anuales» (+5,3 %, 1.286 € en 14
   pagas): se actualiza como en podemos-08 y se añade la fuente.
4. **Expropiación temporal del uso en Navarra** (frente_amplio-02, legal y antecedentes). podemos-03 cita, junto a Andalucía
   (STC 93/2015) y Cataluña (STC 16/2021), la Ley Foral 24/2013 de Navarra, anulada en ese punto por la STC 16/2018 (BOE
   23-3-2018, comprobada: fallo y FJ 12, «sustancial semejanza con la resuelta en la STC 93/2015», art. 149.1.13 CE).
   frente_amplio-02 la omitía: se añade, con la fuente.
5. **«Opkoopbescherming» de los Países Bajos** (podemos-02 y ara_mes_fa-06, internacional). Daban solo la segunda conclusión de
   la evaluación (no es eficaz para los primeros compradores) y no su conclusión principal ni su alcance; la nota del Gobierno
   neerlandés (publicada el 16-10-2026, comprobada) dice que su valor está «vooral» en preservar la habitabilidad de los barrios y
   que la han usado «ongeveer 70 gemeenten». Se copia la redacción de compromis-01, eh_bildu-03 y bng-c02, y la fecha y el título
   de la fuente en ara_mes_fa-06.
6. **Atribución del gasto militar de 2026** (podemos-11, financiación; podemos-c09, financiación). Decían «con criterio OTAN pasó
   de 17.451 M€ en 2023 a 35.419 M€ en 2026»; 17.451 M€ es la cifra de la OTAN (tabla 1 del informe 2014-2025, comprobada) y
   35.419 M€ la del Gobierno (Spain in NATO Report, julio de 2026, «Own elaboration based on NATO data», comprobado). Se atribuye
   cada una, como en podemos-06 y podemos-07.
7. **STC 126/2016** (punto c). La frase «declaró inconstitucional el uso sistemático del decreto-ley» solo estaba en podemos-07
   (ya corregida por su revisión). Se buscó en todas las evaluaciones, `data/fase1`, `data/promesas` y `docs` («126/2016»,
   «uso sistemático», «práctica habitual», «programas de armamento», «inconstitucional» junto a «decreto»): ninguna otra
   evaluación la repite. Sin cambios.
8. **Tren a Foronda y cercanías de Gasteiz en el complemento de EH Bildu** (punto d). El motivo «ámbito local» (dudas de
   `eh_bildu/compromisos/revision.json` y `eh_bildu/lectura.md`) contradice el criterio único del 18-nov, por el que el ámbito
   local no excluye. Se sustituye por el motivo que aplica ese criterio: cada medida es una sola mención en el cuerpo de la nota
   de EH Bildu Araba del 13-nov, en estilo indirecto («apuesta por dar conexión ferroviaria al aeropuerto de Foronda»; «apuesta
   ahora por […] soterrando el trazado»), cuyo titular y entradilla tratan de optimizar los servicios ferroviarios (copia local
   comprobada). El descarte, que solo constaba en notas, se registra en `descartados` de `seleccion.json` con ese motivo; el
   `seleccion_sha256` de `revision.json` pasa de 2b90acad… a 94dcace0… (no hay `evaluacion.json` en ese complemento).

## Otras comprobaciones sin cambios

Además de las de las tablas: las 20 correcciones de la revisión de Podemos se buscaron en las demás evaluaciones. Las que
afectaban a otras son las del hallazgo 1 (bng-12) y la STC 126/2016 (hallazgo 7); las demás son propias del texto revisado
(art. 307 LCSP, plan de abril de 2025 «se financiaría», 2 % y 2,1 % del PIB, Clements, Gupta y Schiff, Kiel Institute,
Noruega, Guillén, referéndum de 1978, niveles de fuerzas de Rota y Morón).

## Cambios por partido (F/M/D/N)

| Partido | Antes | Después | Cambios |
|---|---|---|---|
| ERC | 8/80/2/6 | 8/81/2/5 | erc-04 financiación N→M (texto y fuentes) |
| SALF | 5/78/6/7 | 5/79/6/6 | salf-12 financiación N→M (texto y fuente) |

Las demás evaluaciones no cambian de recuento (comprobado contra HEAD). Los `recuento_final` de los `revision.json` son los de
cada revisión y no se reescriben.

## Recuentos y comprobaciones

Entradas registradas el 18-11 por esta auditoría: 39 (adelante_andalucia 2, ara_mes_fa 4, bng 4, compromis/compromisos 3,
eh_bildu 1, eh_bildu/compromisos 2, erc 4, frente_amplio 8, podemos 3, podemos/compromisos 1, psoe 2, salf 2, upc/compromisos
2, upn/compromisos 1). `programa_sha256` no cambia en ninguna evaluación. Cambia un `seleccion.json` (EH Bildu, hallazgo 8), con
su `seleccion_sha256` actualizado. `verify_quotes` (5.133 citas, 0 no encontradas), `build_web` y los 23 tests: correctos.

## Dudas que quedan

- **Dos valoraciones cambiadas** (erc-04 y salf-12, financiación). Aplican el criterio único que pidió la revisión de Podemos;
  conviene que el editor lo ratifique. La referencia catalana procede de prensa (Ara, con la contabilidad de la Generalitat) y la
  estatal es el coste de unas generales (Interior, vía Euronews), no el de un referéndum, del que no se ha localizado cifra
  oficial.
- **«con 8,28 millones» (podemos-01) frente a «con más de 8,28 millones» (adelante_andalucia-01, pp-09)** para los habitantes de
  los 301 municipios tensionados (La Moncloa, 29-7-2025): no se ha releído la nota; no se ha tocado.
- **podemos-c09.** Los 24.000 M€ de la candidata se explican como la diferencia entre el presupuesto de Defensa de 2023
  (12.825 M€) y el gasto con criterio OTAN, pero 35.419 − 12.825 = 22.594 M€; no se ha localizado qué cifras comparó.
- **bng-12** da el gasto de 2025 (OTAN) y no el de 2026 (Gobierno) que añade podemos-06; no es incorrecto y no se ha tocado.
- **ara_mes_fa-01 (legal)** cita la Directiva (UE) 2022/2041 sin la sentencia C-19/23, que sí citan psoe-04, bng-05,
  frente_amplio-08 y podemos-08; no cambia lo que se dice de la referencia del 50 % del salario medio y no se ha tocado.
- **Dudas de la revisión de Podemos** que no afectan a otros partidos (Australia por Clayton Utz en podemos-10, cotización de
  Repsol del 12-11, calendario del Convenio con EE. UU. en podemos-06): siguen abiertas. Su `revision.json` no se reescribe (es
  el registro de aquella revisión); su duda de coherencia entre partidos queda resuelta aquí (hallazgos 1, 2 y 7).
