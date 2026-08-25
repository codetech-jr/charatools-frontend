-- =============================================================================
-- Migración 006: Tableros y Cajas de Distribución Eléctrica
-- =============================================================================
-- Archivo: docs/migrations/006_add_panel_products.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-25
-- =============================================================================

BEGIN;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Tablero Eléctrico Sin Puerta',
    'tablero-electrico-sin-puerta',
    'CHARATOOLS-TABLERO-SIN-PUERTA',
    'Tablero de distribución eléctrica metálico sin puerta para breakers residenciales y comerciales.',
    'Tablero de distribución eléctrica metálico sin puerta para breakers residenciales y comerciales.',
    '{"imagen":"/categoria-electricidad.webp","priority":1,"tags":["tablero","distribución","eléctrico","sin puerta","circuitos","breaker"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Circuitos","variants":[{"value":"2 Circuitos"},{"value":"4 Circuitos"},{"value":"6 Circuitos"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tablero Eléctrico Con Puerta',
    'tablero-electrico-con-puerta',
    'CHARATOOLS-TABLERO-CON-PUERTA',
    'Tablero metálico de distribución con puerta frontal para protección de breakers en instalaciones eléctricas.',
    'Tablero metálico de distribución con puerta frontal para protección de breakers en instalaciones eléctricas.',
    '{"imagen":"/categoria-electricidad.webp","priority":2,"tags":["tablero","distribución","con puerta","eléctrico","circuitos","breaker","metálico"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Circuitos","variants":[{"value":"4 Circuitos"},{"value":"6 Circuitos"},{"value":"8 Circuitos"},{"value":"12 Circuitos"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tablero Termomagnético Riel DIN',
    'tablero-termomagnetico-riel-din',
    'CHARATOOLS-TABLERO-TERMOMAGNETICO',
    'Caja y tablero de distribución en PVC para interruptores termomagnéticos riel DIN de 1 a 8 circuitos.',
    'Caja y tablero de distribución en PVC para interruptores termomagnéticos riel DIN de 1 a 8 circuitos.',
    '{"imagen":"/categoria-electricidad.webp","priority":3,"tags":["tablero","termomagnético","riel DIN","PVC","distribución","breaker"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Circuitos","variants":[{"value":"1 Circuito"},{"value":"2 Circuitos"},{"value":"4 Circuitos"},{"value":"6 Circuitos"},{"value":"8 Circuitos"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tablero Termomagnético con Puerta Fumé (Empotrable y Superficial)',
    'tablero-termomagnetico-puerta-fume',
    'CHARATOOLS-TABLERO-PUERTA-FUME',
    'Tablero de distribución modular con tapa / puerta acrílica fumé transparente para montaje superficial o empotrable.',
    'Tablero de distribución modular con tapa / puerta acrílica fumé transparente para montaje superficial o empotrable.',
    '{"imagen":"/categoria-electricidad.webp","priority":4,"tags":["tablero","termomagnético","puerta fumé","empotrable","superficial","acrílico","breaker","distribución"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Circuitos","variants":[{"value":"2 Circuitos"},{"value":"4 Circuitos"},{"value":"8 Circuitos"},{"value":"10 Circuitos"},{"value":"12 Circuitos"},{"value":"24 Circuitos"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
