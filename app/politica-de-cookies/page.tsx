import type { Metadata } from 'next'
import { Cookie, ShieldAlert, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Cookies | CharaTools B2B',
  description: 'Cómo utilizamos las cookies para mejorar tu experiencia de compra industrial.',
}

export default function CookiesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 pb-24">
      {/* ── Header ── */}
      <section className="bg-gray-900 text-white pt-20 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 text-yellow-400 mb-6">
            <Cookie className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase">
            Política de <span className="text-yellow-400">Cookies</span>
          </h1>
          <p className="text-lg text-gray-300 font-medium">
            Transparencia total. Te explicamos de forma sencilla qué datos almacenamos temporalmente para que nuestra plataforma funcione rápido y sin errores.
          </p>
        </div>
      </section>

      {/* ── Contenido Legal ── */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-gray max-w-none">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
            <ShieldAlert className="text-yellow-500 w-6 h-6" /> 
            ¿Qué son las cookies?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Las cookies son pequeños archivos de texto que se guardan en tu navegador cuando visitas CharaTools. No contienen malware, virus ni pueden extraer información personal de tu dispositivo. Su única función es "recordar" tus preferencias para no pedirte la misma información dos veces.
          </p>

          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 mt-8 flex items-center gap-2">
            <CheckCircle className="text-green-500 w-6 h-6" />
            ¿Para qué las usamos?
          </h2>
          <ul className="space-y-4 mb-8 list-none pl-0">
            <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <span className="text-yellow-500 font-bold mt-0.5">1.</span>
              <div>
                <strong className="block text-gray-900 mb-1">Cookies Estrictamente Necesarias</strong>
                <span className="text-gray-600 text-sm">Permiten que el carrito de cotizaciones funcione y que puedas navegar entre el catálogo de marcas sin perder tus filtros.</span>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <span className="text-yellow-500 font-bold mt-0.5">2.</span>
              <div>
                <strong className="block text-gray-900 mb-1">Cookies de Rendimiento (Analytics)</strong>
                <span className="text-gray-600 text-sm">Nos ayudan a saber de forma anónima qué herramientas son las más buscadas. Si vemos que el esmeril INGCO es muy visitado, podemos pedir más inventario para ti.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 mt-8">Gestión de Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Puedes configurar tu navegador para bloquear todas las cookies, pero es posible que el botón de "Agregar a Cotización" y otras funciones del catálogo dejen de responder adecuadamente. Te recomendamos mantenerlas activas para una experiencia fluida.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500">
            <p>Última actualización: Noviembre 2023</p>
            <p className="mt-2">Si tienes dudas sobre nuestra privacidad de datos, escríbenos a nuestro número de contacto oficial.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
