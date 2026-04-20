import type { Metadata } from 'next'
import { RotateCcw, AlertTriangle, PackageOpen, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Devoluciones | CharaTools B2B',
  description: 'Condiciones para cambios y devoluciones de mercancía en CharaTools.',
}

export default function DevolucionesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 pb-24">
      {/* ── Hero / Header ── */}
      <section className="bg-gray-900 text-white pt-20 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-black mb-6">
            <RotateCcw className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 uppercase leading-tight">
            Política de <span className="text-yellow-400">Devoluciones</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            ¿Te equivocaste de pieza? No hay problema. Aceptamos devoluciones bajo reglas claras y justas.
          </p>
        </div>
      </section>

      {/* ── Contenido Legal ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-12">
          
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-yellow-500" />
              1. Plazo para Cambios
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Tienes un plazo de <strong>7 días continuos</strong> a partir de la fecha de facturación para solicitar un cambio de producto. El artículo debe ser devuelto en perfectas condiciones, sin uso, en su empaque original y con todos los manuales/accesorios correspondientes.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <PackageOpen className="w-6 h-6 text-yellow-500" />
              2. Requisitos Obligatorios
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <ul className="list-disc pl-5 space-y-2">
                <li>Presentar la Factura Fiscal original o Nota de Entrega.</li>
                <li>El producto no debe presentar señales de uso, suciedad o modificación.</li>
                <li>Los empaques blíster sellados no deben haber sido abiertos o cortados.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              3. Productos sin devolución
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>Por medidas de seguridad y calidad, <strong>NO aceptamos devoluciones</strong> en los siguientes rubros:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Material eléctrico o electrónico que ya haya sido instalado (cables cortados, breakers con marcas de borne, etc).</li>
                <li>Productos químicos, solventes o pegamentos abiertos.</li>
                <li>Partes internas de maquinaria o repuestos especializados adquiridos bajo pedido especial.</li>
              </ul>
              <p>Cualquier falla en estos equipos después de su uso entra bajo nuestra <a href="/politica-de-garantia" className="text-yellow-600 font-bold hover:underline">Garantía de Hierro</a>.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <RotateCcw className="w-6 h-6 text-yellow-500" />
              4. Reembolsos
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Como política B2B, no realizamos reintegros de dinero en efectivo o transferencias. En caso de aplicar la devolución, emitimos una <strong>Nota de Crédito</strong> a favor de tu empresa, válida para cualquier compra futura dentro de los siguientes 30 días.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
