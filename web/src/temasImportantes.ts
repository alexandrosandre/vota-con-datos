import type { Respuesta } from './engine/match';
import type { Pregunta } from './types';

/**
 * Temas que la persona marca como importantes al terminar el paso 1 (decisión del editor, 15-nov): dos niveles,
 * marcado (sus afirmaciones cuentan el doble) o no. Agrupan los «tema» de las afirmaciones en 11 grupos parecidos
 * en tamaño. Un tema nuevo que no esté aquí cae en «otros» y no se puede marcar (lo detecta un test).
 */
export const GRUPOS: { id: string; nombre: string; temas: string[]; icono: string }[] = [
  { id: 'vivienda', nombre: 'Vivienda', temas: ['Vivienda'], icono: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6' },
  { id: 'impuestos', nombre: 'Impuestos', temas: ['Fiscalidad'], icono: 'M4 4h16v16H4zM8 16l8-8M9 9h.01M15 15h.01' },
  { id: 'empleo', nombre: 'Empleo, salarios y pensiones', temas: ['Empleo y salarios', 'Pensiones'], icono: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16' },
  { id: 'servicios', nombre: 'Sanidad y educación', temas: ['Sanidad', 'Educación'], icono: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10zM12 9v6M9 12h6' },
  { id: 'inmigracion', nombre: 'Inmigración', temas: ['Inmigración'], icono: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18' },
  { id: 'territorio', nombre: 'Modelo territorial', temas: ['Modelo territorial'], icono: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14' },
  { id: 'energia', nombre: 'Energía y clima', temas: ['Energía y clima'], icono: 'M13 3L5 13h6l-1 8 8-10h-6z' },
  { id: 'derechos', nombre: 'Igualdad y derechos', temas: ['Igualdad y derechos'], icono: 'M12 4v16M5 8h14M5 8l-2 6a3 3 0 0 0 4 0zM19 8l-2 6a3 3 0 0 0 4 0zM8 20h8' },
  { id: 'justicia', nombre: 'Justicia, seguridad e instituciones', temas: ['Seguridad y justicia', 'Instituciones'], icono: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z' },
  { id: 'exterior', nombre: 'Exterior y defensa', temas: ['Exterior y defensa'], icono: 'M12 2v4M12 18v4M2 12h4M18 12h4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z' },
  { id: 'precios', nombre: 'Precios y campo', temas: ['Economía', 'Medio rural'], icono: 'M4 7h16l-2 12H6zM9 7a3 3 0 0 1 6 0' },
];

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
