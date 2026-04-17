# 📐 Guía Visual de CharaTools - Paleta Corporativa

## Vista General de la Página

```
┌─────────────────────────────────────────────────────────┐
│  Navbar (Gris Oscuro - bg-gray-900)                    │
│  ┌──────┐  Logo "CT" (Amarillo)  Navegación  🛒 Carrito│
│  │ CT   │                                    (Amarillo)│
│  └──────┘                                               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  TrustBar (Gris Claro - bg-gray-50)                    │
│  ✓ Distribuidor INGCO  ⚡ Despacho  📦 +500 pedidos   │
│  (Iconos en Amarillo)                                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ HERO SECTION (Gris Claro - bg-gray-50)                │
│                                                        │
│  "La ferretería que te despacha..."                  │
│  [Ver catálogo y cotizar]  [Cotizar por WhatsApp]   │
│   (Amarillo primario)       (Naranja secundario)     │
│                                                        │
│  Imagen de herramientas                              │
│                                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ CATEGORÍAS (Gris Claro - bg-gray-50)                  │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   🔧    │  │   💧    │  │   🎨    │           │
│  │ INGCO   │  │Plomería │  │ Pintura │           │
│  │(Blanco) │  │(Blanco) │  │(Blanco) │           │
│  │Amarillo │  │Amarillo │  │Amarillo │           │
│  │ iconos  │  │ iconos  │  │ iconos  │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ GRILLA DE PRODUCTOS (Gris Claro - bg-gray-50)        │
│                                                        │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐      │
│  │  Imagen   │  │  Imagen   │  │  Imagen   │      │
│  │  (gris)   │  │  (gris)   │  │  (gris)   │      │
│  │           │  │           │  │           │      │
│  │Herramienta│  │Herramienta│  │ Bombilla │      │
│  │LED        │  │INGCO      │  │LED       │      │
│  │           │  │           │  │          │      │
│  │[Agregar]  │  │[Agregar]  │  │[Agregar] │      │
│  │(Amarillo) │  │(Amarillo) │  │(Amarillo)│      │
│  └───────────┘  └───────────┘  └───────────┘      │
│                                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ DRAWER LATERAL (Blanco - bg-white)                    │
│ ┌─────────────────────────────────────────────────────┐│
│ │ Mi Lista de Cotización                            ×││
│ ├─────────────────────────────────────────────────────┤│
│ │                                                     ││
│ │ • Taladro INGCO (Herramientas INGCO)           ×  ││
│ │ • Bombilla LED (Iluminación)                   ×  ││
│ │                                                     ││
│ ├─────────────────────────────────────────────────────┤│
│ │ Tu nombre: _________________                       ││
│ │ Sector:    _________________                       ││
│ │                                                     ││
│ │ [Cotizar por WhatsApp]  (Naranja)                 ││
│ │                                                     ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Colores Detallada

### Estructura Base

```
FONDO GENERAL
█ bg-gray-50  (#f9fafb) - Limpio, moderno, accesible

FONDOS SECUNDARIOS
█ bg-white    (#ffffff) - Cards, drawer, contenedores
█ bg-gray-900 (#111827) - Navbar, elementos oscuros

TEXTO
█ text-gray-900   (#111827) - Títulos principales
█ text-gray-800   (#1f2937) - Subtítulos
█ text-gray-700   (#374151) - Body text
█ text-white      (#ffffff) - Sobre oscuro (navbar)
```

### Acciones

```
AMARILLO CATERPILLAR (PRIMARIO)
█ bg-yellow-400   (#facc15) - Botones principales
█ bg-yellow-500   (#eab308) - Hover/Active
█ bg-yellow-100   (#fef3c7) - Estados activos, badges
█ bg-yellow-200   (#fef08a) - Nuevo lote badge

NARANJA (SECUNDARIO)
█ bg-orange-500   (#f97316) - WhatsApp, urgencia
█ bg-orange-600   (#ea580c) - Hover
█ bg-orange-100   (#ffedd5) - Badges informativos
```

---

## 🔘 Estados de Botones

### Botón Primario (Amarillo)

```
NORMAL (bg-yellow-400, text-black)
┌─────────────────────┐
│  + Agregar          │
└─────────────────────┘

HOVER (bg-yellow-500, text-black)
┌─────────────────────┐
│  + Agregar          │  ← Más saturado
└─────────────────────┘

ACTIVO/AGREGADO (bg-green-500, text-white)
┌─────────────────────┐
│  ✓ Agregado         │
└─────────────────────┘

DESHABILITADO (bg-gray-300, text-gray-600, opacity-70)
┌─────────────────────┐
│  ⚠ Sin stock        │  ← Desaturado
└─────────────────────┘

EN TU LISTA (bg-white, border-yellow-400, text-black)
┌─────────────────────┐
│  ✓ En tu lista      │  ← Outline
└─────────────────────┘
```

### Botón Secundario (Naranja)

```
NORMAL (bg-orange-500, text-white)
┌──────────────────────────────┐
│  Cotizar por WhatsApp        │
└──────────────────────────────┘

HOVER (bg-orange-600, text-white)
┌──────────────────────────────┐
│  Cotizar por WhatsApp        │  ← Más saturado
└──────────────────────────────┘
```

---

## 🏷️ Badges y Etiquetas

### Estado del Producto

```
DISPONIBLE
┌─────────────────┐
│ ✅ Disponible   │  bg-green-100, text-green-800
└─────────────────┘

ALTA ROTACIÓN
┌──────────────────┐
│ 🔥 Alta rotación │  bg-yellow-100, text-yellow-800
└──────────────────┘

NUEVO LOTE
┌──────────────────┐
│ 📦 Nuevo lote    │  bg-yellow-200, text-yellow-900
└──────────────────┘

SIN STOCK
┌──────────────────┐
│ ⚠️ Sin stock     │  bg-red-100, text-red-800
└──────────────────┘
```

### Indicador INGCO

```
DISTRIBUIDOR OFICIAL
┌────────────────────────────────┐
│ ● Distribuidor Oficial INGCO   │  bg-yellow-100, 
│                                 │  border-yellow-400,
│                                 │  text-yellow-800
└────────────────────────────────┘
```

---

## 📱 Responsividad por Sección

### Mobile (< 768px)
```
┌─────────────────────────┐
│ Navbar (h-16)           │
├─────────────────────────┤
│ TrustBar (horizontal)   │
├─────────────────────────┤
│ Hero (column)           │
│ - Texto                 │
│ - Imagen                │
├─────────────────────────┤
│ Categorías (2 col)      │
├─────────────────────────┤
│ Productos (2 col)       │
├─────────────────────────┤
│ Drawer (bottom slide)   │
└─────────────────────────┘
```

### Desktop (≥ 1024px)
```
┌───────────────────────────────────────────────┐
│ Navbar                                        │
├──────────────────────────────────────────┬────┤
│ TrustBar                                 │    │
├──────────────────────────────────────────┤    │
│ Hero                                     │    │
│ - Texto (izq) | Imagen (der)            │    │
├──────────────────────────────────────────┤    │
│ Categorías (4 col)                       │    │
├──────────────────────────────────────────┤ D │
│ Productos (5 col)                        │ R │
│                                          │ A │
│                                          │ W │
│                                          │ E │
│                                          │ R │
└──────────────────────────────────────────┴────┘
```

---

## ✨ Efectos y Transiciones

### Hover Effects
```
Cards:
- Border: gray-200 → yellow-400
- Elevación: subtle
- Transición: 200ms

Botones:
- Color: bg-yellow-400 → bg-yellow-500
- Escala: 1 → 1 (sin cambios)
- Transición: 150ms

Enlaces:
- Color: gray-300 → white
- Sin subrayado
```

### Estados Activos
```
Categoría seleccionada:
- Fondo: white → yellow-100
- Border: gray-200 → yellow-500
- Ring: yellow-500 (2px)

Producto en carrito:
- Button: yellow-400 → white/yellow-outline
- Icono: + → ✓
- Texto: "Agregar" → "En tu lista"
```

---

## 🎯 Principios de Diseño

1. **Limpieza**: Fondo gris claro elimina distracciones
2. **Acción**: Amarillo y naranja guían hacia CTAs
3. **Confianza**: Gris oscuro en navbar comunica profesionalismo
4. **Accesibilidad**: Alto contraste en todo
5. **Jerarquía**: Amarillo primario, naranja secundario
6. **Consistencia**: Mismos colores en mismo tipo de elemento

---

## 🔍 Verificación de Colores

Para verificar que los colores están correctos:

1. **Navbar**: Debe ser gris muy oscuro (casi negro)
2. **Botones primarios**: Deben ser amarillo brillante/industrial
3. **Botón WhatsApp**: Debe ser naranja
4. **Fondo general**: Debe ser gris muy claro (casi blanco)
5. **Cards**: Deben ser blanco puro
6. **Iconos de categorías**: Deben ser amarillos
7. **Texto**: Debe ser gris muy oscuro/negro

Si algún color no coincide, revisar:
- La clase de Tailwind correcta en el componente
- Que no haya estilos CSS conflictivos
- Que el navegador esté mostrado sin modo oscuro

---

*Guía visual - Abril 2026*  
*CharaTools v3.0 - Identidad Corporativa*
