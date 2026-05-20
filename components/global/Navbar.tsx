'use client'

/**
 * @file Navbar.tsx
 * @description Cabecera principal CharaTools.
 * 
 * Mejoras:
 * - Buscador Masivo: Redirección instantánea a resultados del catálogo.
 * - Fix Hydration: Contador de items solo se muestra tras el montaje.
 * - Navegación B2B: Links directos a categorías optimizados para SEO.
 */

import React, { useState } from 'react'
import { ClipboardList, Search, Menu, X, Zap, Tag, Crown, Info, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useQuotationStore, selectTotalItems } from '@/store/quotationStore'
import { DesktopMegaMenu, MobileMegaMenu } from './MegaMenu'
import { TrendingSearches } from './TrendingSearches'
import { PredictiveSearchBar } from './PredictiveSearchBar'

export function Navbar() {
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const itemCount = useQuotationStore(selectTotalItems)
  const setDrawerOpen = useQuotationStore((s) => s.setDrawerOpen)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`)
    setIsMenuOpen(false)
  }

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 h-20 md:h-24 bg-gray-900 border-b border-gray-800 flex items-center px-4 md:px-8 lg:px-16"
    >
      <div className="flex items-center justify-between w-full gap-4">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center flex-shrink-0 group" aria-label="CharaTools — Inicio">
          <Image
            src="/Logo_chara_tools-blanco-PNG.png"
            alt="CharaTools Logo"
            width={600}
            height={200}
            priority
            className="w-auto h-28 md:h-40 group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* ── Mega-Menú B2B (Desktop) ── */}
        <DesktopMegaMenu />



        {/* ── Buscador Masivo (Desktop) ── */}
        <div className="hidden md:flex flex-1 max-w-xl relative flex-col">
          <PredictiveSearchBar />
          {/* Trending Searches dropdown */}
          <div className="absolute top-full left-0 w-full mt-2 hidden lg:block opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 bg-white/95 backdrop-blur-md border border-gray-200 p-3 rounded-xl shadow-2xl">
            <TrendingSearches />
          </div>
        </div>

        {/* ── Acciones ── */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Botón Buscar (Mobile) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Buscar productos"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* Botón Cotización */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label={`Ver lista de cotización, ${itemCount} ítems`}
            className="relative inline-flex items-center h-10 md:h-12 px-3 md:px-5 rounded-xl bg-yellow-400 hover:bg-yellow-500 transition-all active:scale-95 shadow-lg shadow-yellow-900/20"
          >
            <ClipboardList className="w-5 h-5 text-black" />
            <span className="hidden sm:inline text-sm font-bold text-black ml-2">
              Mi Cotización ({mounted ? itemCount : 0})
            </span>

            {mounted && itemCount > 0 && (
              <span
                aria-live="polite"
                aria-atomic="true"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce border-2 border-gray-900"
              >
                {itemCount}
              </span>
            )}
          </button>
          


          {/* Menú Hamburgesa (Mobile) */}
          <button 
            className="md:hidden p-2 text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Menú Mobile / Búsqueda Mobile ── */}
      {isMenuOpen && (
        <div className="absolute top-20 md:top-24 left-0 w-full bg-gray-900 border-b border-gray-800 p-4 md:hidden animate-in slide-in-from-top duration-200 z-50 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="relative mb-2">
            <PredictiveSearchBar />
          </div>

          <div className="mb-4 bg-white/5 p-2 rounded-xl border border-white/10">
            <TrendingSearches />
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <div className="flex gap-3">
            </div>
          </div>
          
          <MobileMegaMenu closeMenu={() => setIsMenuOpen(false)} />
        </div>
      )}
    </header>
  )
}
