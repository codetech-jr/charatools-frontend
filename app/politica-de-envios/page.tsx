import type { Metadata } from 'next'
import { Truck, MapPin, Clock, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Envíos | CharaTools B2B',
  description: 'Logística y tiempos de entrega. Llevamos el material directo a tu obra.',
}

export default function EnviosPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 pb-24">
      {/* ── Hero / Header ── */}
      <section className="bg-gray-900 text-white pt-20 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-black mb-6">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 uppercase leading-tight">
            Política de <span className="text-yellow-400">Envíos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Sabemos que el material parado retrasa la obra. Nuestra logística está diseñada para entregas precisas y a tiempo.
          </p>
        </div>
      </section>

      {/* ── Contenido Legal ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-12">
          
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-yellow-500" />
              1. Zonas de Cobertura
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Actualmente despachamos de manera directa en los <strong>Valles del Tuy</strong> (Charallave, Cúa, Ocumare, Santa Teresa, Yare). Para zonas aledañas o entregas en la Gran Caracas, el envío requiere una evaluación de volumen y se cotizará con flete privado.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-yellow-500" />
              2. Tiempos de Entrega
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Todo pedido procesado, pagado y confirmado antes de las <strong>11:00 a.m.</strong> se despacha el mismo día hábil (sujeto a disponibilidad de ruta). Los pedidos procesados después de esta hora se incluirán en la ruta del siguiente día hábil.
              </p>
              <p>
                El horario de entregas logísticas es de Lunes a Viernes de 9:00 a.m. a 5:00 p.m.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              3. Recepción en Obra
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                El material se entregará en la dirección acordada, a pie de camión. <strong>Nuestro personal no está autorizado a realizar labores de descarga pesada manual hacia el interior de la obra o niveles superiores</strong>. Asegúrate de contar con el personal necesario para la recepción del material en sitio.
              </p>
              <p>
                Al momento de la descarga, el encargado debe revisar y firmar la Guía de Despacho verificando cantidades y buen estado. Una vez firmada la guía en conformidad, no aceptamos reclamos por material faltante.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-yellow-500" />
              4. Envíos Nacionales
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Para despachos al resto del país, trabajamos mediante las principales empresas de encomiendas (MRW, Tealca, Zoom). Estos envíos se realizan modalidad <strong>Cobro en Destino (COD)</strong> bajo riesgo del comprador. Recomendamos asegurar la carga para material de alto valor.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
