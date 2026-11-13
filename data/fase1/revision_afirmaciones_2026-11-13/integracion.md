# Integración de la revisión de afirmaciones (13-nov-2026)

Decisión final del editor sobre `propuesta.json` (analista) y `verificacion.json` (verificador), ya aplicada en
`preguntas.json`, `codificacion_g*.json`, `verificacion_g*.json` y `fase1.json`.

## Decisiones

- **Se retiran q02, q07, q10, q14 y q28.** Pasan a la lista `retiradas` de `preguntas.json`, con fecha, motivo y los
  partidos que tenían posición. Sus celdas siguen en `codificacion_g*.json` como historial; `build_fase1.py` ya no las
  publica porque no están en `preguntas`. Sus ids no se reutilizan.
- **Se mantiene q27** (recomendación del verificador): con Podemos en contra (−1) ya tiene posiciones enfrentadas. En su
  lugar se retira q10.
- **Se añaden q31 a q35**, cada una al final de su tema en el orden del cuestionario.
- **Posiciones:** todas las confirmadas por la verificación, más sus correcciones y hallazgos:
  - PP q33: +1 con el programa (medida 46, p. 24), no +2 con Sémper.
  - PSOE q33: −1 con la cita literal completa de Torres; `quien` corregido.
  - SALF q34: null (el programa no habla de referéndum).
  - Nuevas: PSOE q34 −1, Podemos q27 −1, Junts q32 +1 y Junts q12 +1.
  - Notas corregidas sin cambio de valor: PP q31 (medida 156 «TRES AÑOS+»), PNV q31 (Vaquero es nº 1 por Gipuzkoa),
    PSOE q31 (respuesta siguiente de la entrevista).
- **UPN:** las citas de Feijóo no cuentan para UPN, porque no es su líder. UPN sigue en 0.
- **Vox q35:** null. Su programa solo está en democrata.es, no en una web oficial de Vox: mismo criterio que antes.

## Contextos comprobados en fuentes primarias

**q31 (alquiler).** BOE, petición normal a la API de datos abiertos:
- RDL 28/2026 (BOE-A-2026-20822): renovaciones obligatorias de 5 o 7 años e indemnización de al menos doce
  mensualidades; entrada en vigor prevista el 15-nov. La Diputación Permanente acordó **derogarlo** el 12-nov
  (BOE-A-2026-23754, BOE del 13-nov). Nunca entró en vigor.
- RDL 29/2026 (BOE-A-2026-20823), **convalidado** el 12-nov (BOE-A-2026-23755). En vigor desde el 8-oct. Su
  disposición final quinta da al inquilino al corriente de pago una prórroga extraordinaria de hasta dos años (contratos
  cuyo plazo obligatorio termina antes del 31-12-2028), salvo necesidad del propietario o nuevo contrato. Es incompatible
  con la de zonas tensionadas (art. 10.3 LAU, hasta tres años), que se aplica con preferencia.
- Texto consolidado de la LAU: art. 9 (5/7 años) y art. 10.1 (prórroga anual hasta tres años más) sin cambios en vigor.
  La versión del art. 10 del RDL 28 figura todavía con vigencia en blanco.
- Se añade al contexto la prórroga extraordinaria. Se precisa que el decreto de octubre fue derogado antes de entrar en
  vigor. La frase anterior («no lo convalidó el 12 de noviembre») era correcta.

**q34 (Sáhara).** Documentos de la ONU:
- El 30-oct-2026 el Consejo de Seguridad votó dos proyectos:
  - S/2026/868, de EE. UU.: 11 a favor, 1 en contra (veto de Rusia) y 3 abstenciones.
  - S/2026/870, de Rusia: 3 a favor, 1 en contra y 11 abstenciones.
- Fuentes: la transcripción de la sesión (transcripts.un.org/en/sc/10259) y la declaración del portavoz del Secretario
  General (peacekeeping.un.org, 31-oct).
- Según UN News (1-nov), el mandato de la MINURSO expiró a medianoche del 31-oct y la ONU sigue mediando a través del
  enviado personal.
- La resolución 2797 (2025) se leyó en el texto oficial en español (documents.un.org).
- Se añade al contexto una frase con esos hechos.

Las copias locales están en `data/sources/boe/` (los cuatro XML del BOE) y en
`data/sources/fase1/revision_2026-11-13/contexto/`.

| Fichero | sha256 |
|---|---|
| boe/BOE-A-2026-20822.xml | 1061087e76fd7a50bfad642bd2ac669ec7eebd0663d9b8fa515a2b29548ac1ac |
| boe/BOE-A-2026-20823.xml | 87f709e5d5f9de3a0b6ebe563b05e219ab4119f1441f2ce397db7274b7191ee6 |
| boe/BOE-A-2026-23754.xml | 0884195d9549af0d96a3ea3b99ca6802a8fcb07aecd4e32e42eb93456db21cdc |
| boe/BOE-A-2026-23755.xml | 6f708bb1846100be8296baa3c0c02ccc88e76593d247679bfc87636209d10fe6 |
| contexto/20251031_res_2797_es.txt | 352e85e5cc27bdea5274a432ad7d6b22024caf1ff80cb4e585711e559360508d |
| contexto/20261030_cs_sesion_10259_transcripcion.txt | 47bddf33a4aa135072e203c0e60f9009ecf9cc0abc2d47dd1a8856abc46453d3 |
| contexto/20261031_portavoz_sg_minurso.txt | 3e872bb58b0dfbb672939aa2c7a797eebe25a90a5848d719a02a3a718d4ad369 |
| contexto/20261101_unnews_minurso.txt | afde532e7c660042bb2aba4c27225832b28aebd245387c215969afdab2cb5440 |

## Resultado

Posiciones con valor, de 30 (antes → después):

| Partido | Antes | Después | Partido | Antes | Después |
|---|---|---|---|---|---|
| PP | 15 | 16 | Ara Més | 2 | 3 |
| UPN | 0 | 0 | UPC | 3 | 5 |
| PSOE | 3 | 6 | Adelante Andalucía | 18 | 19 |
| PSC | 3 | 3 | ERC | 11 | 13 |
| Vox | 10 | 9 | Junts | 2 | 5 |
| SALF | 16 | 15 | EH Bildu | 1 | 3 |
| Frente Amplio | 5 | 5 | PNV | 0 | 3 |
| Podemos | 9 | 8 | BNG | 15 | 17 |
| Compromís | 5 | 6 | CC | 1 | 3 |

- La media pasa de 6,6 a 7,7.
- Afirmaciones con menos de 5 partidos: de 24 a 18.
- Polaridad: 13 progresistas, 10 conservadoras, 5 territoriales y 2 neutrales.
- El detalle por afirmación coincide con la tabla del apartado 4 de `verificacion.md` (sin Vox en q35).

**Limitaciones:**
- q32 no tiene a nadie en contra.
- Medio rural queda con una sola afirmación (q29).
- Se repetirá la revisión tras el programa del PSOE (15-nov).

**Respuestas guardadas.** Las respuestas a afirmaciones retiradas siguen en el navegador de cada persona, pero ya no
cuentan:
- `afinidad()` recibe los ids vigentes.
- Inicio y Coincide cuentan solo las vigentes.
- «Continuar» lleva a la primera afirmación sin responder.
