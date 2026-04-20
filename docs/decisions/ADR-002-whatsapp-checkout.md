# ADR-002: Sistema de Cotización vía WhatsApp

## Status
Accepted

## Date
2026-04-18

## Context
Para el MVP de CharaTools, necesitamos un mecanismo para que los usuarios expresen su intención de compra o soliciten precios de herramientas. Implementar una pasarela de pago completa, con un sistema de gestión de inventario en tiempo real y registro de usuarios, tomaría meses de desarrollo e integraciones complejas (bancos locales, envíos, cálculo de impuestos). La meta principal del MVP es validar la demanda y generar "leads" (prospectos) cualificados de la manera más rápida posible con la menor fricción para el usuario.

## Decision
Implementar un **"Carrito de Cotización" (Quotation Drawer)** que funcione puramente en el estado del cliente (frontend) y finalice la acción construyendo una URL dinámica que abre WhatsApp con un mensaje preformateado hacia el número de ventas de CharaTools.

## Alternatives Considered

### Checkout Completo Transaccional (ej. Shopify, Stripe, pasarelas locales)
- **Pros**: Proceso de compra 100% automatizado y escalable sin intervención humana directa.
- **Cons**: Requiere un backend robusto para manejar órdenes, pagos, inventario sincronizado en tiempo real, autenticación de usuarios y cálculos de envío complejos (según sector/zona de entrega).
- **Rejected**: No es factible ni necesario para un MVP cuya prioridad es salir al mercado rápido para validar la tracción.

### Formulario de Cotización por Email (Lead Form clásico)
- **Pros**: Asíncrono, fácil de integrar vía API (ej. Resend, SendGrid) sin salir de la página.
- **Cons**: La tasa de conversión y el tiempo de respuesta en ventas B2B o de ferretería suele ser peor por email que por mensajería instantánea. Menos "personal" y cálido para el usuario latinoamericano.
- **Rejected**: WhatsApp es indiscutiblemente el canal de ventas y comunicación preferido en el mercado objetivo, garantizando una respuesta mucho más rápida y mayor probabilidad de cierre.

## Consequences
- El estado de la cotización (los items agregados al "carrito") se maneja efímeramente en el cliente (Context/Zustand). Si el usuario limpia el navegador, pierde el carrito (riesgo aceptable para la etapa actual).
- Reducimos drásticamente la superficie de ataque y los requerimientos de cumplimiento de privacidad (como el RGPD o leyes locales de datos), ya que **no almacenamos datos personales en bases de datos**. El usuario envía voluntariamente su información por WhatsApp de extremo a extremo.
- La experiencia de finalización de compra asume que el usuario tiene WhatsApp instalado (web o app móvil), lo cual es una fricción prácticamente nula en la demografía objetivo.
- Operacionalmente, permite al equipo de ventas hacer *upselling*, negociar grandes volúmenes, confirmar la disponibilidad de stock exacta manualmente, e incluso ofrecer métodos de pago manuales (Zelle, Pago Móvil, Cashea) antes de comprometer un envío.
