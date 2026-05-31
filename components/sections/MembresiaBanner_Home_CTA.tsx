'use client'

import React from 'react'
import { Shield, CircleDollarSign, Gem, PackageCheck, Clock } from 'lucide-react'

export function MembresiaBanner_Home_CTA() {
  return (
    <section className="relative w-full max-w-5xl mx-auto bg-[#1a1b2e] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 py-16 px-6 md:px-12 text-center">
      
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0f1c] pointer-events-none" />
      
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-yellow-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8">
          <Shield className="w-3.5 h-3.5" />
          Club de Beneficios VIP
        </div>
        
        {/* Main Title */}
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-[1.1]">
          Queremos premiar tu constancia <br className="hidden md:block" />
          <span className="text-yellow-400">Beneficios diseñados para quienes nos eligen día a día.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-12">
          Si compras con nosotros con regularidad, el programa VIP es tu mejor herramienta.<br className="hidden md:block" />
          Sin cuotas ni registros complejos. Solo beneficios reales en cada obra.
        </p>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          {/* Card 1 */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center transition-colors hover:bg-white/[0.05]">
            <div className="mb-4">
              <CircleDollarSign className="w-10 h-10 text-yellow-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">5% OFF en cada pedido</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Descuento automático en compras superiores a $50.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center transition-colors hover:bg-white/[0.05]">
            <div className="mb-4">
              <PackageCheck className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Alistamiento Anticipado</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pedidos listos para retirar apenas llegues a la tienda.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center transition-colors hover:bg-white/[0.05]">
            <div className="mb-4">
              <Clock className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Reserva de Inventario</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Asegura tus materiales por 48h tras tu cotización.
            </p>
          </div>
        </div>
        
        {/* Activation Guide Box */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[1.5rem] p-8 md:p-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-10 md:gap-8 text-left">
          
          {/* Steps */}
          <div className="flex-1 w-full">
            <h4 className="text-yellow-400 text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-6">
              ¿Cómo activarla hoy?
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-yellow-400 text-xs font-bold shrink-0">1</span>
                <span className="text-slate-300 text-sm md:text-base">Realiza tu pedido por WhatsApp (superior a $50).</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-yellow-400 text-xs font-bold shrink-0">2</span>
                <span className="text-slate-300 text-sm md:text-base">Solicita la activación VIP a tu asesor asignado.</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-yellow-400 text-xs font-bold shrink-0">3</span>
                <span className="text-slate-300 text-sm md:text-base">¡Listo! Tu descuento se aplica al instante en tu factura.</span>
              </li>
            </ul>
          </div>
          
          {/* CTA Button */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0 w-full md:w-auto">
            <p className="text-white font-bold text-lg mb-1">¿Listo para ahorrar?</p>
            <p className="text-slate-400 text-sm mb-5">Actívala en tu próxima cotización</p>
            <a
              href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools,%20quiero%20activar%20mi%20Membres%C3%ADa%20VIP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-xl transition-transform active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)] w-full md:w-auto"
            >
              <Gem className="w-5 h-5" />
              Activar mi Membresía VIP
            </a>
          </div>
          
        </div>
      </div>
    </section>
  )
}
