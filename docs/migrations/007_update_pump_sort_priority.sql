-- =============================================================================
-- Migración 007: Actualizar la prioridad de ordenamiento de Bombas Periféricas
-- =============================================================================
-- Archivo: docs/migrations/007_update_pump_sort_priority.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-07-28
--
-- DESCRIPCIÓN:
--   Asignar prioridad en el JSONB `specs` para que las bombas periféricas
--   se muestren en el orden solicitado por el cliente:
--   1. Bomba de Agua Periférica 1/2 HP (priority = 1)
--   2. Bomba de Agua Periférica 3/4 HP (priority = 2)
--   3. Bomba de Agua Periférica 1 HP   (priority = 3)
-- =============================================================================

BEGIN;

-- 1. Bomba Periférica 1/2 HP -> prioridad 1
UPDATE public.products 
SET specs = jsonb_set(COALESCE(specs, '{}'::jsonb), '{priority}', '1')
WHERE slug LIKE '%bomba-periferica-1-2%' OR name LIKE '%1/2 HP%';

-- 2. Bomba Periférica 3/4 HP -> prioridad 2
UPDATE public.products 
SET specs = jsonb_set(COALESCE(specs, '{}'::jsonb), '{priority}', '2')
WHERE slug LIKE '%bomba-periferica-3-4%' OR name LIKE '%3/4 HP%';

-- 3. Bomba Periférica 1 HP -> prioridad 3
UPDATE public.products 
SET specs = jsonb_set(COALESCE(specs, '{}'::jsonb), '{priority}', '3')
WHERE (slug LIKE '%bomba-periferica-1hp%' OR slug LIKE '%bomba-periferica-1-hp%' OR name LIKE '%1 HP%')
  AND name NOT LIKE '%1/2 HP%' AND name NOT LIKE '%3/4 HP%';

COMMIT;
