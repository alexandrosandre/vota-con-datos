// Estimacion de voto de IMOP para las generales del 29-N: escaños y porcentaje por partido, ola a ola.
// Ola 5 de IMOP Insights para El Confidencial: campo del 17 al 19 de noviembre, 1.200 entrevistas (informe del 20/11/2026,
// tabla «Estimación de voto», pág. 29). Las olas 1 a 4 se copian tal cual de la version publicada en
// encuestas_imop-evolucion-161126 (cuadran con la misma tabla). Publicación el 23/11/2026.
// Cada serie va en el orden [23-J, ola 1, ola 2, ola 3, ola 4, ola 5]. null = sin dato (Podemos y Adelante Andalucia no tienen
// escaños propios en 2023; Podemos concurrio dentro de Sumar). UPN va sumado al PP (en 2023 y en la ola 1, cuando aun iba aparte).
// Frente Amplio suma Compromís-Front Valencià desde la ola 4 (ola 5: 9 + 2 escaños, 6,0 + 1,4 %).
// TERR (agregado, rotulado «Resto») = ERC + Junts + EH Bildu + PNV + BNG + CC + AA; sus porcentajes coinciden con la fila
// «Nacionalistas/Regionalistas» del informe (pág. 24: 8,2 / 8,4 / 9,7 / 10,6 / 10,0) y con el 7,1 % de 2023 (pág. 24).
window.DATOS = {
  encuestas: [
    { k: 0, eje: '23-J',            ejeMovil: ['23-J'],           leyenda: 'Resultado 23-J' },
    { k: 1, eje: ['Ola 1', '9 oct.'], ejeMovil: ['Ola 1', '9 oct.'],  leyenda: 'Ola 1 (9 oct.)', fecha: '2026-10-09', campo: ['2026-10-05', '2026-10-07'] },
    { k: 2, eje: ['Ola 2', '23 oct.'], ejeMovil: ['Ola 2', '23 oct.'], leyenda: 'Ola 2 (23 oct.)', fecha: '2026-10-23', campo: ['2026-10-13', '2026-10-16'] },
    { k: 3, eje: ['Ola 3', '8 nov.'], ejeMovil: ['Ola 3', '8 nov.'],  leyenda: 'Ola 3 (8 nov.)', fecha: '2026-11-08', campo: ['2026-11-02', '2026-11-06'] },
    { k: 4, eje: ['Ola 4', '16 nov.'], ejeMovil: ['Ola 4', '16 nov.'], leyenda: 'Ola 4 (16 nov.)', fecha: '2026-11-16', campo: ['2026-11-10', '2026-11-13'] },
    { k: 5, eje: ['Ola 5', '23 nov.'], ejeMovil: ['Ola 5', '23 nov.'], leyenda: 'Ola 5 (23 nov.)', fecha: '2026-11-23', campo: ['2026-11-17', '2026-11-19'] }
  ],
  // Hitos de campaña (prueba 21-11-2026). fecha AAAA-MM-DD; con fecha null no se pintan.
  // Las olas van en su fecha de publicación (fecha) y llevan sus días de trabajo de campo (campo; ya no se pintan,
  // se dejan como referencia). Campo de las olas 1-4: hoja encuestas_v6 (fecha_inicio_campo / fecha_tcampo); ola 5: informe IMOP.
  // Cara a cara: hora 23:59 solo para dejarlo detrás del cierre del campo de la ola 5 (el informe dice que el campo
  // terminó antes del debate); no es la hora real del debate.
  hitos: [
    { fecha: '2026-10-05', texto: 'Convocatoria electoral', textoMovil: 'Convocatoria' },
    { fecha: '2026-10-28', texto: 'Accidente de Urda' },
    { fecha: '2026-11-19', hora: '23:59', texto: 'Cara a cara' },
    { fecha: '2026-11-11', texto: 'Huelga general' }
  ],
  partidos: [
    { id: 'PSOE',  ambito: 'estatal',   nombre: 'PSOE',                  corto: 'PSOE',     color: '#f60b01', esc: [121, 110, 113, 106, 109, 110], pct: [31.7, 26.5, 27.1, 25.9, 26.9, 27.4] },
    { id: 'FA',    ambito: 'estatal',   nombre: 'Frente Amplio (Sumar)', corto: 'FA',       ast: true, astAhora: true, color: '#E75D2E', esc: [31, 11, 14, 13, 11, 11], pct: [12.3, 7.6, 8.9, 8.1, 6.9, 7.4] },
    { id: 'POD',   ambito: 'estatal',   nombre: 'Podemos',               corto: 'Podemos',  rotulo: 'Pod.', ast: true, astAhora: true, color: '#692772', esc: [null, 1, 1, 1, 0, 0], pct: [null, 2.3, 1.9, 1.2, 0.9, 0.7] },
    { id: 'TERR',  agregado: true,      nombre: 'Resto',                 corto: 'Resto', color: '#8a9097', esc: [27, 27, 27, 34, 36, 34], pct: [7.1, 8.2, 8.4, 9.7, 10.6, 10.0] },
    { id: 'ERC',   ambito: 'regional',  nombre: 'ERC',                   corto: 'ERC',      color: '#fab43e', esc: [7, 8, 8, 11, 12, 12], pct: [1.9, 2.2, 2.2, 2.6, 2.9, 2.6] },
    { id: 'BILDU', ambito: 'regional',  nombre: 'EH Bildu',              corto: 'EH Bildu', color: '#adbd22', esc: [6, 6, 6, 7, 8, 7], pct: [1.4, 1.3, 1.3, 1.6, 1.7, 1.6] },
    { id: 'BNG',   ambito: 'regional',  nombre: 'BNG',                   corto: 'BNG',      color: '#a7dafd', esc: [1, 3, 2, 3, 3, 3], pct: [0.6, 1.1, 1.1, 1.3, 1.3, 1.2] },
    { id: 'AA',    ambito: 'regional',  nombre: 'Adelante Andalucía',    corto: 'AA',       color: '#4fe8a6', esc: [null, 1, 1, 4, 4, 3], pct: [0.04, 1, 1, 1.8, 2.2, 2.0] },
    { id: 'CC',    ambito: 'regional',  nombre: 'Coalición Canaria',     corto: 'CC',       color: '#ffd706', esc: [1, 1, 1, 1, 1, 1], pct: [0.5, 0.6, 0.6, 0.5, 0.5, 0.5] },
    { id: 'JUNTS', ambito: 'regional',  nombre: 'Junts',                 corto: 'Junts',    color: '#9de2de', esc: [7, 4, 4, 4, 4, 4], pct: [1.6, 1.1, 1.2, 1.2, 1.1, 1.1] },
    { id: 'PNV',   ambito: 'regional',  nombre: 'PNV',                   corto: 'PNV',      color: '#4e6b40', esc: [5, 4, 5, 4, 4, 4], pct: [1.1, 0.9, 1, 0.7, 0.9, 1.0] },
    { id: 'VOX',   ambito: 'estatal',   nombre: 'Vox',                   corto: 'Vox',      color: '#77be2d', esc: [33, 70, 72, 70, 66, 64], pct: [12.4, 19, 20, 19.9, 19, 18.3] },
    { id: 'PP',    ambito: 'estatal',   nombre: 'PP',                    corto: 'PP',       ast: true, color: '#48aafd', esc: [138, 131, 123, 126, 128, 131], pct: [33.3, 30.6, 28.5, 29.8, 31.5, 31.7] }
  ]
};
