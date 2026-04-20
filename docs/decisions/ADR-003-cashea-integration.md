# ADR-003: Integración Prominente de Cashea en la UI

## Status
Accepted

## Date
2026-04-18

## Context
Para reducir la fricción de compra e incrementar drásticamente las conversiones en la landing page de CharaTools, necesitamos destacar la disponibilidad de métodos de financiamiento. Cashea se ha posicionado como una plataforma clave en el mercado local para pagos fraccionados sin intereses. Los usuarios que navegan el catálogo de herramientas (especialmente las de alto costo) deben saber instantáneamente que tienen la opción de comprar ahora y pagar en cuotas.

## Decision
Integrar a **Cashea** como un pilar fundamental del mensaje de ventas y diseño de conversión a través de toda la UI del MVP. Esto incluye:
1. Un banner promocional de alto impacto en el Homepage / Layout general.
2. Un badge visual de confianza ("Cashea-ready" o similar) en las tarjetas individuales de producto (Product Cards).
3. Mensajería de refuerzo explícita dentro del cajón de cotización (Quotation Drawer) en el paso previo a enviar el mensaje.

## Alternatives Considered

### Mención de Cashea solo en el Footer o en una página de FAQs
- **Pros**: Interfaz de usuario más limpia, menos ruido visual o carga cognitiva en el catálogo.
- **Cons**: Gran parte de los usuarios no hace scroll hasta el footer. Se pierde el inmenso poder persuasivo del financiamiento justamente durante el momento de consideración (exploración del catálogo).
- **Rejected**: El financiamiento fraccionado es un argumento de venta principal; esconderlo disminuye severamente la tasa de conversión percibida.

### Botón de pago directo automatizado con Cashea (1-Click Checkout)
- **Pros**: Reducción masiva de la fricción, experiencia de e-commerce moderno real.
- **Cons**: Requiere integración técnica profunda con el backend a través de la API de Cashea para crear y verificar órdenes de pago dinámicas.
- **Rejected**: Técnicamente inviable en la arquitectura actual del MVP, ya que (como indica el ADR-002) no poseemos un backend transaccional propio.

## Consequences
- La UI adquiere una mayor densidad de información comercial. Requirió iteraciones de diseño cuidadoso (uso de badges sutiles, banners con colores corporativos consistentes) para no abrumar al usuario ni degradar la estética "Premium/Dark Mode" de la marca.
- Dado que no hay integración por API, el equipo de ventas (por WhatsApp) asume la responsabilidad operativa de procesar y validar manualmente las compras realizadas por los clientes a través de la aplicación de Cashea, una vez que el cliente envía su lista de cotización. La landing page actúa netamente como un poderoso canal de marketing y originación.
- Se fortalece significativamente la percepción de marca de CharaTools como un distribuidor accesible, moderno y aliado del comprador profesional.
