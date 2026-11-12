# Metodología

La versión para el público está en la web (página *Metodología*). Aquí, el detalle técnico.

## Paso 3 · Suma (escaños)

**Reparto** (LOREG art. 163): umbral del 3 % sobre votos válidos (candidaturas + blancos) de la
circunscripción; D'Hondt; empate de cocientes → más votos totales. Implementado dos veces, de forma
idéntica: `web/src/engine/seats.ts` (web, con tests) y `pipeline/dhondt.py` (validación). Con los
resultados oficiales de 2023 reproduce los 350 escaños en las 52 circunscripciones.

**Candidaturas**: solo las proclamadas en el BOE (BOE-A-2026-23103, con la corrección
BOE-A-2026-23383). Asignación candidatura → partido y → votos de 2023 en
`data/mapeo/candidaturas_2026.json`, con reglas por siglas exactas del BOE.

**Escenario base (2023)**: voto de 2023 de la candidatura predecesora en la misma circunscripción.
Casos especiales, todos explícitos en el fichero de mapeo:

* SUMAR 2023 → Frente Amplio y Podemos (concurren por separado en 2026): reparto por el peso relativo
  de SUMAR y PODEMOS en las europeas de 2024 en esa provincia. Donde solo se presenta uno, hereda todo.
* SUMAR 2023 → Compromís (C. Valenciana), Ara Més-Front Ampli (Baleares) y UPC (Canarias, + NC-bc).
* PSC y PSOE se tratan como candidaturas distintas (PSC en Cataluña), afines entre sí.
* UPN-PP (Navarra) = UPN + PP de 2023.
* Candidaturas sin predecesora (p. ej. SALF, que no concurrió en 2023): *sin base* en este escenario.
* El voto de 2023 de candidaturas que no concurren en 2026 queda en "otros" (no puede obtener escaño).

**Escenario por defecto (desde el 12-nov): media de encuestas.** La última encuesta de cada empresa
con trabajo de campo terminado en los últimos 21 días (`VENTANA_MEDIA`), cada una proyectada a las
provincias como se explica abajo; la media simple (sin ponderar) de esas proyecciones, por
candidatura y provincia, renormalizada. Una candidatura sin estimación en una encuesta se promedia
con las que sí la estiman. Hace falta un mínimo de dos empresas; en veda no se publica.

**Escenarios de encuesta**: *swing* proporcional. `cuota_prov = cuota_base_prov × encuesta_nac /
base_nac`. La etiqueta genérica "Sumar" de las encuestas se aplica como bloque a Frente Amplio,
Ara Més-FA, Compromís y UPC (y "PSOE" a PSOE + PSC), con un único factor; si la encuesta no da
Compromís por separado, su "Frente Amplio" se interpreta igualmente como ese bloque completo. Partidos sin base 2023 pero
con dato en la encuesta (SALF): perfil provincial de las europeas de 2024. Partidos que la encuesta
no recoge: conservan su cuota base. UPN-PP sigue el factor del PP. Se renormaliza a 100 % con el
voto en blanco de 2023 de la provincia. El informe `data/build/fase2_validacion.txt` compara los
escaños nacionales resultantes con los publicados por cada encuesta (diferencias de ±0–5 escaños
en los grandes partidos). Un bloque no incluye a los miembros que la encuesta da por separado: el
CIS 3584 publica UPC y Ara Més-Front Ampli aparte, así que su "Frente Amplio" se aplica solo a
Frente Amplio (y "ERC-Podemos" al factor de ERC).

**CIS preelectoral (3584, `cis-2026-11`): se mantiene la proyección proporcional.** El CIS no
publica estimación de voto por provincia en los PDF del avance, solo horquillas de escaños
(percentiles 5–95) en las 52 circunscripciones, guardadas en `desglose_regional`. El Excel que
anuncia con la estimación por provincia devolvía HTTP 410 el 12-nov. El modelo necesita cuotas
de voto (para D'Hondt y la incertidumbre), y unas horquillas de escaños no permiten deducirlas
sin inventar datos. Comprobación: la proyección cae dentro de la horquilla del CIS en 714 de 728
celdas partido × provincia (42 de 52 provincias enteras). Las diferencias son Adelante Andalucía,
que no se proyecta (0 frente a 1–2 en Cádiz, Málaga y Sevilla), algo más de Vox (Madrid, Murcia,
Asturias, Zaragoza), menos Frente Amplio en Madrid y Zaragoza, y Ceuta y Santa Cruz de Tenerife.
Si el CIS publica el Excel con estimación provincial, convendrá revisarlo.

**Incertidumbre**: 4.000 simulaciones con error log-normal independiente por candidatura,
σ = k/√max(cuota, 0,5 %); k calibrado con las generales de 2015–2023
(`pipeline/calibracion.py`, `docs/research/calibracion_incertidumbre.md`): 0,08 con encuestas y 0,15
con la base de 2023 (desde el 12-nov ya no hay selector de incertidumbre en la web: se usa siempre el calibrado). Prueba retrospectiva sobre
2023: con k = 0,04 el modelo era demasiado confiado; con el calibrado, las probabilidades anunciadas
coinciden con las frecuencias observadas (Brier 0,0696 → 0,0673 con encuestas; 0,0743 → 0,0646 con
la base). Semilla fija por circunscripción y escenario: resultados reproducibles.

**Sugerencia**: si P(≥ 1 escaño) < 50 %, se propone la primera preferencia siguiente (ranking del
paso 1 u orden manual; las coaliciones cuentan para sus partidos integrantes) con P ≥ 50 % en esa
circunscripción.

## Paso 1 · Elige (afinidad)

Ver `docs/research/vaa_estado_del_arte.md`. 30 afirmaciones aprox. a partir de propuestas reales
(programas 29-N y compromisos del candidato verificados en `data/promesas/`); 5 niveles + saltar;
pesos 0,5/1/2; posiciones de partido desde el programa del 29-N (cita y página) o propuestas públicas
en primera persona de sus líderes nacionales o regionales para estas elecciones o la próxima
legislatura, incluida la precampaña (cita, quién, formato, medio, fecha, URL), codificadas según
`docs/prompts/2_codificacion_posiciones.md` y verificadas una a una por un segundo agente
independiente (`data/fase1/verificacion_g*.json`); `pipeline/build_fase1.py` rechaza citas de
programa no literales, declaraciones sin autor, URL o fecha, y las de precampaña sin 'marco'; afinidad = distancia de Manhattan
normalizada; partidos comparables si cobertura ≥ 50 %; con 5+ temas comunes pero menos cobertura, grupo aparte "con pocos datos"; empate técnico < 5 puntos. Se recodifica cada vez
que se publica un programa.

## Paso 2 · Contrasta (análisis de programas)

Prompts: `docs/prompts/1_lectura_programa.md` y `docs/prompts/3_evaluacion_propuestas.md`; criterios
en `data/fase3/criterios.json`. Cada programa lo lee entero un agente que deja constancia de las
páginas leídas (`data/programas/<id>/lectura.md`); las citas se comprueban automáticamente contra el
texto (`pipeline/verify_quotes.py`); un segundo agente independiente revisa valoraciones y fuentes
(`revision.json`). Solo se publica lo aprobado en la revisión y cuyo SHA-256 coincide con el
programa catalogado.
