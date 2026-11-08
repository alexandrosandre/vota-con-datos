# Partidos y programas: elecciones generales del 29-N de 2026

Última comprobación: 8 de noviembre de 2026, entre las 21:50 y las 22:05 (+01:00). Los datos estructurados están en `partidos.json`.

## 1. Universo de partidos

Se incluyen las candidaturas al Congreso que cumplen al menos uno de estos criterios:

- **(a)** Tienen escaños en el Congreso de la XV legislatura, elegido el 23-J de 2023, o son la candidatura sucesora de quien los tiene.
- **(b)** Al menos una encuesta reciente de un instituto reconocido les asigna 1 o más escaños.

El universo resultante son 18 candidaturas.

| id | Candidatura | Ámbito | Criterio |
|---|---|---|---|
| pp | Partido Popular | estatal, 51 circunscripciones (no Navarra) | a, 137 escaños en 2023 |
| upn | UPN-PP | Navarra | a, 1 escaño de UPN en 2023 |
| psoe | PSOE | estatal, 48 circunscripciones (no Cataluña) | a, 102 escaños en 2023 |
| psc | PSC | Cataluña | a, 19 escaños en 2023 |
| vox | Vox | estatal, 52 circunscripciones | a, 33 escaños en 2023 |
| frente_amplio | Frente Amplio (Sumar, IU, Comuns, Más Madrid, CHA…) | estatal, 43 circunscripciones | a, sucesora de Sumar |
| podemos | Podemos | estatal, 41 circunscripciones | a, y b |
| compromis | Compromís: Front Valencià | Comunitat Valenciana | a, sucesora de Sumar |
| upc | Unidad del Pueblo Canario | Canarias | a, y b (0–1) |
| ara_mes_fa | Ara Més-Front Ampli | Illes Balears | a, sucesora de Sumar |
| erc | ERC | Cataluña | a, 7 escaños en 2023 |
| junts | Junts | Cataluña | a, 7 escaños en 2023 |
| eh_bildu | EH Bildu | País Vasco y Navarra | a, 6 escaños en 2023 |
| pnv | EAJ-PNV | País Vasco | a, 5 escaños en 2023 |
| bng | BNG | Galicia | a, 1 escaño en 2023 |
| cc | CCa-Municipalistas Primero Canarias | Canarias | a, 1 escaño en 2023 |
| adelante_andalucia | Adelante Andalucía | Andalucía | b |
| salf | Se Acabó La Fiesta | estatal, 46 circunscripciones | b, solo en una encuesta (marginal) |

**De dónde salen los datos de las candidaturas**

- Nombres de las candidaturas, circunscripciones y cabezas de lista: BOE-A-2026-23103, de 3 de noviembre, con la corrección BOE-A-2026-23383, de 7 de noviembre. Se analizaron las 52 juntas provinciales.
- Escaños de 2023: resultados del 23-J (JEC, BOE-A-2023-18907), tal como los recoge Wikipedia: PP 137, PSOE 121 (102 del PSOE y 19 del PSC), Vox 33, Sumar 31, ERC 7, Junts 7, EH Bildu 6, PNV 5, BNG 1, CC 1 y UPN 1.

**El espacio de Sumar (31 escaños en 2023)**

- En 2026 ese espacio se presenta repartido en cinco candidaturas: Frente Amplio, Podemos, Compromís: Front Valencià, UPC y Ara Més-Front Ampli.
- `escanos_2023` vale `null` en las cinco, porque no existe una cifra oficial por candidatura.
- Wikipedia hace un reparto no oficial: FA 22, Podemos 3, Compromís 4, Ara Més-FA 1 y UPC 1. Ese reparto figura en `escanos_2023_nota`.

**Encuestas que justifican el criterio (b)**

- **Adelante Andalucía:**
  - Sigma Dos/El Mundo, publicada el 1-nov: 3–4 escaños.
  - ElectoPanel/Electomanía, publicada el 1-nov: 2 escaños.
  - Ambas comprobadas en la fuente original.
- **Podemos:**
  - ElectoPanel, 1-nov: 1 escaño.
  - Sigma Dos, 1-nov: «a lo sumo un asiento».
- **SALF:**
  - GESOP/El Periódico, publicada el 12-oct: 2 % de voto, «podría hacerse incluso con un escaño por Madrid».
  - SocioMétrica (1-nov) y ElectoPanel (1-nov) le dan 0 escaños.
  - Es la inclusión más débil.
- **UPC:** Sigma Dos, 1-nov: «un escaño en Canarias para CC o UPC».
- El resto de valores de encuestas sale de la tabla de Wikipedia «Encuestas de opinión para las elecciones generales de España de 2026».

**Formaciones excluidas, con el motivo**

- **Aliança Catalana:** no se presenta al 29-N; Orriols pide la abstención (Ara, ES Diario). Sigma Dos le daba 3 escaños en septiembre, pero no concurre.
- **Coalición Existe / Teruel Existe:** solo se presenta en Teruel. No se ha encontrado ninguna encuesta que le dé escaño; ElectoPanel le da 0,0 % y 0 escaños.
- **Democracia 21** (con Cs y UCIN), Alhora, Drago Canarias, Geroa Bai, Soria ¡Ya!, PACMA y Frente Obrero: ninguna encuesta consultada les da escaño.
- No presentan candidatura: CUP, PRC, Partido Riojano, Volt, UPL, entre otros (según Wikipedia).

## 2. Estado de los programas

Todas las comprobaciones se hicieron en la web oficial de cada partido.

| id | Estado | Fecha | Págs. | Fichero |
|---|---|---|---|---|
| bng | publicado | 2026-11-03 | 91 | `bng/26_bng_xerais_documentos_programa_electoral.pdf` (en gallego) |
| erc | publicado | 2026-11-05 | 48 | `erc/e2026-programa.pdf` (en catalán) |
| cc | publicado | 2026-11-08 | 23 | `cc/CCA-26-Programa_Electoral-29NOV.pdf` («Bases del programa», 69 MB) |
| pnv | no publicado | presentación anunciada el 9-nov a las 16:00 (agenda oficial) | | |
| pp | no publicado | presentación anunciada el 10-nov, solo en prensa (Europa Press), no en pp.es | | |
| upc | no publicado | solo un «Manifiesto electoral» de 6 págs. (3-nov), guardado como `documento_programatico` | | |
| ara_mes_fa | no publicado | programa en elaboración participativa desde el 3-nov, sin fecha | | |
| psoe, psc, vox, frente_amplio, podemos, compromis, junts, eh_bildu, adelante_andalucia, salf, upn | no publicado | sin fecha anunciada encontrada | | |

Junto a cada PDF hay una extracción en texto (`pdftotext -layout`, mismo nombre con extensión `.txt`). La huella sha256 de cada fichero está en `partidos.json`.

**Documentos complementarios guardados que no son programa**

- BNG: «Dez compromisos do BNG», 13 páginas, presentado el 7-nov.
- UPC: el manifiesto y la página HTML donde se publica.

**Cómo se ha fechado cada programa**

Ningún partido publicó una nota de prensa del lanzamiento que se haya podido localizar, así que las fechas de ERC, BNG y CC salen de los metadatos:

- la cabecera HTTP `Last-Modified`;
- la ruta de subida del fichero;
- la fecha de creación o modificación del PDF.

Cada caso se detalla en `fecha_fuente`. Las cabeceras HTTP están guardadas en `*.headers.txt`.

**Por qué es oficial y del 29-N cada documento publicado**

- **ERC:** el PDF está en esquerrarepublicana.cat, un dominio de ERC que redirige a esquerra.cat. Cada página lleva la cabecera «Eleccions al Congrés 2026».
- **BNG:** el documento está enlazado en bng.gal/estaticas/programas-eleitorais.html y se titula «Programa electoral 29N. Xerais 2026».
- **CC:** la portada de coalicioncanaria.org lo enlaza como «Programa electoral», y el texto dice «29 DE NOVIEMBRE DE 2026».

## 3. Programa marco y programas regionales

- **PSOE y PSC:** el PSC presenta candidatura propia en las 4 provincias catalanas, no es una coalición.
  - No hay programa del PSC ni del PSOE para el 29-N.
  - El PSC ha publicado programa propio en generales anteriores, por ejemplo en 2011, así que no está decidido cuál aplicará en Cataluña.
  - Las listas PSE-EE, PSdeG, PSN, PSIB y «Partido Socialista de Huelva (PSOE)» son marcas del PSOE: aplica el programa federal.
- **PP y UPN-PP:** en Navarra el programa lo redacta una comisión conjunta UPN-PP, según el preacuerdo del 13-oct. En el resto de España, incluida Cataluña («Partit Popular / Partido Popular»), aplica el programa nacional del PP.
- **Frente Amplio:** se presenta con marcas territoriales: Comuns-Front Ampli, CHA-Frente Amplio Aragón, Frente Amplio Andaluz, Frente Amplio-Fronte Ampla, Frente Amplio-Fronte Zabala y Frente Ampliu por Asturies.
  - Aún no hay programa común ni regional, y no consta si habrá un programa marco con anexos.
  - En Baleares la candidatura es Ara Més-Front Ampli, una coalición distinta.
  - No se presenta en la Comunitat Valenciana, Canarias, Teruel, Ceuta ni Melilla.
- **Podemos:** en sus 41 circunscripciones aplicará su propio programa. En la Comunitat Valenciana va dentro de Compromís: Front Valencià, y en Canarias dentro de UPC; allí aplica el programa de la coalición. En Cataluña apoya a ERC y no tiene lista propia.
- **EH Bildu:** se presenta también en Navarra. No consta un programa navarro diferenciado.
- **CC:** un solo documento conjunto con Primero Canarias para Las Palmas y Santa Cruz de Tenerife.

## 4. Salvedades

1. **PSOE sin comprobar de primera mano.** psoe.es responde con un desafío anti-bots de Imperva/Incapsula, que no se ha intentado sortear. Su estado «no publicado» se basa en webs de federaciones y en fuentes secundarias.
2. **Búsqueda web agotada.** Se alcanzó el límite de búsquedas web de la sesión, así que las comprobaciones finales se hicieron solo navegando las webs oficiales. Puede faltar alguna noticia de las últimas horas, sobre todo de Adelante Andalucía, SALF y PSOE.
3. **UPC, una decisión editorial.** UPC aparece como `no_publicado` porque su único documento se titula y se presenta como «Manifiesto» (6 páginas), no como programa. Si se decide contarlo como programa, basta con cambiar el estado: el fichero ya está guardado.
4. **CC titula su documento «Bases del programa electoral».** Se cuenta como publicado porque el partido lo enlaza como «Programa electoral».
5. **Podemos en León.** Civio afirma que su lista en León «no fue proclamada», pero el BOE del 3-nov la incluye y la corrección del 7-nov no la retira. Se ha seguido el BOE: 41 circunscripciones, con Ceuta como «PODEMOS (PAZ,CASA Y TRABAJO)».
6. **Los agregadores no coinciden entre sí** y solo se usaron para descubrir enlaces. A 8-nov:
   - tupapeleta.es da como publicados a BNG y ERC;
   - eleccionesenespana.es solo a ERC;
   - CC publicó el suyo el mismo 8-nov por la tarde.
7. **Volver a comprobar:**
   - PNV, después del 9-nov a las 16:00;
   - PP, el 10-nov;
   - después, todos los partidos a diario durante la campaña (13–27 de noviembre).
8. **Webs que no son oficiales:**
   - sumar.info, que ya no es de Sumar;
   - frenteamplio.es, un dominio aparcado;
   - unidaddelpueblocanario.es, en venta;
   - salf.es, solo un aviso de «próximo lanzamiento»;
   - frontvalencia.net, que no está enlazada desde compromis.net.

## 5. Fuentes principales

- BOE-A-2026-23103: https://www.boe.es/boe/dias/2026/11/03/pdfs/BOE-A-2026-23103.pdf
- BOE-A-2026-23383 (corrección): https://www.boe.es/boe/dias/2026/11/07/pdfs/BOE-A-2026-23383.pdf
- Wikipedia: https://es.wikipedia.org/wiki/Elecciones_generales_de_Espa%C3%B1a_de_2026 y https://es.wikipedia.org/wiki/Encuestas_de_opini%C3%B3n_para_las_elecciones_generales_de_Espa%C3%B1a_de_2026
- Civio: https://civio.es/el-boe-nuestro-de-cada-dia/2026/11/03/candidaturas-proclamadas/
- Sigma Dos/El Mundo: https://www.elmundo.es/espana/encuestas/2026/11/01/6ae77446e4d4d8f3698b458a.html
- ElectoPanel: https://electomania.es/electopanel-1-nov-el-psoe-baja-y-vuelve-a-minimos/
- GESOP/El Periódico: https://www.elperiodico.com/es/politica/20261012/encuesta-elecciones-generales-espana-2026-29n-135212729
- Aliança Catalana no se presenta: https://es.ara.cat/politica/alianca-catalana-no-presenta-elecciones-espanolas_1_5870081.html
- Las fuentes de cada partido están en el campo `fuentes` de `partidos.json`.
