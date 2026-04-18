'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useQuotationStore } from '@/store/quotationStore'

interface HeroSectionProps {
  onOpenCatalog: () => void
}

export function HeroSection({ onOpenCatalog }: HeroSectionProps) {
  const setDrawerOpen = useQuotationStore((s) => s.setDrawerOpen)
  return (
    <section
      aria-labelledby="hero-heading"
      className="min-h-dvh bg-gray-50 flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 lg:px-16 py-16 md:py-20 gap-8 lg:gap-12"
    >
      <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-yellow-100 border border-yellow-400">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs md:text-sm font-semibold text-yellow-800">
            Tu Ferretería Multimarca
          </span>
        </div>

        <h1
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
        >
          CharaTools - Tu Herramienta Ideal
        </h1>

        <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-lg">
          Tu ferretería multimarca en Charallave. Herramientas, plomería, iluminación y electricidad. Cotiza por WhatsApp en menos de 2 minutos.
        </p>

        <div className="flex flex-col md:flex-row gap-3 pt-4">
          <Button
            onClick={onOpenCatalog}
            className="w-full md:w-auto px-6 py-2.5 md:py-2 h-11 md:h-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-all active:scale-95 shadow-md"
          >
            Ver catálogo y cotizar
          </Button>
          <Button
            onClick={() => setDrawerOpen(true)}
            className="w-full md:w-auto px-6 py-2.5 md:py-2 h-11 md:h-10 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all active:scale-95 shadow-md"
          >
            Cotizar por WhatsApp
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center animate-fade-in">
        <div className="w-full aspect-square md:aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
          <img
            src="/hero-tools.jpg"
            alt="Herramientas INGCO profesionales"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
