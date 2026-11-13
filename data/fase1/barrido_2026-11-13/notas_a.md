# Barrido de campaña (13-nov-2026), codificador A: UPN, PSC, PNV y EH Bildu

Fichero: `data/fase1/barrido_2026-11-13/posiciones_a.json`. Contiene:

- **12 posiciones nuevas con valor**, todas en celdas vacías de `web/public/data/fase1.json` a 13-nov.
- **1 candidata a sustitución**, en `sustituciones`.
- **3 dudosas sin valor**, en `dudosas`, para que decida el verificador.

No toca ninguna posición existente. Todo está pendiente de verificación independiente.

| Partido | Antes | Nuevas | Después |
|---|---|---|---|
| UPN | 0 | 6 (q01, q11, q15, q29, q32, q35) | 6 |
| PSC | 3 | 2 (q16, q22) | 5 |
| PNV | 7 | 1 (q16) | 8 |
| EH Bildu | 10 | 3 (q16, q23, q29), más q32 de +1 a +2 si se acepta la sustitución | 13 |

## Regla aplicada

Se aplicó el protocolo v2 (`docs/prompts/2_codificacion_posiciones.md`) con las decisiones del editor del 13-nov.

**Qué fuentes valen:**
- Declaraciones literales en primera persona de líderes del partido desde el 1-nov-2025.
- Intervenciones de quien habla en nombre de su grupo, en el Congreso, el Senado o un parlamento autonómico. Es el mismo criterio que en g4 para los diputados que fijan la posición del grupo en un debate.
- Notas y documentos oficiales del partido.

**Qué no vale:** votos sin palabras, estilo indirecto y paráfrasis de periodistas.

**Atribución:**
- **UPN:** no cuenta nada del PP. Feijóo, Sayas, Carmen Alba y la diputada del PP Montesinos quedan excluidos aunque vayan en UPN-PP.
- **PSC:** Sánchez cuenta solo en actos o documentos del PSC.
- **PNV:** cuentan también los documentos de Geroa Bai, pero no lo que dicen en primera persona dirigentes de Geroa Bai que no son del PNV.

**Fechas y precedencia:**
- Las posiciones anteriores a la convocatoria (6-oct-2026) llevan `marco: null`; ninguna se refiere expresamente a estas elecciones.
- Solo el PNV tiene programa del 29-N. Ya está leído en g3 y no habla de q16, así que la declaración vale.

**Comprobación de citas:**
- Cada cita se comprobó contra su copia local con `norm()` de `pipeline/verify_quotes.py`. Todas aparecen literalmente.
- Todas tienen 60 palabras o menos.
- El sha256 de cada copia figura en la nota de la posición y en `fuentes`.

## Dónde se buscó

### Diario de Sesiones del Congreso (Pleno y Diputación Permanente)

- **Diarios revisados:** núm. 149 (11-nov-2025) a 212 (3-nov-2026), con las copias PDF/texto ya descargadas para g4. El núm. 213 (Diputación Permanente del 12-nov) da 403 a una petición normal y no se sorteó. Los núm. 146-148 son de octubre de 2025, fuera de plazo.
- **Método:** se trocearon las intervenciones por orador y se buscaron por palabras clave de las 30 afirmaciones. Cada candidato se leyó en su contexto.
- **Oradores revisados:**
  - UPN: Alberto Catalán (único diputado de UPN), en todas las afirmaciones. g4 solo había mirado q12, q18 y q33.
  - PNV: Vaquero, Legarda, Sagastizabal, Agirretxea y Renteria. Renteria no estaba en el barrido de g4.
  - EH Bildu: Aizpurua, Matute, Iñarritu, Otero, Pozueta y Fullaondo. Fullaondo no estaba en el barrido de g4.
  - PSC: los diputados del PSC que hablan por el Grupo Socialista (Mínguez, Lamuà, Zaragoza, Perea, Guinart y Soldevilla) y el ministro Hereu.
- **Hallazgos nuevos:**
  - UPN q35: UPN firmó con el PP la proposición para ampliar la prisión permanente revisable.
  - EH Bildu q23: Matute contra la ley antiokupación del PP.
- **Debates de los que no hay intervención:** EH Bildu no intervino en el debate de totalidad de la reforma del art. 43 (aborto). Ni EH Bildu ni el PNV intervinieron en el de la asunción de deuda autonómica (núm. 199).

### Diario de Sesiones del Senado (Pleno)

- **Diarios revisados:** núm. 100 (4-nov-2025) a 138 (30-sep-2026), los últimos publicados. El 139 da 404.
- **PNV:** López Torre, Etxano, Ahedo, Beltrán de Heredia y Uribe-Etxebarria (Grupo Vasco).
- **EH Bildu:** Bideguren, Zubiaga, Estarrona y Elejabarrieta (grupo Izquierdas por la Independencia).
- **UPN:** no tiene senadores.
- **Resultado:** solo la dudosa PNV q23. El resto se descartó (ver más abajo).

### Webs, notas y parlamentos autonómicos (un buscador por partido, con copias en `data/sources/fase1/barrido_2026-11-13/<partido>/`)

- **UPN:**
  - upn.org: las 253 notas desde el 1-nov-2025, leídas con la API REST pública de WordPress y el feed.
  - Parlamento de Navarra: los 30 Diarios de Sesiones del Pleno de nov-2025 a sep-2026 (los de oct-nov 2026 aún no están publicados) y los Boletines 2026, núm. 1-106. Las páginas de tramitación dan 403 y no se sortearon.
  - Prensa navarra: Noticias de Navarra, COPE, OKDiario y eldiario.es. Diario de Navarra no fue accesible para el buscador.
  - No hay programa ni documento de compromisos UPN-PP publicado. El texto completo del acuerdo UPN-PP no está publicado; solo su resumen en upn.org, ya revisado antes.
- **PSC:**
  - socialistes.cat: el canal RSS oficial (27-sep a 13-nov). La portada y los artículos dan 403 y no se sortearon.
  - Prensa: NacióDigital, Ara, 3Cat, Diari de Tarragona, Moncloa.com y Europa Press.
  - El Diari de Sessions del Parlament no fue accesible con peticiones normales: el RSS está parado en 2024 y el buscador APEX no responde. Por eso Illa se cita por crónica con comillas.
  - La entrevista de Hereu en Catalunya Ràdio (5-nov) es solo audio.
- **PNV:**
  - eaj-pnv.eus: las notas con id 57050-58579 (oct-2025 a oct-2026) y 58726-58745 (solo existe la 58726, de hoy). Las 58580-58725 ya se habían revisado.
  - eaj-pnv.eus, sección Documentos: 38 documentos desde nov-2025 (entrevistas y discursos de Esteban, Pradales, Vaquero y Urtaran) y el PDF de enmiendas constitucionales del Grupo Vasco.
  - Programa del 29-N: releído contra las celdas vacías, nada nuevo respecto a g3.
  - geroabai.eus: Geroa Bai no ha publicado ni manifiesto ni programa del 29-N. Sus notas de campaña son declaraciones de dirigentes que no son del PNV.
  - Prensa: Deia, El Correo, El Diario Vasco y Onda Vasca.
  - No se consultó el Diario de Sesiones del Parlamento Vasco.
- **EH Bildu:**
  - ehbildu.eus: 330 notas desde el 1-nov-2025 (portada y secciones Congreso-Senado, Parlamento Vasco, Nafarroa y Parlamento Europeo). No hay programa del 29-N a 13-nov.
  - Orain/EITB: unas 300 noticias de la etiqueta EH Bildu.
  - Parlamento de Navarra: Plenos de nov-2025 a sep-2026 y las comisiones de Mercosur y de regularización.
  - No se consultó el Diario de Sesiones del Parlamento Vasco (no hay PDF indexados) ni Naiz/Berria (sin buscador accesible).

## Posiciones nuevas

### UPN

- **q35 → +2.** Alberto Catalán, Congreso, 17-mar-2026 (DS nº 171, p. 21).
  - **Cita:** «mi grupo también ha suscrito esta iniciativa [...] Lo que se propone es ampliar los supuestos para esta prisión permanente revisable».
  - **Razonamiento:** la proposición debatida es la medida y la firman PP y UPN («propuesta que firmamos el Grupo Popular y Unión del Pueblo Navarro»). Catalán la defiende sin reservas. Es el mismo +2 que Vox en ese debate. Lo dice el diputado de UPN, no el PP.
- **q29 → +1.** Nota oficial de UPN, 22-ene-2026.
  - **Contenido:** rechazo expreso al acuerdo UE-Mercosur, aprobado ese día como moción de UPN en el Parlamento de Navarra y llevado a los ayuntamientos. Esparza, en el mismo pleno, dijo sentir «envidia» de los diputados franceses que votaron en contra.
  - **Por qué +1 y no +2:** no pide que España lo frene en la UE; la parte resolutiva solo insta al Gobierno foral.
- **q32 → +1.** Javier Esparza, portavoz de UPN en el Parlamento de Navarra, 12-mar-2026 (DSPN nº 97, p. 47).
  - **Contexto:** debate de la proposición de EH Bildu y Geroa Bai para que las comunidades fijen su SMI.
  - **Cita:** «No creemos que si cada comunidad autónoma definiera su SMI se fomentara la desigualdad [...] tiene su lógica».
  - **Matices:** pide un debate más profundo, integrarlo en un paquete con rebajas fiscales, y se abstiene.
  - **REVISAR:** 0 también es defendible.
- **q15 → −1.** Cristina Ibarrola, presidenta de UPN, nota oficial del 15-abr-2026.
  - **Cita:** «¿Habrá otro decreto extraordinario dentro de dos o de cuatro años? [...] esto no es una solución».
  - **Razonamiento:** mismo criterio que PNV q15 (Vaquero contra las «regularizaciones puntuales cada cierto tiempo»).
  - **REVISAR:** en la misma nota dice «El problema no es la medida, sino cómo se ha hecho». Si se lee como ambivalente, null.
- **q01 → −1.** Nota oficial de UPN, 27-may-2026.
  - **Contenido:** atribuye a la «limitación de precios» de las zonas tensionadas la caída de la oferta. Apoyan lo mismo la propuesta de Ibarrola de suprimir las zonas tensionadas (24-mar) y la moción de UPN para revocarlas (BOPN 9-oct).
  - **Razonamiento:** indirecta, mismo criterio que Vox q01.
- **q11 → −1.** Nota oficial de UPN, 15-abr-2026.
  - **Contenido:** llama «atentado a la libertad» a reducir conciertos en Navarra y anuncia una ley para «blindar» la concertada.
  - **Razonamiento:** indirecta, mismo criterio que PNV q11 y Vox q11.

### PSC

- **q16 → −1.** Salvador Illa en la sesión de control del Parlament, 7-oct-2026, en NacióDigital con comillas.
  - **Cita:** «No estic a favor d'un referèndum d'autodeterminació».
  - **Por qué −1 y no −2:** es reactiva. No se pudo cotejar con el Diari de Sessions.
- **q22 → −1.** Cristina Morón, cabeza de lista por Lleida, nota oficial del PSC del 26-oct-2026.
  - **Contenido:** presenta que Feijóo «vol eliminar el Ministeri d'Igualtat» como una amenaza de un Gobierno PP-Vox.
  - **REVISAR:** es una enumeración de amenazas, no una frase solo sobre el Ministerio.
  - **Fuente:** el texto viene del RSS oficial; la copia nueva lleva la cabecera estándar.

### PNV

- **q16 → +1.** Enmienda del Grupo Vasco a la reforma del art. 69.3 CE y nota oficial del 11-mar-2026, firmada por la portavoz Maribel Vaquero.
  - **Contenido:** propone constitucionalizar el «derecho a decidir de su ciudadanía [...] siendo su ejercicio pactado con el Estado». La justificación lo enlaza con la resolución de autodeterminación del Parlamento Vasco de 1990.
  - **REVISAR:** no dice «referéndum» ni «independencia», y la nota lo presenta como «fórmula de articulación amable y duradera [...] en el conjunto del Estado». Si se exige que nombre el referéndum de independencia, null. El programa del 29-N quedó null en g3, pero ese programa es más vago.

### EH Bildu

- **q23 → −1.** Oskar Matute, Congreso, 19-may-2026 (DS nº 185, p. 13).
  - **Contenido:** rechaza de plano la ley antiokupación del PP, que prevé desalojos en 24 horas.
  - **Razonamiento:** mismo criterio verificado en g4 para Podemos, Frente Amplio y Compromís en el mismo debate. g4 no lo había codificado para EH Bildu.
- **q29 → +1.** Mendo Goñi, portavoz de EH Bildu Nafarroa en la Comisión de Desarrollo Rural del Parlamento de Navarra, 17-feb-2026 (p. 18).
  - **Cita:** «Euskal Herria Bildu somos muy claros [...] este acuerdo [...] no es admisible» y que la paralización «se convierta en definitiva».
  - **Refuerzo:** Araiz (pleno, 22-ene-2026): «el peor acuerdo comercial jamás firmado».
  - **REVISAR (liderazgo):** habla por el grupo en la comisión, pero no es el portavoz general.
- **q16 → +1.** Nota oficial de EH Bildu sobre la reunión con ERC (Otegi), 16-sep-2026.
  - **Contenido:** «objetivo de la independencia» y celebran la estrategia de los partidos celtas de ejercer la autodeterminación «a través de un referéndum».
  - **REVISAR:** no habla de un referéndum pactado con el Gobierno, y el referéndum es el de los partidos celtas. Null también es defendible.
  - **Apoyos:** nota de la Diada (11-sep) y Declaración de Bergara PNV-EH Bildu (17-jul, en Orain).

## Candidata a sustituir una posición existente

- **EH Bildu q32: +1 → +2.**
  - **Posición existente:** +1, nota oficial EH Bildu-LAB del 12-nov-2026.
  - **Nueva:** Idurre Bideguren, cabeza de lista al Senado por Bizkaia, en un acto de campaña en Mercabilbao el 13-nov-2026, en nota oficial con cita literal: «nos comprometemos [...] comenzando por establecer un SMI propio y adaptado a nuestro coste de vida».
  - **Razonamiento:** va en el mismo sentido, es posterior y es más intensa, porque es un compromiso expreso y prioritario de campaña. Entre declaraciones de campaña prevalece la posterior.

No se ha encontrado ninguna declaración posterior que contradiga las posiciones existentes:
- **PSC:** q17, q18, q21. Morón repite el 13-nov «blindar» el aborto, que coincide con q21.
- **PNV:** q11, q15, q21, q31, q34. Una nota del EBB del 3-nov-2025 sobre el Sáhara es anterior a la de Legarda y coincide con ella.
- **EH Bildu:** sus otras nueve posiciones.

## Dudosas (en `dudosas`, sin valor)

- **PSC q12 (posible +1).** Illa, 19-oct-2026: «el català no es toca [...] No es pot governar Espanya contra Catalunya i contra el català a les escoles».
  - **Por qué queda sin valor:** responde al plan de Feijóo de garantizar el castellano, pero no habla del porcentaje ni del mínimo legal o judicial. Es una defensa de la inmersión del mismo tipo que la de Lamuà, que g4 dejó en null.
  - **Mismo caso:** Morón, 26-oct, dice que Feijóo «vol suprimir les polítiques d'immersió lingüística».
- **PNV q23 (posible +1).** López Torre, Senado, 19-nov-2025 (DS nº 103, p. 106).
  - **Cita:** «Si la respuesta judicial [...] fuese inmediata, como lo es en otros países de Europa, donde se resuelve en 48 o 72 horas, no sería necesaria esta medida».
  - **Por qué queda sin valor:** «72» supera el máximo de 48 horas; la vía que propone es judicial (reforma de la LECRIM, más jueces); y g4 juzgó ambivalente a Legarda (19-may-2026).
- **UPN q21 (posible −1).** Catalán en el debate de totalidad del art. 43 (30-abr-2026, DS nº 183, p. 43): «debate falso [...] atajo burdo y fraudulento».
  - **Por qué queda sin valor:** solo critica el procedimiento y deja abierto reformarla «como se debe hacer». El voto en contra no cuenta.

## Descartes relevantes (motivo)

### UPN

- **q23:**
  - Catalán (Congreso, 19-may-2026) en el debate de la ley del PP: lista noticias de okupas en Pamplona y pide «soluciones», sin pronunciarse sobre la medida. Genérico.
  - Catalán (26-feb-2026): pide otro decreto «sacando el tema de la okupación». Es otra medida (el escudo antidesahucios).
  - Ibarrola: «Tolerancia cero a ocupas». Genérico.
  - Las «48 horas» las dijo Carmen Alba, del PP: otro partido.
- **q27:** Catalán (DS nº 201, 205, 209) y la declaración de UPN sobre Ceuta critican la falta de control de la frontera y que el Ejército se movilizara tarde, pero no piden desplegar las Fuerzas Armadas. Genérico.
- **q34:** Catalán (DS nº 201 y 209): Sánchez «traicionó a los saharauis». Frase de pasada, sin posición sobre referéndum o autonomía.
- **q33:**
  - Cristina López Mañero (Parlamento de Navarra, 10-sep-2026): «habrá que acogerlos [...] entre todas las comunidades», pero en la misma intervención matiza. Ambivalente; no habla de la obligatoriedad.
  - Catalán: no se pronuncia.
- **q31:** San Martín (11-nov) quiere «limitar las prórrogas automáticas», pero solo en paráfrasis de OKDiario y COPE. Es una pista fuerte si se publican las iniciativas de UPN del 11-nov.
- **q21:** Isabel Olave (Parlamento de Navarra, 11-jun-2026): ataque al PSOE sin posición sobre la reforma, más un voto en contra (votación).
- **q09:** San Martín es ambivalente (defiende el concierto con San Juan de Dios y critica las derivaciones).
- **q13:** «UPN no comparte la prioridad nacional», sin referirse a la vivienda social. Genérico.
- **Medida distinta:**
  - q17: Convenio navarro; nada de extenderlo a otras comunidades.
  - q18: Esparza critica que Navarra quede excluida de la condonación.
  - q26: «no se puede renunciar a la OTAN».
  - q12: libertad para aprender euskera.
  - q05: IRPF foral.
  - q04: patrimonio foral, además en paráfrasis.
- **q20:** genérico y de un diputado sin cargo de portavoz.

### PSC

- **q01:** Illa defiende los topes por zonas tensionadas de la ley de 2023, no un tope estatal. Medida distinta.
- **q26:**
  - Sánchez en el acto del PSC en Tarragona (7-nov): solo está entre comillas «los señores de la guerra»; el resto es paráfrasis, y habla del 5 %.
  - Hereu: «2 % y no el 5 %» es de junio de 2025, fuera de plazo.
- **q29:** el PSC votó contra una moción anti-Mercosur en el Parlament (votación). Quien defendió el acuerdo fue el conseller Ordeig, que no es líder del PSC.
- **q13:** Pedret habla de desahucios, no de prioridad en la vivienda social. Medida distinta.
- **q19:** el compromiso de Illa con la eólica marina solo está parafraseado y parece de 2024; Paneque no es líder del partido.
- **q33:** Mínguez (Congreso, 26-ago-2026) pide que las comunidades «respondan» cuando Ceuta pida solidaridad, sin hablar del reparto obligatorio. Genérico.
- **q15, q09, q08:** medidas distintas.
- **Sin nada:** q03, q04, q05, q06, q11, q20, q24, q25, q27, q30, q31, q32, q34, q35.

### PNV

- **q33:** Legarda (Congreso) y Ahedo (Senado, 9-sep-2026) piden trasladar o acoger a los menores de Ceuta, sin hablar de la obligatoriedad. Mismo criterio que g4. Esteban pide que vuelvan con sus familias; la consejera Melgosa no es líder del partido.
- **q17:** Etxano (Senado, 13-may-2026) apoya la financiación singular catalana «siempre que no afecte» al concierto; no es el concierto para otras comunidades. Vaquero: el Concierto «no es un privilegio». Genérico.
- **q29:**
  - La organización del PNV en Iparralde rechaza el acuerdo, pero en el ámbito francés.
  - La eurodiputada Agirregoitia defiende el acuerdo, pero no es líder del partido.
  - Agirretxea: «España sola no puede frenar». Ya descartado en g4.
- **q26:**
  - Legarda (DS nº 184): la cita sobre disolver la OTAN es un turno de EH Bildu mal atribuido por el troceado.
  - Vaquero en Deia: genérico.
- **q27:** Esteban y Vaquero critican la gestión de Ceuta, sin hablar de las Fuerzas Armadas.
- **q16:** Esteban: «Nosotros hablamos de todo». Genérico.
- **q13:** rechazo a la «prioridad nacional» en general (Esteban, Pradales, Ahedo en el Senado), sin hablar de la vivienda social. Genérico.
- **q05:** Etxano y Sagastizabal ven bien deflactar el IRPF; no es la reforma de q05. Medida distinta.
- **q01:** López Torre: la zona tensionada «no sirve de nada». Ambiguo. Vaquero analizará el tope. Sin posición.
- **q23:** el desalojo ágil de la ley vasca de vivienda es una medida autonómica.

### EH Bildu

- **q01:** Estarrona (Senado, 12-may-2026) pide «tope a los precios», pero en el marco de las zonas tensionadas que declaran las comunidades. El programa de vivienda de mayo-2026 extiende la zona tensionada a Hego Euskal Herria con sus instituciones. Medida distinta.
- **q15:** la declaración del 18-dic-2025 y Arza Porras se refieren a la regularización de 2026, no a «otra». Iñarritu pidió prorrogarla. Ya descartado en g4.
- **q17:** Otegi: «No vale el café para todos» se refiere a la relación bilateral, no al concierto para otras comunidades.
- **q13:** la «prioridad nacional» que discute Aizpurua es la del euskera en el empleo público.
- **q12:** Otxandiano y Aztiria defienden la inmersión en euskera, sin hablar del mínimo de castellano.
- **q11:** abstención en el Parlamento de Navarra (votación). Zubiaga (Senado, 8-abr-2026) critica la concertada en educación especial, pero no propone retirar su financiación.
- **q21:** Pozueta habla de perímetros de protección en las clínicas, no de la reforma constitucional. EH Bildu no intervino en el debate del art. 43.
- **q18:** Estarrona (Senado, 12-may-2026) pregunta por «una quita» de la deuda de Tubos Reunidos (empresa industrial en crisis), no por la deuda autonómica. Ni EH Bildu ni el PNV intervinieron en el debate de la ley de asunción de deuda.
- **q19:** el proyecto de Lemoiz es de acuicultura. **q09:** críticas genéricas a la privatización. **q04:** «las grandes fortunas [...] tengan que poner de su parte» (Elejabarrieta) es genérico.

## Por qué siguen vacías tantas celdas

- **UPN:**
  - No tiene programa. El acuerdo UPN-PP solo trata del régimen foral, el Convenio, la disposición transitoria cuarta y las infraestructuras.
  - Su campaña es genérica: cambio de Gobierno, corrupción, víctimas.
  - En el Congreso tiene un solo diputado, que interviene sobre todo en asuntos navarros y en control al Gobierno.
  - La mayoría de sus posiciones nacionales las expresa el PP, que no cuenta.
- **PSC:**
  - No tiene programa propio del 29-N y no consta que asuma el del PSOE.
  - Sus diputados apenas fijan posición en nombre del grupo en el Congreso. Sus líderes hablan sobre todo como Govern, de medidas de la Generalitat.
  - La web del partido y el Diari de Sessions del Parlament no son accesibles con peticiones normales.
  - Muchas citas de campaña solo aparecen en paráfrasis.
- **PNV:**
  - Su programa calla en casi todas las celdas vacías (g3).
  - Sus intervenciones suelen ser competenciales («es competencia de Euskadi») o matizadas, sin tomar partido sobre la medida estatal.
- **EH Bildu:**
  - No ha publicado programa.
  - Sus intervenciones encajan casi siempre en medidas relacionadas pero distintas: zona tensionada autonómica, regularización en curso, inmersión en euskera.
  - No se pudo revisar el Parlamento Vasco.

## Para el verificador

1. **Casos marcados REVISAR:**
   - UPN q32 (+1 o 0).
   - UPN q15 (−1 o null).
   - PSC q22 (enumeración).
   - PNV q16 y EH Bildu q16 (derecho a decidir o referéndum de terceros frente a referéndum pactado de independencia).
   - EH Bildu q29 (portavoz de comisión en un parlamento autonómico).
2. **Las tres dudosas sin valor:** PSC q12, PNV q23 y UPN q21.
3. **Fuentes de parlamento autonómico.** UPN q32 y EH Bildu q29 se apoyan en el Parlamento de Navarra. Es el mismo criterio que g4 aplicó al Parlamento de Canarias, y el texto se extrajo sin `-layout` porque el diario va a dos columnas.
4. **Copias de las fuentes.**
   - Las del Diario de Sesiones del Congreso (núm. 171, 183 y 185) son las mismas que las de `ampliacion_2026-11-13`, con el mismo sha256, copiadas a la carpeta del partido.
   - La del Senado núm. 103 se extrajo con `pdftotext -layout` del PDF descargado de senado.es para g4.
