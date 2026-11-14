# g7: ampliación del 14-nov para UPN, PSC, Junts y EH Bildu, verificado

Fichero: `codificacion_g7.json`. Verificación independiente en `verificacion_g7.json` (aprobado); `pipeline/build_fase1.py` ya incluye el grupo.

## Verificación (14-nov)

Revisadas 12: 6 posiciones nuevas y 6 dudosas sin valor.

- **Aprobadas:** 4, sin cambios de valor: UPN q23 +2, Junts q29 +1, Junts q33 −1 (página corregida a 11-12) y Junts q09 −1.
- **Rechazadas:** 2, pasan a null.
  - **UPN q30.** Lo que se debatía era una cesta básica pactada con la distribución, no un precio máximo por ley. La frase sobre el franquismo es una comparación retórica, no una posición sobre la medida.
  - **Junts q24.** Madrenas y Pagès reprochan al Gobierno que no la haya derogado, pero la única propuesta propia de Junts es reformarla (Pagès, abril). La afirmación dice «por completo».
- **Dudosas:** las 6 se confirman sin valor.

| Partido | Antes | Aprobadas en g7 | Rechazadas | Después |
|---|---|---|---|---|
| UPN | 5 | q23 +2 | q30 | 6 |
| PSC | 5 | — | (dudosa q31) | 5 |
| Junts | 12 | q29 +1, q33 −1, q09 −1 | q24 | 15 |
| EH Bildu | 13 | — | (dudosa q01) | 13 |

Las alternativas de valor están en `verificacion_g7.json`, apartado «dudas». Lo que sigue son las notas del codificador, anteriores a la verificación.

Se aplicó `docs/prompts/2_codificacion_posiciones.md` con las reglas del 13-nov. Cuentan:
- declaraciones literales en primera persona de líderes del propio partido desde el 1-nov-2025;
- quien habla en nombre de su grupo en un debate parlamentario (criterio de g4 y g5);
- notas y documentos oficiales del partido, y documentos conjuntos de la coalición que firma.

No cuentan: votos sin palabras, estilo indirecto, paráfrasis, ni el PP para UPN. Para el PSC, Sánchez solo cuenta en actos del PSC.

**Cómo se trabajó:**
- Un codificador por partido. Al consolidar se releyó cada fuente en su copia local.
- Todas las citas son literales según `norm()` de `pipeline/verify_quotes.py`, tienen 60 palabras o menos, y el sha256 coincide con la copia.
- Copias en `data/sources/fase1/g7_2026-11-14/<partido>/`.
- Ninguna celda propuesta tenía posición previa.
- No se repite ninguna fuente rechazada antes.

## Resultado

| Partido | Antes | Propuestas en g7 | Dudosas sin valor | Después, si se aprueba todo |
|---|---|---|---|---|
| UPN | 5 | q23 +2, q30 −1 | q31, q15 | 7 |
| PSC | 5 | — | q31 | 5 |
| Junts | 12 | q29 +1, q33 −1, q09 −1, q24 +1 | q03, q27 | 16 |
| EH Bildu | 13 | — | q01 | 13 |

**Límite común.** El cupo de búsquedas web del turno (200, compartido por los cuatro codificadores) se agotó antes de terminar. Lo que quedó sin buscar se indica en cada partido. Se puede retomar en otro turno.

## UPN (25 celdas vacías)

### Propuestas

- **q23 → +2.** Compromisos de la coalición UPN-PP en su web, upn-pp.es (modificada el 13-nov): «Okupas fuera en 48 horas».
  - Es un documento conjunto de la coalición que firma UPN (`data/boe/coaliciones.json`), así que cuenta para UPN.
  - Es una fuente distinta de la ya rechazada (Carmen Alba, del PP).
  - Se usa el mismo criterio que SALF q23.
  - La web figuraba antes como «Próximamente». La carta de Feijóo de la misma página no se usa.
- **q30 → −1 (REVISAR).** González Felipe, de UPN, en el turno en contra en nombre de su grupo. Parlamento de Navarra, DSPN nº 113, 25-sep-2026, p. 51.
  - Ridiculiza la «cesta básica» de Contigo-Zurekin y que «tenía topados los precios del pan y de los productos básicos. El franquismo lo hizo».
  - Es un rechazo indirecto del tope de precios, con el mismo criterio que Vox q30.
  - **Riesgo:** lo que se debatía era una cesta pactada con la distribución, no un precio máximo por ley. Si se ve como medida distinta, null.
  - El Diario de Sesiones solo da los apellidos.

### Dudosas

- **q31.** La propuesta de Leticia San Martín (11-nov) de «limitar las prórrogas automáticas» sigue solo en estilo indirecto (COPE, OKDiario).
  - Las iniciativas del 11-nov aún no están en el Boletín Oficial del Parlamento de Navarra: el nº 107 da 404.
  - La nota del 1-abr-2026 trata de la prórroga del RDL 8/2026, que es otra medida.
  - Catalán (DS nº 210) es ambivalente.
- **q15.** OKDiario (2-jul-2026) recoge «solo un parche». Critica la eficacia de la regularización de 2026, no rechaza otra. Es el mismo motivo por el que g5 rechazó a Ibarrola.

### Sin posición (21)

**Dónde se buscó:**
- upn.org (API, 1-oct a 13-nov) y upn-pp.es completa.
- Prensa navarra: Noticias de Navarra (48 artículos), navarra.com/OKDiario (297 artículos con la etiqueta UPN), Orain, eldiario.es Navarra, Pamplona Actual, Navarra Información y Europa Press.
- Boletín Oficial del Parlamento de Navarra, núms. 104-106.
- Diario de Sesiones del Parlamento de Navarra, núms. 112-113.

**Por qué no hay posición:**
- **Genérico:** q05, q09, q13, q16, q20, q22, q24, q25. Los compromisos UPN-PP y las declaraciones son del tipo «alivio fiscal», «tolerancia cero con la corrupción», «inmigración legal, ordenada», «Que la inflación no te suba los impuestos».
- **Medida distinta:** q03 y q04 (fiscalidad foral), q30 (Ibarrola propone el IVA al 0 % en alimentos, que no se usa) y q17 (Fuero y Convenio, sin extenderlo a otras comunidades).
- **Repiten descartes anteriores:** q12, q18, q26, q27, q33 y q34. Son las mismas fuentes ya rechazadas: López Mañero sobre menores y Catalán sobre Ceuta y el Sáhara.
- **Sin ninguna mención:** q06, q08, q19 y q21.
- **Sin búsqueda web específica por el cupo:** q17 (financiación singular) y q26 (3,5 % en defensa).

**Accesos:** las páginas de tramitación y prensa del Parlamento de Navarra dan 403 y no se sortearon. Los plenos de oct-nov aún no están publicados.

## PSC (25 celdas vacías)

**No hay propuestas.** No consta programa del PSC para el 29-N ni que asuma expresamente el del PSOE.

**Dónde se buscó:**
- El RSS oficial de socialistes.cat completo: 650 notas del 1-nov-2025 al 13-nov-2026, por palabras clave en catalán para cada celda. El barrido anterior solo cubría desde el 27-sep.
- Crónicas de mítines: AXA (12-nov), Montmeló e inicio de campaña (13-nov) y Sánchez en Tarragona (7-nov).
- Crónicas de los debates de RTVE (8-nov) y Pimec (9-nov).
- La entrevista de Hereu en Catalunya Ràdio (5-nov). Solo existe una transcripción automática de IA de 3Cat, que no se usa como cita literal.

### Dudosa

- **q31 (posible +1).** Nota del PSC del 29-sep-2026 sobre Elena Díaz.
  - Ella solo entrecomilla que los «dos reials decrets» son «un pas important».
  - La renovación automática de los alquileres aparece en la voz de la nota y en estilo indirecto, sin los cinco años.
  - Es el mismo caso que NC-BC q31 en g5.

### Sin posición

- **Medida distinta:**
  - q01: topes en zonas tensionadas.
  - q03: préstamos de emancipación de la Generalitat.
  - q05: deducciones autonómicas y el 100 % del IRPF para Cataluña.
  - q15: celebran la regularización de 2026, nadie pide otra.
  - q32: solo subir el SMI estatal.
- **Genérico:**
  - q09: «privatització de la sanitat».
  - q12: defensa del catalán sin hablar del mínimo de castellano; mismo criterio que la dudosa de Illa en g5.
  - q13: «la nostra prioritat nacional són totes les persones», sin hablar de vivienda.
  - q20: descarbonización, en estilo indirecto.
  - q33: Illa ofrece acoger menores, sin hablar de la obligatoriedad.
  - q04 y q08.
- **Fuera de plazo:**
  - q06: Elena Díaz, 9-sep-2025.
  - q19: posición de 2021.
- **Sin ninguna mención de líderes:** q11, q23, q24, q25, q27, q29, q30, q34 y q35.
- **q26:** sin fuente nueva frente a la ya descartada (Sánchez en Tarragona).
- **Sin búsqueda web propia por el cupo:** q11, q35, q25, q27, q34, q30, q20, q32, q08, q09, q15 y q03. Se cubrieron solo con el RSS completo y las crónicas.

**Pendiente:** entrevistas a Hereu, Illa y Moret del 13-14-nov en La Vanguardia, El Periódico, RAC1 y El Nacional.

**Accesos:**
- Los artículos de socialistes.cat dan 403 y no se sortearon.
- El Diario de Sesiones del Congreso, núms. 213-214, da 404.
- El Diari de Sessions del Parlament no se revisó.

## Junts (18 celdas vacías)

Junts no ha publicado programa del 29-N. La «proposta de sobirania econòmica» del 13-nov trata del concierto económico.

**Qué se revisó de nuevo:**
- El Diario de Sesiones del Pleno, núms. 149-212, separando los turnos por orador. El barrido de g4 por palabras clave tenía huecos.
- Por primera vez, el Diario de Sesiones de las Comisiones del Congreso, núms. 431-636.
- junts.cat (feed, API y las fichas «Propostes»), las crónicas de los debates de RTVE y Pimec, y la entrevista de VilaWeb.

### Propuestas

- **q29 → +1.** Isidre Gavín, cabeza de lista por Lleida, en la Comisión de Agricultura (DS Comisiones nº 500, 25-feb-2026, p. 8).
  - Defiende la enmienda de Junts, «gairebé idèntica» a la proposición no de ley de Sumar contra la aplicación provisional del acuerdo.
  - Pide «que no hi hagi una aplicació provisional».
  - El 15-abr-2026 (DS Comisiones nº 541) añade: «aquest acord de Mercosur tal com està, no és admissible».
  - Es una fuente nueva frente a la «amenaça greu» rechazada en g4.
  - +1 y no +2 porque deja abierto aplicarlo con garantías.
- **q33 → −1.** Josep Maria Cervera, en la Comisión de Juventud e Infancia (DS Comisiones nº 613, 31-ago-2026, pp. 11-12).
  - Reivindica que Junts «va facilitar» el mecanismo de reparto obligatorio del RDL 2/2025 y pregunta por qué no se aplica, con la condición de que Cataluña no salga «penalitzada».
  - Defender el reparto es incompatible con suprimirlo.
  - Es distinto de lo ya rechazado: Nogueras pedía excluir a Cataluña del reparto.
- **q09 → −1.** Pilar Calvo, pregunta oral en el Pleno (DS nº 167, 18-feb-2026, p. 28).
  - Defiende que en el modelo catalán la colaboración público-privada «no és excepcional, és estructural».
  - Rechaza la ley de gestión directa porque la hace «marginal».
  - Lo repite en la Comisión de Sanidad (DS Comisiones nº 509).
  - Es −1 porque rechaza una restricción, no la prohibición, y el argumento es en parte competencial.
- **q24 → +1.** Marta Madrenas, cabeza de lista por Girona, pregunta oral (DS nº 202, 9-sep-2026, p. 30): «la Llei Mordassa que havien de derogar».
  - Pagès (DS nº 198, 14-jul-2026) llama a la ley «l’altra gran eina de repressió» y reprocha el poco entusiasmo por derogarla.
  - Ambas son posteriores a lo descartado en g4 (DS 179, abril), donde Junts pedía reformarla y no derogarla.
  - **Riesgo:** si el verificador ve ambivalente esa mezcla de reforma y derogación, null.

### Dudosas

- **q03 (propuesta +1 por el codificador, pasada a dudosa al consolidar).** La ficha junts.cat/propostes/impostos dice «Pressió al govern de la Generalitat per reduir l’impost de transmissions patrimonials per als joves que compren el primer habitatge».
  - Es una rebaja autonómica del ITP, sin IVA y sin el 60 %.
  - Es el mismo criterio con el que g4 rechazó a Nogueras (DS 174) y con el que g7 deja sin valor la rebaja foral de EH Bildu en Navarra.
- **q27.** Gavín, el 23-sep (DS 207), dice que el ejército debía desplegarse en Ceuta «24 hores abans». El 30-sep (DS 209, ya descartado) dice «ni a un costat ni a l’altre». Prevalece lo posterior.

### Sin posición

- **Medida distinta:**
  - q05: deflactar el IRPF.
  - q08: jubilación sin coeficientes reductores con 40 años cotizados.
  - q13: 10 años de empadronamiento para la vivienda protegida. Es arraigo, no nacionalidad, y no hay cita de un líder.
  - q26: defensa europea, sin hablar del gasto.
- **Ninguna intervención o mención:**
  - q04.
  - q19: solo una diputada provincial en un acto local.
  - q22.
  - q25: el indulto de Borràs no es corrupción según el propio partido y no es la medida.
  - q30.
- **Sin nada nuevo:**
  - q06: solo la nota del 27-oct en estilo indirecto, ya descartada. No hay intervenciones sobre las 37,5 h desde el 1-nov-2025.
  - q20: Calvo genérico, ya descartado.
  - q21: Calvo ambivalente, ya descartado.

**Pendiente:** por el cupo no se hizo una última búsqueda de campaña sobre las 37,5 h. Tampoco se revisaron el Diari de Sessions del Parlament ni las comisiones del Senado.

**Accesos:** el Pleno 213-216 y las Comisiones 637-660 daban 404 el 14-nov.

## EH Bildu (17 celdas vacías)

**No hay propuestas.** EH Bildu no ha publicado programa del 29-N. ehbildu.eus no tiene notas posteriores al 13-nov salvo la del acto de Eibar, que trata solo de vivienda.

**Qué se leyó entero:**
- Entrevistas a Matute en eldiario.es (13-nov) y Público (7-nov).
- Entrevista a Otegi en Diario Siglo XXI (9-nov).
- Intervenciones de Maiz (7-nov).

### Dudosa

- **q01 (posible +1).** Matute, sesión de control del Congreso (DS nº 158, 10-dic-2025, p. 27): «si no ponemos límite también en aquellos lugares donde no están declaradas las zonas tensionadas».
  - El único límite concreto que propone es recuperar la prórroga automática de los contratos.
  - En campaña, EH Bildu defiende la zona tensionada declarada por sus propias instituciones.

### Sin posición

- **Medida distinta:**
  - q03: rebaja foral navarra de los impuestos de la primera vivienda (Maiz).
  - q09: Ubera critica las derivaciones de Osakidetza, sin proponer prohibirlas.
  - q11: la frase sobre reducir los conciertos en el Diario de Sesiones del Parlamento de Navarra nº 84 es de Carlos Guzmán (Contigo-Zurekin), no de EH Bildu; se comprobó el turno.
  - q12: inmersión en euskera.
  - q19: solo renovables terrestres, y las declaraciones de 2022 están fuera de plazo.
- **Solo en agregadores o fuera de plazo:** q04, q08 y q20. Aparecen resumidas del programa de 2023 en webs que no son fuente válida, o la fuente es anterior.
- **Solo voto:** q15. El 13-nov EH Bildu votó en Navarra contra la moción de UPN sobre la regularización, sin palabras.
- **Ninguna declaración de EH Bildu:**
  - q13.
  - q17: los resultados son de Junts y ERC.
  - q18: no intervino en el debate de la ley.
  - q21: no intervino en el debate del art. 43. Matute en Público critica al PP, sin hablar de la reforma constitucional.
  - q22: ninguna reacción al anuncio de Feijóo del 23-oct.
  - q25: solo declaraciones genéricas contra la corrupción.
- **q05:** nada sobre la exención por debajo de 22.000 € ni sobre los dos tipos.

**Pendiente:** por el cupo no se buscaron Berria, Radio Euskadi, los debates de EITB ni entrevistas a Etxebarrieta, Otxandiano y Elejabarrieta.

**Accesos:**
- El Diario de Sesiones del Parlamento Vasco no es accesible con peticiones normales: está tras un formulario y las fichas solo tienen vídeo.
- Naiz y Gara cargan sus portadas por JavaScript.

## Para el verificador

1. **Casos a revisar:**
   - UPN q30: cesta pactada frente a precio máximo por ley.
   - Junts q24: derogar frente a reformar.
   - Junts q09: rechazo indirecto, en parte competencial.
   - Junts q29: +1 frente a +2, y que la aplicación provisional equivalga a «frenar».
2. **Liderazgo:**
   - UPN q30: parlamentario foral que habla en nombre de su grupo.
   - Junts q09 y q33: diputados que intervienen por su grupo en una pregunta oral y en una comparecencia en comisión. Es el criterio de g4 y g5.
3. **Dudosas:** las seis de `codificacion_g7.json` («dudosas»).
