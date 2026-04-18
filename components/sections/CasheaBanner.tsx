'use client'

/**
 * @file components/sections/CasheaBanner.tsx
 * @description Franja de Cashea — Inyección de crédito sin interés en el Home.
 *
 * CRO Insight (page-cro.md § Trust Signals / Objection Handling):
 *   La objeción #1 en ferreterías B2B es el precio percibido vs. liquidez.
 *   Cashea destruye esa objeción antes de que el usuario llegue al producto.
 *
 * Pricing Strategy (pricing-strategy.md § Pricing Psychology):
 *   "Mental Accounting" — fraccionar el pago hace que el costo total
 *   parezca menor. 3 cuotas siempre gana a un pago único percibido como alto.
 *
 * Copy (copywriting.md § CTA / Present Bias):
 *   Verbo de acción inmediata: "Llévate HOY" — elimina la barrera temporal.
 *   Prueba de autoridad: "Tienda Oficial Cashea" = validación de tercero.
 */

import Link from 'next/link'
import { ArrowRight, CreditCard, Wallet, CheckCircle2 } from 'lucide-react'

// ── Pasos visuales de la propuesta de valor ────────────────────────────────

const STEPS = [
  {
    icon: Wallet,
    label: 'Paga inicial',
    sub: 'Cuota 1 hoy',
  },
  {
    icon: CreditCard,
    label: '+ 2 Cuotas',
    sub: 'Sin interés',
  },
  {
    icon: CheckCircle2,
    label: '¡Tu herramienta!',
    sub: 'La llevas hoy',
  },
] as const

// ── Componente ─────────────────────────────────────────────────────────────

export function CasheaBanner() {
  return (
    <section
      aria-label="Financiamiento Cashea — Llévate tu herramienta hoy y paga después"
      className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700 overflow-hidden"
    >
      {/* Línea de acento naranja arriba */}
      <div className="h-[3px] bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          {/* ── Bloque de texto principal ── */}
          <div className="text-center md:text-left space-y-1 flex-shrink-0">
            {/* Eyebrow — credencial de autoridad */}
            <p className="text-xs font-black text-yellow-400 uppercase tracking-[0.15em]">
              Tienda Oficial Cashea ✓
            </p>
            {/* Headline — Present Bias + Loss Aversion */}
            <h2 className="text-lg md:text-xl font-black text-white leading-tight">
              Llévate tu herramienta{' '}
              <span className="text-yellow-400">hoy</span>.{' '}
              Paga{' '}
              <span className="text-orange-400">después</span>.
            </h2>
            <p className="text-xs text-gray-400 max-w-xs mx-auto md:mx-0">
              Divide tu compra en cuotas sin interés directo en la tienda.
            </p>
          </div>

          {/* ── Pasos visuales (3 iconos) ── */}
          <div
            className="flex items-center gap-2 md:gap-3 flex-shrink-0"
            aria-label="Cómo funciona Cashea: 3 pasos"
          >
            {STEPS.map((step, idx) => {
              const Icon = step.icon
              const isLast = idx === STEPS.length - 1
              return (
                <div key={step.label} className="flex items-center gap-2 md:gap-3">
                  {/* Bloque de paso */}
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isLast
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-700 border border-gray-600 text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className={`text-[10px] font-bold text-center leading-tight ${isLast ? 'text-yellow-400' : 'text-gray-300'}`}>
                      {step.label}
                    </span>
                    <span className="text-[9px] text-gray-500 text-center leading-tight">{step.sub}</span>
                  </div>

                  {/* Separador → entre pasos */}
                  {!isLast && (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 -mt-4" aria-hidden="true" />
                  )}
                </div>
              )
            })}
          </div>

          {/* ── CTA ── */}
          <div className="flex flex-col items-center md:items-end gap-1.5 flex-shrink-0">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 h-11 px-5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-900/40"
              aria-label="Ver catálogo y comprar con Cashea"
            >
              Ver Catálogo
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <p className="text-[10px] text-gray-500">Disponible en productos seleccionados</p>
          </div>

        </div>
      </div>

      {/* Línea de acento naranja abajo */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-transparent" aria-hidden="true" />
    </section>
  )
}
