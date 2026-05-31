/**
 * @file catalog.types.ts
 * @description Tipos compartidos del catálogo CharaTools.
 * Single source of truth para productos, filtros y categorías.
 */

// ---------------------------------------------------------------------------
// Variantes de producto (medidas, diámetros, calibres, etc.)
// ---------------------------------------------------------------------------

export interface ProductVariant {
  /** Valor de la variante mostrado en el pill: "½\"", "¾\"", "#12", etc. */
  value: string
  /** Etiqueta alternativa de display (opcional — si difiere de value) */
  label?: string
  /** Marcar como agotado para deshabilitar el pill sin ocultarlo */
  outOfStock?: boolean
}

// ---------------------------------------------------------------------------
// Producto (catálogo B2B sin precios)
// ---------------------------------------------------------------------------

export type StockStatus = 'available' | 'high-demand' | 'new-batch' | 'out-of-stock'

export interface CatalogProduct {
  id: string
  /** URL slug legible para el router: /producto/[slug] */
  slug: string
  name: string
  shortDescription: string
  /** Descripción larga para la página/modal de detalle */
  description?: string
  category: string          // slug de categoría (ej: "herramientas-electricas")
  categoryLabel: string     // nombre legible (ej: "Herramientas Eléctricas")
  brand: string             // ej: "INGCO", "3M", "Stanley"
  reference?: string        // SKU/modelo
  unit: string              // "und", "m", "kg", "caja", "rollo"
  /** Potencia en vatios (para filtros de electricidad/herramientas) */
  powerWatts?: number
  /** Voltaje nominal */
  voltageVolts?: number
  /** Peso en kg */
  weightKg?: number
  image: string
  /** Imágenes adicionales para el detalle */
  gallery?: string[]
  status: StockStatus
  /** Etiquetas para búsqueda rápida */
  tags?: string[]
  /** Productos relacionados (IDs) para up-selling en modal */
  relatedIds?: string[]
  /** Flag para zona outlet/ofertas */
  isOutlet?: boolean
  /** Elegible para compra financiada con Cashea */
  isCasheaEligible?: boolean
  /** Precio sugerido para cálculos de Cashea (opcional en catálogo B2B) */
  price?: number
  /** Slug de la subcategoría (ej: 'tuberias', 'bombas') */
  subcategory?: string
  /** Slug del sub-ítem de tercer nivel (ej: 'tuberia-sanitaria-estandar') */
  subitem?: string
  /**
   * Variantes seleccionables por medida/diámetro/calibre.
   * Cuando está definido, se muestra el selector de pills en la página de detalle.
   */
  variants?: ProductVariant[]
  /**
   * Etiqueta del selector de variantes (ej: "Diámetro", "Calibre", "Longitud").
   * Por defecto: "Medida" si no se especifica.
   */
  variantLabel?: string
}

// ---------------------------------------------------------------------------
// Filtros (SearchParams)
// ---------------------------------------------------------------------------

export interface CatalogFilters {
  /** Marcas seleccionadas (multi-select) */
  marcas?: string[]
  /** Rango de potencia mínima en vatios */
  potenciaMin?: number
  /** Rango de potencia máxima en vatios */
  potenciaMax?: number
  /** Estado de stock */
  stock?: StockStatus[]
  /** Término de búsqueda libre */
  q?: string
  /** Filtro de elegibilidad Cashea */
  cashea?: 'true'
  /** Filtro de subcategoría o sub-ítem */
  sub?: string
}

// ---------------------------------------------------------------------------
// Categorías del catálogo
// ---------------------------------------------------------------------------

export interface CatalogCategory {
  slug: string
  label: string
  icon: string   // emoji o nombre de ícono Lucide
  description: string
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { slug: 'herramientas-electricas', label: 'Herramientas Eléctricas', icon: '⚡', description: 'Taladros, esmeriles, sierras y más' },
  { slug: 'herramientas-manuales',   label: 'Herramientas Manuales',   icon: '🔧', description: 'Destornilladores, llaves, martillos' },
  { slug: 'plomeria',                label: 'Plomería',                 icon: '🚿', description: 'Tuberías, válvulas, bombas, accesorios PPR' },
  { slug: 'electricidad',            label: 'Electricidad',             icon: '🔌', description: 'Cables, breakers, tableros, conectores' },
  { slug: 'iluminacion',             label: 'Iluminación',              icon: '💡', description: 'LED, paneles, reflectores, bombillos' },
  { slug: 'impermeabilizacion',      label: 'Impermeabilización',       icon: '🧴', description: 'Membranas, selladores, impermeabilizantes' },
  { slug: 'equipos-de-proteccion',   label: 'Equipos de Protección',    icon: '🦺', description: 'Cascos, lentes, guantes, botas' },
]

// ---------------------------------------------------------------------------
// Marcas disponibles para filtros
// ---------------------------------------------------------------------------

export const CATALOG_BRANDS = [
  '3M',
  'Aquafina',
  'Bellota',
  'Belt-G',
  'Bosch',
  'Bticino',
  'Cebra',
  'Ceramipego',
  'Cobra',
  'Dewalt',
  'Exxel',
  'Faguax',
  'Ferco',
  'Fermetal',
  'Griven',
  'Iconel',
  'INGCO',
  'Lincoln',
  'Littmann',
  'Lumistar',
  'Makita',
  'Manpica',
  'PCP',
  'Philips',
  'Protonic Electric',
  'Proxical',
  'Reinco',
  'Run',
  'Sergeca',
  'Stanley',
  'Termofusion',
  'Tubrica',
  'Venceramica',
  'Vert',
  'Zasc',
] as const

export type CatalogBrand = typeof CATALOG_BRANDS[number]

// ---------------------------------------------------------------------------
// Mock Data del Catálogo Completo
// Reemplazar por fetch real a API/CMS cuando estén listos
// ---------------------------------------------------------------------------

export const MOCK_PRODUCTS: CatalogProduct[] = [
  {
    id: 'taladro-ingco-550w',
    slug: 'taladro-ingco-550w',
    name: 'Taladro Percutor 550W INGCO',
    shortDescription: 'Taladro percutor profesional con 2 velocidades y chuck 13mm.',
    description: 'Ideal para concreto y mampostería. Motor de 550W, mandril de 13mm, 2 velocidades seleccionables, función percutor activable. Incluye maletín y broca de prueba.',
    category: 'herramientas-electricas',
    categoryLabel: 'Herramientas Eléctricas',
    brand: 'INGCO',
    reference: 'ID2228VRE',
    unit: 'und',
    powerWatts: 550,
    voltageVolts: 120,
    weightKg: 1.8,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    status: 'available',
    tags: ['taladro', 'percutor', 'concreto', 'mampostería'],
    relatedIds: ['esmeril-ingco-820w', 'cable-electrico-2-100m'],
    isCasheaEligible: true,
    price: 45.00,
  },
  {
    id: 'esmeril-ingco-820w',
    slug: 'esmeril-ingco-820w',
    name: 'Esmeril Angular 820W 4½" INGCO',
    shortDescription: 'Esmeril profesional con disco de 115mm, 11,000 RPM.',
    category: 'herramientas-electricas',
    categoryLabel: 'Herramientas Eléctricas',
    brand: 'INGCO',
    reference: 'AG7508',
    unit: 'und',
    powerWatts: 820,
    voltageVolts: 120,
    weightKg: 1.9,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80',
    status: 'available',
    tags: ['esmeril', 'amoladora', 'corte', 'desbaste'],
    isOutlet: true,
    isCasheaEligible: true,
    price: 55.00,
  },
  {
    id: 'bomba-periferica-1-2hp',
    slug: 'bomba-periferica-1-2hp',
    name: 'Bomba de Agua Periférica INGCO',
    shortDescription: 'Bomba centrífuga de alta eficiencia para riego y abastecimiento residencial.',
    description: 'Bomba periférica INGCO de alto rendimiento. Cuerpo en hierro fundido y acero inoxidable, motor de inducción a prueba de salpicaduras. Ideal para pozos, cisternas y sistemas de riego. Incluye condensador y manual de instalación.',
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
    isCasheaEligible: true,
    price: 35.00,
    variantLabel: 'Potencia',
    variants: [
      { value: '½ HP' },
      { value: '¾ HP' },
      { value: '1 HP' },
      { value: '1½ HP', outOfStock: true },
    ],
  },
  {
    id: 'tuberia-ppr-12',
    slug: 'tuberia-ppr-12',
    name: 'Tubería PPR para Aguas Blancas (Termofusión)',
    shortDescription: 'Tubería PPR PN20, resistente a altas temperaturas. Ideal para redes de agua caliente y fría en sistemas de termofusión.',
    description: 'La tubería PPR PN20 es la solución más duradera para instalaciones de agua caliente y fría. Compatible con todos los accesorios de termofusión. Alta resistencia química y mecánica, vida útil superior a 50 años. Disponible en tramos de 6 metros.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    subcategory: 'tuberias-conexiones',
    subitem: 'termofusion-ppr',
    brand: 'Termofusion',
    unit: 'varilla (6m)',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'available',
    tags: ['tubería', 'PPR', 'aguas blancas', 'termofusión', 'PN20'],
    variantLabel: 'Diámetro',
    variants: [
      { value: '½"' },
      { value: '¾"' },
      { value: '1"' },
      { value: '1¼"' },
      { value: '1½"' },
      { value: '2"' },
      { value: '3"', outOfStock: true },
    ],
  },
  {
    id: 'cable-electrico-thw',
    slug: 'cable-electrico-thw',
    name: 'Cable Eléctrico THW Certificado FONDONORMA',
    shortDescription: 'Cable THW x 100m, certificado FONDONORMA. Apto para instalaciones residenciales e industriales hasta 600V.',
    description: 'Cable de cobre sólido con aislamiento THW certificado por FONDONORMA. Resistente a humedad, aceites y temperaturas hasta 75°C. Disponible en múltiples calibres para adaptarse a cualquier instalación eléctrica residencial o industrial.',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: '3M',
    unit: 'rollo (100m)',
    voltageVolts: 600,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    status: 'available',
    tags: ['cable', 'eléctrico', 'THW', 'FONDONORMA', 'cobre'],
    variantLabel: 'Calibre',
    variants: [
      { value: '#14' },
      { value: '#12' },
      { value: '#10' },
      { value: '#8' },
      { value: '#6' },
      { value: '#4' },
      { value: '#2' },
      { value: '#1/0' },
      { value: '#2/0', outOfStock: true },
    ],
  },
  {
    id: 'breaker-30a',
    slug: 'breaker-30a',
    name: 'Breaker Termomagnético 30A',
    shortDescription: 'Disyuntor monofásico para tableros eléctricos residenciales.',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: 'Philips',
    reference: 'EZ9F34230',
    unit: 'und',
    voltageVolts: 240,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    status: 'new-batch',
    tags: ['breaker', 'disyuntor', 'tablero', 'protección'],
    isCasheaEligible: true,
    price: 12.00,
  },
  {
    id: 'bombillo-led-9w',
    slug: 'bombillo-led-9w',
    name: 'Bombillo LED 9W Luz Cálida E27',
    shortDescription: 'Bajo consumo, 800 lúmenes, vida útil 25,000 horas.',
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
  },
  {
    id: 'panel-led-60w',
    slug: 'panel-led-60w',
    name: 'Panel LED Rectangular 60W',
    shortDescription: 'Panel empotrado, luz blanca neutra, driver incluido.',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'Philips',
    unit: 'und',
    powerWatts: 60,
    voltageVolts: 120,
    image: 'https://images.unsplash.com/photo-1565631969034-0e5c0f0e8c59?w=400&q=80',
    status: 'high-demand',
    tags: ['panel', 'LED', 'empotrado', 'oficina'],
    isOutlet: true,
  },
  {
    id: 'cinta-aislante-3m',
    slug: 'cinta-aislante-3m',
    name: 'Cinta Aislante Temflex 1700 3M (x10 und)',
    shortDescription: 'Cinta PVC negro, resistente hasta 600V, pack de 10.',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: '3M',
    reference: 'TEMFLEX1700-10',
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    status: 'available',
    tags: ['cinta', 'aislante', '3M', 'eléctrico'],
  },
  {
    id: 'flexometro-stanley-5m',
    slug: 'flexometro-stanley-5m',
    name: 'Flexómetro Classic 5m Stanley',
    shortDescription: 'Cinta métrica resistente, bloqueo automático, gancho magnético.',
    category: 'herramientas-manuales',
    categoryLabel: 'Herramientas Manuales',
    brand: 'Stanley',
    reference: '30-497',
    unit: 'und',
    weightKg: 0.3,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    status: 'available',
    tags: ['flexómetro', 'medida', 'stanley', 'cinta métrica'],
  },
  {
    id: 'press-control-automatico',
    slug: 'press-control-automatico',
    name: 'Press Control Automático 1HP',
    shortDescription: 'Regulador de presión para sistemas de agua residencial.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    powerWatts: 750,
    image: 'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80',
    status: 'high-demand',
    tags: ['press control', 'presión', 'bomba', 'automático'],
    isCasheaEligible: true,
    price: 25.00,
  },
  {
    id: 'casco-seguridad-3m',
    slug: 'casco-seguridad-3m',
    name: 'Casco de Seguridad Industrial 3M',
    shortDescription: 'Casco tipo ratchet, ANSI Z89.1, resistente a impactos.',
    category: 'equipos-de-proteccion',
    categoryLabel: 'Equipos de Protección',
    brand: '3M',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    status: 'available',
    tags: ['casco', 'seguridad', 'protección', 'obra'],
  },
]
