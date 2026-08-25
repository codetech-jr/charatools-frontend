-- =============================================================================
-- Migración 008: Breakers Termomagnéticos Riel DIN (1, 2 y 3 Polos)
-- =============================================================================
-- Archivo: docs/migrations/008_add_din_breakers.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-25
-- =============================================================================

BEGIN;

INSERT INTO public.brands (name, slug, logo_url)
VALUES 
  ('Steck', 'steck', '/categoria-electricidad.webp'),
  ('CHINT', 'chint', '/categoria-electricidad.webp')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Breaker Termomagnético Riel DIN 1 Polo',
    'breaker-termomagnetico-din-1-polo',
    'CHARATOOLS-BREAKER-DIN-1P',
    'Interruptor termomagnético modular para montaje en riel DIN monofásico de 1 polo para tableros de protección.',
    'Interruptor termomagnético modular para montaje en riel DIN monofásico de 1 polo para tableros de protección residencial y comercial.',
    '{"imagen":"/categoria-electricidad.webp","priority":11,"tags":["breaker","termomagnético","riel DIN","1 polo","monofásico","Steck","CHINT","disyuntor"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"10A"},{"value":"16A"},{"value":"20A"},{"value":"25A"},{"value":"32A"},{"value":"40A"},{"value":"50A"},{"value":"63A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'steck'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Breaker Termomagnético Riel DIN 2 Polos',
    'breaker-termomagnetico-din-2-polos',
    'CHARATOOLS-BREAKER-DIN-2P',
    'Interruptor termomagnético modular para montaje en riel DIN bifásico de 2 polos para protección de 240V.',
    'Interruptor termomagnético modular para montaje en riel DIN bifásico de 2 polos para protección de circuitos de 240V.',
    '{"imagen":"/categoria-electricidad.webp","priority":12,"tags":["breaker","termomagnético","riel DIN","2 polos","bifásico","CHINT","Steck","disyuntor"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"16A"},{"value":"20A"},{"value":"25A"},{"value":"32A"},{"value":"40A"},{"value":"50A"},{"value":"63A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'chint'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Breaker Termomagnético Riel DIN 3 Polos',
    'breaker-termomagnetico-din-3-polos',
    'CHARATOOLS-BREAKER-DIN-3P',
    'Interruptor termomagnético modular para montaje en riel DIN trifásico de 3 polos para tableros trifásicos y motores.',
    'Interruptor termomagnético modular para montaje en riel DIN trifásico de 3 polos para tableros trifásicos y control de motores.',
    '{"imagen":"/categoria-electricidad.webp","priority":13,"tags":["breaker","termomagnético","riel DIN","3 polos","trifásico","CHINT","Steck","disyuntor"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"20A"},{"value":"25A"},{"value":"32A"},{"value":"40A"},{"value":"50A"},{"value":"63A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'chint'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
