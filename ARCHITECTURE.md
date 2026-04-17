# 🏗️ Arquitectura de CharaTools

## Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USUARIO FINAL (Navegador)                     │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║                  NAVBAR + QUOTATION TRIGGER                    ║  │
│  ║  (Sticky, navegación, contador de items)                      ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                    ↓                                 │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║                       HERO SECTION                             ║  │
│  ║  (Headline, CTA primario, CTA secundario, imagen)             ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                    ↓                                 │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║                       TRUST BAR                                ║  │
│  ║  (Sellos INGCO, scroll horizontal mobile)                     ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                    ↓                                 │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║                    CATEGORY GRID (4 items)                     ║  │
│  ║  [INGCO] [Plomería] [Pintura] [Eléctrico]                    ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                          (filtrado opcional)                         │
│                                    ↓                                 │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║                   PRODUCT GRID (8+ productos)                  ║  │
│  ║  [Card] [Card] [Card] [Card]                                 ║  │
│  ║  [Card] [Card] [Card] [Card]                                 ║  │
│  ║  (responsive: 2 col mobile → 4+ col desktop)                 ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                    ↓                                 │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║                        FOOTER                                  ║  │
│  ║  (Copyright, links adicionales)                               ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                    ↓                                 │
│  ╔═══════════════════════════════════════════════════════════════╗  │
│  ║              QUOTATION DRAWER (Off-canvas)                     ║  │
│  ║  (Abre al lado/abajo, lista items, formulario, CTA WhatsApp) ║  │
│  ╚═══════════════════════════════════════════════════════════════╝  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Estado Global con Context API

```
┌──────────────────────────────────────────────────────┐
│          QuotationProvider (Root Layout)             │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  QuotationContext                              │  │
│  │  ├─ items: QuotationItem[]                     │  │
│  │  ├─ addItem(item)                              │  │
│  │  ├─ removeItem(id)                             │  │
│  │  └─ clearItems()                               │  │
│  └────────────────────────────────────────────────┘  │
│                       ↓                              │
│              useQuotation() Hook                     │
│                       ↓                              │
│  ┌──────────────┬──────────────┬──────────────┐     │
│  ↓              ↓              ↓              ↓      │
│ Navbar    ProductCard  QuotationDrawer   Button     │
│ (display) (add)        (list/clear)      (trigger)  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Componentes y Jerarquía

```
app/
├── page.tsx (ROOT - Contiene todo)
│   ├── <QuotationProvider>
│   │   ├── <Navbar>
│   │   │   └── onClick → setIsQuotationOpen(true)
│   │   ├── <HeroSection>
│   │   │   ├── onClick → scroll('#catalogo')
│   │   │   └── onClick → setIsQuotationOpen(true)
│   │   ├── <TrustBar>
│   │   ├── <CategoryGrid>
│   │   │   └── onChange → setActiveFilter(slug)
│   │   ├── <ProductGrid>
│   │   │   └── <ProductCard> × 8
│   │   │       └── onClick → addItem(product)
│   │   ├── <footer>
│   │   └── <QuotationDrawer>
│   │       ├── lista items del context
│   │       ├── onClick (x) → removeItem(id)
│   │       ├── onClick (Limpiar) → clearItems()
│   │       └── onClick (WhatsApp) → window.open(wa.me)
│   └── </QuotationProvider>
```

## Flujo de Datos - Ejemplo Completo

### Usuario agrega un producto:

```
Usuario click en botón [+ Agregar]
         ↓
  ProductCard.tsx
  handleAddClick()
         ↓
  onAddToQuotation(product)
         ↓
  ProductGrid.tsx
  handleAddToQuotation()
         ↓
  useQuotation()
  addItem({id, name, category, quantity})
         ↓
  QuotationContext.tsx
  setItems([...prev, newItem])
         ↓
  Re-render de componentes suscritos:
  - Navbar (actualiza contador)
  - ProductCard (muestra "En tu lista")
  - QuotationDrawer (agrega a lista)
         ↓
Usuario ve contador incrementado y feedback visual
```

## Responsividad por Breakpoint

### Mobile (< 640px)
```
┌──────────────────┐
│ [Logo] [Cotiz(N)]│  ← Navbar
├──────────────────┤
│    HERO (Full)   │  ← H1, imagen debajo
├──────────────────┤
│    TRUST BAR     │  ← Scroll horizontal
├──────────────────┤
│  CATEG  CATEG    │  ← 2x2 grid
│  CATEG  CATEG    │
├──────────────────┤
│ [Prod] [Prod]    │  ← 2 columnas
│ [Prod] [Prod]    │
│ [Prod] [Prod]    │
│ [Prod] [Prod]    │
├──────────────────┤
│     FOOTER       │
└──────────────────┘
```

### Tablet (768px)
```
┌─────────────────────────────────┐
│ [Logo] [Categ...] [Cotiz(N)]    │  ← Navbar expandido
├─────────────────────────────────┤
│  HERO (Lado a lado)             │
├─────────────────────────────────┤
│    TRUST BAR (4 items visibles)  │
├─────────────────────────────────┤
│ Cat Cat Cat Cat                  │  ← 4 columnas
├─────────────────────────────────┤
│ [P] [P] [P] [P]                 │  ← 3-4 columnas
│ [P] [P] [P] [P]                 │
├─────────────────────────────────┤
│        FOOTER                    │
└─────────────────────────────────┘
```

### Desktop (1024px+)
```
┌────────────────────────────────────────────────────┐
│[Logo] [Herramientas] [Plomería] [Pintura]        │
│                            [Eléctrico] [Cotiz(N)]│ ← Navbar full
├────────────────────────────────────────────────────┤
│ [Copy] | [Imagen 55/45%]                        │ ← Hero lado a lado
├────────────────────────────────────────────────────┤
│ TRUST BAR (4 items flex centrados)                 │
├────────────────────────────────────────────────────┤
│ [Cat] [Cat] [Cat] [Cat]                            │ ← 4 columnas
├────────────────────────────────────────────────────┤
│ [P] [P] [P] [P] [P]                              │ ← 5 columnas
│ [P] [P] [P]                                       │
├────────────────────────────────────────────────────┤
│               FOOTER                               │
└────────────────────────────────────────────────────┘
                      ↓
            Side Drawer 420px (derecha)
            [Lista items]
            [Formulario]
            [WhatsApp CTA]
```

## Flujo de Estados del ProductCard

```
        ┌─────────────────┐
        │  ESTADO INICIAL │
        │  "idle"         │
        └────────┬────────┘
                 │ Click en botón
                 ↓
        ┌─────────────────┐
        │   LOADING       │
        │  "loading" 200ms│
        └────────┬────────┘
                 │
                 ↓
        ┌─────────────────┐
        │   AGREGADO ✓    │
        │  "added" 1500ms │
        └────────┬────────┘
                 │
                 ↓
        ┌─────────────────┐
        │  EN TU LISTA    │
        │ "in-quotation"  │
        │ (persiste)      │
        └─────────────────┘
```

## Color System - Tokens

```
PRIMARIO (Naranja Oscuro)
│
├─ Primary:    #D4500A  (CTAs, badges, accents)
├─ Dark:       #A03D08  (Hover state)
├─ Light:      #FF6B35  (Optional, para light hover)
│
NEUTRAL (Negro)
│
├─ BG:         #0A0A0A  (Background global)
├─ Surface:    #1A1A1A  (Cards, sections)
├─ Text:       #F5F5F5  (Main text)
├─ Muted:      #9CA3AF  (Secondary text)
│
SEÑALES
│
├─ Success:    #22C55E  (Disponible badge)
├─ Warning:    #F59E0B  (Alta rotación)
├─ Error:      #EF4444 (Sin stock)
└─ Info:       #3B82F6 (Future use)
```

## Animaciones y Transiciones

```
┌──────────────────────────────────────────────────────┐
│ ENTRADA (Fade In - 400ms ease-out)                   │
│ ├─ Hero copy: slideUp 20px + fade                   │
│ ├─ Hero image: delay 200ms                          │
│ ├─ Trust bar items: stagger 100ms                   │
│ └─ Category cards: hover -4px                       │
│                                                      │
│ INTERACCIÓN (150-200ms)                             │
│ ├─ Button hover: scale 1.02, shadow increase       │
│ ├─ Button click: scale 0.96 → 1.0                  │
│ ├─ Card hover: -4px translateY, border color       │
│ ├─ Badge counter: flip +scale in (200ms spring)   │
│ └─ Drawer open: slide in desde dirección            │
│                                                      │
│ CONFIRMACIÓN                                         │
│ ├─ Agregado: check + color verde 1500ms             │
│ ├─ En lista: outline badge persistent               │
│ └─ Toast (opcional): fadeIn 2s → fadeOut           │
└──────────────────────────────────────────────────────┘
```

## Accesibilidad - Matriz

```
ELEMENTO          | SEMÁNTICA  | ARIA LABELS    | FOCUS
─────────────────────────────────────────────────────────
Navbar            | <header>   | aria-label     | visible ring
Nav links         | <nav>      | aria-current   | outline
H1                | <h1>       | id="hero-h"    | visible
Buttons           | <button>   | aria-label     | ring-2
Product card      | <article>  | aria-label     | outline
Image             | <img>      | alt text       | N/A
Input             | <input>    | <label>+id     | ring
Drawer            | role=dialog| aria-labelledby| trap
Badge counter     | <span>     | aria-live      | N/A
Links             | <a>        | aria-current   | outline
```

## Performance Metrics

```
Target:
├─ Lighthouse: 90+ (mobile)
├─ FCP: < 1.5s (First Contentful Paint)
├─ LCP: < 2.5s (Largest Contentful Paint)
├─ CLS: < 0.1   (Cumulative Layout Shift)
└─ TTI: < 3.5s  (Time to Interactive)

Optimizaciones implementadas:
├─ Next.js Image optimization
├─ Code splitting automático
├─ CSS purging con Tailwind
├─ Lazy loading de componentes
├─ Caché de browser (Vercel)
└─ Minification & compression
```

## Seguridad y RGPD

```
Datos recopilados:
├─ Nombre (opcional)
├─ Sector/zona (opcional)
├─ Productos en carrito
└─ No almacenamos en servidor

Flujo:
1. Usuario entra a sitio
2. Selecciona productos (client-side)
3. Genera mensaje pre-formateado
4. Abre WhatsApp (navegador → WhatsApp)
5. Usuario controla si envía o no

Cumplimiento:
├─ ✅ No tracking de terceros (solo Vercel Analytics)
├─ ✅ No cookies de marketing
├─ ✅ No almacenamiento de datos personales
├─ ✅ Transparencia en recopilación
└─ ✅ Usuario tiene control total
```

---

**Última actualización**: Abril 2026  
**Versión**: 1.0.0  
**Architect**: Frontend Team
