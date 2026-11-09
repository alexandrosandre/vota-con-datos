# Marca · vota con datos

Guía visual en la web: página **Marca** (`#/marca`). Diseño de la web: tema **«Campaña»**, siempre en
oscuro (`web/public/temas/campana.css`, que es la fuente de verdad de colores y tipografía). Ficheros
de marca en `web/public/marca/`.

## Idea
Una herramienta cívica con la energía de una campaña y la neutralidad de un servicio público: negro,
tipografía rotunda, llamadas a la acción claras y tres colores que no pertenecen a ningún partido.
Deja que mande el contenido.

## Nombre y lema
* **vota con datos**, en minúsculas en el texto corrido. En el logotipo se compone en mayúsculas
  condensadas («VOTA CON DATOS») con *con* más suave, para que se lea «vota · datos».
* Lema: **Coincide. Contrasta. Cuenta.** Un verbo por paso, en imperativo: lo que hace la persona.
* Promesa: *Vota sabiendo a qué votas.*

## Símbolo
Urna de frente (cuadrado redondeado + ranura) llena de tres barras crecientes, una por paso y en su
color: el voto hecho de datos. Área de respeto: la altura de la ranura.

| Fichero | Uso |
|---|---|
| `simbolo.svg` | Símbolo sobre su cuadrado negro: se lee igual en fondos claros y oscuros |
| `simbolo-mono.svg` | Monocromo; tinta en claro y tinta clara en oscuro (`prefers-color-scheme`) |
| `logotipo.svg` | Horizontal; se adapta a claro/oscuro (barras en tono profundo o vivo) |
| `favicon.svg` | Cuadrado negro con urna blanca y barras vivas: legible en pestañas claras y oscuras |
| `apple-touch-icon.png` | 180×180, a sangre sobre negro |
| `og.svg` → `og.png` | Imagen para redes 1200×630, en oscuro |

`og.png` se renderiza con Chrome (Archivo cargada de Google Fonts) para que la tipografía sea la
real; `rsvg-convert` sin Archivo instalada sustituye la fuente y el titular se sale. Si cambian los
nombres de los pasos, hay que actualizar `og.svg` y volver a renderizar `og.png`.

## Color (oscuro, única paleta)
| Rol | Hex | Uso |
|---|---|---|
| Negro | `#000000` | Cabecera y héroe (`theme-color`) |
| Fondo | `#0E0E10` | Fondo de página |
| Superficie | `#151518` | Tarjetas |
| Banda | `#19191D` | Banda de cifras, pie |
| Tinta / Tinta 2 / Tinta 3 | `#F4F2EB` / `#CAC8C1` / `#A09E97` | Texto principal, secundario, terciario |
| 1 · Coincide (óxido) | banda `#A93F1C` · vivo `#FF9670` | |
| 2 · Contrasta (índigo) | banda `#3F3C9A` · vivo `#B1AEFF` | |
| 3 · Cuenta (verde datos) | banda `#0E6654` · vivo `#5CCFB4` | |
| Sólida / Matizable / Débil / No verificable | `#2FAE66` ✓ / `#F0B43C` ~ / `#FF6B5E` ✕ / `#8A8983` ? | Rellenos de gráfico, con símbolo oscuro |

Reglas de uso en oscuro:
* **Banda** (tono profundo) con texto blanco: paneles de la portada, cabecera de cada paso y enlace
  al siguiente paso. **Vivo** sobre negro: cifras, barras, botón principal (texto oscuro encima),
  acentos y palabras del lema.
* Los tres colores de paso aparecen juntos y en orden; nunca uno solo como color de marca.
* No se usan los colores de los partidos (rojo PSOE, azul PP, verde Vox, magenta Sumar, morado
  Podemos, amarillo ERC/CC, turquesa Junts, celeste BNG, naranja Cs/Compromís). En gráficos, los
  partidos se distinguen por nombre y posición, nunca por color.
* Las valoraciones llevan color **y** símbolo para leerse sin distinguir colores.
* Contraste (WCAG AA): tinta sobre fondo 17:1; blanco sobre las bandas 6,2:1 · 9:1 · 6,9:1; tonos
  vivos sobre negro ≥ 8,8:1; texto oscuro sobre los vivos ≥ 8,8:1; tinta 3 sobre superficie 6,8:1.

## Tipografía
* **Archivo** (Google Fonts, variable en anchura y peso), una sola familia:
  * Condensada (anchura 62–68 %), 800–900, en mayúsculas: titulares cortos, lema, cifras grandes.
  * Anchura normal, 400–700: texto, interfaz y tablas (cifras tabulares).
* Textos largos (metodología, análisis): minúsculas y sin condensar; las mayúsculas condensadas se
  reservan para titulares breves, botones y etiquetas.

## Movimiento
Los tres paneles de la portada suben al cargar, escalonados 1·2·3, y se elevan al pasar el ratón o
enfocarlos con el teclado. Solo `transform`/`opacity` (sin mover el diseño); con
`prefers-reduced-motion` se sustituye por un fundido.

## Voz
Clara (tuteo, frases cortas), sobria (sin adjetivos de valor), honesta (lo que no sabemos, lo
decimos) y respetuosa (no decimos a quién votar).
