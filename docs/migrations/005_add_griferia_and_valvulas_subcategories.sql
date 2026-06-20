-- =============================================================================
-- Migración 005: Agregar subcategorías de Grifería (Lavamanos, Fregadores) y Válvulas
-- =============================================================================
-- Archivo: docs/migrations/005_add_griferia_and_valvulas_subcategories.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-06-19
--
-- DESCRIPCIÓN:
--   Se eliminan las subcategorías genéricas de grifería y se añaden las nuevas
--   estructuras de 2 niveles bajo Plomería:
--   - Nivel 1 (hijos de Plomería): Grifería para Lavamanos, Grifería para Fregadores, Válvulas y Llaves.
--   - Nivel 2: Monomandos, mezcladoras, grifos y llaves específicas.
-- =============================================================================

BEGIN;

-- 1. Eliminar la categoría antigua 'Grifería y Válvulas' si existe
DELETE FROM public.categories WHERE slug = 'griferia';

-- 2. Insertar subcategorías de primer nivel (depth 1) bajo Plomería (parent_id: '8dcaa283-542a-4229-abb2-16bcfbecf459')
INSERT INTO public.categories (id, parent_id, name, slug, depth, sort_order, is_active)
VALUES 
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0001', '8dcaa283-542a-4229-abb2-16bcfbecf459', 'Grifería para Lavamanos', 'griferia-lavamanos', 1, 10, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0002', '8dcaa283-542a-4229-abb2-16bcfbecf459', 'Grifería para Fregadores', 'griferia-fregadores', 1, 20, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0003', '8dcaa283-542a-4229-abb2-16bcfbecf459', 'Válvulas y Llaves', 'valvulas-llaves', 1, 30, true)
ON CONFLICT (slug) 
DO UPDATE SET 
  parent_id = EXCLUDED.parent_id,
  name = EXCLUDED.name,
  depth = EXCLUDED.depth,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 3. Insertar subcategorías de segundo nivel (depth 2) bajo 'Grifería para Lavamanos'
INSERT INTO public.categories (id, parent_id, name, slug, depth, sort_order, is_active)
VALUES 
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0004', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0001', 'Monomandos Altos', 'monomandos-altos', 2, 10, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0005', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0001', 'Monomandos Estándar', 'monomandos-estandar', 2, 20, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0006', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0001', 'Grifos Individuales', 'grifos-individuales', 2, 30, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0007', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0001', 'Juegos Twin (8 pulgadas)', 'juegos-twin', 2, 40, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0008', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0001', 'Grifería Institucional', 'griferia-institucional', 2, 50, true)
ON CONFLICT (slug)
DO UPDATE SET 
  parent_id = EXCLUDED.parent_id,
  name = EXCLUDED.name,
  depth = EXCLUDED.depth,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 4. Insertar subcategorías de segundo nivel (depth 2) bajo 'Grifería para Fregadores'
INSERT INTO public.categories (id, parent_id, name, slug, depth, sort_order, is_active)
VALUES 
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0009', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0002', 'Monomandos de Fregador', 'monomandos-fregador', 2, 10, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0010', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0002', 'Mezcladoras de Fregador', 'mezcladoras-fregador', 2, 20, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0011', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0002', 'Grifos Sencillos', 'grifos-fregador', 2, 30, true)
ON CONFLICT (slug)
DO UPDATE SET 
  parent_id = EXCLUDED.parent_id,
  name = EXCLUDED.name,
  depth = EXCLUDED.depth,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 5. Insertar subcategorías de segundo nivel (depth 2) bajo 'Válvulas y Llaves'
INSERT INTO public.categories (id, parent_id, name, slug, depth, sort_order, is_active)
VALUES 
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0012', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0003', 'Válvulas de Bola', 'valvulas-bola', 2, 10, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0013', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0003', 'Llaves de Paso', 'llaves-paso', 2, 20, true),
  ('a8264e1c-5d9c-485a-a38f-b26a8bfd0014', 'a8264e1c-5d9c-485a-a38f-b26a8bfd0003', 'Llaves de Chorro', 'llaves-chorro', 2, 30, true)
ON CONFLICT (slug)
DO UPDATE SET 
  parent_id = EXCLUDED.parent_id,
  name = EXCLUDED.name,
  depth = EXCLUDED.depth,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

COMMIT;
