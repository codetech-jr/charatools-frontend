'use client'

import React from 'react'
import { BadgeCheck, Zap, Package, MessageCircle } from 'lucide-react'

export function TrustBar() {
  const items = [
    { icon: BadgeCheck, label: 'Asesoría técnica especializada' },
    { icon: Zap, label: 'Despacho en Charallave' },
    { icon: Package, label: '+500 pedidos despachados' },
    { icon: MessageCircle, label: 'Respuesta en ~15 minutos' },
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
