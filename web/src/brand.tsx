/**
 * Marca "vota con datos". Guía completa en docs/MARCA.md y en la página #/marca.
 *
 * Símbolo: una urna vista de frente (marco redondeado + ranura) cuyo contenido son tres barras
 * crecientes — los tres pasos — en los colores de cada paso. Lectura: el voto, hecho de datos.
 */
import { ruta } from './store';

const PASOS_BASE = [
  { n: 1, id: 'coincide', ruta: '/coincide', clase: 'p1' },
  { n: 2, id: 'contrasta', ruta: '/contrasta', clase: 'p2' },
  { n: 3, id: 'cuenta', ruta: '/cuenta', clase: 'p3' },
] as const;

type TextoPaso = { verbo: string; pregunta: string; resumen: string; cta: string };

/**
 * Nombres y lema de los tres pasos. Se puede previsualizar otra versión con ?lema=<id>.
 * (Las rutas internas /coincide, /contrasta, /cuenta no cambian.)
 */
export const LEMAS: Record<string, { lema: [string, string, string]; eslogan: string; lead: string; pasos: Record<string, TextoPaso> }> = {
  actual: {
    lema: ['Coincide.', 'Contrasta.', 'Cuenta.'],
    eslogan: 'Vota sabiendo a qué votas.',
    lead: 'Tres pasos para pasar de la intuición a un voto informado: con quién coincides de verdad, qué hay detrás de lo que promete, y si tu voto llegará a escaño en tu provincia. Con fuentes oficiales, algoritmos abiertos y sin guardar ningún dato tuyo.',
    pasos: {
      coincide: {
        verbo: 'Coincide',
        pregunta: '¿Con quién coincides?',
        resumen:
          'Valora propuestas reales del 29-N, de sus programas y de lo que han dicho sus líderes, sin saber de quién son. Descubre con qué partidos coincides y en qué, con la cita exacta.',
        cta: 'Empezar el cuestionario',
      },
      contrasta: {
        verbo: 'Contrasta',
        pregunta: '¿Qué hay detrás?',
        resumen:
          'Las 12 propuestas centrales de cada programa, contrastadas con criterios verificables: encaje legal, coste, evidencia, experiencia en otros países, a quién benefician.',
        cta: 'Ver el análisis',
      },
      cuenta: {
        verbo: 'Cuenta',
        pregunta: '¿Tu voto tendrá escaño?',
        resumen:
          'Con la ley electoral y las listas oficiales del BOE, calcula la probabilidad de que tu opción obtenga escaño en tu provincia y, si no llega, cuál es tu siguiente opción real.',
        cta: 'Calcular',
      },
    },
  },
  ecd: {
    lema: ['Elige.', 'Contrasta.', 'Descarta.'],
    eslogan: 'Vota sabiendo a qué votas.',
    lead: 'Tres pasos para llegar a un voto que sea tuyo y que cuente: elige entre propuestas reales sin saber de quién son, contrasta qué hay detrás de las de tus partidos más afines y descarta lo que no llega a escaño en tu provincia. Con fuentes oficiales, algoritmos abiertos y sin guardar ningún dato tuyo.',
    pasos: {
      coincide: {
        verbo: 'Elige',
        pregunta: '¿Con quién coincides?',
        resumen:
          'Elige entre 30 propuestas reales del 29-N, de los programas y de lo que han dicho sus líderes, sin saber de quién son. Al final ves con qué partidos coincides y en qué, con la cita exacta.',
        cta: 'Empezar a elegir',
      },
      contrasta: {
        verbo: 'Contrasta',
        pregunta: '¿Qué hay detrás?',
        resumen:
          'Pon a prueba las 12 propuestas centrales de cada programa: encaje legal, coste, evidencia, experiencia en otros países y a quién benefician, con las fuentes a la vista.',
        cta: 'Contrastar programas',
      },
      cuenta: {
        verbo: 'Descarta',
        pregunta: '¿Tu voto tendrá escaño?',
        resumen:
          'Descarta lo que no llega: con la ley electoral y las listas del BOE, comprueba si tu opción obtiene escaño en tu provincia y, si no, cuál es tu siguiente opción real. Votar a quien prefieres siempre es legítimo.',
        cta: 'Comprobar mi provincia',
      },
    },
  },
};

export const LEMA_ID: string = (() => {
  const q = new URLSearchParams(location.search).get('lema');
  return q && LEMAS[q] ? q : 'actual';
})();
export const LEMA = LEMAS[LEMA_ID];

export const PASOS = PASOS_BASE.map((p) => ({ ...p, ...LEMA.pasos[p.id] }));

export type PasoId = (typeof PASOS_BASE)[number]['id'];

export function Simbolo({ size = 28, mono = false }: { size?: number; mono?: boolean }) {
  const c = (v: string) => (mono ? 'currentColor' : v);
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" class="simbolo">
      <rect x="2.5" y="2.5" width="27" height="27" rx="8" fill="none" stroke="currentColor" stroke-width="2.4" />
      <path d="M11 8.5h10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
      <rect x="8" y="17" width="4" height="7.5" rx="2" fill={c('var(--p1)')} />
      <rect x="14" y="13.5" width="4" height="11" rx="2" fill={c('var(--p2)')} />
      <rect x="20" y="10" width="4" height="14.5" rx="2" fill={c('var(--p3)')} />
    </svg>
  );
}

export function Logotipo({ size = 28 }: { size?: number }) {
  return (
    <span class="logotipo">
      <Simbolo size={size} />
      <span class="wordmark">
        vota <span class="con">con</span> datos
      </span>
    </span>
  );
}

/** Indicador de pasos 1·2·3 con el actual resaltado. */
export function Pasos({ actual }: { actual?: PasoId }) {
  return (
    <ol class="pasos" aria-label="Pasos">
      {PASOS.map((p) => (
        <li key={p.id} class={`${p.clase} ${p.id === actual ? 'on' : ''}`}>
          <a href={`#${p.ruta}`} aria-current={p.id === actual ? 'step' : undefined}>
            <span class="pn">{p.n}</span>
            <span class="pv">{p.verbo}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Cabecera común de cada paso. */
export function CabeceraPaso({ id, children }: { id: PasoId; children?: any }) {
  const p = PASOS.find((x) => x.id === id)!;
  return (
    <header class={`cab-paso ${p.clase}`}>
      <Pasos actual={id} />
      <div class="kicker">
        Paso {p.n} · {p.verbo}
      </div>
      <h1>{p.pregunta}</h1>
      {children && <p class="lead">{children}</p>}
    </header>
  );
}

/** Enlace al paso siguiente, al pie de cada paso. */
export function Siguiente({ desde, extra }: { desde: PasoId; extra?: string }) {
  const i = PASOS.findIndex((p) => p.id === desde);
  const sig = PASOS[i + 1];
  if (!sig) return null;
  return (
    <a class={`siguiente ${sig.clase}`} href={`#${sig.ruta}${extra ?? ''}`}>
      <span class="muted">Siguiente paso</span>
      <strong>
        {sig.n} · {sig.verbo}: {sig.pregunta}
      </strong>
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function pasoActual(): PasoId | undefined {
  return PASOS.find((p) => ruta.value.startsWith(p.ruta))?.id;
}
