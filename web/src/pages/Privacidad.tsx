import { REPO } from '../data';
import { GOATCOUNTER } from '../analitica';

/** Privacidad: qué se guarda en tu navegador y qué se cuenta de las visitas. */
export function Privacidad() {
  const activa = !!GOATCOUNTER;
  return (
    <div class="narrow page prose">
      <h1>Privacidad</h1>
      <p>
        <strong>No guardamos ningún dato tuyo.</strong> No usamos cookies, no hay publicidad y no pedimos ningún dato personal.
      </p>

      <h2>Lo que se guarda en tu navegador</h2>
      <p>
        Tus respuestas del paso 1, tu provincia, el partido que eliges y tu orden de preferencia se guardan solo en tu navegador, en tu
        dispositivo, para que puedas volver y seguir donde lo dejaste. No nos llegan nunca. Puedes borrarlos con el botón «Borrar mis
        respuestas» del paso 1 o borrando los datos del sitio en tu navegador.
      </p>

      <h2>Lo que no se envía</h2>
      <p>
        No enviamos nada de lo que haces en la web: ni tus respuestas, ni tu provincia, ni los partidos que eliges, ni tu orden de
        preferencia.
      </p>

      <h2>Cómo contamos las visitas</h2>
      {activa ? (
        <p>
          Solo contamos cuántas visitas hay, a qué páginas, desde qué países y si es la primera vez que se usa la web desde ese navegador, con{' '}
          <a href="https://www.goatcounter.com" target="_blank" rel="noopener">GoatCounter</a>: un contador anónimo de código abierto, con
          servidores en la Unión Europea, que no usa cookies, no guarda tu IP y solo conserva totales. Si tu navegador tiene activado «No
          rastrear» o Global Privacy Control, no se cuenta tu visita.
        </p>
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
