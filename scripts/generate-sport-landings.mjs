import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SPORTS = {
  tenis: {
    slug: 'tenis',
    sport: 'tennis',
    label: 'Tenis',
    eyebrowSport: 'Tenis',
    title: 'Software de gestión para academias de tenis | Dashboll',
    metaDesc: 'Software para academias y escuelas de tenis: agenda de pistas, individual y dobles, niveles federación, ranking interno, cobro de cuotas, comunicación con alumnos y app móvil. Multideporte.',
    h1Kw: 'Software de gestión para academias de tenis',
    sub: 'Reserva de pistas, <strong>individual y dobles</strong>, control de niveles federación y ranking interno, cobro de cuotas, comunicación con padres y alumnos, y app móvil. Para escuelas de tenis y clubes que quieren operar sin Excel.',
    secondaryCtaLabel: 'Ver funciones de tenis',
    problems: [
      { num: '01', h: 'Pistas vacías que nadie cubre.', p: 'Una baja a las 17:30 deja la pista vacía a las 18:00. Nadie sabe que está libre y se pierde la facturación de la hora.', r: 'Detecto el hueco y propongo 4 alumnos que encajan por nivel, horario y disponibilidad. Tú confirmas.' },
      { num: '02', h: 'Niveles y rankings en cuadernos.', p: 'Cada coach tiene su propia hoja de niveles. Cuando un alumno cambia de grupo, nadie tiene la foto completa de su evolución.', r: 'Mantengo el nivel federación y un ranking interno por categoría. Visible para coach y alumno desde la app.' },
      { num: '03', h: 'Cuotas que se escapan cada mes.', p: 'Cobros a final de mes en efectivo o transferencia. Recordatorios manuales por WhatsApp. La cuenta del banco no cuadra con la matrícula.', r: 'Domiciliación SEPA + Stripe + wallet interno. Morosidad cae al 4-6% sin perseguir a nadie.' }
    ],
    features: [
      { h: 'Reserva inteligente de pistas', p: 'Ocupación en tiempo real, alertas de huecos, propuesta automática de alumnos por nivel y horario compatible.' },
      { h: 'Individual y dobles', p: 'Soporta clases individuales, dobles, grupales y entreno técnico. Cada formato con su lógica de cupo y precio.' },
      { h: 'Niveles federación + ranking interno', p: 'Niveles RFET por jugador, evolución mensual, ranking interno de academia. Los alumnos ven su progreso desde la app.' },
      { h: 'Cobros automáticos · SEPA + Stripe', p: 'Domiciliación SEPA para cuotas mensuales. Stripe para clases sueltas y bonos. Wallet interno para créditos y compensaciones.' },
      { h: 'Comunicación · WhatsApp + push + email', p: 'Mensajes a padres y alumnos desde un solo sitio. Confirmaciones, cancelaciones y recordatorios automáticos.' },
      { h: 'App iOS + Android para alumnos', p: 'Reservar pista, apuntarse a torneos, ver historial, pagar bono. Tu marca, tu app — los alumnos no salen del ecosistema.' }
    ],
    roleBoardTitle: 'Ocupación · Hoy',
    rolePlayerTitle: 'Tu próxima clase',
    rolePlayerCategory: 'Iniciación · pista 3',
    faqs: [
      { q: '¿Soporta clases individuales, dobles y entreno técnico?', a: 'Sí. Cada formato tiene su propio cupo, duración y precio. El sistema elige automáticamente la pista según el formato y el coach.' },
      { q: '¿Puedo migrar mis datos desde Excel o desde otro software?', a: 'Sí. Importamos alumnos, cuotas, asistencia e historial desde Excel, Resasports, Playtomic y la mayoría de gestores. Onboarding completo en 14 días.' },
      { q: '¿Funciona si gestiono tenis y otro deporte (pádel, pickleball)?', a: 'Sí. Dashboll es multideporte por diseño. Una academia con pistas de tenis y pádel puede gestionarlas desde un único panel — los alumnos pueden inscribirse en ambos con la misma cuenta.' },
      { q: '¿Cuánto tarda en reducirse la morosidad?', a: 'Las academias que operan con domiciliación SEPA + wallet interno reducen su morosidad al 4-6% en los primeros 3 meses, partiendo del 15-20% habitual cuando se cobra a mano.' },
      { q: '¿Necesito instalar algo o me da una app?', a: 'No instalas nada. El panel es web (funciona en cualquier navegador). Para tus alumnos hay una app iOS + Android lista, con tu marca, sin coste adicional.' }
    ],
    finalH2: 'Empieza con tu academia de tenis en 14 días.'
  },

  basket: {
    slug: 'basket',
    sport: 'basket',
    label: 'Básket',
    eyebrowSport: 'Básket',
    title: 'Software de gestión para academias de básket | Dashboll',
    metaDesc: 'Software para academias y escuelas de básket: equipos por categoría, fichas de alumnos, asistencia, ligas internas, cobro de cuotas, comunicación con padres y app móvil. Multideporte.',
    h1Kw: 'Software de gestión para academias de básket',
    sub: 'Gestiona equipos por edad y categoría, control de asistencia por entrenamiento, ligas internas, cobro de cuotas, comunicación con padres y app móvil. Para escuelas de básket y clubes deportivos.',
    secondaryCtaLabel: 'Ver funciones de básket',
    problems: [
      { num: '01', h: 'Asistencia por entrenamiento perdida.', p: 'Cada coach lleva la lista en una libreta. Al final del trimestre, nadie sabe cuántas faltas acumula cada alumno.', r: 'Asistencia automática por sesión. Faltas, retrasos y justificantes en el panel y en la app del padre.' },
      { num: '02', h: 'Equipos y categorías mal cuadrados.', p: 'Mover un alumno entre alevines, infantiles y cadetes a mitad de temporada implica rehacer fichas y cuotas a mano.', r: 'Cambio de equipo en un clic. Cuota, calendario y comunicación se ajustan automáticamente.' },
      { num: '03', h: 'Cuotas trimestrales que no se cobran.', p: 'Padres que pagan a final del trimestre, recordatorios por WhatsApp, transferencias que se mezclan con cobros del bar.', r: 'Domiciliación SEPA por cuota mensual o trimestral. Wallet familiar si hay hermanos. Conciliación automática.' }
    ],
    features: [
      { h: 'Equipos por categoría y edad', p: 'Premini, mini, alevín, infantil, cadete, junior, sénior. Cada equipo con su entrenador, su pista y su calendario.' },
      { h: 'Asistencia automática por entrenamiento', p: 'Marca asistencia desde el panel o desde la app. Faltas, retrasos y justificantes accesibles para coach y padre.' },
      { h: 'Ligas internas + competiciones externas', p: 'Genera calendario de liga interna por categoría. Sincroniza partidos de federación. Resultados, clasificación y MVP en automático.' },
      { h: 'Cobros automáticos · SEPA + wallet familiar', p: 'Domiciliación SEPA mensual o trimestral. Wallet familiar para hermanos en la misma academia. Stripe para clases sueltas.' },
      { h: 'Comunicación a padres y alumnos', p: 'WhatsApp, push y email desde un solo sitio. Avisos de partido, cambios de horario, cancelaciones por lluvia.' },
      { h: 'App iOS + Android', p: 'Padres y alumnos ven calendario, asistencia, pagos y resultados. Tu marca, tu app, sin coste adicional.' }
    ],
    roleBoardTitle: 'Entrenamientos · Hoy',
    rolePlayerTitle: 'Tu próximo entrenamiento',
    rolePlayerCategory: 'Mini · pista 2',
    faqs: [
      { q: '¿Soporta varias categorías y equipos en la misma academia?', a: 'Sí. Premini hasta sénior, masculino y femenino, una o varias categorías por edad. Cada equipo con su entrenador, calendario y cuota.' },
      { q: '¿Puedo migrar mis datos desde Excel o desde otro software?', a: 'Sí. Importamos alumnos, cuotas, equipos, asistencia e historial desde Excel y la mayoría de gestores deportivos. Onboarding completo en 14 días.' },
      { q: '¿Funciona si gestiono básket y otro deporte?', a: 'Sí. Dashboll es multideporte por diseño. Un club con secciones de básket, fútbol y voleibol gestiona todo desde un único panel.' },
      { q: '¿Cómo se gestionan las familias con varios hermanos?', a: 'Wallet familiar único. Pagas una vez y se reparte entre las cuotas de cada hermano. Comunicaciones consolidadas a un solo email/WhatsApp.' },
      { q: '¿Necesito instalar algo o me da una app?', a: 'No instalas nada. El panel es web. Para padres y alumnos hay una app iOS + Android lista, con tu marca, sin coste adicional.' }
    ],
    finalH2: 'Empieza con tu academia de básket en 14 días.'
  },

  futbol: {
    slug: 'futbol',
    sport: 'football',
    label: 'Fútbol',
    eyebrowSport: 'Fútbol base',
    title: 'Software de gestión para escuelas de fútbol base | Dashboll',
    metaDesc: 'Software para escuelas de fútbol base y clubes: equipos por categoría, fichas de jugadores, asistencia, partidos, ligas, cobro de cuotas, comunicación con padres y app móvil.',
    h1Kw: 'Software de gestión para escuelas de fútbol base',
    sub: 'Gestiona equipos prebenjamín a juvenil, control de asistencia, partidos y ligas, cobro de cuotas a las familias, comunicación con padres y app móvil. Para escuelas y clubes de fútbol base.',
    secondaryCtaLabel: 'Ver funciones de fútbol',
    problems: [
      { num: '01', h: 'Excel + grupos de WhatsApp por equipo.', p: 'Cada coach tiene su grupo de WhatsApp con padres. La información se duplica, se pierde y nadie tiene la foto completa.', r: 'Comunicación centralizada por equipo y categoría. WhatsApp, push y email desde un solo sitio.' },
      { num: '02', h: 'Fichas y licencias federativas.', p: 'Renovar la licencia federativa de 200 jugadores cada temporada con DNI, foto, autorización médica y firma del padre es una pesadilla en papel.', r: 'Ficha digital con DNI, foto, autorización y firma. Renovación masiva en un clic. Exportación al formato de la federación.' },
      { num: '03', h: 'Cobros que se mezclan con la equipación.', p: 'Cuota mensual + equipación + extras (torneos, viajes). Padres que pagan a destiempo, transferencias sin concepto, conciliación imposible.', r: 'Cuotas + extras por separado en wallet familiar. Domiciliación SEPA mensual. Conciliación automática por concepto.' }
    ],
    features: [
      { h: 'Equipos por categoría · prebenjamín a juvenil', p: 'Una sección por categoría y género. Cada equipo con su entrenador, su campo, su calendario y sus cuotas específicas.' },
      { h: 'Fichas federativas digitales', p: 'DNI, foto, autorización médica, firma del padre. Renovación masiva. Exportación al formato de tu federación territorial.' },
      { h: 'Asistencia por entrenamiento y partido', p: 'Marca asistencia desde el panel o el móvil. Faltas, retrasos y justificantes accesibles para padres y coordinador.' },
      { h: 'Cobros automáticos · SEPA + wallet familiar', p: 'Cuota mensual por domiciliación SEPA. Wallet familiar para hermanos. Extras (equipación, torneos) cobrados aparte sin mezclar.' },
      { h: 'Comunicación masiva sin caos', p: 'Mensajes por equipo, categoría o club entero. WhatsApp, push y email. Sin grupos paralelos.' },
      { h: 'App iOS + Android', p: 'Padres y jugadores ven calendario, asistencia, pagos, resultados, fotos del partido. Tu marca, sin coste adicional.' }
    ],
    roleBoardTitle: 'Entrenamientos · Hoy',
    rolePlayerTitle: 'Tu próximo partido',
    rolePlayerCategory: 'Alevín A · campo 1',
    faqs: [
      { q: '¿Soporta todas las categorías de fútbol base?', a: 'Sí. Desde prebenjamín hasta juvenil, masculino y femenino. Cada equipo con su categoría federativa, calendario y cuota.' },
      { q: '¿Genera fichas federativas en el formato de mi federación?', a: 'Sí. Exportamos al formato de las principales federaciones territoriales (RFEF, FFCV, FCF, FAF...). Si la tuya no está soportada, la añadimos en el onboarding.' },
      { q: '¿Cómo se gestionan los pagos extra (equipación, torneos)?', a: 'En wallet familiar separado de la cuota base. Padres ven cada cargo con su concepto. Tú concilias automáticamente por categoría.' },
      { q: '¿Funciona si gestiono fútbol y otro deporte?', a: 'Sí. Dashboll es multideporte. Clubes con secciones de fútbol, baloncesto, voleibol o pádel gestionan todo desde un único panel.' },
      { q: '¿Necesito instalar algo o me da una app?', a: 'No instalas nada. El panel es web. Para padres y jugadores hay una app iOS + Android lista, con tu marca, sin coste adicional.' }
    ],
    finalH2: 'Empieza con tu escuela de fútbol en 14 días.'
  },

  golf: {
    slug: 'golf',
    sport: 'golf',
    label: 'Golf',
    eyebrowSport: 'Golf',
    title: 'Software de gestión para escuelas y clubes de golf | Dashboll',
    metaDesc: 'Software para academias y escuelas de golf: tee times, handicap, clases individuales y de grupo, cobro de cuotas y green fees, comunicación con socios y app móvil. Multideporte.',
    h1Kw: 'Software de gestión para escuelas y clubes de golf',
    sub: 'Reserva de tee times, control de handicap RFEG, clases individuales y de grupo, cobro de cuotas y green fees, comunicación con socios y app móvil. Para academias y clubes de golf.',
    secondaryCtaLabel: 'Ver funciones de golf',
    problems: [
      { num: '01', h: 'Tee times por teléfono y libreta.', p: 'Reservas por llamada, anotadas en una libreta del pro shop. Cancelaciones que no llegan, tee times duplicados, slots perdidos.', r: 'Reserva online de tee times desde la app. Cancelaciones en cadena automáticas. Hueco libre = aviso a lista de espera.' },
      { num: '02', h: 'Handicap fuera del software.', p: 'El handicap de cada socio en una hoja de Excel del coordinador. Cuando un alumno baja un golpe, hay que avisar a todos los profes a mano.', r: 'Handicap RFEG sincronizado por jugador. Histórico de tarjetas, evolución mensual y proyección de bajada visible para socio y coach.' },
      { num: '03', h: 'Cuotas anuales y green fees mezclados.', p: 'Socios con cuota anual + green fees diarios + clases sueltas. Tres flujos de caja distintos en el mismo Excel — y la conciliación bancaria, un sufrimiento.', r: 'Cuota anual SEPA, green fees con Stripe, clases con wallet. Cada flujo separado y conciliado automáticamente.' }
    ],
    features: [
      { h: 'Reserva online de tee times', p: 'Hoyo de salida, número de jugadores, buggy, caddy. Vista de calendario por hora, día y semana. Cancelaciones con preaviso configurable.' },
      { h: 'Handicap RFEG sincronizado', p: 'Histórico de tarjetas, evolución mensual, ranking interno del club. Sincronización con la federación cuando esté disponible.' },
      { h: 'Clases individuales y de grupo', p: 'Pro shop con horarios de cada profesional. Reserva de hora con un coach específico. Clases de iniciación, perfeccionamiento y técnico.' },
      { h: 'Cuotas + green fees + extras', p: 'Cuota anual de socio (SEPA). Green fees por día (Stripe). Clases por bono (wallet). Cada flujo separado, conciliado y reportable.' },
      { h: 'Comunicación con socios', p: 'Avisos de torneo, cambios en el campo, ofertas de green fee. WhatsApp, push y email segmentado por handicap o categoría de socio.' },
      { h: 'App iOS + Android para socios', p: 'Reservar tee time, ver handicap, registrar tarjeta, pagar green fee. Tu marca, tu app, sin coste adicional.' }
    ],
    roleBoardTitle: 'Tee times · Hoy',
    rolePlayerTitle: 'Tu próxima salida',
    rolePlayerCategory: 'Hoyo 1 · 09:30',
    faqs: [
      { q: '¿Soporta tee times con varios formatos (foursome, individual)?', a: 'Sí. Configura cupo por slot, formato de salida y normas del campo. Cada socio reserva según su categoría y handicap.' },
      { q: '¿Sincroniza el handicap con la RFEG?', a: 'Mantenemos el handicap por socio con histórico de tarjetas y proyección. La sincronización con RFEG depende de la API disponible — está en el roadmap Q3 2026.' },
      { q: '¿Cómo se separan las cuotas de socio de los green fees?', a: 'Cuota anual de socio por SEPA, green fees diarios por Stripe, clases por wallet. Tres flujos distintos en la misma cuenta y conciliados por concepto.' },
      { q: '¿Funciona si gestiono golf y otro deporte (pádel, tenis)?', a: 'Sí. Clubes mixtos con secciones de golf, pádel y tenis gestionan todo desde un único panel. Los socios usan la misma cuenta para reservar en cualquier deporte.' },
      { q: '¿Necesito instalar algo o me da una app?', a: 'No instalas nada. El panel es web. Para socios hay una app iOS + Android con tu marca, sin coste adicional.' }
    ],
    finalH2: 'Empieza con tu club de golf en 14 días.'
  },

  pickleball: {
    slug: 'pickleball',
    sport: 'pickleball',
    label: 'Pickleball',
    eyebrowSport: 'Pickleball',
    title: 'Software de gestión para academias de pickleball | Dashboll',
    metaDesc: 'Software para academias y clubes de pickleball: agenda de pistas, dobles y mixto, ratings DUPR, cobro de cuotas, comunicación con jugadores y app móvil. Multideporte.',
    h1Kw: 'Software de gestión para academias de pickleball',
    sub: 'Reserva de pistas, dobles y mixto, ratings DUPR por jugador, cobro de cuotas, comunicación con alumnos y app móvil. Para academias y clubes de pickleball que crecen rápido.',
    secondaryCtaLabel: 'Ver funciones de pickleball',
    problems: [
      { num: '01', h: 'Demanda explosiva, gestión manual.', p: 'El pickleball crece a doble dígito y tu academia con él. Pero las pistas siguen reservándose por WhatsApp y el Excel ya no se cierra.', r: 'Reserva online en tiempo real. Capacidad para gestionar el doble de jugadores sin contratar más personal.' },
      { num: '02', h: 'Niveles DUPR fuera del sistema.', p: 'Cada jugador con su rating DUPR en una hoja aparte. Emparejar para mixto o dobles equilibrados es un puzzle semanal.', r: 'Rating DUPR (o interno) por jugador. Empareja automáticamente por nivel y disponibilidad para mixtos, dobles y americanos.' },
      { num: '03', h: 'Cuotas y bonos descuadrados.', p: 'Cuota mensual + bono de 10 clases + green fee diario. Tres modos de cobro, conciliación bancaria a mano cada viernes.', r: 'SEPA mensual, Stripe para clases sueltas, wallet de bonos. Cada modo separado y conciliado automáticamente.' }
    ],
    features: [
      { h: 'Reserva inteligente de pistas', p: 'Ocupación en tiempo real, alertas de huecos, propuesta automática de jugadores por rating compatible.' },
      { h: 'Dobles, mixto y americano', p: 'Emparejamiento automático por nivel DUPR (o interno) y disponibilidad. Cuadros y americanos en un clic.' },
      { h: 'Ratings DUPR + ranking interno', p: 'Mantén el rating DUPR por jugador, evolución mensual y ranking interno de academia visible en la app.' },
      { h: 'Cobros automáticos · SEPA + Stripe', p: 'Cuota mensual SEPA, clases sueltas Stripe, bonos en wallet. Cada flujo separado y conciliado.' },
      { h: 'Comunicación con jugadores', p: 'Avisos de torneo, huecos disponibles, ofertas de bono. WhatsApp, push y email segmentado por rating.' },
      { h: 'App iOS + Android para jugadores', p: 'Reservar pista, apuntarse a americano, ver rating, pagar bono. Tu marca, sin coste adicional.' }
    ],
    roleBoardTitle: 'Ocupación · Hoy',
    rolePlayerTitle: 'Tu próximo americano',
    rolePlayerCategory: 'Mixto 3.5 · pista 2',
    faqs: [
      { q: '¿Soporta dobles, mixto y americano?', a: 'Sí. Generamos cuadros y americanos automáticamente con los inscritos, equilibrados por rating DUPR o interno. Reorganizamos en 1 clic si alguien cancela.' },
      { q: '¿Puedo migrar mis datos desde Excel u otra herramienta?', a: 'Sí. Importamos jugadores, ratings, cuotas e historial desde Excel y los principales gestores deportivos. Onboarding completo en 14 días.' },
      { q: '¿Funciona si gestiono pickleball y otro deporte?', a: 'Sí. Dashboll es multideporte por diseño. Clubes con pistas de pickleball + pádel + tenis gestionan todo desde un único panel.' },
      { q: '¿Cuánto tarda en reducirse la morosidad?', a: 'Las academias que operan con domiciliación SEPA + wallet interno reducen su morosidad al 4-6% en los primeros 3 meses.' },
      { q: '¿Necesito instalar algo o me da una app?', a: 'No instalas nada. El panel es web. Para jugadores hay una app iOS + Android con tu marca, sin coste adicional.' }
    ],
    finalH2: 'Empieza con tu academia de pickleball en 14 días.'
  },

  balonmano: {
    slug: 'balonmano',
    sport: 'handball',
    label: 'Balonmano',
    eyebrowSport: 'Balonmano',
    title: 'Software de gestión para clubes de balonmano | Dashboll',
    metaDesc: 'Software para clubes y escuelas de balonmano: equipos por categoría, fichas, asistencia, partidos y ligas, cobro de cuotas, comunicación con padres y app móvil. Multideporte.',
    h1Kw: 'Software de gestión para clubes de balonmano',
    sub: 'Gestiona equipos por edad, control de asistencia, partidos y ligas, cobro de cuotas a las familias, comunicación con padres y app móvil. Para clubes y escuelas de balonmano.',
    secondaryCtaLabel: 'Ver funciones de balonmano',
    problems: [
      { num: '01', h: 'Asistencia y posiciones a mano.', p: 'Cada coach apunta asistencia y posiciones en una libreta. Al final del trimestre, los datos están dispersos y nadie tiene la foto del equipo.', r: 'Asistencia automática por entrenamiento, ficha de posición por jugador, evolución mensual visible en panel y app.' },
      { num: '02', h: 'Fichas federativas y licencias.', p: 'Renovar licencias de 100+ jugadores cada temporada con DNI, foto, autorización médica y firma del padre — un mes de papeleo.', r: 'Ficha digital con DNI, foto, autorización y firma. Renovación masiva. Exportación al formato de la federación.' },
      { num: '03', h: 'Cuotas y extras descuadrados.', p: 'Cuota mensual + equipación + viajes a torneos. Padres que pagan a destiempo, transferencias sin concepto, conciliación imposible.', r: 'Cuotas + extras por separado en wallet familiar. SEPA mensual. Conciliación automática por concepto.' }
    ],
    features: [
      { h: 'Equipos por categoría', p: 'Mini, infantil, cadete, juvenil, sénior. Cada equipo con su entrenador, su pista y su calendario propio.' },
      { h: 'Fichas federativas digitales', p: 'DNI, foto, autorización médica, firma del padre. Renovación masiva. Exportación al formato de la RFEBM o tu federación territorial.' },
      { h: 'Asistencia por entrenamiento y partido', p: 'Marca asistencia desde el panel o el móvil. Faltas, retrasos y justificantes accesibles para padres y coordinador.' },
      { h: 'Cobros automáticos · SEPA + wallet familiar', p: 'Cuota mensual o trimestral por SEPA. Wallet familiar para hermanos. Extras (equipación, torneos) cobrados aparte sin mezclar.' },
      { h: 'Ligas internas + competiciones externas', p: 'Calendario de liga interna por categoría. Sincroniza partidos federativos. Resultados, clasificación y MVP en automático.' },
      { h: 'App iOS + Android', p: 'Padres y jugadores ven calendario, asistencia, pagos, resultados. Tu marca, tu app, sin coste adicional.' }
    ],
    roleBoardTitle: 'Entrenamientos · Hoy',
    rolePlayerTitle: 'Tu próximo partido',
    rolePlayerCategory: 'Cadete · pabellón A',
    faqs: [
      { q: '¿Soporta todas las categorías de balonmano base y sénior?', a: 'Sí. Desde mini hasta sénior, masculino y femenino. Cada equipo con su categoría federativa, calendario y cuota.' },
      { q: '¿Genera fichas federativas en el formato de la RFEBM?', a: 'Sí. Exportamos al formato de la RFEBM y las principales federaciones territoriales. Si la tuya no está soportada, la añadimos en el onboarding.' },
      { q: '¿Cómo se gestionan los pagos extra (equipación, torneos)?', a: 'En wallet familiar separado de la cuota base. Padres ven cada cargo con su concepto. Tú concilias automáticamente por categoría.' },
      { q: '¿Funciona si gestiono balonmano y otro deporte?', a: 'Sí. Clubes polideportivos con secciones de balonmano, fútbol o baloncesto gestionan todo desde un único panel.' },
      { q: '¿Necesito instalar algo o me da una app?', a: 'No instalas nada. El panel es web. Para padres y jugadores hay una app iOS + Android con tu marca, sin coste adicional.' }
    ],
    finalH2: 'Empieza con tu club de balonmano en 14 días.'
  }
};

function renderProblem(p) {
  return `          <article class="problem-card">
            <span class="label">PROBLEMA ${p.num}</span>
            <h3>${p.h}</h3>
            <p>${p.p}</p>
            <div class="says">
              <dashboll-ball size="32"></dashboll-ball>
              <strong>Dashboll:</strong> ${p.r}
            </div>
          </article>`;
}

function renderFeature(f) {
  return `          <div class="feature-card" style="background: white; padding: var(--space-6); border-radius: 12px; border: 1px solid #e5e7eb;">
            <h3>${f.h}</h3>
            <p>${f.p}</p>
          </div>`;
}

function renderFaq(f) {
  return `          <details class="faq-item" style="border-bottom: 1px solid #e5e7eb; padding: var(--space-4) 0;">
            <summary style="cursor: pointer; font-weight: 700; font-size: var(--text-md);">${f.q}</summary>
            <p style="margin-top: var(--space-3); color: #4b5563;">${f.a}</p>
          </details>`;
}

function renderFaqSchema(faqs) {
  const items = faqs.map(f => `        { "@type": "Question", "name": ${JSON.stringify(f.q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} } }`).join(',\n');
  return `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
${items}
      ]
    }
    </script>`;
}

function renderLanding(s) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${s.title}</title>
  <meta name="description" content="${s.metaDesc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://dashboll.vercel.app/${s.slug}">
  <meta property="og:title" content="${s.title}">
  <meta property="og:description" content="${s.metaDesc}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_ES">
  <meta property="og:url" content="https://dashboll.vercel.app/${s.slug}">
  <link rel="stylesheet" href="assets/tokens.css?v=20260504">
  <link rel="stylesheet" href="assets/styles.css?v=20260504">
  <link rel="stylesheet" href="assets/web.css?v=20260504">
  <script type="module" src="assets/components/dashboll-ball.js?v=20260504"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dashboll · ${s.label}",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "description": ${JSON.stringify(s.metaDesc)},
    "offers": {
      "@type": "Offer",
      "price": "44",
      "priceCurrency": "EUR"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Dashboll", "item": "https://dashboll.vercel.app/" },
      { "@type": "ListItem", "position": 2, "name": ${JSON.stringify(s.h1Kw)}, "item": "https://dashboll.vercel.app/${s.slug}" }
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
        <li><a href="/#precios">Planes</a></li>
        <li><a href="/#faq">FAQ</a></li>
      </ul>
      <a href="/#demo" class="cta">Reservar demo</a>
    </div>
  </nav>

  <main>

    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-grid">
          <div>
            <span class="hero-eyebrow">
              <span class="dot"></span>
              ${s.eyebrowSport} · Multideporte · IA en cada flujo
            </span>
            <h1 id="hero-title">
              <span class="hero-h1-kw">${s.h1Kw}</span>
              <span class="hero-h1-tag">La pelota está en tu panel.</span>
            </h1>
            <p class="sub">${s.sub}</p>
            <div class="hero-ctas">
              <a href="/#demo" class="btn btn-primary">Reservar demo</a>
              <a href="#funciones" class="btn btn-secondary">${s.secondaryCtaLabel}</a>
            </div>
            <div class="hero-trust">
              <span>Sin tarjeta</span>
              <span>Onboarding en 14 días</span>
              <span>App iOS + Android</span>
            </div>
          </div>
          <div class="hero-balls">
            <div class="main">
              <dashboll-ball sport="${s.sport}" size="380"></dashboll-ball>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="resuelve" id="problemas" aria-labelledby="prob-title" style="padding: var(--space-9) 0;">
      <div class="container">
        <h2 id="prob-title">Tres problemas que viven cada semana las academias de ${s.label.toLowerCase()}.</h2>
        <p class="lead">Excel, WhatsApp y libreta. Tres herramientas para gestionar lo mismo, ninguna conectada.</p>
        <div class="problems-grid" style="margin-top: var(--space-7); display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5);">
${s.problems.map(renderProblem).join('\n')}
        </div>
      </div>
    </section>

    <section class="decide" id="funciones" aria-labelledby="func-title" style="padding: var(--space-9) 0; background: var(--foam);">
      <div class="container">
        <h2 id="func-title">Funciones pensadas para clubes y academias de <strong>${s.label.toLowerCase()}</strong>.</h2>
        <p class="lead">Todo lo que pides al final del mes — pero ya hecho.</p>
        <div class="features-grid" style="margin-top: var(--space-7); display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-5);">
${s.features.map(renderFeature).join('\n')}
        </div>
      </div>
    </section>

    <section class="resuelve" id="roles" aria-labelledby="roles-title" style="padding: var(--space-9) 0;">
      <div class="container">
        <h2 id="roles-title">Una academia de ${s.label.toLowerCase()}. Tres roles. Un solo panel.</h2>
        <p class="lead">Cada perfil ve lo que necesita ver. El head coach manda. El entrenador ejecuta. El jugador reserva.</p>
        <div class="roles-grid" style="margin-top: var(--space-7); display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4);">
          <div style="background: var(--deep); border-radius: 12px; padding: var(--space-5); color: white;">
            <span class="label" style="color: var(--cyan-accent);">VISTA · HEAD COACH</span>
            <h3 style="color: white; margin-top: var(--space-2); font-size: var(--text-md);">${s.roleBoardTitle}</h3>
            <div class="mono" style="margin-top: var(--space-3); display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
              <div>09:00 · 100%</div>
              <div>10:30 · 100%</div>
              <div>18:00 · <span style="color: #fbbf24;">050%</span></div>
              <div>19:30 · 100%</div>
            </div>
            <div style="margin-top: var(--space-4); padding-top: var(--space-3); border-top: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: var(--space-2);">
              <dashboll-ball size="32"></dashboll-ball>
              <div style="font-size: 10px;">3 huecos. Te propongo 4 perfiles.</div>
            </div>
          </div>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: var(--space-5);">
            <span class="label">VISTA · ENTRENADOR</span>
            <h3 style="margin-top: var(--space-2); font-size: var(--text-md);">Mañana</h3>
            <div style="margin-top: var(--space-3); display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
              <div style="padding: 6px 8px; background: var(--foam); border-radius: 4px;">
                <strong>10:00</strong><br>
                <span style="color: #6b7280; font-size: 10px;">Carla, Miguel, Sofía, Iván</span>
              </div>
              <div style="padding: 6px 8px; background: var(--foam); border-radius: 4px;">
                <strong>12:00</strong><br>
                <span style="color: #6b7280; font-size: 10px;">3 alumnos · 1 falta</span>
              </div>
            </div>
            <div style="margin-top: var(--space-4); padding-top: var(--space-3); border-top: 1px solid #e5e7eb; display: flex; align-items: center; gap: var(--space-2);">
              <dashboll-ball size="32"></dashboll-ball>
              <div style="font-size: 10px; color: #6b7280;">Marcaré asistencia automática.</div>
            </div>
          </div>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: var(--space-5);">
            <span class="label">VISTA · JUGADOR</span>
            <h3 style="margin-top: var(--space-2); font-size: var(--text-md);">${s.rolePlayerTitle}</h3>
            <div style="margin-top: var(--space-3); padding: var(--space-3); background: var(--foam); border-radius: 6px;">
              <div class="mono" style="font-size: 10px; color: var(--brew-blue); letter-spacing: 0.10em;">JUEVES 04 · 19:30</div>
              <div style="margin-top: 2px; font-weight: 700; font-size: 13px;">${s.rolePlayerCategory}</div>
              <div style="font-size: 11px; color: #6b7280;">Eduardo M. · 4 jugadores</div>
            </div>
            <div style="margin-top: var(--space-4); display: flex; align-items: center; gap: var(--space-2);">
              <dashboll-ball size="32"></dashboll-ball>
              <div style="font-size: 10px; color: #6b7280;">Confirmada. Nos vemos a las 19:30.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="faq" id="faq" aria-labelledby="faq-title" style="padding: var(--space-9) 0; background: var(--foam);">
      <div class="container">
        <h2 id="faq-title">Preguntas frecuentes de academias de ${s.label.toLowerCase()}</h2>
        <div class="faq-list" style="margin-top: var(--space-7); max-width: 80ch;">
${s.faqs.map(renderFaq).join('\n')}
        </div>
      </div>
    </section>

${renderFaqSchema(s.faqs)}

    <section class="final-cta" style="padding: var(--space-9) 0; background: var(--deep); color: white; text-align: center;">
      <div class="container">
        <h2 style="color: white; margin-bottom: var(--space-4);">${s.finalH2}</h2>
        <p style="max-width: 60ch; margin: 0 auto var(--space-6); font-size: var(--text-md); color: #c2dae5;">Migramos tus alumnos, cuotas e historial desde Excel o tu gestor actual. Operativo el día 14, optimizado con IA el día 30.</p>
        <a href="/#demo" class="btn btn-primary" style="background: var(--cyan-accent); color: var(--deep);">Reservar demo</a>
        <div class="micro" style="margin-top: var(--space-5); font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: 0.18em; color: rgba(255,255,255,0.55);">SIN TARJETA · 30 DÍAS DE PRUEBA · CANCELA CUANDO QUIERAS</div>
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
          <h4>Legal</h4>
          <ul>
            <li><a href="/#privacidad">Privacidad</a></li>
            <li><a href="/#terminos">Términos</a></li>
            <li><a href="/#cookies">Cookies</a></li>
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

for (const [key, s] of Object.entries(SPORTS)) {
  const html = renderLanding(s);
  const out = resolve(ROOT, `${s.slug}.html`);
  await writeFile(out, html, 'utf8');
  console.log(`✓ ${out}`);
}

console.log(`\n${Object.keys(SPORTS).length} landings generadas.`);
