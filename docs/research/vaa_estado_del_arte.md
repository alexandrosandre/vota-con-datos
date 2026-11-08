# Estado del arte en el diseño de VAA (aplicaciones de consejo de voto)

Informe de investigación para "Vota con datos" (elecciones generales del 29-11-2026). Fecha: 2026-11-08.

**Criterio de citación.** Cada fuente se abrió durante la redacción (página, PDF o registro Crossref). Lo que solo se apoya en un resumen de buscador, o no pude abrir, está marcado como *(no verificado en la fuente)*. Donde no pude confirmar un DOI, doy la URL y no el DOI.

## 1. VAA de referencia y su diseño

| VAA | Afirmaciones | Escala | Posiciones de partidos | Cálculo | Fuente |
|---|---|---|---|---|---|
| Wahl-O-Mat (bpb) | 38 "Thesen" (edición analizada) | de acuerdo / neutral / en desacuerdo / saltar | Los partidos responden ellos mismos, con justificación; la bpb no las interpreta | Puntos por tesis: coincidencia 2, cercanía 1, opuesto 0; tesis destacada cuenta doble; tesis saltada sale del cálculo | [Explicación](https://www.bpb.de/system/files/dokument_pdf/Erkl%C3%A4rung_Wahl-O-Mat.pdf); [Rechenmodell](https://media.frag-den-staat.de/files/foi/410921/Rechenmodell_des_Wahl-O-Mat5.pdf); [bpb](https://www.bpb.de/themen/wahl-o-mat/) |
| StemWijzer (ProDemos) | máx. 30 | eens / oneens / geen van beide *(no verificado en la fuente)* | Partidos responden y justifican; ProDemos las contrasta con el programa *(no verificado en la fuente)* | Acuerdo | Resultados de búsqueda sobre la [FAQ](https://source.stemwijzer.nl/?p=759); la página no se pudo abrir |
| Kieskompas | ~30 | más gradaciones que StemWijzer *(no verificado en la fuente)* | Método mixto: codificación experta de textos + autoubicación del partido (Krouwel y van Elfrinkhof, *Quality & Quantity*) | Mapa bidimensional | Solo resumen de búsqueda; el PDF devolvió 403 |
| smartvote | 35 (Australia 2019); 75 en Suiza; ~30–40 en la versión internacional *(búsqueda)* | 4 categorías (sí/no con matiz) y 5 en preguntas de presupuesto; valores 100/75/50/25/0 | Candidatos y partidos deben responder todo | Distancia euclídea normalizada por la distancia máxima; el votante puede saltar preguntas y ponderar (×2, ×1, ×0,5) | [Metodología de matching](https://australia2019.smartvote.org/assets/pdf/Positional_matching_methodology.pdf) |
| EU Profiler / euandi | 30 declaraciones, 5 puntos + "sin opinión" *(no verificado en la fuente)* | — | "Método iterativo": autoubicación de partidos + juicio experto; cientos de científicos sociales | — | [EUI](https://eurompmatch.eui.eu/about.php) |
| Vote Compass (Vox Pop Labs) | ~30, elegidas entre hasta 100 candidatas probadas en un piloto de ~1.000 adultos | Likert de 5 categorías | Dos codificadores por separado, comparan, después consulta y conciliación con los partidos | Algoritmos de distancia; mapa y gráficos por tema | [Metodología v2026.1](https://files.voxpoplabs.com/votecompass/methodology.pdf) |

**Antecedentes españoles.**
- **Decidir23J (UPF y UOC, generales de 2023):** 25 preguntas; las posiciones las codificaron expertos a partir de los programas; selección estadística de las preguntas; piloto previo; mapa de dos ejes (izquierda-derecha y centralización-descentralización); declara no recoger datos personales. No se indica en la fuente escala ni fórmula. [Nota de la UOC](https://www.uoc.edu/en/news/2023/178-uoc-and-upf-researchers-launch-decidir23).
- **aquienvoto.org, elecciones.es:** mencionados por la prensa y la red European VoteMatch, no verificados en fuente primaria. EUVox y Electoral Compass no aparecieron para España en 2023.
- **ChatElecciones / ProgramIA (2023):** no son VAA; son asistentes de IA sobre programas, y sus propios creadores los califican de experimentales. [Lyntia](https://www.lyntia.com/en/news/artificial-intelligence-could-it-help-you-decide-who-to-vote-for/).

**Lección general.** Los VAA serios coinciden en cuatro cosas: unas 30 afirmaciones, un piloto que descarta las poco discriminantes, posiciones de partidos documentadas y consultadas con los propios partidos, y una descarga explícita ("no es consejo de voto", Vote Compass §1.3).

## 2. Selección y redacción de afirmaciones

**La selección condiciona el resultado.** Walgrave, Nuytemans y Pepermans (2009) concluyen que la selección concreta de afirmaciones tiene un impacto considerable en el consejo: unas configuraciones favorecen a ciertos partidos y otras a otros. Documentan además grandes diferencias entre StemWijzer y Kieskompas para el mismo electorado (p. ej., el CDA recibía un 13% de los consejos de StemWijzer y un 21% de Kieskompas). DOI [10.1080/01402380903230637](https://doi.org/10.1080/01402380903230637) (PDF abierto).

Lefevere y Walgrave (2014), *Electoral Studies* 34(4): 252–262, estudian el efecto de la selección sobre la capacidad de emparejar votantes y partidos. [Registro VUB](https://researchportal.vub.be/en/publications/a-perfect-match-the-impact-of-statement-selection-on-voting-advic/) (el registro no da DOI ni resumen; no cito sus hallazgos cuantitativos).

**Criterios de selección usados en la práctica (Vote Compass, §2.1):**
- Capacidad de diferenciar entre partidos y entre votantes.
- Descarte de cuestiones de consenso o "valence".
- Claridad, especificidad y brevedad.
- Piloto con muestra representativa.
- Cobertura de los temas prominentes en programas y medios.

**Redacción.**
- Kamoen y Holleman (2017): en ~1 de cada 5 preguntas los usuarios tienen un problema de comprensión. La mayoría son semánticos (jerga política, topónimos, cuantificadores vagos como "más"). Los usuarios casi nunca los resuelven buscando; adivinan y responden, o marcan neutral / sin opinión. Dos estudios: entrevistas cognitivas (n=60) y 357.858 usuarios de 34 VAA. DOI [10.18148/srm/2017.v11i2.6728](https://doi.org/10.18148/srm/2017.v11i2.6728).
- Holleman, Kamoen, Krouwel, van de Pol y de Vreese (2016), *PLoS ONE* 11(10), "Positive vs. Negative": en un experimento de campo con 31.112 usuarios, la polaridad de la pregunta cambia las respuestas, sobre todo en usuarios con menos sofisticación política. DOI [10.1371/journal.pone.0164184](https://doi.org/10.1371/journal.pone.0164184) (Crossref verificado; solo leí el registro y el resumen del buscador). Un trabajo posterior en *Survey Practice* (2018) encuentra efectos opuestos para negaciones explícitas e implícitas sobre las respuestas "sin opinión" *(solo resumen de buscador)*.
- Implicación: equilibrar frases pro y contra no es neutral por sí mismo; hay que probar la redacción, no asumir que una negación equivale a la afirmación inversa.

## 3. Escala, "sin opinión" y pesos de importancia

- Las escalas más comunes son tres opciones (Wahl-O-Mat, StemWijzer) o cinco (Vote Compass, euandi, smartvote en presupuesto). Vote Compass argumenta que la escala de 5 categorías permite al usuario matizar más allá del sí/no (§1, simplificación necesaria).
- **Neutral frente a saltar.** La bpb avisa de que demasiados neutrales o saltos hacen el resultado poco informativo. Tratamiento en Wahl-O-Mat: saltar elimina la tesis del cálculo; neutral-neutral puntúa 2 (coincidencia total) y neutral frente a un extremo puntúa 1. Esto significa que "no tengo opinión" puede inflar la coincidencia con quien se declara neutral. Kamoen y Holleman muestran además que los neutrales y "sin opinión" suelen delatar problemas de comprensión, no una postura real.
- **Pesos.** Wahl-O-Mat: tesis destacadas ×2. smartvote: ×2, ×1, ×0,5; los pesos de candidatos no afectan al cálculo. Wahl-O-Mat permite en la pantalla "Tuning" excluir las ponderaciones del resultado. Un factor ×2 sobre uno o dos temas distorsiona el resultado.

## 4. Codificación de posiciones de partidos

- **Autoubicación + validación (método iterativo).** Trechsel y Mair (2011), *Journal of Information Technology & Politics* 8(1): 1–20: el EU Profiler añade la autoubicación del partido al juicio experto. DOI [10.1080/19331681.2011.533533](https://doi.org/10.1080/19331681.2011.533533) (Crossref verificado; no accedí al texto). El método fue adoptado a escala por EU Profiler a partir del Kieskompas neerlandés (resumen del buscador sobre el repositorio EUI).
- **Codificación experta con documentación.** Vote Compass: dos investigadores codifican por separado y comparan (fiabilidad entre codificadores), con guías explícitas para cada nivel de la escala y declaraciones públicas como respaldo; luego los partidos se autoubican en la misma lista, hay un informe de conciliación con las discrepancias y los partidos pueden recurrir aportando documentos oficiales (§2.3).
- **Auto-respuesta sin edición.** Wahl-O-Mat: la posición es la que da el partido, con justificación; la bpb no interpreta.
- **Riesgos metodológicos.** Gemenis (2013), *Acta Politica* 48(3): 268–295, advierte de que se sabe poco sobre cómo los VAA estiman las posiciones de partidos y plantea consideraciones metodológicas. DOI [10.1057/ap.2012.36](https://doi.org/10.1057/ap.2012.36) (Crossref verificado; solo resumen en buscador). Una consecuencia práctica: la autoubicación es estratégica; la codificación de textos es costosa y subjetiva; ninguna se valida sola.
- **Posición no documentada.** Ninguna fuente abierta describe una regla universal. smartvote exige que partidos respondan todo; Wahl-O-Mat y Vote Compass tratan el hueco como ausencia de respuesta (en Wahl-O-Mat, "saltar" por parte del usuario excluye la tesis; para partidos sin respuesta la fuente no detalla el caso).

## 5. Algoritmos de emparejamiento

- Familias: acuerdo porcentual (StemWijzer, Wahl-O-Mat), distancia city-block (Manhattan), distancia euclídea (smartvote) y mapas espaciales bidimensionales (Kieskompas, Decidir23J).
- **El algoritmo cambia el consejo.** Louwerse y Rosema (2014), *Acta Politica* 49(3): 286–312, con respuestas reales de usuarios de StemWijzer: la mayoría habría recibido otro consejo con otro modelo espacial; la frecuencia con que sale cada partido como primero depende mucho del método. DOI [10.1057/ap.2013.30](https://doi.org/10.1057/ap.2013.30) (Crossref verificado; resumen leído en la página del autor).
- Mendez (2012), "Matching voters with political parties and candidates: an empirical test of four algorithms", *Int. J. of Electronic Governance* 5(3/4): 264. DOI [10.1504/IJEG.2012.051316](https://doi.org/10.1504/IJEG.2012.051316) (Crossref verificado; acceso de pago, solo resumen). No cito resultados de Mendez 2017 porque no pude verificarlo.
- **Manipulabilidad.** Berdoz et al. (2025), arXiv [2505.13329](https://arxiv.org/abs/2505.13329), con datos de smartvote: cambiar parámetros como el método de matching altera la frecuencia de recomendación de un partido hasta un 105%; elegir selectivamente las preguntas, más de un 261%; retocar ligeramente las respuestas de partidos, hasta un 248%. Proponen propiedades de robustez y métricas para compararlas.
- **Interpretación.** smartvote advierte explícitamente que su porcentaje es una correspondencia geométrica y no la proporción de preguntas en que se coincide. El acuerdo porcentual es más fácil de explicar; la distancia respeta la intensidad.
- **Normalización.** smartvote divide por la distancia máxima calculada solo sobre las preguntas respondidas por el votante, y Wahl-O-Mat excluye las tesis saltadas del cálculo. Hay que normalizar por ítems comparables, no por el total.

## 6. Presentación, ética y fatiga

- Vote Compass: los resultados no son un consejo de voto ni una predicción (§1.3). Garzia, en un taller de la bpb, sostiene que un VAA debe orientar, no decir a quién votar *(según resumen del buscador, no verificado)*.
- La bpb ofrece "Parteienvergleich" y "Begründungen" (comparación y justificación por tesis), y "Tuning" (cambiar respuestas y pesos viendo el efecto).
- Longitud: ~30 afirmaciones y unos 10 minutos (Vote Compass, según reseñas; no localizado en el PDF).
- Privacidad: Decidir23J declara no recoger datos personales y anonimizar lo introducido.
- Robustez: ver Berdoz et al. y Louwerse y Rosema.

## Recomendaciones para Vota con datos

1. **Número de afirmaciones: 30**, entre una lista inicial de unas 60–100, filtrada por un piloto breve. Cubrir economía/fiscalidad, vivienda, sanidad y educación, pensiones, inmigración, medio ambiente/energía, territorial, instituciones/justicia, política exterior y libertades. Descartar las afirmaciones que todos los partidos comparten (valence) o que nadie rechaza. Una sola idea por frase, sin jerga, sin cuantificadores vagos ("más") y sin topónimos. Tiempo objetivo ≤ 10 minutos.
2. **Equilibrio de redacción.** Aproximadamente la mitad de las afirmaciones en sentido pro-cambio y la mitad en sentido contrario de cada eje; evitar negaciones explícitas. Probar la redacción con 5–10 personas en entrevistas cognitivas (como Kamoen y Holleman) antes de publicar.
3. **Escala.** Cinco puntos (muy de acuerdo … muy en desacuerdo), más un botón separado "Sin opinión / saltar". El punto medio se trata como posición real; saltar elimina la afirmación del cálculo.
4. **Importancia.** Opcional, tras responder, con tres niveles (×2, ×1, ×0,5) como smartvote. El resultado se muestra siempre con y sin pesos, y por defecto sin pesos hasta que el usuario los active.
5. **Protocolo de codificación.** Dos codificadores independientes por partido, solo desde programa electoral y documentos oficiales, con una guía escrita de cada nivel de la escala, cita textual y página o URL por posición. Medir el acuerdo entre codificadores (por ejemplo, alfa de Krippendorff o porcentaje de coincidencia exacta y a ±1) y resolver las discrepancias con una tercera persona. Enviar a cada partido su tabla de posiciones y las citas, con plazo y registro público de las respuestas; si un partido discrepa, aportar su documento y revisar, y mostrar ambas versiones si no hay acuerdo. Todo se publica (CSV + citas) en el repositorio.
6. **Fórmula.** Distancia city-block normalizada, con pesos:
   `Afinidad(v,p) = 100 · (1 − Σ wᵢ·|vᵢ − pᵢ| / Σ wᵢ·4)`, con `vᵢ, pᵢ ∈ {1..5}`, sumada solo sobre las afirmaciones respondidas por el usuario y con posición documentada del partido.
   Mostrar también el porcentaje de afirmaciones con acuerdo (misma posición ±0) como segunda cifra, porque es lo que el público entiende como "coincidir". Explicar en la interfaz que el porcentaje es una distancia, no una probabilidad de voto (advertencia de smartvote).
7. **Posición ausente de un partido.** Marcar "sin posición documentada", excluir esa afirmación del cálculo de ese partido (no tratarla como neutral ni como oposición) y mostrar la **cobertura** (n/N afirmaciones comparables). Si la cobertura de un partido es inferior al 70% de las afirmaciones respondidas, mostrar su resultado con aviso o sin rango.
8. **Reglas de presentación.**
   - No presentar un "ganador" único: agrupar los partidos cuya afinidad esté dentro de un margen (p. ej., ≤ 5 puntos del mejor) y mostrar el orden alfabético o el orden por afinidad con la misma tipografía.
   - Siempre un desglose por tema y por afirmación, con la cita de la fuente de cada posición.
   - Declarar en cada pantalla de resultados que no es consejo de voto ni una predicción.
   - Sin cuenta ni cookies de seguimiento; el cálculo ocurre en el navegador y no se envía ninguna respuesta.
   - Accesibilidad: WCAG 2.1 AA, navegación por teclado, no depender solo del color, textos en lenguaje claro.
9. **Auditorías antes de publicar (y publicadas).**
   - (a) Frecuencia con que cada partido sale primero con 10.000 usuarios simulados, con perfiles aleatorios y con perfiles de tipo de votante, y comparación con city-block y euclídea (Louwerse y Rosema; Berdoz et al.). Documentar los desacuerdos.
   - (b) Prueba de omisión: recalcular quitando cada afirmación y cada tema, y medir cuánto cambia el primer puesto.
   - (c) Sensibilidad a las posiciones: perturbar ±1 una fracción de las posiciones codificadas y medir el efecto.
   - (d) Balance de redacción: recuento de afirmaciones pro/contra por eje.
   - (e) Informe de fiabilidad entre codificadores.
   - (f) Piloto de comprensión (punto 2).
   - Todo en código abierto y reproducible.

## Límites de este informe

- No se abrieron los textos completos de Lefevere y Walgrave (2014), Gemenis (2013), Mendez (2012), Trechsel y Mair (2011) y Holleman et al. (2016); su contenido se limita a lo que recogen sus resúmenes y registros. DOIs verificados en Crossref: Louwerse y Rosema, Gemenis, Trechsel y Mair, Mendez, Holleman et al. y Walgrave et al. (este último, además, en el PDF). El DOI de Lefevere y Walgrave no se pudo verificar.
- No se verificaron métodos de EUVox, Electoral Compass ni de VAA españoles anteriores a 2023 distintos de Decidir23J.
- Las cifras de umbral (70% de cobertura, margen de 5 puntos, 10.000 usuarios simuladas) son decisiones de diseño propuestas, no resultados de la literatura.
