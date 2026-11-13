import { useMemo } from 'preact/hooks';
import { actualizar, estado } from '../store';
import { fase2, fmt, partido } from '../data';
import { simular, veredicto, type ResultadoSim } from '../engine/seats';
import type { CandidaturaCirc, Circunscripcion, Escenario } from '../types';
import { CabeceraPaso } from '../brand';
import { paso1, rankingActual } from '../paso1';

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
function partidosAqui(circ: Circunscripcion): { pid: string; cand: CandidaturaCirc }[] {
  const out: { pid: string; cand: CandidaturaCirc }[] = [];
  for (const c of circ.candidaturas) if (c.partido) out.push({ pid: c.partido, cand: c });
  for (const c of circ.candidaturas)
    if (esCoalicion(c))
      for (const a of c.afines ?? []) if (!out.some((x) => x.pid === a)) out.push({ pid: a, cand: c });
  return out;
}

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

function Preferencias({
  circ,
  filas,
  elegidaId,
  sugeridaId,
  pidElegido,
}: {
  circ: Circunscripcion;
  filas: Fila[];
  elegidaId?: string;
  sugeridaId?: string;
  pidElegido?: string | null;
}) {
  const e = estado.value;
  const ranking = rankingActual.value;
  const af = paso1.value;
  const grupos = gruposOrden(filas, ranking);
  const ausentes = ranking.filter((p) => !filaDe(filas, p)).length;
  // Solo papeletas que aún no están en tu orden: un partido cuya papeleta ya está se vería dentro de esa fila, no al final.
  const candidatos = partidosAqui(circ).filter((x) => !ranking.includes(x.pid) && !grupos.some((g) => g.fila.cand.id === x.cand.id));

  const poner = (r: string[]) => actualizar({ ranking: r, rankingOrigen: 'manual' });
  // Mueve una papeleta un puesto: intercambia el primer partido de cada una (los que no se presentan aquí no cuentan).
  const mover = (gi: number, d: number) => {
    const j = gi + d;
    if (j < 0 || j >= grupos.length) return;
    const l = ranking.slice();
    const a = l.indexOf(grupos[gi].partidos[0]);
    const b = l.indexOf(grupos[j].partidos[0]);
    [l[a], l[b]] = [l[b], l[a]];
    poner(l);
  };
  const volverPaso1 = () => actualizar({ ranking: af?.orden ?? [], rankingOrigen: 'fase1' });
  // El orden es uno para todas las provincias: quitar una papeleta compartida quita a todos sus partidos.
  const quitar = (g: { fila: Fila; partidos: string[] }) => {
    const sigs = g.partidos.map((x) => partido(x)?.siglas ?? x);
    if (g.partidos.length > 1 && !confirm(`En esta papeleta van ${enumera(sigs)}. ¿Quitarlos a todos de tu orden? Tu orden es el mismo para todas las provincias.`)) return;
    poner(ranking.filter((x) => !g.partidos.includes(x)));
  };

  return (
    <div class="card" id="preferencias">
      <h2 class="h3" style={{ marginBottom: 6 }}>
        Tu orden de preferencia
      </h2>
      <p class="muted" style={{ marginTop: 0 }}>
        Sirve solo para una cosa: si el partido que quieres votar tiene pocas opciones de escaño en {circ.nombre}, te señalamos el siguiente
        de esta lista que sí las tiene (al menos un 50 % de probabilidad de escaño). Este orden no sale de tu navegador.
      </p>

      {ranking.length === 0 && e.rankingOrigen !== 'manual' ? (
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
              onClick={() => poner(pidElegido && filaDe(filas, pidElegido) ? [pidElegido] : [])}
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
                <span class="etiqueta-origen manual">Ordenado por ti</span>{' '}
                {ranking.length === 0 ? 'Añade los partidos en el orden que prefieras con la lista de abajo.' : 'Este orden lo has puesto tú.'}{' '}
                {af && (
                  <button class="link-btn" onClick={volverPaso1}>
                    Volver al orden del paso 1
                  </button>
                )}
              </>
            )}
          </div>
          <ol class="orden-pref">
            {grupos.map((g, i) => {
              const f = g.fila;
              const p = g.partidos[0];
              const afs = e.rankingOrigen === 'fase1' && af ? g.partidos.map((x) => [x, af.pct[x]] as const).filter(([, a]) => a !== undefined) : [];
              // Quién va de verdad en esta papeleta y quién llega a ella solo como partido afín (el PSC fuera de Cataluña).
              const enPapeleta = (x: string) => f.cand.partido === x || (esCoalicion(f.cand) && !!f.cand.afines?.includes(x));
              const dentro = g.partidos.filter(enPapeleta).map((x) => partido(x)?.siglas ?? x);
              const afinesFuera = g.partidos.filter((x) => !enPapeleta(x)).map((x) => partido(x)?.siglas ?? x);
              const sigs = g.partidos.map((x) => partido(x)?.siglas ?? x);
              const varios = g.partidos.length > 1;
              const sig = varios ? f.cand.siglas : sigs[0];
              return (
                <li key={f.cand.id} class={f.cand.id === elegidaId ? 'es-voto' : f.cand.id === sugeridaId ? 'es-sugerida' : ''}>
                  <span class="pos">{i + 1}</span>
                  <MarcaPartido cand={f.cand} pid={varios ? f.cand.partido : p} />
                  <span class="nombre">
                    <strong>{sig}</strong>
                    {varios ? (
                      <span class="muted">
                        {dentro.length > 1 && ` · aquí van juntos ${enumera(dentro)}`}
                        {afinesFuera.length > 0 &&
                          ` · ${enumera(afinesFuera)} no se ${afinesFuera.length > 1 ? 'presentan' : 'presenta'} aquí: su partido afín`}
                      </span>
                    ) : (
                      f.cand.partido !== p && <span class="muted"> · en {f.cand.siglas}</span>
                    )}
                    {f.cand.id === elegidaId && <span class="tag">tu voto</span>}
                    {f.cand.id === sugeridaId && <span class="tag tag-sug">sugerida</span>}
                    {afs.length === 1 && !varios && <span class="muted"> · afinidad {afs[0][1]} %</span>}
                    {varios && afs.length > 0 && (
                      <span class="muted"> · afinidad {afs.map(([x, a]) => `${partido(x)?.siglas ?? x} ${a} %`).join(', ')}</span>
                    )}
                  </span>
                  <span class="prob">{f.sinBase ? '—' : fmt.pct(f.pEscano)}</span>
                  <span class="acciones">
                    <button aria-label={`Subir ${sig}`} onClick={() => mover(i, -1)} disabled={i === 0}>↑</button>
                    <button aria-label={`Bajar ${sig}`} onClick={() => mover(i, 1)} disabled={i === grupos.length - 1}>↓</button>
                    <button aria-label={`Quitar ${sig} de tu orden`} onClick={() => quitar(g)}>✕</button>
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
                    if (v) poner([...ranking, v]);
                  }}
                >
                  <option value="">+ Añadir un partido al final…</option>
                  {candidatos.map((x) => (
                    <option key={x.pid} value={x.pid}>
                      {partido(x.pid)?.siglas ?? x.pid}
                      {x.cand.partido !== x.pid ? ` (en ${x.cand.siglas})` : ''}
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
  // Partido (pasos 1 y 2) que la persona quiere votar: el elegido o, si eligió una papeleta, su partido principal.
  const pidElegido = e.partido && partido(e.partido) ? e.partido : (elegida?.partido ?? null);
  const enCoalicion = circ && elegida && pidElegido ? comoSePresenta(pidElegido, elegida, circ) : null;
  const opciones = circ ? partidosAqui(circ) : [];
  const otrasCands = circ ? circ.candidaturas.filter((c) => !c.partido) : [];
  const valorSelect = opciones.some((x) => x.pid === e.partido)
    ? e.partido!
    : elegida?.partido && opciones.some((x) => x.pid === elegida.partido)
      ? elegida.partido
      : (elegida?.id ?? e.partido ?? '');

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
          , no de nuestra opinión. Votar a quien prefieres también es legítimo: tu voto cuenta para la financiación pública de los partidos y como
          señal política.
        </p>
      </div>
    ) : pocasOpciones ? (
      <div class="note" style={{ marginTop: 16 }}>
        {ranking.length === 0 ? (
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
              value={valorSelect}
              onChange={(ev) => actualizar({ partido: (ev.target as HTMLSelectElement).value || null })}
              disabled={!circ}
            >
              <option value="">{circ ? 'Elige partido…' : 'Primero elige provincia'}</option>
              {noSePresenta && <option value={e.partido!}>{partido(e.partido)?.siglas ?? e.partido} (no se presenta aquí)</option>}
              {opciones.length > 0 && (
                <optgroup label="Partidos">
                  {opciones.map((x) => (
                    <option key={x.pid} value={x.pid}>
                      {partido(x.pid)?.siglas ?? x.pid} —{' '}
                      {x.cand.partido === x.pid && !(x.cand.afines?.length && esCoalicion(x.cand)) ? x.cand.denominacion : `en la papeleta ${x.cand.siglas}`}
                    </option>
                  ))}
                </optgroup>
              )}
              {otrasCands.length > 0 && (
                <optgroup label="Otras candidaturas">
                  {otrasCands.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.siglas} — {c.denominacion}
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
          Del 24 de noviembre hasta el cierre de los colegios electorales, la ley electoral prohíbe publicar o reproducir encuestas (artículo
          69.7 de la Ley Orgánica del Régimen Electoral General). Por eso ahora solo puedes calcular con los resultados de 2023.
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
              <div class="row" style={{ marginTop: 16 }}>
                {pidElegido && (
                  <a class="btn" href={`#/contrasta/${pidElegido}`}>
                    ← Contrastar sus propuestas (paso 2)
                  </a>
                )}
              </div>
            </div>
          )}

          <Preferencias circ={circ} filas={filas} elegidaId={elegida?.id} sugeridaId={alternativa?.cand.id} pidElegido={pidElegido} />

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
