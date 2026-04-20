import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'
import { CATALOG_BRANDS, MOCK_PRODUCTS } from '@/lib/catalog.types'
import { ProductCard } from '@/components/catalog/ProductCard'

// ── react-best-practices: ssg-generation ──────────────────────────────────
export function generateStaticParams() {
  return CATALOG_BRANDS.map((brand) => ({
    marca: brand.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ marca: string }> }): Promise<Metadata> {
  const { marca } = await params
  const brandName = CATALOG_BRANDS.find((b) => b.toLowerCase().replace(/\s+/g, '-') === marca)

  if (!brandName) {
    return { title: 'Marca no encontrada | CharaTools' }
  }

  return {
    title: `Promociones ${brandName} | CharaTools`,
    description: `Catálogo oficial y promociones exclusivas de ${brandName} en CharaTools. Compra herramientas originales con garantía.`,
  }
}

export default async function PromocionesMarcaPage({ params }: { params: Promise<{ marca: string }> }) {
  const { marca } = await params
  const brandName = CATALOG_BRANDS.find((b) => b.toLowerCase().replace(/\s+/g, '-') === marca)

  if (!brandName) {
    notFound()
  }

  // Filtrar productos por marca
  const products = MOCK_PRODUCTS.filter(
    (p) => p.brand.toLowerCase() === brandName.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* ── Hero Banner: Scarcity & Authority (marketing-psychology) ── */}
      <section className="bg-gray-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            href="/catalogo"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Link>

          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold tracking-wider uppercase text-sm">
              Partner Oficial
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Poder y Resistencia <span className="text-blue-400">{brandName}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light">
            Catálogo oficial {brandName} para contratistas e industria. 
            Herramientas diseñadas para el trabajo duro. <strong className="text-white">Garantía total de fábrica.</strong>
          </p>
        </div>
      </section>

      {/* ── Grid de Productos ── */}
      <main className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Disponibilidad Inmediata
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {products.length} {products.length === 1 ? 'equipo' : 'equipos'}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin inventario disponible</h3>
            <p className="text-gray-500">
              Actualmente no contamos con equipos de {brandName} en nuestro almacén. 
              Contacta a tu asesor para pedidos especiales.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
