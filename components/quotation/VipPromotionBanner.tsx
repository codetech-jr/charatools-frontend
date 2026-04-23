'use client'

/**
 * @file components/quotation/VipPromotionBanner.tsx
 * @description Banner cross-sell de Membresía VIP CharaTools.
 *
 * Marketing Psychology aplicada:
 * - Loss Aversion: "¿Quieres 5% OFF?" activa miedo a perder el descuento.
 * - Scarcity + Time-bound: "hasta diciembre" crea urgencia real y creíble.
 * - Exclusivity / Mimetic Desire: "Membresía VIP" señaliza estatus.
 * - Goal-Gradient Effect: solo aparece cuando total > $50, dando el último
 *   empujón justo cuando el cliente está a punto de convertir.
 *
 * Copy: Copywriting skill — benefits over features, específico, acción directa.
 */

import { Gem } from 'lucide-react'

interface VipPromotionBannerProps {
  /** Variante de contexto para ajustar el texto del CTA */
  variant?: 'drawer' | 'info'
}

export function VipPromotionBanner({ variant = 'drawer' }: VipPromotionBannerProps) {
  return (
    <div
      role="note"
      aria-label="Oferta Membresía VIP CharaTools"
      className="relative overflow-hidden rounded-xl border border-amber-400/30 bg-gradient-to-br from-[#1a1040] via-[#2a1860] to-[#1a1040] px-4 py-3.5 shadow-lg shadow-purple-950/30"
    >
      {/* ── Brillo decorativo top-right ── */}
      <div
        className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl"
        aria-hidden="true"
      />
      {/* ── Brillo decorativo bottom-left ── */}
      <div
        className="pointer-events-none absolute -bottom-6 -left-4 h-20 w-20 rounded-full bg-purple-500/10 blur-2xl"
        aria-hidden="true"
      />

      {/* ── Contenido ── */}
      <div className="relative flex items-start gap-3">
        {/* Ícono diamante premium */}
        <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15 ring-1 ring-amber-400/30">
          <Gem className="h-4 w-4 text-amber-400" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Etiqueta VIP */}
          <p className="mb-0.5 text-[10px] font-black uppercase tracking-widest text-amber-400/80">
            Membresía VIP CharaTools
          </p>

          {/* Headline — Loss Aversion */}
          <p className="text-sm font-black leading-tight text-white">
            ¿Quieres{' '}
            <span className="text-amber-400">5% OFF</span>
            {' '}hasta diciembre?
          </p>

          {/* Subcopía — específica, acción directa */}
          <p className="mt-1 text-xs leading-snug text-purple-200/80">
            {variant === 'drawer'
              ? 'Con esta cotización superas $50. Activa tu Membresía VIP y obtén el descuento en tu pedido.'
              : 'Por compras mayores a $50 activa tu Membresía VIP CharaTools y acumula beneficios exclusivos.'}
          </p>

          {/* CTA — acción concreta */}
          <a
            href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools!%20Quiero%20activar%20mi%20Membres%C3%ADa%20VIP%20%F0%9F%92%8E"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-[11px] font-black text-black transition-all hover:bg-amber-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 focus:ring-offset-[#1a1040]"
          >
            <Gem className="h-3 w-3" aria-hidden="true" />
            Activar mi VIP ahora
          </a>
        </div>
      </div>
    </div>
  )
}
