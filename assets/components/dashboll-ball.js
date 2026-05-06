// Paleta sincronizada con tokens.css (Court at Dusk · 2026)
const BREW_BLUE = '#1F6B52';   // court-500 · verde cancha
const COURT_700 = '#0F2E24';   // verde profundo · superficies elevadas
const DEEP = '#0A1410';        // ink-900 · tinta
const CYAN = '#C8FF3D';        // lime-400 · acento eléctrico
const FOAM = '#F4EFE6';        // bone · crema cálida (sustituye al blanco puro)
const WHITE = '#F4EFE6';       // bone · ningún blanco puro en la marca
const BLACK = '#000000';

// Detecta la luminancia del fondo efectivo (sube por el árbol DOM hasta encontrar bg explícito).
// Devuelve número en [0,1]. >0.5 = fondo claro. Permite que el track sutil del isotipo
// elija color según contexto.
function effectiveBgLuminance(el) {
  let cur = el.parentElement;
  const docEl = document.documentElement;
  while (cur && cur !== docEl) {
    const bg = getComputedStyle(cur).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      const m = bg.match(/\d+(\.\d+)?/g);
      if (m && m.length >= 3) {
        const a = m.length >= 4 ? parseFloat(m[3]) : 1;
        if (a > 0.1) {
          const [r, g, b] = m.slice(0, 3).map(Number);
          return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        }
      }
    }
    cur = cur.parentElement;
  }
  return 0.95; // default fondo claro (crema)
}

const SPORTS = ['padel', 'tennis', 'basket', 'football', 'golf', 'pickleball', 'handball'];

// Geometría del isotipo en viewBox 80x80
//   Pelota: cx=40 cy=52 r=22 (alineada con x-height del wordmark "dashboll")
//   Anillo exterior: radio 30, centrado en (40,52). Recorrido de 7 a 3 en punto (240°)
//     · 75% verde court continuo, de θ=210° (7 en punto) a θ=30° (1 en punto)
//     · leading gap de 7.5° antes del 25% discontinuo
//     · 25% verde court con 4 segmentos (huecos transparentes), de θ=37.5° a θ=90° (3 en punto)
//   Pulso interior (solo sin sport): 3 dots lima en el centro de la pelota,
//     central r=6.5 + 2 ecos laterales r=3 con spacing 7 (solapamiento sutil)
function pattern(sport, patternColor) {
  switch (sport) {
    case 'tennis':
      return `
        <path data-role="seam" d="M 17,52 C 24,38 34,38 40,52 C 46,66 56,66 63,52"
              stroke="${patternColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      `;
    case 'padel':
      return `
        <g clip-path="url(#dball-clip)" transform="translate(16, 28) scale(2)">
          <path data-role="seam" fill="${patternColor}" d="M22 12c0 2.32-.79 4.45-2.12 6.15A8 8 0 0 1 17 12c0-2.47 1.12-4.68 2.88-6.15A9.94 9.94 0 0 1 22 12M2 12c0-2.32.79-4.45 2.12-6.15A8 8 0 0 1 7 12c0 2.47-1.12 4.68-2.88 6.15A9.94 9.94 0 0 1 2 12"/>
        </g>
        <g data-role="dimples" fill="${patternColor}">
          <circle cx="22" cy="55" r="0.7"/><circle cx="25.5" cy="55" r="0.7"/><circle cx="29" cy="55" r="0.7"/>
          <circle cx="23.75" cy="58" r="0.7"/><circle cx="27.25" cy="58" r="0.7"/>
          <circle cx="22" cy="61" r="0.7"/><circle cx="25.5" cy="61" r="0.7"/>
        </g>
      `;
    case 'basket':
      return `
        <line data-role="seam" x1="40" y1="30" x2="40" y2="74" stroke="${patternColor}" stroke-width="1.2"/>
        <path data-role="seam" d="M 18,52 Q 40,46 62,52" stroke="${patternColor}" stroke-width="1.2" fill="none"/>
        <path data-role="seam" d="M 22,32 Q 18,52 22,72" stroke="${patternColor}" stroke-width="1.2" fill="none"/>
        <path data-role="seam" d="M 58,32 Q 62,52 58,72" stroke="${patternColor}" stroke-width="1.2" fill="none"/>
      `;
    case 'football':
      return `<polygon data-role="hex" points="48,52 44,45.07 36,45.07 32,52 36,58.93 44,58.93" fill="${patternColor}"/>`;
    case 'golf':
      return `
        <g data-role="dimples" fill="${patternColor}">
          <circle cx="34" cy="44" r="1.4"/><circle cx="40" cy="42" r="1.4"/><circle cx="46" cy="44" r="1.4"/>
          <circle cx="30" cy="50" r="1.4"/><circle cx="36" cy="48" r="1.4"/><circle cx="44" cy="48" r="1.4"/><circle cx="50" cy="50" r="1.4"/>
          <circle cx="32" cy="56" r="1.4"/><circle cx="40" cy="54" r="1.4"/><circle cx="48" cy="56" r="1.4"/>
          <circle cx="36" cy="62" r="1.4"/><circle cx="44" cy="62" r="1.4"/>
        </g>
      `;
    case 'pickleball':
      return `
        <g data-role="holes" fill="${patternColor}">
          <circle cx="34" cy="42" r="2"/><circle cx="46" cy="42" r="2"/>
          <circle cx="28" cy="52" r="2"/><circle cx="40" cy="52" r="2"/><circle cx="52" cy="52" r="2"/>
          <circle cx="34" cy="62" r="2"/><circle cx="46" cy="62" r="2"/>
        </g>
      `;
    case 'handball':
      return `
        <line data-role="seam" x1="40" y1="30" x2="40" y2="74" stroke="${patternColor}" stroke-width="1" stroke-dasharray="1.5,1"/>
        <path data-role="seam" d="M 18,52 Q 40,40 62,52" stroke="${patternColor}" stroke-width="1" fill="none" stroke-dasharray="1.5,1"/>
        <path data-role="seam" d="M 18,52 Q 40,64 62,52" stroke="${patternColor}" stroke-width="1" fill="none" stroke-dasharray="1.5,1"/>
      `;
    default:
      return '';
  }
}

// Helper para construir dasharray con N segmentos · ratio 1:1 dash/gap.
// Añade un gap enorme final para evitar que SVG duplique el patrón
// cuando tiene número impar de valores.
function buildDashArr(arcLength, segCount) {
  const s = arcLength / (2 * segCount - 1);
  const parts = [];
  for (let i = 0; i < segCount; i++) {
    parts.push(s.toFixed(3));
    if (i < segCount - 1) parts.push(s.toFixed(3));
  }
  parts.push((arcLength * 4).toFixed(2));
  return parts.join(' ');
}

class DashbollBall extends HTMLElement {
  static get observedAttributes() { return ['sport', 'size', 'tone', 'bg']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const sport = this.getAttribute('sport') || '';
    const size = parseInt(this.getAttribute('size') || '100', 10);
    const tone = this.getAttribute('tone'); // 'black' | 'white' | null (default = full color)
    const uid = Math.random().toString(36).slice(2, 8);

    // ---------- Geometría base ----------
    const cx = 40, cy = 52, ballR = 22;
    const arcR = 30, strokeW = 6;

    const ang2pt = (deg, r = arcR) => {
      const rad = deg * Math.PI / 180;
      return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
    };

    // Anillo exterior: 7 → 3 en punto (240° recorrido)
    const leadingGapDeg = 60 / 8;  // 7.5°
    const [sx, sy] = ang2pt(210);
    const [mx, my] = ang2pt(30);
    const [mxShift, myShift] = ang2pt(30 + leadingGapDeg);
    const [ex, ey] = ang2pt(90);
    const path75 = `M ${sx.toFixed(2)},${sy.toFixed(2)} A ${arcR},${arcR} 0 1 1 ${mx.toFixed(2)},${my.toFixed(2)}`;
    const path25 = `M ${mxShift.toFixed(2)},${myShift.toFixed(2)} A ${arcR},${arcR} 0 0 1 ${ex.toFixed(2)},${ey.toFixed(2)}`;
    const dashLen = 2 * Math.PI * arcR * ((60 - leadingGapDeg) / 360);
    const dashArr = buildDashArr(dashLen, 4);

    // ---------- Colores según tone ----------
    let trackColor, trackOpacity, ringColor, ballFill, pulseColor, patternColor;
    if (tone === 'black') {
      trackColor = BLACK; trackOpacity = 0.13;
      ringColor = BLACK;
      ballFill = BLACK;
      patternColor = WHITE;
      pulseColor = WHITE;  // contrastante a la pelota
    } else if (tone === 'white') {
      trackColor = WHITE; trackOpacity = 0.22;
      ringColor = WHITE;
      ballFill = WHITE;
      patternColor = BLACK;
      pulseColor = BLACK;
    } else {
      // Modo full color
      const bgAttr = this.getAttribute('bg');
      const onLight = bgAttr === 'light' ? true
                    : bgAttr === 'dark'  ? false
                    : effectiveBgLuminance(this) > 0.5;
      trackColor = onLight ? DEEP : FOAM;
      trackOpacity = 0.10;
      ringColor = BREW_BLUE;
      ballFill = BREW_BLUE;
      patternColor = WHITE;
      pulseColor = CYAN;  // lima sobre verde court · 5,1:1 (AA grande), funciona en cualquier fondo
    }

    // ---------- Pulso central (solo en modo "marca", sin sport) ----------
    const pulseSpacing = 7;
    const pulseSvg = !sport ? `
  <circle cx="${cx - pulseSpacing}" cy="${cy}" r="3" fill="${pulseColor}"/>
  <circle cx="${cx}" cy="${cy}" r="6.5" fill="${pulseColor}"/>
  <circle cx="${cx + pulseSpacing}" cy="${cy}" r="3" fill="${pulseColor}"/>` : '';

    this.innerHTML = `
<svg width="${size}" height="${size}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dashboll · ${sport}">
  <defs>
    <clipPath id="dball-clip-${uid}">
      <circle cx="${cx}" cy="${cy}" r="${ballR}"/>
    </clipPath>
  </defs>
  <!-- Track sutil del 75% del recorrido -->
  <path data-role="ring-track" d="${path75}"
        stroke="${trackColor}" stroke-width="${strokeW}" stroke-linecap="butt" fill="none" opacity="${trackOpacity}"/>
  <!-- Anillo 75% verde continuo (academia) -->
  <path data-role="ring-bar" d="${path75}"
        stroke="${ringColor}" stroke-width="${strokeW}" stroke-linecap="butt" fill="none"/>
  <!-- Anillo 25% discontinuo: 4 segmentos verde court con huecos transparentes (Dashboll interviene) -->
  <path data-role="ring-bar-segments" d="${path25}"
        stroke="${ringColor}" stroke-width="${strokeW}" stroke-linecap="butt" fill="none"
        stroke-dasharray="${dashArr}"/>
  <!-- Pelota maciza -->
  <circle data-role="ball-base" cx="${cx}" cy="${cy}" r="${ballR}" fill="${ballFill}"/>
  ${pulseSvg}
  <!-- Patrón distintivo del deporte (solo cuando hay sport) -->
  ${pattern(sport, patternColor).replace(/dball-clip(?!-)/g, `dball-clip-${uid}`)}
</svg>`.trim();
  }
}

customElements.define('dashboll-ball', DashbollBall);

// Cerrar el menú móvil al pulsar cualquier enlace dentro del overlay
document.addEventListener('click', (e) => {
  const link = e.target.closest('.web-nav ul a, .web-nav .cta');
  if (link && document.body.classList.contains('nav-open')) {
    document.body.classList.remove('nav-open');
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
});

export { DashbollBall, SPORTS, BREW_BLUE, DEEP, CYAN, FOAM };
