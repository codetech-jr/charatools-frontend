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

const cableProducts = [
  {
    name: 'Cable Eléctrico THW Certificado FONDONORMA',
    slug: 'cable-electrico-thw-certificado-fondonorma',
    sku: 'CHARATOOLS-CABLE-THW-FONDONORMA',
    short_desc: 'Cable THW x 100m, certificado FONDONORMA. Apto para instalaciones residenciales e industriales hasta 600V.',
    description: 'Cable de cobre sólido con aislamiento THW certificado por FONDONORMA. Resistente a humedad, aceites y temperaturas hasta 75°C. Disponible en múltiples calibres.',
    is_casheable: false,
    specs: {
      imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      priority: 1,
      tags: ['cable', 'eléctrico', 'THW', 'FONDONORMA', 'cobre'],
      stockStatus: 'available',
      unidad: 'rollo (100m)',
      subcategory: 'cables',
      subitem: 'cables',
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
        { value: '#2/0', outOfStock: true }
      ]
    }
  },
  {
    name: 'Cable TSN - ST',
    slug: 'cable-tsn-st',
    sku: 'CHARATOOLS-CABLE-TSN-ST',
    short_desc: 'Cable multifilar flexible tipo TSN - ST de cobre para conexiones móviles, equipos de potencia e industrias.',
    description: 'Cable multifilar flexible tipo TSN - ST de cobre para conexiones móviles, equipos de potencia e industrias.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 2,
      tags: ['cable', 'TSN', 'ST', 'goma', 'cobre', 'eléctrico', 'potencia'],
      stockStatus: 'available',
      unidad: 'm',
      subcategory: 'cables',
      subitem: 'cables',
      variantLabel: 'Calibre / Medida',
      variants: [
        { value: '3x14' },
        { value: '3x12' },
        { value: '3x10' },
        { value: '3x08' },
        { value: '2x12' },
        { value: '2x10' }
      ]
    }
  },
  {
    name: 'Cable THW / THHN',
    slug: 'cable-thw-thhn',
    sku: 'CHARATOOLS-CABLE-THW-THHN',
    short_desc: 'Cable monopolar de cobre suave con aislamiento termoplástico THW / THHN para acometidas y tableros eléctricos.',
    description: 'Cable monopolar de cobre suave con aislamiento termoplástico THW / THHN para acometidas y tableros eléctricos.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 3,
      tags: ['cable', 'THW', 'THHN', 'monopolar', 'cobre', 'eléctrico', 'AWG'],
      stockStatus: 'available',
      unidad: 'm',
      subcategory: 'cables',
      subitem: 'cables',
      variantLabel: 'Calibre',
      variants: [
        { value: '14 AWG' },
        { value: '12 AWG' },
        { value: '10 AWG' },
        { value: '8 AWG' },
        { value: '6 AWG' }
      ]
    }
  },
  {
    name: 'Cable SPT (100% Cobre Nacional)',
    slug: 'cable-spt-cobre',
    sku: 'CHARATOOLS-CABLE-SPT',
    short_desc: 'Cable dúplex flexible tipo SPT 100% cobre nacional para extensiones, iluminación y electrodomésticos.',
    description: 'Cable dúplex flexible tipo SPT 100% cobre nacional para extensiones, iluminación y electrodomésticos.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 4,
      tags: ['cable', 'SPT', 'dúplex', 'cobre', 'eléctrico', 'extensión'],
      stockStatus: 'available',
      unidad: 'm',
      subcategory: 'cables',
      subitem: 'cables',
      variantLabel: 'Calibre',
      variants: [
        { value: '2x18 AWG' },
        { value: '2x16 AWG' },
        { value: '2x14 AWG' },
        { value: '2x12 AWG' },
        { value: '2x10 AWG' }
      ]
    }
  },
  {
    name: 'Cable Coaxial RG6',
    slug: 'cable-coaxial-rg6',
    sku: 'CHARATOOLS-CABLE-COAXIAL-RG6',
    short_desc: 'Cable coaxial RG6 blindado de alta frecuencia para televisión por cable, antenas y redes de telecomunicación.',
    description: 'Cable coaxial RG6 blindado de alta frecuencia para televisión por cable, antenas y redes de telecomunicación.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 5,
      tags: ['cable', 'coaxial', 'RG6', 'TV', 'antena', 'telecomunicaciones'],
      stockStatus: 'available',
      unidad: 'm',
      subcategory: 'cables',
      subitem: 'cables',
      variantLabel: 'Color',
      variants: [
        { value: 'Blanco' },
        { value: 'Negro' }
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

  console.log('Obteniendo marca por defecto (3M o Genérico)...');
  let { data: brandRow } = await supabase
    .from('brands')
    .select('id')
    .or('slug.eq.3m,slug.eq.generico')
    .limit(1)
    .single();

  if (!brandRow) {
    const { data: fallbackBrand } = await supabase.from('brands').select('id').limit(1).single();
    brandRow = fallbackBrand;
  }

  console.log(`Insertando / Actualizando ${cableProducts.length} productos de cables en Supabase...`);
  let insertedCount = 0;

  for (const prod of cableProducts) {
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

  console.log(`¡Proceso completado! ${insertedCount} productos de cables procesados.`);
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
