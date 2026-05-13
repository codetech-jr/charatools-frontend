'use client'

import React from 'react'
import { Wrench, Lightbulb, Droplets, Hammer, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const WHATSAPP_NUMBER = "584220148405"

export function SpecificSolutions() {
  const handleWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Soluciones Especializadas <br className="hidden md:block" />
            <span className="text-yellow-500">para cada proyecto</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Inventario físico garantizado y asesoría técnica para que te lleves exactamente lo que necesitas hoy mismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Plomería */}
          <div className="group relative rounded-3xl overflow-hidden bg-blue-50 border border-blue-100 p-8 md:p-10 transition-all hover:shadow-xl hover:shadow-blue-900/5">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wrench className="w-32 h-32 text-blue-600" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-800 mb-4">
                Plomería y Tuberías
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                ¡Resuelve hoy!
              </h3>
              <p className="text-gray-600 mb-8 flex-grow max-w-sm">
                Asesoría experta gratuita para evitar compras erróneas. Mándanos una foto de la pieza o el daño.
              </p>
              <Button 
                onClick={() => handleWhatsApp('Hola CharaTools! Tengo un daño de plomería y necesito asesoría. Aquí envío la foto:')}
                className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-6 px-6 shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar Foto del Daño al WhatsApp
              </Button>
            </div>
          </div>

          {/* Iluminación LED */}
          <div className="group relative rounded-3xl overflow-hidden bg-amber-50 border border-amber-100 p-8 md:p-10 transition-all hover:shadow-xl hover:shadow-amber-900/5">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Lightbulb className="w-32 h-32 text-amber-500" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <span className="inline-flex w-fit items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 mb-4">
                Iluminación LED
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                Ilumina como un Pro
              </h3>
              <p className="text-gray-600 mb-8 flex-grow max-w-sm">
                Paneles, bombillos y reflectores de alto rendimiento. Te ayudamos a calcular lo que necesitas.
              </p>
              <Button 
                variant="outline"
                onClick={() => handleWhatsApp('Hola! Quiero aprovechar el diseño de iluminación gratuito para mi espacio.')}
                className="w-fit border-2 border-amber-400 text-amber-700 bg-white hover:bg-amber-50 font-bold rounded-xl py-6 px-6 transition-all active:scale-95 flex items-center gap-2"
              >
                <Lightbulb className="w-5 h-5 fill-amber-400" />
                Diseño de iluminación gratuito por WhatsApp
              </Button>
            </div>
          </div>

          {/* Impermeabilización */}
          <div className="group relative rounded-3xl overflow-hidden bg-teal-50 border border-teal-100 p-8 md:p-10 transition-all hover:shadow-xl hover:shadow-teal-900/5">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Droplets className="w-32 h-32 text-teal-600" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <span className="inline-flex w-fit items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800 mb-4">
                Impermeabilización
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                No esperes los "palos de agua"
              </h3>
              <p className="text-gray-600 mb-8 flex-grow max-w-sm">
                Mantos y selladores diseñados para el clima de los Valles del Tuy. Protege tu techo hoy.
              </p>
              <Button 
                onClick={() => handleWhatsApp('Hola CharaTools! Quiero cotizar material para impermeabilizar mi techo. Estas son las medidas:')}
                className="w-fit bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl py-6 px-6 shadow-lg shadow-teal-600/20 transition-all active:scale-95 flex items-center gap-2"
              >
                Cotizar Material para Techo
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Herramientas Eléctricas */}
          <div className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 p-8 md:p-10 transition-all hover:shadow-xl hover:shadow-neutral-900/20">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Hammer className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <span className="inline-flex w-fit items-center rounded-full bg-neutral-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-4 border border-neutral-700">
                Herramientas Profesionales
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                Pa' meterle el pecho al trabajo
              </h3>
              <p className="text-neutral-400 mb-8 flex-grow max-w-sm">
                Stock físico disponible para retiro inmediato. Olvídate de esperar importaciones, equipa tu proyecto ya.
              </p>
              <Button 
                onClick={() => handleWhatsApp('Hola! Necesito cotizar herramientas profesionales para mi proyecto.')}
                className="w-fit bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-xl py-6 px-6 shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all active:scale-95 flex items-center gap-2"
              >
                Ver Disponibilidad Inmediata
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
