'use client'

/**
 * @file components/admin/ProductForm.tsx
 * @description Formulario para crear/editar productos en el panel admin.
 * Usa FormData, previsualización de imagen (Thumbnail) y estado de carga.
 */

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { UploadCloud, Save, XCircle, ArrowLeft } from 'lucide-react'
import { createProduct } from '@/app/actions/admin_MutacionesProducts'
import Link from 'next/link'

interface SelectOption {
  id: string
  name: string
}

interface ProductFormProps {
  categories: SelectOption[]
  brands: SelectOption[]
}

export default function ProductForm({ categories, brands }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  // Previsualización de imagen
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-generador de slug basado en el nombre
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    if (!slugTouched) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      )
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no puede superar los 5MB')
        return
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleClearImage = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await createProduct(formData)
      if (result.success) {
        router.push('/admin/productos')
      } else {
        setError(result.error || 'Error al guardar el producto')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
        <Link 
          href="/admin/productos" 
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al inventario
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-zinc-950 text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isPending ? (
            <div className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isPending ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Detalles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-5">
            <h2 className="text-lg font-medium text-white mb-4">Información Principal</h2>
            
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-zinc-400">Nombre del Producto *</label>
              <input
                required
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                placeholder="Ej. Taladro Percutor 850W"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="slug" className="text-sm font-medium text-zinc-400">Slug (URL) *</label>
                <input
                  required
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value)
                    setSlugTouched(true)
                  }}
                  pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                  title="Solo minúsculas y guiones"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                  placeholder="taladro-percutor-850w"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="sku" className="text-sm font-medium text-zinc-400">SKU / Referencia *</label>
                <input
                  required
                  id="sku"
                  name="sku"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all uppercase"
                  placeholder="CH-10293"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="short_desc" className="text-sm font-medium text-zinc-400">Descripción Corta (SEO / Cards) *</label>
              <input
                required
                id="short_desc"
                name="short_desc"
                maxLength={300}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                placeholder="Resumen del producto en 1 o 2 líneas..."
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className="text-sm font-medium text-zinc-400">Descripción Detallada (Opcional)</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all resize-none"
                placeholder="Especificaciones, usos recomendados, detalles técnicos..."
              />
            </div>
          </div>
        </div>

        {/* Columna Derecha: Imagen y Atributos */}
        <div className="space-y-6">
          
          {/* Tarjeta Imagen */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-medium text-white">Imagen del Producto</h2>
            
            <div className="relative group">
              {/* Input real oculto */}
              <input
                type="file"
                name="image"
                id="image"
                ref={fileInputRef}
                accept="image/webp,image/jpeg,image/png,image/avif"
                onChange={handleImageChange}
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 text-white rounded-md backdrop-blur-sm transition-all"
                    title="Quitar imagen"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full aspect-square border-2 border-zinc-800 border-dashed rounded-lg cursor-pointer bg-zinc-950/50 hover:bg-zinc-800/50 hover:border-yellow-400/50 transition-all group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-zinc-500 group-hover:text-yellow-400/80 transition-colors">
                    <UploadCloud className="w-10 h-10 mb-3" />
                    <p className="mb-2 text-sm font-medium text-center px-4">Haz clic para subir imagen</p>
                    <p className="text-xs text-center opacity-70">WEBP, PNG, JPG (Max. 5MB)</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Tarjeta Clasificación */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-medium text-white">Clasificación y Estado</h2>

            <div className="space-y-1.5">
              <label htmlFor="category_id" className="text-sm font-medium text-zinc-400">Categoría *</label>
              <select
                required
                id="category_id"
                name="category_id"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all appearance-none"
              >
                <option value="">Selecciona una categoría...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="brand_id" className="text-sm font-medium text-zinc-400">Marca *</label>
              <select
                required
                id="brand_id"
                name="brand_id"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all appearance-none"
              >
                <option value="">Selecciona una marca...</option>
                {brands.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="stock_status" className="text-sm font-medium text-zinc-400">Estado de Stock</label>
              <select
                id="stock_status"
                name="stock_status"
                defaultValue="available"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-400 transition-all appearance-none"
              >
                <option value="available">✅ Disponible</option>
                <option value="high-demand">🔥 Alta Demanda</option>
                <option value="new-batch">📦 Lote Nuevo</option>
                <option value="out-of-stock">❌ Agotado</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="unidad" className="text-sm font-medium text-zinc-400">Unidad</label>
                <input
                  id="unidad"
                  name="unidad"
                  defaultValue="und"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-400 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="is_casheable" className="text-sm font-medium text-zinc-400">¿Cashea?</label>
                <select
                  id="is_casheable"
                  name="is_casheable"
                  defaultValue="false"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-400 transition-all appearance-none"
                >
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}
