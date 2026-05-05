import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const PDF = resolve('pdf/manual.pdf');
const OUT = resolve('pdf/inspect');
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1000, deviceScaleFactor: 1.5 });

const fileUrl = pathToFileURL(PDF).href;
const TOTAL = 17;

for (let i = 1; i <= TOTAL; i++) {
  const url = `${fileUrl}#page=${i}&zoom=85`;
  console.log(`Página ${i}/${TOTAL}: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  const out = resolve(OUT, `real-${String(i).padStart(2, '0')}.png`);
  await page.screenshot({ path: out, fullPage: false });
  console.log(`  ✓ ${out}`);
}

await browser.close();
