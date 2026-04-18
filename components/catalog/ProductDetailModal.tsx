'use client'

/**
 * @file ProductDetailModal.tsx
 * @description Modal/Drawer de detalle de producto.
 *
 * Se usa en dos contextos:
 * 1. Intercepting Route (@modal): se muestra SOBRE el catálogo sin perder scroll
 * 2. Página completa (/producto/[id]): fallback para acceso directo/SEO
 *
 * Principios UX B2B:
 * - Imagen grande arriba (inspección visual del producto)
 * - Datos técnicos en tabla compacta (potencia, voltaje, peso, ref)
 * - Botón + Agregar siempre visible en sticky bottom bar
 * - Up-selling contextual: "Lleva también" (productos relacionados)
 * - Escape key cierra el modal (accesibilidad WCAG 2.1 2.1.2)
 */

import React, { useState, useEffect, useRef } from 'react'
import { X, Plus, Check, Zap, Box, Weight, Tag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQuotationStore } from '@/store/quotationStore'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import type { CatalogProduct } from '@/lib/catalog.types'

const STOCK_CONFIG: Record<CatalogProduct['status'], { label: string; dotClass: string; textClass: string }> = {
  available:      { label: 'Disponible',  dotClass: 'bg-green-500',  textClass: 'text-green-700' },
  'high-demand':  { label: 'Alta rotación', dotClass: 'bg-yellow-500', textClass: 'text-yellow-700' },
  'new-batch':    { label: 'Nuevo lote',  dotClass: 'bg-blue-500',   textClass: 'text-blue-700' },
  'out-of-stock': { label: 'Sin stock',   dotClass: 'bg-red-500',    textClass: 'text-red-700' },
}

interface ProductDetailModalProps {
  product: CatalogProduct
  /** Si es true, muestra como modal con overlay y botón de cerrar */
  isModal?: boolean
}

export function ProductDetailModal({ product, isModal = false }: ProductDetailModalProps) {
  const router = useRouter()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [justAdded, setJustAdded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const addItem = useQuotationStore((s) => s.addItem)
  const items = useQuotationStore((s) => s.items)

  useEffect(() => {
    setMounted(true)
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

  const isInQuotation = mounted ? items.some((i) => i.id === product.id) : false
  const isDisabled = product.status === 'out-of-stock'
  const stock = STOCK_CONFIG[product.status]

  const handleAdd = () => {
    if (isDisabled || isInQuotation) return
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      reference: product.reference,
      unit: product.unit,
      qty: 1,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  // Productos relacionados para up-selling
  const relatedProducts = (product.relatedIds ?? [])
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as CatalogProduct[]

  const content = (
    <div
      className="flex flex-col bg-white h-full"
      role="dialog"
      aria-modal={isModal}
      aria-label={`Detalle de ${product.name}`}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.categoryLabel}
          </span>
        </div>
        {isModal && (
          <button
            ref={closeButtonRef}
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            aria-label="Cerrar detalle de producto"
          >
            <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Imagen */}
        <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Nombre y marca */}
          <div>
            <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">{product.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{product.shortDescription}</p>
          </div>

          {/* Estado de stock */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stock.dotClass}`} aria-hidden="true" />
            <span className={`text-sm font-semibold ${stock.textClass}`}>{stock.label}</span>
          </div>

          {/* Tabla de datos técnicos */}
          {(product.reference || product.powerWatts || product.voltageVolts || product.weightKg) && (
            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Especificaciones</h3>
              <dl className="space-y-1.5">
                {product.reference && (
                  <div className="flex items-center gap-2">
                    <dt className="flex items-center gap-1.5 text-xs text-gray-500 w-28 flex-shrink-0">
                      <Tag className="w-3 h-3" aria-hidden="true" /> Referencia
                    </dt>
                    <dd className="text-xs font-mono font-semibold text-gray-800">{product.reference}</dd>
                  </div>
                )}
                {product.powerWatts && (
                  <div className="flex items-center gap-2">
                    <dt className="flex items-center gap-1.5 text-xs text-gray-500 w-28 flex-shrink-0">
                      <Zap className="w-3 h-3 text-yellow-500" aria-hidden="true" /> Potencia
                    </dt>
                    <dd className="text-xs font-semibold text-gray-800">{product.powerWatts}W</dd>
                  </div>
                )}
                {product.voltageVolts && (
                  <div className="flex items-center gap-2">
                    <dt className="flex items-center gap-1.5 text-xs text-gray-500 w-28 flex-shrink-0">
                      <Zap className="w-3 h-3" aria-hidden="true" /> Voltaje
                    </dt>
                    <dd className="text-xs font-semibold text-gray-800">{product.voltageVolts}V</dd>
                  </div>
                )}
                {product.weightKg && (
                  <div className="flex items-center gap-2">
                    <dt className="flex items-center gap-1.5 text-xs text-gray-500 w-28 flex-shrink-0">
                      <Weight className="w-3 h-3" aria-hidden="true" /> Peso
                    </dt>
                    <dd className="text-xs font-semibold text-gray-800">{product.weightKg} kg</dd>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <dt className="flex items-center gap-1.5 text-xs text-gray-500 w-28 flex-shrink-0">
                    <Box className="w-3 h-3" aria-hidden="true" /> Unidad
                  </dt>
                  <dd className="text-xs font-semibold text-gray-800">{product.unit}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Descripción larga */}
          {product.description && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Up-selling: Lleva también */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Lleva también
              </h3>
              <div className="space-y-2">
                {relatedProducts.map((related) => {
                  const relIsInQuotation = mounted ? items.some((i) => i.id === related.id) : false
                  return (
                    <div
                      key={related.id}
                      className="flex items-center gap-3 bg-gray-50 rounded-lg p-2.5 border border-gray-200"
                    >
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 line-clamp-1">{related.name}</p>
                        <p className="text-xs text-gray-500">{related.brand}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (!relIsInQuotation) {
                            addItem({ id: related.id, name: related.name, brand: related.brand, unit: related.unit, qty: 1 })
                          }
                        }}
                        aria-label={relIsInQuotation ? `${related.name} en lista` : `Agregar ${related.name}`}
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all active:scale-95 ${
                          relIsInQuotation
                            ? 'border-yellow-400 bg-white text-yellow-600'
                            : 'border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-500'
                        }`}
                      >
                        {relIsInQuotation ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky Bottom CTA ── */}
      <div className="flex-shrink-0 px-4 py-4 bg-white border-t border-gray-200">
        <button
          onClick={handleAdd}
          disabled={isDisabled}
          aria-label={
            isInQuotation
              ? `${product.name} ya está en tu lista`
              : `Agregar ${product.name} a cotización`
          }
          aria-pressed={isInQuotation}
          className={`
            w-full h-14 rounded-xl font-bold text-base
            flex items-center justify-center gap-2
            transition-all duration-150 active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2
            ${isInQuotation
              ? 'bg-white border-2 border-yellow-400 text-black'
              : justAdded
                ? 'bg-green-500 text-white'
                : isDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-md'
            }
          `}
        >
          {isInQuotation ? (
            <><Check className="w-5 h-5" aria-hidden="true" /> En tu lista</>
          ) : justAdded ? (
            <><Check className="w-5 h-5" aria-hidden="true" /> ¡Agregado!</>
          ) : (
            <><Plus className="w-5 h-5" aria-hidden="true" /> Agregar a cotización</>
          )}
        </button>
      </div>
    </div>
  )

  // Si es modal: envuelve con overlay
  if (isModal) {
    return (
      <>
        {/* Backdrop — tap cierra */}
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => router.back()}
        />
        {/* Panel del modal — desliza desde abajo en móvil, lateral en desktop */}
        <div className="fixed inset-x-0 bottom-0 z-50 md:inset-y-0 md:right-0 md:inset-x-auto md:w-[420px] flex flex-col bg-white max-h-[90dvh] md:max-h-none rounded-t-2xl md:rounded-none shadow-2xl">
          {content}
        </div>
      </>
    )
  }

  return content
}
