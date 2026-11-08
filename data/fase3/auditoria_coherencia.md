# Auditoría de coherencia entre partidos (Fase 3, CC · ERC · BNG)

Fecha: 2026-11-08. Alcance: las 288 valoraciones (3 partidos × 12 propuestas × 8 criterios) de
`data/programas/{cc,erc,bng}/evaluacion.json`. Regla: los mismos hechos deben recibir la misma
valoración en todos los partidos. Cada cambio figura en el `revision.json` del partido con el motivo
«auditoría de coherencia: …». Los textos de `evaluacion.json` no comparan partidos; las comparaciones
solo aparecen aquí y en los motivos de los cambios.

## Qué se hizo

1. Se construyó la tabla de las 288 valoraciones y se agruparon las propuestas comparables.
2. En cada grupo y criterio se comprobó que la valoración se sigue de las fuentes citadas y de la
   rúbrica de `criterios.json`. Cuando dos propuestas comparables tenían valoraciones distintas, se
   decidió cuál respaldaba la evidencia en cada caso.
3. Las revisiones de CC y ERC eran anteriores a las rúbricas de «internacional» y «beneficiarios» y a
   la nota de financiación (medidas sin coste directo relevante y documentado → favorable), así que
   se reaplicaron a sus 24 propuestas. La revisión del BNG ya las aplicaba.
4. `python3 -I pipeline/verify_quotes.py`: 790 citas comprobadas, 0 no encontradas.

## Criterios de lectura de las rúbricas fijados en la auditoría

- **Internacional.** «No se ha consultado una fuente» describe el alcance de la búsqueda y no
  equivale a «no se conoce aplicación comparable». Se buscó la aplicación y se valoró con la rúbrica.
  Si el caso extranjero difiere en el elemento clave del diseño, no basta para «favorable» ni para
  «desfavorable», sino que corresponde «mixta». Así se resolvió cc-07 en la revisión de CC y ahora,
  en sentido simétrico, erc-03.
- **Beneficiarios.** «Favorable» exige cuantificar con fuentes los dos lados: quién se beneficia y
  cuánto cuesta a quien paga. Si falta uno de los dos, corresponde «mixta».
- **Financiación.** «Desfavorable» exige una financiación contradicha por fuentes oficiales o un coste
  documentado incompatible con las reglas fiscales. Si no hay ninguna cifra de coste, corresponde
  «no_verificable», no «mixta».

## Grupos comparados y decisiones

### 1. Soberanía fiscal y recaudación propia: bng-01 · erc-10 · (erc-01)

- **Encaje legal: bng-01 «desfavorable» frente a erc-10 «mixta».** Se mantienen las dos, porque los
  diseños son distintos.
  - erc-10 pide que la Agencia Tributaria de Cataluña recaude los impuestos estatales. El art. 156.2 CE
    prevé expresamente que una comunidad actúe como «delegada o colaboradora del Estado» en la
    recaudación. Hacen falta reformas legales y no hay precedente, de ahí «mixta».
  - bng-01 pide un concierto económico con cupo y bilateralidad. La STC 76/1988 (FJ 9) sitúa los
    conciertos en el núcleo de la garantía foral de la disposición adicional primera.
  - La STC 158/2019 (FJ 4) declara que esos derechos históricos solo corresponden al País Vasco y
    Navarra, que «no son por tanto extensibles a otras comunidades autónomas» y que extenderlos es
    inviable con cualquier instrumento normativo.
  - Con esa doctrina, la reforma constitucional ya no depende de la interpretación, como decía el texto
    anterior, y se mantiene «desfavorable». El texto de bng-01 se reescribe con las dos sentencias y
    precisa que la parte de recaudación, por sí sola, sí cabe en el art. 156.2.
- **Internacional: bng-01 «no_verificable» frente a erc-10 «mixta».** Se mantienen. El caso alemán
  (los Länder administran impuestos con leyes federales comunes) es comparable para la gestión
  tributaria, pero no para un modelo de cupo bilateral, que define bng-01.
- **erc-01 frente a cc-03 (financiación autonómica).** En encaje legal, erc-01 es «mixta» y cc-03
  «favorable», y la diferencia está justificada: cc-03 encaja en el procedimiento multilateral del CPFF
  ya aprobado, y erc-01 añade la ordinalidad, que el TC no consideró vinculante en 2010. En
  beneficiarios ambas son «favorable». En internacional:
  - cc-03 pasa a «mixta»: Portugal incluye la ultraperiferia y las islas habitadas en su fórmula, y la
    Productivity Commission australiana (2018) evaluó la nivelación con resultados dispares.
  - erc-01 sigue en «mixta», con el texto completado: la fuente documenta la regla, no sus resultados.
- **cc-02 (REF fuera del sistema).** En beneficiarios pasa de «favorable» a «mixta»: el pagador está
  identificado, pero no hay cifra de los recursos del REF; la nota del Gobierno canario no la da. En
  internacional sigue en «no_verificable», con la fórmula de la rúbrica: Portugal reparte por criterios
  que no aclaran si los recursos propios se descuentan.

### 2. Derogación de la Ley de Seguridad Ciudadana: bng-11 · erc-05

- **Financiación: erc-05 pasa de «mixta» a «favorable».** Es la misma medida con la misma evidencia
  que bng-11 (Anuario de Interior vía Europa Press: 284.512 sanciones, 174 M€): una medida regulatoria
  sin coste presupuestario directo relevante.
- **Encaje legal: bng-11 «favorable» frente a erc-05 «mixta».** Se mantienen, porque el diseño es
  distinto: ERC pide además que, mientras tanto, la ley no se aplique donde hay policía autonómica, y
  eso choca con el art. 149.1.29 CE. La derogación en sí, por ley orgánica, es igual en ambos.
- **Internacional («no_verificable» en ambos), antecedentes, beneficiarios y largo plazo («mixta» en
  ambos).** Son coherentes.
- **Evidencia («mixta» en ambos).** Las razones difieren. En bng-11 hay evidencia revisada por pares
  sobre las pelotas de goma, que solo propone el BNG. En erc-05 solo hay datos descriptivos. Se anota
  como caso frontera y no se cambia.

### 3. Impuestos a grandes fortunas y banca: bng-09 · erc-12

- **Beneficiarios: erc-12 pasa de «mixta» a «favorable».** Es el mismo impuesto y bng-09 ya era
  «favorable». Faltaba el número de pagadores, que está en la nota de Hacienda de 20-9-2023 (12.010
  declarantes, 623 M€). Se aclara también la diferencia con la cifra de la IGAE (619 M€).
- **Encaje legal, financiación, evidencia, internacional, antecedentes y largo plazo.** Las
  valoraciones coinciden y son coherentes.

### 4. Salario mínimo: bng-05 · erc-08

- **Encaje legal («mixta»), evidencia, internacional y beneficiarios.** Son coherentes. La parte de
  salario mínimo propio de la comunidad choca en ambos con el art. 149.1.7 CE.
- **Antecedentes: bng-05 «favorable» frente a erc-08 «mixta».** La diferencia está justificada: el SMI
  estatal se ha subido de forma continuada, y no existe precedente de un salario mínimo autonómico.
- **Financiación: bng-05 «no_verificable» frente a erc-08 «mixta».** No se cambia. Se explica en parte
  por el diseño: ERC fija 1.460 € y el BNG no define su referencia del 60 %. Queda pendiente (véase
  abajo).

### 5. Vivienda: cc-05 · bng-03 · erc-07 · erc-06 · bng-02 · cc-06

- **Fondos públicos de vivienda (cc-05 y bng-03).** Coinciden en todos los criterios relevantes:
  encaje legal «favorable»; financiación, internacional y beneficiarios «mixta».
- **Regulación del alquiler (erc-06 y bng-02).** En encaje legal ambas son «mixta». En financiación,
  erc-06 es «favorable» y bng-02 «no_verificable»: bng-02 incluye la suspensión indefinida de
  lanzamientos, que tiene un precedente de compensación pública cuyo importe no es público. Se
  mantiene.
- **cc-06 (limitar compras de extranjeros).** Su financiación es «no_verificable», coherente con
  bng-02: es una medida regulatoria, pero su efecto en el impuesto de transmisiones no está estimado.

### 6. Ferrocarril de cercanías: erc-03 · bng-10

- **Internacional: erc-03 pasa de «favorable» a «mixta».** La fuente (IGES/TU Berlín, 2008) muestra que
  en Alemania la infraestructura siguió en DB Netz y que la licitación competitiva fue «an essential
  part» de los resultados. La propuesta de ERC traspasa la infraestructura y no prevé licitar. Es el
  mismo criterio que en cc-07: un caso con un diseño distinto en el elemento clave da «mixta». bng-10
  es «mixta» (Oporto, sin evaluación).
- **Encaje legal y financiación.** Las diferencias se justifican por el diseño y por los datos: el
  traspaso de la red de interés general exige el art. 4.3 de la Ley 38/2015, y en el caso de ERC hay
  cifras de contrato.

### 7. Medidas laborales y fiscales sin cuantía: cc-07 · erc-09 · bng-06

- **Financiación: cc-07 pasa de «desfavorable» a «no_verificable».** No hay una financiación
  contradicha ni un coste incompatible con las reglas fiscales, y la cifra de la AIReF es de otro
  instrumento. Con la misma regla, erc-09 y bng-06 son «no_verificable».

### 8. Energía: cc-08 · bng-08

- **Financiación: cc-08 pasa de «mixta» a «no_verificable».** No hay ninguna cifra de coste, como en
  bng-08.
- **Beneficiarios: cc-08 pasa de «favorable» a «mixta».** El coste no está cuantificado, como en
  bng-08.
- **Internacional: cc-08 pasa de «no_verificable» a «mixta».** Hawái cerró su central de carbón en
  Oahu y la sustituyó con almacenamiento y renovables. Hay datos de la empresa y del regulador, pero no
  una evaluación independiente.

### 9. Reaplicación de rúbricas al resto de CC y ERC

- **Internacional.**
  - Pasan de «no_verificable» a «mixta», con aplicación comparable y sin evaluación o con resultados
    dispares: cc-01 (regiones belgas y trabajadores extranjeros), cc-04 (OCDE 2023, financiación
    compartida de cuidados de larga duración) y cc-10 (CERA, Nueva Zelanda, auditoría con resultados
    dispares).
  - erc-02 sigue en «mixta». Se añade el informe del Consejo de Estabilidad alemán (Bundestag
    19/20768): los cinco Länder con ayudas condicionadas cumplieron sus requisitos en 2019. Sin esa
    fuente, solo había resultados en contra.
  - cc-12 sigue en «no_verificable», con una fórmula ya conforme a la rúbrica.
- **Beneficiarios.**
  - cc-04 pasa de «favorable» a «mixta»: la aportación adicional no está cuantificada.
  - cc-09 pasa de «mixta» a «favorable»: el reparto según la AIReF y el coste de 765 M€ según la CNMC
    ya estaban en las fuentes. No procede «desfavorable», porque el programa declara beneficiar a los
    residentes y los beneficiarios son residentes.
  - cc-03 sigue en «favorable», y se añade al texto la cuantía.
  - Las demás de CC y ERC ya cumplían la rúbrica.
- **Nota de financiación.** Solo afecta a erc-05. erc-06 ya era «favorable». cc-06 y bng-02 no la
  cumplen, porque tienen un efecto económico no estimado.

## Cambios por partido

- **CC: 13 propuestas-criterio cambiadas** (31 entradas en `revision.json`, contando texto y fuentes).
  - 9 cambios de valoración en internacional y beneficiarios: 5 en internacional y 4 en
    beneficiarios.
  - 2 cambios de valoración en financiación: cc-07 y cc-08.
  - Cambios solo de texto o fuentes en cc-02 y cc-03.
- **ERC: 5 propuestas-criterio cambiadas.**
  - 3 cambios de valoración: erc-05 financiación, erc-03 internacional y erc-12 beneficiarios.
  - 2 cambios de texto o fuente: erc-01 y erc-02 internacional.
  - Se completa también el campo de beneficiarios de erc-12.
- **BNG: 1 cambio de texto y fuentes** (bng-01, encaje legal), sin cambio de valoración.

## Recuento final de valoraciones

| Partido | Favorable | Mixta | Desfavorable | No verificable |
|---|---|---|---|---|
| CC | 12 | 70 | 4 | 10 |
| ERC | 8 | 81 | 2 | 5 |
| BNG | 11 | 70 | 3 | 12 |

## Cuestiones abiertas

- **erc-08, financiación («mixta») frente a bng-05 («no_verificable»).** El texto de ERC no cifra el
  coste. La Generalitat publicó informes sobre un salario mínimo de referencia catalán y su incidencia
  (2019 y 2025), pero el repositorio bloqueó la descarga y no se pudieron leer. Si no cuantifican el
  coste, erc-08 debería pasar a «no_verificable».
- **Evidencia con datos descriptivos y sin evaluación.** erc-05 y cc-11 son «mixta», y podrían
  defenderse como «no_verificable». No se ha fijado una rúbrica de «Evidencia».
- **cc-02, financiación («mixta»).** No hay cifra de los recursos del REF. Es un caso frontera entre la
  nota (sin gasto nuevo) y «no_verificable».
- **Fuentes no leídas en el documento primario.** La auditoría del Auditor General neozelandés
  (oag.parliament.nz devolvió 403) se cita a través de RNZ. El dato de Hawái procede de la empresa
  eléctrica y de prensa especializada.

## Nota del editor (2026-11-08): erc-08 frente a bng-05 (salario mínimo, financiación)
Se mantiene la diferencia porque los diseños difieren: ERC fija una cuantía (1.460 €), con la que el
impacto puede dimensionarse con datos de Idescat; el BNG no define qué salario medio toma como
referencia y, con el salario medio bruto del INE de 2023, el 60 % ya sería inferior al SMI de 2026,
de modo que no hay base para estimar su coste. Mismos hechos → misma valoración; hechos distintos
→ valoraciones distintas, explicadas en cada texto.
