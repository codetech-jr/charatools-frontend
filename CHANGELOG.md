# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto no se adhiere estrictamente a Semantic Versioning durante su fase MVP, pero mantiene un registro estructurado.

## [1.1.0-AdminPanel] - 2026-04-22

### Added
- **Base de Datos Dinámica**: Integración de Supabase (PostgreSQL) y `@supabase/ssr` para abandonar el uso de JSONs estáticos (`products.json`).
- **Panel de Administración (`/admin`)**: Sistema interno de gestión de inventario con rutas protegidas, permitiendo agregar, editar y eliminar productos en tiempo real.
- **Autenticación Administrativa**: Flujo de autenticación seguro basado en tokens/sesiones para el Dashboard interno (`adminToken.ts`).
- **Generación de Cotizaciones en PDF**: Integración de `jspdf` para exportar el carrito de cotización a un documento B2B formal descargable.
- **Páginas Legales y Estáticas**: Se agregaron secciones informativas requeridas como Políticas de Privacidad, Términos y Condiciones, Envíos, Garantías y Contacto.
- **Nuevas Funcionalidades del Catálogo**: Rutas dedicadas para vistas de Promociones y Ofertas.

### Changed
- Refactorización de la lógica del catálogo (`AdminProductsTable.tsx` y vistas públicas) para consumir Server Actions vinculados a Supabase.
- Modificaciones estructurales en el `Navbar` y `Footer` para dar acceso/visibilidad a las nuevas políticas legales y vistas estáticas.

## [1.0.0-MVP] - 2026-04-18

### Added
- **Arquitectura Base**: Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS 4.2.
- **UI System**: Integración de componentes accesibles y consistentes basados en Shadcn/ui y Radix UI.
- **Hero Section**: Landing principal con CTAs de alto impacto orientados a la conversión y soporte para imágenes responsivas.
- **Trust Bar**: Barra de sellos de autoridad (Distribuidor Oficial INGCO) con scroll horizontal automático en dispositivos móviles.
- **Catálogo de Productos**: Grilla responsiva de productos con información hardcodeada de muestra (categorías INGCO e Iluminación).
- **Filtrado Dinámico**: Navegación rápida entre categorías de herramientas directamente desde la vista principal sin recargar la página.
- **Sistema de Cotización (WhatsApp)**: Drawer lateral (desktop) y bottom sheet (mobile) para acumular productos de interés y generar mensajes preformateados directos para el equipo de ventas.
- **Integración Cashea**: Banners promocionales, insignias (badges) destacadas en los productos y recordatorios persuasivos en el drawer de cotización para impulsar el pago en cuotas.
- **Infraestructura SEO Profesional**: Componentes optimizados para minimizar el TBT (Total Blocking Time) y maximizar el score en PageSpeed Insights.

### Fixed
- **Hydration Mismatches**: Se resolvieron los errores consistentes y bloqueos causados por extensiones del navegador (que inyectaban atributos como `bis_skin_checked` en el DOM) mediante la aplicación cuidadosa de `suppressHydrationWarning` en el layout raíz.
- **Regresiones de LCP/CLS**: Se restauró el Server-Side Rendering (SSR) estricto para el contenido principal (Hero y Catálogo), eliminando cuellos de botella de renderizado cliente que afectaban las Core Web Vitals.

### Changed
- **Estética Visual (Refactor)**: Transformación profunda del diseño hacia un estilo premium "Old Money / Industrial" empleando modo oscuro estricto, paleta de colores naranja quemado y negro, tipografía moderna y micro-animaciones fluidas (Framer Motion).
