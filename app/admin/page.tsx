/**
 * @file app/admin/page.tsx
 * @description Dashboard home del panel admin. Server Component.
 * Placeholder MVP — se expande con stats reales en Priority 3.
 */

import { LayoutDashboard, Package, ImagePlus, LogOut } from 'lucide-react'
import Link from 'next/link'
import { logoutAdmin } from '@/app/actions/adminAuth'

const NAV_ITEMS = [
  {
    href: '/admin/productos',
    icon: Package,
    label: 'Gestionar Productos',
    description: 'Ver, editar y cambiar estado del catálogo',
    accent: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
  },
  {
    href: '/admin/productos/nuevo',
    icon: ImagePlus,
    label: 'Subir Producto',
    description: 'Agregar nuevo producto con imagen al catálogo',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/20',
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6 text-yellow-400" />
          <div>
            <h1 className="text-lg font-black tracking-tight">
              CHARA<span className="text-yellow-400">TOOLS</span>
              <span className="ml-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Admin
              </span>
            </h1>
            <p className="text-xs text-zinc-600">Panel de Control B2B</p>
          </div>
        </div>

        {/* Logout */}
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-400/10 border border-transparent hover:border-red-400/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar sesión
          </button>
        </form>
      </header>

      {/* ── Bienvenida ──────────────────────────────────────────────── */}
      <div className="mb-10 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        <p className="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-1">
          ✓ Sesión activa
        </p>
        <h2 className="text-2xl font-black text-white">
          Bienvenido al Panel de Control
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Gestiona el catálogo de productos CharaTools desde aquí.
        </p>
      </div>

      {/* ── Accesos rápidos ─────────────────────────────────────────── */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
          Acciones disponibles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {NAV_ITEMS.map(({ href, icon: Icon, label, description, accent, bg }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${bg}`}>
                <Icon className={`w-5 h-5 ${accent}`} />
              </div>
              <div>
                <p className="font-bold text-sm text-white group-hover:text-yellow-400 transition-colors">
                  {label}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer info ─────────────────────────────────────────────── */}
      <footer className="mt-16 pt-6 border-t border-zinc-900">
        <p className="text-xs text-zinc-700">
          Panel Admin MVP · Priority 3 expandirá este dashboard con stats, tablas y CRUD completo.
        </p>
      </footer>
    </div>
  )
}
