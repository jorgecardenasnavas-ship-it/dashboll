// Renderiza el PDF página por página usando Chrome's built-in PDF viewer
import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';

const PDF_URL = 'http://localhost:8801/pdf/manual.pdf';
const OUT = resolve('pdf/inspect');
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-features=DownloadBubble']
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1100, deviceScaleFactor: 1.5 });

const TOTAL = 24;
for (let i = 1; i <= TOTAL; i++) {
  // Navigate to specific page in Chrome's PDF viewer with toolbar hidden
  const url = `${PDF_URL}#page=${i}&toolbar=0&navpanes=0&zoom=100`;
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));
  const out = resolve(OUT, `v9-${String(i).padStart(2, '0')}.png`);
  await page.screenshot({ path: out });
  console.log(`  ✓ p${i}: ${out}`);
}

await browser.close();
