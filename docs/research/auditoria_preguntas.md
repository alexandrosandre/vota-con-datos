# Auditoría de redacción de las afirmaciones de la fase 1

Revisión de `data/fase1/preguntas.json` (bloque `preguntas`, 29 afirmaciones; q05 ya se reformuló y queda fuera). Fecha: 2026-11-09. Criterio: `docs/research/vaa_estado_del_arte.md` (§2 y recomendaciones 1–2: una sola idea, sin jerga, sin cuantificadores vagos, sin negaciones, contexto neutral y con fuente) y la lección de q05 (un mecanismo sin dirección, magnitud ni afectados no se puede valorar).

**Método.** Leí cada `texto`, `contexto` y `origen`. Abrí las URL de origen cuando la fidelidad dependía de un detalle (Frente Amplio, Podemos, PP vivienda y okupación, Vox en Infobae y El Debate) y comprobé con búsquedas los hechos del contexto que podían haber cambiado en 2025–2026. Lo que no pude confirmar en fuente primaria va marcado *(verificar)*. No se ha editado `preguntas.json`.

**Escala de gravedad.**
- **Alta:** el votante responde a algo distinto de lo que se codifica (hecho desactualizado, efecto o parámetro que cambia quién gana, redacción sesgada).
- **Media:** ambigüedad que separa a votantes o partidos que piensan distinto, o contexto incompleto en un dato clave.
- **Baja:** claridad o pulido.

"Recodificar" indica si la nueva redacción obliga a revisar el `sentido` de alguna cita o la posición de los codificadores.

## Resumen por gravedad

| # | id | Gravedad | Problema principal | ¿Recodificar? |
|---|---|---|---|---|
| 1 | q15 | Alta | Pide aprobar una regularización extraordinaria que ya se aprobó en abril de 2026; el contexto lo omite | Sí |
| 2 | q09 | Alta | Incluye un beneficio no probado ("y reducir las listas de espera") y presenta como cambio lo que ya está permitido | Sí, si se invierte |
| 3 | q26 | Alta | Apelación a la autoridad ("como acordaron los aliados"); el contexto no da el nivel actual | No |
| 4 | q03 | Alta | Omite a quién afecta (jóvenes, en la propuesta del PP); umbral "al menos la mitad" construido; "primera vivienda" ambiguo | Sí |
| 5 | q02 | Alta | Falta propiedad o uso, umbral y precio; el contexto sugiere un umbral (10 viviendas) que no usa ninguna propuesta | Revisar |
| 6 | q14 | Alta | "Todos… por un delito" y "cumplan allí la pena" van más allá de la cita; no se distingue del Código Penal vigente | Revisar |
| 7 | q25 | Alta | Negación explícita, casi de consenso (valence) y ambigua entre compromiso político y prohibición legal | Sí |
| 8 | q01 | Media | Alcance (solo zonas caras) distinto del de las propuestas (tope general o rebaja); "más caros" vago | Revisar |
| 9 | q10 | Media | Meta sin punto de partida (6,4 % del PIB en 2024): no se sabe si es mucho o poco | No |
| 10 | q29 | Media | El mecanismo ("ratificación") ya no encaja: el acuerdo comercial está firmado y en aplicación provisional *(verificar)* | No |
| 11 | q18 | Media | "Parte" vago y no dice quién asume la deuda; el contexto no da la cifra ni el estado del proyecto | No |
| 12 | q23 | Media | El contexto omite los juicios rápidos de 2025 y la diferencia entre vivienda habitada y vacía | No |
| 13 | q17 | Media | "Todos sus impuestos… como ya hacen" contradice "casi todos" del contexto; falta el cupo; UPN mal codificado | Sí (UPN, ERC) |
| 14 | q16 | Media | "Si lo pide su parlamento" añade un mecanismo unilateral que ERC no propone (habla de negociar) | No |
| 15 | q12 | Media | "Todas las asignaturas" exagera el modelo de inmersión (la asignatura de castellano se da en castellano) | No |
| 16 | q07 | Media | "Ingresen" es ambiguo (facturación o rendimiento neto); el contexto dice "la [cuota] más baja", que es inexacto | No |
| 17 | q06 | Media | "Por debajo de las 40 horas" no fija cuánto (37,5 frente a 35) | Revisar |
| 18 | q24 | Media | Nombre oficial de la ley que pocos reconocen; no dice qué cambia; no distingue derogar de reformar | No |
| 19 | q08 | Baja | "Edad ordinaria" es jerga | No |
| 20 | q04 | Baja | "Grandes fortunas" sin umbral; el contexto omite que el impuesto se prorrogó sin fecha de fin | No |
| 21 | q19 | Baja | "Impulsar" vago; las dos propuestas de origen son locales y condicionadas | No |
| 22 | q20 | Baja | Sin nivel actual de emisiones ni objetivo europeo; "comprometerse" no dice quién | No |
| 23 | q11 | Baja | "Retirar de forma progresiva" no deja claro el punto final | No |
| 24 | q13 | Baja | El contexto habla de "viviendas protegidas" y el texto, de "viviendas sociales"; faltan los límites legales | No |
| 25 | q30 | Baja | "Alimentos básicos" sin definir; contexto sin fuente | No |
| — | q21, q22, q27, q28 | Sin problema relevante | Notas menores al final | — |

---

## Gravedad alta

### 1. q15 — Inmigración
**Texto actual:** «Aprobar una regularización extraordinaria de los inmigrantes que viven en España sin permiso de residencia.»

**Problema.** El hecho de fondo está desactualizado. El Consejo de Ministros aprobó el 14-4-2026 una regularización extraordinaria por real decreto. Se publicó en el BOE el 15-4-2026 y entró en vigor el 16-4-2026. Exige estar en España antes del 1-1-2026 y prevé "más de medio millón" de beneficiarios según el Gobierno. Las solicitudes se podían presentar hasta el 30 de junio (algunas fuentes dicen el 30 de julio). La prensa cita el número RD 316/2026 *(verificar en el BOE)*. El contexto solo menciona el arraigo, así que un votante cree que se le pregunta por algo nuevo cuando ya existe. Además, Vox está codificado `en_contra` con una cita sobre repatriar a quien entra ilegalmente, no sobre la regularización. El mismo artículo de Infobae recoge que Abascal critica regularizar "de golpe"; esa es la cita a usar.

**Alternativas (≤ 25 palabras):**
- «Aprobar otra regularización extraordinaria, como la de 2026, para los inmigrantes que sigan viviendo en España sin permiso de residencia.»
- «Que los inmigrantes que viven en España sin permiso puedan regularizarse de forma general, sin esperar los años que exige el arraigo.»

**Contexto propuesto:** mencionar el real decreto de abril de 2026, sus requisitos y la cifra estimada, citando el BOE.

**¿Recodificar?** Sí. Hay que cambiar la cita de Vox y comprobar que la cita del BNG, «promover a regularización administrativa», apoya una regularización *adicional*. Para los partidos de gobierno, la posición depende de si se pregunta por repetir la medida.

### 2. q09 — Sanidad
**Texto actual:** «Que la sanidad pública pueda pagar a clínicas privadas para atender a sus pacientes y reducir las listas de espera.»

**Problemas.**
1. **Redacción sesgada:** «y reducir las listas de espera» da por hecho el beneficio, que es justo lo que se discute, y empuja hacia el acuerdo.
2. **Es el statu quo presentado como propuesta:** el propio contexto dice que la ley ya lo permite. "Que pueda" se lee como un cambio.
3. **Inversión respecto al origen:** la afirmación se redactó en sentido contrario a la cita y ningún partido la propone. La cita de ERC («frenar la privatització», de forma genérica) no se opone a los conciertos en concreto; sería `parcial`, no `en_contra`.

**Alternativas:**
- «Prohibir que la sanidad pública pague a clínicas privadas para atender a sus pacientes.» Es fiel al BNG, que pide gestión y provisión exclusivamente públicas al modificar la Ley 15/1997.
- «Que la sanidad pública siga pagando a clínicas privadas para atender a parte de sus pacientes.» Mantiene el sentido actual, sin el beneficio implícito.

El argumento de las listas de espera debe ir al contexto con las dos lecturas: que se usa para reducirlas y que sus críticos sostienen que resta recursos a la red pública. La fuente es la Ley General de Sanidad (art. 90) en el BOE.

**¿Recodificar?** Con la primera opción, sí: el BNG pasa a `a_favor`, ERC a `parcial` y la polaridad a «progresista» (el recuento pasa a 13 progresistas y 11 conservadoras). Con la segunda, solo hay que bajar ERC a `parcial`.

### 3. q26 — Exterior y defensa
**Texto actual:** «Aumentar el gasto en defensa hasta el 3,5 % del PIB en 2035, como acordaron los aliados de la OTAN.»

**Problemas.**
- «Como acordaron los aliados de la OTAN» es un argumento de autoridad o de grupo dentro del enunciado. Empuja al acuerdo y no pertenece a la afirmación; el dato ya está en el contexto.
- Al contexto le falta el punto de partida. La OTAN estimó que España llegó al 2 % del PIB en 2025, según Público y Noticias de Navarra (28-8-2025). Sin ese dato, el votante no sabe que se trata de casi duplicar el gasto.
- «Alrededor del 2,1 %» no tiene fuente. Es la cifra que anunció Sánchez en junio de 2025 (La Moncloa, 22-6-2025) e incluye otras partidas de seguridad. Conviene decirlo.
- «PIB» es una sigla; se entiende en general, pero puede glosarse en el contexto.

**Alternativas:**
- «Aumentar el gasto en defensa hasta el 3,5 % del PIB en 2035.»
- «Aumentar el gasto en defensa desde el 2 % actual hasta el 3,5 % del PIB en 2035.»

**¿Recodificar?** No. El BNG sigue `en_contra`. Siguen sin haber partidos `a_favor` documentados, lo que conviene resolver antes del piloto.

### 4. q03 — Vivienda
**Texto actual:** «Reducir al menos a la mitad los impuestos que se pagan al comprar la primera vivienda.»

**Problemas.**
- **Falta a quién afecta.** La propuesta del PP es para jóvenes. El registro dice «menores de 40 años»; el artículo de Infobae que abrí habla de «jóvenes» sin edad, así que hay que verificar el «40» en otra fuente. Una rebaja universal y una rebaja solo para jóvenes reparten de forma muy distinta quién gana.
- **Umbral construido.** «Al menos a la mitad» no es de ningún partido: sirve para unir al PP (60 %) y a SALF (100 %).
- **«Primera vivienda» es ambiguo.** Puede ser la primera casa que uno compra (SALF: «que no tengan ninguna») o la residencia habitual (ERC: «primera residència», que incluye la del inquilino).
- **Codificación:** Vox está como `parcial` con una cita que habla de pagar a plazos y de bajar impuestos a la construcción, no de rebajar los de compra. Es dudoso.

**Alternativas:**
- «Rebajar al menos a la mitad el IVA y el impuesto de transmisiones a los jóvenes que compren su primera casa.»
- «Rebajar al menos a la mitad los impuestos de compra a quien adquiera su primera casa, sea cual sea su edad.»

**¿Recodificar?** Sí. Con la primera opción, SALF (sin límite de edad y con requisito de nacionalidad) pasa a `parcial`. Con la segunda, el PP pasa a `parcial`. Vox y ERC deben revisarse en ambos casos.

### 5. q02 — Vivienda
**Texto actual:** «Permitir expropiar viviendas a las empresas y fondos de inversión que son grandes propietarios para destinarlas a alquiler público asequible.»

**Problemas.** Faltan los parámetros que cambian quién gana y quién pierde:
- **Propiedad o uso:** Podemos habla de «expropiar el uso» (comprobado en elDiario.es) y el BNG de «expropiación temporal» de viviendas vacías.
- **Umbral:** Frente Amplio aplica fases de más de 1.000, 700 y 50 viviendas, y solo a personas jurídicas.
- **Viviendas afectadas:** todas o solo las vacías (BNG: vacías desde hace 5 años o más).

El contexto define «gran tenedor» como quien tiene más de diez viviendas, lo que sugiere un alcance que no usa ninguna propuesta. Además, la cita de Frente Amplio en `origen` dice «a precios inferiores a los de mercado», pero el artículo de elDiario.es no lo dice. La única mención a precios inferiores se refiere a cómo *compraron* los fondos las viviendas. Por eso «la expropiación exige pagar un justiprecio» parece contradecir una propuesta que no existe. Por último, la cita de UPC («sin descartar expropiaciones») es `parcial`, no `a_favor`.

**Alternativas:**
- «Permitir expropiar viviendas a empresas con más de 50 pisos para convertirlas en alquiler público asequible.»
- «Permitir que el Estado se quede, de forma temporal o definitiva, con viviendas de grandes empresas propietarias para alquilarlas a precio asequible.»

**Contexto propuesto:** quitar la definición de diez viviendas o explicar que las propuestas usan umbrales distintos, y corregir la cita de Frente Amplio en `origen`.

**¿Recodificar?** Revisar. Con la primera opción, Podemos y el BNG (uso o expropiación temporal) pueden pasar a `parcial`, y UPC pasa a `parcial` en cualquier caso.

### 6. q14 — Inmigración
**Texto actual:** «Expulsar a su país a todos los extranjeros condenados por un delito en España, para que cumplan allí la pena.»

**Problemas.**
- **Va más allá de la cita.** Vox dice «el que viene a España a cometer delitos tiene que irse a su propio país a cumplir la pena» y «fuera los delincuentes, han de ser deportados» (Infobae, 11-10-2026). No dice «todos» ni «cualquier delito», como confirmé al abrir la fuente.
- **Mecanismo poco claro.** El Código Penal vigente (art. 89) *sustituye* la prisión por la expulsión: el expulsado no cumple la pena en ningún sitio. Que la cumpla en su país exige un traslado acordado con ese Estado. El votante no puede saber qué cambia respecto a hoy, y el contexto («ya sustituye por la expulsión…») hace que la afirmación parezca el statu quo.

**Alternativas:**
- «Expulsar siempre a los extranjeros condenados por un delito, sin que el juez pueda hacer excepciones por arraigo en España.»
- «Que los extranjeros condenados en España cumplan su pena de prisión en su país de origen.» Conviene añadir al contexto que esto requiere un acuerdo con ese país.

**¿Recodificar?** Revisar. Vox sigue `a_favor`, pero la primera opción exige comprobar que Vox respalda quitar el margen del juez.

### 7. q25 — Instituciones
**Texto actual:** «Que el Gobierno no conceda indultos a personas condenadas por delitos de corrupción.»

**Problemas.**
- **Negación explícita:** «estar en desacuerdo con que no se conceda» confunde la escala (Holleman et al., 2016; recomendación 2).
- **Cuestión de consenso:** casi nadie se declara a favor de indultar la corrupción, así que discrimina poco (Vote Compass §2.1).
- **Ambigüedad:** no está claro si es un compromiso del Gobierno o una prohibición legal. El contexto sugiere un cambio de ley, pero la cita del PP es un compromiso: «no conceder indultos a *políticos*».
- **Alcance:** el PP dice «políticos» y el texto, «personas».
- **Codificación:** SALF está `parcial` por pedir que la corrupción no prescriba, que es otra medida y debería quitarse.

**Alternativas:**
- «Prohibir por ley los indultos a condenados por delitos de corrupción.»
- «Cambiar la ley del indulto para excluir de él los delitos de corrupción.»

Si el piloto confirma el efecto de consenso, conviene sustituirla por una reserva.

**¿Recodificar?** Sí. Hay que confirmar que el PP apoya una *prohibición legal* (la cita solo recoge un compromiso político) y quitar a SALF.

---

## Gravedad media

### 8. q01 — Vivienda
**Texto actual:** «Fijar por ley un precio máximo del alquiler de vivienda en las zonas donde los alquileres son más caros.»

**Problemas.**
- **Alcance distinto del de las propuestas.** Podemos («rebajar los alquileres por ley») y el BNG («limitar por ley los precios») proponen un tope general, no por zonas. Compromís pide *reducir* el alquiler, no solo congelarlo.
- **Cercanía al statu quo.** El contexto explica que la ley de 2023 ya permite limitar rentas en zonas tensionadas si la comunidad lo pide, así que el texto se parece a lo que ya existe y no dice qué cambia.
- **Vaguedad:** «donde los alquileres son más caros» no dice cuánto más caros.

**Alternativas:**
- «Limitar por ley el precio del alquiler en toda España, sin depender de que lo pida cada comunidad autónoma.»
- «Obligar por ley a bajar los alquileres en las zonas con precios más altos, además de impedir que suban.» Es fiel a Compromís.

**¿Recodificar?** Revisar. Con la primera opción, Compromís (que habla de zonas) puede pasar a `parcial`. Con la segunda, Podemos y el BNG pasan a `parcial`.

### 9. q10 — Sanidad
**Texto actual:** «Elevar el gasto en sanidad pública hasta al menos el 7 % del PIB.»

**Problema.** Es el mismo fallo que tenía q05 en versión cuantitativa: una meta sin punto de partida. El gasto sanitario público fue el 6,4 % del PIB en 2024 (101.739 millones; Estadística de Gasto Sanitario Público, nota de Sanidad y La Moncloa del 13-5-2026). Llegar al 7 % supone unos 0,6 puntos, del orden de 10.000 millones al año (cálculo propio). El contexto habla de quién la gestiona, pero no da la cifra. La afirmación roza también el consenso: pocos partidos se oponen a "más sanidad". Hace falta el piloto para comprobar si discrimina.

**Alternativas:**
- «Aumentar el gasto en sanidad pública del 6,4 % actual hasta al menos el 7 % del PIB.»
- «Aumentar el gasto en sanidad pública hasta al menos el 7 % del PIB, unos 10.000 millones de euros más al año.»

**Contexto propuesto:** añadir el 6,4 % (2024) con la URL de Sanidad.

**¿Recodificar?** No.

### 10. q29 — Medio rural
**Texto actual:** «Que España se oponga a la ratificación del acuerdo comercial entre la Unión Europea y Mercosur.»

**Problemas.**
- **El mecanismo ha cambiado.** El acuerdo se firmó en enero de 2026. El Parlamento Europeo lo remitió al TJUE (334 votos a favor, 324 en contra) y la parte comercial, que es competencia exclusiva de la UE y no necesita ratificación nacional, se aplica provisionalmente desde el 1-5-2026 según varias fuentes de prensa *(verificar; hay fuentes contradictorias)*. España solo ratificaría la parte de asociación.
- **El contexto está en futuro** («suprime la mayoría de aranceles») y no menciona nada de esto.
- **Jerga:** «ratificación» y «Mercosur» en el texto; los países solo aparecen en el contexto.

**Alternativas:**
- «Que España pida en la Unión Europea frenar el acuerdo comercial con Mercosur (Argentina, Brasil, Paraguay y Uruguay).»
- «Que España vote en contra del acuerdo de la Unión Europea con Argentina, Brasil, Paraguay y Uruguay (Mercosur).»

Ambas son fieles a ERC, que pide rechazar la ratificación y oponerse a la aplicación provisional.

**¿Recodificar?** No.

### 11. q18 — Modelo territorial
**Texto actual:** «Perdonar a las comunidades autónomas parte de la deuda que tienen con el Estado.»

**Problemas.**
- **Cuantificador vago:** «parte» no dice cuánto.
- **Falta el efecto:** no dice que la deuda la asume el Estado, es decir, todos los contribuyentes, y no desaparece.
- **Contexto impreciso y sin fuente.** El Consejo de Ministros remitió el proyecto al Congreso en diciembre de 2025: casi 83.000 millones, una media del 19 % de la deuda (Hacienda, 9-12-2025). En septiembre de 2026 seguía en tramitación (Europa Press/Legal Today, 29-9-2026) y presumiblemente decae con la disolución de las Cortes *(verificar)*.
- **Codificación:** ERC propone condonar 17.100 millones a Cataluña, no una quita general. `a_favor` es razonable, pero la cifra no coincide.

**Alternativas:**
- «Que el Estado asuma unos 83.000 millones de euros de la deuda que las comunidades autónomas tienen con él.»
- «Perdonar a las comunidades autónomas cerca de una quinta parte de su deuda con el Estado, que pasaría a pagar el Estado.»

**¿Recodificar?** No.

### 12. q23 — Seguridad y justicia
**Texto actual:** «Aprobar una ley que permita desalojar en un máximo de 48 horas a quienes ocupen sin permiso una vivienda ajena.»

**Problemas.** El texto es fiel a la cita del PP. El artículo del Ara solo recoge «echaremos en 48 horas», sin decir si desaloja la policía o un juez, así que no conviene añadir ese detalle. El problema está en el contexto:
- La LO 1/2025, en vigor desde el 3-4-2025, llevó el allanamiento de morada y la usurpación a los juicios rápidos (art. 795 LECrim).
- La policía ya puede actuar de inmediato en flagrante delito cuando se ocupa una vivienda habitada (morada).

Sin esto, el votante no sabe qué cambiaría respecto a hoy. Además, «vivienda ajena» mezcla dos situaciones con un debate muy distinto: la vivienda habitada y la vacía.

**Alternativas:**
- «Acelerar por ley los desalojos de viviendas ocupadas sin permiso, para que se hagan en un máximo de 48 horas.»
- «Que quien ocupe sin permiso una vivienda ajena, aunque esté vacía, pueda ser desalojado en un máximo de 48 horas.» El «aunque esté vacía» hay que confirmarlo en la propuesta del PP.

**Contexto propuesto:** añadir la reforma de 2025 con su referencia del BOE.

**¿Recodificar?** No.

### 13. q17 — Modelo territorial
**Texto actual:** «Que cada comunidad autónoma que lo pida recaude y gestione todos sus impuestos, como ya hacen el País Vasco y Navarra.»

**Problemas.**
- **Contradicción interna:** el texto dice «todos» y el contexto, «casi todos».
- **Falta el efecto central del modelo:** la comunidad fija buena parte de los impuestos y paga al Estado un cupo, lo que cambia la contribución a la solidaridad entre territorios.
- **Codificación de UPN:** su cita defiende *su* convenio, lo que no implica extenderlo a otras comunidades, así que no debería ser `parcial a_favor`.
- **Codificación de ERC:** la cita solo traspasa la *recaudación* a la Agència Tributària de Catalunya, así que es `parcial`.

**Alternativas:**
- «Que las comunidades que lo pidan recauden todos sus impuestos y paguen al Estado una cuota, como el País Vasco y Navarra.»
- «Dar a las comunidades que lo pidan un sistema fiscal propio como el vasco: recaudar casi todos sus impuestos y pagar una cuota al Estado.»

**¿Recodificar?** Sí: quitar UPN (o buscar su posición sobre la extensión) y pasar ERC a `parcial`.

### 14. q16 — Modelo territorial
**Texto actual:** «Permitir que una comunidad autónoma celebre un referéndum sobre su independencia si lo pide su parlamento.»

**Problema.** «Si lo pide su parlamento» introduce un mecanismo unilateral, casi automático, que no está en el origen. ERC propone *negociar* la convocatoria con acompañamiento internacional, y el BNG, «mudanzas legais». Un votante que acepta un referéndum pactado pero no uno a petición unilateral no sabe qué responder.

**Alternativas:**
- «Permitir que el Gobierno acuerde con una comunidad autónoma un referéndum sobre su independencia.»
- «Cambiar las leyes para que una comunidad autónoma pueda votar en referéndum su independencia, pactándolo con el Estado.»

**¿Recodificar?** No.

### 15. q12 — Educación
**Texto actual:** «Que las comunidades con lengua propia puedan impartir todas las asignaturas en ella, sin un porcentaje mínimo obligatorio en castellano.»

**Problemas.**
- **Exageración:** «todas las asignaturas» va más allá de la cita. El modelo de inmersión que defiende ERC imparte la asignatura de lengua castellana en castellano. Lo que ERC rechaza es la «imposició de percentatges lingüístics».
- **Jerga leve:** «lengua propia».

**Alternativas:**
- «Que cada comunidad con lengua cooficial decida qué parte de las clases se da en castellano, sin porcentajes fijados por ley o por tribunales.»
- «Que en las comunidades con lengua cooficial todas las clases puedan darse en esa lengua, salvo la asignatura de castellano.»

**¿Recodificar?** No.

### 16. q07 — Empleo y salarios
**Texto actual:** «Que los autónomos que ingresen menos del salario mínimo no paguen cuota a la Seguridad Social.»

**Problemas.**
- **«Ingresen» es ambiguo.** Puede ser facturación bruta o rendimiento neto, y el resultado es muy distinto. El registro de promesas dice «facturen» y El Debate (24-10-2026), «quien ingrese».
- **Contexto inexacto y sin fuente.** «Pagan cuota, la más baja, quienes ganan menos del salario mínimo» no es correcto: por debajo del salario mínimo hay al menos tres tramos reducidos. En 2026 la cuota mínima ronda los 206 € al mes con rendimientos de hasta 670 € al mes, según guías que citan la Orden PJC/297/2026 *(verificar en el BOE)*.
- **Efecto omitido:** no dice si se mantiene la cobertura (pensión, baja).

**Alternativas:**
- «Que los autónomos cuyo rendimiento neto anual no llegue al salario mínimo dejen de pagar cuota a la Seguridad Social.»
- «Que los autónomos que facturen menos del salario mínimo al año dejen de pagar cuota a la Seguridad Social.»

Hay que elegir la que respalde Vox y documentarlo.

**¿Recodificar?** No (Vox sigue `a_favor`). Aun así, la cita de CC (ayudas, no cuota) es una `parcial` débil.

### 17. q06 — Empleo y salarios
**Texto actual:** «Reducir por ley la jornada laboral máxima por debajo de las 40 horas semanales, sin rebajar el salario.»

**Problema.** «Por debajo de» es un cuantificador vago: ERC propone 37,5 horas y el BNG 35 (con un horizonte de 32). Quien apoya 37,5 pero no 35 no sabe qué responder. El hecho de 2025 del contexto (el Congreso devolvió el proyecto de 37,5 horas) es correcto pero no tiene fuente.

**Alternativas:**
- «Reducir por ley la jornada laboral máxima de 40 a 37,5 horas semanales, sin rebajar el salario.»
- «Reducir por ley la jornada laboral máxima a 35 horas semanales, sin rebajar el salario.»

**¿Recodificar?** Revisar. Con la primera opción, ambos partidos siguen `a_favor`, porque el BNG quiere ir más lejos y lo decidirán los codificadores. Con la segunda, ERC pasa a `parcial`.

### 18. q24 — Seguridad y justicia
**Texto actual:** «Derogar la Ley de Seguridad Ciudadana de 2015.»

**Problemas.**
- Muchos votantes conocen esta ley por su apodo («ley mordaza»), no por su nombre oficial. Mantener el apodo solo en el contexto es lo correcto para la neutralidad.
- El enunciado no dice qué cambia.
- No distingue derogar entera la ley (ERC y BNG) de reformarla parcialmente, que es la posición de otros partidos de izquierda *(verificar el estado de la reforma parcial)*.

**Alternativas:**
- «Derogar por completo la Ley de Seguridad Ciudadana de 2015, que fija multas por conductas en manifestaciones y ante la policía.»
- «Derogar entera la Ley de Seguridad Ciudadana de 2015, en lugar de reformar solo algunos artículos.»

**¿Recodificar?** No.

---

## Gravedad baja

### 19. q08 — Pensiones
**Texto actual:** «Volver a fijar en 65 años la edad ordinaria de jubilación para todos los trabajadores.»

**Problema.** «Edad ordinaria» es jerga: el votante no sabe que significa jubilarse sin recorte por edad. El contexto es correcto (en 2026, 66 años y 10 meses, o 65 con 38 años y 3 meses cotizados).

**Alternativas:**
- «Que todos los trabajadores puedan jubilarse a los 65 años sin que se les recorte la pensión por la edad.»
- «Volver a la jubilación a los 65 años para todos, sin recorte de la pensión por edad, como antes de 2013.»

**¿Recodificar?** No.

### 20. q04 — Fiscalidad
**Texto actual:** «Mantener de forma permanente un impuesto estatal sobre las grandes fortunas.»

**Problemas.**
- «Grandes fortunas» es vago, y el umbral (3 millones) solo aparece en el contexto.
- El contexto omite que el impuesto se prorrogó sin fecha de fin (RDL 8/2023) y que sigue vigente: el modelo 718 se actualizó en junio de 2026 (BOE-A-2026-14011). Sin esto, «mantener» parece una novedad.

**Alternativas:**
- «Mantener de forma permanente el impuesto estatal sobre patrimonios de más de 3 millones de euros.»
- «Convertir en permanente el impuesto sobre patrimonios de más de 3 millones de euros, hoy prorrogado sin fecha de fin.»

**¿Recodificar?** No.

### 21. q19 — Energía y clima
**Texto actual:** «Impulsar la instalación de parques eólicos marinos frente a la costa española.»

**Problemas.**
- «Impulsar» es un verbo vago.
- Las dos propuestas de origen son locales y condicionadas: CC en Gran Canaria «con consenso suficiente» y el BNG contra la eólica marina en Galicia. La pregunta estatal puede no reflejar sus posiciones.
- Los hechos del contexto (sin parques comerciales; planes de ordenación del espacio marítimo de 2023) no tienen fuente: RD 150/2023 *(verificar)*.

**Alternativas:**
- «Que el Estado convoque subastas para instalar los primeros parques eólicos marinos en España.»
- «Instalar parques eólicos en el mar frente a las costas españolas.»

**¿Recodificar?** No, aunque hay que vigilar que los codificadores no extrapolen posiciones locales.

### 22. q20 — Energía y clima
**Texto actual:** «Comprometerse a reducir las emisiones de gases de efecto invernadero un 65 % en 2030 respecto a 1990.»

**Problemas.**
- «Comprometerse» no dice quién.
- El contexto da el objetivo del PNIEC (32 %, correcto) pero no el nivel actual de emisiones ni el objetivo de la UE (55 % neto). Sin ellos, el votante no puede valorar el esfuerzo. El nivel actual debe citarse del inventario del MITECO.
- La cita de ERC habla de CO₂, no de todos los gases.

**Alternativas:**
- «Reducir las emisiones de gases de efecto invernadero un 65 % en 2030 respecto a 1990, el doble que el objetivo actual.»
- «Que España se fije reducir sus emisiones un 65 % en 2030 respecto a 1990, frente al 32 % previsto hoy.»

**¿Recodificar?** No.

### 23. q11 — Educación
**Texto actual:** «Retirar de forma progresiva la financiación pública a los colegios privados concertados.»

**Problema.** No deja claro si la retirada es total o una reducción. El BNG propone la supresión total, empezando por la enseñanza no obligatoria. Tampoco dice qué ocurre con los alumnos; puede añadirse al contexto.

**Alternativas:**
- «Retirar poco a poco los fondos públicos a los colegios concertados, hasta que solo los colegios públicos los reciban.»
- «Suprimir de forma gradual los conciertos educativos, empezando por las etapas no obligatorias.»

**¿Recodificar?** No.

### 24. q13 — Inmigración
**Texto actual:** «Dar prioridad a las personas de nacionalidad española en la adjudicación de viviendas sociales.»

**Problemas.** El texto es fiel a Vox. El contexto habla de «viviendas protegidas» y el texto de «viviendas sociales»; conviene unificar. El contexto también podría mencionar de forma neutral los límites legales: la normativa de la UE exige igualdad de trato en el acceso a la vivienda para los residentes de larga duración (Directiva 2003/109/CE, art. 11) *(verificar la redacción)*.

**Alternativa:** «Que los españoles tengan preferencia sobre los extranjeros en el reparto de viviendas sociales.»

**¿Recodificar?** No.

### 25. q30 — Economía
**Texto actual:** «Fijar por ley un precio máximo para los alimentos básicos.»

**Problemas.** «Alimentos básicos» no se define: Podemos dice «los alimentos» y el BNG «produtos básicos». Las fechas de la rebaja del IVA no tienen fuente: RDL 20/2022 y sus prórrogas *(verificar)*. El BNG une el tope de precios a precios justos para los productores, lo que puede añadirse al contexto.

**Alternativa:** «Fijar por ley un precio máximo para una lista de alimentos básicos, como pan, leche, huevos, fruta y verdura.» Los ejemplos son ilustrativos; hay que validarlos en el piloto.

**¿Recodificar?** No.

### Sin problemas relevantes
- **q21** (reformar la Constitución para el aborto): correcta. El contexto podría añadir la STC 44/2023, que avaló la ley de plazos. Mezcla la actitud ante el aborto con la reforma constitucional como vía; es inevitable y debe vigilarse en el piloto.
- **q22** (Ministerio de Igualdad): correcta y fiel al PP.
- **q27** (Fuerzas Armadas en Ceuta): fiel a Vox. El contexto podría recordar el despliegue de apoyo del Ejército en mayo de 2021 *(verificar)* y explicar la «crisis de finales de julio» que origina la propuesta. Ceuta es un topónimo conocido; se acepta.
- **q28** (normas agrarias más allá de la UE): fiel al PP, y el contexto da ejemplos.

---

## Observaciones transversales

1. **Contextos con cifras o hechos sin fuente:** q06, q07, q15, q18, q19, q26 (2,1 %), q29 y q30. q10 y q20 no tienen cifra donde la necesitan. Las propias notas de auditoría ya lo anticipaban; tres de esos hechos estaban desactualizados o incompletos (q15, q18, q29).
2. **Citas `parcial` o `en_contra` débiles que conviene revisar:** UPC en q02, Vox en q03, ERC en q09, Podemos en q10, Vox en q15 (cita no pertinente), UPN y ERC en q17, SALF en q25 y CC en q07.
3. **Fidelidad del registro de entrada:** la cita de Frente Amplio en `promesas.json` (q02) añade «a precios inferiores a los de mercado», que no está en la fuente. Conviene corregirla allí.
4. **Statu quo frente a cambio:** q01, q09, q14, q15 y q23 se parecen a lo que ya existe o ya se ha hecho. Cada afirmación debería dejar claro qué cambia respecto a hoy.
5. **Equilibrio:** si q09 se invierte, el recuento queda en 13 progresistas y 11 conservadoras. Para compensar, puede usarse una reserva conservadora (r03 o r04).
