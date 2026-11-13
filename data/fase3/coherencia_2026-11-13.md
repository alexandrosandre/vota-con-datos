# Auditoría de coherencia tras el análisis del programa de Vox (Fase 3, 13-11-2026)

Alcance: las 12 propuestas del programa de Vox (`data/programas/vox/evaluacion.json`) y su complemento
(vox-c11 y vox-c12), comparadas criterio por criterio con las propuestas equivalentes de los demás
partidos, en las dos direcciones. Regla: mismos hechos, misma valoración; hechos distintos,
valoraciones distintas explicadas en el texto. Cada corrección figura en el `revision.json` del
partido, en `cambios`, con `fecha` 2026-11-13 y motivo «auditoría de coherencia (13-nov…)»; `aprobado`
no cambia. Los textos de `evaluacion.json` no comparan partidos.

## Parejas comparadas

| Vox | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| vox-12 (CGPJ) | pp-05 | iguales (M/F/F/M/M/M/M/M) | Las frases de pp-05 que la revisión de Vox corrigió en vox-12 tenían los mismos errores: se corrigen igual (ver abajo). |
| vox-08 (ocupación) | pp-03, salf-02, junts-08 | iguales a pp-03; salf-02 evidencia M; junts-08 financiación F | Diferencias justificadas: los estudios de salf-02 miden la ejecución civil de contratos de alquiler (su lanzamiento en 30 días), no la tipificación penal de la «inquiocupación»; junts-08 solo modifica normas procesales, mientras vox-08 y pp-03 eximen de impuestos y suministros. Se igualan los textos de pp-03 y junts-08 (ver abajo). |
| vox-05 (regularizaciones) | pp-02 | iguales | Se corrigen en pp-02 las mismas infidelidades a Elias et al. y a Funcas corregidas en vox-05. Financiación «no_verificable» en ambas; en vox-05 hay además el coste directo de las repatriaciones. |
| vox-01 (Ceuta) | salf-05 | iguales | Sin cambios. |
| vox-09 (primera vivienda) | salf-01, junts-06 | iguales a salf-01 | Se corrigen en salf-01 las mismas frases corregidas en vox-09 (Besley et al., ámbito del SDLT, art. 105 bis, compraventas inscritas). junts-06 (solo deducción del IRPF) tiene encaje legal «favorable» porque no incluye el IVA. |
| vox-04 (nuclear) | pp-12 | financiación M frente a F | Diferencia justificada (vox-04 añade centrales nuevas con coste estimable). La frase de Enresa y la del −7 % de gas se acotan a Almaraz en las dos. |
| vox-02, vox-c11 (impuestos) | pp-10, salf-04, erc-09 | ver tabla de la revisión de Vox | Financiación: vox-02 «no_verificable» como erc-09 (sin cifra de coste); vox-c11 «mixta» como salf-04 (coste y financiación cifrados con una partida sin respaldo oficial). Sin cambios. |
| vox-07 (prioridad nacional) | salf-06, cc-06 | encaje legal D | Núcleo contrario al Derecho de la UE (Directiva 2003/109). Sin cambios. |
| vox-06 (IMV) y vox-11 (cotización), partes solo para españoles | — | encaje legal M | Componente contrario al Derecho de la UE dentro de un diseño con partes viables, como salf-01 o vox-09. Sin cambios. |
| vox-03 (Pacto Verde, ZBE) | compromis-10 (regla), bng-07/pnv-08 (regla) | evidencia y largo plazo D | Aplicación de las reglas de compromis-10 y de bng-07/pnv-08 explicada en el texto; encaje legal «mixta» porque la supresión de las ZBE es nacional (partes viables, como salf-01). Sin cambios. |
| vox-10, vox-c12 | — | — | Sin propuestas equivalentes; valoraciones conformes a la rúbrica. |

## Correcciones (ninguna cambia una valoración)

- **pp-03, encaje legal:** añade que la entrega inmediata está sujeta a la valoración de la
  vulnerabilidad (arts. 441.1 bis y 441.5-7 LEC) y la suspensión hasta 2030 del art. 2 del RDL
  29/2026, como salf-02 y vox-08. Fuentes: LEC y RDL 29/2026.
- **pp-03, largo plazo:** la STC 32/2019 describe un deber de comunicar el desalojo a los servicios
  sociales con el consentimiento de los afectados, no una intervención obligatoria (formulación de vox-08).
- **junts-08, encaje legal:** la proposición suprime para la ocupación el trámite de los arts. 441.5-7
  LEC y la suspensión del RDL 11/2020; la del RDL 29/2026 es posterior. Fuentes: LEC y RDL 29/2026.
- **pp-12, financiación y largo plazo; vox-04, largo plazo:** lo que la Orden TED/864/2026 dice de
  Enresa y del efecto en 2030 se refiere a la extensión limitada de Almaraz (31 y 19 meses, cese del
  parque en 2035), no a suprimir el calendario.
- **pp-05 (frente a vox-12):** LO 1/1980 (Junta Electoral y voto por correo, no «medios de la
  Administración de Justicia»); internacional (la fuente no habla de otros países; Garoupa y Ginsburg);
  antecedentes (renovación de julio de 2024 en lugar de un bloqueo que ninguna fuente del criterio
  recoge; se añaden la STC 108/1986 y la nota del CGPJ de 5-2-2025 sobre la unanimidad); beneficiarios
  (5.643 jueces, 947 sustitutos, nota 26 del SWD(2026) 909); largo plazo (es la Comisión de Venecia,
  no el informe, quien juzga el modelo conforme al estándar).
- **pp-02 (frente a vox-05):** Elias et al. también hallan menos empleo informal de los poco
  cualificados; Funcas no habla de un escenario sin vías de regularización; la cifra de Funcas es
  anterior a la regularización de 2026; título correcto del artículo.
- **salf-01 (frente a vox-09):** «precio pagado por el comprador, impuesto incluido» en lugar de
  «precio neto»; el SDLT rige en Inglaterra e Irlanda del Norte; art. 105 bis.1 de la Directiva del IVA;
  compraventas inscritas.

Recuentos sin cambios. `verify_quotes`, `build_web` y los tests: correctos.

## Dudas que quedan

- **IVA de la primera vivienda (salf-01, vox-09).** Italia aplica un IVA del 4 % a la compra de la
  primera vivienda a una empresa, con requisitos; si ya lo aplicaba el 1-1-2021, el art. 105 bis.1
  permitiría a España reproducirlo en sus mismas condiciones. No se ha comprobado en fuente oficial;
  no cambia la conclusión para un tipo sin esas condiciones.
- **Financiación de pp-02 («no_verificable»).** Tras la revisión del 12-11 (noche), un efecto fiscal
  indirecto sin estimar dejó de ser motivo de «no_verificable» en las restricciones a la compra de
  vivienda. pp-02 lo sigue usando, junto con el coste no estimado de gestionar visados y cupos. vox-05
  no se ve afectada (coste directo de las repatriaciones). Conviene una decisión editorial.
