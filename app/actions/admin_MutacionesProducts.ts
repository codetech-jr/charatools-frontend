'use server'

/**
 * @file app/actions/admin_MutacionesProducts.ts
 * @description Server Actions CRUD para el panel admin de productos.
 *
 * Todas las funciones verifican el token admin antes de ejecutar.
 * Usa createAdminSupabaseClient() (Service Role Key — bypasea RLS).
 *
 * Exports:
 *  - uploadProductImage(formData) → sube a bucket 'product-images'
 *  - createProduct(formData)      → valida Zod + upload + INSERT products
 *  - updateProductStatus(id, updates) → toggle is_casheable / stock_status
 *  - deleteProduct(id)            → DELETE + revalidate catálogo
 */

import { z } from 'zod'
import { cookies } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'
import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { verifyToken } from '@/lib/adminToken'

// ── Guard auth ─────────────────────────────────────────────────────────────

async function requireAuth(): Promise<void> {
  const store = await cookies()
  const token = store.get('admin_token')?.value
  if (!token) throw new Error('No autorizado')
  const payload = await verifyToken(token)
  if (!payload) throw new Error('Token inválido o expirado')
}

// ── Tipos ──────────────────────────────────────────────────────────────────

export interface ActionResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// ── Schemas Zod ────────────────────────────────────────────────────────────

const STOCK_STATUSES = ['available', 'high-demand', 'new-batch', 'out-of-stock'] as const

const ProductSchema = z.object({
  name:        z.string().min(3).max(120).trim(),
  slug:        z.string().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Solo minúsculas y guiones').trim(),
  sku:         z.string().min(2).max(50).trim().toUpperCase(),
  short_desc:  z.string().max(300).trim(),
  description: z.string().max(2000).optional(),
  category_id: z.string().uuid('Categoría inválida'),
  brand_id:    z.string().uuid('Marca inválida'),
  is_casheable: z.coerce.boolean().default(false),
  stock_status: z.enum(STOCK_STATUSES).default('available'),
  unidad:      z.string().default('und'),
})

const StatusFlagsSchema = z.object({
  is_casheable: z.boolean().optional(),
  stock_status: z.enum(STOCK_STATUSES).optional(),
})

export type StatusFlags = z.infer<typeof StatusFlagsSchema>

// ── Upload imagen → Supabase Storage ──────────────────────────────────────

const BUCKET        = 'product-images'
const MAX_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_MIME  = ['image/webp', 'image/jpeg', 'image/png', 'image/avif']

export async function uploadProductImage(
  formData: FormData,
): Promise<ActionResult<{ url: string }>> {
  try {
    await requireAuth()

    const file = formData.get('image') as File | null
    if (!file || file.size === 0) return { success: false, error: 'No se recibió imagen.' }
    if (file.size > MAX_SIZE_BYTES)  return { success: false, error: 'Imagen debe ser menor a 5 MB.' }
    if (!ALLOWED_MIME.includes(file.type)) {
      return { success: false, error: 'Formato no válido. Usa WebP, JPEG, PNG o AVIF.' }
    }

    const supabase = createAdminSupabaseClient()
    const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'webp'
    const safeName = file.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const path     = `productos/${Date.now()}-${safeName}.${ext}`

    const buffer = await file.arrayBuffer()
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false })

    if (error) {
      console.error('[uploadProductImage]', error)
      return { success: false, error: error.message }
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return { success: true, data: { url: publicUrl } }

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[uploadProductImage]', msg)
    return { success: false, error: msg }
  }
}

// ── createProduct ──────────────────────────────────────────────────────────

export async function createProduct(
  formData: FormData,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAuth()

    // 1. Validar con Zod
    const parsed = ProductSchema.safeParse({
      name:        formData.get('name'),
      slug:        formData.get('slug'),
      sku:         formData.get('sku'),
      short_desc:  formData.get('short_desc'),
      description: formData.get('description') || undefined,
      category_id: formData.get('category_id'),
      brand_id:    formData.get('brand_id'),
      is_casheable: formData.get('is_casheable') === 'true',
      stock_status: formData.get('stock_status'),
      unidad:      formData.get('unidad') ?? 'und',
    })

    if (!parsed.success) {
      const e = parsed.error.errors[0]
      return { success: false, error: `${String(e.path[0])}: ${e.message}` }
    }

    const { name, slug, sku, short_desc, description,
            category_id, brand_id, is_casheable, stock_status, unidad } = parsed.data

    // 2. Upload imagen (opcional)
    let imageUrl = '/placeholder-product.webp'
    const imgFile = formData.get('image') as File | null
    if (imgFile && imgFile.size > 0) {
      const upFd = new FormData()
      upFd.set('image', imgFile)
      const up = await uploadProductImage(upFd)
      if (!up.success) return { success: false, error: up.error }
      imageUrl = up.data!.url
    }

    // 3. JSONB specs
    const specs = { imagen: imageUrl, stockStatus: stock_status, unidad, tags: [] }

    // 4. INSERT
    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase
      .from('products')
      .insert({ name, slug, sku, short_desc, description: description ?? null,
                category_id, brand_id, is_casheable, specs })
      .select('id')
      .single()

    if (error) {
      if (error.code === '23505') return { success: false, error: 'Ya existe un producto con ese slug o SKU.' }
      return { success: false, error: error.message }
    }

    // 5. Revalidar caché catálogo público
    revalidatePath('/catalogo', 'layout')
    revalidatePath('/admin/productos', 'page')

    return { success: true, data: { id: data.id } }

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[createProduct]', msg)
    return { success: false, error: msg }
  }
}

// ── updateProductStatus ────────────────────────────────────────────────────

export async function updateProductStatus(
  productId: string,
  updates: StatusFlags,
): Promise<ActionResult> {
  try {
    await requireAuth()
    if (!productId) return { success: false, error: 'ID requerido.' }

    const parsed = StatusFlagsSchema.safeParse(updates)
    if (!parsed.success) return { success: false, error: 'Datos inválidos.' }

    const { is_casheable, stock_status } = parsed.data
    const supabase = createAdminSupabaseClient()

    // Actualizar is_casheable
    if (is_casheable !== undefined) {
      const { error } = await supabase
        .from('products')
        .update({ is_casheable })
        .eq('id', productId)
      if (error) return { success: false, error: error.message }
    }

    // Actualizar specs.stockStatus — read-modify-write
    if (stock_status !== undefined) {
      const { data: row, error: fetchErr } = await supabase
        .from('products').select('specs').eq('id', productId).single()
      if (fetchErr) return { success: false, error: fetchErr.message }

      const updatedSpecs = { ...(row?.specs as Record<string, unknown> ?? {}), stockStatus: stock_status }
      const { error: upErr } = await supabase
        .from('products').update({ specs: updatedSpecs }).eq('id', productId)
      if (upErr) return { success: false, error: upErr.message }
    }

    revalidatePath('/catalogo', 'layout')
    revalidatePath('/admin/productos', 'page')
    return { success: true }

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[updateProductStatus]', msg)
    return { success: false, error: msg }
  }
}

// ── deleteProduct ──────────────────────────────────────────────────────────

export async function deleteProduct(productId: string): Promise<ActionResult> {
  try {
    await requireAuth()
    if (!productId) return { success: false, error: 'ID requerido.' }

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase.from('products').delete().eq('id', productId)

    if (error) {
      console.error('[deleteProduct]', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/catalogo', 'layout')
    revalidatePath('/admin/productos', 'page')
    return { success: true }

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[deleteProduct]', msg)
    return { success: false, error: msg }
  }
}
