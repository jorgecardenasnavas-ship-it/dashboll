# Dashboll · Web pública v1 · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la landing pública de Dashboll (`index.html`) — single-page con 15 secciones — que sirva como punto de entrada comercial, reusando el sistema de marca cerrado en el manual (tokens, fuentes Geist, componente `<dashboll-ball>`, paleta brew + cyan).

**Architecture:** HTML/CSS/JS vainilla, single-page con hash-navigation, sin framework. Reutiliza `assets/tokens.css`, `assets/styles.css`, fuentes self-hosted y el Web Component `<dashboll-ball>`. Estilos específicos en `assets/web.css`. Animaciones CSS + IntersectionObserver — cero JS pesado. Deploy estático en Vercel (config existente).

**Tech Stack:** HTML5, CSS3 con custom properties, JS vainilla con Custom Elements API. Geist + Geist Mono self-hosted. Vitest + happy-dom (existente) para tests estructurales. Vercel deploy.

---

## File Structure

```
dashboll/
├── index.html              ← NUEVO · landing pública (única página)
├── assets/
│   ├── tokens.css          ← EXISTENTE · reusado tal cual
│   ├── styles.css          ← EXISTENTE · reusado tal cual
│   ├── manual.css          ← EXISTENTE · sin cambios
│   ├── web.css             ← NUEVO · estilos específicos de la landing
│   ├── components/
│   │   └── dashboll-ball.js ← EXISTENTE · reusado
│   └── fonts/              ← EXISTENTE · WOFF2 self-hosted
└── tests/
    └── index-structure.test.js ← NUEVO · tests estructurales
```

**Justificación de decomposición:**
- `index.html` es el único entry-point (single-page) → un solo archivo HTML pesado pero con secciones bien delimitadas por comentarios `<!-- SECCIÓN N -->`.
- `web.css` separa las clases específicas de la landing del manual (que ya tiene `manual.css`). Evita conflictos visuales.
- Reusar `tokens.css` garantiza consistencia cromática total con el manual.

---

## Task 1: Setup `index.html` base + nav fija + footer

**Files:**
- Create: `index.html`
- Create: `assets/web.css`

- [ ] **Step 1.1: Crear `assets/web.css` con utilities base**

```css
/* ====================================================================
   Dashboll · Web pública · estilos específicos de landing
   Reusa tokens.css y styles.css del manual.
   ==================================================================== */

/* Reset extra para landing (manual tiene reset propio) */
.web-body {
  background: var(--foam);
  font-family: var(--font-sans);
  color: var(--deep);
  scroll-behavior: smooth;
  overflow-x: hidden;
}

/* Container universal */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-5);
}

/* Sección base */
section {
  padding: var(--space-9) 0;
  position: relative;
}
section.compact { padding: var(--space-7) 0; }
section.dark { background: var(--deep); color: white; }
section.dark h2,
section.dark h3,
section.dark p { color: white; }

/* Navegación superior */
.web-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: rgba(250, 250, 250, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
  padding: var(--space-3) 0;
}
.web-nav .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
}
.web-nav .brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 800;
  font-size: var(--text-lg);
  letter-spacing: -0.04em;
  color: var(--deep);
}
.web-nav ul {
  display: flex;
  gap: var(--space-5);
  list-style: none;
  margin: 0; padding: 0;
}
.web-nav a {
  font-size: var(--text-sm);
  color: #4b5563;
  font-weight: 500;
  transition: color 0.15s;
}
.web-nav a:hover { color: var(--brew-blue); text-decoration: none; }
.web-nav .cta {
  background: var(--deep);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
}
.web-nav .cta:hover { background: var(--brew-blue); color: white; }

/* Botones */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: var(--text-sm);
  transition: all 0.15s;
  border: 1px solid transparent;
  cursor: pointer;
}
.btn-primary {
  background: var(--deep);
  color: white;
}
.btn-primary:hover { background: var(--brew-blue); color: white; text-decoration: none; }
.btn-secondary {
  background: white;
  color: var(--deep);
  border-color: #e5e7eb;
}
.btn-secondary:hover { border-color: var(--brew-blue); color: var(--brew-blue); text-decoration: none; }

/* Footer */
.web-footer {
  background: var(--deep);
  color: white;
  padding: var(--space-8) 0 var(--space-5);
}
.web-footer .row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: var(--space-6);
}
.web-footer h4 {
  color: var(--cyan-accent);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: var(--space-3);
}
.web-footer ul {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column;
  gap: var(--space-2);
}
.web-footer a {
  color: #a8c5d4;
  font-size: var(--text-sm);
}
.web-footer a:hover { color: white; }
.web-footer .legal {
  margin-top: var(--space-7);
  padding-top: var(--space-5);
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: #6b8a9a;
}
```

- [ ] **Step 1.2: Crear `index.html` con skeleton mínimo**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dashboll — Software de gestión para academias deportivas</title>
  <meta name="description" content="La pelota está en tu panel. Agenda, pagos, CRM, comunicación y app móvil — en una sola plataforma para tu academia deportiva.">
  <meta property="og:title" content="Dashboll — La pelota está en tu panel">
  <meta property="og:description" content="Software de gestión multideporte. Pádel, tenis, basket, fútbol, golf, pickleball, balonmano.">
  <link rel="stylesheet" href="assets/tokens.css">
  <link rel="stylesheet" href="assets/styles.css">
  <link rel="stylesheet" href="assets/web.css">
  <script type="module" src="assets/components/dashboll-ball.js"></script>
</head>
<body class="web-body">

  <!-- ============== NAV FIJA ============== -->
  <nav class="web-nav">
    <div class="container row">
      <a href="#hero" class="brand">
        <dashboll-ball sport="padel" size="32"></dashboll-ball>
        <span>dashboll</span>
      </a>
      <ul>
        <li><a href="#producto">Producto</a></li>
        <li><a href="#multideporte">Multideporte</a></li>
        <li><a href="#precios">Precios</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href="#demo" class="cta">Reservar demo</a>
    </div>
  </nav>

  <!-- Las secciones se añadirán en tasks 2-16 -->
  <main></main>

  <!-- ============== FOOTER ============== -->
  <footer class="web-footer">
    <div class="container">
      <div class="row">
        <div>
          <div style="display:flex; align-items:center; gap: 12px; margin-bottom: var(--space-3);">
            <dashboll-ball sport="padel" size="40"></dashboll-ball>
            <span style="font-weight: 800; font-size: var(--text-lg); letter-spacing: -0.04em;">dashboll</span>
          </div>
          <p style="font-size: var(--text-sm); color: #a8c5d4; max-width: 32ch;">El sistema operativo multideporte para academias.</p>
        </div>
        <div>
          <h4>Producto</h4>
          <ul>
            <li><a href="#producto">Funciones</a></li>
            <li><a href="#multideporte">Multideporte</a></li>
            <li><a href="#precios">Precios</a></li>
          </ul>
        </div>
        <div>
          <h4>Empresa</h4>
          <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="/manual">Manual de marca</a></li>
            <li><a href="mailto:hola@dashboll.app">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacidad">Privacidad</a></li>
            <li><a href="#terminos">Términos</a></li>
            <li><a href="#cookies">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div class="legal">
        <span>© 2026 Dashboll</span>
        <span>Hecho con calma. Hosted en EU.</span>
      </div>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 1.3: Verificar que se sirve correctamente**

Run: `npx http-server . -p 8800 -c-1 --silent &` y abrir `http://localhost:8800/index.html`. Expected: nav arriba con isotipo + wordmark + 4 links + CTA azul oscuro. Footer abajo con 4 columnas.

- [ ] **Step 1.4: Commit**

```bash
git add index.html assets/web.css
git commit -m "feat(web): skeleton de landing con nav fija y footer"
```

---

## Task 2: Sección Hero

**Files:**
- Modify: `index.html` (insertar dentro de `<main>`)
- Modify: `assets/web.css` (añadir estilos de hero)

- [ ] **Step 2.1: Añadir estilos en `assets/web.css`**

```css
/* === HERO === */
.hero {
  padding-top: calc(var(--space-9) + 60px); /* compensa nav fija */
  padding-bottom: var(--space-9);
  background: linear-gradient(180deg, var(--foam) 0%, white 100%);
  position: relative;
  overflow: hidden;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-9);
  align-items: center;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: white;
  padding: 6px 12px;
  border-radius: 100px;
  border: 1px solid #e5e7eb;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  color: var(--brew-blue);
  font-weight: 600;
  margin-bottom: var(--space-5);
}
.hero-eyebrow .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--cyan-accent);
}
.hero h1 {
  font-size: clamp(40px, 5vw, 72px);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: var(--space-5);
}
.hero .sub {
  font-size: var(--text-md);
  color: #4b5563;
  max-width: 50ch;
  margin-bottom: var(--space-7);
  line-height: 1.55;
}
.hero-ctas {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.hero-trust {
  margin-top: var(--space-7);
  display: flex;
  gap: var(--space-5);
  font-size: var(--text-xs);
  color: #6b7280;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
}
.hero-trust span {
  display: flex; align-items: center; gap: 4px;
}
.hero-trust span::before {
  content: "✓";
  color: var(--brew-blue);
  font-weight: 700;
}
/* Pelota que respira en el hero */
.hero-balls {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.hero-balls .main {
  animation: hero-breathe 4s ease-in-out infinite;
}
@keyframes hero-breathe {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.04) rotate(2deg); }
}
```

- [ ] **Step 2.2: Insertar HTML de hero dentro de `<main>` en `index.html`**

```html
<!-- ============== SECCIÓN 01 · HERO ============== -->
<section class="hero" id="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <span class="hero-eyebrow">
          <span class="dot"></span>
          v1.0 · Multideporte · IA en cada flujo
        </span>
        <h1>La pelota está en tu panel.</h1>
        <p class="sub">Agenda, pagos, CRM, comunicación y app móvil — en una sola plataforma para tu academia deportiva. Pádel, tenis, basket, fútbol, golf, pickleball y balonmano.</p>
        <div class="hero-ctas">
          <a href="#demo" class="btn btn-primary">Reservar demo</a>
          <a href="#producto" class="btn btn-secondary">Ver la plataforma</a>
        </div>
        <div class="hero-trust">
          <span>Sin tarjeta</span>
          <span>Onboarding en 14 días</span>
          <span>App iOS + Android incluida</span>
        </div>
      </div>
      <div class="hero-balls">
        <div class="main">
          <dashboll-ball sport="padel" size="380"></dashboll-ball>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2.3: Verificar visualmente**

Refresh `http://localhost:8800/index.html`. Expected: eyebrow pill arriba con dot cyan, título grande "La pelota está en tu panel.", sub-claim explicando producto, 2 CTAs (Reservar demo + Ver la plataforma), 3 trust badges, pelota Dashboll respirando a la derecha.

- [ ] **Step 2.4: Commit**

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección Hero con doble CTA y pelota respirando"
```

---

## Task 3: Sección "Hecho por operadores"

**Files:**
- Modify: `index.html`
- Modify: `assets/web.css`

- [ ] **Step 3.1: Añadir estilos**

```css
/* === HECHO POR OPERADORES === */
.operators {
  background: white;
  padding: var(--space-7) 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}
.operators .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-7);
  flex-wrap: wrap;
}
.operators .copy {
  flex: 1;
  min-width: 280px;
}
.operators h3 {
  font-size: var(--text-lg);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-2);
}
.operators p {
  font-size: var(--text-sm);
  color: #4b5563;
  max-width: 56ch;
}
.operators .stat {
  display: flex;
  gap: var(--space-6);
  font-family: var(--font-mono);
}
.operators .stat-block {
  text-align: right;
}
.operators .stat-num {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--brew-blue);
  letter-spacing: -0.02em;
}
.operators .stat-label {
  font-size: var(--text-xs);
  color: #9ca3af;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  margin-top: 2px;
}
```

- [ ] **Step 3.2: Insertar HTML después del hero**

```html
<!-- ============== SECCIÓN 02 · HECHO POR OPERADORES ============== -->
<section class="operators">
  <div class="container row">
    <div class="copy">
      <h3>Hecho por operadores, para operadores.</h3>
      <p>Dashboll lo construyen personas que llevan academias en producción real. Cada función nace de una hora perdida, una cuota no cobrada o una clase mal cubierta. No es teoría — es operación.</p>
    </div>
    <div class="stat">
      <div class="stat-block">
        <div class="stat-num">+15</div>
        <div class="stat-label">años operando</div>
      </div>
      <div class="stat-block">
        <div class="stat-num">7</div>
        <div class="stat-label">deportes</div>
      </div>
      <div class="stat-block">
        <div class="stat-num">EU</div>
        <div class="stat-label">hosting · GDPR</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3.3: Verificar visualmente**

Refresh. Expected: banda blanca con líneas separadoras arriba y abajo. Texto a la izquierda con título y párrafo. Tres stats a la derecha en monoespaciada con números brew-blue.

- [ ] **Step 3.4: Commit**

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección 'Hecho por operadores' con 3 stats"
```

---

## Task 4: Sección "Qué resuelve"

**Files:**
- Modify: `index.html`
- Modify: `assets/web.css`

- [ ] **Step 4.1: Añadir estilos**

```css
/* === QUÉ RESUELVE === */
.solves h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.solves .lead {
  font-size: var(--text-md);
  color: #4b5563;
  max-width: 56ch;
  margin-bottom: var(--space-7);
}
.solves-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}
.solve-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: var(--space-6);
}
.solve-card .num {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  color: var(--brew-blue);
  font-weight: 700;
  margin-bottom: var(--space-4);
}
.solve-card h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-3);
}
.solve-card p {
  font-size: var(--text-sm);
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: var(--space-4);
}
.solve-card .says {
  background: var(--deep);
  color: white;
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.6;
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
}
.solve-card .says dashboll-ball { flex-shrink: 0; }
.solve-card .says strong { color: var(--cyan-accent); }
```

- [ ] **Step 4.2: Insertar HTML**

```html
<!-- ============== SECCIÓN 03 · QUÉ RESUELVE ============== -->
<section class="solves" id="resuelve">
  <div class="container">
    <h2>Tres problemas que comen tu academia cada semana.</h2>
    <p class="lead">Dashboll nace para resolverlos, no para añadirles capas. Cada uno con su respuesta concreta del propio asistente.</p>
    <div class="solves-grid">
      <div class="solve-card">
        <div class="num">PROBLEMA 01</div>
        <h3>40% del tiempo en admin, no en pista.</h3>
        <p>Excel + WhatsApp + tablero magnético. Tres herramientas para gestionar lo mismo, ninguna conectada.</p>
        <div class="says">
          <dashboll-ball sport="padel" size="32"></dashboll-ball>
          <div><strong>Dashboll:</strong> Lo paso a un solo panel. Cobros, asistencia y mensajes en el mismo flujo.</div>
        </div>
      </div>
      <div class="solve-card">
        <div class="num">PROBLEMA 02</div>
        <h3>Morosidad que crece sin verlo.</h3>
        <p>Cuotas a final de mes, recordatorios manuales, perseguir alumnos por WhatsApp. La cuenta del banco no cuadra.</p>
        <div class="says">
          <dashboll-ball sport="padel" size="32"></dashboll-ball>
          <div><strong>Dashboll:</strong> Domiciliación SEPA + wallet interno. La morosidad cae al 4-6% sin perseguir a nadie.</div>
        </div>
      </div>
      <div class="solve-card">
        <div class="num">PROBLEMA 03</div>
        <h3>Pistas vacías que nadie cubre.</h3>
        <p>Una baja a las 17:30 deja la pista vacía a las 18:00. Nadie la cubre porque nadie sabe que está libre.</p>
        <div class="says">
          <dashboll-ball sport="padel" size="32"></dashboll-ball>
          <div><strong>Dashboll:</strong> Detecto huecos al instante. Te propongo perfiles. Tú confirmas.</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4.3: Verificar visualmente**

Refresh. Expected: título "Tres problemas que comen tu academia cada semana." + 3 cards en grid. Cada card con número, título, párrafo, y bloque deep con voz JARVIS de Dashboll.

- [ ] **Step 4.4: Commit**

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección 'Qué resuelve' con 3 problemas y voz JARVIS"
```

---

## Task 5: Sección "Conoce a Dashboll" (asistente IA)

**Files:**
- Modify: `index.html`
- Modify: `assets/web.css`

- [ ] **Step 5.1: Añadir estilos**

```css
/* === CONOCE A DASHBOLL === */
.meet {
  background: var(--deep);
  color: white;
  border-radius: 0;
  padding: var(--space-9) 0;
}
.meet h2 {
  color: white;
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.meet .lead {
  color: #a8c5d4;
  font-size: var(--text-md);
  max-width: 60ch;
  margin-bottom: var(--space-7);
}
.meet-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--space-7);
  align-items: start;
}
.meet-ball {
  display: flex;
  justify-content: center;
  padding: var(--space-7) 0;
}
.meet-conversations {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.meet-msg {
  background: rgba(255,255,255,0.06);
  border-left: 3px solid var(--cyan-accent);
  padding: var(--space-4) var(--space-5);
  border-radius: 0 10px 10px 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.7;
}
.meet-msg .head {
  color: var(--cyan-accent);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}
.meet-jarvis {
  margin-top: var(--space-6);
  font-size: var(--text-xs);
  color: #a8c5d4;
  font-style: italic;
  max-width: 60ch;
}
```

- [ ] **Step 5.2: Insertar HTML**

```html
<!-- ============== SECCIÓN 04 · CONOCE A DASHBOLL ============== -->
<section class="meet" id="conoce">
  <div class="container">
    <h2>Conoce a Dashboll.</h2>
    <p class="lead">El asistente que vive dentro del producto. Calmado como JARVIS — el de Iron Man. No es una mascota, es un copiloto estratégico.</p>
    <div class="meet-grid">
      <div class="meet-ball">
        <dashboll-ball sport="padel" size="280"></dashboll-ball>
      </div>
      <div class="meet-conversations">
        <div class="meet-msg">
          <div class="head">DASHBOLL · 09:14</div>
          La cobertura del miércoles está al 87%. Sigues por encima de tu media trimestral. Hueco a las 18:00 detectado.
        </div>
        <div class="meet-msg">
          <div class="head">DASHBOLL · 12:30</div>
          He propuesto cubrir el hueco de las 18:00 con Eduardo M. Está en la app esperando confirmación.
        </div>
        <div class="meet-msg">
          <div class="head">DASHBOLL · 18:02</div>
          Eduardo M. confirmó. Pista cubierta. Cobertura del día: 94%.
        </div>
      </div>
    </div>
    <p class="meet-jarvis">Por qué JARVIS y no otro asistente: porque JARVIS no entretiene, no improvisa y no pide protagonismo. Trabaja en silencio para que el héroe — en este caso, el head coach de la academia — tome mejores decisiones.</p>
  </div>
</section>
```

- [ ] **Step 5.3: Verificar visualmente**

Refresh. Expected: fondo deep oscuro, título grande blanco, lead en cyan claro. Grid: pelota grande a la izquierda, 3 mensajes JARVIS a la derecha apilados con timestamps. Pie con explicación del referente.

- [ ] **Step 5.4: Commit**

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección 'Conoce a Dashboll' con voz JARVIS demo"
```

---

## Task 6: Sección "El producto" + integraciones

**Files:**
- Modify: `index.html`
- Modify: `assets/web.css`

- [ ] **Step 6.1: Añadir estilos**

```css
/* === PRODUCTO === */
.product { background: white; }
.product h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.product .lead {
  color: #4b5563;
  font-size: var(--text-md);
  max-width: 56ch;
  margin-bottom: var(--space-7);
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}
.feature-card {
  background: var(--foam);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: var(--space-6);
  transition: all 0.2s;
}
.feature-card:hover {
  border-color: var(--brew-blue);
  transform: translateY(-2px);
}
.feature-card .icon-wrap {
  width: 48px; height: 48px;
  background: var(--deep);
  color: white;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: var(--space-4);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: var(--text-lg);
}
.feature-card h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-2);
}
.feature-card p {
  font-size: var(--text-sm);
  color: #4b5563;
  line-height: 1.6;
}

.integrations {
  margin-top: var(--space-8);
  padding-top: var(--space-7);
  border-top: 1px solid #e5e7eb;
}
.integrations h3 {
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6b7280;
  font-weight: 700;
  margin-bottom: var(--space-5);
}
.integrations-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-5);
  align-items: center;
}
.integration-chip {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 100px;
  padding: 8px 16px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--deep);
  font-family: var(--font-mono);
}
```

- [ ] **Step 6.2: Insertar HTML**

```html
<!-- ============== SECCIÓN 05 · PRODUCTO + INTEGRACIONES ============== -->
<section class="product" id="producto">
  <div class="container">
    <h2>Todo lo que una academia necesita. Nada de lo que no.</h2>
    <p class="lead">Cinco bloques que se hablan entre sí. Una sola plataforma. Cero dependencia de Excel.</p>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="icon-wrap">A</div>
        <h3>Agenda inteligente</h3>
        <p>Clases, pistas y entrenadores en una sola vista. Arrastra para reprogramar, cubre ausencias en segundos. Sincronización automática con la app de cada jugador.</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrap">P</div>
        <h3>Pagos · Stripe + SEPA</h3>
        <p>Cuotas mensuales, packs de clases, wallet interno. Domiciliación SEPA, cobro recurrente, contabilidad exportable. La morosidad baja sola.</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrap">C</div>
        <h3>CRM con IA</h3>
        <p>Captura leads desde Instagram, web y WhatsApp. La IA sugiere la siguiente acción y prioriza por probabilidad de cierre.</p>
      </div>
      <div class="feature-card">
        <div class="icon-wrap">M</div>
        <h3>Comunicación 1:1 y grupos</h3>
        <p>Mensajes a alumnos individuales o grupos. Push iOS y Android. Notificaciones que sí se leen porque solo enviamos lo importante.</p>
      </div>
      <div class="feature-card" style="grid-column: span 2;">
        <div class="icon-wrap">E</div>
        <h3>Evolución del jugador</h3>
        <p>Perfil técnico, asistencia, ranking interno. El jugador ve su curva de progreso; el coach, la del grupo. Datos reales, no percepciones.</p>
      </div>
    </div>

    <div class="integrations">
      <h3>Se habla con tu stack</h3>
      <div class="integrations-row">
        <div class="integration-chip">Stripe</div>
        <div class="integration-chip">Firebase</div>
        <div class="integration-chip">Holded</div>
        <div class="integration-chip">Mailchimp</div>
        <div class="integration-chip">QuickBooks</div>
        <div class="integration-chip">Google Calendar</div>
        <div class="integration-chip">WhatsApp Business</div>
        <div class="integration-chip">Zapier (+6000 apps)</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 6.3: Verificar y commit**

Refresh. Expected: 5 feature cards (la última ocupa 2 columnas), línea separadora, fila de chips de integraciones centradas.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección 'El producto' con 5 features + integraciones"
```

---

## Task 7: Sección Multideporte

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 7.1: Estilos**

```css
/* === MULTIDEPORTE === */
.multisport {
  background: linear-gradient(180deg, white 0%, var(--foam) 100%);
}
.multisport h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: var(--space-2);
}
.multisport .lead {
  text-align: center;
  color: #4b5563;
  font-size: var(--text-md);
  max-width: 60ch;
  margin: 0 auto var(--space-8);
}
.multisport-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-7);
}
.sport-cell {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: var(--space-5) var(--space-3);
  text-align: center;
  transition: all 0.2s;
}
.sport-cell:hover {
  border-color: var(--brew-blue);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(26,143,199,0.15);
}
.sport-cell .label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--brew-blue);
  text-transform: uppercase;
  font-weight: 700;
  margin-top: var(--space-3);
}
.multisport-explain {
  background: var(--deep);
  color: white;
  border-radius: 14px;
  padding: var(--space-6);
  text-align: center;
}
.multisport-explain strong { color: var(--cyan-accent); }
```

- [ ] **Step 7.2: HTML**

```html
<!-- ============== SECCIÓN 06 · MULTIDEPORTE ============== -->
<section class="multisport" id="multideporte">
  <div class="container">
    <h2>Una marca. Siete deportes. Un solo sistema.</h2>
    <p class="lead">Dashboll cambia la pelota según el deporte que gestiona tu academia. La firma — el semicírculo de cumplimiento — es siempre la misma.</p>
    <div class="multisport-grid">
      <div class="sport-cell">
        <dashboll-ball sport="padel" size="100"></dashboll-ball>
        <div class="label">Pádel</div>
      </div>
      <div class="sport-cell">
        <dashboll-ball sport="tennis" size="100"></dashboll-ball>
        <div class="label">Tenis</div>
      </div>
      <div class="sport-cell">
        <dashboll-ball sport="basket" size="100"></dashboll-ball>
        <div class="label">Básket</div>
      </div>
      <div class="sport-cell">
        <dashboll-ball sport="football" size="100"></dashboll-ball>
        <div class="label">Fútbol</div>
      </div>
      <div class="sport-cell">
        <dashboll-ball sport="golf" size="100"></dashboll-ball>
        <div class="label">Golf</div>
      </div>
      <div class="sport-cell">
        <dashboll-ball sport="pickleball" size="100"></dashboll-ball>
        <div class="label">Pickle</div>
      </div>
      <div class="sport-cell">
        <dashboll-ball sport="handball" size="100"></dashboll-ball>
        <div class="label">Balonm.</div>
      </div>
    </div>
    <div class="multisport-explain">
      Tu academia gestiona un deporte → tu Dashboll lleva esa pelota. Si gestionas dos academias de deportes distintos, dos Dashbolls que comparten panel central. <strong>El sistema es escalable</strong> — añadir un nuevo deporte es cambiar un atributo del componente.
    </div>
  </div>
</section>
```

- [ ] **Step 7.3: Verificar y commit**

Refresh. Expected: título centrado, 7 pelotas en fila con sus labels, bloque deep explicativo abajo.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección Multideporte con las 7 pelotas Dashboll"
```

---

## Task 8: Sección 3 flujos (Head Coach / Coach / Player)

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 8.1: Estilos**

```css
/* === 3 FLUJOS === */
.flows h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.flows .lead {
  color: #4b5563;
  font-size: var(--text-md);
  max-width: 56ch;
  margin-bottom: var(--space-7);
}
.flows-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}
.flow-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
}
.flow-card.dark {
  background: var(--deep);
  color: white;
  border: none;
}
.flow-card.dark p { color: #a8c5d4; }
.flow-card .role {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
  color: var(--brew-blue);
}
.flow-card.dark .role { color: var(--cyan-accent); }
.flow-card h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-3);
}
.flow-card.dark h3 { color: white; }
.flow-card p {
  font-size: var(--text-sm);
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: var(--space-5);
  flex: 1;
}
.flow-mockup {
  background: var(--foam);
  border-radius: 10px;
  padding: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.7;
}
.flow-card.dark .flow-mockup {
  background: rgba(255,255,255,0.06);
}
.flow-coming {
  margin-top: var(--space-6);
  padding: var(--space-4) var(--space-5);
  background: #fff7e6;
  border-left: 3px solid #d4a04e;
  border-radius: 0 8px 8px 0;
  font-size: var(--text-sm);
  color: #7a4f0a;
}
```

- [ ] **Step 8.2: HTML**

```html
<!-- ============== SECCIÓN 07 · 3 FLUJOS ============== -->
<section class="flows">
  <div class="container">
    <h2>Una app. Tres roles. Un solo producto.</h2>
    <p class="lead">Dashboll se compila para tu academia con su color, logo y dominio. Tus alumnos descargan tu app, no la nuestra.</p>
    <div class="flows-grid">
      <div class="flow-card dark">
        <div class="role">FLUJO 01 · Head Coach</div>
        <h3>El negocio, en tiempo real.</h3>
        <p>Ingresos, ocupación, morosidad. Cuadrar caja en 30 segundos. Exportable a tu ERP.</p>
        <div class="flow-mockup">
          Abril ········ <span style="color: var(--cyan-accent);">+18,4%</span><br>
          Cuotas ······· €14.200<br>
          Bonos ········ €6.180<br>
          Torneos ······ €4.000<br>
          ─────────<br>
          Total ········ €24.380
        </div>
      </div>
      <div class="flow-card">
        <div class="role">FLUJO 02 · Coach</div>
        <h3>Tu clase lista en 2 clicks.</h3>
        <p>Asistencia y feedback por alumno. Notas, vídeos y ejercicios planificados. Tu hora en pista, sin papeleo.</p>
        <div class="flow-mockup">
          Competición · 18:00<br>
          Asistencia · 8/10<br>
          ─────────<br>
          Objetivo: revés cruzado + red
        </div>
      </div>
      <div class="flow-card">
        <div class="role">FLUJO 03 · Player</div>
        <h3>Tu academia en tu bolsillo.</h3>
        <p>Reserva pista y clase, paga con wallet o Stripe, mira tu evolución y ranking interno.</p>
        <div class="flow-mockup">
          Mi nivel · 3.2<br>
          Ranking · #14<br>
          ─────────<br>
          Próxima · Clínica de Revés<br>
          19:30 · pista 2
        </div>
      </div>
    </div>
    <div class="flow-coming">
      <strong>Próximamente · capa Manager:</strong> para dueños de academias multi-club. Roadmap Q4 2026.
    </div>
  </div>
</section>
```

- [ ] **Step 8.3: Verificar y commit**

Refresh. Expected: 3 flow cards. Head Coach en fondo deep, los otros dos en blanco. Cada uno con role, título, párrafo, mockup en mono. Banda amarilla informando del Manager Q4.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección '3 flujos' con Head Coach destacado y Manager teaser"
```

---

## Task 9: Sección "Cómo funciona"

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 9.1: Estilos**

```css
/* === CÓMO FUNCIONA === */
.how { background: white; }
.how h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.how .lead {
  color: #4b5563;
  font-size: var(--text-md);
  margin-bottom: var(--space-7);
}
.how-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.how-step {
  position: relative;
}
.how-step .num {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--brew-blue);
  letter-spacing: -0.02em;
  line-height: 1;
}
.how-step .when {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  color: #9ca3af;
  text-transform: uppercase;
  margin: var(--space-3) 0 var(--space-2);
}
.how-step h3 {
  font-size: var(--text-md);
  margin-bottom: var(--space-2);
}
.how-step p {
  font-size: var(--text-sm);
  color: #4b5563;
  line-height: 1.6;
}
```

- [ ] **Step 9.2: HTML**

```html
<!-- ============== SECCIÓN 08 · CÓMO FUNCIONA ============== -->
<section class="how">
  <div class="container">
    <h2>De cero a producción en 14 días.</h2>
    <p class="lead">Con tu app móvil publicada en las tiendas, tus alumnos onboarded y tu equipo formado.</p>
    <div class="how-steps">
      <div class="how-step">
        <div class="num">01</div>
        <div class="when">Día 1 · Setup</div>
        <h3>Migramos tu academia</h3>
        <p>Subes tu Excel o CSV. Importamos alumnos, grupos, coaches y tarifas en menos de 48h con tu equipo asistido en Slack.</p>
      </div>
      <div class="how-step">
        <div class="num">02</div>
        <div class="when">Día 7 · Go-live</div>
        <h3>Lanzamos tu app móvil</h3>
        <p>Compilamos iOS y Android con tu logo, colores y dominio. Publicamos en App Store y Google Play — tus alumnos descargan tu app.</p>
      </div>
      <div class="how-step">
        <div class="num">03</div>
        <div class="when">Día 14 · Cruising</div>
        <h3>Automatizamos lo aburrido</h3>
        <p>Cobros recurrentes, recordatorios, lista de espera, ausencias. Tus coaches dedican tiempo a enseñar, no a perseguir pagos.</p>
      </div>
      <div class="how-step">
        <div class="num">04</div>
        <div class="when">Mes 2 · Scale</div>
        <h3>Optimizamos con datos</h3>
        <p>La IA identifica alumnos en riesgo de baja, pistas infrautilizadas y coaches sobrecargados. Tú decides; Dashboll sugiere.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 9.3: Verificar y commit**

Refresh. Expected: 4 steps en fila con número grande brew-blue, when label, título y descripción.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección 'Cómo funciona' con 4 pasos hasta producción"
```

---

## Task 10: Sección Comparativa

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 10.1: Estilos**

```css
/* === COMPARATIVA === */
.compare h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.compare .lead {
  color: #4b5563;
  font-size: var(--text-md);
  margin-bottom: var(--space-7);
}
.compare-table {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
}
.compare-table table {
  width: 100%;
  border-collapse: collapse;
}
.compare-table th, .compare-table td {
  padding: var(--space-4) var(--space-5);
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}
.compare-table th {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: #6b7280;
  font-weight: 700;
  background: var(--foam);
}
.compare-table th.us {
  background: var(--deep);
  color: var(--cyan-accent);
}
.compare-table tr:last-child td { border-bottom: none; }
.compare-table .check {
  color: var(--brew-blue);
  font-weight: 700;
  font-size: var(--text-md);
}
.compare-table .miss { color: #d1d5db; }
.compare-table .partial {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: #9ca3af;
}
```

- [ ] **Step 10.2: HTML**

```html
<!-- ============== SECCIÓN 09 · COMPARATIVA ============== -->
<section class="compare">
  <div class="container">
    <h2>Dashboll vs. lo que probablemente usas hoy.</h2>
    <p class="lead">El benchmarking honesto. Sin trampas, sin asteriscos.</p>
    <div class="compare-table">
      <table>
        <thead>
          <tr>
            <th>Capacidad</th>
            <th class="us">Dashboll</th>
            <th>Playtomic / similar</th>
            <th>Excel + WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>App móvil con tu marca</td>
            <td class="check">●</td>
            <td class="partial">extra</td>
            <td class="miss">—</td>
          </tr>
          <tr>
            <td>Cobros Stripe + wallet interno</td>
            <td class="check">●</td>
            <td class="check">●</td>
            <td class="miss">—</td>
          </tr>
          <tr>
            <td>CRM de leads con IA</td>
            <td class="check">●</td>
            <td class="miss">—</td>
            <td class="miss">—</td>
          </tr>
          <tr>
            <td>Multideporte (7 deportes)</td>
            <td class="check">●</td>
            <td class="partial">solo pádel</td>
            <td class="miss">—</td>
          </tr>
          <tr>
            <td>Multi-academia / sedes</td>
            <td class="check">●</td>
            <td class="partial">extra</td>
            <td class="miss">—</td>
          </tr>
          <tr>
            <td>Onboarding dedicado</td>
            <td class="check">●</td>
            <td class="miss">—</td>
            <td class="miss">—</td>
          </tr>
          <tr>
            <td>Evolución del jugador</td>
            <td class="check">●</td>
            <td class="miss">—</td>
            <td class="partial">básico</td>
          </tr>
          <tr>
            <td>Soporte 9/7 en español</td>
            <td class="check">●</td>
            <td class="miss">—</td>
            <td class="miss">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

- [ ] **Step 10.3: Verificar y commit**

Refresh. Expected: tabla con header negro deep para columna Dashboll, ● en brew-blue donde marca, "—" gris donde no, "extra"/"básico" en mono gris.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección Comparativa Dashboll vs alternativas"
```

---

## Task 11: Sección Calculadora ROI

**Files:** Modify `index.html`, `assets/web.css`. Añadir lógica JS inline (o module pequeño).

- [ ] **Step 11.1: Estilos**

```css
/* === CALCULADORA ROI === */
.roi {
  background: var(--deep);
  color: white;
}
.roi h2 {
  color: white;
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.roi .lead {
  color: #a8c5d4;
  margin-bottom: var(--space-7);
}
.roi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-7);
  align-items: start;
}
.roi-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
.roi-input label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--cyan-accent);
  margin-bottom: var(--space-2);
}
.roi-input input {
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  padding: var(--space-3);
  color: white;
  font-family: var(--font-mono);
  font-size: var(--text-md);
  font-weight: 700;
}
.roi-input input:focus {
  outline: none;
  border-color: var(--cyan-accent);
}
.roi-result {
  background: rgba(77, 208, 225, 0.1);
  border: 1px solid var(--cyan-accent);
  border-radius: 14px;
  padding: var(--space-6);
}
.roi-result .label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  color: var(--cyan-accent);
  margin-bottom: var(--space-2);
}
.roi-result .big {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-2);
}
.roi-result .breakdown {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.8;
  color: #a8c5d4;
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid rgba(255,255,255,0.1);
}
.roi-disclaimer {
  margin-top: var(--space-4);
  font-size: var(--text-xs);
  color: #6b8a9a;
  font-style: italic;
}
```

- [ ] **Step 11.2: HTML + JS inline**

```html
<!-- ============== SECCIÓN 10 · CALCULADORA ROI ============== -->
<section class="roi">
  <div class="container">
    <h2>Cuánto te ahorra Dashboll.</h2>
    <p class="lead">Introduce tus cifras. Calculamos tu ahorro mensual aproximado: tiempo admin recuperado + cuotas que no se pierden + uplift de ocupación.</p>
    <div class="roi-grid">
      <div>
        <div class="roi-inputs">
          <div class="roi-input">
            <label>Pistas</label>
            <input type="number" id="roi-courts" value="4" min="1">
          </div>
          <div class="roi-input">
            <label>Alumnos activos</label>
            <input type="number" id="roi-students" value="200" min="10">
          </div>
          <div class="roi-input">
            <label>Cuota media (€)</label>
            <input type="number" id="roi-fee" value="80" min="20">
          </div>
          <div class="roi-input">
            <label>Horas admin / semana</label>
            <input type="number" id="roi-hours" value="20" min="1">
          </div>
        </div>
        <p class="roi-disclaimer">Estimación basada en datos medios de academias similares. Tu ahorro real puede variar.</p>
      </div>
      <div class="roi-result">
        <div class="label">PAGAS</div>
        <div class="big" id="roi-pay">€97 / mes</div>
        <div class="label" style="margin-top: var(--space-4);">AHORRAS</div>
        <div class="big" style="color: var(--cyan-accent);" id="roi-save">€1.250 / mes</div>
        <div class="breakdown">
          ROI · <span id="roi-payback">1 mes</span> de payback<br>
          Ahorro anual · <span id="roi-yearly">€15.036</span><br>
          Neto / mes · <span id="roi-net">€1.153</span>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  // Calculadora ROI inline
  (function() {
    const inputs = ['roi-courts', 'roi-students', 'roi-fee', 'roi-hours'].map(id => document.getElementById(id));
    function compute() {
      const courts = +inputs[0].value || 0;
      const students = +inputs[1].value || 0;
      const fee = +inputs[2].value || 0;
      const hours = +inputs[3].value || 0;
      // Modelo simple: hora admin €15, recuperación cuotas 8%, uplift ocupación 5%
      const adminSavings = hours * 4.33 * 15;
      const feeRecovered = students * fee * 0.08;
      const occupancyUplift = courts * 200;
      const totalSave = Math.round(adminSavings + feeRecovered + occupancyUplift);
      // Plan adecuado
      const plan = students <= 80 ? 44 : students <= 500 ? 97 : 250;
      const net = totalSave - plan;
      const yearly = net * 12;
      const payback = totalSave > plan ? Math.max(1, Math.round(plan / (totalSave - plan))) : 12;
      document.getElementById('roi-pay').textContent = `€${plan} / mes`;
      document.getElementById('roi-save').textContent = `€${totalSave.toLocaleString('es-ES')} / mes`;
      document.getElementById('roi-payback').textContent = `${payback} mes${payback>1?'es':''}`;
      document.getElementById('roi-yearly').textContent = `€${yearly.toLocaleString('es-ES')}`;
      document.getElementById('roi-net').textContent = `€${net.toLocaleString('es-ES')}`;
    }
    inputs.forEach(i => i.addEventListener('input', compute));
    compute();
  })();
</script>
```

- [ ] **Step 11.3: Verificar y commit**

Refresh. Expected: fondo deep, 4 inputs editables a la izquierda, resultado dinámico a la derecha que se recalcula al teclear.

```bash
git add index.html assets/web.css
git commit -m "feat(web): calculadora ROI dinámica con JS inline"
```

---

## Task 12: Sección Pricing

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 12.1: Estilos**

```css
/* === PRICING === */
.pricing { background: white; }
.pricing h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: var(--space-2);
}
.pricing .lead {
  text-align: center;
  color: #4b5563;
  font-size: var(--text-md);
  max-width: 60ch;
  margin: 0 auto var(--space-7);
}
.price-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}
.price-card {
  background: var(--foam);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: var(--space-6);
  position: relative;
  display: flex;
  flex-direction: column;
}
.price-card.highlight {
  background: var(--deep);
  color: white;
  border: none;
  transform: scale(1.03);
  z-index: 1;
}
.price-card.highlight::before {
  content: "MÁS ELEGIDO";
  position: absolute;
  top: -12px; right: 16px;
  background: var(--cyan-accent);
  color: var(--deep);
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  padding: 4px 10px;
  border-radius: 4px;
}
.price-card .name {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-2);
}
.price-card.highlight .name { color: white; }
.price-card .when {
  font-size: var(--text-sm);
  color: #6b7280;
  margin-bottom: var(--space-5);
}
.price-card.highlight .when { color: #a8c5d4; }
.price-card .amount {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--deep);
}
.price-card.highlight .amount { color: white; }
.price-card .amount-when {
  font-size: var(--text-sm);
  color: #6b7280;
  margin-bottom: var(--space-5);
}
.price-card.highlight .amount-when { color: #a8c5d4; }
.price-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-6) 0;
  flex: 1;
}
.price-card li {
  padding: var(--space-2) 0;
  font-size: var(--text-sm);
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}
.price-card li::before {
  content: "✓";
  color: var(--brew-blue);
  font-weight: 700;
}
.price-card.highlight li::before { color: var(--cyan-accent); }
```

- [ ] **Step 12.2: HTML**

```html
<!-- ============== SECCIÓN 11 · PRICING ============== -->
<section class="pricing" id="precios">
  <div class="container">
    <h2>Crece a tu ritmo.</h2>
    <p class="lead">Sin permanencia, sin coste de implantación. Cambia de plan cuando quieras.</p>
    <div class="price-grid">
      <div class="price-card">
        <div class="name">Starter</div>
        <div class="when">Hasta 1 pista · 80 alumnos</div>
        <div class="amount">€44</div>
        <div class="amount-when">/ mes · facturado anual</div>
        <ul>
          <li>App móvil con tu marca</li>
          <li>CRM de leads</li>
          <li>Agenda + pistas</li>
          <li>Stripe + wallet</li>
        </ul>
        <a href="#demo" class="btn btn-secondary">Empezar gratis</a>
      </div>
      <div class="price-card highlight">
        <div class="name">Academy</div>
        <div class="when">Hasta 6 pistas · 500 alumnos</div>
        <div class="amount">€97</div>
        <div class="amount-when">/ mes · facturado anual</div>
        <ul>
          <li>Todo lo de Starter</li>
          <li>IA para coaches y CRM</li>
          <li>Bonos, packs y domiciliación SEPA</li>
          <li>Multi-coach + reportes</li>
        </ul>
        <a href="#demo" class="btn btn-primary" style="background: var(--cyan-accent); color: var(--deep);">Probar 30 días</a>
      </div>
      <div class="price-card">
        <div class="name">Network</div>
        <div class="when">Multi-sede y franquicias</div>
        <div class="amount">Custom</div>
        <div class="amount-when">precio según necesidades</div>
        <ul>
          <li>Academias ilimitadas</li>
          <li>SSO + roles custom</li>
          <li>SLA + integraciones a medida</li>
          <li>Soporte dedicado</li>
        </ul>
        <a href="#demo" class="btn btn-secondary">Hablar con ventas</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 12.3: Verificar y commit**

Refresh. Expected: 3 price cards. La del medio (Academy) destacada con fondo deep + badge "MÁS ELEGIDO" cyan.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección Pricing con 3 planes y Academy destacado"
```

---

## Task 13: Sección "Academias que usan Dashboll"

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 13.1: Estilos**

```css
/* === ACADEMIAS === */
.academies { background: var(--foam); }
.academies h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
}
.academies .lead {
  color: #4b5563;
  margin-bottom: var(--space-7);
  max-width: 60ch;
}
.academies-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}
.academy-cell {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: var(--space-5);
  text-align: center;
}
.academy-cell .name {
  font-weight: 700;
  margin-bottom: var(--space-2);
}
.academy-cell .meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.10em;
  color: var(--brew-blue);
  text-transform: uppercase;
}
.academy-cell.coming {
  background: #fff7e6;
  border: 1px dashed #d4a04e;
  display: flex;
  align-items: center;
  justify-content: center;
}
.academy-cell.coming .meta { color: #ad6b13; }
```

- [ ] **Step 13.2: HTML (copy honesto)**

```html
<!-- ============== SECCIÓN 12 · ACADEMIAS ============== -->
<section class="academies">
  <div class="container">
    <h2>Academias que usan Dashboll.</h2>
    <p class="lead">Primer cohort de academias en Q3 2026. Una academia ya en producción real desde Q1 2026 — la pelota de pruebas.</p>
    <div class="academies-grid">
      <div class="academy-cell">
        <div class="name">Academia piloto</div>
        <div class="meta">EN PRODUCCIÓN · Q1 2026</div>
      </div>
      <div class="academy-cell coming">
        <div class="meta">CUPO RESERVADO<br>Q3 2026</div>
      </div>
      <div class="academy-cell coming">
        <div class="meta">CUPO RESERVADO<br>Q3 2026</div>
      </div>
      <div class="academy-cell coming">
        <div class="meta">¿La tuya?<br>Reserva ahora</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 13.3: Verificar y commit**

Refresh. Expected: 4 cells. La primera con academia piloto, las dos siguientes "cupo reservado", la última invitando a sumarse.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección 'Academias que usan Dashboll' con copy honesto"
```

---

## Task 14: Sección FAQ

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 14.1: Estilos**

```css
/* === FAQ === */
.faq h2 {
  font-size: clamp(32px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-7);
  text-align: center;
}
.faq-list {
  max-width: 760px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid #e5e7eb;
}
.faq-item summary {
  padding: var(--space-5) 0;
  font-size: var(--text-md);
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after {
  content: "+";
  font-size: var(--text-xl);
  color: var(--brew-blue);
  font-weight: 700;
  transition: transform 0.2s;
  flex-shrink: 0;
}
.faq-item[open] summary::after {
  transform: rotate(45deg);
}
.faq-item p {
  padding: 0 0 var(--space-5);
  color: #4b5563;
  font-size: var(--text-sm);
  line-height: 1.7;
  max-width: 70ch;
}
```

- [ ] **Step 14.2: HTML**

```html
<!-- ============== SECCIÓN 13 · FAQ ============== -->
<section class="faq" id="faq">
  <div class="container">
    <h2>Preguntas frecuentes</h2>
    <div class="faq-list">
      <details class="faq-item">
        <summary>¿Puedo migrar mi base de alumnos actual?</summary>
        <p>Sí. Te enviamos una plantilla y hacemos la importación por ti. Si tu ERP está en la lista de integraciones, conectamos API a API — sin trabajo extra para tu equipo.</p>
      </details>
      <details class="faq-item">
        <summary>¿La app móvil es personalizable?</summary>
        <p>La app se compila con tu nombre, logo, color primario y dominio. Publicamos en App Store y Google Play bajo tu cuenta de desarrollador, o bajo la nuestra si prefieres no gestionarla.</p>
      </details>
      <details class="faq-item">
        <summary>¿Qué comisiones aplican sobre los cobros?</summary>
        <p>Dashboll no cobra comisión por transacción. Pagas lo que Stripe cobra (1,4% + €0,25 en UE) y tu cuota mensual del plan. SEPA y wallet interno son gratis.</p>
      </details>
      <details class="faq-item">
        <summary>¿Quién es dueño de los datos?</summary>
        <p>Tú. Todos los datos de tu academia son exportables a CSV en cualquier momento. Tenemos una API de exportación programable. Si te vas, te los llevas.</p>
      </details>
      <details class="faq-item">
        <summary>¿Se puede usar para federaciones o cadenas?</summary>
        <p>Sí, en el plan Network. Una instancia matriz controla sub-academias con roles, políticas comerciales y reportes consolidados.</p>
      </details>
      <details class="faq-item">
        <summary>¿Qué idiomas soporta?</summary>
        <p>Español inicialmente. Portugués, italiano e inglés en Q3 2026. Otros idiomas bajo pedido — el código está localizado con i18n estándar.</p>
      </details>
      <details class="faq-item">
        <summary>¿Y los deportes que no son pádel?</summary>
        <p>Dashboll arranca multideporte desde el día uno. Tenis, basket, fútbol, golf, pickleball y balonmano están soportados con su skin propio. Si gestionas otro deporte, pídelo y lo añadimos al sistema.</p>
      </details>
    </div>
  </div>
</section>
```

- [ ] **Step 14.3: Verificar y commit**

Refresh. Expected: FAQ centered con 7 questions, cada una expandible al click. El icono "+" rota a "x" cuando está abierta.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección FAQ con 7 preguntas universales"
```

---

## Task 15: Sección Seguridad y soporte

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 15.1: Estilos**

```css
/* === SEGURIDAD === */
.security {
  background: white;
  border-top: 1px solid #e5e7eb;
}
.security h2 {
  font-size: clamp(28px, 3.5vw, 40px);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-2);
  text-align: center;
}
.security .lead {
  text-align: center;
  color: #4b5563;
  margin-bottom: var(--space-7);
}
.security-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.security-cell {
  text-align: center;
  padding: var(--space-5);
  background: var(--foam);
  border-radius: 10px;
}
.security-cell .icon {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--brew-blue);
  margin-bottom: var(--space-3);
}
.security-cell h3 {
  font-size: var(--text-md);
  margin-bottom: var(--space-2);
}
.security-cell p {
  font-size: var(--text-sm);
  color: #6b7280;
  line-height: 1.5;
}
```

- [ ] **Step 15.2: HTML**

```html
<!-- ============== SECCIÓN 14 · SEGURIDAD Y SOPORTE ============== -->
<section class="security">
  <div class="container">
    <h2>Tus datos. Tu academia. Tu ritmo.</h2>
    <p class="lead">Lo que un comprador B2B necesita saber antes de firmar.</p>
    <div class="security-grid">
      <div class="security-cell">
        <div class="icon">EU</div>
        <h3>Hosting en EU</h3>
        <p>Servidores en Frankfurt. Latencia baja para España y LATAM con CDN.</p>
      </div>
      <div class="security-cell">
        <div class="icon">GDPR</div>
        <h3>Cumplimiento RGPD</h3>
        <p>DPA disponible. Encriptación at-rest y in-transit. Right to forget en 30 días.</p>
      </div>
      <div class="security-cell">
        <div class="icon">CSV</div>
        <h3>Datos exportables</h3>
        <p>Exporta toda tu academia a CSV o JSON cuando quieras. Sin permisos, sin trámites.</p>
      </div>
      <div class="security-cell">
        <div class="icon">9/7</div>
        <h3>Soporte en español</h3>
        <p>Equipo en Málaga. Slack compartido para clientes Academy y Network. Respuesta en menos de 4h en horario laboral.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 15.3: Verificar y commit**

Refresh. Expected: 4 cells con icon mono brew-blue, título y párrafo descriptivo.

```bash
git add index.html assets/web.css
git commit -m "feat(web): sección Seguridad y soporte con 4 garantías B2B"
```

---

## Task 16: CTA final

**Files:** Modify `index.html`, `assets/web.css`.

- [ ] **Step 16.1: Estilos**

```css
/* === CTA FINAL === */
.cta-final {
  background: var(--deep);
  color: white;
  text-align: center;
  padding: var(--space-9) 0;
}
.cta-final h2 {
  color: white;
  font-size: clamp(36px, 5vw, 64px);
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: var(--space-3);
  max-width: 22ch;
  margin-left: auto;
  margin-right: auto;
}
.cta-final p {
  color: #a8c5d4;
  font-size: var(--text-md);
  max-width: 50ch;
  margin: 0 auto var(--space-7);
}
.cta-final .ctas {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}
.cta-final .ctas .btn-primary {
  background: var(--cyan-accent);
  color: var(--deep);
}
.cta-final .ctas .btn-primary:hover {
  background: white;
  color: var(--deep);
}
.cta-final .micro {
  margin-top: var(--space-5);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: #6b8a9a;
  letter-spacing: 0.10em;
}
```

- [ ] **Step 16.2: HTML**

```html
<!-- ============== SECCIÓN 15 · CTA FINAL ============== -->
<section class="cta-final" id="demo">
  <div class="container">
    <h2>Migramos tus datos en 14 días. Lanzamos tu app.</h2>
    <p>Sin tarjeta, sin permanencia, sin coste de implantación. Operativo el día 14, optimizando con IA el día 30.</p>
    <div class="ctas">
      <a href="mailto:hola@dashboll.app" class="btn btn-primary">Reservar demo</a>
      <a href="/manual" class="btn btn-secondary" style="background: transparent; border-color: rgba(255,255,255,0.2); color: white;">Ver manual de marca</a>
    </div>
    <div class="micro">SIN TARJETA · 30 DÍAS DE PRUEBA · CANCELA CUANDO QUIERAS</div>
  </div>
</section>
```

- [ ] **Step 16.3: Verificar y commit**

Refresh. Expected: fondo deep grande, título grande blanco, párrafo, dos CTAs (Reservar demo en cyan + Ver manual transparente), microcopy abajo.

```bash
git add index.html assets/web.css
git commit -m "feat(web): CTA final con copy concreto + micro-promesa"
```

---

## Task 17: Animaciones y mobile responsive

**Files:** Modify `assets/web.css`.

- [ ] **Step 17.1: Añadir animaciones de entrada (IntersectionObserver)**

```css
/* === ANIMACIONES === */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger en grid children */
.solves-grid > *,
.feature-grid > *,
.flows-grid > *,
.how-steps > *,
.security-grid > *,
.price-grid > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.solves-grid.visible > *,
.feature-grid.visible > *,
.flows-grid.visible > *,
.how-steps.visible > *,
.security-grid.visible > *,
.price-grid.visible > * {
  opacity: 1;
  transform: translateY(0);
}
.solves-grid.visible > *:nth-child(2),
.feature-grid.visible > *:nth-child(2),
.flows-grid.visible > *:nth-child(2),
.how-steps.visible > *:nth-child(2),
.price-grid.visible > *:nth-child(2) { transition-delay: 0.1s; }
.solves-grid.visible > *:nth-child(3),
.feature-grid.visible > *:nth-child(3),
.flows-grid.visible > *:nth-child(3),
.how-steps.visible > *:nth-child(3),
.price-grid.visible > *:nth-child(3) { transition-delay: 0.2s; }
.how-steps.visible > *:nth-child(4) { transition-delay: 0.3s; }
```

- [ ] **Step 17.2: Añadir JS de IntersectionObserver al final del `<body>` en `index.html`**

```html
<script>
  // Animaciones de entrada al scrollear
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.solves-grid, .feature-grid, .flows-grid, .how-steps, .security-grid, .price-grid, .multisport-grid').forEach(el => obs.observe(el));
</script>
```

- [ ] **Step 17.3: Mobile responsive en `assets/web.css`**

```css
/* === RESPONSIVE === */
@media (max-width: 1024px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-balls { order: -1; }
  .hero-balls .main dashboll-ball { width: 220px !important; height: 220px !important; }
  .multisport-grid { grid-template-columns: repeat(4, 1fr); }
  .academies-grid { grid-template-columns: repeat(2, 1fr); }
  .web-footer .row { grid-template-columns: 1fr 1fr; }
  .roi-grid { grid-template-columns: 1fr; }
  .compare-table { font-size: 12px; overflow-x: auto; }
  .feature-card[style*="grid-column: span 2"] { grid-column: span 1 !important; }
}

@media (max-width: 700px) {
  .web-nav ul { display: none; }
  .container { padding: 0 var(--space-4); }
  section { padding: var(--space-7) 0; }
  .hero { padding-top: 100px; }
  .solves-grid, .feature-grid, .flows-grid, .how-steps, .security-grid, .price-grid {
    grid-template-columns: 1fr !important;
  }
  .multisport-grid { grid-template-columns: repeat(2, 1fr); }
  .operators .row { flex-direction: column; align-items: flex-start; }
  .operators .stat { gap: var(--space-4); }
  .meet-grid { grid-template-columns: 1fr; }
  .price-card.highlight { transform: none; }
  .roi-inputs { grid-template-columns: 1fr; }
  .compare-table th, .compare-table td { padding: var(--space-3); font-size: 12px; }
}
```

- [ ] **Step 17.4: Verificar en distintas resoluciones y commit**

Refresh. Probar redimensionando ventana hasta móvil. Expected: en <1024px hero pasa a 1 columna y la pelota va arriba, en <700px nav menu desaparece, todo grids a 1 columna, multisport a 2 columnas.

```bash
git add index.html assets/web.css
git commit -m "feat(web): animaciones de entrada + responsive mobile-first"
```

---

## Task 18: Tests estructurales + deploy

**Files:**
- Create: `tests/index-structure.test.js`

- [ ] **Step 18.1: Crear test de estructura**

```js
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let html;
beforeAll(() => {
  html = readFileSync(resolve('index.html'), 'utf-8');
});

describe('index.html · estructura de la web pública', () => {
  it('tiene meta title y description SEO', () => {
    expect(html).toMatch(/<title>Dashboll/);
    expect(html).toMatch(/<meta name="description"/);
    expect(html).toMatch(/<meta property="og:title"/);
  });

  const sections = ['hero', 'resuelve', 'conoce', 'producto', 'multideporte', 'precios', 'faq', 'demo'];
  it.each(sections)('contiene sección con id="%s"', (id) => {
    expect(html).toMatch(new RegExp(`id="${id}"`));
  });

  it('referencia el componente <dashboll-ball>', () => {
    const matches = html.match(/<dashboll-ball/g);
    expect(matches).not.toBeNull();
    expect(matches.length).toBeGreaterThan(5);
  });

  it('importa los 7 deportes en alguna parte', () => {
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

  it('tiene calculadora ROI con todos los inputs', () => {
    ['roi-courts', 'roi-students', 'roi-fee', 'roi-hours'].forEach(id => {
      expect(html).toMatch(new RegExp(`id="${id}"`));
    });
  });

  it('FAQ tiene al menos 6 details', () => {
    const matches = html.match(/<details class="faq-item">/g);
    expect(matches.length).toBeGreaterThanOrEqual(6);
  });
});
```

- [ ] **Step 18.2: Ejecutar tests**

Run: `npm test`. Expected: 25 tests del componente + nuevos tests de index estructura, todos verdes.

- [ ] **Step 18.3: Commit y deploy**

```bash
git add tests/index-structure.test.js
git commit -m "test(web): tests estructurales de index.html"
git push origin master
npx vercel --prod --yes
```

Expected output: Vercel deploya `index.html` en producción. URL del deploy en consola.

- [ ] **Step 18.4: Tag final**

```bash
git tag -a v1.1-web -m "Web pública v1 · landing publicada"
git push origin v1.1-web
```

---

## Self-review

**1. Spec coverage** — 15 secciones de la web pública:

| Sección | Task |
|---|---|
| 1. Hero | Task 2 ✓ |
| 2. Hecho por operadores | Task 3 ✓ |
| 3. Qué resuelve | Task 4 ✓ |
| 4. Conoce a Dashboll | Task 5 ✓ |
| 5. El producto + integraciones | Task 6 ✓ |
| 6. Multideporte | Task 7 ✓ |
| 7. 3 flujos | Task 8 ✓ |
| 8. Cómo funciona | Task 9 ✓ |
| 9. Comparativa | Task 10 ✓ |
| 10. Calculadora ROI | Task 11 ✓ |
| 11. Pricing | Task 12 ✓ |
| 12. Academias que usan Dashboll | Task 13 ✓ |
| 13. FAQ | Task 14 ✓ |
| 14. Seguridad y soporte | Task 15 ✓ |
| 15. CTA final + footer | Task 16 + Task 1 ✓ |

Plus animaciones (Task 17), mobile responsive (Task 17), tests (Task 18) y deploy (Task 18).

**2. Placeholder scan** — sin TODO/TBD/placeholders. Todo el código está completo.

**3. Type consistency** — todas las clases CSS están definidas antes de usarse, todos los `id` referenciados en nav están definidos en sus secciones, los atributos del componente `<dashboll-ball>` (`sport`, `size`) son consistentes con el componente existente.

Plan listo para ejecutar.
</thinking>

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Plan de implementación web pública", "activeForm": "Plan escrito", "status": "completed"}, {"content": "Task 1 · Skeleton index.html + nav + footer", "activeForm": "Skeleton de la web", "status": "in_progress"}, {"content": "Task 2 · Hero", "activeForm": "Hero", "status": "pending"}, {"content": "Task 3 · Hecho por operadores", "activeForm": "Operadores", "status": "pending"}, {"content": "Task 4 · Qué resuelve", "activeForm": "Qué resuelve", "status": "pending"}, {"content": "Task 5 · Conoce a Dashboll", "activeForm": "Conoce a Dashboll", "status": "pending"}, {"content": "Task 6 · Producto + integraciones", "activeForm": "Producto", "status": "pending"}, {"content": "Task 7 · Multideporte", "activeForm": "Multideporte", "status": "pending"}, {"content": "Task 8 · 3 flujos", "activeForm": "3 flujos", "status": "pending"}, {"content": "Task 9 · Cómo funciona", "activeForm": "Cómo funciona", "status": "pending"}, {"content": "Task 10 · Comparativa", "activeForm": "Comparativa", "status": "pending"}, {"content": "Task 11 · Calculadora ROI", "activeForm": "Calculadora ROI", "status": "pending"}, {"content": "Task 12 · Pricing", "activeForm": "Pricing", "status": "pending"}, {"content": "Task 13 · Academias", "activeForm": "Academias", "status": "pending"}, {"content": "Task 14 · FAQ", "activeForm": "FAQ", "status": "pending"}, {"content": "Task 15 · Seguridad y soporte", "activeForm": "Seguridad", "status": "pending"}, {"content": "Task 16 · CTA final", "activeForm": "CTA final", "status": "pending"}, {"content": "Task 17 · Animaciones + responsive", "activeForm": "Animaciones + responsive", "status": "pending"}, {"content": "Task 18 · Tests estructurales + deploy", "activeForm": "Tests + deploy", "status": "pending"}]