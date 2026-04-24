'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Gift, Timer } from 'lucide-react'

export interface PromoSectionProps {
  badgeText?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  imageUrl?: string;
  urgencyText?: string;
}

export function PromoSection({
  badgeText = '🎁 Regalo Cruzado',
  title = 'Combo Plomería Industrial + Consumibles GRATIS',
  description = 'Equipa tu obra hoy con la tubería y llaves de paso que necesitas, y te regalamos la cinta teflón y el pegamento profesional.',
  ctaText = '+ Añadir Promo a Cotización',
  onCtaClick,
  imageUrl = 'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=800&q=80',
  urgencyText = '🚨 Promoción válida hasta agotar stock',
}: PromoSectionProps) {
  
  // Default action if no onCtaClick is provided: scroll to catalog or navigate to it
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const element = document.getElementById('catalogo');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/catalogo';
      }
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-black border border-gray-800 shadow-2xl group">
        {/* Glow / Pulse Effect */}
        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        {/* Illuminated border effect */}
        <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700 pointer-events-none group-hover:animate-pulse" />

        <div className="relative flex flex-col md:flex-row items-stretch z-10 bg-[#0A0A0A] rounded-[2rem] overflow-hidden m-[1px]">
          
          {/* Content Column */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 relative z-20">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/5 to-transparent pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-700/50 px-4 py-1.5 rounded-full w-fit mb-6 relative z-10">
              <Gift className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-black text-gray-200 uppercase tracking-widest">{badgeText}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-5 text-balance relative z-10">
              {title}
            </h2>
            
            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl text-balance relative z-10">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 mt-auto relative z-10">
              <button 
                onClick={handleCtaClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#FACC15] hover:bg-[#EAB308] text-[#111111] font-black rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              {urgencyText && (
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300 bg-gray-900/50 px-4 py-3 rounded-xl border border-gray-800">
                  <Timer className="w-5 h-5 text-red-500 animate-pulse" />
                  {urgencyText}
                </div>
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className="relative w-full md:w-2/5 min-h-[250px] md:min-h-full order-1 md:order-2">
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10" />
            <Image 
              src={imageUrl}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
