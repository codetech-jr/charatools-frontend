'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Wrench, Droplets, Lightbulb, Zap, Umbrella, ChevronDown, ChevronRight } from 'lucide-react'

// Taxonomía oficial de 5 categorías con iconos representativos
const CATEGORIES = [
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
      { name: 'Tuberías y Conexiones', href: '/catalogo/plomeria?sub=tuberias' },
      { name: 'Grifería y Válvulas', href: '/catalogo/plomeria?sub=griferia' },
      { name: 'Bombas de Agua', href: '/catalogo/plomeria?sub=bombas' },
      { name: 'Calentadores', href: '/catalogo/plomeria?sub=calentadores' }
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
  }
];

export function DesktopMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Funciones para manejar el hover con delay (evita cierres accidentales)
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms delay para mantener UX fluida
  };

  // Accesibilidad por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const activeCatData = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

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
          className={`absolute top-[calc(100%+8px)] left-0 w-[650px] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ease-out ${
            isOpen 
              ? 'opacity-100 visible translate-y-0 pointer-events-auto delay-0' 
              : 'opacity-0 invisible -translate-y-2 pointer-events-none delay-100'
          }`}
        >
          <div className="flex h-[360px]">
            {/* Sidebar Categorías (Izquierda) */}
            <div className="w-[260px] bg-gray-50 border-r border-gray-200 overflow-y-auto p-3">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    role="menuitem"
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onClick={() => setIsOpen(false)}
                    onFocus={() => setActiveCategory(cat.id)}
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
                );
              })}
            </div>
            
            {/* Área principal Subcategorías (Derecha) */}
            <div className="flex-1 p-6 bg-white overflow-y-auto">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <activeCatData.icon className="w-5 h-5 text-yellow-500" />
                  {activeCatData.name}
                </h3>
                <Link 
                  href={activeCatData.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-yellow-600 hover:text-yellow-700 hover:underline uppercase tracking-wider"
                >
                  Ver Todo
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {activeCatData.subcategories.map(sub => (
                  <Link 
                    key={sub.name}
                    href={sub.href}
                    onClick={() => setIsOpen(false)}
                    className="p-3 rounded-lg border border-gray-100 hover:border-yellow-400 hover:bg-yellow-50/50 transition-all text-sm font-semibold text-gray-700 hover:text-black flex items-center justify-between group"
                  >
                    {sub.name}
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-yellow-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export function MobileMegaMenu({ closeMenu }: { closeMenu: () => void }) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  return (
    <nav className="flex flex-col w-full" role="navigation" aria-label="Catálogo Móvil">
      <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 px-1 border-b border-gray-800 pb-2">Nuestro Catálogo</p>
      <div className="space-y-1">
        {CATEGORIES.map(cat => {
          const isExpanded = expandedCat === cat.id;
          return (
            <div key={cat.id} className="bg-gray-800/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                aria-expanded={isExpanded}
                className={`w-full flex items-center justify-between p-4 transition-colors focus:outline-none ${isExpanded ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className={`w-5 h-5 ${isExpanded ? 'text-yellow-400' : 'text-gray-400'}`} />
                  <span className={`font-bold ${isExpanded ? 'text-white' : 'text-gray-300'}`}>{cat.name}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-yellow-400' : 'text-gray-500'}`} />
              </button>
              
              {/* Contenido del Acordeón Móvil */}
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-4 pb-4 pt-1 bg-gray-800 space-y-2">
                  <Link 
                    href={cat.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between w-full p-3 bg-yellow-400/10 text-yellow-400 rounded-lg text-sm font-bold border border-yellow-400/20"
                  >
                    Ver todo de {cat.name}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  {cat.subcategories.map(sub => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={closeMenu}
                      className="block p-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
