import { signal, effect } from '@preact/signals';
import type { Respuesta } from './engine/match';

/** Estado del usuario. Vive solo en su navegador (localStorage); nunca se envía. */
export interface Estado {
  respuestas: Record<string, Respuesta>;
  /**
   * Orden de preferencia (ids de partido): a quién votarías si tu primera opción no tiene opciones
   * de escaño en tu provincia. Viene del paso 1 (ordenado por afinidad) o lo ordena la persona.
   */
  ranking: string[];
  rankingOrigen: 'fase1' | 'manual' | null;
  /** Afinidad (0–100) por partido del último resultado del paso 1, para mostrar de dónde sale el orden. */
  afinidades: Record<string, number>;
  circ: string | null;
  partido: string | null;
  /** '' = el escenario por defecto (la media de encuestas, o 2023 durante la veda). */
  escenario: string;
  v?: number;
}

const CLAVE = 'vcd-estado-v1';
const inicial: Estado = {
  respuestas: {},
  ranking: [],
  rankingOrigen: null,
  afinidades: {},
  circ: null,
  partido: null,
  escenario: '',
  v: 2,
};

function cargar(): Estado {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (raw) {
      const e = { ...inicial, ...JSON.parse(raw) } as Estado & { incertidumbre?: unknown };
      // v2 (12-nov): el escenario por defecto pasa a ser la media de encuestas; quien no había
      // elegido otro (o tenía el antiguo por defecto, 2023) pasa al nuevo.
      if ((e.v ?? 1) < 2) {
        if (e.escenario === 'g2023') e.escenario = '';
        e.v = 2;
      }
      delete e.incertidumbre;
      return e;
    }
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
