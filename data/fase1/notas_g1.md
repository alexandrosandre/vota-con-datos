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
