/**
 * @file app/catalogo/layout.tsx
 * @description Layout del catálogo con soporte para slots paralelos (@modal).
 * Envuelve el catálogo y renderiza el slot modal cuando existe.
 */

export default function CatalogoLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
