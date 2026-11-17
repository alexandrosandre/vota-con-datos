# g17 (3.er barrido): declaraciones nuevas del 17-nov, de 10:25 a 20:50

Resultado: **una celda propuesta**, UPN q03 (null → +1), en `codificacion_g17.json`. Todo lo demás queda descartado o
coincide con celdas vigentes.

Protocolo: `docs/prompts/2_codificacion_posiciones.md` completo. Barrido anterior: `rev17m/notas_g17.md`.

## Método

- **Directorio de trabajo.** Otro agente estaba escribiendo a la vez en `rev17t/` (`raw/`, `existentes.txt`,
  `ep_urls*.txt`, y sobrescribió `bin/get.sh`). Para no pisarle, mis descargas están en `rev17t/w2/src/` (HTML y texto)
  y la fuente archivada, en `rev17t/fuentes/g17_2026-11-17/upn/`.
- **Feeds.** RSS de prensa nacional, catalana, vasca, navarra y canaria, Europa Press, y los feeds de
  coalicioncanaria.org, socialistes.cat y VilaWeb. Algunos feeds devolvieron HTML (El Confidencial, Público, Diario de
  Navarra, La Provincia, El Día, RTVC, El Correo, Naiz).
- **Webs de partido.**
  - Por la API de WordPress: junts.cat, coalicioncanaria.org, upn-pp.es y barcelonatribuna.com (Amics del País).
  - eaj-pnv.eus (noticias 58737, 58739 y 58743) y la portada de unidadpueblocanario.org.
  - La biblioteca de medios de socialistes.cat, abierta en el navegador.
- **Nota para los barridos siguientes.** El dominio de UPC es **unidadpueblocanario.org**. El barrido de la mañana probó
  `unidaddelpueblocanario.org`, que no responde.

## Celda propuesta

### UPN q03 (null → +1): rebaja del IVA de la primera vivienda

- **Fuente.** Nota del 17-nov (11:58) en upn-pp.es, la web de la coalición UPN-PP: «UPN-PP defiende “IVA cero” para los
  alimentos básicos y rebajar del 10% al 4% el de la primera vivienda».
- **Quién.** Javier Esparza (UPN), cabeza de lista de UPN-PP al Senado, «ha propuesto bajar del 10% al 4 % el IVA de la
  primera vivienda nueva cuando le corresponda el tipo general».
- **Por qué cuenta para UPN.**
  - Es un documento conjunto de la coalición que firma UPN (`data/boe/coaliciones.json`), igual que UPN q23 (g7).
  - Además, quien hace la propuesta es un cabeza de lista de UPN.
  - La frase va en estilo indirecto, pero la publica la propia coalición como posición oficial.
- **Valor: +1.** Pasar del 10 % al 4 % es una rebaja del 60 % del IVA, pero:
  - vale para cualquier edad, no solo para menores de 40;
  - no habla del impuesto de transmisiones (en Navarra es foral).
  - Mismo criterio que Vox, SALF y ERC (q03 = +1).
- **PP.** No cambia: su programa (q03 = +2) tiene precedencia.
- **Otras propuestas de la misma nota, descartadas.**
  - **q30.** El «IVA cero para alimentos básicos» no es fijar un precio máximo por ley. Es otra medida: null.
  - **q04.** «Reducir Patrimonio y Sucesiones» se refiere al Patrimonio foral de Navarra, no al impuesto estatal sobre
    grandes fortunas: null.
  - **q05.** El alivio del IRPF es foral: null.
  - Las pensiones con el IPC no son q08.
- **Duda para el verificador.** La nota no entrecomilla esta frase, aunque sí otras de Esparza. Si el verificador exige
  cita directa también en las notas oficiales de la coalición, debe quedar en null.

## Pendientes del barrido anterior

### Comisión Interministerial de Inmigración (17-nov): CC, sin celdas

Fuentes: Canarias7 (`w2/src/clavijo_c7`) y El Debate (`w2/src/clavijo_deb`). El País devuelve 403.

- **Resultado de la reunión.** Clavijo sale con «Incertidumbre, perplejidad y confusión». Después, el ministro de
  Hacienda le anuncia 5 millones por real decreto ley para El Hierro: 3 para el Servicio Canario de Salud y 2 para el
  Cabildo.
- **Propuestas de Clavijo.** Contratar a la Cruz Roja para el CATE y que la UME movilice personal sanitario.
  - Es apoyo sanitario en El Hierro, no desplegar las Fuerzas Armadas en la frontera de Ceuta (q27): null.
- **Centros de retorno en Ruanda.** Clavijo los llama «un auténtico disparate». Ninguna afirmación trata de ellos.
- **q33.** No se habla del reparto de menores. Sigue en −2 (programa).
- **Cargo.** Habla como presidente de Canarias, en rueda de prensa en la delegación del Gobierno canario.

### Cristina Valido (CC, cabeza de lista por Santa Cruz de Tenerife), sin celdas

Nota de coalicioncanaria.org del 17-nov (12:37), en el foro «Defiende Canarias» de la Cadena SER (`w2/src/valido_cc`).

- Pide «recursos permanentes en el mar y en tierra», el cumplimiento de lo acordado en la Comisión del 10-nov y
  cooperación con los países de origen.
- Ninguna frase toca q27, q15 ni q33.

### Nogueras en Barcelona Tribuna (16-nov): Junts, q03 y q31

- **No hay vídeo ni resumen publicado.**
  - La página del acto en amicsdelpais.com («Catalunya i els catalans al centre») solo tiene el anuncio.
  - El canal de YouTube de Barcelona Tribuna (UCyPdkEw020ctybVrfca5REQ) no sube nada desde el 27-jul.
- **Nota oficial de Junts del acto.** El barrido de la mañana no la encontró: está en junts.cat, publicada el 16-nov a
  las 10:50 con el nombre «Tribuna Barcelona»
  (`nogueras-la-garantia-per-a-les-empreses-els-treballadors-els-autonoms-i-leconomia-es-junts`; `w2/src/junts_garantia`).
  - Solo trae generalidades: «una fiscalitat favorable per alleugerir el cost de la vida de les classes mitjanes i
    autònoms» y «un finançament propi que recapti i gestioni els impostos».
  - Esto último es q17, que ya es +2.
  - No dice nada del IVA ni del ITP de la vivienda (q03) ni de prorrogar contratos (q31).
- **Celdas.** q03 sigue en null y q31 en −1. Lo del «30 %» y la prórroga solo constan en estilo indirecto en El
  Nacional. Si Barcelona Tribuna publica el vídeo, conviene mirarlo.

## Descartes nuevos

### Junts: compromiso «El català, cosa de tots» (17-nov), q12 se queda en +1

Fuentes: nota oficial de junts.cat (17-nov, 11:25; `w2/src/junts_catala`), La Vanguardia y El Periódico.

- **Qué dice.** Uno de los cuatro compromisos que propone a los cabezas de lista: «Fixar la llengua catalana com a
  prioritat en les iniciatives sobre educació, garantint la immersió lingüística».
- **Por qué no sube a +2.**
  - Es una propuesta propia, ya no una reacción al PP, pero no rechaza un mínimo de castellano fijado por ley o por los
    tribunales.
  - Con el mismo texto («garantizando la inmersión lingüística»), al Frente Amplio se le dio +1.
  - ERC tiene +2 porque rechaza expresamente «la imposició de percentatges lingüístics».
- **Fuente vigente.** Al no cambiar el valor, se mantiene. Si el editor prefiere una fuente proactiva y más reciente, la
  nota del 17-nov podría sustituir a la cita del 19-oct sin cambiar el valor.
- **Otras declaraciones de Nogueras en la rueda de prensa (EFE).** Mediador internacional, «vía Starmer», que Colau no
  ocupe Vivienda y competencias en inmigración. Ninguna es una afirmación.

### Junts: concierto económico catalán por ley propia (El Periódico, 17-nov)

- Ya descartado esta mañana: es un documento interno «al que ha tenido acceso» el diario.
- La celda q17 ya es +2.

### PSC: «manifiesto programático» anexo al programa del PSOE (El Periódico, 17-nov)

- **Qué publica El Periódico.** Un manifiesto «con sello propio» como anexo al programa del PSOE, con:
  - reforma constitucional federal;
  - financiación singular con ordinalidad;
  - condonación del 20 % del FLA (unos 17.000 millones para la Generalitat);
  - culminar el traspaso de Rodalies.
- **No se encuentra publicado.**
  - La biblioteca de medios de socialistes.cat (abierta en el navegador) no tiene ningún PDF posterior al presupuesto
    de campaña del 13-nov.
  - El feed de socialistes.cat del 17-nov no lo enlaza.
- **Efecto en las celdas.** Aunque apareciera, no cambiaría nada:
  - q18 ya es +2 (programa del PSOE asumido, la misma quita);
  - la financiación singular no es concierto (q17 = −1, Hereu);
  - la reforma federal no es un referéndum (q16 = −1).
- **Por qué buscarlo.** Si se publica, conviene leerlo por q12 (inmersión), que en el PSC está en null.

### PNV, sin celdas

- **Nota 58737 (Esteban en Irun).** «Necesitamos una política migratoria gestionada: que sea ordenada, regular y
  segura». No habla de otra regularización (q15 = −1, programa).
- **Nota 58739 (Urtaran).** Migración gestionada, más competencias y rechazo al macrocentro de Arana. Ninguna afirmación.
- **Nota 58743 (Ansola y Sagastizabal en Basauri).** Prestación de desempleo para los autónomos. Ninguna afirmación.

### UPC, sin celdas

- **unidadpueblocanario.org.** Las noticias más recientes son del mitin del 14-nov.
- **Canarias7, «Las promesas sobre migración» (17-nov).** Cita del manifiesto de UPC «una distribución solidaria de las
  responsabilidades de acogida» de los menores. Coincide con q33 = −1.

### Otros partidos, fuera de prioridad y sin efecto

- **Feijóo en Bilbao y Eibar (PP).** Inmigración «ordenada, legal, con un contrato de trabajo». Ya es q15 = −2.
- **Abascal en Lanzarote (Vox).** Armada, militarizar Ceuta y Melilla, ninguna regularización. Ya son q27 = +2 y
  q15 = −2.
- **Pontón (BNG), según ABC en paráfrasis.** Topes al alquiler y renovación automática de contratos. Coincide con
  q01 = +2 y q31 = +2 (programa).
- **Illa en La Sexta (PSC).** Responde a Rufián sobre un govern de concentración. Ninguna afirmación.
- **Colau (Frente Amplio).** Blindar los salarios frente a la inflación y pedir un recurso al TJUE contra el plan
  Ruanda. No son afirmaciones; además, su programa tiene precedencia.

## Pendiente para el siguiente barrido

- **Programa de Podemos (fuera de prioridad, pero importante).**
  - 20minutos y La Vanguardia (17-nov) informan de que Podemos ha presentado en Madrid su programa del 29-N: «Así de
    básico: paz, casa y trabajo», 442 medidas, con Montero y Morano.
  - 20minutos aloja una copia en `https://www.20minutos.es/uploads/files/2026/11/17/29N-programa-Podemos.-Paz-casa-y-trabajo.pdf`.
  - **No se ha podido confirmar en la fuente oficial.** podemos.info responde con un desafío de Cloudflare a las
    peticiones automatizadas, y `partidos.json` (20:30) dice que no hay programa.
  - Hay que buscarlo en un navegador en podemos.info o en una web de campaña. Si aparece, toca recodificar a Podemos
    entero, con el programa primero, como en g16.
  - Según la prensa, afectaría al menos a q01 (rebaja del 40 % por decreto), q31 (contratos indefinidos), q06 (30
    horas), q04, q36 (sin nuclear), q21, q26 y q30 («supermercado público para topar el precio de los alimentos»).
- **Manifiesto del PSC.** Ver arriba.
- **Vídeo de Nogueras en Barcelona Tribuna.** Ver arriba.
- **Agenda.**
  - Esteban (PNV) en «Matafuturo» (18-nov) y en Nueva Economía Fórum (19-nov).
  - Clavijo en Migratlantes (18-nov).
  - Cara a cara Sánchez-Feijóo (19-nov) y debate a cuatro (26-nov).
- **Rufián en Nació Digital (ERC).** No se revisó; ERC tiene programa y no era prioridad.

## Verificación

Verificación independiente del 17-nov en `verificacion_g17.json` (aprobado). Una celda revisada: corregida solo en la
nota, sin cambio de valor.

- **Fuente.** Se abrió de nuevo la URL original. El HTML es idéntico byte a byte al archivado (sha256 `463ff7a2…f9de`),
  que queda en `data/sources/fase1/g17_2026-11-17/upn/` con su texto. La API de WordPress (post 1119) da la fecha:
  17-nov, 10:58 UTC (11:58 hora peninsular). El autor es «Comunicacion UPN-PP».
- **Cita.** Literal, 43 palabras. Va en estilo indirecto en la nota, que solo entrecomilla otras frases de Esparza.
- **Quién.** El BOE de candidaturas proclamadas (BOE-A-2026-23103, Senado, Navarra) recoge a «José Javier Esparza
  Abaurrea (UPN)» como primero de la candidatura UPN-PP. Es de UPN y cabeza de lista, así que es un líder del partido.
- **A qué partido cuenta.** A UPN por dos vías: es un documento conjunto de la coalición que firma UPN (como q23, g7) y
  la propuesta es de un líder de UPN. No hay nada de Feijóo ni de otros dirigentes del PP. El PP no cambia: su programa
  (q03 = +2) tiene precedencia.
- **Duda del codificador: frase sin comillas en una nota oficial.** Vale. El protocolo excluye el estilo indirecto de
  las crónicas de prensa, donde las palabras son del periodista. Pero acepta como fuente las notas oficiales del
  partido (`quien` = el partido o la coalición, `formato` = «documento oficial»). En una nota oficial habla el propio
  partido, que publica la propuesta como suya. Es lo que se hizo antes con Ara Més–Front Ampli q31 (g5, «ha defensat la
  necessitat…») y Frente Amplio q02 (g2, «nuestra candidata… ha presentado…»). Los descartes por estilo indirecto (por
  ejemplo, Valido en g3) venían de crónicas de prensa.
- **Valor: +1, como propone el codificador.** Bajar el IVA del 10 % al 4 % es justo la rebaja del 60 % del IVA de la
  afirmación. Pero vale para cualquier edad y no habla del ITP, así que no llega a +2. Tampoco es null: no es una medida
  distinta, sino la misma con otro alcance. Es el listón de Vox, SALF, ERC y UPC (+1).
- **Nota de la celda corregida aquí, en `codificacion_g17.json`.** Decía «A favor con una medida próxima pero distinta:
  +1». Eso choca con la regla de que una medida distinta no es posición (sería null). Ahora dice «a favor con
  diferencias». Además añade la referencia del BOE, el autor de la nota y los precedentes de notas oficiales en estilo
  indirecto. Valor, cita y fuente no cambian.
- **Resto de la nota, en null como propone el codificador.**
  - q30: el «IVA cero» a los alimentos es una rebaja de impuestos, no un precio máximo.
  - q04: Patrimonio y Sucesiones son los impuestos forales de Navarra, no el impuesto estatal temporal.
  - q05: el IRPF es foral y no trae los umbrales ni los tipos de la afirmación.
  - q08: las pensiones con el IPC no son la jubilación a los 65.
- **Build.** Comprobado en una copia del repositorio. Sin g17, `python3 -I pipeline/build_fase1.py` reproduce el
  `fase1.json` del repositorio. Con g17 termina sin errores y cambia una sola celda: UPN q03 (null → +1). UPN pasa de 6 a
  7 posiciones. En el repositorio no se ha regenerado `fase1.json`.
- **Pendiente para el editor** (en «dudas»): q03, alternativa null si se exige que la medida cubra también el ITP o la
  edad.
