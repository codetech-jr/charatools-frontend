import type { Metadata } from 'next'
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | CharaTools B2B',
  description: 'Reglas de juego claras. Conoce los términos y condiciones de compra en CharaTools.',
}

export default function TerminosPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 pb-24">
      {/* ── Hero / Header ── */}
      <section className="bg-gray-900 text-white pt-20 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-black mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 uppercase leading-tight">
            Términos y <span className="text-yellow-400">Condiciones</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Sin letras pequeñas. Aquí te explicamos cómo trabajamos para asegurar un proceso de compra rápido, transparente y profesional.
          </p>
        </div>
      </section>

      {/* ── Contenido Legal con Tono Directo ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-12">
          
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-yellow-500" />
              1. Condiciones de Compra
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Al realizar una cotización o pedido en CharaTools, aceptas nuestras condiciones operativas. Los precios mostrados en el catálogo web son <strong>referenciales</strong> y están sujetos a confirmación final a través de nuestros canales oficiales (WhatsApp o Tienda Física). 
              </p>
              <p>
                Garantizamos el bloqueo de inventario únicamente cuando el pago ha sido reportado y verificado por nuestro departamento de administración.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-yellow-500" />
              2. Validez de Cotizaciones
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Entendemos que el mercado es dinámico. Toda cotización enviada por nuestro equipo tiene una validez de <strong>24 horas hábiles</strong>. Pasado este tiempo, el inventario se libera y los precios pueden sufrir ajustes sin previo aviso.
              </p>
              <p>
                Si tienes un proyecto grande, comunícate con tu asesor asignado para estructurar acuerdos de precios sostenidos por volumen.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-yellow-500" />
              3. Entregas y Retiros
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                El material se despacha exclusivamente después de la verificación del pago. Para retiros en tienda, el cliente debe presentar la <strong>Nota de Entrega o Factura Fiscal</strong> asignada.
              </p>
              <p>
                No nos hacemos responsables por mercancía dejada en nuestros almacenes por más de 15 días continuos tras su facturación.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-yellow-500" />
              4. Uso del Catálogo Web
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Nuestra plataforma es una herramienta de consulta B2B. Todo el contenido gráfico, descripciones técnicas y estructura pertenecen a CharaTools. Nos reservamos el derecho de modificar el catálogo, suspender productos o ajustar fichas técnicas según las actualizaciones de los fabricantes.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
