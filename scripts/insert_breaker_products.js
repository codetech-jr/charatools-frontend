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

const breakerProducts = [
  // ── THQC Superficial (Atornillable) ───────────────────────────────────────
  {
    name: 'Breaker THQC Superficial 1 Polo',
    slug: 'breaker-thqc-superficial-1-polo',
    sku: 'CHARATOOLS-BREAKER-THQC-1P',
    short_desc: 'Interruptor termomagnético tipo THQC superficial (atornillable) monofásico de 1 polo para tableros eléctricos.',
    description: 'Interruptor termomagnético tipo THQC superficial (atornillable) monofásico de 1 polo para tableros eléctricos residenciales y comerciales.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 5,
      tags: ['breaker', 'THQC', 'superficial', 'atornillable', '1 polo', 'termomagnético', 'disyuntor', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '15A' },
        { value: '20A' },
        { value: '30A' },
        { value: '40A' },
        { value: '50A' },
        { value: '60A' }
      ]
    }
  },
  {
    name: 'Breaker THQC Superficial 2 Polos',
    slug: 'breaker-thqc-superficial-2-polos',
    sku: 'CHARATOOLS-BREAKER-THQC-2P',
    short_desc: 'Interruptor termomagnético tipo THQC superficial (atornillable) bifásico de 2 polos para protección de 240V.',
    description: 'Interruptor termomagnético tipo THQC superficial (atornillable) bifásico de 2 polos para protección de circuitos de 240V.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 6,
      tags: ['breaker', 'THQC', 'superficial', 'atornillable', '2 polos', 'bifásico', 'termomagnético', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '20A' },
        { value: '30A' },
        { value: '40A' },
        { value: '50A' },
        { value: '60A' },
        { value: '70A' },
        { value: '100A' }
      ]
    }
  },
  {
    name: 'Breaker THQC Superficial 3 Polos',
    slug: 'breaker-thqc-superficial-3-polos',
    sku: 'CHARATOOLS-BREAKER-THQC-3P',
    short_desc: 'Interruptor termomagnético tipo THQC superficial (atornillable) trifásico de 3 polos para tableros industriales.',
    description: 'Interruptor termomagnético tipo THQC superficial (atornillable) trifásico de 3 polos para equipos industriales y tableros trifásicos.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 7,
      tags: ['breaker', 'THQC', 'superficial', 'atornillable', '3 polos', 'trifásico', 'termomagnético', 'industrial'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '20A' },
        { value: '30A' },
        { value: '40A' },
        { value: '50A' },
        { value: '60A' },
        { value: '70A' },
        { value: '100A' }
      ]
    }
  },

  // ── THQL Empotrable (Enchufable / Plug-in) ─────────────────────────────────
  {
    name: 'Breaker THQL Empotrable 1 Polo',
    slug: 'breaker-thql-empotrable-1-polo',
    sku: 'CHARATOOLS-BREAKER-THQL-1P',
    short_desc: 'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) monofásico de 1 polo.',
    description: 'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) monofásico de 1 polo para tableros residenciales y comerciales.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 8,
      tags: ['breaker', 'THQL', 'empotrable', 'enchufable', '1 polo', 'plug-in', 'termomagnético', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '15A' },
        { value: '20A' },
        { value: '30A' },
        { value: '40A' },
        { value: '50A' },
        { value: '60A' }
      ]
    }
  },
  {
    name: 'Breaker THQL Empotrable 2 Polos',
    slug: 'breaker-thql-empotrable-2-polos',
    sku: 'CHARATOOLS-BREAKER-THQL-2P',
    short_desc: 'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) bifásico de 2 polos para 240V.',
    description: 'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) bifásico de 2 polos para protección de circuitos de 240V.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 9,
      tags: ['breaker', 'THQL', 'empotrable', 'enchufable', '2 polos', 'bifásico', 'plug-in', 'termomagnético'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '20A' },
        { value: '30A' },
        { value: '40A' },
        { value: '50A' },
        { value: '60A' },
        { value: '70A' },
        { value: '100A' }
      ]
    }
  },
  {
    name: 'Breaker THQL Empotrable 3 Polos',
    slug: 'breaker-thql-empotrable-3-polos',
    sku: 'CHARATOOLS-BREAKER-THQL-3P',
    short_desc: 'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) trifásico de 3 polos.',
    description: 'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) trifásico de 3 polos para tableros trifásicos y maquinaria.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 10,
      tags: ['breaker', 'THQL', 'empotrable', 'enchufable', '3 polos', 'trifásico', 'plug-in', 'termomagnético'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '20A' },
        { value: '30A' },
        { value: '40A' },
        { value: '50A' },
        { value: '60A' },
        { value: '70A' },
        { value: '100A' }
      ]
    }
  }
];

async function main() {
  console.log('Obteniendo ID de categoría "electricidad"...');
  let { data: catRow, error: catErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'electricidad')
    .single();

  if (catErr || !catRow) {
    console.error('Error al obtener la categoría electricidad:', catErr);
    process.exit(1);
  }

  console.log('Verificando / insertando marca Exceline...');
  let { data: brandRow } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', 'exceline')
    .single();

  if (!brandRow) {
    const { data: newBrand, error: brandErr } = await supabase
      .from('brands')
      .insert({ name: 'Exceline', slug: 'exceline', logo_url: '/categoria-electricidad.webp' })
      .select('id')
      .single();

    if (brandErr) {
      console.warn('No se pudo crear marca Exceline, usando fallback Genérico:', brandErr.message);
      const { data: genericBrand } = await supabase.from('brands').select('id').eq('slug', 'generico').single();
      brandRow = genericBrand;
    } else {
      brandRow = newBrand;
      console.log('✓ Marca Exceline creada con éxito.');
    }
  }

  console.log(`Insertando / Actualizando ${breakerProducts.length} productos de breakers en Supabase...`);
  let insertedCount = 0;

  for (const prod of breakerProducts) {
    const dbRecord = {
      ...prod,
      category_id: catRow.id,
      brand_id: brandRow.id,
    };

    const { error } = await supabase
      .from('products')
      .upsert(dbRecord, { onConflict: 'slug' });

    if (error) {
      console.error(`Error procesando ${prod.name}:`, error.message);
    } else {
      console.log(`✓ Insertado / Actualizado en Supabase: ${prod.name}`);
      insertedCount++;
    }
  }

  console.log(`¡Proceso completado! ${insertedCount} productos de breakers procesados.`);
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
