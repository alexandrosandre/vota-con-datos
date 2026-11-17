# Checklist · vota con datos (29-N)

Actualizado: 17-nov-2026. Solo lo pendiente; lo terminado está en el historial de git. La web ya está
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
  - [ ] Podemos, Junts, NC-BC (UPC), UPN — sin programa el 17-nov a las 10:00.
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
- [ ] **4. [Externo → Yo] Listas del BOE tras los recursos** ante el TS (art. 44.4 LOREG, 13–19-nov):
  volver a descargar y validar el BOE después. Pendiente de confirmar oficialmente el recurso de Drago
  Canarias contra UPC (solo hay prensa).
- [ ] **5. [Externo → Yo] Encuestas nuevas** publicadas antes del 24-nov, desde su publicación original.
  La veda (24-nov 00:00 → 29-nov 20:00) ya está automatizada en GitHub Actions.
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
