'use client'

import React from 'react'

const WHATSAPP_NUMBER = '584220148405'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola CharaTools! 👋 Quisiera hacer una consulta rápida.'
)}`

export function ContactMapSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 border-t border-gray-200" id="contacto">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            Visítanos
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            Estamos en Charallave
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          
          {/* Left info column */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-gray-900 mb-6">CHARATOOLS 1010, C.A.</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <span className="text-2xl" aria-hidden="true">📍</span>
                <div>
                  <p className="font-bold text-gray-900">Ubicación física</p>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    Charallave - Centro, Estado Miranda, Calle 9, AV José Gregorio Hernández. Ven a nuestro local para ver y probar las 
                    mejores herramientas y materiales para tu proyecto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl" aria-hidden="true">🕒</span>
                <div>
                  <p className="font-bold text-gray-900">Horario de atención</p>
                  <p className="text-gray-600 text-sm mt-1">Lunes a Sábados: 9:00 am – 6:00 pm</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">
                Para consultas rápidas o dirección exacta:
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-3 bg-green-500 hover:bg-green-400 active:scale-95 text-white font-black px-6 py-4 rounded-xl text-lg transition-all duration-200 shadow-md shadow-green-500/20"
              >
                {/* SVG from WhatsApp */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.571a.75.75 0 0 0 .924.924l5.726-1.475A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.967 0-3.81-.54-5.383-1.476l-.384-.228-3.986 1.026 1.054-3.868-.248-.4A10.462 10.462 0 0 1 1.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
                </svg>
                Asesoría Inmediata
              </a>
            </div>
            
          </div>

          {/* Right Map column */}
          <div className="lg:col-span-7 h-64 sm:h-96 lg:h-auto bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.2635868855286!2d-66.8588125!3d10.2403125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2aef64d99420cf%3A0x4d50768d057e7c0c!2sCHARATOOLS%201010%2C%20C.A!5e0!3m2!1ses-419!2sve!4v1776446299832!5m2!1ses-419!2sve" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación física CharaTools en Charallave"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  )
}
