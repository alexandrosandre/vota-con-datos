# g9: continuación del 14-nov de g7 para PSC y EH Bildu (sin verificar)

Fichero: `codificacion_g9.json`. **Pendiente de verificación independiente**: no hay `verificacion_g9.json`, así que `pipeline/build_fase1.py` omite el grupo.

g7 se quedó sin cupo de búsqueda con el PSC (5/30) y EH Bildu (13/30). Este turno retoma lo que g7 dejó sin buscar. Se aplicó `docs/prompts/2_codificacion_posiciones.md` con las reglas del 13-nov:
- cuentan las declaraciones literales en primera persona de líderes del propio partido desde el 1-nov-2025;
- cuenta quien habla en nombre de su grupo en un debate parlamentario (criterio de g4 y g5, también en parlamentos autonómicos);
- cuentan los documentos oficiales del partido;
- para el PSC, Sánchez cuenta solo en actos o documentos del PSC.

No se repite ningún descarte anterior (g4, g5, g7 y `verificacion_g5.json`) sin una fuente nueva.

## Resultado

| Partido | Antes | Propuestas en g9 | Dudosas sin valor | Después |
|---|---|---|---|---|
| PSC | 5 | — | — | 5 |
| EH Bildu | 13 | — | q11 | 13 |

**No hay posiciones nuevas.** Las fuentes nuevas que aparecieron son paráfrasis, medidas distintas, críticas sin propuesta o votos sin palabras.

Las copias están en `data/sources/fase1/g9_2026-11-14/<partido>/`, con su sha256 en `fuentes`. La cita de la dudosa es literal según `norm()` de `pipeline/verify_quotes.py`.

## Fuentes nuevas revisadas (las dos formaciones)

- **Congreso, Diario de Sesiones de las Comisiones, núms. 425-636** (oct-2025 a oct-2026).
  - Por primera vez para estos dos partidos; g7 solo las había revisado para Junts.
  - Se trocearon por orador y se buscaron por palabras clave de las celdas vacías.
  - El núm. 637 y siguientes dan 404.
- **Congreso, Pleno, núms. 140-212**, para los diputados del PSC que el barrido del 13-nov no incluía: Aranda, Ramírez Carner, Conesa, Cercas, Verdejo, Marqués, Jerez, Martín Martínez, Paré, Mellado, Andrés, Canelo y Almirón.
  - La lista de diputados del PSC y de EH Bildu se tomó de los datos abiertos del Congreso (activos y de baja).
- **Senado, Pleno, núms. 99-138**, para los 15 senadores del Grupo Socialista elegidos o designados en Cataluña.
  - La lista sale de los datos abiertos del Senado.
  - El núm. 139 y siguientes dan 404.
- **Parlamento de Navarra**, para el grupo de EH Bildu: Aznal, Zabaleta, Arza, Araiz, Maiz, Mendo Goñi, Jiménez Aragón y Gallo San Román.
  - Comisiones de Salud, Educación, Economía, Derechos Sociales, Vivienda y Presidencia, de nov-2025 a oct-2026 (no revisadas antes).
  - Plenos 85-113.
  - Los índices dan 403 y no se sortearon; los PDF se piden directamente por su ruta pública.
  - Los plenos de oct-nov 2026 (núm. 114 y siguientes) aún no están publicados.

## PSC (25 celdas vacías)

**Pendiente de g7: entrevistas del 13-14-nov.**
- Se buscaron entrevistas a Hereu, Illa y Moret del 13-14-nov. No se encontró ninguna de esos días.
- La Vanguardia, El Periódico y RAC1 no son accesibles al buscador: el buscador lo rechaza para esos dominios. No se sorteó.
- Sí se leyeron enteras estas entrevistas:
  - Hereu en Público (12-nov; ya usada en compromisos) y en Crónica Global (9-nov; ya fuente de q17 y q18).
  - Illa en RAC1 (crónica de NacióDigital, 9-nov) y en Catalunya Ràdio (crónica de Demócrata).
  - Hereu en el acto de NacióDigital (12-nov) y en El Nacional (5-nov).
  - Crónicas del arranque de campaña: Ara (12-nov), El Nacional y NacióDigital (13-nov).
- Todo es mensaje general (Sánchez o Feijóo-Abascal, pensiones, autogobierno) o está en paráfrasis.

**RSS oficial de socialistes.cat (14-nov, tarde):** no hay notas posteriores a las del 13-nov, que g7 ya había leído.

**Búsqueda específica de las 12 celdas que g7 no buscó en la web.**

- **q03.**
  - Cantenys, senadora del PSC por Girona, en el Senado (DS 105, 26-nov-2025) rechaza el «catálogo de rebajas fiscales» de Vox sobre el IVA y las transmisiones, entre otros impuestos de la vivienda.
  - Es un rechazo genérico a rebajas para todos, sin hablar de los jóvenes ni de la primera vivienda. Más débil que el EH Bildu q03 que g4 dejó como dudoso. Null.
- **q08.** Perea (Comisiones, núm. 582) habla de los coeficientes reductores por actividad, no de volver a los 65 años. Medida distinta.
- **q09.**
  - Andrés Añón (Comisiones, núm. 599) y Conesa critican «la sanidad privada» o la colaboración público-privada en vivienda.
  - Illa, en el AXA (crónica de NacióDigital, 12-nov), habla de la «privatització de la sanitat» en paráfrasis.
  - Genérico.
- **q11.** No hay ninguna intervención del PSC sobre la concertada. El acuerdo del Govern con la concertada (391 M€) es acción de gobierno, sin palabras de un líder.
- **q15.** Romero (Senado, DS 112, 4-feb-2026), Mellado y Cercas defienden la regularización de 2026, no otra. Zaragoza (DS 195) la enumera entre los logros. Medida distinta.
- **q20.** Martín Martínez, Jerez y Mellado hablan de descarbonización y de zonas de bajas emisiones, sin el objetivo del 65 %. Genérico.
- **q25, q27, q30, q34 y q35.** No hay ninguna mención de líderes ni de diputados o senadores del PSC.
- **q32.**
  - El PSC votó a favor de la moción de ERC en el Parlament para un SMI catalán ≥ 60 % del salario medio (NacióDigital, 5-nov). Es solo voto.
  - Conchi Jiménez (Parlament, 21-oct), al retirar la enmienda a la totalidad de la ley del salario de referencia, no se pronuncia sobre la medida y no es líder.
  - Null.

**Otras celdas con algo nuevo, todo sin valor.**
- **q01 y q31.**
  - Hereu en Público: «regular con eficacia el mercado» y defensa de los decretos tumbados, sin nombrar el tope estatal ni la prórroga.
  - Conesa y Ramírez Carner (Pleno 143, 149, 167 y 181; comisiones 590 y 598) defienden las zonas tensionadas, que es otra medida.
  - Mismo motivo que la dudosa q31 de g7.
- **q04.**
  - Zaragoza (DS 195) y Perea (DS 173) enumeran el impuesto a las grandes fortunas entre los logros del Gobierno o frente al PP. No hablan de hacerlo permanente.
  - Mismo criterio que PSOE q04 (Arcadi España, g4): null.
  - Illa en RAC1 pide «més impostos al capital», pero solo en estilo indirecto.
- **q05.** Illa en RAC1 rechaza deflactar el IRPF. Es el tramo autonómico y en estilo indirecto. Medida distinta, mismo criterio que PNV q05.
- **q12.** Illa en RAC1: «el model d'escola no es toca». Mismo criterio que la dudosa de g5: null.
- **q13.**
  - Varios diputados del PSC atacan la «prioridad nacional» de PP y Vox: Zaragoza (DS 181 y 195), Soldevilla (DS 189), Andrés Añón (DS 191), Marqués (DS 195) y Verdejo (DS 197 y Comisión 549).
  - Lo hacen en contextos de sanidad, cuidados, mundo rural o transporte, no de vivienda social.
  - Conesa (DS 181) se burla de la contradicción («Mucha prioridad nacional, pero, si echan a un español de su casa...»), pero no rechaza la medida.
  - Genérico, mismo criterio que g7 («la nostra prioritat nacional són totes les persones»).
- **q06, q19, q23, q24, q26, q29 y q33.** No hay nada nuevo. Los aciertos de palabras clave son homónimos: «seguridad ciudadana» por la multirreincidencia, «okupas» como metáfora, «3,5 %» de vivienda pública.

**Sin acceso:**
- Diari de Sessions del Parlament: el índice redirige a un buscador APEX que no se usó.
- socialistes.cat: los artículos dan 403.
- La Vanguardia, El Periódico y RAC1: el buscador no los cubre.

## EH Bildu (17 celdas vacías)

**Pendiente de g7.**
- Se buscaron Berria, Radio Euskadi, debates de EITB y entrevistas a Etxebarrieta, Otxandiano y Elejabarrieta.
- El buscador no devuelve ninguna pieza de noviembre de 2026 de Berria, Radio Euskadi ni EITB. No hay crónica ni vídeo de un debate de EITB de estas elecciones.
- La entrevista a Etxebarrieta en Orain (26-oct) solo aparece por el titular.

**ehbildu.eus (14-nov):** dos notas nuevas desde g7, sin medidas sobre las celdas vacías.
- Inicio de campaña en Gasteiz con Otegi, Matute, Otero, Bideguren y Estarrona.
- Acto de Eibar con Etxebarrieta, Matute y Elejabarrieta: vivienda, fondos buitre y movilización.

### Dudosa

- **q11 (posible −1).** Eneka Maiz, parlamentaria foral y cabeza de lista por Nafarroa, en la Comisión de Educación del Parlamento de Navarra (DS núm. 30, 22-abr-2026, p. 27).
  - Cita en euskera: «Gure ustez ez dira itxi behar unitateak ez publikoan, ez ikastoletan. Argi eta garbi.»
  - Traducción oficial del Diario: «Creemos que no hay que cerrar las unidades ni en lo público ni en las ikastolas. Claramente.»
  - Añade que las ikastolas son «absolutamente necesarias junto con la red pública». Lo repite en el Pleno del 14-may (DSPN 103).
  - **Por qué no tiene valor:** defiende solo las ikastolas, que presenta como red «público-comunitaria».
  - Separa esa defensa de la concertada en general: distingue entre estar de acuerdo con «reducir las unidades concertadas cuando no haya demanda suficiente» y aplicarlo bien, y reprocha a UPN «meter la pública y la concertada en el mismo saco».
  - Es ambivalente sobre retirar la financiación a la concertada.
  - Si el verificador lo ve como PNV q11 (FP concertada, −1), sería −1.

### Sin posición

- **q01.** Zabaleta (Comisión de Vivienda del Parlamento de Navarra, núms. 32 y 35) y Maiz (DSPN 85) piden extender la zona tensionada en Navarra y «regular y limitar» el sector. Medida distinta. La dudosa q01 de g7 sigue igual.
- **q04.**
  - Aznal (DSPN 99): «Es hora de que las grandes fortunas [...] pongan de su parte». Genérico, mismo criterio que Elejabarrieta en g5.
  - Araiz (DSPN 88) critica el impuesto foral de patrimonio, que es otra figura.
- **q05.** Aznal (DSPN 87) defiende la exención foral por debajo de 17.000 €. Es IRPF foral, sin los dos tipos. Medida distinta.
- **q09.** Ubera, portavoz de Salud en el Parlamento Vasco, critica en la Comisión de Salud del 3-nov (elDiario.es) el gasto creciente en derivaciones, «privatizando más», pero no propone prohibirlas.
  - El compromiso de suprimir derivaciones es del programa vasco de 2024, fuera de plazo.
  - Mismo motivo que g7: null.
- **q13.**
  - Arza (DSPN 106) critica la «prioridad nacional» indirecta en la renta mínima, no en la vivienda.
  - Zabaleta (DSPN 104 y 105) usa la expresión con ironía frente a los fondos extranjeros.
  - Genérico.
- **q15.**
  - Arza (Comisión de Vivienda del Parlamento de Navarra, núm. 38, 29-sep-2026) dice que la regularización de 2026 «es una solución parcial» y que hace falta «exigir cambios estructurales en nuestra legislación». No pide otra regularización.
  - En DSPN 92, 94 y 100 celebra la de 2026.
  - Medida distinta, como el descarte de Iñarritu en g4.
- **q22.** Gallo San Román (Comisión de Presidencia e Igualdad) reivindica las estructuras forales de igualdad, no el Ministerio. Medida distinta.
- **q03, q08, q12, q17, q18, q19, q20, q21 y q25.**
  - No hay nada nuevo en las comisiones del Congreso ni en el Parlamento de Navarra.
  - Pozueta (Comisión de Igualdad, núm. 589) defiende el acceso al aborto frente al acoso ante las clínicas, sin hablar de la reforma constitucional.
  - Otero (comisiones 455, 467 y 489) habla de descarbonización sin el objetivo del 65 % y de eólica terrestre.

**Sin acceso:**
- El Diario de Sesiones del Parlamento Vasco sigue siendo inaccesible: hay que pasar un formulario.
- Naiz y Gara cargan sus portadas por JavaScript.
- Los plenos del Parlamento de Navarra de oct-nov 2026 aún no están publicados.

## Qué queda sin buscar

- **PSC:**
  - El Diari de Sessions del Parlament (buscador APEX).
  - Entrevistas en La Vanguardia, El Periódico y RAC1: el buscador no las cubre.
  - Las comisiones del Senado.
  - El acto central con Sánchez en Barcelona, aún sin fecha: si se celebra, es la ocasión en que lo que diga Sánchez cuenta para el PSC.
  - El programa del PSOE (15-nov), por si el PSC lo asume expresamente.
- **EH Bildu:**
  - El Diario de Sesiones del Parlamento Vasco.
  - Berria y Naiz (por JavaScript).
  - Radio Euskadi y los debates de EITB de estas elecciones: no hay ninguno indexado.
  - Los plenos del Parlamento de Navarra desde el núm. 114 cuando se publiquen.
  - El programa del 29-N si se publica.

## Para el verificador

1. **EH Bildu q11 (dudosa):** decidir si defender las unidades concertadas de las ikastolas equivale a una posición sobre la concertada en general (criterio PNV q11) o es ambivalente.
2. **Liderazgo:**
   - Maiz habla por su grupo en una comisión del Parlamento de Navarra; es el criterio de g5 (EH Bildu q29, Mendo Goñi).
   - Los senadores del PSC hablan por el Grupo Socialista, como los diputados del PSC en el Congreso.
