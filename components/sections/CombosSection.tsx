'use client'

import React from 'react'

type StockStatus = 'available' | 'high-demand' | 'new-batch' | 'out-of-stock'

interface Combo {
  id: string
  icon: string
  name: string
  tagline: string
  items: string[]
  status: StockStatus
}

const COMBOS: Combo[] = [
  {
    id: 'combo-electrico',
    icon: '⚡',
    name: 'Kit Instalación Eléctrica',
    tagline: 'Para remodelaciones y conexiones nuevas',
    items: [
      'Taladro percutor INGCO 710W',
      'Juego de brocas multipropósito',
      'Caja de breakers 4 espacios',
      'Cinta aislante × 3 unidades',
      'Cable eléctrico #12 × 10m',
    ],
    status: 'high-demand',
  },
  {
    id: 'combo-plomeria',
    icon: '🔧',
    name: 'Kit Plomería Express',
    tagline: 'Averías rápidas y tuberías nuevas',
    items: [
      'Cortatubos de cobre 3/8" – 1"',
      'Llave stilson 14" industrial',
      'Cinta teflón × 5 unidades',
      'Sellador SF-902 250ml',
      'Adaptadores PPR surtidos × 6',
    ],
    status: 'new-batch',
  },
  {
    id: 'combo-pintura',
    icon: '🎨',
    name: 'Kit Pintura Interior',
    tagline: 'Renovación completa de cuartos',
    items: [
      'Rodillo de felpa 22cm',
      'Bandeja plástica grande',
      'Brocha profesional 3"',
      'Lija al agua pack × 5',
      'Solvente mineral 1 litro',
    ],
    status: 'available',
  },
  {
    id: 'combo-techo',
    icon: '🏠',
    name: 'Kit Impermeabilización',
    tagline: 'Techos y paredes a prueba de agua',
    items: [
      'Impermeabilizante acrílico 4kg',
      'Espátula inoxidable 20cm',
      'Pistola selladora profesional',
      'Cartucho de silicona × 2',
      'Malla fibra de vidrio 1m',
    ],
    status: 'available',
  },
]

const STATUS_BADGES: Record<StockStatus, { label: string; bg: string; text: string }> = {
  available:     { label: '✅ Disponible',    bg: 'bg-green-100',  text: 'text-green-800'  },
  'high-demand': { label: '🔥 Lo más pedido', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'new-batch':   { label: '📦 Nuevo lote',    bg: 'bg-blue-100',   text: 'text-blue-800'   },
  'out-of-stock':{ label: '⚠️ Sin stock',     bg: 'bg-red-100',    text: 'text-red-800'    },
}

const WHATSAPP_NUMBER = '584241234567'

function buildWhatsAppUrl(combo: Combo): string {
  const msg = `Hola CharaTools! 👋 Quiero cotizar el *${combo.name}*.\n\nÍtems:\n${combo.items.map(i => `• ${i}`).join('\n')}\n\n¿Está disponible?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

interface ComboCardProps {
  combo: Combo
}

function ComboCard({ combo }: ComboCardProps) {
  const badge = STATUS_BADGES[combo.status]
  const isDisabled = combo.status === 'out-of-stock'

  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-xl transition-all duration-200 group">
      {/* Icon + badge row */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl leading-none">{combo.icon}</span>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      {/* Name + tagline */}
      <h3 className="text-base font-black text-gray-900 leading-snug mb-1">
        {combo.name}
      </h3>
      <p className="text-xs text-gray-500 mb-4">{combo.tagline}</p>

      {/* Items list */}
      <ul className="flex-grow space-y-2 mb-6">
        {combo.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-yellow-500 font-bold mt-0.5 flex-shrink-0">›</span>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isDisabled ? (
        <div className="w-full text-center bg-gray-100 text-gray-400 font-bold py-3 rounded-xl text-sm cursor-not-allowed">
          Sin stock temporalmente
        </div>
      ) : (
        <a
          href={buildWhatsAppUrl(combo)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Cotizar ${combo.name} por WhatsApp`}
          className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black font-bold py-3 rounded-xl text-sm transition-all duration-200"
        >
          Cotizar este combo →
        </a>
      )}
      <p className="text-xs text-center text-gray-400 mt-2">
        Sin compromiso · Puedes personalizar
      </p>
    </article>
  )
}

export function CombosSection() {
  return (
    <section
      id="combos"
      aria-labelledby="combos-heading"
      className="w-full py-16 md:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
          Kits listos para tu obra
        </p>
        <h2
          id="combos-heading"
          className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4"
        >
          No busques pieza por pieza.{' '}
          <span className="text-yellow-500">Lleva el combo exacto</span>{' '}
          para tu proyecto.
        </h2>
        <p className="text-gray-600 max-w-2xl mb-12 text-base leading-relaxed">
          Armamos los kits más pedidos en Charallave. Cada combo cubre lo que realmente necesitas,
          sin sobras ni faltantes. Envíanos el combo por WhatsApp y te confirmamos disponibilidad
          en minutos.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMBOS.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>

        {/* Bottom nudge */}
        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Tu proyecto no está aquí?{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Necesito un combo personalizado para mi proyecto.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-600 underline underline-offset-2 hover:text-yellow-700"
          >
            Arma tu combo personalizado →
          </a>
        </p>

      </div>
    </section>
  )
}
