// Paleta sincronizada con tokens.css (Court at Dusk · 2026)
const BREW_BLUE = '#1F6B52';   // court-500 · verde cancha
const DEEP = '#0A1410';        // ink-900 · tinta
const CYAN = '#C8FF3D';        // lime-400 · acento eléctrico (SOLO sobre fondos oscuros)
const FOAM = '#F4EFE6';        // bone · crema cálida (sustituye al blanco puro)
const WHITE = '#F4EFE6';       // bone · ningún blanco puro en la marca
const BLACK = '#000000';

const SPORTS = ['padel', 'tennis', 'basket', 'football', 'golf', 'pickleball', 'handball'];

// Geometría del isotipo en viewBox 80x80
//   Pelota: cx=40 cy=52 r=24 (posición empírica que alinea el centro óptico con la x-height del wordmark)
//   Dashboard semicírculo: radio 30 centrado en (40,52), arco de y=22 a y=52
//   Dashboard perimeter = π × 30 = 94.25 (75% = 70.69, 25% = 23.56)
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
        <line data-role="seam" x1="40" y1="28" x2="40" y2="76" stroke="${patternColor}" stroke-width="1.2"/>
        <path data-role="seam" d="M 16,52 Q 40,46 64,52" stroke="${patternColor}" stroke-width="1.2" fill="none"/>
        <path data-role="seam" d="M 22,30 Q 16,52 22,74" stroke="${patternColor}" stroke-width="1.2" fill="none"/>
        <path data-role="seam" d="M 58,30 Q 64,52 58,74" stroke="${patternColor}" stroke-width="1.2" fill="none"/>
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
        <line data-role="seam" x1="40" y1="28" x2="40" y2="76" stroke="${patternColor}" stroke-width="1" stroke-dasharray="1.5,1"/>
        <path data-role="seam" d="M 16,52 Q 40,40 64,52" stroke="${patternColor}" stroke-width="1" fill="none" stroke-dasharray="1.5,1"/>
        <path data-role="seam" d="M 16,52 Q 40,64 64,52" stroke="${patternColor}" stroke-width="1" fill="none" stroke-dasharray="1.5,1"/>
      `;
    default:
      return '';
  }
}

class DashbollBall extends HTMLElement {
  static get observedAttributes() { return ['sport', 'size', 'tone']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    // Sin sport = isotipo genérico de marca (bola limpia + semicírculo dashboard).
    // Con sport = variante deportiva con patrón. La identidad de Dashboll es la genérica.
    const sport = this.getAttribute('sport') || '';
    const size = parseInt(this.getAttribute('size') || '100', 10);
    const tone = this.getAttribute('tone'); // 'black' | 'white' | null (default = full color)
    const uid = Math.random().toString(36).slice(2, 8);

    let trackStroke, trackOpacity, barMain, barAccent, ballFill, patternColor;
    if (tone === 'black') {
      trackStroke = BLACK; trackOpacity = 0.13;
      barMain = BLACK; barAccent = BLACK;
      ballFill = BLACK;
      patternColor = WHITE;
    } else if (tone === 'white') {
      trackStroke = WHITE; trackOpacity = 0.22;
      barMain = WHITE; barAccent = WHITE;
      ballFill = WHITE;
      patternColor = BLACK;
    } else {
      trackStroke = DEEP; trackOpacity = 0.10;
      barMain = BREW_BLUE; barAccent = CYAN;
      ballFill = BREW_BLUE;
      patternColor = WHITE;
    }
    const accentOpacity = tone ? 0.55 : 1;

    this.innerHTML = `
<svg width="${size}" height="${size}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dashboll · ${sport}">
  <defs>
    <clipPath id="dball-clip-${uid}">
      <circle cx="40" cy="52" r="24"/>
    </clipPath>
  </defs>
  <!-- Semicírculo de cumplimiento (75% brew + 25% cyan), radio 30, centrado en (40,52). Perímetro = π × 30 = 94.25 -->
  <path data-role="ring-track" d="M 10,52 A 30,30 0 0 1 70,52"
        stroke="${trackStroke}" stroke-width="5" stroke-linecap="round" fill="none" opacity="${trackOpacity}"/>
  <path data-role="dashboard-bar" d="M 10,52 A 30,30 0 0 1 70,52"
        stroke="${barMain}" stroke-width="5" stroke-linecap="round" fill="none"
        stroke-dasharray="70.69 94.25"/>
  <path data-role="dashboard-bar" d="M 10,52 A 30,30 0 0 1 70,52"
        stroke="${barAccent}" stroke-width="5" stroke-linecap="round" fill="none"
        stroke-dasharray="23.56 94.25" stroke-dashoffset="-70.69" opacity="${accentOpacity}"/>
  <!-- Pelota base maciza -->
  <circle data-role="ball-base" cx="40" cy="52" r="24" fill="${ballFill}"/>
  <!-- Patrón distintivo del deporte -->
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
