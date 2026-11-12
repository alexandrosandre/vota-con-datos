import { REPO, fase3 } from '../data';
import { EstadoProgramas } from './Coincide';

const gh = (p: string) => `${REPO}/blob/main/${p}`;
const ir = (id: string) => (e: Event) => {
  e.preventDefault();
  const h = document.getElementById(id);
  if (!h) return;
  const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  h.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
  // El foco acompaña al desplazamiento: el siguiente Tab sigue desde esa sección.
  h.setAttribute('tabindex', '-1');
  h.focus({ preventScroll: true });
};

/** Detalle técnico, siempre después de la explicación en palabras sencillas. */
function Tecnico({ children }: { children: any }) {
  return (
    <p class="muted" style={{ fontSize: '0.85rem', marginTop: 6 }}>
      <strong>Detalle técnico:</strong> {children}
    </p>
  );
}

export function Metodologia() {
  const crit = fase3.value?.criterios ?? [];
  const secciones = [
    ['objetivo', 'Objetivo'],
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

          <h2 id="objetivo">Objetivo</h2>
          <p>
            Queremos que cada persona vote <strong>con conciencia</strong>: que entienda qué propone cada partido y en qué se apoya. Y que su
            voto <strong>llegue a donde quería</strong>: que sepa qué probabilidad tiene, con la ley electoral, de ayudar a lograr un escaño en su provincia. No
            trabajamos para ningún partido. No hay publicidad ni recogemos datos.
          </p>

          <h2 id="orden">Por qué este orden: Elige → Contrasta → Suma</h2>
          <p>
            Es el orden en que se toma una decisión informada. Primero, <em>qué quiero</em>: con qué ideas coincides, sin saber de qué partido
            son. Después, <em>si se sostiene</em>: qué fundamento tienen las propuestas de los partidos con los que coincides. Por último,{' '}
            <em>si mi voto llega</em>: qué probabilidad tiene de ayudar a lograr un escaño. Dejamos el cálculo de escaños para el final para que las opciones de cada
            partido no condicionen tu preferencia antes de formarla. Así, la alternativa que te sugiere el paso 3 sale de una preferencia ya
            contrastada. Cada paso funciona también por separado.
          </p>

          <h2 id="fuentes">Fuentes y reglas de los datos</h2>
          <ul>
            <li>
              <strong>Convocatoria y escaños de cada provincia:</strong> Real Decreto 806/2026, publicado en el Boletín Oficial del Estado (BOE)
              con la referencia BOE-A-2026-20742.
            </li>
            <li>
              <strong>Candidaturas:</strong> solo las <em>proclamadas</em>, es decir, las aceptadas oficialmente por las juntas electorales y
              publicadas en el BOE (BOE-A-2026-23103), con su corrección oficial (BOE-A-2026-23383). Nada de rumores ni de acuerdos anunciados.
            </li>
            <li>
              <strong>Resultados de 2023 y de las europeas de 2024:</strong> recuento oficial (Junta Electoral Central, en el BOE, y ficheros del
              Ministerio del Interior).
            </li>
            <li>
              <strong>Encuestas:</strong> la publicación original de la empresa que la hace o del medio que la encarga, con su ficha técnica
              (fechas, número de entrevistas y método).
            </li>
            <li>
              <strong>Programas:</strong> el documento oficial descargado de la web de cada partido. Guardamos su «huella digital» (un código que
              cambia si se toca una sola letra) para asegurar que analizamos exactamente ese documento.
            </li>
            <li>
              <strong>Compromisos de campaña:</strong> medidas concretas anunciadas por los partidos o sus candidatos desde la convocatoria,
              recogidas de medios de referencia o de canales oficiales, con fecha y enlace. Preferimos que las confirmen dos fuentes
              independientes.
            </li>
          </ul>
          <p>
            Ningún dato se teclea a mano. Todo se extrae con programas informáticos (<a href={gh('pipeline')}>pipeline/</a>) y se revisa
            automáticamente cada vez que actualizamos la web. Por ejemplo, si aplicamos nuestro cálculo del reparto a los resultados oficiales de
            2023, salen exactamente los 350 escaños que hubo.
          </p>
          <Tecnico>la huella digital es un resumen SHA-256 del fichero del programa.</Tecnico>
          <h3>Estado de los programas</h3>
          <EstadoProgramas />

          <h2 id="coincide">Paso 1 · Elige: ¿con quién coincides?</h2>
          <p>
            Seguimos lo que mejor funciona en los cuestionarios de orientación de voto de otros países (como Wahl-O-Mat en Alemania, StemWijzer
            en los Países Bajos o smartvote en Suiza) y lo que dicen los estudios sobre ellos (
            <a href={gh('docs/research/vaa_estado_del_arte.md')}>resumen con referencias</a>):
          </p>
          <ul>
            <li>
              <strong>30 afirmaciones</strong> nacidas de propuestas reales de esta campaña: de los programas oficiales y de lo que los líderes
              de los partidos han propuesto en público. Cubren los grandes temas, sin jerga y sin meter dos preguntas en una. Unas están
              redactadas a favor de un cambio y otras en contra, para no inclinar las respuestas.
            </li>
            <li>
              <strong>Respondes en 5 niveles</strong>, de «Muy en contra» a «Muy a favor». También puedes pulsar <em>Saltar</em>: ese tema no
              cuenta. Si un tema te importa mucho o poco, puedes marcarlo para que cuente el doble o la mitad.
            </li>
            <li>
              <strong>Posición de cada partido.</strong> Sale de su programa oficial del 29-N, con cita y página (nunca de programas
              anteriores). Si no lo ha publicado, sale de lo que sus líderes nacionales o regionales han propuesto en público y en primera
              persona para estas elecciones o la próxima legislatura: en un mitin, una entrevista, un debate o un acto de campaña. Eso cuenta
              como su programa. Indicamos quién lo dijo, dónde y cuándo. No valen rumores, «fuentes del partido» ni resúmenes de terceros. Un
              primer análisis asigna cada posición con su cita. Un segundo análisis, independiente, la comprueba con la fuente y corrige o
              descarta lo que no se sostenga. Si no hay posición documentada, el partido queda «sin posición conocida» en ese tema.
            </li>
            <li>
              <strong>Afinidad.</strong> En cada tema comparamos tu respuesta con la del partido: cuanto más cerca, más afinidad. Un 100 %
              significa que coincidís en todo; un 0 %, que estáis en extremos opuestos en todo. Solo cuentan los temas en los que los dos tenéis
              posición, y los que marcaste como importantes pesan más. Te indicamos en cuántas de tus respuestas conocemos la posición de cada
              partido.
              <Tecnico>
                afinidad = 1 − Σ w·|tú − partido| / Σ w·4, donde w es el peso que diste al tema (×0,5, ×1 o ×2) y las respuestas van de −2 a
                +2. Es una distancia de Manhattan normalizada.
              </Tecnico>
            </li>
            <li>
              <strong>Con datos suficientes, con pocos datos o sin datos.</strong> Si conocemos la posición de un partido en al menos la mitad
              de tus respuestas, lo ordenamos con el resto (<em>con datos suficientes</em>). Si la conocemos en menos de la mitad, pero en al
              menos 5 temas, aparece aparte (<em>con pocos datos</em>): su porcentaje se basa en pocos temas y mezclarlo con los demás
              confundiría. Con menos de 5 temas no calculamos su porcentaje. Si dos partidos están a menos de 5 puntos, los damos por
              empatados: la diferencia es demasiado pequeña para separarlos.
            </li>
            <li>
              Están todos los partidos que tienen diputados o pueden tenerlos, se presenten o no en tu provincia. Eso se tiene en cuenta en el
              paso 3.
            </li>
          </ul>

          <h2 id="contrasta">Paso 2 · Contrasta: ¿qué hay detrás?</h2>
          <p>
            Cuando un partido ha publicado su programa, un modelo de inteligencia artificial (IA) lo lee entero y deja constancia de cada página
            leída. Extrae sus medidas concretas con la cita literal y elige hasta 12 que el propio programa presenta como centrales. Después
            las contrasta con fuentes públicas: leyes, sentencias de los tribunales, informes oficiales y estudios académicos. Entre otros, de la
            Autoridad Independiente de Responsabilidad Fiscal (AIReF, que vigila las cuentas públicas), el Banco de España, el Instituto
            Nacional de Estadística (INE), la oficina de estadística europea (Eurostat), la Organización para la Cooperación y el Desarrollo
            Económicos (OCDE) y la Comisión Europea.
          </p>
          <p>
            <strong>Si un partido no ha publicado programa</strong>, hacemos lo mismo con los compromisos que sus líderes han hecho en público
            para estas elecciones o esta legislatura: en un mitin, una entrevista, una rueda de prensa, sus redes oficiales o notas del partido.
            Siempre en primera persona y con cita literal: nada de rumores ni de lo que cuenta un periodista con sus palabras. Guardamos una
            copia de cada fuente y comprobamos automáticamente que la cita está en ella. Elegimos hasta 12 que el propio partido presenta como
            centrales (las anuncia el candidato, las repite, abren su campaña); a veces hay menos. Las valoramos con los mismos criterios y la
            misma revisión independiente. Cuando el partido publica su programa, el análisis del programa sustituye a este.
          </p>
          <p>Cada propuesta se valora en estos criterios, elegidos porque son los que mejor se pueden comprobar:</p>
          <ul>
            {crit.map((c) => (
              <li key={c.id}>
                <strong>{c.nombre}:</strong> {c.pregunta}
              </li>
            ))}
          </ul>
          <p>
            Cada criterio recibe una de cuatro valoraciones: <em>Sólida</em> (los datos o las leyes la respaldan), <em>Matizable</em> (hay
            datos a favor y en contra, o depende de cómo se aplique), <em>Débil</em> (los datos o las leyes la contradicen, o le falta lo
            esencial) y <em>No verificable</em> (no hay base suficiente: lo decimos en lugar de opinar). Para la concreción y el coste hay una
            tabla fija que dice qué hace falta para cada valoración, de modo que los mismos hechos reciban la misma nota en todos los partidos.
            Se juzga el fundamento de cada propuesta, nunca su ideología.
          </p>
          <p>
            Control de calidad: todas las citas se comprueban automáticamente con el texto oficial. Un segundo análisis independiente abre cada
            fuente, corrige errores y solo da el visto bueno si no queda ninguna afirmación sin respaldo. Solo publicamos lo aprobado, y solo si
            la huella digital coincide con la del documento analizado: el programa oficial que descargamos o, si no hay programa, la selección de
            compromisos con sus fuentes guardadas.
          </p>

          <h2 id="cuenta">Paso 3 · Suma: ¿tu voto tendrá escaño?</h2>
          <ol>
            <li>
              <strong>Reparto según la ley.</strong> Cada provincia reparte sus propios escaños. Primero quedan fuera las candidaturas con menos
              del 3 % de los votos válidos de la provincia (los votos en blanco cuentan como válidos). Los escaños se reparten entre las demás con
              el método D'Hondt, que reparte los escaños de forma aproximadamente proporcional a los votos. Si hay empate, gana la que tiene más votos.
              <Tecnico>
                lo fija el artículo 163 de la Ley Orgánica del Régimen Electoral General (LOREG). Método D'Hondt: se divide el voto de cada
                candidatura entre 1, 2, 3… y los escaños van, uno a uno, a los resultados más altos.
              </Tecnico>
            </li>
            <li>
              <strong>Con qué datos se calcula.</strong> Por defecto, con la <strong>media de encuestas</strong>: tomamos la última encuesta de
              cada empresa cuyas entrevistas terminaron en los últimos 21 días (en su publicación original), trasladamos cada una a tu provincia
              y hacemos la media simple, sin dar más peso a ninguna. También puedes calcular con una encuesta concreta o con los resultados de
              2023.
              <br />
              <strong>Trasladar una encuesta a tu provincia:</strong> si un partido tiene en la encuesta un 10 % más de voto que en 2023 en toda
              España (por ejemplo, pasa del 20 % al 22 %), le damos un 10 % más de voto en cada provincia. Los partidos que la encuesta no
              recoge conservan su voto de 2023. Si una encuesta no da Compromís por separado, su cifra de «Frente Amplio» se toma como la de todo
              ese espacio (Frente Amplio y los partidos que van con él en algunas comunidades, Compromís incluido).
              <br />
              <strong>Resultados de 2023:</strong> el voto real de 2023 en tu provincia. Frente Amplio y Podemos, que en 2023 iban juntos en
              Sumar, se reparten ese voto según lo que sacó cada uno en las europeas de 2024 en esa provincia. Las candidaturas que no se
              presentaron en 2023 aparecen «sin datos para estimarla».
              <br />
              Del 24 de noviembre hasta el cierre de los colegios el 29, la ley prohíbe publicar encuestas. En esos días solo se puede calcular
              con los resultados de 2023.
              <Tecnico>este traslado proporcional se conoce como «swing proporcional».</Tecnico>
            </li>
            <li>
              <strong>Probabilidad de escaño.</strong> Ni las encuestas ni el pasado aciertan del todo. Por eso repetimos el cálculo 4.000
              veces, y en cada repetición movemos un poco al azar el voto de cada candidatura. La probabilidad de escaño es el porcentaje de
              repeticiones en que la candidatura logra al menos un escaño. Cuánto movemos el voto sale de lo ocurrido en las elecciones de 2015
              a 2023 (<a href={gh('docs/research/calibracion_incertidumbre.md')}>cómo lo calculamos</a>). Con encuestas, lo que suelen fallar
              las encuestas de los últimos días más lo que cada provincia se aparta de la tendencia nacional: un partido del 30 % suele moverse
              unos 4,4 puntos arriba o abajo, y uno del 3 %, unos 1,4 puntos. Con los resultados de 2023, más: lo que suele cambiar el voto de
              una elección a otra. Lo hemos comprobado con encuestas de las elecciones de 2016 a 2023: de los casos a los que el cálculo daba
              alrededor de un 84 % de probabilidad, el 84 % ganó escaño.
              <Tecnico>
                es una simulación de Monte Carlo. El voto de cada candidatura varía con un error log-normal de σ = k/√cuota (cuota: su parte del
                voto). k es 0,08 con encuestas y 0,15 con los resultados de 2023. Esos «4,4» y «1,4 puntos» son una desviación típica con k =
                0,08.
              </Tecnico>
            </li>
            <li>
              <strong>Coste de un escaño:</strong> cuántos votos le cuesta cada escaño a la candidatura (sus votos divididos entre sus escaños),
              en tu provincia y en toda España en 2023, y cuántos votos más le harían falta para el primer escaño o el siguiente.
            </li>
            <li>
              <strong>Alternativa:</strong> solo si nos das un orden de preferencia: el del paso 1 (de más a menos afinidad) o el que pongas a
              mano. Si tu opción tiene menos de un 50 % de probabilidad de escaño en tu provincia, te señalamos la primera de ese orden, sin
              contar tu voto, que supera ese 50 %. Si un partido de tu orden va en coalición, cuenta la coalición. Sin orden de preferencia no
              sugerimos nada. Votar a quien prefieres siempre es legítimo: los votos cuentan también para la financiación pública de los
              partidos y como señal política.
            </li>
          </ol>
          <p>
            Comprobación: cuando una empresa publica su propio reparto de escaños, lo comparamos con el nuestro. Por ejemplo, con la
            macroencuesta del CIS, nuestro reparto cae dentro de la horquilla del CIS en 714 de 728 casos (cada partido en cada provincia). Las
            diferencias vienen de trasladar la encuesta nacional a cada provincia (<a href={gh('data/build/fase2_validacion.txt')}>informe</a>).
          </p>

          <h2 id="ia">Uso de inteligencia artificial</h2>
          <p>
            Usamos Claude, un modelo de IA de la empresa Anthropic, para leer programas, situar a cada partido en cada afirmación y valorar
            propuestas. Las instrucciones exactas que le damos están publicadas (<a href={gh('docs/prompts')}>docs/prompts</a>) y cada
            resultado lleva sus fuentes. La IA no decide nada que no se pueda revisar: cada cita se comprueba automáticamente, cada valoración
            la revisa un segundo análisis independiente y el cálculo de escaños es aritmética normal (con los mismos datos da siempre el mismo
            resultado), comprobada con pruebas automáticas.
          </p>

          <h2 id="limites">Límites</h2>
          <ul>
            <li>Un cuestionario de 30 temas simplifica: dos partidos pueden coincidir contigo por razones distintas.</li>
            <li>Los compromisos de campaña son más breves que un programa. Por eso indicamos siempre de dónde sale cada posición.</li>
            <li>
              La probabilidad de escaño depende de los datos con que calcules (media de encuestas, una encuesta concreta o resultados de 2023):
              ni el pasado ni las encuestas garantizan el resultado. Del 24 de noviembre al cierre de los colegios, la ley prohíbe publicar o
              reproducir encuestas: en ese periodo la web solo calcula con los resultados de 2023.
            </li>
            <li>
              Los modelos de IA pueden equivocarse. Por eso todo se puede revisar y cualquier persona puede{' '}
              <a href={`${REPO}/issues`}>avisar de un error</a>.
            </li>
          </ul>

          <h2 id="codigo">Código y datos</h2>
          <p>
            Todo es público en <a href={REPO}>{REPO.replace('https://', '')}</a>: el cálculo de{' '}
            <a href={gh('web/src/engine/seats.ts')}>escaños</a> y el de <a href={gh('web/src/engine/match.ts')}>afinidad</a> con sus pruebas
            automáticas, los programas que extraen y revisan los datos, los datos con sus fuentes y el informe de cada programa analizado.
          </p>
        </article>
      </div>
    </div>
  );
}
