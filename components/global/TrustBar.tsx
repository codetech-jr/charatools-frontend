'use client'

import React from 'react'
import { BadgeCheck, Zap, Package, MessageCircle } from 'lucide-react'

export function TrustBar() {
  const items = [
    { icon: MessageCircle, label: 'Asesoría sin robots', description: 'Un asesor de verdad te responde en WhatsApp. Sin tickets, sin esperas inútiles.' },
    { icon: BadgeCheck, label: 'Herramientas 100% originales', description: 'InGco y Truper con garantía real del fabricante. Aquí no vendemos imitaciones.' },
    { icon: Zap, label: 'Retira hoy en Charallave', description: 'Stock disponible para llevar el mismo día. Sin esperar semanas ni pagar envío a Caracas.' },
  ]

  return (
    <div
      role="list"
      aria-label="Sellos de confianza"
      className="w-full bg-gray-50 border-y border-gray-200 overflow-x-auto py-3"
    >
      <div className="flex items-center justify-center px-4 md:px-8 gap-6 md:gap-12 min-w-max md:min-w-full">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              role="listitem"
              className="flex items-center gap-2 whitespace-nowrap text-xs md:text-sm text-gray-800"
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
