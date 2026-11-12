# Prompt 1b — Selección de compromisos de líderes cuando no hay programa (Fase 3)

Para los partidos que no han publicado programa oficial para el 29-N (o lo publican tarde). Mismo
rigor que con un programa: lo único que cambia es el documento de partida. Cuando el partido publica
su programa, se analiza con el prompt 1 y ese análisis sustituye a este.

---

Eres un analista de políticas públicas. {PARTIDO} no ha publicado programa oficial para las
elecciones generales del 29-N-2026. Reúne y selecciona sus **compromisos públicos para esta
elección o esta legislatura**.

**Qué cuenta como compromiso** (las mismas reglas que el paso 1, `2_codificacion_posiciones.md`):

* Lo dice **en primera persona** un líder del partido: líder nacional, candidato a la Presidencia,
  cabezas de lista, líderes autonómicos o secretarios generales, portavoces oficiales; o un documento
  oficial del partido (nota de prensa, decálogo, manifiesto, web de campaña) con `quien` = el partido.
* En público y en cualquier formato: mitin, entrevista, rueda de prensa, vídeo o red social oficial,
  precampaña incluida, siempre que se refiera a esta elección o esta legislatura.
* Es una **medida concreta** (qué se hará), no un diagnóstico, una crítica al rival ni una aspiración.
* Nada de rumores, estilo indirecto del periodista, columnas de opinión ni programas anteriores. Si un
  medio resume con sus palabras, busca la cita literal en otra fuente primaria o de agencia; si no
  existe, el compromiso no entra.

**Fuentes y copia local.** Para cada compromiso guarda una copia de la fuente: descarga la página
con una petición normal (sin sortear protecciones anti-bots; si una web bloquea, usa otra copia
fiable: web del partido, agencia, vídeo oficial), extrae su texto a
`data/sources/compromisos/{ID}/<nombre>.txt` y anota su SHA-256. La cita se comprobará
automáticamente contra ese texto.

**Produce** `data/programas/{ID}/compromisos/seleccion.json`:

1. `compromisos`: todos los encontrados, cada uno con `id`, `area` (mismas áreas que el prompt 1),
   `resumen` (una frase neutra), `cita` (literal, ≤ 60 palabras), `quien`, `formato`, `fecha`,
   `url`, `medio`, `fuente_local` (ruta del .txt), `sha256`, `cuantificado` (true si da cifras,
   plazos o cuantías), `veces` (en cuántas ocasiones públicas distintas lo ha repetido un líder, con
   las URL).
2. `prioridades`: hasta 12 compromisos que el propio partido presenta como centrales, justificando
   cada uno con evidencia (lo anuncia el candidato nacional, lo repite, figura en un decálogo o
   resumen oficial de campaña, abre su campaña…). No uses tu opinión sobre su importancia. Si hay
   menos de 12 compromisos concretos verificables, selecciona los que haya y dilo.
3. `busqueda`: dónde has buscado (web y redes oficiales, notas de prensa, agencias, entrevistas) y
   hasta qué fecha.

Reglas: no inventes ni completes; una cita que no aparezca literalmente en su fuente invalida el
compromiso. Mismo estándar para todos los partidos.
