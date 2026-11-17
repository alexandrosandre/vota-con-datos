# Auditoría de coherencia tras el análisis de los programas de Ara Més-Front Ampli y EH Bildu (Fase 3, 17-11-2026)

Alcance: las 24 propuestas de los programas de Ara Més-Front Ampli y EH Bildu (`data/programas/ara_mes_fa/evaluacion.json` y
`data/programas/eh_bildu/evaluacion.json`, commit fcb040c, sin complemento) comparadas criterio por criterio con las propuestas
equivalentes publicadas de los demás partidos (`*/evaluacion.json` y `*/compromisos/evaluacion.json`), en las dos direcciones; las
correcciones de las dos revisiones independientes (45 de EH Bildu y 10 de Ara Més), buscando cada hecho corregido en las demás
evaluaciones; y las imprecisiones en evaluaciones aprobadas de otros partidos que señaló el revisor de EH Bildu en sus dudas. Regla:
mismos hechos, mismas cifras, mismas fuentes primarias, misma fuerza en la redacción y misma valoración; hechos distintos,
valoraciones distintas explicadas en el texto. Cada dato que se cambia se comprobó el 17-11 en la fuente primaria (BOE, Tribunal
Constitucional, Estadística de Convenios Colectivos, Cifras PYME, ISOO, legislation.gov.uk, Electoral Commission, HUDOC, OCDE, DIW,
prensa citada solo donde no hay otra fuente). Cada corrección figura en el `revision.json` del partido (o de su carpeta
`compromisos/`), en `cambios`, con `fecha` 2026-11-17 y motivo «auditoría de coherencia (17-nov, tras el análisis de los programas
de Ara Més-Front Ampli y EH Bildu)…»; `aprobado` no cambia. Los textos de `evaluacion.json` no comparan partidos.

**Ninguna valoración cambia.** Todas las correcciones son de texto, cifras o fuentes; no hace falta una segunda revisión por
cambio de valoración.

## Parejas comparadas

### EH Bildu

| EH Bildu | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| eh_bildu-01 (prórroga automática y tope del 2 %) | compromis-02, ara_mes_fa-07, adelante_andalucia-01, compromis-c02, pp-09 | legal M y financiación F, iguales | STC 26/2025: ninguna otra evaluación le atribuye un tope a la actualización anual (hallazgo 4). Prórroga extraordinaria vigente: hallazgo 3 (compromis-02, ara_mes_fa-07). |
| eh_bildu-02 (desahucios) | bng-02, salf-02, junts-08, pp-03, upn-07, vox-08, podemos-04 | financiación N, igual que bng-02 | Ninguna evaluación dice que las prórrogas de 2026 estuvieran vigentes; bng-02 omitía el Real Decreto-ley 29/2026, y eh_bildu-02 juntaba sus dos regímenes (hallazgo 2). |
| eh_bildu-03 (compra especulativa) | compromis-01, bng-c02, podemos-02, ara_mes_fa-06, cc-06 | legal M como compromis-01 y bng-c02; D en podemos-02, ara_mes_fa-06 y cc-06 | Justificada (decisión escrita en la revisión de EH Bildu: obligar a residir o discriminar por nacionalidad frente a excluir categorías de compradores). Descripción del Real Decreto-ley 29/2026: hallazgo 5. GAO y Du y Zhang con el mismo título en todas. |
| eh_bildu-04 (32 horas) | adelante_andalucia-03, compromis-05, frente_amplio-09, podemos-06, bng-04 | iguales salvo concreción (decisión escrita en la revisión de EH Bildu) | Jornada pactada y beneficiarios no sumables: hallazgo 1. Votación del 10-9-2025, Batut y otros y Raposo y van Ours, iguales. |
| eh_bildu-05 (salario mínimo autonómico) | pnv-02, ara_mes_fa-01, erc-08 | M/M/N como pnv-02; financiación M en ara_mes_fa-01 (parte estatal estimable) y erc-08 (cuantía fija) | Justificadas. «1.500 € en 14 pagas» en pnv-02: hallazgo 7. TSJPV, Confebask, salarios medios (35.170 €) e internacional, iguales. |
| eh_bildu-06 (45 días) | bng-06 | M/F/N, iguales | Fuente oficial de la decisión del CEDS en las dos: hallazgo 8. |
| eh_bildu-07 (pensiones mínimas de 1.220 €) | frente_amplio-10, ara_mes_fa-02, psoe-05, compromis-07, upc-07, upn-06, bng-07 | financiación M como frente_amplio-10; largo plazo M (los D de bng-07, pnv-08 y frente_amplio-10 se deben a adelantar la jubilación) | Cuantías mínimas del Real Decreto-ley 3/2026 idénticas (con cónyuge a cargo, sin cónyuge y con cónyuge no a cargo); AIReF («transferencias implícitas», 3,0 % del PIB; 16,1 % en 2050) y OCDE iguales. Francia: hallazgo 9. |
| eh_bildu-08 (márgenes y topes en crisis) | podemos-03, ara_mes_fa-03, bng-c01 | legal M como podemos-03; F en ara_mes_fa-03 | Justificada (decisión escrita en la revisión de Ara Més: cesta básica en el art. 13.2.a de la Ley 7/1996; aquí también energía, limitada por la Directiva 2019/944). Hungría (FMI), Croacia (Mužić y Žilić) y Ley 12/2013, iguales. |
| eh_bildu-09 (gravamen energético) | bng-09, upc-06, frente_amplio-11 | legal F, financiación M y beneficiarios F, iguales | Mismas cifras (1.164 M€ en 2024, umbral de 1.000 M€ de 2019) y mismo hecho (derogación del Real Decreto-ley 10/2024 el 22-1-2025). Sin cambios. |
| eh_bildu-10 (neutralidad en 2045) | psoe-09, vox-03, vox-04, pp-12 | — | La Ley 7/2021 (23 %) y el PNIEC (32 %) se distinguen igual en vox-03 y psoe-09. Sin cambios. |
| eh_bildu-11 (nación y derecho a decidir) | erc-04, pnv-11 | legal y antecedentes D como erc-04; concreción D como pnv-11 | STC 114/2017 y fuente de Escocia en erc-04: hallazgo 6. Plan Ibarretxe (313 a 29) igual en pnv-11. |
| eh_bildu-12 (Secretos Oficiales) | pnv-12 | iguales en los ocho criterios | «390 empleados», Reino Unido «desde 2010» y víctimas en pnv-12: hallazgo 6. |

### Ara Més-Front Ampli

| Ara Més | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| ara_mes_fa-01 (salario mínimo balear y SMI al 60 % del bruto) | frente_amplio-08, psoe-04, bng-05, pnv-02, eh_bildu-05, erc-08, podemos-05, upc-08 | financiación M como frente_amplio-08 (cambio de su revisión) | Mismas cifras (29.540 €, 735,90 €, 17.094 €; Centre for Cities igual que pnv-02). Sin cambios. |
| ara_mes_fa-02 (complemento insular a las pensiones) | eh_bildu-07, frente_amplio-10 | iguales en lo comparable | Cuantías mínimas, OCDE y AIReF iguales. Sin cambios. |
| ara_mes_fa-03 (cesta básica) | podemos-03, eh_bildu-08 | véase eh_bildu-08 | Sin cambios. |
| ara_mes_fa-04 (IVA balear) | vox-02, pnv-05, cc-02 | evidencia M como vox-02 y pnv-05 | Benzarti y Carloni citado igual. Sin cambios. |
| ara_mes_fa-05 (200 € por menor y comedor) | frente_amplio-04, psoe-07, vox-11 | financiación M como frente_amplio-04 | Mismas cifras (7.770.866 menores, 18.650 M€, 637.748 hogares) y mismas fuentes (Ley 35/2007 consolidada, Polonia desde el 1-7-2019). Sin cambios. |
| ara_mes_fa-06 (comprar solo para residir) | podemos-02, bng-c02, compromis-01, eh_bildu-03 | legal D como podemos-02 | Excepción del Real Decreto-ley 29/2026: hallazgo 5. |
| ara_mes_fa-07 (25 % de la renta y contratos indefinidos) | adelante_andalucia-01, compromis-02, eh_bildu-01, bng-02 | legal M y financiación F como adelante_andalucia-01 | Mietendeckel con su evaluación en bng-02 (hallazgo 4); prórroga extraordinaria vigente (hallazgo 3). |
| ara_mes_fa-08 (techo de vuelos) | upc-04, compromis-08 | financiación N como upc-04 | Sin cambios. |
| ara_mes_fa-09 (financiación con ordinalidad y condonación) | compromis-11, cc-03, erc-01, erc-02, psoe-08, pp-06, adelante_andalucia-09 | legal M como erc-01 (ordinalidad); beneficiarios F como compromis-11 y erc-01 | Mismas cifras y hechos (20.975 M€ y CPFF de 4-9-2026; 83.252 M€; enmiendas a la totalidad de julio de 2026; caducidad en el BOCG de 4-11-2026). Sin cambios. |
| ara_mes_fa-10 (dependencia al 1,7 % del PIB) | cc-04 | legal F y financiación M, iguales | Ley 4/2026 (50 % estatal), nivel acordado de 904,2 M€ y suspensión de 2012-2018, iguales. Sin cambios. |
| ara_mes_fa-11 (ley de lenguas) | erc-11, junts-05 | legal M como erc-11 | STC 82/1986 en erc-11: hallazgo 10. |
| ara_mes_fa-12 (tauromaquia) | — | — | Sin equivalente. |

## Hallazgos

1. **Jornada pactada y beneficiarios de la reducción de jornada** (adelante_andalucia-03, compromis-05, frente_amplio-09 y
   podemos-06). La tabla CCT-2.2 de la Estadística de Convenios Colectivos (CCT_03_2026.xls, comprobada) clasifica los convenios
   «por año de efectos económicos y período de registro»: los 1.739,31 horas son la jornada de los convenios con efectos económicos
   en 2026 registrados hasta marzo, y 38,1 horas semanales suponen 45,65 semanas (40 × 45,65 = 1.826 horas anuales). Se copia la
   redacción corregida de eh_bildu-04 en las cuatro (el 19 % y el 27 % no cambian). En los beneficiarios de adelante_andalucia-03,
   compromis-05 y frente_amplio-09 (criterio y campo) se añade, como en eh_bildu-04, que las cifras de Cifras PYME y de la EPA pueden
   solaparse y no se suman: Cifras PYME de junio de 2026 (comprobado) asigna a las grandes empresas 849.668 empleos de educación y
   1.481.067 de actividades sanitarias y servicios sociales, que pueden ser públicos.
2. **Suspensión de desahucios.** Comprobado en el BOE: el Congreso derogó los Reales Decretos-leyes 16/2025 (27-1-2026) y 2/2026
   (26-2-2026), que la prorrogaban hasta el 31-12-2026, y el texto consolidado del Real Decreto-ley 11/2020 la deja «hasta el 31 de
   diciembre de 2025»; el Real Decreto-ley 26/2026, que también la incluía (art. 2), fue derogado el 2-10-2026; el Real Decreto-ley
   29/2026, convalidado el 12-11-2026 (BOE-A-2026-23755), la recupera hasta el 31-12-2030. Ninguna evaluación dice lo contrario:
   salf-02 («al menos tres de ellos derogados […] en 2026, el último el Real Decreto-ley 26/2026») es correcto, y junts-08, pp-03,
   upn-07 y vox-08 describen ya el régimen de 2026. Pero bng-02 (legal, antecedentes y financiación) se quedaba en 2025 y omitía la
   regulación vigente y su compensación: se completa con el mismo hecho y las mismas fuentes que eh_bildu-02 (la financiación sigue
   «no_verificable»: no hay cifra de ese coste). Al trasladar el texto se vio que eh_bildu-02 (legal) presentaba el art. 2 del Real
   Decreto-ley 29/2026 como un único régimen: si demanda una entidad que compra inmuebles «por un precio claramente inferior a su
   valor de tasación de mercado» (apartado 1), la suspensión dura hasta 2030 sin revisión anual, plazo de tres años ni compensación;
   la revisión «cada doce meses», el alzamiento a los «tres años», la compensación y las excepciones solo rigen con los demás
   demandantes (apartado 2, y así lo resume el preámbulo). Se precisa en eh_bildu-02 y en bng-02. podemos-04 solo menciona el
   apartado 1, que es el pertinente para los fondos; no se toca.
3. **Prórroga extraordinaria vigente** (compromis-02 y ara_mes_fa-07). La disposición final quinta del Real Decreto-ley 29/2026
   (texto consolidado de 13-11-2026, comprobado) sigue vigente tras la derogación del Real Decreto-ley 28/2026: a petición del
   inquilino al corriente de pago, «una prórroga extraordinaria por plazos anuales y hasta un máximo de dos años adicionales» de los
   contratos cuya prórroga obligatoria finalice antes del 31-12-2028. La revisión de EH Bildu la añadió a eh_bildu-01 como omisión
   relevante; compromis-02 (alquiler indefinido) y ara_mes_fa-07 (contratos indefinidos por defecto) tenían la misma omisión.
4. **STC 26/2025 y Mietendeckel.** La STC 26/2025 (BOE, comprobada) usa «excepcional y limitado, tanto territorial como
   temporalmente» para la zona de mercado residencial tensionado y avala el art. 17.7 LAU (límite de renta de los nuevos contratos de
   grandes tenedores y de viviendas sin alquiler previo, «apegado al valor de mercado»). adelante_andalucia-01 («tope por índice»),
   ara_mes_fa-07, compromis-c02 y pp-09 la citan para límites de renta en zonas tensionadas, no para la actualización anual: sin
   cambios. bng-02 (internacional) citaba el Mietendeckel de Berlín sin su evaluación, que adelante_andalucia-01 y ara_mes_fa-07 sí
   citan: se añade Hahn, Kholodilin, Waltl y Fongoni (2024; resumen comprobado en el DIW: los efectos negativos para los inquilinos
   «appear to outweigh positive ones»).
5. **Limitación de compras del Real Decreto-ley 29/2026** (compromis-01, bng-c02, podemos-02 y ara_mes_fa-06). Art. 1 (BOE,
   comprobado): limita las compras «por un valor de contraprestación inferior al setenta por ciento de su valor de mercado», y la
   excepción del apartado 2.a es el destino «a vivienda habitual a precio asequible o social». compromis-01 y bng-c02 omitían el 70 %,
   y las cuatro daban la excepción como «alquiler asequible»: mismas correcciones que la revisión de EH Bildu hizo en eh_bildu-03. La
   descripción del Real Decreto-ley 26/2026 («menos del 70 % de su valor de tasación», «hasta 2028») es correcta en todas (art. 1,
   comprobado).
6. **Imprecisiones señaladas por el revisor de EH Bildu, confirmadas y corregidas.**
   - pnv-12: «390 empleados públicos» → «el equivalente a 390 empleos a tiempo completo» (internacional y largo plazo; ISOO FY2024,
     p. 24, «Number of FTE», comprobado); el Reino Unido «desde 2010» → «ley de 2010, aplicada de forma gradual desde 2013» (s. 45 de
     la Constitutional Reform and Governance Act 2010 en vigor el 1-1-2013, legislation.gov.uk, comprobado); y, como en eh_bildu-12,
     las víctimas no figuran entre los grupos que citó el Gobierno (nota del Ministerio de 22-7-2025: «investigadores, periodistas o
     historiadores», comprobada).
   - erc-04 (legal): la STC 114/2017 (comprobada) no declara incompatible cualquier referéndum de autodeterminación, sino que la ley
     catalana que lo convocaba vulneraba los arts. 1.2 y 2 CE; como ERC propone un referéndum pactado, se añade el razonamiento de la
     sentencia que lo alcanza: los españoles «son los únicos que, en hipótesis, podrían ser llamados a decidir sobre la permanencia y
     el destino del Estado común (art. 168 CE)». Sostiene el «desfavorable». erc-04 (internacional): el informe de la Electoral
     Commission (comprobado: 55,3 % no, 44,7 % sí, 84,6 % de participación) sustituye a Wikipedia, como en eh_bildu-11.
7. **«1.500 € en 14 pagas»** (pnv-02, antecedentes). Ni elDiario.es (comprobado: «un mínimo de 1.500 euros») ni Orain dicen 14
   pagas; la revisión de EH Bildu lo quitó de eh_bildu-05 y se quita aquí.
8. **Decisión del CEDS sobre el despido** (bng-06 y eh_bildu-06, cinco criterios cada una). Ambas citaban la copia de Lefebvre (duda
   abierta desde el 9-11); se sustituye por el PDF oficial de HUDOC (comprobado: adoptada el 20-3-2024, «by 13 votes to 1»,
   violación del art. 24.b; topes de Finlandia, 24 meses, y Francia, 20). Los textos no cambian.
9. **Pensión mínima ligada al salario mínimo en Francia** (eh_bildu-07, internacional). frente_amplio-10 recoge, con la misma fuente
   que ya cita eh_bildu-07 (OCDE, Pensions at a Glance 2023, comprobada), que Francia fijó en 2023 la pensión mínima total tras una
   carrera completa con salario mínimo en el 85 % del salario mínimo neto; es el antecedente extranjero más cercano a ligar la mínima
   al SMI y faltaba en eh_bildu-07. Sigue «mixta» (sin evaluación de resultados).
10. **Criterio territorial de la cooficialidad** (erc-11, legal). ara_mes_fa-11 apoya el mismo hecho (art. 3 CE) en la STC 82/1986,
    FJ 2 (comprobada: «el criterio delimitador […] [es] el territorio»); erc-11, que pide plena validez «independentment del lloc on
    sigui», solo citaba la Constitución. Se añade la sentencia; la valoración «mixta» y la conclusión (requiere una ley estatal) no
    cambian.

## Otras comprobaciones sin cambios

Además de las de las tablas: las 45 correcciones de la revisión de EH Bildu y las 10 de la de Ara Més se buscaron en las demás
evaluaciones. Las que afectaban a otras son las de los hallazgos 1, 2, 3, 5, 6 y 7; las demás son propias del texto revisado
(Collinson y otros, moratoria del CDC, «transferencias implícitas» de la AIReF, que ya usaban así todas las demás; umbral de 2019
del gravamen energético, que no figuraba en otras; descarbonización y Ley Foral 4/2022; Klimarådet; título de Mužić y Žilić, ya
completo en ara_mes_fa-03 y podemos-03; nota del Observatorio de Márgenes, solo citada por EH Bildu; Du y Zhang, ya con el título
correcto en bng-c02, eh_bildu-03 y podemos-02; IMAP de Aena; atribución de los 412 M€; título de ara_mes_fa-11; Educo; Real Decreto 126/2026).

## Recuentos y comprobaciones

Ninguna valoración cambia (comprobado contra HEAD en todas las evaluaciones). Entradas registradas el 17-11 por esta auditoría: 41
(adelante_andalucia 3, ara_mes_fa 3, bng 11, bng/compromisos 1, compromis 6, eh_bildu 3, erc 4, frente_amplio 3, pnv 5,
podemos/compromisos 2). No se ha tocado ningún `seleccion.json`. `verify_quotes` (4.688 citas, 0 no encontradas), `build_web` y los
22 tests: correctos.

## Dudas que quedan

- **Dudas de la revisión de EH Bildu.** Su `revision.json` no se reescribe (es el registro de aquella revisión); su duda sobre las
  «mismas imprecisiones en evaluaciones aprobadas de otros partidos» queda resuelta aquí (hallazgos 1, 6 y 7). Sigue abierta la suya
  sobre el voto de cada grupo en la derogación del Real Decreto-ley 10/2024 (eh_bildu-09), que solo atribuye el programa.
- **Salario medio de la EAES.** ara_mes_fa-01 y frente_amplio-08 dicen que los 29.540 € incluyen el tiempo parcial; psoe-04 y bng-05
  no lo dicen. La nota del INE (comprobada de nuevo) sigue sin decirlo expresamente; no se ha trasladado.
- **ara_mes_fa-12.** La votación de la ILP de 7-10-2025 sobre la Ley 18/2013 se cita por El Debate (prensa); no se ha consultado el
  Diario de Sesiones.
- **pnv-12 y eh_bildu-12, largo plazo.** «homologable con la OTAN y la UE» (pnv-12) frente a «con otros países de la OTAN y la UE»
  (eh_bildu-12) para el mismo objetivo declarado del proyecto de 2025; no se ha cotejado con su exposición de motivos.
- **erc-11 y ara_mes_fa-11.** No se ha buscado si el Tribunal Constitucional se ha pronunciado sobre la reforma del Reglamento del
  Congreso de 2023 (uso de las lenguas cooficiales fuera de su territorio), que sería el precedente más cercano.
- **Dudas de auditorías anteriores** que no afectan a estas propuestas (0,26 % del CAD, déficit de vivienda del Banco de España,
  Brainsre.news en erc-07, títulos de fuentes con la misma URL): sin cambios.
