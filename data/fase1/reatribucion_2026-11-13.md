# Reatribución de posiciones del paso 1 (13 de noviembre de 2026)

Decisión del editor: los pasos 1 y 2 tratan de **partidos**; el paso 3, de **papeletas**. Una coalición electoral regional es la forma en que algunos partidos aparecen en la papeleta de una provincia, no un partido con programa propio. Cinco entradas pasan a describir un partido:

| id (sin cambios) | Antes (coalición) | Ahora (partido) |
|---|---|---|
| `upn` | UPN-PP | Unión del Pueblo Navarro (UPN) |
| `upc` | Unidad del Pueblo Canario (NC-BC, Podemos, IU, Sumar) | Nueva Canarias-Bloque Canarista (NC-BC) |
| `ara_mes_fa` | Ara Més-Front Ampli | Ara Més |
| `compromis` | Compromís: Front Valencià | Compromís |
| `cc` | Coalición Canaria-Municipalistas Primero Canarias | Coalición Canaria |

Los ids no cambian (ver «Ids» al final).

## Regla aplicada

(Versión vigente, 13-nov-2026, tras la segunda decisión del editor.)

- **Líderes.** Cada declaración cuenta solo para el partido de quien la dice: un líder de NC-BC cuenta para NC-BC, uno de Podemos para Podemos, uno de IU, Movimiento Sumar o EUPV para Frente Amplio, etc. Ante la duda sobre la afiliación, no se atribuye.
- **Documentos conjuntos.** El manifiesto, el acuerdo, la nota conjunta o la web de una coalición cuentan para **cada partido de la web que firma el pacto de coalición** (`data/boe/coaliciones.json`). Los firmantes que forman el Frente Amplio (Izquierda Unida y sus federaciones, Movimiento Sumar, Recortes Cero…) cuentan para la entrada Frente Amplio; Esquerra Republicana del País Valencià (ERPV) cuenta para ERC, porque es el nombre de ERC en el País Valencià (art. 1 de los estatutos de ERC de 2025; `data/mapeo/candidaturas_2026.json`).
- **Precedencia** (`docs/prompts/2_codificacion_posiciones.md`): el programa oficial del partido va primero; entre declaraciones de campaña, la posterior prevalece. Si el partido ya tenía posición propia con el mismo valor, se mantiene la suya.
- **Excepción PSC-PSOE.** Lo que dice Pedro Sánchez en actos o documentos del PSC cuenta para el PSC: el PSC está federado con el PSOE desde 1978 y comparten candidato a la Presidencia del Gobierno. UPN y el PP son partidos independientes en una coalición electoral; por eso Feijóo no cuenta para UPN.

La primera versión de esta regla (la de las secciones siguientes, hasta «Revisión posterior») mantenía un documento conjunto solo en el partido sustituto de la entrada y no lo copiaba a los demás socios; queda sustituida. Ver «Documentos conjuntos para cada firmante» al final.

## Herencia UPN-PP → PP, retirada

`pipeline/build_fase1.py` ya no tiene `HEREDA`. UPN tomaba la posición del PP en las afirmaciones de alcance estatal: eran **12 posiciones heredadas**, ninguna propia. Ahora UPN solo tiene lo que dice UPN: **0 posiciones conocidas** (sus 30 celdas de `codificacion_g1.json` son nulas: no hay programa UPN-PP publicado y las notas de upn.org y las declaraciones de Leticia San Martín no tratan las afirmaciones). Se retiran también la etiqueta «· PP» de `web/src/pages/Coincide.tsx`, el campo `heredada_de` de `web/src/types.ts` y la frase de `web/src/pages/Metodologia.tsx`.

## Posiciones revisadas, una a una

Ninguna posición se mueve a otra entrada. Se retira una (Ara Més q30, ver abajo); las demás valoradas de estas cinco entradas las dice el propio partido o un documento conjunto de su coalición. A las de documentos conjuntos se les añade una nota «[Reatribución 13-nov…]» en `codificacion_g2.json`.

### `upc` → NC-BC: 5 se mantienen (todas de documento conjunto)

| Afirmación | Valor | Fuente | Decisión |
|---|---|---|---|
| q01 | +1 | Manifiesto electoral de UPC (3-nov), p. 3 | Se mantiene: documento conjunto que firma NC-BC. |
| q04 | +1 | Manifiesto, p. 4 | Igual. |
| q09 | +1 | Manifiesto, p. 3 | Igual. |
| q33 | −1 | Manifiesto, p. 4-5 | Igual. |
| q34 | +1 | Manifiesto, p. 5 | Igual. |

Nota: el Manifiesto lo firman NC-BC, Podemos, IU Canaria y Movimiento Sumar. Con la primera regla solo contaba para NC-BC; con la vigente cuenta también para Podemos y Frente Amplio (ver «Documentos conjuntos para cada firmante»).

### `ara_mes_fa` → Ara Més: 2 se mantienen, 1 retirada

| Afirmación | Valor | Fuente | Decisión |
|---|---|---|---|
| q01 | +1 | Nota oficial de Ara Més-Front Ampli (6-nov), con declaraciones de Carme Gomila | Se mantiene: documento de la coalición, cuyo partido principal es Ara Més. |
| q30 | +2 | Carme Gomila en el mitin de Palma (Demócrata, 8-nov) | **Retirada** (queda «sin posición conocida»): la dice Gomila, de ERC. |
| q32 | +1 | Nota oficial de Ara Més-Front Ampli (10-nov) | Se mantiene: documento de la coalición. |

**Carme Gomila (decisión del editor, 13-nov).** Es la cabeza de lista de Ara Més-Front Ampli, pero es de ERC. Fuentes de la afiliación: Ara Balears (`data/boe/afiliaciones_g1.json`, https://en.arabalears.cat/politics/carme-gomila-leaves-the-manacor-city-council-to-seek-new-professional-challenges_1_5623156.html: nueva presidenta de ERC en las Illes Balears) y El Nacional, 12-nov (`data/sources/compromisos/erc/elnacional_tarragona_20261112.txt`: «presidenta d'Esquerra Republicana a Mallorca»). Ara Més es la federación de MÉS per Mallorca, Més per Menorca y Ara Eivissa, sin ERC. Ante la duda, no se atribuye: lo que dice en primera persona no cuenta para Ara Més. Las notas oficiales de la coalición (q01, q32) sí, aunque las presente ella, porque hablan en nombre de la coalición que encabeza Ara Més. Ara Més queda con **2 posiciones conocidas** (antes 3).

### `compromis` → Compromís: 10 se mantienen

q01, q13, q18, q21, q30 (Àgueda Micó, elDiario.es y Alicante Plaza), q22, q23, q24, q34 (Àgueda Micó en el Congreso), todas de Micó, de Més-Compromís: se mantienen. q31 (web electoral de la coalición, frontvalencia.org): se mantiene como documento de la coalición, cuyo partido principal es Compromís.

### `cc` → Coalición Canaria: 4 se mantienen

q19, q33, q34 (programa conjunto CC-Municipalistas Primero Canarias, publicado por Coalición Canaria) y q31 (Cristina Valido, portavoz de CC en el Congreso): se mantienen.

### `upn` → UPN

Sin posiciones propias (ver arriba).

## Conflictos con posiciones del partido de destino

Ninguno: no se ha movido ninguna posición a otra entrada.

## Candidatas para más adelante

- **ERC** (no se mueve): q30, +2. Carme Gomila, mitin de Palma, 8-nov (Demócrata, https://www.democrata.es/ca/politica/ampliacio-ada-colau-adverteix-que-al-psoe-li-falten-forces-per-plantar-cara-a-les-elits/): «Feijóo, Abascal, Prohens, feu-vos a la idea que apujarem el salari mínim, […] i limitarem els preus dels aliments bàsics». Fuentes de la afiliación: Ara Balears (`data/boe/afiliaciones_g1.json`, https://en.arabalears.cat/politics/carme-gomila-leaves-the-manacor-city-council-to-seek-new-professional-challenges_1_5623156.html: nueva presidenta de ERC en las Illes Balears) y El Nacional, 12-nov (`data/sources/compromisos/erc/elnacional_tarragona_20261112.txt`: «presidenta d'Esquerra Republicana a Mallorca»). Ara Més es la federación de MÉS per Mallorca, Més per Menorca y Ara Eivissa, sin ERC.

## Ids

Se mantienen `upn`, `upc`, `ara_mes_fa`, `compromis` y `cc`. Son claves internas: las usan el estado guardado en el navegador (`vcd-estado-v1`: afinidades, orden de preferencia, partido elegido), los enlaces compartidos (`#/contrasta/upc`, `?partido=upc`), las carpetas de datos y la correspondencia con las encuestas. En el paso 3 cada id sigue llevando a la misma papeleta, así que lo guardado por cada persona sigue significando lo mismo y no hace falta migración. Lo que ve la persona (nombre y siglas) sí cambia.

## Revisión posterior (13 de noviembre de 2026)

- **Notas públicas en texto llano.** Las notas que se muestran con cada posición ya no llevan rutas del repositorio ni la etiqueta «[Reatribución 13-nov…]». En NC-BC (q01, q04, q09, q33, q34), Ara Més (q01, q32) y Compromís (q31) se sustituye por una frase para el lector, p. ej. «Posición tomada del manifiesto conjunto de la coalición Unidad del Pueblo Canario, que firma NC-BC.». En el resto de notas públicas se quitan las rutas de copias locales (con su sha256) y las referencias a ficheros internos, y «[Revisión de afirmaciones 13-nov (ruta); verificación independiente: …]» pasa a «[Revisada el 13-nov con verificación independiente: …]». Ningún valor cambia.
- **UPN.** Las notas de sus celdas nulas (`codificacion_g1.json`) describen la regla actual: las posiciones del PP y de sus dirigentes (Feijóo, o candidatos del PP en la lista de UPN-PP como Sergio Sayas) no se trasladan a UPN. En q31, Sayas se descarta por ser del PP, no por hablar fuera de un acto de la coalición. `notas_g4.md` anota que la herencia UPN←PP se retiró y corrige quién preside UPN (Cristina Ibarrola, nota de upn.org del 27-oct).
- **NC-BC.** Las notas de sus celdas nulas (`codificacion_g2.json`) ya no cuentan a Marisol Collado (Movimiento Sumar) como líder buscada de la entrada: solo cuentan los dirigentes de NC-BC.

## Documentos conjuntos para cada firmante (13 de noviembre de 2026, segunda decisión del editor)

Se revisaron todas las posiciones del paso 1 que salen de un documento de coalición: el manifiesto de Unidad del Pueblo Canario (NC-BC q01, q04, q09, q33, q34), las notas oficiales de Ara Més-Front Ampli (Ara Més q01 y q32), la web de Compromís: Front Valencià (Compromís q31) y el programa conjunto de CC y Municipalistas Primero Canarias (CC q19, q33, q34). La cita, la página y el valor de cada una ya tenían verificación independiente; se reutilizan. El registro está en `verificacion_g2.json` y `verificacion_g3.json` («reatribucion_2026-11-13b»).

**Añadidas (7)**

| Partido | Afirmación | Valor | Documento | Por qué |
|---|---|---|---|---|
| Podemos | q09 | +1 | Manifiesto de UPC (3-nov), p. 3 | Podemos firma el pacto (JEC C7). Sin posición propia. |
| Podemos | q33 | −1 | Manifiesto de UPC (3-nov), pp. 4-5 | Igual. |
| Frente Amplio | q01 | +1 | Nota oficial de Ara Més-Front Ampli (6-nov) | Firman Movimiento Sumar, IU y Recortes Cero. Sin posición propia. El manifiesto de UPC (3-nov) también da +1; se usa la nota, posterior. |
| Frente Amplio | q09 | +1 | Manifiesto de UPC (3-nov), p. 3 | Firman IU Canaria y Movimiento Sumar. Sin posición propia. |
| Frente Amplio | q32 | +1 | Nota oficial de Ara Més-Front Ampli (10-nov) | Sin posición propia (su nota anterior solo hablaba del SMI estatal). |
| Frente Amplio | q33 | −1 | Manifiesto de UPC (3-nov), pp. 4-5 | Sin posición propia. |
| ERC | q31 | +2 (antes +1) | Web de Compromís: Front Valencià (12-nov) | Firma ERPV (JEC C5). El programa de ERC no trata la duración de los contratos; entre declaraciones de campaña prevalece la posterior: la web (12-nov) frente a la nota de ERC del 7-oct (+1, prórroga obligatoria para grandes tenedores en Cataluña). La celda guarda la anterior en `sustituye`. **Cambia un valor propio de ERC: a confirmar por el editor.** |

**Se mantiene la posición propia (mismo valor o posterior):** Podemos q01 y q04 (Montero, 6-nov, posterior al manifiesto de UPC); Podemos q34 (Belarra) y Frente Amplio q34 (Martínez Barbero), +1 como el manifiesto; Podemos q31 (Belarra) y Frente Amplio q31 (Bustinduy, 12-nov), +2 como la web de Compromís: Front Valencià; Frente Amplio q04 (nota del Frente Amplio, 5-nov, posterior).

**Sin efecto:** el acuerdo UPN-PP no tiene ninguna posición codificada (las 30 celdas de UPN son nulas), así que no añade nada al PP. No hay ningún documento de GEROA BAI codificado, así que no añade nada al PNV. Municipalistas Primero Canarias no es una entrada de la web.

**Recuentos:** Podemos 16 → 18, Frente Amplio 10 → 14, ERC 17 (cambia el valor de q31).

**PSC:** se mantiene psc q21 (Sánchez en el acto del PSC en Tarragona); su nota explica ahora la excepción PSC-PSOE en lugar de remitir al criterio de UPN-PP.

## Revisión posterior (13-nov, tarde): Gomila cuenta para Ara Més

**Evidencia.** Carme Gomila es presidenta de ERC en Baleares y, además, «responsable d'Estratègia i Relacions Polítiques de MÉS per Mallorca» (dBalears, 24-oct-2026, https://www.dbalears.cat/balears/politica/2026/10/24/423549/mes-per-mallorca-proposa-carme-gomila-com-candidata-congres-tria-rosa-cursach-per-senat.html, copia en `data/sources/compromisos/ara_mes_fa/dbalears_20261024_candidatura.txt`), y MÉS per Mallorca es uno de los tres partidos de la federación Ara Més. La asamblea de MÉS per Mallorca la propuso y el Comité Federal de Ara Més «ha ratificado este sábado por unanimidad» su candidatura como cabeza de lista (Canal 4 Diario, 24-oct-2026, https://canal4diario.com/29n/2026/10/24/ara-mes-proclama-por-unanimidad-a-carme-gomila-como-candidata-al-congreso-para-las-elecciones-del-29n/, copia en `data/sources/compromisos/ara_mes_fa/canal4diario_20261024_proclamacion.txt`). Su afiliación queda en `data/boe/afiliaciones_g1.json` como «Esquerra Republicana (ERC) y MÉS per Mallorca». Por la mañana solo constaba como presidenta de ERC (Ara Balears, El Nacional) y, ante la duda, no se le atribuyó a Ara Més.

**Decisión del editor (13-nov, tarde):** lo que dice Gomila cuenta para Ara Més, no para ERC. Corrige lo dicho arriba sobre Gomila: lo que se apuntó como «candidato para ERC» deja de serlo.

Consecuencia en el paso 1: lo que dice Gomila en primera persona vuelve a valer para Ara Més (por ejemplo, la q30 del mitin de Palma, retirada arriba). Las posiciones (`fase1.json`, `codificacion_g*.json`) las revisa una tarea aparte; esta sección solo registra la decisión y la evidencia. En el paso 2 y en las promesas ya se ha restaurado (ver `data/fase3/reatribucion_2026-11-13.md` y `data/promesas/reatribucion_2026-11-13.md`).

