'use client'

import React from 'react'
import { ArrowRight, CheckCircle2, ShoppingCart, Calendar, CreditCard, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function CasheaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Brand Header ── */}
      <div className="w-full bg-[#FDFA3D] text-[#111] py-4 px-4 flex items-center justify-center gap-4">
        <Image src="/Cashea-Icono-Negro.svg" alt="Cashea" width={24} height={24} className="" />
        <span className="text-sm font-black tracking-widest uppercase">Aliado Oficial Cashea</span>
      </div>

      {/* ── Hero Section ── */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight max-w-4xl mx-auto">
          Que el presupuesto no detenga tu obra. Llévate <span className="text-[#FDFA3D]">hoy</span> lo que necesitas y págalo <span className="text-[#FDFA3D]">después</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          En CharaTools sabemos que las reparaciones no esperan. Por eso, dividimos tu compra en cuotas sin interés para que no pares tu proyecto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            asChild
            className="h-16 px-10 bg-[#FDFA3D] hover:bg-[#F0ED26] text-[#111] rounded-2xl text-lg font-black shadow-xl shadow-[#FDFA3D]/20 transition-all active:scale-95"
          >
            <a href="https://wa.me/584220148405?text=Hola!+Quiero+comprar+mi+lista+de+materiales+con+Cashea" target="_blank">
              Armar mi presupuesto Cashea
            </a>
          </Button>
          <Button 
            variant="outline"
            asChild
            className="h-16 px-10 border-2 border-gray-200 text-gray-700 rounded-2xl text-lg font-black hover:bg-gray-50 transition-all"
          >
            <Link href="/catalogo">Ver productos disponibles</Link>
          </Button>
        </div>
      </section>

      {/* ── Visual Tutorial (3 Pasos) ── */}
      <section className="bg-gray-50 py-20 px-4 md:px-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">¿Cómo funciona CharaTools + Cashea?</h2>
            <p className="text-gray-500 font-medium">Sencillo, rápido y sin papeleo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: ShoppingCart,
                title: '1. Cotiza',
                desc: 'Envíanos tu lista de materiales o herramientas por WhatsApp y solicita tu presupuesto Cashea.'
              },
              {
                icon: CreditCard,
                title: '2. Paga el 40%',
                desc: 'Realiza el pago inicial (la cuota del día) directamente en nuestra tienda o vía digital.'
              },
              {
                icon: Calendar,
                title: '3. Retira Hoy',
                desc: 'Llévate tus productos de inmediato. El resto lo pagas en 3 cuotas iguales cada 14 días.'
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-[2rem] bg-white border-4 border-[#FDFA3D]/10 flex items-center justify-center mb-8 shadow-xl shadow-[#FDFA3D]/10">
                  <step.icon className="w-8 h-8 text-[#FDFA3D]" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Simulator (The "Aha" Moment) ── */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-[#111] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          {/* Decorative background image or glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FDFA3D]/20 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Ejemplo de una compra inteligente</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Imagina que necesitas una **Bomba de Agua INGCO** y un **Press Control** para tu casa. El total es de **$100**.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-green-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Sin intereses</span>
                </div>
                <div className="flex items-center gap-3 text-green-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Sin cuota de manejo</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <span className="text-gray-400 font-bold">Total Compra</span>
                <span className="text-2xl font-black">$100.00</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-[#FDFA3D] uppercase tracking-wider">Hoy pagas</span>
                    <span className="text-xs text-gray-500 font-bold">Cuota Inicial (40%)</span>
                  </div>
                  <span className="text-2xl font-black text-white">$40.00</span>
                </div>

                <div className="h-px bg-white/5 w-full" />

                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-300 uppercase tracking-wider">Luego pagas</span>
                    <span className="text-xs text-gray-500 font-bold">3 cuotas cada 14 días</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-gray-300">$20.00</span>
                    <span className="text-[10px] text-gray-500 uppercase font-black">Cada una</span>
                  </div>
                </div>
              </div>

              <Button 
                asChild
                className="w-full h-14 bg-white hover:bg-gray-100 text-[#111] rounded-xl font-black text-base transition-all"
              >
                <a href="https://wa.me/584220148405?text=Hola!+Quiero+cotizar+mi+lista+con+el+plan+Cashea" target="_blank">
                  Pedir este plan por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="pb-24 text-center px-4">
        <div className="w-16 h-1 bg-gray-200 mx-auto mb-8 rounded-full" />
        <h2 className="text-2xl font-black text-gray-900 mb-4">¿Tienes dudas adicionales?</h2>
        <p className="text-gray-500 mb-8">Nuestros asesores están listos para guiarte en tu proceso de compra con Cashea.</p>
        <a 
          href="https://wa.me/584220148405" 
          className="inline-flex items-center gap-2 text-[#FDFA3D] font-black text-lg hover:underline"
        >
          <MessageSquare className="w-5 h-5" />
          Hablar con un asesor técnico
        </a>
      </section>
    </div>
  )
}
