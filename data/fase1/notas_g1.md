# Notas del codificador A, grupo g1 (PP, UPN-PP, PSOE, PSC, Vox, SALF), 2026-11-08

## Programas oficiales (revisado una vez el 2026-11-08)

No se encontró publicado el programa del 29N de ningún partido del grupo, así que todo
lo codificado tiene `fuente: "campaña"`. No se ha tocado `partidos.json`.

- **PP**: pp.es/actualidad no enlaza programa. Europa Press (7-nov) adelanta textos del
  programa sobre financiación autonómica y anuncia que se presentará el martes 10-nov.
  Hay que recodificar cuando salga.
- **UPN-PP**: upn.org sin programa ni noticias de propuestas de campaña. El acuerdo del
  13-oct solo recoge compromisos navarros (régimen foral, disposición transitoria cuarta,
  infraestructuras) y no dice que UPN asuma el programa nacional del PP.
- **PSOE**: psoe.es devuelve una página vacía (anti-bots). Programa no publicado.
- **PSC**: socialistes.cat devuelve 403. Sin programa, y ninguna fuente dice que el PSC
  concurra con el del PSOE.
- **Vox**: voxespana.es/programa devuelve 403. El Debate (24-oct) dice que se publicará
  «en las próximas semanas».
- **SALF**: seacabolafiesta.com devuelve 403; salf.es es una página «próximo lanzamiento».

## Criterios aplicados

- Solo declaraciones hechas desde el 6-oct-2026. Se descartaron como fuente:
  - las posiciones de Feijóo sobre expulsiones y regularización (enero–julio de 2026);
  - la frase de Feijóo sobre el aborto y la Constitución (octubre de 2025);
  - la crítica de Sánchez a la «prioridad nacional» (abril de 2026);
  - las deportaciones masivas anunciadas por Alvise (octubre de 2025).
- Las síntesis periodísticas sin una declaración fechada no bastan, porque mezclan
  programas anteriores. Es el caso de El Debate, «Las diez propuestas clave de Vox»
  (24-oct). Por eso quedan en null las celdas de Vox q01, q17, q20, q23 y q28.
  Ese artículo solo se usó para Vox q07, que una entrevista a Figaredo en la
  precampaña (101TV) corrobora.

## Celdas dudosas

- **PP q01 (-1)**: es indirecta. El PP propone derogar la Ley de Vivienda, que es la que
  permite limitar rentas en zonas tensionadas, pero no se pronuncia expresamente sobre
  topes.
- **PP q18 (-1)**: el PP dice que «cada comunidad responderá de su deuda», pero también
  propone una «reestructuración» de esa deuda sin detallarla.
- **PP q03 (+1)**: rebaja del 60% del IVA y del ITP, limitada a compradores menores de
  40 años.
- **PSOE q26 (-1)**: Sánchez reivindica el «no» al 5% del PIB que pidió Trump, sin
  nombrar la OTAN ni el 3,5%.
- **Vox q15 (-2)**: es indirecta. Abascal pide repatriar a todo el que entra ilegalmente
  y critica que se regularice «de golpe».
- **Vox q27 (+2)**: Abascal lo formuló como exigencia al Gobierno actual, no como medida
  de un futuro Gobierno de Vox.
- **Vox q05 (+2)**: Figaredo lo presenta como planteamiento «de máximo» y acepta
  acercamientos parciales.

## Protocolo v2 (2026-11-09): solo líderes en primera persona

Todas las celdas con valor llevan ahora `quien` y `formato`. Ninguna es anterior al 6-oct, así
que ninguna necesita `marco`.

Cobertura antes→después: PP 8→9, UPN 0→0, PSOE 2→2, PSC 0→0, Vox 7→8, SALF 1→1.

- **Retiradas**: PP q18 pasa a null. Su única fuente era el texto del programa que Europa Press
  adelantó el 7-nov («al que ha tenido acceso Europa Press»), una filtración anterior a la
  presentación oficial.
- **Fuente sustituida**:
  - PP q17 (-2→-1): pasa a apoyarse en el mitin de Feijóo en Vigo (24-oct), donde dice «lo que es
    de todos entre todos» y pide «fin a… los privilegios de unos pocos». Es indirecta.
  - PP q01 (-1): la narración de Vozpópuli se sustituye por la frase de Feijóo en Vigo contra el
    «planteamiento sectario del Gobierno que intenta controlar los precios».
- **Nuevas**:
  - PP q14 (+1) y q15 (-2), del documento firmado por Feijóo «Mi contrato con España» (19-oct).
    Texto íntegro en The Objective: «Quien venga a delinquir, deberá marcharse»; «se establecerá
    por ley la prohibición de regulaciones colectivas».
  - Vox q29 (+1): Abascal en Onda Cero (4-nov).
- **Dudas**:
  - PSOE q10: lo anuncia el secretario de Sanidad de la Ejecutiva Federal, en estilo indirecto.
  - Vox q05 y q07: la crónica de la entrevista a Figaredo en 101TV no tiene entrecomillados.
  - Vox q27: «militarizar» la frontera.
  - PP q17: es indirecta.
  - Vox q03: Cerezo es cabeza de lista por Baleares.
- Las tomas de postura de Vox (Mercosur, febrero-abril) y de Alvise (deportaciones, octubre de
  2025) son anteriores a la convocatoria y no se refieren a estas elecciones, así que se
  descartan.
- PSC, UPN y SALF: no se halló nada nuevo. El PSC no tiene declaraciones de Hereu o Illa sobre
  medidas concretas, y no consta que UPN asuma el «contrato» de Feijóo.
- Recodificar el PP con el programa del 10-nov, sobre todo q17 y q18.

## Recodificación por la nueva redacción (2026-11-09)

Se recodificaron q01, q02, q03, q04, q06, q09, q15, q17, q25 y q29 con el texto nuevo de
`preguntas.json` (ver `revision_redaccion_2026-11-09.md`). Se reabrieron todas las fuentes de las
celdas con valor. Sigue sin haber programa del 29N de ningún partido del grupo.

- **Cambios** (todos en q03, que ahora recoge la medida del PP: 60 % del IVA y del ITP para menores
  de 40):
  - PP q03 +1 → +2: es su propia propuesta, presentada como «la mayor ayuda de la historia».
  - Vox q03 +2 → +1 y SALF q03 +2 → +1: piden eliminar el 100 % de los impuestos de la primera
    vivienda, sin límite de edad (SALF, solo para españoles). Es una medida más amplia, no la misma.
- **Se mantienen**: PP q01 (-1), q15 (-2), q17 (-1) y q25 (+2); Vox q15 (-2) y q29 (+1). UPN q17 y
  SALF q25 siguen en null, coherentes con su retirada del origen.
- **Nuevas búsquedas sin resultado** para las celdas en null: impuesto a las grandes fortunas,
  jornada de 37,5 h, regularización, sanidad privada, Mercosur y concierto (Feijóo, Sánchez y
  Abascal), y el directo de Vozpópuli del 24-oct. Lo hallado era anterior al 6-oct o no estaba en
  primera persona.
- **Dudas**: Vox y SALF q03 (+1; podrían leerse como medida distinta → null); PP q01 y q17 (-1,
  indirectas); Vox q29 (+1: oposición a Mercosur sin formularla como pedir en la UE que se frene).
