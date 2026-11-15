import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { conPesoPorTema, GRUPOS, grupoDe } from './temasImportantes';

const f1 = JSON.parse(readFileSync(new URL('../public/data/fase1.json', import.meta.url), 'utf8'));

describe('temas importantes', () => {
  it('cada afirmación vigente cae en uno de los grupos que se pueden marcar', () => {
    const sinGrupo = f1.preguntas.filter((q: { tema: string }) => !grupoDe(q.tema)).map((q: { id: string; tema: string }) => `${q.id}: ${q.tema}`);
    expect(sinGrupo).toEqual([]);
  });
  it('los temas marcados cuentan el doble y el resto una vez', () => {
    const q = f1.preguntas.find((x: { tema: string }) => x.tema === 'Vivienda');
    const otra = f1.preguntas.find((x: { tema: string }) => x.tema === 'Fiscalidad');
    const r = conPesoPorTema({ [q.id]: { valor: 1, peso: 0.5 }, [otra.id]: { valor: -1 } }, f1.preguntas, ['vivienda']);
    expect(r[q.id].peso).toBe(2);
    expect(r[otra.id].peso).toBe(1);
  });
  it('los grupos no se repiten', () => {
    const temas = GRUPOS.flatMap((g) => g.temas);
    expect(new Set(temas).size).toBe(temas.length);
  });
});
