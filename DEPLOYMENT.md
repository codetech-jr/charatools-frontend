# 🚀 Guía de Despliegue - CharaTools

Guía paso a paso para desplegar tu landing page de CharaTools en producción.

## Opciones de Despliegue

### 1️⃣ Vercel (RECOMENDADO - 5 minutos)

Vercel es la plataforma oficial recomendada para Next.js.

#### Pasos:

1. **Sube tu código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/chara-tools.git
   git push -u origin main
   ```

2. **Conecta Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Selecciona tu repositorio de GitHub
   - Click en "Import"

3. **Configura el proyecto**
   - Framework Preset: Next.js (auto-detectado)
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`
   - Start Command: `pnpm start`

4. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - ¡Tu sitio está vivo!

#### URLs Especiales en Vercel:
- **Production**: Tu dominio principal
- **Preview**: URL única para cada rama
- **Analytics**: Dashboard con métricas en tiempo real

#### Configurar Dominio Personalizado:
1. En proyecto → Settings → Domains
2. Agrega tu dominio (ej: chara-tools.com)
3. Actualiza DNS (Vercel te muestra los registros)
4. Espera hasta 48 horas para propagación

---

### 2️⃣ Netlify (ALTERNATIVA - 5 minutos)

#### Pasos:

1. **Conecta GitHub**
   - Ve a [netlify.com](https://netlify.com)
   - Click en "Connect to Git"
   - Autoriza Netlify
   - Selecciona tu repositorio

2. **Configura Build**
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Base directory: (dejar vacío)

3. **Deploy**
   - Click en "Deploy site"
   - Espera 3-5 minutos
   - Tu URL será: `tu-proyecto.netlify.app`

#### Limitaciones:
- Next.js en Netlify requiere [Netlify Next.js plugin](https://docs.netlify.com/integrations/frameworks/next-js/)
- Recomendamos Vercel para mejor integración

---

### 3️⃣ Docker (PRODUCCIÓN - Tu Servidor)

#### Crear Dockerfile:

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Build
RUN pnpm build

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["pnpm", "start"]
```

#### Crear .dockerignore:
```
node_modules
.next
.git
.env.local
dist
```

#### Compilar y ejecutar:
```bash
# Build imagen
docker build -t chara-tools:latest .

# Ejecutar contenedor
docker run -p 3000:3000 chara-tools:latest

# Acceder a http://localhost:3000
```

---

### 4️⃣ AWS (ESCALABLE)

#### EC2 (Máquina Virtual):

1. **Lanza una instancia EC2**
   - Ubuntu 22.04 LTS t3.micro (free tier)
   - Configure Security Group para permitir puerto 80 y 443

2. **SSH a tu servidor**
   ```bash
   ssh -i tu-key.pem ubuntu@tu-ip-publica
   ```

3. **Instala Node.js y pnpm**
   ```bash
   curl https://sh.rustup.rs -sSf | sh
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   node --version  # Verifica v18+
   ```

4. **Clona tu repositorio**
   ```bash
   git clone https://github.com/tu-usuario/chara-tools.git
   cd chara-tools
   ```

5. **Instala y deploy**
   ```bash
   pnpm install
   pnpm build
   pnpm start
   ```

6. **Usa PM2 para mantener activo**
   ```bash
   npm install -g pm2
   pm2 start "pnpm start" --name "chara-tools"
   pm2 save
   pm2 startup
   ```

7. **Configura Nginx (reverse proxy)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Contenido:
   ```nginx
   server {
       listen 80;
       server_name chara-tools.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Reinicia Nginx**
   ```bash
   sudo service nginx restart
   ```

---

### 5️⃣ DigitalOcean (PRESUPUESTO-AMIGABLE)

#### App Platform (PaaS):

1. Ve a [digitalocean.com](https://digitalocean.com)
2. Click en "Create" → "Apps"
3. Conecta tu GitHub repo
4. Selecciona rama `main`
5. DigitalOcean auto-detecta Next.js
6. Click en "Next" → "Create Resources"
7. Espera deployment (3-5 minutos)

**Costo**: ~$5/mes (tarjeta de crédito o depósito)

---

### 6️⃣ Railway (STARTUP-FRIENDLY)

1. Ve a [railway.app](https://railway.app)
2. Click en "New Project" → "Deploy from GitHub"
3. Conecta tu repo
4. Railway auto-detecta Next.js
5. Configura variables de entorno si necesitas
6. Deploy automático en cada push

**Costo**: Primeros $5 gratis, luego ~$0.007/CPU hora

---

## Configuración Post-Deploy

### 1. Configurar Dominio Personalizado

**Si usas Vercel:**
1. Settings → Domains
2. Agrega tu dominio
3. Actualiza DNS records (CNAME o A record)

**Si usas Netlify:**
1. Site Settings → Domain Management
2. Agrega tu dominio
3. Actualiza nameservers

**Si usas AWS/DigitalOcean:**
1. Compra dominio en Route 53, Namecheap, o GoDaddy
2. Apunta nameservers a tu proveedor
3. Crea DNS records (A o CNAME)

### 2. Activar HTTPS

**Vercel**: Automático ✓  
**Netlify**: Automático ✓  
**AWS**: Usa AWS Certificate Manager + Cloudfront  
**DigitalOcean**: Let's Encrypt integrado  

### 3. Configurar Email (Recomendado)

Si necesitas recibir cotizaciones por email:

```bash
pnpm add nodemailer  # Para enviar emails backend
```

Entonces crea una API route:
```tsx
// app/api/send-quote/route.ts
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { quoteData } = await request.json()
  
  // Envía email a tu cuenta
  // ... implementación
}
```

### 4. Activar Analytics

Ya incluido: Vercel Analytics ✓

Para Google Analytics agregado:
1. Crea cuenta en [analytics.google.com](https://analytics.google.com)
2. Obtén tu GA ID
3. Agrega a env variables
4. Instala `next-google-analytics`

### 5. Configurar Respaldo

**Vercel**:
- Automático con git history
- Rollback a cualquier versión anterior

**Otros**:
```bash
# Crear backup manual
tar -czf backup-$(date +%Y%m%d).tar.gz .

# Subir a S3, Dropbox, etc
```

---

## Monitoreo Post-Launch

### 1. Verificar Funcionamiento

```bash
# Test homepage
curl https://tu-sitio.com

# Test API (si tienes)
curl https://tu-sitio.com/api/health
```

### 2. Ver Logs

**Vercel**:
Dashboard → Deployment → Logs

**Otros**:
```bash
docker logs tu-contenedor
pm2 logs chara-tools
tail -f /var/log/nginx/error.log
```

### 3. Performance Monitoring

- **Vercel**: Analytics integrado
- **Google**: PageSpeed Insights
- **Cloudflare**: Si usas su CDN

---

## Problemas Comunes

### El sitio carga lento
- [ ] Verifica que uses servidor en producción, no `pnpm dev`
- [ ] Habilita caching HTTP (Vercel lo hace automático)
- [ ] Comprime imágenes (usa Next.js Image)
- [ ] Considera CDN (Cloudflare gratis)

### WhatsApp no abre desde producción
- [ ] Verifica número de WhatsApp en código
- [ ] Asegúrate que el navegador permita pop-ups
- [ ] Prueba en incógnito (sin extensiones)
- [ ] Comprueba que `window.open` funcione

### Estilos no se cargan correctamente
- [ ] Limpia caché del navegador (Ctrl+Shift+Del)
- [ ] Verifica que Tailwind build completó
- [ ] Comprueba `/app/globals.css` en HTML head

### Errores de CORS
- [ ] Si llamas APIs externas, configura CORS
- [ ] Mejor aún: usa Next.js API routes como proxy

---

## Checklist Pre-Launch

- [ ] URL funciona en móvil, tablet, desktop
- [ ] Todos los links funcionan
- [ ] WhatsApp abre correctamente
- [ ] Productos se pueden agregar a carrito
- [ ] Formulario de contacto funciona
- [ ] Imágenes cargan rápido
- [ ] No hay errores en consola
- [ ] Favicon se ve correctamente
- [ ] Meta tags (título, descripción) son correctos
- [ ] Google Analytics funciona
- [ ] Certificado SSL/HTTPS activo
- [ ] Dominio personalizado apunta correctamente

---

## Optimizaciones de Última Hora

```bash
# Build production optimizado
pnpm build

# Analizar tamaño del bundle
npm install -g next-bundle-analyzer
npm run analyze  # (requiere config)

# Minificar imágenes (manual)
# Usa TinyImage, ImageOptim, o Squoosh

# Purge CSS unused
# Tailwind lo hace automáticamente
```

---

## Soporte y Escalado Futuro

### Si necesitas más funcionalidades:

1. **Base de datos**: Agregar Supabase, MongoDB
2. **Authentication**: Auth0, NextAuth.js
3. **Pagos**: Stripe, PayPal
4. **CMS**: Contentful, Sanity, WordPress headless
5. **Búsqueda**: Algolia, Meilisearch
6. **Analytics avanzado**: Mixpanel, Amplitude

---

**¿Necesitas ayuda?**
- Documentación Next.js: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

---

**Última actualización**: Abril 2026  
**Versión**: 1.0.0
