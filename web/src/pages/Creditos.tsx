import { fase2 } from '../data';

/** Créditos de las fotos y logotipos (Wikimedia Commons, licencias libres). */
export function Creditos() {
  const c = fase2.value?.creditos_imagenes ?? [];
  const base = import.meta.env.BASE_URL;
  return (
    <div class="narrow page prose">
      <h1>Créditos de las imágenes</h1>
      <p>
        Las fotos de los candidatos y los logotipos de los partidos vienen de Wikimedia Commons, el archivo de imágenes de Wikipedia. Solo
        usamos imágenes con licencias libres, que permiten reutilizarlas: dominio público, CC0, CC BY o CC BY-SA (las dos últimas piden
        citar al autor, como hacemos aquí).
      </p>
      <p>
        Para cada candidato comprobamos primero que su artículo de Wikipedia corresponde a la persona de la lista del BOE, con el mismo
        nombre y partido. Después usamos la foto que Wikidata, la base de datos de Wikipedia, asocia a esa persona. Guardamos las imágenes
        en nuestra propia web: al verlas, Wikimedia no se entera de tu visita. Si ves un error,{' '}
        <a href="https://github.com/alexandrosandre/vota-con-datos/issues" target="_blank" rel="noopener">avísanos</a>.
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {c.map((x) => (
          <li key={x.src} style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '10px 0' }}>
            <img src={`${base}${x.src}`} alt="" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6, background: '#fff' }} />
            <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
              <strong>{x.que}</strong>
              <br />
              <span class="muted" style={{ fontSize: '0.88rem' }}>
                {x.autor || 'Autor no indicado'} ·{' '}
                {x.licencia_url ? (
                  <a href={x.licencia_url} target="_blank" rel="noopener">{x.licencia}</a>
                ) : (
                  x.licencia
                )}{' '}
                ·{' '}
                {x.commons && (
                  <a href={x.commons} target="_blank" rel="noopener">
                    ficha en Commons
                  </a>
                )}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
