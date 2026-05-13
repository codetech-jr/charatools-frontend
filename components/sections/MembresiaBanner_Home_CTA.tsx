'use client'

/**
 * @file components/sections/MembresiaBanner_Home_CTA.tsx
 * @description Sección institucional de Membresía VIP migrada al Home para máximo impacto visual y CRO.
 *
 * Skill: page-cro.md — Ubicación estratégica pre-cierre para incentivar pedidos de alto volumen.
 * Skill: marketing-psychology.md — Exclusividad, Reciprocidad y Sentido de Pertenencia.
 */

import { Gem } from 'lucide-react'

export function MembresiaBanner_Home_CTA() {
  return (
    <section
      className="relative overflow-hidden px-4 py-16 md:py-24 bg-gradient-to-br from-[#0f0a2a] via-[#1a1040] to-[#0f0a2a]"
      aria-label="Programa de Membresía VIP CharaTools"
    >
      {/* Detalles decorativos de luz premium */}
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-amber-400/10 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-12 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400">
            <Gem className="h-3.5 w-3.5" aria-hidden="true" />
            Club de Beneficios VIP
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight text-balance">
            Queremos premiar {" "}
            <br className="hidden md:block" />
            <span className="text-amber-400">tu constancia</span>
          </h2>
          <p className="text-base md:text-lg text-purple-200/70 max-w-2xl mx-auto leading-relaxed">
            Beneficios diseñados para quienes nos eligen día a día. Si compras con nosotros con regularidad, el programa VIP es tu mejor herramienta.
          </p>
        </div>

        {/* Grid de beneficios - CRO: Visual scannability */}
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto gap-6 mb-12">
          {[
            {
              icon: '💰',
              title: '5% OFF en cada pedido',
              body: 'Descuento automático en todas tus compras superiores a $50.',
            },
            {
              icon: '⚡',
              title: 'Alistamiento Anticipado',
              body: 'Prioridad en la preparación de tus pedidos para retiro súper rápido.',
            },
            {
              icon: '📦',
              title: 'Reserva de Inventario',
              body: 'Aseguramos los productos de tus cotizaciones VIP por 48h.',
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col items-center text-center rounded-2xl border border-amber-400/10 bg-white/5 p-6 space-y-3 hover:border-amber-400/30 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="text-3xl mb-2 transition-transform group-hover:scale-110 duration-300" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-black text-white">{benefit.title}</h3>
              <p className="text-sm text-purple-200/60 leading-relaxed">{benefit.body}</p>
            </div>
          ))}
        </div>

        {/* Panel de Acción - Conversion Point */}
        <div className="rounded-3xl border border-amber-400/20 bg-white/5 p-8 md:p-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-sm font-black uppercase tracking-widest text-amber-400/90">
                ¿Cómo funciona?
              </p>
              <ol className="space-y-4">
                {[
                  'La membresía se activa con una primera compra o pago único de $50.',
                  'Una vez activa, muestra tu carnet/cuenta VIP a tu asesor de ventas en caja o WhatsApp.',
                  'Tu descuento y prioridad se aplicarán al instante tras la validación manual.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm md:text-base text-purple-100/80">
                    <span
                      className="flex-shrink-0 h-7 w-7 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-xs font-black text-amber-400"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col items-center lg:items-end justify-center">
              <div className="text-center lg:text-right mb-6 hidden lg:block">
                <p className="text-white font-bold text-lg">¿Listo para ahorrar?</p>
                <p className="text-purple-300/60 text-sm">Actívala en tu próxima cotización</p>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools!%20Quiero%20activar%20mi%20Membres%C3%ADa%20VIP%20%F0%9F%92%8E"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-amber-400 px-8 py-4 text-base font-black text-black shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-4 focus:ring-offset-[#1a1040]"
              >
                <Gem className="h-5 h-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
                Activar mi Membresía VIP
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
