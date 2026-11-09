/**
 * Motor de reparto de escaños y simulación de probabilidad — Fase 2.
 *
 * Regla legal (LOREG art. 163):
 *  a) No se tienen en cuenta las candidaturas que no obtengan al menos el 3 %
 *     de los votos válidos emitidos en la circunscripción (válidos = votos a
 *     candidaturas + votos en blanco).
 *  b–c) Reparto por el sistema D'Hondt: se divide el voto de cada candidatura
 *     por 1, 2, 3… y se asignan los escaños a los mayores cocientes.
 *  d) Empate de cocientes: se adjudica a la candidatura con mayor número total
 *     de votos (si persiste, sorteo; aquí: orden de entrada, documentado).
 * Ceuta y Melilla (1 escaño) quedan cubiertas por la misma regla: gana el más votado.
 */

export const UMBRAL_LEGAL = 0.03;

/** Reparto D'Hondt. `votos[i]` votos de cada candidatura; `validos` incluye blancos. */
export function dhondt(votos: number[], escanos: number, validos: number, umbral = UMBRAL_LEGAL): number[] {
  const n = votos.length;
  const res = new Array<number>(n).fill(0);
  const minimo = umbral * validos;
  const elegible = votos.map((v) => v > 0 && v >= minimo);
  for (let e = 0; e < escanos; e++) {
    let mejor = -1;
    let mejorQ = -1;
    for (let i = 0; i < n; i++) {
      if (!elegible[i]) continue;
      const q = votos[i] / (res[i] + 1);
      if (q > mejorQ || (q === mejorQ && mejor >= 0 && votos[i] > votos[mejor])) {
        mejor = i;
        mejorQ = q;
      }
    }
    if (mejor < 0) break; // nadie supera el umbral (no ocurre en la práctica)
    res[mejor]++;
  }
  return res;
}

/** Cociente más bajo que todavía obtuvo escaño (el "último escaño"). */
export function ultimoCociente(votos: number[], reparto: number[]): number {
  let min = Infinity;
  reparto.forEach((s, i) => {
    if (s > 0) min = Math.min(min, votos[i] / s);
  });
  return min;
}

/**
 * Votos adicionales que necesitaría la candidatura `i` para obtener un escaño más,
 * manteniendo fijo el voto del resto (los nuevos votos aumentan también los válidos).
 */
export function votosParaSiguienteEscano(votos: number[], escanos: number, validos: number, i: number, umbral = UMBRAL_LEGAL): number {
  const reparto = dhondt(votos, escanos, validos, umbral);
  const objetivo = reparto[i] + 1;
  // Búsqueda binaria sobre los votos añadidos: monótono en x.
  let lo = 0;
  let hi = Math.max(1, validos);
  const consigue = (x: number) => {
    const v = votos.slice();
    v[i] += x;
    return dhondt(v, escanos, validos + x, umbral)[i] >= objetivo;
  };
  if (!consigue(hi)) return Infinity;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (consigue(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
}

/** PRNG determinista (mulberry32) para que los resultados sean reproducibles. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(r: () => number): number {
  // Box–Muller
  let u = 0;
  while (u === 0) u = r();
  const v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface Contendiente {
  id: string;
  /** Cuota estimada sobre votos válidos (0–1). */
  cuota: number;
  /** false para la bolsa "otras candidaturas" (no puede obtener escaño). */
  elegible?: boolean;
}

export interface EscenarioCirc {
  escanos: number;
  /** Votos válidos de referencia (escala absoluta para umbral y coste por escaño). */
  validos: number;
  /** Cuota del voto en blanco sobre válidos. */
  blanco: number;
  contendientes: Contendiente[];
}

export interface ResultadoSim {
  id: string;
  cuota: number;
  /** Probabilidad de obtener al menos un escaño. */
  pEscano: number;
  escanosMedia: number;
  /** Distribución: prob[k] = P(obtener exactamente k escaños). */
  distribucion: number[];
  /** Escaños en el escenario central (sin ruido). */
  escanosCentral: number;
  votosCentral: number;
  /** Votos por escaño en el escenario central (null si 0 escaños). */
  votosPorEscano: number | null;
  /** Votos adicionales para el primer/siguiente escaño en el escenario central. */
  votosParaSiguiente: number;
}

/**
 * Incertidumbre: error multiplicativo log-normal por candidatura,
 * σ_i = k / sqrt(max(cuota_i, 0.5 %)). k lo fija cada escenario (calibrado con 2015–2023:
 * 0,08 con encuestas, 0,15 con la base de 2023; docs/research/calibracion_incertidumbre.md).
 * Estos niveles solo dan el multiplicador relativo (baja ×0,625, media ×1, alta ×1,5).
 */
export const NIVELES_INCERTIDUMBRE = { baja: 0.025, media: 0.04, alta: 0.06 } as const;
export type NivelIncertidumbre = keyof typeof NIVELES_INCERTIDUMBRE;

export function simular(esc: EscenarioCirc, opts: { k: number; n?: number; semilla?: string } ): ResultadoSim[] {
  const n = opts.n ?? 4000;
  const r = rng(hashSeed(opts.semilla ?? 'vcd'));
  const cs = esc.contendientes;
  const m = cs.length;
  const elig = cs.map((c) => c.elegible !== false);
  const base = cs.map((c) => c.cuota);
  const sigma = base.map((s) => opts.k / Math.sqrt(Math.max(s, 0.005)));
  const maxK = esc.escanos;
  const dist = cs.map(() => new Array<number>(maxK + 1).fill(0));
  const conEscano = new Array<number>(m).fill(0);
  const sumaEsc = new Array<number>(m).fill(0);
  const sumaBase = base.reduce((a, b) => a + b, 0) + esc.blanco;

  const cuotas = new Array<number>(m);
  const votos = new Array<number>(m);
  for (let it = 0; it < n; it++) {
    let suma = esc.blanco;
    for (let i = 0; i < m; i++) {
      const s = base[i];
      cuotas[i] = s > 0 ? s * Math.exp(sigma[i] * normal(r) - (sigma[i] * sigma[i]) / 2) : 0;
      suma += cuotas[i];
    }
    // Renormaliza para que la suma (incluido blanco) se mantenga.
    const f = sumaBase / suma;
    for (let i = 0; i < m; i++) votos[i] = elig[i] ? cuotas[i] * f * esc.validos : 0;
    const rep = dhondt(votos, esc.escanos, esc.validos);
    for (let i = 0; i < m; i++) {
      dist[i][rep[i]]++;
      if (rep[i] > 0) conEscano[i]++;
      sumaEsc[i] += rep[i];
    }
  }

  const votosC = cs.map((c, i) => (elig[i] ? c.cuota * esc.validos : 0));
  const repC = dhondt(votosC, esc.escanos, esc.validos);
  return cs.map((c, i) => ({
    id: c.id,
    cuota: c.cuota,
    pEscano: conEscano[i] / n,
    escanosMedia: sumaEsc[i] / n,
    distribucion: dist[i].map((x) => x / n),
    escanosCentral: repC[i],
    votosCentral: Math.round(votosC[i]),
    votosPorEscano: repC[i] > 0 ? Math.round(votosC[i] / repC[i]) : null,
    votosParaSiguiente: elig[i] ? votosParaSiguienteEscano(votosC, esc.escanos, esc.validos, i) : Infinity,
  }));
}

export type Veredicto = 'casi_seguro' | 'probable' | 'en_disputa' | 'improbable' | 'muy_improbable';
export function veredicto(p: number): Veredicto {
  if (p >= 0.95) return 'casi_seguro';
  if (p >= 0.66) return 'probable';
  if (p >= 0.33) return 'en_disputa';
  if (p >= 0.05) return 'improbable';
  return 'muy_improbable';
}
