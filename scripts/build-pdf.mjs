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

// Sustituir cada .wordmark por un SVG inline con gradiente real en las "ll".
// background-clip:text + linear-gradient se pinta mal en PDF; SVG sí renderiza ok.
await page.evaluate(() => {
  const FALLBACK_LL = '#04476a';
  const FALLBACK_CYAN = '#4dd0e1';
  document.querySelectorAll('.wordmark').forEach((w, idx) => {
    if (w.classList.contains('wordmark-flat')) return;
    const cs = getComputedStyle(w);
    const fontSizePx = parseFloat(cs.fontSize);
    const fontFamily = cs.fontFamily;
    const fontWeight = cs.fontWeight;
    const letterSpacing = cs.letterSpacing === 'normal' ? '0' : cs.letterSpacing;
    const llBase = (cs.getPropertyValue('--ll-base').trim() || cs.color || FALLBACK_LL);
    const cyanTone = (cs.getPropertyValue('--cyan-tone').trim() || FALLBACK_CYAN);

    // Medir el ancho real del texto "dashboll" con la misma fuente
    const probe = document.createElement('span');
    probe.style.cssText = `position:absolute;visibility:hidden;font:${cs.font};letter-spacing:${letterSpacing};white-space:pre;`;
    probe.textContent = 'dashboll';
    document.body.appendChild(probe);
    const textWidth = probe.getBoundingClientRect().width;
    probe.remove();

    const height = fontSizePx * 1.05;
    const baseline = fontSizePx * 0.82;
    const id1 = `ll1-${idx}`, id2 = `ll2-${idx}`;
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${textWidth}" height="${height}" viewBox="0 0 ${textWidth} ${height}" style="display:block;overflow:visible">
  <defs>
    <linearGradient id="${id1}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${cyanTone}"/>
      <stop offset="0.32" stop-color="${cyanTone}"/>
      <stop offset="0.32" stop-color="${llBase}"/>
      <stop offset="1" stop-color="${llBase}"/>
    </linearGradient>
    <linearGradient id="${id2}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${cyanTone}"/>
      <stop offset="0.42" stop-color="${cyanTone}"/>
      <stop offset="0.42" stop-color="${llBase}"/>
      <stop offset="1" stop-color="${llBase}"/>
    </linearGradient>
  </defs>
  <text x="0" y="${baseline}" fill="${llBase}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${fontSizePx}" letter-spacing="${letterSpacing}" xml:space="preserve">dashbo<tspan fill="url(#${id1})">l</tspan><tspan fill="url(#${id2})">l</tspan></text>
</svg>`.trim();
    w.innerHTML = svg;
    w.style.lineHeight = '0';
    w.style.fontSize = '0';
  });
});

await new Promise(r => setTimeout(r, 300));

console.log(`Generando PDF en ${OUTPUT}...`);
await page.pdf({
  path: OUTPUT,
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
  preferCSSPageSize: true
});

await browser.close();
console.log(`✓ PDF generado: ${OUTPUT}`);
