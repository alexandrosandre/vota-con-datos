import { useEffect, useRef } from 'preact/hooks';
import { ruta } from './store';
import { cargarDatos, errorCarga, partido, partidos, REPO } from './data';
import { Logotipo, PASOS } from './brand';
import { Inicio } from './pages/Inicio';
import { Coincide } from './pages/Coincide';
import { Contrasta } from './pages/Contrasta';
import { Cuenta } from './pages/Cuenta';
import { Metodologia } from './pages/Metodologia';
import { Marca } from './pages/Marca';
import { Disenos } from './pages/Disenos';

/** Rutas antiguas (primera versión publicada) → nuevas. */
const REDIRECCIONES: Record<string, string> = {
  '/afinidad': '/coincide', '/tu-voto': '/cuenta', '/rigor': '/contrasta',
  // Nombres de los pasos (lema «Elige · Contrasta · Suma»)
  '/elige': '/coincide', '/suma': '/cuenta',
};

function Cabecera() {
  const r = ruta.value;
  return (
    <header class="top">
      <div class="wrap">
        <a class="home" href="#/" aria-label="vota con datos, inicio">
          <Logotipo />
        </a>
        <nav class="nav" aria-label="Principal">
          {PASOS.map((p) => (
            <a
              key={p.id}
              class={`${p.clase} ${r.startsWith(p.ruta) ? 'on' : ''}`}
              href={`#${p.ruta}`}
              aria-current={r.startsWith(p.ruta) ? 'page' : undefined}
            >
              <span class="dot" aria-hidden="true" />
              {p.n} {p.verbo}
            </a>
          ))}
          <a
            class={`hide-m ${r.startsWith('/metodologia') ? 'on' : ''}`}
            href="#/metodologia"
            aria-current={r.startsWith('/metodologia') ? 'page' : undefined}
          >
            Metodología
          </a>
        </nav>
      </div>
    </header>
  );
}

function Pie() {
  return (
    <footer>
      <div class="wrap">
        <div style={{ maxWidth: 460 }}>
          <Logotipo size={22} />
          <p style={{ marginTop: 10 }}>
            Herramienta cívica independiente para las elecciones generales del 29 de noviembre de 2026. Sin ánimo de lucro, sin publicidad y
            sin recogida de datos.
          </p>
        </div>
        <div>
          <a href="#/metodologia">Metodología</a> · <a href={REPO} target="_blank" rel="noopener">Código y datos</a> ·{' '}
          <a href="#/marca">Marca</a> · <a href={`${REPO}/issues`} target="_blank" rel="noopener">Avisar de un error</a>
          <br />
          Código MIT · Datos y análisis CC BY 4.0
        </div>
      </div>
    </footer>
  );
}

const TITULO_INICIO = document.title;

/** Título de la pestaña para cada ruta (lo primero que anuncia un lector de pantalla). */
function tituloDe(r: string): string {
  const paso = PASOS.find((p) => r.startsWith(p.ruta));
  let t: string | null = null;
  if (paso) {
    const sel = paso.id === 'contrasta' ? partido(r.split('/')[2])?.siglas : undefined;
    t = r.startsWith('/coincide/resultados') ? `Tus resultados · ${paso.verbo}` : sel ? `${paso.verbo}: ${sel}` : `${paso.verbo}: ${paso.pregunta}`;
  } else if (r.startsWith('/metodologia')) t = 'Metodología';
  else if (r.startsWith('/marca')) t = 'Marca';
  else if (r.startsWith('/disenos')) t = 'Diseños';
  return t ? `${t} · vota con datos` : TITULO_INICIO;
}

/** Lleva el foco al contenido principal (enlace de salto y cambios de página). */
function enfocarContenido(desplazar = false) {
  const main = document.getElementById('main');
  const destino = (main?.querySelector('h1') as HTMLElement | null) ?? main;
  if (!destino) return;
  if (!destino.hasAttribute('tabindex')) destino.setAttribute('tabindex', '-1');
  destino.focus({ preventScroll: !desplazar });
}

export function App() {
  useEffect(() => {
    cargarDatos();
  }, []);
  const r = ruta.value;
  const primera = useRef(true);
  useEffect(() => {
    document.title = tituloDe(r);
  }, [r, partidos.value]);
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    // Tras navegar con un enlace (o si el control pulsado ha desaparecido), el foco pasa al título de
    // la nueva página. Si se navega desde un desplegable o un botón que sigue en pantalla, no se mueve.
    const a = document.activeElement;
    if (!a || a === document.body || a.tagName === 'A') requestAnimationFrame(() => enfocarContenido());
  }, [r]);
  const viejo = Object.keys(REDIRECCIONES).find((k) => r.startsWith(k));
  if (viejo) {
    location.replace(`#${REDIRECCIONES[viejo]}${r.slice(viejo.length)}`);
    return null;
  }
  let page;
  if (errorCarga.value) page = <div class="narrow page"><div class="note">No se pudieron cargar los datos: {errorCarga.value}</div></div>;
  else if (r.startsWith('/metodologia')) page = <Metodologia />;
  else if (r.startsWith('/marca')) page = <Marca />;
  else if (r.startsWith('/disenos')) page = <Disenos />;
  else if (!partidos.value) page = <div class="narrow page muted">Cargando datos…</div>;
  else if (r.startsWith('/coincide')) page = <Coincide />;
  else if (r.startsWith('/contrasta')) page = <Contrasta />;
  else if (r.startsWith('/cuenta')) page = <Cuenta />;
  else page = <Inicio />;
  return (
    <>
      <a
        class="sr-only"
        href="#main"
        onClick={(ev) => {
          ev.preventDefault(); // el hash es la ruta: «#main» cambiaría de página
          enfocarContenido(true);
        }}
      >
        Saltar al contenido
      </a>
      <Cabecera />
      <main id="main">{page}</main>
      <Pie />
    </>
  );
}
