-- =============================================================================
-- Migración 013: Tuberías Conduit, Curvas y Cajetines de Canalización Eléctrica
-- =============================================================================
-- Archivo: docs/migrations/013_add_conduit_canalization_products.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-31
-- =============================================================================

BEGIN;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Tubo PVC Conduit para Electricidad',
    'tubo-pvc-conduit',
    'CHARATOOLS-TUBO-PVC-CONDUIT',
    'Tubo rígido de PVC tipo conduit para canalización y protección de cableado eléctrico.',
    'Tubería rígida de PVC conduit para instalaciones eléctricas embutidas en paredes, techos y losas de concreto o a la vista. Fabricada en material autoextinguible y no propagador de llama, de alta resistencia dieléctrica y mecánica. Tramos estándar de 3 metros.',
    '{"imagen":"/categoria-electricidad.webp","priority":1,"tags":["tubo","pvc","conduit","canalización","cableado","electricidad","tuberia"],"stockStatus":"available","unidad":"tubo","subcategory":"canalizacion","subitem":"tuberia-conduit","variantLabel":"Diámetro","variants":[{"value":"1/2\""},{"value":"3/4\""},{"value":"1\""},{"value":"1 1/2\""},{"value":"2\""}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Curva PVC Conduit 90°',
    'curva-pvc-conduit',
    'CHARATOOLS-CURVA-PVC-CONDUIT',
    'Curva de 90 grados en PVC conduit para cambios de dirección en canalizaciones eléctricas.',
    'Accesorio curva de 90° en PVC conduit para realizar cambios de dirección suaves y seguros en el tendido de tuberías eléctricas, evitando la fricción y daño del cableado conductor durante el jalado.',
    '{"imagen":"/categoria-electricidad.webp","priority":2,"tags":["curva","pvc","conduit","90 grados","canalización","accesorios","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"canalizacion","subitem":"accesorios-conduit","variantLabel":"Diámetro","variants":[{"value":"1/2\""},{"value":"3/4\""},{"value":"1\""},{"value":"1 1/2\""},{"value":"2\""}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cajetín PVC Rectangular 4x2"',
    'cajetin-pvc-rectangular-4x2',
    'CHARATOOLS-CAJETIN-PVC-4X2',
    'Cajetín plástico rectangular 4x2" para empotrar tomacorrientes e interruptores.',
    'Cajetín rectangular de 4x2 pulgadas fabricado en PVC de alto impacto con troqueles / knockouts premarcados para tubería conduit de 1/2" y 3/4". Diseñado para alojamiento seguro de tomacorrientes, interruptores y salidas de datos en paredes de mampostería o drywall.',
    '{"imagen":"/categoria-electricidad.webp","priority":3,"tags":["cajetin","pvc","4x2","rectangular","caja","empotrar","canalización","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"canalizacion","subitem":"cajetines-cajas"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cajetín PVC Cuadrado 4x4"',
    'cajetin-pvc-cuadrado-4x4',
    'CHARATOOLS-CAJETIN-PVC-4X4',
    'Cajetín plástico cuadrado 4x4" para cajas de paso, empalmes y tapas dobles.',
    'Cajetín cuadrado de 4x4 pulgadas en PVC resistente con múltiples entradas pre-troqueladas para tuberías de 1/2" y 3/4". Ideal para cajas de paso, derivaciones de circuitos eléctricos, placas de doble ventana y conexiones de alta densidad.',
    '{"imagen":"/categoria-electricidad.webp","priority":4,"tags":["cajetin","pvc","4x4","cuadrado","caja de paso","derivación","canalización","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"canalizacion","subitem":"cajetines-cajas"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Cajetín PVC Octogonal para Techo y Lámparas',
    'cajetin-pvc-octogonal',
    'CHARATOOLS-CAJETIN-PVC-OCTOGONAL',
    'Cajetín plástico octogonal para empotrar en techos, losas y salidas de iluminación.',
    'Cajetín octogonal en PVC reforzado diseñado para montaje en losas, cielo rasos y techos. Proporciona soporte firme para lámparas, plafones, ventiladores y puntos de iluminación con entradas para tubería conduit de 1/2" y 3/4".',
    '{"imagen":"/categoria-electricidad.webp","priority":5,"tags":["cajetin","pvc","octogonal","techo","losa","iluminación","lámpara","canalización","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"canalizacion","subitem":"cajetines-cajas"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
