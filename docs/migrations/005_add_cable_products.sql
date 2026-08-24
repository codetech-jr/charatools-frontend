-- =============================================================================
-- Migración 005: Cables y Conductores Eléctricos
-- =============================================================================
-- Archivo: docs/migrations/005_add_cable_products.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-24
-- =============================================================================

BEGIN;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Cable TSN - ST',
    'cable-tsn-st',
    'CHARATOOLS-CABLE-TSN-ST',
    'Cable multifilar flexible tipo TSN - ST de cobre para conexiones móviles, equipos de potencia e industrias.',
    'Cable multifilar flexible tipo TSN - ST de cobre para conexiones móviles, equipos de potencia e industrias.',
    '{"imagen":"/categoria-electricidad.webp","priority":2,"tags":["cable","TSN","ST","goma","cobre","eléctrico","potencia"],"stockStatus":"available","unidad":"m","subcategory":"cables","subitem":"cables","variantLabel":"Calibre / Medida","variants":[{"value":"3x14"},{"value":"3x12"},{"value":"3x10"},{"value":"3x08"},{"value":"2x12"},{"value":"2x10"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cable THW / THHN',
    'cable-thw-thhn',
    'CHARATOOLS-CABLE-THW-THHN',
    'Cable monopolar de cobre suave con aislamiento termoplástico THW / THHN para acometidas y tableros eléctricos.',
    'Cable monopolar de cobre suave con aislamiento termoplástico THW / THHN para acometidas y tableros eléctricos.',
    '{"imagen":"/categoria-electricidad.webp","priority":3,"tags":["cable","THW","THHN","monopolar","cobre","eléctrico","AWG"],"stockStatus":"available","unidad":"m","subcategory":"cables","subitem":"cables","variantLabel":"Calibre","variants":[{"value":"14 AWG"},{"value":"12 AWG"},{"value":"10 AWG"},{"value":"8 AWG"},{"value":"6 AWG"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cable SPT (100% Cobre Nacional)',
    'cable-spt-cobre',
    'CHARATOOLS-CABLE-SPT',
    'Cable dúplex flexible tipo SPT 100% cobre nacional para extensiones, iluminación y electrodomésticos.',
    'Cable dúplex flexible tipo SPT 100% cobre nacional para extensiones, iluminación y electrodomésticos.',
    '{"imagen":"/categoria-electricidad.webp","priority":4,"tags":["cable","SPT","dúplex","cobre","eléctrico","extensión"],"stockStatus":"available","unidad":"m","subcategory":"cables","subitem":"cables","variantLabel":"Calibre","variants":[{"value":"2x18 AWG"},{"value":"2x16 AWG"},{"value":"2x14 AWG"},{"value":"2x12 AWG"},{"value":"2x10 AWG"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cable Coaxial RG6',
    'cable-coaxial-rg6',
    'CHARATOOLS-CABLE-COAXIAL-RG6',
    'Cable coaxial RG6 blindado de alta frecuencia para televisión por cable, antenas y redes de telecomunicación.',
    'Cable coaxial RG6 blindado de alta frecuencia para televisión por cable, antenas y redes de telecomunicación.',
    '{"imagen":"/categoria-electricidad.webp","priority":5,"tags":["cable","coaxial","RG6","TV","antena","telecomunicaciones"],"stockStatus":"available","unidad":"m","subcategory":"cables","subitem":"cables","variantLabel":"Color","variants":[{"value":"Blanco"},{"value":"Negro"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
