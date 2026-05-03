import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const PDF_PATH = process.argv[2] || resolve('pdf/manual.pdf');
const OUT_DIR = resolve('pdf/inspect');

await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

const fileUrl = pathToFileURL(PDF_PATH).href;
console.log(`Abriendo: ${fileUrl}`);

await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000)); // dejar que Chrome PDF viewer cargue

// Hacer screenshots de la zona visible (Chrome muestra el PDF con scroll)
// Ir scrolleando y screenshot por cada página
const totalPages = 17;
for (let i = 0; i < totalPages; i++) {
  await page.evaluate((idx) => {
    window.scrollTo(0, idx * 800);
  }, i);
  await new Promise(r => setTimeout(r, 600));
  const out = resolve(OUT_DIR, `page-${String(i + 1).padStart(2, '0')}.png`);
  await page.screenshot({ path: out });
  console.log(`  ✓ ${out}`);
}

await browser.close();
