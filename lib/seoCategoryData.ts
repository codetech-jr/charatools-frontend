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
    title: 'Equipamiento de Alto Rendimiento Comercial e Industrial',
    description: 'Provisión de herramientas de alta exigencia para proyectos de infraestructura. Capacidad logística en nuestro centro de distribución en Charallave para abastecer a contratistas en los Valles del Tuy.',
    blocks: [
      { 
        subtitle: 'Maquinaria de Corte y Perforación Industrial', 
        text: 'Suministro de equipos diseñados para trabajo pesado continuo. Comercializamos líneas de alto rendimiento para asegurar el cumplimiento estricto de cronogramas en obras civiles y comerciales.' 
      },
      { 
        subtitle: 'Dotación para Contratistas y Talleres Especializados', 
        text: 'Proveemos maquinaria robusta capaz de soportar las máximas exigencias operativas. Nuestro inventario garantiza la continuidad de las operaciones en proyectos de cualquier envergadura.' 
      }
    ],
    ctaSection: { 
      title: 'Cotización institucional para equipamiento general', 
      text: 'Gestión de pedidos por volumen y especificaciones técnicas. Contamos con el stock físico en nuestras instalaciones de Charallave para asegurar la operatividad de su empresa sin demoras logísticas.', 
      btnText: 'Solicitar Gestión Corporativa' 
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Plantas Eléctricas y Energía
  // ──────────────────────────────────────────────────────────────────────────
  'plantas-electricas-y-energia': {
    title: 'Sistemas de Respaldo Energético Continuo y Prevención de Pérdidas',
    description:
      'Soluciones de generación eléctrica para garantizar la continuidad operativa. Equipamiento en stock físico en Charallave para el sostenimiento de infraestructura comercial e industrial en los Valles del Tuy.',
    blocks: [
      {
        subtitle: 'Generadores Comerciales de Media y Alta Demanda',
        text: 'Comercializamos plantas eléctricas dimensionadas para sostener cargas críticas. Sistemas diseñados para proporcionar estabilidad de voltaje en operaciones que requieren suministro ininterrumpido.'
      },
      {
        subtitle: 'Inversores de Corriente y Bancos de Baterías',
        text: 'Alternativas de respaldo energético silencioso mediante inversores de onda pura. Soluciones óptimas para la protección de equipos sensibles y servidores en instalaciones corporativas.'
      },
      {
        subtitle: 'Protección Integral de Voltaje',
        text: 'Implementación de protectores de alto impacto y unidades UPS para la prevención de siniestros eléctricos. Salvaguarda de activos tecnológicos y maquinaria frente a fluctuaciones de la red.'
      },
    ],
    ctaSection: {
      title: 'Asesoramiento para dimensionamiento energético',
      text:
        'Nuestro equipo técnico evalúa los requerimientos de carga de sus instalaciones. Solicite un análisis especializado y coordine el retiro corporativo en nuestra sede de Charallave.',
      btnText: 'Contactar Asesoría Energética',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Herramientas Eléctricas
  // ──────────────────────────────────────────────────────────────────────────
  'herramientas-electricas': {
    title: 'Herramientas Eléctricas de Uso Intensivo y Prolongado',
    description:
      'Suministro logístico desde Charallave para el sector construcción e industria de los Valles del Tuy. Equipos certificados para garantizar una vida útil prolongada bajo operación continua.',
    blocks: [
      {
        subtitle: 'Equipamiento Profesional de Alto Rendimiento',
        text: 'Distribuimos líneas especializadas diseñadas para máxima resistencia en entornos industriales. Motores de alto torque optimizados para largas jornadas de trabajo sin pérdida de eficiencia.'
      },
      {
        subtitle: 'Consumibles Industriales y Accesorios Técnicos',
        text: 'Inventario permanente de discos de desbaste, brocas de concreto y consumibles certificados. Aseguramos el abastecimiento continuo para maximizar el rendimiento de la maquinaria instalada.'
      },
    ],
    ctaSection: {
      title: 'Abastecimiento logístico para proyectos de construcción',
      text:
        'Garantizamos disponibilidad inmediata en nuestro centro de despacho en Charallave para retiro corporativo. Consulte nuestras capacidades de dotación para satisfacer los requerimientos de su próximo proyecto.',
      btnText: 'Consultar Disponibilidad de Inventario',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Bombas de Agua y Presión
  // ──────────────────────────────────────────────────────────────────────────
  'bombas-de-agua-y-presion': {
    title: 'Soluciones de Bombeo de Caudal Constante y Presión Técnica Sostenida',
    description:
      'Sistemas de bombeo para infraestructura en los Valles del Tuy. Equipos periféricos y sumergibles disponibles en nuestro centro logístico de Charallave para desarrollos de alto tráfico.',
    blocks: [
      {
        subtitle: 'Dimensionamiento de Sistemas de Bombeo',
        text: 'Suministramos equipos periféricos y sumergibles calibrados para diversas alturas piezométricas. Garantizamos presión constante en instalaciones de múltiples niveles o de alta demanda volumétrica.'
      },
      {
        subtitle: 'Rendimiento Operativo y Eficiencia de Motores',
        text: 'Comercializamos motores robustos con alta eficiencia eléctrica para uso continuo. Soluciones probadas que aseguran estabilidad hidráulica y retorno de inversión a largo plazo en instalaciones críticas.'
      },
      {
        subtitle: 'Controladores de Presión Automáticos',
        text: 'Automatización de sistemas hidráulicos mediante presostatos técnicos y press controls. Optimización de los ciclos de encendido para prolongar significativamente la vida útil de los equipos de bombeo.'
      },
    ],
    ctaSection: {
      title: 'Asesoría técnica y despacho en Valles del Tuy',
      text:
        'Evalúe los requerimientos hidráulicos de sus instalaciones con nuestros especialistas. Disponemos del inventario en Charallave para la implementación técnica inmediata de soluciones escalables.',
      btnText: 'Consultar Especificaciones Técnicas',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Plomería y Tuberías
  // ──────────────────────────────────────────────────────────────────────────
  'plomeria': {
    title: 'Suministro Técnico en Plomería: Tuberías y Conexiones Universales',
    description:
      'Soluciones integrales de plomería con stock continuo en Charallave. Tuberías industriales y piezas de conexión certificadas para obras e infraestructura en los Valles del Tuy.',
    blocks: [
      {
        subtitle: 'Tuberías Industriales y Residenciales',
        text: 'Disponibilidad de tuberías PVC hidráulico y sanitario en medidas universales. Garantizamos stock permanente para la ejecución de obras sin interrupciones logísticas.'
      },
      {
        subtitle: 'Presión y Hermeticidad Garantizada',
        text: 'Comercializamos válvulas y conexiones con altas especificaciones de presión técnica. Aseguramos sellado hermético y durabilidad en sistemas de alto rendimiento.'
      }
    ],
    ctaSection: {
      title: 'Cotización institucional para proyectos de plomería',
      text:
        'Asegure la continuidad de su obra con nuestro inventario físico para los Valles del Tuy. Consulte requerimientos técnicos de volumen para retiro corporativo en nuestras instalaciones de Charallave.',
      btnText: 'Solicitar Cotización por WhatsApp',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Electricidad
  // ──────────────────────────────────────────────────────────────────────────
  'electricidad': {
    title: 'Materiales Eléctricos Certificados: Cableado y Protección Estructural',
    description:
      'Soluciones de infraestructura eléctrica con despacho inmediato en Charallave para desarrollos en los Valles del Tuy. Provisión de conductores y protección termomagnética bajo normativas internacionales.',
    blocks: [
      {
        subtitle: 'Conductores Eléctricos de Alta Capacidad',
        text: 'Suministro de cableado con aislamiento térmico resistente, calibrado para cargas industriales. Productos estrictamente certificados para la prevención de riesgos por sobrecalentamiento.'
      },
      {
        subtitle: 'Protección Termomagnética y Tableros',
        text: 'Comercialización de sistemas de control eléctrico de máxima precisión. Breakers y tableros dimensionados para la salvaguarda de infraestructuras críticas ante variaciones y cortocircuitos.'
      },
    ],
    ctaSection: {
      title: 'Suministro eléctrico logístico por volumen',
      text:
        'Atendemos requerimientos de materiales eléctricos desde nuestro centro logístico en Charallave. Garantice la seguridad y el cumplimiento normativo de su obra con productos certificados.',
      btnText: 'Gestionar Requerimiento Eléctrico',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Iluminación
  // ──────────────────────────────────────────────────────────────────────────
  'iluminacion': {
    title: 'Iluminación y Componentes LED: Eficiencia Energética Industrial',
    description:
      'Suministro especializado de iluminación LED de alto rendimiento. Inventario disponible en Charallave para equipamiento de galpones y proyectos residenciales en los Valles del Tuy.',
    blocks: [
      {
        subtitle: 'Eficiencia Energética y Normativas Técnicas',
        text: 'Provisión de luminarias de alta eficiencia que cumplen con los estándares y normativas técnicas de seguridad, optimizando drásticamente el consumo en entornos comerciales e industriales.'
      },
      {
        subtitle: 'Cobertura Integral para Tableros de Carga',
        text: 'Amplio inventario preparado para los requerimientos de tableros de carga, cableado por volumen y especificaciones de amperajes correctos destinados a proyectos a gran escala.'
      }
    ],
    ctaSection: {
      title: 'Soluciones lumínicas para grandes superficies',
      text:
        'Contamos con la capacidad logística en los Valles del Tuy para abastecer proyectos corporativos. Coordine el retiro corporativo en Charallave o contacte a nuestro departamento técnico.',
      btnText: 'Contactar Departamento Técnico',
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Impermeabilización
  // ──────────────────────────────────────────────────────────────────────────
  'impermeabilizacion': {
    title: 'Impermeabilización Estructural y Mantos Asfálticos Certificados',
    description: 'Materiales técnicos con stock físico en Charallave orientados al contratista de obra en los Valles del Tuy. Soluciones certificadas para la prevención de filtraciones industriales y habitacionales.',
    blocks: [
      { 
        subtitle: 'Sistemas de Impermeabilización Comercial', 
        text: 'Provisión de mantos asfálticos certificados para grandes y medianas cubiertas. Productos formulados específicamente para resistir alto tráfico, exposición UV y condiciones adversas prolongadas.' 
      },
      { 
        subtitle: 'Prevención de Filtraciones Industriales', 
        text: 'Inventario permanente de selladores técnicos de grado estructural, garantizando la hermeticidad total en proyectos de infraestructura residencial y comercial.' 
      }
    ],
    ctaSection: { 
      title: 'Dotación para Contratistas de Obra', 
      text: 'Gestione sus volúmenes de material con nuestro equipo corporativo. Aseguramos disponibilidad inmediata en nuestras instalaciones de Charallave para el estricto cumplimiento de sus cronogramas de obra.', 
      btnText: 'Asesoría técnica corporativa por WhatsApp' 
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Equipos de Protección Personal
  // ──────────────────────────────────────────────────────────────────────────
  'equipos-de-proteccion': {
    title: 'Equipos de Protección Personal en Charallave: EPP Certificado',
    description:
      'Provisión de cascos industriales, lentes, guantes y botas dieléctricas bajo normas ANSI y OSHA. Inventario físico en Charallave para abastecimiento logístico de empresas constructoras en los Valles del Tuy.',
    blocks: [
      {
        subtitle: 'Cumplimiento Normativo de EPP: Requisitos LOPCYMAT',
        text:
          'La Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo (LOPCYMAT) exige el suministro de EPP adecuado para salvaguardar la integridad del personal operativo.\n' +
          'El equipamiento reglamentario incluye: cascos de seguridad, protección visual de impacto, guantes técnicos, calzado con refuerzo y chalecos reflectivos.\n' +
          'Disponemos de inventario certificado con facturación fiscal, garantizando el cumplimiento normativo para contratistas e industrias.',
      },
    ],
    ctaSection: {
      title: 'Dotación corporativa de EPP por volumen',
      text:
        'Gestión de requerimientos institucionales para adquisiciones de equipos de protección. Estructura de costos corporativos para desarrollos de infraestructura y operaciones industriales.',
      btnText: 'Cotización institucional de EPP por WhatsApp',
    },
  },

} satisfies SeoCategoryDataMap
