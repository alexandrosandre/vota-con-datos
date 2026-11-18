# g18: barrido de declaraciones del 13-nov al 18-nov (11:55), partidos con más celdas null

Resultado: **ninguna celda propuesta**, así que no hay `codificacion_g18.json`. Nada de lo publicado desde el 13-nov da
una posición clara, en primera persona de un líder o en un documento oficial, sobre una afirmación en la que el partido
esté hoy en null, ni contradice un valor vigente. Lo que toca alguna afirmación coincide con la celda vigente, es una
medida distinta o va en estilo indirecto de una crónica.

Protocolo: `docs/prompts/2_codificacion_posiciones.md` completo. Matriz de referencia: `data/fase1/fase1.json`, con
UPN q03 = +1 (g17). La ventana del 17-nov (20:30) al 18-nov (10:00) ya la revisó `rev18m/prom/paso1.md`, que no se
repite aquí. Tampoco se repiten los descartes de g5 a g17 ni los de `rev16m`, `rev16t`, `rev17m` y `rev17t`.

## Método

- **Europa Press.** Sitemaps diarios del 13 al 18-nov (5.727 URL; el del 18-nov, releído a las 11:53). Se leyeron los
  titulares de todas las piezas con un líder o un partido prioritario en la URL, y el texto de las que tocaban una
  afirmación en null.
- **EFE.** Búsqueda en su API de WordPress (desde el 13-nov) por Esparza, Ibarrola, San Martín, Nogueras, Turull,
  Puigdemont, Esteban, Vaquero, Urtaran, Sagastizabal, Valido, Clavijo, Luis Campos, Nueva Canarias, Gomila, Ara Més,
  Matute, Aizpurua, Otxandiano, Otegi, Hereu, Illa y Maiz. Se leyeron completas las entrevistas de EFE a Campos (UPC,
  13-nov), Valido (CC, 14-nov) y Vaquero (PNV, 14-nov), que ningún barrido anterior recoge.
- **Webs de los partidos.**
  - Por la API de WordPress, todo lo publicado desde el 13-nov: upn-pp.es (3 notas), www.upn.org (1),
    coalicioncanaria.org (7), junts.cat (11) y posibleegin.ehbildu.eus (20, la web de campaña de EH Bildu, en
    castellano). Releídas a las 11:47: no hay notas nuevas desde las 10:00.
  - Portadas: eaj-pnv.eus (12 notas del 13 al 17-nov, todas abiertas), aramesfrontampli.cat, mespermallorca.cat,
    unidadpueblocanario.org (nada desde el mitin del 14-nov) y frenteamplio.info.
  - socialistes.cat: sus páginas devuelven 403 a las peticiones automatizadas, así que se leyó su feed RSS, que trae el
    texto completo (nota de Illa del 18-nov, 09:21).
- **No se han barrido redes sociales ni vídeos.**
- **Celdas null de cada partido** (por las que se filtró): UPN 23, CC 26 (fuera de las del programa: q31, q33, q19 y
  q34), PNV 23, UPC 23, PSC 19, Junts 14, EH Bildu 12 y Ara Més 12 sin programa; Frente Amplio 5 (q15, q19, q25, q27 y
  q29), con su programa por delante.

## Descartes (sin cambio)

### PSC · q09 (sanidad pública que pague a clínicas privadas): Granados, 17-nov

Fuente: Europa Press (`ep_granados_psc_sanidad`).

- **Quién.** «La número 2 del PSC al Congreso por Barcelona, Eva Granados». No es cabeza de lista ni portavoz.
- **Qué dice.** Promete el 7 % del PIB para salud y critica la «gestión privada» de la derecha: «Ni el código postal ni tu
  nivel económico ni tu origen ni tu sexo deben determinar que no puedas acceder a una buena sanidad de calidad».
- **Por qué no.** No dice nada de prohibir los conciertos con clínicas privadas, y además no es líder según el protocolo.
  q09 sigue en null (también en el programa del PSOE).

### EH Bildu · q08 (jubilación a los 65): Maiz, 16-nov

Fuentes: Europa Press (`ep_maiz_bildu_pensiones`) y la misma nota en posibleegin.ehbildu.eus.

- **Quién.** Eneka Maiz, cabeza de lista al Congreso por Navarra.
- **Qué dice.** «Los sectores de la derecha buscan retrasar la jubilación, reducir los importes y forzarnos hacia un
  modelo privado» y «plantearemos equiparar las pensiones mínimas al Salario Mínimo Interprofesional».
- **Por qué no.** Critica que la derecha retrase la jubilación, pero no propone volver a los 65 para todos ni sin recorte.
  Es el mismo caso que el programa («rechazando cualquier intento de [...] aumento de la edad de jubilación»), que g16
  dejó en null. Sigue en null.

### PNV · q08: Sagastizabal, 16-nov

Fuente: nota de eaj-pnv.eus (`pnv_58733_sagastizabal`).

- Idoia Sagastizabal, cabeza de lista por Bizkaia, defiende «la eliminación de las penalizaciones a quienes se jubilan
  anticipadamente después de cotizar más de 40 años».
- Es una medida distinta: solo para carreras largas y para la jubilación anticipada, no volver a los 65 para todos.
  Sigue en null.

### Frente Amplio · q15 (otra regularización extraordinaria): Almería, 17-nov

Fuente: Europa Press (`ep_fa_almeria_regularizacion`).

- El candidato por Almería, Zacarías Lekal, y la nota de la coalición piden, en estilo indirecto, «reformar la Ley de
  Extranjería para establecer un procedimiento de regularización permanente» y resolver las solicitudes de la de 2026.
- **Por qué no.** Es lo mismo que el programa del Frente Amplio, que g14 dejó en null (un procedimiento estable, no otra
  regularización extraordinaria), y el programa tiene precedencia. Además no es un líder y va en estilo indirecto.

### Frente Amplio · q27 (Fuerzas Armadas en Ceuta): Colau, 13-nov

Fuente: Europa Press (`ep_colau_ceuta`), sobre su entrevista con Jordi Wild.

- Colau critica la gestión de agosto y pide «movilizar recursos inmediatamente» (tiendas, comida, asistencia sanitaria).
- No habla del Ejército ni de vigilar la frontera. Ya lo descartó `rev16m` con otra crónica. Sigue en null.

### UPC: entrevista de EFE a Luis Campos, 13-nov

Fuente: EFE (`efe_campos_upc`).

- **q01.** «autorizar a los ayuntamientos a topar precios» va en estilo indirecto de la agencia y no es un tope estatal.
  UPC ya tiene q01 = +1.
- **q33.** Campos «rechaza de plano las pretensiones de PP y Vox de suspender traslados o devolver a menores no
  acompañados» (estilo indirecto). Coincide con q33 = −1.
- Lo demás (vivienda como derecho fundamental, alquiler vacacional, 0,7 % para cooperación, reparto en la UE) no son
  afirmaciones del cuestionario.

### CC: Valido, entrevista de EFE (14-nov) y nota del 17-nov

Fuentes: EFE (`efe_valido_cc`) y la nota ya revisada en g17.

- Propone «limitar la compra de viviendas en Canarias a personas que no residan en esta comunidad», más oferta y más
  vigilancia marítima. Ninguna es una afirmación del cuestionario.
- Más efectivos de las Fuerzas y Cuerpos de Seguridad en Canarias no es desplegar las Fuerzas Armadas en Ceuta (q27).

### PNV: Vaquero (EFE, 14-nov) y Urtaran (Europa Press, 17-nov)

Fuentes: `efe_vaquero_pnv` y `ep_urtaran_inmigracion`.

- **Vaquero.** La crónica recuerda que su voto sirvió para «rechazar el que pretendía establecer el alquiler indefinido».
  Coincide con q31 = −1.
- **Urtaran.** Pide para Euskadi «la gestión integral de la migración» y rechaza el centro de refugiados de Arana. No
  toca q15 ni q33.

### PSC: Hereu en Nueva Economía Fórum e Illa, 18-nov

Fuentes: Europa Press (`ep_hereu_nef`) y el feed de socialistes.cat (`psc_feed_illa`).

- **Hereu** defiende el nuevo modelo de financiación y la condonación parcial del FLA: «Quien quiera esto, que nos dé la
  mayoría, que lo hacemos inmediatamente». Coincide con q18 = +2 (programa del PSOE asumido).
- **Illa** dice que «s'ha intervingut per posar límit als lloguers». Coincide con q01 = +1.

### Otros, sin efecto

- **Matute (EH Bildu), Cadena SER, 18-nov** (`ep_matute_eta`). Solo habla de ETA («ETA era un estorbo que generaba dolor
  y sensación de inseguridad al conjunto de la sociedad vasca»). Ninguna afirmación.
- **Ara Més, notas del 16 y 17-nov.** Tope a los alquileres comerciales (no de vivienda, y q01 ya es +2 en su programa),
  impuesto del 10 % a los grandes propietarios que especulen (no es el impuesto de patrimonio de q04) y clases de catalán
  en la jornada laboral (no es q12).
- **UPN.** Las notas de upn-pp.es del 13 y 15-nov (Itoiz y Canal de Navarra; Navarra «foral y española») y la de upn.org
  (Ley Foral de Industria) no tocan ninguna afirmación. La del 17-nov ya dio q03 en g17.
- **Junts.** Las 11 notas de junts.cat del 13 al 18-nov ya están revisadas en g17 y `rev18m` (concierto, competencias en
  inmigración, multirreincidencia, catalán en el Congreso). Ninguna toca sus 14 celdas null.
- **PNV, resto de notas del 13 al 17-nov** (Esteban, Urtaran y jóvenes sobre vivienda, ferrocarril, industria). Ninguna
  afirmación.

## Pendiente para el siguiente barrido

- **Esteban (PNV).** En «Matafuturo» (18-nov) no se ha encontrado aún crónica. En Nueva Economía Fórum, el 19-nov.
- **Clavijo (CC) en Migratlantes (18-nov).** Sin crónica encontrada.
- **Manifiesto del PSC.** Sigue sin publicarse en socialistes.cat (feed revisado a las 11:47).
- **Debate de RTVE del 23-nov** (incluye a EH Bildu y PNV) y debates regionales de Canarias (19 y 24-nov).

## Fuentes locales

Copias en `rev18b/p1/fuentes/` (HTML y texto; para EFE, el JSON de su API y el texto extraído), con sha256 en
`fuentes/SHA256SUMS.txt` y URL en `fuentes/URLS.json`. `bin/fuentes.py` comprueba que cada cita de estas notas es literal
en su copia: las 15 pasan.
