import { useMemo } from 'preact/hooks';
import { actualizar, estado } from '../store';
import { fase2, fmt, partido } from '../data';
import { NIVELES_INCERTIDUMBRE, simular, veredicto, type ResultadoSim } from '../engine/seats';
import type { CandidaturaCirc, Circunscripcion, Escenario } from '../types';
import { CabeceraPaso } from '../brand';

const TEXTO_VEREDICTO: Record<string, string> = {
  casi_seguro: 'Escaño casi seguro',
  probable: 'Escaño probable',
  en_disputa: 'Escaño en disputa',
  improbable: 'Escaño improbable',
  muy_improbable: 'Escaño muy improbable',
};
const UMBRAL_RECOMENDACION = 0.5;

interface Fila extends ResultadoSim {
  cand: CandidaturaCirc;
  sinBase: boolean;
}

function calcular(c: Circunscripcion, esc: Escenario, k: number): Fila[] {
  const cuotas = esc.cuotas[c.ine] ?? {};
  const sinBase = new Set(esc.sin_base?.[c.ine] ?? []);
  const contendientes = c.candidaturas
    .filter((x) => !sinBase.has(x.id))
    .map((x) => ({ id: x.id, cuota: cuotas[x.id] ?? 0 }));
  const otros = cuotas['_otros'] ?? 0;
  if (otros > 0) contendientes.push({ id: '_otros', cuota: otros, elegible: false } as any);
  const res = simular(
    { escanos: c.escanos, validos: c.validos_ref, blanco: cuotas['_blanco'] ?? 0, contendientes },
    { k, n: 4000, semilla: `${c.ine}-${esc.id}-${k}` },
  );
  const filas: Fila[] = [];
  for (const cand of c.candidaturas) {
    const r = res.find((x) => x.id === cand.id);
    if (r) filas.push({ ...r, cand, sinBase: false });
    else
      filas.push({
        id: cand.id, cuota: 0, pEscano: NaN, escanosMedia: NaN, distribucion: [], escanosCentral: 0, votosCentral: 0,
        votosPorEscano: null, votosParaSiguiente: Infinity, cand, sinBase: true,
      });
  }
  filas.sort((a, b) => (a.sinBase ? 1 : 0) - (b.sinBase ? 1 : 0) || b.cuota - a.cuota);
  return filas;
}

function Ordenar({ circ }: { circ: Circunscripcion }) {
  const e = estado.value;
  const disponibles = circ.candidaturas.filter((c) => c.partido).map((c) => c.partido!) as string[];
  const base = e.ranking.filter((p) => disponibles.includes(p));
  const resto = disponibles.filter((p) => !base.includes(p));
  const lista = [...base, ...resto];
  const mover = (i: number, d: number) => {
    const l = lista.slice();
    const j = i + d;
    if (j < 0 || j >= l.length) return;
    [l[i], l[j]] = [l[j], l[i]];
    const fuera = e.ranking.filter((p) => !l.includes(p));
    actualizar({ ranking: [...l, ...fuera], rankingOrigen: 'manual' });
  };
  return (
    <details class="card desplegable">
      <summary>
        {e.rankingOrigen === 'fase1' ? 'Tu orden de preferencia viene del paso 1 (puedes cambiarlo)' : 'Ordena tus preferencias para que podamos sugerirte alternativa'}
      </summary>
      <ol class="orden" style={{ paddingLeft: 18 }}>
        {lista.map((p, i) => (
          <li key={p}>
            <button aria-label="Subir" onClick={() => mover(i, -1)} disabled={i === 0}>↑</button>
            <button aria-label="Bajar" onClick={() => mover(i, 1)} disabled={i === lista.length - 1}>↓</button>
            {partido(p)?.siglas ?? p}
          </li>
        ))}
      </ol>
    </details>
  );
}

export function Cuenta() {
  const d = fase2.value!;
  const e = estado.value;
  const circs = useMemo(() => [...d.circunscripciones].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')), [d]);
  const circ = circs.find((c) => c.ine === e.circ) ?? null;
  const esc = d.escenarios.find((x) => x.id === e.escenario) ?? d.escenarios[0];
  const k = NIVELES_INCERTIDUMBRE[e.incertidumbre] * (esc.k / NIVELES_INCERTIDUMBRE.media);
  const filas = useMemo(() => (circ ? calcular(circ, esc, k) : []), [circ, esc, k]);

  // Partido elegido: e.partido es id de partido (fase 1) o id de candidatura.
  const elegida =
    (e.partido ? circ?.candidaturas.find((c) => c.partido === e.partido || c.id === e.partido) : undefined) ??
    circ?.candidaturas.find((c) => !!e.partido && !!c.afines?.includes(e.partido)) ??
    null;
  const filaElegida = filas.find((f) => f.cand.id === elegida?.id);
  const noSePresenta = !!(circ && e.partido && !elegida);

  // Recomendación: siguiente en el orden de preferencia con P >= 50 %.
  const ranking = e.ranking.length ? e.ranking : [];
  const alternativa =
    filaElegida && !filaElegida.sinBase && filaElegida.pEscano < UMBRAL_RECOMENDACION
      ? ranking
          .map((p) => filas.find((f) => f.cand.partido === p) ?? filas.find((f) => f.cand.afines?.includes(p)))
          .find((f) => f && f.cand.id !== elegida?.id && !f.sinBase && f.pEscano >= UMBRAL_RECOMENDACION)
      : noSePresenta
        ? ranking.map((p) => filas.find((f) => f.cand.partido === p) ?? filas.find((f) => f.cand.afines?.includes(p))).find((f) => f && !f.sinBase && f.pEscano >= UMBRAL_RECOMENDACION)
        : undefined;

  const coste = e.partido ? d.coste_nacional_2023?.[e.partido] : undefined;

  return (
    <div class="wrap page p3">
      <div class="narrow" style={{ padding: 0, marginLeft: 0 }}>
        <CabeceraPaso id="cuenta">
          En el Congreso cada provincia elige sus propios escaños. Un voto solo se convierte en diputado si su candidatura supera el 3 % en esa
          provincia y le alcanza en el reparto D'Hondt. Aquí lo calculas con las listas oficiales del BOE.
        </CabeceraPaso>
      </div>

      <div class="card">
        <div class="grid-3">
          <label class="field">
            Tu circunscripción
            <select value={e.circ ?? ''} onChange={(ev) => actualizar({ circ: (ev.target as HTMLSelectElement).value || null })}>
              <option value="">Elige provincia…</option>
              {circs.map((c) => (
                <option key={c.ine} value={c.ine}>
                  {c.nombre} ({c.escanos} {c.escanos === 1 ? 'escaño' : 'escaños'})
                </option>
              ))}
            </select>
          </label>
          <label class="field">
            Partido que quieres votar
            <select value={elegida?.id ?? e.partido ?? ''} onChange={(ev) => {
              const v = (ev.target as HTMLSelectElement).value;
              const c = circ?.candidaturas.find((x) => x.id === v);
              actualizar({ partido: c?.partido ?? v ?? null });
            }} disabled={!circ}>
              <option value="">{circ ? 'Elige candidatura…' : 'Primero elige provincia'}</option>
              {noSePresenta && <option value={e.partido!}>{partido(e.partido)?.siglas ?? e.partido} (no se presenta aquí)</option>}
              {circ?.candidaturas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.siglas} — {c.denominacion}
                </option>
              ))}
            </select>
          </label>
          <label class="field">
            Escenario
            <select value={esc.id} onChange={(ev) => actualizar({ escenario: (ev.target as HTMLSelectElement).value })}>
              {d.escenarios.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p class="muted" style={{ margin: '12px 0 0', fontSize: '0.9rem' }}>
          {esc.descripcion}{' '}
          {esc.fuentes.map((f, i) => (
            <a key={i} href={f.url} target="_blank" rel="noopener" style={{ marginRight: 8 }}>
              {f.titulo ?? 'fuente'}
            </a>
          ))}
          · Incertidumbre:{' '}
          <select
            value={e.incertidumbre}
            onChange={(ev) => actualizar({ incertidumbre: (ev.target as HTMLSelectElement).value as any })}
            style={{ padding: '2px 6px' }}
          >
            <option value="baja">baja</option>
            <option value="media">media</option>
            <option value="alta">alta</option>
          </select>
        </p>
      </div>

      {circ && (
        <div class="stack" style={{ marginTop: 18 }}>
          {noSePresenta && (
            <div class="card reco">
              <h3>{partido(e.partido)?.siglas ?? e.partido} no se presenta en {circ.nombre}</h3>
              <p>
                No figura entre las candidaturas proclamadas para esta circunscripción en el{' '}
                <a href={circ.boe_url} target="_blank" rel="noopener">BOE ({circ.boe_id})</a>. Un voto a esa candidatura no es posible aquí.
              </p>
              {alternativa ? (
                <p>
                  Tu siguiente preferencia con escaño probable aquí: <strong>{alternativa.cand.siglas}</strong> ({fmt.pct(alternativa.pEscano)} de
                  probabilidad de escaño).
                </p>
              ) : (
                <p class="muted">Ordena tus preferencias abajo o haz el <a href="#/coincide">paso 1</a> para que te sugiramos una alternativa.</p>
              )}
            </div>
          )}

          {filaElegida && (
            <div class="card">
              <div class="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div class="muted">{elegida!.denominacion} · {circ.nombre}</div>
                  <h2 style={{ margin: '4px 0 10px' }}>{elegida!.siglas}</h2>
                  {!filaElegida.sinBase && <span class={`verdict v-${veredicto(filaElegida.pEscano)}`}>{TEXTO_VEREDICTO[veredicto(filaElegida.pEscano)]}</span>}
                </div>
                {!filaElegida.sinBase && (
                  <div style={{ textAlign: 'right' }}>
                    <div class="big">{fmt.pct(filaElegida.pEscano)}</div>
                    <div class="muted">probabilidad de ≥ 1 escaño</div>
                  </div>
                )}
              </div>
              {filaElegida.sinBase ? (
                <p class="note" style={{ marginTop: 14 }}>
                  No hay base para estimar esta candidatura en el escenario «{esc.nombre}» (no concurrió así en la elección de referencia o la
                  encuesta no la recoge). Prueba otro escenario.
                </p>
              ) : (
                <div class="kpis">
                  <div class="kpi"><b>{fmt.pct(filaElegida.cuota, 1)}</b><span>voto estimado en {circ.nombre}</span></div>
                  <div class="kpi"><b>{filaElegida.escanosMedia.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</b><span>escaños esperados (de {circ.escanos})</span></div>
                  <div class="kpi">
                    <b>{filaElegida.votosPorEscano ? fmt.n(filaElegida.votosPorEscano) : '—'}</b>
                    <span>votos por escaño aquí (escenario central)</span>
                  </div>
                  <div class="kpi">
                    <b>{isFinite(filaElegida.votosParaSiguiente) ? fmt.n(filaElegida.votosParaSiguiente) : '—'}</b>
                    <span>votos más para {filaElegida.escanosCentral > 0 ? 'el siguiente escaño' : 'su primer escaño'}</span>
                  </div>
                  {coste && (
                    <div class="kpi">
                      <b>{fmt.n(coste.votos / coste.escanos)}</b>
                      <span>votos por diputado en toda España en 2023</span>
                    </div>
                  )}
                </div>
              )}
              {alternativa && !noSePresenta && (
                <div class="note" style={{ marginTop: 16 }}>
                  Con este escenario, tu voto a {elegida!.siglas} tiene pocas opciones de convertirse en escaño en {circ.nombre}. Tu siguiente
                  preferencia con escaño probable aquí es <strong>{alternativa.cand.siglas}</strong> ({fmt.pct(alternativa.pEscano)}). Votar a
                  quien prefieres también es legítimo: los votos cuentan para la subvención electoral y como señal política.
                </div>
              )}
              {filaElegida.pEscano < UMBRAL_RECOMENDACION && !alternativa && !filaElegida.sinBase && (
                <div class="note" style={{ marginTop: 16 }}>
                  Para sugerirte una alternativa, ordena tus preferencias (abajo) o haz el <a href="#/coincide">paso 1</a>.
                </div>
              )}
              <div class="row" style={{ marginTop: 16 }}>
                {elegida?.partido && (
                  <a class="btn" href={`#/contrasta/${elegida.partido}`}>
                    ← Contrastar su programa (paso 2)
                  </a>
                )}
              </div>
            </div>
          )}

          <Ordenar circ={circ} />

          <div class="card">
            <h3>Todas las candidaturas en {circ.nombre}</h3>
            <p class="muted" style={{ fontSize: '0.9rem' }}>
              {circ.candidaturas.length} candidaturas proclamadas · {circ.escanos} escaños · fuente:{' '}
              <a href={circ.boe_url} target="_blank" rel="noopener">BOE {circ.boe_id}</a>
            </p>
            <div class="scroll-x">
              <table>
                <thead>
                  <tr>
                    <th>Candidatura</th>
                    <th class="num">Voto est.</th>
                    <th class="num">Escaños (central)</th>
                    <th style={{ minWidth: 140 }}>Prob. de escaño</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((f) => (
                    <tr key={f.cand.id} class={f.cand.id === elegida?.id ? 'tr-me' : ''}>
                      <td>
                        <strong>{f.cand.siglas}</strong>
                        <div class="muted" style={{ fontSize: '0.8rem' }}>
                          {f.cand.denominacion}
                          {f.cand.cabeza_lista ? ` · encabeza: ${f.cand.cabeza_lista}` : ''}
                        </div>
                      </td>
                      <td class="num">{f.sinBase ? '—' : fmt.pct(f.cuota, 1)}</td>
                      <td class="num">{f.sinBase ? '—' : f.escanosCentral}</td>
                      <td>
                        {f.sinBase ? (
                          <small class="muted">sin base en este escenario</small>
                        ) : (
                          <div class="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
                            <div class="bar" style={{ flex: 1 }}>
                              <i style={{ width: `${f.pEscano * 100}%` }} />
                            </div>
                            <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 44, textAlign: 'right' }}>{fmt.pct(f.pEscano)}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p class="muted" style={{ fontSize: '0.85rem', marginTop: 12 }}>
              Probabilidades de {4000} simulaciones del escenario con error estadístico ({e.incertidumbre}). Son estimaciones, no
              predicciones: el resultado real depende de lo que vote la gente. <a href="#/metodologia">Cómo se calcula</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
