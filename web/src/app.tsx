import { useEffect } from 'preact/hooks';
import { ruta } from './store';
import { cargarDatos, errorCarga, partidos, REPO } from './data';
import { Logotipo, PASOS } from './brand';
import { Inicio } from './pages/Inicio';
import { Coincide } from './pages/Coincide';
import { Contrasta } from './pages/Contrasta';
import { Cuenta } from './pages/Cuenta';
import { Metodologia } from './pages/Metodologia';
import { Marca } from './pages/Marca';

/** Rutas antiguas (primera versión publicada) → nuevas. */
const REDIRECCIONES: Record<string, string> = { '/afinidad': '/coincide', '/tu-voto': '/cuenta', '/rigor': '/contrasta' };

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
            <a key={p.id} class={`${p.clase} ${r.startsWith(p.ruta) ? 'on' : ''}`} href={`#${p.ruta}`}>
              <span class="dot" aria-hidden="true" />
              {p.n} {p.verbo}
            </a>
          ))}
          <a class={`hide-m ${r.startsWith('/metodologia') ? 'on' : ''}`} href="#/metodologia">
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

export function App() {
  useEffect(() => {
    cargarDatos();
  }, []);
  const r = ruta.value;
  const viejo = Object.keys(REDIRECCIONES).find((k) => r.startsWith(k));
  if (viejo) {
    location.replace(`#${REDIRECCIONES[viejo]}${r.slice(viejo.length)}`);
    return null;
  }
  let page;
  if (errorCarga.value) page = <div class="narrow page"><div class="note">No se pudieron cargar los datos: {errorCarga.value}</div></div>;
  else if (r.startsWith('/metodologia')) page = <Metodologia />;
  else if (r.startsWith('/marca')) page = <Marca />;
  else if (!partidos.value) page = <div class="narrow page muted">Cargando datos…</div>;
  else if (r.startsWith('/coincide')) page = <Coincide />;
  else if (r.startsWith('/contrasta')) page = <Contrasta />;
  else if (r.startsWith('/cuenta')) page = <Cuenta />;
  else page = <Inicio />;
  return (
    <>
      <a class="sr-only" href="#main">Saltar al contenido</a>
      <Cabecera />
      <main id="main">{page}</main>
      <Pie />
    </>
  );
}
