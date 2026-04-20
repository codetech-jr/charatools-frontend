# ADR-001: Selección del Stack Tecnológico del MVP

## Status
Accepted

## Date
2026-04-18

## Context
Necesitábamos construir el MVP (Minimum Viable Product) de la landing page y catálogo para CharaTools (distribuidor oficial de herramientas INGCO).
Los requerimientos clave incluían:
- Alta velocidad de carga y rendimiento (SEO técnico de nivel profesional, meta de 90+ en PageSpeed).
- Interfaz moderna, de alta calidad visual (modo oscuro, colores profesionales naranja/negro) e interactividad fluida.
- Escalabilidad futura para convertirse en un ecommerce transaccional completo.
- Desarrollo ágil y mantenimiento simplificado para un equipo pequeño.

## Decision
Seleccionamos **Next.js 15 (App Router)** con **React 18**, **TypeScript**, **Tailwind CSS 4.2**, **Zustand / Context API** para el estado global, y **Shadcn/ui** para los componentes base.

## Alternatives Considered

### React SPA (Vite)
- **Pros**: Fácil configuración, excelente experiencia de desarrollo (HMR súper rápido).
- **Cons**: Renderizado 100% del lado del cliente por defecto, lo que penaliza fuertemente el SEO inicial, el First Contentful Paint (FCP) y el Total Blocking Time (TBT).
- **Rejected**: El SEO técnico y el rendimiento de carga inicial son críticos para un ecommerce de herramientas. Next.js resuelve esto "out of the box" con App Router y Server-Side Rendering (SSR).

### Remix
- **Pros**: Excelente manejo de carga de datos, mutations simples, uso de estándares web.
- **Cons**: Ecosistema ligeramente menor que Next.js en cuanto a componentes prefabricados.
- **Rejected**: Next.js tiene un ecosistema más robusto actualmente y Shadcn/ui fue diseñado originalmente pensando en integrarse nativamente con Next.js y Tailwind.

### Vanilla CSS / SASS
- **Pros**: Flexibilidad total, cero dependencias adicionales.
- **Cons**: Mantenimiento complejo a escala, falta de sistema de diseño (Design Tokens) predefinido, tiempos de desarrollo más largos para UI responsiva y modos oscuros.
- **Rejected**: Tailwind CSS acelera drásticamente el desarrollo y garantiza la consistencia del diseño mediante su sistema de utility classes.

## Consequences
- El uso de Next.js 15 App Router permite Server-Side Rendering (SSR) optimizando métricas críticas como LCP y CLS desde el día 1.
- Shadcn/ui acelera el desarrollo de la interfaz de usuario con componentes preconstruidos, accesibles (WCAG) y altamente personalizables sin encerrarnos en una librería de componentes rígida (ya que poseemos el código).
- TypeScript asegura el tipado estático, reduciendo drásticamente errores en tiempo de ejecución (especialmente en la manipulación de datos del catálogo y el estado de la cotización).
- **Trade-off**: Existe una curva de aprendizaje y complejidad inherente al App Router de Next.js y el manejo de componentes de servidor vs cliente. De hecho, enfrentamos problemas de hydration mismatches inyectados por extensiones de navegador (como `bis_skin_checked`), los cuales se mitigaron mediante `suppressHydrationWarning`.
