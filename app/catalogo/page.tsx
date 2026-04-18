/**
 * @file app/catalogo/page.tsx
 * @description Página principal del catálogo B2B CharaTools.
 *
 * Arquitectura:
 * - Server Component: genera metadata SEO estática + pasa el catálogo completo al cliente.
 * - Client Component (CatalogPageView): maneja filtros via URL SearchParams.
 * - Todo el filtrado es client-side (0 round-trips, <50ms en móvil con mala señal).
 *
 * Rutas de entrada:
 *   /catalogo              → Catálogo completo
 *   /catalogo?cat=plomeria → Filtrado por categoría
 *   /catalogo?marca=INGCO  → Filtrado por marca
 *   /catalogo?q=taladro    → Búsqueda libre
 *   /catalogo?cat=electricidad&marca=3M&q=cable → Combinación
 */

import type { Metadata } from 'next'
import { MOCK_CATALOG } from '@/lib/mockCatalog'
import { CatalogPageView } from '@/components/catalog/CatalogPageView'

// ── Metadata SEO ───────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Catálogo B2B | CharaTools — Ferretería Industrial',
  description:
    'Explora el catálogo completo de CharaTools: herramientas, plomería, iluminación, electricidad e impermeabilización. Cotización directa por WhatsApp, sin pasarela de pago.',
  openGraph: {
    title: 'Catálogo CharaTools — Ferretería B2B',
    description: 'Herramientas, plomería, electricidad y más. Cotiza al instante por WhatsApp.',
  },
}

// ── Página ──────────────────────────────────────────────────────────────────

export default function CatalogoPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50">
      {/* Cabecera industrial del catálogo */}
      <div className="bg-gray-900 text-white px-4 md:px-8 lg:px-16 py-5 md:py-6">
        <h1 className="text-xl md:text-2xl font-black tracking-tight">
          Catálogo de Productos
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Explora nuestro inventario completo. Filtra por categoría, marca o búsqueda libre.
        </p>
      </div>

      {/* Vista del catálogo con Sidebar + Grid */}
      <CatalogPageView products={MOCK_CATALOG} />
    </main>
  )
}
