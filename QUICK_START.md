# ⚡ Quick Start - CharaTools en 5 Minutos

Si quieres empezar de inmediato, sigue esto.

## 1️⃣ Ejecutar Localmente (2 minutos)

```bash
# La mayoría de dependencias ya están instaladas
pnpm dev

# Abre http://localhost:3000 en tu navegador
```

**¡Ya está!** Tu landing page está corriendo.

---

## 2️⃣ Probar Funcionalidades (2 minutos)

### ✓ Agregar Productos
1. Haz scroll hasta productos
2. Click en "+ Agregar" en cualquier producto
3. Ve el contador en la navbar aumentar

### ✓ Abrir Carrito
1. Click en "Mi Cotización (N)" en navbar
2. Se abre drawer con lista de productos
3. Puedes eliminar items o limpiar lista

### ✓ Enviar a WhatsApp
1. Agrega algunos productos
2. Abre el carrito
3. Click en "Solicitar cotización por WhatsApp"
4. Se pre-llena un mensaje (no se envía automáticamente)

### ✓ Filtrar Categorías
1. Haz scroll a categorías
2. Click en una (ej: "Herramientas INGCO")
3. Solo se muestran productos de esa categoría
4. Click de nuevo para mostrar todos

---

## 3️⃣ Customización Rápida (1 minuto)

### Cambiar WhatsApp (60 segundos)

Archivo: `components/quotation/QuotationDrawer.tsx`

Línea ~28, busca:
```tsx
const whatsappUrl = `https://wa.me/584220148405?text=${encoded}`
```

Reemplaza `584220148405` con **tu número**:
```tsx
const whatsappUrl = `https://wa.me/TU_NUMERO?text=${encoded}`
```

**Formato del número**: `[CODIGO_PAIS][NUMERO]`  
- Venezuela: `584220148405` (58 + número sin 0)
- Colombia: `573001234567`
- México: `525551234567`

### Cambiar Color Primario (60 segundos)

Archivo: `app/globals.css`

Línea ~7, busca:
```css
--brand-primary: #D4500A;
```

Reemplaza con tu color:
```css
--brand-primary: #FF6B35;  /* Tu color aquí */
```

### Cambiar Nombre de Negocio (30 segundos)

Archivo: `components/global/Navbar.tsx`

Línea ~21, busca:
```tsx
<span>CharaTools</span>
```

Reemplaza con tu nombre:
```tsx
<span>Tu Tienda</span>
```

---

## 🎬 Demo Completo

```
1. Abre http://localhost:3000
   ↓
2. Lee el hero (sección superior)
   ↓
3. Click en "Ver catálogo y cotizar"
   ↓
4. Scroll hasta productos
   ↓
5. Click en "+ Agregar" en un producto
   ↓
6. Ver contador en navbar
   ↓
7. Click en "Mi Cotización (1)"
   ↓
8. Se abre drawer lateral
   ↓
9. Click en "Solicitar cotización por WhatsApp"
   ↓
10. Se abre WhatsApp con mensaje pre-llenado
    ↓
11. ¡Listo! Así funciona la landing page
```

---

## 📱 Probar en Móvil

### Opción 1: Desde tu máquina
```bash
# En terminal, cuando ejecutas pnpm dev, verás:
# ➜ Local: http://localhost:3000

# Entra en cualquier navegador en tu PC a esa URL
```

### Opción 2: Desde otro dispositivo
```bash
# Obtén tu IP local
# En Mac/Linux: ifconfig | grep inet
# En Windows: ipconfig

# Luego abre desde móvil:
# http://[TU_IP]:3000
# Ej: http://192.168.1.100:3000
```

### Opción 3: Vercel
```bash
# 1. Sube a GitHub
# 2. Ve a vercel.com y conecta tu repo
# 3. Vercel te da un URL para compartir
# 4. Ábrelo en móvil
```

---

## 🛠️ Cambios Más Comunes

### Cambiar productos

Archivo: `app/page.tsx`

Busca `SAMPLE_PRODUCTS` (línea ~13):
```tsx
const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Tu Producto',          ← Cambiar nombre
    shortDescription: 'Descripción',  ← Cambiar descripción
    category: 'Tu Categoría',     ← Cambiar categoría
    image: 'https://...',         ← Cambiar imagen
    status: 'available',          ← Status: available, high-demand, new-batch, out-of-stock
  },
  // ... más productos
]
```

### Cambiar categorías

Archivo: `components/catalog/CategoryGrid.tsx`

Busca `categories` (línea ~13):
```tsx
const categories: Category[] = [
  {
    id: '1',
    slug: 'tu-slug',
    icon: <TuIcono />,      ← Cambiar ícono (de lucide-react)
    title: 'Tu categoría',  ← Cambiar título
    shortTitle: 'Corto',    ← Cambiar nombre corto
  },
  // ... más categorías
]
```

### Cambiar textos del hero

Archivo: `components/hero/HeroSection.tsx`

Busca y cambia:
```tsx
<h1>Tu nuevo headline aquí</h1>
<p>Tu subheadline aquí</p>
```

### Cambiar footer

Archivo: `app/page.tsx` (línea ~114)

```tsx
<footer>
  <p>Tu texto aquí</p>
</footer>
```

---

## 🌐 Deploy en Vercel (1 minuto)

```bash
# 1. Sube a GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Ve a https://vercel.com
# 3. Haz login con GitHub
# 4. Click en "New Project"
# 5. Selecciona tu repo de CharaTools
# 6. Click en "Deploy"
# 7. ¡Espera 2 minutos!
# 8. Tu sitio está vivo en vercel.app
```

Vercel auto-detecta Next.js y hace todo automáticamente.

---

## 🚨 Problemas Comunes

### "No puedo ver cambios en el navegador"
```bash
# 1. Guarda el archivo (Ctrl+S)
# 2. El servidor recargará automáticamente
# 3. Recarga el navegador (Ctrl+R)
# 4. Limpia caché: Ctrl+Shift+Del
```

### "WhatsApp no abre"
- [ ] ¿El número tiene el formato correcto? (sin +, sin espacios)
- [ ] ¿Probaste el link directamente?
  - Abre en navegador: `https://wa.me/TU_NUMERO`
  - Si funciona allí, es problema de otra cosa

### "Estilos no se aplican"
- [ ] Recarga el navegador (Ctrl+Shift+R para caché)
- [ ] Detén el servidor y vuelve a ejecutar `pnpm dev`
- [ ] Verifica que editaste el archivo correcto

### "Error de TypeScript"
- [ ] Ignora los errores de TypeScript (se pueden solucionar después)
- [ ] El sitio funciona aunque haya errores de tipos

---

## 📞 Documentación Completa

Si necesitas ayuda más detallada:

- **General**: Leer `README.md`
- **Personalizar**: Leer `CUSTOMIZE.md`
- **Estructura**: Leer `PROJECT_STRUCTURE.md`
- **Deploy**: Leer `DEPLOYMENT.md`
- **WhatsApp**: Leer `WHATSAPP_SETUP.md`
- **Arquitectura**: Leer `ARCHITECTURE.md`

---

## ✅ Checklist Mínimo

- [ ] Ejecuté `pnpm dev`
- [ ] Abrí http://localhost:3000
- [ ] Probé agregar un producto
- [ ] Probé abrir el carrito
- [ ] Probé filtrar categorías
- [ ] Personalicé el número de WhatsApp
- [ ] Personalicé los colores (opcional)
- [ ] Probé en móvil (opcional)

---

## 🎯 Ahora Qué?

**Opción 1: Pequeñas Mejoras**
1. Cambia el nombre de la tienda
2. Cambia los productos
3. Personaliza los colores
4. Agrega tu WhatsApp
5. ¡Deploy!

**Opción 2: Mejoras Mayores**
1. Agrega una base de datos
2. Implementa autenticación
3. Integra pagos (Stripe)
4. Crea dashboard de admin
5. Agrega email automático

**Opción 3: Entender el Código**
1. Lee `PROJECT_STRUCTURE.md`
2. Explora la carpeta `components/`
3. Entiende `QuotationContext.tsx`
4. Mira cómo funcionan las animaciones
5. ¡Aprende!

---

## 💡 Pro Tips

1. **Usa Vercel**: Es gratis y funciona perfecto con Next.js
2. **Guarda archivos con Ctrl+S**: El servidor recargará automático
3. **Abre DevTools (F12)**: Prueba responsive y ve errores
4. **No edites archivos en `node_modules`**: Se sobrescriben
5. **Commit frecuente**: Git es tu amigo

---

## 🚀 ¡Listo!

Ahora tienes una landing page profesional de ferretería.

**Próximo paso**: `pnpm dev` y abre http://localhost:3000

¡Disfrutalo! 🎉

---

**Tiempo total**: ~5 minutos  
**Complejidad**: ⭐️ Principiante amigable  
**Resultado**: 🎯 Landing page funcional
