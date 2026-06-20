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

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false }
});

async function main() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id, depth, sort_order')
    .order('depth')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return;
  }

  console.log('--- ALL CATEGORIES ---');
  categories.forEach(c => {
    console.log(`[Depth ${c.depth}] ${c.name} (${c.slug}) | ID: ${c.id} | Parent: ${c.parent_id}`);
  });

  console.log('\n--- CATEGORY TREE ---');
  const roots = categories.filter(c => c.parent_id === null);
  function printNode(node, indent = '') {
    console.log(`${indent}- ${node.name} (${node.slug}) [ID: ${node.id}]`);
    const children = categories.filter(c => c.parent_id === node.id);
    children.forEach(child => printNode(child, indent + '  '));
  }
  roots.forEach(root => printNode(root));
}

main().catch(console.error);
