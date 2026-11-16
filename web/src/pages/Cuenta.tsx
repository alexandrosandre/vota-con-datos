import { useMemo } from 'preact/hooks';
import { actualizar, estado } from '../store';
import { fase2, fmt, partido } from '../data';
import { simular, veredicto, type ResultadoSim } from '../engine/seats';
import type { CandidaturaCirc, Circunscripcion, Escenario } from '../types';
import { CabeceraPaso } from '../brand';
import { partidoPreferido, rankingActual } from '../paso1';
import { Compartir, enlace } from '../compartir';

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

/** Papeleta de un partido en esta provincia: la suya, la de la coalición en la que va o, si no se presenta, la de su partido afín. */
function filaDe(filas: Fila[], p: string) {
  return filas.find((f) => f.cand.partido === p) ?? filas.find((f) => f.cand.afines?.includes(p));
}

const esCoalicion = (c: CandidaturaCirc) => (c.coalicion?.miembros.length ?? 0) >= 2;

/** Partidos de los pasos 1 y 2 que se pueden votar en esta provincia, cada uno con su papeleta (la suya o la de su coalición). */

/** «el PP», «Podemos». */
function conArticulo(pid: string) {
  const p = partido(pid);
  return `${p?.articulo ? `${p.articulo} ` : ''}${p?.siglas ?? pid}`;
}

/** «A», «A y B», «A, B y C». */
function enumera(xs: string[]) {
  return xs.length <= 1 ? (xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}`;
}

/** «Palmas (Las)» → «Las Palmas» (los nombres oficiales ponen el artículo al final). */
function nombreLlano(n: string) {
  const m = n.match(/^(.*) \((.*)\)$/);
  return m ? `${m[2]} ${m[1]}` : n;
}

/** Frase llana de cómo se presenta un partido en la provincia cuando no es con su propia papeleta (o va en coalición con otro). */
function comoSePresenta(pid: string, cand: CandidaturaCirc, circ: Circunscripcion): string | null {
  if (!partido(pid)) return null;
  const otros = [cand.partido, ...(cand.afines ?? [])].filter((x): x is string => !!x && x !== pid);
  const donde = `En ${nombreLlano(circ.nombre)}, ${conArticulo(pid)}`;
  if (esCoalicion(cand)) {
    if (cand.partido === pid && otros.length === 0) return null;
    const junto = enumera(otros.map(conArticulo));
    return `${donde} se presenta dentro de la coalición ${cand.siglas}${junto ? `, ${junto.startsWith('el ') ? `junto al ${junto.slice(3)}` : `junto a ${junto}`}` : ''}.`;
  }
  if (cand.partido === pid) return null;
  const afin = conArticulo(cand.partido ?? '');
  return `${donde} no presenta candidatura propia: te mostramos la ${afin.startsWith('el ') ? `del ${afin.slice(3)}` : `de ${afin}`}, su partido afín.`;
}

/** «JxCat (Junts)», «COMPROMIS-EUPV-PODEM-ERPV (Compromís, Podemos, Frente Amplio y ERC)», «PP». */
function etiquetaPapeleta(c: CandidaturaCirc) {
  const dentro = [c.partido, ...(esCoalicion(c) ? (c.afines ?? []) : [])].filter((x): x is string => !!x);
  const nombres = dentro.map((x) => partido(x)?.siglas ?? x);
  const norm = (t: string) => t.normalize('NFD').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return nombres.length === 1 && norm(nombres[0]) === norm(c.siglas) ? c.siglas : `${c.siglas} (${enumera(nombres)})`;
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
/** Tu orden de preferencia, papeleta a papeleta: si dos partidos de tu orden van en la misma papeleta, sale una vez, en el puesto del primero. */
function gruposOrden(filas: Fila[], ranking: string[]): { fila: Fila; partidos: string[] }[] {
  const out: { fila: Fila; partidos: string[] }[] = [];
  for (const p of ranking) {
    const f = filaDe(filas, p);
    if (!f) continue;
    const g = out.find((x) => x.fila === f);
    if (g) g.partidos.push(p);
    else out.push({ fila: f, partidos: [p] });
  }
  return out;
}

export function Cuenta() {
  const d = fase2.value!;
  const e = estado.value;
  const pref = partidoPreferido.value;
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
    (pref ? circ?.candidaturas.find((c) => c.partido === pref || c.id === pref) : undefined) ??
    circ?.candidaturas.find((c) => !!pref && !!c.afines?.includes(pref)) ??
    null;
  const filaElegida = filas.find((f) => f.cand.id === elegida?.id);
  const noSePresenta = !!(circ && pref && !elegida);
  // Partido (pasos 1 y 2) que la persona quiere votar: el elegido o, si eligió una papeleta, su partido principal.
  const pidElegido = pref && partido(pref) ? pref : (elegida?.partido ?? null);
  const enCoalicion = circ && elegida && pidElegido ? comoSePresenta(pidElegido, elegida, circ) : null;
  // El desplegable muestra solo papeletas. La del partido que elegiste (o el más afín del paso 1) sale
  // seleccionada; el paso de partido a papeleta se explica debajo (enCoalicion) cuando no es obvio.
  const conPartido = (c: CandidaturaCirc) => !!c.partido || (esCoalicion(c) && (c.afines?.length ?? 0) > 0);
  const papeletasWeb = filas.map((f) => f.cand).filter(conPartido);
  const otrasCands = circ ? circ.candidaturas.filter((c) => !conPartido(c)).sort((a, b) => a.siglas.localeCompare(b.siglas, 'es')) : [];
  const valorSelect = elegida?.id ?? (noSePresenta ? pref! : '');
  const elegirPapeleta = (id: string) => {
    const c = circ?.candidaturas.find((x) => x.id === id);
    if (!c) return actualizar({ partido: id || null });
    // Si tu partido va en esa papeleta, se mantiene (cuenta para las demás provincias y el paso 2).
    const dentro = (pid: string | null) => !!pid && (c.partido === pid || (esCoalicion(c) && !!c.afines?.includes(pid)));
    if (pidElegido && dentro(pidElegido)) return actualizar({ partido: pidElegido });
    actualizar({ partido: c.partido ?? c.id });
  };

  // Sugerencia: el primero de tu orden de preferencia (sin contar tu voto) con P >= 50 % aquí.
  const pocasOpciones = noSePresenta || (!!filaElegida && !filaElegida.sinBase && filaElegida.pEscano < UMBRAL_RECOMENDACION);
  const ranking = rankingActual.value;
  const grupos = gruposOrden(filas, ranking);
  const alternativa = pocasOpciones
    ? grupos.map((g) => g.fila).find((f) => f.cand.id !== elegida?.id && !f.sinBase && f.pEscano >= UMBRAL_RECOMENDACION)
    : undefined;
  const posAlternativa = alternativa ? grupos.findIndex((g) => g.fila === alternativa) + 1 : 0;

  // Votos por diputado en 2023 del partido de la papeleta; no en coaliciones, que en 2023 no concurrieron así.
  const coste = elegida?.partido && !esCoalicion(elegida) ? d.coste_nacional_2023?.[elegida.partido] : undefined;

  const Sugerencia = () =>
    alternativa ? (
      <div class="note sugerencia" style={{ marginTop: 16 }}>
        <p style={{ margin: 0 }}>
          {noSePresenta ? 'Como no se presenta aquí, si' : `Con estos datos, tu voto a ${elegida!.siglas} tiene pocas opciones de convertirse en escaño en ${circ!.nombre}. Si`}{' '}
          quieres que tu voto ayude a elegir un diputado, el siguiente de tus partidos más afines del paso 1 que sí tiene opciones es{' '}
          <span class="nowrap">
            <MarcaPartido cand={alternativa.cand} /> <strong>{alternativa.cand.siglas}</strong>
          </span>{' '}
          (n.º {posAlternativa} en tu afinidad, {fmt.pct(alternativa.pEscano)} de probabilidad de escaño).
        </p>
        <p class="muted" style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Sale de <a href="#/elige/resultados">tu resultado del paso 1</a>, no de nuestra opinión. Votar a quien prefieres también es legítimo: tu voto cuenta para la financiación pública de los partidos y como
          señal política.
        </p>
      </div>
    ) : pocasOpciones ? (
      <div class="note" style={{ marginTop: 16 }}>
        {ranking.length === 0 ? (
          <>
            Si haces <a href="#/elige">el paso 1</a>, te señalamos cuál de tus partidos más afines tiene opciones aquí.
          </>
        ) : (
          <>Ninguno de tus partidos más afines del paso 1 llega al 50 % de probabilidad de escaño en {circ!.nombre} con estos datos.</>
        )}
      </div>
    ) : null;

  // El selector (provincia, papeleta y datos) va siempre arriba y desplegado, compacto en el móvil para que la
  // respuesta quede a la vista sin desplazarse (petición del editor, 15-nov).
  const formulario = (
    <>

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
            Papeleta que quieres votar
            <select value={valorSelect} onChange={(ev) => elegirPapeleta((ev.target as HTMLSelectElement).value)} disabled={!circ}>
              <option value="">{circ ? 'Elige papeleta…' : 'Primero elige provincia'}</option>
              {noSePresenta && <option value={pref!}>{partido(pref)?.siglas ?? pref} (no se presenta aquí)</option>}
              {papeletasWeb.length > 0 && (
                <optgroup label="Partidos de los pasos 1 y 2">
                  {papeletasWeb.map((c) => (
                    <option key={c.id} value={c.id}>
                      {etiquetaPapeleta(c)}
                    </option>
                  ))}
                </optgroup>
              )}
              {otrasCands.length > 0 && (
                <optgroup label="Otras candidaturas">
                  {otrasCands.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.siglas.toUpperCase() === c.denominacion.toUpperCase() ? c.siglas : `${c.siglas} — ${c.denominacion}`}
                    </option>
                  ))}
                </optgroup>
              )}
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
        <details class="desplegable" style={{ marginTop: 12 }}>
          <summary style={{ fontSize: '0.9rem' }}>¿De dónde salen estos datos?</summary>
          <p class="muted" style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
            {esc.descripcion}{' '}
            {esc.fuentes.map((f, i) => (
              <a key={i} href={f.url} target="_blank" rel="noopener" style={{ marginRight: 8 }}>
                {f.titulo ?? 'fuente'}
              </a>
            ))}
          </p>
        </details>
    </>
  );

  return (
    <div class="wrap page p3">
      <div class="narrow" style={{ padding: 0, marginLeft: 0 }}>
        <CabeceraPaso id="cuenta">
          En el Congreso cada provincia reparte sus propios escaños. Un voto solo ayuda a elegir a un diputado si su candidatura reúne
          suficientes votos en esa provincia. Aquí ves qué opciones tiene cada una, con las listas oficiales del BOE. Es información, no una
          recomendación: votar a quien prefieres siempre es legítimo.
        </CabeceraPaso>
      </div>

      <div class="card selector-p3">{formulario}</div>

      {enVeda && (
        <div class="note" style={{ marginTop: 14 }}>
          Del 24 de noviembre hasta el cierre de los colegios electorales, la ley electoral prohíbe publicar o reproducir encuestas (artículo
          69.7 de la Ley Orgánica del Régimen Electoral General). Por eso ahora solo puedes calcular con los resultados de 2023.
        </div>
      )}
      {circ && (
        <div class="stack" style={{ marginTop: 18 }}>
          {noSePresenta && (
            <div class="card reco">
              <h2 class="h3">
                <MarcaPartido pid={pref} size={26} /> {partido(pref)?.siglas ?? pref} no se presenta en {nombreLlano(circ.nombre)}
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
            <div class="card respuesta-p3">
              <div class="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div class="muted">{elegida!.denominacion} · {circ.nombre}</div>
                  <h2 style={{ margin: '4px 0 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <MarcaPartido cand={elegida!} size={34} /> {elegida!.siglas}
                  </h2>
                  {enCoalicion && <p style={{ margin: '0 0 10px' }}>{enCoalicion}</p>}
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
                      <>Ninguna de las opciones de «Calcular con» la estima, así que no podemos calcular sus opciones de escaño.</>
                    );
                  })()}
                </p>
              ) : (
                <div class="kpis">
                  <div class="kpi"><b>{fmt.pct(filaElegida.cuota, 1)}</b><span>de los votos en {circ.nombre}, según estos datos</span></div>
                  <div class="kpi"><b>{filaElegida.escanosMedia.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</b><span>escaños de media en las 4.000 repeticiones del cálculo (de {circ.escanos} en juego)</span></div>
                  <div class="kpi">
                    <b>{filaElegida.votosPorEscano ? fmt.n(filaElegida.votosPorEscano) : '—'}</b>
                    <span>votos que le cuesta cada escaño aquí</span>
                  </div>
                  <div class="kpi">
                    <b>{isFinite(filaElegida.votosParaSiguiente) ? fmt.n(filaElegida.votosParaSiguiente) : '—'}</b>
                    <span>votos más que le harían falta para {filaElegida.escanosCentral > 0 ? 'otro escaño' : 'su primer escaño'}</span>
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
              <div class="row" style={{ marginTop: 16, alignItems: 'flex-start' }}>
                {pidElegido && (
                  <a class="btn" href={`#/contrasta/${pidElegido}`}>
                    ← Contrastar sus propuestas (paso 2)
                  </a>
                )}
                {!filaElegida.sinBase && (
                  <Compartir
                    texto={
                      `En ${nombreLlano(circ.nombre)}, con «${esc.nombre}», ${elegida!.siglas} tiene un ${fmt.pct(filaElegida.pEscano)} de ` +
                      `probabilidad de lograr al menos un escaño (${filaElegida.escanosMedia.toLocaleString('es-ES', { maximumFractionDigits: 1 })} de media, de ${circ.escanos} en juego). ` +
                      'Mira las opciones de cada papeleta en tu provincia, con las listas del BOE:'
                    }
                    url={enlace('/suma', { circ: circ.ine, partido: pref ?? elegida!.id, escenario: esc.id })}
                    titulo={`${elegida!.siglas} en ${nombreLlano(circ.nombre)} · vota con datos`}
                  />
                )}
              </div>
            </div>
          )}



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
                    <th class="num">Votos (%)</th>
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
              «Votos»: porcentaje de votos estimado en la provincia. «Escaños»: cómo se repartirían con esos porcentajes, según la ley
              electoral. «Opciones de escaño»: en cuántas de 4.000 repeticiones del cálculo logra al menos un escaño. En cada repetición
              movemos un poco los votos al azar,{' '}
              {esc.id === 'g2023'
                ? 'tanto como suele cambiar el voto de una elección a otra'
                : 'tanto como se suelen equivocar las encuestas'}{' '}
              según lo ocurrido en las elecciones de 2015 a 2023. Son estimaciones, no predicciones: el resultado depende de lo que vote la
              gente.{' '}
              <a href="#/metodologia">Cómo se calcula</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
