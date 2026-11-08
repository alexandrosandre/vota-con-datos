import { useState } from 'preact/hooks';
import { actualizar, estado, ir, ruta } from '../store';
import { fase3, fmt, partido, partidos } from '../data';
import type { Propuesta, Valoracion } from '../types';

const VAL: Record<Valoracion, string> = {
  favorable: 'Sólida',
  mixta: 'Matizable',
  desfavorable: 'Débil',
  no_verificable: 'No verificable',
};

function Leyenda() {
  return (
    <div class="legend">
      {(Object.keys(VAL) as Valoracion[]).map((v) => (
        <span key={v}>
          <i class={`val-${v}`} style={{ background: `var(--${v === 'favorable' ? 'ok' : v === 'mixta' ? 'mid' : v === 'desfavorable' ? 'bad' : 'na'})` }} />
          {VAL[v]}
        </span>
      ))}
    </div>
  );
}

function Mapa({ props }: { props: Propuesta[] }) {
  const crit = fase3.value!.criterios;
  const color = (v?: Valoracion) => `var(--${v === 'favorable' ? 'ok' : v === 'mixta' ? 'mid' : v === 'desfavorable' ? 'bad' : 'na'}${v ? '' : '-soft'})`;
  return (
    <div class="scroll-x">
      <table style={{ fontSize: '0.8rem' }}>
        <thead>
          <tr>
            <th>Propuesta</th>
            {crit.map((c) => (
              <th key={c.id} title={c.pregunta} style={{ textAlign: 'center', whiteSpace: 'nowrap', writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: 110, padding: 4 }}>
                {c.nombre}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr key={p.id}>
              <td>
                <a href={`#prop-${p.id}`}>{i + 1}. {p.titulo}</a>
              </td>
              {crit.map((c) => (
                <td key={c.id} style={{ padding: 3 }} title={`${c.nombre}: ${VAL[p.evaluacion[c.id]?.valoracion ?? 'no_verificable']}`}>
                  <div style={{ width: 22, height: 22, margin: '0 auto', borderRadius: 4, background: color(p.evaluacion[c.id]?.valoracion), opacity: 0.85 }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TarjetaPropuesta({ p, n }: { p: Propuesta; n: number }) {
  const [open, setOpen] = useState(false);
  const crit = fase3.value!.criterios;
  return (
    <div class="card prop" id={`prop-${p.id}`}>
      <div class="prop-head">
        <div class="row" style={{ justifyContent: 'space-between' }}>
          <span class="q-tema" style={{ color: 'var(--f3)' }}>
            {n}. {p.area}
          </span>
        </div>
        <h3 style={{ margin: '6px 0 8px' }}>{p.titulo}</h3>
        <p style={{ color: 'var(--ink-2)' }}>{p.resumen}</p>
        <p class="quote">
          «{p.cita}» {p.pagina ? <span class="muted">(programa, p. {p.pagina})</span> : null}
        </p>
        {p.cita_traduccion && <p class="muted" style={{ fontSize: '0.88rem' }}>Traducción: «{p.cita_traduccion}»</p>}
        <div class="chips" style={{ margin: '12px 0' }}>
          {crit.map((c) => {
            const ev = p.evaluacion[c.id];
            return (
              <span key={c.id} class={`chip val-${ev?.valoracion ?? 'no_verificable'}`} title={c.pregunta}>
                {c.nombre}: {VAL[ev?.valoracion ?? 'no_verificable']}
              </span>
            );
          })}
        </div>
        <button class="btn" onClick={() => setOpen(!open)}>
          {open ? 'Ocultar el análisis' : 'Ver el análisis y las fuentes'}
        </button>
      </div>
      {open && (
        <div class="prop-body">
          {crit.map((c) => {
            const ev = p.evaluacion[c.id];
            if (!ev) return null;
            return (
              <div class="crit" key={c.id}>
                <h4>
                  {c.nombre} <span class={`chip val-${ev.valoracion}`}>{VAL[ev.valoracion]}</span>
                </h4>
                <p>{ev.texto}</p>
                {ev.fuentes.length > 0 && (
                  <div class="srcs">
                    {ev.fuentes.map((f, i) => (
                      <a key={i} href={f.url} target="_blank" rel="noopener">
                        [{i + 1}] {f.titulo ?? f.medio ?? new URL(f.url).hostname}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Fase3() {
  const d = fase3.value!;
  const sel = ruta.value.split('/')[2] || estado.value.partido || '';
  const p = partido(sel);
  const datos = sel ? d.partidos[sel] : undefined;
  const evaluados = new Set(Object.entries(d.partidos).filter(([, v]) => v.estado === 'evaluado').map(([k]) => k));

  return (
    <div class="narrow page c3">
      <div class="page-head">
        <div class="num">Fase 3</div>
        <h1>¿Qué hay detrás de sus propuestas?</h1>
        <p class="lead">
          Las 12 propuestas centrales de cada programa, contrastadas una a una con criterios que se pueden verificar. Lo que no se ha
          podido comprobar se marca como tal.
        </p>
      </div>
      <label class="field" style={{ maxWidth: 420 }}>
        Partido
        <select
          value={sel}
          onChange={(ev) => {
            const v = (ev.target as HTMLSelectElement).value;
            actualizar({ partido: v || null });
            ir(`/rigor/${v}`);
          }}
        >
          <option value="">Elige partido…</option>
          {(partidos.value ?? []).map((x) => (
            <option key={x.id} value={x.id}>
              {x.siglas} {evaluados.has(x.id) ? '' : '(pendiente)'}
            </option>
          ))}
        </select>
      </label>

      <div class="stack" style={{ marginTop: 22 }}>
        {!sel && <div class="note">Elige un partido, o llega aquí desde la fase 2 con el que hayas decidido votar.</div>}
        {sel && (!datos || datos.estado !== 'evaluado') && (
          <div class="note">
            <strong>{p?.siglas ?? sel}: análisis pendiente.</strong>{' '}
            {p?.programa.estado === 'publicado'
              ? 'El programa está publicado y su análisis está en curso.'
              : `Todavía no ha publicado su programa oficial para el 29-N (última comprobación: ${fmt.fecha(p?.programa.comprobado)}). Solo analizamos programas oficiales completos.`}{' '}
            {datos?.motivo}
          </div>
        )}
        {sel && p && (p.promesas?.length ?? 0) > 0 && (
          <div class="card">
            <h3>Compromisos públicos de campaña</h3>
            <p class="muted" style={{ fontSize: '0.9rem' }}>
              Medidas concretas anunciadas por {p.siglas} o su candidato desde la convocatoria, recogidas de medios de referencia o de sus
              canales oficiales. Se muestran tal cual, con su fuente; no están evaluadas (solo evaluamos programas oficiales completos).
            </p>
            {p.promesas!.map((x, i) => (
              <div class="crit" key={i}>
                <p style={{ color: 'var(--ink)' }}>
                  {x.tipo === 'cita_literal' ? `«${x.texto}»` : x.texto}{' '}
                  <span class="pill">{x.area}</span>
                </p>
                <div class="srcs muted">
                  {x.quien ? `${x.quien} · ` : ''}
                  {fmt.fecha(x.fecha)} ·{' '}
                  {x.fuentes.map((f, j) => (
                    <a key={j} href={f.url} target="_blank" rel="noopener">
                      {f.medio ?? new URL(f.url).hostname}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {datos?.estado === 'evaluado' && (
          <>
            <div class="card stack">
              <div class="row" style={{ justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0 }}>Mapa de las 12 propuestas de {p?.siglas}</h3>
                <Leyenda />
              </div>
              <Mapa props={datos.propuestas} />
              <p class="muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                Programa:{' '}
                <a href={p?.programa.url ?? '#'} target="_blank" rel="noopener">
                  documento oficial
                </a>{' '}
                {p?.programa.fecha ? `(${fmt.fecha(p.programa.fecha)})` : ''}. Análisis generado por {d.meta.modelo} con investigación
                documental y revisado por una segunda pasada independiente. <a href="#/metodologia#fase3">Cómo se hace</a>.
              </p>
            </div>
            {datos.propuestas.map((x, i) => (
              <TarjetaPropuesta key={x.id} p={x} n={i + 1} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
