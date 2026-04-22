'use client'

/**
 * @file components/admin/AdminShell.tsx
 * @description Shell del panel admin: sidebar + área de contenido.
 * Client Component — usa usePathname para highlights de nav activo.
 */

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Package, PlusCircle, LogOut, Zap } from 'lucide-react'
import { logoutAdmin } from '@/app/actions/adminAuth'
import { useTransition } from 'react'

const NAV_ITEMS = [
  { href: '/admin',              icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/productos',    icon: Package,         label: 'Productos' },
  { href: '/admin/productos/nuevo', icon: PlusCircle,   label: 'Nuevo Producto' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => { await logoutAdmin() })
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <aside className="w-56 shrink-0 flex flex-col border-r border-zinc-800 bg-zinc-900/60">

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
          </div>
          <div>
            <p className="text-sm font-black tracking-tight leading-none">
              CHARA<span className="text-yellow-400">TOOLS</span>
            </p>
            <p className="text-[9px] uppercase tracking-widest text-zinc-500 mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800',
                ].join(' ')}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-150 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {isPending ? 'Saliendo…' : 'Cerrar sesión'}
          </button>
        </div>
      </aside>

      {/* ── Content ───────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
