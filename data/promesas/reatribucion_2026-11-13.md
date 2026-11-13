# Reatribución de promesas (13 de noviembre de 2026)

Misma decisión del editor que en `data/fase1/reatribucion_2026-11-13.md`: las entradas `upn`, `upc`, `ara_mes_fa`, `compromis` y `coalicion_canaria` (`cc` en la web) pasan a describir los partidos UPN, NC-BC, Ara Més, Compromís y Coalición Canaria. Cada promesa se revisa por quién la dice. El total pasa de 141 a **138**. El nombre anterior de cada entrada queda en `nombre_candidatura`.

## Regla aplicada

Vigente (13-nov-2026, segunda decisión del editor): lo que dice un líder cuenta solo para su partido; los documentos conjuntos de una coalición cuentan para **cada partido de la web que firma el pacto** (`data/boe/coaliciones.json`; los firmantes del Frente Amplio, para Frente Amplio; ERPV, para ERC). Excepción: lo que dice Pedro Sánchez en actos o documentos del PSC cuenta para el PSC (federado con el PSOE desde 1978, mismo candidato a la Presidencia); Feijóo no cuenta para UPN. Ver «Documentos conjuntos para cada firmante» al final.

## Retiradas (3)

1. **NC-BC (`upc`)**: «Promover que el salario mínimo interprofesional llegue a 1.800 euros, de forma progresiva» (Canarias7, 4-nov). La crónica la atribuye a «Luis Campos e Iratxe Serrano», pero la cifra y la cita son de Iratxe Serrano, de Podemos (n.º 2 por Las Palmas): «Esos 1.800 euros es la cuantía que Serrano estima necesaria». Campos solo pidió «seguir incrementando el salario mínimo», sin cifra. **Candidata para Podemos** (no se mueve).
2. **Coalición Canaria (`coalicion_canaria`)**: «Exigir al Estado un convenio bilateral de vivienda con Canarias y destinar a vivienda pública recursos del superávit… y del Fdcan» (Canarias7, 7-nov). La dijo Teodoro Sosa, cabeza de lista por Las Palmas y de Municipalistas Primero Canarias (`data/boe/afiliaciones_g3.json`). Municipalistas Primero Canarias no es una entrada de la web: queda solo apuntada.

3. **Ara Més (`ara_mes_fa`)**: «Topar los precios de los alimentos básicos y crear un impuesto especial sobre los márgenes… de la distribución alimentaria» (Sóller, 7-nov; Última Hora y Periódico de Ibiza, Europa Press). La dijo Carme Gomila, de ERC (decisión del editor, 13-nov). Fuentes de la afiliación: Ara Balears (`data/boe/afiliaciones_g1.json`, https://en.arabalears.cat/politics/carme-gomila-leaves-the-manacor-city-council-to-seek-new-professional-challenges_1_5623156.html: nueva presidenta de ERC en las Illes Balears) y El Nacional, 12-nov (`data/sources/compromisos/erc/elnacional_tarragona_20261112.txt`: «presidenta d'Esquerra Republicana a Mallorca»). Ara Més es la federación de MÉS per Mallorca, Més per Menorca y Ara Eivissa, sin ERC. **Candidata para ERC** (no se mueve).

## Se mantienen

- **UPN (3)**: acuerdo de coalición UPN-PP publicado por UPN (documento conjunto que firma UPN).
- **NC-BC (6)**: Luis Campos (secretario general de NC-BC) y la tribuna de Román Rodríguez (NC-BC) sobre el programa de la coalición.
- **Ara Més (1)**: la del IVA del transporte de mercancías, comunicado de la coalición (su «quien» pasa a ser la coalición, no Gomila).
- **Compromís (12)**: Àgueda Micó (Més-Compromís) y Alberto Ibáñez (Iniciativa del Poble Valencià, de Compromís).
- **Coalición Canaria (11)**: Cristina Valido (CC), el acuerdo de unidad y el programa conjunto que publica CC. En la de la compra de vivienda por extranjeros, la promesa es de Valido; que Teodoro Sosa la repitiera no cambia su atribución.

Los ficheros `data/promesas/_parts/*.json` son borradores anteriores (ya no coinciden con `promesas.json`, p. ej. `upc` tiene 5 promesas y `coalicion_canaria` 11) y no se han tocado.

## Revisión posterior (13 de noviembre de 2026)

**SMI de 1.800 euros (Iratxe Serrano): no se mueve a Podemos.** Las reglas de quién cuenta son las del paso 1 y del paso 2 (`docs/prompts/1b_seleccion_compromisos.md`): un líder del partido (líder nacional, candidato a la Presidencia, cabezas de lista, líderes autonómicos o secretarios generales, portavoces oficiales) o un documento oficial del partido. Iratxe Serrano es la n.º 2 de Unidad del Pueblo Canario por Las Palmas (BOE-A-2026-23103; RTVC, 26-oct: «la segunda posición corresponde a Iratxe Serrano, de Podemos, quien fue directora general de Infancia y Familias del Gobierno de Canarias»): no es cabeza de lista ni consta como dirigente o portavoz de Podemos. Además, la cifra no está en sus palabras entre comillas, sino en la redacción de Canarias7 («Esos 1.800 euros es la cuantía que Serrano estima necesaria»), y la crónica presenta la medida como de los dos candidatos de UPC («promoverán iniciativas para que [...] el salario mínimo interprofesional llegue a los 1.800 euros»). Ante la duda, no se atribuye: queda fuera de `promesas.json`. La cifra de 1.800 euros de Irene Montero (Demócrata, 6-nov) sigue pendiente de decisión en las notas de Podemos, como antes.

**Candidato de Ara Més.** El campo `candidato` de `ara_mes_fa` en `promesas.json` decía solo «Carme Gomila», que bajo la entrada del partido Ara Més podía leerse como su líder. Ahora dice que es la cabeza de lista de la coalición, de ERC, y que no se cuenta como líder de Ara Més, igual que `partidos.json` (que es el campo que muestra la web).

**Candidato del PNV.** `promesas.json` dice Idoia Sagastizabal y `partidos.json` Maribel Vaquero. Según el BOE (`data/boe/listas_congreso.json`), el PNV tiene tres cabezas de lista: Idoia Sagastizabal (Bizkaia), Maribel Vaquero (Gipuzkoa) y Gorka Urtaran (Araba). Ninguno de los dos campos es falso; no se ha cambiado ninguno (pendiente de decisión del editor).

## Documentos conjuntos para cada firmante (13 de noviembre de 2026, segunda decisión del editor)

Se revisaron las promesas que salen de documentos de coalición:

- **PP (+3):** las tres del acuerdo de coalición UPN-PP (13-oct), que firman UPN y el PP: suprimir la disposición transitoria cuarta, defender el Régimen Foral y el Convenio Económico, e inversiones del Estado en Navarra. Se mantienen también en UPN.
- **Frente Amplio (+1):** la del comunicado de Ara Més-Front Ampli (12-nov) sobre el IVA del transporte de mercancías con destino a Baleares; la coalición la firman Movimiento Sumar, Izquierda Unida y Recortes Cero. Se mantiene también en Ara Més.
- **Sin cambios:** las promesas de NC-BC son de Luis Campos y de una tribuna de Román Rodríguez (NC-BC), no del manifiesto; las de Compromís, de Àgueda Micó y Alberto Ibáñez; los documentos conjuntos de Coalición Canaria (acuerdo de unidad, bases del programa) los firma con ella Municipalistas Primero Canarias, que no es una entrada de la web.

Total: 138 → **142** (PP 13 → 16, Frente Amplio 10 → 11). También se corrige en las notas de Podemos su ámbito en coalición: Compromís: Front Valencià abarca toda la Comunitat Valenciana y Unidad del Pueblo Canario toda Canarias.

## Revisión posterior (13-nov, tarde): Gomila cuenta para Ara Més

**Evidencia.** Carme Gomila es presidenta de ERC en Baleares y, además, «responsable d'Estratègia i Relacions Polítiques de MÉS per Mallorca» (dBalears, 24-oct-2026, https://www.dbalears.cat/balears/politica/2026/10/24/423549/mes-per-mallorca-proposa-carme-gomila-com-candidata-congres-tria-rosa-cursach-per-senat.html, copia en `data/sources/compromisos/ara_mes_fa/dbalears_20261024_candidatura.txt`), y MÉS per Mallorca es uno de los tres partidos de la federación Ara Més. La asamblea de MÉS per Mallorca la propuso y el Comité Federal de Ara Més «ha ratificado este sábado por unanimidad» su candidatura como cabeza de lista (Canal 4 Diario, 24-oct-2026, https://canal4diario.com/29n/2026/10/24/ara-mes-proclama-por-unanimidad-a-carme-gomila-como-candidata-al-congreso-para-las-elecciones-del-29n/, copia en `data/sources/compromisos/ara_mes_fa/canal4diario_20261024_proclamacion.txt`). Su afiliación queda en `data/boe/afiliaciones_g1.json` como «Esquerra Republicana (ERC) y MÉS per Mallorca». Por la mañana solo constaba como presidenta de ERC (Ara Balears, El Nacional) y, ante la duda, no se le atribuyó a Ara Més.

**Decisión del editor (13-nov, tarde):** lo que dice Gomila cuenta para Ara Més, no para ERC. Corrige lo dicho arriba sobre Gomila: lo que se apuntó como «candidato para ERC» deja de serlo.

- **Se restaura** en Ara Més (`ara_mes_fa`) la promesa «Topar los precios de los alimentos básicos y crear un impuesto especial sobre los márgenes… de la distribución alimentaria» (Sóller, 7-nov; Última Hora y Periódico de Ibiza, Europa Press), tal como estaba. Deja de ser candidata para ERC.
- El campo `candidato` de Ara Més describe a Gomila como cabeza de lista de la coalición, dirigente de MÉS per Mallorca, que la propuso, y presidenta de ERC en Baleares (sin «no se cuenta como líder»). Corrige el párrafo «Candidato de Ara Més» de arriba.
- La del IVA del transporte de mercancías sigue como comunicado de la coalición (en Ara Més y en Frente Amplio).
- Total: 142 → **143** (Ara Més 1 → 2).

