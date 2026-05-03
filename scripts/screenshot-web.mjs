import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';

const OUT = resolve('pdf/web-screenshots');
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:8800/index.html', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluateHandle('document.fonts.ready');
await new Promise(r => setTimeout(r, 2500));

// Trigger all IntersectionObserver animations
await page.evaluate(() => {
  document.querySelectorAll('.solves-grid, .feature-grid, .flows-grid, .how-steps, .security-grid, .price-grid, .multisport-grid').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 500));

// Full-page screenshot
await page.screenshot({ path: resolve(OUT, 'full.png'), fullPage: true });
console.log(`✓ ${resolve(OUT, 'full.png')}`);

// Per-section screenshots
const sections = ['hero', 'resuelve', 'conoce', 'producto', 'multideporte', 'precios', 'faq', 'demo'];
for (const id of sections) {
  const el = await page.$(`#${id}`);
  if (el) {
    await el.scrollIntoView();
    await new Promise(r => setTimeout(r, 400));
    await el.screenshot({ path: resolve(OUT, `${id}.png`) });
    console.log(`✓ ${id}.png`);
  }
}

await browser.close();
