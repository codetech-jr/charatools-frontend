const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// 1. Read .env file
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

const parsedProductsPath = '/home/alejo/.gemini/antigravity/brain/a64cb245-a55d-44bf-8df2-08d877dd56d3/scratch/parsed_products.json';
const parsedProducts = JSON.parse(fs.readFileSync(parsedProductsPath, 'utf-8'));

async function main() {
  console.log('Connecting to Supabase...');

  // 1. Resolve 'plomeria' category ID
  const { data: plomeriaCat, error: plomeriaErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'plomeria')
    .single();

  if (plomeriaErr || !plomeriaCat) {
    console.error('Error fetching plomeria category:', plomeriaErr);
    process.exit(1);
  }
  console.log(`Found plomeria category ID: ${plomeriaCat.id}`);

  // 2. Upsert depth 1 subcategories under Plomería
  const subcategoriesD1 = [
    { name: 'Grifería para Lavamanos', slug: 'griferia-lavamanos', parent_id: plomeriaCat.id, depth: 1, sort_order: 10, is_active: true },
    { name: 'Grifería para Fregadores', slug: 'griferia-fregadores', parent_id: plomeriaCat.id, depth: 1, sort_order: 20, is_active: true },
    { name: 'Válvulas y Llaves', slug: 'valvulas-llaves', parent_id: plomeriaCat.id, depth: 1, sort_order: 30, is_active: true }
  ];

  console.log('Upserting depth 1 subcategories...');
  for (const cat of subcategoriesD1) {
    const { error } = await supabase
      .from('categories')
      .upsert(cat, { onConflict: 'slug' });
    if (error) {
      console.error(`Error upserting ${cat.slug}:`, error);
    }
  }

  // Fetch D1 categories to map parent_ids for D2
  const { data: d1Cats, error: d1Err } = await supabase
    .from('categories')
    .select('id, slug')
    .in('slug', ['griferia-lavamanos', 'griferia-fregadores', 'valvulas-llaves']);

  if (d1Err || !d1Cats) {
    console.error('Error fetching D1 categories:', d1Err);
    process.exit(1);
  }

  const dMap = d1Cats.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {});

  // 3. Upsert depth 2 subcategories
  const subcategoriesD2 = [
    // under griferia-lavamanos
    { name: 'Monomandos Altos', slug: 'monomandos-altos', parent_id: dMap['griferia-lavamanos'], depth: 2, sort_order: 10, is_active: true },
    { name: 'Monomandos Estándar', slug: 'monomandos-estandar', parent_id: dMap['griferia-lavamanos'], depth: 2, sort_order: 20, is_active: true },
    { name: 'Grifos Individuales', slug: 'grifos-individuales', parent_id: dMap['griferia-lavamanos'], depth: 2, sort_order: 30, is_active: true },
    { name: 'Juegos Twin (8 pulgadas)', slug: 'juegos-twin', parent_id: dMap['griferia-lavamanos'], depth: 2, sort_order: 40, is_active: true },
    { name: 'Grifería Institucional', slug: 'griferia-institucional', parent_id: dMap['griferia-lavamanos'], depth: 2, sort_order: 50, is_active: true },
    // under griferia-fregadores
    { name: 'Monomandos de Fregador', slug: 'monomandos-fregador', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 10, is_active: true },
    { name: 'Mezcladoras de Fregador', slug: 'mezcladoras-fregador', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 20, is_active: true },
    { name: 'Grifos Sencillos', slug: 'grifos-fregador', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 30, is_active: true },
    // New ones:
    { name: 'Monomandos Profesionales (Línea Chef / Resorte)', slug: 'monomandos-profesionales', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 40, is_active: true },
    { name: 'Monomandos Extensibles (Manguera extraíble)', slug: 'monomandos-extensibles', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 50, is_active: true },
    { name: 'Cuello de Cisne Tradicional (Fijos / Al mesón)', slug: 'cuello-cisne-tradicional', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 60, is_active: true },
    { name: 'Griferías para Instalación a Pared', slug: 'griferias-instalacion-pared', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 70, is_active: true },
    { name: 'Mezcladoras Doble Manilla y Grifos Individuales', slug: 'mezcladoras-grifos-individuales', parent_id: dMap['griferia-fregadores'], depth: 2, sort_order: 80, is_active: true },
    // under valvulas-llaves
    { name: 'Válvulas de Bola', slug: 'valvulas-bola', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 10, is_active: true },
    { name: 'Llaves de Paso', slug: 'llaves-paso', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 20, is_active: true },
    { name: 'Llaves de Chorro', slug: 'llaves-chorro', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 30, is_active: true },
    // New ones:
    { name: 'Llaves de Arresto (Pared)', slug: 'llaves-arresto', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 40, is_active: true },
    { name: 'Válvulas Industriales y Pesadas (Metal)', slug: 'valvulas-industriales-pesadas', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 50, is_active: true },
    { name: 'Línea de Válvulas PVC (Plástico)', slug: 'valvulas-pvc', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 60, is_active: true },
    { name: 'Válvulas de Retención y Especiales (Check)', slug: 'valvulas-retencion-especiales', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 70, is_active: true },
    { name: 'Llaves de Chorro y Manguera', slug: 'llaves-chorro-manguera', parent_id: dMap['valvulas-llaves'], depth: 2, sort_order: 80, is_active: true }
  ];

  console.log('Upserting depth 2 subcategories...');
  for (const cat of subcategoriesD2) {
    const { error } = await supabase
      .from('categories')
      .upsert(cat, { onConflict: 'slug' });
    if (error) {
      console.error(`Error upserting sub-subcategory ${cat.slug}:`, error);
    }
  }

  // 4. Upsert unique brands
  const brands = [...new Set(parsedProducts.map(p => p.brand === 'Generic' ? 'Genérico' : p.brand))];
  console.log(`Upserting brands: ${brands.join(', ')}`);

  for (const brand of brands) {
    const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { error } = await supabase
      .from('brands')
      .upsert({ name: brand, slug }, { onConflict: 'slug' });
    if (error) {
      console.error(`Error upserting brand ${brand}:`, error);
    }
  }

  // Fetch all brands and categories to build IDs maps
  const { data: allBrands } = await supabase.from('brands').select('id, name');
  const { data: allCats } = await supabase.from('categories').select('id, slug');

  const brandMap = allBrands.reduce((acc, b) => {
    acc[b.name.toLowerCase()] = b.id;
    return acc;
  }, {});

  const catMap = allCats.reduce((acc, c) => {
    acc[c.slug] = c.id;
    return acc;
  }, {});

  // 5. Upsert products
  console.log(`Upserting ${parsedProducts.length} products into Supabase...`);
  let successCount = 0;
  for (const p of parsedProducts) {
    const brandName = p.brand === 'Generic' ? 'Genérico' : p.brand;
    const brandId = brandMap[brandName.toLowerCase()];
    // Lookup leaf category slug or fallback to subcategory slug or plomeria
    const categorySlug = p.subitem || p.subcategory || 'plomeria';
    const categoryId = catMap[categorySlug] || plomeriaCat.id;

    if (!brandId) {
      console.error(`Could not resolve brand_id for brand ${brandName}`);
      continue;
    }

    const sku = `CHARATOOLS-${p.slug.toUpperCase()}`;

    const dbProduct = {
      name: p.name,
      slug: p.slug,
      sku,
      short_desc: p.shortDescription,
      description: p.shortDescription,
      is_casheable: p.isCasheaEligible,
      brand_id: brandId,
      category_id: categoryId,
      specs: {
        referencia: p.slug.toUpperCase(),
        imagen: p.image,
        tags: p.tags || [],
        stockStatus: p.status,
        unidad: p.unit,
        subcategory: p.subcategory,
        subitem: p.subitem,
        variantLabel: p.variantLabel,
        variants: p.variants,
        priority: p.priority || 10
      }
    };

    const { error } = await supabase
      .from('products')
      .upsert(dbProduct, { onConflict: 'slug' });

    if (error) {
      console.error(`Error upserting product ${p.name}:`, error.message);
    } else {
      successCount++;
    }
  }

  console.log(`Successfully uploaded ${successCount} of ${parsedProducts.length} products to Supabase!`);
}

main().catch(err => {
  console.error('Fatal error during seed execution:', err);
});
