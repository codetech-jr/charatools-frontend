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

const outletProducts = [
  {
    name: 'Tomacorriente Doble 270 (15A)',
    slug: 'tomacorriente-doble-270-15a',
    sku: 'CHARATOOLS-TOMA-DOBLE-270-15A',
    short_desc: 'Tomacorriente doble estándar 270 de 15A a 125V para empotrar con terminales de tornillo.',
    description: 'Mecanismo de tomacorriente doble estándar línea 270 con capacidad de 15 Amperios a 125V. Fabricado en policarbonato de alta resistencia con bornes de conexión seguros de tornillo. Ideal para reemplazo y montajes en cajetines rectangulares residenciales y comerciales.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 1,
      tags: ['tomacorriente', 'toma doble', '270', '15A', '125V', 'electricidad', 'interruptor'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'tomacorrientes'
    }
  },
  {
    name: 'Tomacorriente Doble 270 (20A - Ranura en T)',
    slug: 'tomacorriente-doble-270-20a',
    sku: 'CHARATOOLS-TOMA-DOBLE-270-20A',
    short_desc: 'Tomacorriente doble reforzado 270 de 20A a 125V con ranura en T (NEMA 5-20R) para equipos de alto consumo.',
    description: 'Tomacorriente doble línea 270 de uso pesado con capacidad de 20 Amperios a 125V (NEMA 5-20R con ranura en T). Diseñado para electrodomésticos y equipos comerciales que demandan mayor potencia sin recalentamiento.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 2,
      tags: ['tomacorriente', 'toma doble', '270', '20A', 'NEMA 5-20', 'alto consumo', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'tomacorrientes'
    }
  },
  {
    name: 'Tomacorrientes e Interruptores Decorativos (Línea Modular)',
    slug: 'tomas-e-interruptores-decorativos',
    sku: 'CHARATOOLS-TOMAS-DECORATIVAS',
    short_desc: 'Placas, tomacorrientes e interruptores decorativos de lujo en acabados Champagne, Grafito y Blanco.',
    description: 'Línea de interruptores y tomacorrientes decorativos de diseño elegante y moderno para el hogar y oficinas. Placas modulares de acabado premium disponibles en variedad de configuraciones y acabados decorativos de alta estética.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 3,
      tags: ['tomacorriente', 'interruptor', 'decorativo', 'placa', 'lujo', 'modular', 'champagne', 'grafito', 'blanco', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tomacorrientes',
      subitem: 'linea-decorativa',
      variantLabel: 'Configuración',
      variants: [
        { value: 'Tomacorriente Doble' },
        { value: 'Interruptor Simple' },
        { value: 'Interruptor Doble' },
        { value: 'Interruptor Triple' },
        { value: 'Toma + Interruptor Combinado' }
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

  const dbRecords = outletProducts.map(prod => ({
    ...prod,
    category_id: catRow.id,
    brand_id: brandId,
  }));

  console.log(`Ejecutando batch upsert de ${dbRecords.length} productos...`);
  const { data, error } = await supabase
    .from('products')
    .upsert(dbRecords, { onConflict: 'slug' });

  if (error) {
    console.error('Error en batch upsert:', error.message);
    process.exit(1);
  }

  console.log('✓ Batch upsert completado exitosamente con 3 productos!');
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
