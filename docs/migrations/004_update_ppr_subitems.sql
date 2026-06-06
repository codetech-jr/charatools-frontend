-- =============================================================================
-- Migración 004: Subdivisión de Termofusión PPR (Tuberías y Conexiones)
-- =============================================================================
-- Archivo: docs/migrations/004_update_ppr_subitems.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-06-06
--
-- DESCRIPCIÓN:
--   marketing ha solicitado unificar tuberías y conexiones de PPR bajo 
--   "Línea Termofusión (PPR)" y dar prioridad a las tuberías.
--   Para ello, subdividimos los productos con subitem 'termofusion-ppr':
--   - Si el nombre contiene 'Tubo' o 'Tubería' (y no es soporte/tijera):
--     subitem = 'tuberia-termofusion-ppr', priority = 1.
--   - En caso contrario (accesorios, conexiones, herramientas):
--     subitem = 'conexiones-termofusion-ppr', priority = 2.
-- =============================================================================

BEGIN;

-- 1. Marcar como tubería de PPR (subitem = 'tuberia-termofusion-ppr', priority = 1)
UPDATE public.products
SET specs = jsonb_set(jsonb_set(specs, '{subitem}', '"tuberia-termofusion-ppr"'), '{priority}', '1')
WHERE specs->>'subitem' = 'termofusion-ppr'
  AND (name ILIKE '%Tubo%' OR name ILIKE '%Tubería%')
  AND name NOT ILIKE '%Soporte%'
  AND name NOT ILIKE '%Tijera%';

-- 1.5 Asegurar que tuberías ya marcadas previamente tengan prioridad 1
UPDATE public.products
SET specs = jsonb_set(specs, '{priority}', '1')
WHERE specs->>'subitem' = 'tuberia-termofusion-ppr'
  AND (specs->>'priority' IS NULL OR specs->'priority' IS NULL);

-- 2. Marcar como conexiones de PPR (subitem = 'conexiones-termofusion-ppr', priority = 2)
UPDATE public.products
SET specs = jsonb_set(jsonb_set(specs, '{subitem}', '"conexiones-termofusion-ppr"'), '{priority}', '2')
WHERE specs->>'subitem' = 'termofusion-ppr';

COMMIT;
