// Estimacion de voto de IMOP para las generales del 29-N: escaños y porcentaje por partido.
// Ola 5 de IMOP Insights para El Confidencial: campo del 17 al 19 de noviembre, 1.200 entrevistas (informe del 20/11/2026,
// tabla «Estimación de voto», pág. 29). Publicación el 23/11/2026.
// Cada serie va en el orden [23-J, ola 4 (16 nov.), ola 5 (23 nov.)]. La ola 4 se copia tal cual de la version publicada
// en encuestas_imop-161126. null = sin dato (Podemos y Adelante Andalucia no tienen escaños propios en 2023).
// UPN va sumado al PP (138 escaños y 33,3 % en 2023). Frente Amplio suma Compromís-Front Valencià: ola 5 = 9 + 2 escaños, 6,0 + 1,4 %.
window.DATOS = {
  encuestas: [
    { k: 0, leyenda: 'Resultado 2023' },
    { k: 1, leyenda: 'IMOP (16 nov.)' },
    { k: 2, leyenda: 'IMOP (23 nov.)' }
  ],
  partidos: [
    { id: 'PSOE',  nombre: 'PSOE',                  corto: 'PSOE',          color: '#f60b01', esc: [121, 109, 110], pct: [31.7, 26.9, 27.4] },
    { id: 'FA',    nombre: 'Frente Amplio (Sumar)', corto: 'Frente Amplio', movil: 'F. Amplio', ast: true, astAhora: true, color: '#E75D2E', esc: [31, 11, 11], pct: [12.3, 6.9, 7.4] },
    { id: 'POD',   nombre: 'Podemos',               corto: 'Podemos',       ast: true, astAhora: true, color: '#692772', esc: [null, 0, 0], pct: [null, 0.9, 0.7] },
    { id: 'ERC',   nombre: 'ERC',                   corto: 'ERC',           color: '#fab43e', esc: [7, 12, 12], pct: [1.9, 2.9, 2.6] },
    { id: 'BILDU', nombre: 'EH Bildu',              corto: 'EH Bildu',      color: '#adbd22', esc: [6, 8, 7], pct: [1.4, 1.7, 1.6] },
    { id: 'BNG',   nombre: 'BNG',                   corto: 'BNG',           color: '#a7dafd', esc: [1, 3, 3], pct: [0.6, 1.3, 1.2] },
    { id: 'AA',    nombre: 'Adelante Andalucía',    corto: 'AA',            color: '#4fe8a6', esc: [null, 4, 3], pct: [0.04, 2.2, 2.0] },
    { id: 'CC',    nombre: 'Coalición Canaria',     corto: 'CC',            color: '#ffd706', esc: [1, 1, 1], pct: [0.5, 0.5, 0.5] },
    { id: 'JUNTS', nombre: 'Junts',                 corto: 'Junts',         color: '#9de2de', esc: [7, 4, 4], pct: [1.6, 1.1, 1.1] },
    { id: 'PNV',   nombre: 'PNV',                   corto: 'PNV',           color: '#4e6b40', esc: [5, 4, 4], pct: [1.1, 0.9, 1.0] },
    { id: 'VOX',   nombre: 'Vox',                   corto: 'Vox',           color: '#77be2d', esc: [33, 66, 64], pct: [12.4, 19, 18.3] },
    { id: 'PP',    nombre: 'PP',                    corto: 'PP',            ast: true, color: '#48aafd', esc: [138, 128, 131], pct: [33.3, 31.5, 31.7] }
  ]
};
