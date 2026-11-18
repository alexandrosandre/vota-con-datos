# g19: programa de Podemos para el 29-N (18-11-2026)

Podemos publicó el 18-nov su programa para el 29-N («Así de básico: Paz, casa y trabajo», 141 pp.) en su web oficial de
campaña, pazcasaytrabajo.es (titular Podemos según su aviso legal, ya archivado en
`data/sources/programas/podemos/web_2026-11-17/`):
https://pazcasaytrabajo.es/programa-electoral/programa-electoral-paz-casa-y-trabajo.pdf

- **Descarga propia** (18-nov, 12:46 CET), en `rev18b/p1pod/dl/`: PDF de 1.830.035 bytes, sha256
  `086211fb272f0eeceddfa630796e58e5f4910e81efb0385a43b563a2e3f097fb`; `pdftotext -layout` →
  `programa.txt`, sha256 `dfdce63897b57ef26128110e2e9437b65ab00d9d8a3b0462f23aaba546eedd3f`. Cabeceras en
  `programa.headers.txt` (Last-Modified: 18-nov, 08:56 UTC). El PDF lleva fecha de creación del 17-nov, 13:49 (InDesign),
  el día en que la prensa informó de que Irene Montero lo presentó; el 17-nov y el 18-nov a las 09:46 no estaba en
  canales oficiales (`partidos.json`, «verificacion»).
- **Catálogo.** A las 12:46 todavía no estaba en `data/sources/programas/podemos/` (solo `web_2026-11-17/`), así que no
  se ha podido comparar el sha256 con el catalogado. `codificacion_g19.json` usa como rutas
  `programa-electoral-paz-casa-y-trabajo.pdf` y `.txt` en esa carpeta: si el catálogo usa otros nombres, hay que
  ajustarlas. El sha256 del PDF tiene que coincidir con el de arriba; el del .txt, si se genera con el mismo
  `pdftotext -layout`.
- **Páginas.** Las del PDF; coinciden con la impresa en las 141 (comprobado por script). Pp. 1-3: cubierta, página en
  blanco e índice; cada capítulo abre con una portadilla de una página; la 140 está en blanco y la 141 es la
  contraportada. El texto va de la p. 4 a la 139 y se leyó entero.
- **Citas.** Literales: comprobadas por script (`bin/check_g19.py`) con `norm()` de `pipeline/verify_quotes.py` contra el
  .txt completo, contra el texto de la página declarada en el .txt y contra la página extraída de nuevo del PDF con
  `pdftotext -layout -f N -l N`. Tienen 60 palabras o menos (37 a 58). Las de q01, q05, q11, q21, q26, q34 y q36 juntan
  con [...] frases de la misma medida y la misma página.
- **Celdas.** `codificacion_g19.json` solo contiene las posiciones de Podemos que cambian o se añaden (15). En cada una,
  `sustituye` lleva la posición vigente con el grupo del que procede (comprobado por script contra `fase1.json`) y
  `motivo_cambio`, por qué cambia. Ningún valor es 0.

## A qué partido cuenta el programa

Solo a `podemos`. Podemos concurre sola al Congreso salvo en las coaliciones regionales que firma: Compromís: Front
Valencià y Unidad del Pueblo Canario. Sus documentos conjuntos (el programa de Compromís: Front Valencià del 14-nov y el
manifiesto de UPC del 3-nov) contaban para Podemos; el programa propio de Podemos prevalece donde trata la medida. No se
toca ninguna celda de `compromis`, `upc` ni de otro partido.

## Precedencia aplicada

- **El programa va primero.** Sustituye a la fuente vigente cuando trata la medida al menos tan directamente, también si
  coincide el valor (cambio solo de fuente) o si lo rebaja (q08, q36), como en g14 y g16. Aquí sustituye a:
  - documentos conjuntos de coalición: el programa de Compromís: Front Valencià (q04, q08, q24, q34) y el manifiesto de
    Unidad del Pueblo Canario (q09, q33);
  - discursos en el Congreso anteriores a la convocatoria (Belarra: q21, q31; Velarde: q29; Santana: q36);
  - declaraciones de campaña de Irene Montero (q01, q26) y la web de campaña (q06).
- **Se conserva la posición vigente** cuando el programa no trata la medida o lo hace de forma menos directa sin
  contradecirla: q03, q13, q16, q17, q18, q22, q23, q27, q30 y q35 (ver abajo).

## Antes y después (las 30 afirmaciones)

| Afirmación | Antes | Ahora | Página | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | +1 Montero (6-nov) | **+2** programa | 8 | valor |
| q03 IVA/ITP primera vivienda | +1 programa Compromís: Front Valencià | +1 (se conserva) | — | — |
| q31 Renovación del alquiler | +2 Belarra (10-dic-2025) | +2 programa | 8 | fuente |
| q04 Patrimonio permanente | +2 programa Compromís: Front Valencià | +2 programa | 17 | fuente |
| q05 IRPF de dos tipos | null | **−1** programa | 21 | nueva |
| q06 Jornada de 37,5 h | +1 web de campaña (20-oct) | +1 programa | 41 | fuente |
| q32 SMI autonómico | null | null | — | — |
| q08 Jubilación a los 65 | +2 programa Compromís: Front Valencià | **+1** programa | 41 | valor |
| q09 Prohibir pagar a la privada | +1 manifiesto UPC (3-nov) | **+2** programa | 88 | valor |
| q11 Retirar la concertada | null | **+2** programa | 79 | nueva |
| q12 Castellano en las aulas | null | null | — | — |
| q13 Prioridad en vivienda social | −1 Sánchez Serna (17-jun) | −1 (se conserva) | — | — |
| q15 Otra regularización | null | null | — | — |
| q33 Reparto de menores | −1 manifiesto UPC (3-nov) | **−2** programa | 69 | valor |
| q16 Referéndum pactado | +1 Montero (27-oct) | +1 (se conserva) | — | — |
| q17 Concierto para quien lo pida | +1 programa Compromís: Front Valencià | +1 (se conserva) | — | — |
| q18 Asumir 83.000 M de deuda | +1 Santana (23-jul) | +1 (se conserva) | — | — |
| q19 Eólica marina | null | null | — | — |
| q36 Alargar las nucleares | −2 Santana (13-nov-2025) | **−1** programa | 103 | valor |
| q21 Aborto en la Constitución | +1 Belarra (30-abr) | **+2** programa | 51 | valor |
| q22 Suprimir Igualdad | −1 Montero (24-oct) | −1 (se conserva) | — | — |
| q23 Desalojo en 48 h | −1 Belarra (19-may) | −1 (se conserva) | — | — |
| q24 Derogar la ley mordaza | +2 programa Compromís: Front Valencià | +2 programa | 133 | fuente |
| q35 Ampliar la prisión permanente | −1 Velarde (17-mar) | −1 (se conserva) | — | — |
| q25 Indultos por corrupción | null | null | — | — |
| q26 Defensa al 3,5 % | −2 Montero (6-nov) | −2 programa | 28 | fuente |
| q27 Ejército en Ceuta | −1 Montero (6-nov) | −1 (se conserva) | — | — |
| q34 Referéndum en el Sáhara | +2 programa Compromís: Front Valencià | +2 programa | 35 | fuente |
| q29 Frenar Mercosur | +1 Velarde (24-jun) | **+2** programa | 37 | valor |
| q30 Precio máximo de alimentos | +2 Montero (6-nov) | +2 (se conserva) | — | — |

Resumen: 15 celdas en g19. 2 nuevas (q05, q11), 7 cambios de valor (suben q01, q09, q21 y q29; se endurece q33; bajan
q08 y q36) y 6 solo de fuente (q04, q06, q24, q26, q31, q34). Cobertura de Podemos: 23 → 25 posiciones (15 de
programa y 10 de campaña). Valores finales: +2 ×10, +1 ×6, −1 ×7, −2 ×2; null en q12, q15, q19, q25 y q32.

## Valores: razonamiento

- **q01 (+1 → +2).** Medida 1, «Bajar los alquileres un 40% por ley» (p. 8): rebaja por ley del 40 % en todos los
  contratos (vigentes, renovaciones, prórrogas y nuevos), con suelo en el 60 % del precio medio de la zona, y ese 60 %
  como precio inicial de las viviendas nunca alquiladas. Es un precio máximo fijado por ley estatal para todos los
  contratos, sin zonas tensionadas ni comunidades: +2, como el BNG, el Frente Amplio, Ara Més y Adelante Andalucía.
- **q31 (+2, cambia la fuente).** Medida 2 (p. 8): contratos de vivienda habitual indefinidos por defecto. Lo mismo que
  proponía Belarra (+2 verificado).
- **q04 (+2, cambia la fuente).** Medida 30 (p. 17): el impuesto temporal pasa a ser «un impuesto estatal permanente» y se
  extiende a todos los obligados del Impuesto sobre el Patrimonio. Permanencia expresa: +2, como ERC y el BNG.
- **q05 (null → −1).** Medida 48 (p. 21): más tramos y tipos más altos por encima de 60.000 € (hasta el 28,5 %), tipo
  mínimo del 9 % y exención para rentas inferiores al SMI. Lo contrario de dos tipos con máximo del 25 %, sin rechazarlo
  de forma expresa: −1, como el Frente Amplio y Adelante Andalucía.
- **q06 (+1, cambia la fuente).** Medida 113 (p. 41): 35 horas y después 30, sin rebaja salarial. Más allá de las 37,5 h,
  sin mencionarlas: +1, como el BNG, EH Bildu, Compromís y Ara Més.
- **q08 (+2 → +1).** Medida 116 (p. 41): edad ordinaria de jubilación a los 63 años para todos. Misma dirección con otra
  cifra: +1, el criterio de Adelante Andalucía (64 años) y de q06. Sustituye al «Retornarem l'edat de jubilació als 65
  anys» del programa conjunto Compromís: Front Valencià. Ver duda 2.
- **q09 (+1 → +2).** Medida 300 (p. 88): deroga la Ley 15/1997 y los artículos 66, 67 y 90 de la Ley General de Sanidad
  (vinculación de hospitales privados por convenio y conciertos con medios ajenos), hace obligatoria la gestión pública
  directa, prohíbe externalizar y no prorroga los contratos; los conciertos solo «subsisten» de forma transitoria, y el
  nuevo mutualismo administrativo va «sin conciertos con entidades privadas». +2, como Adelante Andalucía y el BNG; el
  Frente Amplio y EH Bildu (+1) solo derogan la Ley 15/1997. Ver duda 4.
- **q11 (null → +2).** Medida 279 (p. 79): una única red pública de gestión directa, fin progresivo de los fondos públicos
  a centros privados, moratoria de nuevos conciertos en todas las etapas y reabsorción de los concertados en la red
  pública; la medida 281 (p. 80) excluye a la concertada del nuevo fondo estatal. +2, como el Frente Amplio, Ara Més,
  Adelante Andalucía y el BNG. Ver duda 3.
- **q21 (+1 → +2).** Medida 146 (p. 51): incorporar el aborto a la Constitución como derecho fundamental (art. 15).
  Expreso: +2. Concreta el «pero no así, como propone el PSOE» de Belarra (+1).
- **q24 (+2, cambia la fuente).** Medida 427 (p. 133), «Derogar la Ley Mordaza», y la introducción del capítulo
  (pp. 126-127). El cuerpo llama a la ley «Ley de Reforma de la Ley Orgánica de protección de la seguridad ciudadana», pero
  el título y la introducción hablan de derogar la «Ley Mordaza» con una regulación nueva: +2.
- **q26 (−2, cambia la fuente).** Medidas 72 y 73 (p. 28): revertir el aumento del gasto militar, congelarlo y rechazar el
  objetivo de la OTAN del 5 % en 2035; la 70, salir de la OTAN. −2.
- **q29 (+1 → +2).** Medida 106 (p. 37): «Seguiremos rechazando el actual acuerdo comercial entre la Unión Europea y
  Mercosur»; también la 376 (p. 115). Rechazo expreso en una medida propia: +2, como el BNG, ERC y Vox.
- **q33 (−1 → −2).** Medida 219 (p. 69), «Sistema obligatorio y solidario de distribución de menores migrantes no
  acompañados», con «corresponsabilidad obligatoria de todas las comunidades autónomas». Propuesta expresa y con título
  propio de un reparto obligatorio: −2, como Coalición Canaria. No es el caso del Frente Amplio (−1 en la verificación
  de g14: «acuerdo marco» en una subordinada).
- **q34 (+2, cambia la fuente).** Medida 100 (p. 35): referéndum de autodeterminación y ruptura con el plan de autonomía;
  la 102 (p. 36), reconocer la RASD. +2.
- **q36 (−2 → −1).** Medida 339 (p. 103): «Defenderemos el cumplimiento del calendario de cierre de las centrales
  nucleares, comenzando por Almaraz», pero «de acuerdo con la planificación energética vigente y las condiciones de
  seguridad del sistema eléctrico», y «Ni prórrogas nucleares indefinidas». En contra con matices: −1, el listón de g16
  (EH Bildu, PSOE, PSC: «mantener el calendario»); los −2 (Frente Amplio, Compromís) rechazan las prórrogas de forma
  expresa. Ver duda 1.

## Se conservan las posiciones vigentes

- **q03 (+1, programa de Compromís: Front Valencià).** El programa de Podemos no habla de impuestos en la compra de la
  primera vivienda (solo IVA del 21 % a los pisos turísticos, p. 22, e ITP para jóvenes agricultores, p. 114).
- **q13 (−1, Sánchez Serna).** Las medidas 21 (p. 12) y 229 (p. 72) combaten la discriminación por nacionalidad en el
  acceso a la vivienda, también la pública: coinciden con el −1 pero sin nombrar la prioridad nacional en la vivienda
  social. Sánchez Serna rechazó la moción concreta de Vox, más directa. Ver duda 7.
- **q16 (+1, Montero).** El capítulo «España, república plurinacional» (pp. 126-139) propone un referéndum sobre
  monarquía o república (medida 406) y «reconozca la plurinacionalidad», pero no habla de referendos de independencia.
- **q17 (+1, programa de Compromís: Front Valencià).** No habla del concierto ni de la financiación autonómica (solo
  «condicionaremos la autonomía fiscal» a los estándares sanitarios, p. 90). Ver duda 6.
- **q18 (+1, Santana).** No habla de la deuda autonómica; derogar la reforma del artículo 135 (medida 62, p. 23) es otra
  medida.
- **q22 (−1, Montero).** Solo menciona «el Ministerio con competencias en Igualdad» (p. 53), sin decir si debe ser un
  ministerio propio.
- **q23 (−1, Belarra).** Prohibir los desahucios de personas vulnerables sin alternativa y los desalojos extrajudiciales
  (medidas 5 y 6, p. 9) son otras medidas; no habla de la ocupación ni de plazos de desalojo.
- **q27 (−1, Montero).** La medida 104 (p. 36) sobre Ceuta es humanitaria y de investigación de abusos; la 90 (p. 33)
  rechaza la «militarización de las fronteras» en los acuerdos con terceros países. No habla de desplegar el Ejército.
- **q30 (+2, Montero).** El programa limita los márgenes de las grandes distribuidoras (medida 35, p. 18), crea una red
  pública de supermercados (34, p. 17) y precios en origen justos (368, p. 112): medidas relacionadas pero distintas de
  un precio máximo por ley. No contradice el «topar los precios de los alimentos» de Montero. Ver duda 5.
- **q35 (−1, Velarde).** No menciona la prisión permanente revisable.

## Siguen en null

- **q12.** «Garantizaremos la promoción y enseñanza de las lenguas cooficiales» (medida 292, p. 85): no habla de la lengua
  de las clases ni de porcentajes.
- **q15.** «Procedimiento permanente de regularización» (medida 210, p. 67) y prueba del arraigo «siguiendo el método»
  de la regularización de 2026 (211). Una vía permanente no es otra regularización extraordinaria: mismo criterio que el
  Frente Amplio, EH Bildu, Compromís, el BNG y ERC (null). Ver duda 8.
- **q19.** Solo «el despliegue equilibrado de la energía solar y eólica» (medida 328, p. 98), sin hablar de la marina.
- **q25.** No habla de indultos; la medida 428 (p. 133) veta contratar con empresas corruptas.
- **q32.** SMI estatal de 1.800 € y nunca inferior al 75 % del salario mediano (medida 111, p. 41); nada de salarios
  mínimos autonómicos.

## Dudas para el verificador y el editor

1. **q36 −1.** «Comenzando por Almaraz» puede leerse como rechazo de su prórroga hasta 2030 (entonces −2, como el Frente
   Amplio). Se eligió −1 por las condiciones («planificación energética vigente», «condiciones de seguridad») y porque
   solo rechaza las prórrogas «indefinidas». Alternativa: −2 (programa).
2. **q08 +1.** Jubilarse a los 63 sin recorte implica a fortiori poder hacerlo a los 65, pero la regla de cifras
   distintas (Adelante Andalucía, 64 años) da +1. Alternativa: +2.
3. **q11 +2.** La reabsorción de los concertados en la red pública es «voluntaria»; la financiación a los que no se
   integren solo se acaba por el «fin progresivo» de los fondos públicos a centros privados. Alternativa: +1.
4. **q09 +2.** Los conciertos se extinguen de forma progresiva («Mientras subsistan los conciertos»). Alternativa: +1,
   si se exige la prohibición inmediata.
5. **q30: se conserva Montero (+2).** Si se considera que el tope a los márgenes es la posición del programa sobre los
   precios de los alimentos, el valor sería +1 (como el Frente Amplio, Ara Més y Adelante Andalucía, con topes
   condicionados).
6. **q17 y q03: se conservan los +1 del programa conjunto Compromís: Front Valencià.** El programa de Podemos no trata
   esas medidas. En g14 ya se anotó que el +1 a partidos estatales por el concierto valenciano es llamativo.
7. **q13: se conserva Sánchez Serna.** Si se prefiere que el programa vaya primero (medidas 21 y 229, discriminación por
   nacionalidad en el acceso a la vivienda), el valor sería −1 igualmente: solo cambiaría la fuente (como EH Bildu en
   g16).
8. **q15 null.** Alternativa: +1, si una regularización permanente se lee como la misma dirección con otra medida.

## Comprobación del build

En una copia del repositorio (`rev18b/p1pod/check/`, solo `data/` y `pipeline/`), con el programa copiado en
`data/sources/programas/podemos/` y la entrada `podemos` de `partidos.json` apuntando a él (`programa.texto`, solo en la
copia), `python3 -I pipeline/build_fase1.py` no da errores:

- sin `codificacion_g19.json`, `fase1.json` sale idéntico al del repositorio;
- con g19 y sin verificación, lo omite («omitido, sin verificación aprobada»);
- con un `verificacion_g19.json` provisional (`"aprobado": true`, solo en la copia) aplica g19 después de g17: Podemos
  pasa de 23 a 25 posiciones y ningún otro partido cambia.

En el repositorio no se ha creado nada: falta catalogar el programa en `partidos.json` (lo hace otro agente) y la
verificación independiente (`verificacion_g19.json`).
