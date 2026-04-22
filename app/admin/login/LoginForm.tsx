'use client'

/**
 * @file app/admin/login/LoginForm.tsx
 * @description Formulario de acceso al panel admin. Client Component.
 * Usa useTransition para integración no-bloqueante con Server Action loginAdmin.
 */

import { useTransition, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin, type LoginResult } from '@/app/actions/adminAuth'
import { Eye, EyeOff, Lock, ShieldAlert, Loader2 } from 'lucide-react'

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result: LoginResult = await loginAdmin(formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        // Redirigir en el cliente previene que startTransition trague el error de redirect()
        router.push('/admin')
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Campo contraseña */}
      <div className="space-y-2">
        <label
          htmlFor="admin-password"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400"
        >
          <Lock className="w-3.5 h-3.5 text-yellow-400" />
          Contraseña Maestra
        </label>

        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            disabled={isPending}
            placeholder="••••••••••••"
            className={[
              'w-full rounded-lg px-4 py-3 pr-12',
              'bg-zinc-800 border text-white placeholder-zinc-600',
              'text-sm font-mono tracking-widest',
              'focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200',
              error
                ? 'border-red-500/70 bg-red-950/20'
                : 'border-zinc-700 hover:border-zinc-600',
            ].join(' ')}
          />

          {/* Botón toggle mostrar/ocultar */}
          <button
            type="button"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((v) => !v)}
            disabled={isPending}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-40"
          >
            {showPassword
              ? <EyeOff className="w-4 h-4" />
              : <Eye className="w-4 h-4" />
            }
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-400"
        >
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        id="admin-login-submit"
        disabled={isPending}
        className={[
          'w-full flex items-center justify-center gap-2.5',
          'rounded-lg px-6 py-3.5',
          'bg-yellow-400 text-zinc-900 font-bold text-sm uppercase tracking-widest',
          'hover:bg-yellow-300 active:bg-yellow-500',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'transition-all duration-200 shadow-lg shadow-yellow-400/20',
          'focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-zinc-900',
        ].join(' ')}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Verificando acceso...
          </>
        ) : (
          <>
            Ingresar al Panel
            <span className="text-zinc-900/70">→</span>
          </>
        )}
      </button>
    </form>
  )
}
