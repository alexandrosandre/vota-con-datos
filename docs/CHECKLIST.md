# Checklist · vota con datos (29-N)

Actualizado: 9-nov-2026. La web ya está en línea; aquí «bloquea» significa **no difundirla ni
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
- [ ] **2. [Yo → Tú] Hacer duradera la actualización automática.** Hoy es una tarea de esta sesión
  (hacia las 9:15 y las 20:15): muere si se cierra la app o la sesión y caduca a los 7 días (se
  renueva sola si sigue viva). Compruebo yo la primera ejecución (9-nov); pasarla a una rutina
  persistente en tu Mac necesita que confirmes el entorno.
- [ ] **3. [Yo → Tú] 3–5 diseños alternativos, refinados y pulidos, para que elijas uno.** Mismo
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
- [ ] **4. [Externo → Yo] Programas de los partidos estatales.** Cuando salgan: lectura completa,
  evaluación, revisión independiente, auditoría de coherencia y recodificación del paso 1.
  - [ ] PNV — presentación anunciada 9-nov 16:00
  - [ ] PP — 10-nov según prensa (Europa Press, 7-nov)
  - [ ] PSOE / PSC, Vox, Frente Amplio, Podemos, SALF — sin fecha conocida
  - [ ] Junts, EH Bildu, Compromís, UPC, Ara Més-FA, UPN-PP, Adelante Andalucía — sin fecha conocida
- [ ] **5. [Yo] Quitar la etiqueta «versión provisional» del paso 1** solo cuando PP, PSOE, Vox,
  Frente Amplio y Podemos tengan posición documentada en al menos la mitad de las 30 afirmaciones
  (hoy: PP 8, Vox 7, Podemos 7, FA 3, PSOE 2). Mientras no, el paso 1 no debe ser lo que se promocione.
- [ ] **6. [Tú] Revisar tú una muestra antes de anunciar** (con el diseño ya elegido): 2–3 propuestas
  por partido analizado en el paso 2 (cita, valoración y fuentes) y una pasada completa por el
  cuestionario del paso 1 buscando redacciones que no sean neutrales. La web sale bajo tu nombre.
- [ ] **7. [Externo → Yo] Listas del BOE tras los recursos.** Recursos de amparo ante el TC hasta
  ≈12-nov y ante el TS (art. 44.4 LOREG) del 13 al 19-nov: vuelvo a descargar y validar el BOE después
  de cada fecha. Pendiente de confirmar oficialmente: el recurso de Drago Canarias contra UPC (solo hay
  prensa).
- [ ] **8. [Yo] ⚠️ 24-nov 00:00 — retirar los escenarios de encuestas del paso 3 hasta el 29-nov.** El
  art. 69.7 de la LOREG prohíbe publicar, difundir o reproducir sondeos los cinco días anteriores a la
  votación, y la web reproduce estimaciones de encuestas. Queda solo el escenario de resultados de 2023
  con un aviso. Lo programo por fecha en el código para que no dependa de nadie.

## B. No bloquea — mejoras y mantenimiento, por prioridad

- [ ] **9. [Externo → Yo] Macroencuesta preelectoral del CIS (estudio 3584)** cuando se publique
  (antes del 24-nov): sustituye al barómetro de octubre, cuyo trabajo de campo fue anterior a la
  convocatoria.
- [ ] **10. [Externo → Yo] Encuestas nuevas de Sigma Dos, GAD3 y 40dB** publicadas antes del 24-nov.
- [ ] **11. [Yo] Compromisos de campaña desde el 13-nov** (inicio de campaña), sobre todo para EH
  Bildu, PNV, PSC, UPN-PP y Adelante Andalucía, que hoy tienen cero posiciones en el paso 1.
- [ ] **12. [Yo] Resolver las dudas abiertas de los revisores** (detalle en
  `data/programas/*/revision.json` y `data/fase3/auditoria_coherencia.md`): cifras de AIReF citadas a
  través de prensa en ERC (airef.es no fue accesible para ese revisor), STC 31/2010 citada vía El Salto,
  datos de Interior vía Europa Press, evidencia de bng-12 apoyada en un solo estudio.
- [ ] **13. [Yo] Calibrar la incertidumbre del paso 3 con datos históricos** (error de encuestas y
  cambios entre elecciones por provincia) en lugar de los parámetros razonados actuales (k = 0,04 /
  0,05).
- [ ] **14. [Yo] Candidaturas «sin base» en el paso 3** (SALF en el escenario 2023, Alhora, Drago,
  NEX, Adelante Andalucía fuera de Cádiz…): valorar un perfil de las europeas 2024 u otra referencia
  documentada.
- [ ] **15. [Yo] Tests del pipeline** (mapeo candidaturas → partidos, escenarios por encuesta) y
  pruebas de extremo a extremo de la web.
- [ ] **16. [Yo] Auditoría de accesibilidad** (lector de pantalla, teclado, contraste en modo oscuro).
- [ ] **17. [Tú] Dominio propio** (p. ej. votacondatos.es): requiere que lo compres; hoy funciona en el
  dominio gratuito de GitHub Pages. Si lo compras, la configuración la hago yo.
- [ ] **18. [Tú] Revisión de posiciones por los propios partidos** (práctica recomendada en la
  literatura de estos cuestionarios): solo si decides contactar con ellos.
- [ ] **19. [Yo] Avisos menores**: el runner `ubuntu-latest` de GitHub Actions migra a Ubuntu 26
  (revisar que el despliegue sigue en verde).

## C. Después del 29-N

- [ ] **20. [Yo] Congelar la web** con un aviso de «elección celebrada» y borrar la tarea programada.
- [ ] **21. [Yo] Opcional: comparar las probabilidades del paso 3 con el resultado real** y publicar el
  balance (calibración honesta del modelo).

## Resumen: lo que espera de ti

| # | Qué | Cuándo |
|---|---|---|
| 1 | Aprobar la carpeta permanente del proyecto | Cuanto antes |
| 2 | Confirmar el entorno de la rutina persistente | Cuanto antes |
| 3 | Elegir uno de los 3–5 diseños | Cuando te los presente |
| 6 | Revisar una muestra de contenidos | Antes de anunciar la web |
| 17 | Comprar dominio (opcional) | Cuando quieras |
| 18 | Decidir si contactar con los partidos (opcional) | Cuando quieras |
