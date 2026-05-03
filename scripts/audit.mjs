import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';

const URL = process.env.URL || 'http://localhost:8800/index.html';

const browser = await puppeteer.launch({
  args: ['--remote-debugging-port=9222', '--no-sandbox'],
  headless: 'new'
});

const { lhr } = await lighthouse(URL, {
  port: 9222,
  output: 'json',
  logLevel: 'error',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
});

const cat = (key) => Math.round((lhr.categories[key]?.score || 0) * 100);
const audit = (key) => lhr.audits[key]?.displayValue || lhr.audits[key]?.score;

console.log('═══════════════════════════════════════════');
console.log('  DASHBOLL · AUDITORÍA');
console.log('═══════════════════════════════════════════');
console.log('Performance     :', cat('performance'));
console.log('Accessibility   :', cat('accessibility'));
console.log('Best Practices  :', cat('best-practices'));
console.log('SEO             :', cat('seo'));
console.log('───────────────────────────────────────────');
console.log('LCP             :', audit('largest-contentful-paint'));
console.log('CLS             :', audit('cumulative-layout-shift'));
console.log('FCP             :', audit('first-contentful-paint'));
console.log('TBT             :', audit('total-blocking-time'));
console.log('Speed Index     :', audit('speed-index'));
console.log('───────────────────────────────────────────');

// Top issues
const failed = Object.values(lhr.audits)
  .filter(a => a.score !== null && a.score < 1 && a.score < 0.9 && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable')
  .map(a => ({ id: a.id, title: a.title, score: a.score, value: a.displayValue }))
  .sort((a, b) => a.score - b.score)
  .slice(0, 10);
console.log('TOP 10 issues:');
failed.forEach(f => console.log(`  · [${Math.round(f.score * 100)}] ${f.id}${f.value ? ' · ' + f.value : ''}`));

await browser.close();
