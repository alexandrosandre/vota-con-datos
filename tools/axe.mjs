// Auditoría de accesibilidad (axe-core, WCAG 2.2 AA) de las páginas principales. Uso: node tools/axe.mjs [base]
import puppeteer from 'puppeteer-core';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axe = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2] ?? 'http://localhost:5179/vota-con-datos/';
const rutas = ['#/', '#/coincide', '#/contrasta/vox', '#/contrasta/pp', '?circ=40&partido=podemos#/cuenta', '#/metodologia', '#/creditos'];
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
let total = 0;
for (const anchura of [1280, 390]) {
  for (const r of rutas) {
    const p = await b.newPage();
    await p.setViewport({ width: anchura, height: 900 });
    await p.goto(base + r, { waitUntil: 'networkidle0' });
    await new Promise((res) => setTimeout(res, 1200));
    await p.evaluate(axe);
    const res = await p.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] })).violations.map((v) => ({ id: v.id, n: v.nodes.length, ej: v.nodes[0]?.target?.join(' '), msg: v.nodes[0]?.failureSummary?.slice(0, 160) })));
    total += res.length;
    if (res.length) console.log(anchura, r, JSON.stringify(res));
    await p.close();
  }
}
await b.close();
console.log('violaciones:', total);
