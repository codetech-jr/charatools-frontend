import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Ferretería en Charallave | Charatools — Stock Real, Hoy',
  description: 'Ferretería en Charallave con stock real para urgencias del hogar. Herramientas InGco y Truper originales, asesoría directa por WhatsApp y retiro en tienda hoy.',
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

        {/* Privacidad y Consentimiento (Cookiebot) — Debe ir primero */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="a4fac7bb-8187-481f-a28e-f35eac167c2d"
            data-blockingmode="auto"
            strategy="beforeInteractive"
          />
        )}

        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId="G-LR949VYFD0" /> 
        )}
        {process.env.NODE_ENV === 'production' && (
          <Script 
            id="microsoft-clarity" 
            strategy="afterInteractive"
            data-cookieconsent="statistics"
          >
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wfvzed0fum");
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
