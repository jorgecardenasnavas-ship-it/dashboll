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
    expect(ball.querySelector('svg')).not.toBeNull();
  });

  it('size por defecto = 100', () => {
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

  it.each(SPORTS)('renderiza pelota base brew-blue para sport=%s', (sport) => {
    const ball = createBall({ sport });
    const base = ball.querySelector('[data-role="ball-base"]');
    expect(base).not.toBeNull();
    expect(base.getAttribute('fill').toLowerCase()).toBe(BREW_BLUE);
  });

  it.each(SPORTS)('renderiza el semicírculo de ocupación para sport=%s', (sport) => {
    const ball = createBall({ sport });
    const bars = ball.querySelectorAll('[data-role="dashboard-bar"]');
    expect(bars.length).toBe(2);
  });

  it.each(SPORTS)('cada deporte tiene patrón distintivo (sport=%s)', (sport) => {
    const ball = createBall({ sport });
    const seamsOrDimples = ball.querySelectorAll(
      '[data-role="seam"], [data-role="dimples"], [data-role="hex"], [data-role="holes"]'
    );
    expect(seamsOrDimples.length).toBeGreaterThan(0);
  });

  it('cambiar atributo sport actualiza el render', () => {
    const ball = createBall({ sport: 'tennis' });
    expect(ball.querySelector('[data-role="seam"]')).not.toBeNull();
    ball.setAttribute('sport', 'football');
    expect(ball.querySelector('[data-role="hex"]')).not.toBeNull();
  });
});
