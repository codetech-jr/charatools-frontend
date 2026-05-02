import type { Metadata } from 'next'
import { Banknote, CreditCard, Building2, BadgeCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Pagos | CharaTools B2B',
  description: 'Métodos de pago aceptados, facturación y financiamiento en CharaTools.',
}

export default function PagosPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 pb-24">
      {/* ── Hero / Header ── */}
      <section className="bg-gray-900 text-white pt-20 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-black mb-6">
            <Banknote className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 uppercase leading-tight">
            Política de <span className="text-yellow-400">Pagos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Multiples vías, misma agilidad. Conoce nuestros canales de pago y condiciones de facturación fiscal.
          </p>
        </div>
      </section>

      {/* ── Contenido Legal ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-12">
          
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-yellow-500" />
              1. Pagos Corporativos
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Para el sector B2B, constructoras e industriales, aceptamos transferencias interbancarias nacionales (Bolívares a tasa oficial BCV del día) a nuestras cuentas jurídicas.
              </p>
              <p>
                Los despachos asociados a transferencias de otros bancos se liberan única y exclusivamente <strong>una vez el dinero esté acreditado y disponible</strong> en nuestras cuentas. Para agilizar, recomendamos utilizar bancos de nuestra misma plataforma financiera o Pago Móvil Comercial.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-yellow-500" />
              2. Métodos Tradicionales (Tienda Física)
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <ul className="list-disc pl-5 space-y-2">
                <li>Punto de Venta Nacional (Tarjetas de Débito y Crédito).</li>
                <li>Punto de Venta Internacional.</li>
                <li>Efectivo en divisas (se requiere billetes en perfecto estado).</li>
                <li>Zelle y Custodia (aplican condiciones según montos diarios).</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <Banknote className="w-6 h-6 text-yellow-500" />
              3. Facturación Fiscal
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Toda compra realizada en CharaTools incluye su respectiva factura fiscal legal, ya sea impresa o electrónica. Al enviar tu comprobante de pago, recuerda facilitar tu <strong>RIF jurídico o personal vigente</strong> y la razón social correcta para evitar reprocesos.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
