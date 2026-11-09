import { REPO, fase3 } from '../data';
import { EstadoProgramas } from './Coincide';

const gh = (p: string) => `${REPO}/blob/main/${p}`;
const ir = (id: string) => (e: Event) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function Metodologia() {
  const crit = fase3.value?.criterios ?? [];
  const secciones = [
    ['intencion', 'Intención'],
    ['orden', 'Por qué este orden'],
    ['fuentes', 'Fuentes'],
    ['coincide', '1 · Elige'],
    ['contrasta', '2 · Contrasta'],
    ['cuenta', '3 · Suma'],
    ['ia', 'Uso de IA'],
    ['limites', 'Límites'],
    ['codigo', 'Código y datos'],
  ];
  return (
    <div class="wrap page">
      <div class="two">
        <nav class="toc" aria-label="Índice">
          {secciones.map(([id, t]) => (
            <a key={id} href={`#/metodologia`} onClick={ir(id)}>
              {t}
            </a>
          ))}
        </nav>
        <article class="prose" style={{ maxWidth: 760 }}>
          <div class="kicker">Metodología</div>
          <h1>Cómo funciona vota con datos</h1>
          <p class="lead">
            Todo lo que ves se puede comprobar: las fuentes están enlazadas, el código es público y los cálculos se hacen en tu navegador.
          </p>

          <h2 id="intencion">Intención</h2>
          <p>
            Que cada persona vote <strong>con conciencia</strong>, entendiendo qué propone cada partido y con qué fundamento, y que su voto{' '}
            <strong>llegue a donde quería</strong>, sabiendo si con la ley electoral se convertirá en escaño en su provincia. No trabajamos para
            ningún partido, no hay publicidad ni recogida de datos.
          </p>

          <h2 id="orden">Por qué este orden: Elige → Contrasta → Suma</h2>
          <p>
            Es el orden en que se toma una decisión informada: primero <em>qué quiero</em> (afinidad sincera, sin siglas), después{' '}
            <em>si se sostiene</em> (el fundamento de lo que proponen los partidos con los que coincides) y por último <em>si mi voto llega</em>{' '}
            (la conversión práctica en escaños). Poner el cálculo de escaños al final evita que la viabilidad condicione tu preferencia antes de
            haberla formado, y hace que la alternativa que te sugiere el paso 3 salga de una preferencia ya contrastada. Cada paso funciona por
            separado.
          </p>

          <h2 id="fuentes">Fuentes y reglas de los datos</h2>
          <ul>
            <li><strong>Convocatoria y escaños por provincia:</strong> Real Decreto 806/2026 (BOE-A-2026-20742).</li>
            <li><strong>Candidaturas:</strong> solo las <em>proclamadas</em> y publicadas en el BOE (BOE-A-2026-23103) con su corrección oficial (BOE-A-2026-23383). Nada de rumores ni acuerdos anunciados.</li>
            <li><strong>Resultados de 2023 y europeas de 2024:</strong> escrutinio oficial (Junta Electoral Central en el BOE y ficheros del Ministerio del Interior).</li>
            <li><strong>Encuestas:</strong> la publicación del propio instituto o del medio que la encarga, con su ficha técnica.</li>
            <li><strong>Programas:</strong> el documento oficial descargado de la web de cada partido, identificado con su huella SHA-256.</li>
            <li><strong>Compromisos de campaña:</strong> medidas concretas anunciadas por los partidos o sus candidatos desde la convocatoria, leídas en medios de referencia o canales oficiales, con fecha y enlace; preferimos dos fuentes independientes.</li>
          </ul>
          <p>
            Ningún dato se teclea a mano: todo se extrae con scripts (<a href={gh('pipeline')}>pipeline/</a>) y se valida automáticamente en cada
            publicación. Por ejemplo, nuestro motor de reparto aplicado a los resultados oficiales de 2023 reproduce exactamente los 350 escaños.
          </p>
          <h3>Estado de los programas</h3>
          <EstadoProgramas />

          <h2 id="coincide">Paso 1 · Elige: ¿con quién coincides?</h2>
          <p>
            Seguimos el estado del arte de los cuestionarios de orientación de voto (Wahl-O-Mat, StemWijzer, smartvote, euandi) y su literatura
            académica (<a href={gh('docs/research/vaa_estado_del_arte.md')}>resumen con referencias</a>):
          </p>
          <ul>
            <li><strong>30 afirmaciones</strong> nacidas de propuestas reales de esta campaña: programas oficiales y compromisos públicos de los cabezas de lista. Cubren los grandes temas, sin jerga ni dobles preguntas, con formulaciones equilibradas a favor y en contra.</li>
            <li><strong>Respuesta en 5 niveles</strong> más <em>Saltar</em> (no cuenta) y un peso de importancia (×0,5, ×1, ×2).</li>
            <li><strong>Posición de cada partido</strong>: de su programa oficial del 29-N (cita y página; nunca de programas anteriores) o de lo que sus líderes nacionales o regionales han propuesto en público y en primera persona (mitin, entrevista, debate, acto de campaña o precampaña) para estas elecciones o la próxima legislatura, que cuenta como programa. Se indica quién lo dijo, dónde y cuándo. No valen rumores, «fuentes del partido» ni resúmenes de terceros. Un primer análisis codifica cada posición con su cita; un segundo, independiente, comprueba cada una contra su fuente y corrige o descarta lo que no se sostenga. Si no hay posición documentada, el partido queda "sin posición conocida".</li>
            <li><strong>Afinidad</strong> = 1 − Σ w·|tú − partido| / Σ w·4 sobre los temas en que ambos tenéis posición (distancia de Manhattan normalizada). Se muestra en cuántas de tus respuestas conocemos la posición de cada partido. Los partidos con posición conocida en al menos la mitad de tus respuestas se ordenan juntos como comparables; los que tienen al menos 5 temas en común pero menos cobertura aparecen aparte, como orientativos, para no mezclar porcentajes calculados sobre bases muy distintas. Diferencias de menos de 5 puntos son empate técnico.</li>
            <li>Están todos los partidos con representación actual o esperada, se presenten o no en tu provincia (eso se filtra en el paso 3).</li>
          </ul>

          <h2 id="contrasta">Paso 2 · Contrasta: ¿qué hay detrás?</h2>
          <p>
            Para cada partido con programa publicado, un modelo de IA lee el documento completo (deja constancia de cada página leída), extrae sus
            medidas concretas con cita literal y selecciona las 12 que el propio programa presenta como centrales. Después las evalúa con fuentes
            públicas (legislación, jurisprudencia, AIReF, Banco de España, INE, Eurostat, OCDE, Comisión Europea, literatura académica) en estos
            criterios, elegidos por ser los más verificables:
          </p>
          <ul>
            {crit.map((c) => (
              <li key={c.id}>
                <strong>{c.nombre}:</strong> {c.pregunta}
              </li>
            ))}
          </ul>
          <p>
            Escala: <em>Sólida</em> (la evidencia o el marco legal la respaldan), <em>Matizable</em> (evidencia en ambos sentidos, o depende del
            diseño), <em>Débil</em> (la evidencia o el marco legal la contradicen, o falta lo esencial) y <em>No verificable</em> (no hay base
            suficiente: lo decimos en lugar de opinar). Concreción y financiación tienen una rúbrica explícita para que los mismos hechos reciban
            la misma valoración en todos los partidos. Se juzga el fundamento de cada propuesta, nunca su orientación ideológica.
          </p>
          <p>
            Control de calidad: todas las citas se comprueban automáticamente contra el texto oficial; un segundo análisis independiente abre cada
            fuente, corrige errores y solo aprueba si no queda ninguna afirmación sin respaldo; solo se publica lo aprobado y cuyo SHA-256
            coincide con el programa catalogado.
          </p>

          <h2 id="cuenta">Paso 3 · Suma: ¿tu voto tendrá escaño?</h2>
          <ol>
            <li><strong>Reparto legal</strong> (art. 163 LOREG): fuera las candidaturas por debajo del 3 % de los votos válidos de la provincia (los blancos cuentan como válidos); el resto, por D'Hondt; los empates se deciden por más votos.</li>
            <li>
              <strong>Escenario por defecto:</strong> el voto de 2023 en tu provincia. Frente Amplio y Podemos, que en 2023 iban juntos en Sumar, se
              reparten ese voto según su peso en las europeas de 2024 en esa provincia; las candidaturas que no concurrieron en 2023 aparecen
              "sin base". <strong>Con una encuesta:</strong> el voto de cada partido en tu provincia es el de 2023 multiplicado por el cociente
              entre su estimación nacional y su resultado nacional (<em>swing</em> proporcional); los partidos que la encuesta no recoge conservan
              su voto de 2023. Si una encuestadora no da Compromís por separado, su cifra de «Frente Amplio» se toma como el espacio completo
              (Frente Amplio y sus confluencias, Compromís incluido).
            </li>
            <li>
              <strong>Incertidumbre:</strong> 4.000 simulaciones en las que el voto de cada candidatura varía con un error log-normal σ = k/√cuota.
              k está <a href={gh('docs/research/calibracion_incertidumbre.md')}>calibrado con las elecciones de 2015 a 2023</a>: 0,08 con
              encuestas (error real de las encuestas finales más la desviación provincial) y 0,15 con la base de 2023 (cuánto cambia el voto de
              una elección a otra). Con k = 0,08, un partido del 30 % varía ±4,4 puntos y uno del 3 % ±1,4. En una prueba retrospectiva sobre
              las elecciones de 2015 a 2023, los casos a los que el modelo calibrado daba alrededor de un 84 % ganaron escaño el 84 % de las veces. La probabilidad de escaño es la
              fracción de simulaciones en que lo obtiene.</li>
            <li><strong>Coste de un escaño:</strong> votos de la candidatura entre sus escaños, en tu provincia y en toda España en 2023, y votos adicionales que le faltarían para el primer o el siguiente escaño.</li>
            <li><strong>Alternativa:</strong> si tu opción tiene menos de un 50 % de probabilidad, te mostramos la primera de tus siguientes preferencias (del paso 1 o de tu orden manual; las coaliciones cuentan para los partidos que las integran) que supera ese 50 % en tu provincia. Votar a quien prefieres siempre es legítimo: los votos cuentan también para la financiación pública y como señal política.</li>
          </ol>
          <p>
            Comprobación: con cada encuesta, el total de escaños de nuestro modelo en el escenario central queda a 0–6 escaños de la proyección
            publicada por la propia encuestadora en los grandes partidos (la diferencia viene de proyectar a cada provincia) (<a href={gh('data/build/fase2_validacion.txt')}>informe</a>).
          </p>

          <h2 id="ia">Uso de inteligencia artificial</h2>
          <p>
            Usamos Claude (Anthropic) para leer programas, codificar posiciones y evaluar propuestas. Las instrucciones exactas están publicadas
            (<a href={gh('docs/prompts')}>docs/prompts</a>) y cada resultado lleva sus fuentes. La IA no decide nada que no se pueda auditar:
            cada cita se verifica por programa, cada valoración se revisa de forma independiente y cada cálculo de escaños es aritmética
            determinista y testeada.
          </p>

          <h2 id="limites">Límites</h2>
          <ul>
            <li>Un cuestionario de 30 temas simplifica: dos partidos pueden coincidir contigo por razones distintas.</li>
            <li>Los compromisos de campaña son más escuetos que un programa; por eso indicamos siempre de dónde sale cada posición.</li>
            <li>La probabilidad de escaño depende del escenario: ni el pasado ni las encuestas garantizan el resultado. Del 24 de noviembre al cierre de los colegios la ley prohíbe publicar o reproducir encuestas: en ese periodo la web solo calcula con los resultados de 2023.</li>
            <li>Los modelos de IA pueden equivocarse. Por eso todo es revisable y cualquier persona puede <a href={`${REPO}/issues`}>avisar de un error</a>.</li>
          </ul>

          <h2 id="codigo">Código y datos</h2>
          <p>
            Todo es público en <a href={REPO}>{REPO.replace('https://', '')}</a>: motores de <a href={gh('web/src/engine/seats.ts')}>escaños</a>{' '}
            y de <a href={gh('web/src/engine/match.ts')}>afinidad</a> con sus tests, scripts de extracción y validación, datos con sus fuentes e
            informes de cada programa.
          </p>
        </article>
      </div>
    </div>
  );
}
