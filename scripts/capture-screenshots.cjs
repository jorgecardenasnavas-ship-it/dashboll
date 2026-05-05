// Genera capturas de los mockups de la web Dashboll para directorios B2B.
// Uso: node scripts/capture-screenshots.js
// Requiere que el server local esté corriendo en http://localhost:8800

const fs = require('fs');
const path = require('path');

(async () => {
  const puppeteer = require('puppeteer');
  const outDir = path.join(__dirname, '..', 'assets', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: null });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const url = 'http://localhost:8800/index.html';
  console.log('Loading', url);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800)); // pequeñas animaciones

  // 1. HERO — la primera vista que ve el usuario al entrar
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, '01-hero-dashboll.png'), type: 'png' });
  console.log('✓ 01-hero-dashboll.png');

  // 2. DECIDE — preguntas que la IA contesta automáticamente
  await page.evaluate(() => {
    const el = document.querySelector('h2#decide-title');
    if (el) el.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -80);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '02-decide-ia-preguntas.png'), type: 'png' });
  console.log('✓ 02-decide-ia-preguntas.png');

  // 3. RANKING COACHES — panel de IA con datos reales (mockup más "UI" del sitio)
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Rendimiento del trimestre'));
    if (el) el.scrollIntoView({ block: 'center' });
    window.scrollBy(0, -100);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '03-panel-ranking-coaches.png'), type: 'png' });
  console.log('✓ 03-panel-ranking-coaches.png');

  // 4. FLUJOS — los 3 roles (Head Coach / Coach / Player)
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.toLowerCase().includes('cero a producción') || h.textContent.toLowerCase().includes('flujo'));
    const target = document.querySelector('.flows-grid');
    if (target) target.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -100);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '04-flujos-3-roles.png'), type: 'png' });
  console.log('✓ 04-flujos-3-roles.png');

  // 5. COMPARATIVA — la tabla "vs lo que probablemente usas hoy"
  await page.evaluate(() => {
    const el = document.querySelector('section.compare');
    if (el) el.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -100);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '05-comparativa-tabla.png'), type: 'png' });
  console.log('✓ 05-comparativa-tabla.png');

  // 6. MOBILE HERO — versión móvil para directorios que aceptan capturas mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '06-hero-mobile.png'), type: 'png' });
  console.log('✓ 06-hero-mobile.png');

  // 7. MOBILE — panel ranking en versión móvil
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Rendimiento del trimestre'));
    if (el) el.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -60);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '07-panel-ranking-mobile.png'), type: 'png' });
  console.log('✓ 07-panel-ranking-mobile.png');

  await browser.close();
  console.log('\nGuardadas en', outDir);
})().catch(e => { console.error(e); process.exit(1); });
