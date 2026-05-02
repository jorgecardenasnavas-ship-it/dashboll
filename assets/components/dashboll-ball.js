const BREW_BLUE = '#1a8fc7';
const DEEP = '#04476a';
const CYAN = '#4DD0E1';
const FOAM = '#fafafa';
const WHITE = '#ffffff';

const SPORTS = ['padel', 'tennis', 'basket', 'football', 'golf', 'pickleball', 'handball'];

// Geometría del isotipo en viewBox 80x80 (con semicírculo arriba + pelota cx=40 cy=52 r=24)
function pattern(sport) {
  switch (sport) {
    case 'tennis':
      return `
        <g clip-path="url(#dball-clip)" transform="translate(16, 28) scale(2)">
          <path data-role="seam" fill="${WHITE}" d="M22 12c0 2.32-.79 4.45-2.12 6.15A8 8 0 0 1 17 12c0-2.47 1.12-4.68 2.88-6.15A9.94 9.94 0 0 1 22 12M2 12c0-2.32.79-4.45 2.12-6.15A8 8 0 0 1 7 12c0 2.47-1.12 4.68-2.88 6.15A9.94 9.94 0 0 1 2 12"/>
        </g>
      `;
    case 'padel':
      return `
        <g clip-path="url(#dball-clip)" transform="translate(16, 28) scale(2)">
          <path data-role="seam" fill="${WHITE}" d="M22 12c0 2.32-.79 4.45-2.12 6.15A8 8 0 0 1 17 12c0-2.47 1.12-4.68 2.88-6.15A9.94 9.94 0 0 1 22 12M2 12c0-2.32.79-4.45 2.12-6.15A8 8 0 0 1 7 12c0 2.47-1.12 4.68-2.88 6.15A9.94 9.94 0 0 1 2 12"/>
        </g>
        <g data-role="dimples" fill="${WHITE}">
          <circle cx="22" cy="55" r="0.7"/><circle cx="25.5" cy="55" r="0.7"/><circle cx="29" cy="55" r="0.7"/>
          <circle cx="23.75" cy="58" r="0.7"/><circle cx="27.25" cy="58" r="0.7"/>
          <circle cx="22" cy="61" r="0.7"/><circle cx="25.5" cy="61" r="0.7"/>
        </g>
      `;
    case 'basket':
      return `
        <line data-role="seam" x1="40" y1="28" x2="40" y2="76" stroke="${WHITE}" stroke-width="1.2"/>
        <path data-role="seam" d="M 16,52 Q 40,46 64,52" stroke="${WHITE}" stroke-width="1.2" fill="none"/>
        <path data-role="seam" d="M 22,30 Q 16,52 22,74" stroke="${WHITE}" stroke-width="1.2" fill="none"/>
        <path data-role="seam" d="M 58,30 Q 64,52 58,74" stroke="${WHITE}" stroke-width="1.2" fill="none"/>
      `;
    case 'football':
      return `<polygon data-role="hex" points="48,52 44,45.07 36,45.07 32,52 36,58.93 44,58.93" fill="${WHITE}"/>`;
    case 'golf':
      return `
        <g data-role="dimples" fill="${WHITE}">
          <circle cx="34" cy="44" r="1.4"/><circle cx="40" cy="42" r="1.4"/><circle cx="46" cy="44" r="1.4"/>
          <circle cx="30" cy="50" r="1.4"/><circle cx="36" cy="48" r="1.4"/><circle cx="44" cy="48" r="1.4"/><circle cx="50" cy="50" r="1.4"/>
          <circle cx="32" cy="56" r="1.4"/><circle cx="40" cy="54" r="1.4"/><circle cx="48" cy="56" r="1.4"/>
          <circle cx="36" cy="62" r="1.4"/><circle cx="44" cy="62" r="1.4"/>
        </g>
      `;
    case 'pickleball':
      return `
        <g data-role="holes" fill="${WHITE}">
          <circle cx="34" cy="42" r="2"/><circle cx="46" cy="42" r="2"/>
          <circle cx="28" cy="52" r="2"/><circle cx="40" cy="52" r="2"/><circle cx="52" cy="52" r="2"/>
          <circle cx="34" cy="62" r="2"/><circle cx="46" cy="62" r="2"/>
        </g>
      `;
    case 'handball':
      return `
        <line data-role="seam" x1="40" y1="28" x2="40" y2="76" stroke="${WHITE}" stroke-width="1" stroke-dasharray="1.5,1"/>
        <path data-role="seam" d="M 16,52 Q 40,40 64,52" stroke="${WHITE}" stroke-width="1" fill="none" stroke-dasharray="1.5,1"/>
        <path data-role="seam" d="M 16,52 Q 40,64 64,52" stroke="${WHITE}" stroke-width="1" fill="none" stroke-dasharray="1.5,1"/>
      `;
    default:
      return '';
  }
}

class DashbollBall extends HTMLElement {
  static get observedAttributes() { return ['sport', 'size']; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  render() {
    const sport = this.getAttribute('sport') || 'padel';
    const size = parseInt(this.getAttribute('size') || '100', 10);
    const uid = Math.random().toString(36).slice(2, 8);

    this.innerHTML = `
<svg width="${size}" height="${size}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dashboll · ${sport}">
  <defs>
    <radialGradient id="dball-hl-${uid}" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="${FOAM}" stop-opacity="0.30"/>
      <stop offset="30%" stop-color="${FOAM}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="dball-clip-${uid}">
      <circle cx="40" cy="52" r="24"/>
    </clipPath>
  </defs>
  <!-- Semicírculo de cumplimiento (75% brew + 25% cyan) -->
  <path data-role="ring-track" d="M 4,52 A 36,36 0 0 1 76,52"
        stroke="${DEEP}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.15"/>
  <path data-role="dashboard-bar" d="M 4,52 A 36,36 0 0 1 76,52"
        stroke="${BREW_BLUE}" stroke-width="6" stroke-linecap="round" fill="none"
        stroke-dasharray="84.82 113.10"/>
  <path data-role="dashboard-bar" d="M 4,52 A 36,36 0 0 1 76,52"
        stroke="${CYAN}" stroke-width="6" stroke-linecap="round" fill="none"
        stroke-dasharray="28.27 113.10" stroke-dashoffset="-84.82"/>
  <!-- Pelota base brew-blue -->
  <circle data-role="ball-base" cx="40" cy="52" r="24" fill="${BREW_BLUE}"/>
  <!-- Patrón distintivo del deporte -->
  ${pattern(sport).replace(/dball-clip(?!-)/g, `dball-clip-${uid}`)}
  <!-- Highlight superior izquierdo -->
  <circle cx="40" cy="52" r="24" fill="url(#dball-hl-${uid})"/>
</svg>`.trim();
  }
}

customElements.define('dashboll-ball', DashbollBall);

export { DashbollBall, SPORTS, BREW_BLUE, DEEP, CYAN, FOAM };
