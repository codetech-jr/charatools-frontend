'use client'

import React, { useCallback, useEffect, useState } from 'react'
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
    title: "Tu herramienta ideal está en Charallave.",
    subtitle: "Somos la ferretería de confianza con el stock más robusto de los Valles del Tuy.",
    ctaText: "Ver Catálogo 100% Real",
    bgImage: "/negocio.png",
    overlayColor: "bg-black/40",
  },
  {
    id: 2,
    title: "Compra como un profesional, disfruta descuentos globales.",
    subtitle: "Únete a nuestra Membresía y maximiza tu presupuesto con ahorros en el total de tu cuenta.",
    ctaText: "Quiero mi Membresía",
    ctaLink: "/membresia",
    bgImage: "/negocio.png",
    overlayColor: "bg-blue-900/40",
  },

  {
    id: 4,
    title: "El inventario más grande de los Valles del Tuy.",
    subtitle: "Ubicados en el corazón de Charallave. Despacho inmediato para contratistas y hogar.",
    ctaText: "Cómo llegar / Ubicación",
    ctaLink: "/contacto",
    bgImage: "/negocio.png",
    overlayColor: "bg-neutral-900/40",
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
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-neutral-900">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 ${slide.overlayColor} backdrop-brightness-75`} />

              {/* Content */}
              <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
                <div className="max-w-3xl w-full">
                  <div className="bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/10 shadow-2xl animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/30">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                      <span className="text-[10px] md:text-xs font-bold text-yellow-400 uppercase tracking-widest">
                        CharaTools • Charallave
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 md:mb-6">
                      {slide.title}
                    </h1>
                    
                    <p className="text-base md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
                      {slide.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        onClick={() => {
                          if (slide.ctaLink) window.location.href = slide.ctaLink
                          else onOpenCatalog()
                        }}
                        className="h-14 px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-lg rounded-xl transition-all hover:scale-105 active:scale-95 group"
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
                        className="h-14 px-8 border-2 border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-lg rounded-xl backdrop-blur-sm transition-all"
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
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all hidden md:flex"
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
