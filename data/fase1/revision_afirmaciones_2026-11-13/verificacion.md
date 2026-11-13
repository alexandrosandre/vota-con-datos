# Verificación independiente de la revisión de afirmaciones (13-nov-2026)

Revisa `propuesta.json` e `informe.md` de esta carpeta. No modifica ningún fichero existente.

- El detalle de cada posición está en `verificacion.json`.
- Las fuentes nuevas que encontró la verificación están en `data/sources/fase1/revision_2026-11-13/verificacion/<partido>/`.

## Resumen

**Parte A: posiciones.** Se revisaron las 32 posiciones con valor (31 nuevas y la de Junts en q12).
- Las 32 citas son literales: se comprobaron con la normalización de `verify_quotes.py`.
- Los 32 sha256 coinciden con sus copias locales.
- Resultado: **29 se confirman, 2 se corrigen y 1 se rechaza.**
  - **Se corrige PP q33.** El programa sí habla del reparto, contra lo que dice la nota del codificador. Pasa a +1 con fuente programa.
  - **Se corrige PSOE q33.** Se mantiene −1, pero con una cita literal completa en lugar de la paráfrasis del periodista.
  - **Se rechaza SALF q34.** El programa no habla de referéndum y se queda en null.
- Hay **3 posiciones nuevas válidas**:
  - **PSOE q34: −1.** Sánchez defiende el plan de autonomía el 8-nov.
  - **Podemos q27: −1.** Montero rechaza «militarizar las fronteras» en Ceuta.
  - **Junts q32: +1.** Una nota oficial reclama la competencia sobre el salario mínimo.
- Hay **1 posición condicionada:** Vox q35 sería +2 si se cataloga el programa de Vox.
- Queda **1 decisión pendiente:** si las declaraciones de Feijóo cuentan para UPN.

**Parte B: diseño.** La revisión mejora la cobertura, pero aplica de forma desigual su propio criterio para quitar afirmaciones:
- Quita q02, q14 y q27 porque «todos los que tienen posición están a favor».
- Sin embargo, mantiene otras 10 afirmaciones en la misma situación y añade q32, que tampoco tiene a nadie en contra.
- Con las posiciones nuevas, **q27 ya tiene a un partido en contra (Podemos) y conviene mantenerla.**
- **q34 sí es válida**, porque el partido del Gobierno está en contra.

**Recomendación:**
- **Quitar:** q02, q07, q10, q14 y q28.
- **Mantener:** q27.
- **Añadir:** q31 a q35.

Con este conjunto, la diferencia entre afirmaciones progresistas y conservadoras es de 3 (13 frente a 10), no de 5 como en la propuesta del analista. La cobertura media es de 7,7 por partido, la misma que en su propuesta. Hay una alternativa si se quiere conservar q10 (sanidad); se explica en el apartado 4.

## 1. Parte A: hallazgos que cambian algo

| Posición | Propuesta | Verificación | Motivo |
|---|---|---|---|
| PP q33 | +2 (Sémper, campaña) | **+1, programa, p. 24** | El programa dice: «Sustituiremos el reparto como respuesta principal por un modelo de protección individualizada con retorno». El programa prevalece sobre el líder, y la expresión «como respuesta principal» es un matiz expreso. |
| PSOE q33 | −1 (cita parcial con paráfrasis) | **−1, cita nueva** | Torres, en la misma pieza: «Ellos desean, quieren y han votado que se queden en los territorios de frontera. Tomen nota los canarios y las canarias». Hay que corregir `quien`: Torres no es candidato según las listas del BOE. |
| SALF q34 | +1 | **null** | «Se retira la carta de Sánchez» y «Vuelta a la posición de la ONU» no mencionan el referéndum. Desde la resolución 2797, la posición de la ONU toma como base el plan de autonomía. Es la misma neutralidad que el PP, que está en null. |
| PSOE q34 | null | **−1** | Sánchez, 8-nov (Demócrata/EP, con transcripción literal): la autonomía «dentro de Marruecos» puede ser «la solución más factible». |
| Podemos q27 | null | **−1** | Montero, 6-nov (El Faro de Ceuta): rechaza «militarizar las fronteras» y culpa de los abusos a los militares desplegados en Ceuta. Es un caso límite. |
| Junts q32 | null | **+1** | Nota oficial de junts.cat (21-oct): «Junts reclama la competència per fixar el salari mínim interprofessional». |
| Vox q35 | null | **+2, condicionado** | Medida 81 del programa «Es sentido común»: «Ampliación de la prisión permanente revisable». El PDF completo está en democrata.es y coincide con tres resúmenes de prensa. Cuenta solo si el editor cataloga ese PDF como programa oficial. |

**Los seis casos que marcó el analista:**
- **Junts q31: −1 confirmado.** Cruset habla del decreto «que entraba en vigor el 15 de noviembre», que es el de la renovación automática.
- **PSOE q31: +1 confirmado.** En la misma entrevista, Sánchez dice que lo llevará en el programa: puede subir a +2 cuando se publique el 15-nov.
- **PSOE q33:** se corrige la cita (ver la tabla).
- **ERC q31: +1 confirmado.** Es un caso límite: solo para grandes tenedores y en el Código civil catalán.
- **EH Bildu q32: +1 confirmado.**
- **SALF q34:** se rechaza (ver la tabla).

**Errores en las notas, sin cambio de valor:**
- **PP q31:** la nota dice que el programa no trata la prórroga. La medida 156, «TRES AÑOS+», incentiva la renovación voluntaria.
- **PNV q31:** la nota dice «cabeza de lista por Bizkaia». Vaquero es la nº 1 por Gipuzkoa.
- **Vox q35:** la nota dice «sería −2», pero con la redacción actual sería +2.
- **Informe del analista:** cuenta q12 con 5 partidos «antes», pero tenía 4. Por eso las afirmaciones con menos de 5 partidos eran 24 y no 23.

**Decisión pendiente: UPN.** La nota oficial de UPN del 13-oct nombra a Feijóo candidato de la coalición.
- Si se aceptan sus citas literales, UPN tendría −1 en q31 y +2 en q35.
- Se recomienda dejarlas en null, salvo que el editor cambie de forma expresa el criterio de `seleccion.json` (las posiciones del PP no se trasladan a UPN). Si lo cambia, debe aplicarlo a las 30 afirmaciones por igual.
- La cabeza de lista de UPN, San Martín, solo consta en estilo indirecto.

## 2. Parte B: las afirmaciones nuevas

**q31 (renovación automática del alquiler). Se recomienda incluirla.**
- Es concreta, tiene una sola idea y es la que más partidos enfrenta (10, con 7 a favor y 3 en contra).
- El contexto es correcto: artículos 9 y 10 de la LAU, con 5 o 7 años y prórroga anual hasta 3 años más.
- Le falta un dato vigente: el decreto convalidado el 12-nov (RDL 29/2026) da una prórroga extraordinaria de hasta dos años a los contratos que terminan antes del 31-12-2028.
  - Sin ese dato, «Hoy los contratos…» queda incompleto.
  - Propuesta de frase para añadir: «Otro decreto convalidado el 12 de noviembre permite al inquilino pedir una prórroga extraordinaria de hasta dos años si su contrato vence antes de 2029».

**q32 (salario mínimo autonómico). Se puede incluir, con reservas.**
- El contexto es correcto: artículo 27 del Estatuto de los Trabajadores.
- No hay ningún partido en contra (6 a favor, 0 en contra). Para un votante, solo separa a los partidos nacionalistas de los partidos sin posición. Discrimina tan poco como q02 o q14.
- Se acepta porque es la única afirmación que da posición a la vez a PNV, EH Bildu, Ara Més y Junts, y porque no hay otra mejor.
- Hay que decir esta limitación en el informe y no presentarla como mejora de discriminación.

**q33 (reparto obligatorio de menores). Se recomienda incluirla.**
- La redacción es neutral («suprimir» un mecanismo vigente, sin negación explícita).
- El contexto es correcto en lo esencial: RDL 2/2025, artículos 35 bis y 35 ter. Se puede precisar que la contingencia se declara cuando la ocupación triplica la capacidad ordinaria de acogida.
- Tiene posiciones enfrentadas: PP +1 frente a CC, PSOE, UPC y AA.

**q34 (Sáhara). Se recomienda incluirla ahora, con un ajuste en el contexto.**
- Ahora el partido del Gobierno está en contra (PSOE −1), así que discrimina: hay 5 a favor y 1 en contra.
- La resolución 2797 (31-oct-2025, 11 votos a favor y 3 abstenciones, tomando como base el plan marroquí) está confirmada en coberturas secundarias: Deia, Orain y CIDOB. El enlace de docs.un.org no se pudo leer por JavaScript.
- Hay un hecho nuevo que el contexto no recoge. Según noteolvidesdelsaharaoccidental.org (8-nov), a finales de octubre de 2026 el Consejo de Seguridad no aprobó el proyecto de EE. UU. y el mandato de la MINURSO quedó sin renovar.
  - Antes de publicar hay que confirmarlo en una fuente oficial o de agencia.
  - Si se confirma, el contexto debe decirlo, porque cambia lo que significa hoy «el referéndum que la ONU previó en 1991».
- Las posiciones de CC (+1) y UPC (+1) son casos límite pero coherentes entre sí. La de SALF se queda en null.

**q35 (prisión permanente revisable). Se recomienda incluirla.**
- El contexto es correcto: artículos 140 y 92 del Código Penal, con revisión a partir de los 25 años.
- Tiene posiciones enfrentadas: 2 a favor y 3 en contra, o 3 a favor si se cataloga el programa de Vox.

## 3. Parte B: las afirmaciones que se quitan

El analista quita q02, q14 y q27 porque todos los partidos con posición están a favor. Ese criterio no se aplica igual al resto del cuestionario:
- En el conjunto que propone siguen 12 afirmaciones en las que todos los partidos con posición están del mismo lado: q03, q06, q08, q10, q21, q24, q25, q26, q29, q30, q32 y q34 (esta última antes de añadir al PSOE).
- Que una afirmación tenga un solo lado se debe a que faltan datos de los demás partidos, no a un defecto de la afirmación.
- Se buscaron posiciones en contra de q02, q14 y q27 en el corpus local, en los programas y en la web.

**Resultado de cada una:**
- **q27 (Fuerzas Armadas en Ceuta): mantenerla.** Podemos queda en −1, así que tiene 4 partidos con posiciones enfrentadas.
  - Es la afirmación conservadora más ligada a un hecho de esta campaña: la crisis de Ceuta. El programa de Vox también plantea «militarizar las fronteras de Ceuta y Melilla».
  - Si se quita, el desequilibrio de polaridad aumenta.
- **q02 (expropiación): se puede quitar.** No hay posiciones en contra válidas. El motivo correcto no es que tenga un solo lado, sino que Vivienda tendría 4 afirmaciones y q31 cubre el mismo electorado con 10 partidos.
- **q14 (penas en el país de origen): se puede quitar.** No hay posiciones nuevas. Inmigración se queda en 3 con q33.
- **q07 y q28: se pueden quitar.** Tienen 2 partidos y 1 partido. Medio rural se queda solo con q29. Es una carencia conocida que habrá que revisar cuando lleguen los programas del PSOE y de UPN-PP.

**Afirmación que se quita a cambio de mantener q27: q10 (gasto sanitario del 7 % del PIB).**
- La auditoría de redacción ya la marcó como cercana al consenso.
- Sus 4 partidos (Podemos, AA, ERC y BNG) son de los que tienen más cobertura, así que la pérdida no afecta a los partidos con poca cobertura.
- Además corrige la polaridad, porque es una afirmación progresista.

**Alternativa:** mantener q10 y no añadir q34.
- Sanidad conservaría 2 afirmaciones.
- Pero PSOE, CC y UPC perderían una posición cada uno, y CC se quedaría en 2.

## 4. Conjunto final recomendado

- **Se quitan:** q02, q07, q10, q14 y q28.
- **Se añaden:** q31, q32, q33, q34 y q35.
- **Se mantiene:** q27.
- **Cambios en las posiciones:**
  - Correcciones: PP q33 a +1 y la nueva cita de PSOE q33.
  - SALF q34 queda en null.
  - Se añaden PSOE q34 (−1), Podemos q27 (−1), Junts q32 (+1) y Junts q12 (+1).
  - Vox q35 (+2) solo si se cataloga su programa.

**Polaridad:**

| | Progresista | Conservadora | Territorial | Neutral | Diferencia |
|---|---|---|---|---|---|
| Antes | 13 | 11 | 4 | 2 | 2 |
| Propuesta del analista | 14 | 9 | 5 | 2 | 5 |
| Recomendado | 13 | 10 | 5 | 2 | 3 |

**Temas:**
- Con 3 afirmaciones: Vivienda, Inmigración, Modelo territorial, Seguridad y justicia, Exterior y defensa.
- Con 2: Fiscalidad, Empleo y salarios, Educación, Energía y clima, Igualdad y derechos.
- Con 1: Pensiones, Sanidad, Instituciones, Medio rural y Economía.

**Cobertura por partido** (posiciones con valor, de 30):

| Partido | Antes | Analista | Recomendado |
|---|---|---|---|
| PP | 15 | 15 | 16 |
| UPN | 0 | 0 | 0 (2 si se acepta Feijóo) |
| PSOE | 3 | 5 | 6 |
| PSC | 3 | 3 | 3 |
| Vox | 10 | 8 | 9 (10 si se cataloga su programa) |
| SALF | 16 | 15 | 15 |
| Frente Amplio | 5 | 5 | 5 |
| Podemos | 9 | 8 | 8 |
| Compromís | 5 | 6 | 6 |
| Ara Més | 2 | 3 | 3 |
| UPC | 3 | 5 | 5 |
| Adelante Andalucía | 18 | 20 | 19 |
| ERC | 11 | 14 | 13 |
| Junts | 2 | 4 | 5 |
| EH Bildu | 1 | 3 | 3 |
| PNV | 0 | 3 | 3 |
| BNG | 15 | 18 | 17 |
| CC | 1 | 3 | 3 |
| **Media** | **6,6** | **7,7** | **7,7** |

**Cobertura por afirmación** (partidos con posición; a favor/en contra):

| id | Tema | Partidos | A favor/en contra |
|---|---|---|---|
| q01 | Vivienda | 7 | 6/1 |
| q03 | Vivienda | 4 | 4/0 |
| q04 | Fiscalidad | 7 | 6/1 |
| q05 | Fiscalidad | 4 | 2/2 |
| q06 | Empleo y salarios | 4 | 4/0 |
| q08 | Pensiones | 3 | 3/0 |
| q09 | Sanidad | 4 | 3/1 |
| q11 | Educación | 4 | 2/2 |
| q12 | Educación | 5 | 2/3 |
| q13 | Inmigración | 3 | 1/2 |
| q15 | Inmigración | 4 | 1/3 |
| q16 | Modelo territorial | 4 | 3/1 |
| q17 | Modelo territorial | 6 | 3/3 |
| q18 | Modelo territorial | 6 | 4/2 |
| q19 | Energía y clima | 2 | 1/1 |
| q20 | Energía y clima | 3 | 1/2 |
| q21 | Igualdad y derechos | 4 | 4/0 |
| q22 | Igualdad y derechos | 6 | 3/3 |
| q23 | Seguridad y justicia | 4 | 3/1 |
| q24 | Seguridad y justicia | 4 | 4/0 |
| q25 | Instituciones | 3 | 3/0 |
| q26 | Exterior y defensa | 3 | 0/3 |
| q27 | Exterior y defensa | 4 | 3/1 |
| q29 | Medio rural | 4 | 4/0 |
| q30 | Economía | 5 | 5/0 |
| q31 | Vivienda | 10 | 7/3 |
| q32 | Empleo y salarios | 6 | 6/0 |
| q33 | Inmigración | 5 | 1/4 |
| q34 | Exterior y defensa | 6 | 5/1 |
| q35 | Seguridad y justicia | 5 | 2/3 (3/3 con Vox) |

**Comparación de los tres conjuntos:**

| | Antes | Analista | Recomendado |
|---|---|---|---|
| Afirmaciones con menos de 5 partidos | 24 | 18 | 18 |
| Afirmaciones con todos los partidos del mismo lado | 15 | 12 | 10 |

## 5. Antes de integrar

1. **Confirmar la MINURSO y actualizar el contexto de q34.** Hay que verificar en una fuente oficial o de agencia lo que cuenta noteolvides: que en octubre de 2026 no se aprobó el proyecto de EE. UU. y el mandato no se renovó.
2. **Añadir la prórroga extraordinaria al contexto de q31**, la del RDL 29/2026.
3. **Decidir si se cataloga el programa de Vox.** Sería en `partidos.json`, con el PDF en `verificacion/vox/`. Si se cataloga, recodificar Vox en las 30 afirmaciones.
4. **Decidir el criterio para UPN.**
5. **Recodificar el PSOE con su programa del 15-nov**, sobre todo q31 y q34.
