'use client'

/**
 * @file components/product/ProductDetailsTemplate.tsx
 * @description Plantilla de detalle de producto.
 *
 * Convertido a Client Component para gestionar el estado de la variante
 * seleccionada (selectedVariant) que se comparte entre ProductVariantSelector
 * y AddToQuoteButton.
 *
 * Arquitectura:
 *   - El Server Component padre (app/producto/[slug]/page.tsx) sigue siendo
 *     Server Component puro y pasa el producto como prop serializada.
 *   - La interactividad (selección de variante, cotización) ocurre aquí.
 */

import React from 'react'
import Link from 'next/link'
import {
  Tag,
  Zap,
  Weight,
  Wifi,
  Package,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowLeft,
} from 'lucide-react'
import Image from 'next/image'
import type { CatalogProduct, StockStatus } from '@/lib/catalog.types'
import AddToQuoteButton from '@/components/catalog/AddToQuoteButton'
import { RelatedProductsCarousel } from '@/components/catalog/RelatedProductsCarousel'
import { DiscoverMoreCategories } from '@/components/catalog/DiscoverMoreCategories'
import { ProductVariantSelector } from '@/components/product/ProductVariantSelector'

const STATUS_CONFIG: Record<
  StockStatus,
  { label: string; color: string; icon: React.ElementType }
> = {
  available: { label: 'Disponible', color: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle2 },
  'high-demand': { label: 'Alta Rotación', color: 'text-yellow-700 bg-yellow-50 border-yellow-200', icon: Flame },
  'new-batch': { label: 'Nuevo Lote', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: Package },
  'out-of-stock': { label: 'Sin Stock', color: 'text-red-700 bg-red-50 border-red-200', icon: AlertTriangle },
}

function SpecTable({ product }: { product: CatalogProduct }) {
  const specs: { icon: React.ElementType; label: string; value: string }[] = []

  if (product.brand) specs.push({ icon: Tag, label: 'Marca', value: product.brand })
  if (product.reference) specs.push({ icon: Package, label: 'Referencia / SKU', value: product.reference })
  if (product.unit) specs.push({ icon: Package, label: 'Unidad de venta', value: product.unit })
  if (product.powerWatts) specs.push({ icon: Zap, label: 'Potencia', value: `${product.powerWatts} W` })
  if (product.voltageVolts) specs.push({ icon: Wifi, label: 'Voltaje', value: `${product.voltageVolts} V` })
  if (product.weightKg) specs.push({ icon: Weight, label: 'Peso', value: `${product.weightKg} kg` })

  if (specs.length === 0) return null

  return (
    <div>
      <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
        Especificaciones Técnicas
      </h2>
      <dl className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors">
            <dt className="flex items-center gap-2 text-xs text-gray-500">
              <Icon className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              {label}
            </dt>
            <dd className="text-xs font-bold text-gray-900 text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

interface ProductDetailsTemplateProps {
  product: CatalogProduct
  isModal?: boolean
}

export function ProductDetailsTemplate({ product, isModal = false }: ProductDetailsTemplateProps) {
  const status = STATUS_CONFIG[product.status]
  const StatusIcon = status.icon
  const isOutOfStock = product.status === 'out-of-stock'

  // Estado de variante seleccionada — compartido con AddToQuoteButton
  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(null)

  const hasVariants = product.variants && product.variants.length > 0

  return (
    <div className={isModal ? 'pb-8' : 'max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12'}>
      {/* Botón volver (mobile) */}
      {!isModal && (
        <Link
          href={`/catalogo/${product.category}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 md:hidden"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Volver al catálogo
        </Link>
      )}

      {/* ── Split 2 columnas Desktop ────────────────────────────────────── */}
      <div className={`grid grid-cols-1 ${isModal ? 'md:grid-cols-2' : 'lg:grid-cols-2'} gap-8 lg:gap-12 items-start ${isModal ? 'p-6 md:p-8' : ''}`}>

        {/* ── Columna Izquierda: Imagen ─────────────────────────────────── */}
        <div className="space-y-3 sticky top-4">
          <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={product.image}
              alt={`Foto de ${product.name} — CharaTools`}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Badge de estado flotante */}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${status.color}`}
              >
                <StatusIcon className="w-3.5 h-3.5" aria-hidden="true" />
                {status.label}
              </span>
            </div>
          </div>

          {/* Tags del producto */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5" aria-label="Etiquetas del producto">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 text-gray-500 text-[10px] font-medium px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Columna Derecha: Detalles ─────────────────────────────────── */}
        <div className="space-y-6">
          {/* Categoría + Marca */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/catalogo/${product.category}`}
              className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-yellow-500 transition-colors"
            >
              {product.categoryLabel}
            </Link>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span className="text-xs font-bold text-gray-500">{product.brand}</span>
          </div>

          {/* H1 — seo-structure-architect: única H1, keyword principal */}
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Descripción corta */}
          <p className="text-base text-gray-600 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* ── Selector de Variantes (medidas, diámetros, calibres) ────── */}
          {hasVariants && (
            <ProductVariantSelector
              variants={product.variants!}
              variantLabel={product.variantLabel}
              selectedVariant={selectedVariant}
              onSelect={(val) => setSelectedVariant(val || null)}
            />
          )}

          {/* Descripción larga */}
          {product.description && (
            <div>
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                Descripción
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Especificaciones técnicas */}
          <SpecTable product={product} />

          {/* ── Disponibilidad + CTA ─────────────────────────────────────── */}
          <div className="space-y-3 pt-2">
            <div>
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                Disponibilidad
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border ${status.color}`}
              >
                <StatusIcon className="w-4 h-4" aria-hidden="true" />
                {status.label}
                {!isOutOfStock && (
                  <span className="font-normal text-xs opacity-70 ml-1">
                    — Confirma por WhatsApp
                  </span>
                )}
              </span>
            </div>

            {/* ── Botón de Cotización (Client Island) ───────────────────── */}
            <AddToQuoteButton product={product} selectedVariant={selectedVariant ?? undefined} />

            {/* Referencia/SKU visible */}
            {product.reference && (
              <p className="text-[10px] text-gray-400 font-mono">
                Ref: {product.reference}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Productos Relacionados & Cross-Selling ─────────────────────── */}
      <div className={isModal ? 'px-6 md:px-8' : ''}>
        <RelatedProductsCarousel
          currentProductId={product.id}
          category={product.category}
        />
      </div>

      {/* ── Anti-Dead-End UX: Explorar más categorías ──────────────────── */}
      <DiscoverMoreCategories categorySlug={product.category} isCompact={isModal} />

    </div>
  )
}
