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
            Tu Ferretería de Confianza
          </span>
        </div>

        <h1
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance"
        >
          Somos la Ferretería más completa de Charallave. Inventario especializado, atención experta y sin esperas.
        </h1>

        <p className="text-base md:text-lg text-gray-800 leading-relaxed max-w-lg">
          Herramientas InGco con garantía real, plomería, electricidad y más. Escríbenos por WhatsApp y retira en Charallave el mismo día.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 w-full max-w-lg">
          <Button
            onClick={onOpenCatalog}
            className="w-full sm:flex-1 h-14 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-black text-lg rounded-xl shadow-xl shadow-yellow-400/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Ver catálogo de productos
          </Button>

          <Button
            variant="outline"
            onClick={() => window.open('https://wa.me/584220148405?text=Hola%2C+quiero+consultar+por+unas+herramientas', '_blank')}
            className="w-full sm:flex-1 h-14 border-2 border-gray-300 text-gray-700 font-bold text-base rounded-xl hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg 
              className="w-5 h-5 text-green-600" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.553 4.197 1.603 6.034L0 24l6.135-1.61a11.832 11.832 0 005.91 1.586h.005c6.637 0 12.05-5.414 12.05-12.05a11.829 11.829 0 00-3.536-8.523z"/>
            </svg>
            Consultar WhatsApp
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center animate-fade-in">
        <div className="w-full aspect-square md:aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
          <img
            src="/hero-tools.jpg"
            alt="Fachada de la Ferretería CharaTools en el centro de Charallave con amplio stock de herramientas Truper e Ingco"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
