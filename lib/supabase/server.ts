/**
 * @file lib/supabase/server.ts
 * @description Supabase clients para Next.js App Router.
 *
 * Exporta dos variantes:
 *
 * 1. `createPublicSupabaseClient()` — Sin cookies, estático, para lectura
 *    pública (catálogo, páginas SSG/ISR). Permite pre-render en build time.
 *
 * 2. `createServerSupabaseClient()` — Con cookies vía @supabase/ssr, para
 *    rutas que necesiten sesión de usuario (reservado para Auth futuro).
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */

import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ── Variables de entorno (validadas en módulo) ─────────────────────────────

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ── Cliente 1: Lectura pública estática (sin cookies) ─────────────────────

/**
 * Supabase client para Server Components de lectura pública.
 *
 * - NO llama `cookies()` → compatible con rutas estáticas y SSG.
 * - Usa la Anon Key → solo acceso de lectura a tablas públicas.
 * - Apto para: catálogo, páginas de producto, landing pages.
 *
 * @example
 * const supabase = createPublicSupabaseClient()
 * const { data } = await supabase.from('products').select('*')
 */
export function createPublicSupabaseClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: {
      // Sin persistencia de sesión — cliente read-only anónimo
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

// ── Cliente 2: Dinámico con cookies (reservado para Auth futuro) ───────────

/**
 * Supabase client para Server Components/Actions que requieren sesión.
 *
 * - Llama `cookies()` → fuerza render dinámico en la ruta que lo use.
 * - Necesario cuando existan usuarios autenticados (checkout, dashboard, etc.).
 * - Por ahora no se usa en el catálogo público.
 *
 * @example
 * const supabase = await createServerSupabaseClient()
 * const { data: { user } } = await supabase.auth.getUser()
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      getAll() {
        try {
          return cookieStore.getAll()
        } catch {
          // Silencioso: contexto sin cookies (ej: componente público en build)
          return []
        }
      },
      setAll() {
        // No-op: sin Auth activo no necesitamos persistir cookies de sesión.
      },
    },
  })
}
