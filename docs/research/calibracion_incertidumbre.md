# Calibración de la incertidumbre del paso 3 (k)

Informe para "Vota con datos". Fecha: 2026-11-09. Reproducible con `python3 -I -B pipeline/calibracion_fetch.py` y `python3 -I -B pipeline/calibracion.py` (solo biblioteca estándar, ~10 min). Todas las cifras salen de `data/build/calibracion.json` / `.txt`.

## Recomendación

| Escenario | k actual | **k recomendada** | baja (×0,625) | alta (×1,5) |
|---|---|---|---|---|
| Encuestas (swing proporcional) | 0,04 | **0,08** | 0,05 | 0,12 |
| Base "resultados 2023" | 0,05 | **0,15** | 0,094 | 0,225 |

Se mantienen la fórmula σ = k/√máx(cuota; 0,5 %) y los multiplicadores. Basta cambiar `K_ENCUESTA` y `K_BASE` en `pipeline/build_fase2.py` (no se ha tocado la app). Con las k actuales la app es **demasiado segura**: los "probables" ganan escaño menos de lo anunciado y los "improbables", más.

## 1. Datos

Resultados oficiales del Congreso por circunscripción, extraídos por script. Ficheros brutos en `data/sources/historico/`, con URL y SHA-256 en `manifest.json`.

* **2015, abril 2019 y noviembre 2019**: Excel del Ministerio del Interior (`PROV_02_*`), copias byte a byte del Internet Archive (infoelectoral bloquea clientes que no son navegador). El total estatal de válidos y blancos coincide exactamente con el Cuadro I de la JEC en el BOE (BOE-A-2016-867, BOE-A-2019-8070, BOE-A-2019-17344). El fichero de 2015 deja sin desglosar entre 13 y 5.493 votos en 5 provincias (<0,2 %); se tratan como lista sin escaño.
* **2016**: el Archive no guardó el fichero del Ministerio. Se usa la JEC (BOE-A-2016-7133, PDF, Cuadros I–III). Cada provincia cuadra al voto exacto con "votos a candidaturas" y con sus escaños.
* **2023**: `data/resultados/generales_2023.json`.
* **Encuestas**: Wikipedia en inglés (revisiones fijadas), **fuente secundaria documentada**; las publicaciones originales están dispersas y muchas tras muro de pago. Última estimación de cada empresa con campo terminado 6–30 días antes de la elección (14, 14, 14 y 18 encuestas). Se excluyen las publicadas en el extranjero durante la veda, las reproyecciones de datos del CIS hechas por terceros, los paneles autoseleccionados y los agregadores.

**Comparabilidad.** Las listas se agrupan por "familia" (PSC con PSOE; PP-Foro y PP-PAR con PP; DL→CDC→JxCat→Junts). El análisis principal solo usa familias de igual composición en ambas elecciones; fusiones y escisiones (Podemos+IU, →Sumar, CC-NC, Navarra Suma) van aparte, "por bloques".

## 2. Error de la base ("repetir la elección anterior")

Para cada par de elecciones consecutivas, cada provincia y cada familia con cuota previa ≥ 0,5 %, se calcula x = ln(s_t / s_t−1). La k del modelo actual se estima por máxima verosimilitud: k² = media(s·x²).

| Par | Años | n | k (σ=k/√s) | σ constante | k residuo provincial* |
|---|---|---|---|---|---|
| 2015→2016 | 0,5 | 255 | 0,053 | 0,36 | 0,019 |
| 2016→A-2019 | 2,8 | 274 | 0,196 | 0,40 | 0,065 |
| A-2019→N-2019 | 0,5 | 335 | 0,159 | 0,44 | 0,038 |
| N-2019→2023 | 3,7 | 226 | 0,143 | 0,37 | 0,067 |
| **Todos** | | 1.090 | **0,149** | 0,40 | 0,050 |

\* Tras descontar el cambio nacional real de cada partido. Por bloques (incluyendo fusiones) las k son casi iguales (0,060 / 0,196 / 0,158 / 0,117).

**Lectura.**
1. Lo dominan los vuelcos nacionales (caída del PP en 2019, auge y hundimiento de Cs, irrupción de Vox), no el calendario: 7 meses en 2019 dieron tanto error como 3,7 años. Los dos pares de ~3 años dan k = 0,14–0,20 (0,17 ajustados juntos).
2. **La forma k/√s no describe bien la base**: el error relativo es casi plano (rms de ln 0,29–0,50 en todos los tramos de cuota). Por AIC (menor es mejor), σ constante ≈ 0,40 (1.086) o σ = 0,33·s^−0,08 (1.064) ajustan mucho mejor que k/√s (1.510). Con k = 0,15, una lista del 3 % recibe σ = 0,87; lo observado en el tramo 2–5 % es ≈ 0,5.
3. Aun así, en el backtest (§4) k/√s con k = 0,15 rinde igual que las otras formas: lo decisivo son las cuotas cerca del último escaño. Se recomienda **k = 0,15** sin cambiar la fórmula; σ constante 0,40 sería una mejora opcional.

## 3. Error de los escenarios de encuesta

**(a) Error nacional de las encuestas** (ln resultado/encuesta, por empresa y partido):

| Elección | Encuestas | rms (puntos) | k nacional | Mayores sesgos medios (encuesta − resultado) |
|---|---|---|---|---|
| 2016 | 14 | 2,3 | 0,046 | UP +3,8; PP −3,1 |
| A-2019 | 14 | 1,6 | 0,045 | PP +3,5; Cs −1,2 |
| N-2019 | 14 | 1,5 | 0,047 | Cs +2,4; Vox −2,2 |
| 2023 | 18 | 1,8 | 0,039 | PSOE −3,5; PP +1,3 |

**(b) Desviación provincial respecto al swing proporcional con el resultado nacional real**: k = 0,023 (2016), 0,073 (A-2019, que incluye la irrupción de Vox desde el 0,2 %), 0,038 (N-2019) y 0,057 (2023). En conjunto, k = 0,052.

**(c) Error total del escenario tal como lo construye la app** (encuesta real → swing proporcional → renormalización), frente al resultado provincial: k = 0,062 / 0,097 / 0,078 / 0,078; **k = 0,081** en conjunto (n = 14.561). Es algo más que la suma cuadrática de (a) y (b), √(0,044² + 0,052²) = 0,068: hay errores correlacionados y la renormalización traslada el error de un partido a los demás.

Aquí **la forma k/√s sí es correcta**: el exponente libre ajustado es 0,44 (≈ 0,5) y la k implícita es estable por tramos (0,075–0,093 por encima del 2 %). Añadir un componente nacional (σ² = kn²/S + kp²/s) mejora el AIC, pero kn = 0,017 es pequeño y kp queda en 0,078.

## 4. Backtest

`simular()` portado a Python (misma regla legal, error log-normal y renormalización). Se simula 2023 (i) desde la base de noviembre de 2019 y (ii) desde cada una de las 18 encuestas finales proyectadas por swing proporcional. Candidaturas como en la app: las que concurren con predecesora (Sumar ← UP + Más País + Més Compromís; UPN ← Navarra Suma); el resto, incluido el 6,8 % de Cs, va a "otros" sin escaño. 2.000 simulaciones por circunscripción (1.000 por encuesta). Tramos = veredictos de la app; "disputados" = 1 % < p < 99 % en algún ajuste; Brier: menor es mejor. Se repitió para 2016, A-2019 y N-2019.

**Brier en los casos disputados de 2023** (base: 216 casos; encuestas: 2.574 casos de 18 encuestas):

| Base 2019 → 2023 | Brier | Encuestas → 2023 | Brier |
|---|---|---|---|
| k = 0,05 (actual) | 0,0743 | k = 0,04 (actual) | 0,0696 |
| k = 0,10 | 0,0672 | k = 0,06 | 0,0673 |
| **k = 0,15** | **0,0646** | **k = 0,08** | **0,0673** |
| k = 0,20 | 0,0666 | k = 0,10 | 0,0689 |
| σ = 0,40 constante | 0,0656 | k = 0,12 | 0,0715 |

**Fiabilidad en 2023** (n casos · p media anunciada → frecuencia real con escaño; el tramo <5 % acierta siempre):

| Veredicto | Base, k = 0,05 | Base, k = 0,15 | Encuestas, k = 0,04 | Encuestas, k = 0,08 |
|---|---|---|---|---|
| improbable (5–33 %) | 12 · 0,14 → 0,08 | 41 · 0,15 → 0,05 | 131 · 0,18 → **0,40** | 271 · 0,17 → 0,15 |
| en disputa (33–66 %) | 10 · 0,47 → 0,40 | 23 · 0,48 → 0,35 | 100 · 0,50 → 0,63 | 214 · 0,51 → 0,69 |
| probable (66–95 %) | 10 · 0,79 → **0,30** | 45 · 0,86 → 0,84 | 188 · 0,83 → 0,78 | 360 · 0,83 → 0,85 |
| casi seguro (≥95 %) | 157 · 1,00 → 0,96 | 111 · 0,99 → 1,00 | 2.652 · 1,00 → 0,97 | 2.383 · 1,00 → 0,98 |

**Las cuatro elecciones juntas** (2016, A-2019, N-2019 y 2023), escenarios de encuesta (10.389 casos disputados):

| Veredicto | k = 0,04 | k = 0,08 |
|---|---|---|
| improbable | 796 · 0,16 → 0,31 | 1.689 · 0,16 → 0,18 |
| en disputa | 466 · 0,50 → 0,56 | 1.014 · 0,50 → 0,57 |
| probable | 876 · 0,84 → 0,72 | 1.628 · 0,83 → 0,84 |
| casi seguro | 9.268 · 1,00 → 0,98 | 8.138 · 1,00 → 0,99 |
| Brier (disputados) | 0,0783 | **0,0737** |

En la base, los pares de ~3 años (A-2019 y 2023) dan un Brier de 0,1197 con k = 0,05, frente a 0,1015 con k = 0,15. El mínimo de la rejilla está en 0,15.

**Validación cruzada.** La k ajustada sin la elección evaluada (2023: 0,151 base, 0,082 encuestas) da el mismo Brier que la mejor de la rejilla: no hay sobreajuste.

## 5. Por qué estos valores y no otros

* **Encuestas, k = 0,08**: ajuste directo 0,081, fuera de muestra 0,074–0,085 y mínimo del Brier agregado. Con 0,04, "probable" acierta un 72 % en vez del 84 % anunciado.
* **Base, k = 0,15**: ajuste conjunto 0,149, fuera de muestra 0,151 y mínimo del Brier en los pares de ~3 años. El 0,05 actual solo vale para una repetición a 6 meses sin vuelcos (2015→2016).
* **Baja/alta (×0,625 / ×1,5)**: la k por elección va de 0,062 a 0,097 (encuestas) y de 0,14 a 0,20 (base, pares largos), dentro del rango baja–alta. El Brier agregado es casi plano entre ×0,75 y ×1,25 (0,0743 / 0,0737 / 0,0753 con k = 0,06 / 0,08 / 0,10) y empeora fuera (0,0783 con 0,04 y con 0,12). "Baja" ≈ encuestas tan buenas como en 2016; "alta" ≈ el año de la irrupción de Vox.

## Advertencias

* **Pocas elecciones independientes**: el error nacional de un partido se repite en sus 52 provincias; en la práctica hay 4 pares y ~60 encuestas. k es fiable a ±25 %, no a la milésima.
* **Errores independientes entre candidaturas y provincias**: las probabilidades por circunscripción (lo que muestra la app) salen calibradas, pero un total nacional de escaños con este modelo infravaloraría la incertidumbre.
* **Residuos**: "en disputa" gana escaño algo más de lo previsto (0,57 agregado, 0,69 en 2023, frente a 0,50) con cualquier k; origen no aislado. Las listas pequeñas (<5 %) mejoran con más ruido: el error nacional de encuesta pesa más en los partidos regionales.
* **2026 añade errores no medidos**: el reparto de Sumar entre Frente Amplio y Podemos (europeas 2024) y SALF sin base en generales. Para ellas, "alta" es lo prudente.
* **Encuestas de Wikipedia**, no de cada empresa; revisiones fijadas y filtros explícitos.
