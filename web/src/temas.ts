/**
 * Temas visuales alternativos (propuestas de diseño para elegir).
 *
 * Cada tema es una hoja de estilos independiente en web/public/temas/<id>.css, con todas sus reglas
 * bajo html[data-tema="<id>"], que se carga solo cuando se elige. El tema base ("cívico") es
 * src/index.css. Se elige con ?tema=<id> en la URL (se recuerda en este navegador) y el modo con
 * ?modo=claro|oscuro (útil para capturas). Valoración completa: docs/research/disenos.md.
 */
export interface Tema {
  id: string;
  nombre: string;
  idea: string;
  fortalezas: string;
  riesgos: string;
}

export const TEMAS: Tema[] = [
  {
    id: 'civico',
    nombre: 'Cívico (actual)',
    idea: 'Papel cálido y tinta, serif editorial en titulares, un color por paso.',
    fortalezas: 'El más equilibrado: tranquilo, legible, con identidad propia; los tres colores orientan en el recorrido.',
    riesgos: 'Puede parecer poco enérgico al lado de una campaña real.',
  },
  {
    id: 'fuerte',
    nombre: 'Color fuerte',
    idea: 'Un único ultramar eléctrico a sangre, tipografía muy negra; los pasos son tonos del mismo color.',
    fortalezas: 'El que más «marca» tiene: se reconoce de lejos y transmite seguridad.',
    riesgos: 'Elegido entre el azul del PP y el morado de Podemos: según la pantalla, alguien puede asociarlo a uno u otro.',
  },
  {
    id: 'campana',
    nombre: 'Campaña',
    idea: 'Negro y papel, titulares condensados en mayúsculas, bandas de color y botones rectos.',
    fortalezas: 'El de más energía y llamada a la acción; la portada funciona como un cartel.',
    riesgos: 'Adopta el lenguaje de la propaganda electoral, lo que puede restar credibilidad a una herramienta neutral.',
  },
  {
    id: 'campana-amarillo',
    nombre: 'Campaña · amarillo (contrapropuesta)',
    idea: 'Tu elegido, solo en oscuro: negro profundo, un amarillo rotundo y los tres pasos como tres pilares verticales.',
    fortalezas: 'Máximo contraste y energía; los tres pilares hacen evidente el recorrido Coincide · Contrasta · Cuenta.',
    riesgos: 'El amarillo ácido elegido (#E9F542) se aleja del dorado de Coalición Canaria y del ámbar de ERC (la CUP, de amarillo limón, no se presenta), pero el amarillo evoca para algunos el lazo del independentismo catalán.',
  },
  {
    id: 'datos',
    nombre: 'Datos',
    idea: 'Grafito, rejilla, cifras en monoespaciada; comparar y contrastar como motivo gráfico.',
    fortalezas: 'Los mejores componentes de datos (color + forma, cifras tabulares); moderno y preciso.',
    riesgos: 'El aire técnico puede alejar a quien no se siente cómodo con los números.',
  },
  {
    id: 'editorial',
    nombre: 'Editorial',
    idea: 'El especial electoral de un buen diario: serif de prensa, filetes, columnas, tintas sobrias.',
    fortalezas: 'El más sobrio y creíble; el mejor para leer textos largos (metodología, análisis, citas).',
    riesgos: 'Puede recordar a un medio concreto y es el menos llamativo para público joven.',
  },
];

const CLAVE = 'vcd-tema';
/** Diseño que ve quien no ha elegido otro en la galería. */
export const TEMA_POR_DEFECTO = 'civico';

function param(n: string): string | null {
  return new URLSearchParams(location.search).get(n);
}

export function temaActual(): string {
  const p = param('tema');
  if (p && TEMAS.some((t) => t.id === p)) {
    try {
      localStorage.setItem(CLAVE, p);
    } catch {
      /* sin almacenamiento */
    }
    return p;
  }
  try {
    const g = localStorage.getItem(CLAVE);
    if (g && TEMAS.some((t) => t.id === g)) return g;
  } catch {
    /* sin almacenamiento */
  }
  return TEMA_POR_DEFECTO;
}

export function aplicarTema(id = temaActual()) {
  const html = document.documentElement;
  html.dataset.tema = id;
  const modo = param('modo');
  if (modo === 'oscuro') html.dataset.theme = 'dark';
  if (modo === 'claro') html.dataset.theme = 'light';
  let link = document.getElementById('tema-css') as HTMLLinkElement | null;
  if (id === 'civico') {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.id = 'tema-css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = `${import.meta.env.BASE_URL}temas/${id}.css`;
}
