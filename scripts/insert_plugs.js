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

const plugProducts = [
  {
    name: 'Enchufe Blindado con Abrazadera Metálica (15A 125V - NEMA 5-15P)',
    slug: 'enchufe-blindado-abrazadera-15a-125v',
    sku: 'CHARATOOLS-ENCHUFE-BLINDADO-15A',
    brand_slug: 'eagle',
    short_desc: 'Enchufe macho blindado de uso industrial con carcasa metálica y abrazadera prensa-cable para 15A 125V.',
    description: 'Enchufe macho blindado NEMA 5-15P de 15 Amperios a 125V con polo a tierra. Equipado con coraza metálica de protección contra golpes y abrazadera de sujeción para cables de uso pesado en talleres, obras y extensiones eléctricas.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 4,
      tags: ['enchufe', 'blindado', 'abrazadera', '15A', '125V', 'NEMA 5-15P', 'tierra', 'electricidad', 'industrial'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'enchufes-conectores'
    }
  },
  {
    name: 'Enchufe con Abrazadera y Polo a Tierra (15A 125V)',
    slug: 'enchufe-abrazadera-tierra-15a-125v',
    sku: 'CHARATOOLS-ENCHUFE-GOMA-15A',
    brand_slug: 'tania-wiring',
    short_desc: 'Enchufe macho con polo a tierra y abrazadera metálica de ajuste para cable en talleres y hogar.',
    description: 'Enchufe macho estándar de 15 Amperios a 125V con espiga de conexión a tierra y abrazadera de doble tornillo para fijación segura del cable de alimentación. Ideal para armado y reparación de extensiones y herramientas eléctricas.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 5,
      tags: ['enchufe', 'macho', 'abrazadera', 'tierra', '15A', '125V', 'extensión', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'enchufes-conectores'
    }
  },
  {
    name: 'Enchufe de Potencia Tripolar (30A 125/250V)',
    slug: 'enchufe-potencia-tripolar-30a-250v',
    sku: 'CHARATOOLS-ENCHUFE-POTENCIA-30A',
    brand_slug: 'tania-wiring',
    short_desc: 'Enchufe macho de alta potencia tripolar en ángulo de 30A 125/250V para cocinas, secadoras y soldadoras.',
    description: 'Enchufe macho industrial tripolar de 30 Amperios a 125/250V con cuerpo termoplástico de alta resistencia al impacto y al calor. Terminales de cobre macizo para conexión segura de equipos de alta potencia como aires acondicionados, secadoras, cocinas eléctricas y máquinas de soldar.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 6,
      tags: ['enchufe', 'potencia', 'tripolar', '30A', '250V', 'secadora', 'soldadora', 'cocina eléctrica', 'industrial'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'enchufes-conectores'
    }
  },
  {
    name: 'Toma Aérea Polarizada Blindada (15A 250V)',
    slug: 'toma-aerea-polarizada-blindada-15a-250v',
    sku: 'CHARATOOLS-TOMA-AEREA-BLINDADA-15A',
    brand_slug: 'tania-wiring',
    short_desc: 'Conector hembra aéreo blindado con abrazadera de alta durabilidad para extensiones eléctricas de 15A 250V.',
    description: 'Conector toma hembra aérea blindada de 15 Amperios a 250V polarizada con abrazadera metálica de alivio de tensión. Cuerpo en polímero amarillo de alta visibilidad y resistencia mecánica para entornos de trabajo exigentes.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 7,
      tags: ['toma aérea', 'hembra', 'blindada', 'polarizada', '15A', '250V', 'extensión', 'taller', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'enchufes-conectores'
    }
  },
  {
    name: 'Toma Aérea Tripolar de Potencia NEMA 10-30R (30A 125/250V)',
    slug: 'toma-aerea-tripolar-potencia-30a-250v',
    sku: 'CHARATOOLS-TOMA-AEREA-POTENCIA-30A',
    brand_slug: 'tania-wiring',
    short_desc: 'Conector hembra aéreo de potencia tripolar 10-30R de 30A 125/250V en material fenólico para uso pesado.',
    description: 'Toma aérea hembra tripolar de potencia configuración NEMA 10-30R de 30 Amperios a 125/250V. Fabricada en resina fenólica resistente a altas temperaturas y arcos eléctricos. Ideal para extensiones de maquinaria pesada, plantas eléctricas y conexiones industriales.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 8,
      tags: ['toma aérea', 'hembra', 'potencia', 'tripolar', 'NEMA 10-30R', '30A', '250V', 'fenólica', 'industrial'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'enchufes-conectores'
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

  // Asegurar marcas Eagle y Tania Wiring
  const brandsToEnsure = [
    { name: 'Eagle', slug: 'eagle' },
    { name: 'Tania Wiring', slug: 'tania-wiring' }
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

  const dbRecords = plugProducts.map(p => ({
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

  console.log(`Ejecutando batch upsert de ${dbRecords.length} enchufes y tomas aéreas...`);
  const { error } = await supabase
    .from('products')
    .upsert(dbRecords, { onConflict: 'slug' });

  if (error) {
    console.error('Error en batch upsert:', error.message);
    process.exit(1);
  }

  console.log('✓ Batch upsert completado exitosamente con 5 productos de enchufes y tomas aéreas!');
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
