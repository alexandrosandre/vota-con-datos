import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

/**
 * Nombres de los ficheros de datos de esta versión (data/v/<nombre>-<huella>.json), que escribe
 * pipeline/build_web.py. Van dentro del código: cada versión de la web pide siempre sus propios datos.
 * Sin manifiesto (aún no se ha ejecutado build_web), la web usa los nombres fijos.
 */
function datosVersion(): Record<string, string> {
  try {
    return JSON.parse(readFileSync(new URL('./public/data/manifest.json', import.meta.url), 'utf8')).actual.datos ?? {};
  } catch {
    return {};
  }
}

export default defineConfig({
  plugins: [preact()],
  base: process.env.VCD_BASE ?? '/vota-con-datos/',
  define: { __DATOS__: JSON.stringify(datosVersion()) },
});
