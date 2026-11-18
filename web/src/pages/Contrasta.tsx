import { useEffect, useState } from 'preact/hooks';
import { actualizar, estado, ir, ruta } from '../store';
import { Compartir, enlace } from '../compartir';
import { fase3, fmt, partido, partidos } from '../data';
import { CabeceraPaso, Siguiente } from '../brand';
import { origenOrden, partidoPreferido, paso1, rankingActual } from '../paso1';
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

const SIMBOLO: Record<Valoracion, string> = { favorable: '✓', mixta: '~', desfavorable: '✕', no_verificable: '?' };
/** Nombres cortos de las columnas (el nombre completo y la pregunta, en «¿Qué mide cada columna?»). */
const CORTO: Record<string, string> = {
  concrecion: 'Concreción', legal: 'Encaje legal', financiacion: 'Financiación', evidencia: 'Evidencia',
  antecedentes: 'Antes en España', internacional: 'Antes fuera de España', beneficiarios: 'Beneficiarios', largo_plazo: 'Largo plazo',
};

function Casilla({ v }: { v: Valoracion }) {
  return <i class={`casilla c-${COLOR[v]}`}>{SIMBOLO[v]}</i>;
}

function Leyenda() {
  return (
    <div class="leyenda-casillas">
      {(Object.keys(VAL) as Valoracion[]).map((v) => (
        <span key={v}>
          <Casilla v={v} /> {VAL[v]}
        </span>
      ))}
    </div>
  );
}

function TarjetaPropuesta({
  p,
  n,
  partidoId,
  destacada = false,
  abierta,
  onToggle,
}: {
  p: Propuesta;
  n: number;
  partidoId: string;
  destacada?: boolean;
  abierta: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(destacada);
  // Un enlace a esta propuesta abre también su análisis (al cargar la página o navegando dentro de la web).
  useEffect(() => {
    if (destacada) setOpen(true);
  }, [destacada]);
  const crit = fase3.value!.criterios;
  const siglas = partido(partidoId)?.siglas ?? partidoId;
  const cuenta: Record<Valoracion, number> = { favorable: 0, mixta: 0, desfavorable: 0, no_verificable: 0 };
  crit.forEach((c) => cuenta[p.evaluacion[c.id]?.valoracion ?? 'no_verificable']++);
  const PLURAL: Record<Valoracion, [string, string]> = {
    favorable: ['sólida', 'sólidas'], mixta: ['matizable', 'matizables'], desfavorable: ['débil', 'débiles'], no_verificable: ['no verificable', 'no verificables'],
  };
  const reparto = (Object.keys(cuenta) as Valoracion[]).filter((v) => cuenta[v] > 0).map((v) => `${cuenta[v]} ${PLURAL[v][cuenta[v] === 1 ? 0 : 1]}`);
  const textoCompartir =
    `${siglas} propone: «${p.titulo}». Valoraciones en ${crit.length} criterios: ` +
    `${reparto.length > 1 ? `${reparto.slice(0, -1).join(', ')} y ${reparto[reparto.length - 1]}` : reparto[0]}. El análisis, con fuentes:`;
  const lang = p.cita_traduccion ? IDIOMA_CITA[partidoId] : undefined;
  return (
    <article class={`card prop${abierta ? ' abierta' : ''}`} id={`prop-${p.id}`} tabIndex={-1}>
      <h3 class="prop-h">
        <button
          class="prop-fila"
          aria-expanded={abierta}
          aria-controls={`prop-${p.id}-cuerpo`}
          onClick={onToggle}
          onFocus={(ev) => {
            const cab = document.querySelector('.lp-columnas')?.getBoundingClientRect();
            const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
            if (cab && r.top < cab.bottom) window.scrollBy({ top: r.top - cab.bottom - 8, behavior: 'instant' });
          }}
        >
          <span class="q-tema prop-area">
            {n} · {p.area}
          </span>
          <span class="prop-titulo">
            {p.titulo} <span class="flecha" aria-hidden="true">{abierta ? '▾' : '▸'}</span>
          </span>
          {crit.map((c, k) => (
            <span key={c.id} class="celda" style={{ gridColumn: k + 2 }} aria-hidden="true" title={`${c.nombre}: ${VAL[p.evaluacion[c.id]?.valoracion ?? 'no_verificable']}. ${c.pregunta}`}>
              <Casilla v={p.evaluacion[c.id]?.valoracion ?? 'no_verificable'} />
            </span>
          ))}
          <span class="sr-only">
            {crit.map((c) => `${c.nombre}: ${VAL[p.evaluacion[c.id]?.valoracion ?? 'no_verificable']}`).join('; ')}
          </span>

        </button>
      </h3>
      {abierta && (
      <div class="prop-head" id={`prop-${p.id}-cuerpo`}>
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
        <div class="row" style={{ alignItems: 'flex-start' }}>
          <button class="btn" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? 'Ocultar el análisis' : 'Ver el análisis y las fuentes'}
          </button>
          <Compartir
            compacto
            texto={textoCompartir}
            url={enlace(`/contrasta/${partidoId}/${p.id}`)}
            titulo={`${siglas}: ${p.titulo} · vota con datos`}
          />
        </div>
      </div>
      )}
      {abierta && open && (
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
  const origen = origenOrden.value;
  const enRuta = ruta.value.split('/')[2] || '';
  // Sin partido en la dirección: el que elegiste o, si tienes resultado del paso 1, el más afín.
  const sel = enRuta || partidoPreferido.value || '';
  // Enlace compartido a una propuesta: #/contrasta/<partido>/<propuesta>
  const propSel = (ruta.value.split('/')[3] ?? '').split('?')[0];
  const p = partido(sel);
  const datos = sel ? d.partidos[sel] : undefined;
  const [explica, setExplica] = useState<string | null>(null);
  // La explicación de una columna se cierra al desplazar la lista (si no, tapa filas bajo la cabecera fija) y con Escape.
  useEffect(() => {
    if (!explica) return;
    const y0 = window.scrollY;
    const alDesplazar = () => Math.abs(window.scrollY - y0) > 40 && setExplica(null);
    const alTeclear = (e: KeyboardEvent) => e.key === 'Escape' && setExplica(null);
    window.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('keydown', alTeclear);
    return () => {
      window.removeEventListener('scroll', alDesplazar);
      window.removeEventListener('keydown', alTeclear);
    };
  }, [explica]);
  // Propuestas desplegadas (lista plegada, estudio de flujo del 15-nov). Un enlace a una propuesta la abre.
  const [abiertas, setAbiertas] = useState<Set<string>>(() => new Set(propSel ? [propSel] : []));
  const alternar = (id: string) =>
    setAbiertas((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const irA = (id: string) => {
    setAbiertas((s) => new Set(s).add(id));
    setTimeout(() => {
      const destino = document.getElementById(`prop-${id}`);
      destino?.scrollIntoView({ behavior: 'instant', block: 'start' });
      destino?.focus({ preventScroll: true });
    }, 30);
  };
  useEffect(() => {
    setAbiertas(new Set(propSel ? [propSel] : []));
  }, [sel]);
  useEffect(() => {
    if (!propSel) return;
    // Después de que la app lleve el foco al título y suba al principio (cambio de ruta).
    const t = setTimeout(() => irA(propSel), 120);
    return () => clearTimeout(t);
  }, [propSel, sel]);
  const evaluados = new Set(Object.entries(d.partidos).filter(([, v]) => v.estado === 'evaluado').map(([k]) => k));
  const afines = origen ? rankingActual.value.slice(0, 4) : [];
  // Lo que miras aquí pasa al paso 3 (también si llegas con un enlace a un partido).
  useEffect(() => {
    if (enRuta && partido(enRuta) && enRuta !== partidoPreferido.value) actualizar({ partido: enRuta });
  }, [enRuta]);
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
            {origen === 'fase1' ? 'Tus partidos más afines (paso 1):' : 'Tu orden de preferencia:'}{' '}
            {origen === 'fase1' && (
              <button class="link-btn" onClick={() => actualizar({ rankingOrigen: 'ninguno', partido: null })}>
                Quitar esta preselección
              </button>
            )}
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

      {!origen && paso1.value && e.rankingOrigen === 'ninguno' && (
        <p class="muted" style={{ fontSize: '0.85rem', margin: '0 0 14px' }}>
          Has quitado la preselección del paso 1.{' '}
          <button class="link-btn" onClick={() => actualizar({ rankingOrigen: null })}>
            Volver a usar mis partidos más afines
          </button>
        </p>
      )}

      <label class="field" style={{ maxWidth: 420 }}>
        {afines.length > 0 ? 'Otro partido' : 'Partido'}
        <select value={sel} onChange={(ev) => elegir((ev.target as HTMLSelectElement).value)}>
          <option value="">Elige partido…</option>
          {[
            { label: 'Programa analizado', xs: (partidos.value ?? []).filter((x) => evaluados.has(x.id) && d.partidos[x.id]?.base !== 'compromisos'), pend: false },
            { label: 'Sin programa: analizados los compromisos de sus líderes', xs: (partidos.value ?? []).filter((x) => d.partidos[x.id]?.base === 'compromisos'), pend: false },
            { label: 'Pendientes', xs: (partidos.value ?? []).filter((x) => !evaluados.has(x.id)), pend: true },
          ]
            // Un grupo vacío no se muestra (p. ej. «Pendientes» cuando ya están todos analizados).
            .filter((g) => g.xs.length > 0)
            .map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.xs.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.siglas} — {g.pend ? (x.programa.estado === 'publicado' ? 'análisis en curso' : 'sin programa aún') : x.nombre}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>
      </label>

      <div class="stack" style={{ marginTop: 22 }}>
        {!sel && <div class="note">Elige un partido, o llega aquí desde el paso 1 con tus partidos más afines.</div>}
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
            {/* La lista es la tabla (prototipo A, elegido por el editor el 15-nov): cada propuesta es una fila con sus 8
                valoraciones en columnas rotuladas; la cabecera de columnas queda fija al desplazarse. */}
            <section class="lista-props">
              <div class="lp-intro">
                <div class="row between" style={{ rowGap: 0 }}>
                  <h2 class="h3" style={{ margin: 0 }}>
                    {p.siglas}: {datos.propuestas.length} propuestas {datos.base === 'compromisos' ? 'de sus compromisos' : 'de su programa'}
                  </h2>
                  {(() => {
                    const todas = [...datos.propuestas, ...(datos.complemento ?? [])].map((x) => x.id);
                    const todasAbiertas = todas.every((id) => abiertas.has(id));
                    return (
                      <button class="link-btn desplegar-todas" onClick={() => setAbiertas(todasAbiertas ? new Set() : new Set(todas))}>
                        {todasAbiertas ? 'Plegar todas' : 'Desplegar todas'}
                      </button>
                    );
                  })()}
                </div>
                <p class="muted" style={{ fontSize: '0.85rem', margin: '4px 0 8px' }}>
                  Toca una propuesta para ver la cita, el análisis y las fuentes.{' '}
                  {datos.base === 'compromisos' ? (
                    p.programa.estado === 'publicado' ? 'Su programa se está analizando: de momento salen de sus compromisos públicos.' : 'Sin programa publicado: salen de sus compromisos públicos.'
                  ) : (
                    <a href={p.programa.url ?? '#'} target="_blank" rel="noopener">
                      Programa oficial{p.programa.programa_de ? ` del ${partido(p.programa.programa_de)?.siglas ?? p.programa.programa_de}` : ''}
                    </a>
                  )}
                  {datos.base !== 'compromisos' && p.programa.aviso ? ' (copia archivada: el partido lo retiró de su web el 18-nov)' : ''}
                </p>
                <Leyenda />
                <details class="desplegable que-mide">
                  <summary>¿Qué mide cada columna?</summary>
                  <dl>
                    {fase3.value!.criterios.map((c) => (
                      <div key={c.id}>
                        <dt>{CORTO[c.id] ?? c.nombre}</dt>
                        <dd>{c.pregunta}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
                <details class="desplegable mas-info">
                  <summary>Más sobre estas propuestas</summary>
                  {p.nota_coalicion && <p class="muted" style={{ fontSize: '0.85rem', margin: '8px 0 0' }}>{p.nota_coalicion}</p>}
              {datos.base === 'compromisos' ? (
                <p class="muted" style={{ fontSize: '0.85rem', margin: '8px 0 0' }}>
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
                <p class="muted" style={{ fontSize: '0.85rem', margin: '8px 0 0' }}>
                  Propuestas del{' '}
                  <a href={p.programa.url ?? '#'} target="_blank" rel="noopener">
                    programa oficial{p.programa.programa_de ? ` del ${partido(p.programa.programa_de)?.siglas ?? p.programa.programa_de}` : ''}
                  </a>{' '}
                  ({p.programa.paginas} páginas{p.programa.fecha ? `, ${fmt.fecha(p.programa.fecha)}` : ''}), leído completo
                  {p.programa.programa_de ? `. ${p.articulo ? `${p.articulo[0].toUpperCase()}${p.articulo.slice(1)} ` : ''}${p.siglas} no ha publicado uno propio: asume este y solo le añade cuestiones de su ámbito` : ''}
                  {(datos.complemento?.length ?? 0) > 0
                    ? ', y, al final, compromisos públicos de sus líderes que no están en el programa'
                    : ''}
                  . <a href="#/metodologia">Cómo se hace</a>.
                  {p.programa.aviso ? ` ${p.programa.aviso}` : ''}
                </p>
              )}
                </details>
              </div>
              <div class="lp-columnas" role="presentation" onPointerLeave={(ev) => ev.pointerType === 'mouse' && setExplica(null)}>
                <span />
                {fase3.value!.criterios.map((c) => (
                  <button
                    key={c.id}
                    class={`lp-col${explica === c.id ? ' on' : ''}`}
                    aria-expanded={explica === c.id}
                    aria-controls={explica === c.id ? 'lp-tip' : undefined}
                    aria-label={`${CORTO[c.id] ?? c.nombre}: qué mide esta columna`}
                    onClick={() => setExplica(c.id)}
                    onPointerEnter={(ev) => ev.pointerType === 'mouse' && setExplica(c.id)}
                  >
                    <span>{CORTO[c.id] ?? c.nombre}</span>
                  </button>
                ))}
                {(() => {
                  const c = fase3.value!.criterios.find((x) => x.id === explica);
                  return c ? (
                    <div class="lp-tip" id="lp-tip" role="tooltip">
                      <strong>{CORTO[c.id] ?? c.nombre}.</strong>{' '}
                      {c.pregunta}
                      <button class="lp-tip-x" aria-label="Cerrar la explicación" onClick={() => setExplica(null)}>
                        ✕
                      </button>
                    </div>
                  ) : null;
                })()}
              </div>
              {datos.propuestas.map((x, i) => (
                <TarjetaPropuesta key={`${sel}-${x.id}`} p={x} n={i + 1} partidoId={sel} destacada={x.id === propSel} abierta={abiertas.has(x.id)} onToggle={() => alternar(x.id)} />
              ))}
              {(datos.complemento?.length ?? 0) > 0 && (
                <>
                  <div class="lp-separador">
                    <h2 class="h3" style={{ margin: 0 }}>
                      Además del programa: compromisos de sus líderes
                    </h2>
                    <p class="muted" style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>
                      Medidas que sus líderes han prometido en público y que no figuran en el programa, con los mismos criterios.
                    </p>
                  </div>
                  {datos.complemento!.map((x, i) => (
                    <TarjetaPropuesta
                      key={`${sel}-${x.id}`}
                      p={x}
                      n={datos.propuestas.length + i + 1}
                      partidoId={sel}
                      destacada={x.id === propSel}
                      abierta={abiertas.has(x.id)}
                      onToggle={() => alternar(x.id)}
                    />
                  ))}
                </>
              )}
            </section>
            <Compartir
              compacto
              etiqueta="Compartir este análisis"
              texto={`${p.siglas}: ${datos.propuestas.length} propuestas centrales ${datos.base === 'compromisos' ? 'de sus compromisos de campaña' : 'de su programa'}, contrastadas una a una con fuentes en vota con datos:`}
              url={enlace(`/contrasta/${sel}`)}
              titulo={`${p.siglas}, contrastado · vota con datos`}
            />
            <a
              class="siguiente p3"
              style={{ marginTop: 0 }}
              href="#/suma"
              onClick={() => {
                if (sel !== partidoPreferido.value) actualizar({ partido: sel });
              }}
            >
              <span class="muted">Paso 3 · Suma</span>
              <strong>¿Tu voto a {p.siglas} tendrá escaño en tu provincia?</strong>
              <span aria-hidden="true">→</span>
            </a>
          </>
        )}
        {sel && <Promesas id={sel} />}
      </div>
      {/* Un solo paso al 3: el del partido que estás viendo (que pasa preseleccionado); el genérico, solo si no hay partido. */}
      {!(datos?.estado === 'evaluado' && p) && <Siguiente desde="contrasta" />}
    </div>
  );
}
