/**
 * @file app/catalogo/@modal/(..producto)/[id]/page.tsx
 * @description Intercepting Route: abre el modal SOBRE el catálogo.
 *
 * Cuando el usuario toca un producto desde /catalogo/[categoria],
 * Next.js intercepta la navegación a /producto/[id] y renderiza
 * este componente en el slot @modal — sin abandonar el catálogo.
 *
 * Si el usuario refresca o accede directo a /producto/[id],
 * Next.js usa el fallback en app/producto/[id]/page.tsx.
 */

import { notFound } from 'next/navigation'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import { ProductDetailModal } from '@/components/catalog/ProductDetailModal'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InterceptedProductPage({ params }: PageProps) {
  const { id } = await params
  const product = MOCK_PRODUCTS.find((p) => p.id === id)
  if (!product) notFound()

  // isModal=true → renderiza con overlay y backdrop
  return <ProductDetailModal product={product} isModal={true} />
}
