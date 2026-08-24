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

const emergencyProducts = [
  {
    name: 'Lámpara de Emergencia LED Lumistar 6W Multivoltaje',
    slug: 'lampara-emergencia-led-lumistar-6w',
    sku: 'CHARATOOLS-LAMPARA-EMERGENCIA-6W',
    short_desc: 'Lámpara de emergencia LED Lumistar 6W multivoltaje (85-265V) con autonomía de hasta 3 horas y doble faro orientable.',
    description: 'Lámpara de emergencia LED Lumistar 6W multivoltaje (85-265V) con autonomía de hasta 3 horas y doble faro orientable.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 1,
      tags: ['LED', 'lámpara', 'emergencia', 'Lumistar', '6W', 'recargable', 'multivoltaje', '3 horas'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'emergencia',
      subitem: 'emergencia',
      variantLabel: 'Potencia',
      variants: [
        { value: '6W' }
      ]
    }
  },
  {
    name: 'Bombillo LED de Emergencia Recargable 9W',
    slug: 'bombillo-led-emergencia-9w-recargable',
    sku: 'CHARATOOLS-BOMBILLO-EMERGENCIA-9W',
    short_desc: 'Bombillo LED recargable de emergencia 9W multivoltaje (85-265V) 6500K blanco frío con socket y gancho portátil.',
    description: 'Bombillo LED recargable de emergencia 9W multivoltaje (85-265V) 6500K blanco frío con socket y gancho portátil.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 2,
      tags: ['LED', 'bombillo', 'emergencia', 'recargable', '9W', 'Lumistar', '6500K', 'gancho portátil'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'emergencia',
      subitem: 'emergencia',
      variantLabel: 'Potencia',
      variants: [
        { value: '9W' }
      ]
    }
  }
];

async function main() {
  console.log('Obteniendo ID de categoría "iluminacion"...');
  let { data: catRow, error: catErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'iluminacion')
    .single();

  if (catErr || !catRow) {
    console.error('Error al obtener la categoría iluminacion:', catErr);
    process.exit(1);
  }

  console.log('Obteniendo o creando marca "Lumistar"...');
  let { data: brandRow } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', 'lumistar')
    .single();

  if (!brandRow) {
    const { data: newBrand, error: brandCreateErr } = await supabase
      .from('brands')
      .upsert({ name: 'Lumistar', slug: 'lumistar' }, { onConflict: 'slug' })
      .select('id')
      .single();
    if (brandCreateErr || !newBrand) {
      console.warn('No se pudo crear/obtener marca Lumistar, buscando marca fallback...');
      const { data: fallbackBrand } = await supabase.from('brands').select('id').limit(1).single();
      brandRow = fallbackBrand;
    } else {
      brandRow = newBrand;
    }
  }

  console.log(`Insertando ${emergencyProducts.length} productos de emergencia en Supabase...`);
  let insertedCount = 0;

  for (const prod of emergencyProducts) {
    const dbRecord = {
      ...prod,
      category_id: catRow.id,
      brand_id: brandRow.id,
    };

    const { error } = await supabase
      .from('products')
      .upsert(dbRecord, { onConflict: 'slug' });

    if (error) {
      console.error(`Error insertando ${prod.name}:`, error.message);
    } else {
      console.log(`✓ Insertado / Actualizado en Supabase: ${prod.name}`);
      insertedCount++;
    }
  }

  console.log(`¡Proceso completado! ${insertedCount} de ${emergencyProducts.length} productos de emergencia procesados.`);
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
