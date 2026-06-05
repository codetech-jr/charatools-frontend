'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Wrench, Droplets, Lightbulb, Zap, Umbrella, ChevronDown, ChevronRight, LayoutGrid, Shield } from 'lucide-react'
import { trackSelectCategory } from '@/lib/analytics'

// Taxonomía oficial de 5 categorías con iconos representativos
export const CATEGORIES = [
  {
    id: 'herramientas-general',
    name: 'Herramientas en General',
    icon: Wrench,
    href: '/catalogo/herramientas-general',
    subcategories: [
      { name: 'Herramientas Eléctricas', href: '/catalogo/herramientas-general?sub=electricas' },
      { name: 'Herramientas Manuales', href: '/catalogo/herramientas-general?sub=manuales' },
      { name: 'Equipos de Medición', href: '/catalogo/herramientas-general?sub=medicion' },
      { name: 'Accesorios', href: '/catalogo/herramientas-general?sub=accesorios' }
    ]
  },
  {
    id: 'plomeria',
    name: 'Plomería',
    icon: Droplets,
    href: '/catalogo/plomeria',
    subcategories: [
      {
        name: 'Tuberías y Conexiones',
        href: '/catalogo/plomeria?sub=tuberias',
        items: [
          { name: 'Tubería Sanitaria Estándar', href: '/catalogo/plomeria?sub=tuberia-sanitaria-estandar' },
          { name: 'Tubería Sanitaria Reforzada', href: '/catalogo/plomeria?sub=tuberia-sanitaria-reforzada' },
          { name: 'Conexiones Sanitarias Estándar', href: '/catalogo/plomeria?sub=conexiones-sanitarias-estandar' },
          { name: 'Conexiones Sanitarias Reforzadas', href: '/catalogo/plomeria?sub=conexiones-sanitarias-reforzadas' },
          { name: 'Tubería Agua Fría', href: '/catalogo/plomeria?sub=tuberia-agua-fria' },
          { name: 'Conexiones Agua Fría', href: '/catalogo/plomeria?sub=conexiones-agua-fria' },
          { name: 'Conexiones Galvanizadas', href: '/catalogo/plomeria?sub=conexiones-galvanizadas' },
          { name: 'Termofusión (PPR)', href: '/catalogo/plomeria?sub=termofusion-ppr' }
        ]
      },
      { name: 'Grifería y Válvulas', href: '/catalogo/plomeria?sub=griferia' },
      { name: 'Bombas de Agua', href: '/catalogo/plomeria?sub=bombas' },
      { name: 'Calentadores', href: '/catalogo/plomeria?sub=calentadores' },
      { name: 'Soldadura', href: '/catalogo/plomeria?sub=soldadura' }
    ]
  },
  {
    id: 'iluminacion',
    name: 'Iluminación',
    icon: Lightbulb,
    href: '/catalogo/iluminacion',
    subcategories: [
      { name: 'Focos y Tubos LED', href: '/catalogo/iluminacion?sub=focos-led' },
      { name: 'Reflectores', href: '/catalogo/iluminacion?sub=reflectores' },
      { name: 'Iluminación Industrial', href: '/catalogo/iluminacion?sub=industrial' },
      { name: 'Lámparas de Emergencia', href: '/catalogo/iluminacion?sub=emergencia' }
    ]
  },
  {
    id: 'electricidad',
    name: 'Electricidad',
    icon: Zap,
    href: '/catalogo/electricidad',
    subcategories: [
      { name: 'Cables y Conductores', href: '/catalogo/electricidad?sub=cables' },
      { name: 'Tableros y Breakers', href: '/catalogo/electricidad?sub=tableros' },
      { name: 'Tomacorrientes e Interruptores', href: '/catalogo/electricidad?sub=tomacorrientes' },
      { name: 'Canalización', href: '/catalogo/electricidad?sub=canalizacion' }
    ]
  },
  {
    id: 'impermeabilizacion',
    name: 'Impermeabilización',
    icon: Umbrella,
    href: '/catalogo/impermeabilizacion',
    subcategories: [
      { name: 'Mantos Asfálticos', href: '/catalogo/impermeabilizacion?sub=mantos' },
      { name: 'Pinturas Impermeabilizantes', href: '/catalogo/impermeabilizacion?sub=pinturas' },
      { name: 'Selladores y Siliconas', href: '/catalogo/impermeabilizacion?sub=selladores' },
      { name: 'Aditivos para Concreto', href: '/catalogo/impermeabilizacion?sub=aditivos' }
    ]
  },
  {
    id: 'seguridad-industrial',
    name: 'Seguridad Industrial',
    icon: Shield,
    href: '/catalogo/seguridad-industrial',
    subcategories: [
      { name: 'Cascos de Seguridad', href: '/catalogo/seguridad-industrial?sub=cascos' },
      { name: 'Guantes de Protección', href: '/catalogo/seguridad-industrial?sub=guantes' },
      { name: 'Lentes y Visores', href: '/catalogo/seguridad-industrial?sub=lentes' },
      { name: 'Calzado Dieléctrico', href: '/catalogo/seguridad-industrial?sub=calzado' }
    ]
  }
]

type SubItem = { name: string; href: string }
type Subcategory = { name: string; href: string; items?: SubItem[] }

export function DesktopMegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id)
  const [activeSub, setActiveSub] = useState<Subcategory | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setActiveSub(null)
    }, 200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  const handleCategoryHover = (catId: string) => {
    setActiveCategory(catId)
    setActiveSub(null)
  }

  const activeCatData = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0]

  // Ancho total del menú: si hay sub-ítems activos, se expande a 3 columnas
  const hasThirdColumn = activeSub?.items && activeSub.items.length > 0

  return (
    <div
      className="hidden lg:block relative z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 h-11 px-4 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Nuestro Catálogo <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        role="menu"
        className={`absolute top-[calc(100%+8px)] left-0 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ease-out ${
          hasThirdColumn ? 'w-[900px]' : 'w-[650px]'
        } ${
          isOpen
            ? 'opacity-100 visible translate-y-0 pointer-events-auto delay-0'
            : 'opacity-0 invisible -translate-y-2 pointer-events-none delay-100'
        }`}
      >
        <div className="flex h-[380px]">

          {/* ── Columna 1: Categorías principales ── */}
          <div className="w-[220px] bg-gray-50 border-r border-gray-200 overflow-y-auto p-3 flex-shrink-0">
            <Link
              href="/catalogo"
              role="menuitem"
              onClick={() => { setIsOpen(false); trackSelectCategory('all-products') }}
              className="w-full flex items-center justify-between p-3 rounded-lg text-sm font-black transition-all group focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-3 bg-yellow-400 text-black shadow-md hover:bg-yellow-500 border border-yellow-500"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5" />
                <span>Explora todo</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Categorías</p>

            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  role="menuitem"
                  onMouseEnter={() => handleCategoryHover(cat.id)}
                  onClick={() => { setIsOpen(false); trackSelectCategory(cat.id) }}
                  onFocus={() => handleCategoryHover(cat.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-bold transition-all group focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-1 ${
                    isActive ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span>{cat.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all ${isActive ? 'text-gray-400 opacity-100 translate-x-0' : 'text-gray-300 opacity-0 -translate-x-2'}`} />
                </Link>
              )
            })}
          </div>

          {/* ── Columna 2: Subcategorías ── */}
          <div className="w-[220px] bg-white border-r border-gray-100 overflow-y-auto flex-shrink-0">
            <div className="px-4 pt-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <activeCatData.icon className="w-4 h-4 text-yellow-500" />
                {activeCatData.name}
              </h3>
              <Link
                href={activeCatData.href}
                onClick={() => { setIsOpen(false); trackSelectCategory(activeCatData.id) }}
                className="text-[10px] font-bold text-yellow-600 hover:text-yellow-700 hover:underline uppercase tracking-wider"
              >
                Ver todo
              </Link>
            </div>
            <div className="p-3 space-y-1">
              {activeCatData.subcategories.map(sub => {
                const isSubActive = activeSub?.name === sub.name
                return (
                  <div
                    key={sub.name}
                    onMouseEnter={() => setActiveSub(sub.items ? sub : null)}
                    className="relative"
                  >
                    <Link
                      href={sub.href}
                      onClick={() => { setIsOpen(false); trackSelectCategory(`${activeCatData.id}/${sub.name}`) }}
                      className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-medium transition-all group ${
                        isSubActive
                          ? 'bg-yellow-50 text-black border border-yellow-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-black border border-transparent'
                      }`}
                    >
                      <span>{sub.name}</span>
                      {sub.items && (
                        <ChevronRight className={`w-4 h-4 transition-colors flex-shrink-0 ${isSubActive ? 'text-yellow-500' : 'text-gray-300 group-hover:text-gray-500'}`} />
                      )}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Columna 3: Sub-ítems (solo si la subcategoría activa tiene items) ── */}
          {hasThirdColumn && (
            <div className="flex-1 bg-gray-50 overflow-y-auto">
              <div className="px-4 pt-4 pb-2 border-b border-gray-100">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">{activeSub!.name}</h4>
              </div>
              <div className="p-3 space-y-1">
                {activeSub!.items!.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => { setIsOpen(false); trackSelectCategory(item.name) }}
                    className="flex items-center gap-2 p-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-black hover:shadow-sm border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Panel vacío cuando no hay 3ª columna pero sí categorías sin sub-ítems ── */}
          {!hasThirdColumn && (
            <div className="flex-1 bg-white flex items-center justify-center p-6">
              <div className="text-center opacity-30">
                <activeCatData.icon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-medium">Selecciona una categoría</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export function MobileMegaMenu({ closeMenu }: { closeMenu: () => void }) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null)
  const [expandedSub, setExpandedSub] = useState<string | null>(null)

  return (
    <nav className="flex flex-col w-full" role="navigation" aria-label="Catálogo Móvil">
      <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 px-1 border-b border-gray-800 pb-2">Nuestro Catálogo</p>

      {/* ── Link Directo a Todo el Catálogo (Mobile) ── */}
      <Link
        href="/catalogo"
        onClick={() => { closeMenu(); trackSelectCategory('all-products') }}
        className="w-full flex items-center justify-between p-4 mb-3 bg-yellow-400 text-black rounded-xl text-sm font-black shadow-lg active:scale-[0.98] transition-all border border-yellow-500"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="w-5 h-5 text-black" />
          <span>Explora todos nuestros productos</span>
        </div>
        <ChevronRight className="w-5 h-5 text-black" />
      </Link>

      <div className="space-y-1">
        {CATEGORIES.map(cat => {
          const isCatExpanded = expandedCat === cat.id
          return (
            <div key={cat.id} className="bg-gray-800/50 rounded-xl overflow-hidden">
              <button
                onClick={() => { setExpandedCat(isCatExpanded ? null : cat.id); setExpandedSub(null) }}
                aria-expanded={isCatExpanded}
                className={`w-full flex items-center justify-between p-4 transition-colors focus:outline-none ${isCatExpanded ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className={`w-5 h-5 ${isCatExpanded ? 'text-yellow-400' : 'text-gray-400'}`} />
                  <span className={`font-bold ${isCatExpanded ? 'text-white' : 'text-gray-300'}`}>{cat.name}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isCatExpanded ? 'rotate-180 text-yellow-400' : 'text-gray-500'}`} />
              </button>

              {/* Acordeón nivel 1 */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCatExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4 pt-1 bg-gray-800 space-y-1">
                  <Link
                    href={cat.href}
                    onClick={() => { closeMenu(); trackSelectCategory(cat.id) }}
                    className="flex items-center justify-between w-full p-3 bg-yellow-400/10 text-yellow-400 rounded-lg text-sm font-bold border border-yellow-400/20"
                  >
                    Ver todo de {cat.name}
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  {cat.subcategories.map(sub => {
                    const isSubExpanded = expandedSub === `${cat.id}/${sub.name}`
                    return (
                      <div key={sub.name}>
                        {sub.items ? (
                          // Subcategoría con sub-ítems → acordeón
                          <>
                            <button
                              onClick={() => setExpandedSub(isSubExpanded ? null : `${cat.id}/${sub.name}`)}
                              className="w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                            >
                              {sub.name}
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSubExpanded ? 'rotate-180 text-yellow-400' : 'text-gray-500'}`} />
                            </button>
                            <div className={`transition-all duration-200 overflow-hidden ${isSubExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="pl-4 pb-1 space-y-1 border-l-2 border-yellow-400/30 ml-4 mt-1">
                                {sub.items.map(item => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => { closeMenu(); trackSelectCategory(item.name) }}
                                    className="flex items-center gap-2 p-2 rounded-lg text-xs text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 flex-shrink-0" />
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          // Subcategoría simple → link directo
                          <Link
                            href={sub.href}
                            onClick={() => { closeMenu(); trackSelectCategory(`${cat.id}/${sub.name}`) }}
                            className="block p-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
