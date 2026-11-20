# g21: programa de Unidad del Pueblo Canario para el 29-N (19-11-2026)

Unidad del Pueblo Canario (coalición de NC-BC, Podemos, IU y Sumar en Canarias) publicó el 19-nov a las 20:34 CET en su web
oficial un documento de 19 páginas titulado en la portada «Líneas básicas del programa electoral de la Unidad del Pueblo
Canario (UPC)»: https://www.unidadpueblocanario.org/manifiesto-20261119/manifiesto-electoral-upc.pdf (la ruta antigua del
manifiesto, /documentos/manifiesto-upc.pdf, sirve el mismo fichero). Por decisión del coordinador del 20-nov cuenta como
programa de UPC para el 29-N (se denomina programa electoral y concreta medidas), y en `partidos.json` es el programa de la
entrada `upc` (NC-BC).

- **Fichero.** sha256 del PDF `ce35fb3cb8745524bee662d067d22773d73fbf3ef64fcf68c077a2bb7b1087e8`, comprobado aquí y
  descargado de nuevo de la URL oficial el 20-nov a las 10:00 (594.069 bytes, Last-Modified 19-nov 19:34:30 GMT). Texto:
  `data/sources/programas/upc/lineas-basicas-programa-upc.txt` (`pdftotext -layout`, idéntico a una extracción nueva).
- **Páginas.** Las del PDF; coinciden con la numeración impresa. La p. 1 es la portada (imagen); la p. 2, la introducción y la
  lista de los 5 bloques y 16 ejes. Se leyó entero, página a página.
- **Citas.** Literales: comprobadas por script con `norm()` de `pipeline/verify_quotes.py` contra el texto de la página
  declarada (todas en su página). Tienen 60 palabras o menos (12 a 44). Las de q01 y q21 juntan con [...] frases seguidas de la
  misma página; la de q21 salta la palabra partida «afectivo-sexual».
- **Celdas.** `codificacion_g21.json` solo contiene las posiciones de `upc` que cambian o se añaden (10). En cada una,
  `sustituye` lleva la posición vigente con el grupo del que procede y `motivo_cambio`, por qué cambia. Ningún valor es 0.

## A qué partido cuenta el programa

El pacto de coalición de Unidad del Pueblo Canario (JEC, código 77000, `data/boe/coaliciones.json`) lo firman Nueva Canarias
Bloque Canarista, Podemos, Movimiento Sumar e Izquierda Unida Canaria.

- **upc (NC-BC).** Es su programa oficial (`partidos.json`). Fuente `programa`, y va primero.
- **Podemos y Frente Amplio** (Movimiento Sumar e IU). Para ellos es un documento conjunto, igual que el programa de
  Compromís: Front Valencià en g10 (Podemos, Frente Amplio y ERC) y el de Ara Més-Front Ampli en g15 (Frente Amplio): fuente
  `campaña`, fecha 19-nov, `formato` «documento oficial (programa electoral de la coalición)». El precedente es claro y el
  manifiesto de UPC del 3-nov ya contaba para los dos (q09 y q33 de Podemos hasta g19; q09 del Frente Amplio hasta g14). Pero
  los dos tienen programa propio (Frente Amplio, 16-nov, g14; Podemos, 18-nov, g19), que va primero: el documento conjunto
  solo cubre las afirmaciones que su programa no trata, y entre declaraciones prevalece la posterior (el programa de UPC, del
  19-nov, es posterior a todas), salvo que coincida el valor con una fuente propia.
  - Podemos: su programa no trata q03, q13, q16, q17, q18, q22, q23, q27, q30 y q35 (posiciones de campaña o de documentos
    conjuntos) y deja en null q12, q15, q19, q25 y q32. El programa de UPC solo trata, de ellas, q16 (+1), y Podemos ya tiene
    +1 de Irene Montero (27-oct), fuente propia con el mismo valor: se mantiene. **Ningún cambio.**
  - Frente Amplio: su programa no trata q13, q17, q22, q23, q32 y q35 y deja en null q15, q19, q25, q27 y q29. El programa de
    UPC no trata ninguna de ellas. **Ningún cambio.**
- Por eso g21 solo contiene celdas de `upc`. Si el editor prefiriera no atribuir el documento a Podemos y Frente Amplio, el
  resultado sería el mismo.

## Precedencia aplicada

- **El programa va primero.** Sustituye a la fuente vigente cuando trata la medida al menos tan directamente, también si
  coincide el valor (cambio solo de fuente), como en g14, g16 y g19. Aquí sustituye al manifiesto del 3-nov (q01, q04, q09,
  q33, q34), cuya URL sirve ahora el programa.
- **Se conservan las posiciones vigentes** en q03 (nota oficial de NC-BC de 20-nov-2025) y q22 (Campos, 31-oct), porque el
  programa no trata esas medidas o lo hace de forma menos directa sin contradecirlas.

## Antes y después (las 30 afirmaciones)

| Afirmación | Antes | Ahora | Página | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | +1 manifiesto UPC (3-nov) | +1 programa | 3 | fuente |
| q03 IVA/ITP primera vivienda | +1 nota NC-BC (20-nov-2025) | +1 (se conserva) | — | — |
| q31 Renovación del alquiler | null | **+2** programa | 3 | nueva |
| q04 Patrimonio permanente | +1 manifiesto UPC (3-nov) | **+2** programa | 12 | valor |
| q05 IRPF de dos tipos | null | **−1** programa | 11 | nueva |
| q06 Jornada de 37,5 h | null | **+1** programa (verificación: +2 → +1) | 7 | nueva |
| q32 SMI autonómico | null | null | — | — |
| q08 Jubilación a los 65 | null | null | — | — |
| q09 Prohibir pagar a la privada | +1 manifiesto UPC (3-nov) | +1 programa | 6 | fuente |
| q11 Retirar la concertada | null | null | — | — |
| q12 Castellano en las aulas | null | null | — | — |
| q13 Prioridad en vivienda social | null | null | — | — |
| q15 Otra regularización | null | null | — | — |
| q33 Reparto de menores | −1 manifiesto UPC (3-nov) | −1 programa | 16 | fuente |
| q16 Referéndum pactado | null | **+1** programa | 16 | nueva |
| q17 Concierto para quien lo pida | null | null | — | — |
| q18 Asumir 83.000 M de deuda | null | null | — | — |
| q19 Eólica marina | null | null | — | — |
| q36 Alargar las nucleares | null | null | — | — |
| q21 Aborto en la Constitución | null | **+1** programa | 18 | nueva |
| q22 Suprimir Igualdad | −1 Campos (31-oct) | −1 (se conserva) | — | — |
| q23 Desalojo en 48 h | null | null | — | — |
| q24 Derogar la ley mordaza | null | null | — | — |
| q35 Ampliar la prisión permanente | null | null | — | — |
| q25 Indultos por corrupción | null | null | — | — |
| q26 Defensa al 3,5 % | null | null | — | — |
| q27 Ejército en Ceuta | null | null | — | — |
| q34 Referéndum en el Sáhara | +1 manifiesto UPC (3-nov) | +1 programa | 19 | fuente |
| q29 Frenar Mercosur | null | null | — | — |
| q30 Precio máximo de alimentos | null | null | — | — |

Resumen: 10 celdas en g21. 5 nuevas (q05, q06, q16, q21, q31), 1 cambio de valor (q04 sube) y 4 solo de fuente (q01, q09,
q33, q34). Cobertura de `upc`: 7 → 12 posiciones (10 de programa y 2 de campaña), comprobado aplicando g21 con una verificación
provisional en una copia (ningún otro partido cambia). Valores finales: +2 ×2, +1 ×7, −1 ×3; null en las 18 restantes.

## Valores: razonamiento

- **q01 (+1, cambia la fuente).** Eje 1 (p. 3): «la intervención del Estado en el mercado de la vivienda» con «el control de
  precios de venta y alquiler» para «impedir las subidas abusivas». Ya no lo limita a las zonas tensionadas, pero no habla de un
  precio máximo legal ni de su alcance estatal sin las comunidades: +1, como Compromís y el PSOE.
- **q31 (null → +2).** Eje 1 (p. 3): renovación automática de los contratos de vivienda habitual al terminar el periodo
  inicial, por periodos de cinco o siete años según el propietario. Es la afirmación, de forma expresa: +2.
- **q04 (+1 → +2).** Eje 9 (p. 12): mantener «de forma permanente» el impuesto a las grandes fortunas y reforzar su
  progresividad. Permanencia expresa: +2, como ERC, el BNG, Podemos y el Frente Amplio.
- **q05 (null → −1).** Eje 9 (p. 11): más tramos del IRPF estatal desde 120.000 € con tipos marginales crecientes. Lo
  contrario de dos tipos, sin rechazarlo de forma expresa: −1, como Podemos, el Frente Amplio y Adelante Andalucía.
- **q06 (null → +1 tras la verificación; el análisis proponía +2).** Eje 3 (p. 7): «regular la jornada de 37,5 horas semanales» y avanzar hacia las 34. Es la cifra de la
  afirmación, propuesta de forma expresa y destacada en el resumen oficial del eje: +2, como el PSOE, ERC y el Frente Amplio.
  Ver duda 1.
- **q09 (+1, cambia la fuente).** Eje 2 (p. 6): derogar la Ley 15/1997 «para evitar la privatización de los servicios
  sanitarios», y gestión «prioritariamente directa» (p. 5). No prohíbe los conciertos: +1, como el Frente Amplio y EH Bildu.
- **q33 (−1, cambia la fuente).** Eje 13 (p. 16): «una distribución solidaria de las responsabilidades de acogida» de los
  menores no acompañados, la misma frase del manifiesto. Sin decir que sea obligatoria: −1, como el Frente Amplio.
- **q16 (null → +1).** Eje 11 (p. 16): «La coalición comparte la defensa de la soberanía popular, del derecho a decidir
  democráticamente y del derecho universal de los pueblos a la autodeterminación», y Canarias «como sujeto político» (p. 15).
  Sin referéndum pactado ni territorio concreto: +1, como Ara Més y EH Bildu. Ver duda 3.
- **q21 (null → +1).** Eje 14 (p. 18): «Estudiar la posibilidad de blindar el derecho al aborto en la Constitución, como ha
  hecho Francia». A favor, pero como estudio y no como propuesta: +1. Ver duda 2.
- **q34 (+1, cambia la fuente).** Eje 16 (p. 19): solidaridad con el pueblo saharaui «en sus luchas por la autodeterminación e
  independencia». Sin pronunciarse sobre la política del Gobierno: +1, como con el manifiesto.

## Se conservan las posiciones vigentes

- **q03 (+1, nota de NC-BC de 20-nov-2025).** El programa no habla de impuestos en la compra de la primera vivienda: propone
  ayudas a la compra, con una «hipoteca al 0 % hasta 100.000 euros, sin límite de edad» (p. 4), y más deducción del IRPF por
  alquiler o hipoteca (p. 12), medidas distintas.
- **q22 (−1, Campos, 31-oct).** El programa «exige al Estado el mantenimiento e incremento de las políticas de igualdad»
  (p. 17), sin hablar del ministerio.

## Siguen en null

- **q32.** El programa se opone a que el Gobierno pierda su papel en el SMI y lo sube a 1.800 € (p. 7); nada de salarios
  mínimos autonómicos.
- **q08.** Solo la jubilación anticipada sin penalización en sectores «especialmente duros y precarios» (p. 6): otra medida.
- **q11.** Educación pública de 0 a 3 años y control de las universidades privadas (p. 5); nada de la concertada.
- **q13.** «la limitación de compra de viviendas por extranjeros no residentes» (p. 4) es otra medida; nada de la vivienda
  social.
- **q15.** «las vías legales y seguras» (p. 16), sin regularización.
- **q17 y q18.** Defiende el REF fuera del sistema de financiación y una financiación «suficiente y justa» (p. 8); nada del
  concierto ni de asumir deuda autonómica.
- **q19.** Solo renovables con mínima ocupación del territorio y techos fotovoltaicos (p. 14).
- **q23.** Prohíbe la «desokupación extrajudicial» (p. 3) y que se desaloje a personas vulnerables, también por «ocupación en
  precario motivada por la falta de vivienda asequible», sin realojo (p. 4); no habla de plazos de desalojo. Mismo criterio que
  Podemos en g19 (otras medidas). Ver duda 4.
- **q24, q25, q26, q27, q29, q30, q35, q36, q12.** No las trata (la lucha contra la corrupción del eje 15 no habla de indultos;
  el refuerzo de medios «policiales y militares» de la p. 17 es para emergencias en Canarias, no para Ceuta).

## Dudas para el verificador y el editor

1. **q06 +2.** El programa no dice «sin rebaja salarial», a diferencia de la afirmación, ERC o el Frente Amplio. Se eligió +2
   porque propone la cifra exacta y de forma destacada. Alternativa: +1.
2. **q21 +1.** «Estudiar la posibilidad» puede leerse como falta de posición. Alternativa: null.
3. **q16 +1.** El derecho a decidir y la autodeterminación «de los pueblos» se formulan en general y la coalición incluye
   formaciones federales. Mismo listón que Ara Més y EH Bildu; alternativa: null.
4. **q23 null.** Exigir realojo antes de desalojar a ocupantes vulnerables choca con un desalojo en 48 horas para todos, pero es
   otra medida. Alternativa: −1 (programa).
5. **Atribución a Podemos y Frente Amplio.** Se aplica el precedente de g10 y g15 (documento conjunto, detrás de su programa).
   No cambia ninguna celda; queda anotado por si el editor quiere tratar de otro modo un documento conjunto que es también el
   programa de un partido.

## Comprobación del build

En una copia de `data/` y `pipeline/` del worktree (`scratchpad/chk_g21/`):

- sin verificación de g21, `python3 -I pipeline/build_fase1.py` lo omite y `fase1.json` sale idéntico al del repositorio;
- con un `verificacion_g21.json` provisional (`"aprobado": true`, solo en la copia), aplica g21: `upc` pasa de 7 a 12
  posiciones y ningún otro partido cambia; las 10 citas de programa pasan la comprobación literal.

Falta la verificación independiente (`verificacion_g21.json`), que no se ha escrito.


## Verificación independiente (20-nov)

9 celdas aprobadas y q06 corregida de +2 a +1: el programa no dice que la jornada de 37,5 horas sea sin reducción
salarial, que forma parte de la afirmación; los +2 (PSOE, ERC, Frente Amplio) lo dicen expresamente y, cuando falta una
parte de la afirmación, el criterio ha sido +1. Corrección aplicada: UPC 7 → 12 posiciones (10 de programa, 2 de campaña).
