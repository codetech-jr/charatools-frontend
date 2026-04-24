'use client'

/**
 * @file app/faq/page.tsx
 * @description Preguntas Frecuentes B2B — Mata las 5 objeciones de compra.
 *
 * Skill: marketing-psychology.md — Regret aversion, authority bias, loss aversion.
 * Las objeciones se destruyen antes de que el cliente las piense en voz alta.
 * Skill: copywriting.md — Specificity over vagueness, benefits over features.
 * UI: Accordion interactivo accesible (WAI-ARIA pattern: aria-expanded, role="region").
 */

import type { Metadata } from 'next'
import React, { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus, ArrowRight } from 'lucide-react'

// Metadata — importado en el layout server, pero como la page es client usamos generateMetadata via separar
// Nota: Al ser 'use client', metadata se define en metadata.ts o en un layout wrapper.
// Para Next.js 13+: la metadata debe estar en un server component. La exportamos aquí pero Next la ignora en client components.
// Solución: Separar en layout or usar head tag manual. Por coherencia con el proyecto, la definimos aquí de todas formas.

const FAQ_ITEMS = [
  {
    id: 'faq-whatsapp',
    question: '¿Cómo funciona pedir por WhatsApp? ¿Es seguro?',
    answer: `Es el método más rápido que existe. Así funciona:

1. Armas tu lista en el catálogo y presionas "Cotizar por WhatsApp".
2. Se abre WhatsApp con tu lista ya redactada.
3. Un asesor técnico te confirma disponibilidad y te da la información en menos de 15 minutos.
4. Coordinas el retiro en tienda o la entrega a tu dirección.

No hay datos bancarios que ingresar, no hay formulario que llenar, no hay contraseñas que recordar. Solo WhatsApp, que ya tienes en el teléfono.`,
  },
  {
    id: 'faq-garantia',
    question: '¿Los equipos tienen garantía real? ¿Qué cubre?',
    answer: `Sí. Todos los equipos que vendemos son originales importados, con su número de serie registrado. La garantía oficial cubre:

• Defectos de fabricación por 12 meses desde la fecha de compra.
• Soporte técnico con repuestos originales disponibles.
• Reposición o reparación del equipo según evaluación técnica.

Lo que NO cubre: daños por mal uso, caídas, voltaje incorrecto o modificaciones no autorizadas. Si tienes una reclamación, nos escribes con la factura y el serial, y nosotros gestionamos todo contigo.`,
  },
  {
    id: 'faq-envios',
    question: '¿Hacen envíos? ¿Llegan a toda Miranda?',
    answer: `Sí. Cubrimos todo el estado Miranda y zonas aledañas. Trabaja así:

• Retiro en tienda: mismo día si el producto está en stock (Charallave).
• Envío a tu dirección: coordinamos a través de mototaxi o servicio de mensajería. El costo depende de la zona y lo calculamos al momento.
• Para obras grandes con múltiples referencias: puedes hacer un pedido consolidado y coordinamos la entrega en bloque.

Escríbenos primero para confirmar disponibilidad antes de hacer el pedido. Así evitamos contratiempos.`,
  },
  {
    id: 'faq-pago',
    question: '¿Cuáles son los métodos de pago?',
    answer: `Aceptamos los métodos más comunes para el mercado venezolano:

• Pago móvil (instantáneo, preferido).
• Transferencia bancaria en bolívares.
• Efectivo en tienda (dólares y bolívares).
• Zelle para pedidos grandes (consultar).

No manejamos tarjeta de crédito ni pasarelas de pago online por el momento. Toda transacción se confirma por WhatsApp con su respectivo comprobante.`,
  },
] as const

// ── Componente Accordion ────────────────────────────────────────────────────

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number]
  isOpen: boolean
  onToggle: () => void
}) {
  const answerId = `${item.id}-answer`

  return (
    <div className="border-b border-gray-200 last:border-0">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="w-full flex items-start justify-between gap-4 py-5 px-1 text-left group"
        >
          <span className="text-sm md:text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-snug">
            {item.question}
          </span>
          <span
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
              isOpen
                ? 'border-yellow-400 bg-yellow-400 text-black'
                : 'border-gray-200 text-gray-400 group-hover:border-gray-400'
            }`}
            aria-hidden="true"
          >
            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </span>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={item.id}
        hidden={!isOpen}
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'pb-5' : ''}`}
      >
        <div className="px-1 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

// ── Página ─────────────────────────────────────────────────────────────────

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* ── Header ── */}
      <div className="bg-gray-900 px-4 py-12 md:py-16 text-center">
        <span className="inline-block text-yellow-400 text-xs font-black uppercase tracking-widest mb-4">
          Sin rodeos
        </span>
        <h1 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-2xl mx-auto">
          Respuestas directas<br />a lo que más te preocupa
        </h1>
        <p className="mt-4 text-gray-400 text-base max-w-xl mx-auto">
          Antes de escribirnos, revisa aquí. Si tu pregunta no está, te respondemos en menos de 15 minutos.
        </p>
      </div>

      {/* ── Accordion ── */}
      <section
        className="max-w-3xl mx-auto px-4 py-12 md:py-16"
        aria-label="Preguntas frecuentes"
      >
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-200 px-4 md:px-8">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

        {/* CTA bajo el accordion */}
        <div className="mt-10 text-center space-y-3">
          <p className="text-sm text-gray-500">
            ¿Tu pregunta no está aquí?
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools,%20tengo%20una%20pregunta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-100"
          >
            Pregunta por WhatsApp
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── Bloque de confianza bajo el FAQ ── */}
      <section className="bg-gray-50 border-t border-gray-200 px-4 py-10" aria-label="Por qué confiar en CharaTools">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { label: 'Respuesta garantizada', value: '< 15 min' },
            { label: 'Marcas con garantía oficial', value: '6 marcas' },
            { label: 'Ubicación física verificable', value: 'Charallave' },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-1">
              <p className="text-2xl font-black text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
