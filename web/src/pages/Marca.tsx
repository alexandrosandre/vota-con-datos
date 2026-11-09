import { Logotipo, PASOS, Simbolo } from '../brand';
import { REPO } from '../data';

const COLORES = [
  { n: 'Tinta', v: '--ink', hex: '#16161A / #F2F0EA', uso: 'Texto y símbolo' },
  { n: 'Papel', v: '--paper', hex: '#F7F5F0 / #121214', uso: 'Fondo' },
  { n: 'Coincide', v: '--p1', hex: '#C2502B / #EF8A63', uso: 'Paso 1 · terracota' },
  { n: 'Contrasta', v: '--p2', hex: '#4A47A3 / #A9A6F2', uso: 'Paso 2 · índigo' },
  { n: 'Cuenta', v: '--p3', hex: '#13715F / #5CC4AD', uso: 'Paso 3 · verde datos' },
  { n: 'Sólida', v: '--ok', hex: '#1D6A3C', uso: 'Valoración' },
  { n: 'Matizable', v: '--mid', hex: '#7A5205', uso: 'Valoración' },
  { n: 'Débil', v: '--bad', hex: '#962A20', uso: 'Valoración' },
];

export function Marca() {
  return (
    <div class="narrow page">
      <div class="kicker">Marca</div>
      <h1>vota con datos</h1>
      <p class="lead">
        Una herramienta cívica tiene que parecer lo que es: clara, sobria y fiable. La marca no pertenece a ningún color político y se apoya en
        el contenido.
      </p>

      <h2 style={{ marginTop: 40 }}>Símbolo y logotipo</h2>
      <div class="grid-2">
        <div class="lienzo" style={{ background: 'var(--card)' }}>
          <Logotipo size={44} />
        </div>
        <div class="lienzo" style={{ background: '#16161a', color: '#f2f0ea', ['--p1' as any]: '#ef8a63', ['--p2' as any]: '#a9a6f2', ['--p3' as any]: '#5cc4ad' }}>
          <span class="logotipo">
            <Simbolo size={44} />
            <span class="wordmark" style={{ color: '#f2f0ea' }}>
              vota <span class="con" style={{ color: '#8f8d88' }}>con</span> datos
            </span>
          </span>
        </div>
      </div>
      <p style={{ marginTop: 14 }}>
        El símbolo es una <strong>urna</strong> vista de frente —marco redondeado y ranura— llena de <strong>tres barras crecientes</strong>, una
        por paso y en su color: el voto, hecho de datos. El logotipo se escribe siempre en minúsculas, con <em>con</em> en cursiva y más suave,
        para que se lea «vota · datos». Versión monocroma para un solo color. Área de respeto: la altura de la ranura alrededor del símbolo.
      </p>
      <p>
        Ficheros: <a href={`${REPO}/tree/main/web/public/marca`}>web/public/marca</a> (SVG del símbolo, logotipo horizontal, monocromo e imagen
        para redes).
      </p>

      <h2 style={{ marginTop: 40 }}>Los tres pasos</h2>
      <div class="trayecto" style={{ margin: '12px 0' }}>
        {PASOS.map((p) => (
          <div key={p.id} class={`etapa ${p.clase}`}>
            <div class="num">
              <b>{p.n}</b>
              <span>{p.verbo}</span>
            </div>
            <p>{p.pregunta}</p>
          </div>
        ))}
      </div>
      <p>
        Lema: <strong>Coincide. Contrasta. Cuenta.</strong> Tres verbos en imperativo, uno por paso, que dicen lo que hace la persona, no lo que
        hace la herramienta. Cada paso tiene un color propio que se usa con moderación: números, barras, botón principal y acentos.
      </p>

      <h2 style={{ marginTop: 40 }}>Color</h2>
      <div class="muestras">
        {COLORES.map((c) => (
          <div class="muestra" key={c.n}>
            <i style={{ background: `var(${c.v})` }} />
            <div>
              <strong>{c.n}</strong>
              <br />
              <span class="muted">{c.hex}</span>
              <br />
              {c.uso}
            </div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 14 }}>
        Neutros cálidos de papel y tinta para que el contenido mande. No se usan nunca los colores corporativos de los partidos: en gráficos,
        los partidos se distinguen por nombre y posición, no por color. Todos los pares texto/fondo cumplen contraste WCAG AA; hay modo oscuro.
      </p>

      <h2 style={{ marginTop: 40 }}>Tipografía</h2>
      <div class="card">
        <p style={{ fontFamily: 'var(--serif)', fontSize: '2rem', lineHeight: 1.15, margin: '0 0 6px' }}>Fraunces — titulares y cifras</p>
        <p class="muted">Serif editorial con calidez; transmite seriedad sin solemnidad. Pesos 500–600.</p>
        <p style={{ fontSize: '1.2rem', margin: '18px 0 6px', fontWeight: 600 }}>Inter — texto e interfaz</p>
        <p class="muted" style={{ margin: 0 }}>Sans-serif de máxima legibilidad en pantalla, con cifras tabulares para los datos. Pesos 400–700.</p>
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
