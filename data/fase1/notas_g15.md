# g15: programa de Ara Més-Front Ampli para el 29-N (16-11-2026)

La coalición Ara Més-Front Ampli publicó el 16-nov su programa para el 29-N («Programa electoral. Eleccions 29 novembre
2026», lema «Viure bé, viure aquí», 17 pp., en catalán, 160 medidas numeradas). Está catalogado en `partidos.json`
(entrada `ara_mes_fa`): PDF enlazado desde aramesfrontampli.cat y alojado en media.timtul.com, sha256 del PDF
75149b3b…a6f8 (comprobado aquí) y del texto 5252bfc5…f532 (el .txt coincide con un `pdftotext -layout` nuevo del PDF).
Se leyó entero, página a página (`pdftotext -layout -f N -l N`), y se revisaron las 30 afirmaciones vigentes de
`preguntas.json` según `docs/prompts/2_codificacion_posiciones.md`, incluida «A qué partido cuenta cada fuente».

- **Páginas.** Las del PDF; coinciden con la numeración impresa. La p. 1 es la portada; las medidas van de la p. 2 a la 17.
- **Citas.** Literales del texto catalogado, en catalán: comprobadas con `norm()` de `verify_quotes.py` contra el .txt y
  contra el texto de la página declarada. Tienen 60 palabras o menos (8 a 51). La de q01 junta con [...] las medidas 24
  y 25, seguidas. La traducción al castellano abre la `nota` («Traducción: «…»»), como en g10.
- **Celdas.** `codificacion_g15.json` solo contiene las posiciones que cambian o se añaden: 14 de Ara Més y 1 del
  Frente Amplio. En cada una, `sustituye` lleva la posición vigente con el grupo del que procede y `motivo_cambio`, por
  qué cambia.

## A qué partido cuenta el programa

El pacto de coalición ARAMÉS-EU-MS (JEP Illes Balears, `data/boe/coaliciones.json`) lo firman Ara Més, Movimiento
Sumar, Izquierda Unida, Progreso en Verde y Recortes Cero.

- **Ara Més.** Es su programa oficial (`partidos.json`). Fuente `programa`, y va primero.
- **Frente Amplio.** Firman Movimiento Sumar, Izquierda Unida y Recortes Cero. Para el Frente Amplio es un documento
  conjunto: fuente `campaña`, fecha 16-nov, `formato` «documento oficial (programa electoral de la coalición)», como
  Compromís: Front Valencià en g10. Pero el Frente Amplio tiene programa propio del 16-nov (g14), que va primero: el
  documento conjunto solo cubre afirmaciones que ese programa no trata y de las que no hay nada posterior del Frente
  Amplio. Tras g14 eso deja q13, q17, q19, q22, q23, q25, q27, q32 y q35 (el programa del Frente Amplio sí trata q15 y
  q29, aunque queden en null). De ellas, el programa de Ara Més-Front Ampli solo trata q32 y q17 (ver abajo).
- **Progreso en Verde** no es una entrada de la web. Ningún otro partido de la web firma el pacto.

## Antes y después

### Ara Més: 14 celdas (8 nuevas, 3 cambios de valor, 3 solo de fuente)

| Afirmación | Antes | Ahora | Página | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | +1 nota Ara Més-Front Ampli (6-nov) | **+2** programa | 4 | valor |
| q03 IVA/ITP primera vivienda | null | **+1** programa | 4 | nueva |
| q31 Renovación del alquiler | +2 nota Ara Més-Front Ampli (13-nov) | +2 programa | 4 | fuente |
| q04 Patrimonio permanente | null | null | — | — |
| q05 IRPF de dos tipos | null | null | — | — |
| q06 Jornada de 37,5 h | null | **+1** programa | 2 | nueva |
| q32 SMI autonómico | +1 nota Ara Més-Front Ampli (10-nov) | +1 programa | 2 | fuente |
| q08 Jubilación a los 65 | null | null | — | — |
| q09 Prohibir pagar a la privada | null | null | — | — |
| q11 Retirar la concertada | null | **+2** programa | 9 | nueva |
| q12 Castellano en las aulas | +1 nota MÉS per Mallorca (19-nov-2025) | +1 (se conserva) | — | — |
| q13 Prioridad en vivienda social | −1 nota MÉS per Mallorca (28-abr) | −1 (se conserva) | — | — |
| q15 Otra regularización | null | null | — | — |
| q33 Reparto de menores | null | null | — | — |
| q16 Referéndum pactado | null | **+1** programa | 13 | nueva |
| q17 Concierto para quien lo pida | +1 nota Més per Menorca (15-ene) | +1 programa | 7 | fuente |
| q18 Asumir 83.000 M de deuda | null | **+1** programa | 8 | nueva |
| q19 Eólica marina | null | null | — | — |
| q36 Alargar las nucleares | −2 Vidal (9-sep) | −2 (se conserva) | — | — |
| q21 Aborto en la Constitución | null | **+2** programa | 11 | nueva |
| q22 Suprimir Igualdad | null | null | — | — |
| q23 Desalojo en 48 h | null | null | — | — |
| q24 Derogar la ley mordaza | +1 nota MÉS per Mallorca (22-jul) | **+2** programa | 15 | valor |
| q35 Ampliar la prisión permanente | null | null | — | — |
| q25 Indultos por corrupción | null | null | — | — |
| q26 Defensa al 3,5 % | null | **−2** programa | 16 | nueva |
| q27 Ejército en Ceuta | null | null | — | — |
| q34 Referéndum en el Sáhara | null | **+2** programa | 16 | nueva |
| q29 Frenar Mercosur | +1 nota MÉS per Mallorca (28-ene) | +1 (se conserva) | — | — |
| q30 Precio máximo de alimentos | +2 nota Ara Més-Front Ampli (7-nov) | **+1** programa | 2 | valor |

Cobertura de Ara Més: 10 → 18 posiciones conocidas.

### Frente Amplio: 1 celda (solo de fuente)

| Afirmación | Antes | Ahora | Página |
|---|---|---|---|
| q32 SMI autonómico | +1 nota Ara Més-Front Ampli (10-nov) | +1 documento conjunto (programa de Ara Més-Front Ampli) | 2 |

Cobertura del Frente Amplio: 25 → 25.

## Valores: razonamiento (Ara Més)

- **q01 (+1 → +2).** Medidas 24 y 25: tope «per llei» del alquiler en zonas tensionadas (como máximo el 25 % de la renta
  neta de los hogares de la sección censal; un 30 % más de rebaja en Palma y los municipios con masificación turística
  severa) y declaración de zona tensionada «obligatòria i automàtica» al cumplirse los parámetros legales. El tope deja
  de depender de cada comunidad. Mismo criterio que el Frente Amplio (g14) y Adelante Andalucía (+2). Ver duda 1.
- **q03 (+1).** Medida 30: exención del ITP para la primera vivienda habitual, sin edad; no habla del IVA. Misma
  dirección con otra medida, como el Frente Amplio, Compromís, ERC, SALF y Vox.
- **q31 (+2).** Medida 25: «Els contractes de lloguer seran indefinits per defecte». Como el Frente Amplio y Compromís.
- **q06 (null → +1).** Medida 10: jornada máxima de 32 horas sin rebaja salarial. Va más allá de las 37,5 h: +1, como
  Compromís, Adelante Andalucía y Podemos.
- **q32 (+1, cambia la fuente).** Medida 1, la primera del programa: «Salari Mínim Interprofessional Illenc» para
  compensar el mayor coste de vida de Baleares. Ya no es la referencia de otra propuesta (nota del 10-nov), sino una
  medida propia. +1 y no +2 porque no dice que lo fije la comunidad ni, expresamente, que esté por encima del estatal
  (se deduce de su finalidad). Ver duda 2.
- **q11 (null → +2).** Medida 81: «procés progressiu d'eliminació del sistema de concerts educatius», con integración
  de esos centros en la red pública. Mismo criterio que el Frente Amplio y Adelante Andalucía. Ver duda 3.
- **q16 (null → +1).** Medida 120: reconocer «el dret a l'autodeterminació dels pobles» y la «plurinacionalitat
  confederal de l'Estat espanyol». A favor, indirecto: no habla de referéndum ni de pacto con el Gobierno. Ver duda 4.
- **q17 (+1, cambia la fuente).** Medida 67: «Sense renunciar a un sistema de finançament singular [...] basat en la
  plena capacitat fiscal i tributària i una relació amb l'Estat assimilable al concert econòmic, impulsarem un nou
  model de finançament autonòmic». Pide el modelo de la afirmación como objetivo, pero propone ahora un modelo común:
  +1, como Compromís. Ver duda 5.
- **q18 (null → +1).** Medida 67: condonar la deuda balear atribuible a la infrafinanciación, tras un estudio, sin
  cuantía ni quita general. +1, como Compromís y Adelante Andalucía.
- **q21 (null → +2).** Medida 99: «blindatge constitucional» de la ley de salud sexual y reproductiva y de la
  interrupción voluntaria del embarazo. Como el PSOE y Compromís.
- **q24 (+1 → +2).** Medida 135: «Derogarem la Llei mordassa». Derogación sin matices, como Compromís y ERC; el +1
  anterior venía de un punto de una moción en el Consell de Mallorca.
- **q26 (null → −2).** Medida 148: reducir el gasto militar, rechazar el objetivo del 5 % del PIB y apoyar la salida
  de la OTAN. Como el Frente Amplio, Podemos, Adelante Andalucía, EH Bildu y el BNG.
- **q30 (+2 → +1).** Medida 4: precios máximos en la cesta de la compra saludable «en cas d'acreditar-ne abusos». A favor
  con condiciones, como el Frente Amplio en g14 (que bajó de +2 a +1 por el mismo motivo) y Adelante Andalucía.
- **q34 (null → +2).** Medida 150: apoyo explícito a la autodeterminación del Sáhara y a un referéndum de la ONU, y
  retirar el apoyo al plan de autonomía marroquí.

## Frente Amplio: el documento conjunto

- **q32 (+1, cambia la fuente).** La medida 1 (Salari Mínim Interprofessional Illenc) sustituye a la nota de la misma
  coalición del 10-nov: entre documentos conjuntos prevalece el posterior si es al menos igual de directo (g10, Frente
  Amplio q06), y este lo es más. El programa del Frente Amplio solo trata el SMI estatal (suelo del 60 % del salario
  medio neto, p. 51 del PDF), compatible con salarios mínimos autonómicos más altos: no trata la afirmación (g14 ya lo
  juzgó así al conservar la nota).
- **q17: se conserva el programa de Compromís: Front Valencià (+1, 14-nov).** El programa de Ara Més-Front Ampli es
  posterior y tiene el mismo valor, pero es menos directo: «sense renunciar» al modelo asimilable al concierto frente a
  «apostarem per un concert econòmic responsable». Entre documentos conjuntos con el mismo valor, el posterior solo
  sustituye si es al menos igual de directo.
- **q13 (−1, Delgado), q22 (−1, Bustinduy), q23 (−1, Pisarello) y q35 (−2, Santiago): se conservan.** El programa de
  Ara Més-Front Ampli no trata esas medidas (ver abajo). q19, q25 y q27 siguen en null.
- **El resto** (q01, q03, q04, q05, q06, q08, q09, q11, q12, q15, q16, q18, q21, q24, q26, q29, q30, q31, q33, q34, q36)
  lo trata el programa propio del Frente Amplio, que va primero: el documento conjunto no puede cubrirlo.

## Se conservan las posiciones vigentes (Ara Més)

- **q12 (+1, nota de MÉS per Mallorca, 19-nov-2025).** El bloque «El català, llengua de ple dret» (medidas 122-130, pp.
  13-14) trata la Administración del Estado, los consumidores, el Senado, la empresa privada y los medios; no la
  escuela.
- **q13 (−1, nota de MÉS per Mallorca con Rosa Cursach, 28-abr).** La medida 34 persigue la discriminación en el acceso
  a la vivienda, «amb particular atenció al racisme immobiliari», y la 141 propone una ley contra el racismo. Van en
  la misma línea pero son menos directas que el rechazo expreso de la «prioritat nacional» en los servicios sociales.
- **q29 (+1, nota de MÉS per Mallorca con Vicenç Vidal, 28-ene).** El programa no menciona Mercosur. La medida 150 pide
  votar en contra de acuerdos comerciales UE-Marruecos que incluyan el Sáhara: es otra medida.
- **q36 (−2, Vidal, 9-sep).** El programa no habla de las centrales nucleares (la medida 62 trata las térmicas de las
  islas).

## Siguen en null (Ara Més)

- **q04 Patrimonio.** No menciona el impuesto de grandes fortunas ni el de patrimonio.
- **q05 IRPF.** Solo subir los tramos de la imputación de rentas inmobiliarias (medida 32), una deducción para jóvenes
  que alquilan (107) y suprimir la ley Beckham (145). Ninguna trata la escala general.
- **q08 Jubilación.** Solo jubilación anticipada sin penalización para las camareras de piso (medida 16). Compatible con
  volver a los 65, pero no dice nada de la edad ordinaria (mismo criterio que ERC en g10).
- **q09 Sanidad privada.** Las medidas de sanidad (85-89) tratan financiación, insularidad y salud mental. La 83
  prohíbe financiar universidades privadas: es educación.
- **q15 Regularización.** Empadronamiento flexible (143), oficina de extranjería (141) y Pacto Europeo de Migración (144):
  ninguna es una regularización extraordinaria.
- **q19 Eólica marina.** Medida 63: «qualsevol projecte d'energia eòlica marina» debe someterse a una evaluación
  rigurosa de impactos con participación de las instituciones insulares. Es una condición, ni a favor ni en contra:
  null. Ver duda 6.
- **q22 Igualdad.** La medida 95 sube el presupuesto de políticas de igualdad al 5 %, pero no habla del Ministerio.
- **q23 Desalojo.** La medida 34 prohíbe las empresas de «desocupació extrajudicial» y la 37, los desahucios de familias
  con menores sin alternativa. No tratan la ocupación ni los plazos de desalojo (mismo criterio que Compromís).
- **q25 Indultos.** La Llei d'Integritat Pública (medida 136) no habla de indultos.
- **q27 Ceuta.** La medida 148 pide que el territorio balear no esté al servicio de la OTAN; nada de Ceuta.
- **q33 Menores.** La medida 142 pide una acogida digna «finançada al 100% per l'Estat», también la de los menores que
  llegan solos. Es la financiación, no el reparto entre comunidades (mismo criterio que Compromís, «acolliment digne»).
- **q35 Prisión permanente.** No la menciona; la medida 98 reforma la ley de libertad sexual.

## Dudas para el verificador y el editor

1. **q01 +2 con un tope limitado a las zonas tensionadas.** Como en el Frente Amplio (duda 4 de g14) y Adelante
   Andalucía. Aquí, además, no hay activación subsidiaria por el Ministerio: la declaración es «obligatòria i
   automàtica». Alternativa: +1, si se exige un tope general o la intervención expresa del Estado.
2. **q32 +1 (Ara Més y, por arrastre, Frente Amplio).** «Implantarem un Salari Mínim Interprofessional Illenc» es la
   primera medida y es expresa, pero no dice quién lo fija ni que supere al estatal (se deduce de «compensar» un coste
   de vida mayor). Se aplicó el criterio verificado de EH Bildu (+1, «salario mínimo propio»). Alternativa: +2, como el
   PNV, el BNG y ERC; el Frente Amplio, partido estatal, pasaría también a +2 por un salario mínimo balear (efecto
   parecido al de q17 con Compromís, duda 6 de g10).
3. **q11 +2 por integración en la red pública.** La medida no retira la financiación a los concertados: los convierte
   en centros públicos. El resultado coincide con la afirmación (se acaban los conciertos), y no dice que empiece por las
   etapas no obligatorias. Alternativa: +1.
4. **q16 +1 por «el dret a l'autodeterminació dels pobles».** No nombra referéndum ni pacto con el Gobierno. Se trató
   como indirecta pero inequívoca, porque en el bloque «Autogovern» y junto a la «plurinacionalitat confederal de
   l'Estat espanyol» se refiere a los pueblos del Estado, y el PSC (−1) ya se codificó como si «referéndum de
   autodeterminación» equivaliera a la afirmación. Alternativa: null, si se exige que hable de un referéndum
   (Compromís quedó en null con «model d'Estat plurinacional» y referendos en general).
5. **q17: cambio solo de fuente.** El programa nombra el concierto, pero como objetivo al que «no renuncia» mientras
   impulsa un modelo común. Se juzgó tan directo como la nota de Més per Menorca y, además, de la candidatura (la nota
   anterior era de uno de los partidos de la federación). Alternativa: conservar la nota de Més per Menorca; basta con
   quitar q17 de g15, sin efecto en el valor.
6. **q19 null.** Someter «qualsevol projecte» de eólica marina a una evaluación rigurosa con participación insular
   puede leerse como recelo, pero no rechaza ni apoya los parques. Alternativa: −1, si se lee como oposición
   condicionada (Coalición Canaria tiene +1 por un apoyo con condiciones).
7. **q30 baja de +2 a +1.** Como en el Frente Amplio (g14, duda 2, verificada): el programa condiciona los precios
   máximos a que se acrediten abusos, frente a la nota del 7-nov, sin condiciones.

## Comprobación del build

En una copia del repositorio (`scratchpad/g1516_check`), `python3 -I pipeline/build_fase1.py` no da errores:

- sin `verificacion_g15.json` omite g15 («omitido, sin verificación aprobada») y `fase1.json` sale idéntico al del
  repositorio;
- con un `verificacion_g15.json` provisional (`"aprobado": true`, solo en la copia; también con g16) aplica g15 después
  de g14: Ara Més pasa de 10 a 18 posiciones; el Frente Amplio sigue en 25 (q32 cambia solo de fuente); ningún otro
  partido cambia por g15.

En el repositorio no se ha creado `verificacion_g15.json`: la verificación la hará otra persona.

## Verificación

Verificación independiente del 17-nov en `verificacion_g15.json` (aprobado). Se leyeron enteras las 17 páginas del PDF
(`pdftotext -layout -f N -l N`). Las 15 citas son literales, están en su página y tienen 60 palabras o menos. Las 15
`sustituye` coinciden con la celda vigente en `fase1.json`. Resultado: 15 celdas ok, ninguna corregida de valor y ninguna
rechazada.

- **Nota de q32 corregida aquí, en `codificacion_g15.json`, para Ara Més y el Frente Amplio.** Las dos notas decían
  «mismo criterio que EH Bildu (+1)». Con g16, el programa de EH Bildu sube esa celda a +2, así que la comparación sería
  falsa. Ahora el criterio es Junts (+1: reclama la competencia sin decir que el salario propio deba superar al
  estatal) y la nota de EH Bildu con LAB del 12-nov. El programa de EH Bildu pasa a la lista de los +2. Esto vale
  también para la duda 2 de arriba. El valor no cambia.
- **Dudas resueltas como propone el codificador.**
  - q01: +2. La declaración automática basta, como en Adelante Andalucía.
  - q32: +1 en los dos partidos. No dice quién fija el salario mínimo, y eso es el núcleo de la afirmación.
  - q11: +2. Acaba con los conciertos; que los centros pasen a ser públicos no lo rebaja.
  - q16: +1. Autodeterminación de los pueblos del Estado, sin referéndum.
  - q17: cambia solo la fuente.
  - q19: null. Ni promueve ni rechaza los parques.
  - q30: +1. Mismo listón que el Frente Amplio en g14.
- **Recuento final.**
  - Ara Més: 10 → 18 posiciones. 3 cambios de valor (q01 y q24 suben, q30 baja), 8 nuevas (q03, q06, q11, q16, q18,
    q21, q26 y q34) y 3 solo de fuente (q17, q31 y q32).
  - Frente Amplio: 25 → 25 (q32, solo de fuente).
- **Build.** En una copia (`scratchpad/g1516_ver`), con g15 y g16, `python3 -I pipeline/build_fase1.py` termina sin
  errores. Solo cambian ara_mes_fa, frente_amplio y eh_bildu.
- **Pendiente para el editor** (en «dudas»): q01 (alternativa +1, junto con el Frente Amplio y Adelante Andalucía), q32
  (alternativa +2), q16 (alternativa null) y q19 (alternativa −1).
