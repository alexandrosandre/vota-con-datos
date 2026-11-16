# Auditoría de coherencia tras el análisis del programa del Frente Amplio (Fase 3, 16-11-2026)

Alcance: las 12 propuestas del programa del Frente Amplio (`data/programas/frente_amplio/evaluacion.json`,
commit e3dd300, sin complemento: la evaluación de sus compromisos se retiró al publicarse el programa)
comparadas criterio por criterio con las propuestas equivalentes publicadas de los demás partidos
(`*/evaluacion.json` y `*/compromisos/evaluacion.json`), en las dos direcciones; y las 96 correcciones de la
revisión del Frente Amplio, buscando cada hecho corregido en las demás evaluaciones. Regla: mismos hechos, mismas
cifras, mismas fuentes, misma fuerza en la redacción y misma valoración; hechos distintos, valoraciones distintas
explicadas en el texto. Cada dato que se cambia se comprobó en la fuente primaria el 16-11. Cada corrección figura
en el `revision.json` del partido (o de su carpeta `compromisos/`), en `cambios`, con `fecha` 2026-11-16 y motivo
«auditoría de coherencia (16-nov, tras el análisis del programa del Frente Amplio)…»; `aprobado` no cambia. Los
textos de `evaluacion.json` no comparan partidos.

**Ninguna valoración cambia.** Todas las correcciones son de texto, cifras o fuentes; no hace falta una segunda
revisión por cambio de valoración.

## Parejas comparadas

| Frente Amplio | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| frente_amplio-01 (1 % del PIB, 1,5 millones de viviendas) | psoe-02, compromis-03, bng-03, cc-05 | concreción F frente a M | Justificada (decisión escrita en la revisión del Frente Amplio: fija número de viviendas, plazo y condiciones). Mismas cifras (16.900 M€, PIB de 2025, 2.756 M€ de Eurostat, 7.000 M€ del Plan, 318.000 viviendas, Sinai y Waldfogel, déficit de 400.000 del Plan). Sin cambios. |
| frente_amplio-02 (expropiación y Sareb) | podemos-04; erc-07 | iguales en lo comparable (internacional N en las dos expropiaciones) | Berlín: frente_amplio-02 decía «el 59 % de los votantes» (LTO) y podemos-04 «57,6 % de quienes votaron». Resultado oficial del Landeswahlleiter: 1.035.950 síes, el 57,6 % de los votantes y el 59,1 % de los votos válidos; se corrige frente_amplio-02 y se añade la fuente oficial. erc-07 (antecedentes) decía que la Sareb «cede más de 40.000 viviendas» (prensa): se sustituye por el acuerdo publicado (Orden PJC/784/2025), que limita la transmisión a los inmuebles aptos, como ya corrigió la revisión de frente_amplio-02. |
| frente_amplio-03 (impuesto del 10 %) | psoe-03 | legal M en las dos; financiación N en las dos | La revisión de frente_amplio-03 corrigió «pagados por 75 contribuyentes»: son 75 declarantes, de los que 67 ingresaron algo (datos abiertos de la ATC, 2pwz-wwxf, comprobado: 73 filas en 2025 = 72 tenedores + agrupación de 3; 8 con 0 €). Mismo error en psoe-03 (antecedentes y beneficiarios): se corrige. Título completo de Jofre-Monseny et al. en psoe-03. |
| frente_amplio-04 (prestación por crianza) | psoe-07, vox-11 | concreción F frente a M en psoe-07; financiación M frente a N | Justificadas (cuantía, destinatarios y calendario; decisión escrita en la revisión del Frente Amplio). psoe-07 (internacional) omitía, como el texto corregido en frente_amplio-04, que Polonia extendió la prestación a todos los menores desde el 1-7-2019 (Ministerio de Familia, comprobado): se corrige y se añade la fuente. psoe-07 (largo plazo): misma causa de la caída del impuesto de grandes fortunas y misma movilidad «hacia Madrid» que frente_amplio-04. Ley 35/2007: psoe-07 y vox-11 dicen que se suprimió el 1-1-2011 citando solo el texto original; se añade el texto consolidado, que lo recoge. En frente_amplio-04 el enlace ya era el consolidado pero el título decía «texto original»: se corrige el título. |
| frente_amplio-05 (dentista, gafas, audífonos) | psoe-06, podemos-09 | evidencia F frente a M en psoe-06 | Justificada (objetivo distinto: cobertura frente a listas de espera; decisión escrita en la revisión). Mismas cifras (gasto sanitario de 2024, PIB de 2024, Ageing Report 5,9 % → 7,1 %). Sin cambios. |
| frente_amplio-06 (Sociedades) | vox-02 | — | Mismas cifras (42.266 M€ en 2025; Fuest, Peichl y Siegloch). Sin cambios. |
| frente_amplio-07 (grandes fortunas y Tasa Zucman) | erc-12, bng-09, upc-06, adelante_andalucia-05, psoe-07 | legal M frente a la F de erc-12 | Justificada (cláusula de salida y convenios de doble imposición; decisión escrita en la revisión). erc-12 (evidencia): «creció un 10 %» → «un 10 % más que en las demás regiones», como en frente_amplio-07 (WID: «relative to other regions»). Causa de la caída: hallazgo 1. |
| frente_amplio-08 (SMI, 60 % del salario medio neto) | psoe-04, bng-05, podemos-05, upc-08, ara_mes_fa-09 | financiación M frente a N | Justificada (referencia definida, decisión escrita en la revisión). podemos-05 (antecedentes) daba 735 € para el SMI de 2018; los demás, 735,90 €: se corrige. |
| frente_amplio-09 (37,5 y 32 horas) | adelante_andalucia-03, compromis-05, bng-04, podemos-06 | iguales | Jornada pactada: hallazgo 2. Votación del 10-9-2025: se añade el Diario de Sesiones n.º 135 («178 votos a favor y 170 en contra», comprobado) en las cuatro, como en frente_amplio-09. |
| frente_amplio-10 (pensiones en la Constitución y jubilación a los 65) | psoe-05, compromis-07, upc-07, upn-06, bng-07, pnv-08, ara_mes_fa-05 | largo plazo D como bng-07 y pnv-08 | Pensiones mínimas: hallazgo 3. bng-07 (largo plazo): «2,4 puntos con recursos distintos de las cotizaciones» → «… y de las transferencias del Estado ya previstas» (AIReF, Opinión de 31-3-2025, comprobada). bng-07 (evidencia): la simetría con Staubli y Zweimüller se formula como inferencia, como en frente_amplio-10. |
| frente_amplio-11 (tres horas de luz gratis) | eh_bildu-06, bng-09, upc-06, compromis-14, adelante_andalucia-08 | legal D en frente_amplio-11 frente a la M de eh_bildu-06 | Justificada: eh_bildu-06 deja el encaje al diseño (a qué energía y a quién). Pero eh_bildu-06 decía que no se había podido leer la reforma de 2024 de la Directiva 2019/944: la Directiva 2024/1711 (comprobada) no modifica el art. 5 y añade el art. 66 bis (precios por debajo del coste solo en una crisis declarada); se completa con esa fuente. Gravamen energético: bng-09 y upc-06 decían que «decayó»; se precisa como en frente_amplio-11 (derogación del Real Decreto-ley 10/2024, BOE-A-2025-1137) y se corrige el título de la página de La Moncloa (27-9-2024, no «recaudación de los gravámenes»). |
| frente_amplio-12 (0,7 % para cooperación) | psoe-12, upc-10 | iguales | psoe-12: «(cálculo propio)» en los porcentajes de la OCDE y «la redujo dos veces (2021 y 2025)» se corrigen como en frente_amplio-12 (el 25-2-2025 se anunció el 0,3 % para 2027; discurso del primer ministro, comprobado); se quita una repetición. Mismas cifras (7.190 M€ con la RNB de la OCDE). |

## Hallazgos

1. **Causa de la caída del impuesto de grandes fortunas (duda abierta el 15-11).** Agencia Tributaria, Informe anual
   de recaudación 2024, cap. 6 (comprobado): «La disminución de estos ingresos se debió a los cambios normativos que
   afectaron al Impuesto sobre el Patrimonio en algunas CC. AA., de forma que la mayor parte de los ingresos que en
   2023 había generado este impuesto […] fueron a parar a la caja de esas CC. AA.». Se añade esa fuente donde la causa
   se apoyaba solo en El Derecho: erc-12 (financiación, antecedentes y beneficiarios) y frente_amplio-07
   (antecedentes); en psoe-07 (largo plazo) se añade además la causa al texto, como en frente_amplio-04.
2. **Jornada media pactada.** Estadística de Convenios Colectivos, avance de marzo de 2026 (CCT_03_2026.xls,
   comprobado): 1.739,31 horas al año, unas 38,1 semanales. adelante_andalucia-03 y compromis-05 la citaban por
   Onda Vasca: se sustituye por la estadística, con la redacción de frente_amplio-09. podemos-06 usaba 38,2 horas,
   la cifra de 2023 de la memoria del proyecto de 37,5 horas: se pasa al mismo dato de 2026 (el 27 % no cambia).
3. **Pensiones mínimas de 2026.** Real Decreto-ley 3/2026, anexo I (BOE, comprobado): con 65 años, 17.592,40 € con
   cónyuge a cargo, 13.106,80 € sin cónyuge y 12.441,80 € con cónyuge no a cargo. La revisión del Frente Amplio había
   cambiado en frente_amplio-10 «en otros casos» por «sin cónyuge» para los 12.441,80 €, atribuyéndolo a La Moncloa,
   que solo habla de «pensionistas de 65 años o mayores»: era un error de la revisión y se corrige con la cuantía sin
   cónyuge (13.106,80 €). ara_mes_fa-05 (antecedentes) daba los 12.441,80 € como la mínima de los mayores de 65 años:
   se precisan las tres cuantías.

## Otras correcciones de la revisión del Frente Amplio que afectaban a textos de otros partidos

Se buscó cada una de las 96 correcciones. Aparecían en otros partidos, además de las de la tabla: «75
contribuyentes» (psoe-03), Polonia 500+ (psoe-07), causa de la caída y movilidad hacia Madrid (psoe-07), Agrawal
«10 % más que en las demás regiones» (erc-12), Ley 35/2007 (psoe-07, vox-11), jornada pactada y Diario de Sesiones
(adelante_andalucia-03, compromis-05, bng-04, podemos-06), AIReF «2,4 puntos» (bng-07), inferencia de Staubli y
Zweimüller (bng-07), gravamen energético y título de La Moncloa (bng-09, upc-06), OCDE y Reino Unido (psoe-12), y
títulos de Jofre-Monseny y Agrawal (psoe-03, psoe-07). Las demás no tienen el mismo texto en otras evaluaciones:
14.371 calificaciones (cc-05 no habla de venta y alquiler), Sinai y Waldfogel («vivienda subvencionada» en todas),
rentabilidad del alquiler (solo frente_amplio-03), Ley 19/2021 (psoe-07 ya decía «entre otros»), Plan Veo, audífonos,
Sociedades, convenio con Francia, SMI de 2027, El Debate (48,4 %), OCDE 64,4 años, art. 53.2 CE y Tax Foundation.

## Recuentos y comprobaciones

Ninguna valoración cambia. Entradas registradas el 16-11 por esta auditoría: 49 (adelante_andalucia 3,
ara_mes_fa/compromisos 2, bng 6, compromis 3, eh_bildu/compromisos 2, erc 6, frente_amplio 6,
podemos/compromisos 4, psoe 13, upc/compromisos 3, vox 1). `verify_quotes` (4.393 citas, 0 no encontradas),
`build_web` y los 22 tests: correctos.

## Dudas que quedan

- **0,26 % del conjunto del CAD (frente_amplio-12, psoe-12, upc-10).** Sigue apoyado en Focus 2030: la API DAC1 de la OCDE no
  da aún la AOD en equivalente de donación del conjunto del CAD para 2025 (solo flujos netos, que darían un 0,25 %).
- **Salario medio de la EAES (psoe-04, bng-05).** La revisión de frente_amplio-08 precisa que los 29.540 € incluyen el tiempo
  parcial; la nota de prensa del INE no lo dice expresamente, así que no se ha trasladado a psoe-04 ni a bng-05, que
  presentan esa cifra como una de las dos referencias posibles.
- **Déficit de vivienda.** cc-05, podemos-04 y frente_amplio-01 y -02 usan de forma coherente los «más de 400.000» del Plan
  Estatal; la cifra posterior del Banco de España (unas 700.000) sigue sin documento primario localizado.
- **erc-07.** Legal, financiación y largo plazo siguen citando Brainsre.news (prensa); el mecanismo que describe
  (entrega al Estado e integración en Sepes) coincide con la Orden PJC/784/2025.
- **Títulos de fuentes con la misma URL.** erc-12 y adelante_andalucia-05 citan a Agrawal et al. con un título
  abreviado y frente_amplio-01, psoe-02 y compromis-03 a la Contabilidad Nacional del INE con un título corto; son la misma
  fuente y no se han tocado.
- **Dudas propias de la revisión del Frente Amplio.** Su `revision.json` no se reescribe (es el registro de aquella
  revisión); su error en la pensión mínima sin cónyuge queda corregido aquí (hallazgo 3).
