'use client'

import React from 'react'
import Link from 'next/link'

const TRENDING_SEARCHES = [
  { label: 'Bomba 1/2hp', query: 'bomba 1/2hp' },
  { label: 'Taladro INGCO', query: 'taladro ingco' },
  { label: 'Tubería PPR', query: 'tuberia ppr' },
  { label: 'Breaker 30A', query: 'breaker 30a' },
  { label: 'Cable #12', query: 'cable #12' },
]

export function TrendingSearches() {
  return (
    <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap hide-scrollbar py-2 w-full max-w-full">
      <span className="font-bold text-xs md:text-sm text-gray-700 shrink-0">
        Búsquedas relacionadas:
      </span>
      <div className="flex gap-2">
        {TRENDING_SEARCHES.map((search) => (
          <Link
            key={search.query}
            href={`/catalogo?q=${encodeURIComponent(search.query)}`}
            className="px-3 py-1 bg-gray-200/60 hover:bg-yellow-100 text-gray-800 hover:text-yellow-900 text-xs md:text-sm rounded-full transition-colors border border-transparent hover:border-yellow-400 font-medium"
          >
            {search.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
