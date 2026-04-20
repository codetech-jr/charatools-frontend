import type { Metadata } from 'next'
import { ShieldCheck, Toolbox, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Garantía de Hierro | CharaTools B2B',
  description: 'Nuestra política de garantía clara, directa y sin papeleo innecesario. Respaldamos tu inversión en cada herramienta.',
}

export default function GarantiaPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 pb-24">
      {/* ── Hero / Header ── */}
      <section className="bg-gray-900 text-white pt-20 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        {/* Fondo decorativo industrial */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V0H40V40z" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-black mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 uppercase leading-tight">
            Garantía de <span className="text-yellow-400">Hierro</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Respaldamos tu inversión. Cero letras pequeñas, cero papeleo innecesario. Si falla por defecto de fábrica, nosotros respondemos.
          </p>
        </div>
      </section>

      {/* ── Niveles de Cobertura ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Manuales */}
          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:border-yellow-400 transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 mb-6">
              <Toolbox className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">Herramientas Manuales</h3>
            <p className="text-3xl font-black text-yellow-500 mb-4">1 Año</p>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
              Construidas para durar. Cubrimos cualquier rotura o deformación por defecto de fabricación bajo condiciones de uso rudo normal.
            </p>
          </div>

          {/* Tarjeta 2: Eléctricas */}
          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-yellow-400 flex flex-col h-full relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Soporte Directo
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mb-6">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">Eléctricas y Motor</h3>
            <p className="text-3xl font-black text-yellow-500 mb-4">6 Meses</p>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
              Potencia asegurada. Garantía directa contra defectos de motor, sistema eléctrico interno o piezas de ensamblaje originales.
            </p>
          </div>

          {/* Tarjeta 3: Consumibles */}
          <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:border-red-400 transition-colors">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase">Consumibles y Desgaste</h3>
            <p className="text-3xl font-black text-red-500 mb-4">Sin Garantía</p>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
              Discos de corte, brocas, lijas o equipos dañados por mal uso, variaciones de voltaje extremas o sobrecarga de trabajo.
            </p>
          </div>
        </div>
      </section>

      {/* ── El Proceso en 3 Pasos ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">¿Falla tu equipo? Procede así:</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">Un proceso rápido y sin dolor. Tu obra no puede detenerse por trámites lentos.</p>
        </div>

        <div className="space-y-8 relative">
          {/* Línea conectora visual */}
          <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gray-200" aria-hidden="true"></div>

          {/* Paso 1 */}
          <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black z-10 shadow-lg">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reúne el Equipo + Factura</h3>
              <p className="text-gray-600 leading-relaxed">
                Asegúrate de traer la herramienta completa, con todos sus accesorios originales, empacada en su caja de ser posible, y la factura fiscal de compra (imprescindible).
              </p>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 text-black rounded-2xl flex items-center justify-center text-2xl font-black z-10 shadow-lg">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visita nuestra sucursal</h3>
              <p className="text-gray-600 leading-relaxed">
                Tráelo directamente a nuestro centro en Charallave. Nuestro técnico realizará un diagnóstico inicial el mismo día para determinar si es defecto de fábrica o mal uso.
              </p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex-shrink-0 w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black z-10 shadow-lg">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Resolución Express</h3>
              <p className="text-gray-600 leading-relaxed">
                Si aplica la garantía, enviamos el equipo al centro de servicio autorizado de la marca o, en casos específicos, tramitamos un cambio directo. Te mantendremos informado por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-24">
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center">
          <Clock className="w-12 h-12 text-yellow-400 mb-6" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">¿Dudas sobre un producto antes de comprar?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Evita dolores de cabeza. Asesórate con nuestro equipo técnico sobre qué herramienta soporta tu nivel de trabajo diario.
          </p>
          <a
            href="https://wa.me/580000000000?text=Hola%2C+tengo+una+duda+sobre+la+garantía+de+una+herramienta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors focus:ring-4 focus:ring-yellow-400/30 outline-none"
          >
            Pregúntale a un Experto
          </a>
        </div>
      </section>
    </main>
  )
}
