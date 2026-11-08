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
  afinidad: number | null; // 0–1; null si no hay ítems comunes suficientes
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

export function afinidad(
  respuestas: Record<string, Respuesta>,
  posiciones: Record<string, Record<string, Valor | null>>,
): ResultadoAfinidad[] {
  const respondidas = Object.entries(respuestas).filter(([, r]) => r.valor !== null);
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
    const valido = comunes >= MIN_COMUNES && cobertura >= MIN_COBERTURA;
    out.push({
      partido,
      afinidad: valido && den > 0 ? 1 - num / den : null,
      comunes,
      respondidas: respondidas.length,
      cobertura,
      porItem,
    });
  }
  // Orden: afinidad desc; los no evaluables al final.
  out.sort((a, b) => (b.afinidad ?? -1) - (a.afinidad ?? -1) || b.cobertura - a.cobertura || a.partido.localeCompare(b.partido));
  return out;
}
