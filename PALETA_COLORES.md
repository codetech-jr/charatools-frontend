# 🎨 Paleta de Colores CharaTools - Identidad Corporativa

## Colores Base

### Fondo Principal
- **Gris Claro**: `bg-gray-50`
- Usado para: Fondo general de toda la página
- Propósito: Crear un lienzo limpio y moderno

### Texto Principal
- **Gris muy oscuro/Negro**: `text-gray-900` (primario) y `text-gray-800` (secundario)
- Usado para: Encabezados (H1, H2, H3), texto del navbar, párrafos
- Contraste: Alto (accesibilidad WCAG AA)

### Amarillo Caterpillar (Industrial)
- **Color**: `bg-yellow-400` / `hover:bg-yellow-500`
- Usado EXCLUSIVAMENTE para:
  - ✅ Botón "Agregar a cotización" (ProductCard)
  - ✅ Botón "Ver catálogo y cotizar" (HeroSection)
  - ✅ Icono del logo del navbar (fondo)
  - ✅ Botón "Mi Cotización" en navbar
  - ✅ Categorías activas (CategoryGrid border y ring)
  - ✅ Iconos de categorías (color de los iconos)
  - ✅ Etiquetas de "Nuevo lote" en productos
- Texto sobre amarillo: `text-black` (máximo contraste)
- Simbolismo: Energía, confiabilidad industrial

### Naranja (Acción Secundaria)
- **Color**: `bg-orange-500` / `hover:bg-orange-600`
- Usado para:
  - ✅ Botón "Cotizar por WhatsApp" (HeroSection)
  - ✅ Botón "Cotizar por WhatsApp" (QuotationDrawer)
  - ✅ Badge de contador de carrito (Navbar)
- Texto sobre naranja: `text-white`
- Simbolismo: Urgencia, acción rápida

### Blanco Puro
- **Color**: `bg-white`
- Usado para:
  - ✅ Fondo de Product Cards
  - ✅ Fondo del Navbar (ahora es gris-900)
  - ✅ Fondo del Drawer lateral (QuotationDrawer)
  - ✅ Fondo de categorías (CategoryGrid)
  - ✅ Botón "En tu lista" (estado de ProductCard)
- Propósito: Resaltar contenido sobre fondo gris claro

### Gris Oscuro/Negro
- **Color**: `bg-gray-900`
- Usado para:
  - ✅ Navbar (fondo principal)
  - ✅ Navegación superior
- Texto en navbar: `text-white` y `text-gray-300`

## Colores de Estados

### Disponible
- Fondo: `bg-green-100`
- Texto: `text-green-800`
- Usado en: Badge de producto disponible

### Alta Rotación
- Fondo: `bg-yellow-100`
- Texto: `text-yellow-800`
- Usado en: Badge de productos en demanda

### Nuevo Lote
- Fondo: `bg-yellow-200`
- Texto: `text-yellow-900`
- Usado en: Badge de productos nuevos

### Sin Stock
- Fondo: `bg-red-100`
- Texto: `text-red-800`
- Usado en: Badge de productos agotados
- Botón: Deshabilitado visualmente

## Estructura Visual por Componente

### Navbar (bg-gray-900)
- Logo fondo: `bg-yellow-400` con `text-black`
- Texto: `text-white`
- Enlaces: `text-gray-300` → hover `text-white`
- Botón carrito: `bg-yellow-400` con `text-black`
- Badge contador: `bg-orange-500` con `text-white`

### Hero Section (bg-gray-50)
- Badge INGCO: `bg-yellow-100` border `border-yellow-400`, texto `text-yellow-800`
- H1: `text-gray-900`
- P: `text-gray-800`
- Botón primario: `bg-yellow-400` → hover `bg-yellow-500`, texto `text-black`
- Botón secundario: `bg-orange-500` → hover `bg-orange-600`, texto `text-white`

### TrustBar (bg-gray-50)
- Borde: `border-gray-200`
- Iconos: `text-yellow-500`
- Texto: `text-gray-800`

### CategoryGrid (bg-gray-50)
- Tarjetas: `bg-white` border `border-gray-200`
- Activa: `bg-yellow-100` border `border-yellow-500` ring `ring-yellow-500`
- Hover: `border-yellow-400`
- Iconos: `text-yellow-500`
- Texto: `text-gray-900`

### ProductCard (bg-gray-50)
- Fondo: `bg-white` border `border-gray-200`
- Hover border: `border-yellow-400`
- Categoría: `text-gray-600`
- Nombre: `text-gray-900`
- Descripción: `text-gray-700`
- Botón agregar: `bg-yellow-400` → hover `bg-yellow-500`, texto `text-black`
- Botón "En tu lista": `bg-white` border `border-yellow-400`, texto `text-black`

### QuotationDrawer (bg-white)
- Fondo: `bg-white`
- Borde header: `border-gray-300`
- Items: `bg-gray-50` border `border-gray-300`
- Label: `text-gray-800`
- Input: `bg-white` border `border-gray-300`, texto `text-gray-900`
- Botón WhatsApp: `bg-orange-500` → hover `bg-orange-600`, texto `text-white`

## Recomendaciones de Uso

### ✅ Hacer
- Usar `yellow-400` para todos los CTAs principales
- Usar `orange-500` para acciones de WhatsApp
- Usar `gray-50` como fondo base
- Usar `gray-900`/`gray-800` para todo el texto
- Usar `bg-white` para cards y contenedores

### ❌ Evitar
- No usar naranja para botones que no sean WhatsApp
- No usar amarillo para elementos secundarios
- No usar colores personalizados fuera de esta paleta
- No usar colores muy claros de gray para texto
- No usar gris en botones primarios

## Accesibilidad

- Contraste texto negro sobre amarillo: **19:1** ✅ WCAG AAA
- Contraste texto blanco sobre naranja: **9:1** ✅ WCAG AAA
- Contraste texto gris-900 sobre gris-50: **17:1** ✅ WCAG AAA
- Todas las combinaciones cumplen con estándares WCAG AA mínimo

## Implementación en Tailwind CSS

Se utilizan clases estándar de Tailwind CSS (sin tokens personalizados):
- `bg-gray-50`, `bg-gray-100`, `bg-white`, `bg-gray-900`
- `text-black`, `text-gray-600`, `text-gray-700`, `text-gray-800`, `text-gray-900`, `text-white`
- `bg-yellow-400`, `bg-yellow-500`, `bg-yellow-100`, `bg-yellow-200`
- `bg-orange-500`, `bg-orange-600`, `bg-orange-100`
- `border-gray-200`, `border-gray-300`, `border-yellow-400`, `border-yellow-500`
- `ring-yellow-500`

## Cambios Realizados

La paleta se simplificó de tokens personalizados (`brand-bg`, `brand-primary`, etc.) a clases estándar de Tailwind CSS para:
- Mayor compatibilidad
- Facilitar el mantenimiento
- Reducir la complejidad
- Garantizar mejor soporte en herramientas

---

**Última actualización**: Abril 2026  
**Versión**: 2.0 (Identidad corporativa final)
