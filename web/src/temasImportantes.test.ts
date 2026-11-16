import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { conPesoPorTema, GRUPOS, grupoDe, migrarMarcados } from './temasImportantes';

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
  it('lo marcado con los 11 grupos antiguos pasa a los 7 nuevos que contienen sus temas', () => {
    expect(migrarMarcados(['vivienda', 'impuestos', 'empleo'])).toEqual(['vivienda', 'economia']);
    expect(migrarMarcados(['justicia'])).toEqual(['inmigracion', 'territorio']);
    expect(migrarMarcados(['derechos', 'precios'])).toEqual(['economia', 'servicios', 'energia']);
    expect(migrarMarcados(['exterior', 'desconocido'])).toEqual(['exterior']);
  });
  it('ningún grupo pasa de 6 afirmaciones', () => {
    const n = GRUPOS.map((g) => f1.preguntas.filter((q: { tema: string }) => g.temas.includes(q.tema)).length);
    expect(Math.max(...n)).toBeLessThanOrEqual(6);
    expect(Math.min(...n)).toBeGreaterThanOrEqual(3);
  });
});
