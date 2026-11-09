# Revisión de redacción de las afirmaciones de la fase 1 (9-11-2026)

Aplica a `data/fase1/preguntas.json` las conclusiones de `docs/research/auditoria_preguntas.md`, con el principio de q05: cada afirmación recoge la propuesta real (dirección, cifras clave y a quién afecta), fiel a su fuente, una sola medida, en lenguaje llano y neutral, en 25 palabras o menos y sin apelar a la autoridad.

Cubre todas las afirmaciones señaladas por la auditoría salvo q05, que ya estaba hecha. q15 y q29 llevan la redacción que decidió el editor. q21, q22, q27 y q28 no se tocan, porque la auditoría no les encontró ningún problema relevante.

Cada cifra y hecho legal de los contextos se comprobó el 9-11-2026 en la fuente oficial enlazada en `contexto_fuente`. Si hacía falta más de una fuente, el resto va en el campo nuevo `contexto_fuentes_adicionales`, que no se publica. Cada afirmación lleva `texto_anterior` (si el texto cambió) y `nota_revision`.

**Recodificar:**
- **Sí:** el sentido cambió o se ajustó el `origen.sentido` de algún partido. Los codificadores deben revisar sus posiciones en `codificacion_g*.json`, que no se han tocado.
- **No:** solo cambian la claridad o el contexto.

## Cambios

| id | Texto anterior | Texto nuevo | ¿Recodificar? |
|---|---|---|---|
| q01 | Fijar por ley un precio máximo del alquiler de vivienda en las zonas donde los alquileres son más caros. | Fijar por ley estatal un precio máximo del alquiler de vivienda en toda España, sin depender de que lo pida cada comunidad autónoma. | **Sí.** Cambia el alcance; Compromís (zonas tensionadas) pasa a parcial. |
| q02 | Permitir expropiar viviendas a las empresas y fondos de inversión que son grandes propietarios para destinarlas a alquiler público asequible. | Permitir por ley expropiar viviendas a las empresas que tengan más de 50 para convertirlas en vivienda pública de alquiler asequible. | **Sí.** Se añade el umbral; Podemos (expropiar el uso), BNG (expropiación temporal de vacías) y UPC («sin descartar») pasan a parcial. |
| q03 | Reducir al menos a la mitad los impuestos que se pagan al comprar la primera vivienda. | Rebajar un 60 % el IVA y el impuesto de transmisiones a los menores de 40 años que compren su primera vivienda. | **Sí.** Se añaden la edad y el porcentaje del PP; SALF (100 %, sin edad, solo españoles) pasa a parcial; revisar Vox. |
| q04 | Mantener de forma permanente un impuesto estatal sobre las grandes fortunas. | Hacer permanente el impuesto estatal sobre los patrimonios de más de 3 millones de euros, creado en 2022 como temporal. | **Sí.** Frente Amplio propone otro impuesto (desde 1 millón) y pasa a parcial. |
| q06 | Reducir por ley la jornada laboral máxima por debajo de las 40 horas semanales, sin rebajar el salario. | Reducir por ley la jornada laboral máxima de 40 a 37,5 horas semanales, sin rebajar el salario. | **Sí.** El BNG (35 h) pasa a parcial. |
| q07 | Que los autónomos que ingresen menos del salario mínimo no paguen cuota a la Seguridad Social. | Que los autónomos que facturen menos del salario mínimo (unos 17.100 € al año) no paguen cuota a la Seguridad Social. | No. Vox sigue a favor. Ojo: El Debate dice «ingrese» y 101TV, «facturen». |
| q08 | Volver a fijar en 65 años la edad ordinaria de jubilación para todos los trabajadores. | Volver a la jubilación a los 65 años para todos los trabajadores, sin recorte de la pensión por la edad. | No |
| q09 | Que la sanidad pública pueda pagar a clínicas privadas para atender a sus pacientes y reducir las listas de espera. | Prohibir que la sanidad pública pague a clínicas y hospitales privados para atender a sus pacientes. | **Sí.** Sentido invertido: la polaridad pasa a progresista, el BNG a favor y ERC a parcial. |
| q10 | Elevar el gasto en sanidad pública hasta al menos el 7 % del PIB. | Aumentar el gasto en sanidad pública hasta al menos el 7 % del PIB, desde el 6,4 % de 2024. | No |
| q11 | Retirar de forma progresiva la financiación pública a los colegios privados concertados. | Retirar poco a poco la financiación pública a los colegios concertados hasta suprimirla, empezando por las etapas no obligatorias. | No |
| q12 | Que las comunidades con lengua propia puedan impartir todas las asignaturas en ella, sin un porcentaje mínimo obligatorio en castellano. | Que cada comunidad con lengua cooficial decida qué parte de las clases se da en castellano, sin un mínimo fijado por ley o por tribunales. | No |
| q13 | Dar prioridad a las personas de nacionalidad española en la adjudicación de viviendas sociales. | Que los españoles tengan prioridad sobre los extranjeros residentes en el reparto de viviendas sociales. | No |
| q14 | Expulsar a su país a todos los extranjeros condenados por un delito en España, para que cumplan allí la pena. | Que los extranjeros condenados por un delito en España sean enviados a su país para cumplir allí la pena. | No. Se quita «todos», que no está en la cita de Vox. |
| q15 | Aprobar una regularización extraordinaria de los inmigrantes que viven en España sin permiso de residencia. | Aprobar otra regularización extraordinaria, como la de 2026, para los inmigrantes que sigan viviendo en España sin permiso de residencia. | **Sí** (por decisión del editor). Ahora se pregunta por repetir la medida, y la cita de Vox pasa a ser la de regularizar «de golpe». |
| q16 | Permitir que una comunidad autónoma celebre un referéndum sobre su independencia si lo pide su parlamento. | Permitir que el Gobierno pacte con una comunidad autónoma un referéndum sobre su independencia. | No |
| q17 | Que cada comunidad autónoma que lo pida recaude y gestione todos sus impuestos, como ya hacen el País Vasco y Navarra. | Que las comunidades que lo pidan regulen y recauden sus impuestos y paguen al Estado una cantidad anual, como hacen el País Vasco y Navarra. | **Sí.** ERC (solo recaudación) pasa a parcial y se quita UPN (defiende su convenio, no extenderlo a otras comunidades). |
| q18 | Perdonar a las comunidades autónomas parte de la deuda que tienen con el Estado. | Que el Estado asuma unos 83.000 millones de euros de la deuda de las comunidades autónomas, cerca de una quinta parte de lo que deben. | No |
| q19 | Impulsar la instalación de parques eólicos marinos frente a la costa española. | Instalar parques eólicos en el mar frente a las costas españolas. | No |
| q20 | Comprometerse a reducir las emisiones de gases de efecto invernadero un 65 % en 2030 respecto a 1990. | Reducir las emisiones de gases de efecto invernadero de España al menos un 65 % en 2030 respecto a 1990. | No |
| q23 | *(sin cambios)* Aprobar una ley que permita desalojar en un máximo de 48 horas a quienes ocupen sin permiso una vivienda ajena. | *(sin cambios; solo cambia el contexto: reforma de 2025 y juicios rápidos)* | No |
| q24 | Derogar la Ley de Seguridad Ciudadana de 2015. | Derogar por completo la Ley de Seguridad Ciudadana de 2015, que regula multas por conductas en la calle, en protestas y ante la policía. | No |
| q25 | Que el Gobierno no conceda indultos a personas condenadas por delitos de corrupción. | Que el Gobierno renuncie a indultar a los políticos condenados por corrupción. | **Sí.** Cambian el alcance («políticos») y la forma (sin negación); se quita SALF (la imprescriptibilidad es otra medida). |
| q26 | Aumentar el gasto en defensa hasta el 3,5 % del PIB en 2035, como acordaron los aliados de la OTAN. | Aumentar el gasto en defensa hasta el 3,5 % del PIB en 2035. | No |
| q29 | Que España se oponga a la ratificación del acuerdo comercial entre la Unión Europea y Mercosur. | Que España pida en la Unión Europea frenar el acuerdo comercial con Mercosur (Argentina, Brasil, Paraguay y Uruguay). | **Sí** (por decisión del editor). |
| q30 | Fijar por ley un precio máximo para los alimentos básicos. | Fijar por ley un precio máximo para los alimentos básicos, como el pan, la leche, los huevos, la fruta y la verdura. | No |

## Equilibrio de polaridad (30 afirmaciones)

| | Progresista | Conservadora | Territorial | Neutral |
|---|---|---|---|---|
| Antes | 12 | 12 | 4 | 2 |
| Después | 13 | 11 | 4 | 2 |

El único cambio de polaridad es q09: la afirmación ahora recoge la propuesta real del BNG en lugar de estar redactada en su contra. Para volver al 12-12 puede cambiarse una progresista por la reserva conservadora r03 o r04. En `auditoria`, la lista de afirmaciones redactadas en contra de su origen queda solo con q26.

## Cita de Frente Amplio (q02)

- **Qué decía.** La paráfrasis de `promesas.json` (frente_amplio #0) añadía «a precios inferiores a los de mercado», que no aparece en elDiario.es. Allí, «precios muy inferiores» se refiere a cómo compran los fondos. La idea sí aparece en la crónica de EFE publicada en Público, en estilo indirecto: «Esos inmuebles se expropiarían "obviamente" a precios inferiores del mercado, ha dicho».
- **`promesas.json`.** La promesa pasa a `cita_literal`: el texto de elDiario.es más la frase de EFE en Público, con su atribución. Se deja constancia en `notas`.
- **`preguntas.json`, q02.** La cita de elDiario.es es ahora literal, y la frase de EFE va en una entrada de origen aparte, con la URL de Público.
- **`codificacion_g2.json`, frente_amplio q02.** La cita ya era literal (nota oficial de frenteamplio.info) y no contenía la frase. Solo se marca el corte inicial con [...] y se añade la frase siguiente de la nota; queda anotado en `nota`.
- **Pendiente.** `data/fase1/fase1.json` y `web/public/data/fase1.json` todavía muestran la paráfrasis antigua. Se regeneran ejecutando `pipeline/build_fase1.py`. La ejecución en una copia de trabajo dio 30 afirmaciones, y `verify_quotes.py` comprobó 790 citas sin ninguna no encontrada.

## Hechos que no se pudieron verificar y se quitaron

- **q19:** «España aún no tiene parques eólicos marinos comerciales».
- **q15:** la estimación de «más de medio millón» de beneficiarios. La Moncloa no da ninguna cifra oficial.
- **q24:** el estado de las propuestas de reforma parcial de la ley.
- **q29:** las opiniones atribuidas al sector agrario y a la industria.
- **q13:** que hoy las viviendas sociales no se adjudiquen por nacionalidad.
- **q07:** la cuota en euros. No encontré el tipo de cese de actividad en la Orden PJC/297/2026, así que se da la base de cotización, no la cuota.
- **q30:** cómo terminó la rebaja del IVA después de junio de 2024. Se da solo el periodo al 0 % (enero de 2023 a junio de 2024) y el tipo actual (4 %).

## Otras observaciones

- **q05:** queda fuera de esta revisión, pero tiene unas 32 palabras y supera el límite de 25.
- **Afirmaciones de consenso:** q25 sigue expuesta a un efecto de consenso, y lo mismo puede pasarle a q10. Hay que comprobar en el piloto si discriminan entre partidos.
