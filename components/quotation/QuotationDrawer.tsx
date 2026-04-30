'use client'

import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { X, MessageCircle, Plus, Minus, ClipboardList, Download } from 'lucide-react'
import Image from 'next/image'
import { VipPromotionBanner } from './VipPromotionBanner'
import {
  useQuotationStore,
  selectItems,
  selectTotalUnits,
  selectTotalItems,
} from '@/store/quotationStore'
import { useWhatsAppCheckout } from '@/hooks/useWhatsAppCheckout'

// ── Formulario de Contacto (sub-componente) ──────────────────────────────────

/**
 * Formulario de datos de contacto que usa refs (inputs no controlados)
 * para evitar re-renders en cada keystroke. Solo sincroniza al store en onBlur.
 * Los datos persisten gracias al middleware persist de Zustand.
 */
function ContactForm() {
  const contactInfo = useQuotationStore((s) => s.contactInfo)
  const setContactField = useQuotationStore((s) => s.setContactField)

  const nombreRef = React.useRef<HTMLInputElement>(null)
  const cedulaRef = React.useRef<HTMLInputElement>(null)
  const sectorRef = React.useRef<HTMLInputElement>(null)

  // Sincronizar valores del store a los refs al montar
  React.useEffect(() => {
    if (nombreRef.current) nombreRef.current.value = contactInfo.nombre
    if (cedulaRef.current) cedulaRef.current.value = contactInfo.cedula
    if (sectorRef.current) sectorRef.current.value = contactInfo.sector
  }, [contactInfo.nombre, contactInfo.cedula, contactInfo.sector])

  const inputClass =
    'w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all'

  return (
    <fieldset className="space-y-2.5 pb-2 border-b border-gray-100">
      <legend className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
        Datos de Contacto
      </legend>

      <div>
        <label htmlFor="contact-nombre" className="sr-only">
          Nombre Completo
        </label>
        <input
          ref={nombreRef}
          id="contact-nombre"
          type="text"
          placeholder="Nombre Completo"
          defaultValue={contactInfo.nombre}
          onBlur={(e) => setContactField('nombre', e.target.value)}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="contact-cedula" className="sr-only">
          Cédula de Identidad / RIF
        </label>
        <input
          ref={cedulaRef}
          id="contact-cedula"
          type="text"
          placeholder="Cédula / RIF *"
          defaultValue={contactInfo.cedula}
          onBlur={(e) => setContactField('cedula', e.target.value)}
          className={inputClass}
          autoComplete="off"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="contact-sector" className="sr-only">
          Sector / Zona
        </label>
        <input
          ref={sectorRef}
          id="contact-sector"
          type="text"
          placeholder="Sector / Zona"
          defaultValue={contactInfo.sector}
          onBlur={(e) => setContactField('sector', e.target.value)}
          className={inputClass}
          autoComplete="address-level2"
        />
      </div>
    </fieldset>
  )
}

// ── Componente Principal ─────────────────────────────────────────────────────

export function QuotationDrawer() {
  const [mounted, setMounted] = React.useState(false)

  const isOpen = useQuotationStore((s) => s.isDrawerOpen)
  const setDrawerOpen = useQuotationStore((s) => s.setDrawerOpen)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Selectores atómicos — cada uno subscrito de forma independiente
  const items = useQuotationStore(selectItems)
  const totalUnits = useQuotationStore(selectTotalUnits)
  const totalItems = useQuotationStore(selectTotalItems)

  // Mostrar banner VIP cuando el pedido tiene volumen suficiente (≥ 10 unidades)
  // En un contexto B2B sin precios visibles, el volumen es el proxy del valor del pedido.
  const showVipBanner = totalItems >= 3 || totalUnits >= 10

  // Nuevo Hook de Conversión B2B
  const { handleWhatsAppCheckout, hasItems } = useWhatsAppCheckout()

  // Actions
  const increaseQty = useQuotationStore((s) => s.increaseQty)
  const decreaseQty = useQuotationStore((s) => s.decreaseQty)
  const removeItem = useQuotationStore((s) => s.removeItem)
  const clearQuotation = useQuotationStore((s) => s.clearQuotation)
  const contactInfo = useQuotationStore((s) => s.contactInfo)

  if (!mounted) return null

  // ── Disparar WhatsApp ──────────────────────────────────────────────────────
  const handleSendWhatsApp = () => {
    // La lógica de validación, formateo, tracking y window.open está encapsulada en el hook
    handleWhatsAppCheckout()
  }

  const handleDownloadPDF = async () => {
    if (!hasItems) return
    const { generateProformaPDF } = await import('@/lib/pdfGenerator')
    generateProformaPDF(items, contactInfo)
  }

  return (
    <Drawer open={isOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="bg-white border-gray-200 text-gray-900 max-h-[85dvh] md:max-w-md md:ml-auto md:rounded-l-lg md:rounded-r-none">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <DrawerHeader className="sticky top-0 z-10 bg-white border-b border-gray-300 px-4 py-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-yellow-500" />
              Mi Lista de Cotización
              <span className="ml-1 text-sm font-normal text-gray-500">
                ({items.length} producto{items.length !== 1 ? 's' : ''}, {totalUnits} und)
              </span>
            </DrawerTitle>
            <DrawerClose className="rounded-lg hover:bg-gray-100 transition-colors p-1">
              <X className="w-5 h-5 text-gray-500 hover:text-gray-900" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* ── Lista de ítems ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {!hasItems ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <ClipboardList className="w-12 h-12 text-gray-300" />
              <p className="text-gray-500 text-sm">
                Tu lista está vacía.
                <br />
                Agrega productos para cotizar.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-200 gap-2 hover:border-yellow-300 transition-colors"
              >
                {/* Nombre + Eliminar */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                    {item.reference && (
                      <p className="text-xs text-gray-400">Ref: {item.reference}</p>
                    )}
                    {item.notes && (
                      <p className="text-xs text-blue-600 mt-0.5">📝 {item.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1 rounded hover:bg-red-50"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Controles +/- */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {item.unit}
                  </span>
                  <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                      aria-label={`Disminuir cantidad de ${item.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-gray-900 select-none">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Footer con Formulario + CTAs ────────────────────────────────── */}
        {hasItems && (
          <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 px-4 py-4 space-y-3 max-h-[40vh] overflow-y-auto">
            {/* ── Banner VIP — Goal-Gradient Effect: aparece cuando el pedido
                tiene volumen, dando el último empujón de conversión ── */}
            {showVipBanner && <VipPromotionBanner variant="drawer" />}

            {/* ── Formulario de Contacto ── */}
            <ContactForm />

            {/* Limpiar lista */}
            <Button
              onClick={clearQuotation}
              variant="ghost"
              className="w-full text-xs text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              Vaciar lista completa
            </Button>

            {/* CTA Principal — WhatsApp */}
            <Button
              onClick={handleSendWhatsApp}
              className="w-full h-14 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-200 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar por WhatsApp
            </Button>

            {/* CTA Secundario — PDF Proforma */}
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              Descargar PDF Proforma / Imprimir
            </Button>

            <p className="text-xs text-gray-400 text-center leading-snug">
              Al enviar, se abrirá WhatsApp con tu lista lista.
              <br />
              Los precios se confirman en chat. Respuesta en minutos.
            </p>

            {/* ── Badge Cashea — Cierre de venta ────────────────────────────
                CRO (page-cro.md § Objection Handling): la objeción financiera
                se mata en el último punto antes de que el usuario abandone.
                Pricing Strategy: Mental Accounting — "cuotas" reduce percepción
                del costo total aunque el precio sea el mismo.
            ── */}
            <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <Image src="/Cashea-Icono-Color.svg" alt="Cashea" width={24} height={24} className="rounded-lg shadow-sm" />
              <p className="text-xs text-gray-600 leading-snug text-center">
                Cotiza hoy y consulta tus{' '}
                <strong className="text-orange-500 font-bold">cuotas sin interés con Cashea</strong>
                {' '}— tienda oficial.
              </p>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
