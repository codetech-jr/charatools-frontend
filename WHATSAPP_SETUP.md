# 💬 Guía de Integración de WhatsApp - CharaTools

Instrucciones para configurar correctamente el número de WhatsApp de tu negocio en la landing page.

## 🔍 ¿Dónde está el WhatsApp?

El número de WhatsApp se usa en dos lugares:

1. **QuotationDrawer** - Botón "Solicitar cotización por WhatsApp"
   - Archivo: `components/quotation/QuotationDrawer.tsx`
   - Línea ~28

2. Puedes agregar botón flotante adicional (opcional)

## 📱 Obtener tu Número de WhatsApp

### Opción 1: WhatsApp Personal
1. Abre WhatsApp
2. Obtén tu número de teléfono (el que registraste)
3. Anótalo en formato internacional:
   - **Venezuela**: 584123456789 (sin +, sin espacios)
   - **Colombia**: 573001234567
   - **México**: 525551234567
   - **España**: 34612345678
   - **Argentina**: 541156789012

### Opción 2: WhatsApp Business (RECOMENDADO)
Si esperas muchos mensajes:

1. Descarga "WhatsApp Business" (app separada)
2. Registra tu número
3. Configura tu catálogo y mensajes automáticos
4. Usa el mismo número

### Opción 3: WhatsApp API (Nivel Profesional)
Si quieres automatizar respuestas:

1. Ve a [business.facebook.com](https://business.facebook.com)
2. Solicita acceso a WhatsApp Cloud API
3. Obtén números virtuales
4. Integra con tu backend (más complejo)

## 🔧 Configurar el Número en CharaTools

### Paso 1: Editar el Archivo

Abre: `components/quotation/QuotationDrawer.tsx`

Busca esta línea (alrededor de la línea 28):
```tsx
const whatsappUrl = `https://wa.me/584241234567?text=${encoded}`
```

Reemplaza `584241234567` con tu número.

### Paso 2: Asegurate del Formato

El formato correcto es:
```
https://wa.me/[CODIGO_PAIS][NUMERO_TELEFONO]?text=[MENSAJE_CODIFICADO]
```

**Ejemplos reales:**

**Venezuela (+58)**
```tsx
// Si tu número es: +58 424 123 4567
const whatsappUrl = `https://wa.me/584241234567?text=${encoded}`
```

**Colombia (+57)**
```tsx
// Si tu número es: +57 300 123 4567
const whatsappUrl = `https://wa.me/573001234567?text=${encoded}`
```

**México (+52)**
```tsx
// Si tu número es: +52 55 1234 5678
const whatsappUrl = `https://wa.me/525551234567?text=${encoded}`
```

**España (+34)**
```tsx
// Si tu número es: +34 612 34 5678
const whatsappUrl = `https://wa.me/34612345678?text=${encoded}`
```

### Paso 3: Verificar tu Cambio

```bash
# Guarda el archivo
# Espera a que Next.js recargue automáticamente
# El preview debe actualizar en segundos

# Si usas `pnpm dev`, deberías ver:
# ✓ Compiled /components/quotation/QuotationDrawer.tsx
```

### Paso 4: Probar

1. Abre tu localhost (http://localhost:3000)
2. Haz click en "Agregar" en un producto
3. Abre el carrito (click en "Mi Cotización")
4. Llena los campos opcionales
5. Click en "Solicitar cotización por WhatsApp"
6. Debería abrir WhatsApp con tu número

## 📋 Personalizar Mensaje

En `QuotationDrawer.tsx`, línea ~25:

```tsx
const message = `Hola CharaTools! 👋\n\nQuiero cotizar los siguientes productos:\n\n${itemsList}\n\nMi nombre: ${name || 'No especificado'}\nSector/zona: ${sector || 'No especificado'}\n\nPor favor envíenme los precios disponibles.`
```

Puedes cambiar:

```tsx
// Cambiar saludo
const message = `Hola Ferretería XYZ! 👋`

// Cambiar emoji
const message = `Hola! 🛠️`

// Cambiar todo el mensaje
const message = `Necesito cotizar:

${itemsList}

Datos de contacto:
Nombre: ${name}
Ubicación: ${sector}

¿Cuál es el precio?`
```

## 🌐 Link Directo de WhatsApp (Opcional)

Si quieres un botón flotante adicional:

Crea `components/global/WhatsAppButton.tsx`:

```tsx
'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/584241234567?text=Hola%20CharaTools!%20Quisiera%20cotizar.`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
```

Luego agregalo en `app/page.tsx`:
```tsx
import { WhatsAppButton } from '@/components/global/WhatsAppButton'

// En el JSX:
<WhatsAppButton />
```

## ✅ Validar tu Número

Para asegurarte que el número es correcto:

1. **Método 1: Prueba Manual**
   - Abre: `https://wa.me/[TU_NUMERO]`
   - Debería abrir tu chat de WhatsApp

2. **Método 2: Código Online**
   - Usa este código para validar:
   ```js
   // Abre en consola del navegador (F12 → Console)
   const numero = "584241234567"
   window.open(`https://wa.me/${numero}`, '_blank')
   // Si abre WhatsApp correctamente, ¡es válido!
   ```

3. **Método 3: Tabla de Códigos**
   | País | Código | Ejemplo |
   |------|--------|---------|
   | Venezuela | 58 | 584241234567 |
   | Colombia | 57 | 573001234567 |
   | México | 52 | 525551234567 |
   | España | 34 | 34612345678 |
   | Argentina | 54 | 541156789012 |
   | Brasil | 55 | 5511987654321 |
   | USA | 1 | 13105551234 |
   | Canada | 1 | 14165551234 |

## 🎯 Mejores Prácticas

### 1. Horario de Respuesta
```tsx
// Agregar mensaje si es fuera de horario
const message = `Hola! ⏰ Estamos disponibles L-V 8am-6pm\n\n${itemsList}`
```

### 2. Grupos de WhatsApp
Puedes crear grupos y usar el link del grupo:
```tsx
// En lugar de número individual
const whatsappUrl = `https://chat.whatsapp.com/[TU_CODIGO_GRUPO]`
```

### 3. Tracking
Para saber cuántos mensajes recibes:
- Usa WhatsApp Business (estadísticas integradas)
- O implementa un contador en tu backend

### 4. Auto-respuestas
En WhatsApp Business → Configuración → Saludos automáticos:
- "Gracias por contactarnos, responderemos en ~5 minutos"

## 🚨 Problemas Comunes

### El link no abre WhatsApp
**Solución:**
- [ ] Verifica formato: `https://wa.me/[NUMERO]`
- [ ] Sin `+` al inicio
- [ ] Sin espacios ni guiones
- [ ] Sin `0` al inicio del número local

### Se abre pero sin el número correcto
**Solución:**
- [ ] Copia el número exacto (incluyendo código país)
- [ ] Pega en tu URL
- [ ] Prueba con `https://wa.me/[TU_NUMERO]` en el navegador

### El mensaje no se envía automáticamente
**Solución:**
- [ ] Esto es normal por privacidad
- [ ] El usuario debe presionar "enviar"
- [ ] El mensaje se pre-llena para que no tenga que escribir

### Funciona local pero no en producción
**Solución:**
- [ ] Asegúrate que `window.open` esté permitido en navegador
- [ ] Comprueba que el navegador no bloquee pop-ups
- [ ] En navegador → Configuración → Sitio → Pop-ups → Permitir

## 📊 Monitorear Conversiones

Para tracking básico sin backend:

```tsx
// En QuotationDrawer.tsx
const handleSendWhatsApp = () => {
  // Enviar evento a Google Analytics
  gtag('event', 'whatsapp_sent', {
    items_count: items.length,
    timestamp: new Date(),
  })
  
  // Luego abrir WhatsApp
  window.open(whatsappUrl, '_blank')
}
```

## 🔐 Privacidad y Seguridad

- ✅ El número es público (necesita estarlo para funcionar)
- ✅ Los mensajes de usuarios no se almacenan en tu servidor
- ✅ Los datos van directo a WhatsApp
- ✅ Cumple GDPR (usuarios controlan sus datos)

## 📞 Alternativas a WhatsApp

Si prefieres otro canal:

```tsx
// Email
const mailUrl = `mailto:info@tu-sitio.com?subject=Cotización%20de%20Productos`

// Telegram
const telegramUrl = `https://t.me/tu_usuario`

// Formulario de contacto
// Redirige a página /contact
```

---

**¿Necesitas ayuda?**
- Documentación oficial WhatsApp: [faq.whatsapp.com](https://faq.whatsapp.com)
- Link format: [www.whatsapp.com/business/contact](https://www.whatsapp.com/business/contact)

---

**Última actualización**: Abril 2026  
**Versión**: 1.0.0
