# Checklist · vota con datos (29-N)

Actualizado: 9-nov-2026. La web ya está en línea; aquí «bloquea» significa **no difundirla ni
anunciarla** (o, si ya circula, que deja de ser correcta o legal) hasta que esté hecho.

## A. Bloquea la difusión — en este orden

- [ ] **1. Sacar el proyecto de la carpeta temporal de la sesión** a una carpeta permanente del Mac.
  Si se borra la sesión se pierde el checkout local que usa la actualización automática (GitHub
  conserva el código y los datos).
- [ ] **2. Hacer duradera la actualización automática.** Hoy es una tarea de esta sesión (hacia
  las 9:15 y las 20:15): muere si se cierra la app o la sesión y caduca a los 7 días (se renueva sola si sigue
  viva). Comprobar la primera ejecución (9-nov, mañana) y valorar pasarla a una rutina persistente.
- [ ] **3. Programas de los partidos estatales** — analizar (lectura completa + evaluación +
  revisión independiente + auditoría de coherencia) y recodificar el paso 1 en cuanto salgan:
  - [ ] PNV — presentación anunciada 9-nov 16:00
  - [ ] PP — 10-nov según prensa (Europa Press, 7-nov)
  - [ ] PSOE / PSC, Vox, Frente Amplio, Podemos, SALF — sin fecha conocida
  - [ ] Junts, EH Bildu, Compromís, UPC, Ara Més-FA, UPN-PP, Adelante Andalucía — sin fecha conocida
- [ ] **4. Quitar la etiqueta «versión provisional» del paso 1** solo cuando PP, PSOE, Vox, Frente
  Amplio y Podemos tengan posición documentada en al menos la mitad de las 30 afirmaciones (hoy:
  PP 8, Vox 7, Podemos 7, FA 3, PSOE 2). Mientras no, el paso 1 no debe ser lo que se promocione.
- [ ] **5. Revisión humana tuya de una muestra** antes de anunciar: 2–3 propuestas por partido
  analizado en el paso 2 (cita, valoración y fuentes) y una pasada completa por el cuestionario del
  paso 1 buscando redacciones que no sean neutrales. La web sale bajo tu nombre.
- [ ] **6. Listas del BOE tras los recursos.** Recursos de amparo ante el TC hasta ≈12-nov y ante el
  TS (art. 44.4 LOREG) del 13 al 19-nov: volver a descargar y validar el BOE después de cada fecha
  (`pipeline/boe_fetch.py`, `boe_parse.py`, `boe_validate.py`). Pendiente de confirmar oficialmente:
  el recurso de Drago Canarias contra UPC (solo hay prensa).
- [ ] **7. ⚠️ 24-nov 00:00 — retirar los escenarios de encuestas del paso 3 hasta el 29-nov.** El art.
  69.7 de la LOREG prohíbe publicar, difundir o reproducir sondeos los cinco días anteriores a la
  votación, y la web reproduce estimaciones de encuestas. Dejar solo el escenario de resultados de
  2023 y un aviso. Conviene programarlo antes (por fecha en el código) para que no dependa de nadie.

## B. No bloquea — mejoras y mantenimiento, por prioridad

- [ ] **8. Macroencuesta preelectoral del CIS (estudio 3584)** cuando se publique (antes del 24-nov):
  sustituye al barómetro de octubre, cuyo trabajo de campo fue anterior a la convocatoria.
- [ ] **9. Encuestas nuevas de Sigma Dos, GAD3 y 40dB** publicadas antes del 24-nov.
- [ ] **10. Compromisos de campaña desde el 13-nov** (inicio de campaña), sobre todo para EH Bildu,
  PNV, PSC, UPN-PP y Adelante Andalucía, que hoy tienen cero posiciones en el paso 1.
- [ ] **11. Resolver las dudas abiertas de los revisores** (detalle en `data/programas/*/revision.json`
  y `data/fase3/auditoria_coherencia.md`): cifras de AIReF citadas a través de prensa en ERC (airef.es no
  fue accesible para ese revisor), STC 31/2010 citada vía El Salto, datos de Interior vía Europa Press,
  evidencia de bng-12 apoyada en un solo estudio.
- [ ] **12. Calibrar la incertidumbre del paso 3 con datos históricos** (error de encuestas y
  cambios entre elecciones por provincia) en lugar de los parámetros razonados actuales (k = 0,04 /
  0,05).
- [ ] **13. Candidaturas «sin base» en el paso 3** (SALF en el escenario 2023, Alhora, Drago, NEX,
  Adelante Andalucía fuera de Cádiz…): valorar un perfil de las europeas 2024 u otra referencia
  documentada.
- [ ] **14. Tests del pipeline** (mapeo candidaturas → partidos, escenarios por encuesta) y pruebas de
  extremo a extremo de la web.
- [ ] **15. Auditoría de accesibilidad** (lector de pantalla, teclado, contraste en modo oscuro).
- [ ] **16. Dominio propio** (p. ej. votacondatos.es): requiere tu compra; hoy funciona en el
  dominio gratuito de GitHub Pages.
- [ ] **17. Revisión de posiciones por los propios partidos** (práctica recomendada en la literatura
  de estos cuestionarios): solo si decides contactar con ellos.
- [ ] **18. Avisos menores**: el runner `ubuntu-latest` de GitHub Actions migra a Ubuntu 26
  (revisar que el despliegue sigue en verde).

## C. Después del 29-N

- [ ] **19.** Congelar la web con un aviso de «elección celebrada» y borrar la tarea programada.
- [ ] **20.** Opcional: comparar las probabilidades del paso 3 con el resultado real y publicar el
  balance (calibración honesta del modelo).
