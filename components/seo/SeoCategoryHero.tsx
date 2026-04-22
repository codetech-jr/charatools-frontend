'use client'

/**
 * @file components/seo/SeoCategoryHero.tsx
 * @description Header semántico SEO que se renderiza ENCIMA del grid de productos.
 *
 * Diseño: Coherente con la paleta Amarillo/Blanco/Negro del proyecto (CharaTools).
 * - H1 predominante pero compacto (no consume pantalla en mobile).
 * - Párrafo descriptivo con line-height: 1.6 para máxima legibilidad.
 * - Separador visual (borde inferior) que delimita el Hero de los filtros.
 * - Totalmente parseable por Googlebot: sin texto oculto por JS.
 *
 * A11y: role="banner" en el <header>, color contrast ≥ 4.5:1 sobre bg oscuro.
 */

import React from 'react'

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface SeoCategoryHeroProps {
  /** H1 SEO de la categoría (ej: "Plantas Eléctricas en Charallave...") */
  title: string
  /** Párrafo corto introductorio. Máx recomendado: 160 caracteres */
  description: string
  /** Clase CSS adicional para personalización desde el padre (opcional) */
  className?: string
}

// ── Componente ───────────────────────────────────────────────────────────────

export function SeoCategoryHero({ title, description, className = '' }: SeoCategoryHeroProps) {
  return (
    <header
      role="banner"
      aria-label={`Categoría: ${title}`}
      className={`
        w-full
        bg-zinc-900
        border-b-2 border-yellow-400
        px-4 sm:px-6 py-5 sm:py-7
        ${className}
      `}
    >
      <div className="max-w-4xl">
        {/* Eyebrow label — ancla visual de categoría */}
        <p
          className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2"
          aria-hidden="true"
        >
          Catálogo ›
        </p>

        {/* H1 — Un solo H1 por página, obligatorio para SEO */}
        <h1
          className="
            text-white font-extrabold
            text-2xl sm:text-3xl lg:text-4xl
            leading-tight tracking-tight
            mb-3
          "
        >
          {title}
        </h1>

        {/* Descripción — visible, parseable, sin truncar */}
        <p
          className="
            text-zinc-300
            text-sm sm:text-base
            max-w-2xl
          "
          style={{ lineHeight: '1.6' }}
        >
          {description}
        </p>
      </div>
    </header>
  )
}
