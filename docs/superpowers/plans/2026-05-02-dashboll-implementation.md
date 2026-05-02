# Dashboll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la identidad de marca de Dashboll en producción — manual de identidad de 14 capítulos (HTML scrolleable + PDF), web pública landing, y Web Component reutilizable `<dashboll-ball>` con 7 skins de deporte.

**Architecture:** Stack vainilla (HTML/CSS/JS), un solo `manual.html` con secciones A4 apaisado, `index.html` separado para landing. Tokens CSS centralizados. Web Component nativo para la pelota. PDF generado con wkhtmltopdf. Deploy en Vercel via GitHub.

**Tech Stack:** HTML5, CSS3 con custom properties, JS vainilla con Custom Elements API. Vitest + happy-dom para tests del Web Component. wkhtmltopdf para PDF. Geist + Geist Mono self-hosted (WOFF2). Vercel + GitHub para deploy.

---

## File Structure

```
dashboll/
├── index.html                          ← Landing pública (Task 12, bloqueado)
├── manual.html                         ← Manual de identidad completo
├── package.json                        ← Scripts y devDependencies (vitest)
├── vitest.config.js                    ← Configuración de tests
├── .gitignore                          ← node_modules, .DS_Store, etc.
├── README.md                           ← Setup mínimo
├── vercel.json                         ← Config de deploy estático
├── assets/
│   ├── tokens.css                      ← Variables CSS de marca (paleta, tipografía, espaciado)
│   ├── styles.css                      ← Estilos base compartidos
│   ├── manual.css                      ← Estilos exclusivos del manual (layout A4, nav lateral, print)
│   ├── web.css                         ← Estilos exclusivos de la landing
│   ├── fonts/
│   │   ├── Geist-Regular.woff2
│   │   ├── Geist-Medium.woff2
│   │   ├── Geist-Bold.woff2
│   │   ├── Geist-ExtraBold.woff2
│   │   ├── GeistMono-Regular.woff2
│   │   └── GeistMono-Medium.woff2
│   └── components/
│       └── dashboll-ball.js            ← Web Component <dashboll-ball>
├── pdf/
│   └── manual.pdf                      ← PDF generado (output, gitignored)
├── scripts/
│   ├── build-pdf.sh                    ← Genera PDF con wkhtmltopdf
│   └── download-fonts.sh               ← Descarga Geist self-hosted
└── tests/
    └── dashboll-ball.test.js           ← Tests del Web Component
```

---

## Task 1: Inicialización del proyecto

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `README.md`
- Create: `vitest.config.js`

- [ ] **Step 1.1: Inicializar Git**

```bash
cd "/c/Users/Jorge/Desktop/Code Claude/dashboll"
git init
git branch -M master
```

- [ ] **Step 1.2: Crear `.gitignore`**

```
node_modules/
.DS_Store
*.log
pdf/manual.pdf
.vercel/
.env
.env.local
```

- [ ] **Step 1.3: Crear `package.json`**

```json
{
  "name": "dashboll",
  "version": "1.0.0",
  "description": "Dashboll — manual de identidad y web pública",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "build:pdf": "bash scripts/build-pdf.sh",
    "fonts:download": "bash scripts/download-fonts.sh"
  },
  "devDependencies": {
    "vitest": "^2.0.0",
    "happy-dom": "^15.0.0"
  }
}
```

- [ ] **Step 1.4: Crear `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.test.js']
  }
});
```

- [ ] **Step 1.5: Crear `README.md` mínimo**

```markdown
# Dashboll

Manual de identidad y web pública de Dashboll.

## Setup
- `npm install`
- `npm run fonts:download` (primera vez)
- Abrir `manual.html` o `index.html` en navegador

## Comandos
- `npm test` — tests del Web Component
- `npm run build:pdf` — genera PDF del manual
```

- [ ] **Step 1.6: Instalar dependencias**

```bash
npm install
```

Expected: `node_modules/` creado, sin errores.

- [ ] **Step 1.7: Commit**

```bash
git add package.json package-lock.json vitest.config.js .gitignore README.md
git commit -m "chore: inicializar proyecto Dashboll con vitest"
```

---

## Task 2: Self-host de Geist + Geist Mono

**Files:**
- Create: `scripts/download-fonts.sh`
- Create: `assets/fonts/` (6 archivos WOFF2)

- [ ] **Step 2.1: Crear `scripts/download-fonts.sh`**

```bash
#!/bin/bash
set -e

FONTS_DIR="assets/fonts"
mkdir -p "$FONTS_DIR"

BASE="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts"

# Geist Sans
curl -fsSL "$BASE/geist-sans/Geist-Regular.woff2"   -o "$FONTS_DIR/Geist-Regular.woff2"
curl -fsSL "$BASE/geist-sans/Geist-Medium.woff2"    -o "$FONTS_DIR/Geist-Medium.woff2"
curl -fsSL "$BASE/geist-sans/Geist-Bold.woff2"      -o "$FONTS_DIR/Geist-Bold.woff2"
curl -fsSL "$BASE/geist-sans/Geist-Black.woff2"     -o "$FONTS_DIR/Geist-ExtraBold.woff2"

# Geist Mono
curl -fsSL "$BASE/geist-mono/GeistMono-Regular.woff2" -o "$FONTS_DIR/GeistMono-Regular.woff2"
curl -fsSL "$BASE/geist-mono/GeistMono-Medium.woff2"  -o "$FONTS_DIR/GeistMono-Medium.woff2"

echo "Fonts downloaded to $FONTS_DIR"
ls -la "$FONTS_DIR"
```

- [ ] **Step 2.2: Ejecutar descarga**

```bash
chmod +x scripts/download-fonts.sh
npm run fonts:download
```

Expected: 6 archivos WOFF2 en `assets/fonts/`.

- [ ] **Step 2.3: Commit**

```bash
git add scripts/download-fonts.sh assets/fonts/
git commit -m "feat: self-host Geist + Geist Mono fonts"
```

---

## Task 3: Tokens CSS centralizados

**Files:**
- Create: `assets/tokens.css`

- [ ] **Step 3.1: Crear `assets/tokens.css`**

```css
/* ====================================================================
   Dashboll · Design Tokens
   Single source of truth for brand identity.
   ==================================================================== */

@font-face {
  font-family: 'Geist';
  src: url('./fonts/Geist-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('./fonts/Geist-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('./fonts/Geist-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('./fonts/Geist-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('./fonts/GeistMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('./fonts/GeistMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

:root {
  /* Brand palette — constant signature */
  --brew-blue:    #1a8fc7;
  --deep:         #04476a;
  --cyan-accent:  #4DD0E1;
  --foam:         #fafafa;

  /* Sport ball skins */
  --ball-padel:       #d4e668;
  --ball-tennis:      #e8f266;
  --ball-basket:      #e8723a;
  --ball-football:    #ffffff;
  --ball-golf:        #ffffff;
  --ball-pickleball:  #ffffff;
  --ball-handball:    #ffffff;

  /* Stitch / detail colors per sport */
  --stitch-padel:       #ffffff;
  --stitch-tennis:      #ffffff;
  --stitch-basket:      #1a1a1a;
  --stitch-football:    #1a1a1a;
  --stitch-golf:        #d4d4d4;
  --stitch-pickleball:  #1a1a1a;
  --stitch-handball:    #04476a;

  /* Typography */
  --font-sans: 'Geist', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, 'SF Mono', monospace;

  /* Spacing scale (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Type scale */
  --text-xs:   12px;
  --text-sm:   14px;
  --text-base: 16px;
  --text-md:   18px;
  --text-lg:   22px;
  --text-xl:   28px;
  --text-2xl:  36px;
  --text-3xl:  48px;
  --text-4xl:  64px;
  --text-5xl:  96px;

  /* Layout — A4 landscape */
  --page-width:  297mm;
  --page-height: 210mm;
  --page-margin: 18mm;

  /* Versioning */
  --brand-version: "v1.0";
  --brand-month:   "Mayo 2026";
}
```

- [ ] **Step 3.2: Commit**

```bash
git add assets/tokens.css
git commit -m "feat: add centralized CSS design tokens"
```

---

## Task 4: Web Component `<dashboll-ball>` — TDD

**Files:**
- Create: `tests/dashboll-ball.test.js`
- Create: `assets/components/dashboll-ball.js`

### 4A · Tests primero

- [ ] **Step 4.1: Crear `tests/dashboll-ball.test.js`**

```js
import { describe, it, expect, beforeAll } from 'vitest';
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
    expect(ball.getAttribute('sport') || 'padel').toBe('padel');
    const svg = ball.querySelector('svg');
    const ballCircle = svg.querySelector('[data-role="ball-base"]');
    expect(ballCircle.getAttribute('fill')).toBe('#d4e668');
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
```

- [ ] **Step 4.2: Ejecutar tests, esperar fallo**

```bash
npm test
```

Expected: FAIL — `dashboll-ball.js` no existe todavía.

### 4B · Implementación del componente

- [ ] **Step 4.3: Crear `assets/components/dashboll-ball.js`**

```js
const SPORTS = {
  padel:      { ball: '#d4e668', stitch: '#ffffff', stitchType: 'curve' },
  tennis:     { ball: '#e8f266', stitch: '#ffffff', stitchType: 'curve' },
  basket:     { ball: '#e8723a', stitch: '#1a1a1a', stitchType: 'lines' },
  football:   { ball: '#ffffff', stitch: '#1a1a1a', stitchType: 'hexagons' },
  golf:       { ball: '#ffffff', stitch: '#d4d4d4', stitchType: 'dimples' },
  pickleball: { ball: '#ffffff', stitch: '#1a1a1a', stitchType: 'holes' },
  handball:   { ball: '#ffffff', stitch: '#04476a', stitchType: 'segments' },
};

const BREW_BLUE = '#1a8fc7';

class DashbollBall extends HTMLElement {
  static get observedAttributes() { return ['sport', 'size']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const sport = this.getAttribute('sport') || 'padel';
    const size = parseInt(this.getAttribute('size') || '100', 10);
    const config = SPORTS[sport] || SPORTS.padel;

    const cx = 50, cy = 50, r = 46;

    // Dashboard bars — siempre brew-blue, posicionadas dentro de la pelota
    const bars = [
      { x: 30, h: 18 },
      { x: 40, h: 28 },
      { x: 50, h: 38 },
      { x: 60, h: 22 },
      { x: 70, h: 14 },
    ];
    const barsSvg = bars.map(b =>
      `<rect data-role="dashboard-bar" x="${b.x}" y="${68 - b.h}" width="6" height="${b.h}" fill="${BREW_BLUE}" rx="1"/>`
    ).join('');

    // Stitch / detail por deporte
    let detailsSvg = '';
    if (config.stitchType === 'curve') {
      detailsSvg = `
        <path d="M 8 38 Q 50 22, 92 38" stroke="${config.stitch}" stroke-width="2" fill="none" opacity="0.8"/>
        <path d="M 8 62 Q 50 78, 92 62" stroke="${config.stitch}" stroke-width="2" fill="none" opacity="0.8"/>
      `;
    } else if (config.stitchType === 'lines') {
      detailsSvg = `
        <path d="M 50 4 L 50 96" stroke="${config.stitch}" stroke-width="1.5" opacity="0.6"/>
        <path d="M 4 50 Q 50 30, 96 50" stroke="${config.stitch}" stroke-width="1.5" fill="none" opacity="0.6"/>
        <path d="M 4 50 Q 50 70, 96 50" stroke="${config.stitch}" stroke-width="1.5" fill="none" opacity="0.6"/>
      `;
    } else if (config.stitchType === 'hexagons') {
      detailsSvg = `
        <polygon points="50,18 60,24 60,36 50,42 40,36 40,24" fill="${config.stitch}" opacity="0.85"/>
        <polygon points="26,32 36,38 36,50 26,56 16,50 16,38" fill="${config.stitch}" opacity="0.85"/>
        <polygon points="74,32 84,38 84,50 74,56 64,50 64,38" fill="${config.stitch}" opacity="0.85"/>
      `;
    } else if (config.stitchType === 'dimples') {
      detailsSvg = '';
      for (let i = 0; i < 18; i++) {
        const angle = (i * 20) * Math.PI / 180;
        const dist = 30 + (i % 3) * 6;
        const dx = 50 + Math.cos(angle) * dist;
        const dy = 50 + Math.sin(angle) * dist;
        detailsSvg += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="1.4" fill="${config.stitch}" opacity="0.5"/>`;
      }
    } else if (config.stitchType === 'holes') {
      const holes = [[30,30],[70,30],[30,70],[70,70],[50,20],[50,80],[20,50],[80,50],[50,50]];
      detailsSvg = holes.map(([x,y]) =>
        `<circle cx="${x}" cy="${y}" r="3" fill="${config.stitch}" opacity="0.85"/>`
      ).join('');
    } else if (config.stitchType === 'segments') {
      detailsSvg = `
        <path d="M 4 50 Q 50 30, 96 50" stroke="${config.stitch}" stroke-width="2" fill="none" opacity="0.7"/>
        <path d="M 4 50 Q 50 70, 96 50" stroke="${config.stitch}" stroke-width="2" fill="none" opacity="0.7"/>
        <circle cx="50" cy="50" r="4" fill="#dc2626" opacity="0.6"/>
      `;
    }

    this.innerHTML = `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pelota Dashboll · ${sport}">
  <circle data-role="ball-base" cx="${cx}" cy="${cy}" r="${r}" fill="${config.ball}" stroke="${config.stitch}" stroke-width="0.5"/>
  ${detailsSvg}
  ${barsSvg}
</svg>`.trim();
  }
}

customElements.define('dashboll-ball', DashbollBall);

export { DashbollBall, SPORTS, BREW_BLUE };
```

- [ ] **Step 4.4: Ejecutar tests, esperar pase**

```bash
npm test
```

Expected: PASS — todos los tests verdes.

- [ ] **Step 4.5: Crear página de demo `demo-ball.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Dashboll · Demo de pelotas</title>
  <link rel="stylesheet" href="assets/tokens.css">
  <style>
    body {
      font-family: var(--font-sans);
      background: var(--foam);
      color: var(--deep);
      margin: 0;
      padding: var(--space-7);
    }
    h1 { font-weight: 800; font-size: var(--text-3xl); letter-spacing: -0.04em; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-6);
      margin-top: var(--space-7);
    }
    .ball-cell {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: var(--space-5);
      text-align: center;
    }
    .ball-cell .label {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: var(--brew-blue);
      margin-top: var(--space-3);
    }
  </style>
  <script type="module" src="assets/components/dashboll-ball.js"></script>
</head>
<body>
  <h1>dashboll · sistema de skins</h1>
  <p>Las barras del dashboard interno son siempre <strong>brew-blue</strong>. Solo cambia la pelota.</p>
  <div class="grid">
    <div class="ball-cell"><dashboll-ball sport="padel" size="180"></dashboll-ball><div class="label">Pádel</div></div>
    <div class="ball-cell"><dashboll-ball sport="tennis" size="180"></dashboll-ball><div class="label">Tenis</div></div>
    <div class="ball-cell"><dashboll-ball sport="basket" size="180"></dashboll-ball><div class="label">Básket</div></div>
    <div class="ball-cell"><dashboll-ball sport="football" size="180"></dashboll-ball><div class="label">Fútbol</div></div>
    <div class="ball-cell"><dashboll-ball sport="golf" size="180"></dashboll-ball><div class="label">Golf</div></div>
    <div class="ball-cell"><dashboll-ball sport="pickleball" size="180"></dashboll-ball><div class="label">Pickleball</div></div>
    <div class="ball-cell"><dashboll-ball sport="handball" size="180"></dashboll-ball><div class="label">Balonmano</div></div>
  </div>
</body>
</html>
```

- [ ] **Step 4.6: Validación visual con Jorge**

Abrir `demo-ball.html` en navegador via Visual Companion o Vercel preview deploy.
Pedir a Jorge confirmación visual de las 7 skins antes de continuar.

- [ ] **Step 4.7: Commit**

```bash
git add assets/components/dashboll-ball.js tests/dashboll-ball.test.js demo-ball.html
git commit -m "feat: <dashboll-ball> Web Component con 7 skins de deporte"
```

---

## Task 5: Estilos compartidos y skeleton del manual

**Files:**
- Create: `assets/styles.css`
- Create: `assets/manual.css`
- Create: `manual.html` (skeleton)

- [ ] **Step 5.1: Crear `assets/styles.css`**

```css
/* Reset mínimo + base */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.55;
  color: var(--deep);
  background: var(--foam);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
h1, h2, h3, h4 {
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--deep);
}
h1 { font-size: var(--text-4xl); font-weight: 800; letter-spacing: -0.04em; }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-lg); }
p { margin: 0 0 var(--space-4) 0; }
a { color: var(--brew-blue); text-decoration: none; }
a:hover { text-decoration: underline; }
.mono { font-family: var(--font-mono); }
.label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brew-blue);
}
```

- [ ] **Step 5.2: Crear `assets/manual.css`**

```css
/* ====================================================================
   Manual de identidad — A4 landscape (297mm × 210mm)
   ==================================================================== */

.manual-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}

/* Navegación lateral fija */
.manual-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: var(--space-6) var(--space-5);
  border-right: 1px solid #e5e7eb;
  background: white;
  overflow-y: auto;
}
.manual-nav .brand {
  font-weight: 800;
  font-size: var(--text-xl);
  letter-spacing: -0.04em;
  margin-bottom: var(--space-2);
}
.manual-nav .version {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  color: #9ca3af;
  margin-bottom: var(--space-6);
}
.manual-nav ol {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: chapter;
}
.manual-nav li {
  counter-increment: chapter;
  margin-bottom: var(--space-2);
}
.manual-nav a {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: #4b5563;
  border-radius: 6px;
  transition: all 0.15s;
}
.manual-nav a::before {
  content: counter(chapter, decimal-leading-zero);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: #9ca3af;
  flex-shrink: 0;
}
.manual-nav a:hover { background: var(--foam); color: var(--deep); text-decoration: none; }
.manual-nav a.active { background: var(--deep); color: white; }
.manual-nav a.active::before { color: var(--cyan-accent); }

/* Cuerpo del manual: páginas A4 apaisadas */
.manual-body {
  display: flex;
  flex-direction: column;
}
.chapter {
  width: var(--page-width);
  min-height: var(--page-height);
  padding: var(--page-margin);
  margin: var(--space-6) auto;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  position: relative;
  page-break-after: always;
  break-after: page;
}
.chapter::after {
  content: counter(page, decimal-leading-zero);
  position: absolute;
  bottom: 12mm;
  right: var(--page-margin);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  color: #9ca3af;
}
.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-7);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid #e5e7eb;
}
.chapter-header .num {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  color: var(--brew-blue);
}
.chapter-header .title {
  font-weight: 700;
  font-size: var(--text-2xl);
}

/* Scroll-snap (desactivado por defecto, activable via clase) */
.manual-body.snap {
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
}
.manual-body.snap .chapter {
  scroll-snap-align: start;
}

/* Print: oculta nav, una sección por página */
@media print {
  body { background: white; }
  .manual-nav { display: none; }
  .manual-shell { grid-template-columns: 1fr; }
  .chapter {
    margin: 0;
    box-shadow: none;
    width: 100%;
    min-height: auto;
    padding: var(--page-margin);
  }
  @page {
    size: A4 landscape;
    margin: 0;
  }
}
```

- [ ] **Step 5.3: Crear `manual.html` skeleton (sin contenido de capítulos todavía)**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dashboll · Manual de identidad</title>
  <link rel="stylesheet" href="assets/tokens.css">
  <link rel="stylesheet" href="assets/styles.css">
  <link rel="stylesheet" href="assets/manual.css">
  <script type="module" src="assets/components/dashboll-ball.js"></script>
</head>
<body>
  <div class="manual-shell">
    <aside class="manual-nav">
      <div class="brand">dashboll</div>
      <div class="version">v1.0 · Mayo 2026</div>
      <ol>
        <li><a href="#cap-01" data-chapter="01">Manifiesto</a></li>
        <li><a href="#cap-02" data-chapter="02">El nombre</a></li>
        <li><a href="#cap-03" data-chapter="03">El personaje</a></li>
        <li><a href="#cap-04" data-chapter="04">Anatomía del logo</a></li>
        <li><a href="#cap-05" data-chapter="05">Construcción</a></li>
        <li><a href="#cap-06" data-chapter="06">Skins por deporte</a></li>
        <li><a href="#cap-07" data-chapter="07">Sistema cromático</a></li>
        <li><a href="#cap-08" data-chapter="08">Tipografía</a></li>
        <li><a href="#cap-09" data-chapter="09">Voz y tono</a></li>
        <li><a href="#cap-10" data-chapter="10">Eslóganes</a></li>
        <li><a href="#cap-11" data-chapter="11">Aplicaciones</a></li>
        <li><a href="#cap-12" data-chapter="12">Lo que NO es</a></li>
        <li><a href="#cap-13" data-chapter="13">Próximos pasos</a></li>
        <li><a href="#cap-14" data-chapter="14">Cierre</a></li>
      </ol>
    </aside>
    <main class="manual-body">
      <!-- Capítulos se rellenan en Tasks 6-7 -->
    </main>
  </div>
  <script>
    // Highlight active chapter on scroll
    const chapters = document.querySelectorAll('.chapter');
    const navLinks = document.querySelectorAll('.manual-nav a');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    chapters.forEach(c => obs.observe(c));
  </script>
</body>
</html>
```

- [ ] **Step 5.4: Verificación visual**

Abrir `manual.html` en navegador. Verificar: navegación lateral con 14 capítulos numerados, área principal vacía, fuentes Geist cargando.

- [ ] **Step 5.5: Commit**

```bash
git add assets/styles.css assets/manual.css manual.html
git commit -m "feat: skeleton del manual con nav lateral y layout A4 apaisado"
```

---

## Task 6: Capítulos 1-7 del manual

Cada capítulo se construye como una `<section class="chapter">` insertada en `<main class="manual-body">` de `manual.html`. Cada uno se valida visualmente con Jorge antes de pasar al siguiente, vía Visual Companion o preview de Vercel.

- [ ] **Step 6.1: Capítulo 1 — Manifiesto**

Insertar dentro de `<main class="manual-body">`:

```html
<section class="chapter" id="cap-01">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 01 · MANIFIESTO</span>
    <span class="label">v1.0 · Mayo 2026</span>
  </div>
  <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--space-9); align-items: center; margin-top: var(--space-9);">
    <div>
      <h1 style="font-size: var(--text-5xl); margin-bottom: var(--space-4);">dashboll</h1>
      <p style="font-size: var(--text-md); color: #4b5563; max-width: 36ch;">La pelota está en tu panel.</p>
      <p style="margin-top: var(--space-7); max-width: 42ch;">Dashboll es la herramienta de gestión micro para academias deportivas que prefieren decisiones a fricciones. Calmada, anticipa, propone — sin servilismo y sin urgencia gratuita.</p>
    </div>
    <div style="display: flex; justify-content: center;">
      <dashboll-ball sport="padel" size="320"></dashboll-ball>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 01 — manifiesto"`

- [ ] **Step 6.2: Capítulo 2 — El nombre**

```html
<section class="chapter" id="cap-02">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 02 · EL NOMBRE</span>
    <span class="label">Etimología</span>
  </div>
  <div style="margin-top: var(--space-7);">
    <h2>Dashboard + Ball</h2>
    <p style="margin-top: var(--space-4); max-width: 60ch;">El nombre fusiona el panel de control del gerente (Dashboard) con la pelota (Ball) — el objeto físico que su academia mueve cada día. Una palabra. Dos territorios. Un solo símbolo.</p>
    <div style="margin-top: var(--space-7); display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-7); padding: var(--space-7); background: var(--foam); border-radius: 12px;">
      <div>
        <span class="label">DASH</span>
        <p style="margin-top: var(--space-2); font-size: var(--text-md);">El panel — la mirada de gerente. Datos, ocupación, decisiones.</p>
      </div>
      <div>
        <span class="label">BOLL</span>
        <p style="margin-top: var(--space-2); font-size: var(--text-md);">La pelota — el objeto que mueve cada hora del día.</p>
      </div>
    </div>
    <div style="margin-top: var(--space-7);">
      <span class="label">REGLAS</span>
      <ul style="margin-top: var(--space-3); padding-left: var(--space-5);">
        <li>El wordmark siempre va en <strong>minúsculas</strong>: <code class="mono">dashboll</code></li>
        <li>En texto corrido: <strong>Dashboll</strong> con mayúscula inicial</li>
        <li>Pronunciación: <span class="mono">/dáʃ.bol/</span></li>
        <li>Handle: <span class="mono">@dashboll.app</span></li>
      </ul>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 02 — el nombre"`

- [ ] **Step 6.3: Capítulo 3 — El personaje**

```html
<section class="chapter" id="cap-03">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 03 · EL PERSONAJE</span>
    <span class="label">Personalidad JARVIS</span>
  </div>
  <div style="display: grid; grid-template-columns: 240px 1fr; gap: var(--space-7); margin-top: var(--space-7); align-items: start;">
    <dashboll-ball sport="padel" size="240"></dashboll-ball>
    <div>
      <h2>Dashboll es la pelota. Y la pelota es el asistente.</h2>
      <p style="margin-top: var(--space-4);">No hay dos personajes. Marca y asistente comparten nombre, símbolo y voz. Cuando un gerente abre la app, Dashboll le habla. Cuando un jugador reserva, Dashboll le confirma. Una sola identidad atravesando todo el producto.</p>
      <div style="margin-top: var(--space-6); padding: var(--space-5); background: var(--deep); color: white; border-radius: 10px; font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.7;">
        <span style="color: var(--cyan-accent); font-size: var(--text-xs); letter-spacing: 0.14em;">DASHBOLL · 18:00</span><br>
        He detectado 3 huecos en la franja de las 18:00.<br>
        Te propongo 4 perfiles que encajan: Eduardo M., Carla T., Miguel R., Sofía L.<br>
        Los tres primeros han confirmado disponibilidad.
      </div>
      <div style="margin-top: var(--space-6); display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4);">
        <div><span class="label">RASGO</span><p style="margin-top: 2px;">Anticipa antes de que pidas</p></div>
        <div><span class="label">RASGO</span><p style="margin-top: 2px;">Tutea con autoridad</p></div>
        <div><span class="label">RASGO</span><p style="margin-top: 2px;">Datos con criterio</p></div>
        <div><span class="label">RASGO</span><p style="margin-top: 2px;">Lealtad sin servilismo</p></div>
      </div>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 03 — el personaje"`

- [ ] **Step 6.4: Capítulo 4 — Anatomía del logo**

```html
<section class="chapter" id="cap-04">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 04 · ANATOMÍA DEL LOGO</span>
    <span class="label">Despiece</span>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-7); margin-top: var(--space-7); align-items: center;">
    <div style="display: flex; justify-content: center;">
      <dashboll-ball sport="padel" size="360"></dashboll-ball>
    </div>
    <div>
      <h2>Tres elementos. Una identidad.</h2>
      <ol style="margin-top: var(--space-5); padding-left: 0; list-style: none; counter-reset: anatomy;">
        <li style="counter-increment: anatomy; padding: var(--space-4) 0; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; gap: var(--space-4); align-items: baseline;">
            <span class="mono" style="color: var(--brew-blue); font-weight: 700;">01</span>
            <div>
              <strong>Pelota base</strong>
              <p style="margin-top: 2px; color: #6b7280;">Color y costuras del deporte gestionado. Variable.</p>
            </div>
          </div>
        </li>
        <li style="counter-increment: anatomy; padding: var(--space-4) 0; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; gap: var(--space-4); align-items: baseline;">
            <span class="mono" style="color: var(--brew-blue); font-weight: 700;">02</span>
            <div>
              <strong>Costuras / detalles</strong>
              <p style="margin-top: 2px; color: #6b7280;">Marca el deporte. Curvas, hexágonos, dimples, agujeros.</p>
            </div>
          </div>
        </li>
        <li style="counter-increment: anatomy; padding: var(--space-4) 0;">
          <div style="display: flex; gap: var(--space-4); align-items: baseline;">
            <span class="mono" style="color: var(--brew-blue); font-weight: 700;">03</span>
            <div>
              <strong>Dashboard interno</strong>
              <p style="margin-top: 2px; color: #6b7280;">Las barras siempre en <code class="mono">brew-blue</code>. Constante absoluta.</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 04 — anatomía del logo"`

- [ ] **Step 6.5: Capítulo 5 — Construcción**

```html
<section class="chapter" id="cap-05">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 05 · CONSTRUCCIÓN</span>
    <span class="label">Proporciones y uso</span>
  </div>
  <div style="margin-top: var(--space-7);">
    <h2>Tamaños mínimos y área de protección</h2>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); margin-top: var(--space-6); align-items: end;">
      <div style="text-align: center;">
        <dashboll-ball sport="padel" size="32"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-2);">32px · MÍNIMO</div>
      </div>
      <div style="text-align: center;">
        <dashboll-ball sport="padel" size="64"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-2);">64px · UI</div>
      </div>
      <div style="text-align: center;">
        <dashboll-ball sport="padel" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-2);">120px · HEADER</div>
      </div>
      <div style="text-align: center;">
        <dashboll-ball sport="padel" size="180"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-2);">180px+ · DESTACADO</div>
      </div>
    </div>
    <div style="margin-top: var(--space-7); padding: var(--space-5); background: var(--foam); border-radius: 10px;">
      <span class="label">REGLA DE PROTECCIÓN</span>
      <p style="margin-top: var(--space-2);">Mantener un espacio libre alrededor del logo igual al <strong>25% de su tamaño</strong>. Por debajo de 32px la pelota pierde legibilidad de sus barras internas — usar versión simplificada o icono alternativo.</p>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 05 — construcción"`

- [ ] **Step 6.6: Capítulo 6 — Skins por deporte**

```html
<section class="chapter" id="cap-06">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 06 · SKINS</span>
    <span class="label">7 deportes · 1 sistema</span>
  </div>
  <div style="margin-top: var(--space-6);">
    <p style="max-width: 70ch; color: #4b5563;">Una sola firma con siete trajes. La pelota cambia según el deporte que gestiona la academia, pero las barras del dashboard interno son siempre <strong>brew-blue</strong>. Esa es la constante de marca.</p>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-5); margin-top: var(--space-7);">
      <div style="text-align: center; padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <dashboll-ball sport="padel" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-3);">PÁDEL</div>
        <div class="mono" style="font-size: var(--text-xs); color: #9ca3af;">#d4e668</div>
      </div>
      <div style="text-align: center; padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <dashboll-ball sport="tennis" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-3);">TENIS</div>
        <div class="mono" style="font-size: var(--text-xs); color: #9ca3af;">#e8f266</div>
      </div>
      <div style="text-align: center; padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <dashboll-ball sport="basket" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-3);">BÁSKET</div>
        <div class="mono" style="font-size: var(--text-xs); color: #9ca3af;">#e8723a</div>
      </div>
      <div style="text-align: center; padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <dashboll-ball sport="football" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-3);">FÚTBOL</div>
        <div class="mono" style="font-size: var(--text-xs); color: #9ca3af;">#ffffff</div>
      </div>
      <div style="text-align: center; padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <dashboll-ball sport="golf" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-3);">GOLF</div>
        <div class="mono" style="font-size: var(--text-xs); color: #9ca3af;">#ffffff</div>
      </div>
      <div style="text-align: center; padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <dashboll-ball sport="pickleball" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-3);">PICKLEBALL</div>
        <div class="mono" style="font-size: var(--text-xs); color: #9ca3af;">#ffffff</div>
      </div>
      <div style="text-align: center; padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <dashboll-ball sport="handball" size="120"></dashboll-ball>
        <div class="label" style="margin-top: var(--space-3);">BALONMANO</div>
        <div class="mono" style="font-size: var(--text-xs); color: #9ca3af;">#ffffff</div>
      </div>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 06 — skins por deporte"`

- [ ] **Step 6.7: Capítulo 7 — Sistema cromático**

```html
<section class="chapter" id="cap-07">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 07 · SISTEMA CROMÁTICO</span>
    <span class="label">Paleta dual</span>
  </div>
  <div style="margin-top: var(--space-6);">
    <h2>Marca constante + skin variable</h2>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-top: var(--space-6);">
      <div style="background: var(--brew-blue); aspect-ratio: 1; border-radius: 10px; padding: var(--space-4); display: flex; flex-direction: column; justify-content: flex-end; color: white;">
        <div class="mono" style="font-size: var(--text-xs); letter-spacing: 0.10em;">BREW BLUE</div>
        <div class="mono" style="font-size: var(--text-sm);">#1a8fc7</div>
      </div>
      <div style="background: var(--deep); aspect-ratio: 1; border-radius: 10px; padding: var(--space-4); display: flex; flex-direction: column; justify-content: flex-end; color: white;">
        <div class="mono" style="font-size: var(--text-xs); letter-spacing: 0.10em;">DEEP</div>
        <div class="mono" style="font-size: var(--text-sm);">#04476a</div>
      </div>
      <div style="background: var(--cyan-accent); aspect-ratio: 1; border-radius: 10px; padding: var(--space-4); display: flex; flex-direction: column; justify-content: flex-end; color: var(--deep);">
        <div class="mono" style="font-size: var(--text-xs); letter-spacing: 0.10em;">CYAN ACCENT</div>
        <div class="mono" style="font-size: var(--text-sm);">#4DD0E1</div>
      </div>
      <div style="background: var(--foam); aspect-ratio: 1; border-radius: 10px; padding: var(--space-4); display: flex; flex-direction: column; justify-content: flex-end; color: var(--deep); border: 1px solid #e5e7eb;">
        <div class="mono" style="font-size: var(--text-xs); letter-spacing: 0.10em;">FOAM</div>
        <div class="mono" style="font-size: var(--text-sm);">#fafafa</div>
      </div>
    </div>
    <div style="margin-top: var(--space-7); padding: var(--space-5); background: var(--deep); color: white; border-radius: 10px;">
      <span class="label" style="color: var(--cyan-accent);">REGLA INVIOLABLE</span>
      <p style="margin-top: var(--space-2); font-size: var(--text-md);">Las <strong>barras del dashboard interno</strong> de la pelota son siempre <code class="mono" style="color: var(--cyan-accent);">brew-blue (#1a8fc7)</code>. No importa el deporte. No importa el contexto. Esa es la firma de Dashboll.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 6.8: Validación visual con Jorge (capítulos 1-7)**

Pedir a Jorge que revise los 7 primeros capítulos en el navegador antes de seguir.

Commit final del lote: `git commit -am "feat: cap 07 — sistema cromático"`

---

## Task 7: Capítulos 8-14 del manual

Mismo patrón que Task 6: cada capítulo se inserta en `<main class="manual-body">` después del anterior.

- [ ] **Step 7.1: Capítulo 8 — Tipografía**

```html
<section class="chapter" id="cap-08">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 08 · TIPOGRAFÍA</span>
    <span class="label">Geist + Geist Mono</span>
  </div>
  <div style="margin-top: var(--space-6);">
    <h2>Una familia. Dos voces.</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-7); margin-top: var(--space-6);">
      <div style="padding: var(--space-6); background: var(--foam); border-radius: 10px;">
        <span class="label">GEIST · TEXTO</span>
        <div style="font-size: var(--text-5xl); font-weight: 800; letter-spacing: -0.04em; margin-top: var(--space-3);">Aa</div>
        <div style="margin-top: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
          <div style="font-weight: 400;">Regular · 400</div>
          <div style="font-weight: 500;">Medium · 500</div>
          <div style="font-weight: 700;">Bold · 700</div>
          <div style="font-weight: 800;">ExtraBold · 800</div>
        </div>
      </div>
      <div style="padding: var(--space-6); background: var(--deep); color: white; border-radius: 10px;">
        <span class="label" style="color: var(--cyan-accent);">GEIST MONO · DATOS</span>
        <div class="mono" style="font-size: var(--text-5xl); font-weight: 700; letter-spacing: -0.02em; margin-top: var(--space-3);">87%</div>
        <div class="mono" style="margin-top: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
          <div>Cobertura ····· 87%</div>
          <div>Hueco ········· 13%</div>
          <div>Reservas ······ 142</div>
          <div>Pendientes ····  03</div>
        </div>
      </div>
    </div>
    <p style="margin-top: var(--space-6); max-width: 70ch; color: #4b5563;">Geist da el cuerpo y la voz. Geist Mono da los datos. La pareja construye el lenguaje del producto: prosa por un lado, métrica por otro, sin pelearse.</p>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 08 — tipografía"`

- [ ] **Step 7.2: Capítulo 9 — Voz y tono**

```html
<section class="chapter" id="cap-09">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 09 · VOZ Y TONO</span>
    <span class="label">Cómo habla Dashboll</span>
  </div>
  <div style="margin-top: var(--space-6);">
    <h2>Calma operativa. Cero ruido.</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-top: var(--space-6);">
      <div style="padding: var(--space-5); background: #f0fdf4; border-left: 3px solid #10b981; border-radius: 8px;">
        <span class="label" style="color: #10b981;">ASÍ SÍ</span>
        <div style="margin-top: var(--space-3); font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.7;">
          <p>"He detectado 3 huecos en la franja de las 18:00. Te propongo 4 perfiles."</p>
          <p>"Cobertura del miércoles: 87%. Sigues por encima de tu media."</p>
          <p>"Reserva confirmada. Nos vemos a las 19:30."</p>
        </div>
      </div>
      <div style="padding: var(--space-5); background: #fef2f2; border-left: 3px solid #dc2626; border-radius: 8px;">
        <span class="label" style="color: #dc2626;">ASÍ NO</span>
        <div style="margin-top: var(--space-3); font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.7; color: #991b1b;">
          <p>"¡Hola! 👋 ¡Tienes huecos disponibles!"</p>
          <p>"⚠️ ¡URGENTE! Optimiza tu academia YA."</p>
          <p>"¡Wow, qué buena reserva! 🎾🎉"</p>
        </div>
      </div>
    </div>
    <div style="margin-top: var(--space-6); display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4);">
      <div><span class="label">RATIO</span><p style="margin-top: 2px;">95% profesional · 5% guiños</p></div>
      <div><span class="label">EMOJIS</span><p style="margin-top: 2px;">Cero. Nunca.</p></div>
      <div><span class="label">EXCLAMACIONES</span><p style="margin-top: 2px;">Cero. La calma transmite autoridad.</p></div>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 09 — voz y tono"`

- [ ] **Step 7.3: Capítulo 10 — Eslóganes**

```html
<section class="chapter" id="cap-10">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 10 · ESLÓGANES</span>
    <span class="label">Sistema de claims</span>
  </div>
  <div style="margin-top: var(--space-7);">
    <div style="text-align: center; padding: var(--space-9); background: var(--deep); color: white; border-radius: 14px;">
      <span class="label" style="color: var(--cyan-accent);">CLAIM PRINCIPAL</span>
      <h1 style="color: white; font-size: var(--text-4xl); margin-top: var(--space-3); letter-spacing: -0.04em;">La pelota está en tu panel.</h1>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-top: var(--space-6);">
      <div style="padding: var(--space-6); background: var(--foam); border-radius: 10px; text-align: center;">
        <span class="label">ALTERNATIVO 01</span>
        <p style="margin-top: var(--space-3); font-size: var(--text-xl); font-weight: 700; color: var(--deep);">Tu academia, en juego.</p>
      </div>
      <div style="padding: var(--space-6); background: var(--foam); border-radius: 10px; text-align: center;">
        <span class="label">ALTERNATIVO 02</span>
        <p style="margin-top: var(--space-3); font-size: var(--text-xl); font-weight: 700; color: var(--deep);">Mueve tu club.</p>
      </div>
    </div>
    <p style="margin-top: var(--space-6); max-width: 70ch; color: #4b5563;">Los tres comparten ADN: verbos de acción, palabras cortas, ningún superlativo. Si en el futuro hace falta un nuevo claim, debe pasar el filtro: ¿es directo? ¿es deportivo sin ser cliché? ¿transmite control sin urgencia?</p>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 10 — eslóganes"`

- [ ] **Step 7.4: Capítulo 11 — Aplicaciones reales**

```html
<section class="chapter" id="cap-11">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 11 · APLICACIONES</span>
    <span class="label">Mockups en producto</span>
  </div>
  <div style="margin-top: var(--space-6);">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5);">
      <div style="background: var(--deep); border-radius: 12px; padding: var(--space-6); color: white;">
        <span class="label" style="color: var(--cyan-accent);">VISTA · GERENTE</span>
        <h3 style="color: white; margin-top: var(--space-3);">Ocupación · Hoy</h3>
        <div class="mono" style="margin-top: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-sm);">
          <div>09:00 · pista 1 ····· <span style="color: var(--cyan-accent);">100%</span></div>
          <div>10:30 · pista 1 ····· <span style="color: var(--cyan-accent);">100%</span></div>
          <div>18:00 · pista 1 ····· <span style="color: #fbbf24;">050%</span></div>
          <div>19:30 · pista 1 ····· <span style="color: var(--cyan-accent);">100%</span></div>
        </div>
        <div style="margin-top: var(--space-5); padding-top: var(--space-4); border-top: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: var(--space-3);">
          <dashboll-ball sport="padel" size="48"></dashboll-ball>
          <div style="font-size: var(--text-xs);">3 huecos detectados. Te propongo 4 perfiles.</div>
        </div>
      </div>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: var(--space-6);">
        <span class="label">VISTA · JUGADOR</span>
        <h3 style="margin-top: var(--space-3);">Tu próxima clase</h3>
        <div style="margin-top: var(--space-4); padding: var(--space-4); background: var(--foam); border-radius: 8px;">
          <div class="mono" style="font-size: var(--text-xs); color: var(--brew-blue); letter-spacing: 0.10em;">JUEVES 04 · 19:30</div>
          <div style="margin-top: 4px; font-weight: 700;">Iniciación · pista 3</div>
          <div style="font-size: var(--text-sm); color: #6b7280; margin-top: 2px;">Eduardo M. · 4 jugadores</div>
        </div>
        <div style="margin-top: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
          <dashboll-ball sport="padel" size="40"></dashboll-ball>
          <div style="font-size: var(--text-xs); color: #6b7280;">Confirmada. Nos vemos a las 19:30.</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 11 — aplicaciones"`

- [ ] **Step 7.5: Capítulo 12 — Lo que NO es**

```html
<section class="chapter" id="cap-12">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 12 · LO QUE NO ES</span>
    <span class="label">Anti-patterns</span>
  </div>
  <div style="margin-top: var(--space-6);">
    <h2>Dashboll no es...</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: var(--space-5);">
      <div style="padding: var(--space-5); background: #fef2f2; border-radius: 8px;">
        <span class="label" style="color: #dc2626;">NO ES</span>
        <p style="margin-top: var(--space-2); font-weight: 600;">Una marca editorial</p>
        <p style="margin-top: 2px; color: #6b7280; font-size: var(--text-sm);">Nada de serif, cursivas, ritual matutino, copy poético.</p>
      </div>
      <div style="padding: var(--space-5); background: #fef2f2; border-radius: 8px;">
        <span class="label" style="color: #dc2626;">NO ES</span>
        <p style="margin-top: var(--space-2); font-weight: 600;">Una mascota cariñosa</p>
        <p style="margin-top: 2px; color: #6b7280; font-size: var(--text-sm);">Dashboll no saluda con emojis ni celebra con confeti.</p>
      </div>
      <div style="padding: var(--space-5); background: #fef2f2; border-radius: 8px;">
        <span class="label" style="color: #dc2626;">NO ES</span>
        <p style="margin-top: var(--space-2); font-weight: 600;">Un SaaS genérico</p>
        <p style="margin-top: 2px; color: #6b7280; font-size: var(--text-sm);">Cero stock photos de gente sonriendo en oficinas.</p>
      </div>
      <div style="padding: var(--space-5); background: #fef2f2; border-radius: 8px;">
        <span class="label" style="color: #dc2626;">NO ES</span>
        <p style="margin-top: var(--space-2); font-weight: 600;">Una marca alarmista</p>
        <p style="margin-top: 2px; color: #6b7280; font-size: var(--text-sm);">Sin "¡URGENTE!", sin contadores de FOMO, sin presión.</p>
      </div>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 12 — anti-patterns"`

- [ ] **Step 7.6: Capítulo 13 — Próximos pasos**

```html
<section class="chapter" id="cap-13">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 13 · PRÓXIMOS PASOS</span>
    <span class="label">Roadmap de marca</span>
  </div>
  <div style="margin-top: var(--space-6);">
    <h2>La marca crece con el producto</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); margin-top: var(--space-6);">
      <div style="padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <span class="label">Q3 2026</span>
        <p style="margin-top: var(--space-3); font-weight: 700;">Expansión LATAM</p>
        <p style="font-size: var(--text-sm); color: #6b7280; margin-top: var(--space-2);">Voz adaptada al español de México, Colombia, Argentina.</p>
      </div>
      <div style="padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <span class="label">Q4 2026</span>
        <p style="margin-top: var(--space-3); font-weight: 700;">Nuevos deportes</p>
        <p style="font-size: var(--text-sm); color: #6b7280; margin-top: var(--space-2);">Skin para tenis de mesa, squash, voleibol.</p>
      </div>
      <div style="padding: var(--space-5); background: var(--foam); border-radius: 10px;">
        <span class="label">2027</span>
        <p style="margin-top: var(--space-3); font-weight: 700;">Manual v2.0</p>
        <p style="font-size: var(--text-sm); color: #6b7280; margin-top: var(--space-2);">Iconografía completa, motion design, sonido de marca.</p>
      </div>
    </div>
  </div>
</section>
```

Commit: `git commit -am "feat: cap 13 — próximos pasos"`

- [ ] **Step 7.7: Capítulo 14 — Cierre**

```html
<section class="chapter" id="cap-14">
  <div class="chapter-header">
    <span class="num">CAPÍTULO 14 · CIERRE</span>
    <span class="label">Versionado</span>
  </div>
  <div style="margin-top: var(--space-9); text-align: center;">
    <dashboll-ball sport="padel" size="220"></dashboll-ball>
    <h1 style="margin-top: var(--space-6); font-size: var(--text-4xl);">dashboll</h1>
    <p style="margin-top: var(--space-3); color: #6b7280; max-width: 50ch; margin-left: auto; margin-right: auto;">La pelota está en tu panel.</p>
    <div class="mono" style="margin-top: var(--space-9); display: inline-flex; gap: var(--space-5); padding: var(--space-4) var(--space-6); background: var(--foam); border-radius: 10px; font-size: var(--text-sm);">
      <span>Manual de identidad Dashboll</span>
      <span style="color: var(--brew-blue); font-weight: 700;">v1.0</span>
      <span>·</span>
      <span>Mayo 2026</span>
    </div>
    <div style="margin-top: var(--space-7); font-size: var(--text-xs); color: #9ca3af;">
      Para uso interno y partners. Cualquier desviación de esta guía debe documentarse en una nueva versión.
    </div>
  </div>
</section>
```

- [ ] **Step 7.8: Validación visual con Jorge (capítulos 8-14)**

Pedir a Jorge que revise los 7 capítulos finales antes de continuar al PDF.

Commit final del lote: `git commit -am "feat: cap 14 — cierre"`

---

## Task 8: PDF profesional con header/footer

**Files:**
- Create: `scripts/build-pdf.sh`
- Create: `pdf/.gitkeep`

- [ ] **Step 8.1: Verificar que wkhtmltopdf está instalado**

```bash
which wkhtmltopdf || echo "INSTALAR: https://wkhtmltopdf.org/downloads.html"
```

Si no está, descargar e instalar (Windows: usar el `.exe` oficial). En Mac: `brew install wkhtmltopdf`.

- [ ] **Step 8.2: Crear `scripts/build-pdf.sh`**

```bash
#!/bin/bash
set -e

INPUT="manual.html"
OUTPUT="pdf/manual.pdf"
HEADER="<!DOCTYPE html><html><head><style>body{font-family:'Geist Mono',monospace;font-size:9px;color:#9ca3af;letter-spacing:0.10em;text-transform:uppercase;padding:8mm 18mm 0 18mm;display:flex;justify-content:flex-end;}</style></head><body>DASHBOLL · MANUAL DE IDENTIDAD</body></html>"
FOOTER="<!DOCTYPE html><html><head><style>body{font-family:'Geist Mono',monospace;font-size:9px;color:#9ca3af;letter-spacing:0.10em;padding:0 18mm 8mm 18mm;display:flex;justify-content:space-between;}</style></head><body><span>v1.0 · Mayo 2026</span><span>pág <span class='page'></span> de <span class='topage'></span></span></body></html>"

mkdir -p pdf

echo "$HEADER" > /tmp/dashboll-header.html
echo "$FOOTER" > /tmp/dashboll-footer.html

wkhtmltopdf \
  --enable-local-file-access \
  --orientation Landscape \
  --page-size A4 \
  --margin-top 22mm \
  --margin-bottom 18mm \
  --margin-left 0 \
  --margin-right 0 \
  --header-html /tmp/dashboll-header.html \
  --footer-html /tmp/dashboll-footer.html \
  --print-media-type \
  --javascript-delay 1500 \
  "$INPUT" \
  "$OUTPUT"

rm /tmp/dashboll-header.html /tmp/dashboll-footer.html

echo ""
echo "PDF generado: $OUTPUT"
ls -lh "$OUTPUT"
```

- [ ] **Step 8.3: Crear `pdf/.gitkeep`**

```bash
mkdir -p pdf
touch pdf/.gitkeep
```

- [ ] **Step 8.4: Generar el PDF**

```bash
chmod +x scripts/build-pdf.sh
npm run build:pdf
```

Expected: `pdf/manual.pdf` generado, ~2-5 MB, 14 páginas A4 apaisadas con header arriba a la derecha y footer abajo con paginación.

- [ ] **Step 8.5: Validación visual del PDF con Jorge**

Abrir `pdf/manual.pdf` y verificar: 14 páginas, fonts correctas, colores de paleta, header "DASHBOLL · MANUAL DE IDENTIDAD" arriba derecha, footer "v1.0 · Mayo 2026 · pág X de Y" abajo en Mono.

- [ ] **Step 8.6: Commit**

```bash
git add scripts/build-pdf.sh pdf/.gitkeep
git commit -m "feat: build script de PDF con header/footer en Geist Mono"
```

---

## Task 9: Configuración de deploy en Vercel

**Files:**
- Create: `vercel.json`

- [ ] **Step 9.1: Crear `vercel.json`**

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/assets/(.*)\\.(css|js)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/manual", "destination": "/manual.html" }
  ]
}
```

- [ ] **Step 9.2: Crear repositorio GitHub y conectar Vercel**

Manual via Jorge:
- Crear repo `jorgecardenasnavas-ship-it/dashboll` en GitHub.
- Push:
```bash
git remote add origin git@github.com:jorgecardenasnavas-ship-it/dashboll.git
git push -u origin master
```
- En Vercel dashboard: import desde GitHub, project name `dashboll`, framework preset `Other` (proyecto estático), root directory `.`.

- [ ] **Step 9.3: Validar deploy**

URL pública de Vercel debe servir:
- `/` → `index.html` (placeholder vacío hasta Task 10)
- `/manual` → `manual.html` con todos los capítulos
- Fonts cargando, colores correctos, Web Component funcional.

- [ ] **Step 9.4: Commit**

```bash
git add vercel.json
git commit -m "chore: configurar Vercel deploy con cache headers"
git push
```

---

## Task 10: Web pública (BLOQUEADO hasta input de Jorge)

**Pre-requisito:** Jorge envía la versión actual de la web (taupe-taiyaki-c2c33d.netlify.app) para extraer copys, recursos visuales reutilizables y secciones que se mantienen.

**Files (cuando se desbloquee):**
- Create: `index.html`
- Create: `assets/web.css`

- [ ] **Step 10.1: Recibir la web actual de Jorge**

Jorge envía URL o zip de la versión actual. Auditar: copy del hero, propuesta de valor, secciones de producto, recursos visuales reutilizables, contacto.

- [ ] **Step 10.2: Mapear secciones de la nueva landing**

Decidir qué se mantiene, qué se descarta, qué se reemplaza:
- Hero · wordmark + eslogan + pelota animada
- Qué es Dashboll · para quién, qué resuelve
- Conoce a Dashboll (asistente) · ejemplo conversacional
- Multideporte · galería de skins
- Cómo funciona · 3 flujos
- Contacto / Demo

- [ ] **Step 10.3: Crear `assets/web.css` con estilos exclusivos de landing**

(Pendiente de definir estructura visual concreta tras audit del paso 10.1)

- [ ] **Step 10.4: Crear `index.html` con las 6 secciones**

(Pendiente de construir tras 10.1)

- [ ] **Step 10.5: Validación visual con Jorge y deploy**

- [ ] **Step 10.6: Commit y push**

```bash
git add index.html assets/web.css
git commit -m "feat: landing pública dashboll.app"
git push
```

---

## Self-review

**1. Spec coverage:**
- Sección 2.1 (marca) → Tasks 5, 6 (caps 1-3) ✓
- Sección 2.2 (sistema cromático) → Tasks 3, 4, 6 (cap 7) ✓
- Sección 2.3 (tipografía) → Tasks 2, 3, 7 (cap 8) ✓
- Sección 2.4 (voz) → Task 7 (cap 9) ✓
- Sección 3.1 (stack) → Task 1 ✓
- Sección 3.2 (enfoque A) → Tasks 5-7 ✓
- Sección 3.3 (estructura repo) → Task 1 + estructura distribuida en cada task ✓
- Sección 3.4 (Web Component) → Task 4 ✓
- Sección 3.5 (pack 6 mejoras): tokens (T3) ✓ · Web Component (T4) ✓ · PDF header/footer (T8) ✓ · scroll-snap (T5, desactivado por defecto) ✓ · self-host fonts (T2) ✓ · versionado footer (T7 cap 14, T8 PDF footer) ✓
- Sección 4 (14 capítulos) → Tasks 6-7 ✓
- Sección 5 (web pública) → Task 10 (bloqueado) ✓
- Sección 6 (orden construcción) → Tasks alineadas con el orden ✓
- Sección 7 (no en v1) → respetado en el plan ✓
- Sección 8 (criterios éxito) → cubiertos por tasks ✓

**2. Placeholder scan:**
- Task 10 contiene "Pendiente de definir/construir" en steps 10.3 y 10.4. Esto es intencional — el bloqueo está documentado en el spec sección 5 y en Task 10. Cuando llegue el input de Jorge, Task 10 se reescribe con detalle.

**3. Type consistency:**
- `<dashboll-ball>` con atributos `sport` y `size` consistente entre Task 4 (definición), Task 6 (uso en capítulos 1, 3, 4, 5, 6), Task 7 (cap 11, 14).
- Variables CSS (`--brew-blue`, `--deep`, `--cyan-accent`, `--foam`) consistentes entre Task 3 (definición) y Tasks 5-7 (uso).
- Colores hex consistentes con spec sección 2.2.

Plan listo para ejecutar.
