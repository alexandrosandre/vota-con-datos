/**
 * Temas visuales alternativos (propuestas de diseño para elegir).
 *
 * Cada tema es una hoja de estilos independiente en web/public/temas/<id>.css, con todas sus reglas
 * bajo html[data-tema="<id>"], que se carga solo cuando se elige. El tema base ("cívico") es
 * src/index.css. Se elige con ?tema=<id> en la URL (se recuerda en este navegador) y el modo con
 * ?modo=claro|oscuro (útil para capturas).
 */
export interface Tema {
  id: string;
  nombre: string;
  idea: string;
}

export const TEMAS: Tema[] = [
  { id: 'civico', nombre: 'Cívico', idea: 'El diseño actual: papel y tinta, serif editorial, un color por paso.' },
  { id: 'fuerte', nombre: 'Color fuerte', idea: 'Un color principal saturado y rotundo, como las webs de los partidos, pero que no se identifica con ninguno.' },
  { id: 'campana', nombre: 'Campaña', idea: 'El lenguaje de las webs de campaña: héroe grande, tipografía rotunda, llamadas a la acción claras.' },
  { id: 'datos', nombre: 'Datos', idea: 'Moderno y analítico: rejilla, contraste y la comparación como motivo gráfico.' },
  { id: 'editorial', nombre: 'Editorial', idea: 'Como un buen diario digital: jerarquía tipográfica, columnas y sobriedad periodística.' },
];

const CLAVE = 'vcd-tema';

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
  return 'civico';
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
