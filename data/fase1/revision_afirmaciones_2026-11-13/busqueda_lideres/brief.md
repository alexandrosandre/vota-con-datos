# Brief: codificar posiciones de líderes sobre afirmaciones candidatas (vota con datos, 29-N-2026)

Repo (REPO): /Users/alexandrosandre/Library/Application Support/Claude/scratch-workspaces/e41a6fd7-c4db-436b-bca8-0e7cf1c36c79/13147fc3-ad47-40db-98c8-2488b01f5542/scratch-2026-11-08-a9263a/vota-con-datos
Hoy: 13-nov-2026 (la campaña oficial empezó hoy; convocatoria 6-oct-2026; elecciones 29-nov-2026).

Estamos proponiendo nuevas afirmaciones para el cuestionario (paso 1). Tu trabajo: para tus partidos, encontrar
declaraciones PÚBLICAS EN PRIMERA PERSONA de sus líderes (o documentos oficiales del partido para estas elecciones)
sobre cada afirmación candidata, y codificarlas. Un verificador independiente revisará después cada cita contra su
fuente: cualquier cita que no aparezca LITERALMENTE en la copia local invalida la posición.

## Reglas (no negociables) — léelas antes en el repo
- REPO/docs/prompts/2_codificacion_posiciones.md (protocolo v2) y REPO/data/fase1/auditoria_estandar_2026-11-12.md (reglas a y b).
- Líder = candidato a la presidencia, cabezas de lista, secretario/a general o presidente/a, portavoces nacionales o
  regionales, líderes autonómicos, ministros que son candidatos. Documento oficial del partido (nota de prensa en su web,
  manifiesto) vale con quien = el partido.
- Primera persona: palabras del líder ENTRE COMILLAS en la fuente (o vídeo/transcripción oficial). El estilo indirecto del
  periodista («ha defendido que…») NO vale. Vale una cita parcial si lo entrecomillado contiene la posición y el medio
  nombra la medida; no vale si lo entrecomillado es solo la justificación.
- Fecha: desde el 6-oct-2026 vale siempre. Antes, solo si la declaración se refiere expresamente a estas elecciones o a
  la próxima legislatura (anótalo en «marco» con esas palabras).
- Nunca: votaciones parlamentarias (el voto no es fuente; un DISCURSO de un portavoz en un debate sí lo es), posiciones de
  otras legislaturas, ideología supuesta, «fuentes del partido», columnas de opinión, webs agregadoras tipo
  «afinidadpolitica».
- Valores: 2 muy a favor · 1 a favor · 0 neutral explícito · -1 en contra · -2 muy en contra · null sin posición.
  ±2 solo si se propone o rechaza de forma expresa y prioritaria; ±1 con matices, condiciones o si es reactiva (critica la
  propuesta de un rival sin proponer nada propio). Una medida relacionada pero distinta NO es una posición. Ante la duda
  entre un valor y null: null.
- No inventes ni completes citas. Copia la cita carácter a carácter de la copia local guardada (≤ 60 palabras).
- Fuentes: primero las copias locales ya guardadas en REPO/data/sources/compromisos/<partido>/*.txt (grep) y
  REPO/data/programas/<partido>/compromisos/seleccion.json (incluye «descartados»). Después búsqueda web (WebSearch /
  WebFetch; carga sus esquemas con ToolSearch "select:WebSearch,WebFetch"). Peticiones normales; si una web bloquea
  (403, desafío anti-bots), NO intentes sortearlo: usa otra copia fiable (web del partido, agencia EFE/Europa Press en
  infobae, etc.).
- Cada fuente web NUEVA que uses: guarda una copia de texto en
  REPO/data/sources/fase1/revision_2026-11-13/<partido>/<aaaammdd>_<medio>_<tema>.txt con cabecera exacta:
  `URL: <url>` / `Medio: <medio>` / `Descargado: 2026-11-13 (petición HTTP normal; texto extraído del HTML)` / `----`
  y después el texto de la página (al menos el artículo completo). Calcula su sha256 (shasum -a 256). La cita debe
  aparecer literalmente en ese fichero (comprueba con grep -F de un fragmento). Si usas una copia ya existente en
  data/sources/compromisos, indica su ruta y su sha256.
- No edites ningún fichero existente del repo. Escribe solo los ficheros nuevos de fuentes y tu fichero de resultados.

## Afirmaciones candidatas (codifica TODAS para cada uno de tus partidos)
- q31 (Energía y clima): «Mantener abiertas las centrales nucleares más allá del calendario de cierre aprobado, que las apaga entre 2027 y 2035.»
  (Ojo: «derogar el calendario de cierre», «alargar la vida de Almaraz» = a favor; «cumplir el calendario de cierre» = en contra.)
- q32 (Empleo y salarios): «Que cada comunidad autónoma pueda fijar su propio salario mínimo, por encima del estatal.»
- q33 (Vivienda): «Que los contratos de alquiler de vivienda habitual se renueven automáticamente por periodos de cinco años si el inquilino quiere seguir.»
  (Contexto: el Gobierno aprobó el 6-oct-2026 dos decretos-ley de vivienda; el de la prórroga automática de 5 años (7 si
  el casero es empresa), con indemnización de 12 mensualidades si el propietario no renueva, lo defendió el ministro
  Bustinduy y NO fue convalidado por la Diputación Permanente el 12-nov-2026; el otro decreto (antidesahucios hasta 2030,
  prórroga de 2 años de contratos que venzan antes de 2029, topes de actualización) SÍ se convalidó. Distingue bien de
  qué decreto habla cada declaración: apoyar el decreto antidesahucios NO es apoyar la prórroga quinquenal. «Contratos de
  alquiler indefinidos» = a favor (+2).)
- q34 (Inmigración): «Que sea obligatorio repartir entre todas las comunidades autónomas a los menores migrantes que llegan solos cuando una comunidad supera su capacidad de acogida.»
- q35 (Exterior y defensa): «Que España apoye un referéndum de autodeterminación para el Sáhara Occidental, en lugar del plan de autonomía dentro de Marruecos.»
  («Revertir/retirar la carta de Sánchez de 2022» = a favor.)
- q36 (Instituciones): «Que los propios jueces elijan a los doce miembros del Consejo General del Poder Judicial que proceden de la carrera judicial, en lugar del Congreso y el Senado.»
- q37 (Seguridad y justicia): «Suprimir la prisión permanente revisable.»
  (Proponer AMPLIARLA = -2; rechazarla/derogarla = +2.)
- x1 (Exterior/territorial): «Que el catalán, el euskera y el gallego sean lenguas oficiales de la Unión Europea.»
- x2 (Inmigración/territorial): «Traspasar a las comunidades autónomas que lo pidan las competencias de inmigración, como los permisos de residencia y trabajo.»
- x3 (Vivienda): «Limitar la compra de vivienda a las personas que no residen en España, salvo que vayan a vivir en ella.»
- x4 (Pensiones): «Permitir jubilarse sin recorte en la pensión a quien haya cotizado 40 años, sea cual sea su edad.»

Además, si al buscar encuentras de paso una declaración válida de tus partidos sobre una afirmación EXISTENTE
(REPO/data/fase1/preguntas.json) para la que el partido hoy no tiene posición (REPO/data/fase1/fase1.json →
posiciones[partido][qid].valor == null), anótala en «existentes» con el mismo formato. No hace falta buscarlas de forma
sistemática.

## Salida
Escribe UN fichero JSON en la ruta que se te indica, con esta forma:
{
 "grupo": "<nombre>", "fecha": "2026-11-13",
 "busqueda": {"<partido>": "qué buscaste, dónde, qué líderes, límites (webs bloqueadas, cupo de búsqueda)"},
 "posiciones": {"<partido>": {"q31": {"valor": 2, "fuente": "campaña", "cita": "...", "pagina": null, "url": "...",
     "medio": "...", "fecha": "2026-11-05", "quien": "Nombre, cargo", "formato": "mitin|entrevista|nota oficial|debate|...",
     "marco": null, "nota": "razonamiento breve: por qué ese valor (y no ±2/±1), qué decreto/medida exactamente",
     "fuente_local": "data/sources/fase1/revision_2026-11-13/<partido>/<fichero>.txt", "sha256": "..."},
   "q32": {"valor": null, "nota": "qué se buscó y por qué no hay posición (o por qué se descartó un candidato)"}, ...}},
 "existentes": {"<partido>": {"qNN": {...mismo formato...}}},
 "descartados": [{"partido": "...", "q": "...", "url": "...", "motivo": "..."}]
}
Incluye las 11 claves (q31–q37, x1–x4) para CADA partido tuyo, con valor o null. Sé exigente: es mejor null que una
posición discutible. Al terminar, responde con un resumen breve (tabla partido × afirmación con valores) y la ruta del
fichero.
