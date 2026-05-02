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
import { ShieldCheck, Headset, Clock, ArrowRight, Wrench, Zap, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quiénes Somos | CharaTools — Tu Aliado en la Obra',
  description:
    'CharaTools nació en Charallave porque en la obra no hay tiempo que perder. Distribuidor multimarca de herramientas y equipos como INGCO, 3M, Stanley y Truper. Repuestos originales, respuesta en minutos.',
  openGraph: {
    title: 'CharaTools — Tu Aliado en la Obra, no otro proveedor',
    description:
      'Fundada por ferreteristas con experiencia de campo. Repuestos originales, sin intermediarios y respuesta en menos de 15 minutos por WhatsApp.',
  },
}

// ── Bloques Bento ──────────────────────────────────────────────────────────

const TRUST_BLOCKS = [
  {
    icon: Headset,
    title: 'Asesoría de Expertos',
    body: 'No somos un bot. Cuando escribes, responde un asesor que conoce la diferencia entre un cable #12 y un #10, y sabe cuándo importa.',
    accent: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía Multimarca',
    body: 'INGCO, 3M, Stanley, Lumistar, Run, Bellota. Todos originales, todos con garantía del fabricante. Sin copias, sin sorpresas.',
    accent: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: Clock,
    title: 'Respuesta en < 15 Min',
    body: 'Escríbenos y en menos de 15 minutos sabes si el repuesto está disponible y cuándo llega. Porque la obra no espera.',
    accent: 'text-gray-700',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
] as const

// ── Marcas con iconos de categoría ─────────────────────────────────────────

const BRANDS = [
  { name: 'INGCO', icon: Wrench, desc: 'Herramientas eléctricas y manuales' },
  { name: '3M', icon: Zap, desc: 'Eléctrico, selladores, seguridad' },
  { name: 'Stanley', icon: Wrench, desc: 'Herramientas de precisión' },
  { name: 'Truper', icon: Droplets, desc: 'Plomería y construcción' },
  { name: 'Schneider', icon: Zap, desc: 'Automatización y eléctrico' },
  { name: 'Bellota', icon: Wrench, desc: 'Herramientas de construcción' },
  { name: 'Bticino', icon: Zap, desc: 'Material eléctrico residencial' },
  { name: 'Tubrica', icon: Droplets, desc: 'Sistemas de tuberías' },
  { name: 'Manpica', icon: Droplets, desc: 'Pinturas y revestimientos' },
  { name: 'Cebra', icon: Wrench, desc: 'Brochas y complementos' },
  { name: 'Venceramica', icon: Droplets, desc: 'Piezas sanitarias' },
]

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
          <div className="flex flex-col justify-center px-6 py-16 lg:px-16 lg:py-20 space-y-6 order-2 lg:order-1">
            {/* Etiqueta de categoría */}
            <span className="inline-block text-yellow-400 text-xs font-black uppercase tracking-widest">
              Tu Aliado en la Obra
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Nada de demoras.<br />
              Nada de repuestos<br />
              <span className="text-yellow-400">que llegan en 3 días.</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
              CharaTools nació en Charallave porque los ferreteristas de aquí sabemos lo que cuesta
              parar una obra por un repuesto que no llega. Por eso tenemos stock real, marcas
              originales y un asesor técnico que responde antes de que termines de escribir.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Distribuidor multimarca de herramientas y equipos de las mejores marcas como <strong className="text-white">INGCO</strong>, con respaldo de{' '}
              <strong className="text-white">3M, Stanley, Truper, Dewalt y Schneider</strong>, entre otras. Aquí no vendemos imitaciones.
              Sin intermediarios. Sin excusas.
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
            Un taladro dañado un martes en la mañana puede costarte el jornal de 4 obreros.
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
                  'Solo marcas originales con garantía del fabricante.',
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {TRUST_BLOCKS.map((block) => {
              const Icon = block.icon
              return (
                <div
                  key={block.title}
                  className={`${block.bg} ${block.border} border rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${block.bg} border ${block.border}`}>
                    <Icon className={`w-5 h-5 ${block.accent}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-black text-gray-900">{block.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{block.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════════
          MARCAS OFICIALES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-900 px-4 py-12 md:py-16" aria-label="Marcas que distribuimos">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-xl md:text-2xl font-black text-white">
            Marcas que distribuimos oficialmente
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {BRANDS.map(({ name, icon: BrandIcon, desc }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 bg-gray-800 rounded-xl px-3 py-4 border border-gray-700 hover:border-yellow-400 transition-colors group"
              >
                <BrandIcon className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" aria-hidden="true" />
                <span className="text-white font-bold text-sm">{name}</span>
                <span className="text-gray-500 text-xs text-center leading-tight hidden md:block">{desc}</span>
              </div>
            ))}
          </div>
        </div>
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
            <span className="text-sm font-bold text-yellow-600">¿Buscas descuentos exclusivos? Revisa nuestra Membresía VIP en la página principal.</span>
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=584220148405&text=Hola%20CharaTools,%20busco%20disponibilidad%20de%20una%20pieza"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 px-8 bg-black text-white font-bold text-base rounded-xl hover:bg-gray-900 active:scale-95 transition-all shadow-lg shadow-gray-200"
          >
            Buscar mi pieza ahora
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </section>

    </main>
  )
}
