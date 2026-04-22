# ADR-006: Generación Automática de Cotizaciones en PDF

## Status
Accepted

## Date
2026-04-22

## Context
El MVP inicial (ADR-002) generaba exclusivamente un mensaje preformateado de WhatsApp para solicitar cotizaciones. Aunque esto reduce la fricción y acelera el contacto inicial, muchos clientes B2B (empresas y contratistas) requieren un documento formal y respaldado para procesar órdenes de compra internamente antes de aprobar la transacción por WhatsApp.

## Decision
Implementar generación de documentos en el lado del cliente utilizando **jsPDF** y el plugin **jspdf-autotable**. Esto permite que el Quotation Drawer genere un archivo PDF profesional (con branding, tabla de items, y datos de contacto) al momento de solicitar la cotización, el cual el usuario puede descargar directamente o adjuntar en su mensaje.

## Alternatives Considered

### Generación de PDF en el Backend (Puppeteer / API externa)
- **Pros**: Control absoluto sobre el diseño mediante HTML/CSS tradicional.
- **Cons**: Introduce una latencia notable (segundos), requiere infraestructura de servidor más pesada y consumo de recursos innecesario.
- **Rejected**: Para un catálogo sin necesidad de firmas digitales en esta etapa, el procesamiento del lado del cliente es significativamente más rápido, barato y no interrumpe el flujo principal del usuario hacia WhatsApp.

## Consequences
- Mejoramos enormemente la legitimidad comercial percibida de CharaTools de cara a compradores empresariales B2B.
- Se agregaron las dependencias `jspdf` y `jspdf-autotable` al proyecto, incrementando marginalmente el bundle size del lado del cliente, aunque mitigado por code-splitting (carga perezosa solo cuando se abre el Quotation Drawer).
- El equipo de desarrollo ahora debe mantener tanto el diseño web como el template del layout del PDF ante cambios estructurales de los productos.
