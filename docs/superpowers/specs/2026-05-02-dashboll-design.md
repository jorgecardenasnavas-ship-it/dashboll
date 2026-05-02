# Dashboll · Design Spec

**Fecha:** 2026-05-02
**Owner:** Jorge Cárdenas (CSO de J3Padel)
**Estado:** Aprobado para implementación

---

## 1 · Contexto

Dashboll es un SaaS multitenant de gestión micro de academias deportivas, con base en Málaga vinculada a J3Pádel y mercado primario España + LATAM. Arranca con pádel y escala a tenis, pickleball, basket, fútbol, golf, balonmano. Cada academia opera como silo aislado (sin features sociales entre clubs). Tres flujos diferenciados: jugador, entrenador, gerente.

Esta spec cubre la **identidad de marca y los entregables públicos**: manual de identidad, web pública y PDF del manual. No cubre el producto en sí.

Trabajo previo descartado: nada del trabajo de naming anterior (Pademia, Brew) se reutiliza. Esto incluye copy, paleta, tipografía, mockups y storytelling. Universo visual nuevo desde cero.

---

## 2 · Decisiones cerradas

### 2.1 · Marca

| Eje | Valor |
|-----|-------|
| Nombre app | `dashboll` (siempre minúscula en wordmark) |
| Etimología | Dashboard + Ball |
| Asistente IA | Dashboll (mismo nombre que la app — la pelota *es* la marca) |
| Handle Instagram | @dashboll.app |

### 2.2 · Sistema cromático dual

**Paleta principal (firma de marca, constante):**

| Token | Hex | Uso |
|-------|-----|-----|
| `--brew-blue` | `#1a8fc7` | Color de marca · barras del dashboard interno de la pelota |
| `--deep` | `#04476a` | Fondos premium, navy, headers |
| `--cyan-accent` | `#4DD0E1` | Acentos, pulse, hover states |
| `--foam` | `#fafafa` | Fondos claros |

**Skins por deporte (color de la pelota base):**

| Deporte | Color base | Costuras / detalles |
|---------|------------|---------------------|
| Pádel | `#d4e668` | Costuras blancas |
| Tenis | `#e8f266` | Costuras blancas |
| Basket | `#e8723a` | Costuras negras |
| Fútbol | `#ffffff` | Paneles hexagonales negros |
| Pickleball | `#ffffff` | Agujeros perforados |
| Golf | `#ffffff` | Dimples |
| Balonmano | `#ffffff` | Detalles azul/rojo sintético |

**Regla constante:** las **barras del dashboard interno** de la pelota son siempre `--brew-blue`, sin importar el deporte. Esa es la firma visual.

### 2.3 · Tipografía

- **Geist** (sans-serif geométrica, Vercel open source) — texto, wordmark, UI, manual.
- **Geist Mono** (monoespaciada de la misma familia) — datos numéricos, métricas, valores del dashboard, footer del PDF.

Pesos en uso: Regular (400), Medium (500), Bold (700), ExtraBold (800 — wordmark).

**Self-hosted** en `/assets/fonts/` (no Google Fonts CDN).

### 2.4 · Voz y personalidad

- Personalidad JARVIS (calmada, anticipa, propone, lealtad sin servilismo).
- Tutea con autoridad.
- Frases sintéticas, datos con criterio.
- 95% profesional · 5% guiños deportivos en hitos · humor seco escasísimo (1/20).
- **Cero emojis. Cero exclamaciones. Cero urgencia gratuita. Cero cursivas. Cero serif editorial.**
- Verbos de acción: mueve, optimiza, controla, propone, detecta.
- Más cerca de Linear, Vercel, Stripe Atlas que de Notion editorial.

**Eslóganes provisionales (no definitivos):**
- "Dashboll. La pelota está en tu panel."
- "Dashboll. Tu academia, en juego."
- "Dashboll. Mueve tu club."

---

## 3 · Arquitectura técnica

### 3.1 · Stack

- HTML / CSS / JS vainilla (sin React). Manual y web autocontenidos.
- SVG inline para todos los logos y pelotas, encapsulados en un Web Component nativo.
- wkhtmltopdf para generar el PDF del manual.
- Hosting en Vercel (push a master = deploy automático). Repositorio en GitHub.

### 3.2 · Enfoque arquitectónico (Enfoque A elegido)

- **Manual:** un único archivo `manual.html` con secciones scrolleables (cada capítulo = `<section>` con dimensiones A4 apaisado / landscape — formato estándar para manuales de identidad modernos).
- **Web pública:** archivo aparte `index.html`.
- Tokens y estilos compartidos entre ambos.
- Navegación lateral fija en el manual con anclas a cada capítulo (estilo Stripe / Linear docs).
- PDF generado desde `manual.html` con CSS `@page` y header/footer automáticos.

### 3.3 · Estructura del repositorio

```
dashboll/
├── index.html              ← Web pública (landing dashboll.app)
├── manual.html             ← Manual de identidad (14 capítulos)
├── assets/
│   ├── tokens.css          ← Variables CSS de marca (paleta, tipografía, espaciado)
│   ├── styles.css          ← Estilos compartidos (layout, tipografía base)
│   ├── manual.css          ← Estilos exclusivos del manual (impresión, navegación lateral)
│   ├── web.css             ← Estilos exclusivos de la landing
│   ├── fonts/              ← Geist y Geist Mono self-hosted (woff2)
│   └── components/
│       └── dashboll-ball.js ← Web Component <dashboll-ball>
├── pdf/
│   └── manual.pdf          ← PDF generado (output)
├── scripts/
│   └── build-pdf.sh        ← Genera el PDF con wkhtmltopdf
├── docs/
│   └── superpowers/specs/  ← Esta spec y futuras
└── package.json (mínimo, solo para scripts)
```

### 3.4 · Componente `<dashboll-ball>`

**API pública:**

```html
<dashboll-ball sport="padel" size="120"></dashboll-ball>
<dashboll-ball sport="basket" size="48"></dashboll-ball>
```

**Atributos:**
- `sport` — uno de `padel | tennis | basket | football | golf | pickleball | handball`. Default: `padel`.
- `size` — número en píxeles para el lado del bounding box. Default: `100`.

**Render:**
- SVG inline parametrizado.
- Pelota base con color y costuras del deporte indicado (tabla 2.2).
- Barras del dashboard interno **siempre** en `--brew-blue` (`#1a8fc7`).
- Implementación como Custom Element nativo (Shadow DOM opcional, Light DOM aceptable para que herede tokens CSS).

### 3.5 · Pack de mejoras (todas activas)

1. **Sistema de tokens CSS centralizado** — `tokens.css` define paleta, tipografía y espaciado en variables CSS. Cambio en una sola línea propaga a manual, web y PDF.
2. **`<dashboll-ball>` como Web Component nativo** — uso declarativo, cero duplicación.
3. **PDF profesional con header/footer** — wkhtmltopdf con header (capítulo actual, derecha) y footer (`Dashboll · Manual de identidad · pág X de Y`) en Geist Mono.
4. **Scroll-snap por sección** — implementado pero **desactivado por defecto** vía clase CSS toggle. Se activará en revisión visual y se decide entonces si entra a v1.
5. **Fuentes self-hosted** — Geist y Geist Mono empaquetadas en `/assets/fonts/` como WOFF2.
6. **Versionado en footer del manual** — `Manual de identidad Dashboll · v1.0 · Mayo 2026` en cada página del PDF y en el footer del manual web.

---

## 4 · Estructura del manual de identidad

14 capítulos, cada uno = `<section>` con dimensiones A4 apaisado y anclaje único:

| # | Capítulo | Contenido principal |
|---|----------|---------------------|
| 1 | Cover + manifiesto | Wordmark grande, eslogan, frase manifiesto, fecha versión |
| 2 | El nombre | Etimología Dashboard + Ball, pronunciación, uso correcto |
| 3 | El personaje | Quién es Dashboll, personalidad JARVIS, cómo habla, ejemplos |
| 4 | Anatomía del logo | Despiece visual de la pelota: base, costuras, dashboard interno, barras |
| 5 | Construcción y proporciones | Grid, márgenes, tamaños mínimos, área de protección |
| 6 | Sistema de skins por deporte | Galería de las 7 pelotas con su skin |
| 7 | Sistema cromático dual | Paleta principal + skins, regla de las barras siempre azules |
| 8 | Tipografía | Geist + Geist Mono, pesos, jerarquía, ejemplos |
| 9 | Voz y tono | Tabla "Sí/No" con ejemplos reales de Dashboll hablando |
| 10 | Sistema de eslóganes | Los tres provisionales + lógica para futuros |
| 11 | Aplicaciones reales | Mockups de la app: dashboard del gerente, vista del entrenador, vista del jugador |
| 12 | Lo que NO es Dashboll | Anti-patterns: emojis, exclamaciones, fonts editoriales, paletas equivocadas |
| 13 | Próximos pasos | Roadmap visual: nuevos deportes, idiomas, expansión LATAM |
| 14 | Cierre + versionado | Créditos, contacto, versión, fecha, hash |

Cada capítulo incluye su número en navegación lateral. Salto de página automático en PDF entre secciones.

---

## 5 · Estructura de la web pública (dashboll.app)

Landing modular con secciones que pueden crecer:

| Sección | Contenido |
|---------|-----------|
| Hero | Wordmark + eslogan principal + pelota animada (rotación suave o pulse de barras) |
| Qué es Dashboll | Definición clara, para quién, qué problema resuelve |
| Conoce a Dashboll | El asistente — ejemplo conversacional real con la voz JARVIS |
| Multideporte | Galería de las 7 pelotas con sus skins, cada una clickable |
| Cómo funciona | Los 3 flujos (jugador, entrenador, gerente) con burbujas de ocupación |
| Contacto / Demo | Formulario o WhatsApp J3Pádel |

**Importante:** antes de implementar la web pública (paso 5 del plan de construcción), Jorge enviará la versión actual del sitio para extraer copys, recursos visuales reutilizables, secciones que mantenemos y secciones que descartamos. Sobre esa base se construye el reemplazo.

Diseño preparado desde el primer día para crecer (precios, casos de éxito, blog, login al producto) sin replantear arquitectura.

---

## 6 · Plan de construcción (orden secuencial)

1. **Componente `<dashboll-ball>`** — base de todo. Demo en navegador con las 7 skins lado a lado. Validación visual con Jorge antes de continuar.
2. **Tokens CSS + tipografía self-hosted** — paleta, fuentes Geist/Mono empaquetadas, variables base.
3. **Manual de identidad** — los 14 capítulos. Construcción capítulo a capítulo, revisión visual entre cada uno o cada par.
4. **PDF profesional** — script `build-pdf.sh` con wkhtmltopdf, header/footer, paginación. Output validado por Jorge.
5. **Web pública** — landing. *Bloqueado hasta que Jorge envíe la web actual de referencia.*
6. **Deploy en Vercel** — repositorio GitHub, conexión a Vercel, primer deploy. URL pública confirmada.

Cada paso se valida visualmente antes de pasar al siguiente. Si algo no convence, se itera antes de avanzar.

---

## 7 · Lo que NO se incluye en v1

- Modo oscuro / claro toggle.
- Acceso por contraseña al manual.
- Versiones por idioma (ES/EN/PT — para LATAM se añadirá después).
- Animaciones complejas en la pelota (rotación 3D, físicas).
- Integración con el producto real (esta spec es solo de identidad y comunicación).
- CMS para editar copy del manual sin tocar HTML.

Estos puntos quedan documentados aquí para futuras versiones.

---

## 8 · Criterios de éxito

La v1 está terminada cuando:

- [ ] `<dashboll-ball>` renderiza correctamente las 7 skins en cualquier tamaño.
- [ ] El manual completo (14 capítulos) está navegable en `manual.html` con navegación lateral activa.
- [ ] El PDF se genera con un solo comando, lleva header/footer y paginación correcta.
- [ ] La web pública (`index.html`) tiene las 6 secciones funcionales con copy real.
- [ ] El sitio está desplegado en Vercel y accesible públicamente.
- [ ] El sistema de tokens permite cambiar la paleta entera modificando un solo archivo.
- [ ] Las fuentes Geist y Geist Mono cargan self-hosted sin dependencia de CDN externo.
- [ ] Todos los colores, tipografías y voz coinciden exactamente con esta spec.

---

## 9 · Consideraciones operativas

- **Idioma:** español (España + LATAM). El inglés vendrá en una fase posterior.
- **Hoy es 2026-05-02.** Timestamp de la versión inicial: v1.0 · Mayo 2026.
- **Comunicación con Jorge:** en español, en términos de resultado visible, no en términos de archivos o código (Jorge no es programador).
- **Validación:** cada paso revisado visualmente con Jorge antes de avanzar.
- **Cambios al spec:** cualquier desvío significativo durante la implementación se documenta volviendo aquí, no se asume.
