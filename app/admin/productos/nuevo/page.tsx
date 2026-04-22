import AdminShell from '@/components/admin/AdminShell'
import ProductForm from '@/components/admin/ProductForm'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { PlusCircle } from 'lucide-react'

// Forza rendering dinámico para la carga de catálogo (brands/categories)
export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  const supabase = createAdminSupabaseClient()

  // Fetching rápido en paralelo para los dropdowns
  const [categoriesRes, brandsRes] = await Promise.all([
    supabase.from('categories').select('id, name').order('name'),
    supabase.from('brands').select('id, name').order('name')
  ])

  const categories = categoriesRes.data || []
  const brands = brandsRes.data || []

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
              <PlusCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Nuevo Producto</h1>
          </div>
          <p className="text-sm text-zinc-400 ml-13">
            Añade un producto al catálogo. La imagen se optimizará y guardará en el bucket de Supabase.
          </p>
        </header>

        <ProductForm categories={categories} brands={brands} />
      </div>
    </AdminShell>
  )
}
