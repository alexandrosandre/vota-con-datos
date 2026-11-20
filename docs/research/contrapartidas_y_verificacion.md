# Contrapartidas, «quién decide», programas frente a votos y verificación

Informe de investigación para «Vota con datos» (elecciones generales del 29-11-2026). Fecha: 2026-11-20. Responde a las cuatro críticas de una experta en política española al paso 1 (30 afirmaciones de acuerdo/desacuerdo, posiciones codificadas desde programas y declaraciones de campaña, distancia city-block).

**Criterio de citación.** El mismo que en `vaa_estado_del_arte.md`: solo cito lo que abrí (página, PDF, resumen en el registro del editor o en Crossref) y digo qué parte abrí. Lo que solo conozco por un resumen de buscador o por una cita indirecta va marcado *(no verificado en la fuente)*.

**Estado del repositorio.** Mientras redactaba, `data/fase1/preguntas.json` ya incorporaba una reformulación (q01 → q39, q05 → q41, nuevas q37 y q38; detalle en `data/fase1/propuesta_reformulacion_2026-11-20.md`). Cito los identificadores actuales cuando hablo de la versión vigente y los antiguos cuando hablo del ejemplo de la experta. Este informe no revisa esa propuesta ítem por ítem.

## Resumen

1. **Contrapartida.** La crítica está bien fundada y tiene datos españoles: en el CIS de julio de 2025 una gran mayoría pide más recursos para sanidad (77,1 %) y vivienda (84,5 %) y casi la mitad dice que se pagan muchos impuestos (48,4 %); cuando la pregunta obliga a elegir con el coste a la vista, la distribución se reparte y separa con claridad a los electorados (media de 2,69 en votantes de Sumar frente a 6,25 en los de Vox). Lo que hay que copiar es el formato del CIS: **los dos polos llevan su coste**, no solo uno.
2. **«Quién decide».** Unir una medida y el nivel de gobierno es una pregunta de doble estímulo (*double-barrelled*), un defecto clásico y frecuente en las VAA (cerca del 20 % de las afirmaciones en 26 VAA). La literatura estadounidense muestra que el apoyo a descentralizar una política concreta depende de qué partido gobierna cada nivel, mientras que las preferencias abstractas sobre el reparto de poder son más estables. Solución: una sola idea por frase y la competencia, si interesa, como ítem propio y abstracto.
3. **Programa frente a votos.** Ni el programa ni el voto miden «ideología pura»: el programa es una declaración de intenciones y el voto en el Congreso responde sobre todo a la lógica gobierno-oposición y a paquetes legislativos. El caso de las pensiones y el IPC lo ilustra: los «no» del PP fueron a leyes y decretos que incluían más cosas, y el propio PP registró en noviembre de 2025 una proposición de ley de revalorización con el IPC. Recomiendo mantener el programa como base del cálculo y añadir, aparte, lo que cada partido votó, clasificando cada votación como específica o de conjunto.
4. **Verificación.** Las «escalas de mentira» de los tests psicológicos no se trasladan bien: en un VAA anónimo no hay respuesta correcta ni incentivo para mentir, y la incoherencia ideológica es lo normal en la mayoría de la población. Sí se pueden copiar tres cosas: depurar los datos del piloto (respuestas al azar, rapidez), validar empíricamente que las afirmaciones de un eje miden lo mismo y mostrar a cada persona **la estabilidad de su propio resultado**, sin juzgar sus respuestas.

## 1. Afirmaciones sin contrapartida

### Qué dicen la literatura y los datos

- **CIS, «Opinión pública y política fiscal (XLII)», estudio 3518, julio de 2025** (avance de resultados, tabulaciones por variables sociodemográficas y por recuerdo de voto; [sociodemográficas](https://www.cis.es/documents/d/cis/es3518sdMT_a), [recuerdo de voto](https://www.cis.es/documents/d/cis/es3518vpMT_a); N = 4004).
  - **Sin contrapartida.** P8: el 77,1 % cree que se dedican «muy pocos» recursos a la sanidad, el 84,5 % a la vivienda y el 47,3 % a las pensiones. P12: el 48,4 % dice que lo que se paga en impuestos es «mucho» (68,3 % entre votantes del PP, 27,6 % entre los del PSOE, 89,4 % entre los de Vox, 13,0 % entre los de Sumar).
  - **Con contrapartida (P9).** Escala de 0 a 10 entre dos polos, cada uno con su coste. El 0 es «Mejorar los servicios públicos y prestaciones sociales aunque haya que pagar más impuestos». El 10 es el simétrico: pagar menos aunque haya que reducir esos servicios.
  - **Distribución de P9.** De 0 a 4, 35,3 %; en el 5, 30,2 %; de 6 a 10, 30,3 %; no sabe o no contesta, 4,2 %. Solo el 6,6 % elige el 10. Media 4,48 (N válido = 3834).
  - **Por recuerdo de voto de 2023.** Sumar 2,69; PSOE 3,77; PP 5,32; Vox 6,25.
  - **Lectura.** El patrón «más gasto y menos impuestos» aparece en las preguntas sueltas; con la contrapartida, el ítem discrimina entre electorados.
  - **Edición de 2026.** La prensa informa de una edición de 2026 con más de 6000 entrevistas ([El Independiente, 29-7-2026](https://www.elindependiente.com/economia/2026/07/29/seis-de-cada-diez-espanoles-creen-que-reciben-del-estado-menos-de-lo-que-pagan-en-impuestos/amp/)), pero no localicé el documento en cis.es: la última edición verificada es la de 2025.
- **Citrin (1979)**, «Do people want something for nothing: public opinion on taxes and government spending», *National Tax Journal* 32(2, supl.): 113–129, DOI [10.1086/NTJ41863164](https://doi.org/10.1086/NTJ41863164). Registro de Crossref verificado; el texto devolvió 403. Lo cito por la idea, tal como la resume Garritzmann et al. (2023): los ciudadanos tienden a pedir «algo a cambio de nada».
- **Hansen (1998)**, «Individuals, Institutions, and Public Preferences over Public Finance», *APSR* 92(3): 513–531, DOI [10.2307/2585478](https://doi.org/10.2307/2585478) ([resumen en Cambridge](https://www.cambridge.org/core/journals/american-political-science-review/article/individuals-institutions-and-public-preferences-over-public-finance/89C146A8045AAE156B962D5247B7FB9A)). Con preguntas diseñadas para medir preferencias sobre déficit, impuestos y gasto, concluye que la opinión pública está «notablemente bien estructurada» y favorece el statu quo. El resumen no detalla el formato de los pares de opciones *(no verificado en la fuente)*.
- **Bremer y Busemeyer (2022)**, *Journal of Public Policy* 42: 684–704, DOI [10.1017/S0143814X22000095](https://doi.org/10.1017/S0143814X22000095) (texto completo, KOPS). Encuesta INVEDUC de 2014 en 8 países, España incluida (N = 8905).
  - **Formato en dos pasos.** Primero, «¿más o menos gasto social?»; después, cómo financiarlo (impuestos, deuda o recortes en otras áreas) o qué hacer con lo ahorrado.
  - **Resultado.** El grupo mayor quiere el statu quo. Un tercio quiere más gasto social a costa de otras partidas. Un 13 % lo financiaría con impuestos o deuda. Hay un 12 % de críticos y un 5 % de partidarios de recortar todo.
  - **Escenarios.** Del tipo «aumentar un 10 % el gasto en educación financiándolo con recortes en pensiones», asignados al azar (cada persona ve uno solo). Resumen de la literatura: los ciudadanos son reacios a apoyar más gasto en un área si implica recortes en otra.
- **Garritzmann, Neimanns y Busemeyer (2023)**, *EJPR* 62(1): 197–220, DOI [10.1111/1475-6765.12501](https://doi.org/10.1111/1475-6765.12501) (texto completo, KOPS). La inversión social es muy popular en abstracto, pero la mayoría rechaza subir impuestos, endeudarse o recortar; los experimentos de muestra dividida con contrapartidas (otras políticas sociales, impuestos, deuda) son el diseño de referencia.
- **Busemeyer y Garritzmann (2017)**, *JEPP* 24(6): 871–889, DOI [10.1080/13501763.2017.1298658](https://doi.org/10.1080/13501763.2017.1298658). Registro verificado; según el resumen del buscador, el apoyo cae al introducir restricciones presupuestarias *(no verificado en la fuente)*.

### Qué hacen las VAA de referencia

- **smartvote** ([metodología, Australia 2019](https://australia2019.smartvote.org/assets/pdf/Positional_matching_methodology.pdf)) separa las preguntas estándar (4 categorías) de las **preguntas de presupuesto**: «mucho más / algo más / igual / algo menos / mucho menos» para cada partida. Obliga a decir «más o menos gasto» por áreas, pero no enuncia el coste.
- **Vote Compass** ([metodología v2026.1](https://files.voxpoplabs.com/votecompass/methodology.pdf), §2.1 y §2.3.1) descarta en el piloto las preguntas de consenso o de *valence* y codifica impuestos y gasto como «apoyo al cambio nominal». No encontré en el documento una regla de contrapartida.
- **Van Camp, Lefevere y Walgrave**, «The content and formulation of statements in Voting Advice Applications. A comparative analysis of 26 VAAs» ([PDF, Universidad de Amberes](https://medialibrary.uantwerpen.be/oldcontent/container2608/files/Van%20Camp%2C%20Lefevere%2C%20Walgrave%20-%20The%20content%20and%20formulation%20of%20statements%20in%20VAAs.pdf); el PDF no indica dónde se publicó).
  - Cuentan como de doble estímulo las afirmaciones que incluyen **un argumento**.
  - Implicación: una contrapartida añadida en forma de argumento («…para mejorar X») es un defecto. En cambio, la contrapartida como **objeto de la elección**, con un coste en cada polo, es el diseño del CIS.
- **Wahl-O-Mat:** no encontré una regla publicada sobre costes; no lo verifiqué.

### Qué podemos copiar

- **El formato bipolar del CIS** para la pregunta general (la actual q37 lo adapta a acuerdo/desacuerdo) y, si el piloto lo aconseja, para 2 o 3 ítems fiscales: «más cerca de A … más cerca de B» en la escala 1–5, con el coste de A y el de B. El cálculo city-block no cambia.
- **El formato en dos pasos de INVEDUC** para las rebajas de impuestos o los aumentos de gasto: la medida y, después, «¿cómo se compensaría?» (recortar otro gasto / más deuda / subir otro impuesto / no hace falta compensarlo). La última opción recoge sin juzgarla la creencia de que la rebaja se financia sola. La posición de cada partido sale de su programa, que a veces dice cómo lo financia; la propuesta de reformulación ya lo anota para Vox en q41.
- **La regla de simetría.** Si una dirección lleva coste, la contraria también, y con el mismo tipo de fuente: identidad contable, cifra oficial o magnitud. Los beneficios no probados no se añaden nunca; véase el caso q09 en `auditoria_preguntas.md`.

### Cómo validarlo

1. **Piloto con muestra dividida** (como INVEDUC): la mitad ve cada ítem sin contrapartida y la otra mitad con ella. Se miden cuatro cosas:
   - el porcentaje de acuerdo (se espera menos techo);
   - la diferencia de medias entre electorados por recuerdo de voto (eta²);
   - la correlación con la autoubicación izquierda-derecha;
   - la comprensión y el tiempo de respuesta (Kamoen y Holleman, citados en el estado del arte).
2. **Anclaje externo.** Incluir en el piloto la P9 del CIS literal: la distribución de q37 debería parecerse a la del CIS (35/30/30, con la cautela de la muestra) y ordenar a los electorados igual (Sumar < PSOE < PP < Vox).
3. **Homogeneidad del eje económico** con los datos del piloto: análisis de Mokken con H ≥ 0,3 por ítem (Germann et al., §4). Un ítem con contrapartida debería cargar mejor en el eje que su versión suelta.
4. **Auditoría de simetría.** Tabla publicada con qué ítems llevan contrapartida, de qué tipo y en qué polaridad.

## 2. Política y «quién decide» en la misma frase

### Qué dicen la literatura y los datos

- **Menold (2020)**, «Double Barreled Questions», *Journal of Official Statistics* 36(4): 855–886, DOI [10.2478/jos-2020-0041](https://doi.org/10.2478/jos-2020-0041) (resumen en Crossref). Hizo dos experimentos aleatorizados frente a versiones de un solo estímulo.
  - Las medias y los parámetros latentes difieren entre versiones y no hay invariancia métrica ni escalar.
  - Al menos una versión de un solo estímulo es más válida.
  - Los encuestados pueden atender a un elemento e ignorar el otro.
- **Van Camp, Lefevere y Walgrave** (arriba): todas las VAA analizadas tienen al menos una afirmación de doble estímulo, y en conjunto son casi el 20 %; una de cada tres en Wahlkabine y una de cada diez en Vote Compass. Además, permiten a los partidos esquivar una posición impopular «jugando con la condicionalidad».
- **Doherty, Touchton y Lyons (2025)**, «Partisanship and Support for Devolving Concrete Policy Decisions to the States», *Political Behavior* 47(3): 1213–1230, DOI [10.1007/s11109-024-09986-y](https://doi.org/10.1007/s11109-024-09986-y) ([registro con resumen](https://experts.boisestate.edu/en/publications/partisanship-and-support-for-devolving-concrete-policy-decisions-/)). Con la CES de 2022:
  - demócratas y republicanos difieren mucho en apoyar que decidan los estados sobre **políticas concretas**;
  - la diferencia se concentra en quienes más reciben señales de las élites;
  - el apoyo a descentralizar depende de **qué partido controla el legislativo del propio estado**.

  Es el fenómeno que la experta describe. No encontré un estudio que use la expresión *fair-weather federalism*.
- **Rendleman y Rogowski (2022)**, «Americans' Attitudes Toward Federalism», *Political Behavior* 46(1): 111–134, DOI [10.1007/s11109-022-09820-3](https://doi.org/10.1007/s11109-022-09820-3) (resumen en Semantic Scholar). Con una batería nueva sobre el poder subnacional (más de 2000 adultos), las actitudes **abstractas** responden más a preferencias de fondo sobre el reparto de autoridad que a intereses políticos de corto plazo.
- **Wolak (2024)**, «Public Support for State Challenges to National Laws», *Political Research Quarterly* 78(1): 168–181, DOI [10.1177/10659129241291473](https://doi.org/10.1177/10659129241291473) (resumen en Crossref). Las personas apoyan la supremacía nacional en abstracto, pero aceptan en la práctica la resistencia de los estados a mandatos nacionales.
- **España.** Sandra León ([Piedras de Papel, 14-7-2022](https://www.eldiario.es/piedrasdepapel/ideologia-centralismo-viceversa_132_9172227.html)) compara la escala de centralismo de 0 a 10 del Barómetro autonómico del CIS (2010) con un barómetro de 40dB (2022).
  - La relación entre ideología y centralismo es más fuerte en 2022, sobre todo porque la derecha se ha vuelto más centralista.
  - Los votantes del PSOE pasan de 4,8 a 5,2.
  - Es descriptivo, con dos institutos distintos, y no separa la señal partidista de otras causas.
  - Decidir23J ya usaba un eje de centralización y descentralización (estado del arte, §1).

**Síntesis.** La preferencia abstracta por un reparto del poder es medible y bastante estable. Cuando el «quién decide» va pegado a una política concreta y a un mapa partidista conocido (leyes estatales frente a comunidades del PP), la respuesta sigue a los partidos. Por eso la antigua q01 medía dos cosas a la vez: la regulación del alquiler (eje izquierda-derecha) y el nivel de gobierno (eje territorial).

### Qué podemos copiar

- **Una sola idea por afirmación.** La reformulación ya separa el tope del alquiler (q39) de la competencia (q38, abstracta: «más competencias… aunque las normas cambien más de una comunidad a otra»). La regla debe aplicarse a todas: ninguna afirmación del eje izquierda-derecha puede llevar un nivel de gobierno, salvo que el nivel sea un dato del contexto y no parte de lo que se vota.
- **Los ítems de competencia, en el eje territorial y en abstracto.** Las competencias concretas (q17, q45, q16) son legítimas porque la competencia es el objeto. Aun así, conviene comprobar que no las responde el mapa partidista del momento.
- **Codificar a los partidos con la misma regla.** Los partidos también son «federalistas según el tiempo». Su posición sobre la competencia sale del programa vigente, con fecha, y no de lo que hacen sus gobiernos autonómicos.

### Cómo validarlo

1. **Experimento con indicio partidista en el piloto.** Versión A neutra. Versión B con el dato del mapa actual (qué partidos gobiernan el Estado y la mayoría de las comunidades). Versión C con el mapa invertido en hipótesis. Si la diferencia entre votantes del PP y del PSOE cambia mucho de A a B o a C, el ítem mide partidismo: se reformula o se retira.
2. **Validez convergente.** Los ítems territoriales deben correlacionar con la autoubicación de centralismo de 0 a 10 (la escala que usa León) más que con el recuerdo de voto.
3. **Revisión de doble estímulo** por dos personas con la regla de Van Camp et al.: «¿se puede estar de acuerdo con una parte y en desacuerdo con la otra?». El objetivo es cero afirmaciones con doble estímulo y publicar el acuerdo entre ambas.

## 3. Los programas son intenciones; los votos tampoco son ideología pura

### Qué dicen la literatura y las herramientas

- **Cumplimiento de promesas.** Thomson et al. (2017), *AJPS* 61(3): 527–542, DOI [10.1111/ajps.12313](https://doi.org/10.1111/ajps.12313), estudian más de 20.000 promesas de 57 campañas en 12 países, entre ellos España. Los partidos que gobiernan solos cumplen más *(resumen de buscador y registro de la UCM; no verificado en la fuente)*. Para España, Artés (2013), *Party Politics* 19(1): 143–158, DOI [10.1177/1354068811407581](https://doi.org/10.1177/1354068811407581) (solo registro).
- **El voto parlamentario responde sobre todo a gobierno frente a oposición.** Hix y Noury (2016), *PSRM* 4(2): 249–273, DOI [10.1017/psrm.2015.9](https://doi.org/10.1017/psrm.2015.9) ([resumen, LSE](https://researchonline.lse.ac.uk/id/eprint/62179)). Con 16 parlamentos, la división gobierno-oposición es el principal motor del voto en la mayoría de contextos; votar por temas a lo largo de una dimensión ideológica solo aparece con gobiernos de coalición en regímenes presidenciales o con gobiernos en minoría.
- **Stemmentracker (ProDemos, Países Bajos), una VAA basada en votaciones.** Louwerse y van Well ([Stuk Rood Vlees, 18-11-2023](https://stukroodvlees.nl/hoe-representatief-is-de-stemhulp-die-terugkijkt/)) comparan su selección con todas las votaciones no unánimes de la Tweede Kamer.
  - Los patrones generales coinciden, pero la selección agranda o encoge diferencias.
  - D66, en el Gobierno, votó contra mociones que en la oposición habría apoyado.
  - JA21 y BBB coinciden unos 20 puntos menos con la izquierda en la herramienta que en el conjunto de votaciones.
  - Consejo de los autores: ignorar las diferencias pequeñas.
- **smartvote frente al voto posterior.** Sarah Bütikofer en [SRF (29-10-2023)](https://www.srf.ch/news/schweiz/wahlen-2023/smartvote-zu-den-wahlen-2023-diese-anliegen-koennten-jetzt-im-nationalrat-mehrheitsfaehig-werden):
  - solo la mitad de las preguntas se puede comparar con votaciones posteriores;
  - en esas, la coincidencia supera el 80 %;
  - los partidos de los polos son más fieles que los de centro y el FDP.

  Politools mantiene además smartmonitor, una base de datos del Parlamento suizo desde 2012 ([página](https://politools.net/en/projects-services/smartmonitor/)).
- **DeinWal (Alemania)**, según [netzpolitik.org (2021)](https://netzpolitik.org/2021/bundestagswahl-2021-wahlhilfe-tool-wertet-abstimmungsverhalten-aus/).
  - Plantea 25 tesis construidas con votaciones nominales del Bundestag: mide «el comportamiento real, no las promesas».
  - Solo incluye partidos con escaño, y las votaciones las eligen sus tres voluntarios.
  - Reconoce que la disciplina de voto limita lo que dice un voto individual.
  - Real-O-Mat (FragDenStaat) sigue la misma lógica *(solo resumen de buscador)*.
- **abgeordnetenwatch.de** ([kandidierendencheck, 3-2-2025](https://www.abgeordnetenwatch.de/node/5874)) guarda las respuestas de los candidatos tras la elección como «memoria digital del electorado», para compararlas después.
- **HowTheyVote.eu** ([about](https://howtheyvote.eu/about)) solo muestra votaciones nominales. Recoge las de enmiendas, pero aún no las muestra, y advierte de que «no votó» puede ser ausencia y no abstención.
- **España.**
  - El Congreso publica cada votación del Pleno con su resultado y un ZIP por sesión ([datos abiertos](https://www.congreso.es/es/opendata/votaciones)).
  - «Qué se vota» ([datos.gob.es](https://datos.gob.es/es/aplicaciones/que-se-vota)) ordena las iniciativas por el voto de cada partido, pero usa un modelo de ChatGPT para elegir la «votación principal» de cada una, sin validación descrita.
  - Maldita analizó qué medidas cayeron con el decreto ómnibus de 2025 ([artículo](https://maldita.es/malditobulo/20250128/decreto-omnibus-medidas-por-separado/); solo pude leer el título).
  - De «¿Qué hacen los diputados?», Political Watch o los rastreadores de Newtral no localicé una fuente primaria activa.

### El ejemplo de las pensiones y el IPC, con fuentes

- **Ley 21/2021 de garantía del poder adquisitivo de las pensiones.** Unía la revalorización con el IPC y el mecanismo de equidad intergeneracional (MEI). En el Senado salió con 151 votos a favor y 108 en contra; votaron en contra PP, Vox y Ciudadanos, y la objeción declarada del PP era el MEI ([Público, 22-12-2021](https://www.publico.es/economia/senado-aprueba-definitivamente-ley-revaloriza-pensiones-ipc.html)).
- **Enero de 2025: primer decreto ómnibus.** Juntaba la subida de pensiones con transporte y escudo social, y cayó con el «no» de PP, Vox y Junts *(recuento solo por resumen de buscador)*. El 12-2-2025 se convalidó otro más reducido con 315 votos y el PP a favor ([elDiario.es](https://www.eldiario.es/politica/congreso-convalida-revalorizacion-pensiones-ayudas-transporte-publico-segundo_1_12047053.amp.html)).
- **Noviembre de 2025: proposición de ley del PP.** La Mesa admite a trámite el 11-11-2025 la proposición 122/000235 del Grupo Popular, «para garantizar el poder adquisitivo de las pensiones públicas», que revaloriza las de 2026 con el IPC medio ([BOCG-15-B-279-1](https://www.congreso.es/public_oficiales/L15/CONG/BOCG/B/BOCG-15-B-279-1.PDF), 14-11-2025).
- **27-1-2026: segundo decreto ómnibus.** Unía la subida del 2,7 % con la moratoria de desahucios, descuentos eléctricos y otras medidas, y cae por 171 votos a 178 con PP, Vox y Junts en contra. El Gobierno anuncia un decreto solo de pensiones, como pedían PP y Junts ([elDiario.es](https://www.eldiario.es/politica/pp-vox-junts-tumban-subida-pensiones-prorroga-escudo-social_1_12938910.amp.html)).
- **26-2-2026: convalidación del RDL 3/2026.** El Congreso convalida ese decreto de revalorización ([La Moncloa](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2026/260226-convalidacion-revalorizacion-pensiones.aspx); la nota no da el voto por grupos).

**Lectura.** Los dos «no» del PP fueron a paquetes, y en las votaciones y proposiciones específicas su posición sobre el IPC coincide con su programa. El ejemplo muestra sobre todo **la trampa del ómnibus**. La crítica de fondo sigue en pie: una sola cita de programa no basta, y conviene enseñar el historial. Además, si PP y PSOE están de acuerdo en algo, el ítem no los separa y debería caer por *valence* (criterio de Vote Compass).

### Qué podemos copiar

- **Puntuar con el programa y mostrar los votos aparte.** El programa sigue siendo la base del cálculo: es la única fuente comparable para todos los partidos, también los que no tienen escaño, y es lo que hacen Vote Compass y smartvote. Junto a cada afirmación, un panel «Qué ha votado cada partido» con las votaciones de la XV Legislatura sobre esa medida, sacadas de los datos abiertos del Congreso.
- **Clasificar cada votación como específica o de conjunto.** Específica: proposición de ley de una sola medida, enmienda o votación separada. De conjunto: ley o decreto con varias medidas. En las de conjunto se listan las otras medidas y la razón que dio el partido en el Diario de Sesiones; nunca cuentan como posición sobre la medida.
- **Discrepancia programa-voto** solo cuando una votación específica contradice la posición codificada. Se muestran las dos cosas, con lenguaje descriptivo («votó en contra de…») y nunca valorativo. El partido puede responder, como en la consulta de Vote Compass.
- **Una vista alternativa «según sus votos»** para los partidos con escaño, si se quiere, como segunda lectura. Debe advertir del efecto gobierno-oposición (Hix y Noury; el caso de D66).

### Cómo validarlo

1. **Fiabilidad de la clasificación.** Dos personas clasifican cada votación (específica o de conjunto, y sentido) y se publica el alfa de Krippendorff.
2. **Congruencia por partido**, como el dato de Bütikofer: el porcentaje de votaciones específicas que coinciden con la posición codificada, y cuántas afirmaciones tienen al menos una votación específica.
3. **Control del efecto gobierno-oposición.** Si las discrepancias se concentran en los partidos del Gobierno o en los de la oposición, reflejan esa lógica y no incoherencia; se dice en la página.
4. **Simetría de cobertura.** Se publica cuántas votaciones se revisaron por partido, para que no se escrute más a quien más votaciones tiene.

## 4. Un «factor de verificación»

### Qué dicen la literatura y las herramientas

- **Respuestas descuidadas en encuestas.**
  - Curran ([preprint en PsyArXiv](https://doi.org/10.31234/osf.io/n3wbc)) revisa los métodos para detectar respuestas con poco esfuerzo; Meade y Craig (2012), *Psychological Methods* 17(3): 437–455, DOI [10.1037/a0028085](https://doi.org/10.1037/a0028085), es la referencia clásica *(solo registro)*.
  - Berinsky, Margolis y Sances (2014), *AJPS* 58(3): 739–753, DOI [10.1111/ajps.12081](https://doi.org/10.1111/ajps.12081): **varias** preguntas de control funcionan mejor que una. Superarlas correlaciona con características políticamente relevantes, así que excluir a quien falla sesga la muestra; recomiendan presentar resultados según el nivel de atención.
  - Kung, Kwok y Brown ([preprint](https://doi.org/10.31234/osf.io/9vrdn)): las preguntas de respuesta indicada no alteraron la validez de la escala estudiada.
- **En las VAA.** Germann, Mendez, Wheatley y Serdült (2015), *Acta Politica* 50: 214–238, DOI [10.1057/ap.2014.3](https://doi.org/10.1057/ap.2014.3) (texto completo).
  - Los usuarios experimentan con la herramienta: antes de validar hay que filtrar entradas múltiples y clics al azar (citan a Andreadis, 2012, cuyos umbrales no verifiqué).
  - Con los primeros 3872 usuarios de smartvote 2007, las escalas definidas *a priori* no eran unidimensionales: H de Loevinger de 0,25 y 0,12, por debajo de 0,3.
  - Con escalas corregidas, el 42,21 % de los usuarios posteriores habría recibido otro consejo.
- **La coherencia ideológica es minoritaria.**
  - Kalmoe (2020), *Political Psychology* 41(4): 771–793, DOI [10.1111/pops.12650](https://doi.org/10.1111/pops.12650): orientaciones ideológicas coherentes, estables y polarizadas solo en el 20–30 % más informado.
  - Ellis y Stimson (2012), *Ideology in America*, DOI [10.1017/CBO9781139094009](https://doi.org/10.1017/CBO9781139094009): un público simbólicamente conservador y operativamente progresista, las dos cosas reales y duraderas.
  - Una «incoherencia» entre ítems de izquierda y de derecha no es, por tanto, un error ni una mentira.
- **Polaridad.** Holleman et al. (2016), citado en el estado del arte: una afirmación y su negación no son equivalentes, así que un desacuerdo entre «pares espejo» puede ser un efecto de redacción.
- **Ninguna VAA consultada avisa al usuario de respuestas contradictorias.** Que no lo encontrara no prueba que no exista.

**Por qué la analogía con las escalas de mentira es limitada.** Las escalas de mentira de los tests clínicos detectan deseabilidad social cuando hay algo en juego. En un VAA anónimo, sin cuenta y calculado en el navegador, no hay respuesta correcta ni incentivo para mentir. Los riesgos reales son tres: responder sin leer, no entender la frase y combinar preferencias sin coste («algo a cambio de nada»). El tercero se corrige en la redacción (§1), no con un detector.

### Qué podemos copiar, sin paternalismo

- **Verificar el resultado, no a la persona.** Es un indicador de estabilidad: el navegador recalcula la afinidad quitando cada afirmación, o con remuestreos de las afirmaciones respondidas, y muestra algo así: «Tu primer partido se mantiene en 87 de cada 100 combinaciones». Es neutral, no juzga ninguna respuesta y amplía al usuario la auditoría (b) del estado del arte.
- **Aviso de rapidez.** Si el tiempo medio por afirmación es menor que un umbral fijado con el piloto, se muestra «Has respondido muy rápido; el resultado puede ser poco fiable». No depende de qué se responde.
- **Como mucho, un par espejo de la misma medida exacta**, separado en el cuestionario y validado en el piloto. Si las dos respuestas apuntan en sentidos opuestos, se ofrece: «Estas dos respuestas sobre la misma medida apuntan en sentidos opuestos. ¿Quieres revisar alguna?», con «Mantener» y «Revisar» con el mismo peso. Sin penalización y sin la palabra «contradicción».
- **Nunca avisos de «incoherencia ideológica»** entre medidas distintas (por ejemplo, entre bajar impuestos y subir el gasto en sanidad): presuponen un paquete ideológico y serían sesgados.
- **Preguntas de control (respuesta indicada) solo en el piloto**, varias, para depurar los datos con los que se eligen y validan los ítems; no en la web pública.

### Cómo validarlo

1. **Estabilidad.** En el piloto, la distribución del indicador de estabilidad, y si cambia al introducir las contrapartidas: deberían dar resultados más estables si miden mejor.
2. **Pares espejo.** El porcentaje de pares en conflicto, cuántas personas revisan al ver el aviso y si su resultado cambia.
3. **Equidad de los avisos.** Las tasas de aviso por autoubicación ideológica y por recuerdo de voto deben ser parecidas. Si un aviso salta mucho más en un grupo, está cargado ideológicamente y se retira.
4. **Validación dinámica de escalas** con usuarios reales depurados, como Germann et al.: Mokken por eje, H ≥ 0,3, y efecto de la corrección en el primer puesto.

## Recomendaciones para Vota con datos

1. **Contrapartida simétrica.** Toda afirmación que suba o baje ingresos o gasto público lleva coste en las dos direcciones posibles, con la misma clase de fuente: identidad contable, cifra oficial o magnitud. Publicar una tabla de qué ítem lleva qué contrapartida y en qué polaridad.
2. **Formato CIS para lo fiscal general.** Mantener q37 como ítem ancla e incluir en el piloto la P9 del CIS literal para comparar. Probar en 2 o 3 ítems el formato bipolar «más cerca de A / de B».
3. **Probar el formato en dos pasos** (medida + «¿cómo se compensaría?») para las rebajas de impuestos, con la opción «no hace falta compensarlo» y la posición de cada partido según su programa.
4. **Una sola idea por afirmación.** Ninguna afirmación del eje izquierda-derecha incluye el nivel de gobierno. Dos revisores aplican la regla de Van Camp et al. y el objetivo es cero afirmaciones con doble estímulo.
5. **Competencias en el eje territorial y en abstracto** (como q38), con un experimento en el piloto con y sin indicio del mapa partidista; se retiran los ítems cuya respuesta cambia con ese indicio.
6. **Descartar por *valence* también entre los grandes.** Si todos los partidos con posición documentada, o los dos mayores, coinciden, el ítem no entra salvo que separe a otros partidos de forma relevante.
7. **Programa para puntuar, votos para contrastar.** Panel «Qué ha votado cada partido» desde los datos abiertos del Congreso, con cada votación clasificada como específica o de conjunto. Las de conjunto nunca cuentan como posición. Discrepancias solo con votaciones específicas, en lenguaje descriptivo y con derecho de respuesta.
8. **Publicar la congruencia programa-voto por partido** con sus cautelas: cobertura y efecto gobierno-oposición.
9. **Verificar el resultado, no a la persona.** Indicador de estabilidad del primer puesto, aviso de rapidez y, como mucho, un par espejo con aviso opcional y sin penalización. Ningún aviso de «incoherencia ideológica».
10. **Piloto con preguntas de control y validación dinámica.** Varias preguntas de respuesta indicada solo en el piloto, depuración, Mokken por eje (H ≥ 0,3) y auditoría de equidad de los avisos. Publicar los resultados con el código.

## Límites

- **Textos que no abrí completos.**
  - Solo registro bibliográfico: Citrin (1979), Meade y Craig (2012) y Artés (2013).
  - Solo resumen: Hansen (1998), Rendleman y Rogowski (2022), Wolak (2024) y Doherty et al. (2025).
  - Solo resumen de buscador: Busemeyer y Garritzmann (2017) y Thomson et al. (2017).
  - Curran y Kung et al., por su preprint; no comprobé la versión publicada.
- **CIS.** No localicé en cis.es la edición de 2026 del estudio fiscal; uso la de julio de 2025. Tampoco verifiqué el cuestionario territorial del CIS.
- **Votaciones.** El recuento del decreto ómnibus de enero de 2025 y el voto por grupos del RDL 3/2026 no constan en las fuentes que abrí. Tampoco localicé el voto del PP en el Congreso sobre la Ley 21/2021; solo el del Senado.
- **Herramientas sin verificar.** Wahl-O-Mat (costes), StemWijzer, Real-O-Mat, Political Watch, «¿Qué hacen los diputados?» y los rastreadores de Newtral.
- **Transferibilidad.** La evidencia sobre federalismo es estadounidense y puede no trasladarse a España; la española que encontré (León, 2022) es descriptiva y compara dos institutos distintos.
- **Decisiones de diseño.** Los umbrales y formatos propuestos (número de pares espejo, umbral de rapidez, 2–3 ítems bipolares, «87 de 100») son propuestas para el piloto, no resultados de la literatura.
