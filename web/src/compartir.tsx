import { useState } from 'preact/hooks';

/**
 * Botones para compartir un resultado o una propuesta. Sin scripts de terceros: cada red es un enlace
 * normal que se abre solo si se pulsa, con el texto que se ve aquí. No se envía nada más.
 */

/** Enlace absoluto a una ruta de la web (con parámetros opcionales para el paso 3: ?circ=…). */
export function enlace(ruta: string, params?: Record<string, string>): string {
  const q = params ? `?${new URLSearchParams(params)}` : '';
  return `${location.origin}${import.meta.env.BASE_URL}${q}#${ruta}`;
}

const enc = encodeURIComponent;
export const REDES: { nombre: string; url: (texto: string, url: string, titulo: string) => string }[] = [
  { nombre: 'WhatsApp', url: (t, u) => `https://wa.me/?text=${enc(`${t} ${u}`)}` },
  { nombre: 'Telegram', url: (t, u) => `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}` },
  { nombre: 'X', url: (t, u) => `https://x.com/intent/tweet?text=${enc(t)}&url=${enc(u)}` },
  { nombre: 'Bluesky', url: (t, u) => `https://bsky.app/intent/compose?text=${enc(`${t} ${u}`)}` },
  { nombre: 'Facebook', url: (_t, u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}` },
  { nombre: 'LinkedIn', url: (_t, u) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}` },
  { nombre: 'Correo', url: (t, u, ti) => `mailto:?subject=${enc(ti)}&body=${enc(`${t}\n\n${u}`)}` },
];

async function copiar(s: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(s);
    return true;
  } catch {
    // Navegadores sin API del portapapeles (o sin permiso): textarea temporal.
    const ta = document.createElement('textarea');
    ta.value = s;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      /* sin portapapeles */
    }
    ta.remove();
    return ok;
  }
}

/** En el móvil, la hoja de compartir del sistema; en el ordenador, la lista de redes. */
const usarHojaDelSistema = () =>
  typeof navigator.share === 'function' && !!window.matchMedia?.('(pointer: coarse)').matches;

export function Compartir({
  texto,
  url,
  titulo = 'vota con datos',
  etiqueta = 'Compartir',
  compacto = false,
}: {
  texto: string;
  url: string;
  titulo?: string;
  etiqueta?: string;
  compacto?: boolean;
}) {
  const [abierto, setAbierto] = useState(false);
  const [aviso, setAviso] = useState('');
  const estilo = compacto ? { padding: '6px 12px', fontSize: '0.86rem' } : undefined;

  const compartir = async () => {
    if (usarHojaDelSistema()) {
      try {
        await navigator.share({ title: titulo, text: texto, url });
        return;
      } catch (e) {
        if ((e as Error)?.name === 'AbortError') return; // la persona cerró la hoja
      }
    }
    setAbierto(!abierto);
  };
  const alCopiar = async () => {
    const ok = await copiar(`${texto} ${url}`);
    setAviso(ok ? 'Copiado: texto y enlace' : 'No se pudo copiar; selecciona el texto de abajo');
    if (!ok) setAbierto(true);
    setTimeout(() => setAviso(''), 2500);
  };

  return (
    <div class="compartir">
      <div class="row" style={{ gap: 8 }}>
        <button class="btn" style={estilo} onClick={compartir} aria-expanded={abierto}>
          <IconoCompartir /> {etiqueta}
        </button>
        <button class="btn ghost" style={estilo} onClick={alCopiar}>
          Copiar
        </button>
        <span class="muted" role="status" style={{ fontSize: '0.86rem' }}>
          {aviso}
        </span>
      </div>
      {abierto && (
        <div class="compartir-panel">
          <p class="compartir-texto">
            {texto} <span class="muted">{url}</span>
          </p>
          <div class="row" role="group" aria-label="Compartir en" style={{ gap: 6 }}>
            {REDES.map((r) => (
              <a key={r.nombre} class="chip-btn" href={r.url(texto, url, titulo)} target="_blank" rel="noopener noreferrer">
                {r.nombre}
              </a>
            ))}
          </div>
          <p class="muted" style={{ fontSize: '0.8rem', margin: '8px 0 0' }}>
            Se abre la red que elijas con este texto, que puedes cambiar antes de publicar. No enviamos nada más.
          </p>
        </div>
      )}
    </div>
  );
}

function IconoCompartir() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}
