import type { MetadataRoute } from 'next'

/**
 * @file app/robots.ts
 * @description Configuración de robots.txt para CharaTools.
 * Conforme a Next.js App Router MetadataRoute y directrices de seo-audit.md.
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://charatools.com.ve').replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/admin/*',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
