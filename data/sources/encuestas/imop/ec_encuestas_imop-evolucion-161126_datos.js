// Estimacion de voto de IMOP para las generales del 29-N: escaños y porcentaje por partido.
// Serie nueva: informe «Ola 4» de IMOP Insights para El Confidencial, campo del 10 al 13 de noviembre, 1.000 entrevistas.
// Generado por ola4/montar.py a partir de ola4.csv el 14/11/2026. No editar a mano: se pisa.
// Cada serie va en el orden [23-J, 9 oct., 23 oct., 8 nov., 16 nov.]. null = sin dato (Podemos y Adelante Andalucia no tienen
// escaños propios en 2023; Podemos concurrio dentro de Sumar). UPN va sumado al PP.
window.DATOS = {
  encuestas: [
    { k: 0, eje: '23-J',     ejeMovil: '23-J',     leyenda: 'Resultado 23-J' },
    { k: 1, eje: '9 oct.',   ejeMovil: '9 oct',    leyenda: '1ª ola IMOP (9 oct.)' },
    { k: 2, eje: '23 oct.',  ejeMovil: '23 oct',   leyenda: '2ª ola IMOP (23 oct.)' },
    { k: 3, eje: '8 nov.',   ejeMovil: '8 nov',    leyenda: '3ª ola IMOP (8 nov.)' },
    { k: 4, eje: '16 nov.',  ejeMovil: '16 nov',   leyenda: '4ª ola IMOP (16 nov.)' }
  ],
  partidos: [
    { id: 'PSOE',  ambito: 'estatal',   nombre: 'PSOE',                  corto: 'PSOE',     color: '#f60b01', esc: [121, 110, 113, 106, 109], pct: [31.7, 26.5, 27.1, 25.9, 26.9] },
    { id: 'FA',    ambito: 'estatal',   nombre: 'Frente Amplio (Sumar)', corto: 'FA',       ast: true, astAhora: true, color: '#E75D2E', esc: [31, 11, 14, 13, 11], pct: [12.3, 7.6, 8.9, 8.1, 6.9] },
    { id: 'POD',   ambito: 'estatal',   nombre: 'Podemos',               corto: 'Podemos',  rotulo: 'Pod.', ast: true, astAhora: true, color: '#692772', esc: [null, 1, 1, 1, 0], pct: [null, 2.3, 1.9, 1.2, 0.9] },
    { id: 'ERC',   ambito: 'regional',  nombre: 'ERC',                   corto: 'ERC',      color: '#fab43e', esc: [7, 8, 8, 11, 12], pct: [1.9, 2.2, 2.2, 2.6, 2.9] },
    { id: 'BILDU', ambito: 'regional',  nombre: 'EH Bildu',              corto: 'EH Bildu', color: '#adbd22', esc: [6, 6, 6, 7, 8], pct: [1.4, 1.3, 1.3, 1.6, 1.7] },
    { id: 'BNG',   ambito: 'regional',  nombre: 'BNG',                   corto: 'BNG',      color: '#a7dafd', esc: [1, 3, 2, 3, 3], pct: [0.6, 1.1, 1.1, 1.3, 1.3] },
    { id: 'AA',    ambito: 'regional',  nombre: 'Adelante Andalucía',    corto: 'AA',       color: '#4fe8a6', esc: [null, 1, 1, 4, 4], pct: [0.04, 1, 1, 1.8, 2.2] },
    { id: 'CC',    ambito: 'regional',  nombre: 'Coalición Canaria',     corto: 'CC',       color: '#ffd706', esc: [1, 1, 1, 1, 1], pct: [0.5, 0.6, 0.6, 0.5, 0.5] },
    { id: 'JUNTS', ambito: 'regional',  nombre: 'Junts',                 corto: 'Junts',    color: '#9de2de', esc: [7, 4, 4, 4, 4], pct: [1.6, 1.1, 1.2, 1.2, 1.1] },
    { id: 'PNV',   ambito: 'regional',  nombre: 'PNV',                   corto: 'PNV',      color: '#4e6b40', esc: [5, 4, 5, 4, 4], pct: [1.1, 0.9, 1, 0.7, 0.9] },
    { id: 'VOX',   ambito: 'estatal',   nombre: 'Vox',                   corto: 'Vox',      color: '#77be2d', esc: [33, 70, 72, 70, 66], pct: [12.4, 19, 20, 19.9, 19] },
    { id: 'PP',    ambito: 'estatal',   nombre: 'PP',                    corto: 'PP',       ast: true, color: '#48aafd', esc: [138, 131, 123, 126, 128], pct: [33.3, 30.6, 28.5, 29.8, 31.5] }
  ]
};
