import { REPO } from '../data';
import { GOATCOUNTER } from '../analitica';

/** Privacidad: qué se guarda en tu navegador y qué se cuenta de las visitas. */
export function Privacidad() {
  const activa = !!GOATCOUNTER;
  return (
    <div class="narrow page prose">
      <h1>Privacidad</h1>
      <p>
        No usamos cookies, no hay publicidad y no pedimos ningún dato personal. Tus respuestas no salen de tu navegador.
      </p>

      <h2>Lo que se guarda en tu navegador</h2>
      <p>
        Tus respuestas del paso 1, tu provincia, el partido que eliges, tu orden de preferencia y los datos con los que calculas el paso 3.
        Se guardan solo en tu navegador (almacenamiento local), para que puedas volver y seguir donde lo dejaste. Nunca se envían a ningún
        sitio. Puedes borrarlas con el botón «Borrar mis respuestas» del paso 1 o borrando los datos del sitio en tu navegador.
      </p>

      <h2>Lo que contamos de las visitas</h2>
      {activa ? (
        <>
          <p>
            Para saber cuánta gente usa la web, desde qué países y si vuelve, contamos las visitas de forma anónima con{' '}
            <a href="https://www.goatcounter.com" target="_blank" rel="noopener">GoatCounter</a>, un servicio de código abierto con
            servidores en la Unión Europea (Finlandia y Alemania). No usa cookies ni guarda nada en tu navegador.
          </p>
          <p>Por cada página que ves, le llega:</p>
          <ul>
            <li>qué página es (por ejemplo, «/contrasta/vox»), nunca tus respuestas ni lo que eliges;</li>
            <li>de qué web vienes, si llegas desde otra;</li>
            <li>el tamaño de tu pantalla y, como en cualquier visita a una web, tu navegador y tu dirección IP.</li>
          </ul>
          <p>
            GoatCounter <strong>no guarda tu IP</strong>: la usa para saber el país y para no contar dos veces la misma visita, y la olvida en
            unas horas. Solo guarda totales: visitas por página y día, países, navegadores, tamaños de pantalla.
          </p>
          <p>
            Además, una vez por visita contamos si es la primera vez que se usa la web desde ese navegador o si ya se había usado. Para saberlo
            solo miramos si tu navegador ya tenía guardadas tus respuestas de antes; no guardamos nada nuevo y no sirve para identificarte.
          </p>
          <p>
            Si tu navegador tiene activado «No rastrear» (Do Not Track) o Global Privacy Control, no contamos nada. Usamos estos datos solo
            para saber cuánto se usa la web y mejorarla; no se comparten ni se cruzan con nada.
          </p>
        </>
      ) : (
        <p>Ahora mismo no contamos las visitas de ninguna forma.</p>
      )}

      <h2>Lo que no llega a terceros</h2>
      <p>
        La tipografía, las fotos y los logotipos se sirven desde nuestra propia web, así que ni Google ni Wikimedia se enteran de tu visita.
        Los enlaces a fuentes externas (BOE, medios, webs de los partidos) solo se abren si los pulsas.
      </p>

      <h2>Dudas</h2>
      <p>
        Todo el código es público, incluido el recuento de visitas (<code>web/src/analitica.ts</code>) en{' '}
        <a href={REPO} target="_blank" rel="noopener">GitHub</a>. Para cualquier duda,{' '}
        <a href={`${REPO}/issues`} target="_blank" rel="noopener">escríbenos allí</a>.
      </p>
    </div>
  );
}
