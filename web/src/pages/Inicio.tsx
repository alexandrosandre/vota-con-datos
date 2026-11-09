import { estado } from '../store';
import { fase1, fase2, fase3, partidos, REPO } from '../data';
import { PASOS } from '../brand';

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
    contrasta: evaluados > 0 ? `${evaluados} programas analizados · se amplía según publican` : 'Se completa según publican los programas',
    cuenta: `52 circunscripciones · ${candidaturas} candidaturas del BOE`,
  };

  return (
    <div class="wrap">
      <section class="hero">
        <div class="kicker">Elecciones generales · 29 de noviembre de 2026</div>
        <h1>
          <span class="l1">Coincide.</span> <span class="l2">Contrasta.</span> <span class="l3">Cuenta.</span>
          <br />
          <span class="eslogan">Vota sabiendo a qué votas.</span>
        </h1>
        <p class="lead">
          Tres pasos para pasar de la intuición a un voto informado: con quién coincides de verdad, qué hay detrás de lo que promete, y si tu
          voto llegará a escaño en tu provincia. Con fuentes oficiales, algoritmos abiertos y sin guardar ningún dato tuyo.
        </p>
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
          <span>programas oficiales publicados y leídos</span>
        </div>
        <div>
          <b>{promesas}</b>
          <span>compromisos de campaña verificados</span>
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
            <p>Programas de cada partido, listas del BOE, resultados del Ministerio del Interior, encuestas en su publicación original.</p>
          </div>
          <div>
            <h3>Algoritmos abiertos</h3>
            <p>
              Código, datos y prompts de IA en <a href={REPO} target="_blank" rel="noopener">GitHub</a>. Cualquiera puede revisar y reproducir
              cada cálculo.
            </p>
          </div>
          <div>
            <h3>Neutralidad</h3>
            <p>Mismos criterios para todos los partidos. Juzgamos el fundamento de las propuestas, no su ideología. Las afirmaciones no dicen de quién son.</p>
          </div>
          <div>
            <h3>Lo que no sabemos, lo decimos</h3>
            <p>Si un programa no está publicado o un dato no se puede verificar, aparece así. No rellenamos huecos.</p>
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
            No. El paso 1 te muestra con quién coincides; el 2, qué fundamento tienen sus propuestas; el 3, si tu voto se convertirá en escaño.
            La decisión es tuya, y votar a quien prefieres siempre es legítimo.
          </p>
        </details>
        <details>
          <summary>¿Por qué no aparece el análisis de algunos partidos?</summary>
          <p>
            Solo analizamos programas oficiales completos, y varios partidos los publican durante la campaña. La web se actualiza a medida que
            aparecen. Mientras tanto mostramos sus compromisos de campaña con fuente.
          </p>
        </details>
        <details>
          <summary>¿Cómo se usa la inteligencia artificial?</summary>
          <p>
            Un modelo de IA (Claude, de Anthropic) lee los programas completos y contrasta las propuestas con fuentes públicas; un segundo
            análisis independiente revisa cada valoración y cada fuente, y todas las citas se comprueban automáticamente contra el texto
            oficial. Las instrucciones exactas están publicadas.
          </p>
        </details>
        <details>
          <summary>¿Guardáis mis respuestas?</summary>
          <p>No. Todo se calcula en tu navegador y solo se guarda en él, para que puedas volver. Puedes borrarlo cuando quieras.</p>
        </details>
      </section>
    </div>
  );
}
