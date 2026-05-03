import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const URL = 'http://localhost:8800/manual.html';
const OUT_DIR = resolve(ROOT, 'pdf/screenshots');

await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1.5 });
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluateHandle('document.fonts.ready');
await new Promise(r => setTimeout(r, 2000));

// Print media para ver lo que ve el PDF
await page.emulateMediaType('print');
await new Promise(r => setTimeout(r, 500));

const chapterIds = await page.$$eval('.chapter', els => els.map(e => e.id));
console.log(`Capítulos encontrados: ${chapterIds.length}`);

for (const id of chapterIds) {
  const el = await page.$(`#${id}`);
  if (!el) continue;
  const path = resolve(OUT_DIR, `${id}.png`);
  await el.screenshot({ path });
  console.log(`✓ ${id}.png`);
}

await browser.close();
console.log(`\nScreenshots en: ${OUT_DIR}`);
