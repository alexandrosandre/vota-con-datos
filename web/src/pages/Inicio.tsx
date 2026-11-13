import { estado } from '../store';
import { fase1, fase2, fase3, partidos, REPO } from '../data';
import { LEMA, PASOS } from '../brand';

export function Inicio() {
  const ps = partidos.value ?? [];
  const publicados = ps.filter((p) => p.programa.estado === 'publicado').length;
  const preguntas = fase1.value?.preguntas.length ?? 0;
  const evaluados = Object.values(fase3.value?.partidos ?? {}).filter((p) => p.estado === 'evaluado').length;
  const candidaturas = fase2.value?.circunscripciones.reduce((s, c) => s + c.candidaturas.length, 0) ?? 0;
  const promesas = ps.reduce((s, p) => s + (p.promesas?.length ?? 0), 0);
  const hechas = Object.values(estado.value.respuestas).filter((r) => r.valor !== null).length;

  const estadoPaso: Record<string, string> = {
    coincide: preguntas === 0 ? 'Preparando el cuestionario' : hechas > 0 ? `${hechas} de ${preguntas} respondidas` : `${preguntas} afirmaciones · unos 10 minutos`,
    contrasta: evaluados > 0 ? `${evaluados} de ${ps.length} partidos analizados` : 'Análisis en preparación',
    cuenta: `50 provincias, Ceuta y Melilla · ${candidaturas} candidaturas del BOE`,
  };

  return (
    <div class="wrap">
      <section class="hero">
        <div class="kicker">Elecciones generales · 29 de noviembre de 2026</div>
        <h1>
          <span class="l1">{LEMA.lema[0]}</span> <span class="l2">{LEMA.lema[1]}</span> <span class="l3">{LEMA.lema[2]}</span>
          <br />
          <span class="eslogan">{LEMA.eslogan}</span>
        </h1>
        <p class="lead">{LEMA.lead}</p>
        <div class="row">
          <a class="btn primary p1" href="#/coincide">
            Empezar por el paso 1
          </a>
          <a class="btn" href="#/metodologia">
            Cómo funciona
          </a>
        </div>
      </section>

      <section class="trayecto" aria-label="Los tres pasos">
        {PASOS.map((p) => (
          <a key={p.id} class={`etapa ${p.clase}`} href={`#${p.ruta}`}>
            <div class="num">
              <b>{p.n}</b>
              <span>{p.verbo}</span>
            </div>
            <h2>{p.pregunta}</h2>
            <p>{p.resumen}</p>
            <span class="go">{p.cta} →</span>
            <span class="estado">{estadoPaso[p.id]}</span>
          </a>
        ))}
      </section>
      <p class="muted" style={{ fontSize: '0.9rem' }}>
        Cada paso funciona por sí solo: puedes empezar por cualquiera. Hechos en orden, cada uno aprovecha lo anterior.
      </p>

      <section class="cifras" aria-label="Datos de partida">
        <div>
          <b>{candidaturas}</b>
          <span>candidaturas proclamadas en el BOE</span>
        </div>
        <div>
          <b>
            {publicados}/{ps.length}
          </b>
          <span>partidos que ya han publicado su programa oficial</span>
        </div>
        <div>
          <b>{promesas}</b>
          <span>compromisos de campaña recogidos, con fuente</span>
        </div>
        <div>
          <b>0</b>
          <span>datos tuyos que salen de tu navegador</span>
        </div>
      </section>

      <section class="seccion">
        <div class="principios">
          <div>
            <h3>Fuentes oficiales</h3>
            <p>
              Programas de cada partido y lo que sus líderes dicen en público, listas del Boletín Oficial del Estado (BOE), resultados del
              Ministerio del Interior y encuestas en su publicación original.
            </p>
          </div>
          <div>
            <h3>Cálculos abiertos</h3>
            <p>
              El código, los datos y las instrucciones que damos a la IA están en{' '}
              <a href={REPO} target="_blank" rel="noopener">GitHub</a>. Cualquiera puede revisar y repetir cada cálculo.
            </p>
          </div>
          <div>
            <h3>Neutralidad</h3>
            <p>Mismos criterios para todos los partidos. Juzgamos el fundamento de las propuestas, no su ideología. En el paso 1 no ves de quién es cada propuesta hasta el final.</p>
          </div>
          <div>
            <h3>Lo que no sabemos, lo decimos</h3>
            <p>Si un programa no está publicado o un dato no se puede comprobar, lo indicamos. No rellenamos huecos.</p>
          </div>
        </div>
      </section>

      <section class="seccion faq">
        <h2>Preguntas frecuentes</h2>
        <details>
          <summary>¿Quién está detrás?</summary>
          <p>
            Un proyecto ciudadano independiente, sin vínculo con ningún partido, medio ni empresa demoscópica. Todo el trabajo es público en
            GitHub y cualquier persona puede proponer correcciones.
          </p>
        </details>
        <details>
          <summary>¿Me decís a quién votar?</summary>
          <p>
            No. El paso 1 te muestra con quién coincides; el 2, qué fundamento tienen sus propuestas; el 3, qué probabilidad tiene tu voto de
            ayudar a lograr un escaño. La decisión es tuya, y votar a quien prefieres siempre es legítimo.
          </p>
        </details>
        <details>
          <summary>¿Por qué no aparece el análisis de algunos partidos?</summary>
          <p>
            Analizamos el programa oficial de cada partido. Si aún no lo ha publicado, analizamos con el mismo método lo que sus líderes han
            prometido en público. Cada análisis aparece cuando ha pasado una revisión independiente; hasta entonces figura como pendiente.
            Cuando un partido publica su programa, sus propuestas centrales pasan a salir del programa, y los compromisos de sus líderes que no
            estén en él se siguen mostrando aparte.
          </p>
        </details>
        <details>
          <summary>¿Cómo se usa la inteligencia artificial?</summary>
          <p>
            Un modelo de IA (Claude, de Anthropic) lee los programas completos, o lo que han dicho los líderes si no hay programa, y
            contrasta las propuestas con fuentes públicas. Después, un segundo análisis independiente revisa cada valoración y cada fuente.
            Todas las citas se comprueban automáticamente contra el texto original. Las instrucciones exactas que damos a la IA están
            publicadas.
          </p>
        </details>
        <details>
          <summary>¿Guardáis mis respuestas?</summary>
          <p>
            No, nosotros no guardamos nada. Todo se calcula en tu navegador y tus respuestas se quedan en él, para que puedas volver; puedes
            borrarlas cuando quieras. No usamos cookies. <a href="#/privacidad">Más sobre privacidad</a>.
          </p>
        </details>
      </section>
    </div>
  );
}
