# g8: barrido del 14-nov para CC, NC-BC, PNV y Ara Més (pendiente de verificación)

Posiciones propuestas en `codificacion_g8.json`. No hay `verificacion_g8.json`, así que `build_fase1.py` omite el grupo y `fase1.json` no cambia. Con una verificación aprobada simulada en una copia del repositorio, el build pasa sin errores.

Detalle por afirmación (dónde se buscó, descartes con URL y motivo, fuentes recorridas y sin acceso) en `barrido_2026-11-14/candidatas_<partido>.json`. Copias de las fuentes, con cabecera URL/Medio/Descargado, en `data/sources/fase1/barrido_2026-11-14/<partido>/`.

## Resultado

| Partido | Antes | Propuestas en g8 | Después, si se aprueban |
|---|---|---|---|
| CC | 4 | — | 4 |
| NC-BC (`upc`) | 6 | q22 −1 | 7 |
| PNV | 7 | — | 7 |
| Ara Més | 8 | q17 +1 | 9 |

- **NC-BC q22 −1.** Luis Campos, secretario general y cabeza de lista por Las Palmas, en una entrevista de Canarias Ahora (31-oct). Dice que un Gobierno de PP y Vox supondría «perder libertades, retroceder 40 años en derechos» y pone como ejemplo que el PP ya ha anunciado que suprimirá el Ministerio de Igualdad. Es el mismo criterio aplicado a PSOE, PSC, Frente Amplio, Podemos y Compromís. Esta entrevista no se había visto en los barridos anteriores.
- **Ara Més q17 +1.** Nota oficial de Més per Menorca (15-ene-2026) con declaraciones de su coordinador general, Esteve Barceló: «la solució real passa per un concert econòmic», con las islas recaudando todos los impuestos y contribuyendo al Estado.
  - Refuerzo: MÉS per Mallorca (Apesteguia, 24-nov-2025) pide un modelo «similar al concert econòmic».
  - Es fuente nueva: el 13-nov la web de Més per Menorca no se pudo leer (error de certificado en la dirección sin «www»).

Las dos citas son literales en la copia local y en la página descargada de nuevo hoy, y tienen 60 palabras o menos.

## Regla aplicada

`docs/prompts/2_codificacion_posiciones.md`, sobre todo «A qué partido cuenta cada fuente»:
- **Ara Més:** cuentan Carme Gomila cuando habla como candidata (cambio respecto al barrido del 13-nov), las notas de la coalición Ara Més–Front Ampli y las de MÉS per Mallorca, Més per Menorca y Ara Eivissa.
- **NC-BC:** cuentan los documentos de Unidad del Pueblo Canario, pero no los dirigentes de Podemos, IU ni Sumar.
- **CC:** no cuentan los dirigentes de Municipalistas Primero Canarias.
- **PNV:** cuentan los documentos de Geroa Bai, pero no los dirigentes de Geroa Bai que no son del PNV.

Programa primero en CC y PNV. No se repite nada ya codificado ni rechazado en g1-g6 sin una fuente nueva.

## Coalición Canaria (26 afirmaciones sin posición, ninguna nueva)

**Programa del 29-N, cotejado otra vez con cada afirmación vacía.** Solo trata de cerca:
- q01: «regulación estatal estable», sin tope.
- q03: incentivos a la primera vivienda, sin IVA ni ITP.
- q09: financiación sanitaria.
- q12: habla canaria, sin lengua cooficial.
- q16: «derecho a decidir su rumbo dentro del Estado».
- q20: aviación y navegación.
- q29: evaluar el impacto de los acuerdos comerciales.
- q30: compensaciones por insularidad.
- q32: incentivos a mejoras salariales pactadas.

Son medidas distintas, y nada cambia respecto a g3.

**Dónde se buscó:**
- coalicioncanaria.org: 168 notas con texto completo, del 1-nov-2025 al 13-nov-2026.
- Los 87 turnos de Cristina Valido en el Congreso (Diarios de Sesiones del Pleno 149 a 212).
- Parlamento de Canarias, Diarios de Sesiones 97 a 119: Clavijo, Toledo, Machín, Barragán y Oramas.
- Entrevistas de campaña a Valido: Canarias7 (9 y 13-nov), Canarias Ahora, El Espejo Canario, Diario de Avisos y Moncloa.com.
- RTVC.

**Por qué no hay posición:**
- **q18:** Valido (Congreso, 23-jul-2026) dice que aliviar la deuda no es «malo ―todo lo contrario―», pero «no estamos de acuerdo con la fórmula» y «no apoyaremos esa ley» si no se corrige. Es el mismo motivo por el que g4 (Clavijo) y g5 (San Ginés) quedaron en null.
- **q01:** Clavijo pide derogar la Ley de Vivienda estatal. Es otra medida, y el programa, posterior, solo pide una «regulación estatal estable».
- **q11:** Clavijo habla de «colaboración público-privada» en general, sin mencionar la concertada.
- **q13:** Clavijo rechaza la «prioridad nacional» de Vox en materia migratoria, no de vivienda social. Lo de Ana Oramas solo está en estilo indirecto.
- **q15:** Clavijo y San Ginés apoyan la regularización de 2026, la que estaba en curso; nadie pide otra.
- **q17 y q29:** siguen rechazadas, sin nada posterior al programa.
- **q23 y q26:** siguen en los descartes de g4.
- **q27:** Valido habla de recursos para Ceuta, sin las Fuerzas Armadas.
- **q30:** el decreto de topes en emergencias es otra medida.
- **Sin ninguna mención:** q04, q05, q06, q08, q21, q22, q24, q25 y q35.

## NC-BC (24 sin posición; 1 propuesta, q22)

**Dónde se buscó:**
- nuevacanariasbc.org: las 224 notas, del 2-nov-2025 al 16-oct-2026. La web no publica desde esa fecha.
- unidadpueblocanario.org: nada nuevo desde el 9-nov. No hay programa: /programa redirige al manifiesto, que no ha cambiado.
- Entrevistas y crónicas de campaña: Canarias Ahora, Canarias7, La Voz de Lanzarote, El Día, SER y RTVC.
- Las tribunas de Román Rodríguez en Diario de Avisos.
- Sumarios del Parlamento de Canarias hasta el Diario de Sesiones 118.

**Descartadas que el editor puede querer revisar** (detalle en `candidatas_upc.json`):
- **Tribunas firmadas por Román Rodríguez** en Diario de Avisos. Rodríguez es secretario nacional de Estrategias, Programas y Formación de NC-BC y expresidente del partido.
  - Las tribunas:
    - q18 +1 (2-ago-2026): el proyecto de condonación «es positivo para Canarias».
    - q26 −1 (5-jul-2026): rechazo al 5 % del PIB.
    - q29 −1 (15-feb-2026): hay que valorar el acuerdo en conjunto, con salvaguardas.
    - Sustitución de q04, de +1 a +2 (1-nov-2026): según él, el programa de UPC exige mantener «de forma permanente» el impuesto a las grandes fortunas.
  - Se descartan porque el protocolo incluye las «columnas de opinión» entre lo que no vale, y g2 ya rechazó por ese motivo una tribuna suya del 8-nov.
  - Si el editor decide que una tribuna firmada por un dirigente es una declaración en primera persona, estas cuatro serían las candidatas. Además, q29 se acerca a la ambivalencia y q26 no nombra el 3,5 %.
- **q32:** Miguel Ángel Pulido (El Día, 14-nov) pide que el salario mínimo «permanezca en manos del Estado». Se descarta por dos motivos:
  - Es presidente insular en La Palma y candidato al Senado, no líder nacional ni regional.
  - La frase puede referirse solo a fijar el salario mínimo estatal.
- **q19:** nota de NC-BC (4-nov-2025) que critica el recorte de la partida autonómica para eólica marina. Se descarta por dos motivos:
  - Es una partida del presupuesto canario y la frase está en la narración de la nota sobre lo que dijo un diputado autonómico.
  - En la misma nota el partido se opone a los «macroparques». Es una medida relacionada pero distinta.

**Otros descartes:**
- q31: apoyo a los decretos en bloque, el mismo motivo que en g5.
- q15: Rodríguez defiende la regularización que estaba en curso.
- q30: Campos responde a la carestía con el salario mínimo y el kilómetro cero, no con topes de precios.
- q13: limitar la compra de vivienda a no residentes es otra medida.
- q23: atribución a UPC solo en estilo indirecto de RTVC, y sobre otra medida.
- q27: la tribuna sobre Ceuta no habla de las Fuerzas Armadas.
- q16: el único referéndum que mencionan es el del Sáhara.

**Sin ninguna mención:** q05, q06, q08, q11, q12, q17, q20, q21, q24, q25 y q35.

## PNV (23 sin posición, ninguna nueva)

**Programa del 29-N, cotejado otra vez.** Se pronuncia sobre temas vecinos con medidas distintas:
- q01: regular los alquileres de temporada y los turísticos, sin tope.
- q08: eliminar penalizaciones a carreras largas.
- q24: «impulsar la reforma» de la ley mordaza, no derogarla.
- q29: condiciones equivalentes para las importaciones.
- q30: IVA cero o superreducido para los alimentos.
- q33: «distribución equilibrada» de los menores, pero entre países de la UE.

Nada cambia respecto a g3.

**Dónde se buscó:**
- eaj-pnv.eus: de las notas 58726 a 58950 solo existen la 58726 y la 58727. Documentos 21720 a 21790, entre ellos los discursos de apertura del 12-nov (Esteban, Vaquero, Urtaran, Sagastizabal y Pradales) y el de Vaquero en el acto con EGI del 13-nov.
- Bases políticas de Geroa Bai para el 29-N (13-nov), leídas enteras: Convenio, LORAFNA, infraestructuras y secretos oficiales.
- Entrevistas:
  - Esteban en La Vanguardia (14-nov).
  - Vaquero en EFE/Deia (14-nov), en RNE y en Herri Irratia.
- Crónicas de Deia, El Correo, El Diario Vasco, Noticias de Gipuzkoa y Álava, Orain y Europa Press.

**Por qué no hay posición:**
- **q23:** la enmienda del PNV que pedía el desalojo en un máximo de 48 horas es de principios de 2024, anterior al 1-nov-2025, y no vale. No se encontró ninguna reiteración dentro del plazo.
- **q06:** el apoyo a las 37,5 horas (Esteban y Vaquero) es de 2024-2025, también fuera de plazo.
- **q16, q12 y q13:** en la apertura de campaña solo hay fórmulas genéricas: «derecho a decidir», el euskera, «los de la Prioridad Nacional».
- **q01:** Vaquero dice «No es que nos opongamos a que haya intervención», sin hablar de un tope estatal.
- **Sin ninguna mención en el periodo válido:** q03, q04, q05, q09, q17, q18, q19, q20, q22, q25, q26 y q27.

**Coherencia con las posiciones vigentes:** Vaquero repite el 14-nov su rechazo a la prórroga indefinida de los alquileres (q31 −1), y Sagastizabal pide el 13-nov «un salario mínimo propio» (q32 +2).

## Ara Més (22 sin posición; 1 propuesta, q17)

**Dónde se buscó:**
- aramesfrontampli.cat y mespermallorca.cat, que comparten gestor: 700 notas con texto completo, de ago-2025 a 13-nov-2026, entre ellas las 13 notas de campaña con Gomila.
- www.mespermenorca.cat: 218 notas.
- Ara Eivissa: sin nada desde 2023.
- Gomila en la prensa: Ara Balears (entrevista del 14-nov), dBalears, VilaWeb, Canal 4, Diario de Mallorca, y las secciones electorales de Última Hora, Menorca.info y Periódico de Ibiza.
- Diario de Sesiones del Congreso 212.
- El programa de la coalición no está publicado: Gomila dijo el 14-nov que «sortirà en breu».

**Por qué no hay posición:**
- **q16:** solo el «dret a decidir» genérico (Gomila, 14-nov; Apesteguia, dic-2025).
- **q26:** Apesteguia critica «gastar més en defensa», sin el 3,5 %.
- **q11:** MÉS acepta los conciertos educativos «de manera complementària».
- **q21:** Castells pide un registro de objetores, que es otra medida.
- **q23:** la burla de la «oficina antiokupació» del Govern no habla del desalojo en 48 horas.
- **q15:** apoyo a la regularización que estaba en curso.
- **q18:** Apesteguia critica la cuantía de la condonación, sin posición sobre la medida.
- **q34, q04 y q06:** las notas útiles son anteriores al 1-nov-2025 (Sáhara 9-oct-2025, impuesto a la riqueza 17-oct-2025, jornada 30-oct-2025). La de MÉS per Palma sigue rechazada por ser una organización local.
- **Sin ninguna mención:** q03, q05, q08, q09, q19, q20, q22, q25, q27, q33 y q35.

**Coherencia con las posiciones vigentes:** Gomila repite el 14-nov el tope automático de los alquileres (q01 +1) y los precios controlados de los alimentos básicos (q30 +2).

## Para el editor

Las decisiones de valor que quedan abiertas:
- **Ara Més q17:** +1 o +2. La propuesta es expresa, pero viene de una nota de un partido de la federación, no de la campaña.
- **Tribunas de Rodríguez (NC-BC):** si cuentan como declaración en primera persona, entrarían q18, q26 y q29, y q04 pasaría de +1 a +2.
- **CC q18:** null, 0 o −1 (Valido, 23-jul-2026).
- **NC-BC q32:** Pulido no cuenta como dirigente.

## Límites del barrido

- **Búsquedas web:** se agotó el cupo a mitad del barrido. Algunas búsquedas temáticas se cubrieron solo con las webs oficiales y los Diarios de Sesiones:
  - PNV: q03, q04, q05, q08, q09, q12, q13, q20 y q30.
  - CC: aborto, regularización, salario mínimo, defensa y jornada.
  - Ara Més: no se encontró la entrevista de Gomila en RTVE.
- **Fuentes no disponibles:**
  - Diario de Sesiones del Congreso 213 (Diputación Permanente del 12-nov): da 404, aún no está publicado.
  - Parlamento de Canarias: los Diarios de Sesiones desde el 120 dan 404.
  - Parlamento Vasco: es una aplicación dinámica y no se consultó.
- **Sin acceso, no sorteado:** Onda Vasca (API y feed), el buscador de efe.com (403) y la Cadena SER (403).
- **Pendiente para un barrido posterior:**
  - Debates y entrevistas ya anunciados: el 16-nov, Vaquero en Euskadi Irratia y La1, Esteban en Onda Cero y Urtaran en un debate de la SER Euskadi; los debates de RTVC/RTVE en Canarias del 19 y el 24-nov.
  - Los programas de Ara Més–Front Ampli y de UPC, aún no publicados.
