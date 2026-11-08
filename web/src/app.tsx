import { useEffect } from 'preact/hooks';
import { ruta } from './store';
import { cargarDatos, errorCarga, partidos, REPO } from './data';
import { Inicio } from './pages/Inicio';
import { Fase1 } from './pages/Fase1';
import { Fase2 } from './pages/Fase2';
import { Fase3 } from './pages/Fase3';
import { Metodologia } from './pages/Metodologia';

export function Logo() {
  return (
    <svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="9" width="26" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2.2" />
      <path d="M10 9 L16 3 L22 9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" />
      <rect x="8" y="19" width="3.5" height="6" rx="1" fill="var(--f1)" />
      <rect x="14.25" y="15" width="3.5" height="10" rx="1" fill="var(--f2)" />
      <rect x="20.5" y="12" width="3.5" height="13" rx="1" fill="var(--f3)" />
    </svg>
  );
}

function Cabecera() {
  const r = ruta.value;
  const on = (p: string) => (r.startsWith(p) ? 'on' : '');
  return (
    <header class="top">
      <div class="wrap">
        <a class="logo" href="#/">
          <Logo />
          <span>vota con datos</span>
        </a>
        <nav class="nav" aria-label="Principal">
          <a class={on('/afinidad')} href="#/afinidad">1 · Afinidad</a>
          <a class={on('/tu-voto')} href="#/tu-voto">2 · Tu voto</a>
          <a class={on('/rigor')} href="#/rigor">3 · Rigor</a>
          <a class={on('/metodologia')} href="#/metodologia">Metodología</a>
          <a class="hide-m" href={REPO} target="_blank" rel="noopener">Código</a>
        </nav>
      </div>
    </header>
  );
}

function Pie() {
  return (
    <footer>
      <div class="wrap">
        <div>
          <strong>vota con datos</strong> · Elecciones generales 29-N-2026
          <br />
          Herramienta independiente, sin ánimo de lucro, sin publicidad y sin recogida de datos.
        </div>
        <div>
          <a href="#/metodologia">Metodología</a> · <a href={REPO} target="_blank" rel="noopener">Código y datos en GitHub</a>
          <br />
          Licencia MIT (código) · CC BY 4.0 (datos y análisis)
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
  let page;
  if (errorCarga.value) page = <div class="narrow page"><div class="note">No se pudieron cargar los datos: {errorCarga.value}</div></div>;
  else if (r.startsWith('/metodologia')) page = <Metodologia />;
  else if (!partidos.value) page = <div class="narrow page muted">Cargando datos…</div>;
  else if (r.startsWith('/afinidad')) page = <Fase1 />;
  else if (r.startsWith('/tu-voto')) page = <Fase2 />;
  else if (r.startsWith('/rigor')) page = <Fase3 />;
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
