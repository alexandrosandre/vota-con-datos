import { migrarMarcados } from './temasImportantes';
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
  /**
   * De dónde sale el orden: null = del paso 1 si hay resultados (siempre se usan); 'manual' = lo has puesto tú;
   * 'ninguno' = has quitado a mano la preselección del paso 1.
   */
  rankingOrigen: 'fase1' | 'manual' | 'ninguno' | null;
  circ: string | null;
  partido: string | null;
  /** Temas que te importan más (ids de GRUPOS, temasImportantes.ts): sus afirmaciones cuentan el doble. */
  temasImportantes?: string[];
  /** '' = el escenario por defecto (la media de encuestas, o 2023 durante la veda). */
  escenario: string;
  v?: number;
}

const CLAVE = 'vcd-estado-v1';

/** ¿Este navegador ya había visitado la web? (se mira antes de guardar nada; ver analitica.ts) */
export const habiaEstadoGuardado: boolean = (() => {
  try {
    return localStorage.getItem(CLAVE) !== null;
  } catch {
    return false;
  }
})();
const inicial: Estado = {
  respuestas: {},
  ranking: [],
  rankingOrigen: null,
  circ: null,
  partido: null,
  escenario: '',
  v: 5,
};

function cargar(): Estado {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (raw) {
      const e = { ...inicial, ...JSON.parse(raw) } as Estado & { incertidumbre?: unknown; afinidades?: unknown };
      // v2 (12-nov): el escenario por defecto pasa a ser la media de encuestas; quien no había
      // elegido otro (o tenía el antiguo por defecto, 2023) pasa al nuevo.
      if ((e.v ?? 1) < 2) {
        if (e.escenario === 'g2023') e.escenario = '';
        e.v = 2;
      }
      // v3 (13-nov): la afinidad del paso 1 ya no se guarda (se guardaba mal, 0–1 redondeado, y se quedaba
      // desfasada si cambiaban las posiciones); el paso 3 la recalcula (paso1.ts).
      if ((e.v ?? 1) < 3) e.v = 3;
      // v4 (15-nov): el resultado del paso 1 se usa siempre en los pasos 2 y 3 (ya no hace falta «guardarlo»). El partido
      // que se guardaba al pulsar los botones del paso 1 era el más afín de entonces: se olvida para que salga el de ahora.
      if ((e.v ?? 1) < 4) {
        if (e.rankingOrigen === 'fase1') e.partido = null;
        e.v = 4;
      }
      // v5 (16-nov): los temas importantes pasan de 11 grupos a 7; lo marcado pasa a los grupos que lo contienen.
      if ((e.v ?? 1) < 5) {
        if (e.temasImportantes?.length) e.temasImportantes = migrarMarcados(e.temasImportantes);
        e.v = 5;
      }
      delete e.afinidades;
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
