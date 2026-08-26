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

const pumpProduct = {
  name: 'Bomba Centrífuga de Agua',
  slug: 'bomba-centrifuga',
  sku: 'CHARATOOLS-BOMBA-CENTRIFUGA',
  short_desc: 'Bomba centrífuga de alto caudal para suministro, elevación de agua limpia y sistemas hidroneumáticos.',
  description: 'Electrobomba centrífuga diseñada para transferir grandes volúmenes de agua limpia con flujo continuo y presión estable. Ideal para sistemas hidroneumáticos, riego, llenado de tanques elevados y abastecimiento en general.',
  is_casheable: true,
  specs: {
    imagen: '/categoria-plomeria.webp',
    priority: 4,
    tags: ['bomba', 'centrífuga', 'agua', 'alto caudal', 'presión', 'tanque', 'hidroneumático'],
    stockStatus: 'available',
    unidad: 'und',
    subcategory: 'bombas',
    subitem: 'bombas-centrifugas',
    variantLabel: 'Potencia',
    variants: [
      { value: '1 HP' },
      { value: '2 HP' }
    ]
  }
};

async function main() {
  console.log('Obteniendo ID de categoría "plomeria"...');
  let { data: catRow, error: catErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'plomeria')
    .single();

  if (catErr || !catRow) {
    console.error('Error al obtener la categoría plomeria:', catErr);
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

  console.log(`Insertando / Actualizando Bomba Centrífuga en Supabase...`);
  const dbRecord = {
    ...pumpProduct,
    category_id: catRow.id,
    brand_id: brandRow.id,
  };

  const { error } = await supabase
    .from('products')
    .upsert(dbRecord, { onConflict: 'slug' });

  if (error) {
    console.error(`Error procesando Bomba Centrífuga:`, error.message);
  } else {
    console.log(`✓ Insertado / Actualizado en Supabase: ${pumpProduct.name}`);
  }

  console.log('¡Proceso completado con éxito!');
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
