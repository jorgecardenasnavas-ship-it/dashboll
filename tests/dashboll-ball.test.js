import { describe, it, expect } from 'vitest';
import '../assets/components/dashboll-ball.js';

const BREW_BLUE = '#1a8fc7';
const SPORTS = ['padel', 'tennis', 'basket', 'football', 'golf', 'pickleball', 'handball'];

function createBall(attrs = {}) {
  const el = document.createElement('dashboll-ball');
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  document.body.appendChild(el);
  return el;
}

describe('<dashboll-ball>', () => {
  it('renderiza un SVG', () => {
    const ball = createBall();
    const svg = ball.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('por defecto usa sport=padel', () => {
    const ball = createBall();
    const base = ball.querySelector('[data-role="ball-base"]');
    expect(base.getAttribute('fill')).toBe('#d4e668');
  });

  it('por defecto usa size=100', () => {
    const ball = createBall();
    const svg = ball.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('100');
    expect(svg.getAttribute('height')).toBe('100');
  });

  it('size custom se aplica al SVG', () => {
    const ball = createBall({ size: '240' });
    const svg = ball.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('240');
    expect(svg.getAttribute('height')).toBe('240');
  });

  it.each(SPORTS)('renderiza correctamente sport=%s', (sport) => {
    const ball = createBall({ sport });
    const svg = ball.querySelector('svg');
    expect(svg).not.toBeNull();
    const base = svg.querySelector('[data-role="ball-base"]');
    expect(base).not.toBeNull();
  });

  it.each(SPORTS)('barras del dashboard SIEMPRE en brew-blue para sport=%s', (sport) => {
    const ball = createBall({ sport });
    const svg = ball.querySelector('svg');
    const bars = svg.querySelectorAll('[data-role="dashboard-bar"]');
    expect(bars.length).toBeGreaterThan(0);
    bars.forEach(bar => {
      expect(bar.getAttribute('fill').toLowerCase()).toBe(BREW_BLUE);
    });
  });

  it('cambiar atributo sport actualiza el render', () => {
    const ball = createBall({ sport: 'padel' });
    ball.setAttribute('sport', 'basket');
    const base = ball.querySelector('[data-role="ball-base"]');
    expect(base.getAttribute('fill')).toBe('#e8723a');
  });
});
