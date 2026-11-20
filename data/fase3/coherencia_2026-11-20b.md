# Auditoría de coherencia tras el análisis del programa de UPC (Fase 3, 20-11-2026, segunda)

Alcance: las 12 propuestas del programa de Unidad del Pueblo Canario (`data/programas/upc/evaluacion.json`, commit 6bc433a,
aprobado por su revisión del 20-11) y su complemento (upc-c01, `upc/compromisos/`), comparadas criterio por criterio con las
propuestas equivalentes publicadas de los demás partidos (`*/evaluacion.json` y `*/compromisos/evaluacion.json`), en las dos
direcciones; y las tres dudas que la revisión de UPC dejó para esta auditoría (upc-02, upc-03 y upc-07). Las posiciones del
paso 1 (g21) quedan fuera: las verifica otro trabajo en curso sobre `data/fase1/`, que esta auditoría no toca. Regla: mismos
hechos, mismas cifras, mismas fuentes primarias, misma fuerza en la redacción y misma valoración; hechos distintos,
valoraciones distintas explicadas en el texto. Cada dato que se cambia se comprobó el 20-11 en la fuente primaria (BOE: Ley
19/1994, Ley 31/2022, Ley 7/2024 y STC 79/2024; INE; OCDE; La Moncloa; ICAI). Cada corrección figura en el `revision.json` del
partido, en `cambios`, con `fecha` 2026-11-20 y motivo «auditoría de coherencia (20-nov, tras el análisis del programa de
UPC)…»; `aprobado` no cambia. Los textos de `evaluacion.json` no comparan partidos.

**Ninguna valoración cambia.** Las correcciones son de texto, cifras o fuentes: UPC (upc-03, 04, 07, 10 y 12) y CC (cc-09).

## Dudas de la revisión de UPC

**upc-03: ¿el 9 % es por comunidad o estatal?** El programa (p. 3) obliga a «las CCAA y las administraciones locales» a una
política de vivienda pública «para dotarnos así de un parque de vivienda pública que alcance al menos el 9% del parque
residencial (hoy apenas llega al 2% en las Islas)». La comparación con el 2 % de las islas indica que la meta se mide al menos
en Canarias, y la obligación se dirige a todas las comunidades. Las dos lecturas no cambian la valoración: si el 9 % se exige a
cada comunidad, el conjunto de España también llega al 9 %, de modo que la referencia estatal (1,5 millones de viviendas, Banco
de España, medida sobre hogares) es una cota inferior. Se añaden las dos cifras con el Censo de 2021 (INE, tabla 59521,
consultada el 20-11): en Canarias, 1.088.700 viviendas (551.237 en Las Palmas y 537.463 en Santa Cruz de Tenerife), de modo que
el 9 % son unas 98.000 viviendas públicas, unas 76.000 más que con el 2 %; en España, 26.623.708 viviendas, unos 2,4 millones al
9 %, unos 2,1 millones más que las 318.000 actuales (cálculos propios). Financiación sigue «mixta» (coste estimable, sin
financiación).

**upc-02: ¿los cinco o siete años son del contrato inicial o de cada renovación?** Se mantiene la lectura de la evaluación
(periodos de renovación). La frase dice «renovación automática […] tras finalizar su periodo inicial (por periodos de 5 o 7
años…)»: «renovar por periodos de» es la construcción de la renovación, el plural encaja con renovaciones sucesivas, y la
duración inicial de cinco o siete años ya es la de la Ley de Arrendamientos Urbanos desde 2019, así que leerla como contrato
inicial dejaría la renovación sin duración y repetiría la ley vigente. El esquema coincide con el del Real Decreto-ley 28/2026
(art. 10.1 de la LAU en su redacción: tras un mínimo de cinco o siete años, prórroga «por plazos sucesivos de cinco años, o
siete años si el arrendador fuese persona jurídica»; comprobado en la copia del BOE del repositorio). Sin cambios.

**upc-07: concreción «favorable», caso límite frente a cc-09.** Se mantiene «favorable», por el mismo motivo que cc-09: el
porcentaje, el ámbito y el instrumento están definidos y son en su mayor parte vigentes, de modo que no necesitan plazo. Se
comprobó en el BOE que la «partida de crédito ampliable» que pide el programa ya existe: los créditos 17.32.441N.481
(bonificación marítima, incluidos los traslados interinsulares) y 17.34.441O.483 (tráfico aéreo regular) son ampliables en el
anexo II de la Ley 31/2022 (Presupuestos de 2023, prorrogados). La única parte nueva es el 75 % en el marítimo interinsular, que
la ley fija en el 50 % (art. 6.1.a de la Ley 19/1994) y para la que el programa no da plazo, como cc-09 no detalla su parte
nueva (la supervisión de tarifas). El texto de concreción dice ahora por qué es «favorable» y qué queda sin plazo. La
alternativa era «mixta» por falta de plazo, como upc-05 (SMI) o upc-04 (pensiones); se descartó porque allí la parte nueva es
la principal y aquí es accesoria a una medida en vigor.

## Parejas comparadas

| UPC | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| upc-01 (vivienda, derecho fundamental) | podemos-12, psoe-05, compromis-07, adelante_andalucia-11 | financiación N frente a M en podemos-12: criterio único del 18-11, punto 3 (coste principal no estimable) | Art. 168, 220,8 M€ (Interior), reformas de 1992, 2011, 2024 y 2026, Chilton y Versteeg (2016 y 2017), iguales. Sin cambios. |
| upc-02 (control de precios y renovación por cinco o siete años) | eh_bildu-01, compromis-02, podemos-01, compromis-c02 | iguales con eh_bildu-01 (8/8) | RDL 28/2026 y 29/2026, STC 79/2024, 26/2025 y 89/1994, derogación del 12-11-2026, 16,7 %, Diamond y otros, Jofre-Monseny y otros, iguales. Duda resuelta arriba. Sin cambios. |
| upc-03 (parque público del 9 % y cesión de vacías) | frente_amplio-01, frente_amplio-02, podemos-03, bng-03, psoe-02, compromis-03 | legal M frente a F en frente_amplio-01 y bng-03 (justificada: impone obligaciones a comunidades y ayuntamientos y una expropiación del uso); financiación M como frente_amplio-01 y bng-03 | 318.000 viviendas, 1,5 millones, 2.230 €/m², 7.000 M€, SSTC 93/2015 y 16/2018, iguales. STC 79/2024: **hallazgo 1**. Alcance del 9 %: duda resuelta arriba (**hallazgo 2**). |
| upc-04 (pensiones con el IPC en la Constitución) | psoe-05, compromis-07, frente_amplio-10, upn-06 | iguales con psoe-05 y compromis-07 (legal y financiación M, beneficiarios F) | 14.540 M€, 9,6 millones, 708.267, AIReF (3,0 %), arts. 167 y 168, iguales. Subida de 2026: **hallazgo 3**. |
| upc-05 (SMI de 1.800 € en doce pagas) | podemos-08, frente_amplio-08, psoe-04, bng-05 | iguales con podemos-08 (8/8) | 735,90 €, 1.221 €, 17.094 €, 18.004 €, 24.497 €, 173,6 M€, 2,5 millones, Directiva 2022/2041 y C-19/23, iguales. Sin cambios. |
| upc-06 (REF fuera del sistema, insularidad y pobreza) | cc-02, cc-03, ara_mes_fa-09, psoe-08, compromis-11 | legal F y financiación M como cc-02 y cc-03; antecedentes M y beneficiarios M justificados en la revisión | 20.975 M€, 1.337 M€, 2.258.866 residentes, art. 166.3 del Estatuto, Fedea, Portugal y Australia, iguales. Sin cambios. |
| upc-07 (75 % para residentes con crédito ampliable) | cc-09 | iguales (8/8) | 765 M€ (CNMC), AIReF (47 %, 12 %, 14 %, 125 %), Madeira y Azores, iguales. Art. 6 de la Ley 19/1994 y créditos ampliables: **hallazgo 4** (también en cc-09). |
| upc-08 (moratoria turística) | ara_mes_fa-08 (techo de vuelos) | — (medidas distintas) | Sin equivalente directo. Sin cambios. |
| upc-09 (tasa turística para no residentes) | — | — | Sin equivalente. 15,7 millones de turistas internacionales en Canarias en 2025 (Frontur), cifra que coincide con la de Baleares en ara_mes_fa-08 (comprobado en Frontur: las dos comunidades recibieron 15,7 millones). Sin cambios. |
| upc-10 (grandes fortunas, banca y energéticas) | bng-09, erc-12, eh_bildu-09, frente_amplio-07, adelante_andalucia-05, psoe-07 | iguales con bng-09 (8/8) | 1.695 y 1.164 M€ (La Moncloa, 27-9-2024, fecha comprobada), 623, 37 y 19 M€, 12.010 contribuyentes, STC 170/2023, RDL 10/2024, iguales. Vigencia del impuesto bancario: **hallazgo 5**. |
| upc-11 (mediana con Marruecos) | — | — | Sin equivalente. Sin cambios. |
| upc-12 (0,7 % de los Presupuestos para cooperación) | psoe-12, frente_amplio-12 | iguales (8/8) | 4.116 M€ de la AGE, 0,26 % del CAD, cuatro países por encima del 0,7 %, Doucouliagos y Paldam, Clemens y otros, iguales. Galiani y otros, Reino Unido y serie de la OCDE: **hallazgo 6**. |
| upc-c01 (zonas tensionadas declaradas por los ayuntamientos) | compromis-c02, podemos-01, ara_mes_fa-07, pp-09 | legal M como compromis-c02 | Art. 18 de la Ley 12/2023, STC 79/2024, 301 municipios, Jofre-Monseny y otros, Diamond y otros, iguales. Sin cambios. |

## Hallazgos

1. **upc-03, encaje legal: qué anuló la STC 79/2024.** Decía que la sentencia anuló el art. 16 de la Ley 12/2023, «que imponía
   la protección permanente de la vivienda protegida», y que por eso el Estado no puede «obligarles a alcanzar un porcentaje».
   Según el fallo (BOE, comprobado el 20-11), anuló además el tercer párrafo del art. 27.1 (qué bienes de las demás
   administraciones forman parte de sus parques públicos) y el art. 27.3 (destino obligatorio de ciertos ingresos a esos
   parques), los preceptos más cercanos a la obligación que propone el programa y los que cita bng-03. Se añaden, se dice que el
   art. 16 regulaba con detalle la vivienda protegida, y la imposibilidad de imponer un porcentaje se presenta como inferencia
   («chocaría con esa doctrina»), porque la sentencia no lo dice expresamente. La valoración (M) no cambia.
2. **upc-03, financiación: alcance del 9 %.** Véase la primera duda. Se añaden las cifras de Canarias y de España con el Censo de
   2021 y su fuente; la valoración (M) no cambia.
3. **upc-04, antecedentes: la subida de las pensiones de 2026.** Decía solo que la subida del 2,7 % «se convalidó el 26-2-2026»;
   psoe-05 y compromis-07 dicen además que el decreto de diciembre de 2025 no se convalidó y que el Gobierno la aprobó de nuevo
   el 3-2-2026. Comprobado en La Moncloa (3-2-2026: el real decreto-ley «recupera la subida aprobada en diciembre de 2025 que
   no se convalidó»; 26-2-2026: convalidación del Real Decreto-ley 3/2026). Se añade con su fuente; la valoración no cambia.
4. **upc-07 y cc-09: el art. 6 de la Ley 19/1994 y los créditos ampliables.** Las dos decían que para el marítimo interinsular
   «la ley estatal fija un porcentaje inferior»; el art. 6.1.a fija el 50 % (comprobado en el BOE), lo que resuelve la duda que
   dejó la auditoría del 8-11 («el porcentaje estatal en los trayectos interinsulares sigue sin comprobarse»). upc-07 decía que
   llevarlo al 75 % «requiere modificar la ley o los Presupuestos»; el art. 6.2 autoriza además al Gobierno, oído el de Canarias,
   a aumentar las compensaciones, y se dice en las dos. Y la partida de crédito ampliable que pide el programa ya existe (anexo
   II de la Ley 31/2022, prorrogada): se dice en concreción, encaje legal y financiación de upc-07 y en financiación de cc-09.
   Ninguna valoración cambia (upc-07 y cc-09: legal F, financiación M, concreción F; véase la tercera duda).
5. **upc-10: vigencia del impuesto bancario.** Decía que el impuesto sobre el margen de intereses y comisiones «rige desde 2024»;
   la Ley 7/2024 lo aplica a los tres primeros periodos impositivos desde 2024 (disposición final novena, apartado diecinueve;
   texto consolidado sin cambios desde el 23-1-2025, comprobado el 20-11), es decir, hasta 2026, como dice bng-09 («para
   2024-2026»). Como el programa pide «mantener» ese impuesto, se dice en encaje legal que mantenerlo después de 2026 exige una
   ley, y en antecedentes, el periodo. La valoración (legal F) no cambia.
6. **upc-12: mismos hechos que psoe-12 y frente_amplio-12.** Las tres comparten cifras, pero upc-12 no citaba tres hechos que
   aquellas tienen, ya comprobados por sus revisiones y de nuevo el 20-11: el estudio cuasi experimental de Galiani y otros (2017),
   con un efecto positivo de la ayuda sobre el crecimiento (evidencia); la meta legal del 0,7 % en el Reino Unido (2015), su
   rebaja al 0,5 % en 2021 y al 0,3 % prevista para 2027, y la evaluación independiente que concluye que tratarla como suelo y
   techo anual obligó a ajustes a final de año (ICAI, 12-3-2026; internacional y largo plazo), el caso documentado más cercano
   al suelo de gasto que propone UPC; y la serie de la OCDE (0,46 % de la renta en 2009, 0,12 % en 2015 y 0,27 % en 2025;
   antecedentes). Se añaden con sus fuentes; las valoraciones no cambian. upc-12 sigue midiendo el coste sobre los Presupuestos
   (4.085 o 3.155 M€ con el presupuesto consolidado de 2023), porque el programa habla del 0,7 % «de los Presupuestos Generales
   del Estado» y no de la renta nacional bruta, y psoe-12 y frente_amplio-12 sobre la renta (7.190 M€ más); la diferencia es de
   la medida y la explica el texto de concreción.

## Otras comprobaciones sin cambios

- Se buscaron en las demás evaluaciones las cifras y fuentes de las 12 propuestas de UPC (15,7 millones de turistas, Impactur,
  C-388/01, Ley balear 2/2016, Simancas, STC 209/2015, Ley 44/2010, Ley 15/1978, Chilton y Versteeg, 26,8 %, 318.000 viviendas,
  2.230 €/m², 1.337 y 20.975 M€, 765 M€, STC 170/2023, 12.010 contribuyentes, 14.540 M€, 708.267): coinciden donde aparecen.
- Las 3 correcciones de la revisión de UPC (upc-08 concreción, upc-03 financiación y la fuente de upc-12) son propias de sus
  textos y no afectan a otros partidos.
- Criterio único del coste de las reformas constitucionales (18-11): upc-01 (art. 168, coste principal no estimable) sigue
  «no_verificable» y upc-04 (art. 167 o 168 sin definir; coste principal, las pensiones) «mixta», como psoe-05 y compromis-07.
  Criterio de estimaciones oficiales en prensa (20-11): ninguna propuesta de UPC se apoya en una cifra oficial que solo conste en
  prensa sin el documento primario, salvo los 765 M€ de la CNMC (vía elDiario.es), igual que cc-09. Competencias autonómicas:
  upc-03, upc-08, upc-09 y upc-c01 lo dicen en «Encaje legal», como las demás evaluaciones de medidas autonómicas.

## Cambios por partido (F/M/D/N)

| Partido | Antes | Después | Cambios |
|---|---|---|---|
| UPC | 11/82/0/3 | 11/82/0/3 | textos y fuentes de upc-03 (legal, financiación), upc-04 (antecedentes), upc-07 (concreción, legal, financiación), upc-10 (legal, antecedentes) y upc-12 (evidencia, internacional, antecedentes, largo plazo) |
| CC | 12/70/4/10 | 12/70/4/10 | textos y fuente de cc-09 (legal, financiación) |

Las demás evaluaciones no cambian. Los `recuento_final` de los `revision.json` son los de cada revisión y no se reescriben.

## Recuentos y comprobaciones

Entradas registradas el 20-11 por esta auditoría: 28 (upc 24, cc 4). `programa_sha256` no cambia en ninguna evaluación y no
cambia ningún `seleccion.json`. `verify_quotes` (5.796 citas, 0 no encontradas), `build_web` y los 23 tests: correctos.
`build_web` regeneró `data/fase1/fase1.json` con el grupo g21, cuya verificación (`verificacion_g21.json`, aprobada) había
dejado ya en el árbol el trabajo sobre el paso 1; esta auditoría no editó ningún fichero de `data/fase1/`.

## Dudas que quedan

- **Porcentaje que se aplica hoy en el marítimo interinsular.** La ley estatal fija el 50 % y el Parlamento de Canarias pidió en
  marzo de 2026 un 75 % «con vigencia indefinida desde el 1 de julio de 2026» (BOPC 91); no se ha comprobado si el Gobierno lo
  elevó después por la vía del art. 6.2, ni el complemento autonómico del Decreto 222/2000. Los textos dicen solo lo que fija la
  ley.
- **Fuente de Focus 2030 en upc-12.** upc-12 cita el resumen de Focus 2030 en v1.focus2030.org (abril de 2026) y psoe-12 y
  frente_amplio-12 en focus2030.org (9-4-2026); es el mismo artículo y las cifras coinciden. No se ha tocado.
- **«Unas 60 medidas» en `partidos.json`** (duda de la revisión de UPC, fuera del alcance de esta auditoría): no se ha tocado.
