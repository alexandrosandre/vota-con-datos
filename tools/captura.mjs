// Captura con emulación real de dispositivo (Chrome del sistema, sin descargas).
// Uso: node tools/captura.mjs <url> <salida.png> <ancho> <alto> [movil]
import puppeteer from 'puppeteer-core';
const [url, out, w, h, movil] = process.argv.slice(2);
const exe = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b = await puppeteer.launch({ executablePath: exe, headless: true, args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: +w, height: +h, deviceScaleFactor: 1, isMobile: !!movil, hasTouch: !!movil });
await p.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 800));
await p.screenshot({ path: out, fullPage: false });
await b.close();
