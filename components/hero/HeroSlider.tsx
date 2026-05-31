'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SlideData {
  id: number
  title: string
  subtitle: string
  ctaText: string
  ctaLink?: string
  whatsappMsg?: string
  bgImage?: string
  overlayColor: string
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Charatools: el aliado de confianza que llegó para potenciar Charallave",
    subtitle: "Somos tu aliado de confianza con el stock más robusto de grifería, iluminación, electricidad, PVC y herramientas en los Valles del Tuy.",
    ctaText: "Ver Catálogo Completo",
    bgImage: "/negocio.webp",
    overlayColor: "bg-black/40",
  },
  {
    id: 2,
    title: "La Ferretería más grande y variada de Charallave",
    subtitle: "Encuentra el inventario más completo de los Valles del Tuy en nuestra tienda. Ubícanos fácilmente bajando por la misma calle de MRW hasta la siguiente cuadra, justo detrás de la Panadería D´Juan.",
    ctaText: "Ver ubicación en Google Maps",
    ctaLink: "/contacto",
    bgImage: "/negocio.webp",
    overlayColor: "bg-neutral-900/40",
  },
  {
    id: 3,
    title: "Ahorra en Grande este 2026",
    subtitle: "Únete a nuestra membresía y obtén descuentos en grifería, iluminación, electricidad, PVC, herramientas y más. Todo el inventario de Charatools con beneficios exclusivos por ser miembro.",
    ctaText: "Únete al Club VIP",
    ctaLink: "/membresia",
    bgImage: "/negocio.webp",
    overlayColor: "bg-black/50",
  },
]

interface HeroSliderProps {
  onOpenCatalog: () => void
}

export function HeroSlider({ onOpenCatalog }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    
    const intervalId = setInterval(() => {
      emblaApi.scrollNext()
    }, 12000)

    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(intervalId)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative w-full h-[85vh] md:h-[88vh] overflow-hidden bg-neutral-900">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden">
              <Image 
                src={slide.bgImage || "/negocio.webp"}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover object-[center_55%] md:object-[center_60%] lg:object-[center_60%] transition-transform duration-1000 brightness-[0.95] contrast-[1.05]"
                sizes="100vw"
              />
              
              {/* 2. Smoke Screen Gradient (Atmospheric Legibility Layer) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/60 to-transparent md:bg-gradient-to-r md:from-[#050505] md:via-[#050505]/80 md:to-transparent z-10" />



              {/* Content */}
              <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16 z-20">
                <div className="max-w-3xl w-full">
                  <div className="animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                      <span className="text-[10px] md:text-xs font-bold text-yellow-400 uppercase tracking-widest">
                        CharaTools • Charallave
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-zinc-50 leading-[1.1] mb-4 md:mb-6 drop-shadow-2xl text-balance max-w-2xl">
                      {slide.title}
                    </h1>
                    
                    <p className="text-base md:text-xl text-zinc-200/90 mb-8 max-w-xl leading-relaxed font-medium">
                      {slide.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        onClick={() => {
                          if (slide.ctaLink) window.location.href = slide.ctaLink
                          else onOpenCatalog()
                        }}
                        className="h-14 px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-lg rounded-2xl transition-all hover:scale-105 active:scale-95 group shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                      >
                        {slide.ctaText}
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                            const msg = slide.whatsappMsg || "Hola! Vengo de la web y quiero consultar por sus productos"
                            window.open(`https://wa.me/584220148405?text=${encodeURIComponent(msg)}`, '_blank')
                        }}
                        className="h-14 px-8 border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-lg rounded-2xl backdrop-blur-md transition-all"
                      >
                        <MessageCircle className="mr-2 w-5 h-5 text-green-400 fill-green-400/20" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all hidden md:flex z-30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all hidden md:flex z-30"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
              selectedIndex === index ? 'bg-yellow-400 w-20' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
