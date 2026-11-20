/**
 * Lo que votaron los partidos en el Congreso (XV Legislatura, 2023-2026) frente a lo que proponen, y la
 * comprobación de coherencia de las respuestas. Funciones puras; los datos salen de fase1.json.
 *
 * Solo cuentan las votaciones de la propia medida (relacion «misma»); las de medidas parecidas o paquetes
 * (decretos ómnibus) se enseñan, pero no comparan ni cambian nada.
 */
import type { Valor } from './match';
import type { ParCoherencia, SentidoVoto, VotacionCongreso } from '../types';

/** La votación más reciente de la propia medida en la que consta el voto del partido. */
export function votoDe(partido: string, vs: VotacionCongreso[] | undefined): { v: VotacionCongreso; sentido: SentidoVoto } | null {
  for (const v of vs ?? []) {
    if (v.relacion !== 'misma') continue;
    const p = v.partidos[partido];
    if (p) return { v, sentido: p.sentido };
  }
  return null;
}

/** ¿El voto contradice la posición del programa o la campaña? (a favor en uno y en contra en el otro). */
export function contradice(posicion: Valor | null | undefined, sentido: SentidoVoto): boolean {
  if (posicion === null || posicion === undefined || posicion === 0) return false;
  return (posicion > 0 && sentido === 'en_contra') || (posicion < 0 && sentido === 'a_favor');
}

const VALOR_VOTO: Partial<Record<SentidoVoto, Valor>> = { a_favor: 2, en_contra: -2, abstencion: 0 };

/**
 * Posiciones «contando lo que votaron»: si el voto en el Congreso y la posición declarada van en el mismo
 * sentido, la posición no cambia; si no (o el partido no se ha pronunciado), cuenta el voto: a favor +2,
 * en contra −2, abstención 0. Un partido dividido conserva su posición.
 */
export function posicionesConVoto(
  posiciones: Record<string, Record<string, Valor | null>>,
  votaciones: Record<string, VotacionCongreso[]> | undefined,
): Record<string, Record<string, Valor | null>> {
  const out: Record<string, Record<string, Valor | null>> = {};
  for (const [p, qs] of Object.entries(posiciones)) {
    out[p] = { ...qs };
    for (const [q, vs] of Object.entries(votaciones ?? {})) {
      const r = votoDe(p, vs);
      const vv = r ? VALOR_VOTO[r.sentido] : undefined;
      if (vv === undefined) continue;
      const actual = qs[q];
      const mismoSentido = actual !== null && actual !== undefined && Math.sign(actual) === Math.sign(vv);
      if (!mismoSentido) out[p][q] = vv;
    }
  }
  return out;
}

/** Pares de respuestas que tiran en direcciones opuestas con fuerza (diferencia de 3 o más puntos en la escala). */
export function incoherencias(respuestas: Record<string, { valor: Valor | null } | undefined>, pares: ParCoherencia[] | undefined): ParCoherencia[] {
  return (pares ?? []).filter((par) => {
    const a = respuestas[par.a]?.valor;
    const b = respuestas[par.b]?.valor;
    if (a === null || a === undefined || b === null || b === undefined) return false;
    const bb = par.relacion === 'mismo_sentido' ? b : -b;
    return a * bb < 0 && Math.abs(a - bb) >= 3;
  });
}
