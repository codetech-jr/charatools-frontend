'use client'

/**
 * @file components/seo/SeoCategoryFooter.tsx
 * @description Footer SEO con texto enriquecido renderizado DEBAJO del grid de productos.
 *
 * Estrategia de expansión de contenido (SEO-safe):
 * ─────────────────────────────────────────────────
 * El texto COMPLETO siempre está en el DOM. La visibilidad se controla via
 * max-height + overflow:hidden con transición CSS — NUNCA con display:none
 * ni montaje condicional agresivo. Esto garantiza que Googlebot indexa
 * el 100% del contenido en el primer render, sin importar el estado de React.
 *
 * Patrón UI: Acordeón (un bloque a la vez expandible independientemente).
 * Cada <SeoBlock> maneja su propio estado local de expansión.
 *
 * A11y:
 * - aria-expanded en el botón toggle.
 * - aria-controls apuntando al ID del panel de contenido.
 * - role="region" en el panel desplegable.
 *
 * Props:
 * - blocks: Array<{ subtitle: string; text: string }> — Bloques H2 + cuerpo.
 * - ctaSection: { closingText: string; ctaLabel: string; ctaHref: string }
 */

import React, { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface SeoBlock {
  /** Título H2 del bloque (keyword secundaria) */
  subtitle: string
  /** Cuerpo de texto. Acepta saltos de línea con \n o párrafos separados. */
  text: string
}

export interface CtaSection {
  /** Párrafo de cierre persuasivo */
  closingText: string
  /** Label del botón CTA */
  ctaLabel: string
  /** href del botón (puede ser WhatsApp link, ruta interna, etc.) */
  ctaHref: string
}

export interface SeoCategoryFooterProps {
  /** Bloques de contenido SEO (H2 + texto) */
  blocks: SeoBlock[]
  /** Sección de cierre con CTA */
  ctaSection: CtaSection
  /** Clase CSS adicional (opcional) */
  className?: string
}

// ── Sub-componente: Bloque individual en acordeón ────────────────────────────

interface SeoAccordionBlockProps extends SeoBlock {
  /** Índice para IDs únicos */
  index: number
}

function SeoAccordionBlock({ subtitle, text, index }: SeoAccordionBlockProps) {
  const [isOpen, setIsOpen] = useState(index === 0) // Primer bloque abierto por defecto
  const uid = useId()
  const panelId = `seo-panel-${uid}-${index}`
  const triggerId = `seo-trigger-${uid}-${index}`

  // Párrafos separados por \n (soporte multi-párrafo en la prop `text`)
  const paragraphs = text.split('\n').filter(Boolean)

  return (
    <div className="border-b border-zinc-800 last:border-b-0">
      {/* ── Cabecera del acordeón ── */}
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(prev => !prev)}
        className="
          w-full flex items-center justify-between
          py-4 px-0
          text-left
          group
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
          focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900
          rounded-sm
        "
      >
        <h2
          className="
            text-white font-semibold
            text-base sm:text-lg
            leading-snug
            group-hover:text-yellow-400
            transition-colors duration-200
          "
        >
          {subtitle}
        </h2>

        {/* Ícono animado */}
        <ChevronDown
          className={`
            w-5 h-5 shrink-0 ml-3
            text-yellow-400
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
          aria-hidden="true"
        />
      </button>

      {/*
       * ── Panel de contenido ──────────────────────────────────────────────────
       * CRÍTICO SEO: El contenido SIEMPRE existe en el DOM.
       * La visibilidad se maneja con max-height + overflow:hidden + CSS transition.
       * Googlebot indexa el texto en estado colapsado sin problema.
       */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0 pb-5 space-y-3">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-zinc-400 text-sm sm:text-base"
              style={{ lineHeight: '1.7' }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Componente Principal ─────────────────────────────────────────────────────

export function SeoCategoryFooter({
  blocks,
  ctaSection,
  className = '',
}: SeoCategoryFooterProps) {
  return (
    <footer
      aria-label="Información de categoría y asesoría"
      className={`
        w-full
        bg-zinc-900
        border-t-2 border-yellow-400
        px-4 sm:px-6
        pt-8 pb-10
        ${className}
      `}
    >
      <div className="max-w-4xl mx-auto">
        {/* ── Acordeón de bloques SEO ── */}
        <div
          role="list"
          aria-label="Guía de compra y asesoría técnica"
        >
          {blocks.map((block, i) => (
            <div key={i} role="listitem">
              <SeoAccordionBlock
                subtitle={block.subtitle}
                text={block.text}
                index={i}
              />
            </div>
          ))}
        </div>

        {/* ── CTA de cierre ── */}
        {ctaSection && (
          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p
              className="text-zinc-300 text-sm sm:text-base mb-5 max-w-xl mx-auto"
              style={{ lineHeight: '1.7' }}
            >
              {ctaSection.closingText}
            </p>
            <a
              href={ctaSection.ctaHref}
              target={ctaSection.ctaHref.startsWith('http') ? '_blank' : undefined}
              rel={ctaSection.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="
                inline-flex items-center justify-center gap-2
                bg-yellow-400 text-zinc-900
                font-bold text-sm sm:text-base
                px-6 py-3
                rounded-lg
                hover:bg-yellow-300
                active:scale-95
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
                focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900
              "
              aria-label={ctaSection.ctaLabel}
            >
              {ctaSection.ctaLabel}
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}
