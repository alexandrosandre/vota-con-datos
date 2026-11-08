import { signal } from '@preact/signals';
import type { DatosFase1, DatosFase2, DatosFase3, Partido } from './types';

export const REPO = 'https://github.com/alexandrosandre/vota-con-datos';

export const partidos = signal<Partido[] | null>(null);
export const fase1 = signal<DatosFase1 | null>(null);
export const fase2 = signal<DatosFase2 | null>(null);
export const fase3 = signal<DatosFase3 | null>(null);
export const errorCarga = signal<string | null>(null);

async function j<T>(f: string): Promise<T> {
  const r = await fetch(`${import.meta.env.BASE_URL}data/${f}`);
  if (!r.ok) throw new Error(`${f}: ${r.status}`);
  return r.json();
}

export async function cargarDatos() {
  try {
    const [p, f1, f2, f3] = await Promise.all([
      j<{ partidos: Partido[] }>('partidos.json'),
      j<DatosFase1>('fase1.json'),
      j<DatosFase2>('fase2.json'),
      j<DatosFase3>('fase3.json'),
    ]);
    partidos.value = p.partidos;
    fase1.value = f1;
    fase2.value = f2;
    fase3.value = f3;
  } catch (e) {
    errorCarga.value = String(e);
  }
}

export function partido(id: string | null | undefined): Partido | undefined {
  return partidos.value?.find((p) => p.id === id);
}

export function nombreCorto(id: string | null | undefined): string {
  return partido(id)?.siglas ?? id ?? '';
}

export const fmt = {
  pct: (x: number, d = 0) => `${(x * 100).toLocaleString('es-ES', { maximumFractionDigits: d, minimumFractionDigits: d })} %`,
  n: (x: number) => Math.round(x).toLocaleString('es-ES'),
  fecha: (s?: string | null) => (s ? new Date(s).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''),
};
