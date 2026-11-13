# Revisión de las afirmaciones del paso 1 por cobertura (13-nov-2026)

Propuesta para revisar cuántos partidos tienen posición en cada afirmación. Está pendiente de verificación independiente.
No modifica `preguntas.json` ni `fase1.json`. Los datos están en `propuesta.json`, en esta misma carpeta.

## Resumen

- **Se quitan 5 afirmaciones:** q02, q07, q14, q27 y q28.
- **Se añaden 5 nuevas:** q31 a q35, cada una codificada para los 18 partidos.
- **Se añade 1 posición en una afirmación existente:** Junts en q12.
- **Mejora de la cobertura:**
  - Media por partido: de 6,6 a 7,7 posiciones de 30.
  - PNV pasa de 0 a 3 y CC de 1 a 3.
  - EH Bildu, Junts y PSOE suben 2 cada uno.
  - La afirmación con más partidos pasa a ser q31, con 10.
- **Lo que no se alcanza:** el objetivo de 8/30 por partido y 5 partidos por afirmación queda lejos para 7 partidos y 6 afirmaciones. El motivo está en el apartado 6: no hay fuentes válidas, no faltan afirmaciones adecuadas.

## 1. Método y alcance

**Reglas aplicadas.** Las mismas para todos los partidos:
- `docs/prompts/2_codificacion_posiciones.md` (protocolo v2).
- `data/fase1/auditoria_estandar_2026-11-12.md`: regla (a), primera persona; regla (b), las declaraciones reactivas valen ±1.
- Criterios de redacción de `docs/research/vaa_estado_del_arte.md` y `docs/research/auditoria_preguntas.md`.

**Programas oficiales.** Siete partidos los tienen: PP, ERC, BNG, PNV, CC, SALF y Adelante Andalucía.
- Se leyeron la extracción (`data/programas/<id>/extraccion.json`) y el texto completo.
- Cada cita de programa se comprobó con la normalización de `pipeline/verify_quotes.py` contra el texto que cataloga `partidos.json`. Es la misma comprobación que hace `build_fase1.py`.
- El manifiesto de UPC cuenta como documento oficial, igual que en g2.

**Declaraciones de líderes.** Cinco búsquedas en paralelo, una por grupo de partidos, del 13-nov-2026. Fuentes:
1. Las copias locales de `data/sources/compromisos/<partido>/`, con sus `seleccion.json` (compromisos y descartados).
2. Las webs y feeds oficiales de los partidos: eaj-pnv.eus, ehbildu.eus, bng.gal, esquerra.cat, junts.cat, coalicioncanaria.org, frontvalencia.org, upn.org, el blog de UPC y el canal de Telegram de SALF.
3. Prensa y agencias (EFE y Europa Press vía Infobae, idealista/news, elDiario.es, Diario de Avisos y otras).

**Límites de la búsqueda:**
- **Webs bloqueadas.** Bloquean el acceso automatizado psoe.es (Incapsula), socialistes.cat (Cloudflare), voxespana.es (403), podemos.info (403), press.un.org y Telecinco. No se intentó sortear ninguna.
- **Buscador web.** Apenas indexa prensa de octubre y noviembre de 2026, así que la cobertura de mítines y entrevistas de campaña es incompleta.
- **Fecha.** Todo lo que se cita es posterior a la convocatoria (6-oct). La campaña empezó el 13-nov, así que se esperan más declaraciones en los próximos días.

**Copias de fuentes nuevas.** Están en `data/sources/fase1/revision_2026-11-13/<partido>/`, cada una con cabecera URL / Medio / Descargado. Su sha256 está en el apartado 8. Cada posición de campaña lleva `fuente_local` y `sha256`.

## 2. Afirmaciones que se quitan

| id | Tema | Partidos con posición | Motivo |
|---|---|---|---|
| q02 | Vivienda | 4 (FA, Podemos, AA, BNG; todos a favor) | Un solo bloque. q31 recoge el mismo eje con posiciones enfrentadas de 10 partidos. |
| q07 | Empleo y salarios | 2 (SALF, AA) | Es la de menos partidos después de q28. |
| q14 | Inmigración | 3 (PP, Vox, SALF; todos a favor) | Un solo bloque. q33 es del mismo tema y tiene posiciones enfrentadas. |
| q27 | Exterior y defensa | 3 (PP, Vox, SALF; todos a favor) | Un solo bloque y ligada a un episodio concreto (la crisis de Ceuta). |
| q28 | Medio rural | 1 (PP) | La de menos cobertura. |

**Posibles nuevas posiciones en las afirmaciones quitadas.** Antes de quitarlas se buscó si había posiciones para los partidos que no tenían:
- **q07:** el programa del PP (p. 59) exime de cuota a los nuevos autónomos durante el segundo año si no llegan al salario mínimo. Sería +1 como mucho, y q07 seguiría con 3.
- **q14, q27 y q28:** los buscadores no hallaron ninguna cita válida de otros partidos. Las posiciones de Vox en el programa «Es sentido común» (militarizar Ceuta, revisar Mercosur) solo constan en resúmenes de prensa, que no valen.

**Afirmaciones que se mantienen aunque tengan menos de 5 partidos:**
- **q19** (eólica marina, 2): es la única posición de CC en el cuestionario actual. La alternativa que se estudió, alargar la vida de las centrales nucleares, solo tiene posición documentada del PP (véase el apartado 7).
- **q08, q13, q20, q25 y q26** (3 cada una): q13 y q20 tienen posiciones enfrentadas. q26 y q08 tratan temas centrales: el gasto en defensa y la edad de jubilación. q25 se discute en el apartado 7.

## 3. Afirmaciones nuevas

Los ids son nuevos y no se reutiliza ningún id retirado. El contexto de cada una cita su fuente oficial. Valores: + a favor de la afirmación tal como está redactada; − en contra.

### q31 · Vivienda (sustituye a q02)
> Que los contratos de alquiler de vivienda habitual se renueven automáticamente por periodos de cinco años si el inquilino quiere seguir.

- **Origen:** el decreto-ley de renovación automática del 6-oct-2026. Lo defendió el ministro Bustinduy (Frente Amplio) y la Diputación Permanente lo rechazó el 12-nov. También responde a las propuestas de contrato indefinido de BNG, Adelante Andalucía y Compromís.
- **Contexto:** la Ley de Arrendamientos Urbanos (BOE), artículos 9 y 10, comprobados.
- **Por qué:** es el tema central de la campaña (huelga general del 11-nov) y la que más partidos enfrenta:

| A favor | En contra |
|---|---|
| FA, Compromís, EH Bildu, BNG y AA (+2); PSOE y ERC (+1) | PP, Junts y PNV (−1, reactivos) |

- **Matices:**
  - Se distingue del otro decreto (el antidesahucios, que sí se convalidó). Apoyar ese decreto no cuenta como apoyo a esta afirmación.
  - **Vox: null.** Se opuso a los dos decretos, pero solo consta en estilo indirecto del periodista. Lo entrecomillado de Figaredo es una crítica genérica.
  - **CC: null.** El rechazo de Valido solo consta en estilo indirecto.

### q32 · Empleo y salarios (sustituye a q07)
> Que cada comunidad autónoma pueda fijar su propio salario mínimo, por encima del estatal.

- **Origen:** programas de PNV (p. 9), ERC (medida 67) y BNG (p. 15).
- **Contexto:** artículo 27 del Estatuto de los Trabajadores (BOE).
- **Por qué:** es la primera posición documentada del PNV en el cuestionario. Añade también a EH Bildu y Ara Més.
- **Posiciones:** PNV, ERC y BNG (+2); EH Bildu y Ara Més (+1).
- **Limitaciones:**
  - Nadie se opone expresamente: no hay declaraciones de PP, PSOE ni Vox sobre esta medida.
  - **UPC: null.** Su manifiesto rechaza «que se elimine el papel del Estado» en el salario mínimo. Un mínimo autonómico superior al estatal no lo elimina.

### q33 · Inmigración (sustituye a q14)
> Suprimir el reparto obligatorio entre comunidades autónomas de los menores migrantes que llegan solos a España.

- **Origen:** el PP. Sémper, portavoz nacional, propone cambiar la Ley de Extranjería para «dejar de hablar ya de reparto» y hablar «de retorno». En contra, el programa de CC («Solidaridad obligatoria y automática», p. 19).
- **Contexto:** artículos 35 bis y 35 ter de la Ley de Extranjería, introducidos por el Real Decreto-ley 2/2025 (BOE, comprobado).
- **Redacción:** se plantea como un cambio respecto a la ley vigente, no como mantener lo que ya hay. Así es una de las dos nuevas de polaridad conservadora.
- **Posiciones:** PP (+2); CC (−2); PSOE, UPC y AA (−1).

### q34 · Exterior y defensa (sustituye a q27)
> Que España apoye un referéndum de autodeterminación en el Sáhara Occidental, en lugar del plan de autonomía dentro de Marruecos.

- **Origen:** programas de BNG (p. 90), ERC (medida 43), Adelante Andalucía (p. 109) y SALF (p. 38).
- **Contexto:** el giro del Gobierno de 2022 y la resolución 2797 (2025) del Consejo de Seguridad.
  - El enlace de la ONU (docs.un.org) carga el documento por JavaScript. press.un.org devolvió un desafío anti-bots que no se sorteó.
  - Por eso el contenido de la resolución en el contexto se apoya en coberturas secundarias. **Conviene que el verificador lo compruebe.**
- **Por qué:** reúne partidos de bloques distintos: BNG, ERC y AA (+2); SALF, CC y UPC (+1).
- **Limitaciones:**
  - No hay ninguna posición en contra documentada.
  - **PP: null.** Su programa usa la fórmula neutra de la ONU.
  - **PSOE, Podemos, EH Bildu y Compromís: null.** Sus declaraciones sobre el Sáhara son anteriores a la convocatoria.

### q35 · Seguridad y justicia (sustituye a q28)
> Ampliar la prisión permanente revisable a más delitos, como algunos delitos sexuales graves.

- **Origen:** programas de PP (medida 30, p. 20) y SALF (p. 8). En contra, los programas de PNV (p. 27), BNG (p. 30) y Adelante Andalucía (propuesta 496, p. 94).
- **Contexto:** artículos 140 y 92 del Código Penal (BOE).
- **Por qué:** tiene posiciones enfrentadas y es la segunda posición del PNV en una afirmación nueva.
- **Posiciones:** PP y SALF (+2); PNV, BNG y AA (−2).
- **Nota sobre Vox:** su programa propone «ampliar la prisión permanente revisable» (sería +2), pero solo consta en resúmenes de prensa. Queda null hasta que haya una cita de un líder o una copia oficial del programa.
- **Nota sobre la cita de Adelante Andalucía:** la maquetación del PDF parte el título de la propuesta («Derogar la prisión permanente revisable»), así que la cita va en tres fragmentos literales unidos con [...].

### Posición añadida en una afirmación existente
- **q12, Junts: +1.** Míriam Nogueras, 19-oct: «Si es toca la llengua es toca la nació…». Responde a la propuesta del PP de garantizar el castellano en la escuela.
  - Es +1 porque es reactiva.
  - Copia local: `data/sources/compromisos/junts/catpress_llengua_20261019.txt`.
  - No se encontraron otras posiciones nuevas en las afirmaciones que se mantienen.

## 4. Cobertura antes y después

### Por partido (posiciones con valor, de 30)

| Partido | Antes | Después | Cambio |
|---|---|---|---|
| PP | 15 | 15 | −q14, q27, q28; +q31, q33, q35 |
| UPN | 0 | 0 | — |
| PSOE | 3 | 5 | +q31, q33 |
| PSC | 3 | 3 | — |
| Vox | 10 | 8 | −q14, q27 |
| SALF | 16 | 15 | −q07, q14, q27; +q34, q35 |
| Frente Amplio | 5 | 5 | −q02; +q31 |
| Podemos | 9 | 8 | −q02 |
| Compromís | 5 | 6 | +q31 |
| Ara Més | 2 | 3 | +q32 |
| UPC | 3 | 5 | +q33, q34 |
| Adelante Andalucía | 18 | 20 | −q02, q07; +q31, q33, q34, q35 |
| ERC | 11 | 14 | +q31, q32, q34 |
| Junts | 2 | 4 | +q12, q31 |
| EH Bildu | 1 | 3 | +q31, q32 |
| PNV | 0 | 3 | +q31, q32, q35 |
| BNG | 15 | 18 | −q02; +q31, q32, q34, q35 |
| CC | 1 | 3 | +q33, q34 |

### Por afirmación (número de partidos)

- **Antes:** q28: 1 · q07, q19: 2 · q08, q13, q14, q20, q25, q26, q27: 3 · q02, q03, q05, q06, q09, q10, q11, q15, q16, q21, q23, q24, q29: 4 · q12, q30: 5 · q17, q18, q22: 6 · q01, q04: 7.
- **Después:** q19: 2 · q08, q13, q20, q25, q26: 3 · q03, q05, q06, q09, q10, q11, q15, q16, q21, q23, q24, q29: 4 · q12 (con Junts), q30, q32, q33, q35: 5 · q17, q18, q22, q34: 6 · q01, q04: 7 · q31: 10.
- **Afirmaciones con menos de 5 partidos:** pasan de 23 a 18.

## 5. Equilibrio de temas y polaridad

**Temas.** Se mantienen los 15 temas. Los recuentos son iguales salvo dos:
- Medio rural baja de 2 a 1 (queda q29, Mercosur).
- Seguridad y justicia sube de 2 a 3 (q23, q24 y q35).
- No se encontró ninguna medida rural con posiciones documentadas de al menos 5 partidos:
  - El lobo solo tiene posición documentada de Adelante Andalucía; la frase del programa del PP no es una posición clara.
  - La prohibición de las macrogranjas solo tiene posición documentada de Adelante Andalucía.
  - La venta a pérdidas y la cadena alimentaria son casi de consenso, y la venta a pérdidas ya está prohibida.
  - Los trasvases solo tienen posición documentada de Adelante Andalucía; el PP habla de un «Pacto Nacional del Agua» sin mencionarlos.

**Polaridad:**

| | Progresista | Conservadora | Territorial | Neutral |
|---|---|---|---|---|
| Se quitan | 1 | 4 | 0 | 0 |
| Se añaden | 2 (q31, q34) | 2 (q33, q35) | 1 (q32) | 0 |
| Total antes | 13 | 11 | 4 | 2 |
| Total después | 14 | 9 | 5 | 2 |

- El desequilibrio de redacción a favor de la polaridad progresista crece de 2 a 5.
- Para corregirlo sin perder cobertura se pueden invertir dos redacciones (mismo contenido, los signos cambian de lado):
  - q31: «Mantener la prórroga anual actual…».
  - q34: «Que España mantenga su apoyo al plan de autonomía…».
- No se ha hecho porque ambas pasarían a defender que todo siga igual, cosa que la auditoría de redacción desaconseja.

## 6. Lo que no se ha podido cubrir y por qué

- **UPN (0).** No hay programa conjunto UPN-PP publicado (upn.org, RSS hasta el 11-nov). Sus líderes (Esparza, Ibarrola, San Martín, Sayas) no tienen declaraciones válidas sobre ninguna afirmación actual ni candidata.
  - Lo que dijo Sayas sobre los decretos de vivienda lo dijo como portavoz del PP y es una crítica genérica.
  - Las posiciones del PP no se trasladan a UPN, por el criterio de `seleccion.json`.
  - Si se publica el programa conjunto, UPN podría pasar a tener muchas posiciones de golpe.
- **PNV, CC, EH Bildu, Ara Més, PSC (3) y Junts (4).**
  - **PNV y CC** tienen programa, pero centrado en competencias y financiación de su comunidad. Se estudiaron afirmaciones hechas a su medida (apartado 7). Incluirlas exigiría quitar otras con posiciones enfrentadas, y no se ha hecho.
  - **EH Bildu, Junts, Ara Més y PSC** no tienen programa. Sus líderes casi no se pronuncian en primera persona sobre medidas concretas; lo que hay suele estar en estilo indirecto o es anterior al 6-oct.
- **PSOE (5) y PSC (3).** El programa del PSOE se presenta el 15-nov y se codificará entonces sobre el conjunto resultante.
- **Vox (8).** Su programa del 12-nov no está catalogado como oficial: voxespana.es devuelve 403 y el único PDF está en una web no oficial.
  - Si se cataloga una copia oficial, Vox ganaría posiciones en q35 (+2) y probablemente en q31 (−) y q33 (+).
- **Afirmaciones con 2-3 partidos (q19, q08, q13, q20, q25, q26).** Se mantienen por los motivos del apartado 2. Con los programas del PSOE y, si llega, de UPN-PP deberían subir.

## 7. Candidatas evaluadas y no incluidas

Para estas candidatas se buscó lo mismo, por si el editor prefiere otro equilibrio. Las codificaciones están en `busqueda_lideres/grupo_*.json` (claves de trabajo: q31 nucleares, q36 CGPJ, x1 lenguas en la UE, x2 competencias de inmigración, x3 compra por no residentes, x4 jubilación con 40 años; q33/q34/q35/q37 de esos ficheros corresponden a las finales q31/q33/q34/q35, con el signo de q33 y q35 invertido) y no en `propuesta.json`.

| Candidata | Partidos con posición | Por qué no se incluye |
|---|---|---|
| Mantener abiertas las nucleares más allá del calendario de cierre | 1 (PP +2) | Vox y Junts solo constan en estilo indirecto o en resúmenes de prensa. |
| Que el catalán, el euskera y el gallego sean oficiales en la UE | 4 (PNV, ERC, BNG, Junts; todos +2) | Nadie se opone de forma documentada y no tiene un hueco temático claro. Subiría a PNV y Junts en 1. |
| Traspasar a las comunidades las competencias de inmigración | 4 (PNV +2, ERC +2, Junts +2, CC +1) | Mismo caso. Podría sustituir a q13, pero esta tiene posiciones enfrentadas y es la medida central de Vox. |
| Jubilarse sin recorte con 40 años cotizados | 4 (PNV +2, AA +2, SALF +2, BNG +1/+2) | Podría sustituir a q08 (3): ganan PNV y SALF y pierde Frente Amplio. Mejora poco. |
| Que los jueces elijan a los 12 vocales judiciales del CGPJ | 3 (PP +2, SALF +2, AA −1) | Misma cobertura que q25. Sería mejor redacción, porque q25 es casi de consenso y la auditoría la marcó como de gravedad alta, pero no mejora la cobertura. |
| Limitar la compra de vivienda a no residentes | 2 (Ara Més +2, CC +1) | Cobertura insuficiente. |

## 8. Posiciones dudosas (para el verificador) y fuentes nuevas

**Posiciones dudosas:**
- **Junts q31 (−1):** Cruset critica «sus decretos leyes» en plural mientras responde a Bustinduy. Si no se acepta que se refiere a la renovación automática: null.
- **PSOE q33 (−1):** Torres, cita parcial («…lo que sería un error»). La distribución de los menores aparece en paráfrasis del medio.
- **PSOE q31 (+1):** la pregunta de la entrevista se refiere expresamente al alquiler indefinido con indemnización. La respuesta «lo apoyan también» lleva el matiz «debate avanzado».
- **ERC q31 (+1):** es una proposición para el Código civil catalán y se limita a grandes tenedores.
- **EH Bildu q32 (+1):** la nota habla de «salario mínimo propio» sin decir «por encima del estatal».
- **SALF q34 (+1):** «se retira la carta de Sánchez» sin mencionar el referéndum.
- **CC q34 (+1):** «derecho del pueblo saharaui a decidir su futuro».
- **Copias sin URL en la cabecera:** las de EH Bildu `ehb_forum_20261109.txt` y `ehb_lab_20261112.txt` no la tienen; se tomó de `data/programas/eh_bildu/compromisos/seleccion.json`.

**Fuentes nuevas** (`data/sources/fase1/revision_2026-11-13/`):

| Fichero | sha256 |
|---|---|
| pp/20261111_theobjective_decretos_vivienda.txt | 831b8b0f2ba61a6b5d46ab61f48ce317d8790fd991e4fff9e37411415ca71bf3 |
| pp/20261016_infobae_menores.txt | 65e643d1b09aaf9d24e14641a545e02613186d1d5abd1ae81174281a76af9b0c |
| psoe/20261022_infobae_menores.txt | 8a819daad18bd9e278a86abc5417c5fbf1a7adfb81a306ccf1d5ce7480fbf154 |
| frente_amplio/20261112_infobae_bustinduy_renovacion_automatica.txt | 24330093a6c8703653af6fdf76f8f1b1ae366d153cadb3c3fcdefcb2ab470fb1 |
| junts/20261112_idealista_diputacion_permanente_vivienda.txt (copia idéntica en vox/) | 0b477c553e52c146bd5592b3984fc6e732403c62c334d75968c0fbd6a6baf62a |
| junts/20261112_junts_nogueras_inici_campanya.txt | b6ed7e955affa7ce3e8cf6784e6f1df8abccf86cf4cc34d86b0d9dfd20e55279 |
| junts/20261106_canal21ebre_cruset_nuclears.txt (descarte) | 10d72119ad808b96749d79aece5261774a7dc24fb4ca89657410c991bab3bdcc |
| erc/20261007_esquerra_arrendament.txt | 298e3a8557913ffb056f0377c46b3d0c8c3514519327331271b011c95bda7c3a |
| erc/20261106_esquerra_salari_minim.txt | 280d54707e77356640049c00a40b069604f40c47a8994256787fd7ba46192104 |
| pnv/20261015_eajpnv_vaquero_renew.txt | 57f74c98b1d5baca43face04c2b51ea1737dabd645b8b4c3bef70843f86e4b93 |
| pnv/20261109_eajpnv_programa_nota.txt | 460c57e536bd35f2c482d2eacdcdea62231783c5607c8b46bc1aa4604b60d1e5 |
| cc/202610_diariodeavisos_decretos_vivienda.txt (descarte) | 180d9010f7d4d1cd009c1e1e90cbf19b78b7d2b8764be5aab3dbfc2b606da104 |
| bng/20260930_elsalto_decretos_vivenda.txt (descarte) | fad90aa114879f3c5ea75a2d8f4f225076f91aefc4fdfb41fd81cdf6329d759b |

## 9. Integración (cuando se verifique)

1. En `preguntas.json`:
   - Pasar q02, q07, q14, q27 y q28 a un bloque de retiradas. No se debe reutilizar su id.
   - Añadir q31 a q35. Además de los campos de la propuesta, conviene añadir `texto_anterior: null`.
2. En `codificacion_g1/g2/g3.json`, añadir las celdas de `posiciones_nuevas` y la de Junts q12. Los partidos de cada grupo:
   - g1: pp, upn, psoe, psc, vox, salf.
   - g2: frente_amplio, podemos, compromis, ara_mes_fa, upc, adelante_andalucia.
   - g3: erc, junts, eh_bildu, pnv, bng, cc.
3. Ejecutar `python3 -I pipeline/build_fase1.py`.
   - Las citas de programa ya pasan su comprobación de literalidad.
   - Las de campaña tienen URL, fecha (posterior al 6-oct) y autor.
