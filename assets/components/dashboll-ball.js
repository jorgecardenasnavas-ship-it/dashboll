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

    // Dashboard bars — siempre brew-blue, dentro de la pelota
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
        <path d="M 8 38 Q 50 22, 92 38" stroke="${config.stitch}" stroke-width="2" fill="none" opacity="0.85"/>
        <path d="M 8 62 Q 50 78, 92 62" stroke="${config.stitch}" stroke-width="2" fill="none" opacity="0.85"/>
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
