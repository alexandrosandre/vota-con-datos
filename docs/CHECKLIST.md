# Checklist · vota con datos (29-N)

Actualizado: 14-nov-2026. Solo lo pendiente; lo terminado está en el historial de git. La web ya está
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
  - [ ] PSOE — presenta su programa el 15-nov.
  - [x] Vox — **publicado el 12-nov** (PDF en votasentidocomun.es, la web de campaña enlazada desde
    voxespana.es). Hecho el 13-nov: 12 propuestas del programa + 2 de complemento (revisión independiente
    aprobada, 91 correcciones), auditoría de coherencia (`data/fase3/coherencia_2026-11-13.md`: 26 cambios de
    texto en pp, salf, junts y vox, ninguna valoración cambia) y paso 1 recodificado (g6: Vox 23→25 posiciones).
    Abierto, sin efecto en valoraciones: IVA del 4 % italiano para la primera vivienda (salf-01, vox-09) sin
    fuente oficial; motivo de «no_verificable» en la financiación de pp-02.
  - [ ] PSC, Frente Amplio, Podemos, Junts, EH Bildu, Compromís, NC-BC, Ara Més, UPN — sin fecha.
- [ ] **3. [Yo] Revisar la selección de afirmaciones del paso 1** para cubrir mejor a los 18 partidos:
  análisis, codificación y verificación independiente; decido yo, sin pasar por ti. **Hecha el 13-nov**
  (`data/fase1/revision_afirmaciones_2026-11-13/integracion.md`): se retiran q02, q07, q10, q14 y q28, entran
  q31–q35 y la media sube de 6,6 a 7,7 posiciones por partido. **Repetir tras el programa del PSOE (15-nov).**
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

**Hecho el 13-nov por la tarde** (revisión del cambio partidos/papeletas, commit 1299bb2): el PNV aparece
en Navarra dentro de Geroa Bai; la afinidad del paso 3 se recalcula (salía «1 %»); documentos conjuntos de
una coalición cuentan para cada firmante y el PSC cuenta a Sánchez (decisiones del editor); vista previa al
compartir en redes con nombre del sitio e icono PNG.

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
