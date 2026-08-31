const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Leer .env
const envPath = './.env';
const env = fs.readFileSync(envPath, 'utf-8')
  .split('\n')
  .reduce((acc, line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      acc[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
    return acc;
  }, {});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error('Missing Supabase URL or Service Role Key in .env file!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

const extraProducts = [
  {
    name: 'Tomacorriente de Empotrar de Potencia NEMA 10-50R (50A 125/250V)',
    slug: 'tomacorriente-empotrar-nema-1050-50a',
    sku: 'CHARATOOLS-TOMA-NEMA-1050',
    brand_slug: 'eagle',
    short_desc: 'Tomacorriente de alta potencia para empotrar NEMA 10-50R de 50A 125/250V con chasis metálico para cocinas y soldadoras.',
    description: 'Tomacorriente industrial de uso extra pesado para empotrar en cajetín cuadrado con placa de montaje en acero galvanizado. Capacidad nominal de 50 Amperios a 125/250V (configuración NEMA 10-50R). Diseñado para cocinas eléctricas de alto consumo, secadoras comerciales, hornos y máquinas de soldar.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 9,
      tags: ['tomacorriente', 'empotrar', 'potencia', 'NEMA 10-50R', '50A', '250V', 'cocina eléctrica', 'soldadora', 'industrial'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'tomacorrientes'
    }
  },
  {
    name: 'Tomacorriente Sencillo Redondo con Tierra (20A 125/250V)',
    slug: 'tomacorriente-sencillo-tierra-20a-250v',
    sku: 'CHARATOOLS-TOMA-SENCILLO-20A',
    brand_slug: 'sunico',
    short_desc: 'Tomacorriente individual redondo de 20A 125/250V con orejas metálicas de montaje para aires acondicionados y equipos 220V.',
    description: 'Mecanismo de tomacorriente sencillo redondo de uso rudo con capacidad de 20 Amperios a 125/250V con polo a tierra. Equipado con orejas metálicas de fijación para cajetín estándar. Especialmente indicado para conexión de aires acondicionados, compresores y maquinaria de 220V.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 10,
      tags: ['tomacorriente', 'sencillo', 'redondo', '20A', '250V', 'aire acondicionado', '220V', 'tierra', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'tomacorrientes'
    }
  },
  {
    name: 'Adaptador de Toma con Tierra (15A 125V)',
    slug: 'adaptador-toma-tierra-15a-125v',
    sku: 'CHARATOOLS-ADAPTADOR-TIERRA-15A',
    brand_slug: 'sunico',
    short_desc: 'Adaptador eléctrico de 3 a 2 clavijas con terminal de conexión a tierra para 15A 125V.',
    description: 'Adaptador de enchufe con conversión de 3 clavijas con polo a tierra (NEMA 5-15P) a toma de 2 clavijas estándar. Cuenta con orejeta metálica para conexión a tierra mediante el tornillo del cajetín de pared. Capacidad máxima de 15 Amperios a 125V.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 11,
      tags: ['adaptador', 'toma tierra', 'clavija', '15A', '125V', 'enchufe', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'enchufes-conectores'
    }
  },
  {
    name: 'Tapa Plástica para Tomacorriente Doble Línea 270',
    slug: 'tapa-plastica-tomacorriente-doble-270',
    sku: 'CHARATOOLS-TAPA-DOBLE-270',
    brand_slug: 'eagle',
    short_desc: 'Placa / tapa plástica de pared para tomacorriente doble estándar 270 en acabado Blanco y Marfil.',
    description: 'Placa de pared estándar de 1 ventana doble para mecanismos de tomacorriente línea 270. Fabricada en termoplástico irrompible de alto impacto con tornillo de fijación central incluido. Acabado brillante fácil de limpiar disponible en colores Blanco y Marfil / Beige.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 12,
      tags: ['tapa', 'placa', 'pared', 'tomacorriente', '270', 'doble', 'blanco', 'marfil', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'placas-tapas',
      variantLabel: 'Color',
      variants: [
        { value: 'Blanco' },
        { value: 'Marfil / Beige' }
      ]
    }
  }
];

async function main() {
  console.log('Obteniendo ID de categoría "electricidad"...');
  const { data: catRow, error: catErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'electricidad')
    .single();

  if (catErr || !catRow) {
    console.error('Error al obtener categoría electricidad:', catErr);
    process.exit(1);
  }

  // Asegurar marcas Eagle y Sunico
  const brandsToEnsure = [
    { name: 'Eagle', slug: 'eagle' },
    { name: 'Sunico', slug: 'sunico' }
  ];

  const brandMap = {};
  for (const b of brandsToEnsure) {
    let { data: existing } = await supabase.from('brands').select('id').eq('slug', b.slug).single();
    if (!existing) {
      const { data: created } = await supabase.from('brands').insert({ name: b.name, slug: b.slug, logo_url: '/categoria-electricidad.webp' }).select('id').single();
      existing = created;
      console.log(`✓ Marca ${b.name} creada en Supabase.`);
    }
    if (existing) brandMap[b.slug] = existing.id;
  }

  const { data: genericBrand } = await supabase.from('brands').select('id').eq('slug', 'generico').single();
  const defaultBrandId = genericBrand ? genericBrand.id : Object.values(brandMap)[0];

  const dbRecords = extraProducts.map(p => ({
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    short_desc: p.short_desc,
    description: p.description,
    is_casheable: p.is_casheable,
    specs: p.specs,
    category_id: catRow.id,
    brand_id: brandMap[p.brand_slug] || defaultBrandId
  }));

  console.log(`Ejecutando batch upsert de ${dbRecords.length} productos...`);
  const { error } = await supabase
    .from('products')
    .upsert(dbRecords, { onConflict: 'slug' });

  if (error) {
    console.error('Error en batch upsert:', error.message);
    process.exit(1);
  }

  console.log('✓ Batch upsert completado exitosamente con 4 productos de electricidad!');
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
