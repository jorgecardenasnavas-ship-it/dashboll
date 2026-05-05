import puppeteer from 'puppeteer';
import { resolve } from 'path';

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:8800/index.html', { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');
await new Promise(r => setTimeout(r, 1500));

const target = process.argv[2] || '.academies';
const el = await page.$(target);
if (!el) { console.error(`No se encontró ${target}`); process.exit(1); }

await el.scrollIntoView();
await new Promise(r => setTimeout(r, 400));
await el.screenshot({ path: resolve('pdf/web-screenshots/section.png') });
console.log('✓ pdf/web-screenshots/section.png');
await browser.close();
