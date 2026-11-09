import { TEMAS, temaActual } from '../temas';

/** Galería de propuestas de diseño (ruta oculta #/disenos). */
export function Disenos() {
  const actual = temaActual();
  const base = import.meta.env.BASE_URL;
  return (
    <div class="wrap page">
      <div class="kicker">Propuestas de diseño</div>
      <h1>Elige el diseño</h1>
      <p class="lead">
        Mismo contenido, mismos datos y misma marca de base; cambia la dirección visual. Abre cada propuesta y navega por las tres fases
        reales, en claro y en oscuro.
      </p>
      <div class="trayecto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {TEMAS.map((t) => (
          <div key={t.id} class="etapa p2" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src={`${base}temas/capturas/${t.id}-escritorio.png`}
              alt={`Portada con el diseño ${t.nombre}`}
              style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top', display: 'block', borderBottom: '1px solid var(--line)' }}
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
            <div style={{ padding: 20 }}>
              <h2 style={{ fontSize: '1.3rem' }}>
                {t.nombre} {t.id === actual && <span class="pill">el que estás viendo</span>}
              </h2>
              <p>{t.idea}</p>
              <div class="row">
                <a class="btn primary" href={`${base}?tema=${t.id}#/`}>
                  Ver la web así
                </a>
                <a class="btn" href={`${base}?tema=${t.id}&modo=oscuro#/`}>
                  En oscuro
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p class="muted" style={{ marginTop: 24 }}>
        El diseño elegido se recuerda en este navegador. Para volver al actual: <a href={`${base}?tema=civico#/disenos`}>Cívico</a>.
      </p>
    </div>
  );
}
