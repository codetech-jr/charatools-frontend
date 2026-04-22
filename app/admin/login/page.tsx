/**
 * @file app/admin/login/page.tsx
 * @description Página de acceso al panel administrativo CharaTools.
 * Server Component — diseño dark corporativo B2B.
 */

import type { Metadata } from 'next'
import { LoginForm } from './LoginForm'
import { Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Acceso Administrativo | CharaTools',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* ── Fondo: grid de puntos sutil ─────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Resplandor decorativo amarillo en esquina superior ──────────── */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #facc15 0%, transparent 70%)',
        }}
      />

      {/* ── Card principal ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md">

        {/* ── Header / Branding ─────────────────────────────────────────── */}
        <div className="text-center mb-8">

          {/* Logo icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 mb-5 shadow-lg shadow-yellow-400/5">
            <Zap className="w-8 h-8 text-yellow-400" fill="currentColor" />
          </div>

          {/* Nombre de marca */}
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">
            CHARA<span className="text-yellow-400">TOOLS</span>
          </h1>

          {/* Subtítulo corporativo */}
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Panel Administrativo B2B
          </p>

          {/* Separador decorativo */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-800" />
          </div>
        </div>

        {/* ── Card de formulario ────────────────────────────────────────── */}
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-black/40">

          <div className="mb-6">
            <h2 className="text-base font-bold text-white">Autenticación Segura</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Ingresa tu clave maestra para continuar
            </p>
          </div>

          <LoginForm />
        </div>

        {/* ── Disclaimer de seguridad ───────────────────────────────────── */}
        <div className="flex items-start gap-2.5 mt-6 px-2">
          <Shield className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-zinc-600">
            Área restringida. El acceso no autorizado está prohibido y puede ser
            registrado. Solo personal autorizado de CharaTools.
          </p>
        </div>

        {/* ── Footer mínimo ─────────────────────────────────────────────── */}
        <p className="text-center text-[10px] text-zinc-700 mt-5 tracking-widest uppercase">
          © {new Date().getFullYear()} CharaTools · Charallave, Vzla
        </p>
      </div>
    </main>
  )
}
