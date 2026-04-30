'use client'

import React from 'react'
import { Search, MousePointerClick, MessageCircle, Wallet, Store } from 'lucide-react'

export function TrustBar() {
  const items = [
    { icon: Search, label: '1. Explora', description: 'Navega nuestro catálogo actualizado.' },
    { icon: MousePointerClick, label: '2. Elige', description: 'Añade a tu lista lo que necesitas.' },
    { icon: MessageCircle, label: '3. Cotiza', description: 'Recibe asesoría inmediata por WhatsApp.' },
    { icon: Wallet, label: '4. Paga Fácil', description: 'Usa Cashea o tu método preferido.' },
    { icon: Store, label: '5. Retira Hoy', description: 'Pasa por la tienda, sin hacer filas.' },
  ]

  return (
    <div
      role="list"
      aria-label="Sellos de confianza"
      className="w-full bg-[#111111] text-white border-y border-gray-800 overflow-x-auto py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-8 gap-8 md:gap-12 min-w-max md:min-w-full">
        <div className="text-center md:text-left flex-shrink-0 md:border-r border-gray-800 md:pr-8">
          <span className="text-yellow-500 font-bold text-sm uppercase tracking-wider block mb-1">Paso a paso de</span>
          <h2 className="text-2xl font-black text-white leading-tight">¿Cómo realizar<br/>una compra?</h2>
        </div>
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              role="listitem"
              className="flex flex-col items-center gap-2 text-center w-36 md:w-44"
            >
              <div className="w-12 h-12 rounded-full border-2 border-yellow-500/30 flex items-center justify-center mb-1">
                <Icon className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="font-bold text-sm md:text-base text-yellow-500">{item.label}</span>
              <span className="text-xs text-gray-400 text-balance leading-relaxed">{item.description}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
