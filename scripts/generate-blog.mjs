import { writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const POSTS = [
  {
    slug: 'bajar-morosidad-academia-deportiva',
    title: 'Cómo bajar la morosidad en tu academia deportiva al 4-6%',
    metaDesc: 'Una academia deportiva típica tiene 15-20% de morosidad. Te explicamos cómo reducirla al 4-6% con domiciliación SEPA, wallet interno y un proceso de cobro automatizado.',
    keyword: 'bajar morosidad academia deportiva',
    date: '2026-05-04',
    readTime: 7,
    category: 'Operación',
    excerpt: 'La morosidad media en academias deportivas pequeñas está entre el 15 y el 20%. No es un problema de tus alumnos. Es un problema de tu sistema de cobro.',
    sections: [
      {
        h2: 'Por qué tu academia tiene 15-20% de morosidad (y no es culpa de tus alumnos)',
        body: `<p>Una academia que cobra a final de mes, en efectivo o por transferencia manual, vive con morosidad estructural. La razón es simple: <strong>cada cobro requiere una decisión consciente de tu alumno (o del padre)</strong>. Si la decisión es "pagar la cuota" vs "comprar zapatillas nuevas", "esperar al próximo ingreso" o "ya pagaré la próxima semana", la cuota pierde.</p>
        <p>No estás cobrando mal porque tus alumnos sean malos pagadores. Estás cobrando mal porque <strong>les das la oportunidad de no pagar a tiempo</strong> en cada ciclo.</p>`
      },
      {
        h2: 'El estándar: domiciliación SEPA mensual',
        body: `<p>La domiciliación SEPA convierte el cobro de un acto activo del alumno (transferir, pagar en mano) a un acto pasivo (no hacer nada). Cuando el alumno firma una vez la autorización SEPA, la cuota se cobra automáticamente cada mes.</p>
        <p>Una academia que migra de cobro manual a SEPA suele bajar su morosidad del 15-20% al 6-8% en los primeros 60 días. Sin perseguir a nadie.</p>
        <p>Lo que necesitas:</p>
        <ul>
          <li>Acuerdo SEPA con tu banco (gratis, lo activas en una llamada).</li>
          <li>Software que genere el remesado SEPA cada mes (no Excel — necesitas trazabilidad bancaria).</li>
          <li>Política clara: si el SEPA viene devuelto, qué pasa.</li>
        </ul>`
      },
      {
        h2: 'El extra: wallet interno para créditos y bonos',
        body: `<p>La domiciliación SEPA cubre la cuota mensual. Pero hay otros cobros: clases sueltas, bonos, equipación, viajes a torneos. Si los gestionas por transferencia o efectivo, vuelves al problema del cobro activo.</p>
        <p>Solución: <strong>wallet interno por alumno</strong>. El alumno (o su familia) carga saldo una vez (con tarjeta, tipo Stripe). Cuando se inscribe a una clase suelta, se descuenta del wallet. Sin pasarela cada vez. Sin transferencias sueltas.</p>
        <p>Beneficios:</p>
        <ul>
          <li>Cobro instantáneo (no esperas que el alumno pague esa clase puntual).</li>
          <li>Conciliación trivial: una recarga, muchos descuentos.</li>
          <li>Padre con varios hijos: un solo wallet familiar, una sola recarga.</li>
        </ul>`
      },
      {
        h2: 'Qué hacer cuando un SEPA viene devuelto',
        body: `<p>Aunque la domiciliación SEPA reduce la morosidad drásticamente, no la elimina. Algunos cobros vendrán devueltos por insuficiencia de fondos o cuenta cerrada. La diferencia es que ahora <strong>te enteras al instante</strong>, no a fin de mes.</p>
        <p>Política mínima:</p>
        <ol>
          <li>El día que el SEPA viene devuelto, comunicación automática al alumno (WhatsApp o email): "Tu cuota no se ha podido cobrar. Para regularizar, paga aquí: [link Stripe]".</li>
          <li>Si en 7 días no se regulariza, segundo aviso y bloqueo temporal de reservas.</li>
          <li>Si en 14 días no se regulariza, baja del sistema y cierre de pendientes.</li>
        </ol>
        <p>El secreto: la consecuencia es automática y conocida. El alumno no negocia con un humano (que cede). Negocia con un sistema (que no cede).</p>`
      },
      {
        h2: 'Por qué no llegas al 0% (y por qué es OK)',
        body: `<p>El benchmark sano de morosidad en academias deportivas con SEPA + wallet bien implementado es <strong>4-6%</strong>. Por debajo de eso es excepcional. No persigas el 0% — el coste de gestionar el último 4% suele ser mayor que el ingreso recuperado.</p>
        <p>Acepta que un porcentaje pequeño de cobros se irán por causas reales (cambios bancarios, situaciones puntuales) y enfoca tu energía en el 94-96% que sí cobras de forma automática.</p>`
      }
    ],
    cta: 'En Dashboll la domiciliación SEPA y el wallet interno vienen de serie. Las academias que migran reducen su morosidad al 4-6% en los primeros 3 meses sin perseguir a nadie.'
  },

  {
    slug: 'pasar-excel-software-academia-deportiva',
    title: 'De Excel a software: 6 señales de que tu academia ya no cabe en hojas',
    metaDesc: 'Las academias pequeñas funcionan con Excel. Las que crecen lo abandonan. Aquí están las 6 señales objetivas de que tu academia deportiva ha pasado el punto de Excel.',
    keyword: 'pasar de excel a software academia',
    date: '2026-05-04',
    readTime: 6,
    category: 'Operación',
    excerpt: 'Excel funciona hasta los 80-100 alumnos. A partir de ahí empieza a fallar de formas que no se ven hasta que se rompe algo importante.',
    sections: [
      {
        h2: 'Señal 1 · Tienes más de un Excel para gestionar lo mismo',
        body: `<p>Empezaste con un Excel de alumnos. Luego añadiste otro de pagos. Luego uno de asistencia. Luego uno de ranking. Cuando un alumno se da de baja, tienes que actualizar 4 archivos. Cuando uno cambia de grupo, igual. <strong>Si tu sistema es 4 Excels conectados a mano, ya no es Excel — es un cuello de botella humano</strong>.</p>`
      },
      {
        h2: 'Señal 2 · Pierdes más de 5 horas a la semana en admin pura',
        body: `<p>Cuadrar asistencia, chequear pagos, contestar al mismo padre 3 veces ("¿a qué hora era la clase?", "¿cuánto debo?"). El benchmark de academias bien gestionadas es <strong>menos de 2-3 horas semanales en admin para 100 alumnos</strong>. Si tú pasas de 8-10 horas, no es porque seas mal organizador. Es porque Excel ya no escala.</p>`
      },
      {
        h2: 'Señal 3 · Has perdido facturación por una pista vacía que nadie cubrió',
        body: `<p>Una baja a las 17:30 deja la pista vacía a las 18:00. Sin sistema, esa hora se pierde — porque nadie sabe que está libre y nadie tiene la lista de quién podría cubrirla. <strong>Una pista vacía cubierta = 25-40€ extra por hora</strong>. Multiplícalo por 3-5 huecos a la semana y son 5.000-8.000€ al año perdidos.</p>`
      },
      {
        h2: 'Señal 4 · Tu morosidad supera el 10%',
        body: `<p>Cobrar a final de mes en efectivo o por transferencia manual implica una morosidad estructural del 15-20%. Con software + domiciliación SEPA, baja al 4-6%. <strong>La diferencia entre 15% y 5% en una academia con 100 alumnos a 80€/mes son 9.600€ al año en cuota recuperada</strong>. El software se paga solo en mes 1.</p>`
      },
      {
        h2: 'Señal 5 · No puedes responder "¿qué coach factura más €/h?" en menos de 1 minuto',
        body: `<p>Si alguien te pregunta cuál de tus coaches factura más por hora, retiene mejor a los alumnos o tiene mejor asistencia, y necesitas 1 hora de Excel para contestar — <strong>no estás gestionando, estás reaccionando</strong>. Un panel de academia bien hecho responde a esas preguntas en 5 segundos. Sin él, gestionas con sensaciones.</p>`
      },
      {
        h2: 'Señal 6 · Has dicho "no" a un alumno porque no puedes asumir más caos',
        body: `<p>La señal definitiva. Cuando dejas de aceptar alumnos no porque no caben en pista, sino porque no caben en tu cabeza, has alcanzado el techo operativo. <strong>Excel ya no es la herramienta. Es la jaula</strong>.</p>`
      },
      {
        h2: 'Cuándo NO migrar todavía',
        body: `<p>Si tienes menos de 50 alumnos, un solo coach y todo es presencial cara a cara, Excel sigue funcionando. La migración tiene un coste de aprendizaje (~2 semanas) y solo merece la pena cuando el dolor ya se siente cada semana.</p>
        <p>Reglas de oro:</p>
        <ul>
          <li><strong>&lt; 50 alumnos:</strong> Excel + WhatsApp es suficiente.</li>
          <li><strong>50-100 alumnos:</strong> empiezas a notar el roce. Considera migrar.</li>
          <li><strong>&gt; 100 alumnos:</strong> migra ya. Cada mes de retraso te cuesta más que el software.</li>
        </ul>`
      }
    ],
    cta: 'En Dashboll migramos desde Excel en 14 días. Importamos alumnos, cuotas, asistencia e historial sin que pares operativa. El día 14 estás operativo. El día 30 ya rinde el software.'
  },

  {
    slug: 'organizar-americano-padel-software',
    title: 'Cómo organizar un americano de pádel en 5 minutos (sin Excel)',
    metaDesc: 'Organizar un americano de pádel a mano lleva 30-45 minutos y casi siempre se cae a última hora. Te explicamos cómo hacerlo en 5 minutos con un sistema que se reorganiza solo.',
    keyword: 'organizar americano pádel software',
    date: '2026-05-04',
    readTime: 5,
    category: 'Pádel',
    excerpt: 'Cuadrar parejas, niveles, pistas y horarios en una hoja de Excel. Una hora antes del torneo, alguien cancela y se rompe todo. Existe una forma mejor.',
    sections: [
      {
        h2: 'Por qué el americano a mano se cae siempre',
        body: `<p>Un americano de pádel típico tiene 8-16 jugadores rotando entre parejas y pistas. La complejidad operativa de garantizar que <strong>cada jugador juegue con todos los demás (o lo más cercano posible) sin que coincidan dos veces</strong> es un problema combinatorio.</p>
        <p>A mano se hace con plantillas pre-impresas o con Excel. El problema: si un jugador cancela 30 minutos antes, se rompe todo el cuadro y hay que rehacerlo de cero. Y si lo intentas a 15 minutos del inicio, los demás jugadores ya están en el club esperando.</p>`
      },
      {
        h2: 'Lo que necesitas que haga el software',
        body: `<p>Cuatro funciones imprescindibles:</p>
        <ol>
          <li><strong>Inscripción online de jugadores</strong> (con su rating o nivel).</li>
          <li><strong>Generación automática del cuadro</strong> según el formato (americano puro, sistema suizo, eliminatoria).</li>
          <li><strong>Reorganización en vivo</strong> si alguien cancela: el algoritmo recalcula y avisa a los afectados.</li>
          <li><strong>Comunicación automática</strong>: cada jugador sabe en qué pista y a qué hora juega cada partida.</li>
        </ol>`
      },
      {
        h2: 'El flujo en 5 minutos',
        body: `<p>Con un software correctamente configurado:</p>
        <ol>
          <li><strong>0:00</strong> · Abres el panel, eliges "Nuevo americano", duración 90 min, 4 pistas, formato corto (15 min por partida).</li>
          <li><strong>0:30</strong> · Importas la lista de inscritos (ya están en tu base de datos con su nivel).</li>
          <li><strong>1:00</strong> · El sistema genera el cuadro: 16 jugadores, 4 pistas, 6 rondas, sin repeticiones de pareja.</li>
          <li><strong>2:00</strong> · Revisas. Si quieres ajustar manualmente algo, lo haces (intercambiar dos jugadores, mover una pista).</li>
          <li><strong>3:00</strong> · Confirmas. Cada jugador recibe push en su app con su calendario de partidas y rivales.</li>
          <li><strong>5:00</strong> · El cuadro está vivo. Si alguien cancela en los próximos 30 min, lo gestiona el sistema.</li>
        </ol>`
      },
      {
        h2: 'El detalle que cambia todo: la cancelación de última hora',
        body: `<p>El 80% del estrés del organizador en un americano viene de la cancelación de última hora. Tradicionalmente: un jugador cancela 20 min antes → buscas reserva → si no hay → cuadras un cuadro de 15 jugadores en vez de 16 → el cuadro queda mal balanceado → te aguantas.</p>
        <p>Con software:</p>
        <ul>
          <li>Cancelación entra al sistema en cuanto el jugador aprieta "no puedo".</li>
          <li>El sistema avisa automáticamente a la lista de espera (ordenada por proximidad y nivel).</li>
          <li>Si en 5 min no entra nadie, el cuadro se reorganiza para 15 jugadores manteniendo el equilibrio (un comodín juega más rondas).</li>
          <li>Comunicación automática a los demás: "tu rival cambia, ahora juegas contra X".</li>
        </ul>
        <p>Tu papel: cero. Tu cabeza: libre.</p>`
      }
    ],
    cta: 'Dashboll genera americanos, cuadros eliminatorios y sistemas suizos en un clic. Si alguien cancela 30 minutos antes, reorganizamos sin que tengas que tocar nada.'
  },

  {
    slug: 'cuanto-te-cuesta-gestionar-academia-whatsapp',
    title: 'Cuánto te cuesta gestionar tu academia deportiva con WhatsApp',
    metaDesc: 'WhatsApp parece gratis, pero tiene un coste oculto enorme cuando lo usas como CRM. Te calculamos cuánto te cuesta realmente gestionar una academia deportiva con WhatsApp suelto.',
    keyword: 'gestionar academia con whatsapp coste',
    date: '2026-05-04',
    readTime: 6,
    category: 'Operación',
    excerpt: 'WhatsApp no es gratis cuando lo usas para gestionar tu academia. Es uno de los costes ocultos más grandes que tienes — y nadie te lo cobra en una factura.',
    sections: [
      {
        h2: 'WhatsApp es gratis para 1 conversación. No para 200.',
        body: `<p>WhatsApp como herramienta personal es perfecto. WhatsApp como CRM de una academia deportiva con 100+ alumnos es un sistema que se rompe en 4 puntos:</p>
        <ol>
          <li><strong>No tiene historial estructurado</strong> — buscar quién pagó qué hace 3 meses es imposible.</li>
          <li><strong>No tiene roles</strong> — si tu coach se va, se lleva su WhatsApp con la mitad de los alumnos.</li>
          <li><strong>No tiene automatización</strong> — cada recordatorio lo escribes a mano.</li>
          <li><strong>No tiene auditoría</strong> — un día desaparece un mensaje y nadie sabe qué se dijo.</li>
        </ol>`
      },
      {
        h2: 'El cálculo: 5 horas semanales × 50€/hora = 13.000€/año',
        body: `<p>Una academia con 100 alumnos gestionada por WhatsApp + Excel típicamente consume:</p>
        <ul>
          <li><strong>1h/día</strong> en contestar dudas repetidas ("¿a qué hora era?", "¿cuánto debo?").</li>
          <li><strong>30 min/día</strong> en mandar recordatorios manuales.</li>
          <li><strong>2h/semana</strong> en cuadrar asistencia y pagos cruzando WhatsApp con Excel.</li>
        </ul>
        <p>Total: ~10 horas semanales = <strong>~520 horas al año</strong>. A coste de oportunidad de 25-50€/hora del fundador o coordinador, son <strong>13.000-26.000€/año</strong> en tiempo perdido.</p>
        <p>Y eso sin contar lo que cuesta NO atender a un alumno potencial porque "ahora mismo no doy abasto".</p>`
      },
      {
        h2: 'El coste invisible: alumnos perdidos por respuesta lenta',
        body: `<p>Un padre que pregunta por una clase a las 22:00 y recibe respuesta el día siguiente a las 18:00 ya tiene en la cabeza la academia de la competencia que sí le contestó esa misma noche. <strong>El 30-40% de los leads de academia se pierden por tiempo de respuesta lento</strong>.</p>
        <p>Con WhatsApp manual nunca contestas a las 22:00. Con un sistema que tiene respuestas automáticas a las 5 preguntas más frecuentes (precios, horarios, trial) y solo derive a humano lo que no es estándar — sí.</p>`
      },
      {
        h2: 'Cuándo dejar WhatsApp como canal de gestión',
        body: `<p>Las señales claras:</p>
        <ul>
          <li>Tienes más de un coach y los alumnos preguntan a uno y otro lo mismo.</li>
          <li>Has perdido un mensaje importante porque se quedó enterrado en un grupo.</li>
          <li>Un padre se quejó porque le respondiste con 24h de retraso.</li>
          <li>Pagaste a un alumno por error (o se te olvidó cobrar) porque el WhatsApp se mezcló con el banco.</li>
        </ul>
        <p>WhatsApp tiene su sitio: comunicación informal, cercanía, recordatorios casuales. Pero <strong>no es CRM, ni es base de datos, ni es agenda</strong>. Cuando lo usas como las tres cosas, pagas el precio en horas y leads perdidos.</p>`
      }
    ],
    cta: 'Dashboll integra WhatsApp como canal de comunicación, pero el sistema vive en el panel. Mensajes con plantilla, recordatorios automáticos, historial estructurado y respuestas a las preguntas frecuentes sin que tengas que escribir nada.'
  },

  {
    slug: 'software-multideporte-vs-software-por-deporte',
    title: 'Software multideporte vs software por deporte: cuál elegir para tu academia',
    metaDesc: 'Si tu academia gestiona varios deportes, comparamos las dos opciones reales: un software por deporte o un software multideporte. Cuándo conviene cada uno.',
    keyword: 'software multideporte academia',
    date: '2026-05-04',
    readTime: 5,
    category: 'Decisiones',
    excerpt: 'Dos enfoques: un software especializado por deporte o un software multideporte que abarca todos. La elección no es obvia y depende de cómo crece tu academia.',
    sections: [
      {
        h2: 'Software por deporte: especialistas',
        body: `<p>Hay software especializado por deporte. Para pádel hay Resasports, Playtomic. Para golf hay Golfmanager. Para fútbol base hay GestionaClub. Cada uno bien hecho, con funciones específicas del deporte (handicap, americano, fichas federativas).</p>
        <p><strong>A favor:</strong> integraciones específicas del deporte, comunidad de usuarios del mismo nicho, funciones que un multideporte no replica fácilmente (sincronización con DUPR para pickleball, integración con federación para fútbol).</p>
        <p><strong>En contra:</strong> si gestionas dos deportes (pádel + tenis, fútbol + básket), pagas dos licencias, mantienes dos bases de datos, los alumnos tienen dos cuentas distintas, los pagos van por dos canales, el equipo aprende dos sistemas.</p>`
      },
      {
        h2: 'Software multideporte: un panel para todo',
        body: `<p>El software multideporte (como Dashboll) está pensado desde el día 1 para academias polideportivas: pádel + tenis, básket + voleibol, fútbol + atletismo. Todo gestionado desde un único panel, una sola base de alumnos, un único flujo de pagos.</p>
        <p><strong>A favor:</strong> un alumno se inscribe en clases de cualquier deporte con la misma cuenta, cuotas familiares con varios hijos en distintos deportes, comunicación consolidada, una sola app, un solo onboarding del equipo.</p>
        <p><strong>En contra:</strong> puede ser menos profundo en funciones específicas del deporte (ojo: depende del software — los buenos multideporte sí cubren funciones específicas).</p>`
      },
      {
        h2: 'La pregunta real: ¿hacia dónde crece tu academia?',
        body: `<p>Si vas a gestionar SIEMPRE un solo deporte, especialista. Si tienes la mínima posibilidad de añadir un segundo deporte en los próximos 2-3 años, multideporte. La razón: <strong>migrar de un especialista a un multideporte después implica recrear todo el histórico, comunicar a alumnos y volver a entrenar al equipo</strong>. Cuesta más tiempo que el ahorrado por usar el especialista al principio.</p>
        <p>El otro factor: el público objetivo de la academia. Una escuela de fútbol base normalmente solo gestiona fútbol. Un club polideportivo casi siempre tiene varias secciones. Si tu modelo es "club que crece añadiendo deportes según demanda", el multideporte es estructural, no accesorio.</p>`
      },
      {
        h2: 'Lista corta para decidir',
        body: `<p><strong>Elige especialista si:</strong></p>
        <ul>
          <li>Llevas 5+ años con un solo deporte y no piensas añadir más.</li>
          <li>Necesitas integraciones muy específicas del deporte (federación territorial concreta, sistema de ranking propio).</li>
          <li>El especialista tiene precio competitivo en tu rango de alumnos.</li>
        </ul>
        <p><strong>Elige multideporte si:</strong></p>
        <ul>
          <li>Ya gestionas más de un deporte (o vas a hacerlo en 12-24 meses).</li>
          <li>Eres un club polideportivo o academia con varias secciones.</li>
          <li>Tienes familias con hermanos en distintos deportes y quieres cuota familiar única.</li>
          <li>Buscas reducir herramientas y centralizar la operación.</li>
        </ul>`
      }
    ],
    cta: 'Dashboll es multideporte por diseño: pádel, tenis, básket, fútbol, golf, pickleball y balonmano desde un único panel. Una academia, una base de alumnos, un solo flujo de pagos.'
  }
];

function renderPost(p) {
  const sections = p.sections.map(s => `      <h2>${s.h2}</h2>
      ${s.body}`).join('\n\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${p.title} | Dashboll Blog</title>
  <meta name="description" content="${p.metaDesc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://dashboll.vercel.app/blog/${p.slug}">
  <meta property="og:title" content="${p.title}">
  <meta property="og:description" content="${p.metaDesc}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="es_ES">
  <meta property="og:url" content="https://dashboll.vercel.app/blog/${p.slug}">
  <meta property="article:published_time" content="${p.date}">
  <meta property="article:section" content="${p.category}">
  <link rel="stylesheet" href="../assets/tokens.css?v=20260504">
  <link rel="stylesheet" href="../assets/styles.css?v=20260504">
  <link rel="stylesheet" href="../assets/web.css?v=20260504">
  <link rel="stylesheet" href="../assets/blog.css?v=20260504">
  <script type="module" src="../assets/components/dashboll-ball.js?v=20260504"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": ${JSON.stringify(p.title)},
    "description": ${JSON.stringify(p.metaDesc)},
    "datePublished": "${p.date}",
    "dateModified": "${p.date}",
    "author": { "@type": "Organization", "name": "Dashboll" },
    "publisher": {
      "@type": "Organization",
      "name": "Dashboll",
      "logo": { "@type": "ImageObject", "url": "https://dashboll.vercel.app/" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dashboll.vercel.app/blog/${p.slug}" }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Dashboll", "item": "https://dashboll.vercel.app/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dashboll.vercel.app/blog" },
      { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(p.title)}, "item": "https://dashboll.vercel.app/blog/${p.slug}" }
    ]
  }
  </script>
</head>
<body class="web-body">

  <nav class="web-nav" aria-label="Navegación principal">
    <div class="container row">
      <a href="/" class="brand" aria-label="Dashboll · Inicio">
        <dashboll-ball size="32"></dashboll-ball>
        <span class="wordmark">dashbo<span class="brand-l brand-l-1">l</span><span class="brand-l brand-l-2">l</span></span>
      </a>
      <ul>
        <li><a href="/#producto">Producto</a></li>
        <li><a href="/#multideporte">Multideporte</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/#precios">Planes</a></li>
      </ul>
      <a href="/#demo" class="cta">Reservar demo</a>
    </div>
  </nav>

  <main class="blog-post">
    <article>
      <div class="container container-narrow">
        <nav class="breadcrumbs" aria-label="Migas de pan">
          <a href="/">Inicio</a>
          <span aria-hidden="true">·</span>
          <a href="/blog">Blog</a>
          <span aria-hidden="true">·</span>
          <span>${p.category}</span>
        </nav>
        <header class="post-header">
          <span class="post-category">${p.category} · ${p.readTime} min de lectura</span>
          <h1>${p.title}</h1>
          <p class="post-excerpt">${p.excerpt}</p>
          <time datetime="${p.date}" class="post-date">${p.date}</time>
        </header>
        <div class="post-body">
${sections}
        </div>
        <aside class="post-cta">
          <p>${p.cta}</p>
          <a href="/#demo" class="btn btn-primary">Reservar demo</a>
        </aside>
      </div>
    </article>
  </main>

  <footer class="web-footer" aria-labelledby="footer-title">
    <div class="container">
      <h2 id="footer-title" class="visually-hidden" style="position:absolute;left:-9999px;">Pie de página</h2>
      <div class="row">
        <div>
          <div style="display:flex; align-items:center; gap: 12px; margin-bottom: var(--space-3);">
            <dashboll-ball size="40"></dashboll-ball>
            <span class="wordmark" style="font-weight: 800; font-size: var(--text-lg); letter-spacing: -0.04em; --ll-base: #ffffff;">dashbo<span class="brand-l brand-l-1">l</span><span class="brand-l brand-l-2">l</span></span>
          </div>
          <p style="font-size: var(--text-sm); color: #c2dae5; max-width: 32ch;">El sistema operativo multideporte para academias deportivas.</p>
        </div>
        <div>
          <h4>Producto</h4>
          <ul>
            <li><a href="/#producto">Funciones</a></li>
            <li><a href="/#multideporte">Multideporte</a></li>
            <li><a href="/#precios">Planes</a></li>
          </ul>
        </div>
        <div>
          <h4>Soluciones por deporte</h4>
          <ul>
            <li><a href="/padel">Pádel</a></li>
            <li><a href="/tenis">Tenis</a></li>
            <li><a href="/basket">Básket</a></li>
            <li><a href="/futbol">Fútbol base</a></li>
            <li><a href="/golf">Golf</a></li>
            <li><a href="/pickleball">Pickleball</a></li>
            <li><a href="/balonmano">Balonmano</a></li>
          </ul>
        </div>
        <div>
          <h4>Recursos</h4>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/manual">Manual de marca</a></li>
            <li><a href="mailto:hola@dashboll.app">Contacto</a></li>
          </ul>
        </div>
      </div>
      <div class="legal">
        <span>© 2026 Dashboll · Hecho en Málaga</span>
        <span>Hosted en EU · GDPR compliant</span>
      </div>
    </div>
  </footer>

</body>
</html>
`;
}

function renderIndex() {
  const cards = POSTS.map(p => `        <article class="blog-card">
          <a href="/blog/${p.slug}">
            <span class="blog-card-cat">${p.category} · ${p.readTime} min</span>
            <h2>${p.title}</h2>
            <p>${p.excerpt}</p>
            <time datetime="${p.date}">${p.date}</time>
          </a>
        </article>`).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blog Dashboll · Operación, gestión y datos para academias deportivas</title>
  <meta name="description" content="Artículos sobre cómo gestionar mejor una academia deportiva: morosidad, software, americanos, multideporte. Sin teoría — operación real.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://dashboll.vercel.app/blog">
  <meta property="og:title" content="Blog Dashboll · Operación para academias deportivas">
  <meta property="og:description" content="Cómo bajar morosidad, cuándo dejar Excel, cómo organizar americanos y más. Operación real, no teoría.">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_ES">
  <meta property="og:url" content="https://dashboll.vercel.app/blog">
  <link rel="stylesheet" href="../assets/tokens.css?v=20260504">
  <link rel="stylesheet" href="../assets/styles.css?v=20260504">
  <link rel="stylesheet" href="../assets/web.css?v=20260504">
  <link rel="stylesheet" href="../assets/blog.css?v=20260504">
  <script type="module" src="../assets/components/dashboll-ball.js?v=20260504"></script>
</head>
<body class="web-body">

  <nav class="web-nav" aria-label="Navegación principal">
    <div class="container row">
      <a href="/" class="brand" aria-label="Dashboll · Inicio">
        <dashboll-ball size="32"></dashboll-ball>
        <span class="wordmark">dashbo<span class="brand-l brand-l-1">l</span><span class="brand-l brand-l-2">l</span></span>
      </a>
      <ul>
        <li><a href="/#producto">Producto</a></li>
        <li><a href="/#multideporte">Multideporte</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/#precios">Planes</a></li>
      </ul>
      <a href="/#demo" class="cta">Reservar demo</a>
    </div>
  </nav>

  <main class="blog-index">
    <section class="blog-hero">
      <div class="container container-narrow">
        <span class="hero-eyebrow"><span class="dot"></span>Blog · Operación · Datos</span>
        <h1>Cómo gestionar mejor tu academia deportiva.</h1>
        <p class="lead">Sin teoría, sin gurús. Operación real de academias multideporte. Si gestionas pádel, tenis, básket, fútbol, golf, pickleball o balonmano, esto es para ti.</p>
      </div>
    </section>

    <section class="blog-list">
      <div class="container container-narrow">
${cards}
      </div>
    </section>
  </main>

  <footer class="web-footer" aria-labelledby="footer-title">
    <div class="container">
      <h2 id="footer-title" class="visually-hidden" style="position:absolute;left:-9999px;">Pie de página</h2>
      <div class="row">
        <div>
          <div style="display:flex; align-items:center; gap: 12px; margin-bottom: var(--space-3);">
            <dashboll-ball size="40"></dashboll-ball>
            <span class="wordmark" style="font-weight: 800; font-size: var(--text-lg); letter-spacing: -0.04em; --ll-base: #ffffff;">dashbo<span class="brand-l brand-l-1">l</span><span class="brand-l brand-l-2">l</span></span>
          </div>
          <p style="font-size: var(--text-sm); color: #c2dae5; max-width: 32ch;">El sistema operativo multideporte para academias deportivas.</p>
        </div>
        <div>
          <h4>Producto</h4>
          <ul>
            <li><a href="/#producto">Funciones</a></li>
            <li><a href="/#multideporte">Multideporte</a></li>
            <li><a href="/#precios">Planes</a></li>
          </ul>
        </div>
        <div>
          <h4>Soluciones por deporte</h4>
          <ul>
            <li><a href="/padel">Pádel</a></li>
            <li><a href="/tenis">Tenis</a></li>
            <li><a href="/basket">Básket</a></li>
            <li><a href="/futbol">Fútbol base</a></li>
            <li><a href="/golf">Golf</a></li>
            <li><a href="/pickleball">Pickleball</a></li>
            <li><a href="/balonmano">Balonmano</a></li>
          </ul>
        </div>
        <div>
          <h4>Recursos</h4>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/manual">Manual de marca</a></li>
            <li><a href="mailto:hola@dashboll.app">Contacto</a></li>
          </ul>
        </div>
      </div>
      <div class="legal">
        <span>© 2026 Dashboll · Hecho en Málaga</span>
        <span>Hosted en EU · GDPR compliant</span>
      </div>
    </div>
  </footer>

</body>
</html>
`;
}

await mkdir(resolve(ROOT, 'blog'), { recursive: true });
await writeFile(resolve(ROOT, 'blog/index.html'), renderIndex(), 'utf8');
console.log(`✓ blog/index.html`);

for (const p of POSTS) {
  await writeFile(resolve(ROOT, `blog/${p.slug}.html`), renderPost(p), 'utf8');
  console.log(`✓ blog/${p.slug}.html`);
}

console.log(`\n${POSTS.length} posts + índice generados.`);
