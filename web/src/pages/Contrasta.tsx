import { useState } from 'preact/hooks';
import { actualizar, estado, ir, ruta } from '../store';
import { fase3, fmt, partido, partidos } from '../data';
import { CabeceraPaso, Siguiente } from '../brand';
import type { Propuesta, Valoracion } from '../types';

const VAL: Record<Valoracion, string> = {
  favorable: 'Sólida',
  mixta: 'Matizable',
  desfavorable: 'Débil',
  no_verificable: 'No verificable',
};
const COLOR: Record<Valoracion, string> = { favorable: 'ok', mixta: 'mid', desfavorable: 'bad', no_verificable: 'na' };

function Leyenda() {
  return (
    <div class="legend">
      {(Object.keys(VAL) as Valoracion[]).map((v) => (
        <span key={v}>
          <i style={{ background: `var(--${COLOR[v]})` }} />
          {VAL[v]}
        </span>
      ))}
    </div>
  );
}

function Resumen({ props }: { props: Propuesta[] }) {
  const n: Record<Valoracion, number> = { favorable: 0, mixta: 0, desfavorable: 0, no_verificable: 0 };
  props.forEach((p) => Object.values(p.evaluacion).forEach((e) => n[e.valoracion]++));
  const total = Object.values(n).reduce((a, b) => a + b, 0) || 1;
  return (
    <div>
      <div style={{ display: 'flex', height: 12, borderRadius: 99, overflow: 'hidden' }} role="img" aria-label="Reparto de valoraciones">
        {(Object.keys(n) as Valoracion[]).map((v) => (
          <i key={v} style={{ width: `${(n[v] / total) * 100}%`, background: `var(--${COLOR[v]})` }} />
        ))}
      </div>
      <p class="muted" style={{ fontSize: '0.85rem', margin: '8px 0 0' }}>
        {(Object.keys(n) as Valoracion[]).map((v) => `${n[v]} ${VAL[v].toLowerCase()}`).join(' · ')} — de {total} valoraciones (12 propuestas × 8 criterios)
      </p>
    </div>
  );
}

function Mapa({ props }: { props: Propuesta[] }) {
  const crit = fase3.value!.criterios;
  return (
    <div class="scroll-x">
      <table class="mapa" style={{ fontSize: '0.82rem' }}>
        <thead>
          <tr>
            <th style={{ verticalAlign: 'bottom' }}>Propuesta</th>
            {crit.map((c) => (
              <th key={c.id} class="v" title={c.pregunta}>
                {c.nombre}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr key={p.id}>
              <td style={{ minWidth: 180 }}>
                <a href={`#/contrasta/${ruta.value.split('/')[2]}`} onClick={(e) => { e.preventDefault(); document.getElementById(`prop-${p.id}`)?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {i + 1}. {p.titulo}
                </a>
              </td>
              {crit.map((c) => {
                const v = p.evaluacion[c.id]?.valoracion ?? 'no_verificable';
                return (
                  <td key={c.id} title={`${c.nombre}: ${VAL[v]}`}>
                    <div class="sq" style={{ background: `var(--${COLOR[v]})`, opacity: 0.85 }} />
                  </td>
                );
              })}
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
    <article class="card prop" id={`prop-${p.id}`}>
      <div class="prop-head">
        <span class="q-tema">
          {n} · {p.area}
        </span>
        <h3 style={{ margin: '6px 0 8px' }}>{p.titulo}</h3>
        <p style={{ color: 'var(--ink-2)' }}>{p.resumen}</p>
        <p class="quote">
          «{p.cita}» {p.pagina ? <span class="muted">(programa, p. {p.pagina})</span> : null}
        </p>
        {p.cita_traduccion && <p class="muted" style={{ fontSize: '0.88rem' }}>Traducción: «{p.cita_traduccion}»</p>}
        <div class="chips" style={{ margin: '12px 0' }}>
          {crit.map((c) => {
            const v = p.evaluacion[c.id]?.valoracion ?? 'no_verificable';
            return (
              <span key={c.id} class={`chip val-${v}`} title={c.pregunta}>
                {c.nombre}: {VAL[v]}
              </span>
            );
          })}
        </div>
        <button class="btn" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? 'Ocultar el análisis' : 'Ver el análisis y las fuentes'}
        </button>
      </div>
      {open && (
        <div class="prop-body">
          {p.beneficiarios && (
            <div class="crit">
              <h4>En resumen, a quién afecta</h4>
              <p>{p.beneficiarios}</p>
            </div>
          )}
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
                    {ev.fuentes.map((f, i) => {
                      let host = f.url;
                      try {
                        host = new URL(f.url).hostname.replace(/^www\./, '');
                      } catch {
                        /* url no estándar */
                      }
                      return (
                        <a key={i} href={f.url} target="_blank" rel="noopener">
                          [{i + 1}] {f.titulo ?? f.medio ?? host}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

function Promesas({ id }: { id: string }) {
  const p = partido(id);
  if (!p || !(p.promesas?.length ?? 0)) return null;
  return (
    <details class="card desplegable">
      <summary>Compromisos públicos de campaña de {p.siglas} ({p.promesas!.length})</summary>
      <p class="muted" style={{ fontSize: '0.88rem', marginTop: 12 }}>
        Medidas concretas anunciadas por el partido o su candidato desde la convocatoria, recogidas de medios de referencia o de sus canales
        oficiales, con su fuente. Se usan en el paso 1; aquí no se evalúan (solo evaluamos programas oficiales completos).
      </p>
      {p.promesas!.map((x, i) => (
        <div class="crit" key={i}>
          <p style={{ color: 'var(--ink)' }}>
            {x.tipo === 'cita_literal' ? `«${x.texto}»` : x.texto} <span class="pill">{x.area}</span>
          </p>
          <div class="srcs muted">
            {x.quien ? `${x.quien} · ` : ''}
            {fmt.fecha(x.fecha)} ·{' '}
            {x.fuentes.map((f, j) => (
              <a key={j} href={f.url} target="_blank" rel="noopener">
                {f.medio ?? 'fuente'}
              </a>
            ))}
          </div>
        </div>
      ))}
    </details>
  );
}

export function Contrasta() {
  const d = fase3.value!;
  const e = estado.value;
  const sel = ruta.value.split('/')[2] || e.partido || '';
  const p = partido(sel);
  const datos = sel ? d.partidos[sel] : undefined;
  const evaluados = new Set(Object.entries(d.partidos).filter(([, v]) => v.estado === 'evaluado').map(([k]) => k));
  const afines = e.rankingOrigen ? e.ranking.slice(0, 4) : [];
  const elegir = (v: string) => {
    actualizar({ partido: v || null });
    ir(`/contrasta/${v}`);
  };

  return (
    <div class="narrow page p2">
      <CabeceraPaso id="contrasta">
        Las 12 propuestas centrales de cada programa oficial, contrastadas una a una con criterios que se pueden verificar. Lo que no se ha podido
        comprobar se marca como tal.
      </CabeceraPaso>

      {afines.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div class="muted" style={{ fontSize: '0.85rem', marginBottom: 6 }}>
            {e.rankingOrigen === 'fase1' ? 'Tus partidos más afines (paso 1):' : 'Tu orden de preferencia:'}
          </div>
          <div class="chips">
            {afines.map((id) => (
              <button key={id} class={`chip-btn ${id === sel ? 'on' : ''}`} onClick={() => elegir(id)}>
                {partido(id)?.siglas ?? id}
                {evaluados.has(id) ? '' : ' · pendiente'}
              </button>
            ))}
          </div>
        </div>
      )}

      <label class="field" style={{ maxWidth: 420 }}>
        Partido
        <select value={sel} onChange={(ev) => elegir((ev.target as HTMLSelectElement).value)}>
          <option value="">Elige partido…</option>
          <optgroup label="Programa analizado">
            {(partidos.value ?? []).filter((x) => evaluados.has(x.id)).map((x) => (
              <option key={x.id} value={x.id}>
                {x.siglas} — {x.nombre}
              </option>
            ))}
          </optgroup>
          <optgroup label="Pendientes">
            {(partidos.value ?? []).filter((x) => !evaluados.has(x.id)).map((x) => (
              <option key={x.id} value={x.id}>
                {x.siglas} — {x.programa.estado === 'publicado' ? 'análisis en curso' : 'sin programa aún'}
              </option>
            ))}
          </optgroup>
        </select>
      </label>

      <div class="stack" style={{ marginTop: 22 }}>
        {!sel && <div class="note">Elige un partido, o llega aquí desde el paso 1 con tus partidos más afines.</div>}
        {sel && (!datos || datos.estado !== 'evaluado') && (
          <div class="note">
            <strong>{p?.siglas ?? sel}: análisis pendiente.</strong>{' '}
            {p?.programa.estado === 'publicado'
              ? 'Su programa ya está publicado y el análisis está en curso (lectura completa, evaluación y revisión independiente).'
              : `Todavía no ha publicado su programa oficial para el 29-N (última comprobación: ${fmt.fecha(p?.programa.comprobado)}). Solo analizamos programas oficiales completos.`}
          </div>
        )}
        {datos?.estado === 'evaluado' && p && (
          <>
            <div class="card stack">
              <div class="row between">
                <h3 style={{ margin: 0 }}>{p.siglas}: el programa de un vistazo</h3>
                <Leyenda />
              </div>
              <Resumen props={datos.propuestas} />
              <Mapa props={datos.propuestas} />
              <p class="muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                <a href={p.programa.url ?? '#'} target="_blank" rel="noopener">
                  Programa oficial
                </a>{' '}
                ({p.programa.paginas} páginas{p.programa.fecha ? `, ${fmt.fecha(p.programa.fecha)}` : ''}), leído completo. Análisis de{' '}
                {d.meta.modelo} con fuentes públicas, revisado por una segunda pasada independiente
                {datos.revision ? ` (${datos.revision} correcciones aplicadas)` : ''}. <a href="#/metodologia">Cómo se hace</a>.
              </p>
            </div>
            {datos.propuestas.map((x, i) => (
              <TarjetaPropuesta key={x.id} p={x} n={i + 1} />
            ))}
          </>
        )}
        {sel && <Promesas id={sel} />}
      </div>
      <Siguiente desde="contrasta" />
    </div>
  );
}
