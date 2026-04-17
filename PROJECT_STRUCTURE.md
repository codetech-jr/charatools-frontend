# 📁 Estructura del Proyecto CharaTools

## Organización de Carpetas

```
chara-tools/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout con metadatos
│   ├── globals.css                # Estilos globales y tokens de diseño
│   ├── page.tsx                   # Home page (landing page completa)
│   └── icon.svg, icon*.png        # Favicons
│
├── components/
│   ├── global/                    # Componentes globales
│   │   ├── Navbar.tsx             # Navegación sticky con QuotationTrigger
│   │   └── TrustBar.tsx           # Barra de autoridad scrolleable
│   │
│   ├── hero/                      # Sección hero
│   │   └── HeroSection.tsx        # Sección principal con CTAs
│   │
│   ├── catalog/                   # Catálogo de productos
│   │   ├── CategoryGrid.tsx       # Grilla de 4 categorías
│   │   ├── ProductGrid.tsx        # Grilla responsiva de productos
│   │   └── ProductCard.tsx        # Tarjeta individual de producto
│   │
│   ├── quotation/                 # Sistema de cotización
│   │   └── QuotationDrawer.tsx    # Drawer/Modal off-canvas con lista
│   │
│   ├── ui/                        # Componentes Shadcn/ui (no editar)
│   │   ├── button.tsx
│   │   ├── input.tsx              # Personalizado para CharaTools
│   │   ├── drawer.tsx             # Radix UI Drawer
│   │   ├── label.tsx
│   │   └── ... (otros componentes shadcn)
│   │
│   └── theme-provider.tsx         # Next Themes provider
│
├── context/                       # React Context para estado global
│   └── QuotationContext.tsx       # Estado de la lista de cotización
│
├── hooks/                         # React Hooks personalizados
│   ├── use-mobile.ts              # Detección de mobile
│   └── use-toast.ts               # Toast notifications
│
├── lib/                           # Librerías y utilidades
│   └── utils.ts                   # Función cn() para combinar clases
│
├── data/                          # Datos estáticos
│   └── products.json              # Datos de productos de referencia
│
├── public/                        # Archivos estáticos
│   ├── hero-tools.jpg             # Imagen hero principal
│   ├── product-led.jpg            # Imagen de ejemplo para productos
│   ├── icon.svg                   # Logo del sitio
│   └── ... (otros archivos estáticos)
│
├── styles/                        # Estilos (algunos por compatibilidad)
│   └── globals.css                # Alternativa a app/globals.css
│
├── tailwind.config.ts             # Configuración Tailwind con tokens CharaTools
├── next.config.mjs                # Configuración Next.js
├── tsconfig.json                  # Configuración TypeScript
├── package.json                   # Dependencias y scripts
├── components.json                # Config para Shadcn CLI
│
├── README.md                      # Documentación principal
├── CUSTOMIZE.md                   # Guía de personalización
├── PROJECT_STRUCTURE.md           # Este archivo
│
└── node_modules/                  # Dependencias instaladas (no editar)
```

## Archivos Clave por Funcionalidad

### 🎨 Diseño y Estilos
- `app/globals.css` - Tokens de color, animaciones, estilos base
- `tailwind.config.ts` - Configuración de Tailwind con paleta CharaTools
- `components/ui/input.tsx` - Input personalizado para la paleta

### 🏠 Página Principal
- `app/page.tsx` - Punto de entrada, contiene toda la lógica de la landing
- `app/layout.tsx` - HTML root, metadatos, Analytics

### 🧩 Componentes Principales
| Componente | Ruta | Responsabilidad |
|-----------|------|-----------------|
| Navbar | `components/global/Navbar.tsx` | Navegación, trigger de carrito |
| TrustBar | `components/global/TrustBar.tsx` | Sellos de confianza |
| HeroSection | `components/hero/HeroSection.tsx` | Sección principal con CTAs |
| CategoryGrid | `components/catalog/CategoryGrid.tsx` | Filtro de categorías |
| ProductGrid | `components/catalog/ProductGrid.tsx` | Grilla de productos |
| ProductCard | `components/catalog/ProductCard.tsx` | Tarjeta individual + agregar |
| QuotationDrawer | `components/quotation/QuotationDrawer.tsx` | Carrito flotante + WhatsApp |

### 🧠 Estado Global
- `context/QuotationContext.tsx` - Gestiona lista de cotización
- Proporciona `useQuotation()` hook para acceder al estado en cualquier componente

### 📱 Responsive Design
Todos los componentes son mobile-first:
- **base** (< 640px) - Mobile
- **md** (768px) - Tablet
- **lg** (1024px) - Desktop
- **xl** (1280px) - Desktop ancho

## Flujo de Datos

```
QuotationContext (Provider en page.tsx)
    ↓
  useQuotation() hook
    ↓
Componentes:
  - Navbar (muestra counter)
  - ProductCard (agrega items)
  - QuotationDrawer (lista items)
```

## Dependencias Principales

```json
{
  "react": "^19",                          // UI framework
  "next": "16.2.0",                        // Framework
  "typescript": "5.7.3",                   // Type safety
  "tailwindcss": "^4.2.0",                // Styling
  "@radix-ui/*": "latest",                // Headless UI
  "lucide-react": "^0.564.0",              // Icons
  "class-variance-authority": "^0.7.1",   // Component variants
  "clsx": "^2.1.1",                       // Conditional classnames
  "vaul": "^1.1.2",                       // Drawer primitive
  "@vercel/analytics": "1.6.1"            // Analytics
}
```

## Configuración de Paths

En `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]  // Permite importar con @/path
}
```

Ejemplo de uso:
```tsx
import { Navbar } from '@/components/global/Navbar'
import { useQuotation } from '@/context/QuotationContext'
```

## Build y Deploy

### Desarrollo
```bash
pnpm dev      # Inicia servidor en localhost:3000
```

### Build Producción
```bash
pnpm build    # Compila a .next/
pnpm start    # Inicia servidor de producción
```

### Deploy a Vercel
```bash
# 1. Push a GitHub
# 2. Conecta repo a vercel.com
# 3. Deploy automático en cada push
```

## Convenciones del Proyecto

### Nombres de Archivos
- Componentes: PascalCase (ej: `ProductCard.tsx`)
- Utilities/Hooks: camelCase (ej: `useQuotation.ts`)
- Context: Sufijo Context (ej: `QuotationContext.tsx`)

### Estructura de Componentes
```tsx
'use client'  // Client component declaration

import React from 'react'
import { Icon } from 'lucide-react'

interface ComponentProps {
  title: string
}

export function Component({ title }: ComponentProps) {
  return (
    <div>
      {title}
    </div>
  )
}
```

### Estilos Tailwind
- Responsive: mobile-first (base → md → lg → xl)
- Colores: usar tokens brand (ej: `bg-brand-primary`)
- Espaciado: usar escala Tailwind (p-4, gap-6, etc)

### Accesibilidad
- Semántica HTML (header, nav, section, article)
- ARIA labels en elementos interactivos
- Focus visible en botones y links
- Touch targets mínimos de 44x44px

## Variables de Entorno

No se requieren variables de entorno para desarrollo.

Para producción, considera:
```env
# Opcional
NEXT_PUBLIC_WHATSAPP_NUMBER=584241234567
NEXT_PUBLIC_GA_ID=your-ga-id
```

## Performance

### Optimizaciones Incluidas
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ CSS purging
- ✅ Analytics ligero de Vercel
- ✅ HTML minification

### Mejoras Sugeridas
- [ ] Agregar Service Worker para offline
- [ ] Implementar PWA manifest
- [ ] Agregar preload de fuentes
- [ ] Implementar image CDN

## Testing

No hay configuración de testing incluida.

Para agregar:
```bash
pnpm add -D vitest @testing-library/react
```

## Troubleshooting

### El sitio no se carga
1. Verifica que Next.js esté ejecutándose: `pnpm dev`
2. Comprueba que el puerto 3000 esté disponible
3. Limpia caché y refresca: Ctrl+Shift+Del

### Los estilos no se aplican
1. Verifica que el archivo esté en `app/` o `components/`
2. Comprueba que uses `className` en JSX
3. Intenta rebuild: `pnpm dev` (Ctrl+C y nuevamente)

### Los colores no cambian
1. Edita `app/globals.css` en la sección `:root`
2. O edita `tailwind.config.ts` en colors.brand
3. Asegúrate de recargar el navegador (no solo refresh)

---

**Última actualización**: Abril 2026  
**Versión**: 1.0.0  
**Mantenedor**: CharaTools Dev Team
