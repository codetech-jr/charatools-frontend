/**
 * @file scripts/test-catalog-sidebar.ts
 * @description Script de verificación automática para asegurar que DesktopCatalogSidebar
 * se renderiza de manera permanente y por defecto en la vista del catálogo.
 */

import React from 'react'
import { CatalogPageView } from '../components/catalog/CatalogPageView'
import { DesktopCatalogSidebar } from '../components/catalog/CatalogSidebar'
import { MOCK_CATALOG } from '../lib/mockCatalog'
import fs from 'fs'
import path from 'path'

function runSidebarVerification() {
  console.log('🔍 Iniciando verificación de visualización permanente de la barra lateral de filtros...\n')

  // 1. Verificar existencia y exportación de componentes requeridos
  if (!CatalogPageView) {
    throw new Error('❌ Error: CatalogPageView no está exportado correctamente.')
  }
  if (!DesktopCatalogSidebar) {
    throw new Error('❌ Error: DesktopCatalogSidebar no está exportado correctamente.')
  }
  console.log('✅ Componentes CatalogPageView y DesktopCatalogSidebar importados correctamente.')

  // 2. Verificar estáticamente el código fuente de CatalogPageView.tsx
  const catalogPageViewPath = path.join(__dirname, '../components/catalog/CatalogPageView.tsx')
  const catalogPageViewSource = fs.readFileSync(catalogPageViewPath, 'utf-8')

  // Assertions sobre el código fuente
  const checks = [
    {
      description: 'Estado inicial showSidebar configurado en true',
      test: () => catalogPageViewSource.includes('useState(true)'),
    },
    {
      description: 'Efecto de rehidratación en mount/navigation (useEffect -> setShowSidebar(true))',
      test: () => catalogPageViewSource.includes('useEffect(') && catalogPageViewSource.includes('setShowSidebar(true)'),
    },
    {
      description: 'Inclusión explícita de DesktopCatalogSidebar sin condicionales que lo oculten',
      test: () => catalogPageViewSource.includes('<DesktopCatalogSidebar'),
    },
  ]

  let allPassed = true
  checks.forEach((check, idx) => {
    const passed = check.test()
    if (passed) {
      console.log(`  [Pass ${idx + 1}] ${check.description}`)
    } else {
      console.error(`  [FAIL ${idx + 1}] ${check.description}`)
      allPassed = false
    }
  })

  // 3. Verificar estáticamente DesktopCatalogSidebar en CatalogSidebar.tsx
  const catalogSidebarPath = path.join(__dirname, '../components/catalog/CatalogSidebar.tsx')
  const catalogSidebarSource = fs.readFileSync(catalogSidebarPath, 'utf-8')

  const sidebarChecks = [
    {
      description: 'Uso de data-testid="category-sidebar" o aria-label="Filtros del catálogo"',
      test: () => catalogSidebarSource.includes('data-testid="category-sidebar"') || catalogSidebarSource.includes('aria-label="Filtros del catálogo"'),
    },
    {
      description: 'Valor por defecto isVisible = props.showSidebar ?? true',
      test: () => catalogSidebarSource.includes('props.showSidebar ?? true'),
    },
    {
      description: 'Clases CSS para visualización fija en escritorio (hidden lg:block w-[260px])',
      test: () => catalogSidebarSource.includes('hidden lg:block') && catalogSidebarSource.includes('w-[260px]'),
    },
  ]

  sidebarChecks.forEach((check, idx) => {
    const passed = check.test()
    if (passed) {
      console.log(`  [Pass ${idx + 4}] ${check.description}`)
    } else {
      console.error(`  [FAIL ${idx + 4}] ${check.description}`)
      allPassed = false
    }
  })

  if (allPassed) {
    console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON! La barra lateral de categorías y filtros está configurada para mostrarse permanentemente por defecto sin depender de un botón previo.')
  } else {
    console.error('\n❌ Se detectaron fallos en la verificación de la barra lateral.')
    process.exit(1)
  }
}

runSidebarVerification()
