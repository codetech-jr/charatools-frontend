-- =============================================================================
-- Migración 003: Agregar prioridad de ordenamiento en productos de Plomería
-- =============================================================================
-- Archivo: docs/migrations/003_add_plumbing_sort_priority.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-06-05
--
-- DESCRIPCIÓN: 
--   marketing ha solicitado unificar tuberías y conexiones en "Líneas"
--   y mostrar siempre las tuberías en primer lugar. Para ello, añadimos un 
--   campo `priority` en el JSONB `specs` de todos los productos de plomería.
--   - Prioridad 1: Tuberías
--   - Prioridad 2: Conexiones / Accesorios
-- =============================================================================

BEGIN;

-- 1. Asignar prioridad 1 (Tuberías)
UPDATE public.products 
SET specs = jsonb_set(specs, '{priority}', '1') 
WHERE specs->>'subitem' IN ('tuberia-sanitaria-estandar', 'tuberia-sanitaria-reforzada', 'tuberia-agua-fria');

-- 2. Asignar prioridad 2 (Conexiones / Accesorios)
UPDATE public.products 
SET specs = jsonb_set(specs, '{priority}', '2') 
WHERE specs->>'subitem' IN ('conexiones-sanitarias-estandar', 'conexiones-sanitarias-reforzadas', 'conexiones-agua-fria', 'conexiones-galvanizadas');

COMMIT;
