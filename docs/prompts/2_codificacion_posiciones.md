# Prompt 2 — Codificación de posiciones (paso 1 · Elige)

Protocolo: un **codificador** asigna cada posición con su fuente; un **verificador independiente**
abre cada fuente, decide sin mirar el valor del codificador y corrige o descarta lo que no se
sostenga (`data/fase1/verificacion_g*.json`). `pipeline/build_fase1.py` rechaza automáticamente las
citas de programa que no sean literales y las declaraciones sin autor, sin URL o fuera de plazo.

---

## Fuentes válidas (y solo estas)

1. **Programa oficial del 29-N** del partido (nunca programas de elecciones anteriores): cita literal y
   página.
2. **Propuestas y compromisos de sus líderes, en público y en primera persona.** Líderes nacionales o
   regionales del partido (candidato a la presidencia, cabezas de lista, secretario/a general o
   presidente/a, portavoces, líderes autonómicos). Cualquier formato público: mitin, acto de campaña o
   precampaña, entrevista, debate, rueda de prensa, comparecencia, vídeo o red social oficial. Cuenta
   **como programa** si se refiere a estas elecciones o a la próxima legislatura.
   * Primera persona: lo dice el propio líder (cita textual, vídeo, transcripción o crónica que recoge
     sus palabras en un medio de referencia o en los canales del partido). **No valen**: «fuentes del
     partido», rumores, filtraciones, lo que otros dicen que piensa, columnas de opinión ni resúmenes de
     periodistas sin atribución.
   * Fecha: desde la convocatoria (6-oct-2026) vale siempre. Antes, desde el 1-nov-2025 (decisión del
     editor, 13-nov-2026), vale cualquier declaración literal en primera persona sobre la medida,
     también en un discurso en el Congreso o en el Senado (Diario de Sesiones); la web muestra su fecha
     y que es anterior a la convocatoria. Si se refiere expresamente a estas elecciones o a la próxima
     legislatura, anótalo en `marco`. Lo que el partido diga después (programa o campaña) prevalece
     sobre lo anterior. Antes del 1-nov-2025 no vale.
   * También valen los documentos oficiales del partido para estas elecciones distintos del programa
     (manifiesto electoral, nota oficial): `quien` = el partido, `formato` = «documento oficial».
   * Nunca: votaciones parlamentarias (el sentido del voto, sin palabras del líder), posiciones de otras
     legislaturas, ni la ideología que supongas.

## A qué partido cuenta cada fuente (decisión del editor, 13-nov-2026)

Los pasos 1 y 2 tratan de **partidos**, no de coaliciones electorales.

* **Líderes:** lo que dice un líder cuenta solo para su propio partido, aunque hable en un acto de la
  coalición. Ante la duda sobre su afiliación, no se atribuye.
* **Documentos conjuntos** (manifiesto, acuerdo, nota conjunta, web de la coalición): cuentan para
  **cada partido de la web que firma el pacto de coalición** (`data/boe/coaliciones.json`). Los
  firmantes que forman el Frente Amplio (Izquierda Unida y sus federaciones, Movimiento Sumar,
  Recortes Cero…) cuentan para Frente Amplio; Esquerra Republicana del País Valencià cuenta para ERC
  (es su nombre en el País Valencià). `quien` = el documento y la coalición que lo firma.
* **Precedencia** con las fuentes propias del partido: su programa oficial va primero; entre
  declaraciones de campaña (incluidos los documentos conjuntos), la posterior prevalece. Si coinciden
  en el valor, se mantiene la fuente propia.
* **Excepción PSC-PSOE:** lo que dice Pedro Sánchez en actos o documentos del PSC cuenta para el PSC,
  porque el PSC está federado con el PSOE desde 1978 y comparten candidato a la Presidencia del
  Gobierno. No es el caso de UPN y el PP, partidos independientes que solo van juntos en una coalición
  electoral: Feijóo no cuenta para UPN.

## Codificación

Para cada afirmación de `preguntas.json`, la posición del partido:

* `2` muy a favor · `1` a favor · `0` neutral/ambivalente explícito · `-1` en contra · `-2` muy en contra
* `null` no hay posición en las fuentes válidas (ni directa ni inequívocamente indirecta)

Campos: `valor`, `fuente` (`programa` | `campaña`), `cita` (literal, ≤ 60 palabras), `pagina`
(programa), `url`, `medio`, `fecha` (de la declaración), `quien` (nombre y cargo del líder; obligatorio
si la fuente es `campaña`), `formato` (mitin, entrevista, debate…), `marco` (solo si la fecha es
anterior al 6-oct) y `nota` (razonamiento si es indirecta).

Reserva ±2 para cuando se propone o rechaza de forma expresa y prioritaria; ±1 con matices o
condiciones. Una medida relacionada pero distinta no es una posición sobre la afirmación. Si el
programa y un líder se contradicen, prevalece el programa y se explica en `nota`.

Ante la duda entre un valor y `null`, elige `null`: es peor atribuir una posición que no existe que
reconocer que no consta.
