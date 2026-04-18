import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CharaTools - Ferretería Oficial INGCO',
  description: 'Distribuidor oficial INGCO. Herramientas, plomería, pintura y material eléctrico. Cotiza por WhatsApp en minutos.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { Navbar } from '@/components/global/Navbar'
import { BrandTicker } from '@/components/sections/BrandTicker'
import { QuotationDrawer } from '@/components/quotation/QuotationDrawer'
import { Footer } from '@/components/global/Footer'
import { WhatsAppFAB } from '@/components/global/WhatsAppFAB'

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal?: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen" suppressHydrationWarning>
        <BrandTicker />
        <Navbar />

        <div className="flex-1">
          {children}
          {modal}
        </div>

        <Footer />

        {/* Elementos flotantes globales */}
        <QuotationDrawer />
        <WhatsAppFAB />

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
