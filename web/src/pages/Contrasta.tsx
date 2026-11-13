import { useState } from 'preact/hooks';
import { actualizar, estado, ir, ruta } from '../store';
import { fase3, fmt, partido, partidos } from '../data';
import { CabeceraPaso, Siguiente } from '../brand';
import { rankingActual } from '../paso1';
import type { Propuesta, Valoracion } from '../types';

const VAL: Record<Valoracion, string> = {
  favorable: 'Sólida',
  mixta: 'Matizable',
  desfavorable: 'Débil',
  no_verificable: 'No verificable',
};
const COLOR: Record<Valoracion, string> = { favorable: 'ok', mixta: 'mid', desfavorable: 'bad', no_verificable: 'na' };
/** Idioma de las citas que se muestran con traducción (para que el lector de pantalla las pronuncie bien). */
const IDIOMA_CITA: Record<string, string> = {
  erc: 'ca', junts: 'ca', psc: 'ca', ara_mes_fa: 'ca', compromis: 'ca', bng: 'gl', eh_bildu: 'eu', pnv: 'eu',
};
const sinMovimiento = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function Leyenda() {
  return (
    <div class="legend">
      {(Object.keys(VAL) as Valoracion[]).map((v) => (
        <span key={v}>
          <i style={{ background: `var(--${COLOR[v]})` }} aria-hidden="true" />
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
      <div class="reparto" style={{ display: 'flex', height: 12, borderRadius: 99, overflow: 'hidden' }} aria-hidden="true">
        {(Object.keys(n) as Valoracion[]).map((v) => (
          <i key={v} style={{ width: `${(n[v] / total) * 100}%`, background: `var(--${COLOR[v]})` }} />
        ))}
      </div>
      <p class="muted" style={{ fontSize: '0.85rem', margin: '8px 0 0' }}>
        {(Object.keys(n) as Valoracion[]).map((v) => `${n[v]} ${VAL[v].toLowerCase()}`).join(' · ')} — de {total} valoraciones ({props.length} propuestas, cada una en{' '}
        {fase3.value!.criterios.length} criterios)
      </p>
    </div>
  );
}

function Mapa({ props }: { props: Propuesta[] }) {
  const crit = fase3.value!.criterios;
  return (
    <div class="scroll-x">
      <table class="mapa" style={{ fontSize: '0.82rem' }}>
        <caption class="sr-only">Valoración de cada propuesta en cada criterio</caption>
        <thead>
          <tr>
            <th scope="col" style={{ verticalAlign: 'bottom' }}>
              Propuesta
            </th>
            {crit.map((c) => (
              <th key={c.id} scope="col" class="v" title={c.pregunta}>
                {c.nombre}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr key={p.id}>
              <th scope="row" style={{ minWidth: 180 }}>
                <a
                  href={`#/contrasta/${ruta.value.split('/')[2]}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const destino = document.getElementById(`prop-${p.id}`);
                    destino?.scrollIntoView({ behavior: sinMovimiento() ? 'auto' : 'smooth' });
                    destino?.focus({ preventScroll: true });
                  }}
                >
                  {i + 1}. {p.titulo}
                </a>
              </th>
              {crit.map((c) => {
                const v = p.evaluacion[c.id]?.valoracion ?? 'no_verificable';
                return (
                  <td key={c.id} title={`${c.nombre}: ${VAL[v]}`}>
                    <div class={`sq sq--${v}`} style={{ background: `var(--${COLOR[v]})`, opacity: 0.85 }} aria-hidden="true" />
                    <span class="sr-only">{VAL[v]}</span>
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

function TarjetaPropuesta({ p, n, partidoId }: { p: Propuesta; n: number; partidoId: string }) {
  const [open, setOpen] = useState(false);
  const crit = fase3.value!.criterios;
  const lang = p.cita_traduccion ? IDIOMA_CITA[partidoId] : undefined;
  return (
    <article class="card prop" id={`prop-${p.id}`} tabIndex={-1}>
      <div class="prop-head">
        <span class="q-tema">
          {n} · {p.area}
        </span>
        <h3 style={{ margin: '6px 0 8px' }}>{p.titulo}</h3>
        <p style={{ color: 'var(--ink-2)' }}>{p.resumen}</p>
        <p class="quote">
          <span lang={lang}>«{p.cita}»</span> {p.pagina ? <span class="muted">(programa, p. {p.pagina})</span> : null}
        </p>
        {p.quien && (
          <p class="muted" style={{ fontSize: '0.88rem', marginTop: -4 }}>
            — {p.quien}
            {p.formato ? `, ${p.formato}` : ''}
            {p.fecha ? `, ${fmt.fecha(p.fecha)}` : ''}
            {p.url && (
              <>
                {' · '}
                <a href={p.url} target="_blank" rel="noopener" title={p.medio ?? undefined}>
                  ver la fuente{p.medio && !(p.formato ?? '').includes(p.medio.split(' (')[0]) ? ` (${p.medio})` : ''}
                </a>
              </>
            )}
          </p>
        )}
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
        Medidas concretas anunciadas por el partido o su candidato desde que se convocaron las elecciones, recogidas de medios de referencia
        o de sus canales oficiales, con su fuente. Se usan en el paso 1. Si el partido no ha publicado programa, también sirven para elegir
        las propuestas que se analizan aquí.
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
  const afines = e.rankingOrigen ? rankingActual.value.slice(0, 4) : [];
  const elegir = (v: string) => {
    actualizar({ partido: v || null });
    ir(`/contrasta/${v}`);
  };

  return (
    <div class="narrow page p2">
      <CabeceraPaso id="contrasta">
        Hasta 12 propuestas centrales de cada partido, contrastadas una a una con criterios que se pueden comprobar. Salen de su programa
        oficial o, si aún no lo ha publicado, de los compromisos que sus líderes han hecho en público. Lo que no se ha podido comprobar se
        marca como tal.
      </CabeceraPaso>

      {afines.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div class="muted" style={{ fontSize: '0.85rem', marginBottom: 6 }}>
            {e.rankingOrigen === 'fase1' ? 'Tus partidos más afines (paso 1):' : 'Tu orden de preferencia:'}
          </div>
          <div class="chips">
            {afines.map((id) => (
              <button key={id} class={`chip-btn ${id === sel ? 'on' : ''}`} aria-pressed={id === sel} onClick={() => elegir(id)}>
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
            {(partidos.value ?? []).filter((x) => evaluados.has(x.id) && d.partidos[x.id]?.base !== 'compromisos').map((x) => (
              <option key={x.id} value={x.id}>
                {x.siglas} — {x.nombre}
              </option>
            ))}
          </optgroup>
          <optgroup label="Sin programa: analizados los compromisos de sus líderes">
            {(partidos.value ?? []).filter((x) => d.partidos[x.id]?.base === 'compromisos').map((x) => (
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
        {p?.nota_coalicion && <p class="muted" style={{ fontSize: '0.9rem', margin: 0 }}>{p.nota_coalicion}</p>}
        {sel && !p && (
          <div class="note">
            Ese partido no está entre los {(partidos.value ?? []).length} que analizamos. Elige uno en la lista: si votas en una provincia donde se
            presenta en coalición, en el paso 3 te decimos en qué papeleta va.
          </div>
        )}
        {sel && p && (!datos || datos.estado !== 'evaluado') && (
          <div class="note">
            <strong>{p?.siglas ?? sel}: análisis pendiente.</strong>{' '}
            {p?.programa.estado === 'publicado'
              ? 'Su programa ya está publicado y lo estamos analizando: lectura completa, valoración y revisión independiente.'
              : `Todavía no ha publicado su programa oficial para el 29-N (última comprobación: ${fmt.fecha(p?.programa.comprobado)}). Mientras tanto analizamos los compromisos que sus líderes han hecho en público, con el mismo método. Aparecerán aquí cuando pasen la revisión independiente.`}
          </div>
        )}
        {datos?.estado === 'evaluado' && p && (
          <>
            <div class="card stack">
              <div class="row between">
                <h2 class="h3" style={{ margin: 0 }}>
                  {p.siglas}: {datos.base === 'compromisos' ? 'sus compromisos de un vistazo' : 'el programa de un vistazo'}
                </h2>
                <Leyenda />
              </div>
              <Resumen props={datos.propuestas} />
              <Mapa props={datos.propuestas} />
              {datos.base === 'compromisos' ? (
                <p class="muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                  {p.programa.estado === 'publicado' ? (
                    <>
                      <strong>
                        {p.siglas} publicó su programa{p.programa.fecha ? ` el ${fmt.fecha(p.programa.fecha)}` : ''} y lo estamos analizando
                      </strong>{' '}
                      (lectura completa, valoración y revisión independiente). Hasta que termine, estas propuestas salen solo
                    </>
                  ) : (
                    <>
                      <strong>{p.siglas} no ha publicado programa para el 29-N</strong> (última comprobación: {fmt.fecha(p.programa.comprobado)}).
                      Estas propuestas salen solo
                    </>
                  )} de sus compromisos públicos para esta legislatura: lo que sus líderes han dicho en primera persona y sus notas y documentos oficiales{p.nota_coalicion ? ' o los de la coalición con la que se presenta' : ''}.{' '}
                  <a href="#/metodologia">Cómo se hace</a>.
                </p>
              ) : (
                <p class="muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                  Propuestas del{' '}
                  <a href={p.programa.url ?? '#'} target="_blank" rel="noopener">
                    programa oficial
                  </a>{' '}
                  ({p.programa.paginas} páginas{p.programa.fecha ? `, ${fmt.fecha(p.programa.fecha)}` : ''}), leído completo
                  {(datos.complemento?.length ?? 0) > 0
                    ? ', y, al final, compromisos públicos de sus líderes que no están en el programa'
                    : ''}
                  . <a href="#/metodologia">Cómo se hace</a>.
                </p>
              )}
            </div>
            {datos.propuestas.map((x, i) => (
              <TarjetaPropuesta key={x.id} p={x} n={i + 1} partidoId={sel} />
            ))}
            {(datos.complemento?.length ?? 0) > 0 && (
              <>
                <div class="card">
                  <h2 class="h3" style={{ margin: 0 }}>
                    Además del programa: compromisos de sus líderes
                  </h2>
                  <p class="muted" style={{ fontSize: '0.9rem', margin: '8px 0 0' }}>
                    Medidas importantes que sus líderes han prometido en público para esta legislatura y que no figuran en el programa. Se
                    analizan con los mismos criterios y la misma revisión independiente.
                  </p>
                </div>
                {datos.complemento!.map((x, i) => (
                  <TarjetaPropuesta key={x.id} p={x} n={datos.propuestas.length + i + 1} partidoId={sel} />
                ))}
              </>
            )}
          </>
        )}
        {sel && <Promesas id={sel} />}
      </div>
      <Siguiente desde="contrasta" />
    </div>
  );
}
