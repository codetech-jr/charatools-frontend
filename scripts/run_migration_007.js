const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local file
const envPath = path.join(__dirname, '../.env.local');
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf-8');
} else {
  envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf-8');
}

const env = envContent
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
  console.error('Missing Supabase URL or Service Role Key in environment file!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

async function main() {
  console.log('Connecting to Supabase...');

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, specs');

  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }

  console.log(`Fetched ${products.length} products total from Supabase.`);

  const pumpProducts = products.filter(p => 
    p.name.toLowerCase().includes('bomba') || 
    p.slug.toLowerCase().includes('bomba') ||
    (p.specs && p.specs.subcategory === 'bombas')
  );

  console.log(`Found ${pumpProducts.length} pump-related products:`);
  for (const p of pumpProducts) {
    console.log(` - ID: ${p.id} | Name: "${p.name}" | Slug: "${p.slug}"`);
  }

  for (const p of pumpProducts) {
    let priority = null;
    const nameLower = p.name.toLowerCase();
    const slugLower = p.slug.toLowerCase();

    if (nameLower.includes('1/2') || slugLower.includes('1-2')) {
      priority = 1;
    } else if (nameLower.includes('3/4') || slugLower.includes('3-4')) {
      priority = 2;
    } else if (nameLower.includes('1 hp') || nameLower.includes('1hp') || slugLower.includes('1hp') || slugLower.includes('1-hp')) {
      priority = 3;
    }

    if (priority !== null) {
      const updatedSpecs = {
        ...(p.specs || {}),
        priority: priority
      };

      console.log(`Updating "${p.name}" (${p.slug}) -> priority = ${priority}...`);
      const { data: updateData, error: updateError } = await supabase
        .from('products')
        .update({ specs: updatedSpecs })
        .eq('id', p.id)
        .select();

      if (updateError) {
        console.error(`Failed to update ${p.slug}:`, updateError.message);
      } else {
        console.log(`Successfully updated ${p.slug}! Current specs:`, updatedSpecs);
      }
    }
  }

  console.log('Migration 007 completed successfully!');
}

main().catch(err => {
  console.error('Fatal error during migration 007:', err);
  process.exit(1);
});
