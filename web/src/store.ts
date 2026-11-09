import { signal, effect } from '@preact/signals';
import type { Respuesta } from './engine/match';

/** Estado del usuario. Vive solo en su navegador (localStorage); nunca se envía. */
export interface Estado {
  respuestas: Record<string, Respuesta>;
  /** Ranking de partidos (ids) — de la fase 1 o manual. */
  ranking: string[];
  rankingOrigen: 'fase1' | 'manual' | null;
  circ: string | null;
  partido: string | null;
  escenario: string;
  incertidumbre: 'baja' | 'media' | 'alta';
}

const CLAVE = 'vcd-estado-v1';
const inicial: Estado = {
  respuestas: {},
  ranking: [],
  rankingOrigen: null,
  circ: null,
  partido: null,
  escenario: 'g2023',
  incertidumbre: 'media',
};

function cargar(): Estado {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (raw) return { ...inicial, ...JSON.parse(raw) };
  } catch {
    /* sin almacenamiento: seguimos en memoria */
  }
  return inicial;
}

function desdeUrl(e: Estado): Estado {
  // Enlaces compartibles y capturas: ?circ=28&partido=psoe&escenario=g2023
  const q = new URLSearchParams(location.search);
  const out = { ...e };
  if (q.get('circ')) out.circ = q.get('circ');
  if (q.get('partido')) out.partido = q.get('partido');
  if (q.get('escenario')) out.escenario = q.get('escenario')!;
  return out;
}

export const estado = signal<Estado>(desdeUrl(cargar()));

effect(() => {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado.value));
  } catch {
    /* ignorar */
  }
});

export function actualizar(p: Partial<Estado>) {
  estado.value = { ...estado.value, ...p };
}

export function borrarTodo() {
  estado.value = { ...inicial };
}

/* Router mínimo por hash (compatible con GitHub Pages). */
export const ruta = signal<string>(location.hash.replace(/^#/, '') || '/');
window.addEventListener('hashchange', () => {
  ruta.value = location.hash.replace(/^#/, '') || '/';
  window.scrollTo({ top: 0 });
});
export function ir(r: string) {
  location.hash = r;
}
