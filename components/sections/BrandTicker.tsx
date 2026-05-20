'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

const BRANDS = [
  { name: 'INGCO', src: '/logo-ingco.webp' },
  { name: 'EMG', src: '/logo-emg.webp' },
  { name: '3M', src: '/logo-3M.webp' },
  { name: 'Stanley', src: '/logo-stanley.webp' },
  { name: 'Bellota', src: '/logo-bellota.webp' },
  { name: 'Bticino', src: '/logo-bticino.webp' },
  { name: 'Tubrica', src: '/logo-tubrica.webp' },
  { name: 'Manpica', src: '/logo-manpica.webp' },
  { name: 'Cebra', src: '/logo-cebra.webp' },
  { name: 'Venceramica', src: '/logo-venceramica.webp' },
  { name: 'Reinco', src: '/logo-reinco.webp' },
  { name: 'Griven', src: '/logo-griven.webp' },
  { name: 'Iconel', src: '/logo-iconel.webp' },
  { name: 'Fermetal', src: '/logo-fermetal.webp' },
  { name: 'Run', src: '/logo-run.webp' },
  { name: 'Lumistar', src: '/logo-lumistar.webp' },
  { name: 'Aquafina', src: '/logo-aquafina.webp' },
  { name: 'Exxel', src: '/logo-exxel.webp' },
  { name: 'Faguax', src: '/logo-faguax.webp' },
  { name: 'Ferco', src: '/logo-ferco.webp' },
  { name: 'Lincoln', src: '/logo-lincoln.webp' },
  { name: 'Littmann', src: '/logo-littmann.webp' },
  { name: 'Proxical', src: '/logo-proxical.webp' },
  { name: 'Sergeca', src: '/logo-sergeca.webp' },
  { name: 'PCP', src: '/logo-pcp.webp' },
  { name: 'Bosch', src: '/logo-bosch.webp' },
  { name: 'Termofusion', src: '/logo-termofusion.webp' },
  { name: 'Vert', src: '/logo-vert.webp' },
  { name: 'Zasc', src: '/logo-zasc.webp' },
  { name: 'Protonic Electric', src: '/logo-protonic.webp' },
  { name: 'Cobra', src: '/logo-cobra.webp' },
  { name: 'Ceramipego', src: '/logo-ceramipego.webp' },
  { name: 'Belt-G', src: '/logo-belt-g.webp' },
]

interface BrandTickerProps {
  variant?: 'dark' | 'light' | 'transparent'
  grayscale?: boolean
}

export function BrandTicker({ variant = 'dark', grayscale = true }: BrandTickerProps) {
  const bgClass = 
    variant === 'dark' 
      ? 'bg-gray-900 border-b border-gray-800 py-6' 
      : variant === 'light' 
      ? 'bg-gray-50 border-y border-gray-200/60 py-6' 
      : 'bg-transparent py-4' // transparent
  
  const imgClass = grayscale 
    ? 'filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300'
    : 'transition-all duration-300'

  return (
    <div className={`w-full overflow-hidden ${bgClass}`} aria-hidden="true">
      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        {BRANDS.map((brand, idx) => (
          <div 
            key={`${brand.name}-${idx}`} 
            className="mx-8 md:mx-12 w-24 md:w-36 h-10 md:h-14 flex items-center justify-center"
          >
            <img
              src={brand.src}
              alt={`Logo de ${brand.name}`}
              className={`max-h-full max-w-full object-contain cursor-pointer ${imgClass}`}
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}
