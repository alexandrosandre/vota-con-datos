import { estado } from '../store';
import { fase1, fase3, partidos, REPO } from '../data';

function cuenta() {
  const ps = partidos.value ?? [];
  const publicados = ps.filter((p) => p.programa.estado === 'publicado').length;
  const preguntas = fase1.value?.preguntas.length ?? 0;
  const evaluados = Object.values(fase3.value?.partidos ?? {}).filter((p) => p.estado === 'evaluado').length;
  return { total: ps.length, publicados, preguntas, evaluados };
}

export function Inicio() {
  const c = cuenta();
  const e = estado.value;
  const hechas = Object.values(e.respuestas).filter((r) => r.valor !== null).length;
  return (
    <div class="wrap">
      <section class="hero">
        <div class="kicker">Elecciones generales · 29 de noviembre de 2026</div>
        <h1>
          Vota <em>con datos</em>.<br />
          Sabiendo a qué votas y a dónde llega tu voto.
        </h1>
        <p class="lead">
          Tres pasos, independientes entre sí, para pasar de la intuición a un voto informado: con qué partido coincides de verdad, si tu
          voto tendrá escaño en tu provincia, y qué hay detrás de lo que promete. Todo con fuentes oficiales, algoritmos abiertos y sin
          guardar ni un dato tuyo.
        </p>
      </section>

      <section class="fases" aria-label="Las tres fases">
        <a class="fase c1" href="#/afinidad">
          <span class="tag">{c.preguntas === 0 ? 'esperando programas' : hechas > 0 ? `${hechas} respuestas` : `${c.preguntas} preguntas · 10 min`}</span>
          <div class="num">1</div>
          <h2>¿Con quién coincides?</h2>
          <p>
            Valora propuestas reales de los programas del 29-N y de lo prometido en campaña, sin saber de quién son. Te decimos con qué
            partidos coincides más y en qué, con la cita exacta de cada programa.
          </p>
          <span class="go">Empezar la encuesta →</span>
        </a>
        <a class="fase c2" href="#/tu-voto">
          <span class="tag">52 circunscripciones</span>
          <div class="num">2</div>
          <h2>¿Tu voto tendrá escaño?</h2>
          <p>
            Elige tu provincia y tu partido. Calculamos con la ley electoral (umbral del 3 % y D'Hondt) la probabilidad de que obtenga
            escaño, cuántos votos cuesta cada diputado y, si no llega, cuál es tu siguiente opción con opciones reales.
          </p>
          <span class="go">Calcular →</span>
        </a>
        <a class="fase c3" href="#/rigor">
          <span class="tag">{c.evaluados > 0 ? `${c.evaluados} partidos analizados` : 'según publiquen programas'}</span>
          <div class="num">3</div>
          <h2>¿Qué hay detrás?</h2>
          <p>
            Las 12 propuestas principales de cada programa, contrastadas con criterios verificables: encaje legal, coste, evidencia,
            experiencia en otros países, a quién beneficia y qué pasó cuando se intentó antes.
          </p>
          <span class="go">Ver el análisis →</span>
        </a>
      </section>

      <section class="principios">
        <div>
          <h3>Solo fuentes oficiales</h3>
          <p>Programas descargados de cada partido, listas proclamadas del BOE, resultados del Ministerio del Interior. Cada dato enlaza a su origen.</p>
        </div>
        <div>
          <h3>Algoritmos abiertos</h3>
          <p>
            Todo el código y los datos están en <a href={REPO} target="_blank" rel="noopener">GitHub</a>. Puedes comprobar cada cálculo y
            reproducirlo.
          </p>
        </div>
        <div>
          <h3>Tu privacidad, intacta</h3>
          <p>No hay cuentas ni analítica. Tus respuestas no salen de tu navegador; puedes borrarlas cuando quieras.</p>
        </div>
        <div>
          <h3>Lo que no sabemos, lo decimos</h3>
          <p>
            Si un partido no ha publicado programa o una afirmación no se puede verificar, aparece así, sin rellenar huecos.{' '}
            <a href="#/metodologia">Metodología</a>.
          </p>
        </div>
      </section>
      {c.total > 0 && c.publicados < c.total && (
        <div class="note" style={{ marginBottom: 48 }}>
          Programas oficiales publicados: <strong>{c.publicados}</strong> de {c.total} partidos. Las fases 1 y 3 se completan a medida que
          cada partido publica el suyo; la fase 2 ya funciona con las listas oficiales del BOE.
        </div>
      )}
    </div>
  );
}
