/**
 * @file lib/adminToken.ts
 * @description Firma y verificación de tokens admin usando HMAC-SHA256 (Web Crypto API).
 * Compatible con Edge Runtime (middleware) y Node.js (server actions).
 * Token = base64url(payload).base64url(hmac-signature) — expiración 12h.
 */

const EXPIRY_MS = 12 * 60 * 60 * 1000 // 12 horas laborales

export interface AdminTokenPayload {
  role: 'charatools_admin'
  iat: number // issued at (ms)
  exp: number // expiry (ms)
}

// ── Helpers base64url ──────────────────────────────────────────────────────

function toBase64url(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Decodifica base64url a Uint8Array */
function fromBase64url(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

// ── Clave HMAC ─────────────────────────────────────────────────────────────

async function getHmacKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_MASTER_PASSWORD?.trim()
  if (!secret) throw new Error('[adminToken] ADMIN_MASTER_PASSWORD no definido')

  return globalThis.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

// ── API pública ────────────────────────────────────────────────────────────

/**
 * Genera un token firmado con HMAC-SHA256 válido por 12 horas.
 */
export async function signToken(): Promise<string> {
  const now = Date.now()
  const payload: AdminTokenPayload = {
    role: 'charatools_admin',
    iat: now,
    exp: now + EXPIRY_MS,
  }

  const payloadB64 = toBase64url(new TextEncoder().encode(JSON.stringify(payload)))
  const key = await getHmacKey()
  const sigBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payloadB64),
  )

  return `${payloadB64}.${toBase64url(sigBuffer)}`
}

/**
 * Verifica un token y retorna el payload si es válido.
 * Retorna `null` si la firma es incorrecta, el token está expirado o malformado.
 */
export async function verifyToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const [payloadB64, sigB64] = token.split('.')
    if (!payloadB64 || !sigB64) return null

    const key = await getHmacKey()
    const valid = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64url(sigB64),
      new TextEncoder().encode(payloadB64),
    )
    if (!valid) return null

    const payload: AdminTokenPayload = JSON.parse(
      new TextDecoder().decode(fromBase64url(payloadB64)),
    )

    if (Date.now() > payload.exp) return null
    if (payload.role !== 'charatools_admin') return null

    return payload
  } catch (error) {
    console.error('[verifyToken] Error verificando token:', error)
    return null
  }
}
