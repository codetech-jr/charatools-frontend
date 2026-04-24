'use client'

/**
 * @file components/global/Footer.tsx
 * @description Footer institucional B2B de CharaTools.
 *
 * Secciones:
 * - Logo + tagline
 * - Links de navegación institucional (Catálogo, Quiénes Somos, FAQ, Contacto)
 * - Marcas distribuidas
 * - Datos de contacto + CTA WhatsApp
 * - Copyright
 */

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, ArrowUpRight, Facebook, Instagram } from 'lucide-react'

const WA_URL =
  'https://api.whatsapp.com/send?phone=584220148405&text=' +
  encodeURIComponent('Hola CharaTools, quiero información sobre un producto.')

// Custom icons for brands not in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://www.facebook.com/charatools/', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/charatools/', label: 'Instagram' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@charatools', label: 'TikTok' },
  { icon: WhatsAppIcon, href: WA_URL, label: 'WhatsApp' },
]

const NAV_LINKS = {
  catalogo: [
    { label: 'Herramientas en General', href: '/catalogo?cat=herramientas-general' },
    { label: 'Plomería', href: '/catalogo?cat=plomeria' },
    { label: 'Iluminación', href: '/catalogo?cat=iluminacion' },
    { label: 'Electricidad', href: '/catalogo?cat=electricidad' },
    { label: 'Impermeabilización', href: '/catalogo?cat=impermeabilizacion' },
  ],
  empresa: [
    { label: 'Quiénes Somos', href: '/quienes-somos' },
    { label: 'Preguntas Frecuentes', href: '/faq' },
    { label: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { label: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
    { label: 'Privacidad', href: '/politica-de-privacidad' },
    { label: 'Envíos', href: '/politica-de-envios' },
    { label: 'Pagos', href: '/politica-de-pagos' },
    { label: 'Devoluciones', href: '/politica-de-devoluciones' },
    { label: 'Garantía', href: '/politica-de-garantia' },
    { label: 'Cookies', href: '/politica-de-cookies' },
  ],
}

const BRANDS = ['INGCO', '3M', 'Stanley', 'Truper', 'Bellota', 'Lumistar']

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400" role="contentinfo">
      {/* ── Franja superior amarilla ── */}
      <div className="h-1 bg-yellow-400" aria-hidden="true" />

      {/* ── Cuerpo principal ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Columna 1: Marca + tagline ── */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="inline-flex items-center justify-center md:justify-start group" aria-label="CharaTools — Inicio">
              <Image
                src="/logo_chara_tools_con_borde_fdo_negro_png.png"
                alt="CharaTools Logo"
                width={300}
                height={100}
                className="w-auto h-20 md:h-28 group-hover:brightness-110 transition-all"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Ferretería Multimarca en Charallave.
              Herramientas, repuestos y soluciones para tus proyectos, con respuesta real, sin demoras.
            </p>

            {/* Info de contacto directo */}
            <div className="space-y-3 pt-2 flex flex-col items-center md:items-start">
              <div className="flex items-center md:items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs leading-snug">
                  Charallave, Municipio Cristóbal Rojas<br />
                  Estado Miranda, Venezuela
                </span>
              </div>
              <div className="flex items-center md:items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs">Lun – Sáb: 9:00 am – 6:00 pm</span>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 hover:-translate-y-1 transform transition-all duration-300"
                  aria-label={`Visitar ${label} de CharaTools`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Columna 2: Catálogo ── */}
          <nav aria-label="Categorías del catálogo" className="text-center md:text-left">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Catálogo
            </h3>
            <ul className="flex flex-col items-center md:items-start space-y-2.5">
              {NAV_LINKS.catalogo.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-yellow-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Columna 3: Empresa ── */}
          <nav aria-label="Secciones de la empresa" className="text-center md:text-left">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Empresa
            </h3>
            <ul className="flex flex-col items-center md:items-start space-y-2.5">
              {NAV_LINKS.empresa.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-yellow-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Columna 4: Marcas + CTA ── */}
          <div className="space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
                Marcas Oficiales
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {BRANDS.map((brand) => (
                  <span
                    key={brand}
                    className="inline-block bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-md"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3">
                Cotiza ahora
              </h3>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-600 active:scale-95 transition-all"
                aria-label="Abrir WhatsApp para cotizar"
              >
                WhatsApp directo
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="text-xs mt-2 text-gray-600">Respuesta promedio: 8 min</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barra de copyright y legal ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} CharaTools. Todos los derechos reservados.</span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="text-gray-600">Charallave, Miranda · Venezuela</span>
          </div>
          
          <ul className="flex flex-wrap justify-center lg:justify-end gap-x-4 gap-y-2">
            {NAV_LINKS.legal.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-yellow-400 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
