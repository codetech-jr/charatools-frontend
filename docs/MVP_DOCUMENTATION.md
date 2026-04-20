# Documentación del MVP: CharaTools Landing & Catalog

Bienvenido a la documentación oficial del MVP de CharaTools. Este documento y sus ramificaciones siguen los estándares definidos en la skill de **Documentation and ADRs**, priorizando el contexto (*el por qué*) por sobre la mera repetición de código (*el qué*).

## 📌 Visión General del Proyecto

CharaTools MVP es una aplicación web Frontend diseñada para actuar como un catálogo de alta conversión y landing page para un distribuidor oficial de herramientas INGCO. 

El objetivo principal de esta fase es **validar la demanda y generar leads calificados rápidamente**, sin incurrir en la fricción ni el costo de desarrollo de un e-commerce transaccional completo.

## 🏗️ Decisiones Arquitectónicas (ADRs)

Para entender por qué el proyecto está construido de la manera en que lo está, revisa nuestros Registros de Decisiones Arquitectónicas. Estos documentos previenen debates repetitivos y explican las limitaciones y ventajas de nuestras elecciones tecnológicas.

- [ADR-001: Selección del Stack Tecnológico del MVP](./decisions/ADR-001-mvp-tech-stack.md) - *Por qué usamos Next.js 15, Tailwind y Shadcn.*
- [ADR-002: Sistema de Cotización vía WhatsApp](./decisions/ADR-002-whatsapp-checkout.md) - *Por qué no hay pasarela de pago nativa.*
- [ADR-003: Integración Prominente de Cashea](./decisions/ADR-003-cashea-integration.md) - *Por qué el financiamiento define gran parte de nuestra UI.*

## 🚀 Inicio Rápido y Referencias

Si necesitas saber cómo correr el proyecto, modificar variables de diseño o entender la estructura de carpetas a nivel de código, revisa el README principal.

- [README.md](../README.md): Instrucciones de instalación, comandos de terminal (`pnpm dev`, `pnpm build`), y estructura de carpetas.
- [CHANGELOG.md](../CHANGELOG.md): Registro histórico de las versiones y características entregadas (incluyendo la V1 del MVP).
- [ARCHITECTURE.md](../ARCHITECTURE.md): Diagramas de flujo de estado global y vistas responsivas.

## 📖 Convenciones y Gotchas Importantes

### 1. Hydration Mismatches en Next.js
Dado el ecosistema de extensiones web en navegadores modernos (traducciones, bloqueadores de anuncios, inyectores de CSS), es común que el HTML generado por el servidor no coincida temporalmente con el del cliente en el `<body/>` y `<html/>`.
**Gotcha:** Para evitar crashes en desarrollo y producción, mantenemos el tag `suppressHydrationWarning` en el Root Layout de manera intencional. *No remover.*

### 2. Rendimiento (Performance First)
La arquitectura del MVP prioriza SEO y Core Web Vitals (meta: 90+).
**Convención:** Cualquier nuevo componente UI pesado o animado que requiera estado interactivo cliente, debe estar aislado (ej. un archivo `*.client.tsx` o usar directiva `"use client"`) lo más "abajo" en el árbol posible, permitiendo que las secciones críticas (Hero, Grillas de imágenes) permanezcan renderizadas por servidor (SSR).

### 3. Componentes UI (Shadcn)
Nos apoyamos en `Shadcn/ui`, lo que significa que **poseemos el código** de nuestros componentes base (ubicados en `components/ui`).
**Convención:** Si un botón o un modal necesita comportarse diferente, modifica el código interno del componente en la carpeta UI. No instales otra librería externa para resolver un problema de diseño menor.

---

*La documentación es un ente vivo. Si cambias el funcionamiento base, actualiza el ADR correspondiente o crea uno nuevo indicando el estado del anterior (Superseded).*
