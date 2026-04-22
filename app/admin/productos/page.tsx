import AdminShell from '@/components/admin/AdminShell'
import AdminProductsTable from '@/components/admin/AdminProductsTable'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { PackageSearch } from 'lucide-react'

// Forza rendering dinámico para siempre tener la data fresca de la DB
export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const supabase = createAdminSupabaseClient()
  
  // Fetching rápido, solo columnas necesarias para el listado Admin
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, sku, is_casheable, specs')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[AdminProductsPage] Fetch error:', error)
  }

  const productList = products || []

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Gestión de Productos</h1>
            <p className="text-sm text-zinc-400">
              Administra el inventario, sube imágenes a Supabase Storage y controla el estado del caché público.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-lg border border-zinc-800">
            <PackageSearch className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">{productList.length} Productos</span>
          </div>
        </header>

        <AdminProductsTable products={productList} />
      </div>
    </AdminShell>
  )
}
