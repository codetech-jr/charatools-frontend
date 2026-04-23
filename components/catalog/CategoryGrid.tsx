'use client'

import React from 'react'
import { Wrench, Droplets, Lightbulb, Zap, Shield } from 'lucide-react'

interface Category {
  id: string
  slug: 'herramientas' | 'plomeria' | 'iluminacion' | 'electricidad' | 'impermeabilizacion'
  icon: React.ReactNode
  title: string
  shortTitle: string
}

const categories: Category[] = [
  {
    id: '1',
    slug: 'herramientas',
    icon: <Wrench className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />,
    title: 'Herramientas en General',
    shortTitle: 'Herramientas',
  },
  {
    id: '2',
    slug: 'plomeria',
    icon: <Droplets className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />,
    title: 'Plomería',
    shortTitle: 'Plomería',
  },
  {
    id: '3',
    slug: 'iluminacion',
    icon: <Lightbulb className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />,
    title: 'Iluminación',
    shortTitle: 'Iluminación',
  },
  {
    id: '4',
    slug: 'electricidad',
    icon: <Zap className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />,
    title: 'Electricidad',
    shortTitle: 'Electricidad',
  },
  {
    id: '5',
    slug: 'impermeabilizacion',
    icon: <Shield className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />,
    title: 'Impermeabilización',
    shortTitle: 'Impermeabilización',
  },
]

interface CategoryGridProps {
  activeFilter: string | null
  onFilterChange: (slug: string | null) => void
}

export function CategoryGrid({ activeFilter, onFilterChange }: CategoryGridProps) {
  return (
    <section className="w-full bg-gray-50 px-4 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onFilterChange(activeFilter === category.slug ? null : category.slug)}
            className={`flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-6 rounded-lg border-2 transition-all duration-200 aspect-square lg:aspect-auto lg:min-h-[180px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 ${
              activeFilter === category.slug
                ? 'bg-yellow-100 border-yellow-500 ring-2 ring-yellow-500'
                : 'bg-white border-gray-200 hover:border-yellow-400 hover:-translate-y-1'
            }`}
          >
            {category.icon}
            <h3 className="text-center text-xs md:text-sm lg:text-base font-semibold text-gray-900 leading-snug">
              {category.title}
            </h3>
          </button>
        ))}
      </div>
    </section>
  )
}
