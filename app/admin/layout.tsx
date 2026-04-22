/**
 * @file app/admin/layout.tsx
 * @description Layout aislado del panel admin.
 *
 * Usa position:fixed full-screen para cubrir el layout público (Navbar/Footer)
 * sin necesidad de refactorizar las rutas existentes con route groups.
 * El middleware ya protege todas las rutas /admin/* — este layout es solo UI shell.
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Panel Admin | CharaTools',
    template: '%s | Admin CharaTools',
  },
  // ⚠️ Crítico: ocultar el panel de motores de búsqueda
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // Overlay full-screen sobre el layout público — aísla completamente la UI admin
    <div className="fixed inset-0 z-[9999] bg-zinc-950 overflow-auto">
      {children}
    </div>
  )
}
