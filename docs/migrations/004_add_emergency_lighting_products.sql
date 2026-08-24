-- =============================================================================
-- Migración 004: Lámparas de Emergencia (Lumistar 6W y Bombillo Recargable 9W)
-- =============================================================================
-- Archivo: docs/migrations/004_add_emergency_lighting_products.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-24
-- =============================================================================

BEGIN;

-- Crear o asegurar la marca Lumistar
INSERT INTO public.brands (name, slug)
VALUES ('Lumistar', 'lumistar')
ON CONFLICT (slug) DO NOTHING;

-- Insertar Productos de Emergencia
INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Lámpara de Emergencia LED Lumistar 6W Multivoltaje',
    'lampara-emergencia-led-lumistar-6w',
    'CHARATOOLS-LAMPARA-EMERGENCIA-6W',
    'Lámpara de emergencia LED Lumistar 6W multivoltaje (85-265V) con autonomía de hasta 3 horas y doble faro orientable.',
    'Lámpara de emergencia LED Lumistar 6W multivoltaje (85-265V) con autonomía de hasta 3 horas y doble faro orientable.',
    '{"imagen":"/iluminacion.webp","priority":1,"tags":["LED","lámpara","emergencia","Lumistar","6W","recargable","multivoltaje","3 horas"],"stockStatus":"available","unidad":"und","subcategory":"emergencia","subitem":"emergencia","variantLabel":"Potencia","variants":[{"value":"6W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'lumistar'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Bombillo LED de Emergencia Recargable 9W',
    'bombillo-led-emergencia-9w-recargable',
    'CHARATOOLS-BOMBILLO-EMERGENCIA-9W',
    'Bombillo LED recargable de emergencia 9W multivoltaje (85-265V) 6500K blanco frío con socket y gancho portátil.',
    'Bombillo LED recargable de emergencia 9W multivoltaje (85-265V) 6500K blanco frío con socket y gancho portátil.',
    '{"imagen":"/iluminacion.webp","priority":2,"tags":["LED","bombillo","emergencia","recargable","9W","Lumistar","6500K","gancho portátil"],"stockStatus":"available","unidad":"und","subcategory":"emergencia","subitem":"emergencia","variantLabel":"Potencia","variants":[{"value":"9W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'lumistar'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
