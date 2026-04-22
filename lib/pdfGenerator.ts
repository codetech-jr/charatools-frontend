import type { QuotationItem, ContactInfo } from '@/store/quotationStore'

/**
 * Genera y descarga un PDF con la proforma/cotización del cliente.
 * Sigue el patrón B2B sin precios (estos se confirman por WA).
 * 
 * Se usan importaciones dinámicas para evitar errores de SSR con jspdf/fflate.
 */
export const generateProformaPDF = async (items: QuotationItem[], contactInfo: ContactInfo) => {
  if (typeof window === 'undefined') return

  const { jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF()

  // ── Configuración de Fuentes y Colores ──
  const primaryColor: [number, number, number] = [249, 115, 22] // orange-500
  const textColor: [number, number, number] = [60, 60, 60]

  // ── Header del Documento ──
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('CHARATOOLS, C.A', 14, 22)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...textColor)
  doc.text('RIF: J-401234567', 14, 28)

  const today = new Date().toLocaleDateString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  doc.text(`Cotización de Insumos - Fecha: ${today}`, 14, 34)

  // ── Línea separadora ──
  doc.setDrawColor(200, 200, 200)
  doc.line(14, 40, 196, 40)

  // ── Datos del Cliente ──
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Datos del Cliente:', 14, 48)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Nombre: ${contactInfo.nombre || 'Pendiente al entregar'}`, 14, 55)
  doc.text(`Cédula/RIF: ${contactInfo.cedula || 'Pendiente al entregar'}`, 14, 61)
  doc.text(`Sector/Zona: ${contactInfo.sector || 'Pendiente al entregar'}`, 14, 67)

  // ── Tabla de Productos (AutoTable) ──
  const tableData = items.map((item, index) => {
    const reference = item.reference ? `\nRef: ${item.reference}` : ''
    const notes = item.notes ? `\nNota: ${item.notes}` : ''
    const description = `${item.brand} | ${item.name}${reference}${notes}`
    
    return [
      (index + 1).toString(),
      description,
      `${item.qty} ${item.unit}`
    ]
  })

  autoTable(doc, {
    startY: 75,
    head: [['#', 'Descripción del Producto', 'Cant.']],
    body: tableData,
    theme: 'striped',
    headStyles: { 
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 9, 
      cellPadding: 4,
      textColor: textColor
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 30, halign: 'center', fontStyle: 'bold' }
    }
  })

  // ── Footer Legal / Informativo ──
  // @ts-expect-error lastAutoTable is added by jspdf-autotable plugin
  const finalY = doc.lastAutoTable?.finalY || 75
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(100, 100, 100)
  
  const footerText = 'Documento referencial sin valor fiscal. Sujeto a Confirmación y Tasación por el Dpto de Venta / WA.'
  
  // Centrar el footer
  const pageSize = doc.internal.pageSize
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
  const textWidth = doc.getTextWidth(footerText)
  
  doc.text(
    footerText,
    (pageWidth - textWidth) / 2,
    finalY + 20
  )

  // ── Guardado ──
  const fileNameName = contactInfo.nombre 
    ? contactInfo.nombre.replace(/\s+/g, '_') 
    : 'Pendiente'
    
  doc.save(`Cotizacion_Charatools_${fileNameName}.pdf`)
}

