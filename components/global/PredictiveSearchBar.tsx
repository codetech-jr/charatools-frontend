'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { Search, PlusCircle, ArrowRight, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import { useQuotationStore } from '@/store/quotationStore'
import type { CatalogProduct } from '@/lib/catalog.types'
import { getPublicCatalog } from '@/app/actions/catalogActions'

/**
 * Normaliza cadenas de texto eliminando acentos/diacríticos y convirtiendo a minúsculas
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

/**
 * Componente Thumbnail de Producto con fallback seguro contra imágenes rotas
 */
function SearchProductThumbnail({
  src,
  alt,
}: {
  src?: string
  alt: string
}) {
  const defaultFallback = '/categoria-plomeria.webp'
  const initialSrc = src && (src.startsWith('http') || src.startsWith('/')) ? src : defaultFallback
  const [imgSrc, setImgSrc] = useState<string>(initialSrc)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (src && (src.startsWith('http') || src.startsWith('/'))) {
      setImgSrc(src)
      setHasError(false)
    }
  }, [src])

  return (
    <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden bg-white flex items-center justify-center flex-shrink-0 p-1">
      <Image
        src={hasError ? defaultFallback : imgSrc}
        alt={alt}
        width={48}
        height={48}
        className="w-full h-full object-contain"
        onError={() => {
          setHasError(true)
          setImgSrc(defaultFallback)
        }}
      />
    </div>
  )
}

export function PredictiveSearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [liveProducts, setLiveProducts] = useState<CatalogProduct[]>(MOCK_PRODUCTS)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addItem = useQuotationStore((s) => s.addItem)
  const setDrawerOpen = useQuotationStore((s) => s.setDrawerOpen)

  // Cargar catálogo vivo de Supabase al montar para tener productos y fotos más recientes
  useEffect(() => {
    let isMounted = true
    async function fetchLiveProducts() {
      try {
        const res = await getPublicCatalog()
        if (res.hasLiveData && res.products && res.products.length > 0 && isMounted) {
          setLiveProducts(res.products)
        }
      } catch {
        // En caso de error de red, se mantiene MOCK_PRODUCTS
      }
    }

    fetchLiveProducts()
    return () => {
      isMounted = false
    }
  }, [])

  // Algoritmo de Búsqueda Predictiva Inteligente (ignora tildes, busca marcas, tags, categorías)
  const results = useMemo(() => {
    const rawQ = query.trim()
    if (rawQ.length < 2) return []

    const cleanQ = normalizeText(rawQ)
    const terms = cleanQ.split(/\s+/).filter(Boolean)

    const scored = liveProducts.map((p) => {
      const nameNorm = normalizeText(p.name)
      const brandNorm = normalizeText(p.brand || '')
      const catNorm = normalizeText(p.categoryLabel || '')
      const subNorm = normalizeText(p.subcategoryLabel || p.subcategory || '')
      const tagsNorm = (p.tags || []).map(normalizeText).join(' ')
      const skuNorm = normalizeText((p as any).reference || p.slug || '')

      let score = 0

      // Coincidencia exacta o inicio de nombre
      if (nameNorm.startsWith(cleanQ)) score += 100
      else if (nameNorm.includes(cleanQ)) score += 50

      // Términos individuales
      for (const term of terms) {
        if (nameNorm.includes(term)) score += 20
        if (brandNorm.includes(term)) score += 15
        if (subNorm.includes(term)) score += 12
        if (catNorm.includes(term)) score += 10
        if (tagsNorm.includes(term)) score += 8
        if (skuNorm.includes(term)) score += 25
      }

      return { product: p, score }
    })

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item) => item.product)
  }, [query, liveProducts])

  // Reset del índice seleccionado al cambiar de resultados
  useEffect(() => {
    setSelectedIndex(-1)
  }, [results])

  // Click outside para cerrar el dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault()
      const raw = query.trim()
      if (!raw) return
      router.push(`/catalogo?q=${encodeURIComponent(raw)}`)
      setIsFocused(false)
    },
    [query, router]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || results.length === 0) {
      if (e.key === 'Enter') handleSearch(e)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        const chosen = results[selectedIndex]
        router.push(`/producto/${chosen.slug}`)
        setIsFocused(false)
      } else {
        handleSearch()
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false)
    }
  }

  const handleQuickAdd = (e: React.MouseEvent, product: CatalogProduct) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setDrawerOpen(true)
    setIsFocused(false)
  }

  const handleClear = () => {
    setQuery('')
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const showDropdown = isFocused && query.trim().length >= 2

  return (
    <div ref={wrapperRef} className="w-full relative group">
      <form onSubmit={handleSearch} className="w-full relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar por nombre, marca o categoría..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsFocused(true)
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full h-11 bg-gray-800 border-2 border-yellow-400 rounded-xl px-4 pl-11 pr-24 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700 transition-all shadow-inner"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 transition-colors pointer-events-none" />

        {/* Botón de limpiar o submit */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-gray-600 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="h-8 px-3 bg-yellow-400 text-black text-xs font-bold rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-1 active:scale-95"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* ── DropDown Predictivo B2B ── */}
      {showDropdown && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {results.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100">
              {results.map((product, index) => {
                const isSelected = index === selectedIndex
                return (
                  <div
                    key={product.id}
                    className={`group/item flex items-center gap-3 p-3 transition-colors ${
                      isSelected ? 'bg-yellow-50/80' : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Thumbnail con fallback seguro */}
                    <Link
                      href={`/producto/${product.slug}`}
                      onClick={() => setIsFocused(false)}
                      className="flex-shrink-0"
                    >
                      <SearchProductThumbnail
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>

                    {/* Información */}
                    <Link
                      href={`/producto/${product.slug}`}
                      onClick={() => setIsFocused(false)}
                      className="flex-1 min-w-0 flex flex-col"
                    >
                      <span className="text-sm font-bold text-gray-900 truncate group-hover/item:text-yellow-600 transition-colors">
                        {product.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500 truncate mt-0.5">
                        <span className="font-medium text-gray-700">{product.brand}</span>
                        <span>•</span>
                        <span>{product.categoryLabel}</span>
                        {product.variantLabel && (
                          <>
                            <span>•</span>
                            <span className="text-yellow-700 bg-yellow-100 px-1.5 py-0.2 rounded text-[10px] font-semibold">
                              {product.variantLabel}
                            </span>
                          </>
                        )}
                      </div>
                    </Link>

                    {/* CTA Rápido Cotizar */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="flex-shrink-0 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-yellow-400 hover:text-black text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm"
                      title="Añadir a cotización rápidamente"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cotizar</span>
                    </button>
                  </div>
                )
              })}

              {/* Ver todos los resultados CTA */}
              <button
                onClick={() => handleSearch()}
                className="w-full p-3 text-sm font-bold text-yellow-700 bg-yellow-50/50 hover:bg-yellow-100/70 flex items-center justify-center gap-2 transition-colors border-t border-yellow-100"
              >
                Ver todos los resultados para &quot;{query}&quot;
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              No se encontraron productos para <span className="font-bold text-gray-900">&quot;{query}&quot;</span>
              <p className="text-xs text-gray-400 mt-1">Prueba con otra palabra clave como tubos, cables, bombillos o grifería.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
