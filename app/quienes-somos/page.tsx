/**
 * @file app/quienes-somos/page.tsx
 * @description "Tu Aliado en la Obra" — Página institucional de CharaTools.
 *
 * Copy: Directo al dolor del cliente (demora, repuesto falso, pérdida de tiempo).
 * Skill: copywriting.md — Benefits over features, active voice, specific over vague.
 * Skill: marketing-psychology.md — Authority bias, social proof, contrast effect (antes/después).
 * UI: Hero asimétrico + Bento 3 bloques (Asesoría / Garantía / Respuesta <15min).
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Headset, Clock, ArrowRight } from 'lucide-react'
import { BrandTicker } from '@/components/sections/BrandTicker'

export const metadata: Metadata = {
  title: 'Quiénes Somos | CharaTools — Tu Aliado en la Obra',
  description:
    'CharaTools nació en Charallave porque en la obra no hay tiempo que perder. Tu aliado ferretero de confianza en herramientas y equipos como INGCO, 3M y Stanley. Obtén una respuesta en minutos.',
  openGraph: {
    title: 'CharaTools — Tu Aliado en la Obra, no otro proveedor',
    description:
      'Fundada por ferreteristas con experiencia de campo. Productos ferreteros, sin intermediarios y respuesta en menos de 15 minutos por WhatsApp.',
  },
}

// ── Bloques Bento ──────────────────────────────────────────────────────────

const TRUST_BLOCKS = [
  {
    icon: Headset,
    title: 'Asesoría de Expertos',
    body: 'Cuando escribes, responde un asesor que conoce la diferencia entre un cable #12 y un #10, y sabe cuándo importa.',
    accent: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  {
    icon: Clock,
    title: 'Respuesta en < 15 Min',
    body: 'Escríbenos y en menos de 15 minutos sabes si el producto está disponible y cuándo llega. Porque la obra no espera.',
    accent: 'text-gray-700',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
] as const

// ── Marcas con iconos de categoría (Reemplazado por BrandTicker) ───────────

// ── Página ─────────────────────────────────────────────────────────────────

export default function QuienesSomosPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO ASIMÉTRICO — Texto izquierda / Imagen derecha
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-900 overflow-hidden" aria-label="Quiénes somos - presentación">
        {/* Acento decorativo */}
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" aria-hidden="true" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* ── Columna de Texto ── */}
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left px-6 py-16 lg:px-16 lg:py-20 space-y-6 order-2 lg:order-1">
            {/* Etiqueta de categoría */}
            <span className="inline-block text-yellow-400 text-xs font-black uppercase tracking-widest">
              Tu Aliado en la Obra
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
             Somos tu<br />
              herramienta ideal<br />
              <span className="text-yellow-400">en Charallave</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
              Contamos con stock variado, marcas de excelente calidad y asesores técnicos que responden antes de que termines de escribir.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 h-12 px-6 bg-yellow-400 text-black font-bold text-sm rounded-xl hover:bg-yellow-300 active:scale-95 transition-all"
              >
                Ver Catálogo
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools,%20quiero%20información"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 bg-transparent border-2 border-gray-600 text-gray-300 font-bold text-sm rounded-xl hover:border-gray-400 hover:text-white transition-all"
              >
                Habla con nosotros
              </a>
            </div>
          </div>

          {/* ── Columna de Imagen ── */}
          <div className="relative h-72 lg:h-auto order-1 lg:order-2 bg-gray-800">
            <Image
              src="/fachada.jpg"
              alt="Local de CharaTools en Charallave — fachada y equipo"
              fill
              className="object-cover opacity-70"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay gradiente para fundir con el texto en desktop */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent hidden lg:block"
              aria-hidden="true"
            />
            {/* Badge de fundación */}
            <div className="absolute bottom-4 right-4 bg-yellow-400 text-black px-3 py-1.5 rounded-lg text-xs font-black">
              Charallave, Miranda
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EL PROBLEMA QUE RESOLVEMOS — Contraste antes/después
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 px-4 py-14 md:py-20" aria-label="El problema que resolvemos">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            ¿Cuánto te cuesta parar la obra por una pieza?
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Un taladro dañado un martes en la mañana puede costarte la jornada de 4 obreros.
            Una bomba sin repuesto puede parar una residencia entera.
            Nosotros existimos para que eso no pase.
          </p>

          {/* Comparativa antes/después */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-3">
              <p className="text-xs font-black text-red-500 uppercase tracking-wide">Sin CharaTools</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Llamas a 5 ferreterías y ninguna tiene el repuesto.',
                  'Esperas 3 días por un pedido que puede llegar dañado.',
                  'La copia barata se funde en 2 semanas.',
                  'Tu cliente te llama preguntando por la obra.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-3">
              <p className="text-xs font-black text-green-600 uppercase tracking-wide">Con CharaTools</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Escribe por WhatsApp y en <15 min sabes si hay stock.',
                  'Recoge el mismo día o coordinas la entrega.',
                  'Solo marcas profesionales para tu comodidad y la de tu cliente.',
                  'La obra sigue. El cliente está contento.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BENTO GRID — 3 Pilares de Confianza
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="px-4 py-14 md:py-20" aria-label="Nuestros pilares de servicio">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Por qué los profesionales eligen CharaTools
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {TRUST_BLOCKS.map((block) => {
              const Icon = block.icon
              return (
                <div
                  key={block.title}
                  className={`${block.bg} ${block.border} border-2 rounded-3xl p-8 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-sm w-full flex flex-col items-center text-center`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${block.bg} border-2 ${block.border} shadow-sm`}>
                    <Icon className={`w-7 h-7 ${block.accent}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">{block.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{block.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
 
       {/* ═══════════════════════════════════════════════════════════════════
           NUESTRAS MARCAS — Social Proof
       ═══════════════════════════════════════════════════════════════════ */}
       <section className="bg-gray-50 py-14 md:py-20 border-y border-gray-100" aria-label="Marcas que distribuimos">
         <div className="max-w-7xl mx-auto px-4 mb-4">
           <div className="text-center space-y-3">
             <h2 className="text-2xl md:text-3xl font-black text-gray-900">Marcas de aliados comerciales</h2>
             <p className="text-gray-500 text-base max-w-xl mx-auto">
               Trabajamos directamente con fabricantes líderes para garantizar herramientas profesionales y soporte técnico especializado.
             </p>
           </div>
         </div>
         <BrandTicker variant="transparent" grayscale={false} />
       </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="px-4 py-14 md:py-20 text-center" aria-label="Llamada a la acción">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            La próxima pieza que necesitas<br />ya está en nuestro inventario.
          </h2>
          <p className="text-gray-500 text-base">
            No esperes. Escribe ahora y confirma disponibilidad en minutos.<br />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools,%20busco%20disponibilidad%20de%20una%20pieza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 bg-black text-white font-bold text-base rounded-xl hover:bg-gray-900 active:scale-95 transition-all shadow-lg shadow-gray-200"
            >
              Equipar mi proyecto 
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 h-14 px-8 bg-yellow-400 text-black font-bold text-base rounded-xl hover:bg-yellow-500 active:scale-95 transition-all shadow-lg shadow-yellow-900/10"
            >
              Ver Catálogo
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
