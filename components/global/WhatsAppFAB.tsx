'use client'

/**
 * @file components/global/WhatsAppFAB.tsx
 * @description Botón flotante de WhatsApp (Floating Action Button).
 *
 * - Emula el flujo de alta conversión del retail ferretero (estilo Ekey).
 * - Incluye un tooltip de enganche "burbuja de chat".
 * - Botón tipo "pill" en desktop con texto claro de llamada a la acción.
 * - Circular en móvil para ahorrar espacio en pantalla.
 * - Accesible: aria-label descriptivo, focus-visible ring.
 */

import React, { useState, useEffect } from 'react'
import { useQuotationStore } from '@/store/quotationStore'
import { X } from 'lucide-react'

const WA_URL =
  'https://api.whatsapp.com/send?phone=584241234567&text=' +
  encodeURIComponent('¡Hola! 👋 Necesito consultar disponibilidad y precios para unos productos urgentes.')

export function WhatsAppFAB() {
  const isDrawerOpen = useQuotationStore((s) => s.isDrawerOpen)
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Aparece a los 4.5 segundos de navegación como asesor proactivo (CRO UX)
    const timer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true)
    }, 4500)
    return () => clearTimeout(timer)
  }, [dismissed])

  if (!mounted || isDrawerOpen) return null

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* ── Esfera Pop-Up Flotante (Burbuja Chat Vendedor B2B) ── */}
      <div 
        className={`
          pointer-events-auto
          transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-right
          ${showTooltip ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-8 pointer-events-none'}
          bg-zinc-900 text-white rounded-2xl rounded-br-sm shadow-2xl shadow-zinc-900/30 
          border border-zinc-800
          w-[calc(100vw-32px)] sm:w-auto sm:max-w-[320px] 
          p-3 sm:p-4
          flex items-start gap-3
        `}
      >
        {/* Avatar del Vendedor/Asesor */}
        <div className="relative w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-700">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150" 
            alt="Asesor Online" 
            className="w-full h-full object-cover" 
          />
          {/* Status Dot */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
        </div>
        
        {/* Copy B2B Rompe-hielo / Enlace directo a WA */}
        <a 
          href={WA_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-left cursor-pointer group"
          onClick={() => setShowTooltip(false)}
          aria-label="Hablar con asesor por WhatsApp"
        >
          <p className="text-[13px] sm:text-sm font-medium text-zinc-100 leading-snug">
            <span className="font-bold text-yellow-400">👋 ¡Hey!</span> ¿Necesitas checar disponibilidad inmediata para algún SKU Difícil? 
            <span className="block mt-1.5 text-zinc-400 text-xs group-hover:text-white transition-colors">
              Estoy 100% On-line en tienda. Dale Clic →
            </span>
          </p>
        </a>

        {/* Botón de cierre modal */}
        <button 
          onClick={(e) => { 
            e.preventDefault()
            setShowTooltip(false)
            setDismissed(true)
          }}
          className="bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          aria-label="Cerrar mensaje"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Botón FAB Principal de WhatsApp ── */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a CharaTools por WhatsApp"
        onClick={() => setShowTooltip(false)}
        className={`
          pointer-events-auto
          group flex items-center justify-center gap-2
          h-14 w-14 md:h-14 md:w-auto md:px-6 rounded-full
          bg-[#25D366] text-white
          shadow-xl shadow-green-900/30
          hover:scale-105 active:scale-95
          transition-all duration-300
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50
        `}
      >
        <div className="relative flex items-center justify-center w-7 h-7 shrink-0">
          {/* Anillo de pulso animado (solo decorativo) */}
          <span
            className="absolute inset-0 rounded-full bg-white animate-ping opacity-40 group-hover:opacity-60"
            aria-hidden="true"
          />
          {/* Ícono WhatsApp SVG */}
          <svg
            className="w-full h-full relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </div>
        {/* Texto visible solo en md+ */}
        <span className="font-bold hidden md:block text-sm tracking-wide">
          Asesoría Inmediata
        </span>
      </a>
    </div>
  )
}
