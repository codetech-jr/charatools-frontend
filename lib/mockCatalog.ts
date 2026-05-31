/**
 * @file mockCatalog.ts
 * @description Mock data centralizado del catálogo CharaTools B2B.
 *
 * Productos ultra-realistas repartidos entre las 5 categorías oficiales:
 * Herramientas en General, Plomería, Iluminación, Electricidad, Impermeabilización.
 *
 * Sin precios (modelo B2B: el precio se negocia por WhatsApp).
 * Reemplazar por fetch a API/CMS cuando esté listo.
 */

import type { CatalogProduct } from './catalog.types'

export const MOCK_CATALOG: CatalogProduct[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // HERRAMIENTAS EN GENERAL (4 productos)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'taladro-ingco-550w',
    slug: 'taladro-ingco-550w',
    name: 'Taladro Percutor 550W INGCO',
    shortDescription: 'Taladro percutor profesional con 2 velocidades y chuck 13mm.',
    description: 'Ideal para concreto y mampostería. Motor de 550W, mandril de 13mm, 2 velocidades seleccionables, función percutor activable. Incluye maletín y broca de prueba.',
    category: 'herramientas-general',
    categoryLabel: 'Herramientas en General',
    brand: 'INGCO',
    reference: 'ID2228VRE',
    unit: 'und',
    powerWatts: 550,
    voltageVolts: 120,
    weightKg: 1.8,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    status: 'available',
    tags: ['taladro', 'percutor', 'concreto', 'mampostería'],
    relatedIds: ['esmeril-ingco-820w', 'flexometro-stanley-5m'],
    subcategory: 'electricas',
  },
  {
    id: 'esmeril-ingco-820w',
    slug: 'esmeril-ingco-820w',
    name: 'Esmeril Angular 820W 4½" INGCO',
    shortDescription: 'Esmeril profesional con disco de 115mm y 11,000 RPM.',
    description: 'Motor de cobre puro de 820W, velocidad sin carga 11,000 RPM. Ideal para cortar, desbastar y pulir metales y concreto. Empuñadura lateral ajustable.',
    category: 'herramientas-general',
    categoryLabel: 'Herramientas en General',
    brand: 'INGCO',
    reference: 'AG7508',
    unit: 'und',
    powerWatts: 820,
    voltageVolts: 120,
    weightKg: 1.9,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80',
    status: 'available',
    tags: ['esmeril', 'amoladora', 'corte', 'desbaste'],
    subcategory: 'electricas',
  },
  {
    id: 'flexometro-stanley-5m',
    slug: 'flexometro-stanley-5m',
    name: 'Flexómetro Classic 5m Stanley',
    shortDescription: 'Cinta métrica resistente, bloqueo automático, gancho magnético.',
    category: 'herramientas-general',
    categoryLabel: 'Herramientas en General',
    brand: 'Stanley',
    reference: '30-497',
    unit: 'und',
    weightKg: 0.3,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    status: 'available',
    tags: ['flexómetro', 'medida', 'stanley', 'cinta métrica'],
    subcategory: 'medicion',
  },
  {
    id: 'sierra-caladora-dewalt-550w',
    slug: 'sierra-caladora-dewalt-550w',
    name: 'Sierra Caladora 550W DeWalt',
    shortDescription: 'Sierra caladora orbital con velocidad variable y corte biselado a 45°.',
    description: 'Motor de 550W, corte máximo 65mm en madera y 6mm en acero. Velocidad variable 800-3100 CPM. Cambio de hoja sin herramientas. Ideal para carpintería y acabados.',
    category: 'herramientas-general',
    categoryLabel: 'Herramientas en General',
    brand: 'Dewalt',
    reference: 'DW300',
    unit: 'und',
    powerWatts: 550,
    voltageVolts: 120,
    weightKg: 2.1,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    status: 'new-batch',
    tags: ['sierra', 'caladora', 'madera', 'corte'],
    subcategory: 'electricas',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PLOMERÍA (6 productos: 2 bombas, 3 tuberías para test de 3er nivel, 1 soldadura)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bomba-periferica-1-2hp',
    slug: 'bomba-periferica-1-2hp',
    name: 'Bomba de Agua Periférica ½ HP',
    shortDescription: 'Bomba potente para riego y abastecimiento residencial.',
    description: 'Carcasa en hierro fundido, impulsor de bronce. Caudal máximo 40L/min, altura máxima 35m. Protección térmica integrada.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    reference: 'SPWP8001',
    unit: 'und',
    powerWatts: 370,
    voltageVolts: 120,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'high-demand',
    tags: ['bomba', 'agua', 'riego', 'presión'],
    subcategory: 'bombas',
  },
  {
    id: 'press-control-automatico',
    slug: 'press-control-automatico',
    name: 'Press Control Automático 1HP',
    shortDescription: 'Regulador de presión para sistemas de agua residencial.',
    description: 'Encendido/apagado automático según flujo. Protección contra funcionamiento en seco. Compatible con bombas de ½ a 1HP.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    powerWatts: 750,
    image: 'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80',
    status: 'high-demand',
    tags: ['press control', 'presión', 'bomba', 'automático'],
    subcategory: 'bombas',
  },
  {
    id: 'tuberia-sanitaria-estandar-3',
    slug: 'tuberia-sanitaria-estandar-3',
    name: 'Tubería Sanitaria Estándar 3" (6m) Tubrica',
    shortDescription: 'Tubería PVC sanitaria para desagües y ventilación.',
    description: 'Tubería de PVC tipo Sanitario de 3 pulgadas de diámetro por 6 metros de longitud. Ideal para sistemas de aguas servidas y ventilación residencial.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'Tubrica',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'available',
    tags: ['tubería', 'sanitaria', 'desagüe', 'Tubrica'],
    subcategory: 'tuberias',
    subitem: 'tuberia-sanitaria-estandar',
  },
  {
    id: 'tuberia-termofusion-ppr-20',
    slug: 'tuberia-termofusion-ppr-20',
    name: 'Tubería Termofusión PPR 20mm PN20',
    shortDescription: 'Tubería PPR de 20mm para agua caliente y fría.',
    description: 'Tubería de polipropileno copolímero random (PPR) de 20mm de diámetro exterior. Presión nominal PN20. Ideal para distribución de agua potable fría y caliente sin filtraciones.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'Termofusion',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'available',
    tags: ['tubería', 'ppr', 'termofusión', 'agua caliente'],
    subcategory: 'tuberias',
    subitem: 'termofusion-ppr',
  },
  {
    id: 'pega-pvc-soldadura-tinajera',
    slug: 'pega-pvc-soldadura-tinajera',
    name: 'Pega para PVC Soldadura Tinajera 8oz',
    shortDescription: 'Pega soldadura líquida para tuberías de PVC rígido.',
    description: 'Cemento solvente de fraguado rápido para soldar tuberías y conexiones de PVC de hasta 4" de diámetro. Excelente adherencia y resistencia a la presión.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'Fermetal',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'available',
    tags: ['pega', 'cemento', 'soldadura', 'pvc', 'tinajera'],
    subcategory: 'soldadura',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ILUMINACIÓN (3 productos)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bombillo-led-9w',
    slug: 'bombillo-led-9w',
    name: 'Bombillo LED 9W Luz Cálida E27',
    shortDescription: 'Bajo consumo, 800 lúmenes, vida útil 25,000 horas.',
    description: 'Reemplazo de bombillo incandescente de 60W. Base E27 estándar, luz cálida 3000K. Sin mercurio, encendido instantáneo.',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'Philips',
    reference: 'LED927E27',
    unit: 'und',
    powerWatts: 9,
    voltageVolts: 120,
    image: 'https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80',
    status: 'available',
    tags: ['LED', 'bombillo', 'iluminación', 'E27'],
    subcategory: 'focos-led',
  },
  {
    id: 'panel-led-60w',
    slug: 'panel-led-60w',
    name: 'Panel LED Rectangular 60W',
    shortDescription: 'Panel empotrado 60x60cm, luz blanca neutra, driver incluido.',
    description: 'Panel LED de 60x60cm para cielo raso. 4200 lúmenes, color 4000K (blanco neutro). Factor de potencia >0.9. Vida útil 30,000 horas.',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'Philips',
    unit: 'und',
    powerWatts: 60,
    voltageVolts: 120,
    image: 'https://images.unsplash.com/photo-1565631969034-0e5c0f0e8c59?w=400&q=80',
    status: 'high-demand',
    tags: ['panel', 'LED', 'empotrado', 'oficina'],
    subcategory: 'industrial',
  },
  {
    id: 'reflector-led-100w',
    slug: 'reflector-led-100w',
    name: 'Reflector LED 100W IP65 INGCO',
    shortDescription: 'Reflector exterior resistente al agua, 4500 lúmenes, luz blanca.',
    description: 'Carcasa de aluminio fundido, protección IP65, luz blanca 6500K. Ideal para patios, fachadas e iluminación industrial.',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'INGCO',
    reference: 'HLFL3501',
    unit: 'und',
    powerWatts: 50,
    voltageVolts: 120,
    image: 'https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80',
    status: 'available',
    tags: ['reflector', 'LED', 'exterior', 'IP65', 'industrial'],
    subcategory: 'reflectores',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ELECTRICIDAD (2 productos)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cable-electrico-2-100m',
    slug: 'cable-electrico-2-100m',
    name: 'Cable Eléctrico #2 x 100m',
    shortDescription: 'Cable THW calibre 12 AWG, certificado FONDONORMA, uso residencial.',
    description: 'Cable de cobre sólido con aislamiento PVC THW. Temperatura máxima 75°C. Color según disponibilidad. Certificación FONDONORMA.',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: '3M',
    unit: 'rollo',
    voltageVolts: 600,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    status: 'available',
    tags: ['cable', 'eléctrico', 'THW', '#12', 'cobre'],
    subcategory: 'cables',
  },
  {
    id: 'cinta-aislante-3m',
    slug: 'cinta-aislante-3m',
    name: 'Cinta Aislante Temflex 1700 3M (x10 und)',
    shortDescription: 'Cinta PVC negro, resistente hasta 600V, pack de 10 rollos.',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: '3M',
    reference: 'TEMFLEX1700-10',
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    status: 'available',
    tags: ['cinta', 'aislante', '3M', 'eléctrico'],
    subcategory: 'cables',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IMPERMEABILIZACIÓN (1 producto)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sellador-silicona-transparente',
    slug: 'sellador-silicona-transparente',
    name: 'Sellador de Silicona Transparente 300ml',
    shortDescription: 'Silicona neutra para juntas de baño, cocina y ventanas.',
    description: 'Sellador de silicona neutra 100%, no corrosivo. Resistente a moho y UV. Temperatura de servicio -40°C a +150°C. Fraguado 24 horas.',
    category: 'impermeabilizacion',
    categoryLabel: 'Impermeabilización',
    brand: '3M',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    status: 'available',
    tags: ['sellador', 'silicona', 'baño', 'juntas'],
    subcategory: 'selladores',
  },
]

// ── Helpers de consulta ────────────────────────────────────────────────────

/** Obtener todas las marcas únicas del catálogo */
export function getUniqueBrands(): string[] {
  return [...new Set(MOCK_CATALOG.map(p => p.brand))].sort()
}

/** Obtener todas las categorías únicas del catálogo */
export function getUniqueCategories(): { slug: string; label: string }[] {
  const seen = new Map<string, string>()
  MOCK_CATALOG.forEach(p => {
    if (!seen.has(p.category)) seen.set(p.category, p.categoryLabel)
  })
  return Array.from(seen.entries()).map(([slug, label]) => ({ slug, label }))
}

/** Buscar un producto por ID */
export function findProductById(id: string): CatalogProduct | undefined {
  return MOCK_CATALOG.find(p => p.id === id)
}
