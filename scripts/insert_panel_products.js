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

const panelProducts = [
  {
    name: 'Tablero Eléctrico Sin Puerta',
    slug: 'tablero-electrico-sin-puerta',
    sku: 'CHARATOOLS-TABLERO-SIN-PUERTA',
    short_desc: 'Tablero de distribución eléctrica metálico sin puerta para breakers residenciales y comerciales.',
    description: 'Tablero de distribución eléctrica metálico sin puerta para breakers residenciales y comerciales.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 1,
      tags: ['tablero', 'distribución', 'eléctrico', 'sin puerta', 'circuitos', 'breaker'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Circuitos',
      variants: [
        { value: '2 Circuitos' },
        { value: '4 Circuitos' },
        { value: '6 Circuitos' }
      ]
    }
  },
  {
    name: 'Tablero Eléctrico Con Puerta',
    slug: 'tablero-electrico-con-puerta',
    sku: 'CHARATOOLS-TABLERO-CON-PUERTA',
    short_desc: 'Tablero metálico de distribución con puerta frontal para protección de breakers en instalaciones eléctricas.',
    description: 'Tablero metálico de distribución con puerta frontal para protección de breakers en instalaciones eléctricas.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 2,
      tags: ['tablero', 'distribución', 'con puerta', 'eléctrico', 'circuitos', 'breaker', 'metálico'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Circuitos',
      variants: [
        { value: '4 Circuitos' },
        { value: '6 Circuitos' },
        { value: '8 Circuitos' },
        { value: '12 Circuitos' }
      ]
    }
  },
  {
    name: 'Tablero Termomagnético Riel DIN',
    slug: 'tablero-termomagnetico-riel-din',
    sku: 'CHARATOOLS-TABLERO-TERMOMAGNETICO',
    short_desc: 'Caja y tablero de distribución en PVC para interruptores termomagnéticos riel DIN de 1 a 8 circuitos.',
    description: 'Caja y tablero de distribución en PVC para interruptores termomagnéticos riel DIN de 1 a 8 circuitos.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 3,
      tags: ['tablero', 'termomagnético', 'riel DIN', 'PVC', 'distribución', 'breaker'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Circuitos',
      variants: [
        { value: '1 Circuito' },
        { value: '2 Circuitos' },
        { value: '4 Circuitos' },
        { value: '6 Circuitos' },
        { value: '8 Circuitos' }
      ]
    }
  },
  {
    name: 'Tablero Termomagnético con Puerta Fumé (Empotrable y Superficial)',
    slug: 'tablero-termomagnetico-puerta-fume',
    sku: 'CHARATOOLS-TABLERO-PUERTA-FUME',
    short_desc: 'Tablero de distribución modular con tapa / puerta acrílica fumé transparente para montaje superficial o empotrable.',
    description: 'Tablero de distribución modular con tapa / puerta acrílica fumé transparente para montaje superficial o empotrable.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 4,
      tags: ['tablero', 'termomagnético', 'puerta fumé', 'empotrable', 'superficial', 'acrílico', 'breaker', 'distribución'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Circuitos',
      variants: [
        { value: '2 Circuitos' },
        { value: '4 Circuitos' },
        { value: '8 Circuitos' },
        { value: '10 Circuitos' },
        { value: '12 Circuitos' },
        { value: '24 Circuitos' }
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

  console.log('Obteniendo marca por defecto (Genérico)...');
  let { data: brandRow } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', 'generico')
    .single();

  if (!brandRow) {
    const { data: fallbackBrand } = await supabase.from('brands').select('id').limit(1).single();
    brandRow = fallbackBrand;
  }

  console.log(`Insertando / Actualizando ${panelProducts.length} productos de tableros en Supabase...`);
  let insertedCount = 0;

  for (const prod of panelProducts) {
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

  console.log(`¡Proceso completado! ${insertedCount} productos de tableros eléctricos procesados.`);
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
