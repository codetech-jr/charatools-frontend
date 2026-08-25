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

const dinBreakers = [
  {
    name: 'Breaker Termomagnético Riel DIN 1 Polo',
    slug: 'breaker-termomagnetico-din-1-polo',
    sku: 'CHARATOOLS-BREAKER-DIN-1P',
    short_desc: 'Interruptor termomagnético modular para montaje en riel DIN monofásico de 1 polo para tableros de protección.',
    description: 'Interruptor termomagnético modular para montaje en riel DIN monofásico de 1 polo para tableros de protección residencial y comercial.',
    is_casheable: false,
    brand_slug: 'steck',
    brand_name: 'Steck',
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 11,
      tags: ['breaker', 'termomagnético', 'riel DIN', '1 polo', 'monofásico', 'Steck', 'CHINT', 'disyuntor'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '10A' },
        { value: '16A' },
        { value: '20A' },
        { value: '25A' },
        { value: '32A' },
        { value: '40A' },
        { value: '50A' },
        { value: '63A' }
      ]
    }
  },
  {
    name: 'Breaker Termomagnético Riel DIN 2 Polos',
    slug: 'breaker-termomagnetico-din-2-polos',
    sku: 'CHARATOOLS-BREAKER-DIN-2P',
    short_desc: 'Interruptor termomagnético modular para montaje en riel DIN bifásico de 2 polos para protección de 240V.',
    description: 'Interruptor termomagnético modular para montaje en riel DIN bifásico de 2 polos para protección de circuitos de 240V.',
    is_casheable: false,
    brand_slug: 'chint',
    brand_name: 'CHINT',
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 12,
      tags: ['breaker', 'termomagnético', 'riel DIN', '2 polos', 'bifásico', 'CHINT', 'Steck', 'disyuntor'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '16A' },
        { value: '20A' },
        { value: '25A' },
        { value: '32A' },
        { value: '40A' },
        { value: '50A' },
        { value: '63A' }
      ]
    }
  },
  {
    name: 'Breaker Termomagnético Riel DIN 3 Polos',
    slug: 'breaker-termomagnetico-din-3-polos',
    sku: 'CHARATOOLS-BREAKER-DIN-3P',
    short_desc: 'Interruptor termomagnético modular para montaje en riel DIN trifásico de 3 polos para tableros trifásicos y motores.',
    description: 'Interruptor termomagnético modular para montaje en riel DIN trifásico de 3 polos para tableros trifásicos y control de motores.',
    is_casheable: false,
    brand_slug: 'chint',
    brand_name: 'CHINT',
    specs: {
      imagen: '/categoria-electricidad.webp',
      priority: 13,
      tags: ['breaker', 'termomagnético', 'riel DIN', '3 polos', 'trifásico', 'CHINT', 'Steck', 'disyuntor'],
      stockStatus: 'available',
      unidad: 'und',
      subcategory: 'tableros',
      subitem: 'tableros',
      variantLabel: 'Amperaje',
      variants: [
        { value: '20A' },
        { value: '25A' },
        { value: '32A' },
        { value: '40A' },
        { value: '50A' },
        { value: '63A' }
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

  // Asegurar marcas Steck y CHINT
  for (const b of [{ name: 'Steck', slug: 'steck' }, { name: 'CHINT', slug: 'chint' }]) {
    const { data: existBrand } = await supabase.from('brands').select('id').eq('slug', b.slug).single();
    if (!existBrand) {
      await supabase.from('brands').insert({ name: b.name, slug: b.slug, logo_url: '/categoria-electricidad.webp' });
      console.log(`✓ Marca ${b.name} registrada en Supabase.`);
    }
  }

  console.log(`Insertando / Actualizando ${dinBreakers.length} breakers riel DIN en Supabase...`);
  let insertedCount = 0;

  for (const prod of dinBreakers) {
    const { data: bRow } = await supabase.from('brands').select('id').eq('slug', prod.brand_slug).single();
    const brandId = bRow ? bRow.id : (await supabase.from('brands').select('id').limit(1).single()).data.id;

    const dbRecord = {
      name: prod.name,
      slug: prod.slug,
      sku: prod.sku,
      short_desc: prod.short_desc,
      description: prod.description,
      is_casheable: prod.is_casheable,
      specs: prod.specs,
      category_id: catRow.id,
      brand_id: brandId,
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

  console.log(`¡Proceso completado! ${insertedCount} breakers riel DIN procesados.`);
}

main().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
