import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Manual parsing of .env.local
const envFile = fs.readFileSync('.env.local', 'utf-8')
const env = {}
envFile.split('\n').forEach(line => {
  const parts = line.split('=')
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim()
  }
})

const url = env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.error('Missing env vars')
  process.exit(1)
}

const supabase = createClient(url, anonKey)

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('name, specs')
    .order('specs->priority', { ascending: true })
    .order('name', { ascending: true })
    .limit(15)

  if (error) {
    console.error('Error fetching:', error)
    return
  }

  console.log('Fetched products:', data.length)
  data.forEach(p => {
    console.log(`- [Priority: ${p.specs?.priority}] ${p.name} (${p.specs?.subitem})`)
  })
}

run()
