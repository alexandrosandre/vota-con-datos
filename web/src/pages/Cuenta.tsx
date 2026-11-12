import { useMemo } from 'preact/hooks';
import { actualizar, estado } from '../store';
import { fase2, fmt, partido } from '../data';
import { simular, veredicto, type ResultadoSim } from '../engine/seats';
import type { CandidaturaCirc, Circunscripcion, Escenario } from '../types';
import { CabeceraPaso } from '../brand';

const TEXTO_VEREDICTO: Record<string, string> = {
  casi_seguro: 'Escaño casi seguro',
  probable: 'Escaño probable',
  en_disputa: 'Escaño en disputa',
  improbable: 'Escaño improbable',
  muy_improbable: 'Escaño muy improbable',
};
/** Una alternativa se sugiere solo si tiene al menos esta probabilidad de escaño. */
const UMBRAL_RECOMENDACION = 0.5;

interface Fila extends ResultadoSim {
  cand: CandidaturaCirc;
  sinBase: boolean;
}

function calcular(c: Circunscripcion, esc: Escenario): Fila[] {
  const cuotas = esc.cuotas[c.ine] ?? {};
  const sinBase = new Set(esc.sin_base?.[c.ine] ?? []);
  const contendientes = c.candidaturas
    .filter((x) => !sinBase.has(x.id))
    .map((x) => ({ id: x.id, cuota: cuotas[x.id] ?? 0 }));
  const otros = cuotas['_otros'] ?? 0;
  if (otros > 0) contendientes.push({ id: '_otros', cuota: otros, elegible: false } as any);
  const res = simular(
    { escanos: c.escanos, validos: c.validos_ref, blanco: cuotas['_blanco'] ?? 0, contendientes },
    { k: esc.k, n: 4000, semilla: `${c.ine}-${esc.id}-${esc.k}` },
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

/** Candidatura de un partido en esta provincia (directa o integrada en una coalición). */
function filaDe(filas: Fila[], p: string) {
  return filas.find((f) => f.cand.partido === p) ?? filas.find((f) => f.cand.afines?.includes(p));
}

/** Logotipo del partido (licencia libre) o, si no hay, sus iniciales. */
export function MarcaPartido({ cand, pid, size = 22 }: { cand?: CandidaturaCirc; pid?: string | null; size?: number }) {
  const id = pid ?? cand?.partido ?? null;
  const src = id ? fase2.value?.logos?.[id] : undefined;
  if (src) return <img class="marca-p" src={`${import.meta.env.BASE_URL}${src}`} alt="" width={size} height={size} style={{ width: size, height: size }} />;
  const sig = (cand?.siglas ?? partido(id)?.siglas ?? id ?? '?').replace(/[^A-Za-zÀ-ÿ0-9]/g, '');
  return (
    <span class="marca-p marca-ini" aria-hidden="true" style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {sig.slice(0, 2).toUpperCase()}
    </span>
  );
}

function Foto({ src, nombre }: { src?: string | null; nombre: string }) {
  if (src) return <img class="foto" src={`${import.meta.env.BASE_URL}${src}`} alt="" loading="lazy" width={44} height={44} />;
  const ini = nombre.split(/\s+/).filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map((w) => w[0]).join('');
  return (
    <span class="foto foto-ini" aria-hidden="true">
      {ini}
    </span>
  );
}

function Persona({ t, cand }: { t: NonNullable<CandidaturaCirc['titulares']>[number]; cand: CandidaturaCirc }) {
  const esCoalicion = (cand.coalicion?.miembros.length ?? 0) >= 2;
  return (
    <li class="persona">
      <Foto src={t.foto} nombre={t.nombre} />
      <div>
        <div>
          <span class="muted">{t.orden}.º</span> {t.enlace ? <a href={t.enlace} target="_blank" rel="noopener">{t.nombre}</a> : <strong>{t.nombre}</strong>}
        </div>
        <div class="muted" style={{ fontSize: '0.85rem' }}>
          {t.afiliacion ? (
            t.fuente_afiliacion ? <a href={t.fuente_afiliacion} target="_blank" rel="noopener">{t.afiliacion}</a> : t.afiliacion
          ) : esCoalicion ? (
            'su partido dentro de la coalición no está publicado'
          ) : (
            `en la lista de ${cand.siglas}`
          )}
        </div>
      </div>
    </li>
  );
}

/** Qué hay dentro de la papeleta y a quién elegiría el voto (listas del BOE). */
function QuienElige({ cand, escanos }: { cand: CandidaturaCirc; escanos: number }) {
  const miembros = cand.coalicion?.miembros ?? [];
  const tit = cand.titulares ?? [];
  const elegidos = tit.filter((t) => t.orden <= escanos);
  const siguiente = tit.find((t) => t.orden === escanos + 1);
  if (miembros.length < 2 && tit.length === 0) return null;
  const conFoto = tit.some((t) => t.foto);
  return (
    <div class="stack" style={{ marginTop: 16 }}>
      {miembros.length >= 2 && (
        <div class="note">
          <strong>Esta papeleta es una {cand.coalicion!.tipo === 'coalición' ? 'coalición' : cand.coalicion!.tipo}</strong> de:{' '}
          {miembros.map((m) => m.nombre + (m.siglas && m.siglas !== m.nombre ? ` (${m.siglas})` : '')).join(', ')}.{' '}
          Tu voto cuenta para la lista conjunta: los escaños los ocupan sus candidatos por orden, sean del partido que sean.{' '}
          {cand.coalicion!.fuente?.url && (
            <a href={cand.coalicion!.fuente.url} target="_blank" rel="noopener">
              Fuente oficial
            </a>
          )}
        </div>
      )}
      {tit.length > 0 && (
        <div>
          <h3 class="h4" style={{ marginBottom: 6 }}>
            ¿A quién iría tu voto?
          </h3>
          {elegidos.length > 0 && (
            <>
              <div class="muted" style={{ fontSize: '0.85rem' }}>
                {elegidos.length === 1 ? 'Saldría elegida esta persona' : `Saldrían elegidas estas ${elegidos.length} personas`} de la lista de {cand.siglas}:
              </div>
              <ul class="personas">
                {elegidos.map((t) => (
                  <Persona key={t.orden} t={t} cand={cand} />
                ))}
              </ul>
            </>
          )}
          {siguiente && (
            <>
              <div class="muted" style={{ fontSize: '0.85rem' }}>
                {elegidos.length ? 'Si lograra un escaño más, entraría:' : 'Si lograra un escaño, entraría:'}
              </div>
              <ul class="personas">
                <Persona t={siguiente} cand={cand} />
              </ul>
            </>
          )}
          <p class="muted" style={{ fontSize: '0.8rem', marginTop: 8 }}>
            Nombres y orden: listas oficiales del BOE. Partido y enlaces: fuentes oficiales o Wikipedia; si no constan, lo decimos.
            {conFoto && (
              <>
                {' '}
                Fotos: Wikimedia Commons, con licencia libre (<a href="#/creditos">créditos</a>).
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

/** Orden de preferencia: de dónde viene y cómo cambiarlo. */
function Preferencias({ circ, filas, elegidaId, sugeridaId }: { circ: Circunscripcion; filas: Fila[]; elegidaId?: string; sugeridaId?: string }) {
  const e = estado.value;
  const hayPaso1 = Object.keys(e.afinidades ?? {}).length > 0;
  const presentes = e.ranking.filter((p) => filaDe(filas, p));
  const ausentes = e.ranking.length - presentes.length;
  const candidatos = circ.candidaturas.filter((c) => c.partido && !e.ranking.includes(c.partido));

  const poner = (r: string[]) => actualizar({ ranking: r, rankingOrigen: 'manual' });
  const mover = (p: string, d: number) => {
    const l = e.ranking.slice();
    const i = l.indexOf(p);
    // salta los partidos que no se presentan aquí, para que el cambio se vea
    let j = i + d;
    while (j >= 0 && j < l.length && !filaDe(filas, l[j])) j += d;
    if (j < 0 || j >= l.length) return;
    [l[i], l[j]] = [l[j], l[i]];
    poner(l);
  };
  const volverPaso1 = () => {
    const a = e.afinidades;
    actualizar({ ranking: Object.keys(a).sort((x, y) => a[y] - a[x]), rankingOrigen: 'fase1' });
  };

  return (
    <div class="card" id="preferencias">
      <h2 class="h3" style={{ marginBottom: 6 }}>
        Tu orden de preferencia
      </h2>
      <p class="muted" style={{ marginTop: 0 }}>
        Sirve solo para una cosa: si el partido que quieres votar tiene pocas opciones de escaño en {circ.nombre}, te señalamos el siguiente
        de esta lista que sí las tiene (al menos un 50 %). No lo guardamos fuera de tu navegador.
      </p>

      {e.ranking.length === 0 ? (
        <div class="origen">
          <p style={{ margin: '0 0 10px' }}>
            <strong>Aún no nos has dicho a quién votarías si no fuera a tu primera opción.</strong> Hay dos maneras:
          </p>
          <div class="row">
            <a class="btn" href="#/coincide">
              Hacer el paso 1 (ordenamos por afinidad)
            </a>
            <button
              class="btn"
              onClick={() => poner(elegidaId ? [circ.candidaturas.find((c) => c.id === elegidaId)?.partido].filter(Boolean) as string[] : [])}
            >
              Ordenarlo yo aquí
            </button>
          </div>
        </div>
      ) : (
        <>
          <div class="origen">
            {e.rankingOrigen === 'fase1' ? (
              <>
                <span class="etiqueta-origen">Del paso 1</span> Ordenado de más a menos afinidad según tus respuestas del cuestionario. Si lo
                cambias, pasa a ser tu orden.
              </>
            ) : (
              <>
                <span class="etiqueta-origen manual">Ordenado por ti</span> Este orden lo has puesto tú.{' '}
                {hayPaso1 && (
                  <button class="link-btn" onClick={volverPaso1}>
                    Volver al orden del paso 1
                  </button>
                )}
              </>
            )}
          </div>
          <ol class="orden-pref">
            {presentes.map((p, i) => {
              const f = filaDe(filas, p)!;
              const af = e.rankingOrigen === 'fase1' ? e.afinidades?.[p] : undefined;
              const sig = partido(p)?.siglas ?? p;
              return (
                <li key={p} class={f.cand.id === elegidaId ? 'es-voto' : f.cand.id === sugeridaId ? 'es-sugerida' : ''}>
                  <span class="pos">{i + 1}</span>
                  <MarcaPartido cand={f.cand} pid={p} />
                  <span class="nombre">
                    <strong>{sig}</strong>
                    {f.cand.partido !== p && <span class="muted"> · en {f.cand.siglas}</span>}
                    {f.cand.id === elegidaId && <span class="tag">tu voto</span>}
                    {f.cand.id === sugeridaId && <span class="tag tag-sug">sugerida</span>}
                    {af !== undefined && <span class="muted"> · afinidad {af} %</span>}
                  </span>
                  <span class="prob">{f.sinBase ? '—' : fmt.pct(f.pEscano)}</span>
                  <span class="acciones">
                    <button aria-label={`Subir ${sig}`} onClick={() => mover(p, -1)} disabled={i === 0}>↑</button>
                    <button aria-label={`Bajar ${sig}`} onClick={() => mover(p, 1)} disabled={i === presentes.length - 1}>↓</button>
                    <button aria-label={`Quitar ${sig} de tu orden`} onClick={() => poner(e.ranking.filter((x) => x !== p))}>✕</button>
                  </span>
                </li>
              );
            })}
          </ol>
          <div class="muted" style={{ fontSize: '0.8rem', margin: '-4px 0 10px' }}>
            La cifra de la derecha: probabilidad de lograr al menos un escaño en {circ.nombre}.
            {ausentes > 0 && ` ${ausentes} ${ausentes === 1 ? 'partido de tu orden no se presenta' : 'partidos de tu orden no se presentan'} aquí.`}
          </div>
          <div class="row">
            {candidatos.length > 0 && (
              <label class="field" style={{ minWidth: 220, flex: '0 1 320px', margin: 0 }}>
                <span class="sr-only">Añadir un partido al final de tu orden</span>
                <select
                  value=""
                  onChange={(ev) => {
                    const v = (ev.target as HTMLSelectElement).value;
                    if (v) poner([...e.ranking, v]);
                  }}
                >
                  <option value="">+ Añadir un partido al final…</option>
                  {candidatos.map((c) => (
                    <option key={c.id} value={c.partido!}>
                      {c.siglas}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button class="link-btn" onClick={() => actualizar({ ranking: [], rankingOrigen: null })}>
              Borrar mi orden
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function Cuenta() {
  const d = fase2.value!;
  const e = estado.value;
  const circs = useMemo(() => [...d.circunscripciones].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')), [d]);
  const circ = circs.find((c) => c.ine === e.circ) ?? null;
  // Veda de encuestas (LOREG art. 69.7): también en el navegador, por si los datos en caché son anteriores.
  const v = d.meta.veda_encuestas;
  const ahora = Date.now();
  const enVeda = !!v && ahora >= Date.parse(v.inicio) && ahora < Date.parse(v.fin);
  const escenarios = enVeda ? d.escenarios.filter((x) => x.id === 'g2023') : d.escenarios;
  // Por defecto, el primero: la media de encuestas (o 2023 durante la veda).
  const esc = escenarios.find((x) => x.id === e.escenario) ?? escenarios[0];
  const filas = useMemo(() => (circ ? calcular(circ, esc) : []), [circ, esc]);

  // Partido elegido: e.partido es id de partido (fase 1) o id de candidatura.
  const elegida =
    (e.partido ? circ?.candidaturas.find((c) => c.partido === e.partido || c.id === e.partido) : undefined) ??
    circ?.candidaturas.find((c) => !!e.partido && !!c.afines?.includes(e.partido)) ??
    null;
  const filaElegida = filas.find((f) => f.cand.id === elegida?.id);
  const noSePresenta = !!(circ && e.partido && !elegida);

  // Sugerencia: el primero de tu orden de preferencia (sin contar tu voto) con P >= 50 % aquí.
  const pocasOpciones = noSePresenta || (!!filaElegida && !filaElegida.sinBase && filaElegida.pEscano < UMBRAL_RECOMENDACION);
  const candidatasOrden = e.ranking
    .map((p) => filaDe(filas, p))
    .filter((f, i, a): f is Fila => !!f && a.indexOf(f) === i && f.cand.id !== elegida?.id);
  const alternativa = pocasOpciones ? candidatasOrden.find((f) => !f.sinBase && f.pEscano >= UMBRAL_RECOMENDACION) : undefined;
  const posAlternativa = alternativa ? e.ranking.filter((p) => filaDe(filas, p)).findIndex((p) => filaDe(filas, p) === alternativa) + 1 : 0;

  const coste = e.partido ? d.coste_nacional_2023?.[e.partido] : undefined;
  const irAPreferencias = () => document.getElementById('preferencias')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const Sugerencia = () =>
    alternativa ? (
      <div class="note sugerencia" style={{ marginTop: 16 }}>
        <p style={{ margin: 0 }}>
          {noSePresenta ? 'Como no se presenta aquí, ' : `Con estos datos, tu voto a ${elegida!.siglas} tiene pocas opciones de convertirse en escaño en ${circ!.nombre}. `}
          Si quieres que tu voto ayude a elegir un diputado, la primera de tu orden de preferencia que sí tiene opciones es{' '}
          <span class="nowrap">
            <MarcaPartido cand={alternativa.cand} /> <strong>{alternativa.cand.siglas}</strong>
          </span>{' '}
          (n.º {posAlternativa} de tu orden, {fmt.pct(alternativa.pEscano)} de probabilidad de escaño).
        </p>
        <p class="muted" style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Sale de{' '}
          <button class="link-btn" onClick={irAPreferencias}>
            {e.rankingOrigen === 'fase1' ? 'tu orden del paso 1' : 'el orden que has puesto'}
          </button>
          , no de nuestra opinión. Votar a quien prefieres también es legítimo: tu voto cuenta para la subvención electoral y como señal política.
        </p>
      </div>
    ) : pocasOpciones ? (
      <div class="note" style={{ marginTop: 16 }}>
        {e.ranking.length === 0 ? (
          <>
            Si nos dices a quién votarías después, te señalamos cuál tiene opciones aquí.{' '}
            <button class="link-btn" onClick={irAPreferencias}>
              Indicar mi orden de preferencia
            </button>
          </>
        ) : (
          <>
            Ninguno de los partidos de{' '}
            <button class="link-btn" onClick={irAPreferencias}>
              tu orden de preferencia
            </button>{' '}
            llega al 50 % de probabilidad de escaño en {circ!.nombre} con estos datos.
          </>
        )}
      </div>
    ) : null;

  return (
    <div class="wrap page p3">
      <div class="narrow" style={{ padding: 0, marginLeft: 0 }}>
        <CabeceraPaso id="cuenta">
          En el Congreso cada provincia reparte sus propios escaños. Un voto solo ayuda a elegir a un diputado si su candidatura reúne
          suficientes votos en esa provincia. Aquí ves qué opciones tiene cada una, con las listas oficiales del BOE. Es información, no una
          recomendación: votar a quien prefieres siempre es legítimo.
        </CabeceraPaso>
      </div>

      <div class="card">
        <div class="grid-3">
          <label class="field">
            Tu provincia
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
            <select
              value={elegida?.id ?? e.partido ?? ''}
              onChange={(ev) => {
                const v = (ev.target as HTMLSelectElement).value;
                const c = circ?.candidaturas.find((x) => x.id === v);
                actualizar({ partido: c?.partido ?? v ?? null });
              }}
              disabled={!circ}
            >
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
            Calcular con
            <select value={esc.id} onChange={(ev) => actualizar({ escenario: (ev.target as HTMLSelectElement).value })}>
              {escenarios.map((x, i) => (
                <option key={x.id} value={x.id}>
                  {x.nombre}
                  {i === 0 ? ' · por defecto' : ''}
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
        </p>
      </div>

      {enVeda && (
        <div class="note" style={{ marginTop: 14 }}>
          Del 24 de noviembre hasta el cierre de los colegios electorales, la ley electoral (art. 69.7 LOREG) prohíbe publicar o reproducir
          encuestas. Por eso ahora solo puedes calcular con los resultados de 2023.
        </div>
      )}
      {circ && (
        <div class="stack" style={{ marginTop: 18 }}>
          {noSePresenta && (
            <div class="card reco">
              <h2 class="h3">
                <MarcaPartido pid={e.partido} size={26} /> {partido(e.partido)?.siglas ?? e.partido} no se presenta en {circ.nombre}
              </h2>
              <p>
                No figura entre las candidaturas oficiales de esta provincia en el{' '}
                <a href={circ.boe_url} target="_blank" rel="noopener">BOE ({circ.boe_id})</a>, así que aquí no se le puede votar.
              </p>
              <Sugerencia />
            </div>
          )}

          <p class="sr-only" aria-live="polite">
            {filaElegida && elegida
              ? filaElegida.sinBase
                ? `${elegida.siglas} en ${circ.nombre}: sin estimación con estos datos.`
                : `${elegida.siglas} en ${circ.nombre}: ${fmt.pct(filaElegida.pEscano)} de probabilidad de lograr al menos un escaño.`
              : ''}
          </p>
          {filaElegida && (
            <div class="card">
              <div class="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div class="muted">{elegida!.denominacion} · {circ.nombre}</div>
                  <h2 style={{ margin: '4px 0 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <MarcaPartido cand={elegida!} size={34} /> {elegida!.siglas}
                  </h2>
                  {!filaElegida.sinBase && <span class={`verdict v-${veredicto(filaElegida.pEscano)}`}>{TEXTO_VEREDICTO[veredicto(filaElegida.pEscano)]}</span>}
                </div>
                {!filaElegida.sinBase && (
                  <div style={{ textAlign: 'right' }}>
                    <div class="big">{fmt.pct(filaElegida.pEscano)}</div>
                    <div class="muted">probabilidad de lograr al menos un escaño</div>
                  </div>
                )}
              </div>
              {filaElegida.sinBase ? (
                <p class="note" style={{ marginTop: 14 }}>
                  Con «{esc.nombre}» no podemos estimar esta candidatura: no se presentó así en 2023 o las encuestas no la recogen.{' '}
                  {(() => {
                    const otros = escenarios.filter((x) => x.id !== esc.id && !(x.sin_base?.[circ.ine] ?? []).includes(elegida!.id));
                    return otros.length ? (
                      <>
                        Sí la estiman:{' '}
                        {otros.map((x) => (
                          <button key={x.id} class="chip-btn" style={{ margin: '4px 6px 0 0' }} onClick={() => actualizar({ escenario: x.id })}>
                            {x.nombre}
                          </button>
                        ))}
                      </>
                    ) : (
                      <>Ningún dato disponible la estima, así que no podemos calcular sus opciones de escaño.</>
                    );
                  })()}
                </p>
              ) : (
                <div class="kpis">
                  <div class="kpi"><b>{fmt.pct(filaElegida.cuota, 1)}</b><span>de los votos en {circ.nombre}, según estos datos</span></div>
                  <div class="kpi"><b>{filaElegida.escanosMedia.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</b><span>escaños de media (de {circ.escanos})</span></div>
                  <div class="kpi">
                    <b>{filaElegida.votosPorEscano ? fmt.n(filaElegida.votosPorEscano) : '—'}</b>
                    <span>votos que le cuesta cada escaño aquí</span>
                  </div>
                  <div class="kpi">
                    <b>{isFinite(filaElegida.votosParaSiguiente) ? fmt.n(filaElegida.votosParaSiguiente) : '—'}</b>
                    <span>votos más que necesitaría para {filaElegida.escanosCentral > 0 ? 'otro escaño' : 'su primer escaño'}</span>
                  </div>
                  {coste && (
                    <div class="kpi">
                      <b>{fmt.n(coste.votos / coste.escanos)}</b>
                      <span>votos por diputado en toda España en 2023</span>
                    </div>
                  )}
                </div>
              )}
              <QuienElige cand={elegida!} escanos={filaElegida.sinBase ? 0 : filaElegida.escanosCentral} />
              {!noSePresenta && <Sugerencia />}
              <div class="row" style={{ marginTop: 16 }}>
                {elegida?.partido && (
                  <a class="btn" href={`#/contrasta/${elegida.partido}`}>
                    ← Contrastar su programa (paso 2)
                  </a>
                )}
              </div>
            </div>
          )}

          <Preferencias circ={circ} filas={filas} elegidaId={elegida?.id} sugeridaId={alternativa?.cand.id} />

          <div class="card">
            <h2 class="h3" id="tabla-candidaturas">
              Todas las candidaturas en {circ.nombre}
            </h2>
            <p class="muted" style={{ fontSize: '0.9rem' }}>
              {circ.candidaturas.length} candidaturas oficiales · {circ.escanos} escaños · fuente:{' '}
              <a href={circ.boe_url} target="_blank" rel="noopener">BOE {circ.boe_id}</a>
            </p>
            {/* Desplazable con el teclado cuando la tabla no cabe (móvil). */}
            <div class="scroll-x" tabIndex={0} role="region" aria-labelledby="tabla-candidaturas">
              <table>
                <thead>
                  <tr>
                    <th>Candidatura</th>
                    <th class="num">Votos</th>
                    <th class="num">Escaños</th>
                    <th style={{ minWidth: 140 }}>Opciones de escaño</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((f) => (
                    <tr key={f.cand.id} class={f.cand.id === elegida?.id ? 'tr-me' : ''}>
                      <td>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <MarcaPartido cand={f.cand} />
                          <div>
                            <strong>{f.cand.siglas}</strong>
                            <div class="muted" style={{ fontSize: '0.8rem' }}>
                              {f.cand.denominacion}
                              {f.cand.cabeza_lista ? ` · encabeza: ${f.cand.cabeza_lista}` : ''}
                              {(f.cand.coalicion?.miembros.length ?? 0) >= 2 && (
                                <>
                                  <br />
                                  Incluye: {f.cand.coalicion!.miembros.map((m) => m.siglas || m.nombre).join(', ')}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="num">{f.sinBase ? '—' : fmt.pct(f.cuota, 1)}</td>
                      <td class="num">{f.sinBase ? '—' : f.escanosCentral}</td>
                      <td>
                        {f.sinBase ? (
                          <small class="muted">sin datos para estimarla</small>
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
              «Votos»: porcentaje estimado en la provincia. «Escaños»: reparto con esas cifras. «Opciones de escaño»: en cuántas de 4.000
              repeticiones del cálculo logra al menos un escaño; en cada repetición movemos un poco los votos, tanto como se han equivocado
              las encuestas en las elecciones de 2015 a 2023. Son estimaciones, no predicciones: el resultado depende de lo que vote la gente.{' '}
              <a href="#/metodologia">Cómo se calcula</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
