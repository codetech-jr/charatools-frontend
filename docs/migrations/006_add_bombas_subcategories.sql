-- =============================================================================
-- Migración 006: Agregar subcategoría de Bombas de Agua y sub-ítem Periféricas
-- =============================================================================
-- Archivo: docs/migrations/006_add_bombas_subcategories.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-07-03
--
-- DESCRIPCIÓN:
--   - Inserta la subcategoría de nivel 1 'Bombas de Agua' bajo Plomería.
--   - Inserta la subcategoría de nivel 2 'Bombas de Agua Periféricas' bajo 'Bombas de Agua'.
--   - Actualiza las especificaciones (specs JSONB) de la bomba periférica y del press control existentes.
-- =============================================================================

BEGIN;

-- 1. Insertar subcategoría de primer nivel (depth 1) bajo Plomería (parent_id: '8dcaa283-542a-4229-abb2-16bcfbecf459')
INSERT INTO public.categories (id, parent_id, name, slug, depth, sort_order, is_active)
VALUES 
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd9001', '8dcaa283-542a-4229-abb2-16bcfbecf459', 'Bombas de Agua', 'bombas', 1, 40, true)
ON CONFLICT (slug) 
DO UPDATE SET 
  parent_id = EXCLUDED.parent_id,
  name = EXCLUDED.name,
  depth = EXCLUDED.depth,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 2. Insertar subcategoría de segundo nivel (depth 2) bajo 'Bombas de Agua' (parent_id: 'a8264e1c-5d9c-485a-a38f-b26a8bfd9001')
INSERT INTO public.categories (id, parent_id, name, slug, depth, sort_order, is_active)
VALUES 
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd9002', 'a8264e1c-5d9c-485a-a38f-b26a8bfd9001', 'Bombas de Agua Periféricas', 'bombas-perifericas', 2, 10, true)
ON CONFLICT (slug)
DO UPDATE SET 
  parent_id = EXCLUDED.parent_id,
  name = EXCLUDED.name,
  depth = EXCLUDED.depth,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 3. Actualizar el producto de bomba periférica existente en la base de datos
UPDATE public.products
SET specs = specs || '{"subcategory": "bombas", "subitem": "bomba-periferica-1-2hp"}'::jsonb
WHERE slug = 'bomba-periferica-1-2hp';

-- 4. Actualizar el producto de press control existente en la base de datos
UPDATE public.products
SET specs = specs || '{"subcategory": "bombas"}'::jsonb
WHERE slug = 'press-control-automatico';

COMMIT;
