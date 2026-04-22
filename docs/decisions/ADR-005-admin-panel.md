# ADR-005: Panel de Administración Integrado

## Status
Accepted

## Date
2026-04-22

## Context
Con la transición a una base de datos dinámica mediante Supabase (ADR-004), surgió la necesidad inmediata de que el personal interno y administradores de CharaTools puedan gestionar (crear, leer, actualizar, eliminar) el inventario de productos de forma segura, sin tener que interactuar directamente con la consola de la base de datos SQL.

## Decision
Desarrollar un **Panel de Administración (Admin Dashboard)** nativo dentro del mismo proyecto Next.js, ubicado bajo las rutas `/admin/*` (ej. `/admin/productos`), con una estrategia de autenticación y autorización simplificada basada en tokens/sesiones (`lib/adminToken.ts`).

## Alternatives Considered

### CMS Externo (Sanity, Strapi, Contentful)
- **Pros**: Interfaces de administración poderosas generadas automáticamente.
- **Cons**: Costos adicionales, sincronización de esquemas complejos y separación del control del stack tecnológico.
- **Rejected**: Mantener el panel dentro del mismo proyecto Next.js utilizando los mismos componentes de Shadcn/ui garantiza una coherencia de diseño absoluta y elimina intermediarios o licenciamientos.

### Consola de Supabase
- **Pros**: Cero esfuerzo de desarrollo.
- **Cons**: Interfaz poco amigable para usuarios no técnicos y personal de ventas.
- **Rejected**: Riesgo alto de alteraciones accidentales en la base de datos; se requiere una interfaz a la medida para los flujos de trabajo de inventario.

## Consequences
- El proyecto ahora posee un área protegida exclusiva para administradores.
- Reutilizamos la misma librería de diseño (Tailwind + Shadcn/ui) para desarrollar tablas de datos interactivas (`AdminProductsTable.tsx`), asegurando un desarrollo rápido y una experiencia visual premium incluso en herramientas internas.
- Se añadió complejidad técnica al router y la gestión de middlewares/auth para proteger las rutas de administración de usuarios no autorizados.
