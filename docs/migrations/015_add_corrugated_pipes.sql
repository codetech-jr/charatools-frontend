-- =============================================================================
-- Migración 015: Tubos Corrugados Flexibles (Plástico Poliflex y Metálico BX)
-- =============================================================================
-- Archivo: docs/migrations/015_add_corrugated_pipes.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-31
-- =============================================================================

BEGIN;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Tubo Corrugado Flexible Plástico (Poliflex)',
    'tubo-corrugado-plastico',
    'CHARATOOLS-CORRUGADO-PLASTICO',
    'Manguera corrugada flexible en PVC para canalización eléctrica en muros, techos y drywall.',
    'Tubería flexible corrugada (poliflex) fabricada en PVC termoplástico autoextinguible. Facilita el tendido de cables eléctricos en instalaciones con curvas continuas sin necesidad de accesorios de unión, ideal para losas, tabiquería y techos falsos.',
    '{"imagen":"/categoria-electricidad.webp","priority":11,"tags":["tubo","corrugado","flexible","manguera","poliflex","plástico","canalización","electricidad"],"stockStatus":"available","unidad":"rollo","subcategory":"canalizacion","subitem":"tuberia-conduit","variantLabel":"Diámetro","variants":[{"value":"1/2\""},{"value":"3/4\""},{"value":"1\""}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tubo Corrugado Flexible Metálico (BX)',
    'tubo-corrugado-metalico',
    'CHARATOOLS-CORRUGADO-METALICO',
    'Tubería flexible metálica de acero galvanizado para acometidas de motores y maquinaria industrial.',
    'Tubo flexible fabricado con cinta de acero galvanizado engatillada de alta resistencia mecánica contra aplastamiento y cortes. Diseñado para la protección de conductores eléctricos en motores, bombas, transformadores y maquinaria sujeta a vibraciones constantes.',
    '{"imagen":"/categoria-electricidad.webp","priority":12,"tags":["tubo","corrugado","metálico","flexible","BX","acero galvanizado","motores","maquinaria","canalización"],"stockStatus":"available","unidad":"m","subcategory":"canalizacion","subitem":"tuberia-conduit","variantLabel":"Diámetro","variants":[{"value":"1/2\""},{"value":"3/4\""},{"value":"1\""},{"value":"1 1/2\""},{"value":"2\""}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
