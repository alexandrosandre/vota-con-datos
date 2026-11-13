import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { actualizar, estado, ir, ruta } from '../store';
import { fase1, fmt, partido, partidos } from '../data';
import { afinidad, AVISO_COBERTURA, UMBRAL_EMPATE, vigentes, type Valor } from '../engine/match';
import { CabeceraPaso, Siguiente } from '../brand';
import type { Pregunta } from '../types';

const ESCALA: { v: Valor; t: string }[] = [
  { v: -2, t: 'Muy en contra' },
  { v: -1, t: 'En contra' },
  { v: 0, t: 'Neutral' },
  { v: 1, t: 'A favor' },
  { v: 2, t: 'Muy a favor' },
];
const PESOS: { w: 0.5 | 1 | 2; t: string }[] = [
  { w: 0.5, t: 'Me importa poco' },
  { w: 1, t: 'Normal' },
  { w: 2, t: 'Me importa mucho' },
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
        <li>Responde en cinco niveles, de <em>Muy en contra</em> a <em>Muy a favor</em>. Pulsa <em>Saltar</em> si no lo sabes, no quieres contestar o no te importa: lo que saltas no cuenta.</li>
        <li>Si un tema te importa mucho (o poco), márcalo: pesa el doble (o la mitad).</li>
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
  const set = (valor: Valor | null) => {
    actualizar({ respuestas: { ...estado.value.respuestas, [q.id]: { valor, peso: r?.peso ?? 1 } } });
    setTimeout(onNext, 140);
  };
  const setPeso = (peso: 0.5 | 1 | 2) =>
    actualizar({ respuestas: { ...estado.value.respuestas, [q.id]: { valor: r?.valor ?? null, peso } } });
  // Al empezar, el foco va al texto de la primera afirmación. Al pasar a la siguiente, el foco se queda en los
  // botones de respuesta (sin pulsar Tab de más en cada una) y la nueva afirmación se anuncia por la región viva.
  const texto = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    texto.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div>
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
          <p class="muted" style={{ fontSize: '0.93rem' }}>
            {q.contexto}{' '}
            {q.contexto_fuente && (
              <a href={q.contexto_fuente} target="_blank" rel="noopener">
                Fuente
              </a>
            )}
          </p>
        )}
        <div class="likert" role="group" aria-label="Tu respuesta">
          {ESCALA.map((e) => (
            <button key={e.v} class={r?.valor === e.v ? 'on' : ''} onClick={() => set(e.v)} aria-pressed={r?.valor === e.v}>
              {e.t}
            </button>
          ))}
        </div>
        <div class="row between" style={{ marginTop: 14 }}>
          <div class="row" role="group" aria-label="Importancia" style={{ gap: 6 }}>
            {PESOS.map((p) => (
              <button key={p.w} class={`star ${(r?.peso ?? 1) === p.w ? 'on' : ''}`} onClick={() => setPeso(p.w)} aria-pressed={(r?.peso ?? 1) === p.w}>
                {p.t}
              </button>
            ))}
          </div>
          <div class="row" style={{ gap: 4 }}>
            <button class="btn ghost" onClick={onPrev} disabled={i === 0}>
              ← Anterior
            </button>
            <button class="btn" onClick={() => set(null)}>
              Saltar
            </button>
          </div>
        </div>
      </div>
      <p class="muted" style={{ fontSize: '0.85rem', marginTop: 12 }}>
        <a href="#/coincide/resultados">Ir a los resultados</a> cuando quieras (mínimo 5 respuestas).
      </p>
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
  const grado = (dist: number) => (dist <= 1 ? 'Coincidís' : dist >= 3 ? 'Discrepáis' : 'A medias');
  const n = { Coincidís: 0, 'A medias': 0, Discrepáis: 0 } as Record<string, number>;
  comunes.forEach((c) => n[grado(c.dist)]++);
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
      {comunes.map(({ q, u, p, dist }) => (
        <div class="crit" key={q.id}>
          <h3 class="h4">{q.texto}</h3>
          <p>
            <span class="pill">{grado(dist)}</span> Tú: <strong>{etiqueta(u)}</strong> · {siglas}: <strong>{etiqueta(p.valor)}</strong>
          </p>
          {p.cita && (
            <>
              <span class="fuente-tag">
                {p.fuente === 'campaña' ? 'Lo dijo en público' : 'Programa oficial'}
                {p.heredada_de ? ` · ${partido(p.heredada_de)?.siglas ?? p.heredada_de}` : ''}
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
                  {p.marco ? ` · Precampaña, referida a estas elecciones: «${p.marco}»` : ''}
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
  const res = afinidad(e.respuestas, posiciones, ids);
  const respondidas = Object.values(vigentes(e.respuestas, ids)).filter((r) => r.valor !== null).length;
  const [abierto, setAbierto] = useState<string | null>(null);
  const evaluables = res.filter((r) => r.afinidad !== null);
  const sinPosiciones = (partidos.value ?? []).filter((p) => !d.posiciones[p.id]);

  const guardar = () =>
    actualizar({
      ranking: evaluables.map((r) => r.partido),
      rankingOrigen: 'fase1',
      afinidades: Object.fromEntries(evaluables.map((r) => [r.partido, Math.round(r.afinidad!)])),
      partido: evaluables[0]?.partido ?? null,
    });

  if (respondidas < 5)
    return (
      <div class="note">
        Has respondido {respondidas} afirmaciones. Hacen falta al menos 5 para calcular tu afinidad con los partidos.{' '}
        <a href="#/coincide">Volver al cuestionario</a>
      </div>
    );

  return (
    <div class="stack">
      <div class="note">
        <strong>La afinidad</strong> mide cuánto se parecen tus respuestas a la posición de cada partido, con cita y fuente, en las{' '}
        {respondidas} afirmaciones que respondiste. No es una recomendación de voto: es un espejo. Si dos partidos se separan menos de{' '}
        {Math.round(UMBRAL_EMPATE * 100)} puntos, los damos por empatados: la diferencia es demasiado pequeña para tenerla en cuenta.{' '}
        <span class="muted">{d.meta.nota}</span>
      </div>
      {[
        { t: 'Con datos suficientes', d: 'Conocemos su posición en al menos la mitad de tus respuestas.', filas: res.filter((r) => r.comparable) },
        {
          t: 'Con pocos datos',
          d: 'Conocemos su posición en menos de la mitad de tus respuestas, normalmente porque aún no ha publicado programa. Su porcentaje se basa en pocos temas: tómalo solo como orientación.',
          filas: res.filter((r) => !r.comparable && r.afinidad !== null),
        },
        { t: 'Sin datos suficientes', d: 'Conocemos su posición en menos de 5 de tus respuestas, así que no calculamos su porcentaje.', filas: res.filter((r) => r.afinidad === null) },
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
                          <span class="pill">basado en {r.comunes} de tus {r.respondidas} respuestas</span>
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
      {sinPosiciones.length > 0 && (
        <div class="note">
          Todavía no conocemos ninguna posición con cita de estos partidos, así que no aparecen en la lista:{' '}
          {sinPosiciones.map((p) => p.siglas).join(', ')}.
        </div>
      )}
      <div class="row">
        <button
          class="btn primary"
          onClick={() => {
            guardar();
            ir(`/contrasta/${evaluables[0]?.partido ?? ''}`);
          }}
          style={{ '--c': 'var(--p2)' } as any}
        >
          Contrastar mis partidos más afines →
        </button>
        <button
          class="btn"
          onClick={() => {
            guardar();
            ir('/cuenta');
          }}
        >
          Ir directamente al paso 3
        </button>
        <a class="btn ghost" href="#/coincide">
          Revisar respuestas
        </a>
        <button
          class="btn ghost"
          onClick={() => {
            if (confirm('¿Borrar todas tus respuestas?')) actualizar({ respuestas: {}, ranking: [], rankingOrigen: null, afinidades: {} });
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
  const [i, setI] = useState<number | null>(null);
  // Solo cuentan las afirmaciones vigentes; se continúa por la primera sin responder (o saltar).
  const hechas = d ? d.preguntas.filter((q) => estado.value.respuestas[q.id]).length : 0;
  const primeraPendiente = d ? d.preguntas.findIndex((q) => !estado.value.respuestas[q.id]) : -1;

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
        onNext={() => (i + 1 < n ? setI(i + 1) : ir('/coincide/resultados'))}
      />
    );
  }
  return (
    <div class="narrow page p1">
      <CabeceraPaso id="coincide">
        {sub ? 'Tus resultados, con la fuente de cada posición.' : 'Propuestas reales de esta campaña, sin siglas. Al final, con quién coincides y en qué.'}
      </CabeceraPaso>
      {body}
      <Siguiente desde="coincide" />
    </div>
  );
}
