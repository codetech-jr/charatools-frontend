import type { Metadata } from 'next'
import { Shield, Lock, EyeOff, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidad | CharaTools B2B',
  description: 'Cómo protegemos y utilizamos tus datos comerciales. Total transparencia en el manejo de tu información.',
}

export default function PrivacidadPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 pb-24">
      {/* ── Hero / Header ── */}
      <section className="bg-gray-900 text-white pt-20 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-black mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 uppercase leading-tight">
            Política de <span className="text-yellow-400">Privacidad</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Tu data es tuya. Usamos la información estrictamente para despachar tu obra más rápido, nunca para hacer spam o venderla a terceros.
          </p>
        </div>
      </section>

      {/* ── Contenido Legal ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-12">
          
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-yellow-500" />
              1. ¿Qué datos recopilamos?
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Al utilizar nuestro sistema de cotización o contactarnos por WhatsApp, solicitamos únicamente la información necesaria para procesar tu pedido comercial: <strong>Nombre, RIF/Cédula, número de teléfono y sector o zona de entrega</strong>.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-yellow-500" />
              2. ¿Para qué los usamos?
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <ul className="list-disc pl-5 space-y-2">
                <li>Emitir facturación fiscal de manera rápida y sin errores.</li>
                <li>Agilizar tus futuras compras y cotizaciones.</li>
                <li>Coordinar despachos de manera precisa a tu ubicación.</li>
                <li>Garantizar un soporte técnico personalizado en caso de garantías.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <EyeOff className="w-6 h-6 text-yellow-500" />
              3. Privacidad Absoluta
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                <strong>No vendemos, alquilamos, ni compartimos tu información</strong> con agencias de marketing ni terceros. El historial de compras de tu empresa se mantiene en estricta confidencialidad dentro de nuestros sistemas internos.
              </p>
              <p>
                Los datos procesados por plataformas de pago de terceros se rigen estrictamente por sus propias políticas de privacidad.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
