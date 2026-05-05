// Renderiza el manual.html en print mode con dimensiones A4 landscape exactas
// para ver qué se va a generar en el PDF.
import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';

const URL = 'http://localhost:8801/manual.html';
const OUT = resolve('pdf/inspect');
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();

// A4 landscape @ 96dpi: 1123 × 794 px
await page.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluateHandle('document.fonts.ready');
await new Promise(r => setTimeout(r, 2000));
await page.emulateMediaType('print');
await new Promise(r => setTimeout(r, 500));

// Para cada chapter, screenshot con el viewport A4 exacto
for (let i = 1; i <= 17; i++) {
  const id = `cap-${String(i).padStart(2, '0')}`;
  const el = await page.$(`#${id}`);
  if (!el) continue;
  // Scroll to chapter and screenshot full chapter
  await page.evaluate((id) => document.getElementById(id).scrollIntoView({ block: 'start' }), id);
  await new Promise(r => setTimeout(r, 300));
  const box = await el.boundingBox();
  console.log(`${id}: ${Math.round(box.height)}px tall (A4 page = 794px)`);
  await el.screenshot({ path: resolve(OUT, `print-${id}.png`) });
}

await browser.close();
