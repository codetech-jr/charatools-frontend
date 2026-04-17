'use client'

import React, { useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, MessageCircle, Plus, Minus } from 'lucide-react'
import { useQuotation } from '@/context/QuotationContext'

interface QuotationDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function QuotationDrawer({ isOpen, onOpenChange }: QuotationDrawerProps) {
  const { items, removeItem, clearItems, updateQuantity } = useQuotation()
  const [name, setName] = useState('')
  const [sector, setSector] = useState('')

  const handleSendWhatsApp = () => {
    if (items.length === 0) return

    const itemsList = items.map((item) => `• ${item.name} - Cantidad: ${item.quantity} (${item.category})`).join('\n')

    const message = `Hola CharaTools! 👋\n\nQuiero cotizar los siguientes productos:\n\n${itemsList}\n\nMi nombre: ${name || 'No especificado'}\nSector/zona: ${sector || 'No especificado'}\n\nPor favor envíenme los precios disponibles.`

    const encoded = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/584241234567?text=${encoded}`

    window.open(whatsappUrl, '_blank')
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-white border-gray-200 text-gray-900 max-h-[85dvh] md:max-w-md md:ml-auto md:rounded-l-lg md:rounded-r-none">
        <DrawerHeader className="sticky top-0 z-10 bg-white border-b border-gray-300 px-4 py-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg md:text-xl font-bold text-gray-900">
              Mi Lista de Cotización ({items.length})
            </DrawerTitle>
            <DrawerClose className="rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500 hover:text-gray-900" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {items.length === 0 ? (
            <p className="text-center text-gray-700 py-8">Tu lista está vacía. Agrega productos para cotizar.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-300 gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors ml-2 flex-shrink-0"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white rounded border border-gray-200 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                    aria-label={`Disminuir cantidad de ${item.name}`}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="sticky bottom-0 z-10 bg-white border-t border-gray-300 px-4 py-4 space-y-4">
            <Button
              onClick={clearItems}
              variant="ghost"
              className="w-full text-xs text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Limpiar lista
            </Button>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-800 mb-1 block">Tu nombre</label>
                <Input
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 text-sm h-9"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-800 mb-1 block">Sector/zona</label>
                <Input
                  type="text"
                  placeholder="Ej: Charallave"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 text-sm h-9"
                />
              </div>
            </div>

            <Button
              onClick={handleSendWhatsApp}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar por WhatsApp
            </Button>

            <p className="text-xs text-gray-500 text-center leading-snug">
              Los precios varían según disponibilidad. Te respondemos en minutos.
            </p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
