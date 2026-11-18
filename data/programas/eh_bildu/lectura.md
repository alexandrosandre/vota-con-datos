# EH Bildu — Registro de lectura del programa (Fase 3, paso A)

- Programa: «Posible Egin. Garantía y derechos» (título de la portada), EH Bildu, publicado el 16-nov-2026 y enlazado como «Programa electoral» desde la noticia oficial de ese día en ehbildu.eus («EH Bildu presenta una agenda de medidas para reforzar los derechos sociales y ampliar el autogobierno de Euskal Herria»). La portada no tiene texto extraíble salvo «programa · Garantía y derechos»; renderizada, dice «programa · Posible Egin. · Garantía y derechos · ehbildu». Hay una versión en euskera en un PDF aparte (no analizada).
- Fichero: `data/sources/programas/eh_bildu/posibleegin-programa-cas.pdf` (SHA-256 `ceb655c9c8ebb036a15fa7829865d6e2d178525eb7db92629d702ac5e8d16047`, comprobado el 16-nov), 30 páginas A4, en castellano; texto en `posibleegin-programa-cas.txt` (`pdftotext -layout`, que coincide byte a byte con una nueva extracción del PDF).
- Método: cada página se extrajo por separado con `pdftotext -layout -f N -l N` (página N = página del PDF). Se leyó **íntegramente, página a página**, en cinco bloques consecutivos: pp. 1-9, 10-15, 16-22, 23-25 y 26-30. No se omitió ninguna página.
- Páginas sin medidas: 1 (portada), 2-3 (índice), 4 («Nuestro compromiso»: balance de la legislatura y propósito del programa, sin medidas) y 30 (contraportada, sin texto).
- Numeración: el número impreso al pie coincide con la página del PDF. El índice (pp. 2-3) da páginas erróneas desde el capítulo 2: sitúa el capítulo 2 en la p. 24 y el 3 en la 28, cuando empiezan en las pp. 23 y 27, y los apartados 3.2.6 a 3.2.10 en la p. 30, cuando están en las pp. 28-29. En `extraccion.json` el índice va con páginas del PDF.
- Estructura: tres capítulos. 1. «Derechos y libertades» (pp. 5-22, 13 apartados, de vivienda a libertad de expresión); 2. «Reconocimiento de Euskal Herria como nación y autogobierno» (pp. 23-26); 3. «Paz y convivencia» (pp. 27-29). Las medidas no están numeradas: son viñetas (•) con subviñetas (»), con una entradilla en cada apartado; en los capítulos 2 y 3 algunas medidas están en párrafos (2.3, 2.5, 2.6 y 3.2).
- Maquetación: la cabecera «P RO G RA M A» y el número de página se intercalan en los saltos de página; ninguna cita cruza un salto. Las palabras partidas por guion a final de línea se unen en las citas. Hay medidas repetidas casi literalmente: IVA del 21 % a los alojamientos turísticos (pp. 6 y 14), bono social eléctrico y térmico (pp. 9, 13 y 16), euskera en la administración del Estado (pp. 12 y 25), oficinas de extranjería (pp. 14 y 20), reducción de jornada (pp. 6 y 21) y cadena alimentaria (pp. 9 y 17); y en la p. 11 dos viñetas seguidas sobre el patrocinio de la industria farmacéutica.
- Documento de apoyo: la noticia oficial del 16-nov que resume el programa y enlaza el PDF, y la nota de ese mismo día sobre pensiones, guardadas en `data/sources/programas/eh_bildu/web_2026-11-16/` (`noticia-programa.html`, `noticia-pensiones.html`). Se usan para corroborar las prioridades, como la página oficial del programa del Frente Amplio.
- Fecha de lectura: 2026-11-16.

## Páginas leídas y resumen por sección

| Páginas | Sección | Resumen (una línea) |
|---|---|---|
| 1 | Portada | «programa · Posible Egin. · Garantía y derechos» (imagen). |
| 2-3 | Índice | Tres capítulos y sus apartados, con páginas erróneas desde el capítulo 2. |
| 4 | Nuestro compromiso | Frenar al «bloque reaccionario» y avanzar en derechos; balance de logros de la legislatura (pensiones mínimas, vivienda, impuesto a la banca y grandes fortunas, memoria, euskera, más de 200 M€ en inversiones); el programa recoge las líneas de actuación en el Congreso y el Senado. |
| 5-6 | 1.1 Vivienda | Prórroga automática de los alquileres; prohibición permanente de desahucios de vulnerables con compensación estatal; financiación a ayuntamientos con zonas tensionadas; ley contra pisos turísticos ilegales en plataformas; prohibición de la compra especulativa; padrón previo para extranjeros multipropietarios; edificios enteros solo para alquiler regulado; tope estructural del 2 % a la actualización de la renta; IVA del 21 % a los alojamientos turísticos; supresión de las SOCIMI. |
| 6-7 | 1.2 Empleo | 32 horas o cuatro días sin rebaja salarial (35 horas iniciales y tres años para pymes); SMI propio de las comunidades autónomas; 45 días de indemnización, salarios de tramitación y autorización de los ERE; registro horario y recargo de horas extra; periodo de prueba; empleadas de hogar; Marco Vasco y Navarro de Relaciones Laborales; transferencia de la Inspección de Trabajo y de las políticas pasivas a Navarra. |
| 7-8 | 1.3 Pensiones | Sistema público y revalorización con el IPC; pensiones mínimas de al menos 1.220 € ligadas al SMI; un 15 % más para viudedad y no contributivas; jubilación sin penalización con 40 años cotizados; transferencia del régimen económico de la Seguridad Social. |
| 8-9 | 1.4 Contención de precios | Absorción obligatoria de parte de las subidas de costes por las grandes energéticas y alimentarias (CNMC, Observatorio de Márgenes); tope al gas; límites temporales de precios en crisis; reforma del mercado eléctrico europeo; control de márgenes en la cadena alimentaria; ayudas a sectores productivos; descuentos al transporte; bono social automático. |
| 10-11 | 1.5.1 Salud | Bucodental y óptica en la cartera común; higiene menstrual y preservativos gratuitos; publicidad de ultraprocesados; reforma de la ley de eutanasia; reserva del 53 % de plazas MIR para bilingües; nuevas profesiones sanitarias; derogar la Ley 15/1997; farmacia pública; transferencias sanitarias. |
| 11-12 | 1.5.2 Educación · 1.5.3 Cuidados | Bajar ratios; 6 % de inversión (UNESCO); retroactividad de las prestaciones de dependencia y fin del copago de los cuidados personales. |
| 12-13 | 1.5.4 Administración pública | Atención presencial; procedimientos abreviados; euskera para los servicios del Estado en Araba, Bizkaia, Gipuzkoa y Nafarroa; negociación colectiva de los salarios públicos vascos y navarros. |
| 13 | 1.6 Escudo social | Prohibición permanente de cortes de suministros; bonos sociales automáticos; IPREM; vulnerabilidad; transferencia del IMV. |
| 13-14 | 1.7 Familias e infancia | Directiva 2019/1158; prestaciones de crianza autonómicas; permisos de familias monoparentales, lactancia, preparto y puerperal. |
| 14 | 1.8 Política fiscal | Recuperar con carácter permanente el impuesto a las energéticas, concertado; más peso del impuesto a banca y grandes fortunas; impuesto a las grandes distribuidoras alimentarias; IVA del 21 % turístico; reglas fiscales locales; derogar la reforma del art. 135 CE. |
| 15-18 | 1.9 Transición ecosocial | Descarbonización al menos en 2045 (PNIEC); calendario nuclear; electrificación; Made in Europe; soberanía digital; cooperativas; PAC y pesca; cadena alimentaria; transferencia ferroviaria, portuaria y aeroportuaria; tren «una plataforma, tres servicios»; leasing social de eléctricos; rehabilitación; gravamen a beneficios extraordinarios; fin de subvenciones fósiles; vuelos privados. |
| 19 | 1.10 Feminismo · 1.10.1 LGTBIQ+ | Blindar el aborto y protección frente al acoso; violencia vicaria; terapias de conversión; delitos de odio. |
| 20 | 1.11 Migración | Regularización y nueva ley de extranjería; rechazo del Pacto de Migración y Asilo y de los CIE; voto de residentes extranjeros; transferencia de las competencias migratorias. |
| 20-21 | 1.12 Inteligencia artificial | Gobernanza pública de la IA; soberanía digital; financiación de tecnologías lingüísticas en euskera; protección de menores. |
| 22 | 1.13 Libertad de expresión | Volver a presentar la ley contra la «ley mordaza»; despenalizar las críticas a la Corona y las ofensas religiosas; enaltecimiento; discurso de odio; publicidad institucional. |
| 23-24 | 2.1 Reconocimiento nacional | Euskal Herria como nación; carácter político del conflicto; derecho a decidir; respeto a los nuevos estatus refrendados. |
| 24 | 2.2 Autogobierno · 2.3 Concierto y Convenio | Transferencias pendientes y nuevas competencias (migración, Seguridad Social, protección social, puertos y aeropuertos, energía, relaciones laborales); nuevo modelo del Cupo y la Aportación. |
| 25-26 | 2.4 Euskera · 2.5 Cultura · 2.6 Selecciones | Euskera en la administración del Estado y en plataformas; oficialidad en la UE; 15 % del Fondo de Protección de la Cinematografía para lenguas cooficiales; selecciones deportivas vascas. |
| 27 | 3.1 Convivencia y memoria | Ampliar la Ley de Memoria Democrática; derogar la Ley de Secretos Oficiales; legislación penitenciaria ordinaria; retirar condecoraciones; repliegue de las FCSE. |
| 28-29 | 3.2 Paz | Contra el envío de armas y el aumento del gasto militar; rechazo a la OTAN; cierre del polígono de las Bardenas; bases de EE. UU.; Tratado de Prohibición de Armas Nucleares; Palestina, Sáhara, Cuba, multilateralismo. |
| 30 | Contraportada | Sin texto. |

## Compromisos de campaña anteriores y programa

Hasta el 16-nov, el paso 2 de EH Bildu se basaba en sus compromisos de campaña (`compromisos/seleccion.json`, seis compromisos, los seis prioritarios, evaluados y revisados el 12 y el 14-nov). Cada compromiso se buscó en las 179 medidas de `extraccion.json` y en el texto completo, por sus términos y por sinónimos, con el criterio de las revisiones de Vox, Compromís, PSOE y Frente Amplio: si falta el rasgo que define el compromiso, va al complemento; si falta un elemento accesorio (plazo, nombre de la norma) o el programa lo concreta, se descarta.

**Están en el programa (pasan a «descartados»):**

- eh_bildu-c01, prórroga automática de los alquileres: eb-p001, p. 5 («contratos de arrendamiento ordinarios con prórroga automática»); el programa no remite al Real Decreto-ley 28/2026 ni fija plazos ni indemnización. Prioridad eh_bildu-01.
- eh_bildu-c02, derogación de la «ley mordaza»: eb-p141 a eb-p145, p. 22, con la misma proposición de ley y sus cuatro puntos; sin el momento («tan pronto se constituyan las nuevas cámaras»). No es prioridad del programa.
- eh_bildu-c03, ley contra los pisos turísticos ilegales en plataformas: eb-p004, p. 5 («Presentaremos de nuevo la Proposición de Ley»). No es prioridad del programa.
- eh_bildu-c04, salario mínimo propio: eb-p013, p. 6, concretado en la reforma del Estatuto de los Trabajadores. Prioridad eh_bildu-05.
- eh_bildu-c05, prohibición de compra a fondos, empresas y grandes tenedores y de edificios enteros no destinados a alquiler regulado: eb-p005 y eb-p007, p. 5. Prioridad eh_bildu-03.
- eh_bildu-c06, límites a los precios de la energía y los alimentos básicos: eb-p036, p. 8, concretados como límites temporales en situaciones de crisis, junto con la absorción de costes con los márgenes (eb-p034). Prioridad eh_bildu-08.

**No están en el programa:** ninguno de los seis compromisos seleccionados. Los doce «descartados» anteriores de la selección (objetivos genéricos, medidas autonómicas o declaraciones) siguen descartados.

**Resultado:** el complemento queda vacío (`compromisos` y `prioridades` vacíos en `compromisos/seleccion.json`, como el PSOE el 15-nov y el Frente Amplio el 16-nov) y no hay evaluación de complemento. `compromisos/evaluacion.json` (base «compromisos», seis propuestas revisadas el 12 y el 14-nov) se retira: se conserva en el historial del repositorio y sus textos se reaprovechan en `evaluacion.json` del programa cuando el hecho es el mismo (eh_bildu-01, -03, -05 y -08).

**Compromisos posteriores al 14-nov** (registro `data/promesas/promesas.json`): las dos promesas locales de Mikel Otero (13-nov: cercanías soterrado en Vitoria-Gasteiz y conexión ferroviaria del aeropuerto de Foronda) no figuran en el programa en esos términos (solo el refuerzo genérico de Cercanías y Media Distancia, eb-p108, p. 17) y nunca formaron parte de la selección: no por ser de ámbito local, que no excluye (criterio único del 18-nov), sino porque cada una es una sola mención en el cuerpo de una nota de EH Bildu Araba en estilo indirecto, cuyo titular trata de optimizar los servicios ferroviarios (véase «descartados» en `compromisos/seleccion.json`). No se ha hecho una búsqueda nueva de compromisos tras el 14-nov para este complemento (mismo alcance que Vox, Compromís, PSOE y Frente Amplio).

## Resultado

- `extraccion.json`: índice con páginas del PDF, 179 medidas con cita literal y página (las viñetas, subviñetas y párrafos con medida identificable; se omiten 34 viñetas o párrafos sin medida, enumerados en la nota del fichero) y 12 prioridades justificadas con el propio documento (apertura de apartado, repeticiones, subviñetas) y, como corroboración, con el resumen oficial del programa del 16-nov. Al menos una prioridad por cada bloque de ese resumen con una medida concreta de ámbito estatal.
- `evaluacion.json`: las 12 prioridades con los 8 criterios de `data/fase3/criterios.json`.
- `compromisos/seleccion.json`: base «complemento», sin prioridades (ver arriba).
- Las citas se comprueban con `python3 -I pipeline/verify_quotes.py eh_bildu`.
