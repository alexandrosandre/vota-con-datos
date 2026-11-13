# g6: Vox recodificado con su programa del 29-N (13-11-2026)

El programa de Vox para el 29-N («Es sentido común», 55 pp.) se publicó el 12-nov. Está catalogado en `partidos.json`
(entrada `vox`: URL en votasentidocomun.es, sha256 del PDF, texto en `data/sources/programas/vox/programa-elecct-vox.txt`).
Se leyó entero, página a página, y se recodificaron las 30 afirmaciones de `preguntas.json` según
`docs/prompts/2_codificacion_posiciones.md`.

- Las páginas son las del PDF; coinciden con la numeración impresa.
- Las páginas 1-4, 6, 12, 15, 18, 22, 27, 31, 34, 38, 43, 47, 52 y 55 son portada, índice, separadores o páginas en
  blanco, sin texto extraíble.
- Todas las citas pasan la comprobación literal de `build_fase1.py` y tienen 60 palabras o menos.

`codificacion_g6.json` solo contiene las posiciones que cambian o se añaden. En cada una:

- `sustituye`: la posición vigente hasta ahora, con el grupo del que procede.
- `motivo_cambio`: por qué cambia.

Verificado de forma independiente el 13-nov (`verificacion_g6.json`, aprobado): ver «Verificación» al final.

## Precedencia aplicada

- **El programa va primero.** Si el programa dice algo claro sobre la medida, sustituye a la fuente de campaña, aunque
  el valor coincida (como PP q03, q15, q23 y q25 en g1).
- **Programa menos concreto que la campaña.** Si el programa dice algo coherente con la campaña pero menos concreto, o
  solo un principio general del que habría que deducir la posición, se conserva la campaña. Es el mismo criterio que
  PP q22 («habrá menos ministerios») y PP q21.
- **Ninguna contradicción.** No hay ninguna celda en la que el programa contradiga a un líder.
- **Declaraciones posteriores al programa.** Solo una posición de campaña es del mismo día que el programa o posterior:
  q22 (Abascal, 12-nov, sobre el Ministerio de Igualdad). El programa no trata esa medida, así que se mantiene.

## Cambios (11)

| Afirmación | Antes | Ahora | Página | Tipo |
|---|---|---|---|---|
| q01 Tope estatal al alquiler | −1 campaña (Hernández Quero, 28-abr) | −1 programa | 19 | fuente |
| q03 IVA/ITP primera vivienda | +1 campaña (Cerezo, 24-oct) | +1 programa | 20 | fuente |
| q09 Prohibir pagar a la privada | null | −1 programa | 32 | nueva |
| q12 Castellano en las aulas | −1 campaña (Abascal, 25-oct) | −1 programa | 35 | fuente |
| q13 Prioridad en vivienda social | +2 campaña (Garriga, 11-oct) | +2 programa | 19 | fuente |
| q15 Otra regularización | −2 campaña (Abascal, 11-oct) | −2 programa | 13 | fuente |
| q23 Desalojo en 48 h | +2 campaña (Gordillo, 5-nov-2025) | +2 programa | 20 | fuente |
| q25 Renunciar a indultos por corrupción | null | +2 programa | 49 | nueva |
| q27 Fuerzas Armadas en la frontera de Ceuta | +2 campaña (Abascal, 12-oct) | +2 programa | 40 | fuente |
| q29 Frenar Mercosur en la UE | +1 campaña (Abascal, 4-nov) | **+2** programa | 28 | valor |
| q35 Ampliar la prisión permanente revisable | +2 campaña (Aizcorbe, 17-mar) | +2 programa | 39 | fuente |

Cobertura de Vox: 23 → 25 afirmaciones con valor. Simulado en una copia con g6 aprobado: `build_fase1.py` no da
errores.

## Se conservan las posiciones de campaña

En estas afirmaciones el programa habla del tema, pero no dice nada claro sobre la medida concreta:

- **q05 IRPF (+2, Figaredo).** «Simplificación y bajada del IRPF» y un tipo reducido según el número de hijos (medida 2,
  p. 7), sin el mínimo exento de 22.000 € ni los tipos del 15 y el 25 %. Va en la misma línea, pero es menos concreto.
  Se mantiene la campaña, igual que en PP q22.
- **q11 Concertada (−1, Armario).** «Garantizar la libre elección de centro educativo en todos los niveles […] sin que
  su situación económica o social sea un impedimento» (medida 67, p. 35). No nombra los conciertos ni su financiación.
- **q16 Referéndum (−2, Hoces).** Recuperar la sedición e ilegalizar a los partidos que atenten contra la unidad
  (medida 103, pp. 48-49). No habla de referéndum. El PP, que sí propone el delito de convocatoria de referéndum ilegal,
  tiene −1 por ser una oposición indirecta. Codificar con el programa bajaría a −1 una posición expresa sobre la medida.
- **q20 Emisiones (−1, Abascal).** Revertir las normas «inspiradas en el Pacto Verde Europeo» (pp. 9-10) y «Acabar con
  todas las imposiciones climáticas como el Pacto Verde» (medida 44, p. 25). No hay objetivo de emisiones. En SALF, el
  «veto al Pacto Verde» se trató como medida distinta (q20 null).
- **q21 Aborto en la Constitución (−2, Robles).** «Defensa del derecho a la vida desde su concepción hasta la muerte
  natural» (medida 98, p. 45). Es un principio general y no habla de la reforma constitucional. El PP también conserva
  su −2 de campaña en q21.
- **q33 Reparto de menores (+2, Armario).** «Devolución de menores extranjeros no acompañados a sus padres» (medida 15,
  pp. 13-14). No habla del reparto entre comunidades, que es lo que rechaza expresamente la moción de campaña.
- **q19 Eólica marina (−1, Figaredo).** «Impedir la destrucción de la riqueza agrícola […] para la instalación
  descontrolada de macro plantas de energías renovables, solar y eólica» (medida 54, p. 29). Se refiere al suelo
  agrícola, no al mar.
- **q30 Precio máximo de alimentos (−1).** El programa propone rebajar el IVA de los productos de primera necesidad
  (p. 7). Es una medida distinta.
- **q17 (−1), q18 (−2), q22 (+1), q24 (−1), q32 (−1) y q34 (+1).** El programa no dice nada sobre estas medidas. Las
  medidas 25 (igualdad de derechos «con independencia del lugar de España en el que residan») y 42 (unidad de mercado)
  son genéricas. «Reducción de la deuda pública» (p. 7) no trata la asunción de deuda autonómica. Reducir la
  Administración (medida 43) no nombra el Ministerio de Igualdad.

## Siguen en null

- **q04 Patrimonio.** Solo «Revisión y reducción sistemática de todos los impuestos y tasas» (p. 7), sin nombrar el
  impuesto. SALF, que lo suprime expresamente, tiene −2.
- **q06 Jornada de 37,5 h.** «Derogar la legislación laboral de Sánchez» (p. 11) no incluye la reducción de jornada,
  que el Congreso devolvió en 2025.
- **q08 Jubilación a los 65.** La medida 7 (p. 8) habla de la sostenibilidad de las pensiones, sin edad de jubilación.
- **q26 Defensa al 3,5 %.** «Aumento de la inversión en Defensa» (medida 89, p. 41), sin cifra. Es el mismo criterio
  que PP q26 y SALF q26 (null).
- **q31 Renovación del alquiler por cinco años.** El programa no trata la duración de los contratos.

## Dudas para el verificador

1. **q01 (−1 programa).** ¿Es «Derogación de la Ley de Vivienda» una posición inequívocamente indirecta sobre un tope
   estatal al alquiler? Esa ley es la que permite limitar rentas. Si no lo es, se conserva el −1 de campaña: el valor no
   cambia.
2. **q12 (−1 programa).** ¿−1 o −2? Se aplicó el criterio del PP (sin porcentaje ni mecanismo para exigirlo). A
   diferencia del PP, Vox no lo enmarca en el respeto a las lenguas cooficiales y lo pone en la primera medida de
   educación.
3. **q27 (+2 programa).** La cita (medida 88) cruza las páginas 40 y 41. El corte [...] salta el pie y la cabecera de
   página y la frase sobre las mafias. ¿+2 frente al +1 del PP y de SALF? Se puso +2 porque Vox propone un modelo
   permanente con las Fuerzas Armadas, sin condiciones, y la militarización de la frontera de Ceuta es la medida 1 del
   programa.
4. **q29 (+1 → +2).** Es el único cambio de valor. ¿«Rechazo explícito al acuerdo UE-Mercosur», junto con «VOX en el
   Gobierno será el representante del sector primario en Bruselas», equivale a pedir en la UE que se frene? Se aplicó
   el mismo criterio que a SALF («veto a Mercosur», +2).
5. **q09 (−1).** La colaboración público-privada es para reducir listas de espera y está condicionada. Se puso −1 y no
   −2, como en SALF.
6. **Conservadas de campaña aunque el programa toca el tema:** q05, q11, q16, q20, q21 y q33. Si el verificador lee la
   regla «el programa va primero» de forma más estricta, q16 y q21 bajarían de −2 a −1 por ser oposición indirecta. q05,
   q11 y q20 mantendrían el valor y cambiarían a fuente programa, o pasarían a null si el programa no se considera una
   posición.
7. **q35.** En g1 se dejó en null el 13-nov porque el PDF solo estaba en democrata.es. Ahora `partidos.json` cataloga
   como oficial la copia de votasentidocomun.es, enlazada desde voxespana.es. Conviene confirmar que el sha256 del PDF
   coincide (77d2158a…4567, comprobado aquí).

## Verificación (13-11-2026)

`verificacion_g6.json`: aprobado. Las 11 posiciones se confirman. Dos correcciones:

- **q20 pasa al programa (mismo −1).** La medida 8 (pp. 9-10) propone revertir los impuestos a las emisiones de CO2 y
  la prohibición de los motores de combustión. Es más concreta que la declaración de Abascal del 9-nov y del mismo tipo
  que PP q20. SALF q20 quedó en null porque su veto al Pacto Verde se justifica por el campo, no por las emisiones.
- **q27: cita completada** con el sujeto de la frase («Protección y defensa de las fronteras españolas. Establecer un
  nuevo modelo de protección permanente de las fronteras…»).

Criterio de precedencia de la verificación: el programa va primero cuando trata la medida al menos tan directamente
como la declaración de campaña. Si es menos concreto y no la contradice ni la matiza, se conserva la declaración (como
PNV q11, q15 y q21 en g4). Las demás conservadas (q05, q11, q16, q21, q33…) y los null se confirman.
