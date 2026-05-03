import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const URL = process.env.PDF_URL || 'http://localhost:8800/manual.html';
const OUTPUT = resolve(ROOT, 'pdf/manual.pdf');

await mkdir(resolve(ROOT, 'pdf'), { recursive: true });

console.log(`Lanzando Chromium...`);
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

console.log(`Cargando ${URL}...`);
const page = await browser.newPage();

// Viewport A4 landscape exacto en píxeles CSS (297mm × 96dpi / 25.4 ≈ 1122px)
// Pero usamos un viewport más ancho para que entre la nav lateral y el chapter
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });

// Esperar a que las fuentes carguen
await page.evaluateHandle('document.fonts.ready');

// Esperar a que los Web Components rendericen
await new Promise(r => setTimeout(r, 2000));

// Emular print media para que el CSS @media print se aplique
await page.emulateMediaType('print');

// Otra espera tras cambiar el media type, para que el layout reflowe
await new Promise(r => setTimeout(r, 500));

console.log(`Generando PDF en ${OUTPUT}...`);
await page.pdf({
  path: OUTPUT,
  format: 'A4',
  landscape: true,
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
  preferCSSPageSize: true
});

await browser.close();
console.log(`✓ PDF generado: ${OUTPUT}`);
