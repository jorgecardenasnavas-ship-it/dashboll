const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: null });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 700, deviceScaleFactor: 2 });
  await page.goto('http://localhost:8800/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const el = document.querySelector('section.academies');
    if (el) el.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -80);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, '..', 'assets', 'screenshots', '08-academies-j3logo.png'), type: 'png' });
  await browser.close();
  console.log('done');
})();
