import { signal } from '@preact/signals';
import type { DatosFase1, DatosFase2, DatosFase3, Partido } from './types';

export const REPO = 'https://github.com/alexandrosandre/vota-con-datos';

export const partidos = signal<Partido[] | null>(null);
export const fase1 = signal<DatosFase1 | null>(null);
export const fase2 = signal<DatosFase2 | null>(null);
export const fase3 = signal<DatosFase3 | null>(null);
export const errorCarga = signal<string | null>(null);

async function j<T>(f: string): Promise<T> {
  // Con nombre por contenido (no cambia nunca): la caché normal sirve. Con nombre fijo (desarrollo): sin caché.
  const v = __DATOS__[f];
  const r = await fetch(`${import.meta.env.BASE_URL}data/${v ?? f}`, v ? undefined : { cache: 'no-cache' });
  if (!r.ok) throw new Error(`${f}: ${r.status}`);
  return r.json();
}

const espera = (ms: number) => new Promise((ok) => setTimeout(ok, ms));

/**
 * Carga los datos. Si falla (corte de red en el móvil, o una visita justo mientras se publica una versión nueva y
 * GitHub Pages cambia los ficheros), lo reintenta solo dos veces antes de mostrar el aviso.
 */
export async function cargarDatos() {
  errorCarga.value = null; // mientras tanto, «Cargando datos…»
  let ultimo = '';
  for (const ms of [0, 1500, 4000]) {
    if (ms) await espera(ms);
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
      return;
    } catch (e) {
      ultimo = String(e);
    }
  }
  errorCarga.value = ultimo;
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
