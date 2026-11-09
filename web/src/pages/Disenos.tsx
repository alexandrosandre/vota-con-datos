import { REPO } from '../data';
import { TEMAS, temaActual } from '../temas';

/** Galería de propuestas de diseño (ruta oculta #/disenos). */
export function Disenos() {
  const actual = temaActual();
  const base = import.meta.env.BASE_URL;
  const img = (id: string, v: string) => `${base}temas/capturas/${id}-${v}.png`;
  const oculta = (e: Event) => ((e.target as HTMLImageElement).style.display = 'none');
  return (
    <div class="wrap page">
      <div class="kicker">Propuestas de diseño</div>
      <h1>Elige el diseño</h1>
      <p class="lead">
        Cinco direcciones visuales con el mismo contenido, los mismos datos y la misma marca de base. Todas pasan el mismo listón: contraste AA
        en claro y oscuro, sin desbordes en móvil y foco visible. La elección es de gusto, no de calidad.
      </p>
      <div class="stack" style={{ marginTop: 24 }}>
        {TEMAS.map((t) => (
          <section key={t.id} class="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1fr)', gap: 0, background: 'var(--paper-2)' }}>
              <a href={`${base}?tema=${t.id}#/`} aria-label={`Abrir la web con el diseño ${t.nombre}`}>
                <img src={img(t.id, 'escritorio')} alt={`Portada en escritorio, diseño ${t.nombre}`} loading="lazy" onError={oculta}
                  style={{ width: '100%', display: 'block', aspectRatio: '1280 / 860', objectFit: 'cover', objectPosition: 'top' }} />
              </a>
              <a href={`${base}?tema=${t.id}#/`} aria-hidden="true" tabIndex={-1} style={{ position: 'relative', display: 'block' }}>
                <img src={img(t.id, 'movil')} alt="" loading="lazy" onError={oculta}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderLeft: '1px solid var(--line)' }} />
              </a>
            </div>
            <div style={{ padding: 22 }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: 6 }}>
                {t.nombre} {t.id === actual && <span class="pill">el que estás viendo</span>}
              </h2>
              <p style={{ marginBottom: 8 }}>{t.idea}</p>
              <p class="muted" style={{ fontSize: '0.92rem', marginBottom: 4 }}>
                <strong>A favor:</strong> {t.fortalezas}
              </p>
              <p class="muted" style={{ fontSize: '0.92rem' }}>
                <strong>A tener en cuenta:</strong> {t.riesgos}
              </p>
              <div class="row">
                <a class="btn primary" href={`${base}?tema=${t.id}#/`}>
                  Ver la web así
                </a>
                <a class="btn" href={`${base}?tema=${t.id}&modo=oscuro#/`}>
                  En oscuro
                </a>
                <a class="btn ghost" href={`${base}?tema=${t.id}&circ=28&partido=podemos#/cuenta`}>
                  Ver el paso 3
                </a>
                <a class="btn ghost" href={`${base}?tema=${t.id}#/contrasta/erc`}>
                  Ver el paso 2
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
      <p class="muted" style={{ marginTop: 24 }}>
        El diseño que abras se recuerda en este navegador. Para volver al actual: <a href={`${base}?tema=civico#/disenos`}>Cívico</a>. Valoración
        completa: <a href={`${REPO}/blob/main/docs/research/disenos.md`}>docs/research/disenos.md</a>.
      </p>
    </div>
  );
}
