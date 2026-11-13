# Encuestas: notas de recogida y advertencias

Fecha de recogida: 2026-11-08. Elección: generales del 29-11-2026 (RD 806/2026, BOE 6-10-2026).
Datos: `encuestas.json`. Fuentes descargadas (datos no fiables, no ejecutar): `data/sources/encuestas/`.

## Selección "CIS, Sigma Dos, top 3"

| id | Encuestadora / medio | Publicación | Campo | n | PP | PSOE | Vox | FA/Sumar | Verificado en fuente primaria |
|---|---|---|---|---|---|---|---|---|---|
| `cis-2026-10` | CIS, estudio 3582 | 14-10 (avance) | 1–6 oct | 5.025 | 22,2 | 34,0 | 17,1 | 6,1 | sí (PDF de cis.es) |
| `sigmados-2026-11-02` | Sigma Dos / El Mundo | 1-11 (web de El Mundo), 2-11 (sigmados.com) | 29–30 oct | 2.505 | 31,1 (133–139) | 24,6 (97–103) | 19,3 (63–69) | 7,1 (9–11) | sí (sigmados.com + El Mundo) |
| `gad3-2026-10` | GAD3 / ABC | 12-10 | 6–8 oct | 1.077 | 31,4 (133) | 26,4 (107) | 18,2 (65) | 7,4 (10) | sí (gad3.com + gráfico y tabla de ABC) |
| `40db-2026-10` (alternativa) | 40dB / El País-SER | 9-10 | 7–8 oct | 800 | 31,9 (132; 123–140) | 28,1 (112; 105–117) | 18,9 (66; 63–74) | 5,3 (5; 5–7) | sí (PDF del informe de 40dB) |

Desgloses territoriales, de encuestas anteriores de Sigma Dos:
- `sigmados-2026-10-19`: horquillas de escaños en las 52 circunscripciones (campo 1–14 oct, n=3.007).
- `sigmados-2026-10-12`: escaños por comunidad autónoma (campo 1–8 oct, n=2.017).

## Descubrimiento (cómo se encontró cada encuesta)

- Para descubrir encuestas se usaron búsquedas web y el agregador Wikipedia "Opinion polling for the 2026 Spanish general election" (guardado en `sources/encuestas/agregadores/`). Ninguna cifra de las encuestas principales sale del agregador.
- **CIS**: el catálogo de cis.es, ordenado por fecha de publicación, tiene como estudio más reciente con estimación de voto el 3582 (Barómetro de octubre 2026). Se descargaron `3582_Estimacion.pdf`, `FT3582.pdf` y `es3582mar.pdf`.
- **Sigma Dos**: el listado `noticias.php` de sigmados.com tiene como último sondeo el del 2-11. No hay ninguno posterior a 8-11. El artículo de El Mundo confirma las cifras (PSOE 24,6%, FA 7,1%, 2.505 entrevistas).
- **GAD3**: el RSS y el listado de gad3.com solo tienen un barómetro posterior a la convocatoria, el de ABC de octubre (publicado el 12-10). No hay encuesta de GAD3 para Mediaset ni de noviembre. La web de GAD3 da solo PP, PSOE, Vox, Sumar y "Otros". El desglose por partido sale de:
  - el gráfico Datawrapper `9xmFD` incrustado en ABC ("Evolución de la estimación de voto… En % sobre el voto válido", columna "octubre 2026", fuente GAD3);
  - la tabla "Escaños por partido" de ABC.
- **40dB**: el último es la "Encuesta flash. Octubre 2026" (campo 7–8 oct). elpais.com devuelve 403 a nuestras peticiones, así que las cifras salen del PDF de 40dB alojado en el servidor de El País (`ep00.epimg.net`). La lectura de la página de escaños se comprobó también visualmente.

## Advertencias por encuesta

### CIS preelectoral (3584, `cis-2026-11`, publicado 12-11)
- Sustituye a `cis-2026-10`. Campo del 7 al 30 de octubre, 45.074 entrevistas (CATI). Estimación: PSOE 33,3, PP 25,5, Vox 18,4, Frente Amplio 4,7, ERC-Podemos 3,1.
- Ficheros: `3584_Estimacion.pdf`, `es3584mar.pdf` (con la ficha técnica al principio; no hay FT3584 suelta) y la página del avance. Los sha256 están en `archivos_fuente_sha256`.
- Es la primera vez que el CIS publica escaños: horquillas P5–P95 nacionales y por provincia, sin valor central. Las provinciales van en `desglose_regional`.
- No publica estimación de voto por provincia en los PDF. El Excel anunciado (`3584-multi_A-xlsx`) devolvía HTTP 410 el 12-11.
- Etiquetas nuevas: el "Frente Amplio" del CIS excluye Compromís, UPC y Ara Més-Front Ampli, que se dan por separado. "ERC-Podemos" es campaña conjunta, no coalición.

### CIS (3582)
- **No hay CIS con trabajo de campo posterior a la convocatoria.** El campo del 3582 fue del 1 al 6 de octubre. La macroencuesta preelectoral (estudio 3584, unas 45.000 entrevistas según la prensa, campo del 7-oct al 7-nov) no está publicada a 8-11. Según una resolución de la JEC citada en prensa, el CIS no publicará avances mientras dure el campo. Cuando salga (forzosamente antes del 24-11), sustituirá a `cis-2026-10`. Es probable que traiga estimaciones por CCAA o provincia: conviene revisarlo entonces.
- Estimación por "método de escenarios" (modelo Alaminos-Tezanos). La estimación va sobre voto válido. El voto directo va sobre censo; se guarda solo como referencia y no debe usarse para estimar.
- **Efecto casa muy fuerte.** El CIS da al PSOE 11,8 puntos sobre el PP (34,0 frente a 22,2). Según el listado de contexto, sacado del agregador y sin verificar, ninguna encuestadora privada publicada tras la convocatoria pone al PP por debajo del 28%. La ventaja del PP va de 0,7 puntos (More in Common) a 7,4 (NC Report). La única excepción es SW Demoscopia, que da al PSOE 2 puntos por delante. Hay terceros (Opina 360, Ateneo del Dato, etc.) que publican reestimaciones de los microdatos del CIS con resultados muy distintos. Esas reestimaciones no son del CIS y no se han recogido.
- **Escaños:** el CIS no publica escaños. Las cifras de escaños "del CIS" que circulan (p. ej. 152/94/63 de Electomanía) son cálculos ajenos.
- "Otros partidos" pesa un 7,9%. No aparecen por separado Adelante Andalucía, CUP ni Compromís/FV.
- La N de la tabla de estimación (5.025) no coincide con la de la ficha técnica (5.024 realizadas). Las dos cifras salen del propio CIS.

### Sigma Dos (2-11)
- Las formaciones publicadas suman un 94,0%. No se publican otros ni blanco. Si se reparte con D'Hondt, hay que decidir cómo tratar el 6% restante: lo correcto sería usar las horquillas de escaños que publica Sigma Dos, no recalcularlas.
- En el texto, Junts aparece "entre 6 diputados", Podemos con "la posibilidad de conseguir un asiento" y CCA con "un hipotético escaño en disputa". La infografía oficial lo concreta en 6, 0–1 y 0–1, que es lo que se ha guardado.
- **"Front Valencià (FV)"** (0,9%, 3–4 escaños) aparece en el sondeo del 2-11. En los del 19-10 y 26-10 la misma posición la ocupaba "Compromís". Sigma Dos no explica el cambio. Hay que cotejarlo con las candidaturas proclamadas antes de asignarle color o logo.
- El Mundo sitúa el resultado "probable" del PSOE en 99 escaños dentro de su horquilla.
- El campo es posterior al accidente ferroviario de Urda (29–30 oct).

### GAD3 (ABC, octubre)
- El campo (6–8 oct) empieza el mismo día en que el BOE publica la convocatoria. Lo consideramos posterior a la convocatoria. Si se exige estrictamente "después del 6-10", hay que usar `40db-2026-10`. Además tiene ya un mes de antigüedad: hay encuestas privadas más recientes.
- ABC marca con asterisco a ERC, JuntsxCat, CUP, PNV, Bildu, BNG, CC, UPN, PACMA y Otro: "muestra insuficiente estimados en base al histórico de las elecciones". Por eso tienen `estimado_con_historico: true`.
- Da escaños puntuales, sin horquillas. UPN aparece por separado con 0 escaños.
- Hay una discrepancia en la fuente: la web de GAD3 dice que "Otros" son 35 escaños y el 11,2%. Los escaños cuadran, pero la suma de esos partidos en el gráfico de ABC es 11,7%. Se guardan los porcentajes del gráfico tal cual.
- GAD3 todavía rotula "Sumar". ABC escribe "Frente Amplio —la nueva marca de Sumar—".

### 40dB (flash octubre)
- Encuesta online de solo 800 entrevistas (±3,5%), sin Ceuta ni Melilla. Las horquillas de escaños son muy anchas: PP 123–140.
- "Otro + Blanco" va agregado (11,7%). Los escaños de "Otros" (33, con horquilla 32–34) se desglosan solo en el punto central.
- Incluye un escenario alternativo con candidatura unitaria de Sumar/Frente Amplio y Podemos (9,5%, 15 escaños). Va en `escenario_alternativo`.

### Sigma Dos, tracking diario (`sigmados-2026-11-12`, publicado 12-11)
- Primera entrega del tracking diario para El Mundo (campo 3–11 nov, n=3.870). Habrá una entrega cada día hasta el 23-11 y cada una sustituye a la anterior en la media.
- Solo publica el porcentaje de PP, PSOE, Vox, Frente Amplio (con sus marcas canaria y valenciana), Podemos y Adelante Andalucía. ERC, Junts, EH Bildu, PNV, BNG y CC solo tienen escaños (van en `escanos_otros`), así que en la proyección conservan su voto de 2023.
- Frente Amplio: la infografía dice 9-15 escaños y el texto 13-15 (suma de sus tres marcas). Se guarda 13-15.
- El escenario propio de Sigma Dos siguió usando `sigmados-2026-11-08`, que sí publica el porcentaje de todos los partidos, hasta la entrega del 13-11.

### Sigma Dos, tracking diario (`sigmados-2026-11-13`, publicado 13-11)
- Segunda entrega (campo 3–12 nov, n=4.620). Sustituye a `sigmados-2026-11-12` en la media.
- Su infografía (escanosb646.jpg) sí publica el porcentaje de ERC, EH Bildu, PNV, Adelante Andalucía, BNG, Junts y CC, así que pasa a ser el escenario propio de Sigma Dos en lugar de `sigmados-2026-11-08`. Podemos (1,4 %) sale del texto y de la serie Datawrapper.
- Frente Amplio 7,3 % (13-15) es el bloque con sus marcas canaria y valenciana; esta entrega no las desglosa.

### Winston (`winston-2026-11-13`, publicado 13-11)
- Campo 5–8 nov, 1.501 entrevistas online. No publica margen de error ni más metodología.
- El gráfico incrustado (d2k.es) trae la tabla completa, que suma 100 % con "Otros y blanco". Su Frente Amplio incluye a Compromís. CC aparece con un 0,0 % y se guarda tal cual.

### 40dB, tracking diario (`40db-2026-11-13`, publicado 13-11)
- Primera entrega del sondeo diario para El País y la SER: campo del 10 al 12 de noviembre (no 11–12, como decía el agregador), 1.000 entrevistas online, ±3,1 %. Cada entrega nueva sustituye a la anterior en la media.
- Los artículos de elpais.com dan 403, pero el informe PDF de 40dB se descarga sin problema desde `elpais.com/infografias/encuestas40db/2026/11-tracking-electoral/Informe_tracking_dia01.pdf`. El artículo de la SER del 13-11 confirma las cifras principales.
- A diferencia de `40db-2026-11`, el informe da Frente Amplio (3,5 %) separado de las "otras coaliciones territoriales de izquierda" (1,6 %: Compromís 1,1, UPC 0,3, Ara Més 0,2). Se guardan como filas separadas, igual que el CIS 3584.
- El escenario propio de 40dB sigue usando `40db-2026-11`.

### Desgloses territoriales de Sigma Dos
- Son de encuestas cuyo campo empieza el 1-10, antes de la convocatoria.
- El mapa provincial (19-10) se hizo, según Sigma Dos, "previamente a los anuncios de coalición". El texto se parseó automáticamente y se validó contra los diputados por circunscripción del RD 806/2026.
- **Cádiz es incoherente en la fuente:** PP 5 + PSOE 2–3 + Vox 2 + AA 0–1 da como mínimo 9, y Cádiz elige 8. No se ha corregido: está marcado con `incoherencia`.
- Reparto de 2026 según el anexo del RD 806/2026: Madrid 38 y Cádiz 8. Respecto a 2023 serían +1 para Madrid y −1 para Cádiz; el dato de 2023 no se ha comprobado en esta tarea, así que conviene cotejarlo con `data/boe`. Las sumas del desglose autonómico (12-10) cuadran con este reparto en las 19 CCAA y ciudades.
- En el desglose autonómico, Illes Balears, Navarra, La Rioja, Ceuta y Melilla no figuran en el texto. Se transcribieron a mano de la infografía oficial y se marcan con `fuente_dato: "infografía"`.

## Etiquetas de partidos: qué es cada cosa

- **Frente Amplio**: nueva marca de Sumar para el 29-N; ABC dice que Ada Colau gana peso en el liderazgo. Cada fuente la rotula de una forma:
  - CIS: "SUMAR / Frente Amplio". Nota del CIS: agrupa a los partidos que firmaron la coalición, excepto Podemos.
  - Sigma Dos: "Sumar" el 12-10 y "Frente Amplio" desde el 19-10.
  - GAD3: "Sumar".
  - 40dB: "Sumar", y "Sumar/ Frente amplio" en el gráfico de escaños.
- **Podemos** concurre por separado, con Irene Montero (ABC). Sigma Dos informa de un pacto ERC–Podemos en Cataluña.
- **SALF**: Se Acabó La Fiesta (Alvise Pérez). Le dan un 1,8% el CIS, GAD3 y 40dB. Sigma Dos no lo publica. Ninguna encuestadora le da escaño.
- **UPN / PP-UPN**: Sigma Dos habla de un "acuerdo entre PP y UPN en Navarra" y en su mapa provincial rotula "PP-UPN". GAD3 y CIS mantienen UPN por separado: el CIS le imputa un 0,1% y GAD3 le da 0 escaños.
- **Compromís / Front Valencià (FV)**: ver la sección de Sigma Dos.
- **Adelante Andalucía** aparece como "Adelante Andalucía (AA)" en Sigma Dos, "A.Adelante" en GAD3 y "AA" en 40dB. El CIS no la publica por separado.
- **Aliança Catalana** no concurre a las generales, según Sigma Dos y ABC.
- Mantén siempre el nombre exacto publicado (campo `partido`). Para comparar encuestas hace falta una tabla de equivalencias aparte, por ejemplo con identificadores de `data/partidos`.

## Discrepancias en los agregadores (por qué no se usan como fuente)

- Wikipedia da para Sigma Dos (2-11) Frente Amplio 7,5% y 9–12 escaños. La fuente primaria dice 7,1% y 9–11.
- Politpro publica para GAD3 (septiembre) cifras incompatibles con las de la propia GAD3 y ABC.
- Para IMOP, Wikipedia cita también Electográfica. La URL primaria guardada es la de El Confidencial.
- `otras_encuestas_contexto` recoge las últimas encuestas de IMOP, SW Demoscopia, Sondaxe, Celeste-Tel, SocioMétrica, Target Point, NC Report, Hamalgama, More in Common, Winston, Ateneo del Dato, GESOP, InvyMark, DYM y el panel de Electomanía. Solo tienen PP, PSOE, Vox y FA, sacados del agregador y **sin verificar** (`verificado_en_fuente_primaria: false`). Sirven solo de contexto.

## Contexto de campaña citado por las fuentes (no verificado aparte)

Las fuentes mencionan estos hechos, que pueden explicar movimientos entre encuestas:
- protestas por la vivienda y la muerte de "Maricarmen" antes de la convocatoria;
- una huelga general convocada para el 11-11;
- el accidente ferroviario de Urda (finales de octubre) y la dimisión de Óscar Puente.

## Veda legal

LOREG art. 69.7 prohíbe publicar y difundir sondeos electorales durante los cinco días anteriores al de la votación, es decir, del martes 24 al sábado 28 de noviembre de 2026. La app no debe publicar encuestas nuevas en ese periodo. Antes de mantener visible la opción "estimar con encuestas" durante la veda, conviene una consulta jurídica.

## Cómo reproducir o actualizar

1. Releer los listados primarios:
   - CIS: catálogo de cis.es ordenado por fecha de publicación; vigilar el estudio 3584.
   - Sigma Dos: `sigmados.com/noticias.php`.
   - GAD3: `gad3.com/feed/`.
   - 40dB: El País; el PDF del informe está en `ep00.epimg.net/infografias/encuestas40db/...`.
2. Guardar el material crudo en `data/sources/encuestas/<encuestadora>/` y comprobar cada cifra contra el texto o PDF. El script de esta recogida comprobaba que cada cadena "x,y %" existiera literalmente en la fuente.
3. No actualizar nada a partir del 24-11 (veda).
