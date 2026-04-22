'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Search, PlusCircle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MOCK_CATALOG } from '@/lib/mockCatalog'
import { useQuotationStore } from '@/store/quotationStore'
import { CatalogProduct } from '@/lib/catalog.types'

export function PredictiveSearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CatalogProduct[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const addItem = useQuotationStore((s) => s.addItem)
  const setDrawerOpen = useQuotationStore((s) => s.setDrawerOpen)

  // Filter local mock on query change
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }
    const searchLower = query.toLowerCase()
    const filtered = MOCK_CATALOG.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.categoryLabel.toLowerCase().includes(searchLower) ||
        (product.tags && product.tags.some(t => t.toLowerCase().includes(searchLower)))
    )
    setResults(filtered.slice(0, 4)) // Top 4 results
  }, [query])

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/catalogo?q=${encodeURIComponent(query.trim())}`)
    setIsFocused(false)
  }

  const handleQuickAdd = (e: React.MouseEvent, product: CatalogProduct) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setDrawerOpen(true)
    setIsFocused(false)
    setQuery('')
  }

  const showDropdown = isFocused && query.length >= 2

  return (
    <div ref={wrapperRef} className="w-full relative group">
      <form onSubmit={handleSearch} className="w-full relative">
        <input
          type="text"
          placeholder="Buscar por nombre, marca o categoría..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsFocused(true)
          }}
          onFocus={() => setIsFocused(true)}
          className="w-full h-11 bg-gray-800 border-2 border-gray-700 rounded-xl px-4 pl-11 text-sm text-white focus:outline-none focus:border-yellow-400 focus:bg-gray-700 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 bg-yellow-400 text-black text-xs font-bold rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* ── DropDown AJAX Predictivo (Estilo Meli B2B) ── */}
      {showDropdown && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((product) => (
                <div key={product.id} className="group/item flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
                  {/* Thumbnail */}
                  <Link href={`/producto/${product.slug}`} onClick={() => setIsFocused(false)} className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden bg-white">
                      <Image 
                        src={product.image.startsWith('http') ? product.image : '/placeholder.png'} 
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <Link href={`/producto/${product.slug}`} onClick={() => setIsFocused(false)} className="flex-1 min-w-0 flex flex-col">
                    <span className="text-sm font-bold text-gray-900 truncate group-hover/item:text-yellow-600 transition-colors">
                      {product.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      {product.brand} • {product.categoryLabel}
                    </span>
                  </Link>

                  {/* CTA Rápido */}
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="flex-shrink-0 flex items-center justify-center gap-1 bg-gray-100 hover:bg-yellow-400 hover:text-black text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    title="Añadir a cotización rápidamente"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cotizar</span>
                  </button>
                </div>
              ))}
              
              {/* Ver todos los resultados CTA */}
              <button 
                onClick={handleSearch}
                className="w-full p-3 text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 flex items-center justify-center gap-2 transition-colors"
              >
                Ver todos los resultados para "{query}"
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No se encontraron resultados para <span className="font-bold text-gray-900">"{query}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
