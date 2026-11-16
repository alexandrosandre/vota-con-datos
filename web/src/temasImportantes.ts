import type { Respuesta } from './engine/match';
import type { Pregunta } from './types';

/**
 * Temas que la persona marca como importantes al terminar el paso 1 (decisión del editor, 15-nov): dos niveles,
 * marcado (sus afirmaciones cuentan el doble) o no. Agrupan los «tema» de las afirmaciones en 7 grupos de 3 a 6
 * afirmaciones (16-nov; antes eran 11). Un tema nuevo que no esté aquí no se puede marcar (lo detecta un test).
 */
export const GRUPOS: { id: string; nombre: string; incluye?: string; temas: string[]; icono: string }[] = [
  { id: 'vivienda', nombre: 'Vivienda', temas: ['Vivienda'], icono: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6' },
  { id: 'economia', nombre: 'Economía y trabajo', incluye: 'Impuestos, empleo, pensiones y precios', temas: ['Fiscalidad', 'Empleo y salarios', 'Pensiones', 'Economía'], icono: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16' },
  { id: 'servicios', nombre: 'Servicios públicos y derechos', incluye: 'Sanidad, educación e igualdad', temas: ['Sanidad', 'Educación', 'Igualdad y derechos'], icono: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10zM12 9v6M9 12h6' },
  { id: 'inmigracion', nombre: 'Inmigración y seguridad', incluye: 'Inmigración, seguridad y justicia', temas: ['Inmigración', 'Seguridad y justicia'], icono: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z' },
  { id: 'territorio', nombre: 'Autonomías e instituciones', incluye: 'Modelo territorial e instituciones', temas: ['Modelo territorial', 'Instituciones'], icono: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14' },
  { id: 'energia', nombre: 'Energía, clima y campo', temas: ['Energía y clima', 'Medio rural'], icono: 'M13 3L5 13h6l-1 8 8-10h-6z' },
  { id: 'exterior', nombre: 'Exterior y defensa', temas: ['Exterior y defensa'], icono: 'M12 2v4M12 18v4M2 12h4M18 12h4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z' },
];

/** Grupos anteriores al 16-nov (11), por sus temas: lo que alguien marcó entonces pasa a los grupos nuevos que los contienen. */
const ANTERIORES: Record<string, string[]> = {
  impuestos: ['Fiscalidad'],
  empleo: ['Empleo y salarios', 'Pensiones'],
  derechos: ['Igualdad y derechos'],
  justicia: ['Seguridad y justicia', 'Instituciones'],
  precios: ['Economía', 'Medio rural'],
};

export function migrarMarcados(marcados: string[]): string[] {
  const out = new Set<string>();
  for (const id of marcados) {
    if (GRUPOS.some((g) => g.id === id)) out.add(id);
    for (const tema of ANTERIORES[id] ?? []) {
      const g = grupoDe(tema);
      if (g) out.add(g.id);
    }
  }
  return GRUPOS.map((g) => g.id).filter((id) => out.has(id));
}

export function grupoDe(tema: string) {
  return GRUPOS.find((g) => g.temas.includes(tema));
}

/** Respuestas con el peso que sale de los temas marcados: ×2 en los marcados, ×1 en el resto. */
export function conPesoPorTema(respuestas: Record<string, Respuesta>, preguntas: Pregunta[], marcados: string[] | undefined): Record<string, Respuesta> {
  const tema = new Map(preguntas.map((q) => [q.id, q.tema]));
  const out: Record<string, Respuesta> = {};
  for (const [id, r] of Object.entries(respuestas)) {
    const g = grupoDe(tema.get(id) ?? '');
    out[id] = { ...r, peso: g && marcados?.includes(g.id) ? 2 : 1 };
  }
  return out;
}
