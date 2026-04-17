# CharaTools - Ferretería INGCO
## Landing Page Funcional (Versión Corregida)

---

## 🚀 Inicio Rápido (3 Pasos)

### Paso 1: Instalar dependencias
```bash
pnpm install
```

### Paso 2: Ejecutar proyecto
```bash
pnpm dev
```

### Paso 3: Abrir en navegador
```
http://localhost:3000
```

**¡Listo!** Página en vivo con productos y carrito funcionando.

---

## ✨ Características Incluidas

### Página Principal
- ✅ Navbar con logo + navegación
- ✅ Barra de confianza (sellos INGCO)
- ✅ Hero section con 2 CTAs
- ✅ Grid de 4 categorías (filtrable)
- ✅ Grid de productos (responsivo)
- ✅ Drawer lateral (carrito flotante)

### Funcionalidad
- ✅ Agregar productos al carrito
- ✅ Ver cantidad en tiempo real
- ✅ Quitar productos individuales
- ✅ Limpiar lista completa
- ✅ Enviar a WhatsApp automáticamente
- ✅ Formulario opcional (nombre + sector)

### Diseño
- ✅ Paleta Amarillo + Naranja + Gris
- ✅ 100% Responsive (mobile → desktop)
- ✅ Animaciones suaves
- ✅ Estados visuales claros
- ✅ Accesibilidad WCAG AA

---

## 📦 8 Productos de Muestra

### Herramientas INGCO (4)
1. Esmeril Angular INGCO 115mm
2. Taladro Percutor INGCO 20V
3. Sierra Circular INGCO 1400W
4. Juego de Brocas INGCO 100 piezas

### Iluminación (4)
1. Bombilla LED 9W Cálida
2. Panel LED Cuadrado 40W
3. Lámpara de Trabajo LED
4. Foco Halógeno Profesional

---

## 🎨 Paleta de Colores

| Elemento | Color | Clase Tailwind |
|----------|-------|----------------|
| Fondo | Gris claro | `bg-gray-50` |
| Texto | Negro | `text-black` |
| Botones primarios | Amarillo | `bg-yellow-400` |
| WhatsApp | Naranja | `bg-orange-500` |
| Cartas | Blanco | `bg-white` |
| Confirmación | Verde | `bg-green-500` |

---

## 📱 Vista por Dispositivo

### Mobile (< 640px)
- 2 columnas de productos
- Drawer desde abajo
- Navbar simplificada
- Tamaño texto optimizado

### Tablet (640px - 1024px)
- 3-4 columnas de productos
- Drawer desde lado derecho
- Navegación visible
- Espaciado aumentado

### Desktop (> 1024px)
- 4-5 columnas de productos
- Drawer fijo a lado derecho
- Full navigation
- Máximo espaciado

---

## 🔧 Estructura del Proyecto

```
CharaTools/
├── app/
│   ├── layout.tsx          # Layout principal (gray-50)
│   ├── page.tsx            # Página principal con productos
│   └── globals.css         # Estilos globales (@keyframes)
│
├── components/
│   ├── global/
│   │   ├── Navbar.tsx      # Barra superior (white, orange)
│   │   └── TrustBar.tsx    # Barra de confianza
│   ├── hero/
│   │   └── HeroSection.tsx # Sección hero (yellow + orange)
│   ├── catalog/
│   │   ├── CategoryGrid.tsx # 4 categorías
│   │   ├── ProductCard.tsx  # Tarjeta de producto
│   │   └── ProductGrid.tsx  # Grid de productos
│   ├── quotation/
│   │   └── QuotationDrawer.tsx # Carrito lateral
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx        # Inputs (white, orange focus)
│       ├── drawer.tsx
│       └── ...
│
├── context/
│   └── QuotationContext.tsx # State global del carrito
│
├── data/
│   └── products.json        # 8 productos
│
├── public/
│   ├── hero-tools.jpg       # Imagen hero
│   └── product-led.jpg      # Imagen productos
│
├── tailwind.config.js       # Config estándar
├── tsconfig.json            # TypeScript
└── package.json             # Dependencias
```

---

## 🎯 Flujo de Usuario

1. **Llega a la página** → Ve hero section atractivo
2. **Filtra categoría** → Selecciona "Herramientas" o "Iluminación"
3. **Ve productos** → Tarjetas con descripción y estado
4. **Agrega a carrito** → Botón amarillo → se pone verde
5. **Abre drawer** → Hace click en carrito (arriba a la derecha)
6. **Rellena form** → Nombre y sector (opcional)
7. **Envía a WhatsApp** → Se abre conversa pre-completada
8. **CharaTools responde** → En ~15 minutos

---

## 🟠 Botones y Estados

### Estados de Producto

```
Normal       → bg-yellow-400 text-black "Agregar"
Agregado     → bg-green-500 text-white "Agregado" (1.5s)
En Lista     → bg-gray-100 border-orange "En tu lista"
Sin Stock    → bg-gray-300 cursor-not-allowed "Sin stock"
```

### Botones CTA

```
Hero 1  → "Ver catálogo" (yellow-400)
Hero 2  → "Cotizar por WhatsApp" (orange-500)
Drawer  → "Cotizar por WhatsApp" (orange-500)
```

---

## 📊 Responsive Breakpoints

```
sm: 640px   → 2 cols productos
md: 768px   → 3 cols productos
lg: 1024px  → 4 cols productos
xl: 1280px  → 5 cols productos
```

---

## 🔐 Integración WhatsApp

El número está configurado en `QuotationDrawer.tsx`:

```javascript
const whatsappUrl = `https://wa.me/584241234567?text=${encoded}`
```

**Cambiar número:**
1. Abre `components/quotation/QuotationDrawer.tsx`
2. Busca `584241234567`
3. Reemplaza con tu número (país + código)
4. Ejemplo: `584128765432` para Venezuela

---

## 📝 Tipos de Productos

Cada producto tiene estos campos:

```typescript
{
  id: string           // Identificador único
  name: string         // Nombre del producto
  shortDescription: string  // Descripción corta
  category: string     // Categoría (ej: "Herramientas INGCO")
  image: string        // URL de imagen
  status: string       // 'available' | 'high-demand' | 'new-batch' | 'out-of-stock'
}
```

---

## 🚀 Deploy (Vercel)

El proyecto está listo para desplegar a Vercel:

```bash
# 1. Conectar con GitHub
git init
git add .
git commit -m "CharaTools landing page"
git push origin main

# 2. En Vercel.com:
# - Importar repositorio
# - Configurar variables de entorno
# - Deploy automático

# O:
vercel deploy
```

---

## 🐛 Soporte / Errores

### "No veo los productos"
→ Revisa `app/page.tsx` línea ~13 (SAMPLE_PRODUCTS)

### "El botón no funciona"
→ Abre la consola (F12) y busca errores

### "Colores se ven mal"
→ Limpiar cache: `pnpm clean` + `pnpm dev`

### "Quiero cambiar colores"
→ Reemplaza en los componentes:
- `bg-yellow-400` → otro color
- `bg-orange-500` → otro color
- etc.

---

## 📚 Documentos Relacionados

- **FIXED_VERSION.md** - Detalles técnicos de correcciones
- **VERIFICATION_CHECKLIST.md** - Checklist completo
- **README.md** - Documentación completa

---

## ✅ Verificación Rápida

Después de `pnpm dev`, verifica:

- [ ] Página carga sin errores
- [ ] Ver 8 productos en grid
- [ ] Filtros funcionan (categorías)
- [ ] Botón "Agregar" pone productos en carrito
- [ ] Carrito muestra contador
- [ ] Drawer abre desde botón carrito
- [ ] Botón WhatsApp genera link
- [ ] Responsive en mobile

---

## 🎉 ¡Listo!

Tu landing page de CharaTools está lista para vender.

**Próximos pasos:**
1. Cambiar número de WhatsApp
2. Agregar más productos
3. Optimizar imágenes
4. Desplegar a Vercel
5. Configurar dominio

---

**Versión**: 2.0 (Corregida)  
**Status**: ✅ Producción  
**Última actualización**: 2026-04-14  

Hecho con ❤️ para CharaTools
