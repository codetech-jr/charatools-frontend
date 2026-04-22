# ADR-004: Migración a Base de Datos Dinámica con Supabase

## Status
Accepted

## Date
2026-04-22

## Context
Originalmente, el MVP utilizaba un archivo `products.json` para renderizar el catálogo de herramientas y luces. Esto fue útil para validar la UI inicial rápidamente, pero representaba un cuello de botella para la actualización del inventario y la escalabilidad. Además, agregar nuevas herramientas o actualizar precios (cuando se implementen) requeriría un *deploy* del código fuente, lo cual no es escalable para un ecommerce real.

## Decision
Integrar **Supabase** como proveedor de Backend as a Service (BaaS) para la gestión de base de datos relacional (PostgreSQL), utilizando los paquetes `@supabase/ssr` y `@supabase/supabase-js`.

## Alternatives Considered

### Firebase / Firestore
- **Pros**: Rápido de configurar, ecosistema maduro.
- **Cons**: Base de datos NoSQL, lo cual complica relaciones complejas típicas del ecommerce (Productos, Categorías, Órdenes, Usuarios).
- **Rejected**: Las consultas relacionales complejas y el soporte completo de SQL son vitales a largo plazo para un ecommerce de ferretería con filtros avanzados.

### Backend Propio (Node.js/Express + Prisma)
- **Pros**: Control total sobre la infraestructura y el modelo de datos.
- **Cons**: Aumenta significativamente la carga de mantenimiento, requiere gestión de servidores/contenedores y configuración de seguridad manual.
- **Rejected**: Alenta la velocidad de desarrollo del MVP. Supabase ofrece una base de datos PostgreSQL completa con una API instantánea y manejo de autenticación.

## Consequences
- Los productos ahora se gestionan de forma dinámica y pueden actualizarse en tiempo real sin requerir de un despliegue de código.
- Incorporamos lógica asíncrona robusta y manejo del estado de carga (loading states) en los componentes que dependen de datos.
- Añadimos la capacidad futura de escalar a almacenamiento de imágenes de productos (Supabase Storage) y autenticación de usuarios de forma casi nativa.
