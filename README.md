# CharaTools - Ferretería INGCO Landing Page

Una landing page completa e interactiva para CharaTools, distribuidor oficial de herramientas INGCO. Construida con React 18, Next.js 15, TypeScript, Tailwind CSS y componentes de Shadcn/ui.

## 🎨 Características

✅ **Diseño Dark Mode Naranja/Negro** - Paleta de colores profesional con naranja (#D4500A) y negro (#0A0A0A)  
✅ **Navbar Sticky** - Navegación con contador de cotización en tiempo real  
✅ **Hero Section** - Sección de bienvenida con CTA dual  
✅ **Trust Bar** - Barra de autoridad con scroll horizontal en mobile  
✅ **Category Grid** - 4 categorías principales con filtrado  
✅ **Product Grid** - Grilla responsiva de productos con badges de estado  
✅ **Quotation Drawer** - Carrito flotante clickeable con integración WhatsApp  
✅ **8 Productos de Muestra** - 4 en Herramientas INGCO, 4 en Iluminación  
✅ **Responsive Design** - Mobile-first, optimizado para tablet y desktop  
✅ **Accesibilidad WCAG** - Semántica correcta, aria-labels, touch targets mínimos

## 📋 Especificación Técnica

### Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS 4.2
- **Components**: Shadcn/ui + Radix UI
- **Icons**: Lucide React
- **State**: React Context API

### Design Tokens (Tailwind)
```css
--brand-primary: #D4500A      /* Naranja oscuro */
--brand-dark: #A03D08         /* Naranja hover */
--brand-surface: #1A1A1A      /* Cards background */
--brand-bg: #0A0A0A           /* Global background */
--brand-text: #F5F5F5         /* Main text */
--brand-muted: #9CA3AF        /* Secondary text */
--brand-success: #22C55E      /* Available badge */
--brand-warning: #F59E0B      /* High demand badge */
```

## 🏗️ Estructura de Componentes

```
components/
├── global/
│   ├── Navbar.tsx              # Barra de navegación sticky
│   └── TrustBar.tsx            # Barra de autoridad
├── hero/
│   └── HeroSection.tsx         # Sección principal
├── catalog/
│   ├── CategoryGrid.tsx        # Grilla de categorías
│   ├── ProductGrid.tsx         # Grilla de productos
│   └── ProductCard.tsx         # Tarjeta de producto
└── quotation/
    └── QuotationDrawer.tsx     # Carrito flotante

context/
└── QuotationContext.tsx        # Estado global

data/
└── products.json               # Datos de productos
```

## 🎯 Componentes Principales

### Navbar
- Logo clickeable (vuelve al inicio)
- Links de categorías (md+)
- Trigger de cotización con badge de contador
- Touch target mínimo de 44x44px (WCAG)

### Hero Section
- Badge de distribuidor oficial INGCO
- H1 con tipografía fluid
- Dos CTAs (scroll a catálogo, abrir drawer WhatsApp)
- Imagen responsiva con srcset

### Trust Bar
- 4 ítems de confianza
- Scroll horizontal en mobile
- Animación de entrada secuencial

### Category Grid
- 4 categorías: INGCO, Plomería, Pintura, Eléctrico
- 2x2 mobile → 4 columnas desktop
- Click activa filtro de catálogo
- Animación de reordenamiento

### Product Card
- Imagen con aspect ratio 4:3
- Badge de estado (Disponible, Alta rotación, Nuevo lote, Sin stock)
- Botón con 5 estados: idle, hover, loading, added, in-quotation
- Micro-interacción "agregado" con toast implícito

### Quotation Drawer
- Bottom sheet mobile, side drawer desktop
- Lista de ítems con botón de eliminar
- Inputs opcionales (nombre, sector)
- CTA WhatsApp que genera mensaje preformateado
- Disclaimer de respuesta rápida

## 📱 Responsive Breakpoints

| Device | Breakpoint | Ajustes |
|--------|-----------|---------|
| Mobile | < 640px | 1 columna, nav icons, Drawer bottom |
| Tablet | 768px | 2 columnas, nav visible, Drawer side |
| Desktop | 1024px+ | 4 columnas, full navbar, Drawer 420px |
| Wide | 1280px+ | Padding aumentado, mejor espaciado |

## 🚀 Instalación y Uso

### Clonar el proyecto
```bash
git clone <repo-url>
cd chara-tools
```

### Instalar dependencias
```bash
pnpm install
```

### Ejecutar en desarrollo
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilar para producción
```bash
pnpm build
pnpm start
```

## 🎮 Interactividad

### Agregar a Cotización
1. Click en botón "+ Agregar" en cualquier producto
2. Botón muestra estado "loading" (200ms)
3. Transición a estado "added" con ✓ (1500ms)
4. Badge en navbar se incrementa con animación flip
5. Producto ahora muestra "En tu lista"

### Filtrar por Categoría
1. Click en tarjeta de categoría
2. Catálogo se filtra (solo muestra productos de esa categoría)
3. Al deshacer el filtro, se muestran todos nuevamente

### Solicitar Cotización
1. Click en trigger de carrito o botón de drawer en hero
2. Se abre drawer con lista de productos
3. Ingresa nombre y sector (opcionales)
4. Click en "Solicitar cotización por WhatsApp"
5. Se abre WhatsApp con mensaje preformateado

## 🎨 Personalización

### Cambiar Paleta de Colores
Edita `/app/globals.css` - sección de tokens:
```css
--brand-primary: #TU-COLOR;
--brand-dark: #TU-HOVER;
/* etc */
```

### Agregar más Productos
1. Edita `app/page.tsx` - array `SAMPLE_PRODUCTS`
2. O usa el archivo `/data/products.json` como referencia

### Cambiar Número de WhatsApp
En `QuotationDrawer.tsx`:
```tsx
const whatsappUrl = `https://wa.me/TU-NUMERO?text=${encoded}`
```

## ♿ Accesibilidad

- ✅ Semántica HTML correcta (header, nav, section, article, etc)
- ✅ ARIA labels para botones y regiones
- ✅ Touch targets mínimos de 44x44px
- ✅ Contraste suficiente (WCAG AA)
- ✅ Focusable elements con outline visible
- ✅ Reducción de movimiento respetada (prefers-reduced-motion)

## 📊 Productos de Muestra

### Herramientas INGCO (4)
1. **Esmeril Angular INGCO 115mm** - Disponible
2. **Taladro Percutor INGCO 20V** - Alta rotación
3. **Sierra Circular INGCO 1400W** - Disponible
4. **Juego de Brocas INGCO 100 piezas** - Nuevo lote

### Iluminación (4)
5. **Bombilla LED 9W Cálida** - Disponible
6. **Panel LED Cuadrado 40W** - Alta rotación
7. **Lámpara de Escritorio LED** - Disponible
8. **Foco Empotrable INGCO** - Disponible

## 🔧 Variables de Entorno

No se requieren variables de entorno para desarrollo local. En producción:
- Considerar mover número de WhatsApp a variable de entorno
- Implementar tracking de conversiones si es necesario

## 📝 Notas de Implementación

- El estado de cotización es global (QuotationContext)
- Las imágenes usan URLs externas (Unsplash) con fallback local
- El hero usa imagen generada localmente en `/public/hero-tools.jpg`
- Los precios NO se muestran (modelo de cotización a demanda)
- Toda la interactividad es optimista (sin delay real)

## 🎯 Mejoras Futuras

- [ ] Integración con backend para guardar cotizaciones
- [ ] Autenticación de usuarios
- [ ] Historial de cotizaciones
- [ ] Integración con sistema de inventario real
- [ ] Análisis de comportamiento del usuario
- [ ] Múltiples idiomas (EN/ES)
- [ ] Sistema de favoritos

## 📞 Soporte

Para preguntas sobre la implementación, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Abril 2026  
**Stack**: React 18 + Next.js 15 + TypeScript + Tailwind CSS
