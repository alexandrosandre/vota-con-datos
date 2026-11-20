import { describe, expect, it } from 'vitest';
import { contradice, incoherencias, posicionesConVoto, votoDe } from './congreso';
import type { VotacionCongreso } from '../types';

const vot = (relacion: 'misma' | 'parecida', partidos: Record<string, 'a_favor' | 'en_contra' | 'abstencion' | 'dividido'>, fecha = '2025-01-01'): VotacionCongreso => ({
  id: `v-${fecha}`,
  fecha,
  objeto: 'x',
  relacion,
  url: 'https://www.congreso.es/x.json',
  partidos: Object.fromEntries(Object.entries(partidos).map(([p, s]) => [p, { sentido: s, voto: '', detalle: {} }])),
});

describe('voto en el Congreso', () => {
  it('solo cuentan las votaciones de la propia medida, la más reciente primero', () => {
    const vs = [vot('parecida', { pp: 'a_favor' }, '2026-01-01'), vot('misma', { pp: 'en_contra' }, '2025-06-01'), vot('misma', { pp: 'a_favor' }, '2024-01-01')];
    expect(votoDe('pp', vs)?.sentido).toBe('en_contra');
    expect(votoDe('vox', vs)).toBeNull();
  });

  it('contradicción: a favor en el programa y en contra en el voto (o al revés); neutral o abstención no contradicen', () => {
    expect(contradice(2, 'en_contra')).toBe(true);
    expect(contradice(-1, 'a_favor')).toBe(true);
    expect(contradice(1, 'a_favor')).toBe(false);
    expect(contradice(0, 'en_contra')).toBe(false);
    expect(contradice(2, 'abstencion')).toBe(false);
    expect(contradice(null, 'en_contra')).toBe(false);
  });

  it('contando lo que votaron: se mantiene la posición si va en el mismo sentido; si no, cuenta el voto', () => {
    const pos = { pp: { q1: 2 as const, q2: 1 as const, q3: null }, psoe: { q1: -1 as const, q2: null, q3: 2 as const } };
    const v = {
      q1: [vot('misma', { pp: 'en_contra', psoe: 'en_contra' })],
      q2: [vot('misma', { pp: 'a_favor', psoe: 'abstencion' })],
      q3: [vot('parecida', { pp: 'a_favor', psoe: 'en_contra' })],
    };
    const r = posicionesConVoto(pos, v);
    expect(r.pp).toEqual({ q1: -2, q2: 1, q3: null });
    expect(r.psoe).toEqual({ q1: -1, q2: 0, q3: 2 });
  });

  it('un partido dividido conserva su posición', () => {
    const r = posicionesConVoto({ erc: { q1: 1 } }, { q1: [vot('misma', { erc: 'dividido' })] });
    expect(r.erc.q1).toBe(1);
  });
});

describe('coherencia de las respuestas', () => {
  const pares = [
    { a: 'qa', b: 'qb', relacion: 'mismo_sentido' as const, explicacion: '' },
    { a: 'qc', b: 'qd', relacion: 'sentido_contrario' as const, explicacion: '' },
  ];
  it('avisa solo si tiran con fuerza en direcciones opuestas (3 puntos o más)', () => {
    expect(incoherencias({ qa: { valor: 2 }, qb: { valor: -1 } }, pares)).toHaveLength(1);
    expect(incoherencias({ qa: { valor: 1 }, qb: { valor: -1 } }, pares)).toHaveLength(0);
    expect(incoherencias({ qa: { valor: 2 }, qb: { valor: 0 } }, pares)).toHaveLength(0);
    expect(incoherencias({ qa: { valor: 2 }, qb: { valor: null } }, pares)).toHaveLength(0);
  });
  it('en pares de sentido contrario, estar a favor de los dos es lo que se avisa', () => {
    expect(incoherencias({ qc: { valor: 2 }, qd: { valor: 1 } }, pares)).toHaveLength(1);
    expect(incoherencias({ qc: { valor: 2 }, qd: { valor: -2 } }, pares)).toHaveLength(0);
  });
});
