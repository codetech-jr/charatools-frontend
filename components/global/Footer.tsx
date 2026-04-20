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
import { MapPin, Clock, ArrowUpRight } from 'lucide-react'

const WA_URL =
  'https://api.whatsapp.com/send?phone=584241234567&text=' +
  encodeURIComponent('Hola CharaTools, quiero información sobre un producto.')

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

const BRANDS = ['INGCO', '3M', 'Stanley', 'Truper', 'Dewalt', 'Schneider']

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400" role="contentinfo">
      {/* ── Franja superior amarilla ── */}
      <div className="h-1 bg-yellow-400" aria-hidden="true" />

      {/* ── Cuerpo principal ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Columna 1: Marca + tagline ── */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group" aria-label="CharaTools — Inicio">
              <span className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors">
                Chara<span className="text-yellow-400 group-hover:text-white transition-colors">Tools</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Ferretería B2B en Charallave. Distribuidor oficial INGCO.
              Repuestos originales, respuesta real, sin demoras.
            </p>

            {/* Info de contacto directo */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs leading-snug">
                  Charallave, Municipio Cristóbal Rojas<br />
                  Estado Miranda, Venezuela
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs">Lun – Sáb: 7:00 am – 6:00 pm</span>
              </div>
            </div>
          </div>

          {/* ── Columna 2: Catálogo ── */}
          <nav aria-label="Categorías del catálogo">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Catálogo
            </h3>
            <ul className="space-y-2.5">
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
          <nav aria-label="Secciones de la empresa">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Empresa
            </h3>
            <ul className="space-y-2.5">
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
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">
                Marcas Oficiales
              </h3>
              <div className="flex flex-wrap gap-2">
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
