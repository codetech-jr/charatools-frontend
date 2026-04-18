/**
 * @file app/producto/[id]/page.tsx
 * @description Página completa de detalle de producto.
 *
 * Úsada en dos escenarios:
 * 1. Acceso directo por URL (bookmarks, links compartidos por WhatsApp)
 * 2. Fallback cuando el usuario refresca desde la URL de un producto
 *
 * Esta es la versión "full page" — no interceptada.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import { ProductDetailModal } from '@/components/catalog/ProductDetailModal'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = MOCK_PRODUCTS.find((p) => p.id === id)
  if (!product) return { title: 'Producto no encontrado | CharaTools' }

  return {
    title: `${product.name} | CharaTools`,
    description: `${product.shortDescription} — Cotiza por WhatsApp. CharaTools Charallave.`,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  }
}

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ id: p.id }))
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const product = MOCK_PRODUCTS.find((p) => p.id === id)
  if (!product) notFound()

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-100">
      {/* Botón Volver al catálogo */}
      <div className="bg-gray-900 px-4 py-3">
        <Link
          href={`/catalogo/${product.category}`}
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Volver al catálogo
        </Link>
      </div>

      {/* Renderizamos la misma vista pero sin overlay de modal */}
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <ProductDetailModal product={product} isModal={false} />
      </div>
    </main>
  )
}
