import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, AlertTriangle, CreditCard } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import { ProductCard } from '@/components/catalog/ProductCard'

export const metadata: Metadata = {
  title: 'Zona Outlet y Ofertas | CharaTools',
  description: 'Aprovecha nuestras ofertas y liquidaciones en herramientas industriales. Unidades limitadas. Paga en cuotas sin interés con Cashea.',
}

export default function OfertasPage() {
  // Filtrar productos marcados como outlet/oferta
  const products = MOCK_PRODUCTS.filter((p) => p.isOutlet === true)

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* ── Hero Banner: FOMO & Urgency (marketing-psychology) ── */}
      <section className="bg-red-600 text-white py-16 px-4 relative overflow-hidden">
        {/* Warning Stripes Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' 
          }} 
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            href="/catalogo"
            className="inline-flex items-center text-red-100 hover:text-white transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Link>

          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-yellow-400 text-black px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-sm flex items-center shadow-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Liquidación Total
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase">
            Zona Outlet CharaTools
          </h1>
          
          <p className="text-lg md:text-xl text-red-50 max-w-2xl font-medium mb-8">
            Inventario final. Unidades limitadas hasta agotar existencia.
          </p>

          {/* Cashea Integration Badge on Hero */}
          <div className="inline-flex flex-col sm:flex-row sm:items-center bg-white/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 gap-4">
            <div className="flex items-center bg-white text-black px-2 py-1 rounded-lg w-fit">
              <Image src="/cashea.svg" alt="Cashea" width={22} height={22} className="mr-1" />
              <span className="text-sm font-bold uppercase">cashea</span>
            </div>
            <p className="text-sm sm:text-base font-medium">
              Asegura tu equipo hoy y <strong className="text-yellow-300">paga en cuotas sin interés</strong>. No dejes que te lo ganen.
            </p>
          </div>
        </div>
      </section>

      {/* ── Grid de Productos ── */}
      <main className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            🔥 Últimas unidades disponibles
          </h2>
          <span className="text-sm text-gray-500 font-medium bg-red-100 text-red-700 px-3 py-1 rounded-full">
            {products.length} {products.length === 1 ? 'equipo en oferta' : 'equipos en oferta'}
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay ofertas activas</h3>
            <p className="text-gray-500">
              Nuestro inventario de outlet se ha agotado. Mantente atento a próximas liquidaciones.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
