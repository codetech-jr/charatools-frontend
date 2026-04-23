/**
 * @file proxy.ts
 * @description Proxy/Middleware Next.js — Protección de rutas /admin + Headers OWASP.
 *
 * Estrategia de seguridad:
 *  1. Headers OWASP aplicados a TODAS las rutas (X-Frame-Options, nosniff, etc.)
 *  2. Rutas /admin/* requieren cookie admin_token válida (HMAC-SHA256, 12h)
 *  3. /admin/login redirige al dashboard si ya hay sesión activa
 *  4. Token inválido/expirado → borra cookie y redirige al login
 */

import { NextResponse, type NextRequest } from 'next/server'
import { verifyToken } from '@/lib/adminToken'

const COOKIE_NAME = 'admin_token'

// ── Headers de seguridad OWASP ─────────────────────────────────────────────

function applySecurityHeaders(response: NextResponse): NextResponse {
  // Anti-clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  // Evita MIME-sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  // Control de referrer
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  // XSS filter legado (IE/Edge antiguos)
  response.headers.set('X-XSS-Protection', '1; mode=block')
  // Deshabilitar funcionalidades no usadas
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  // HSTS en producción
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    )
  }
  return response
}

function applyAdminCsp(response: NextResponse): NextResponse {
  const isDev = process.env.NODE_ENV !== 'production'
  
  // En desarrollo permitimos eval y conexiones locales (HMR/Turbopack)
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'"

  const connectSrc = isDev
    ? `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''} ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:*`
    : `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}`

  // CSP estricta solo para rutas /admin
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      connectSrc,
      "img-src 'self' data: blob: https:",
      "frame-ancestors 'none'", // refuerza X-Frame-Options
    ].join('; '),
  )
  return response
}

// ── Middleware principal ───────────────────────────────────────────────────

export default async function middleware(request: NextRequest) {
  return mainMiddleware(request)
}

export async function mainMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Rutas no-admin: solo headers OWASP básicos ─────────────────────────
  if (!pathname.startsWith('/admin')) {
    return applySecurityHeaders(NextResponse.next())
  }

  // ── /admin/login: si ya tiene sesión válida → redirigir al dashboard ───
  if (pathname.startsWith('/admin/login')) {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (token) {
      const payload = await verifyToken(token)
      if (payload) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }
    const res = applySecurityHeaders(NextResponse.next())
    return applyAdminCsp(res)
  }

  // ── /admin/* protegido: validar token ──────────────────────────────────
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const payload = await verifyToken(token)

  if (!payload) {
    // Token inválido o expirado → limpiar cookie y redirigir
    const loginUrl = new URL('/admin/login', request.url)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete(COOKIE_NAME)
    return response
  }

  // Token válido: dejar pasar con headers de seguridad
  const res = applySecurityHeaders(NextResponse.next())
  return applyAdminCsp(res)
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image  (optimización de imágenes)
     * - favicon.ico, íconos y archivos de fuentes
     */
    '/((?!_next/static|_next/image|favicon|.*\\.(?:png|jpg|jpeg|svg|ico|webp|woff2?)$).*)',
  ],
}
