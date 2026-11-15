# Auditoría de coherencia tras el análisis del programa del PSOE (Fase 3, 15-11-2026)

Alcance: las 12 propuestas del programa del PSOE (`data/programas/psoe/evaluacion.json`, sin complemento:
sus compromisos anteriores están todos en el programa) comparadas criterio por criterio con las propuestas
equivalentes publicadas de los demás partidos (`*/evaluacion.json` y `*/compromisos/evaluacion.json`), en
las dos direcciones; las correcciones que la revisión del PSOE hizo sobre textos reaprovechados de otros
partidos, buscadas en el original, y los cinco hallazgos que el revisor y el analista del PSOE dejaron fuera
de su alcance. Regla: mismos hechos, mismas cifras, mismas fuentes, misma fuerza en la redacción y misma
valoración; hechos distintos, valoraciones distintas explicadas en el texto. Cada corrección figura en el
`revision.json` del partido (o de su carpeta `compromisos/`), en `cambios`, con `fecha` 2026-11-15 y motivo
«auditoría de coherencia (15-nov, tras el análisis del programa del PSOE)…»; `aprobado` no cambia. Los
textos de `evaluacion.json` no comparan partidos.

**Ninguna valoración cambia.** Todas las correcciones son de texto, cifras o fuentes; no hace falta una
segunda revisión por cambio de valoración.

## Parejas comparadas

| PSOE | Equivalentes | Valoraciones | Resultado |
|---|---|---|---|
| psoe-01 (convenios con Adif, 19.000 M€) | junts-03; compromis-12, compromis-13, pnv-04 | concreción F frente a la M de junts-03; beneficiarios F como compromis-12 y pnv-04, frente a la M de junts-03 y compromis-13 | Justificadas: el PSOE fija cuantía y plazo y el coste es conocido (Hacienda); Junts no fija plazo ni si el gasto es adicional, y en compromis-13 no hay estimación oficial del coste pendiente (decisión ya escrita en la revisión del PSOE). En junts-03 «personas usuarias (547 millones de viajeros)» se corrige como en psoe-01: la cifra suma viajes. Adamuz: ver hallazgo 5. |
| psoe-02 (1 % del PIB para vivienda) | compromis-03, frente_amplio-07, bng-03, cc-05 | iguales (M/F/M/M/M/M/M/M) | Mismas cifras (16.900 M€, 7.000 M€ del Plan, 20.988 M€ de 2018-2025, Sinai y Waldfogel, OCDE). Sin cambios. |
| psoe-03 (impuesto a viviendas de grandes tenedores) | frente_amplio-03; compromis-04 (retirada) | legal M en las dos; financiación «no_verificable» frente a «mixta» | Financiación justificada (Frente Amplio atribuye una cifra a sus impuestos; el PSOE no cifra nada, como la retirada compromis-04). En frente_amplio-03 (evidencia) «Gravar la vivienda vacía funciona» y «actúa como un control de rentas» se corrigen como en psoe-03 («reduce la desocupación»; «funcionaría de forma parecida»). |
| psoe-04 (SMI por ley por encima del 60 %) | bng-05, psc-02, upc-08, ara_mes_fa-09, podemos-05 | financiación N en todas salvo podemos-05 (M); antecedentes M frente a F; legal F frente a la M de bng-05 | Justificadas: podemos-05 fija 1.800 € y su escala es calculable (+47 % sobre el SMI); fijar el SMI por ley nunca se ha hecho, mientras que subirlo sí (decisión escrita en la revisión del PSOE); bng-05 pide un SMI gallego (art. 149.1.7.ª CE). Directiva 2022/2041: hallazgo 1. |
| psoe-05 (pensiones e IPC en la Constitución) | compromis-07; upc-07, upn-06, cc-09 | financiación M y beneficiarios F en todas; legal M en las dos reformas constitucionales y F en upc-07 y upn-06 | Legal justificado (las de UPC y UPN no exigen cambiar ninguna ley). AIReF: hallazgo 2. El art. 58 LGSS «en la redacción de la Ley 21/2021» de compromis-07, upc-07 y upn-06 se corrige como en psoe-05: su apartado 2 lo modificó el Real Decreto-ley 2/2023 (texto consolidado del BOE). |
| psoe-06 (listas de espera, sanidad al 7 % del PIB) | adelante_andalucia-06, podemos-09 | financiación M frente a la N de adelante_andalucia-06 | Justificada: el coste del 7 % es calculable con la estadística oficial; el de desprivatizar conciertos y concesiones no tiene estimación pública. En adelante_andalucia-06 (antecedentes) el mismo proyecto de ley «decayó con la convocatoria de elecciones» (prensa) pasa a «caducó con la disolución de las Cortes (art. 207 del Reglamento del Congreso)», como en psoe-06. |
| psoe-07 (prestación por crianza, impuestos a patrimonios y ahorro) | vox-11; erc-09, erc-12, frente_amplio-02, bng-09, upc-06, adelante_andalucia-05 | financiación N como vox-11 y erc-09 (sin cuantía) | Sin diferencias de valoración. En vox-11 (antecedentes) el «cheque bebé» se describe como en psoe-07 (deducción en el IRPF o prestación de pago único, por nacimiento o adopción; texto original de la Ley 35/2007). Recaudación del impuesto de grandes fortunas: hallazgo 3. |
| psoe-08 (financiación autonómica y deuda) | compromis-11, erc-02, psc-01; pp-06, cc-03, erc-01, adelante_andalucia-09 | iguales a compromis-11, erc-02 y psc-01 (M/F/M/M/M/M/F/M); beneficiarios M en pp-06; legal M en erc-01 y adelante_andalucia-09 | Justificadas: pp-06 no cifra su fondo ni su modelo; erc-01 y adelante_andalucia-09 dependen de la ordinalidad, que no está en la LOFCA. Fedea: cc-03, erc-01 y psc-01 lo citaban por el resumen de Europa Press y omitían el «pero sólo ligeramente» y la pérdida de buena parte de la mejora con el Fondo Climático y el IVA pymes; se corrigen con el original, como en psoe-08 (en erc-01 y psc-01 también las cifras del cuadro 5). psc-01 citaba la nota de la AIReF por El Derecho: pasa a la nota oficial, la misma que pp-06. Proyecto de condonación caducado: hallazgo 5. |
| psoe-09 (81 % renovable y calendario nuclear) | pp-12, vox-04; compromis-14, cc-08 | legal F frente a M; financiación M frente a la F de pp-12 | Justificadas: mantener el calendario no exige cambios normativos y suprimirlo choca con que la prórroga la pide el titular (decisión escrita en la revisión del PSOE); psoe-09 incluye la inversión del PNIEC con parte pública, pp-12 no tiene coste directo. Bélgica: pp-12 y vox-04 decían que la derogación de mayo de 2025 «prolongó» Doel 4 y Tihange 3; el acuerdo es de diciembre de 2023 (World Nuclear News). Se corrige como en psoe-09. |
| psoe-10 (aborto, reforma del art. 43) | adelante_andalucia-11, psc-03, compromis-c06 | iguales (M/M/F/M/M/M/M/M) | Mismo hecho, mismas cifras y fuentes que psoe-10: 78,74 % → **78,75 %** (tabla EV.4 del informe IVE 2024) y «106.172» son interrupciones, no mujeres; la caducidad de la reforma pasa a la fuente oficial (iniciativa 102/000001, BOCG D-610, p. 30) en lugar de prensa («no se aprobó antes del final de la legislatura, según EFE» en psc-03). En compromis-c06 (largo plazo) se añaden, junto a la cifra atribuida a la ministra («solo el 1 %»), las oficiales de Madrid (0,47 %) y Andalucía (0,21 %), como en psoe-10. |
| psoe-11 (edad mínima en redes sociales) | — | — | Sin equivalente. |
| psoe-12 (0,7 % para cooperación) | upc-10 | iguales (M/F/M/M/M/M/M/M) | Mismas cifras (4.116 M€ de la Administración General del Estado, 0,26 % del CAD, cuatro países por encima del 0,7 %). Sin cambios. |

## Hallazgos del revisor y del analista del PSOE

Cada uno se comprobó en la fuente primaria antes de cambiar nada.

1. **Directiva (UE) 2022/2041, art. 5.4.** Copia oficial del DOUE en el BOE (DOUE-L-2022-81556): «Los
   Estados miembros utilizarán valores de referencia indicativos […]. A tal fin, podrán utilizar valores de
   referencia indicativos comúnmente utilizados a escala internacional, como el 60 % de la mediana salarial
   bruta y el 50 % del salario medio bruto». Solo dos evaluaciones publicadas decían que la directiva «toma
   como referencias» esas cifras (la retirada compromis-06 no se publica):
   - **bng-05** (internacional) y **podemos-05** (internacional, compromisos): antes «La Directiva europea
     […] toma como referencias el 60 % del salario mediano bruto y el 50 % del medio»; después «cita como
     valores de referencia indicativos, que los Estados pueden utilizar, el 60 % del salario mediano bruto y
     el 50 % del medio bruto» (redacción de psoe-04). Fuente ya citada en ambas.
   - Las frases «cita el 60 % de la mediana y el 50 % de la media como referencias» (bng-05 y psoe-04,
     legal) no atribuyen a la directiva más de lo que dice y se mantienen.
2. **AIReF, transferencias implícitas.** Nota de la AIReF de 29-5-2026 (comprobada): «las transferencias
   implícitas del resto de los Fondos de la Seguridad Social o de la Administración Central deberán aumentar
   2,3 puntos hasta alcanzar el 3,0% del PIB».
   - **compromis-07** (campo «beneficiarios», financiación y beneficiarios), **upc-07** y **upn-06** (campo,
     financiación y beneficiarios): «transferencias a la Seguridad Social» → «transferencias implícitas al
     sistema de pensiones desde el resto de la Seguridad Social o la Administración Central» (en financiación,
     «transferencias implícitas al sistema de pensiones»); en el criterio de beneficiarios de compromis-07,
     «transferencias del resto de fondos» → «transferencias implícitas del resto de fondos». Mismas palabras
     que psoe-05.
   - pp-11 y upn-09 hablan de «transferencias a la Seguridad Social» para la cuota cero de autónomos: es otro
     hecho (quién paga la bonificación) y no se atribuye a la AIReF. No se tocan.
3. **Recaudación del impuesto de grandes fortunas.** Agencia Tributaria, Informe anual de recaudación
   tributaria 2025, cap. 6 (comprobado): el impuesto «se redujo a la mitad», «pasando de los 37 millones
   ingresados en 2024 a los casi 19 en 2025»; Hacienda (La Moncloa, 20-9-2023) da 623 M€ en 2023.
   - **erc-12** (financiación): antes «recaudó 619 M€ en 2023 y unos 38 M€ entre enero y agosto de 2024»;
     después «recaudó 623 M€ en 2023 según Hacienda y, según la Agencia Tributaria, 37 M€ en 2024 y casi 19 M€
     en 2025». Se añaden las fuentes de Hacienda y de la AEAT; El Derecho se mantiene para la explicación (las
     comunidades que reactivaron Patrimonio). **erc-12** (beneficiarios): «hasta agosto de 2024 cayó a 38 M€»
     → «cayó a 37 M€ en 2024 y a casi 19 M€ en 2025 (Agencia Tributaria)»; el dato de la IGAE (619 M€ en 2023)
     sigue atribuido en ese criterio y en el campo.
   - **frente_amplio-02** (financiación): «623 millones en 2023 y 38 millones hasta agosto de 2024» → «623
     millones en 2023, 37 millones en 2024 y casi 19 millones en 2025 (AEAT)», con la fuente de la AEAT.
   - Mismo dato donde la recaudación del impuesto se daba solo con 2023 (623 M€), lo que omitía su caída:
     **bng-09** (campo, financiación y beneficiarios), **upc-06** (campo, financiación y beneficiarios) y
     **adelante_andalucia-05** (financiación) añaden «37 M€ en 2024 y casi 19 M€ en 2025», con la fuente de la
     AEAT. Ninguna valoración cambia: la recaudación sigue siendo conocida.
4. **Nota de `psoe/evaluacion.json`.** Remitía a `data/programas/psoe/compromisos/` como origen de los textos
   de psoe-04, -05, -08 y -10 y como «otra base» de identificadores, pero su `evaluacion.json` se retiró en el
   commit acf0a3b (la carpeta conserva `seleccion.json` y `revision.json`). Antes «las de los compromisos del
   PSOE (data/programas/psoe/compromisos/: psoe-02 pensiones, …)»; después «las de los compromisos del PSOE
   evaluados antes de publicarse el programa (…; esa evaluación se retiró el 15-11-2026 porque todos sus
   compromisos están en el programa, y se conserva en el historial de git, commit 23bb71b)»; y «los de
   data/programas/psoe/compromisos/ (…) son otra base» → «los de aquella evaluación retirada (…) eran otra
   base». Registrado en `psoe/revision.json` con propuesta «(nota del fichero)».
5. **Opcionales.**
   - **Proyecto de ley orgánica de condonación.** Ficha de la iniciativa 121/000079 del Congreso
     (comprobada): «Resultado tramitación: Caducado», «Concluido - (Caducado) desde 06/10/2026», BOCG,
     Congreso, serie D, núm. 610 (4-11-2026), p. 46. Se añade esa fuente y la formulación de psoe-08
     («caducó con la disolución (BOCG de 4-11-2026)») en **erc-02** (antecedentes: antes «decayó con la
     disolución […] por el Real Decreto 806/2026»; legal: «el proyecto siguió su tramitación» → «siguió su
     tramitación hasta caducar con la disolución de las Cortes, por lo que tendría que presentarse de
     nuevo»), **compromis-11** (antecedentes: «decayó» → «caducó […] (BOCG de 4-11-2026)»), **psc-01**
     (antecedentes: se añade «y el proyecto de condonación caducó con la disolución (BOCG de 4-11-2026)», que
     no decía) y **pp-06** (antecedentes: «también decayó» → «también caducó (BOCG de 4-11-2026)»), que
     menciona el mismo proyecto.
   - **Adamuz.** No hay ningún «45» en las evaluaciones publicadas: solo psoe-01 da la cifra (46). La
     diferencia está entre sus dos fuentes oficiales, de fechas distintas: el Real Decreto-ley 1/2026
     (27-1-2026) habla de «45 víctimas mortales» y La Moncloa (11-2-2026) de «las 46 víctimas del accidente de
     Adamuz» (una herida murió después en la UCI, según la prensa). Se mantiene 46, la cifra oficial posterior,
     y se explica la diferencia: antes «murieron 46 personas en Adamuz y una en Gelida»; después «murieron 46
     personas en Adamuz (cifra de La Moncloa de 11-2-2026; el real decreto-ley de ayudas de 27-1-2026 contaba
     45) y una en Gelida».

## Otras correcciones de la revisión del PSOE que afectaban a textos de otros partidos

La revisión del PSOE hizo 81 correcciones; se buscó cada hecho corregido en las demás evaluaciones. Las que
aparecían (detalle y fuentes en la tabla y en cada `revision.json`):

- **frente_amplio-03** (evidencia), dos frases, como psoe-03.
- **compromis-07**, **upc-07**, **upn-06** (legal): art. 58 LGSS y RD-ley 2/2023, como psoe-05; se añade a
  compromis-07 el texto consolidado de la LGSS como fuente.
- **adelante_andalucia-06** (antecedentes): caducidad con el art. 207 del Reglamento del Congreso, como psoe-06.
- **vox-11** (antecedentes): cheque bebé y texto original de la Ley 35/2007 (se comprobó también el requisito
  de dos años de residencia, art. 1.2), como psoe-07.
- **cc-03** (evidencia; fuente también en largo plazo), **erc-01** (evidencia y beneficiarios; fuente también
  en financiación y largo plazo), **psc-01** (evidencia, beneficiarios y largo plazo): Fedea por el original
  (Fedea Policy Paper 2026/01, comprobado), como psoe-08; en psc-01, «debilita» → «tenderá a debilitar»
  (Fedea lo formula como previsión) y la nota de la AIReF en lugar de El Derecho.
- **pp-12**, **vox-04** (internacional): cronología de Bélgica, como psoe-09; vox-04 añade la noticia del
  acuerdo de diciembre de 2023.
- **adelante_andalucia-11**, **psc-03**, **compromis-c06** (campo, beneficiarios, antecedentes; compromis-c06
  también largo plazo): cifras, unidad y caducidad, como psoe-10.
- **junts-03** (campo y beneficiarios): viajeros de la CNMC, como psoe-01.

Las demás correcciones de la revisión del PSOE (Adif, Fondo España Crece, SEPES, AIReF y SMI, Banco de
España, Dinamarca, Reino Unido y AOD, Ley 7/2021, etc.) no tienen el mismo texto en otras evaluaciones:
upc-10 ya decía «la Administración General del Estado gestionó 4.116 M€» y no atribuye nada al Reino Unido;
vox-04 cita el art. 3.2 de la Ley 7/2021, correcto.

## Recuentos y comprobaciones

Ninguna valoración cambia. Entradas registradas el 15-11 por esta auditoría: 95 (adelante_andalucia 9,
bng 6, cc 3, compromis 7, compromis/compromisos 8, erc 15, frente_amplio/compromisos 4, junts/compromisos 2,
podemos/compromisos 1, pp 3, psc/compromisos 17, psoe 3, upc/compromisos 9, upn/compromisos 4, vox 4).
`verify_quotes`, `build_web` y los 19 tests: correctos. `build_web` regenera además
`data/build/fase2_validacion.txt` con las encuestas del 15-11 (no es parte de esta auditoría).

## Dudas que quedan

- **Por qué cayó la recaudación del impuesto de grandes fortunas.** La AEAT da las cifras pero no la causa;
  erc-12 y frente_amplio-02 la atribuyen a las comunidades que reactivaron Patrimonio con El Derecho (prensa),
  y psoe-07 explica el mecanismo con la ley (la cuota de Patrimonio se descuenta). No es contradictorio; si
  se localiza una explicación oficial, conviene usarla en las tres.
- **Otras caducidades.** junts-08, pnv-c01, cc-c01 y eh_bildu-02 dicen que otras iniciativas «decayeron» con
  la disolución sin citar la relación oficial (compromis-10 cita el Reglamento y pnv-12 el BOCG de 4-11-2026);
  la relación oficial está en el mismo BOCG D-610. Son hechos distintos de los auditados hoy; no se han tocado.
- **Adamuz.** La 46.ª muerte (una herida en la UCI) solo consta en la prensa; La Moncloa confirma el total de 46.
- **compromis-c06.** La cifra de la ministra («solo el 1 %» en Madrid y Andalucía) se mantiene atribuida, al
  lado de la oficial; las de Galicia (77 %), Cantabria (88,5 %) y Cataluña (55,7 %) en el informe IVE 2024
  confirman su «más del 50 %».
- **Dudas fuera de alcance de la revisión del PSOE.** Las tres que anotó (a: directiva; b: AIReF; c: nota que
  apuntaba a un fichero retirado) quedan resueltas aquí; su `revision.json` no se reescribe (es el registro de
  aquella revisión).
