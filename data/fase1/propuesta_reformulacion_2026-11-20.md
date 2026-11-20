# Propuesta de reformulación de las afirmaciones de la fase 1 (20-11-2026)

Detalle por afirmación en `propuesta_reformulacion_2026-11-20.json`. No se ha editado `preguntas.json`.

## Qué se revisa

Un experto en política española señaló tres problemas:

- **(A) Contrapartida oculta.** «Bajar el IRPF» a secas tiene un acuerdo casi general. Lo ideológico es aceptarlo aunque haya menos dinero para servicios públicos.
- **(B) Política mezclada con quién decide.** La respuesta depende de quién gobierna hoy cada nivel.
- **(C) Programa frente a votos.** Va aparte; aquí solo se señalan las votaciones que lo decidirían.

He revisado las 30 afirmaciones y he añadido la cercanía al consenso (V).

## Reglas, iguales en todas las direcciones

- **La contrapartida es un hecho, no una predicción.** Vale una cifra oficial abierta en esta revisión o una identidad aritmética o contable: «se recaude menos», «las empresas paguen lo mismo por menos horas», «lo pagarían todos los contribuyentes», «hasta dos años más de pensión».
- **La misma coletilla para todas las rebajas de impuestos:** «aunque se recaude menos para servicios públicos».
- **La magnitud para los aumentos de gasto:** en euros o en años.
- **No se añade contrapartida si el coste ya es evidente.** En un tope de precios o de alquiler cobra menos quien vende o alquila.
- **Tampoco si el único «coste» es una predicción discutida.** Por ejemplo, el efecto de los topes en la oferta o el efecto fiscal de una regularización. Si es un dato, va al contexto.
- **Formato del enunciado:** 30 palabras como máximo, una sola idea y sin negaciones.

## Resultado

Cambian 10 de 30.

| id | Problema | Nueva redacción | Fuente de la contrapartida |
|---|---|---|---|
| q01 | B | «Fijar por ley un precio máximo para todos los alquileres de vivienda, no solo en las zonas con precios más altos.» | Sin contrapartida (coste evidente; efecto en la oferta, discutido) |
| q03 | A, V parcial | «Rebajar un 60 % el IVA y el impuesto de transmisiones a menores de 40 años que compren su primera vivienda, aunque se recaude menos para servicios públicos.» | Identidad contable |
| q05 | A | «Bajar el IRPF (sin pagar por debajo de 22.000 € al año; 15 % hasta 70.000 € y 25 % por encima), aunque se recaude menos para servicios públicos.» | AEAT: el IRPF recaudó 142.466 millones en 2025 + identidad |
| q06 | A | «Reducir por ley la jornada máxima de 40 a 37,5 horas semanales sin rebajar el salario, de modo que las empresas paguen lo mismo por menos horas.» | Identidad: un 6,67 % más de coste por hora; memoria del proyecto no abierta |
| q08 | A, V parcial | «Volver a la jubilación a los 65 años sin recorte para todos, aunque eso suponga pagar hasta dos años más de pensión a cada jubilado.» | Ley General de la Seguridad Social (LGSS), disp. trans. 7.ª: 67 años desde 2027 |
| q11 | A | «Suprimir poco a poco la financiación pública de los colegios concertados, a los que va uno de cada cuatro alumnos, que tendrían que pagar o ir a la pública.» | Ministerio de Educación: 24,4 % del alumnado (curso 2025-2026) |
| q12 | B | «Suprimir cualquier porcentaje mínimo de clases en castellano en los colegios de las comunidades con lengua cooficial.» | No aplica |
| q18 | A | «Que el Estado asuma unos 83.000 millones de euros de la deuda de las comunidades autónomas, que pasarían a pagar todos los contribuyentes.» | Hacienda: 83.252 millones + identidad |
| q25 | V | Sustituir por «Derogar la ley de amnistía de 2024 para los delitos relacionados con el proceso independentista de Cataluña.» (alternativa: r01) | No aplica |
| q26 | A | «Aumentar el gasto en defensa del 2 % al 3,5 % del PIB en 2035: con la economía de 2025, unos 25.000 millones de euros más al año.» | OTAN: 33.123 millones = 2,00 % del PIB en 2025; cálculo propio |

**Sin cambios: q31, q04, q32, q09, q13, q15, q33, q16, q17, q19, q36, q21, q22, q23, q24, q35, q27, q34, q29 y q30.**

- **q09:** conviene añadir al contexto un dato del Ministerio de Sanidad. Los conciertos con el sector privado suman el 10,0 % del gasto sanitario público (10.143 millones en 2024).
- **q18:** la nota de Hacienda dice que el 19 % es la media de la «primera fase». Por eso «cerca de una quinta parte» no es exacto y se quita.

## Dos afirmaciones nuevas

**n01 (Fiscalidad):** «Es preferible mejorar los servicios públicos y las prestaciones sociales aunque haya que pagar más impuestos, que pagar menos impuestos aunque haya que reducirlos.»

- Toma como modelo la escala 0-10 del CIS (estudio 2.953, julio de 2012, tabla FIS22: https://www.cis.es/documents/d/cis/fis22).
- Mantiene los dos polos para que «en desacuerdo» no signifique «dejarlo como está».
- El JSON incluye una variante redactada en sentido conservador.

**n02 (Modelo territorial):** «Que las comunidades autónomas tengan más competencias que hoy, aunque las normas sobre vivienda, impuestos o educación cambien más de una comunidad a otra.»

- Es útil y neutral como principio: recoge el «quién decide» que se ha quitado de q01 y q12.
- La coletilla es la propia definición de descentralizar.
- Ya hay cinco ítems territoriales, así que propongo que sustituya a q32 en lugar de sumarse.
- No he verificado el cuestionario territorial del CIS.

## Recodificación

Las afirmaciones con más riesgo de cambiar de valor:

- **q01:** PSOE y PSC (hoy +1) defienden las zonas tensionadas, no un tope general. También cambian Compromís, Junts, PNV, EH Bildu y UPC.
- **q03:** los partidos de izquierda hoy en +1 (Frente Amplio, Podemos, Compromís, Ara Més, UPC y ERC) y CC.
- **q12:** PP y Vox pueden pasar de −1 a −2. PSOE, PSC, PNV, EH Bildu y Compromís, hoy sin posición, pasarían a ser codificables.
- **q25:** codificación completa de los 18 partidos, porque cambia de tema.

Riesgo bajo:

- **q05, q06, q08, q11, q18 y q26:** la medida no cambia; solo se hace visible quién la paga.
- **q05:** el PP y Junts pasan a ser codificables. Vox se mantiene, porque su programa ya prevé compensar la rebaja con recortes de gasto.
- **q06, q08 y q26:** el PP no tiene posición codificada, y en q06 y q26 tampoco Junts. En q08 tampoco la tienen PSOE, Vox ni Junts. Sin esas posiciones, el ítem apenas separa a los partidos.

## Votaciones en el Congreso que decidirían la posición (XV Legislatura)

Las que constan en el Diario de Sesiones citado en `fase1.json`:

- **q06:** enmiendas a la totalidad que devolvieron el proyecto de ley de las 37,5 horas (121/000058), en septiembre de 2025.
- **q18:** debate de totalidad del proyecto de asunción de deuda autonómica, el 23-7-2026.
- **q21:** debate de totalidad de la reforma del artículo 43 de la Constitución, el 30-4-2026.
- **q23:** toma en consideración de la ley del PP contra la ocupación, el 19-5-2026.
- **q31:** convalidación del Real Decreto-ley 27/2026, el 2-10-2026.
- **q35:** toma en consideración de la ley del PP y UPN para ampliar la prisión permanente revisable, el 17-3-2026.
- **q26:** moción sobre la reversión del gasto militar, el 10-6-2026.
- **q27:** ley de Vox sobre la Defensa Nacional, el 15-9-2026.
- **q29:** proposición no de ley (PNL) de Sumar contra el acuerdo con Mercosur (161/002913).

Las que solo constan en prensa, sin verificar el desglose de votos:

- **q15:** ILP de regularización extraordinaria, tomada en consideración el 9-4-2024. El PP votó a favor y hoy está en −2: es un caso claro del problema (C).
- **q31:** derogación del Real Decreto-ley 28/2026 por la Diputación Permanente, el 12-11-2026.
- **q36:** PNL del PP sobre las nucleares (febrero de 2025) y enmienda rechazada por 171 a 172 (noviembre de 2025).
- **q25 (nueva):** Ley Orgánica 1/2024 de amnistía.
- **q24:** reforma de la «ley mordaza».
- **q33:** convalidación del Real Decreto-ley 2/2025.
