'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

const BRANDS = [
  { name: 'INGCO', src: '/logo-ingco.webp' },
  { name: '3M', src: '/logo-3M.webp' },
  { name: 'Schneider Electric', src: '/logo-scheider-electric.webp' },
  { name: 'Philips', src: '/logo-philips.webp' },
  { name: 'Truper', src: '/logo-truper.webp' },
  { name: 'Stanley', src: '/logo-stanley.webp' }
]

export function BrandTicker() {
  return (
    <div className="w-full bg-gray-900 border-b border-gray-800 overflow-hidden py-4" aria-hidden="true">
      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        {BRANDS.map((brand, idx) => (
          <img
            key={`${brand.name}-${idx}`}
            src={brand.src}
            alt={`Logo de ${brand.name}`}
            className="h-8 md:h-10 w-auto object-contain mx-12 filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
          />
        ))}
      </Marquee>
    </div>
  )
}
