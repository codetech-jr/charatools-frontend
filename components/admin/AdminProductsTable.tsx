'use client'

/**
 * @file components/admin/AdminProductsTable.tsx
 * @description Tabla de productos del panel admin. Listado rápido + Toggles de estado.
 */

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { MoreHorizontal, ExternalLink, ImageOff, Trash2, Edit } from 'lucide-react'
import { updateProductStatus, deleteProduct } from '@/app/actions/admin_MutacionesProducts'
import { useRouter } from 'next/navigation'

// Supabase row simplificado
type AdminProduct = {
  id: string
  name: string
  slug: string
  sku: string
  is_casheable: boolean
  specs: {
    stockStatus?: string
    imagen?: string
  }
}

export default function AdminProductsTable({ products }: { products: AdminProduct[] }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  // ID del producto siendo eliminado para loader
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Toggle de Stock Cacheable (boolean)
  const handleToggleCache = (id: string, current: boolean) => {
    if (isPending) return
    startTransition(async () => {
      await updateProductStatus(id, { is_casheable: !current })
    })
  }

  // Toggle Stock Status (available / out-of-stock)
  const handleToggleStock = (id: string, current: string | undefined) => {
    if (isPending) return
    const nextStatus = current === 'available' ? 'out-of-stock' : 'available'
    startTransition(async () => {
      await updateProductStatus(id, { stock_status: nextStatus })
    })
  }

  const handleDelete = (id: string, name: string) => {
    if (isPending) return
    if (!confirm(`¿Estás seguro de ELIMINAR el producto "${name}"?\nEsta acción es irreversible.`)) return

    setDeletingId(id)
    startTransition(async () => {
      await deleteProduct(id)
      setDeletingId(null)
    })
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-zinc-500 border border-zinc-800 border-dashed rounded-xl bg-zinc-900/20">
        <ImageOff className="w-8 h-8 mb-4 opacity-50" />
        <p>No hay productos registrados en la base de datos.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-zinc-950/50 text-zinc-500 border-b border-zinc-800">
          <tr>
            <th className="px-4 py-3 font-medium w-12">IMG</th>
            <th className="px-4 py-3 font-medium">Producto</th>
            <th className="px-4 py-3 font-medium w-24">SKU</th>
            <th className="px-4 py-3 font-medium text-center w-28">Cacheable</th>
            <th className="px-4 py-3 font-medium text-center w-32">Stock</th>
            <th className="px-4 py-3 font-medium text-right w-24">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {products.map((p) => {
            const isDeleting = deletingId === p.id
            const imgSrc = p.specs?.imagen || '/placeholder-product.webp'
            const isStockAvailable = p.specs?.stockStatus === 'available'

            return (
              <tr 
                key={p.id} 
                className={`hover:bg-zinc-800/20 transition-colors ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {/* Img Mini */}
                <td className="px-4 py-3">
                  <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                    <Image
                      src={imgSrc}
                      alt={p.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* Info (Name + Slug link) */}
                <td className="px-4 py-3">
                  <p className="font-medium text-zinc-200 line-clamp-1" title={p.name}>
                    {p.name}
                  </p>
                  <a
                    href={`/producto/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-zinc-500 hover:text-yellow-400 flex items-center gap-1 mt-0.5 w-max transition-colors"
                  >
                    /{p.slug} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </td>

                {/* SKU */}
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  {p.sku}
                </td>

                {/* Toggle Cacheable (Switch native UI-like) */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleCache(p.id, p.is_casheable)}
                    disabled={isPending}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                      p.is_casheable ? 'bg-yellow-400' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-zinc-950 transition-transform ${
                        p.is_casheable ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>

                {/* Toggle Stock Status */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleStock(p.id, p.specs?.stockStatus)}
                    disabled={isPending}
                    className={`px-2 py-1 text-[10px] uppercase font-bold rounded border transition-colors ${
                      isStockAvailable
                        ? 'bg-green-400/10 text-green-400 border-green-400/20 hover:bg-green-400/20'
                        : 'bg-red-400/10 text-red-400 border-red-400/20 hover:bg-red-400/20'
                    }`}
                  >
                    {isStockAvailable ? 'Disp' : 'Agotado'}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      title="Editar"
                      onClick={() => router.push(`/admin/productos/editar/${p.id}`)}
                      className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      title="Eliminar"
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={isPending}
                      className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                      {isDeleting ? <MoreHorizontal className="w-4 h-4 animate-pulse" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
