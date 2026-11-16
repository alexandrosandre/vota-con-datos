import { describe, expect, it } from 'vitest';
import { dhondt, rivalDelEscano, simular, votosDesdeRival, votosParaSiguienteEscano, type Contendiente, type EscenarioCirc } from './seats';
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

describe('rival del escaño y votos desde el rival (Toledo, 6 escaños)', () => {
  // Cuotas de data fase2.json del 16-nov para Toledo (ine 45), en el orden de las candidaturas del BOE, sin las que no
  // tienen base en el escenario; «_otros» no puede obtener escaño. Cifras de referencia comprobadas aparte en Python.
  const toledo = (c: Record<string, number>): EscenarioCirc => ({
    escanos: 6,
    validos: 387200,
    blanco: c._blanco,
    contendientes: [
      ...['psoe', 'fo', 'salf', 'vox', 'fe-de-las-jons', 'pp', 'podemos', 'fa'].filter((id) => id in c).map((id) => ({ id, cuota: c[id] })),
      { id: '_otros', cuota: c._otros, elegible: false },
    ] as Contendiente[],
  });
  const media = { psoe: 0.26986217148381314, fo: 0.0024720898407490995, salf: 0.01651435838211873, vox: 0.2947251505662503, 'fe-de-las-jons': 0.0007052357819802001, pp: 0.3494223395706095, podemos: 0.01807366112403173, fa: 0.03445946713722559, _otros: 0.007022240989254804, _blanco: 0.0067432851239669425 };
  const cis = { psoe: 0.3405082551371801, fo: 0.002531137362857979, salf: 0.014233865736532004, vox: 0.290371682316008, 'fe-de-las-jons': 0.0007220808111300427, pp: 0.29252233338089906, podemos: 0.011429065089640086, fa: 0.03374832312170802, _otros: 0.0071899719200777925, _blanco: 0.0067432851239669425 };
  const g2023 = { psoe: 0.32559917355371903, fo: 0.002543904958677686, vox: 0.19639462809917355, 'fe-de-las-jons': 0.0007257231404958678, pp: 0.3784426652892562, podemos: 0.034673525099556936, fa: 0.04765085506573232, _otros: 0.007226239669421488, _blanco: 0.0067432851239669425 };
  const psoe = (c: Record<string, number>) => simular(toledo(c), { k: 0.08, n: 200, semilla: 't' }).find((f) => f.id === 'psoe')!;

  it('media: 66.686 votos nuevos, se lo quitaría a Vox; desde Vox bastan 30.806 (no los 26.674 de igualar cocientes)', () => {
    const f = psoe(media);
    expect([f.votosParaSiguiente, f.rivalSiguiente, f.votosDesdeRival]).toEqual([66686, 'vox', 30806]);
  });
  it('media: desde el PP harían falta 39.382', () => {
    const t = toledo(media);
    const v = t.contendientes.map((c) => (c.elegible === false ? 0 : c.cuota * t.validos));
    const ids = t.contendientes.map((c) => c.id);
    expect(votosDesdeRival(v, 6, t.validos, ids.indexOf('psoe'), ids.indexOf('pp'))).toBe(39382);
  });
  it('CIS: 36.804 nuevos, a Vox; 14.722 desde Vox', () => {
    const f = psoe(cis);
    expect([f.votosParaSiguiente, f.rivalSiguiente, f.votosDesdeRival]).toEqual([36804, 'vox', 14722]);
  });
  it('2023: 20.461 nuevos, al PP; 10.231 desde el PP', () => {
    const f = psoe(g2023);
    expect([f.votosParaSiguiente, f.rivalSiguiente, f.votosDesdeRival]).toEqual([20461, 'pp', 10231]);
  });
  it('rivalDelEscano: quien pierde un escaño con esos votos nuevos', () => {
    const t = toledo(media);
    const v = t.contendientes.map((c) => (c.elegible === false ? 0 : c.cuota * t.validos));
    expect(rivalDelEscano(v, 6, t.validos, 0, 66686)).toBe(3); // vox
    expect(rivalDelEscano(v, 6, t.validos, 0, Infinity)).toBeNull();
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

  it('ignora las respuestas guardadas a afirmaciones retiradas del cuestionario', () => {
    // Quien respondió antes del 13-nov guarda respuestas a q02, q07, q10, q14 y q28, que ya no existen.
    const vigentes = ['q01', 'q03', 'q04', 'q05', 'q06', 'q31'];
    const resp = {
      ...Object.fromEntries(vigentes.map((q) => [q, { valor: 1 as const }])),
      q02: { valor: 2 as const },
      q07: { valor: -2 as const },
      q10: { valor: 1 as const },
      q14: { valor: 1 as const },
      q28: { valor: -1 as const },
    };
    const pos = { a: Object.fromEntries(vigentes.map((q) => [q, 1])) };
    const [r] = afinidad(resp, pos as any, vigentes);
    expect(r.respondidas).toBe(6);
    expect(r.cobertura).toBe(1);
    expect(r.comparable).toBe(true);
  });
});
