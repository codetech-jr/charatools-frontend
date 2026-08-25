-- =============================================================================
-- Migración 007: Interruptores Termomagnéticos (Breakers THQC y THQL)
-- =============================================================================
-- Archivo: docs/migrations/007_add_breaker_products.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-25
-- =============================================================================

BEGIN;

INSERT INTO public.brands (name, slug, logo_url)
VALUES ('Exceline', 'exceline', '/categoria-electricidad.webp')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Breaker THQC Superficial 1 Polo',
    'breaker-thqc-superficial-1-polo',
    'CHARATOOLS-BREAKER-THQC-1P',
    'Interruptor termomagnético tipo THQC superficial (atornillable) monofásico de 1 polo para tableros eléctricos.',
    'Interruptor termomagnético tipo THQC superficial (atornillable) monofásico de 1 polo para tableros eléctricos residenciales y comerciales.',
    '{"imagen":"/categoria-electricidad.webp","priority":5,"tags":["breaker","THQC","superficial","atornillable","1 polo","termomagnético","disyuntor","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"15A"},{"value":"20A"},{"value":"30A"},{"value":"40A"},{"value":"50A"},{"value":"60A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'exceline'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Breaker THQC Superficial 2 Polos',
    'breaker-thqc-superficial-2-polos',
    'CHARATOOLS-BREAKER-THQC-2P',
    'Interruptor termomagnético tipo THQC superficial (atornillable) bifásico de 2 polos para protección de 240V.',
    'Interruptor termomagnético tipo THQC superficial (atornillable) bifásico de 2 polos para protección de circuitos de 240V.',
    '{"imagen":"/categoria-electricidad.webp","priority":6,"tags":["breaker","THQC","superficial","atornillable","2 polos","bifásico","termomagnético","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"20A"},{"value":"30A"},{"value":"40A"},{"value":"50A"},{"value":"60A"},{"value":"70A"},{"value":"100A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'exceline'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Breaker THQC Superficial 3 Polos',
    'breaker-thqc-superficial-3-polos',
    'CHARATOOLS-BREAKER-THQC-3P',
    'Interruptor termomagnético tipo THQC superficial (atornillable) trifásico de 3 polos para tableros industriales.',
    'Interruptor termomagnético tipo THQC superficial (atornillable) trifásico de 3 polos para equipos industriales y tableros trifásicos.',
    '{"imagen":"/categoria-electricidad.webp","priority":7,"tags":["breaker","THQC","superficial","atornillable","3 polos","trifásico","termomagnético","industrial"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"20A"},{"value":"30A"},{"value":"40A"},{"value":"50A"},{"value":"60A"},{"value":"70A"},{"value":"100A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'exceline'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Breaker THQL Empotrable 1 Polo',
    'breaker-thql-empotrable-1-polo',
    'CHARATOOLS-BREAKER-THQL-1P',
    'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) monofásico de 1 polo.',
    'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) monofásico de 1 polo para tableros residenciales y comerciales.',
    '{"imagen":"/categoria-electricidad.webp","priority":8,"tags":["breaker","THQL","empotrable","enchufable","1 polo","plug-in","termomagnético","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"15A"},{"value":"20A"},{"value":"30A"},{"value":"40A"},{"value":"50A"},{"value":"60A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'exceline'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Breaker THQL Empotrable 2 Polos',
    'breaker-thql-empotrable-2-polos',
    'CHARATOOLS-BREAKER-THQL-2P',
    'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) bifásico de 2 polos para 240V.',
    'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) bifásico de 2 polos para protección de circuitos de 240V.',
    '{"imagen":"/categoria-electricidad.webp","priority":9,"tags":["breaker","THQL","empotrable","enchufable","2 polos","bifásico","plug-in","termomagnético"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"20A"},{"value":"30A"},{"value":"40A"},{"value":"50A"},{"value":"60A"},{"value":"70A"},{"value":"100A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'exceline'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Breaker THQL Empotrable 3 Polos',
    'breaker-thql-empotrable-3-polos',
    'CHARATOOLS-BREAKER-THQL-3P',
    'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) trifásico de 3 polos.',
    'Interruptor termomagnético tipo THQL empotrable (enchufable / plug-in) trifásico de 3 polos para tableros trifásicos y maquinaria.',
    '{"imagen":"/categoria-electricidad.webp","priority":10,"tags":["breaker","THQL","empotrable","enchufable","3 polos","trifásico","plug-in","termomagnético"],"stockStatus":"available","unidad":"und","subcategory":"tableros","subitem":"tableros","variantLabel":"Amperaje","variants":[{"value":"20A"},{"value":"30A"},{"value":"40A"},{"value":"50A"},{"value":"60A"},{"value":"70A"},{"value":"100A"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'exceline'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
