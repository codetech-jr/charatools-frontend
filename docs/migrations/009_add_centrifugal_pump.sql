-- =============================================================================
-- Migración 009: Bomba Centrífuga de Agua (1 HP y 2 HP)
-- =============================================================================
-- Archivo: docs/migrations/009_add_centrifugal_pump.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-26
-- =============================================================================

BEGIN;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Bomba Centrífuga de Agua',
    'bomba-centrifuga',
    'CHARATOOLS-BOMBA-CENTRIFUGA',
    'Bomba centrífuga de alto caudal para suministro, elevación de agua limpia y sistemas hidroneumáticos.',
    'Electrobomba centrífuga diseñada para transferir grandes volúmenes de agua limpia con flujo continuo y presión estable. Ideal para sistemas hidroneumáticos, riego, llenado de tanques elevados y abastecimiento en general.',
    '{"imagen":"/categoria-plomeria.webp","priority":4,"tags":["bomba","centrífuga","agua","alto caudal","presión","tanque","hidroneumático"],"stockStatus":"available","unidad":"und","subcategory":"bombas","subitem":"bombas-centrifugas","variantLabel":"Potencia","variants":[{"value":"1 HP"},{"value":"2 HP"}]}'::jsonb,
    true,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'plomeria')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
