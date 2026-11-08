import { useMemo, useState } from 'preact/hooks';
import { actualizar, estado, ir, ruta } from '../store';
import { fase1, fmt, partido, partidos } from '../data';
import { afinidad, AVISO_COBERTURA, UMBRAL_EMPATE, type Valor } from '../engine/match';
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
const etiqueta = (v: number | null | undefined) => ESCALA.find((e) => e.v === v)?.t ?? 'Sin posición';

export function EstadoProgramas() {
  const ps = partidos.value ?? [];
  return (
    <div class="scroll-x">
      <table>
        <thead>
          <tr>
            <th>Partido</th>
            <th>Programa 29-N</th>
            <th>Comprobado</th>
          </tr>
        </thead>
        <tbody>
          {ps.map((p) => (
            <tr key={p.id}>
              <td>
                <strong>{p.siglas}</strong> <span class="muted">{p.nombre !== p.siglas ? p.nombre : ''}</span>
              </td>
              <td>
                {p.programa.estado === 'publicado' ? (
                  <a href={p.programa.url ?? '#'} target="_blank" rel="noopener">
                    Publicado {p.programa.fecha ? `(${fmt.fecha(p.programa.fecha)})` : ''}
                  </a>
                ) : (
                  <span class="pill">Pendiente de publicación</span>
                )}
              </td>
              <td class="muted">{fmt.fecha(p.programa.comprobado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Intro({ n, onStart, hechas }: { n: number; onStart: () => void; hechas: number }) {
  return (
    <div class="card stack">
      <p>
        Vas a ver <strong>{n} afirmaciones</strong>. Cada una nace de una propuesta real de algún programa del 29-N o de un compromiso
        público de un cabeza de lista, pero no te decimos de quién hasta el final, para que juzgues la idea y no las siglas.
      </p>
      <ul>
        <li>Responde en cinco niveles, o pulsa <em>Saltar</em> si no lo sabes, no quieres contestar o no te importa: no cuenta.</li>
        <li>Si un tema te importa mucho (o poco), dilo: pesa el doble (o la mitad).</li>
        <li>Unos 10 minutos. Tus respuestas no salen de tu navegador.</li>
      </ul>
      <div class="row">
        <button class="btn primary" onClick={onStart}>
          {hechas > 0 ? 'Continuar' : 'Empezar'}
        </button>
        {hechas > 0 && (
          <a class="btn" href="#/afinidad/resultados">
            Ver resultados
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
  return (
    <div>
      <div class="progress" role="progressbar" aria-valuenow={i + 1} aria-valuemax={n}>
        <i style={{ width: `${((i + 1) / n) * 100}%` }} />
      </div>
      <div class="card q-card">
        <div class="row" style={{ justifyContent: 'space-between' }}>
          <span class="q-tema">{q.tema}</span>
          <span class="muted">
            {i + 1} / {n}
          </span>
        </div>
        <p class="q-text">{q.texto}</p>
        {q.contexto && <p class="muted">{q.contexto}</p>}
        <div class="likert" role="group" aria-label="Tu respuesta">
          {ESCALA.map((e) => (
            <button key={e.v} class={r?.valor === e.v ? 'on' : ''} onClick={() => set(e.v)} aria-pressed={r?.valor === e.v}>
              {e.t}
            </button>
          ))}
        </div>
        <div class="row" style={{ justifyContent: 'space-between', marginTop: 14 }}>
          <div class="row" role="group" aria-label="Importancia">
            {PESOS.map((p) => (
              <button key={p.w} class={`star ${(r?.peso ?? 1) === p.w ? 'on' : ''}`} onClick={() => setPeso(p.w)}>
                {p.t}
              </button>
            ))}
          </div>
          <div class="row">
            <button class="btn ghost" onClick={onPrev} disabled={i === 0}>
              ← Anterior
            </button>
            <button class="btn" onClick={() => set(null)}>
              Saltar
            </button>
          </div>
        </div>
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
  const res = afinidad(e.respuestas, posiciones);
  const respondidas = Object.values(e.respuestas).filter((r) => r.valor !== null).length;
  const [abierto, setAbierto] = useState<string | null>(null);
  const evaluables = res.filter((r) => r.afinidad !== null);
  const top = evaluables[0]?.afinidad ?? 0;
  const pendientes = (partidos.value ?? []).filter((p) => !d.posiciones[p.id]);

  const usarRanking = () => {
    actualizar({ ranking: evaluables.map((r) => r.partido), rankingOrigen: 'fase1', partido: evaluables[0]?.partido ?? null });
    ir('/tu-voto');
  };

  if (respondidas < 5)
    return (
      <div class="note">
        Has respondido {respondidas} afirmaciones. Necesitamos al menos 5 para calcular afinidades. <a href="#/afinidad">Volver</a>
      </div>
    );

  return (
    <div class="stack">
      <div class="note">
        Afinidad = cuánto se parecen tus respuestas a la posición documentada de cada partido, en las {respondidas} afirmaciones que
        respondiste. No es una recomendación de voto: es un espejo. Diferencias de menos de {Math.round(UMBRAL_EMPATE * 100)} puntos son
        un empate técnico.
      </div>
      <div class="card">
        {res.map((r, idx) => {
          const p = partido(r.partido);
          const empate = r.afinidad !== null && top - r.afinidad < UMBRAL_EMPATE;
          return (
            <div key={r.partido}>
              <div class="rank-item">
                <div class="rank-pos">{r.afinidad !== null ? idx + 1 : '–'}</div>
                <div>
                  <div class="row" style={{ gap: 8 }}>
                    <strong>{p?.siglas ?? r.partido}</strong>
                    {empate && idx > 0 && <span class="pill">empate técnico con el primero</span>}
                    {r.cobertura < AVISO_COBERTURA && r.afinidad !== null && (
                      <span class="pill" title="El programa no fija posición en muchas de tus respuestas">
                        cobertura {fmt.pct(r.cobertura)}
                      </span>
                    )}
                    {p?.ambito === 'autonómico' && <span class="pill">solo se presenta en {p.comunidades?.join(', ')}</span>}
                  </div>
                  <div class="bar" style={{ marginTop: 8, '--c': 'var(--f1)' } as any}>
                    <i style={{ width: `${(r.afinidad ?? 0) * 100}%` }} />
                  </div>
                  <button class="btn ghost" style={{ padding: '6px 0' }} onClick={() => setAbierto(abierto === r.partido ? null : r.partido)}>
                    {abierto === r.partido ? 'Ocultar detalle' : `Ver en qué coincidís (${r.comunes} temas comparables)`}
                  </button>
                </div>
                <div class="rank-val">{r.afinidad !== null ? fmt.pct(r.afinidad) : <small>sin datos suficientes</small>}</div>
              </div>
              {abierto === r.partido && <Detalle partidoId={r.partido} />}
            </div>
          );
        })}
      </div>
      {pendientes.length > 0 && (
        <div class="note">
          Sin programa publicado todavía (no puntúan): {pendientes.map((p) => p.siglas).join(', ')}.
        </div>
      )}
      <div class="row">
        <button class="btn primary" onClick={usarRanking} style={{ '--c': 'var(--f2)' } as any}>
          Llevar mi ranking a la fase 2 →
        </button>
        <a class="btn" href="#/afinidad">
          Revisar respuestas
        </a>
        <button
          class="btn ghost"
          onClick={() => {
            if (confirm('¿Borrar todas tus respuestas?')) actualizar({ respuestas: {} });
          }}
        >
          Borrar respuestas
        </button>
      </div>
    </div>
  );
}

function Detalle({ partidoId }: { partidoId: string }) {
  const d = fase1.value!;
  const e = estado.value;
  const pos = d.posiciones[partidoId] ?? {};
  return (
    <div class="prop-body" style={{ margin: '0 0 12px', borderRadius: 10 }}>
      {d.preguntas.map((q) => {
        const u = e.respuestas[q.id]?.valor;
        const p = pos[q.id];
        if (u === null || u === undefined) return null;
        return (
          <div class="crit" key={q.id}>
            <h4>{q.texto}</h4>
            <p>
              Tú: <strong>{etiqueta(u)}</strong> · {partido(partidoId)?.siglas}: <strong>{etiqueta(p?.valor)}</strong>
            </p>
            {p?.cita && (
              <p class="quote">
                «{p.cita}» {p.pagina ? <span class="muted">(programa, p. {p.pagina})</span> : null}
              </p>
            )}
            {p?.nota && <p class="muted">{p.nota}</p>}
          </div>
        );
      })}
    </div>
  );
}

export function Fase1() {
  const d = fase1.value;
  const sub = ruta.value.includes('resultados');
  const [i, setI] = useState<number | null>(null);
  const e = estado.value;
  const hechas = Object.keys(e.respuestas).length;

  let body;
  if (!d || d.preguntas.length === 0) {
    body = (
      <div class="stack">
        <div class="note">
          <strong>Esta fase espera a los programas.</strong> Solo construimos las preguntas y las posiciones a partir de los programas
          oficiales del 29-N, leídos completos. {d?.meta.nota}
        </div>
        <EstadoProgramas />
        <p>
          Mientras tanto puedes usar la <a href="#/tu-voto">fase 2</a> con tu partido preferido.
        </p>
      </div>
    );
  } else if (sub) {
    body = <Resultados />;
  } else if (i === null) {
    body = <Intro n={d.preguntas.length} hechas={hechas} onStart={() => setI(Math.min(hechas, d.preguntas.length - 1))} />;
  } else {
    const n = d.preguntas.length;
    body = (
      <Tarjeta
        q={d.preguntas[i]}
        i={i}
        n={n}
        onPrev={() => setI(Math.max(0, i - 1))}
        onNext={() => (i + 1 < n ? setI(i + 1) : ir('/afinidad/resultados'))}
      />
    );
  }
  return (
    <div class="narrow page c1">
      <div class="page-head">
        <div class="num">Fase 1</div>
        <h1>¿Con quién coincides?</h1>
      </div>
      {body}
    </div>
  );
}
