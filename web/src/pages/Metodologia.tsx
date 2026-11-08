import { useEffect } from 'preact/hooks';
import { REPO, fase3 } from '../data';
import { EstadoProgramas } from './Fase1';

const gh = (p: string) => `${REPO}/blob/main/${p}`;

export function Metodologia() {
  useEffect(() => {
    const id = location.hash.split('#')[2];
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  const crit = fase3.value?.criterios ?? [];
  return (
    <div class="wrap page">
      <div class="two">
        <nav class="toc" aria-label="Índice">
          <a href="#/metodologia#intencion">Intención</a>
          <a href="#/metodologia#fuentes">Fuentes</a>
          <a href="#/metodologia#fase1">Fase 1 · Afinidad</a>
          <a href="#/metodologia#fase2">Fase 2 · Escaños</a>
          <a href="#/metodologia#fase3">Fase 3 · Rigor</a>
          <a href="#/metodologia#limites">Límites</a>
          <a href="#/metodologia#codigo">Código</a>
        </nav>
        <article class="prose" style={{ maxWidth: 760 }}>
          <div class="kicker">Metodología</div>
          <h1>Cómo funciona vota con datos</h1>
          <p class="lead">
            Todo lo que ves aquí se puede comprobar: las fuentes están enlazadas, el código es público y los cálculos se hacen en tu
            navegador.
          </p>

          <h2 id="intencion">Intención</h2>
          <p>
            Queremos que cada persona vote <strong>con conciencia</strong> (entendiendo qué propone cada partido y con qué fundamento) y que
            su voto <strong>llegue a donde quería</strong> (sabiendo si, con la ley electoral, se convertirá en escaño en su provincia). No
            somos un partido ni trabajamos para ninguno; no hay publicidad ni recogida de datos.
          </p>

          <h2 id="fuentes">Fuentes y reglas de los datos</h2>
          <ul>
            <li><strong>Convocatoria y escaños por provincia:</strong> Real Decreto 806/2026 (BOE-A-2026-20742).</li>
            <li><strong>Candidaturas:</strong> solo las <em>proclamadas</em> y publicadas en el BOE por las Juntas Electorales Provinciales, con sus correcciones oficiales. Nada de rumores ni acuerdos anunciados.</li>
            <li><strong>Resultados de 2023 y europeas de 2024:</strong> ficheros oficiales del Ministerio del Interior (infoelectoral), escrutinio definitivo.</li>
            <li><strong>Encuestas:</strong> la publicación del propio instituto o del medio que la encarga, con su ficha técnica.</li>
            <li><strong>Programas:</strong> el documento oficial descargado de la web de cada partido, con su huella SHA-256 para que se pueda comprobar que es el mismo.</li>
          </ul>
          <p>
            Ningún dato se teclea a mano: todo se extrae con scripts que están en <a href={gh('pipeline')}>pipeline/</a> y se valida
            automáticamente (por ejemplo, el reparto de 2023 recalculado con nuestro motor reproduce exactamente los 350 escaños oficiales).
          </p>
          <h3>Estado de los programas</h3>
          <EstadoProgramas />

          <h2 id="fase1">Fase 1 · Afinidad</h2>
          <p>
            Seguimos el estado del arte de los cuestionarios de orientación de voto (Wahl-O-Mat, StemWijzer, smartvote, euandi) y su
            literatura académica (<a href={gh('docs/research/vaa_estado_del_arte.md')}>resumen con referencias</a>):
          </p>
          <ul>
            <li><strong>Unas 30 afirmaciones</strong>, cada una basada en una propuesta real de un programa del 29-N o en un compromiso público de un cabeza de lista, cubriendo los grandes ejes (economía, Estado del bienestar, territorio, inmigración, clima, instituciones, exterior…). Redactadas sin jerga, sin dobles preguntas y equilibrando formulaciones a favor y en contra.</li>
            <li><strong>Respuesta en 5 niveles</strong> más <em>Saltar</em> (no cuenta) y un peso de importancia (×0,5, ×1, ×2).</li>
            <li><strong>Posición de cada partido</strong>: codificada desde su programa oficial, con cita literal y página, por dos codificaciones independientes; las discrepancias se resuelven releyendo el texto. Si el programa no se pronuncia, el partido queda "sin posición" en ese tema (no se le inventa una).</li>
            <li>
              <strong>Afinidad</strong> = 1 − Σ w·|tú − partido| / Σ w·4, sobre los temas en que ambos tenéis posición (distancia de Manhattan
              normalizada, la más usada y validada). Se muestra la <em>cobertura</em> y se avisa si es baja. Diferencias de menos de 5 puntos se
              presentan como empate técnico.
            </li>
            <li>Están todos los partidos con representación actual o esperada, aunque no se presenten en tu provincia (eso se filtra en la fase 2).</li>
          </ul>

          <h2 id="fase2">Fase 2 · Escaños</h2>
          <ol>
            <li><strong>Reparto legal</strong> (art. 163 LOREG): se excluyen las candidaturas por debajo del 3 % de los votos válidos de la provincia (los blancos cuentan como válidos); el resto se reparte por D'Hondt; los empates se deciden por más votos totales.</li>
            <li>
              <strong>Escenario central.</strong> Por defecto, el voto de 2023 en tu provincia. Las candidaturas nuevas o que en 2023 iban
              en coalición con otras se reparten con el peso relativo que tuvieron en las europeas de 2024 en esa misma provincia. Con una
              encuesta, el voto provincial de cada partido es su resultado de referencia multiplicado por el cociente entre su estimación
              nacional en la encuesta y su resultado nacional de referencia (<em>swing</em> proporcional), y se renormaliza.
            </li>
            <li>
              <strong>Incertidumbre.</strong> 4.000 simulaciones en las que el voto de cada candidatura se perturba con un error log-normal de
              desviación σ = k/√cuota (k = 0,04 en el nivel medio con encuestas, 0,05 con la base de 2023 porque tiene tres años: ±2,2 puntos para un partido del 30 %, ±0,7 para uno del 3 % con k = 0,04), coherente
              con el error típico de las encuestas en España. La probabilidad de escaño es la fracción de simulaciones en que lo obtiene.
            </li>
            <li><strong>Coste de un escaño</strong>: votos del partido divididos por sus escaños, en tu provincia (escenario central) y en toda España en 2023; y votos adicionales que le harían falta para su primer o siguiente escaño.</li>
            <li><strong>Sugerencia</strong>: si tu opción tiene menos de un 50 % de probabilidad, te mostramos la primera de tus siguientes preferencias (de la fase 1 o de tu orden manual) que supera ese 50 % en tu provincia. Votar a quien prefieres siempre es legítimo: te damos la información, la decisión es tuya.</li>
          </ol>

          <h2 id="fase3">Fase 3 · Rigor</h2>
          <p>
            Para cada partido con programa publicado seleccionamos sus 12 propuestas principales (por el espacio y la prioridad que les da
            el propio programa y por su peso en la campaña) y un modelo de IA (Claude, de Anthropic) las evalúa con búsqueda documental en
            fuentes públicas: legislación, jurisprudencia, informes de AIReF, Banco de España, OCDE, Comisión Europea, literatura académica y
            prensa de referencia. Cada valoración lleva sus fuentes enlazadas. Una segunda pasada independiente revisa las valoraciones y las
            citas. Los criterios elegidos son los más verificables:
          </p>
          <ul>
            {crit.map((c) => (
              <li key={c.id}>
                <strong>{c.nombre}:</strong> {c.pregunta}
              </li>
            ))}
          </ul>
          <p>
            Escala: <em>Sólida</em> (la evidencia o el marco legal la respaldan), <em>Matizable</em> (hay argumentos y evidencia en ambos
            sentidos o depende del diseño), <em>Débil</em> (la evidencia o el marco legal la contradicen o falta lo esencial) y{' '}
            <em>No verificable</em> (no hay base suficiente para juzgar; lo decimos en lugar de opinar). Las valoraciones juzgan el
            fundamento de cada propuesta, no si es buena o mala ideológicamente.
          </p>

          <h2 id="limites">Límites</h2>
          <ul>
            <li>Un cuestionario de 30 temas simplifica: dos partidos pueden coincidir contigo por razones distintas.</li>
            <li>La probabilidad de escaño depende del escenario elegido; ninguna encuesta ni el pasado garantizan el resultado.</li>
            <li>Los modelos de IA pueden equivocarse. Por eso cada valoración enlaza sus fuentes y el análisis completo está en GitHub para que cualquiera lo revise y proponga correcciones.</li>
          </ul>

          <h2 id="codigo">Código y datos</h2>
          <p>
            Todo es público en <a href={REPO}>{REPO.replace('https://', '')}</a>: motores (<a href={gh('web/src/engine/seats.ts')}>escaños</a>,{' '}
            <a href={gh('web/src/engine/match.ts')}>afinidad</a>) con sus tests, scripts de extracción y validación, datos con sus fuentes
            y los informes de cada programa. ¿Has visto un error? Abre una incidencia en GitHub.
          </p>
        </article>
      </div>
    </div>
  );
}
