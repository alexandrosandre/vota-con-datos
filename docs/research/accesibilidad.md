# Auditoría de accesibilidad (WCAG 2.2 AA) — noviembre 2026

Diseño «Campaña» (oscuro), en todas las rutas.

## Método

- axe-core 4.10.2 (WCAG 2.0–2.2 A/AA y buenas prácticas) en cada ruta, a 1280 y 320 px.
- Recorrido con teclado mediante scripts: orden de tabulación, foco visible y foco tras navegar.
- Revisión del árbol de accesibilidad, el contraste, el tamaño de objetivo, el reflujo (320 y 640 px) y el movimiento reducido.

## Corregido

**Graves**
- «Saltar al contenido» (`#main`) llevaba a la portada, porque el router usa el hash. Ahora enfoca el título.
- El desplegable «Incertidumbre» no tenía etiqueta.
- Cuestionario: al empezar, el foco se perdía; al responder, no se anunciaba la nueva afirmación. Ahora el foco va al texto de cada afirmación.
- La barra de progreso no tenía nombre ni valor legible. Ahora dice «Afirmación 3 de 30».
- Matriz 12×8: las casillas solo tenían color y `title`. Ahora llevan texto oculto con la valoración, `caption` y encabezados de fila y columna.
- Al cambiar de página, el foco quedaba en el enlace pulsado. Ahora pasa al `h1`.

**Moderados**
- El título de la pestaña ahora cambia en cada ruta.
- Faltaban `aria-current` (menú), `aria-pressed` (partidos afines) y `aria-expanded` («Ver en qué coincidís»).
- Los botones «Subir» y «Bajar» no nombraban el partido.
- Había saltos de encabezado (h1→h3, h2→h4). Se corrigen sin cambiar el aspecto.
- Los bordes de los controles tenían un contraste de 2,1:1. `--line-2` pasa a `#6b6b73` (≥ 3,3:1).
- Los enlaces a fuentes medían menos de 24 px.
- Reflujo a 320 px: los resultados y Metodología se desbordaban, y los pasos de la cabecera se solapaban.
- La tabla de candidaturas, desplazable, ahora se alcanza con el teclado.
- La marca de agua «29N» se leía en voz alta. Ahora tiene texto alternativo vacío.
- El gráfico de reparto se anunciaba como imagen sin datos. Ahora se oculta: el texto contiguo da las cifras.

**Leves**
- El desplazamiento suave respeta `prefers-reduced-motion`.
- `scroll-padding-top` evita que el foco quede bajo la cabecera.
- El índice de Metodología y la matriz mueven el foco a su destino.
- Las citas en catalán o gallego llevan `lang`.

## Resultado

axe no detecta infracciones en ninguna ruta, ni a 1280 ni a 320 px. Solo las tablas de datos se desplazan en horizontal. El foco es siempre visible. `tsc`, `npm test` y `tests/smoke.sh` pasan.

## Pendiente

- Probar con lectores de pantalla reales (VoiceOver, NVDA y TalkBack).
- En el paso 3, el nuevo resultado no se anuncia al cambiar provincia o partido (falta `aria-live`).
- Los enlaces externos se abren en otra pestaña sin aviso (no es requisito AA).
- A 320 px, «Contrasta» se abrevia y el menú se desplaza en horizontal, como en el diseño original.
- El idioma de las citas se deduce del partido. Falta un campo de idioma en los datos, y las citas del paso 1 no llevan `lang`.
- No se han auditado `#/disenos` ni los temas alternativos.
