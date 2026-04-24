/**
 * @file app/contacto/page.tsx
 * @description Soluciones Directas — Página de contacto sin fricción.
 *
 * Skill: copywriting.md — Action verbs, specific CTAs, NO "escríbenos un correo".
 * Skill: marketing-psychology.md — Activation energy (reduce starting friction),
 *   BJ Fogg Model (Motivation × Ability × Prompt), Present bias (acción inmediata).
 * UI: Split layout — Info + CTA (izquierda) / Mapa nativo (derecha).
 * SIN formulario de contacto tradicional.
 */

import type { Metadata } from 'next'
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto | CharaTools — Un asesor real busca la pieza por ti',
  description:
    'Escribe por WhatsApp y un asesor técnico de CharaTools confirma disponibilidad en menos de 15 minutos. Ubicados en Charallave, Miranda.',
  openGraph: {
    title: 'Contacta a CharaTools — Respuesta garantizada en <15 min',
    description:
      'No es un bot. Es una persona real que conoce el catálogo y busca la pieza por ti. Escribe ahora.',
  },
}

// ── Datos de contacto ───────────────────────────────────────────────────────

const WA_NUMBER = '584220148405'
const WA_URL = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(
  'Hola CharaTools, necesito ayuda con un producto.'
)}`

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Charallave, Municipio Cristóbal Rojas, Estado Miranda',
    sublabel: 'Retiro en tienda disponible',
  },
  {
    icon: Clock,
    label: 'Horario de atención',
    value: 'Lunes a Sábado: 9:00 am – 6:00 pm',
    sublabel: 'WhatsApp disponible fuera del horario',
  },
  {
    icon: Phone,
    label: 'WhatsApp directo',
    value: '+58 422-0148405',
    sublabel: 'Respuesta en menos de 15 minutos',
    href: WA_URL,
  },
]

// ── Mapa de Charallave (iframe nativo Google Maps) ──────────────────────────
// Coordenadas: Charallave, Miranda, Venezuela
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000.0!2d-66.8588125!3d10.2403125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2aef64d99420cf%3A0x4d50768d057e7c0c!2sCHARATOOLS%201010%2C%20C.A!5e0!3m2!1ses-419!2sve!4v1776950611483!5m2!1ses-419!2sve'

// ── Página ─────────────────────────────────────────────────────────────────

export default function ContactoPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div className="bg-gray-900 px-4 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">
            Sin formularios. Sin esperas.
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-2xl text-balance">
            Escribe ahora y un asesor técnico{" "}
            <br className="hidden md:block" />
            de CharaTools busca la pieza por ti.
          </h1>
        </div>
      </div>

      {/* ── Split Layout: Info / Mapa ── */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* ── Columna Izquierda: Información + CTA ── */}
          <div className="px-4 md:px-8 lg:px-12 py-12 lg:py-16 space-y-8 bg-white">

            {/* Datos de contacto */}
            <ul className="space-y-6" role="list">
              {CONTACT_INFO.map(({ icon: Icon, label, value, sublabel, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-gray-700" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-gray-900 hover:text-orange-500 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-base font-bold text-gray-900">{value}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">{sublabel}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Divisor */}
            <div className="border-t border-gray-100" />

            {/* Copy de acción + CTA naranja */}
            <div className="space-y-4">
              <h2 className="text-lg font-black text-gray-900">
                ¿Necesitas una pieza específica?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                No hace falta que sepas el nombre técnico exacto. Descríbela, dinos para qué equipo
                es, y un asesor real la busca en nuestro inventario y en el de nuestros proveedores.
              </p>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full h-16 bg-orange-500 text-white font-black text-base rounded-2xl hover:bg-orange-600 active:scale-[0.98] transition-all shadow-xl shadow-orange-200"
                aria-label="Abrir WhatsApp para contactar a CharaTools"
              >
                {/* Icono WhatsApp SVG inline para no depender de librería */}
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Escribe ahora por WhatsApp
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>

              <p className="text-xs text-gray-400 text-center">
                Un asesor real responde. Tiempo de respuesta promedio: 8 minutos.
              </p>
            </div>

            {/* Medios de pago aceptados */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
              <p className="text-xs font-black text-gray-500 uppercase tracking-wide">Métodos de pago</p>
              <div className="flex flex-wrap gap-2">
                {['Pago Móvil', 'Transferencia Bs.', 'Efectivo USD', 'Zelle (pedidos grandes)'].map((method) => (
                  <span
                    key={method}
                    className="inline-block bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Columna Derecha: Mapa ── */}
          <div className="relative h-72 lg:h-auto bg-gray-200">
            <iframe
              src={MAP_EMBED_URL}
              title="Ubicación de CharaTools en Charallave, Miranda"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[300px] grayscale"
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
              allowFullScreen
            />
            {/* Overlay de marca sobre el mapa */}
            <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-gray-700 max-w-[220px]">
              <p className="text-xs font-black text-yellow-400">CharaTools</p>
              <p className="text-xs text-gray-300 leading-snug">
                Charallave, Municipio Cristóbal Rojas<br />Estado Miranda, Venezuela <br />
                Calle 9, AV José Gregorio Hernández, Charallave - Centro.
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
