import Link from 'next/link'
import { Search, Tag } from 'lucide-react'

// Simulamos subcategorías o términos de búsqueda relacionados según la categoría principal
const MOCK_SUBCATEGORIES: Record<string, { label: string; count: number; q: string }[]> = {
  'herramientas-electricas': [
    { label: 'Taladros Percutores', count: 12, q: 'taladro percutor' },
    { label: 'Esmeriles', count: 8, q: 'esmeril' },
    { label: 'Sierras Circulares', count: 5, q: 'sierra' },
    { label: 'Lijadoras', count: 7, q: 'lijadora' },
  ],
  'herramientas-manuales': [
    { label: 'Destornilladores', count: 24, q: 'destornillador' },
    { label: 'Llaves Ajustables', count: 15, q: 'llave' },
    { label: 'Martillos', count: 9, q: 'martillo' },
    { label: 'Cintas Métricas', count: 6, q: 'cinta metrica' },
  ],
  'plomeria': [
    { label: 'Tuberías PVC', count: 34, q: 'tuberia pvc' },
    { label: 'Bombas de Agua', count: 12, q: 'bomba agua' },
    { label: 'Válvulas', count: 45, q: 'valvula' },
    { label: 'Conexiones PPR', count: 89, q: 'ppr' },
  ],
  'electricidad': [
    { label: 'Cables THW', count: 18, q: 'cable thw' },
    { label: 'Breakers', count: 22, q: 'breaker' },
    { label: 'Tomacorrientes', count: 31, q: 'tomacorriente' },
    { label: 'Cintas Aislantes', count: 14, q: 'cinta aislante' },
  ],
  'iluminacion': [
    { label: 'Bombillos LED', count: 42, q: 'bombillo led' },
    { label: 'Paneles', count: 16, q: 'panel' },
    { label: 'Reflectores', count: 11, q: 'reflector' },
    { label: 'Tubos Fluorescentes', count: 8, q: 'tubo' },
  ],
  'impermeabilizacion': [
    { label: 'Mantos Asfálticos', count: 15, q: 'manto' },
    { label: 'Primer', count: 7, q: 'primer' },
    { label: 'Selladores', count: 23, q: 'sellador' },
    { label: 'Pintura Elastomérica', count: 12, q: 'pintura' },
  ],
  'seguridad-industrial': [
    { label: 'Cascos', count: 19, q: 'casco' },
    { label: 'Guantes', count: 34, q: 'guante' },
    { label: 'Lentes de Seguridad', count: 21, q: 'lentes' },
    { label: 'Botas', count: 14, q: 'botas' },
  ],
}

interface DiscoverMoreCategoriesProps {
  categorySlug: string
  isCompact?: boolean
}

export function DiscoverMoreCategories({ categorySlug, isCompact = false }: DiscoverMoreCategoriesProps) {
  const options = MOCK_SUBCATEGORIES[categorySlug] || []

  if (options.length === 0) return null

  return (
    <section className={`${isCompact ? 'py-8' : 'py-12 md:py-16'} bg-white border-t border-gray-100`} aria-labelledby="discover-more">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 id="discover-more" className="text-sm md:text-base font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
          Explora más opciones relacionadas
        </h2>

        <div className={`flex flex-wrap justify-center gap-3 md:gap-4 ${isCompact ? 'mt-4' : 'mt-6'}`}>
          {options.map((opt) => (
            <Link
              key={opt.label}
              href={`/catalogo?q=${encodeURIComponent(opt.q)}`}
              className="group flex items-center gap-3 px-4 py-2 md:py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-md hover:border-yellow-400 transition-all duration-300"
            >
              {/* Ícono sutil referencial */}
              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                <Tag className="w-3.5 h-3.5 text-gray-500 group-hover:text-yellow-600" />
              </div>
              
              <div className="flex items-start gap-1 pr-2">
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {opt.label}
                </span>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-yellow-600 relative -top-0.5" aria-label={`${opt.count} productos`}>
                  {opt.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
