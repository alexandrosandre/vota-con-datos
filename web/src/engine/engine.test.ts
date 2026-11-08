import { describe, expect, it } from 'vitest';
import { dhondt, simular, votosParaSiguienteEscano } from './seats';
import { afinidad } from './match';

describe('dhondt', () => {
  it('reparte el ejemplo del art. 163 LOREG (480.000 votos, 8 escaños)', () => {
    // Ejemplo oficial del propio artículo 163.1.c LOREG.
    const votos = [168000, 104000, 72000, 64000, 40000, 32000];
    expect(dhondt(votos, 8, 480000)).toEqual([4, 2, 1, 1, 0, 0]);
  });

  it('excluye a quien no llega al 3 % de válidos (blancos incluidos)', () => {
    // 100.000 válidos: C tiene 2.999 (< 3 %) y no entra aunque su cociente gane.
    expect(dhondt([60000, 37001, 2999], 40, 100000)[2]).toBe(0);
    expect(dhondt([60000, 37000, 3000], 40, 100000)[2]).toBeGreaterThan(0);
  });

  it('desempata por mayor número total de votos', () => {
    // A=100 y B=50: el 2º cociente de A (50) empata con el 1º de B (50); gana A.
    expect(dhondt([100, 50], 2, 150)).toEqual([2, 0]);
  });

  it('circunscripción uninominal: gana el más votado', () => {
    expect(dhondt([10, 30, 20], 1, 60)).toEqual([0, 1, 0]);
  });
});

describe('votosParaSiguienteEscano', () => {
  it('es el mínimo exacto', () => {
    const v = [168000, 104000, 72000, 64000, 40000, 32000];
    const x = votosParaSiguienteEscano(v, 8, 480000, 4);
    const con = v.slice();
    con[4] += x;
    expect(dhondt(con, 8, 480000 + x)[4]).toBe(1);
    con[4] -= 1;
    expect(dhondt(con, 8, 480000 + x - 1)[4]).toBe(0);
  });
});

describe('simular', () => {
  it('es reproducible y coherente con el escenario central', () => {
    const esc = {
      escanos: 5,
      validos: 300000,
      blanco: 0.01,
      contendientes: [
        { id: 'a', cuota: 0.4 },
        { id: 'b', cuota: 0.3 },
        { id: 'c', cuota: 0.2 },
        { id: 'd', cuota: 0.02 },
        { id: 'otros', cuota: 0.07, elegible: false },
      ],
    };
    const r1 = simular(esc, { k: 0.04, n: 2000, semilla: 'x' });
    const r2 = simular(esc, { k: 0.04, n: 2000, semilla: 'x' });
    expect(r1).toEqual(r2);
    const a = r1.find((r) => r.id === 'a')!;
    const d = r1.find((r) => r.id === 'd')!;
    expect(a.pEscano).toBe(1);
    expect(d.pEscano).toBe(0); // 2 % nunca supera el 3 % con este ruido
    expect(r1.find((r) => r.id === 'otros')!.pEscano).toBe(0);
    const total = r1.reduce((s, r) => s + r.escanosMedia, 0);
    expect(total).toBeCloseTo(5, 6);
    r1.forEach((r) => expect(r.distribucion.reduce((s, x) => s + x, 0)).toBeCloseTo(1, 9));
  });
});

describe('afinidad', () => {
  it('calcula la distancia de Manhattan normalizada con pesos e ignora ausencias', () => {
    const resp = {
      q1: { valor: 2 as const, peso: 2 as const },
      q2: { valor: -2 as const },
      q3: { valor: 0 as const },
      q4: { valor: 1 as const },
      q5: { valor: -1 as const },
      q6: { valor: null },
    };
    const pos = {
      igual: { q1: 2, q2: -2, q3: 0, q4: 1, q5: -1, q6: 2 },
      opuesto: { q1: -2, q2: 2, q3: 0, q4: -1, q5: 1, q6: -2 },
      callado: { q1: 2, q2: null, q3: null, q4: null, q5: null, q6: null },
    } as const;
    const r = afinidad(resp, pos as any);
    expect(r[0].partido).toBe('igual');
    expect(r[0].afinidad).toBe(1);
    const op = r.find((x) => x.partido === 'opuesto')!;
    // distancias: 4*2 + 4 + 0 + 2 + 2 = 16; den = 4*2 + 4*4 = 24
    expect(op.afinidad).toBeCloseTo(1 - 16 / 24, 10);
    expect(r.find((x) => x.partido === 'callado')!.afinidad).toBeNull();
    expect(r[0].comparable).toBe(true);
  });

  it('separa los partidos con poca cobertura de los comparables', () => {
    const resp = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`q${i}`, { valor: 1 as const }]));
    const pos = {
      completo: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`q${i}`, -1])),
      parcial: Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`q${i}`, 1])),
    };
    const r = afinidad(resp, pos as any);
    expect(r[0].partido).toBe('completo'); // comparable va antes aunque su afinidad sea menor
    expect(r[1].partido).toBe('parcial');
    expect(r[1].afinidad).toBe(1);
    expect(r[1].comparable).toBe(false);
  });
});
