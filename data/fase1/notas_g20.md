# g20: programa de Junts para el 29-N (19-11-2026)

**Pendiente de publicación oficial.** Junts presentó el 18-nov su programa para el 29-N («Catalunya al centre. Programa
electoral 29N», 90 pp., en catalán), pero hoy no está en ninguna web oficial del partido. Se ha analizado la copia que
aloja el diario Ara:
https://static1.ara.cat/ara/public/content/file/original/2026/1118/17/programa-electoral-junts-29n.pdf

- **Catálogo.** Ya está en `partidos.json` (entrada `junts`, `programa.url = "PENDIENTE_URL_OFICIAL"`, fecha 2026-11-18;
  procedencia y comprobaciones en `programa.verificacion`). PDF `data/sources/programas/junts/programa-electoral-junts-29n.pdf`,
  sha256 `cde2c5f3f30b66c72dd4f4bae3d22e9f6bc3e0ee4362da72f9e32e85129374b6` (comprobado); texto
  `programa-electoral-junts-29n.txt` (pdftotext sin `-layout`, porque va a dos columnas), sha256
  `0c48b543b61ce41e97ccffe0d9e0fe18fdf33bc425c2c4f43f9541ccf64314c6`.
- **Cuándo aplicar g20.** Solo si Junts publica en un canal oficial un PDF con el mismo sha256. Entonces hay que sustituir en
  las 15 posiciones y en `fuentes` la url `PENDIENTE_URL_OFICIAL` (y la fecha, si la publicación oficial es de otro día) por
  las oficiales. Si el PDF oficial cambia, hay que rehacer g20.
- **Páginas.** Las del PDF; coinciden con la numeración impresa. P. 1 cubierta, 3 índice; portadillas de una página en las
  pp. 2, 4, 6, 11, 43, 66 y 87; pp. 87-89, anexo «Principals iniciatives de la legislatura»; p. 90, contraportada. Se leyó
  entero el texto de las pp. 5-89.
- **Citas.** Literales en catalán, comprobadas por script (`g20/check.py` en el scratchpad de la sesión, fuera del
  repositorio, con la misma partición por «[...]» que `build_fase1.py`) con `norm()` de `pipeline/verify_quotes.py` contra el
  .txt completo, contra el texto de la página declarada (`pdftotext -f N -l N`) y contra la página extraída de nuevo del PDF.
  Tienen 60 palabras o menos (11 a 58). Las de q03, q15, q18 y q23 juntan con «[...]» fragmentos de la misma página. En
  algunas páginas pdftotext intercala fragmentos de las dos columnas: la de q35 (p. 15) sale entre fragmentos de la otra
  columna y su número de punto (6.5) se comprobó con `pdftotext -layout`.
- **Traducción.** Como en Compromís (g10) y Ara Més (g15), la nota de cada posición empieza con «Traducción: «...»» al
  castellano.
- **Celdas.** `codificacion_g20.json` solo contiene las posiciones de Junts que cambian o se añaden (15). En cada una,
  `sustituye` lleva la posición vigente con el grupo del que procede (comprobado por script contra `fase1.json`) y
  `motivo_cambio`, por qué cambia. Ningún valor es 0.

## A qué partido cuenta el programa

Solo a `junts`. Junts concurre sola; no se toca ninguna celda de otro partido.

## Precedencia aplicada

- **El programa va primero.** Sustituye a la fuente vigente cuando trata la medida al menos tan directamente, también si
  coincide el valor (cambio solo de fuente), como en g14, g16 y g19. Aquí sustituye a discursos en el Congreso (Madrenas: q01,
  q16; Cervera: q11, q33; Cruset: q18; Calvo: q36; Pagès: q35; Nogueras: q15), a declaraciones de campaña de Míriam
  Nogueras (q12, q17, q23) y a la nota oficial de Junts del 21-oct (q32).
- **Se conserva la posición vigente** cuando el programa no trata la medida o lo hace de forma menos directa sin
  contradecirla: q09, q29, q31 y q34 (ver abajo).

## Antes y después (las 30 afirmaciones)

| Afirmación | Antes | Ahora | Página | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | −1 Madrenas (11-nov-2025) | **−2** programa | 60 | valor |
| q03 IVA/ITP primera vivienda | null | **+1** programa | 60 | nueva |
| q31 Renovación del alquiler | −1 Cruset (12-nov) | −1 (se conserva) | — | — |
| q04 Patrimonio permanente | null | null | — | — |
| q05 IRPF de dos tipos | null | null | — | — |
| q06 Jornada de 37,5 h | null | **−1** programa | 88 | nueva |
| q32 SMI autonómico | +1 nota oficial (21-oct) | +1 programa | 68 | fuente |
| q08 Jubilación a los 65 | null | null | — | — |
| q09 Prohibir pagar a la privada | −1 Calvo (18-feb) | −1 (se conserva) | — | — |
| q11 Retirar la concertada | −1 Cervera (23-sep) | −1 programa | 53 | fuente |
| q12 Castellano en las aulas | +1 Nogueras (19-oct) | **+2** programa | 19 | valor |
| q13 Prioridad en vivienda social | null | null | — | — |
| q15 Otra regularización | −1 Nogueras (22-abr) | −1 programa | 48 | fuente |
| q33 Reparto de menores | −1 Cervera (31-ago) | −1 programa | 84 | fuente |
| q16 Referéndum pactado | +1 Madrenas (26-may) | +1 programa | 12 | fuente |
| q17 Concierto para quien lo pida | +2 Nogueras (8-nov) | +2 programa | 68 | fuente |
| q18 Asumir 83.000 M de deuda | +1 Cruset (23-jul) | +1 programa | 68 | fuente |
| q19 Eólica marina | null | null | — | — |
| q36 Alargar las nucleares | +1 Calvo (9-sep) | +1 programa | 78 | fuente |
| q21 Aborto en la Constitución | null | null | — | — |
| q22 Suprimir Igualdad | null | null | — | — |
| q23 Desalojo en 48 h | +1 Nogueras (18-oct) | **+2** programa | 17 | valor |
| q24 Derogar la ley mordaza | null | **+2** programa | 14 | nueva |
| q35 Ampliar la prisión permanente | −2 Pagès (17-mar) | −2 programa | 15 | fuente |
| q25 Indultos por corrupción | null | null | — | — |
| q26 Defensa al 3,5 % | null | null | — | — |
| q27 Ejército en Ceuta | null | null | — | — |
| q34 Referéndum en el Sáhara | +2 Pagès (10-sep) | +2 (se conserva) | — | — |
| q29 Frenar Mercosur | +1 Gavín (25-feb) | +1 (se conserva) | — | — |
| q30 Precio máximo de alimentos | null | null | — | — |

Grupos de origen: g3 (q03, q06, q12, q17, q23, q32), g4 (q01, q11, q15, q16, q18, q35), g7 (q24, q33), g12 (q36).

Resumen: 14 celdas en g20 (la verificación independiente retiró q06; ver abajo). 2 nuevas (q03, q24), 3 cambios de valor (suben q12 y q23; se endurece q01) y 9 solo de
fuente (q11, q15, q16, q17, q18, q32, q33, q35, q36). Cobertura de Junts: 16 → 18 posiciones (14 de programa y 4 de
campaña). Valores finales: +2 ×5, +1 ×6, −1 ×6, −2 ×2; null en q04, q05, q08, q13, q19, q21, q22, q25, q26, q27 y q30.

## Valores: razonamiento

- **q01 (−1 → −2).** Punto 2.2 de «Els joves al centre» (p. 60): derogar los artículos de la Ley 12/2023 «començant pels de
  contenció de preus i zones tensionades», que «redueixen l'oferta de lloguer». La introducción de vivienda (p. 16): «Un
  topall pot semblar una solució ràpida, però no fa aparèixer pisos nous». Suprimir la limitación de rentas donde ya existe
  implica rechazar con más razón un tope estatal: −2, como el PP (medida 145). Ver duda 4.
- **q03 (null → +1).** Punto 2.4 de «Els joves al centre» (p. 60), dentro del objetivo «menys pressió fiscal per accedir al
  primer habitatge»: IVA de la vivienda habitual nueva del 10 % al 5 %. También en los puntos 3.4 (p. 17) y 2.16 (p. 69), para
  todas las edades y con límites. Rebaja del 50 %, no del 60 %; sin límite de edad en la medida; no toca el ITP (competencia de
  la Generalitat). Misma dirección con otras cifras: +1, como ERC, Compromís, Ara Més y Vox.
- **q06 (null → −1).** Anexo de iniciativas de la legislatura (p. 88): «Oposició a la imposició de la jornada laboral de 37,5
  hores». Las propuestas no hablan de la jornada máxima y el punto 5.5 de economía (p. 70) amplía el límite de horas extra.
  −1 y no −2 porque es una línea del balance de la legislatura, no una propuesta, y rechaza la «imposició». Ver duda 1.
- **q12 (+1 → +2).** Introducción de «La llengua catalana al centre» (p. 19): la escuela catalana con el catalán vehicular
  «és una línia vermella: cap llei ni cap tribunal no ha de decidir com s'ensenya a les aules de Catalunya». Es la
  afirmación, para Cataluña, de forma expresa y prioritaria: +2, como ERC. Lo repiten las pp. 8 y 53.
- **q23 (+1 → +2).** Puntos 1.1 y 1.2 de vivienda (p. 17), los primeros de la sección: desalojar las ocupaciones ilegales
  «en un màxim de 48 hores, mitjançant un judici immediat» y desalojo policial inmediato en flagrancia. También en el
  capítulo «Catalunya al centre» (p. 9) y en el punto 6.2 de justicia (p. 15). +2, como el PP y Vox.
- **q24 (null → +2).** Punto 1.10 de derechos y libertades (p. 14): «Derogar la Llei de seguretat ciutadana ("llei
  mordassa")»; lo repite el punto 2.3 de seguridad (p. 23). Propuesta expresa: +2, como ERC.
- **Cambios solo de fuente** (el programa dice lo mismo, con el mismo valor):
  - q11 (−1): la pública y la concertada forman el Servicio de Educación de Cataluña y «totes dues xarxes necessiten els
    mateixos recursos» (p. 53); actualizar los módulos de la concertada a los costes reales (punto 1.2, p. 54). Indirecto: −1.
  - q15 (−1): «menys regularitzacions extraordinàries» y oponerse a «les regularitzacions massives aprovades per decret,
    sense planificació laboral ni integració lingüística» (objetivo 2 y punto 2.2, p. 48). No las prohíbe: −1 (PP, Vox y SALF,
    −2). Ver duda 5.
  - q16 (+1): «Tot possible referèndum acordat amb l'Estat espanyol [...] ha d'oferir la mateixa tria» (p. 12); punto 1.1,
    autodeterminación (p. 13). No propone negociarlo con el Gobierno: +1 (ERC, +2). Ver duda 6.
  - q17 (+2): ley del Concierto Económico Catalán fuera del régimen común, con plena capacidad normativa de la ATC (p. 68);
    «Si el País Basc té concert econòmic, Catalunya també l'ha de poder tenir» (p. 67).
  - q18 (+1): «Exigir la condonació del 100% del deute de la Generalitat amb el [...] FLA» (punto 1.3, p. 68). Va más allá de
    la medida y no menciona el proyecto de ley: +1, como Compromís, Ara Més y el Frente Amplio.
  - q32 (+1): reclamar la capacidad de fijar «un salari mínim propi, adaptat al cost de la vida» (p. 68) y un salario mínimo
    catalán hacia el 60 % del salario medio catalán (punto 5.1, p. 70). No dice que deba superar al estatal: +1, el criterio
    de la nota que sustituye y de Ara Més. Ver duda 2.
  - q33 (−1): que el reparto de menores entre comunidades «continuï reconeixent l'esforç d'acollida» de Cataluña y no le
    asigne traslados mientras su red esté tensionada (punto 5.6, p. 84; también 5.4, p. 49). Da por hecho el reparto: −1. Ver
    duda 7.
  - q35 (−2): «Derogar la presó permanent revisable» (punto 6.5, p. 15). Quien la suprime rechaza ampliarla: −2.
  - q36 (+1): revisar el calendario de cierre de las centrales catalanas si las renovables no aseguran el suministro (punto
    5.1, p. 78). Condicionado: +1 (PP y Vox, +2).

## Se conservan las posiciones vigentes

- **q09 (−1, Pilar Calvo, 18-feb).** El programa defiende «el model sanitari català, amb una xarxa de proveïdors diversa»
  (p. 50) y no apoyará medidas estatales que no respeten «el model sanitari català de col·laboració publicosocial» (punto 3.3,
  p. 51). Va en la misma dirección, pero Calvo es más directa: defiende la colaboración «públic-privada» como estructural frente
  a la ley de gestión directa. Ver duda 3.
- **q29 (+1, Isidre Gavín, 25-feb).** El programa pide «clàusules mirall en acords comercials internacionals (especialment
  UE-Mercosur i similars)» (p. 73; también p. 75) y defiende en los acuerdos comerciales europeos «l'obertura de mercats, la
  reciprocitat» (p. 28). No habla de frenar el acuerdo ni de su aplicación provisional: menos directo, sin contradecir las
  «garanties» que pedía Gavín. Ver duda 8.
- **q31 (−1, Josep Maria Cruset, 12-nov).** El programa dice que Junts votó en contra de «els decrets del Govern espanyol» de
  vivienda (p. 16) y defiende a «llogaters i petits propietaris davant dels decrets d'habitatge» (anexo, p. 88), sin nombrar la
  renovación de los contratos. Cruset habló del decreto concreto.
- **q34 (+2, Josep Pagès, 10-sep).** El programa no habla del Sáhara (la política internacional, pp. 26-28, trata Ucrania y
  Oriente Próximo).

## Siguen en null

- **q04.** No habla del impuesto de solidaridad de las grandes fortunas; solo protege la capacidad normativa de la Generalitat
  sobre el impuesto sobre el patrimonio (p. 67) y propone suprimir el de sucesiones.
- **q05.** «Deflactar l'IRPF, rebaixar els primers trams, augmentar els mínims» (punto 2.1, p. 68) y exenciones para jóvenes
  (p. 61): rebajas genéricas, no la escala de dos tipos ni el mínimo exento de 22.000 €.
- **q08.** Eliminar las penalizaciones por jubilación anticipada a quien tenga 40 años cotizados o más (puntos 5.3, p. 58, y
  5.4, p. 70; anexo, p. 88). Es una medida relacionada pero distinta: no toca la edad ordinaria ni es para todos. Ver duda 9.
- **q13.** Nada sobre prioridad de los nacionales en la vivienda social (el padrón y el arraigo, pp. 48 y 84, son otras
  medidas).
- **q19.** Solo «projectes solars i eòlics amb criteris de cohesió territorial» (punto 1.1, p. 81), sin hablar del mar.
- **q21, q22, q25, q27, q30.** No los trata (la Ley de la cadena alimentaria y los precios en origen, pp. 75 y 86, son otras
  medidas que q30).
- **q26.** Una Cataluña independiente en la OTAN que asuma sus responsabilidades de defensa (p. 26), una defensa europea
  «complementària de l'OTAN» (punto 3.2, p. 28) y retorno industrial de la inversión en defensa (punto 5.4, p. 24): nada sobre
  el objetivo del 3,5 % del PIB.

## Dudas para el verificador y el editor

1. **q06 −1 (anexo).** La única mención está en el anexo de iniciativas de la legislatura que acaba, no en las propuestas.
   Alternativas: null (si el anexo no cuenta como posición para el 29-N) o −2 (si «Oposició» se lee como rechazo expreso).
2. **q32 +1.** El salario mínimo catalán hacia el 60 % del salario medio catalán (p. 70) y la referencia de 1.400 € en 14 pagas
   (p. 57) estarían por encima del estatal, pero el programa no lo dice como principio. Alternativa: +2, como ERC.
3. **q09: se conserva Calvo (−1).** Si se prefiere que el programa vaya primero (punto 3.3, p. 51, «col·laboració
   publicosocial»), el valor sería −1 igualmente: solo cambiaría la fuente.
4. **q01 −2.** La derogación se justifica primero por invasión competencial («que envaeixen la competència exclusiva de
   Catalunya») y después por sus efectos; la crítica de fondo a los topes está en la p. 16. Alternativa: −1, como Vox.
5. **q15 −1.** «Oposar-nos a les regularitzacions massives» es expreso. Alternativa: −2, si no se exige la prohibición por ley.
6. **q16 +1.** La autodeterminación es la primera medida del programa (punto 1.1, p. 13), pero el referéndum acordado aparece
   como hipótesis («Tot possible referèndum acordat»). Alternativa: +2.
7. **q33 −1.** El programa se centra en que Cataluña quede exenta, no en defender el reparto. Alternativa: conservar a Cervera
   (−1, solo cambiaría la fuente) o null si se considera que el programa no se pronuncia sobre suprimirlo.
8. **q29: se conserva Gavín (+1).** Si se considera que pedir cláusulas espejo en Mercosur es la posición del programa sobre
   el acuerdo, sería +1 de programa o null (no pide frenarlo).
9. **q08 null.** Jubilarse sin recorte con 40 años cotizados va en la línea de la afirmación para las carreras largas.
   Alternativa: +1 (Compromís y el Frente Amplio, +2, proponen además volver a los 65 para todos).

## Comprobación del build

En una copia del repositorio en el scratchpad (`g20/copia/`, solo `data/` y `pipeline/`), `python3 -I
pipeline/build_fase1.py` no da errores:

- con g20 y sin verificación, lo omite («omitido, sin verificación aprobada») y `fase1.json` sale idéntico al del
  repositorio;
- con un `verificacion_g20.json` provisional (`"aprobado": true`, solo en la copia) aplica g20 después de g19: Junts pasa de
  16 a 18 posiciones (tras retirar q06), cambian exactamente las 14 celdas de la tabla y ningún otro partido cambia.

Además, `python3 -I -c` en el worktree replica las comprobaciones de `build_fase1.py` sobre g20 (cita literal con `norm`
contra `programa.texto` de `junts`, valores en −2..2, fuente programa, url y fecha pendientes): sin errores. En el
repositorio solo se han creado `codificacion_g20.json` y este fichero; falta la verificación independiente
(`verificacion_g20.json`) y la publicación oficial del programa.


## Verificación independiente (19-nov)

14 celdas aprobadas y q06 rechazada: la jornada de 37,5 h solo aparece en el anexo «Principals iniciatives de la legislatura»
(p. 88), que el propio programa presenta como rendición de cuentas de la legislatura pasada; el prompt 2 excluye las
votaciones y posiciones de otras legislaturas, y nuevas_2026-11-12b.json ya dejó esta celda en null por el mismo motivo.
Corrección aplicada: Junts 16 → 18 posiciones (14 de programa, 4 de campaña).
