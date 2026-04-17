'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

const BRANDS = [
  { name: 'INGCO', src: '/marcas/ingco.png' },
  { name: '3M', src: '/marcas/3m.png' },
  { name: 'Schneider Electric', src: '/marcas/schneider_electric.png' },
  { name: 'Philips', src: '/marcas/philips.png' },
  { name: 'Truper', src: '/marcas/truper.png' },
  { name: 'Stanley', src: '/marcas/stanley.png' }
]

export function BrandTicker() {
  return (
    <div className="w-full bg-gray-900 border-b border-gray-800 overflow-hidden py-2" aria-hidden="true">
      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        {BRANDS.map((brand, idx) => (
          <img
            key={`${brand.name}-${idx}`}
            src={brand.src}
            alt={`Logo de ${brand.name}`}
            className="h-6 w-auto object-contain mx-8 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer text-xs text-gray-500"
          />
        ))}
      </Marquee>
    </div>
  )
}
