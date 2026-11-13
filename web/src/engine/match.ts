/**
 * Motor de afinidad — Fase 1.
 *
 * Escala de respuesta y de posición de partido: -2 (muy en contra) … +2 (muy a favor).
 * null = el usuario se salta la pregunta / el programa no fija posición.
 *
 * Afinidad (distancia de Manhattan normalizada, como smartvote / Mendez 2017):
 *   afinidad = 1 − Σ w·|u − p| / Σ w·4      sobre los ítems con respuesta Y posición.
 * w = peso de importancia elegido por el usuario (0,5 · 1 · 2; por defecto 1).
 * Las preguntas que el usuario salta no cuentan. Las que el partido no aborda tampoco,
 * pero se informa de la "cobertura" para no premiar a quien calla.
 */

export type Valor = -2 | -1 | 0 | 1 | 2;

export interface Respuesta {
  valor: Valor | null;
  /** Peso de importancia elegido por el usuario: 0.5 (poco), 1 (normal), 2 (mucho). */
  peso?: 0.5 | 1 | 2;
}

export interface ResultadoAfinidad {
  partido: string;
  afinidad: number | null; // 0–1; null si hay menos de MIN_COMUNES ítems comunes
  /** true si la cobertura permite compararlo con el resto (≥ MIN_COBERTURA). */
  comparable: boolean;
  comunes: number; // ítems con respuesta y posición
  respondidas: number; // ítems respondidos por el usuario
  cobertura: number; // comunes / respondidas
  porItem: { item: string; usuario: Valor; partido: Valor; acuerdo: number }[];
}

export const MIN_COMUNES = 5;
export const MIN_COBERTURA = 0.5;
/** Por debajo de esta cobertura se muestra un aviso (recomendación euandi/smartvote). */
export const AVISO_COBERTURA = 0.7;
/** Diferencias menores que esto se presentan como empate técnico. */
export const UMBRAL_EMPATE = 0.05;

/**
 * Respuestas a las afirmaciones vigentes. Las guardadas para afirmaciones retiradas del cuestionario
 * siguen en el navegador, pero no cuentan (ni para la afinidad ni para los recuentos).
 */
export function vigentes(respuestas: Record<string, Respuesta>, items: Iterable<string>): Record<string, Respuesta> {
  const ids = new Set(items);
  return Object.fromEntries(Object.entries(respuestas).filter(([q]) => ids.has(q)));
}

export function afinidad(
  respuestas: Record<string, Respuesta>,
  posiciones: Record<string, Record<string, Valor | null>>,
  /** Ids de las afirmaciones vigentes; si se indica, el resto de respuestas no cuenta. */
  items?: Iterable<string>,
): ResultadoAfinidad[] {
  const respondidas = Object.entries(items ? vigentes(respuestas, items) : respuestas).filter(([, r]) => r.valor !== null);
  const out: ResultadoAfinidad[] = [];
  for (const [partido, pos] of Object.entries(posiciones)) {
    let num = 0;
    let den = 0;
    const porItem: ResultadoAfinidad['porItem'] = [];
    for (const [item, r] of respondidas) {
      const p = pos[item];
      if (p === null || p === undefined) continue;
      const w = r.peso ?? 1;
      const d = Math.abs((r.valor as number) - p);
      num += w * d;
      den += w * 4;
      porItem.push({ item, usuario: r.valor as Valor, partido: p, acuerdo: 1 - d / 4 });
    }
    const comunes = porItem.length;
    const cobertura = respondidas.length ? comunes / respondidas.length : 0;
    const calculable = comunes >= MIN_COMUNES && den > 0;
    out.push({
      partido,
      afinidad: calculable ? 1 - num / den : null,
      comparable: calculable && cobertura >= MIN_COBERTURA,
      comunes,
      respondidas: respondidas.length,
      cobertura,
      porItem,
    });
  }
  // Orden: primero los comparables por afinidad; después los de pocos datos; al final los no calculables.
  const grupo = (r: ResultadoAfinidad) => (r.comparable ? 0 : r.afinidad !== null ? 1 : 2);
  out.sort((a, b) => grupo(a) - grupo(b) || (b.afinidad ?? -1) - (a.afinidad ?? -1) || b.cobertura - a.cobertura || a.partido.localeCompare(b.partido));
  return out;
}
