import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let html;
beforeAll(() => {
  html = readFileSync(resolve('index.html'), 'utf-8');
});

describe('index.html · estructura de la web pública', () => {
  it('tiene meta title, description y OG/Twitter cards', () => {
    expect(html).toMatch(/<title>Dashboll/);
    expect(html).toMatch(/<meta name="description"/);
    expect(html).toMatch(/<meta property="og:title"/);
    expect(html).toMatch(/<meta name="twitter:card"/);
    expect(html).toMatch(/<link rel="canonical"/);
  });

  it('incluye structured data JSON-LD', () => {
    expect(html).toMatch(/application\/ld\+json/);
    expect(html).toMatch(/SoftwareApplication/);
  });

  const sections = ['hero', 'resuelve', 'conoce', 'producto', 'multideporte', 'precios', 'faq', 'demo'];
  it.each(sections)('contiene sección con id="%s"', (id) => {
    expect(html).toMatch(new RegExp(`id="${id}"`));
  });

  it('referencia el componente <dashboll-ball>', () => {
    const matches = html.match(/<dashboll-ball/g);
    expect(matches).not.toBeNull();
    expect(matches.length).toBeGreaterThan(8);
  });

  it('importa los 7 deportes en multideporte', () => {
    const sports = ['padel', 'tennis', 'basket', 'football', 'golf', 'pickleball', 'handball'];
    sports.forEach(s => {
      expect(html).toMatch(new RegExp(`sport="${s}"`));
    });
  });

  it('reusa tokens.css y styles.css', () => {
    expect(html).toMatch(/href="assets\/tokens\.css"/);
    expect(html).toMatch(/href="assets\/styles\.css"/);
    expect(html).toMatch(/href="assets\/web\.css"/);
  });

  it('tiene calculadora ROI con todos los inputs y labels', () => {
    ['roi-courts', 'roi-students', 'roi-fee', 'roi-hours'].forEach(id => {
      expect(html).toMatch(new RegExp(`id="${id}"`));
      expect(html).toMatch(new RegExp(`for="${id}"`));
    });
  });

  it('FAQ tiene 7 preguntas', () => {
    const matches = html.match(/<details class="faq-item">/g);
    expect(matches.length).toBe(7);
  });

  it('tiene 3 planes de pricing', () => {
    const matches = html.match(/class="price-card/g);
    expect(matches.length).toBe(3);
  });

  it('CTA de email es válido', () => {
    expect(html).toMatch(/mailto:hola@dashboll\.app/);
  });

  it('tiene aria-labels y semántica accesible', () => {
    expect(html).toMatch(/aria-label/);
    expect(html).toMatch(/aria-labelledby/);
    expect(html).toMatch(/<main>/);
    expect(html).toMatch(/<nav/);
    expect(html).toMatch(/<footer/);
    expect(html).toMatch(/<article/);
  });
});
