# Auditoría de igual estándar — posiciones de campaña (12-nov-2026)

Alcance: las 48 posiciones con valor y fuente distinta de «programa» en `codificacion_g1/g2/g3.json`.
Se reabrió la fuente citada de cada una. Las 12 añadidas y verificadas hoy (`lideres_2026-11-12/verificacion.json`)
ya se habían revisado con estas mismas reglas, y se mantienen.

## Reglas aplicadas (las mismas para todos los partidos)

1. **Regla (a), primera persona.** El estilo indirecto del periodista no es una cita. La posición tiene que
   estar en palabras del líder, entre comillas, en una fuente primaria o de agencia. Vale una cita parcial
   cuando las palabras entrecomilladas llevan la posición y el medio nombra la medida: es el criterio de q22.
   No vale cuando lo entrecomillado es solo la justificación y la propuesta va en paráfrasis. Si la cita
   citada era indirecta, se buscó una literal en otra fuente; si no hay ninguna, null.
2. **Regla (b), declaraciones reactivas.** Si el líder critica la propuesta de un rival sin proponer nada
   propio, el valor es ±1, no ±2. Si propone él mismo la medida contraria, no es reactiva.
3. **Definición de líder (protocolo v2).** Candidato, cabezas de lista, dirección nacional o regional,
   portavoces y líderes autonómicos. Los documentos oficiales del partido para estas elecciones (notas,
   manifiesto) valen con `quien` = el partido.

## Resultado por partido

| Partido | Revisadas | Se mantienen | Corregidas | A null |
|---|---|---|---|---|
| PP | 2 | 2 | 0 | 0 |
| PSOE | 4 | 1 | 2 | 1 |
| PSC | 2 | 2 | 0 | 0 |
| Vox | 11 | 9 | 1 | 1 |
| Frente Amplio | 6 | 5 | 0 | 1 |
| Podemos | 10 | 5 | 3 | 2 |
| Compromís-Front Valencià | 6 | 4 | 1 | 1 |
| Ara Més–Front Ampli | 1 | 1 | 0 | 0 |
| UPC | 3 | 3 | 0 | 0 |
| Junts | 2 | 2 | 0 | 0 |
| EH Bildu | 1 | 1 | 0 | 0 |
| **Total** | **48** | **35** | **7** | **6** |

Posiciones conocidas tras la auditoría (`build_fase1.py`, de 30): PP 15, UPN 0, PSOE 3, PSC 2, Vox 10,
SALF 16, Frente Amplio 5, Podemos 8, Compromís 5, Ara Més 1, UPC 3, Adelante Andalucía 0, ERC 11, Junts 2,
EH Bildu 1, PNV 0, BNG 15, CC 1.

## Cambios (todos anotados en `verificacion_g*.json`, «cambios»)

**PSOE**
- **q05: −2 → −1 (regla b).** Arcadi España critica la propuesta de IRPF de Vox, con frases literales, sin
  proponer nada propio. Es la misma vara que en q22 y q13. Cuenta como líder: es miembro de la Ejecutiva
  Federal, ministro de Hacienda y nº 2 por Valencia.
- **q10: +2 → null (regla a).** El compromiso del 7 % del PIB solo consta en estilo indirecto (Infobae/EP,
  Redacción Médica, Demócrata). Se recuperará si lo recoge el programa del PSOE.
- **q21: +2, cambia la cita.** EFE (Granada) y Demócrata/EP (Bilbao) traen la reforma constitucional en
  estilo indirecto. Se usa Diari de Tarragona (7-nov), que pone entre comillas «blindar el derecho al
  aborto», en la Constitución. El compromiso se repite en tres actos: +2.

**Vox**
- **q05: +2, cambia la cita.** 101TV Sevilla no tiene ni un entrecomillado. Se usa la cita literal de
  Figaredo en elDiario.es: «un mínimo exento de 22.000 euros. Hasta 70.000 euros se tributaría al 15% y de
  70.001 en adelante al 25%. Sencillo». La fecha es el 7-oct (Hacienda responde «en el segundo día de
  precampaña»).
- **q07: +2 → null (regla a).** La cuota cero para autónomos solo consta en estilo indirecto (101TV). Las
  citas literales sobre el tema son de 2024, fuera de plazo.

**Frente Amplio**
- **q06: +1 → null (regla a).** «Reducir la jornada» es paráfrasis de Europa Press. Lo literal de Delgado
  («aprovechamos la tecnología para trabajar menos y vivir mejor») no habla de jornada ni de horas. Es el
  mismo caso que Podemos q06.

**Podemos**
- **q01: +2 → +1 (regla a).** «Rebajar los alquileres por ley» es de elDiario.es. Lo literal de Montero es
  «bajar el precio de los alquileres», como prioridad de negociación, sin ley estatal ni alcance general. Es
  la misma vara que Compromís, Ara Més y UPC (+1).
- **q02: +1, cambia la cita.** Se usa la frase literal en elDiario.es: «Podemos expropiar el uso de las
  viviendas que, por miles, acumulan los fondos buitre».
- **q06: +1 → null (regla a).** Las 30 horas solo constan en paráfrasis. Lo literal («la vida está para algo
  más que trabajar») es la justificación. podemos.info devuelve 403 y no hay copia de una nota oficial.
- **q08: +1 → null (regla a).** La jubilación a los 63 solo consta en estilo indirecto (Infobae/EP,
  Demócrata).
- **q26: −2, cambia la cita.** Se usa la frase literal de la misma crónica: «Se puede hacer simplemente si
  decidimos que el dinero que este Gobierno… está gastando en armas se gaste en cuidar la vida de la gente».
  Es una propuesta propia y central, no reactiva: −2.

**Compromís-Front Valencià**
- **q02: +2 → null (regla a y definición de líder).** EFE atribuye la expropiación «a los candidatos» en
  estilo indirecto. La ley la pide Ibáñez (nº 2, no es líder). En Alicante Plaza la frase es del periodista.
  No hay cita de Micó.
- **q18: +2 → +1 (igual estándar con PSC q18).** «La condonación de la deuda» va en una lista de
  prioridades, referida a la deuda valenciana, sin cifra ni la quita general.

## Casos límite que se mantienen

- **Vox q13 y q27.** Citas parciales de agencia en las que lo entrecomillado es la propuesta misma:
  «prioridad nacional», «los primeros»; «militarizada y reforzada estructuralmente».
- **Vox q29: +1.** «Iba contra los intereses» de agricultores y ganaderos es una valoración literal del
  acuerdo con Mercosur, que el medio nombra. No hay otra cita de campaña: las de febrero y marzo son
  anteriores a la convocatoria.
- **Vox q15 (−2) y Podemos q26 (−2).** Ambos incluyen una crítica al Gobierno, pero la posición se apoya en
  una propuesta propia, expresa y central: repatriar a quien entra ilegalmente, y pasar a gasto social el
  aumento del gasto militar. La regla (b) no se aplica a ninguno de los dos.
- **Compromís q30.** «Topar el precio de la energía y los alimentos básicos» va entre comillas como palabras
  de Micó.
- **PP q22 y q28, Vox q03 y q14, Junts q17, Compromís q01, q13 y q21, Frente Amplio q13, Podemos q04 y q30.**
  Las citas son literales en la fuente citada.
- **Documentos oficiales (sin cambios).** Frente Amplio q02, q04 y q08 (notas en frenteamplio.info), Ara
  Més q01 (nota oficial) y UPC q01, q04 y q09 (manifiesto).

Comprobaciones: `build_fase1.py` sin errores, `verify_quotes.py` con 1394 citas y 0 no encontradas, y 10
tests OK.
