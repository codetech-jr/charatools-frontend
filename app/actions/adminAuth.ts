/**
 * @file app/actions/adminAuth.ts
 * @description Server Actions de autenticación del panel admin.
 *
 * loginAdmin  → Valida contraseña maestra → firma token HMAC → cookie HttpOnly
 * logoutAdmin → Borra cookie → redirect a /admin/login
 *
 * Seguridad implementada:
 *  - Comparación en tiempo constante (anti timing-attack)
 *  - Delay deliberado de 500ms en password incorrecto (anti brute-force)
 *  - Cookie HttpOnly + SameSite=Strict + Secure (prod) + MaxAge 12h
 */

'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signToken } from '@/lib/adminToken'

const COOKIE_NAME = 'admin_token'
const COOKIE_MAX_AGE_SECONDS = 12 * 60 * 60 // 12 horas

// ── Comparación en tiempo constante (anti timing-attack) ───────────────────

function timingSafeEqual(a: string, b: string): boolean {
  // Si longitudes distintas, siempre false — pero recorremos igual para no
  // filtrar info de longitud mediante timing diferencial
  const maxLen = Math.max(a.length, b.length)
  let diff = a.length ^ b.length
  for (let i = 0; i < maxLen; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return diff === 0
}

// ── Server Actions ─────────────────────────────────────────────────────────

export interface LoginResult {
  error?: string
  success?: boolean
}

/**
 * Valida la contraseña maestra y emite el token admin en cookie segura.
 * Redirige a /admin si es válido — no retorna en ese caso.
 */
export async function loginAdmin(formData: FormData): Promise<LoginResult> {
  const password = (formData.get('password') as string | null)?.trim() ?? ''

  if (!password) {
    return { error: 'Ingresa la contraseña.' }
  }

  const masterPassword = process.env.ADMIN_MASTER_PASSWORD?.trim() ?? ''

  if (!masterPassword) {
    console.error('[adminAuth] ADMIN_MASTER_PASSWORD no está configurado en el servidor.')
    return { error: 'Error de configuración. Contacta al administrador del sistema.' }
  }

  const isValid = timingSafeEqual(password, masterPassword)

  if (!isValid) {
    // Delay anti-brute-force: 500ms penalización por intento fallido
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { error: 'Contraseña incorrecta. Acceso denegado.' }
  }

  // Contraseña válida → firmar token y setear cookie
  const token = await signToken()
  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: '/',
  })

  return { success: true }
}

/**
 * Destruye la sesión admin borrando la cookie y redirige al login.
 */
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  redirect('/admin/login')
}
