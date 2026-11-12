# Auditoría de coherencia entre los seis programas (Fase 3, 12-11-2026)

Alcance: las 576 valoraciones (CC, ERC, BNG, PNV, PP y SALF; 12 propuestas × 8 criterios). Regla:
mismos hechos, misma valoración; hechos distintos, valoraciones distintas explicadas en el texto. Cada
cambio figura en el `revision.json` del partido, bajo la clave `coherencia_2026-11-12`. Los textos de
`evaluacion.json` no comparan partidos; las comparaciones solo aparecen aquí y en los motivos.

## Parejas comparadas

- **Desalojo de ocupantes en 48 horas (pp-03 y salf-02).** Concreción, encaje legal, financiación,
  internacional, antecedentes, beneficiarios y largo plazo coinciden («mixta», salvo financiación
  «no_verificable» en ambas). En encaje legal ambas son «mixta». pp-03 prevé orden judicial. salf-02 no
  dice si la habría, y sin ella el desalojo policial chocaría con el art. 18.2 CE.
  - **Evidencia: pp-03 «no_verificable» y salf-02 «mixta».** Se mantiene, porque los diseños difieren.
    Los estudios de salf-02 (Casas-Arce y Saiz; Mora-Sanguinetti) miden la ejecución de los contratos de
    alquiler, que corresponde a su parte de lanzamiento por impago en 30 días. pp-03 trata solo la
    ocupación, y no hay evaluaciones de las leyes contra la ocupación.
  - **Beneficiarios.** pp-03 decía que no había cifra verificada de casos, mientras que salf-02 usaba la
    del CGPJ y la de Interior. Se añaden a pp-03 las mismas cifras. La valoración sigue en «mixta» porque
    el coste no está cuantificado.
- **Cuota cero de autónomos (pp-11 y salf-10).**
  - **Encaje legal: pp-11 «favorable» y salf-10 «mixta».** Se mantiene. pp-11 modifica la reducción del
    art. 38 ter del Estatuto del Trabajo Autónomo. salf-10 suprime toda cotización sin definir cómo se
    mantendrían las pensiones contributivas (arts. 205, 209 y 318 LGSS, y art. 41 CE).
  - **Financiación (ambas «mixta»).** Es coherente con la rúbrica. pp-11 no dice cómo se paga. salf-10 lo
    cuantifica con una partida sin respaldo oficial (véase la rúbrica).
  - **Internacional: salf-10 pasa de «no_verificable» a «mixta».** Su propio texto describía una
    aplicación parcial: en el Reino Unido, la clase 2 se considera pagada sin abonarse, aunque se mantiene
    la clase 4. Es la misma regla que en pp-11 (Alemania, «mixta»).
  - **Beneficiarios: pp-11 pasa de «mixta» a «favorable».** El estudio de la AIReF ya citado da unos
    600.000 beneficiarios de la tarifa plana en 2018. Con 960 € por beneficiario, el coste está
    cuantificado con el mismo grado de aproximación que en salf-10 («favorable»).
- **IRPF (pp-10, salf-04 y erc-09).**
  - **Encaje legal («favorable» en las tres) y beneficiarios («mixta» en las tres).** Son coherentes.
  - **Financiación.** pp-10 es «mixta»: el coste de la deflactación se conoce (0,1 % del PIB) y la
    rebaja se financia con el fraude, sin cifras. salf-04 es «mixta» por la nueva rúbrica. erc-09 es
    «no_verificable» porque no hay ninguna cifra de coste. Es la regla de la auditoría del 8-11.
  - **Evidencia.** pp-10 es «mixta»: hay evidencia sobre la indexación. salf-04 es «no_verificable»: no
    hay evaluaciones de un mínimo exento de esa cuantía. Es coherente.
- **Financiación de todo el conjunto.**
  - Solo SALF cuantifica la financiación con partidas propias: salf-01, -04, -08 y -10 son «mixta» por la
    nueva rúbrica. salf-03 es «desfavorable», porque los decomisos oficiales la contradicen. salf-05 es
    «no_verificable», porque el coste no es estimable.
  - Ningún otro programa presenta una financiación cuantificada. pp-01 y pp-10 anuncian ahorros o
    ingresos sin cifras. En bng-07 el programa nombra las fuentes de financiación sin cuantificarlas,
    pero se mantiene «no_verificable» porque no hay una estimación del coste de la medida.
  - Las medidas regulatorias con un efecto fiscal sin estimar son «no_verificable» en todos los
    partidos: cc-06, bng-02, pp-02, pp-03, salf-02 y salf-06.
- **Encaje legal con reforma constitucional.**
  - **Son «desfavorable»** las medidas cuyo diseño definido la exige: erc-04, bng-01 y salf-11 (dos
    tercios para reformar una ley; STC 5/1981). También lo son las que chocan con el Derecho de la UE en
    su núcleo: cc-06 y salf-06.
  - **Son «mixta»** las que dependen de un diseño no definido o tienen partes viables: pnv-11 (garantías
    sin concretar; concreción «desfavorable»), salf-02, salf-05 y salf-01. La pareja pnv-11 y salf-11 se
    mantiene por esta diferencia de definición.
- **Internacional: aplicación parcial.**
  - **bng-01 pasa de «no_verificable» a «mixta».** La gestión por los Länder del impuesto sobre la renta
    y del IVA (art. 108 de la Ley Fundamental) es comparable con la parte de recaudación de la propuesta,
    como en erc-10. Así se aplica la regla usada después en pp-10 y salf-11: si un caso extranjero cubre
    solo parte del diseño, corresponde «mixta». Esto rectifica la decisión de la auditoría del 8-11.
  - El resto de «no_verificable» en este criterio no cita ninguna aplicación comparable: cc-02, cc-12,
    erc-05 y bng-11.
- **Salidas de la OTAN y de la UE (bng-12 y salf-12).** Las diferencias en internacional y largo plazo
  se mantienen, porque solo existe un caso de salida evaluado: el Brexit.

## Cambio de rúbrica (`criterios.json`, financiación, «mixta»)

> Coste conocido o estimable, pero el programa no explica cómo se paga, lo explica sin cuantificar, o
> cuantifica una financiación cuya partida principal no respalda ni contradice ninguna fuente oficial
> (dígase en el texto).

Antes la rúbrica no preveía este caso. «Favorable» sigue exigiendo una financiación verosímil, y
«desfavorable», una financiación contradicha por fuentes oficiales. Aplicada a las 72 propuestas, no
cambia ninguna valoración: solo SALF presenta financiación cuantificada, y ya estaba en «mixta» tras su
revisión.

## Real Decreto-ley 29/2026: convalidado

- La Diputación Permanente lo votó el 12-11-2026 (orden del día de la sesión n.º 10). La ficha oficial
  del Congreso (iniciativa 130/000060) lo da por «Concluido - (Convalidado)» desde el 12-11-2026.
- El Real Decreto-ley 28/2026 (130/000059) quedó «Derogado».
- El Real Decreto-ley 26/2026, cuyo art. 2 ya suspendía desahucios de personas vulnerables, fue derogado
  el 2-10-2026 (BOE-A-2026-20526).
- A 12-11-2026 el BOE todavía no ha publicado la resolución de convalidación: se revisaron los sumarios
  del 7-10 al 12-11.
- Se actualizan salf-02 (antecedentes) y pnv-01 (antecedentes). Encaje legal y financiación de salf-02
  no cambian.

## Cambios por partido (F/M/D/N)

| Partido | Antes | Después | Cambios |
|---|---|---|---|
| CC | 12/70/4/10 | 12/70/4/10 | — |
| ERC | 8/80/2/6 | 8/80/2/6 | — |
| BNG | 11/70/3/12 | 11/71/3/11 | bng-01 internacional N→M (texto y fuente) |
| PNV | 8/71/3/14 | 8/71/3/14 | pnv-01 antecedentes: texto y fuente (convalidación) |
| PP | 12/79/0/5 | 13/78/0/5 | pp-11 beneficiarios M→F (texto, campo y fuente); pp-03 beneficiarios: texto, campo y fuentes |
| SALF | 5/77/6/8 | 5/78/6/7 | salf-10 internacional N→M (texto); salf-02 antecedentes: texto y fuentes |

`verify_quotes`: 1.394 citas comprobadas, 0 no encontradas. `build_web` y los tests: correctos.
`revision.json` no guarda el hash de `evaluacion.json`: `build_web` solo comprueba `programa_sha256`, que
no cambia.

## Dudas que quedan

- **Resolución de convalidación del RDL 29/2026.** Falta su publicación en el BOE; conviene añadirla
  como fuente cuando salga.
- **Lanzamientos de 2025 (salf-02).** La nota del CGPJ da 24.540 lanzamientos en la entradilla y 25.540
  en el cuerpo. Los componentes suman 24.540 (18.317 + 4.346 + 1.877), pero los porcentajes (71,7 % y
  17 %) cuadran con 25.540. salf-02 usa 24.540.
- **Cifra de Interior (pp-03 y salf-02).** Los 14.875 hechos de allanamiento o usurpación se citan a
  través de la OCU. El portal estadístico de Interior devolvió 403.
- **salf-04, beneficiarios («mixta») frente a salf-10 («favorable»).** Se mantiene: el coste de salf-04
  es la cifra del programa, contrastada solo en orden de magnitud, y su reparto entre el Estado y las
  comunidades no está cuantificado. Es un caso frontera.
- **SALF: campos sin actualizar en `revision.json`.** El `recuento_final` es el de la revisión
  (5/77/6/8), y la duda sobre el RDL 29/2026 sigue anotada en `dudas`. Ambas cosas quedan superadas por
  esta auditoría.
