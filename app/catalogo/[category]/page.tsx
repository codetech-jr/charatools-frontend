/**
 * @file app/catalogo/[category]/page.tsx
 * @description Dynamic Router para renderizar las categorías desde la URL
 * inyectando la información SEO mapeada o desplegando un Fallback UI (Not Found).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublicCatalog } from '@/app/actions/catalogActions'
import { MOCK_CATALOG } from '@/lib/mockCatalog'
import { CatalogPageView } from '@/components/catalog/CatalogPageView'
import { CATALOG_CATEGORIES } from '@/lib/catalog.types'
import { seoCategoryData } from '@/lib/seoCategoryData'
import { SeoCategoryHero } from '@/components/seo/SeoCategoryHero'
import { SeoCategoryFooter } from '@/components/seo/SeoCategoryFooter'
import { PackageX, ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ category: string }>
}

// ── Metadata SEO Dinámica ───────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const seoData = seoCategoryData[category]
  
  if (!seoData) {
    return { title: 'Categoría No Encontrada | CharaTools' }
  }

  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
    },
  }
}

// ── SSG Paths ───────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CATALOG_CATEGORIES.map((cat) => ({ category: cat.slug }))
}

// ── Página Principal ────────────────────────────────────────────────────────

export default async function DynamicCategoryPage({ params }: PageProps) {
  const { category } = await params
  const seoData = seoCategoryData[category]
  
  // ── 1. Empty State / NotFound B2B UI ──────────────────────────────────────
  // Si la categoría no existe en el diccionario SEO, mostramos nuestra vista custom.
  if (!seoData) {
    return (
      <main className="min-h-[80vh] bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageX className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-3 tracking-tight">
            Categoría No Encontrada
          </h1>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            Lo sentimos, la categoría <strong className="text-yellow-400">"{category}"</strong> que intentas buscar no existe o ha sido movida. Por favor verifica la URL o vuelve al catálogo principal.
          </p>
          <Link 
            href="/catalogo"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-yellow-400 text-zinc-950 font-bold rounded-lg hover:bg-yellow-500 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Catálogo General
          </Link>
        </div>
      </main>
    )
  }

  // ── 2. Data Fetching Server Component ─────────────────────────────────────
  const { products: dbProducts, error } = await getPublicCatalog()

  if (error) {
    console.warn('[DynamicCategoryPage] Supabase error, usando MOCK_CATALOG:', error)
  }

  // Fallback transparente al mock
  const allProducts = dbProducts.length > 0 ? dbProducts : MOCK_CATALOG
  
  // ── 3. Subfiltro Front-End para el Layout Genérico ────────────────────────
  const filteredProducts = allProducts.filter(p => p.category === category)

  // Enlace para WhatsApp (CTA)
  const ctaHref = `https://api.whatsapp.com/send?phone=584220148405&text=${encodeURIComponent(
    `¡Hola! Estoy viendo la categoría "${seoData.title}" en Charatools y necesito asesoría.`
  )}`

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── [SEO] Hero Superior ── */}
      <SeoCategoryHero 
        title={seoData.title} 
        description={seoData.description} 
      />

      {/* ── Inyección del Layout Genérico (Product grids) ── */}
      <div className="flex-1 w-full bg-white lg:bg-gray-50">
        <CatalogPageView products={filteredProducts} />
      </div>

      {/* ── [SEO] Footer Inferior con CTA ── */}
      <SeoCategoryFooter 
        blocks={seoData.blocks}
        ctaSection={{
          closingText: `${seoData.ctaSection.title} — ${seoData.ctaSection.text}`,
          ctaLabel: seoData.ctaSection.btnText,
          ctaHref
        }}
      />
    </main>
  )
}
