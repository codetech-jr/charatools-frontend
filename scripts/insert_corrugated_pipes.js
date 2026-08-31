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

const corrugatedProducts = [
  {
    name: 'Tubo Corrugado Flexible Plástico (Poliflex)',
    slug: 'tubo-corrugado-plastico',
    sku: 'CHARATOOLS-CORRUGADO-PLASTICO',
    short_desc: 'Manguera corrugada flexible en PVC para canalización eléctrica en muros, techos y drywall.',
    description: 'Tubería flexible corrugada (poliflex) fabricada en PVC termoplástico autoextinguible. Facilita el tendido de cables eléctricos en instalaciones con curvas continuas sin necesidad de accesorios de unión, ideal para losas, tabiquería y techos falsos.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 11,
      tags: ['tubo', 'corrugado', 'flexible', 'manguera', 'poliflex', 'plástico', 'canalización', 'electricidad'],
      stockStatus: 'available',
      unidad: 'rollo',
      subcategory: 'canalizacion',
      subitem: 'tuberia-conduit',
      variantLabel: 'Diámetro',
      variants: [
        { value: '1/2"' },
        { value: '3/4"' },
        { value: '1"' }
      ]
    }
  },
  {
    name: 'Tubo Corrugado Flexible Metálico (BX)',
    slug: 'tubo-corrugado-metalico',
    sku: 'CHARATOOLS-CORRUGADO-METALICO',
    short_desc: 'Tubería flexible metálica de acero galvanizado para acometidas de motores y maquinaria industrial.',
    description: 'Tubo flexible fabricado con cinta de acero galvanizado engatillada de alta resistencia mecánica contra aplastamiento y cortes. Diseñado para la protección de conductores eléctricos en motores, bombas, transformadores y maquinaria sujeta a vibraciones constantes.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 12,
      tags: ['tubo', 'corrugado', 'metálico', 'flexible', 'BX', 'acero galvanizado', 'motores', 'maquinaria', 'canalización'],
      stockStatus: 'available',
      unidad: 'm',
      subcategory: 'canalizacion',
      subitem: 'tuberia-conduit',
      variantLabel: 'Diámetro',
      variants: [
        { value: '1/2"' },
        { value: '3/4"' },
        { value: '1"' },
        { value: '1 1/2"' },
        { value: '2"' }
      ]
    }
  }
];

async function main() {
  console.log('Obteniendo IDs de categoría y marca...');
  const [{ data: catRow }, { data: brandRow }] = await Promise.all([
    supabase.from('categories').select('id').eq('slug', 'electricidad').single(),
    supabase.from('brands').select('id').eq('slug', 'generico').single()
  ]);

  if (!catRow) {
    console.error('Error al obtener la categoría electricidad');
    process.exit(1);
  }

  const brandId = brandRow ? brandRow.id : (await supabase.from('brands').select('id').limit(1).single()).data.id;

  const dbRecords = corrugatedProducts.map(prod => ({
    ...prod,
    category_id: catRow.id,
    brand_id: brandId,
  }));

  console.log(`Ejecutando batch upsert de ${dbRecords.length} tubos corrugados...`);
  const { error } = await supabase
    .from('products')
    .upsert(dbRecords, { onConflict: 'slug' });

  if (error) {
    console.error('Error en batch upsert:', error.message);
    process.exit(1);
  }

  console.log('✓ Batch upsert completado exitosamente con 2 productos de tubos corrugados!');
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
