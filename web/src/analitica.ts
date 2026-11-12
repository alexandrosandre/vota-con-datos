/**
 * Recuento anónimo de visitas con GoatCounter (https://www.goatcounter.com), sin cookies y sin
 * guardar nada nuevo en el navegador. Explicado al público en #/privacidad.
 *
 * Qué se envía, por cada página vista: la ruta de la página (p. ej. /contrasta/vox, nunca tus
 * respuestas), de qué web llegas, el tamaño de pantalla y, por el propio envío, el navegador y la IP.
 * GoatCounter no guarda la IP: la usa para saber el país y para no contar dos veces la misma visita
 * (lo recuerda en memoria como mucho 8 horas).
 *
 * Visitante nuevo o recurrente: una vez por visita se envía un evento «visitante-nuevo» o
 * «visitante-recurrente». Se decide mirando si el navegador ya tenía guardado el estado de la web
 * (que guardamos de todos modos para que puedas volver a tus respuestas); no se guarda nada más.
 *
 * Se respeta «No rastrear» (Do Not Track) y Global Privacy Control: con ellos no se envía nada.
 * Sin código configurado, o en desarrollo, no se envía nada.
 */
import { ruta } from './store';

/** Código del sitio en GoatCounter (https://<código>.goatcounter.com). Vacío = desactivado. */
export const GOATCOUNTER = '';

const navegadorPideNoRastrear = () =>
  (navigator as any).globalPrivacyControl === true || navigator.doNotTrack === '1' || (window as any).doNotTrack === '1';

function enviar(params: Record<string, string>) {
  const q = new URLSearchParams({ ...params, rnd: Math.random().toString(36).slice(2, 8) });
  // Petición de imagen: sin scripts de terceros, sin cookies (GoatCounter no las pone).
  const img = new Image();
  img.referrerPolicy = 'no-referrer';
  img.src = `https://${GOATCOUNTER}.goatcounter.com/count?${q}`;
}

/** Solo la ruta, sin parámetros: nunca se envían respuestas, provincias ni partidos elegidos en la URL. */
const rutaLimpia = (r: string) => '/' + r.replace(/^\/+/, '').split('?')[0];

export function iniciarAnalitica(habiaEstadoGuardado: boolean) {
  if (!GOATCOUNTER || import.meta.env.DEV || navegadorPideNoRastrear()) return;
  const pantalla = `${screen.width},${screen.height},${window.devicePixelRatio || 1}`;
  const procedencia = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : '';
  // Tras el primer pintado, cuando la página ya ha puesto su título.
  setTimeout(() => enviar({ p: rutaLimpia(ruta.value), t: document.title, r: procedencia, s: pantalla }), 300);
  enviar({ p: habiaEstadoGuardado ? 'visitante-recurrente' : 'visitante-nuevo', e: 'true', s: pantalla });
  let anterior = ruta.value;
  ruta.subscribe((r) => {
    if (rutaLimpia(r) === rutaLimpia(anterior)) return;
    anterior = r;
    // El título se actualiza tras el cambio de ruta; se envía en el siguiente ciclo.
    setTimeout(() => enviar({ p: rutaLimpia(r), t: document.title, s: pantalla }), 300);
  });
}
