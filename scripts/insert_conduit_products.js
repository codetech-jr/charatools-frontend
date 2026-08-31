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

const conduitProducts = [
  {
    name: 'Tubo PVC Conduit para Electricidad',
    slug: 'tubo-pvc-conduit',
    sku: 'CHARATOOLS-TUBO-PVC-CONDUIT',
    short_desc: 'Tubo rígido de PVC tipo conduit para canalización y protección de cableado eléctrico.',
    description: 'Tubería rígida de PVC conduit para instalaciones eléctricas embutidas en paredes, techos y losas de concreto o a la vista. Fabricada en material autoextinguible y no propagador de llama, de alta resistencia dieléctrica y mecánica. Tramos estándar de 3 metros.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 1,
      tags: ['tubo', 'pvc', 'conduit', 'canalización', 'cableado', 'electricidad', 'tuberia'],
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
    name: 'Curva PVC Conduit 90°',
    slug: 'curva-pvc-conduit',
    sku: 'CHARATOOLS-CURVA-PVC-CONDUIT',
    short_desc: 'Curva de 90 grados en PVC conduit para cambios de dirección en canalizaciones eléctricas.',
    description: 'Accesorio curva de 90° en PVC conduit para realizar cambios de dirección suaves y seguros en el tendido de tuberías eléctricas, evitando la fricción y daño del cableado conductor durante el jalado.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 2,
      tags: ['curva', 'pvc', 'conduit', '90 grados', 'canalización', 'accesorios', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'canalizacion',
      subitem: 'accesorios-conduit',
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
    name: 'Cajetín PVC Rectangular 4x2"',
    slug: 'cajetin-pvc-rectangular-4x2',
    sku: 'CHARATOOLS-CAJETIN-PVC-4X2',
    short_desc: 'Cajetín plástico rectangular 4x2" para empotrar tomacorrientes e interruptores.',
    description: 'Cajetín rectangular de 4x2 pulgadas fabricado en PVC de alto impacto con troqueles / knockouts premarcados para tubería conduit de 1/2" y 3/4". Diseñado para alojamiento seguro de tomacorrientes, interruptores y salidas de datos en paredes de mampostería o drywall.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 3,
      tags: ['cajetin', 'pvc', '4x2', 'rectangular', 'caja', 'empotrar', 'canalización', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'canalizacion',
      subitem: 'cajetines-cajas'
    }
  },
  {
    name: 'Cajetín PVC Cuadrado 4x4"',
    slug: 'cajetin-pvc-cuadrado-4x4',
    sku: 'CHARATOOLS-CAJETIN-PVC-4X4',
    short_desc: 'Cajetín plástico cuadrado 4x4" para cajas de paso, empalmes y tapas dobles.',
    description: 'Cajetín cuadrado de 4x4 pulgadas en PVC resistente con múltiples entradas pre-troqueladas para tuberías de 1/2" y 3/4". Ideal para cajas de paso, derivaciones de circuitos eléctricos, placas de doble ventana y conexiones de alta densidad.',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 4,
      tags: ['cajetin', 'pvc', '4x4', 'cuadrado', 'caja de paso', 'derivación', 'canalización', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'canalizacion',
      subitem: 'cajetines-cajas'
    }
  },
  {
    name: 'Cajetín PVC Octogonal para Techo y Lámparas',
    slug: 'cajetin-pvc-octogonal',
    sku: 'CHARATOOLS-CAJETIN-PVC-OCTOGONAL',
    short_desc: 'Cajetín plástico octogonal para empotrar en techos, losas y salidas de iluminación.',
    description: 'Cajetín octogonal en PVC reforzado diseñado para montaje en losas, cielo rasos y techos. Proporciona soporte firme para lámparas, plafones, ventiladores y puntos de iluminación con entradas para tubería conduit de 1/2" y 3/4".',
    is_casheable: false,
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 5,
      tags: ['cajetin', 'pvc', 'octogonal', 'techo', 'losa', 'iluminación', 'lámpara', 'canalización', 'electricidad'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'canalizacion',
      subitem: 'cajetines-cajas'
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

  const dbRecords = conduitProducts.map(prod => ({
    ...prod,
    category_id: catRow.id,
    brand_id: brandId,
  }));

  console.log(`Ejecutando batch upsert de ${dbRecords.length} productos de canalización...`);
  const { error } = await supabase
    .from('products')
    .upsert(dbRecords, { onConflict: 'slug' });

  if (error) {
    console.error('Error en batch upsert:', error.message);
    process.exit(1);
  }

  console.log('✓ Batch upsert completado exitosamente con 5 productos de canalización!');
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
