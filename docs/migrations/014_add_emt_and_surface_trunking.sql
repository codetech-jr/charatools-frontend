-- =============================================================================
-- Migración 014: Cajetines Metálicos EMT Tezza, Tubería EMT y Canaletas de Superficie
-- =============================================================================
-- Archivo: docs/migrations/014_add_emt_and_surface_trunking.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-31
-- =============================================================================

BEGIN;

INSERT INTO public.brands (name, slug, logo_url)
VALUES ('Tezza', 'tezza', '/categoria-electricidad.webp')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Cajetín Metálico EMT Rectangular 2x4"',
    'cajetin-emt-rectangular-2x4',
    'CHARATOOLS-CAJETIN-EMT-2X4',
    'Cajetín metálico galvanizado EMT rectangular 2x4" con troqueles combinados de 1/2" y 3/4".',
    'Cajetín metálico en lámina de acero galvanizado calibre estándar para canalización eléctrica EMT. Formato rectangular 2x4 pulgadas con orificios pre-estampados (knockouts) combinados para conectores de 1/2" y 3/4". Alta resistencia mecánica y protección contra fuego.',
    '{"imagen":"/categoria-electricidad.webp","priority":6,"tags":["cajetin","emt","metálico","galvanizado","2x4","rectangular","canalización","electricidad","Tezza"],"stockStatus":"available","unidad":"und","subcategory":"canalizacion","subitem":"cajetines-cajas"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'tezza'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cajetín Metálico EMT Cuadrado 4x4"',
    'cajetin-emt-cuadrado-4x4',
    'CHARATOOLS-CAJETIN-EMT-4X4',
    'Cajetín metálico galvanizado EMT cuadrado 4x4" para cajas de paso, empalmes y placas dobles.',
    'Cajetín cuadrado 4x4 pulgadas en acero galvanizado con troqueles laterales y posteriores combinados de 1/2" y 3/4" y tornillo de aterramiento. Ideal para derivaciones de cableado y cajas de paso.',
    '{"imagen":"/categoria-electricidad.webp","priority":7,"tags":["cajetin","emt","metálico","galvanizado","4x4","cuadrado","caja de paso","canalización","Tezza"],"stockStatus":"available","unidad":"und","subcategory":"canalizacion","subitem":"cajetines-cajas"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'tezza'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cajetín Metálico EMT Octogonal 4x4"',
    'cajetin-emt-octogonal-4x4',
    'CHARATOOLS-CAJETIN-EMT-OCTOGONAL',
    'Cajetín metálico galvanizado octogonal 4x4" para salidas de techo, losas y lámparas pesadas.',
    'Cajetín octogonal metálico en acero galvanizado para empotrar en losas o fijar en cielos rasos y estructuras industriales. Proporciona anclaje robusto y seguro para luminarias y reflectores.',
    '{"imagen":"/categoria-electricidad.webp","priority":8,"tags":["cajetin","emt","metálico","galvanizado","octogonal","techo","lámpara","iluminación","Tezza"],"stockStatus":"available","unidad":"und","subcategory":"canalizacion","subitem":"cajetines-cajas"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'tezza'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tubo EMT Metálico Galvanizado',
    'tubo-emt-galvanizado',
    'CHARATOOLS-TUBO-EMT',
    'Tubo metálico rígido EMT galvanizado para canalización eléctrica comercial e industrial (tramos de 3m).',
    'Tubería metálica rígida tipo EMT de acero galvanizado por inmersión en caliente. Interior liso para facilitar el enhebrado de cables sin desgaste. Cumple con normas técnicas para instalaciones a la vista o embutidas.',
    '{"imagen":"/categoria-electricidad.webp","priority":9,"tags":["tubo","emt","metálico","galvanizado","canalización","tubería","industrial","electricidad"],"stockStatus":"available","unidad":"tubo","subcategory":"canalizacion","subitem":"tuberia-conduit","variantLabel":"Diámetro","variants":[{"value":"1/2\""},{"value":"3/4\""},{"value":"1\""},{"value":"1 1/2\""},{"value":"2\""}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Canaleta Plástica de Superficie en PVC',
    'canaleta-plastica-superficie-pvc',
    'CHARATOOLS-CANALETA-PVC',
    'Canaleta de PVC para distribución y organización superficial de cableado eléctrico y de red.',
    'Canaleta de montaje superficial en PVC de alta resistencia con tapa a presión de cierre hermético. Permite ocultar, ordenar y proteger cables eléctricos, de red (UTP) o audio/video sin romper paredes.',
    '{"imagen":"/categoria-electricidad.webp","priority":10,"tags":["canaleta","pvc","plástica","superficie","cables","red","organizador","canalización"],"stockStatus":"available","unidad":"tira","subcategory":"canalizacion","subitem":"canaletas-accesorios","variantLabel":"Medida","variants":[{"value":"10x20 mm"},{"value":"20x12 mm"},{"value":"24x14 mm"},{"value":"40x25 mm"},{"value":"60x40 mm"},{"value":"100x50 mm"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
