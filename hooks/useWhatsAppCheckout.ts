'use client'

import { useQuotationStore } from '@/store/quotationStore'
import { trackWhatsAppLead } from '@/lib/analytics'
import { toast } from 'sonner' // Asumiendo que usamos sonner para avisos defensivos

/**
 * @hook useWhatsAppCheckout
 * @description Lógica centralizada para el flujo de conversión B2B de Charatools.
 * Encapsula: lectura de Zustand, formateo de mensaje, tracking y redirección.
 */

const CHARATOOLS_WA_NUMBER = '584220148405'

export function useWhatsAppCheckout() {
  const items = useQuotationStore((s) => s.items)
  const contactInfo = useQuotationStore((s) => s.contactInfo)
  const clearQuotation = useQuotationStore((s) => s.clearQuotation)
  const setDrawerOpen = useQuotationStore((s) => s.setDrawerOpen)

  const handleWhatsAppCheckout = () => {
    // 1. Manejo Defensivo: Carrito vacío
    if (items.length === 0) {
      toast.error('Tu lista de cotización está vacía.')
      return
    }

    // 2. Validación de datos mínimos (Cédula es obligatoria según QuotationDrawer)
    if (!contactInfo.cedula.trim()) {
      toast.warning('Por favor, ingresa tu Cédula o RIF para procesar la cotización.')
      return
    }

    try {
      // 3. Armar Template String formal (Estructura B2B limpia)
      const header = `Hola Charatools, necesito checar disponibilidad inmediata de la siguiente cotización:\n\n`
      
      const itemsList = items.map((item, index) => {
        const sku = item.reference ? ` [${item.reference}]` : ''
        return `${index + 1}. ${item.qty}x${sku} ${item.name} (${item.brand})`
      }).join('\n')

      const contactBlock = `\n\n───────────────────\n👤 *Cliente:* ${contactInfo.nombre || 'Interesado'}\n🪪 *Cédula/RIF:* ${contactInfo.cedula}\n📍 *Sector:* ${contactInfo.sector || 'No provisto'}`

      const footer = `\n\nQuedo atento a la confirmación de precios y métodos de pago (Cashea/Transferencia). ¡Gracias! 🤝`

      const fullMessage = `${header}${itemsList}${contactBlock}${footer}`
      
      // 4. encodeURIComponent estricto para evitar rotura de URL
      const encodedMessage = encodeURIComponent(fullMessage)
      const waUrl = `https://api.whatsapp.com/send?phone=${CHARATOOLS_WA_NUMBER}&text=${encodedMessage}`

      // 5. ORDEN IMPERATIVO:
      // a. Disparar Analítica (GA4)
      trackWhatsAppLead('drawer', items)

      // b. Abrir WhatsApp en nueva pestaña (Fundamental para PWA/Retención)
      window.open(waUrl, '_blank', 'noopener,noreferrer')

      // 6. Limpieza Post-Conversión
      setDrawerOpen(false)
      // Opcional: Podríamos no limpiar de inmediato si queremos que el usuario regrese y vea su lista,
      // pero en este flujo "Checkout-like" lo ideal es vaciar para nueva orden.
      clearQuotation()
      
      toast.success('¡Cotización enviada! Abriendo WhatsApp...')
    } catch (error) {
      console.error('[WhatsAppCheckout Error]:', error)
      toast.error('Hubo un error al generar la cotización. Intenta de nuevo.')
    }
  }

  return {
    handleWhatsAppCheckout,
    hasItems: items.length > 0
  }
}
