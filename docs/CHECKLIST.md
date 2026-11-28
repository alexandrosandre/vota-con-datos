# Checklist · vota con datos (29-N)

Actualizado: 20-nov-2026. Solo lo pendiente; lo terminado está en el historial de git. La web ya está
en línea; aquí «bloquea» significa **no difundirla ni anunciarla** (o, si ya circula, que deja de ser
correcta o legal) hasta que esté hecho.

**Quién lo desbloquea**
* **[Tú]** — necesita una acción o decisión tuya; no avanza sin ti.
* **[Yo → Tú]** — lo preparo yo y al final eliges o apruebas tú.
* **[Yo]** — lo hago yo (o la revisión programada); no te necesita.
* **[Externo]** — depende de terceros (partidos, BOE, encuestadoras); en cuanto ocurre, lo proceso yo.

## A. Bloquea la difusión

Nada. **1. Revisión de una muestra por el editor: hecha el 13-nov.** Sus observaciones (contexto de q31 con
desplegable, selector de papeletas del paso 3, icono) quedaron resueltas en los commits ef372be, f442128 y
8ef11a6. El icono en los resultados de Google depende de que Google rastree la web (Search Console).

## B. No bloquea — lo hago yo

- [ ] **2. [Externo → Yo] Programas que faltan.** No bloquean: mientras no hay programa, el paso 2 usa
  los compromisos públicos de sus líderes y lo dice. Cuando salgan: lectura completa, evaluación,
  revisión independiente, auditoría de coherencia y recodificación del paso 1; sus compromisos ya
  analizados que no estén en el programa pasan a complemento (hasta 4, `base: complemento`, nueva
  revisión).
  - [x] PSOE — **publicado el 15-nov** (presentado en Alcorcón a las 12:00; psoe.es lo enlaza desde las 15:29;
    descargado por el editor porque psoe.es exige superar un control anti-bots, sha256 comprobado contra psoe.es).
    Hecho el 15-nov: paso 1 recodificado (g11, verificado: PSOE 11→16 posiciones; el PSC no lo ha adoptado,
    volver a mirar tras su acto del 15-nov); 12 propuestas del programa (revisión independiente, 81 correcciones,
    ninguna valoración cambia); sus compromisos anteriores están todos en el programa, así que no hay complemento
    (revisión aprobada; el más discutible, la financiación autonómica, pierde el plazo de 2027); auditoría de
    coherencia (`data/fase3/coherencia_2026-11-15.md`: 95 correcciones de texto, cifras y fuentes en 15 partidos,
    ninguna valoración cambia).
  - [x] Vox — **publicado el 12-nov** (PDF en votasentidocomun.es, la web de campaña enlazada desde
    voxespana.es). Hecho el 13-nov: 12 propuestas del programa + 2 de complemento (revisión independiente
    aprobada, 91 correcciones), auditoría de coherencia (`data/fase3/coherencia_2026-11-13.md`: 26 cambios de
    texto en pp, salf, junts y vox, ninguna valoración cambia) y paso 1 recodificado (g6: Vox 23→25 posiciones).
    Cerrado el 15-nov: el IVA italiano del 4 % para la primera vivienda (salf-01, vox-09) cita ya el DPR
    633/1972 (Normattiva) y la guía de la Agenzia delle Entrate, y pp-02 explica su «no_verificable» (falta
    cuántas personas dejarían de regularizarse y el coste de visados y cupos); ninguna valoración cambia.
  - [x] Compromís — **publicado el 14-nov** (programa de la coalición Compromís: Front Valencià). Hecho el
    14-nov: 12 propuestas + 4 de complemento (revisión independiente, auditoría de coherencia que cambió dos
    propuestas para cubrir todos los bloques, y segunda revisión) y paso 1 recodificado (g10: como documento
    conjunto cuenta también para Podemos, Frente Amplio y ERC).
  - [x] PSC — **asume el programa del PSOE** (decisión del editor, 15-nov: solo añade cuestiones de ámbito catalán sin
    contradecirlo). Paso 1: g13, PSC 5→11 posiciones (q18 pasa de +1 a +2 por la precedencia del programa). Paso 2: las 12
    propuestas del PSOE, con nota, y como complemento el Parador de Tarragona (único compromiso propio fuera de ese programa
    que el PSC destaca; El Prat queda fuera por decirse una sola vez, como psoe-c07). Revisión independiente aprobada.
  - [x] Frente Amplio — **publicado el 16-nov** («Un programa como una casa», 151 pp., frenteamplio.info; más de 1.000 medidas
    según la prensa). Hecho el 16-nov: paso 1 recodificado (g14, verificado: Frente Amplio 21→25 posiciones; q29 Mercosur pasa
    de +2 a sin posición porque el programa propone fiscalizar el acuerdo, no frenarlo; q33 queda en −1 tras la verificación);
    12 propuestas del programa (dos revisiones independientes, 96 correcciones; cambia una valoración: financiación de las
    horas de luz gratis, desfavorable → mixta); sus compromisos anteriores están en el programa, así que no hay complemento.
    Las «500 medidas» del PSOE del 16-nov son el programa ya incorporado el 15-nov (mismo sha256 en psoe.es).
  - [x] Ara Més-Front Ampli y EH Bildu — **publicados el 16-nov** («Viure bé, viure aquí», 17 pp., en catalán; «Posible Egin.
    Garantía y derechos», 30 pp.). Hecho el 17-nov: paso 1 recodificado (g15 y g16, verificados sin cambiar ningún valor: Ara Més
    10→18 posiciones, EH Bildu 14→18; el programa de Ara Més-Front Ampli es documento conjunto para Frente Amplio, que solo cambia
    la fuente de q32); 12 propuestas de cada programa con revisión independiente (Ara Més 13 correcciones, cambia una valoración:
    financiación de -01 a mixta; EH Bildu 45 correcciones, ninguna valoración cambia); sin complemento en ninguno de los dos.
    Auditoría de coherencia (`data/fase3/coherencia_2026-11-17.md`: 41 correcciones de texto, cifras y fuentes en 10 partidos;
    ninguna valoración cambia).
  - [x] Podemos — **publicado el 18-nov** («Así de básico: paz, casa y trabajo», 141 pp., en su web de campaña pazcasaytrabajo.es,
    hacia las 09:56; presentado a la prensa el 17-nov). Hecho el 18-nov: paso 1 recodificado (g19, verificado sin cambiar ningún
    valor: Podemos 23→25 posiciones; q05 y q11 nuevas, y q01, q09, q21, q29 y q33 se refuerzan con el programa); 12 propuestas del
    programa (revisión independiente, 20 correcciones; cambia una valoración: financiación del referéndum monarquía/república,
    favorable → mixta, por la vía del art. 168); complemento: contratar 40.000 sanitarios y 40.000 maestros (no está en el programa).
  - [x] Junts — **publicado el 18-nov** en tualcentre.cat, su web de campaña «Catalunya al centre» (titular: Junts
    per Catalunya; enlazada desde junts.cat), detectado el 20-nov; 90 pp., mismo sha256 que la copia que alojaba Ara
    (cde2c5f3…), sobre la que se había preparado el análisis. Paso 1: g20 verificado (Junts 16 → 18 posiciones; q06
    queda en null porque solo consta en el anexo de balance de la legislatura anterior). Paso 2: 12 propuestas del
    programa con revisión independiente; complemento vacío. Auditoría de coherencia (`data/fase3/coherencia_2026-11-20.md`):
    financiación de junts-08 y pnv-08 (jubilación sin coeficientes reductores con 40 años cotizados) pasa de
    no_verificable a mixta con la estimación del Gobierno en respuesta parlamentaria (3.358 M€ anuales para los ya
    jubilados); psc-c05 corrige la inversión del DORA en El Prat (1.294,840 M€, BOE-A-2026-19507).
  - [x] UPC (NC-BC, Podemos, IU y Sumar) — **publicado el 19-nov**: «Líneas básicas del programa electoral» (19 pp.,
    unidadpueblocanario.org), que sustituyen al manifiesto del 3-nov. Se trata como programa porque el propio documento
    se denomina programa electoral y concreta medidas (decisión del coordinador, revisable; el manifiesto anterior y el
    del PSC no se denominan programa). Paso 1: g21 verificado (UPC 7 → 12 posiciones; q06, jornada de 37,5 h, queda en
    +1 porque no dice «sin reducción salarial»). Paso 2: 12 propuestas con revisión independiente, complemento upc-c01
    (zonas tensionadas declaradas por los ayuntamientos). Auditoría de coherencia (`data/fase3/coherencia_2026-11-20b.md`:
    28 correcciones en UPC y CC; ninguna valoración cambia). Registro: 6 propuestas centrales (UPC 6 → 12).
  - [ ] UPN — sin programa el 20-nov a las 09:50 (upn.org y upn-pp.es).
  - PSC: sigue asumiendo el programa del PSOE; su manifiesto del 29-N (8 pp., socialistes.cat/generals) queda catalogado
    como `documento_programatico`, como el de UPC.
  - Compromís **retiró su PDF** el 18-nov a mediodía y por la tarde volvió a servir en la misma URL una **versión revisada**
    (57 pp., sha256 b62b06d4…; sin nota oficial): quita la tasa turística de 2 € y el «mínimo del 51 %» de Red Eléctrica y
    añade el empadronamiento obligatorio y menos carga burocrática a los pequeños autónomos. La fuente pasa a ser esa versión
    (precedente de ERC y Frente Amplio) y la web deja de enlazar la copia archivada. Re-paginados los pasos 1 y 2 y el
    registro; revisión independiente; ninguna posición, valoración ni promesa cambia.
  - PNV y Adelante Andalucía sirven otra versión en su URL oficial (comprobado el 20-nov): el PNV la cambió el 10-nov
    (medida 05 de acogida: ahora rechaza grandes centros como el previsto en Arana; se mueven las pp. 25-28) y Adelante
    Andalucía el 16-nov (solo el colofón). Catalogadas como fuente, re-paginados pasos 1 y 2 y registro, revisión
    independiente; ninguna posición, valoración ni promesa cambia (el descarte del compromiso de Urtaran sobre Arana pasa
    a «ya está en el programa»).
  - Republicados el 17-nov: ERC (numeración del 1 al 227, «LGBTI+», medida 32) y Frente Amplio (tarifa plana de 88 €, cláusulas
    IPC, cultura al 2 % del gasto, IVA franquiciado opcional); catalogados el 18-nov, ninguna posición ni valoración cambia.
  - Hecho el 16-nov: auditoría de coherencia tras el programa del Frente Amplio (`data/fase3/coherencia_2026-11-16.md`: 49 correcciones de
    texto, cifras y fuentes en 11 partidos; ninguna valoración cambia).
  - Hecho el 14-nov: adelante_andalucia-08 cita la DA 23.ª de la Ley 54/1997 (mínimo del 10 % de la SEPI en
    Red Eléctrica) y pp-07 y compromis-13 resumen a Bom y Ligthart con sus cifras exactas (0,083 / 0,122 para el
    capital de la Administración central, casi el doble en infraestructuras básicas regionales o locales).
- [x] **3. [Yo] Revisar la selección de afirmaciones del paso 1** para cubrir mejor a los 18 partidos:
  análisis, codificación y verificación independiente; decido yo, sin pasar por ti. **Hecha el 13-nov**
  (`data/fase1/revision_afirmaciones_2026-11-13/integracion.md`): se retiran q02, q07, q10, q14 y q28, entran
  q31–q35 y la media sube de 6,6 a 7,7 posiciones por partido. **Repetida el 15-nov tras el programa del PSOE**
  (`data/fase1/revision_afirmaciones_2026-11-15/analisis.md`): se retira q20 y entra q36 (prórroga de las
  centrales nucleares), codificada en `codificacion_g12.json` y verificada (`verificacion_g12.json`: 10 de 11
  aprobadas; la del PSC, «no hay nada grabado a fuego», se rechaza por ambigua). q36 pasa de 3 a 10 partidos con
  posición (3 a favor, 7 en contra); las respuestas guardadas a q20 dejan de contar. Hecho: ya no se repite.
- [x] **4. [Externo → Yo] Listas del BOE tras los recursos** ante el TS (art. 44.4 LOREG, 13–19-nov). **Hecho el
  20-nov:** sumarios del BOE del 13 al 20-nov sin correcciones de la proclamación ni resoluciones (BOE-A-2026-23103
  solo enlaza su corrección BOE-A-2026-23383, que no tiene posteriores); los PDF de candidaturas proclamadas y de
  su corrección en la web de la JEC son idénticos a los del repo; no hay sentencias del TS ni del TC que cambien
  candidaturas al Congreso, así que no hace falta volver a descargar el BOE. Según la prensa (no hay fuente
  oficial), el recurso de Drago Canarias contra las siglas de UPC fue a los juzgados de lo contencioso de Canarias
  y el TC inadmitió sus amparos el 12-nov; UPC sigue proclamada. PACMA quedó fuera en Barcelona (ya coincide con el
  BOE). No pude comprobar la lista de acuerdos de la JEC del 13 al 20-nov.
- [ ] **5. [Externo → Yo] Encuestas nuevas** publicadas antes del 24-nov, desde su publicación original.
  Desde el 24-nov no se añade ninguna encuesta nueva (LOREG 69.7); las publicadas antes siguen en el paso 3
  (decisión del editor, 25-nov).
- [ ] **6. [Yo] Compromisos de campaña desde el 13-nov** (empieza la campaña), sobre todo para los partidos
  con menos posiciones en el paso 1: UPN (0/30), Ara Més (2), PSC (3), CC (4), NC-BC (5), PNV (7). La
  revisión programada recoge las promesas nuevas a diario. **Primer barrido hecho el 13-nov** (grupo g5,
  verificación independiente: 23 aprobadas, 8 rechazadas): UPN 0→5, Ara Més 2→8, PSC 3→5, NC-BC 5→6,
  EH Bildu 10→13, Compromís 10→13, Frente Amplio 14→16; CC (4) y PNV (7) sin nada nuevo que cumpla las
  reglas. Segundo barrido, también de los compromisos del paso 2 de los partidos sin programa, hacia el 18-nov.
- [ ] **7. [Tú] Opcional:** activar la verificación en dos pasos en Porkbun. (Dominio verificado en
  GitHub el 13-nov; no borrar el registro TXT `_github-pages-challenge-…`.)

**Revisión del 13-nov, 20:13:** encuesta Sigma Dos (tracking 13-nov) como escenario propio; 12 compromisos
nuevos (Frente Amplio 6, Ara Més 3, Vox 2, EH Bildu 1: SMI propio sin cuantía, mismo listón que el del
PNV); BOE sin correcciones hasta el 13-nov.

**14-nov (barrido adelantado y revisión de la mañana):** paso 1 — UPN 5→6, Junts 12→15, NC-BC 6→7, Ara Més
8→9, Compromís 13→17, Podemos 18→22, Frente Amplio 16→20, ERC 17→18 (PSC, EH Bildu, CC y PNV sin nada nuevo
que cumpla las reglas); paso 2 — UPN 3→9 (compromisos de la web UPN-PP), PSC 4→5, EH Bildu 5→6, se retiran
podemos-01 y ara_mes_fa-03 (objetivos sin medida); tracking de 40dB del 14-nov; BOE sin correcciones. Réplica
de la revisión programada creada (caduca el 21-nov; un recordatorio del 20-nov la renueva).

**Revisión del 14-nov, 20:13:** sin programas nuevos (la agenda oficial del PSOE confirma su presentación el 15-nov
a las 12:00); 30 compromisos nuevos con revisión independiente (SALF 6, citados del «Contrato electoral» oficial;
Ara Més y Frente Amplio 6 cada uno, documento conjunto; Adelante Andalucía 5, ERC 4, PSC 2, PNV 1; total 195);
paso 1 sin posiciones nuevas; encuestas sin novedades publicadas (el día 3 del tracking de 40dB sale el 15-nov);
BOE sin correcciones; dominio y HTTPS correctos.

**Revisión del 15-nov, 09:43:** encuestas — tracking de 40dB día 3 (sustituye al día 2 en la media) y tracking de Sigma
Dos día 3 (pasa a ser su escenario propio; Soria ¡Ya!, 0,1 %, conserva su voto de 2023 como Teruel Existe); 8
compromisos nuevos con revisión independiente (BNG 6, Podemos 1 —se retiraron 2 con una sola fuente—, PSOE 1;
total 203); sin programas nuevos (junts.cat no se pudo leer: 403); paso 1 sin posiciones nuevas; BOE sin cambios.
Pista para el paso 1 del PSOE tras su programa: la entrevista de Sánchez con Jordi Wild (13-nov) por si toca q27.

**Revisión del 15-nov, 20:13 (hecha a las 21:00):** 5 compromisos nuevos con revisión independiente (Frente Amplio 4:
dentista público, gafas, audífonos e IVA anual de autónomos; Coalición Canaria 1: transporte de mercancías; se
retira uno de Podemos por ser un lema sin medida; total 208); sin programas nuevos (junts.cat sigue respondiendo
403); sin encuestas publicadas (el día 4 de 40dB ya está en el servidor de El País, fechado el 16-nov); BOE sin
cambios; paso 1 sin posiciones nuevas. Despliegues sin cortes desde hoy: datos con nombre por contenido y cada
despliegue conserva las 6 versiones anteriores (prueba: 139 visitas simuladas durante un despliegue, 0 fallos).

**Hecho el 13-nov por la tarde** (revisión del cambio partidos/papeletas, commit 1299bb2): el PNV aparece
en Navarra dentro de Geroa Bai; la afinidad del paso 3 se recalcula (salía «1 %»); documentos conjuntos de
una coalición cuentan para cada firmante y el PSC cuenta a Sánchez (decisiones del editor); vista previa al
compartir en redes con nombre del sitio e icono PNG.

**Revisión del 16-nov, 09:43:** encuestas — tracking de 40dB día 4 (sustituye al día 3 en la media; El País sirve ahora
los PDF con nombre en minúscula y se corrige el enlace del día 3); Sigma Dos día 4 y GAD3 aún sin publicar (de GAD3 solo
hay una estimación del Senado). 16 compromisos nuevos con revisión independiente (Teruel Existe 6, PP 5, Frente Amplio 4,
Compromís 1; total 224); no se añaden 3 del PSOE porque salen de la presentación de su programa, que se analiza en el
paso 2. Programas: Frente Amplio abre frenteamplio.info/programa/ con 8 medidas y «PDF disponible próximamente»; como el
manifiesto de la UPC, se guarda como documento programático y no como programa hasta que publique el completo. Los
otros 6 siguen sin programa (junts.cat ya responde). Paso 1 sin posiciones nuevas (la entrevista de Sánchez con Jordi
Wild no da posición sobre q27). BOE sin cambios; dominio y HTTPS correctos.

**Revisión del 16-nov, 20:13, y del 17-nov, 09:43:** encuestas — Sigma Dos día 4 (16-nov) y 40dB día 5 (17-nov) entran en la
media; GAD3 y CIS sin novedades. Programas de Ara Més-Front Ampli y EH Bildu (punto 2). Compromisos: 34 nuevos con revisión
independiente (224 → 258). **Decisión del editor (16-nov):** en el registro de compromisos, el programa y la campaña valen igual
como fuente para todos los partidos; se recuperan 3 del PSOE y 1 del Frente Amplio. Pendiente para el barrido del 18-nov:
medidas de los programas del PP, Vox, Compromís y PSOE/Frente Amplio con el mismo criterio, para igualar la cobertura. Paso 1
sin posiciones nuevas de campaña (pendientes: resultado de la Comisión Interministerial de Migración, Esteban 18 y 19-nov,
debate Sánchez-Feijóo del 19-nov, vídeo de Nogueras en Barcelona Tribuna). BOE sin cambios; dominio y HTTPS correctos.

**Revisión del 17-nov, 20:13:** Sigma Dos día 5 entra en la media (40dB día 6 aún sin artículos de El País y la SER).
Paso 1: UPN q03 de sin posición a +1 (nota de UPN-PP sobre el IVA de la primera vivienda; g17 verificado; UPN 6→7). Compromisos:
27 nuevos con revisión independiente (258 → 285). Podemos presentó su programa «Paz, casa y trabajo» a la prensa, pero no está
en ningún canal oficial (podemos.info ni la web de campaña pazcasaytrabajo.es, guardada como documento programático); sus
medidas solo citadas por Europa Press no entran. UPN, UPC y Junts sin programa. BOE sin cambios; dominio y HTTPS correctos.
El PDF de Adelante Andalucía se republicó el 16-nov solo con otra línea de versión. Compromisos: el 30 % de Colau y el 40 % de Podemos concretan promesas ya registradas (se mantiene el criterio del 15-nov).

**Revisión del 18-nov, 09:43:** 40dB día 6 (El País/SER, 18-nov) entra en la media; Sigma Dos día 6, GAD3 y CIS sin novedades
a las 09:45. ERC republicó su programa el 17-nov (sha256 f0b6d8e0…): numeración correlativa del 1 al 227, «LGBTI+» y una
frase de la medida 32; catalogado y actualizados los números de medida citados en los pasos 1 y 2 (ninguna posición ni
valoración cambia). UPN, Podemos, UPC y Junts sin programa. Paso 1 sin posiciones nuevas. BOE sin cambios; dominio y HTTPS
correctos. **Para el barrido del 18-nov, 10:47:** además de la paridad (medidas de los programas del PP, Vox, Compromís, PSOE
y Frente Amplio) y el IVA del 4 % de la primera vivienda de UPN-PP, revisar las 5 candidatas de la mañana (PSOE: redes
sociales a partir de 16 años, medida 399; ERC: nuevo modelo de financiación, medida 23; PP: frecuencias Logroño–Madrid con
parada en Calahorra; BNG: IVA del 5 % para la energía y terrenos de la Sareb en As Raíñas) y la hora diaria de catalán de
Ara Més (nota del 17-nov, sin registrar ni descartar).

**Barrido del 18-nov (10:47–14:00):** paso 1 sin posiciones nuevas de campaña desde el 13-nov (g18: solo notas). Paso 2:
compromisos de campaña con revisión independiente (UPN +2 prioridades: IVA del 0 % en alimentos básicos y del 10 % en carburantes,
con encaje legal mixto por la Directiva del IVA, e IVA del 4 % en la primera vivienda; complemento nuevo del PP, PSC y ERC; más
ocasiones en Junts, BNG y PP; criterio único para el complemento: el ámbito local no excluye; entra con dos ocasiones o una
destacada). Registro de compromisos 285 → 342: paridad de los programas del PP, Vox, PSOE, Frente Amplio y Compromís (criterio:
sus propuestas centrales concretas no registradas), las candidatas de la mañana y la salida de la OTAN de Podemos; la revisión
independiente rechazó 4 (pseudoterapias, ya prohibidas por la Ley 4/2023). El BNG solo tiene promesas de campaña, ninguna de
su programa (tiene 23): valorar en el próximo barrido si se iguala. Auditoría de coherencia tras Podemos
(`data/fase3/coherencia_2026-11-18.md`: 39 correcciones en 13 partidos; criterio único para el coste de reformas
constitucionales y referendos —solo cuenta la votación que la propuesta exige; si el programa no la cuantifica, «mixta»—, que
cambia dos valoraciones de financiación: erc-04 y salf-12, no_verificable → mixta; el SMI de 2027 ya está fijado en 18.004 €,
RD 1013/2026 según el RDL 38/2026, BOE del 18-nov).

**Revisión del 20-nov, 09:43** (las dos del 19-nov no se ejecutaron): encuestas del 19-nov de 40dB (día 7) y Sigma
Dos (nuevo escenario de Sigma Dos); el día 8 de 40dB está en el servidor de El País pero aún sin publicar. Junts publicó
su programa el 18-nov en tualcentre.cat (idéntico a la copia de Ara); UPC, sus líneas básicas del programa el 19-nov;
el PNV y Adelante Andalucía sirven versiones nuevas (catalogadas). Paso 1: sin posiciones nuevas de campaña (debate
Sánchez–Feijóo incluido); Junts 16 → 18 y UPC 7 → 12 por sus programas. Registro 348 → 370 (9 de campaña, 7 de Junts y 6
de UPC). Auditorías de coherencia: financiación de junts-08 y pnv-08 a mixta con la estimación oficial del Gobierno.
BOE y JEC sin cambios en las candidaturas (punto 4 hecho). Dominio y HTTPS correctos.

**Revisión del 28-nov, 09:43 (jornada de reflexión):** registro 407 → 408 con revisión independiente (2 candidatas, 1
rechazada): Teruel Existe 1 (complemento de territorialidad para empleados públicos en zonas menos pobladas, p. 13 de su
programa, que Tomás Guitarte defendió el 26-nov para la Guardia Civil rural; se había pasado por alto el 26-nov). Se
rechazan los tres cuarteles abiertos 24 horas (en condicional y fuera del programa). Paso 1 sin posiciones nuevas. UPN
sigue sin programa; BOE del 27 y 28-nov y JEC (última sesión, 26-nov) sin novedades en candidaturas. Encuestas: ninguna
nueva (prohibición). Dominio y HTTPS correctos.

**Revisión del 27-nov, 20:43 (cierre de campaña):** registro 399 → 407 con revisión independiente (9 candidatas, 1
rechazada): PP 1 (primarias financiadas solo con las cuentas del partido y fiscalizadas por el Tribunal de Cuentas, medida
reservada de su programa, Europa Press) y las líneas rojas de Ara Més-Front Ampli que presentó Carme Gomila: IVA propio
reducido para Baleares, Ley de cogestión aeroportuaria y complemento de residencia del personal del Estado (Ara Més y
Frente Amplio) y limitar la compra de vivienda por no residentes (solo Ara Més; el Frente Amplio ya tiene la prohibición
de compras especulativas). Los mítines de cierre no traen más medidas concretas. Paso 1 sin posiciones nuevas. UPN cierra
la campaña sin programa; BOE del 27-nov y JEC sin novedades en candidaturas. Encuestas: ninguna nueva (prohibición).
Dominio y HTTPS correctos.

**Revisión del 27-nov, 09:43:** debate a cuatro del 26-nov (Academia de Televisión, RTVE): registro 397 → 399 con
revisión independiente: PP 1 (Feijóo: ayudas a las familias numerosas que se mantengan cuando los hijos dejan el hogar) y
Vox 1 (Abascal: el Ingreso Mínimo Vital solo para los españoles, medida 22 de su programa); citas de Europa Press
confirmadas en el vídeo de RTVE Play. Se añade a la meta de promesas.json la nota del 26-nov que faltaba. Paso 1 sin
posiciones nuevas (Vox en q31 sigue en null: «prórrogas forzosas» no identifica la medida). UPN sigue sin programa; BOE
del 26 y 27-nov sin novedades en candidaturas; la sesión de la JEC del 26-nov (34 acuerdos) no toca candidaturas.
Encuestas: ninguna nueva (prohibición). Dominio y HTTPS correctos.

**Revisión del 26-nov, 20:43:** registro 396 → 397 con revisión independiente: Adelante Andalucía 1 (suelo del 2 % del
PIB para la universidad pública y del 3 % para I+D+i, de Ana Jiménez en Teatinos; propuesta 133 de su programa). Cinco
candidatas descartadas (ver data/promesas/cambios_2026-11-26.md). Paso 1 sin posiciones nuevas; el debate a cuatro de
las 22:00 queda para la revisión del 27-nov. UPN sigue sin programa; BOE sin novedades en candidaturas; la JEC no ha
celebrado sesión desde el 23-nov. Encuestas: ninguna nueva (prohibición). Dominio y HTTPS correctos.

**Revisión del 26-nov, 09:43:** sin cambios en los datos. Registro de compromisos en 396: una candidata (el PP, terminar
la autovía A-15) rechazada en la revisión independiente porque ya figura en la promesa del PP sobre inversiones del
Estado en Navarra (ver data/promesas/cambios_2026-11-26.md). Paso 1 sin posiciones nuevas. UPN sigue sin programa; BOE
del 24 al 26-nov sin novedades en candidaturas; la JEC no ha celebrado sesión desde el 23-nov. Encuestas: ninguna
nueva (prohibición desde el 24-nov). Dominio y HTTPS correctos.

**Réplica de la revisión programada (26-nov, 9:07):** la tarea recurrente (9:13 y 20:13) se renueva con el mismo texto y
se borra la anterior, que caducaba el 27-nov. La nueva cubre hasta el 29-nov; después de esa fecha se borra (punto 8).

**Revisión del 25-nov, 20:43:** registro 392 → 396 con revisión independiente: Coalición Canaria 1 (equiparar las
pensiones no contributivas a las mínimas, del «contrato» de CC-1ºCAN del 24-nov) y Ara Més-Front Ampli 2 (5 % del
presupuesto no financiero a igualdad, que cuenta también para el Frente Amplio, y jornada de 32 horas, solo Ara Més
porque el Frente Amplio ya la tiene por Compromís). Rechazadas: la reforma contra las «guerras ilegales» de Sánchez (ya
la cubre la LO 5/2005) y una variante del BNG. Paso 1 sin posiciones nuevas. UPN sigue sin programa; BOE del 24 y 25-nov
sin novedades en candidaturas; la JEC no ha celebrado sesión desde el 23-nov. Encuestas: no hay más publicadas antes del
24-nov. Dominio y HTTPS correctos.

**25-nov, encuestas de las otras 12 empresas (14–23 nov):** la revisión programada solo seguía a CIS, Sigma Dos, GAD3 y
40dB. Barrido de las publicadas antes del 24-nov y verificación independiente en tres grupos: entran 29 (NC Report 2,
IMOP 2, DYM, Target Point 2, Hamalgama, Ateneo del Dato, Data10 6, Winston, Celeste-Tel, More in Common, SW Demoscopia
10 y SocioMétrica, esta fuera de la media por acumulada). Se rechaza la pieza de Data10 de la noche del 23-nov
(infografía subida el 24-nov, 00:15). No se usa contenido marcado para suscriptores. El n.º 7 de SW Demoscopia deja de
estar excluido: La Séptima lo publica en su web desde el 18-nov. Media con 15 empresas: PP 125, PSOE 99, Vox 64.

**25-nov (decisión del editor):** la prohibición del art. 69.7 se aplica a publicar encuestas nuevas, no a las ya
publicadas. El paso 3 vuelve a ofrecer la media y los escenarios de CIS, Sigma Dos, GAD3 y 40dB; se quita la retirada
automática (pipeline, navegador, despliegue programado y conservar_versiones). La media sigue con su ventana de 21 días:
9 empresas hoy y 5 el 29-nov.

**Revisión del 24-nov, 09:47:** encuestas no (prohibición en vigor desde las 00:00). UPN sigue sin programa (upn.org,
upn-pp.es y sus canales públicos sin novedades). Registro sin entradas nuevas (392): las candidatas ya estaban
registradas, ya son ley (Ley 19/1994) o no concretan la medida (cambios_2026-11-24.md). Paso 1 sin posiciones nuevas.
BOE del 23 y 24-nov sin correcciones ni resoluciones sobre candidaturas; la JEC no ha celebrado sesión después de la del
23-nov. Dominio y HTTPS correctos.

**24-nov, 09:40 (prohibición de encuestas):** la reconstrucción programada del 23-nov a las 22:05 salió con 8 h de retraso
(06:15) y falló, así que el fichero de datos publicado aún llevaba las encuestas (el paso 3 ya solo mostraba 2023 en
el navegador). Dos fallos corregidos, con test: un test exigía algún escenario de encuesta, y conservar_versiones.py
habría vuelto a publicar las 7 versiones anteriores, con encuestas; durante la prohibición ya no las conserva.

**Revisión del 23-nov, 20:43 (últimas encuestas antes de la prohibición del 24-nov):** dos encuestas publicadas el 23-nov,
con verificación independiente contra las copias (sha256, cifras y mapeo de etiquetas). Sigma Dos, tracking final (campo
16-23 nov, n=5.252), publica porcentaje y horquilla de todos los partidos con escaño, así que pasa a ser el escenario de
Sigma Dos y la última de Sigma Dos en la media. CIS, barómetro de noviembre (estudio 3587; campo 10-17 nov, n=8.034;
PSOE 34,4, PP 24,7, Vox 15,6): da el porcentaje de todos los partidos, así que con el mismo criterio que las demás
empresas sustituye a la macroencuesta 3584 como escenario del CIS. Entra además en la media, de la que el 3584 ya había
salido por antigüedad. «Democracia 21» se ignora en la proyección. Media con 11 empresas: PP 127, PSOE 95, Vox 64 (antes
130, 92 y 65). Registro 385 → 392 con revisión independiente: UPN-PP en Navarra (deducción estatal del IRPF para celíacos,
Ley Nacional de Cuidados Paliativos, Fondo Estatal de Enfermedades Raras; nota conjunta, cuenta para UPN y para el PP) y
BNG (Centro de Alto Rendimiento de Xeve). Se rechaza la nota de Ibarrola sobre la valoración de la discapacidad
(competencia foral). UPN sigue sin programa. BOE sin novedades. La JEC celebró sesión el 23-nov (acuerdos 425-451) sin
nada sobre candidaturas. Paso 1 sin posiciones nuevas. Dominio y HTTPS correctos.

**Revisión del 23-nov, 09:43:** encuestas, último día de publicación, con verificación independiente contra las copias.
Sigma Dos del 22-nov (publicada a las 22:34; campo 16-21 nov) sustituye a la del 21-nov en la media, con su desglose
provincial. No pasa a ser escenario porque solo publica el porcentaje de PP, PSOE, Vox, Frente Amplio y Podemos; como
escenario daría ERC 7, Junts 7, PNV 6 y AA 0, frente a los 11, 3, 3 y 5 publicados, así que el escenario sigue siendo el
del 21-nov. Con una u otra, la media da los mismos escaños. El informe final de 40dB (23-nov, 7.500 entrevistas del 10 al
21-nov, solo PP, PSOE y Vox) se registra fuera de la media: termina el mismo día que el día 10 del tracking, que publica
todas las cifras. GAD3 y CIS sin novedades. Registro 385 → 387 (UPC: OSP en las rutas aéreas con la Península; deflactar
el IRPF y deducción por la subida de precios) → 385. Se rechaza upc-c y se retiran dos promesas de Coalición Canaria
(POSEI al 100 % y 100 % del coste real del transporte de mercancías) porque ya las obliga la Ley 19/1994 (arts. 7.1, 7.3
y 24.2), según una revisión independiente del texto consolidado; es el mismo criterio que con las pensiones del PSC
(21-nov) y la Ley 4/2023 (18-nov). Paso 1 (g25, con verificación independiente aprobada): UPC en q33 pasa de −1 a −2 por Luis Campos (secretario general
de NC-BC y cabeza de lista por Las Palmas) en La Provincia el 23-nov: «derivación obligatoria de migrantes al resto del
Estado», «los adultos y los menores extranjeros», «un elemento absolutamente esencial»; es el mismo nivel que Podemos y CC,
y el programa de UPC («distribución solidaria») no lo matiza. UPN sigue sin programa; BOE del 23-nov y JEC sin novedades; dominio y HTTPS correctos.

**Revisión del 22-nov, 20:43:** registro 381 → 385 con revisión independiente: Adelante Andalucía (Cercanías o media
distancia en los municipios de más de 20.000 habitantes, propuesta 374 de su programa), Coalición Canaria (ferry gratis
Órzola–Caleta del Sebo para residentes de La Graciosa, con el texto de la nota oficial de la candidatura y no la cita de
Teodoro Sosa) y PP 2 (nueva Ley de Costas, Prohens; conducciones de la presa de Rules, Saavedra). Encuestas: sin nuevas
publicables; el gráfico de Sigma Dos ya trae la fila del 23-nov, pero El Mundo aún no la ha publicado en un artículo
(reintentar el 23-nov, último día). 40dB día 11, GAD3 y CIS sin novedades. UPN sigue sin programa; BOE y JEC sin
novedades; paso 1 sin posiciones nuevas; dominio y HTTPS correctos.

**Revisión del 22-nov, 09:43:** tres encuestas nuevas, publicadas antes del 24-nov y comprobadas por un verificador
independiente contra las copias guardadas (sha256 incluidos). 40dB día 10 (22-nov; informe en ep00.epimg.net, campo
17-21 nov) sustituye al día 9 en la media. Sigma Dos del 21-nov (campo 14-20 nov) pasa a ser el escenario de Sigma Dos.
GAD3 del 22-nov (campo 16-19 nov) entra solo en la media: el texto de GAD3 no da el porcentaje de Podemos, al que asigna 0
escaños, y sin él el escenario le devolvería los escaños de 2023; el gráfico de la misma página repite cifras del 9-nov en
otras filas, así que el escenario de GAD3 sigue siendo el del 9-nov. Media con 10 encuestas. Notas de 40dB: la SER da 13
escaños de margen a la derecha y 162 al bloque de investidura; según el PDF son 11 y 160. Registro sin entradas nuevas
(381; 6 candidatas rechazadas, 5 por duplicadas); paso 1 sin posiciones nuevas; UPN sigue sin programa; no hay BOE el
domingo y la JEC no tiene acuerdos nuevos; dominio y HTTPS correctos. Último día con encuestas: 23-nov.

**Revisión del 21-nov, 20:43:** registro 379 → 381 (Junts: reforma del padrón, punto 3.1 de su programa, anunciada por
Nogueras; Adelante Andalucía: regularizar las viviendas de El Palo y Pedregalejo afectadas por Costas), con revisión
independiente; la de UPN sobre la transitoria cuarta se rechaza por estar ya registrada. Encuestas: 40dB día 10 salió en El
País sin cifras comprobables ni informe en PDF (reintentar el 22-nov; debe publicarse antes del 24-nov); Sigma Dos no
publicó el sábado. UPN sigue sin programa; BOE y JEC sin novedades; paso 1 sin posiciones nuevas; dominio y HTTPS correctos.

**Revisión del 21-nov, 09:43:** BOE-A-2026-24503 (BOE del 21-nov) corrige solo el apellido del presidente de la Junta
Electoral de Burgos en la firma de la proclamación (Martín → Marín Ibáñez); aplicada en boe_parse.py, sin cambios en
candidaturas ni listas. JEC sin acuerdos nuevos. Encuestas sin novedades (la media pasa de 12 a 10 encuestas porque CIS y
Target Point superan los 21 días de campo). UPN sigue sin programa. Registro sin cambios (379; 4 candidatas rechazadas por
la revisión independiente). Paso 1 sin posiciones nuevas. Dominio y HTTPS correctos.

**Revisión del 20-nov, 20:13 (hecha a las 20:45):** encuestas — 40dB día 9 (20-nov; el día 8 no tuvo artículo propio y no
entra) y Sigma Dos del 20-nov como escenario de Sigma Dos (PP 31,2 %, PSOE 27,6 %, Vox 18,9 %); CIS y GAD3 sin novedades.
Paso 1: q37 recodificada (g24) con la decisión 11 del editor —subir impuestos de forma progresiva cuenta +1—: Podemos,
Compromís, ERC y BNG pasan de sin posición a +1 (10 a favor, 5 en contra, 3 sin posición), con verificación independiente;
Vox y SALF siguen en −2 porque dicen cómo recortarán gasto para compensar su rebaja (decisión del coordinador, revisable).
Cinco votaciones más del Congreso en «Lo que votaron» (decisión 13). Registro 370 → 379 (SALF 4, PP 4, BNG 1; revisión
independiente, ninguna rechazada). UPN sigue sin programa; BOE y JEC sin cambios en las candidaturas; dominio y HTTPS
correctos.

**Réplica de la revisión programada (20-nov, 9:07):** la tarea recurrente (9:13 y 20:13) se renueva con el mismo texto y
se borra la anterior, que caducaba el 21-nov. La nueva caduca el 27-nov; un recordatorio del 26-nov a las 9:07 la vuelve a
renovar para cubrir hasta el 29-nov.

**Revisión del 18-nov, 20:43:** Sigma Dos del 18-nov como escenario de Sigma Dos (PP 30,7 %, PSOE 26,7 %, Vox 19,7 %);
40dB día 7 ya está en el servidor de El País pero cuenta cuando salga publicado (19-nov). GAD3 y CIS sin novedades. Paso 1
sin posiciones nuevas. Registro 342 → 348: 7 entradas nuevas con revisión independiente (BNG 2, PNV 1, Ara Més y Frente
Amplio 1 compartida, PP 1, Frente Amplio 1; 5 rechazadas) y se retira la Ley del Suelo del PSOE para aplicarle el mismo
listón que a la del PNV (decisión del coordinador, revisable). BOE sin correcciones ni resoluciones de recursos (volver a
mirar el 19 y el 20-nov: el plazo del art. 44.4 LOREG acaba el 19); dominio y HTTPS correctos.

**Hecho el 16-nov** (estudio Neutral frente a Saltar; decisiones del editor): «Saltar» pasa a «No lo sé», a
todo lo ancho bajo la escala; «Neutral» sigue contando. «Coincidís» solo si estáis del mismo lado (un Neutral es
«A medias»), aviso si la mayoría de respuestas son Neutral, y los grupos del resultado hablan de «temas en común»
con tus respuestas. Se mantiene la regla de cobertura por persona. Los partidos nunca se codifican como Neutral:
una postura ambigua sigue siendo «sin posición conocida».

## C. Después del 29-N

- [ ] **8. [Yo] Congelar la web** con un aviso de «elección celebrada» y borrar la tarea programada.
- [ ] **9. [Yo] Opcional: comparar las probabilidades del paso 3 con el resultado real** y publicar el
  balance.
- [ ] **10. [Yo] Antes de que caduque votacondatos.org (nov-2027, renovación automática desactivada):
  quitar el dominio de GitHub Pages** para que la web vuelva a github.io.

## Lo que espera de ti

| # | Qué | Cuándo |
|---|---|---|
| — | (Opcional) Alta en Google Search Console para que Google rastree antes la web y su icono | Cuando quieras |
| 7 | (Opcional) 2FA en Porkbun | Cuando quieras |
