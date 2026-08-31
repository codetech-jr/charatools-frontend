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

const emtAndCanaletaProducts = [
  {
    name: 'Cajetín Metálico EMT Rectangular 2x4"',
    slug: 'cajetin-emt-rectangular-2x4',
    sku: 'CHARATOOLS-CAJETIN-EMT-2X4',
    brand_slug: 'tezza',
    short_desc: 'Cajetín metálico galvanizado EMT rectangular 2x4" con troqueles combinados de 1/2" y 3/4".',
    description: 'Cajetín metálico en lámina de acero galvanizado calibre estándar para canalización eléctrica EMT. Formato rectangular 2x4 pulgadas con orificios pre-estampados (knockouts) combinados para conectores de 1/2" y 3/4". Alta resistencia mecánica y protección contra fuego.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 6,
      tags: ['cajetin', 'emt', 'metálico', 'galvanizado', '2x4', 'rectangular', 'canalización', 'electricidad', 'Tezza'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'canalizacion',
      subitem: 'cajetines-cajas'
    }
  },
  {
    name: 'Cajetín Metálico EMT Cuadrado 4x4"',
    slug: 'cajetin-emt-cuadrado-4x4',
    sku: 'CHARATOOLS-CAJETIN-EMT-4X4',
    brand_slug: 'tezza',
    short_desc: 'Cajetín metálico galvanizado EMT cuadrado 4x4" para cajas de paso, empalmes y placas dobles.',
    description: 'Cajetín cuadrado 4x4 pulgadas en acero galvanizado con troqueles laterales y posteriores combinados de 1/2" y 3/4" y tornillo de aterramiento. Ideal para derivaciones de cableado y cajas de paso.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 7,
      tags: ['cajetin', 'emt', 'metálico', 'galvanizado', '4x4', 'cuadrado', 'caja de paso', 'canalización', 'Tezza'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'canalizacion',
      subitem: 'cajetines-cajas'
    }
  },
  {
    name: 'Cajetín Metálico EMT Octogonal 4x4"',
    slug: 'cajetin-emt-octogonal-4x4',
    sku: 'CHARATOOLS-CAJETIN-EMT-OCTOGONAL',
    brand_slug: 'tezza',
    short_desc: 'Cajetín metálico galvanizado octogonal 4x4" para salidas de techo, losas y lámparas pesadas.',
    description: 'Cajetín octogonal metálico en acero galvanizado para empotrar en losas o fijar en cielos rasos y estructuras industriales. Proporciona anclaje robusto y seguro para luminarias y reflectores.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 8,
      tags: ['cajetin', 'emt', 'metálico', 'galvanizado', 'octogonal', 'techo', 'lámpara', 'iluminación', 'Tezza'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'canalizacion',
      subitem: 'cajetines-cajas'
    }
  },
  {
    name: 'Tubo EMT Metálico Galvanizado',
    slug: 'tubo-emt-galvanizado',
    sku: 'CHARATOOLS-TUBO-EMT',
    brand_slug: 'generico',
    short_desc: 'Tubo metálico rígido EMT galvanizado para canalización eléctrica comercial e industrial (tramos de 3m).',
    description: 'Tubería metálica rígida tipo EMT de acero galvanizado por inmersión en caliente. Interior liso para facilitar el enhebrado de cables sin desgaste. Cumple con normas técnicas para instalaciones a la vista o embutidas.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 9,
      tags: ['tubo', 'emt', 'metálico', 'galvanizado', 'canalización', 'tubería', 'industrial', 'electricidad'],
      stockStatus: 'available',
      unidad: 'tubo',
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
  },
  {
    name: 'Canaleta Plástica de Superficie en PVC',
    slug: 'canaleta-plastica-superficie-pvc',
    sku: 'CHARATOOLS-CANALETA-PVC',
    brand_slug: 'generico',
    short_desc: 'Canaleta de PVC para distribución y organización superficial de cableado eléctrico y de red.',
    description: 'Canaleta de montaje superficial en PVC de alta resistencia con tapa a presión de cierre hermético. Permite ocultar, ordenar y proteger cables eléctricos, de red (UTP) o audio/video sin romper paredes.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 10,
      tags: ['canaleta', 'pvc', 'plástica', 'superficie', 'cables', 'red', 'organizador', 'canalización'],
      stockStatus: 'available',
      unidad: 'tira',
      subcategory: 'canalizacion',
      subitem: 'canaletas-accesorios',
      variantLabel: 'Medida',
      variants: [
        { value: '10x20 mm' },
        { value: '20x12 mm' },
        { value: '24x14 mm' },
        { value: '40x25 mm' },
        { value: '60x40 mm' },
        { value: '100x50 mm' }
      ]
    }
  }
];

async function main() {
  console.log('Obteniendo IDs de categoría y marca...');
  const { data: catRow, error: catErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'electricidad')
    .single();

  if (catErr || !catRow) {
    console.error('Error al obtener la categoría electricidad');
    process.exit(1);
  }

  // Asegurar marca Tezza
  let { data: tezzaBrand } = await supabase.from('brands').select('id').eq('slug', 'tezza').single();
  if (!tezzaBrand) {
    const { data: created } = await supabase.from('brands').insert({ name: 'Tezza', slug: 'tezza', logo_url: '/categoria-electricidad.webp' }).select('id').single();
    tezzaBrand = created;
    console.log('✓ Marca Tezza creada en Supabase.');
  }

  const { data: genericBrand } = await supabase.from('brands').select('id').eq('slug', 'generico').single();
  const defaultBrandId = genericBrand ? genericBrand.id : tezzaBrand.id;

  const dbRecords = emtAndCanaletaProducts.map(prod => ({
    name: prod.name,
    slug: prod.slug,
    sku: prod.sku,
    short_desc: prod.short_desc,
    description: prod.description,
    is_casheable: prod.is_casheable,
    specs: prod.specs,
    category_id: catRow.id,
    brand_id: prod.brand_slug === 'tezza' ? tezzaBrand.id : defaultBrandId
  }));

  console.log(`Ejecutando batch upsert de ${dbRecords.length} productos EMT y canaletas...`);
  const { error } = await supabase
    .from('products')
    .upsert(dbRecords, { onConflict: 'slug' });

  if (error) {
    console.error('Error en batch upsert:', error.message);
    process.exit(1);
  }

  console.log('✓ Batch upsert completado exitosamente con 5 productos EMT y canaletas!');
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
