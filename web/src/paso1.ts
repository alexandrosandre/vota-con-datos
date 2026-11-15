import { computed } from '@preact/signals';
import { fase1 } from './data';
import { estado } from './store';
import { afinidad, vigentes } from './engine/match';
import type { Valor } from './engine/match';
import { conPesoPorTema } from './temasImportantes';

/** Mínimo de respuestas para calcular la afinidad (lo mismo que pide el paso 1). */
export const MIN_RESPUESTAS = 5;

/**
 * Resultado del paso 1 calculado en el momento con las respuestas guardadas y los datos publicados hoy
 * (nunca una copia guardada: si cambian las posiciones de un partido, cambia aquí también).
 * null si no hay datos o hay menos de MIN_RESPUESTAS respuestas.
 */
export const paso1 = computed(() => {
  const d = fase1.value;
  if (!d) return null;
  const ids = d.preguntas.map((q) => q.id);
  const respondidas = Object.values(vigentes(estado.value.respuestas, ids)).filter((r) => r.valor !== null).length;
  if (respondidas < MIN_RESPUESTAS) return null;
  const posiciones: Record<string, Record<string, Valor | null>> = {};
  for (const [p, qs] of Object.entries(d.posiciones)) {
    posiciones[p] = {};
    for (const [q, pos] of Object.entries(qs)) posiciones[p][q] = pos.valor;
  }
  const resp = conPesoPorTema(estado.value.respuestas, d.preguntas, estado.value.temasImportantes);
  const evaluables = afinidad(resp, posiciones, ids).filter((r) => r.afinidad !== null);
  return {
    /** Partidos de más a menos afinidad (el orden del paso 1). */
    orden: evaluables.map((r) => r.partido),
    /** Afinidad en % (0–100), redondeada. */
    pct: Object.fromEntries(evaluables.map((r) => [r.partido, Math.round(r.afinidad! * 100)])) as Record<string, number>,
  };
});

/**
 * De dónde sale tu orden de preferencia. Si tienes resultado del paso 1, se usa siempre (en los pasos 2 y 3),
 * salvo que lo hayas ordenado tú ('manual') o hayas quitado la preselección a mano ('ninguno').
 */
export const origenOrden = computed<'fase1' | 'manual' | null>(() => {
  const e = estado.value;
  // (El orden «manual» del paso 3 se retiró el 15-nov: uno guardado antes ya no se ve ni se puede cambiar, así que no cuenta.)
  if (e.rankingOrigen === 'ninguno') return null;
  return paso1.value ? 'fase1' : null;
});

/** Orden de preferencia vigente: si viene del paso 1, el de tus respuestas de ahora; si lo pusiste tú, el tuyo. */
export const rankingActual = computed(() => {
  const o = origenOrden.value;
  return o === 'fase1' ? paso1.value!.orden : [];
});

/** Partido preseleccionado en los pasos 2 y 3: el que elegiste o, si no elegiste ninguno, el primero de tu orden. */
export const partidoPreferido = computed(() => estado.value.partido ?? rankingActual.value[0] ?? null);
