# g5: barrido de campaña del 13-nov, verificado

Origen: `barrido_2026-11-13/posiciones_a.json` (UPN, PSC, PNV, EH Bildu) y `posiciones_b.json` (Ara Més, Compromís, CC, NC-BC), con sus notas `notas_a.md` y `notas_b.md`. Verificación independiente en `verificacion_g5.json` (aprobado). Posiciones publicables en `codificacion_g5.json`.

## Resultado

Revisadas 32: 27 posiciones nuevas, 2 candidatas a sustitución y 3 dudosas sin valor.

- **Aprobadas:** 21. Ningún valor corregido; se corrigieron `quien`, `formato` y las notas públicas.
- **Rechazadas:** 8. Siete posiciones nuevas pasan a null y una sustitución no se aplica.
- **Dudosas:** las 3 se confirman sin valor.

| Partido | Antes | Aprobadas en g5 | Rechazadas | Después |
|---|---|---|---|---|
| UPN | 0 | q35 +2, q29 +1, q32 +1, q01 −1, q11 −1 | q15 | 5 |
| PSC | 3 | q16 −1, q22 −1 | (dudosa q12) | 5 |
| PNV | 7 | — | q16 (dudosa q23) | 7 |
| EH Bildu | 10 | q23 −1, q29 +1, q16 +1 | sustitución de q32 (+1 → +2) | 13 |
| Ara Més | 2 | q30 +2, q31 +2, q29 +1, q12 +1, q24 +1, q13 −1 | q06 | 8 |
| Compromís | 10 | q06 +1, q33 −1, q09 +1; q24 +1 → +2 (sustitución) | q29 | 13 |
| CC | 4 | — | q29, q17 | 4 |
| NC-BC | 5 | q03 +1 | q31 | 6 |

## Motivos de los rechazos

- **UPN q15.** Ibarrola critica el decreto, pero dice «El problema no es la medida, sino cómo se ha hecho». No es un rechazo inequívoco de repetir la regularización.
- **PNV q16.** El «derecho a decidir pactado» de la enmienda no habla de referéndum ni de independencia. Además, la enmienda al art. 2 del mismo documento mantiene «la indisoluble unidad de la Nación española».
- **Ara Més q06.** Es una nota de MÉS per Palma, la organización local, sobre una moción municipal. Quien habla es la portavoz local, no una líder reconocida del partido.
- **Compromís q29 y CC q29.** Lo posterior es más suave y prevalece:
  - Compromís: el pacto de campaña con La Unió (5-nov) pide salvaguardas y aranceles.
  - CC: el programa del 29-N (8-nov) pide evaluar el impacto y salvaguardas «cuando proceda».
- **CC q17.** El rechazo a la financiación bilateral con Cataluña trata del reparto del sistema común, no del concierto. Además, en julio de 2026 el Gobierno de Canarias de Clavijo pactó su apoyo a esa reforma.
- **NC-BC q31.** Pide convalidar dos decretos de vivienda sin mencionar la renovación de los contratos.
- **EH Bildu q32 (sustitución).** La nota del 13-nov tiene la misma limitación por la que la posición vigente es +1: no dice que el salario mínimo propio deba estar por encima del estatal. Se mantiene +1.

## Comprobación de fuentes

Se volvieron a descargar las 32 fuentes con peticiones normales. Todas las citas son literales, tanto en el original como en la copia local.

Excepciones:
- **socialistes.cat:** los artículos dan 403 y no se sorteó.
  - PSC q22 se comprobó en el RSS oficial descargado hoy.
  - La dudosa PSC q12 solo pudo comprobarse en la copia local.
- **frontvalencia.org:** el HTML actual añade un espacio antes del punto.
- **PSC q16:** no se pudo cotejar con el Diari de Sessions del Parlament, así que se usa la crónica de NacióDigital con cita literal.

## Para el editor

Las alternativas de valor están en `verificacion_g5.json`, apartado «dudas»:
- EH Bildu q29: portavoz de comisión en el Parlamento de Navarra.
- UPN q32: +1 o 0.
- Ara Més q31 y Compromís q24: +2 o +1.
- EH Bildu q16: +1 o null.
- CC q17: null o −1.

**Documentos conjuntos (aplicado).** Se aplicó la regla de documentos conjuntos a las posiciones aprobadas que salen de un documento de coalición. Son tres: Ara Més q30 y q31 (notas de Ara Més–Front Ampli) y Compromís q06 (web de Compromís: Front Valencià). El registro está en `verificacion_g5.json`, bloque «reatribucion_2026-11-13b».
- **Añadidas a Frente Amplio:**
  - q30 +2 (nota de Ara Més–Front Ampli del 7-nov).
  - q06 +1 (web de Compromís: Front Valencià, que firma EUPV).
- **Sin cambios:**
  - Frente Amplio q31: ya tenía +2 propio (Bustinduy, 12-nov).
  - Podemos q06: ya tenía +1 propio (web de Montero, 20-oct).
  - ERC q06: su programa da +2 y va primero.
- **Recuento de Frente Amplio:** pasa de 14 a 16.

**Test que fallará al publicar.** `tests/test_pipeline.py::test_sin_posiciones_heredadas` exige que UPN no tenga posiciones en `web/public/data/fase1.json`. Fallará cuando `build_web.py` publique las 5 posiciones propias de UPN.
