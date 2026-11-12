# Resultados oficiales

| Fichero | Elección | Fuente | Script |
|---|---|---|---|
| `generales_2023.json` | Congreso, 23-jul-2023, por circunscripción | JEC (BOE-A-2023-18907) + Ministerio del Interior | `pipeline/results_build.py` |
| `europeas_2024.json` | Parlamento Europeo, 9-jun-2024, por provincia | JEC (BOE-A-2024-13092, corr. BOE-A-2024-15344) + Interior | `pipeline/results_build.py` |
| `autonomicas_andalucia_2026.json` | Parlamento de Andalucía, 17-may-2026, por provincia | Junta Electoral de Andalucía, BOJA núm. 108 (8-jun-2026), texto 7541 | `pipeline/results_andalucia.py` |

Fuentes brutas en `data/sources/resultados/` con su SHA-256 (`manifest.json` para las dos primeras; el
PDF del BOJA está en `boja/` y su hash, en `meta.sources` del JSON y fijado en el script:
`402ca0c986268767ebcb9056c859850053fb6d1aa472b486cee5f02a7733ec6c`). Del BOJA solo se extraen el
Cuadro I (resumen) y el Cuadro II (formaciones con escaño); sirve para el perfil provincial de
Adelante Andalucía en los escenarios de encuesta (ver `docs/METODOLOGIA.md`).
