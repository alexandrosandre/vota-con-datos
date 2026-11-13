# Barrido de campaña, codificador B (13 de noviembre de 2026): Ara Més, Coalición Canaria, NC-BC y Compromís

Fichero: `data/fase1/barrido_2026-11-13/posiciones_b.json`. Contiene **15 posiciones nuevas** en celdas que estaban vacías en `web/public/data/fase1.json` el 13-nov y **1 candidata a sustituir** una posición existente (`candidatas_sustitucion`). Las copias de las fuentes están en `data/sources/fase1/barrido_2026-11-13/<partido>/`, con la cabecera URL/Medio/Descargado. Su sha256 está en la lista `fuentes` del JSON. Cada cita se comprobó contra su copia con `norm()` de `pipeline/verify_quotes.py`: las 16 aparecen literalmente. Todo está pendiente de verificación independiente.

## Regla aplicada

- Protocolo `docs/prompts/2_codificacion_posiciones.md`. Valen las declaraciones literales en primera persona de los dirigentes del propio partido desde el 1-nov-2025 y los documentos oficiales del partido o de la coalición que firma.
- Valen también las intervenciones en el Congreso o el Senado de quien habla en nombre de su grupo. Nunca valen el voto sin palabras, el estilo indirecto de un periodista ni las columnas.
- Atribución (`reatribucion_2026-11-13.md`):
  - Ara Més: no cuenta Carme Gomila en primera persona; sí cuentan las notas oficiales de la coalición.
  - NC-BC: no cuentan los dirigentes de Podemos, IU ni Sumar.
  - Compromís: no cuentan los de Podem, EUPV ni ERPV.
  - CC: no cuentan los de Municipalistas Primero Canarias.
- `marco` es null en todas las posiciones. Las anteriores al 6-oct se rigen por la regla del 1-nov-2025.

**Criterio nuevo que conviene confirmar (Ara Més).** Seis de las siete posiciones nuevas de Ara Més salen de notas oficiales de **MÉS per Mallorca** (mespermallorca.cat), no de la federación ni de la coalición:
- q29, q12, q24 y q13 son notas de MÉS per Mallorca.
- q06 es una nota de **MÉS per Palma**, su organización local.

La reatribución define Ara Més como «la federación de MÉS per Mallorca, Més per Menorca y Ara Eivissa». Por eso se tratan como documentos oficiales de un partido de la federación. Si el editor solo acepta documentos de la federación o de la coalición Ara Més–Front Ampli, esas celdas pasan a null y Ara Més queda con q30 y q31 nuevas.

**Oradores de grupo.** Siguiendo el encargo, se trató a Alberto Ibáñez (Compromís, Grupo Plurinacional SUMAR) como portavoz cuando habla por su grupo. g4 no lo hacía. Se revisaron sus 40 turnos y no aporta ninguna posición nueva.

## Posiciones nuevas

| Partido | Afirmación | Valor | Quién | Fecha | Fuente |
|---|---|---|---|---|---|
| Ara Més | q30 tope a alimentos básicos | +2 | Nota oficial de Ara Més–Front Ampli (Sóller) | 2026-11-07 | aramesfrontampli.cat/noticies/topallalimentssoller |
| Ara Més | q31 renovación automática del alquiler | +2 | Nota oficial de Ara Més–Front Ampli (inicio de campaña): «contractes indefinits» | 2026-11-13 | aramesfrontampli.cat |
| Ara Més | q29 frenar Mercosur | +1 | Nota de MÉS per Mallorca con Vicenç Vidal: «MÉS s'oposa al tractat» | 2026-01-28 | mespermallorca.cat |
| Ara Més | q12 lengua en la escuela | +1 | Nota de MÉS per Mallorca sobre la LO de plurilingüismo: lengua propia «normalment vehicular» | 2025-11-19 | mespermallorca.cat |
| Ara Més | q24 derogar la ley mordaza | +1 | Nota de MÉS per Mallorca (moción en el Consell): «insta el Govern espanyol a derogar [...] la Llei Mordassa» | 2026-07-22 | mespermallorca.cat |
| Ara Més | q13 prioridad nacional | −1 | Nota de MÉS per Mallorca con Rosa Cursach (consellera) | 2026-04-28 | mespermallorca.cat |
| Ara Més | q06 jornada de 37,5 h | +1 | Nota de MÉS per Palma (Neus Truyol): exige al Estado reducir la jornada sin rebaja salarial, empezando por 37,5 h | 2026-04-27 | mespermallorca.cat |
| Compromís | q06 jornada de 37,5 h | +1 | Web electoral de Compromís: Front Valencià: «Apostarem per la reducció de la jornada laboral» | 2026-11-12 | frontvalencia.org |
| Compromís | q33 reparto de menores | −1 | Nota de Compromís con Aitana Mas (portavoz adjunta en Les Corts): el acogimiento es «una obligació legal» | 2026-08-07 | compromis.net |
| Compromís | q09 sanidad privada | +1 | Nota de Compromís (Baldoví y Esteve): revertir las concesiones privatizadas | 2025-12-16 | compromis.net |
| Compromís | q29 frenar Mercosur | +1 | Nota de Compromís (PNL en Les Corts, Paula Espinosa): rechazar la ratificación | 2026-01-13 | compromis.net |
| CC | q29 frenar Mercosur | +1 | Nota de CC con David Toledo (secretario de Organización): «estrategia [...] en contra del acuerdo de Mercosur» | 2026-01-27 | coalicioncanaria.org |
| CC | q17 concierto para quien lo pida | −1 | Nota del Consejo Político Nacional de CC (Toledo): rechazo a «cualquier intento» de financiación bilateral Estado-Cataluña | 2026-01-10 | coalicioncanaria.org |
| NC-BC | q31 renovación automática del alquiler | +1 | Nota de NC-BC con Carmen Hernández (vicesecretaria general): pide convalidar los dos decretos de vivienda | 2026-10-01 | nuevacanariasbc.org |
| NC-BC | q03 rebaja fiscal a menores de 40 | +1 | Nota de NC-BC (moción de Carmen Hernández): ITP del 5 al 3 % e IGIC del 3 al 1 % para menores de 40 | 2025-11-20 | nuevacanariasbc.org |

Cobertura (de 30): Ara Més pasa de 2 a 9 (de 2 a 4 si no se aceptan las notas de MÉS per Mallorca y MÉS per Palma); Compromís de 10 a 14; CC de 4 a 6; NC-BC de 5 a 7.

## Para el verificador: casos que más conviene mirar

1. **Ara Més q31 (+2).** Es la nota oficial del 13-nov, que cuenta porque es de la coalición. La frase está en la narración de la nota, que resume la intervención de Gomila.
   - Mismo criterio que la nota de q01 (6-nov) y la de q32 (10-nov), ya aceptadas.
   - +2 por coherencia con Compromís q31 («Apostarem pel lloguer indefinit»). +1 si no se ve prioritaria.
2. **Ara Més q30 (+2).** Llena la celda retirada en la reatribución. Aquella venía de Gomila en el mitin de Palma, que no cuenta; esta es la nota oficial de la coalición.
3. **Compromís q29 y CC q29 (+1)**, por la precedencia con documentos posteriores:
   - Compromís: `verificacion_g4` rechazó la +1 de Micó (DS 158) porque pedía protección del campo, en línea con el pacto con La Unió del 5-nov (salvaguardas y aranceles). La PNL del 13-ene sí pide «rebutjar la ratificació de l'acord en els seus termes actuals».
   - CC: el programa del 29-N (medida 42) pide evaluar el impacto de los acuerdos comerciales y salvaguardas, sin nombrar Mercosur.
   - En ambos casos el documento posterior no contradice el rechazo, pero tampoco lo repite. Si se considera que lo sustituye, null.
4. **Indirectas o de ámbito autonómico**:
   - Compromís q09: reversión del modelo Alzira; mismo criterio que la «reversión de privatizaciones» del manifiesto de UPC.
   - NC-BC q03: es la medida aplicada al IGIC y al ITP canarios, con límites de renta y precio.
   - CC q17: rechaza un modelo bilateral, sin hablar del cupo.
   - Ara Més q12: ley que hace vehicular la lengua propia.
   - Ara Més q13: prioridad nacional en servicios sociales, no en vivienda.
5. **Ara Més q06.** Es una nota de MÉS per Palma, la organización local. Hay que decidir si cuenta como documento del partido.

## Candidata a sustituir una posición existente

- **Compromís q24: de +1 a +2.**
  - Actual: Micó en la sesión de control del 17-jun-2026 (DS 193), +1 «sin propuesta detallada».
  - Posterior (5-oct-2026, compromis.net): Micó pide al Gobierno que use la Diputación Permanente para «derogar la Llei Mordassa». Es el titular de la nota y una petición expresa.
  - g2 y g4 ya la habían visto, pero la descartaron por ser un día anterior a la convocatoria. Con la regla del 1-nov-2025 vale, y la posterior prevalece.

Refuerzo sin cambio de valor:
- **Ara Més q01 (+1).** La nota oficial del 9-nov pide que el tope de los alquileres se aplique «automàtica[ment]» cuando se cumplan los requisitos de zona tensionada, sin depender del Govern balear. Es el núcleo de la afirmación, pero limitado a las zonas tensionadas, no a toda España.
- Se mantiene +1 con la fuente del 6-nov. Si el verificador lo ve como +2, sería candidata a sustituir. Copia: `ara_mes_fa/arames_20261109_topall_lloguers_automatic.txt`.

## Dónde se buscó, por partido

### Ara Més

- **Web de la coalición y de MÉS per Mallorca.** Comparten gestor de contenidos (timtul). El listado se carga con JavaScript, así que se leyó en el panel del navegador, sin sortear ninguna protección: 545 titulares del 22-oct-2025 al 13-nov-2026. Se abrieron unas 50 notas con palabras clave sobre las 28 celdas vacías.
- **Notas de la coalición nuevas desde el último barrido**: 7-nov (Sóller, alimentos), 8-nov (acto de Palma), 9-nov (tope automático), 13-nov (fondo de inversión) y 13-nov (inicio de campaña).
- **Diario de Sesiones del Congreso**: los turnos de Vicenç Vidal ya los leyó g4 entero, sin nada nuevo.
- **Senado** (S-100 a S-138): Juanjo Ferrer (Eivissa i Formentera al Senat, Grupo Izquierda Confederal) habla de vivienda y okupación.
  - **No se le atribuye**: es candidato de una coalición progresista y exconcejal del PI (noudiari.es), y no consta su afiliación a Ara Eivissa. Ante la duda, no se atribuye.
- **Prensa**: VilaWeb (acto de Barcelona, 4-nov, Apesteguia) y Ara Balears. Solo hay frases genéricas sobre vivienda y emergencia.
- **Sin acceso**:
  - mespermenorca.cat da un error de certificado TLS y no se sorteó.
  - El feed de araeivissa.cat no se actualiza desde 2023.

**Aviso al editor (sin efecto en este fichero).** Ara Balears (versión inglesa, oct-2026, `en.arabalears.cat/.../_1_5884014.html`) llama a Carme Gomila «coordinator of Ara Més» y dice que es, con Vidal, «from MÉS per Mallorca». Además, la nota de MÉS del 23-oct se titula «MÉS per Mallorca proposa Carme Gomila com a candidata d'Ara Més». Esto choca con la afiliación a ERC con la que se retiró q30. No se ha usado ninguna declaración de Gomila en primera persona. Conviene revisar la afiliación con una fuente primaria.

**Descartados (Ara Més)**
- **q21** (Rosa Cursach, 5-nov): «blindar el dret a la interrupció voluntària de l'embaràs» en estilo indirecto, sin mencionar la Constitución. Además, habla como candidata al Senado del Acord de Progrés (PSOE, MÉS, Sumar, EU).
- **q15**:
  - Vidal (27-ene-2026) apoya la regularización de 2026, y Marta Carrió (21-abr) llama a las extraordinarias «fracàs del sistema».
  - Defender la regularización en curso no es pedir otra: criterio de `verificacion_g4`.
- **q26**:
  - La PNL de Apesteguia contra la militarización y la OTAN (6-nov-2025), con un referéndum de permanencia, y la ley de foment de la pau (26-ene-2026).
  - El reproche de Vidal a PP, PSOE y Vox por su «aposta ferma per una despesa militar».
  - Son rechazos genéricos, sin el 3,5 %: null, igual que g4 con Micó.
- **q34**: notas sobre Naama Asfari y los presos saharauis (jul-2026) y sobre la residencia legal de los saharauis (abr-2026). Sin autodeterminación ni referéndum.
- **q11**: Maria Ramon y Apesteguia critican la expansión de la concertada, pero aceptan los conciertos como «instrument subsidiari». No piden suprimirlos.
- **q09**: críticas al modelo sanitario de Prohens, sin propuesta sobre conciertos ni derivaciones.
- **q33**: las notas del 18-nov-2025 (batles de MÉS) y del 29-oct-2025 tratan de las condiciones de acogida en el Consell, no del reparto.
- **q17 y q18**: las notas sobre financiación (ene-feb 2026, Apesteguia y Vidal) piden ordinalidad e insularidad, no un concierto ni la condonación.

**Sin posición**: q03, q04, q05, q08, q16, q19, q20, q22, q23, q25, q27, q33 y q35. No hay ninguna nota ni declaración de los dirigentes de Ara Més sobre ellas.

### Compromís

- **compromis.net**: feed completo (210 notas, 18-oct-2025 → 6-nov-2026). Se abrieron las 25 que trataban de temas de las celdas vacías. El feed no tiene notas posteriores al 6-nov.
- **Web electoral frontvalencia.org**: copia del 13-nov; el «Programa sencer» sigue con «Enllaç pendent».
- **Diario de Sesiones del Congreso** (PL-149 a PL-212):
  - Barrido propio por palabras clave en castellano y valenciano de los turnos de Micó (122) y de Ibáñez (40).
  - Los descartes de g4 sobre Micó se mantienen.
- **Senado**: ningún senador de Compromís interviene en los plenos S-100 a S-138 revisados.
- **Prensa de campaña** (À Punt, VilaWeb, El Temps, Diari La Veu, 7-13 nov): sin citas literales sobre las celdas vacías. Ibáñez pide el «lloguer indefinit», pero q31 ya es +2.

**Descartados (Compromís)**
- **q12**: Micó, en la toma en consideración de la LO de plurilingüismo (DS 157, 9-dic-2025), que Compromís firma:
  - Habla de justicia, administración y que PP y Vox «han maltractat l'escola en valencià».
  - No dice nada de la lengua vehicular ni de porcentajes, y no se encontró una nota de Compromís que describa la parte educativa. Null; la de Ara Més sí la describe.
- **q15**:
  - Ibáñez (30-jun-2026) pide ampliar el plazo de la regularización en curso, y Micó (DS 171) la defiende.
  - Ninguno pide otra.
- **q26**: Micó (DS 202, descarte de g4) y la nota de Ibáñez (mar-2026) con su «no a la guerra» de Irán. Genéricos.
- **q20**:
  - Ibáñez (DS 200, 26-ago-2026) pide una «transició accelerada» y el cierre de Cofrents.
  - La nota del 11-mar-2026 pide cumplir los objetivos renovables del PNIEC.
  - Ninguno habla del 65 %.
- **q19**: Vicent Granel (26-abr-2026) critica que el Consell desregule la eólica terrestre. Es autonómico y no trata la eólica marina.
- **q04**:
  - Micó (DS 150, 12-nov-2025) reprocha al PP que no quiera que las grandes fortunas contribuyan. Es genérico.
  - La PNL contra el fraude de los rentistas (29-ene-2026) es una medida distinta.
- **q05**: Micó (DS 180), descarte de g4.
- **q16**: Ibáñez (DS 187) habla de un referéndum sobre la república, una medida distinta.
- **q11**: Baldoví y Fullana (may-2026) piden revocar los conciertos de los colegios que segregan por sexo, por ilegalidad. No es suprimir la concertada.
- **q17**: las notas de financiación (jul-2026) y el acto de la ALE en Gandia (jun-2026) no hablan de concierto.

**Sin posición**: q03, q32, q08, q35, q25 y q27.

### Coalición Canaria

- **coalicioncanaria.org**: feed completo (170 notas, 30-oct-2025 → 13-nov-2026). Se abrieron las 10 que trataban de temas de las celdas vacías, además de las de campaña del 1 al 13-nov.
- **Senado** (S-100 a S-138): los 24 turnos de Pedro San Ginés (CC, Grupo Plural).
  - Aniceto Javier Armas (AHI) no se atribuye a CC.
- **Diario de Sesiones del Congreso**: barrido propio de los turnos de Cristina Valido; los descartes de g4 se mantienen.
- **Parlamento de Canarias**: DS 110 releído para el Mercosur de Clavijo. Los posteriores al DS 119 no se han vuelto a comprobar.
- **Programa del 29-N**: cotejado en cada celda (q29 y q17, arriba).

**Descartados (CC)**
- **q18**: San Ginés (S-108, 16-dic-2025) llama a la condonación «redistribución desigual» que castiga a Canarias. Rechaza el reparto, no que el Estado asuma la deuda: null, igual que con Clavijo en g4.
- **q15**: José Téllez (29-ene-2026) es favorable a la regularización de 2026, la que está en curso. Null.
- **q30**: Valido (2-mar-2026) apoya el decreto para topar precios en emergencias. Es una medida distinta: solo en emergencias y sobre bienes y servicios en general.
- **q27**: Valido (DS 203, 10-sep-2026) apoya dar a Ceuta «todos los recursos [...] para su protección» y se abstiene por las devoluciones automáticas. No habla de las Fuerzas Armadas.
- **q21**: la nota del 8M (Migdalia Machín) no menciona el aborto ni la Constitución.
- **q23**: Valido (DS 185), ambivalente; descarte de g4.
- **q26**: Valido (DS 157), retórico; descarte de g4.

**Sin posición**: q01, q03, q04, q05, q06, q08, q09, q11, q12, q13, q16, q20, q22, q24, q25 y q35. El programa no se pronuncia y no hay declaraciones de sus dirigentes.

### NC-BC

- **Sin oradores en las Cortes en el periodo válido**:
  - No hay diputados ni senadores de NC-BC en los plenos PL-149 a PL-212 ni S-100 a S-138.
  - El NC del Grupo Mixto que menciona el encargo es de la XIV legislatura, anterior al 1-nov-2025.
- **Webs**:
  - El feed de nuevacanarias.org se paró en jul-2025.
  - La web nueva, nuevacanariasbc.org, lista 223 notas del 2-nov-2025 al 16-oct-2026. Se leyeron por título y se abrieron unas 19.
  - En unidadpueblocanario.org (7 notas, hasta el 9-nov) no hay nada nuevo.
- **Entrevista de EFE a Luis Campos** (La Voz de Lanzarote, 12-nov): está en estilo indirecto, salvo frases genéricas.

**Descartados (NC-BC)**
- **q29**: Campos (20-ene-2026) dice que el alcance de Mercosur en Canarias será «muy limitado» y que es «desviar el foco». Ambivalente; mismo criterio que g4.
- **q32**: Natalia Santana (18-feb-2026) celebra la subida del SMI estatal y pide medidas canarias complementarias, no un SMI propio.
- **q31**: la nota de Iván Santana (Juventud Canarista, 2-oct) se usa solo como apoyo: es la rama juvenil, no un dirigente del partido.
- **q16**: la «capacidad de decidir» de Campos y del manifiesto no menciona ningún referéndum.
- Las declaraciones de dirigentes de Podemos, IU, Sumar o Verdes (Montero, Belarra, Collado) no cuentan para NC-BC.

**Sin posición**: q05, q06, q08, q11, q12, q13, q15, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q29, q30, q32 y q35.

## Por qué tantas celdas siguen vacías

Son partidos territoriales. Su agenda de campaña y sus notas tratan sobre todo de financiación, insularidad, vivienda y competencias, y apenas tocan:
- la prisión permanente revisable, los indultos o el Ministerio de Igualdad;
- el gasto en defensa con cifras, Ceuta o la jubilación;
- el IRPF de la afirmación.

Ninguno tenía programa completo publicado el 13-nov, salvo CC. El de Compromís sigue con «Enllaç pendent», el de Ara Més está en elaboración participativa y NC-BC solo tiene el manifiesto de UPC.

El buscador web apenas indexa 2026. Por eso el barrido se apoyó en las webs y los feeds oficiales y en los Diarios de Sesiones ya descargados.
