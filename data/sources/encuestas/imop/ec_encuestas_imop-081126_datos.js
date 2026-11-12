// Estimación de voto IMOP para las generales del 29-N: escaños y porcentaje por partido.
// Fuente: informe «Estimación de voto y tendencias electorales - Ola 3» (IMOP Insights para El Confidencial,
// 7 de noviembre de 2026), tabla de la página 33. Campo del 2 al 6 de noviembre, 1.000 entrevistas.
// Cada serie va en el orden [Resultado 2023, IMOP 1, IMOP 2, IMOP 3]. null = sin dato (Podemos y AA no tienen
// escaños propios en 2023; Podemos se presentó dentro de Sumar). SALF no está porque no consigue escaño.
// UPN va sumado al PP en las cuatro series (en 2023 y ola 1 son filas aparte en el informe; en olas 2 y 3 el
// propio informe lo da ya unido al PP).
window.DATOS = {
  encuestas: [
    { k: 0, leyenda: 'Resultado 2023' },
    { k: 1, leyenda: 'IMOP (9 oct.)' },
    { k: 2, leyenda: 'IMOP (23 oct.)' },
    { k: 3, leyenda: 'IMOP (8 nov.)' }
  ],
  partidos: [
    { id: 'PSOE',  nombre: 'PSOE',                  corto: 'PSOE',          color: '#f60b01', esc: [121, 110, 113, 106],  pct: [31.7, 26.5, 27.1, 25.9] },
    { id: 'FA',    nombre: 'Frente Amplio (Sumar)', corto: 'Frente Amplio', movil: 'F. Amplio', ast: true, astAhora: true, color: '#da358d', esc: [31, 11, 14, 13],     pct: [12.3, 7.6, 8.9, 8.1] },
    { id: 'POD',   nombre: 'Podemos',               corto: 'Podemos',       ast: true, astAhora: true, color: '#692772', esc: [null, 1, 1, 1],     pct: [null, 2.3, 1.9, 1.2] },
    { id: 'ERC',   nombre: 'ERC',                   corto: 'ERC',           color: '#fab43e', esc: [7, 8, 8, 11],        pct: [1.9, 2.2, 2.2, 2.6] },
    { id: 'BILDU', nombre: 'EH Bildu',              corto: 'EH Bildu',      color: '#adbd22', esc: [6, 6, 6, 7],         pct: [1.4, 1.3, 1.3, 1.6] },
    { id: 'BNG',   nombre: 'BNG',                   corto: 'BNG',           color: '#a7dafd', esc: [1, 3, 2, 3],         pct: [0.6, 1.1, 1.1, 1.3] },
    { id: 'AA',    nombre: 'Adelante Andalucía',                   corto: 'AA',            color: '#4fe8a6', esc: [null, 1, 1, 4],     pct: [0, 1, 1, 1.8] },
    { id: 'CC',    nombre: 'Coalición Canaria',                   corto: 'CC',            color: '#ffd706', esc: [1, 1, 1, 1],         pct: [0.5, 0.6, 0.6, 0.5] },
    { id: 'JUNTS', nombre: 'Junts',                 corto: 'Junts',         color: '#9de2de', esc: [7, 4, 4, 4],         pct: [1.6, 1.1, 1.2, 1.2] },
    { id: 'PNV',   nombre: 'PNV',                   corto: 'PNV',           color: '#4e6b40', esc: [5, 4, 5, 4],         pct: [1.1, 0.9, 1, 0.7] },
    { id: 'VOX',   nombre: 'Vox',                   corto: 'Vox',           color: '#77be2d', esc: [33, 70, 72, 70],     pct: [12.4, 19, 20, 19.9] },
    { id: 'PP',    nombre: 'PP',                    corto: 'PP',            ast: true, color: '#48aafd', esc: [138, 131, 123, 126],  pct: [33.3, 30.6, 28.5, 29.8] }
  ]
};
