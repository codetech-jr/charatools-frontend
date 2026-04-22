/**
 * @file app/catalogo/[category]/loading.tsx
 * @description Skeleton de Page Load para transiciones instantáneas UX (Next.js)
 */

import React from 'react'

export default function LoadingCategoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 animate-pulse" aria-busy="true" aria-label="Cargando categoría">
      {/* ── Hero Skeleton ── */}
      <div className="h-48 md:h-56 bg-zinc-900 w-full flex items-center px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-4xl space-y-4">
           <div className="h-8 md:h-10 bg-zinc-800 rounded-lg w-3/4 max-w-lg" />
           <div className="h-4 bg-zinc-800 rounded-lg w-full" />
           <div className="h-4 bg-zinc-800 rounded-lg w-5/6" />
        </div>
      </div>
      
      {/* ── Layout del Catálogo Skeleton ── */}
      <div className="flex flex-1 max-w-full overflow-hidden">
        {/* Sidebar Desktop Skeleton */}
        <div className="hidden lg:block w-[260px] bg-white border-r border-gray-200 p-4 space-y-5">
          {/* Header filtros */}
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-6" />
          
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`sidebar-${i}`} className="space-y-3">
              <div className="h-5 bg-gray-200 rounded w-1/2" />
              <div className="space-y-2 pl-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Grid Skeleton */}
        <div className="flex-1 p-4 lg:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded-lg w-40" />
            <div className="flex gap-2">
              <div className="h-9 w-32 bg-gray-200 rounded-lg" />
              <div className="h-9 w-20 bg-gray-200 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`card-${i}`} className="bg-white p-3 md:p-4 rounded-xl border border-gray-200 space-y-4 h-[340px] flex flex-col">
                <div className="w-full h-40 bg-gray-100 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-300 rounded w-full" />
                  <div className="h-4 bg-gray-300 rounded w-4/5" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded-full w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
