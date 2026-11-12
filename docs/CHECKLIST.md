# Checklist · vota con datos (29-N)

Actualizado: 9-nov-2026 (noche). La web ya está en línea; aquí «bloquea» significa **no difundirla ni
anunciarla** (o, si ya circula, que deja de ser correcta o legal) hasta que esté hecho.

**Quién lo desbloquea**
* **[Tú]** — necesita una acción o decisión tuya; no avanza sin ti.
* **[Yo → Tú]** — lo preparo yo y al final eliges o apruebas tú.
* **[Yo]** — lo hago yo (o la actualización automática); no te necesita.
* **[Externo]** — depende de terceros (partidos, BOE, encuestadoras); en cuanto ocurre, lo proceso yo.

## A. Bloquea la difusión — en este orden

- [ ] **1. [Tú] Sacar el proyecto de la carpeta temporal de la sesión** a una carpeta permanente del
  Mac. Lo muevo yo, pero tienes que aprobar la carpeta. Si se borra la sesión se pierde el checkout
  local que usa la actualización automática (GitHub conserva el código y los datos).
- [ ] **2. [Tú] Hacer duradera la actualización automática.** Hoy es una tarea de esta sesión (hacia
  las 9:15 y las 20:15): muere si se cierra la app o la sesión y caduca a los 7 días (se renueva sola
  si sigue viva). Comprobado el 9-nov: tus rutinas solo tienen entornos para otros
  repositorios; para una rutina persistente de «vota con datos» hace falta que crees un entorno
  (bridge en tu Mac) para este repositorio, mejor tras el punto 1. Con el entorno creado, la rutina la
  configuro yo. Lo mecánico (veda de encuestas, validaciones) ya corre en GitHub Actions sin depender
  de nadie.
- [x] **3. [Yo → Tú] 3–5 diseños alternativos, refinados y pulidos, para que elijas uno.** Mismo
  contenido y misma marca de base (nombre, lema, tres pasos), con direcciones visuales distintas:
  - un color principal fuerte y saturado, como las webs de los partidos, pero que no se identifique
    con ninguno (fuera de rojo PSOE, azul PP, verde Vox, morado Podemos, etc.);
  - inspirado en el lenguaje visual de las webs de campaña de los partidos (héroe grande, llamadas a
    la acción claras, tipografía rotunda), sin parecerse a ninguna en concreto;
  - moderno y «de datos»: visualización protagonista, rejilla, contraste, la idea de comparar y
    contrastar como motivo gráfico;
  - y 1–2 propuestas más (p. ej. editorial de prensa / institucional cívica).

  Cada uno navegable con las tres fases reales, en claro y oscuro, móvil y escritorio, y con contraste
  AA. Eliges tú; aplico el elegido antes de difundir.
  Listos (9-nov): galería en https://votacondatos.org/#/disenos — Cívico (actual),
  Color fuerte, Campaña, Datos y Editorial, con valoración en docs/research/disenos.md. **Elegido (9-nov): **Campaña,
  solo en modo oscuro**, aplicado con su último pulido y la marca adaptada. Lema elegido apartado por
  apartado: **«Elige · Contrasta · Suma»** (9-nov).
- [ ] **4. [Externo → Yo] Programas de los partidos estatales.** Cuando salgan: lectura completa,
  evaluación, revisión independiente, auditoría de coherencia y recodificación del paso 1.
  - [x] PNV — publicado el 9-nov (43 págs.): analizado, revisado (39 correcciones) y publicado; 0/30 en el paso 1
  - [x] PP — publicado el 10-nov (82 págs.): analizado, revisado (63 correcciones) y publicado el 12-nov; 15/30 en el paso 1
  - [x] SALF — «contrato electoral» del 10-nov (40 págs.): analizado, revisado (93 correcciones) y publicado el 12-nov; 16/30 en el paso 1
  - [x] Auditoría de coherencia entre los seis programas analizados (12-nov): 3 valoraciones igualadas (PP, SALF, BNG) y rúbrica de financiación precisada; informe en data/fase3/coherencia_2026-11-12.md
  - [ ] Vox — la prensa dice que lo presentó el 12-nov (copia enlazada por un medio), pero a las 17:00 no estaba en voxespana.es («Programa electoral de VOX» da «Página no encontrada»). Solo se usará desde la web oficial
  - [ ] PSOE — presenta su programa el 15-nov (según la búsqueda de líderes del 12-nov); recodificar el paso 1 ese día
  - [ ] PSC, Frente Amplio, Podemos — sin fecha conocida (a 12-nov no publicado)
  - [ ] Junts, EH Bildu, Compromís, UPC, Ara Més-FA, UPN-PP, Adelante Andalucía — sin fecha conocida
- [ ] **4b. [Yo] Paso 2 sin programa (12-nov, a petición tuya):** los partidos que no publiquen programa (o
  lo hagan tarde) se analizan con los compromisos públicos de sus líderes, con el mismo método y revisión
  (protocolo `docs/prompts/1b_seleccion_compromisos.md`). Tanda 1 en curso: PSOE, Vox, Frente Amplio,
  Podemos, Junts, EH Bildu. Tanda 2: PSC, Compromís, UPN-PP, Ara Més-FA, UPC. Después, revisión
  independiente y auditoría de coherencia con los programas ya analizados.
  12-nov noche: publicados con revisión independiente FA, Vox, Junts, EH Bildu, Podemos, PSOE, PSC y UPN-PP;
  pendientes Compromís, Ara Més-FA y UPC, y la auditoría de coherencia entre todos (incl. recuento de «veces» de Vox).
- [ ] **5. [Yo] Quitar la etiqueta «versión provisional» del paso 1** (9-nov: protocolo v2 con
  propuestas públicas en primera persona de líderes nacionales y regionales, incl. precampaña; 75 posiciones) solo cuando PP, PSOE, Vox,
  Frente Amplio y Podemos tengan posición documentada en al menos la mitad de las 30 afirmaciones
  (12-nov, tras la búsqueda de líderes y la auditoría de igual estándar: PP 15, Vox 10, Podemos 8, FA 5, PSOE 3; el PSOE presenta programa el 15-nov). Mientras no, el paso 1 no debe ser lo que se promocione.
- [x] **6. [Yo] Paso 3: decir a quién elige tu voto y qué hay dentro de cada papeleta.**
  - Composición de las coaliciones explicada en lenguaje claro: p. ej. en Alicante la papeleta
    «Compromís: Front Valencià» (COMPROMIS-EUPV-PODEM-ERPV) incluye a Podemos y a Esquerra Unida, algo
    que no es evidente para el electorado. Igual con UPC en Canarias (NC-BC, Podemos, IU, Sumar),
    UPN-PP en Navarra, las marcas de Frente Amplio, PSC/PSOE, etc.
  - Junto a la probabilidad de escaño, **quién lo ocuparía**: el candidato o candidata que está en el
    puesto de la lista que entraría (el 1.º para el primer escaño, el n.º para el n-ésimo), con nombre
    (de las listas proclamadas del BOE), partido de afiliación dentro de la coalición y enlace a su
    página de Wikipedia o a una página oficial del partido. Si la afiliación no consta en una fuente
    fiable, se dice («afiliación no publicada»), sin suponerla.
  - Hecho en parte (9-nov): listas completas del BOE extraídas y validadas (3.820 titulares),
    composición oficial de las coaliciones (pactos JEC/JEP) y nombres de quien ocuparía cada escaño,
    ya publicados. Afiliación y enlaces de las 747 personas en puestos relevantes publicados (9-nov):
    229 enlaces verificados (211 Wikipedia, 18 fichas del Congreso comprobadas automáticamente) y
    afiliación con fuente en coaliciones; homónimos descartados. Sin
    documento oficial: vínculo PSdeG/PSIB/PSN/PSC/PSE con el PSOE, Teruel Existe, PANCAL-URCI, NEX.
- [x] **6b. [Yo] Auditoría de redacción del cuestionario** (9-nov, a raíz de q05): 25 afirmaciones
  reformuladas con la propuesta real completa (dirección, umbrales, a quién afecta), contexto verificado
  en fuentes oficiales, q15 y q29 actualizadas a 2026, posiciones recodificadas y verificadas.
- [ ] **6c. [Yo → Tú] Revisar la selección de afirmaciones** cuando publiquen PP, PSOE, Vox y Frente Amplio:
  se eligieron con solo 3 programas y hoy dejan a algunos partidos sin posición en ningún tema (PNV 0/30
  con su programa ya publicado, porque propone medidas distintas). Proponer qué afirmaciones sustituir
  por reservas o por propuestas de los nuevos programas para cubrir a todos; lo decides tú.
- [ ] **7. [Tú] Revisar tú una muestra antes de anunciar** (con el diseño ya elegido): 2–3 propuestas
  por partido analizado en el paso 2 (cita, valoración y fuentes) y una pasada completa por el
  cuestionario del paso 1 buscando redacciones que no sean neutrales. La web sale bajo tu nombre.
- [ ] **8. [Externo → Yo] Listas del BOE tras los recursos.** Recursos de amparo ante el TC hasta
  ≈12-nov y ante el TS (art. 44.4 LOREG) del 13 al 19-nov: vuelvo a descargar y validar el BOE después
  de cada fecha. Pendiente de confirmar oficialmente: el recurso de Drago Canarias contra UPC (solo hay
  prensa).
- [x] **9. [Yo] ⚠️ 24-nov 00:00 — retirar los escenarios de encuestas del paso 3 hasta el 29-nov.** El
  art. 69.7 de la LOREG prohíbe publicar, difundir o reproducir sondeos los cinco días anteriores a la
  votación, y la web reproduce estimaciones de encuestas. Queda solo el escenario de resultados de 2023
  con un aviso. Hecho (9-nov): filtro por fecha en el build y en el navegador, y despliegues
  programados en GitHub Actions el 23-nov 22:05 y el 29-nov 20:10; probado con fechas simuladas.

## B. No bloquea — mejoras y mantenimiento, por prioridad

- [x] **10. [Externo → Yo] Macroencuesta preelectoral del CIS (estudio 3584)** — añadida el 12-nov (campo 7–30 oct, n = 45.074) como «cis-2026-11»; da horquillas de escaños por provincia pero no voto provincial, así que se proyecta igual que las demás (ver METODOLOGIA.md). cuando se publique
  (antes del 24-nov): sustituye al barómetro de octubre, cuyo trabajo de campo fue anterior a la
  convocatoria.
- [ ] **11. [Externo → Yo] Encuestas nuevas de Sigma Dos, GAD3 y 40dB** publicadas antes del 24-nov.
  Al día el 9-nov: Sigma Dos 8-nov, GAD3 9-nov y 40dB 9-nov (la revisión programada sigue buscando).
- [x] **11b. [Yo] Paso 3 más claro (12-nov, a petición tuya):** escenario por defecto = media propia de
  encuestas (la última de cada empresa en 21 días, en su publicación original; descartada la de El
  Autómata por hacerla una IA a partir de Wikipedia, sin método ni licencia); sin selector de
  incertidumbre ni jerga («swing»); orden de preferencia visible, con su origen (paso 1 o manual) y
  cómo cambiarlo, y la sugerencia explica de dónde sale; logotipos y fotos de Wikimedia Commons con
  licencia libre, servidos desde la web, con página de créditos.
- [x] **11c. [Yo] Ampliar la media con más empresas** — 12-nov: 14 empresas en la media (CIS incluido); SW Demoscopia y SocioMétrica fuera de la media por no tener publicación original verificable o fechas de campo. (NC Report, DYM, Opina 360, Target Point,
  Hamalgama, Simple Lógica, Cluster17, Ipsos…), siempre desde su publicación original.
- [x] **11d. [Yo] Adelante Andalucía en los escenarios de encuesta** — 12-nov: perfil provincial de las autonómicas andaluzas del 17-may-2026 (BOJA 108); 3 escaños en la media, dentro de las horquillas del CIS.: hoy no se proyecta (en 2023 solo se presentó en Cádiz; sin perfil provincial), aunque el CIS le da 1–2 escaños en Cádiz, Málaga y Sevilla. Buscar una base provincial defendible (p. ej. autonómicas andaluzas) y documentarla.
- [x] **11e. [Tú → Yo] Recuento anónimo de visitas (GoatCounter)** — activo desde el 12-nov (votacondatos.goatcounter.com) — implementado y desactivado hasta tener
  cuenta: sin cookies, ruta sin parámetros, evento nuevo/recurrente según si el navegador ya tenía el
  estado guardado, respeta «No rastrear» y GPC; página #/privacidad. Falta que crees la cuenta gratuita
  (uso sin ánimo de lucro) en goatcounter.com y me digas el código; lo activo en `web/src/analitica.ts`.
- [ ] **12. [Yo] Compromisos de campaña desde el 13-nov** (inicio de campaña), sobre todo para EH
  Bildu, PNV, PSC, UPN-PP y Adelante Andalucía, que hoy tienen cero posiciones en el paso 1.
- [x] **13. [Yo] Resolver las dudas abiertas de los revisores** (detalle en
  `data/programas/*/revision.json` y `data/fase3/auditoria_coherencia.md`): cifras de AIReF citadas a
  través de prensa en ERC (airef.es no fue accesible para ese revisor), STC 31/2010 citada vía El Salto,
  datos de Interior vía Europa Press, evidencia de bng-12 apoyada en un solo estudio.
  Hecho (9-nov): AIReF, STC 31/2010 (BOE), anuario de Interior y estudios revisados por pares sustituyen a
  la prensa; corrigieron cifras de erc-02, erc-01, erc-05 y bng-11. Quedan erc-08 (web de la Generalitat
  bloquea lectores automáticos), cc-02, cc-09 y algunas fuentes de prensa menores.
- [x] **14. [Yo] Calibrar la incertidumbre del paso 3 con datos históricos** (error de encuestas y
  cambios entre elecciones por provincia) en lugar de los parámetros razonados actuales (k = 0,04 /
  0,05). Hecho (9-nov): k = 0,08 con encuestas y 0,15 con la base de 2023, calibrado con 2015–2023;
  el modelo anterior era demasiado confiado (lo «improbable» salía el 40 % de las veces en 2023).
- [x] **15. [Yo] Candidaturas «sin base» en el paso 3** (SALF en el escenario 2023, Alhora, Drago,
  NEX, Adelante Andalucía fuera de Cádiz…): valorar un perfil de las europeas 2024 u otra referencia
  documentada. Hecho en parte (9-nov): la web ofrece con un clic los escenarios que sí la estiman (p. ej.
  SALF → CIS, GAD3, 40dB); se descarta usar las europeas como «resultado de 2023» porque mezclaría
  elecciones con participación muy distinta. Las que ningún escenario estima lo dicen explícitamente.
- [x] **16. [Yo] Tests del pipeline** (mapeo candidaturas → partidos, escenarios por encuesta) y
  pruebas de extremo a extremo de la web. Hecho (9-nov): 10 tests de invariantes en CI
  (D'Hondt, reproducción de 2023, cuotas, reparto de Sumar, veda, citas) y prueba de humo de extremo a
  extremo con Chrome sin interfaz en cada despliegue.
- [x] **17. [Yo] Auditoría de accesibilidad** (lector de pantalla, teclado, contraste en modo oscuro).
  Hecho (9-nov): WCAG 2.2 AA, axe-core sin incidencias en todas las rutas a 1280 y 320 px; detalle en
  docs/research/accesibilidad.md. Pendiente: prueba con lectores de pantalla reales.
- [x] **18. Dominio propio: votacondatos.org** — comprado en Porkbun el 9-nov (7,98 USD, caduca el
  9-11-2027, **renovación automática desactivada**, privacidad WHOIS activa). DNS con los registros de
  GitHub Pages (4 A, 4 AAAA, CNAME www), dominio activado en Pages con HTTPS obligatorio; github.io y
  www redirigen a https://votacondatos.org. Pendiente opcional [Tú]: verificar el dominio en GitHub
  (Settings → Pages) y activar la verificación en dos pasos en Porkbun.
- [ ] **19. [Tú] Revisión de posiciones por los propios partidos** (práctica recomendada en la
  literatura de estos cuestionarios): solo si decides contactar con ellos.
- [x] **20. [Yo] Avisos menores**: el runner `ubuntu-latest` de GitHub Actions migra a Ubuntu 26
  (revisar que el despliegue sigue en verde). Hecho (9-nov): fijado `ubuntu-24.04` hasta después del 29-N.

## C. Después del 29-N

- [ ] **21. [Yo] Antes de que caduque votacondatos.org (nov-2027): quitar el dominio de GitHub Pages**
  para que la web vuelva a github.io y no apunte a un dominio caducado.
- [ ] **21b. [Yo] Congelar la web** con un aviso de «elección celebrada» y borrar la tarea programada.
- [ ] **22. [Yo] Opcional: comparar las probabilidades del paso 3 con el resultado real** y publicar el
  balance (calibración honesta del modelo).

## Resumen: lo que espera de ti

| # | Qué | Cuándo |
|---|---|---|
| 1 | Aprobar la carpeta permanente del proyecto | Cuanto antes |
| 2 | Crear el entorno de rutinas (bridge) para este repositorio | Tras el punto 1 |
| 7 | Revisar una muestra de contenidos | Antes de anunciar la web |
| 18 | (Opcional) verificar el dominio en GitHub y activar 2FA en Porkbun | Cuando quieras |
| 19 | Decidir si contactar con los partidos (opcional) | Cuando quieras |
