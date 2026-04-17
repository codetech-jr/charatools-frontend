'use client'

import React from 'react'
import { useQuotation } from '@/context/QuotationContext'
import { ShoppingCart } from 'lucide-react'

interface NavbarProps {
  onOpenQuotation: () => void
}

export function Navbar({ onOpenQuotation }: NavbarProps) {
  const { items } = useQuotation()
  const itemCount = items.length

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 md:px-8"
    >
      <a href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-yellow-400 flex items-center justify-center text-black font-bold text-lg md:text-xl">
          CT
        </div>
        <span className="hidden sm:inline font-bold text-white text-lg">CharaTools</span>
      </a>

      <nav
        aria-label="Categorías principales"
        className="hidden md:flex gap-8 text-sm text-gray-300"
      >
        <a href="#catalogo" className="hover:text-white transition-colors">
          Herramientas
        </a>
        <a href="#catalogo" className="hover:text-white transition-colors">
          Plomería
        </a>
        <a href="#catalogo" className="hover:text-white transition-colors">
          Iluminación
        </a>
        <a href="#catalogo" className="hover:text-white transition-colors">
          Electricidad
        </a>
        <a href="#catalogo" className="hover:text-white transition-colors">
          Impermeabilización
        </a>
      </nav>

      <button
        onClick={onOpenQuotation}
        aria-label={`Ver lista de cotización, ${itemCount} ítems`}
        className="relative inline-flex items-center justify-center w-10 h-10 md:w-auto md:px-4 md:py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors"
      >
        <ShoppingCart className="w-5 h-5 md:w-4 md:h-4 text-black" />
        <span className="hidden md:inline text-xs font-bold text-black ml-2">
          Mi Cotización ({itemCount})
        </span>

        {itemCount > 0 && (
          <span
            aria-live="polite"
            aria-atomic="true"
            className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {itemCount}
          </span>
        )}
      </button>
    </header>
  )
}
