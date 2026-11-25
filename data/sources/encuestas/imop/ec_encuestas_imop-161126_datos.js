// Estimacion de voto de IMOP para las generales del 29-N: escaños y porcentaje por partido.
// Serie nueva: informe «Ola 4» de IMOP Insights para El Confidencial, campo del 10 al 13 de noviembre, 1.000 entrevistas.
// Generado por ola4/montar.py a partir de ola4.csv el 14/11/2026. No editar a mano: se pisa.
// Cada serie va en el orden [23-J, 8 nov., 16 nov.]. null = sin dato (Podemos y Adelante Andalucia no tienen
// escaños propios en 2023; Podemos concurrio dentro de Sumar). UPN va sumado al PP.
window.DATOS = {
  encuestas: [
    { k: 0, leyenda: 'Resultado 2023' },
    { k: 1, leyenda: 'IMOP (8 nov.)' },
    { k: 2, leyenda: 'IMOP (16 nov.)' }
  ],
  partidos: [
    { id: 'PSOE',  nombre: 'PSOE',                  corto: 'PSOE',          color: '#f60b01', esc: [121, 106, 109], pct: [31.7, 25.9, 26.9] },
    { id: 'FA',    nombre: 'Frente Amplio (Sumar)', corto: 'Frente Amplio', movil: 'F. Amplio', ast: true, astAhora: true, color: '#E75D2E', esc: [31, 13, 11], pct: [12.3, 8.1, 6.9] },
    { id: 'POD',   nombre: 'Podemos',               corto: 'Podemos',       ast: true, astAhora: true, color: '#692772', esc: [null, 1, 0], pct: [null, 1.2, 0.9] },
    { id: 'ERC',   nombre: 'ERC',                   corto: 'ERC',           color: '#fab43e', esc: [7, 11, 12], pct: [1.9, 2.6, 2.9] },
    { id: 'BILDU', nombre: 'EH Bildu',              corto: 'EH Bildu',      color: '#adbd22', esc: [6, 7, 8], pct: [1.4, 1.6, 1.7] },
    { id: 'BNG',   nombre: 'BNG',                   corto: 'BNG',           color: '#a7dafd', esc: [1, 3, 3], pct: [0.6, 1.3, 1.3] },
    { id: 'AA',    nombre: 'Adelante Andalucía',    corto: 'AA',            color: '#4fe8a6', esc: [null, 4, 4], pct: [0.04, 1.8, 2.2] },
    { id: 'CC',    nombre: 'Coalición Canaria',     corto: 'CC',            color: '#ffd706', esc: [1, 1, 1], pct: [0.5, 0.5, 0.5] },
    { id: 'JUNTS', nombre: 'Junts',                 corto: 'Junts',         color: '#9de2de', esc: [7, 4, 4], pct: [1.6, 1.2, 1.1] },
    { id: 'PNV',   nombre: 'PNV',                   corto: 'PNV',           color: '#4e6b40', esc: [5, 4, 4], pct: [1.1, 0.7, 0.9] },
    { id: 'VOX',   nombre: 'Vox',                   corto: 'Vox',           color: '#77be2d', esc: [33, 70, 66], pct: [12.4, 19.9, 19] },
    { id: 'PP',    nombre: 'PP',                    corto: 'PP',            ast: true, color: '#48aafd', esc: [138, 126, 128], pct: [33.3, 29.8, 31.5] }
  ]
};
