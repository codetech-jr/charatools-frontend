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

const newProducts = [
  {
    name: 'Bombillo LED Bulbo',
    slug: 'bombillo-bulbo-led',
    sku: 'CHARATOOLS-BOMBILLO-BULBO-LED',
    short_desc: 'Bombillo LED tipo bulbo de bajo consumo con luz clara y constante para iluminación residencial y comercial.',
    description: 'Bombillo LED tipo bulbo de bajo consumo con luz clara y constante para iluminación residencial y comercial.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 1,
      tags: ['LED', 'bombillo', 'bulbo', 'iluminación', 'foco', 'E27'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Potencia',
      variants: [
        { value: '5W' },
        { value: '7W' },
        { value: '9W' },
        { value: '12W' },
        { value: '15W' },
        { value: '18W' },
        { value: '20W' }
      ]
    }
  },
  {
    name: 'Bombillo LED Domo',
    slug: 'bombillo-domo-led',
    sku: 'CHARATOOLS-BOMBILLO-DOMO-LED',
    short_desc: 'Bombillo LED formato domo de alta potencia y amplio ángulo de iluminación para grandes áreas.',
    description: 'Bombillo LED formato domo de alta potencia y amplio ángulo de iluminación para grandes áreas.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 2,
      tags: ['LED', 'bombillo', 'domo', 'alta potencia', 'iluminación'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Potencia',
      variants: [
        { value: '20W' },
        { value: '30W' },
        { value: '40W' },
        { value: '50W' },
        { value: '60W' },
        { value: '80W' }
      ]
    }
  },
  {
    name: 'Bombillo LED Vela',
    slug: 'bombillo-vela-led',
    sku: 'CHARATOOLS-BOMBILLO-VELA-LED',
    short_desc: 'Bombillo LED tipo vela decorativo disponible en roscas E-27 y E-14 para lámparas y apliques.',
    description: 'Bombillo LED tipo vela decorativo disponible en roscas E-27 y E-14 para lámparas y apliques.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 3,
      tags: ['LED', 'vela', 'bombillo', 'E-27', 'E-14', 'decorativo'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Rosca / Base',
      variants: [
        { value: 'E-27' },
        { value: 'E-14' }
      ]
    }
  },
  {
    name: 'Tubo LED',
    slug: 'tubo-led',
    sku: 'CHARATOOLS-TUBO-LED',
    short_desc: 'Tubo LED de alto rendimiento para iluminación lineal continua en oficinas, comercios y galpones.',
    description: 'Tubo LED de alto rendimiento para iluminación lineal continua en oficinas, comercios y galpones.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 4,
      tags: ['LED', 'tubo', 'lineal', '60cm', '120cm', 'iluminación'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Longitud',
      variants: [
        { value: '60 cm' },
        { value: '120 cm' }
      ]
    }
  },
  {
    name: 'Bombillo Dicroico GU-10',
    slug: 'bombillo-dicroico-gu-10',
    sku: 'CHARATOOLS-BOMBILLO-DICROICO-GU-10',
    short_desc: 'Bombillo dicroico LED base GU-10 de bajo consumo para iluminación direccional en ojos de buey.',
    description: 'Bombillo dicroico LED base GU-10 de bajo consumo para iluminación direccional en ojos de buey.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 5,
      tags: ['LED', 'dicroico', 'GU10', 'ojo de buey', 'spot', 'foco'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Potencia',
      variants: [
        { value: '5W' },
        { value: '7W' }
      ]
    }
  },
  {
    name: 'Bombillo Dicroico Bi-Pin',
    slug: 'bombillo-dicroico-bi-pin',
    sku: 'CHARATOOLS-BOMBILLO-DICROICO-BI-PIN',
    short_desc: 'Bombillo dicroico LED tipo Bi-Pin de luz dirigida para acento visual en nichos, techos y vitrinas.',
    description: 'Bombillo dicroico LED tipo Bi-Pin de luz dirigida para acento visual en nichos, techos y vitrinas.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 6,
      tags: ['LED', 'dicroico', 'bi-pin', 'ojo de buey', 'spot', 'foco'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Potencia',
      variants: [
        { value: '5W' },
        { value: '7W' }
      ]
    }
  },
  {
    name: 'Bombillo LED Industrial',
    slug: 'bombillo-industrial-led',
    sku: 'CHARATOOLS-BOMBILLO-INDUSTRIAL-LED',
    short_desc: 'Bombillo LED industrial de alta potencia para galpones, talleres y áreas de trabajo exigentes.',
    description: 'Bombillo LED industrial de alta potencia para galpones, talleres y áreas de trabajo exigentes.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 7,
      tags: ['LED', 'industrial', 'bombillo', 'alta potencia', 'galpón'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Potencia',
      variants: [
        { value: '90W' },
        { value: '100W' },
        { value: '150W' }
      ]
    }
  },
  {
    name: 'Reflector LED',
    slug: 'reflector-led',
    sku: 'CHARATOOLS-REFLECTOR-LED',
    short_desc: 'Reflector LED estanco resistente al agua y a la intemperie para fachadas, patios e industria.',
    description: 'Reflector LED estanco resistente al agua y a la intemperie para fachadas, patios e industria.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 8,
      tags: ['LED', 'reflector', 'exterior', 'IP65', 'proyector', 'potencia'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Potencia',
      variants: [
        { value: '10W' },
        { value: '20W' },
        { value: '30W' },
        { value: '40W' },
        { value: '50W' },
        { value: '100W' },
        { value: '150W' },
        { value: '200W' },
        { value: '300W' },
        { value: '400W' }
      ]
    }
  },
  {
    name: 'Reflector LED Panel Solar 100W',
    slug: 'reflector-led-panel-solar',
    sku: 'CHARATOOLS-REFLECTOR-LED-PANEL-SOLAR',
    short_desc: 'Reflector solar LED de 100W con panel solar independiente, encendido automático y control remoto.',
    description: 'Reflector solar LED de 100W con panel solar independiente, encendido automático y control remoto.',
    is_casheable: false,
    specs: {
      imagen: '/iluminacion.webp',
      priority: 9,
      tags: ['LED', 'reflector', 'solar', 'panel solar', '100W', 'autónomo'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'focos-led',
      subitem: 'focos-led',
      variantLabel: 'Potencia',
      variants: [
        { value: '100W' }
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

  console.log('Obteniendo ID de marca "generico"...');
  let { data: brandRow, error: brandErr } = await supabase
    .from('brands')
    .select('id')
    .or('slug.eq.generico,slug.eq.philips')
    .limit(1)
    .single();

  if (brandErr || !brandRow) {
    console.warn('No se encontró la marca generico/philips, buscando cualquier marca...');
    const { data: fallbackBrand } = await supabase.from('brands').select('id').limit(1).single();
    brandRow = fallbackBrand;
  }

  console.log(`Actualizando prioridades de ${newProducts.length} productos en Supabase...`);
  let insertedCount = 0;

  for (const prod of newProducts) {
    // Preservar la imagen actual si ya existe en Supabase
    const { data: existingProd } = await supabase
      .from('products')
      .select('specs')
      .eq('slug', prod.slug)
      .single();

    const currentSpecs = existingProd?.specs || {};
    const mergedSpecs = {
      ...currentSpecs,
      ...prod.specs,
      imagen: currentSpecs.imagen && currentSpecs.imagen !== '/iluminacion.webp' ? currentSpecs.imagen : prod.specs.imagen
    };

    const dbRecord = {
      ...prod,
      specs: mergedSpecs,
      category_id: catRow.id,
      brand_id: brandRow.id,
    };

    const { error } = await supabase
      .from('products')
      .upsert(dbRecord, { onConflict: 'slug' });

    if (error) {
      console.error(`Error actualizando ${prod.name}:`, error.message);
    } else {
      console.log(`✓ Prioridad ${prod.specs.priority} asignada a: ${prod.name}`);
      insertedCount++;
    }
  }

  console.log(`¡Proceso completado! ${insertedCount} productos actualizados con prioridades.`);
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
