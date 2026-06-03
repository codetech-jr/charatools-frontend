import AdminShell from '@/components/admin/AdminShell'
import ProductForm from '@/components/admin/ProductForm'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Edit } from 'lucide-react'

// Forza rendering dinámico para obtener datos frescos de la DB en cada petición
export const dynamic = 'force-dynamic'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const supabase = createAdminSupabaseClient()

  // Fetching en paralelo del producto a editar, las categorías y marcas
  const [productRes, categoriesRes, brandsRes] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).single(),
    supabase.from('categories').select('id, name, slug, parent_id, depth').order('name'),
    supabase.from('brands').select('id, name').order('name')
  ])

  const product = productRes.data
  if (!product || productRes.error) {
    return notFound()
  }

  const categories = categoriesRes.data || []
  const brands = brandsRes.data || []

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
              <Edit className="w-5 h-5 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Editar Producto</h1>
          </div>
          <p className="text-sm text-zinc-400 ml-13">
            Modifica la información, clasificación, stock e imagen de tu producto.
          </p>
        </header>

        <ProductForm categories={categories} brands={brands} initialData={product} />
      </div>
    </AdminShell>
  )
}
