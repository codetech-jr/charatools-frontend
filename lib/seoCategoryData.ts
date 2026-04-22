/**
 * @file lib/seoCategoryData.ts
 * @description Diccionario de textos SEO por slug de categoría.
 *
 * Arquitectura:
 * - La CLAVE es el slug de categoría (mismo valor que CatalogProduct.category).
 * - El VALOR contiene todo el copy persuasivo para Hero y Footer.
 * - Programación defensiva: el consumidor accede con `seoCategoryData[slug]`
 *   y recibe `undefined` si la categoría aún no tiene copy — SIN errores.
 *
 * Para añadir una nueva categoría:
 *   1. Añadir la clave con el slug exacto (ej: "plomeria").
 *   2. Rellenar todos los campos del tipo `SeoCategoryEntry`.
 *   3. Commit y listo — sin tocar ningún componente.
 *
 * Futura migración a CMS:
 *   Reemplazar este objeto por un fetch a Strapi/Sanity/Contentful
 *   manteniendo el mismo contrato de tipos `SeoCategoryEntry`.
 */

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface SeoBlock {
  /** Título H2. Debe incluir keyword secundaria de la categoría. */
  subtitle: string
  /**
   * Cuerpo de texto. Acepta saltos de línea con \n para multi-párrafo.
   * El componente SeoCategoryFooter splitea por \n y renderiza párrafos.
   */
  text: string
}

export interface SeoCtaSection {
  /** Título del bloque CTA (H3 o texto destacado) */
  title: string
  /** Párrafo persuasivo de cierre (beneficio + urgencia) */
  text: string
  /** Label del botón de acción */
  btnText: string
}

export interface SeoCategoryEntry {
  /** H1 de la categoría. Debe ser único por página y orientado a local SEO. */
  title: string
  /**
   * Párrafo corto de apertura (≤ 160 chars recomendado para snippet Google).
   * Se muestra siempre visible encima del grid.
   */
  description: string
  /** Bloques de contenido SEO expandibles (acordeón en mobile). */
  blocks: SeoBlock[]
  /** Sección de cierre con llamada a la acción. */
  ctaSection: SeoCtaSection
}

/**
 * Mapa de textos SEO indexado por slug de categoría.
 * `Partial<Record<...>>` garantiza que TypeScript no asuma que TODA
 * categoría tiene entry — forzando al consumidor a hacer null-check.
 */
export type SeoCategoryDataMap = Partial<Record<string, SeoCategoryEntry>>

// ── Datos ────────────────────────────────────────────────────────────────────

export const seoCategoryData: SeoCategoryDataMap = {


  // ──────────────────────────────────────────────────────────────────────────
  // Herramientas Generales
  // ──────────────────────────────────────────────────────────────────────────
  'herramientas-general': {
    title: 'Herramientas Eléctricas y Manuales: Pa\' Meterle el Pecho al Trabajo',
    description: 'Ya seas un maestro de obra levantando un proyecto, un herrero armando estructuras o un dueño de casa resolviendo, aquí encuentras el equipo que aguanta la rosca. Herramientas que no te dejan botado a mitad de jornada.',
    blocks: [
      { 
        subtitle: 'Taladros, Esmeriles y Caladoras de Alto Rendimiento', 
        text: 'Sabemos que en los Valles del Tuy el trabajo pesado no perdona. Por eso te traemos desde taladros INGCO guerreros para el día a día, hasta caladoras y esmeriles angulares Dewalt diseñados para corte limpio y continuo. Herramienta buena es inversión que se paga sola y te ahorra dolores de cabeza.' 
      },
      { 
        subtitle: 'Equipamiento para Contratistas y Talleres', 
        text: '¿Tienes una contrata o un taller que no para? Equípate con maquinaria que responda. Nuestras herramientas generales están pensadas para darle sin miedo, soportando las máximas exigencias de cualquier obra comercial o residencial en Charallave.' 
      }
    ],
    ctaSection: { 
      title: '¿Buscando un equipo específico para tu obra?', 
      text: 'Escríbenos al WhatsApp y te armamos la cotización al momento con las marcas que rinden de verdad. Inventario garantizado para que no detengas tu trabajo.', 
      btnText: 'Consultar Stock por WhatsApp' 
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Plantas Eléctricas y Energía
  // ──────────────────────────────────────────────────────────────────────────
  'plantas-electricas-y-energia': {
    title: 'Plantas Eléctricas en Charallave: Tu Solución ante los Cortes de Luz en el Tuy',
    description:
      'Sabemos lo que se siente: el bajón de luz llega sin avisar y se lleva la nevera, el negocio y la tranquilidad. En Charatools tenemos en stock, listos para despachar hoy, los mejores equipos para tu hogar y negocio en Charallave y el Tuy.',
    blocks: [
      {
        subtitle: '¿Qué planta de luz necesito para mi casa en el Tuy?',
        text:
          'Para un apartamento pequeño o habitación con pocas tomas, una planta de 950W a 1.200W es suficiente para mantener el router, luces LED y un ventilador.\n' +
          'Para proteger la nevera y agregar un equipo de aire acondicionado pequeño, necesitas entre 2.000W y 2.500W.\n' +
          'Para uso exigente (nevera + 2 aires + bomba de agua), apunta a 3.000W – 3.500W. ¿Tienes dudas? Escríbenos al WhatsApp y te ayudamos a calcular tu carga eléctrica gratis.',
      },
      {
        subtitle: 'Inversores de Corriente y Baterías: La Alternativa Silenciosa',
        text:
          'Si el ruido es un problema o vives en apartamento, los inversores con banco de baterías son tu mejor aliada.\n' +
          'Una batería de 12V 150Ah con un inversor de 1.500W puede sostener una nevera + luces LED por 5 a 7 horas continuas, sin humo, sin combustible y sin decibeles.\n' +
          'En Charatools manejamos inversores de onda pura (pure sine wave) que protegen equipos sensibles como televisores, computadoras y aires inverter.',
      },
      {
        subtitle: 'Protectores de Voltaje y UPS: Tu Primera Línea de Defensa',
        text:
          'Antes de pensar en una planta, protege los electrodomésticos que ya tienes. Un bajón de luz sin protector puede quemar la tarjeta de control de tu nevera o televisor en segundos.\n' +
          'Tenemos protectores de voltaje de alto impacto para neveras (1.200W – 3.000W), televisores y equipos sensibles, disponibles para retiro inmediato en nuestra tienda de Charallave.',
      },
    ],
    ctaSection: {
      title: 'Garantía Local en el Tuy, sin llamadas internacionales',
      text:
        'Selecciona el equipo ideal arriba y cotiza ahora con retiro en el día en nuestra ferretería matriz. Nuestros asesores técnicos te ayudan a tomar la decisión correcta sin presiones y sin letra chica.',
      btnText: '💬 Hablar con asesor vía WhatsApp',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Herramientas Eléctricas
  // ──────────────────────────────────────────────────────────────────────────
  'herramientas-electricas': {
    title: 'Herramientas Eléctricas en Charallave: Potencia Profesional al Mejor Precio',
    description:
      'Taladros, esmeriles, sierras y más de las marcas INGCO, Makita y Dewalt. Disponibilidad inmediata en Charallave con asesoría técnica sin costo para elegir la herramienta correcta para tu obra o taller.',
    blocks: [
      {
        subtitle: '¿INGCO, Makita o Dewalt? Cómo elegir tu herramienta eléctrica',
        text:
          'Para uso residencial y obras pequeñas, INGCO ofrece la mejor relación calidad-precio del mercado venezolano. Sus taladros de 550W y esmeriles de 820W son los más vendidos en el Tuy.\n' +
          'Para uso profesional intensivo (construcción diaria, talleres), Makita y Dewalt brindan mayor durabilidad y potencia. Son la elección de los maestros de obra con más exigencia.\n' +
          'En Charatools manejamos ambas líneas y te ayudamos a comparar según tu uso real.',
      },
      {
        subtitle: 'Consumibles y Accesorios para Herramientas Eléctricas',
        text:
          'Una herramienta sin sus consumibles es la mitad de la inversión. Tenemos discos de corte, discos de desbaste, brocas para concreto y madera, lijas y hojas de sierra compatibles con las marcas que manejamos.\n' +
          'Compra todo en un solo lugar y llévate tu herramienta lista para usar desde el primer día.',
      },
    ],
    ctaSection: {
      title: 'Stock físico disponible hoy en Charallave',
      text:
        'No esperes semanas por importaciones. Nuestro inventario de herramientas eléctricas está disponible para retiro inmediato o despacho rápido al Tuy y Miranda.',
      btnText: '💬 Consultar disponibilidad por WhatsApp',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Bombas de Agua y Presión
  // ──────────────────────────────────────────────────────────────────────────
  'bombas-de-agua-y-presion': {
    title: 'Bombas de Agua en Charallave: Sube el Agua al Tanque Hoy Mismo',
    description:
      'Si el agua no te llega pal\' tanque o la presión del grifo es un chorrillo miserable, ya sabes que el problema no espera. En Charatools tienes en stock bombas de agua de ½ HP y 1 HP, sumergibles, periféricas y presostatos de las marcas INGCO y Truper — las que han dado la talla en miles de casas del Tuy.',
    blocks: [
      {
        subtitle: '¿Qué bomba de agua necesito para mi casa en el Tuy?',
        text:
          'La pregunta del millón que nos hacen a diario. La respuesta sencilla: si tienes una casa de uno o dos pisos y quieres subir el agua del tanque bajo al tanque del techo, la bomba periférica de ½ HP (medio caballo) es la solución clásica y la más vendida del Tuy. Funciona perfecta pa\' ese jalón de agua que necesitas sin gastar corriente de más.\n' +
          'Si el tanque está enterrado profundo, en un sótano o en un pozo, la bomba sumergible es la indicada — entra directo al agua y empuja con fuerza. Para más de dos pisos o uso continuo de alta demanda, la bomba de 1 HP aguanta la jornada sin recalentarse.\n' +
          '¿Tienes dudas? No adivines. Escríbenos y te orientamos de una según la altura de tu casa y la distancia a tu tanque.',
      },
      {
        subtitle: 'INGCO vs Truper: ¿Cuál bomba rinde más en el día a día?',
        text:
          'Ambas marcas las vendemos en Charatools porque ambas han probado su aguante en el clima y las condiciones del Tuy. La diferencia está en el uso: INGCO destaca por su motor robusto y eficiencia eléctrica — ideal si tu bomba va a trabajar varias horas al día. Truper es una opción más económica de entrada que hace bien su trabajo para uso intermitente.\n' +
          'Para instalaciones nuevas o reemplazos donde la bomba va a trabajar duro mañana, tarde y noche, recomendamos INGCO. Para el rancho de los fines de semana o el apartamento de uso ligero, Truper cumple de maravilla sin romper el presupuesto.\n' +
          'Ven a verlas en tienda o pregunta al WhatsApp — te mostramos las especificaciones para que compres sin arrepentirte.',
      },
      {
        subtitle: 'Presostatos y Press Control: Tu Bomba Trabaja Sola, Tú Descansas',
        text:
          'Una bomba sin presostato automático es una bomba que trabaja tú. Con un press control, el sistema detecta cuándo baja la presión y arranca solo — sin que tengas que estar pendiente ni abrir y cerrar válvulas a mano.\n' +
          'Para edificios con múltiples apartamentos, negocios con consumo constante o casas donde nadie quiere lidiar con la bomba, el presostato es el complemento obligatorio. Tenemos en stock press control para bombas periféricas y centrífugas, listos para instalación inmediata.\n' +
          'Instalación sencilla que cualquier plomero del área puede hacer en menos de una hora. Ahorra tiempo, energía y prolonga la vida de tu bomba al evitar arranques en seco.',
      },
    ],
    ctaSection: {
      title: '¡No te Quedes Sin Agua Hoy: Busca tu Bomba Antes del Mediodía!',
      text:
        'El problema de agua no se arregla mañana — se arregla hoy. Escríbenos ahorita mismo al WhatsApp con el modelo de tu bomba anterior o las medidas de tu instalación, y nuestros ferreteros te tienen la solución lista pa\' retirar en el día. Stock confirmado, precio directo, sin vuelta.',
      btnText: '💬 Ver Bombas Disponibles por WhatsApp',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Plomería y Tuberías
  // ──────────────────────────────────────────────────────────────────────────
  'plomeria': {
    title: 'Plomería y Tuberías en Charallave: PVC, Llaves de Paso y Todo lo que Necesitas',
    description:
      'Cuando revienta una tubería o el juego de llaves de baño se dañó, cada minuto cuenta. En Charatools tienes tuberías PVC de todos los diámetros, llaves de bola, pegamentos, tanques cisterna y accesorios pa\' resolver ese daño de plomería hoy mismo, sin que tengas que salir a buscar en varias ferretería por todo el Tuy.',
    blocks: [
      {
        subtitle: 'Tuberías PVC para Aguas Frías, Desagüe y Presión: Guía Rápida por Diámetro',
        text:
          'No toda tubería PVC es igual — y comprar la equivocada te hace perder tiempo y dinero. Para bajantes de aguas negras y grises, el PVC sanitario de 4" (110mm) y 2" (50mm) es el estándar residencial en Venezuela. Para tuberías de presión que van conectadas a la red o a la bomba de agua, necesitas PVC hidráulico PN16 o PN20, que aguanta la presión sin explotar.\n' +
          'Para instalaciones de agua caliente en cocinas o duchas eléctricas, el CPVC o el PPR PN20 son los materiales correctos — el PVC normal no soporta el calor y se deforma con el tiempo. Si tienes una remodelación grande o una construcción nueva, pídenos asesoría en tienda para dimensionar bien tus bajantes y no tener problemas a futuro.',
      },
      {
        subtitle: 'Llaves de Paso, Llaves de Bola y Válvulas: El Control de Tu Sistema de Agua',
        text:
          'Una llave de bola buena es la diferencia entre poder cortar el agua en segundos ante una emergencia o pasar media hora buscando la llave principal que nunca cierra bien. Manejamos llaves de bola de latón de ½", ¾" y 1" — las más usadas en instalaciones residenciales del Tuy — con cierre completo de 90° que no gotea ni oxida.\n' +
          'También tenemos válvulas de pie para bombas (evitan que el agua retroceda al tanque), válvulas check y flotadores para tanques cisterna. Si tu tanque no para de rebosar o la bomba trabaja sin parar, puede ser el flotador — y tenemos el repuesto aquí.',
      },
      {
        subtitle: 'Pegamentos, Teflon y Accesorios: El Kit Completo pa\' Resolver el Daño',
        text:
          'La chapuza más común que vemos es pegar tubería PVC con pegamento de mala calidad o sin preparar la superficie — y a los tres meses vuelve a gotear. El pegamento correcto para PVC hidráulico es diferente al de PVC sanitario, y la diferencia la sentirás en años de durabilidad.\n' +
          'Tenemos adhesivos certificados, cinta teflón industrial, uniones de PVC, codos de 45° y 90°, tees, reducciones y todo lo que necesita un plomero para hacer el trabajo bien hecho de una sola vez. Compra todo junto y ahorra el viaje de regreso.',
      },
    ],
    ctaSection: {
      title: 'Daño de Plomería no Espera: Resuelve Antes de que Empeore',
      text:
        'Mándanos foto por WhatsApp del daño o la pieza que necesitas y te confirmamos disponibilidad en menos de 5 minutos. Nuestros ferreteros conocen los materiales y te guían para que compres exactamente lo correcto — sin inventos y sin quedar botado a mitad del trabajo.',
      btnText: '📸 Enviar Foto del Daño al WhatsApp',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Electricidad
  // ──────────────────────────────────────────────────────────────────────────
  'electricidad': {
    title: 'Materiales Eléctricos en Charallave: Cables, Breakers y Tableros',
    description:
      'Cables THW certificados FONDONORMA, breakers termomagnéticos Schneider, tableros, ductos y todo lo que necesitas para instalaciones eléctricas residenciales y comerciales en Charallave y el Tuy.',
    blocks: [
      {
        subtitle: 'Cables Eléctricos Certificados: Calibres y Usos',
        text:
          'El calibre del cable determina cuánta corriente puede manejar de forma segura. Usar un cable subdimensionado es el principal riesgo de incendio eléctrico.\n' +
          'Cable #12 AWG → Tomacorrientes y luces de uso general.\n' +
          'Cable #10 AWG → Circuitos de aires acondicionados y cocinas eléctricas.\n' +
          'Cable #6 y #4 AWG → Sub-tableros y cargas pesadas trifásicas.\n' +
          'Todos nuestros cables son certificados FONDONORMA, con aislamiento THW resistente al calor.',
      },
      {
        subtitle: 'Breakers y Tableros: Protección que Salva Equipos',
        text:
          'Un tablero eléctrico correctamente dimensionado con breakers de calidad es la diferencia entre un cortocircuito controlado y un incendio.\n' +
          'Manejamos breakers termomagnéticos Schneider Electric de 15A a 100A, tanto monofásicos como bifásicos, compatibles con tableros residenciales y comerciales.',
      },
    ],
    ctaSection: {
      title: 'Instalación eléctrica segura empieza con los materiales correctos',
      text:
        'No improvises con tu instalación eléctrica. Nuestros asesores te ayudan a seleccionar los calibres y breakers correctos según el plano de tu proyecto.',
      btnText: '💬 Asesoría eléctrica gratuita por WhatsApp',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Iluminación
  // ──────────────────────────────────────────────────────────────────────────
  'iluminacion': {
    title: 'Iluminación LED en Charallave: Bombillos, Paneles y Reflectores de Alto Rendimiento',
    description:
      'Reduce tu consumo eléctrico hasta un 80% con tecnología LED Philips y marcas líderes. Disponible en Charallave para residencias, locales comerciales, galpones y espacios exteriores.',
    blocks: [
      {
        subtitle: 'LED vs Ahorro Eléctrico: Los Números que Debes Conocer',
        text:
          'Un bombillo LED de 9W produce la misma luz que un incandescente de 60W. Eso es un 85% menos de consumo.\n' +
          'Con los continuos cortes de luz y la dependencia de plantas eléctricas, cada watt ahorrado en iluminación extiende las horas de tu generador. El LED no es un gasto, es una inversión con retorno en meses.',
      },
      {
        subtitle: 'Paneles y Reflectores para Comercios y Galpones',
        text:
          'Para locales comerciales y oficinas, los paneles LED empotrables ofrecen una iluminación uniforme y profesional que mejora la percepción del espacio.\n' +
          'Para galpones, estacionamientos y exteriores, los reflectores LED de 50W a 200W brindan seguridad y visibilidad con bajo consumo energético.',
      },
    ],
    ctaSection: {
      title: 'Ilumina tu espacio con eficiencia y estilo',
      text:
        'Cuéntanos las dimensiones de tu espacio y el tipo de iluminación que necesitas. Te diseñamos un plan de iluminación LED sin costo.',
      btnText: '💬 Diseño de iluminación gratuito por WhatsApp',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // impermeabilización
  // ──────────────────────────────────────────────────────────────────────────
  'impermeabilizacion': {
    title: 'Impermeabilización: Que la Lluvia se Quede Afuera de tu Casa',
    description: 'Cuando arrancan los palos de agua en el Tuy, una gotera escondida te puede dañar desde la pintura hasta los muebles. No esperes a tener la piscina en la sala; sella y protege tu techo a tiempo con materiales que no se cuartean con nuestro sol inclemente.',
    blocks: [
      { 
        subtitle: 'Manto Asfáltico Truper 3mm: La Barrera Definitiva', 
        text: 'Si quieres dormir tranquilo cuando llueve fuerte, el manto asfáltico Truper de 3mm es la solución probada. Olvídate de las filtraciones rebeldes en platabandas. Su grosor, flexibilidad y fuerte adherencia te garantizan años de protección total contra la humedad extrema.' 
      },
      { 
        subtitle: 'Selladores de Silicona para Cero Goteras', 
        text: 'Para esas juntas de dilatación, grietas en las paredes o remates de ventanas donde siempre se cuela el agua, un buen cartucho de silicón transparente te salva la vida. Aplicación rápida y un sellado 100% hermético que mantiene los interiores de tu hogar completamente secos.' 
      }
    ],
    ctaSection: { 
      title: '¿No sabes cuántos rollos de manto necesitas?', 
      text: 'Pásanos las medidas de tu platabanda al WhatsApp y nuestros asesores te calculan el material exacto para que impermeabilices sin que te falte ni te sobre presupuesto.', 
      btnText: 'Cotizar Material para Techo' 
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Equipos de Protección Personal
  // ──────────────────────────────────────────────────────────────────────────
  'equipos-de-proteccion': {
    title: 'Equipos de Protección Personal en Charallave: EPP para Obra y Taller',
    description:
      'Cascos industriales, lentes de seguridad, guantes, botas dieléctricas y más. Certificados bajo normas ANSI y OSHA. Stock disponible en Charallave para empresas constructoras y profesionales independientes del Tuy.',
    blocks: [
      {
        subtitle: 'EPP Obligatorio por Ley: ¿Qué debe llevar tu equipo de trabajo?',
        text:
          'La Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo (LOPCYMAT) en Venezuela obliga a todo empleador a suministrar EPP adecuado a su personal.\n' +
          'El kit básico para obra incluye: casco de seguridad, lentes de impacto, guantes de trabajo, botas con punta reforzada y chaleco reflectivo.\n' +
          'En Charatools tienes todo este kit disponible en tienda física, con certificaciones y facturas válidas para tu empresa.',
      },
    ],
    ctaSection: {
      title: 'EPP en volumen para tu empresa o cuadrilla',
      text:
        'Solicita precios especiales para compras institucionales de EPP. Manejamos precios de distribuidor para empresas constructoras, contratistas y proyectos de infraestructura.',
      btnText: '💬 Cotización institucional de EPP por WhatsApp',
    },
  },

} satisfies SeoCategoryDataMap
