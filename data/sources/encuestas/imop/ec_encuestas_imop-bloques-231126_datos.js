// Bloques de la estimación de IMOP para las generales del 29-N: escaños y porcentaje de voto, ola a ola.
// Porcentajes de las olas: pág. 24 del informe de la ola 5 (PP+VOX, PSOE+FA, Nacionalistas/Regionalistas). Escaños y la
// suma de la investidura: tabla de la pág. 29 (versión corregida del 21/11/2026). Comprobado: PP y Vox + PSOE y FA +
// nacionalistas + Podemos = 350 escaños en cada ola.
// 23-J: con UPN dentro del PP (138 escaños, 33,3 %), como en el resto de gráficos; IMOP da 45,5 % a PP+Vox sin UPN.
// Investidura de 2023 = PSOE, Sumar (hoy Frente Amplio con Compromís, y Podemos), ERC, Junts, EH Bildu, PNV, BNG y CC.
// Nacionalistas y regionalistas = ERC, Junts, PNV, EH Bildu, BNG, CC y Adelante Andalucía.
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
  // Referencia horizontal por métrica
  referencia: { esc: { valor: 176, texto: 'Mayoría absoluta (176)' } },
  partidos: [
    { id: 'DER', ambito: 'estatal', nombre: 'PP y Vox',                      corto: 'PP y Vox',      color: '#0F2124', esc: [171, 201, 195, 196, 194, 195], pct: [45.7, 49.6, 48.5, 49.7, 50.5, 50.0] },
    { id: 'INV', ambito: 'estatal', nombre: 'Partidos de la investidura de 2023', corto: 'Investidura 2023', color: '#805134', esc: [179, 148, 154, 150, 152, 152], pct: [51.1, 43.6, 45.3, 43.1, 43.1, 43.5] },
    { id: 'IZQ', ambito: 'estatal', nombre: 'PSOE y Frente Amplio',          corto: 'PSOE y FA',     astAhora: true, color: '#CC7A4B', esc: [152, 121, 127, 119, 120, 121], pct: [44.0, 34.1, 36.0, 34.0, 33.8, 34.8] },
    { id: 'NAC', ambito: 'estatal', nombre: 'Nacionalistas y regionalistas', corto: 'Nacionalistas y regionalistas', movil: 'Nacionalistas', color: '#99A2AB', esc: [27, 27, 27, 34, 36, 34], pct: [7.1, 8.2, 8.4, 9.7, 10.6, 10.0] }
  ]
};
