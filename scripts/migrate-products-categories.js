const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Simple parse .env.local manually
const envText = fs.readFileSync('.env.local', 'utf8');
const envConfig = {};
envText.split('\n').forEach(line => {
  const cleanLine = line.trim();
  if (cleanLine && !cleanLine.startsWith('#')) {
    const parts = cleanLine.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      envConfig[key] = val;
    }
  }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false }
});

async function main() {
  console.log('Connecting to Supabase...');

  // 1. Fetch all categories
  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id, depth');

  if (catErr || !categories) {
    console.error('Error fetching categories:', catErr);
    process.exit(1);
  }
  console.log(`Loaded ${categories.length} categories.`);

  // Create a map for easy traversal
  const catMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  // Function to find depth 0 parent category ID
  function getRootCategory(catId) {
    let current = catMap[catId];
    if (!current) return null;
    while (current.parent_id !== null && current.depth > 0) {
      const parent = catMap[current.parent_id];
      if (!parent) break;
      current = parent;
    }
    return current;
  }

  // 2. Fetch all products
  const { data: products, error: prodErr } = await supabase
    .from('products')
    .select('id, name, slug, category_id, specs');

  if (prodErr || !products) {
    console.error('Error fetching products:', prodErr);
    process.exit(1);
  }
  console.log(`Loaded ${products.length} products.`);

  // 3. Migrate each product
  let updateCount = 0;
  for (const p of products) {
    let needsUpdate = false;
    let newCategoryId = p.category_id;
    let newSpecs = p.specs ? { ...p.specs } : {};

    // A. Normalizar category_id to depth 0
    const rootCat = getRootCategory(p.category_id);
    if (rootCat && rootCat.id !== p.category_id) {
      console.log(`Product "${p.name}" has category_id pointing to depth > 0 category. Setting it to root "${rootCat.name}" (${rootCat.id})`);
      newCategoryId = rootCat.id;
      needsUpdate = true;
    }

    // B. Migrate subcategory 'griferia' to 'griferia-lavamanos', 'griferia-fregadores', or 'valvulas-llaves'
    if (newSpecs.subcategory === 'griferia') {
      const subitem = newSpecs.subitem;
      let newSub = null;

      if (['monomandos-estandar', 'monomandos-altos', 'grifos-individuales', 'juegos-twin', 'griferia-institucional'].includes(subitem)) {
        newSub = 'griferia-lavamanos';
      } else if (['monomandos-profesionales', 'monomandos-extensibles', 'cuello-cisne-tradicional', 'griferias-instalacion-pared', 'mezcladoras-grifos-individuales'].includes(subitem)) {
        newSub = 'griferia-fregadores';
      } else if (['llaves-arresto', 'valvulas-industriales-pesadas', 'valvulas-pvc', 'valvulas-retencion-especiales', 'llaves-chorro-manguera'].includes(subitem)) {
        newSub = 'valvulas-llaves';
      }

      if (newSub) {
        console.log(`Migrating subcategory of "${p.name}" from "griferia" to "${newSub}" (based on subitem "${subitem}")`);
        newSpecs.subcategory = newSub;
        needsUpdate = true;
      } else {
        console.warn(`Product "${p.name}" has subcategory "griferia" but subitem "${subitem}" could not be mapped.`);
      }
    }

    // C. Special correction for the edited product Piazza
    if (p.id === '7121c8ce-2fb4-48f2-b34e-6e382f556bb2') {
      console.log(`Applying special correction for "Monomando Lavamanos Piazza (Pico Alto)"`);
      newSpecs.subcategory = 'griferia-lavamanos';
      newSpecs.subitem = 'monomandos-altos';
      needsUpdate = true;
    }

    if (needsUpdate) {
      const { error: upErr } = await supabase
        .from('products')
        .update({
          category_id: newCategoryId,
          specs: newSpecs
        })
        .eq('id', p.id);

      if (upErr) {
        console.error(`Error updating product "${p.name}":`, upErr.message);
      } else {
        updateCount++;
      }
    }
  }

  console.log(`Successfully updated ${updateCount} products.`);

  // 4. Add new PPR categories under Tuberías y Conexiones (parent_id: '0dee6607-2184-4ff2-b57a-9cc1ee771c20')
  const pprParentId = '0dee6607-2184-4ff2-b57a-9cc1ee771c20';
  const newPprCats = [
    { name: 'Tubería Termofusión (PPR)', slug: 'tuberia-termofusion-ppr', parent_id: pprParentId, depth: 2, sort_order: 10, is_active: true },
    { name: 'Conexiones Termofusión (PPR)', slug: 'conexiones-termofusion-ppr', parent_id: pprParentId, depth: 2, sort_order: 20, is_active: true }
  ];

  console.log('Upserting new PPR sub-subcategories...');
  for (const cat of newPprCats) {
    const { error: insErr } = await supabase
      .from('categories')
      .upsert(cat, { onConflict: 'slug' });

    if (insErr) {
      console.error(`Error inserting category ${cat.slug}:`, insErr.message);
    } else {
      console.log(`Upserted category ${cat.slug} successfully.`);
    }
  }

  // 5. Delete redundant/unused categories
  const redundantSlugs = [
    'valvulas-bola',
    'llaves-paso',
    'llaves-chorro',
    'monomandos-fregador',
    'mezcladoras-fregador',
    'grifos-fregador',
    'termofusion-ppr'
  ];

  console.log(`Deleting ${redundantSlugs.length} redundant categories...`);
  const { error: delErr } = await supabase
    .from('categories')
    .delete()
    .in('slug', redundantSlugs);

  if (delErr) {
    console.error('Error deleting redundant categories:', delErr.message);
  } else {
    console.log('Redundant categories deleted successfully.');
  }

  console.log('Migration completed successfully!');
}

main().catch(err => {
  console.error('Fatal error during migration:', err);
});
