import { Logotipo, PASOS } from '../brand';
import { REPO } from '../data';

/** Paleta del diseño «Campaña» (siempre oscuro). Fuente de verdad: web/public/temas/campana.css. */
const NEUTROS = [
  { n: 'Negro', hex: '#000000', uso: 'Cabecera y héroe' },
  { n: 'Fondo', hex: '#0E0E10', uso: 'Fondo de página' },
  { n: 'Superficie', hex: '#151518', uso: 'Tarjetas' },
  { n: 'Banda', hex: '#19191D', uso: 'Cifras y pie' },
  { n: 'Tinta', hex: '#F4F2EB', uso: 'Texto principal' },
  { n: 'Tinta 2', hex: '#CAC8C1', uso: 'Texto secundario' },
];
const VALORACIONES = [
  { n: 'Sólida', hex: '#2FAE66', s: '✓' },
  { n: 'Matizable', hex: '#F0B43C', s: '~' },
  { n: 'Débil', hex: '#FF6B5E', s: '✕' },
  { n: 'No verificable', hex: '#8A8983', s: '?' },
];
const PASO_HEX: Record<string, { vivo: string; banda: string; nombre: string }> = {
  p1: { vivo: '#FF9670', banda: '#A93F1C', nombre: 'óxido' },
  p2: { vivo: '#B1AEFF', banda: '#3F3C9A', nombre: 'índigo' },
  p3: { vivo: '#5CCFB4', banda: '#0E6654', nombre: 'verde datos' },
};

export function Marca() {
  return (
    <div class="narrow page">
      <div class="kicker">Marca</div>
      <h1>vota con datos</h1>
      <p class="lead">
        Una herramienta cívica con la energía de una campaña y la neutralidad de un servicio público: negro, tipografía rotunda y tres colores
        que no pertenecen a ningún partido.
      </p>

      <h2 style={{ marginTop: 40 }}>Símbolo y logotipo</h2>
      <div class="grid-2">
        <div class="lienzo" style={{ background: '#000', color: '#fff' }}>
          <Logotipo size={44} />
        </div>
        <div
          class="lienzo"
          style={{ background: '#F4F2EC', color: '#111114', borderColor: '#F4F2EC', ['--p1' as any]: '#A93F1C', ['--p2' as any]: '#3F3C9A', ['--p3' as any]: '#0E6654' }}
        >
          <Logotipo size={44} />
        </div>
      </div>
      <p style={{ marginTop: 14 }}>
        El símbolo es una <strong>urna</strong> vista de frente —marco redondeado y ranura— llena de <strong>tres barras crecientes</strong>, una
        por paso y en su color: el voto, hecho de datos. El logotipo escribe «vota con datos» con la letra Archivo, estrecha, muy gruesa y en
        mayúsculas, con <em>con</em> más suave para que se lea «vota · datos». Sobre negro, las barras van en tono vivo; sobre fondo claro, en
        tono oscuro. Alrededor del símbolo se deja libre, como mínimo, un espacio igual a la altura de la ranura. Fuera de la web (icono de la
        pestaña del navegador, icono de aplicación, redes sociales) el símbolo va sobre su propio cuadrado negro, que se ve igual en fondos
        claros y oscuros.
      </p>
      <p>
        Ficheros: <a href={`${REPO}/tree/main/web/public/marca`}>web/public/marca</a> (símbolo en color y en un solo color, logotipo horizontal,
        icono de pestaña, icono de aplicación e imagen para redes sociales).
      </p>

      <h2 style={{ marginTop: 40 }}>Los tres pasos</h2>
      <div class="pasos-marca">
        {PASOS.map((p) => (
          <div key={p.id} class={p.clase}>
            <b>{p.n}</b>
            <span>{p.verbo}</span>
            <p>{p.pregunta}</p>
          </div>
        ))}
      </div>
      <p>
        Tres verbos en imperativo, uno por paso, que dicen lo que hace la persona, no lo que hace la herramienta. Cada paso tiene su color: en
        tono oscuro para las franjas que ocupan todo el ancho (portada, cabecera de cada paso, enlace al siguiente) y en tono vivo para cifras,
        barras y detalles sobre negro.
      </p>

      <h2 style={{ marginTop: 40 }}>Color</h2>
      <h3>Neutros</h3>
      <div class="muestras">
        {NEUTROS.map((c) => (
          <div class="muestra" key={c.n}>
            <i style={{ background: c.hex, boxShadow: 'inset 0 0 0 1px var(--line)' }} />
            <div>
              <strong>{c.n}</strong>
              <br />
              <code>{c.hex}</code>
              <br />
              {c.uso}
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ marginTop: 24 }}>Pasos</h3>
      <div class="muestras">
        {PASOS.map((p) => {
          const h = PASO_HEX[p.clase];
          return (
            <div class="muestra" key={p.id}>
              <i style={{ background: `linear-gradient(90deg, ${h.banda} 50%, ${h.vivo} 50%)` }} />
              <div>
                <strong>
                  {p.n} · {p.verbo}
                </strong>
                <br />
                <code>{h.banda}</code> oscuro · <code>{h.vivo}</code> vivo
                <br />
                {h.nombre}
              </div>
            </div>
          );
        })}
      </div>
      <h3 style={{ marginTop: 24 }}>Valoraciones</h3>
      <div class="muestras">
        {VALORACIONES.map((c) => (
          <div class="muestra" key={c.n}>
            <i style={{ background: c.hex, display: 'grid', placeItems: 'center', color: '#0E0E10', fontWeight: 900, fontSize: '1.6rem' }} aria-hidden="true">
              {c.s}
            </i>
            <div>
              <strong>{c.n}</strong>
              <br />
              <code>{c.hex}</code>
            </div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 14 }}>
        Ni el rojo, el azul, el verde, el magenta, el morado, el amarillo, el naranja ni el turquesa de los partidos: los tres colores de paso solo
        aparecen juntos y en ese orden. En gráficos, los partidos se distinguen por nombre y posición, nunca por color. Las valoraciones llevan
        color y símbolo (✓ ~ ✕ ?) para leerse también sin distinguir colores. Todo el texto tiene contraste suficiente para leerse bien: cumple
        el nivel AA de las pautas internacionales de accesibilidad (WCAG), que pide un contraste de al menos 4,5 a 1. El blanco sobre las
        franjas de color llega a 6,2, 9 y 6,9 a 1; el texto sobre el fondo, a 17 a 1.
      </p>

      <h2 style={{ marginTop: 40 }}>Tipografía</h2>
      <div class="card">
        <p class="tipo-muestra">Vota con datos.</p>
        <p class="muted">Archivo estrecha (entre el 62 y el 68 % de su anchura normal), muy gruesa y en mayúsculas: titulares cortos, lema y cifras grandes.</p>
        <p style={{ fontSize: '1.15rem', margin: '22px 0 6px' }}>
          Archivo a anchura normal para el texto, los botones y los menús: se lee bien en pantalla, y sus cifras ocupan todas el mismo ancho
          para que se alineen en las tablas.
        </p>
        <p class="muted" style={{ margin: 0 }}>
          Grosor de normal a negrita. Textos largos (metodología, análisis) en minúsculas y a anchura normal; las mayúsculas estrechas se
          reservan para titulares breves, botones y etiquetas.
        </p>
      </div>

      <h2 style={{ marginTop: 40 }}>Voz</h2>
      <ul>
        <li><strong>Clara:</strong> frases cortas, palabras de uso común, tuteo. «Tu voto tendrá escaño», no «utilidad marginal del sufragio».</li>
        <li><strong>Sobria:</strong> sin adjetivos de valor ni exclamaciones. Los datos hablan; nosotros los explicamos.</li>
        <li><strong>Honesta:</strong> lo que no sabemos, lo decimos («no verificable», «aún no publicado»). Nunca rellenamos un hueco.</li>
        <li><strong>Respetuosa:</strong> no decimos a quién votar. Votar a quien prefieres siempre es legítimo.</li>
      </ul>
    </div>
  );
}
