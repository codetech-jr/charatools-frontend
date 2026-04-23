# 🎨 Guía de Personalización - CharaTools

Esta guía te ayudará a personalizar los aspectos principales de tu landing page CharaTools.

## 1. Cambiar Colores de Marca

### Opción A: Editar CSS Custom Properties
Archivo: `app/globals.css`

```css
:root {
  /* Cambia estos valores */
  --brand-primary: #D4500A;      /* Tu color principal */
  --brand-dark: #A03D08;         /* Tu color hover */
  --brand-surface: #1A1A1A;      /* Fondo de cards */
  --brand-bg: #0A0A0A;           /* Fondo global */
  --brand-text: #F5F5F5;         /* Texto principal */
  --brand-muted: #9CA3AF;        /* Texto secundario */
}
```

### Opción B: Editar Tailwind Config
Archivo: `tailwind.config.ts`

```ts
colors: {
  brand: {
    primary: '#TU_COLOR_PRIMARIO',
    dark: '#TU_COLOR_OSCURO',
    // ... más colores
  }
}
```

**Ejemplo para cambiar a Verde:**
```
#00B050  → Primary
#008000  → Dark
#1A1A1A  → Surface (igual)
#0A0A0A  → BG (igual)
```

## 2. Cambiar Contenido del Sitio

### Navbar
Archivo: `components/global/Navbar.tsx`

```tsx
// Cambiar logo
<span className="hidden sm:inline font-bold text-brand-text text-lg">
  TU_NOMBRE_TIENDA  {/* Aquí */}
</span>
```

### Hero Section
Archivo: `components/hero/HeroSection.tsx`

```tsx
// Headline
<h1>Tu nuevo headline aquí</h1>

// Subheadline
<p>Tu descripción aquí</p>

// Imagen
<img src="/tu-imagen.jpg" alt="Tu alt text" />
```

### Categorías
Archivo: `components/catalog/CategoryGrid.tsx`

```tsx
const categories: Category[] = [
  {
    id: '1',
    slug: 'tu-categoria',
    icon: <TuIcono />,
    title: 'Tu título descriptivo',
    shortTitle: 'Corto',
  },
  // ... más categorías
]
```

## 3. Agregar/Editar Productos

### Opción A: Editar en la página
Archivo: `app/page.tsx`

```tsx
const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Nombre del Producto',
    shortDescription: 'Descripción breve (max 80 chars)',
    category: 'Tu Categoría',
    image: 'https://url-de-imagen.jpg',
    status: 'available', // o 'high-demand', 'new-batch', 'out-of-stock'
  },
  // ... más productos
]
```

### Opción B: Crear archivo de datos
Archivo: `data/products.json`

```json
{
  "products": [
    {
      "id": "1",
      "name": "Producto 1",
      "shortDescription": "Descripción",
      "category": "Categoría",
      "image": "url-imagen",
      "status": "available"
    }
  ]
}
```

Luego importar en `app/page.tsx`:
```tsx
import products from '@/data/products.json'

// Usar en lugar de SAMPLE_PRODUCTS
const SAMPLE_PRODUCTS = products.products
```

## 4. Cambiar WhatsApp

Archivo: `components/quotation/QuotationDrawer.tsx`

Busca esta línea:
```tsx
const whatsappUrl = `https://wa.me/584220148405?text=${encoded}`
```

Reemplaza `584220148405` con tu número (formato internacional sin + ni espacios):
```tsx
const whatsappUrl = `https://wa.me/1234567890?text=${encoded}`
```

Para número venezolano: `58` + número sin el 0 al inicio
Para número otro país: busca el código internacional

## 5. Cambiar Mensaje de WhatsApp

Archivo: `components/quotation/QuotationDrawer.tsx`

```tsx
const message = `Hola CharaTools! 👋\n\n...tu mensaje personalizado aquí...`
```

Puedes personalizar:
- El saludo: "Hola [Tu Negocio]"
- El emoji inicial
- El texto completo

## 6. Cambiar Textos de Confianza

Archivo: `components/global/TrustBar.tsx`

```tsx
const items = [
  { 
    icon: BadgeCheck, 
    label: "Tu texto de confianza aquí" 
  },
  // ... más ítems
]
```

## 7. Cambiar Favicon y Metadatos

Archivo: `app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Tu Título SEO',
  description: 'Tu descripción SEO',
  // ... más metadatos
}
```

## 8. Cambiar Fuentes (Tipografía)

Archivo: `app/layout.tsx`

```tsx
import { YourFont } from 'next/font/google'

const yourFont = YourFont({ subsets: ["latin"] });
```

Luego en `tailwind.config.ts`:
```ts
fontFamily: {
  sans: ['var(--font-your-font)', ...defaultTheme.fontFamily.sans],
}
```

Fuentes recomendadas de Google Fonts:
- **Profesional**: Inter, Poppins, Roboto
- **Moderna**: Space Grotesk, Outfit, Sora
- **Premium**: Playfair Display (headers)

## 9. Cambiar Tamaños y Espaciado

Archivo: `tailwind.config.ts`

```ts
theme: {
  extend: {
    spacing: {
      // Agregar tamaños personalizados
      'custom': '2.5rem',
    },
  },
}
```

Luego usar: `p-custom`, `m-custom`, `gap-custom`, etc.

## 10. Cambiar Layout

### Ancho máximo de contenedor
En tus componentes, reemplaza `lg:px-16` con:
- `lg:px-8` → Más estrecho
- `lg:px-24` → Más ancho
- `lg:max-w-7xl` → Ancho máximo controlado

### Número de columnas
Archivo: `components/catalog/ProductGrid.tsx`

```tsx
// Cambiar este grid
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
```

Opciones:
- `grid-cols-2` → 2 columnas mobile
- `md:grid-cols-3` → 3 columnas tablet
- `lg:grid-cols-4` → 4 columnas desktop

## 11. Cambiar Animaciones

Archivo: `app/globals.css`

```css
@keyframes slideUp {
  from {
    transform: translateY(20px); /* Cambiar distancia */
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

Cambiar duración en componentes:
```tsx
className="animate-fade-in" // Cambiar tiempo en globals.css
```

## 12. Desplegar a Producción

### Con Vercel (Recomendado)
```bash
# 1. Conecta tu repo a GitHub
# 2. Ve a vercel.com
# 3. Importa tu repositorio
# 4. Deploy automático en cada push
```

### Con tu propio servidor
```bash
pnpm build
pnpm start
```

## 13. Agregar Google Analytics (Opcional)

Archivo: `app/layout.tsx`

```tsx
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics /> {/* Ya viene incluido */}
      </body>
    </html>
  )
}
```

## 🎯 Checklist de Personalización Rápida

- [ ] Cambié los colores de marca
- [ ] Cambié el nombre del negocio en navbar y hero
- [ ] Cambié los productos de muestra
- [ ] Cambié el número de WhatsApp
- [ ] Cambié el mensaje de WhatsApp
- [ ] Actualicé el favicon
- [ ] Actualicé metadatos SEO (título, descripción)
- [ ] Cambié las imágenes (hero, productos)
- [ ] Probé todo en móvil, tablet y desktop
- [ ] Probé el flujo completo de cotización

## 🆘 Ayuda Rápida

**Las clases de Tailwind no funcionan:**
- Verifica que el archivo esté en `app/` o `components/`
- Rebuilda: `pnpm dev`

**El color no cambió:**
- Busca `brand-primary` en componentes (puede estar hardcodeado)
- Limpia el caché del navegador

**WhatsApp no abre:**
- Verifica el número (sin + ni espacios)
- Prueba con un número internacional válido
- Comprueba que el navegador permita ventanas emergentes

**Las imágenes no se ven:**
- Verifica que la URL sea pública y accesible
- Descarga la imagen y sube a `/public/`
- Usa rutas locales: `src="/nombre-imagen.jpg"`

---

¿Necesitas ayuda? Consulta la sección de notas de implementación en el README.md
