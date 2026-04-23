'use client'

import React from 'react'

const WHATSAPP_NUMBER = '584220148405'
const WHATSAPP_PHOTO_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola CharaTools! 📸 Tengo una foto de una pieza que necesito identificar. ¿Me ayudan?'
)}`

const STEPS = [
  {
    number: '01',
    icon: '📸',
    title: 'Toma la foto',
    desc: 'Fotografía la pieza rota, el accesorio dañado o el repuesto que necesitas.',
  },
  {
    number: '02',
    icon: '💬',
    title: 'Envíala por WhatsApp',
    desc: 'Manda la foto directamente a nuestro equipo. Sin formularios, sin registro.',
  },
  {
    number: '03',
    icon: '✅',
    title: 'Recibe confirmación',
    desc: 'El nombre exacto, disponibilidad y precio. En menos de 10 minutos.',
  },
]

/* ——— Mini WhatsApp chat mockup ——— */
function ChatBubble({ side, text }: { side: 'user' | 'agent'; text: string }) {
  return (
    <div
      className={`flex ${side === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed
          ${side === 'user'
            ? 'bg-[#dcf8c6] text-gray-900 rounded-tr-sm'
            : 'bg-white text-gray-900 rounded-tl-sm shadow-sm'
          }`}
      >
        {text}
      </div>
    </div>
  )
}

function WhatsAppMockup() {
  return (
    <div className="relative mx-auto w-72 md:w-80">
      {/* Phone shell */}
      <div className="bg-[#111b21] rounded-2xl overflow-hidden shadow-2xl border border-white/5">

        {/* Chat header */}
        <div className="bg-[#202c33] flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-xs flex-shrink-0">
            CT
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">CharaTools</p>
            <p className="text-green-400 text-xs">● En línea ahora</p>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-[#0b141a] px-3 py-4 space-y-0.5">
          <ChatBubble side="user"  text="Hola, necesito identificar esta pieza 👇" />

          {/* Image bubble */}
          <div className="flex justify-end mb-2">
            <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-sm overflow-hidden w-32 h-20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl">🪛</span>
                <p className="text-[10px] text-gray-600 mt-1">foto del repuesto</p>
              </div>
            </div>
          </div>

          <ChatBubble
            side="agent"
            text="¡Hola! Es un *codo PVC ½″ rosca interior*. Lo tenemos disponible. ¿Cuántos necesitas?"
          />
          <ChatBubble side="user"  text="Necesito 4 unidades" />
          <ChatBubble
            side="agent"
            text="Perfecto 🙌 Precio $1.80 c/u · Total $7.20 · ¿Reservamos para retiro hoy?"
          />
        </div>

        {/* Input bar */}
        <div className="bg-[#202c33] flex items-center gap-2 px-3 py-2">
          <div className="flex-grow bg-[#2a3942] rounded-full px-4 py-2 text-xs text-gray-400">
            Escribe aquí…
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-900/40 flex items-center gap-1.5">
        <svg viewBox="0 0 8 8" className="w-2 h-2 fill-white animate-pulse">
          <circle cx="4" cy="4" r="4"/>
        </svg>
        Respuesta en &lt;10 min
      </div>
    </div>
  )
}

/* ——— Main section ——— */
export function WhatsAppAdvisorSection() {
  return (
    <section
      id="asesoria"
      aria-labelledby="asesoria-heading"
      className="w-full py-16 md:py-24 bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
              Asesoría por WhatsApp
            </p>

            <h2
              id="asesoria-heading"
              className="text-3xl md:text-4xl font-black leading-tight mb-5"
            >
              ¿No sabes cómo se llama{' '}
              <span className="text-green-400">la pieza?</span>
              <br />
              Manda la foto. Nosotros la buscamos.
            </h2>

            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-lg">
              Nuestro equipo responde en minutos con el nombre exacto, disponibilidad
              y precio. Sin formularios. Sin esperas. Solo WhatsApp.
            </p>

            {/* Steps */}
            <ol className="space-y-5 mb-10" aria-label="Cómo funciona la asesoría">
              {STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-green-500 text-white text-xs font-black
                                flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-900/50"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {step.icon} {step.title}
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* CTA */}
            <a
              href={WHATSAPP_PHOTO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar foto de pieza por WhatsApp para asesoría"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400
                         active:scale-95 text-white font-black px-8 py-4 rounded-2xl text-base
                         transition-all duration-200 shadow-xl shadow-green-900/40"
            >
              {/* WhatsApp SVG icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.571a.75.75 0 0 0 .924.924l5.726-1.475A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.967 0-3.81-.54-5.383-1.476l-.384-.228-3.986 1.026 1.054-3.868-.248-.4A10.462 10.462 0 0 1 1.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
              </svg>
              Enviar foto ahora
            </a>

            <p className="text-xs text-gray-500 mt-4">
              Lun–Sáb 9am–6pm
              <span className="mx-2 text-gray-700">·</span>
              Respuesta garantizada en horario de atención
            </p>
          </div>

          {/* ── Right: Chat mockup ── */}
          <div className="flex justify-center md:justify-end">
            <WhatsAppMockup />
          </div>

        </div>
      </div>
    </section>
  )
}
