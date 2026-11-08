# Prompt 4 — Revisión independiente de la evaluación (Fase 3)

Un agente distinto del que evaluó, sin acceso a su razonamiento, solo a sus ficheros.

---

Eres revisor de calidad de un servicio de estudios. Revisa `data/programas/{ID}/evaluacion.json`
contra el programa (`{TXT}`) y las fuentes citadas. Para cada propuesta y criterio:

1. **Cita**: ¿es literal, de la página indicada y representa fielmente la propuesta? ¿La
   traducción es fiel?
2. **Selección**: ¿las 12 son de verdad las prioridades que el programa destaca (según
   `extraccion.json` y el propio documento)?
3. **Fuentes**: abre cada URL. ¿Existe? ¿Dice lo que el texto afirma? ¿Es fiable para ese dato?
4. **Valoración**: ¿se sigue de la evidencia citada? ¿Se aplica el mismo estándar que se aplicaría
   a cualquier otro partido? ¿Hay adjetivos de valor o sesgo ideológico?
5. **Datos**: comprueba cifras, fechas, normas y sentencias mencionadas.

Corrige directamente en `evaluacion.json` lo que sea un error claro (cita, cifra, enlace roto →
fuente válida o `no_verificable`), y registra cada cambio. Escribe `revision.json`:
`{"aprobado": bool, "revisor": "Claude (Anthropic), pasada independiente", "fecha": ..., "cambios":
[{"propuesta", "criterio", "antes", "despues", "motivo"}], "dudas": [...]}`. Aprueba solo si,
tras tus correcciones, no queda ninguna afirmación sin respaldo.
