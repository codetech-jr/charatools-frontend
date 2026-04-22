'use client'

/**
 * @file ProductDetailModal.tsx
 * @description Modal/Drawer de detalle de producto.
 *
 * Se usa en el Intercepting Route (@modal): se muestra SOBRE el catálogo sin perder scroll.
 * Se apoya en ProductDetailsTemplate para renderizar exactamente el mismo UI
 * que la página completa, pero en un contexto de overlay.
 */

import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { CatalogProduct } from '@/lib/catalog.types'
import { ProductDetailsTemplate } from '@/components/product/ProductDetailsTemplate'

interface ProductDetailModalProps {
  product: CatalogProduct
  isModal?: boolean
}

export function ProductDetailModal({ product, isModal = true }: ProductDetailModalProps) {
  const router = useRouter()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Foco en botón de cerrar al abrir modal (WCAG 2.4.3)
    if (isModal) closeButtonRef.current?.focus()
  }, [isModal])

  // Cerrar con Escape (WCAG 2.1.2)
  useEffect(() => {
    if (!isModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isModal, router])

  const content = (
    <div
      className="flex flex-col bg-white h-full w-full overflow-y-auto relative"
      role="dialog"
      aria-modal={isModal}
      aria-label={`Detalle de ${product.name}`}
    >
      {/* ── Botón de cierre pegajoso ── */}
      <div className="sticky top-0 z-10 flex justify-end p-4 pointer-events-none">
        <button
          ref={closeButtonRef}
          onClick={() => router.back()}
          className="p-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 pointer-events-auto shadow-sm"
          aria-label="Cerrar detalle de producto"
        >
          <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
        </button>
      </div>

      {/* ── Scrollable Content (Plantilla unificada) ── */}
      <div className="flex-1 -mt-14">
        <ProductDetailsTemplate product={product} isModal={true} />
      </div>
    </div>
  )

  if (isModal) {
    return (
      <>
        {/* Backdrop — tap cierra */}
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => router.back()}
        />
        {/* Panel del modal — Mobile: bottom sheet, Desktop: wide dialog max-w-5xl */}
        <div className="fixed inset-x-0 bottom-0 z-50 md:inset-0 md:m-auto md:w-full md:max-w-5xl md:h-[90dvh] flex flex-col bg-white max-h-[90dvh] rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden">
          {content}
        </div>
      </>
    )
  }

  return content
}
