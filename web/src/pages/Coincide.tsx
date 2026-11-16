import { Fragment } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { actualizar, estado, ir, ruta } from '../store';
import { fase1, fmt, partido, partidos } from '../data';
import { afinidad, AVISO_COBERTURA, UMBRAL_EMPATE, vigentes, type Valor } from '../engine/match';
import { CabeceraPaso, Siguiente } from '../brand';
import type { Pregunta } from '../types';
import { Compartir, enlace } from '../compartir';
import { paso1 } from '../paso1';
import { conPesoPorTema, GRUPOS, grupoDe } from '../temasImportantes';

const ESCALA: { v: Valor; t: string }[] = [
  { v: -2, t: 'Muy en contra' },
  { v: -1, t: 'En contra' },
  { v: 0, t: 'Neutral' },
  { v: 1, t: 'A favor' },
  { v: 2, t: 'Muy a favor' },
];
const etiqueta = (v: number | null | undefined) => ESCALA.find((e) => e.v === v)?.t ?? 'Sin posición conocida';

export function EstadoProgramas() {
  const ps = partidos.value ?? [];
  return (
    <div class="scroll-x">
      <table>
        <thead>
          <tr>
            <th>Partido</th>
            <th>Programa para el 29-N</th>
            <th class="num">Compromisos de campaña</th>
          </tr>
        </thead>
        <tbody>
          {ps.map((p) => (
            <tr key={p.id}>
              <td>
                <strong>{p.siglas}</strong>
                <div class="muted" style={{ fontSize: '0.8rem' }}>
                  {p.nombre}
                </div>
              </td>
              <td>
                {p.programa.estado === 'publicado' ? (
                  <a href={p.programa.url ?? '#'} target="_blank" rel="noopener">
                    Publicado {p.programa.fecha ? `el ${fmt.fecha(p.programa.fecha)}` : ''}
                  </a>
                ) : p.programa.estado === 'asumido' ? (
                  <a href={p.programa.url ?? '#'} target="_blank" rel="noopener">
                    Asume el del {partido(p.programa.programa_de)?.siglas ?? p.programa.programa_de}
                  </a>
                ) : (
                  <span class="pill">Aún no publicado</span>
                )}
              </td>
              <td class="num">{p.promesas?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p class="muted" style={{ fontSize: '0.82rem', marginTop: 8 }}>
        Última comprobación: {fmt.fecha(ps[0]?.programa.comprobado)}.
      </p>
    </div>
  );
}

function Intro({ n, onStart, hechas }: { n: number; onStart: () => void; hechas: number }) {
  return (
    <div class="card stack">
      <p style={{ fontSize: '1.05rem' }}>
        Vas a ver <strong>{n} afirmaciones</strong>. Cada una sale de una propuesta real de estas elecciones: de un programa oficial o de lo que
        los líderes de un partido han propuesto en público. No te decimos de quién es hasta el final, para que juzgues la idea y no las siglas.
      </p>
      <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--ink-2)' }}>
        <li>
          Responde en cinco niveles, de <em>Muy en contra</em> a <em>Muy a favor</em>. <em>Neutral</em> es estar ni a favor ni en contra: cuenta
          en tu afinidad. Si no lo sabes o prefieres no responder, pulsa <em>No lo sé</em>: esa afirmación no cuenta.
        </li>
        <li>Al terminar, podrás marcar los temas que más te importan: sus afirmaciones contarán el doble.</li>
        <li>Unos 10 minutos. Tus respuestas no salen de tu navegador.</li>
      </ul>
      <div class="row">
        <button class="btn primary" onClick={onStart}>
          {hechas > 0 ? 'Continuar' : 'Empezar'}
        </button>
        {hechas > 0 && (
          <a class="btn" href="#/coincide/resultados">
            Ver mis resultados
          </a>
        )}
      </div>
    </div>
  );
}

function Tarjeta({ q, i, n, onNext, onPrev }: { q: Pregunta; i: number; n: number; onNext: () => void; onPrev: () => void }) {
  const r = estado.value.respuestas[q.id];
  const set = (valor: Valor | null, ev?: MouseEvent) => {
    actualizar({ respuestas: { ...estado.value.respuestas, [q.id]: { valor } } });
    // Con ratón o dedo (detail > 0), se suelta el foco: si no, el botón de la misma posición en la afirmación
    // siguiente se vería con el contorno, como si ya estuviera marcado. Con teclado (detail = 0) el foco se queda.
    if (ev && ev.detail > 0) (ev.currentTarget as HTMLElement | null)?.blur();
    setTimeout(onNext, 140);
  };
  // Al empezar, el foco va al texto de la primera afirmación. Al pasar a la siguiente, el foco se queda en los
  // botones de respuesta (sin pulsar Tab de más en cada una) y la nueva afirmación se anuncia por la región viva.
  const texto = useRef<HTMLParagraphElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [masContexto, setMasContexto] = useState(false);
  useEffect(() => {
    texto.current?.focus({ preventScroll: true });
  }, []);
  // Al pasar de afirmación, la vista vuelve a su principio (sin mover el foco): se lee la frase antes de responder.
  useEffect(() => {
    setMasContexto(false);
    const el = caja.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [q.id]);
  const hechas = Object.values(vigentes(estado.value.respuestas, fase1.value!.preguntas.map((x) => x.id))).filter((x) => x.valor !== null).length;
  const largo = (q.contexto?.length ?? 0) > 170;
  return (
    <div ref={caja} class="cuestionario">
      <div
        class="progress"
        role="progressbar"
        aria-label="Progreso del cuestionario"
        aria-valuenow={i + 1}
        aria-valuemin={1}
        aria-valuemax={n}
        aria-valuetext={`Afirmación ${i + 1} de ${n}`}
      >
        <i style={{ width: `${((i + 1) / n) * 100}%` }} />
      </div>
      <div class="card q-card">
        <div class="row between">
          <span class="q-tema">{q.tema}</span>
          <span class="muted">
            {i + 1} / {n}
          </span>
        </div>
        <p class="q-text" ref={texto} tabIndex={-1}>
          {q.texto}
        </p>
        <p class="sr-only" aria-live="polite">{`Afirmación ${i + 1} de ${n}: ${q.texto}`}</p>
        {q.contexto && (
          <p class={`muted${largo && !masContexto ? ' recortado' : ''}`} style={{ fontSize: '0.93rem' }}>
            {q.contexto}{' '}
            {q.contexto_fuente && (
              <a href={q.contexto_fuente} target="_blank" rel="noopener">
                Fuente
              </a>
            )}
          </p>
        )}
        {q.contexto && largo && (
          <button class="link-btn mas-contexto" aria-expanded={masContexto} onClick={() => setMasContexto(!masContexto)}>
            {masContexto ? 'Menos contexto' : 'Más contexto'}
          </button>
        )}
        {q.contexto_mas && (
          <details class="desplegable contexto-mas" key={q.id}>
            <summary>{q.contexto_mas.titulo}</summary>
            {q.contexto_mas.intro && <p class="muted">{q.contexto_mas.intro}</p>}
            <ul class="muted">
              {q.contexto_mas.puntos.map((t, k) => (
                <li key={k}>{t}</li>
              ))}
            </ul>
            {q.contexto_mas.fuente && (
              <p class="muted">
                <a href={q.contexto_mas.fuente} target="_blank" rel="noopener">
                  Fuente
                </a>
              </p>
            )}
          </details>
        )}
        <div class="likert" role="group" aria-label="Tu respuesta">
          {ESCALA.map((e) => (
            <button key={e.v} class={r?.valor === e.v ? 'on' : ''} onClick={(ev) => set(e.v, ev)} aria-pressed={r?.valor === e.v}>
              {e.t}
            </button>
          ))}
        </div>
        {/* «No lo sé» (antes «Saltar»): a todo lo ancho, bajo la escala, para que no se confunda con «Neutral», que sí cuenta. */}
        <button
          class={`no-lo-se${r && !r.sinResponder && r.valor === null ? ' on' : ''}`}
          aria-pressed={!!r && !r.sinResponder && r.valor === null}
          onClick={(ev) => set(null, ev)}
        >
          No lo sé
        </button>
        <div class="row between" style={{ marginTop: 10 }}>
          <button class="btn ghost" onClick={onPrev} disabled={i === 0}>
            ← Anterior
          </button>
        </div>
      </div>
      {hechas >= 10 ? (
        <a class="btn" href="#/coincide/temas" style={{ marginTop: 14 }}>
          Ver mis resultados ya ({hechas} respondidas; cuantas más, más fiable)
        </a>
      ) : (
        <p class="muted" style={{ fontSize: '0.85rem', marginTop: 12 }}>
          <a href="#/coincide/resultados">Ir a los resultados</a> cuando quieras (mínimo 5 respuestas).
        </p>
      )}
    </div>
  );
}

function Detalle({ partidoId }: { partidoId: string }) {
  const d = fase1.value!;
  const e = estado.value;
  const pos = d.posiciones[partidoId] ?? {};
  const siglas = partido(partidoId)?.siglas ?? partidoId;
  // Solo los temas comparables: los que respondiste y en los que conocemos la posición del partido.
  const respondidas = d.preguntas.filter((q) => e.respuestas[q.id]?.valor !== null && e.respuestas[q.id]?.valor !== undefined);
  const comunes = respondidas
    .filter((q) => pos[q.id]?.valor !== null && pos[q.id]?.valor !== undefined)
    .map((q) => ({ q, u: e.respuestas[q.id]!.valor as number, p: pos[q.id]!, dist: Math.abs((e.respuestas[q.id]!.valor as number) - (pos[q.id]!.valor as number)) }))
    .sort((a, b) => a.dist - b.dist);
  const sinPosicion = respondidas.length - comunes.length;
  // Por el lado en que está cada uno, no por la distancia: un Neutral frente a «A favor» es «A medias», no «Coincidís».
  const grado = (u: number, p: number) => (u === p || u * p > 0 ? 'Coincidís' : u * p < 0 ? 'Discrepáis' : 'A medias');
  const n = { Coincidís: 0, 'A medias': 0, Discrepáis: 0 } as Record<string, number>;
  comunes.forEach((c) => n[grado(c.u, c.p.valor as number)]++);
  return (
    <div class="prop-body" style={{ margin: '0 0 12px', borderRadius: 10 }}>
      <p style={{ marginTop: 12 }}>
        <strong>
          {comunes.length} {comunes.length === 1 ? 'tema comparado' : 'temas comparados'}
        </strong>
        : coincidís en {n['Coincidís']}, a medias en {n['A medias']} y discrepáis en {n['Discrepáis']}.
        {sinPosicion > 0 && (
          <span class="muted">
            {' '}
            En otras {sinPosicion} de tus respuestas no conocemos la posición de {siglas}.
          </span>
        )}
      </p>
      {comunes.map(({ q, u, p }) => (
        <div class="crit" key={q.id}>
          <h3 class="h4">{q.texto}</h3>
          <p>
            <span class="pill">{grado(u, p.valor as number)}</span> Tú: <strong>{etiqueta(u)}</strong> · {siglas}: <strong>{etiqueta(p.valor)}</strong>
          </p>
          {p.cita && (
            <>
              <span class="fuente-tag">
                {p.fuente === 'campaña' ? 'Lo dijo en público' : 'Programa oficial'}
              </span>
              <p class="quote">
                «{p.cita}»{' '}
                {p.fuente !== 'campaña' && p.pagina ? <span class="muted">(p. {p.pagina})</span> : null}
              </p>
              {p.fuente === 'campaña' && (
                <p class="muted" style={{ fontSize: '0.85rem' }}>
                  — {p.quien}
                  {p.formato ? `, ${p.formato}` : ''}
                  {p.fecha ? `, ${fmt.fecha(p.fecha)}` : ''}
                  {p.url && (
                    <>
                      {' · '}
                      <a href={p.url} target="_blank" rel="noopener">
                        {p.medio ?? 'fuente'}
                      </a>
                    </>
                  )}
                  {p.marco
                    ? ` · Precampaña, referida a estas elecciones: «${p.marco}»`
                    : p.fecha && p.fecha < '2026-10-06'
                      ? ' · Antes de la convocatoria de estas elecciones'
                      : ''}
                </p>
              )}
            </>
          )}
          {p.nota && <p class="muted">{p.nota}</p>}
        </div>
      ))}
    </div>
  );
}

/** «¿Qué temas te importan más?» al terminar el cuestionario: dos niveles (marcado o no); los marcados cuentan el doble. */
function TemasImportantes() {
  const d = fase1.value!;
  const e = estado.value;
  const marcados = e.temasImportantes ?? [];
  const cuantas = (g: (typeof GRUPOS)[number]) => d.preguntas.filter((q) => grupoDe(q.tema)?.id === g.id).length;
  const alternar = (id: string) =>
    actualizar({ temasImportantes: marcados.includes(id) ? marcados.filter((x) => x !== id) : [...marcados, id] });
  return (
    <div class="stack temas-imp">
      <div>
        <h2 class="h3" style={{ margin: '0 0 4px' }}>
          ¿Qué temas te importan más?
        </h2>
        <p class="muted" style={{ margin: 0 }}>
          Marca los que más pesan en tu voto: sus afirmaciones contarán el doble en tu afinidad. Puedes no marcar ninguno.
        </p>
      </div>
      <div class="temas-rejilla" role="group" aria-label="Temas que te importan más">
        {GRUPOS.filter((g) => cuantas(g) > 0).map((g) => {
          const on = marcados.includes(g.id);
          return (
            <button key={g.id} class={`tema-card${on ? ' on' : ''}`} aria-pressed={on} onClick={() => alternar(g.id)}>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d={g.icono} />
              </svg>
              <span class="tema-nombre">{g.nombre}</span>
              {g.incluye && <span class="tema-incluye">{g.incluye}</span>}
              <span class="tema-n">
                {cuantas(g)} {cuantas(g) === 1 ? 'afirmación' : 'afirmaciones'}
              </span>
              <span class="tema-check" aria-hidden="true">
                {on ? '✓' : ''}
              </span>
            </button>
          );
        })}
      </div>
      <div class="row" style={{ alignItems: 'center' }}>
        <a class="btn primary" href="#/coincide/resultados">
          {marcados.length ? `Ver mis resultados (${marcados.length} ${marcados.length === 1 ? 'tema cuenta' : 'temas cuentan'} el doble) →` : 'Ver mis resultados →'}
        </a>
        {marcados.length > 0 && (
          <button class="link-btn" onClick={() => actualizar({ temasImportantes: [] })}>
            Quitar todos
          </button>
        )}
      </div>
    </div>
  );
}

function Resultados() {
  const d = fase1.value!;
  const e = estado.value;
  const posiciones = useMemo(() => {
    const out: Record<string, Record<string, Valor | null>> = {};
    for (const [p, qs] of Object.entries(d.posiciones)) {
      out[p] = {};
      for (const [q, pos] of Object.entries(qs)) out[p][q] = pos.valor;
    }
    return out;
  }, [d]);
  const ids = d.preguntas.map((q) => q.id);
  // Partidos de los que no conocemos ninguna posición: van en un aviso aparte, no en la lista.
  const sinPosiciones = (partidos.value ?? []).filter((p) => !Object.values(d.posiciones[p.id] ?? {}).some((x) => x.valor !== null));
  const res = afinidad(conPesoPorTema(e.respuestas, d.preguntas, e.temasImportantes), posiciones, ids).filter((r) => !sinPosiciones.some((p) => p.id === r.partido));
  const respondidas = Object.values(vigentes(e.respuestas, ids)).filter((r) => r.valor !== null).length;
  const neutrales = Object.values(vigentes(e.respuestas, ids)).filter((r) => r.valor === 0).length;
  const [abierto, setAbierto] = useState<string | null>(null);
  const evaluables = res.filter((r) => r.afinidad !== null);

  // Los pasos 2 y 3 usan siempre este resultado (paso1.ts), recalculado con tus respuestas y los datos de hoy. Ir desde
  // aquí lo vuelve a activar si lo habías quitado a mano, y deja que el paso 2 empiece por el partido más afín.
  const continuar = (ruta: string) => {
    actualizar({ rankingOrigen: null, partido: null });
    ir(ruta);
  };
  const comparables = res.filter((r) => r.comparable && r.afinidad !== null);
  const primeros = (comparables.length ? comparables : evaluables).slice(0, 3);

  if (respondidas < 5)
    return (
      <div class="note">
        Has respondido {respondidas} afirmaciones. Hacen falta al menos 5 para calcular tu afinidad con los partidos.{' '}
        <a href="#/coincide">Volver al cuestionario</a>
      </div>
    );

  return (
    <div class="stack">
      {primeros.length > 0 && (
        <section class="card siguientes-paso1">
          <h2 class="h3" style={{ margin: 0 }}>
            Tus partidos más afines:{' '}
            {primeros.map((r, i) => (
              <Fragment key={r.partido}>
                {/* El separador va fuera del bloque sin cortes: así la línea puede partirse entre partidos. */}
                {i > 0 ? (i === primeros.length - 1 ? ' y ' : ', ') : ''}
                <span class="nowrap">
                  {partido(r.partido)?.siglas ?? r.partido} ({fmt.pct(r.afinidad!)})
                </span>
              </Fragment>
            ))}
          </h2>
          <p class="muted" style={{ fontSize: '0.9rem', margin: '6px 0 14px' }}>
            Con este resultado seguimos: el paso 2 empieza por tus partidos más afines y el paso 3 los usa para señalarte una papeleta con opciones si la tuya tiene pocas.
            Allí puedes quitarlo o cambiarlo.
          </p>
          <button class="btn primary" onClick={() => continuar(`/contrasta/${primeros[0].partido}`)} style={{ '--c': 'var(--p2)' } as any}>
            Paso 2: contrastar sus propuestas →
          </button>
          <p style={{ margin: '12px 0 0', fontSize: '0.92rem' }}>
            O, si ya sabes a quién votar,{' '}
            <button class="link-btn" onClick={() => continuar('/cuenta')}>
              ve directamente al paso 3: ¿tendrá escaño tu voto? →
            </button>
          </p>
        </section>
      )}
      <p class="temas-marcados">
        {(e.temasImportantes ?? []).length > 0 ? (
          <>
            <span class="muted">Cuentan el doble:</span>{' '}
            {GRUPOS.filter((g) => e.temasImportantes!.includes(g.id)).map((g) => g.nombre).join(' · ')}
          </>
        ) : (
          <span class="muted">No has marcado temas importantes: todas tus respuestas cuentan igual.</span>
        )}{' '}
        <a href="#/coincide/temas">{(e.temasImportantes ?? []).length > 0 ? 'Cambiar' : 'Elegir temas'}</a>
      </p>
      <div class="note">
        <strong>No es una recomendación de voto: es un espejo de tus respuestas</strong>, comparadas con la posición de cada partido, con
        cita y fuente.
        {neutrales * 2 > respondidas && (
          <p style={{ margin: '8px 0 0' }}>La mayoría de tus respuestas son Neutral, así que el resultado apenas distingue entre partidos.</p>
        )}
        <details class="desplegable" style={{ marginTop: 8 }}>
          <summary>Cómo se calcula</summary>
          <p style={{ margin: '8px 0 0' }}>
            Con cada partido comparamos las afirmaciones que respondiste y en las que conocemos su posición: cuanto más cerca, más
            afinidad. Si dos partidos se separan menos de {Math.round(UMBRAL_EMPATE * 100)} puntos, los damos por empatados.{' '}
            <span class="muted">{d.meta.nota}</span>
          </p>
        </details>
      </div>
      {[
        // Redactado como cruce de tus respuestas con lo que ha dicho el partido, no como «nos faltan datos» (aviso de un usuario, 16-nov).
        { t: 'Con bastantes temas en común', d: 'El partido se ha pronunciado en al menos la mitad de las afirmaciones que respondiste.', filas: res.filter((r) => r.comparable) },
        {
          t: 'Con pocos temas en común',
          d: 'El partido se ha pronunciado en menos de la mitad de las afirmaciones que respondiste: tómalo solo como orientación.',
          filas: res.filter((r) => !r.comparable && r.afinidad !== null),
        },
        {
          t: 'Sin bastantes temas en común',
          d: 'El partido se ha pronunciado en menos de 5 de las afirmaciones que respondiste, así que no calculamos su porcentaje.',
          filas: res.filter((r) => r.afinidad === null),
        },
      ]
        .filter((g) => g.filas.length > 0)
        .map((g) => (
          <section class="card" key={g.t}>
            <h2 class="h3" style={{ marginBottom: 2 }}>
              {g.t}
            </h2>
            <p class="muted" style={{ fontSize: '0.88rem' }}>{g.d}</p>
            {g.filas.map((r, idx) => {
              const p = partido(r.partido);
              const topG = g.filas[0].afinidad ?? 0;
              const empate = r.afinidad !== null && idx > 0 && topG - r.afinidad < UMBRAL_EMPATE;
              return (
                <div key={r.partido}>
                  <div class="rank-item">
                    <div class="rank-pos">{r.afinidad !== null ? idx + 1 : '–'}</div>
                    <div>
                      <div class="row" style={{ gap: 6 }}>
                        <strong>{p?.siglas ?? r.partido}</strong>
                        {empate && <span class="pill">empatado con el primero</span>}
                        {r.afinidad !== null && r.cobertura < AVISO_COBERTURA && (
                          <span class="muted" style={{ fontSize: '0.8rem' }}>· basado en {r.comunes} de tus {r.respondidas} respuestas</span>
                        )}
                        {p?.ambito === 'autonómico' && <span class="pill">solo en {p.comunidades?.join(', ')}</span>}
                      </div>
                      {r.afinidad !== null && (
                        <div class="bar" style={{ marginTop: 8, opacity: r.comparable ? 1 : 0.55 }}>
                          <i style={{ width: `${r.afinidad * 100}%` }} />
                        </div>
                      )}
                      {r.comunes > 0 && (
                        <button
                          class="btn ghost"
                          style={{ padding: '6px 0', fontSize: '0.88rem' }}
                          aria-expanded={abierto === r.partido}
                          onClick={() => setAbierto(abierto === r.partido ? null : r.partido)}
                        >
                          {abierto === r.partido ? 'Ocultar detalle' : r.comunes === 1 ? 'Ver el tema comparado' : `Ver los ${r.comunes} temas comparados`}
                        </button>
                      )}
                    </div>
                    <div class="rank-val">{r.afinidad !== null ? fmt.pct(r.afinidad) : <small>{r.comunes} {r.comunes === 1 ? 'tema' : 'temas'}</small>}</div>
                  </div>
                  {abierto === r.partido && <Detalle partidoId={r.partido} />}
                </div>
              );
            })}
          </section>
        ))}
      {(() => {
        // Solo los de «con datos suficientes» (si no hay ninguno, los que tienen porcentaje); como mucho tres.
        const top = primeros;
        if (!top.length) return null;
        const lista = top.map((r) => `${partido(r.partido)?.siglas ?? r.partido} (${fmt.pct(r.afinidad!)})`);
        const texto =
          `Mi afinidad en vota con datos: ${lista.length > 1 ? `${lista.slice(0, -1).join(', ')} y ${lista[lista.length - 1]}` : lista[0]}. ` +
          'Cada posición de los partidos, con cita y fuente. Haz tu test:';
        return (
          <section class="card">
            <h2 class="h3" style={{ marginBottom: 4 }}>Compartir tu resultado</h2>
            <p class="muted" style={{ fontSize: '0.88rem', margin: '0 0 12px' }}>
              Se comparten tus {top.length === 1 ? 'partido más afín' : `${top.length} partidos más afines`} y un enlace al test, no tus respuestas.
            </p>
            <Compartir texto={texto} url={enlace('/coincide')} titulo="Mi afinidad en vota con datos" />
          </section>
        );
      })()}
      {sinPosiciones.length > 0 && (
        <div class="note">
          Todavía no conocemos ninguna posición con cita de estos partidos, así que no aparecen en la lista:{' '}
          {sinPosiciones.map((p) => p.siglas).join(', ')}.
        </div>
      )}
      <div class="row">
        <a class="btn ghost" href="#/coincide">
          Revisar respuestas
        </a>
        <button
          class="btn ghost"
          onClick={() => {
            if (confirm('¿Borrar todas tus respuestas?')) actualizar({ respuestas: {}, ranking: [], rankingOrigen: null });
          }}
        >
          Borrar mis respuestas
        </button>
      </div>
    </div>
  );
}

export function Coincide() {
  const d = fase1.value;
  const sub = ruta.value.includes('resultados');
  const temas = ruta.value.startsWith('/coincide/temas');
  const [i, setI] = useState<number | null>(null);
  // Solo cuentan las afirmaciones vigentes; se continúa por la primera sin responder (o saltar).
  const contestada = (id: string) => !!estado.value.respuestas[id] && !estado.value.respuestas[id].sinResponder;
  const hechas = d ? d.preguntas.filter((q) => contestada(q.id)).length : 0;
  const primeraPendiente = d ? d.preguntas.findIndex((q) => !contestada(q.id)) : -1;

  let body;
  if (!d || d.preguntas.length === 0) {
    body = (
      <div class="stack">
        <div class="note">
          <strong>El cuestionario se está preparando.</strong> Las afirmaciones y las posiciones de cada partido salen de los programas oficiales
          para el 29-N y de lo que sus líderes han propuesto en público en esta campaña, con cita y fuente. {d?.meta.nota}
        </div>
        <EstadoProgramas />
      </div>
    );
  } else if (temas) {
    body = <TemasImportantes />;
  } else if (sub) {
    body = <Resultados />;
  } else if (i === null) {
    body = <Intro n={d.preguntas.length} hechas={hechas} onStart={() => setI(primeraPendiente >= 0 ? primeraPendiente : d.preguntas.length - 1)} />;
  } else {
    const n = d.preguntas.length;
    body = (
      <Tarjeta
        q={d.preguntas[i]}
        i={i}
        n={n}
        onPrev={() => setI(Math.max(0, i - 1))}
        onNext={() => (i + 1 < n ? setI(i + 1) : ir('/coincide/temas'))}
      />
    );
  }
  return (
    <div class="narrow page p1">
      <CabeceraPaso id="coincide" compacta={(!sub && !temas && i !== null) || temas}>
        {sub ? 'Tus resultados, con la fuente de cada posición.' : 'Propuestas reales de esta campaña, sin siglas. Al final, con quién coincides y en qué.'}
      </CabeceraPaso>
      {body}
      {/* En los resultados, el recuadro de arriba ya lleva a los pasos 2 y 3 con este resultado. */}
      {/* Ni en el cuestionario (invitaría a dejarlo) ni en los resultados (ya llevan a los pasos 2 y 3). */}
      {!sub && !temas && i === null && <Siguiente desde="coincide" />}
      {sub && !paso1.value && <Siguiente desde="coincide" />}
    </div>
  );
}
