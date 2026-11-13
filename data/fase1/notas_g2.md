# Notas del grupo g2 (codificador A, 8-nov-2026)

## Comprobación de programas oficiales (8-nov, ~23:00)

Ningún partido del grupo ha publicado un programa del 29N. `partidos.json` no se ha modificado.

- **Frente Amplio**: frenteamplio.info (portada, /noticias/ y sitemap) no tiene programa. Las notas del 5 y 6-nov presentan medidas que «formarán parte del programa».
- **Podemos**: podemos.info no tiene programa; según la API de WordPress, las últimas entradas son del 15 y 16-oct.
- **Compromís: Front Valencià**: compromis.net/info/programes no tiene entrada del 29N. frontvalencia.net enlaza «Programa sencer» como «Enllaç pendent» y su agenda contiene fechas de ejemplo de plantilla («edita'ls a js/content.js»), así que no se ha usado.
- **Ara Més–Front Ampli**: el programa sigue en elaboración participativa. aramesfrontampli.cat/programa pide iniciar sesión.
- **UPC**: solo existe el Manifiesto electoral de 6 páginas. Se cita como fuente «campaña» con número de página.
- **Adelante Andalucía**: /programa/ solo ofrece los PDF de las autonómicas de 2026 (PROGRAMA-AA-2026-DEF.pdf y 50Medidas-AA.pdf).

## Criterios aplicados

- **Coaliciones**:
  - Se usan las declaraciones de la coalición y de sus candidatos.
  - Para Compromís se acepta una declaración del eurodiputado Vicent Marzà publicada en compromis.net, el canal oficial del partido que encabeza la coalición (q29). Queda señalada en la nota.
  - Las declaraciones de Ada Colau en un acto de Ara Més–FA no se atribuyen a esa coalición.
- **Fuentes descartadas**:
  - Por ser anteriores a la convocatoria: Compromís pidió derogar la ley mordaza el 5-oct, y Adelante Andalucía se opuso al gasto militar y a la OTAN en marzo de 2025.
  - Por ser opinión: la tribuna de Román Rodríguez en Diario de Avisos sobre UPC.
  - Por basarse en la trayectoria de los partidos y no en declaraciones de campaña: el resumen de Infobae del 17-oct sobre las posiciones del Frente Amplio.
- **Celdas dudosas**:
  - FA q08: «fijar de forma efectiva la jubilación en los 65 años».
  - Podemos q06: la fuente no menciona el salario.
  - Compromís q29: la fuente no es un candidato.
  - UPC q16: «derecho a decidir», codificado como null.

## Protocolo v2 (9-nov)

- Todas las celdas con fuente «campaña» llevan ahora `quien` y `formato`. Ninguna es anterior al 6-oct, así que ninguna necesita `marco`.
- Las notas oficiales de frenteamplio.info y aramesfrontampli.cat y el Manifiesto de UPC se tratan como documento oficial del partido.
- **Cambio de valor**: Frente Amplio q04 baja de +2 a +1. La permanencia del impuesto no es expresa y EFE (7-nov) lo llama «impuesto extraordinario».
- **Celdas nuevas** (Frente Amplio; Emilio Delgado, cabeza de lista por Madrid, entrevista de Europa Press del 8-nov):
  - q06 = +1: reducir la jornada, sin cifra.
  - q13 = −1: rechaza la «prioridad nacional» de Vox.
  - q15 = +1: defiende la regularización frente al «efecto llamada».
  - Las tres son dudosas.
- **Sin celdas nuevas** para Podemos, Compromís, Ara Més, UPC y Adelante Andalucía. Las declaraciones encontradas son genéricas, anteriores a la convocatoria sin referencia al 29N, o columnas de opinión.
- Europa Press (europapress.es) no se pudo abrir. Se usaron sus despachos en Infobae y Demócrata.

## Recodificación por la nueva redacción (9-nov)

Se revisaron con el texto nuevo las 60 celdas de q01, q02, q03, q04, q06, q09, q15, q17, q25 y q29. Se releyeron las fuentes de cada celda con valor y el Manifiesto de UPC. También se buscaron fuentes nuevas: frenteamplio.info/noticias (sin novedades después del 6-nov), adelanteandalucia.org/programa (solo el de las autonómicas) y prensa sobre Podemos, Frente Amplio, Compromís y Adelante Andalucía. No apareció ninguna fuente nueva válida. Las demás afirmaciones no se tocaron.

- **Cambios de valor**:
  - Frente Amplio q04: +2 → +1. Propone otro impuesto (desde 1 M€) que descuenta el vigente, pero no pide que este sea permanente.
  - Frente Amplio q15: +1 → null. Delgado defiende la regularización ya aprobada, no repetirla.
  - Podemos q02: +2 → +1. Propone expropiar el uso, no la propiedad.
  - Compromís q01: +2 → +1. Pide topes solo en zonas tensionadas.
  - Ara Més q01: +2 → +1. Pide topes sin decir que sea por ley estatal ni para toda España.
  - UPC q09: −1 → +1. La afirmación ahora tiene el sentido contrario. UPC defiende la gestión «prioritariamente directa», así que no apoya una prohibición total.
- **Celdas dudosas**: Frente Amplio q06 (+1, sin cifra), Podemos q04 y UPC q04 (+1, apoyo genérico a gravar las grandes fortunas) y Ara Més q01 (+1).
- **UPC q02**: `preguntas.json` cita a UPC como «parcial» con «sin descartar expropiaciones», tomado de Diario de Avisos (8-nov). Esa pieza es una tribuna de Román Rodríguez (NC-bc), una columna de opinión que no vale como fuente. Aquí sigue null, y conviene revisar ese `origen`.

## Revisión de afirmaciones (13-11-2026)

Detalle en `revision_afirmaciones_2026-11-13/` (decisión final en `integracion.md`). Se retiran q02, q07, q10, q14 y q28,
cuyas celdas se conservan como historial, y se añaden q31 a q35, verificadas de forma independiente.

- **Frente Amplio:** q31 +2 (Bustinduy).
- **Compromís:** q31 +2 («Apostarem pel lloguer indefinit»).
- **Ara Més:** q32 +1 (SMI balear propio, caso límite).
- **UPC:** q33 −1 y q34 +1 (manifiesto).
- **Adelante Andalucía:** q31 +2, q33 −1, q34 +2 y q35 −2 (programa).
- **Podemos:** q27 −1 (Montero, 6-nov, rechaza «militarizar las fronteras» en Ceuta; caso límite). q27 se mantiene por
  decisión del editor.
