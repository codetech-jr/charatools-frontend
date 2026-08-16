-- =============================================================================
-- Migración 003: Nuevos productos de iluminación (Focos y Tubos LED)
-- =============================================================================
-- Archivo: docs/migrations/003_add_lighting_products.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-16
-- =============================================================================

BEGIN;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Bombillo LED Bulbo',
    'bombillo-bulbo-led',
    'CHARATOOLS-BOMBILLO-BULBO-LED',
    'Bombillo LED tipo bulbo de bajo consumo con luz clara y constante para iluminación residencial y comercial.',
    'Bombillo LED tipo bulbo de bajo consumo con luz clara y constante para iluminación residencial y comercial.',
    '{"imagen":"/iluminacion.webp","tags":["LED","bombillo","bulbo","iluminación","foco","E27"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Potencia","variants":[{"value":"5W"},{"value":"7W"},{"value":"9W"},{"value":"12W"},{"value":"15W"},{"value":"18W"},{"value":"20W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Bombillo LED Domo',
    'bombillo-domo-led',
    'CHARATOOLS-BOMBILLO-DOMO-LED',
    'Bombillo LED formato domo de alta potencia y amplio ángulo de iluminación para grandes áreas.',
    'Bombillo LED formato domo de alta potencia y amplio ángulo de iluminación para grandes áreas.',
    '{"imagen":"/iluminacion.webp","tags":["LED","bombillo","domo","alta potencia","iluminación"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Potencia","variants":[{"value":"20W"},{"value":"30W"},{"value":"40W"},{"value":"50W"},{"value":"60W"},{"value":"80W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Bombillo LED Industrial',
    'bombillo-industrial-led',
    'CHARATOOLS-BOMBILLO-INDUSTRIAL-LED',
    'Bombillo LED industrial de alta potencia para galpones, talleres y áreas de trabajo exigentes.',
    'Bombillo LED industrial de alta potencia para galpones, talleres y áreas de trabajo exigentes.',
    '{"imagen":"/iluminacion.webp","tags":["LED","industrial","bombillo","alta potencia","galpón"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Potencia","variants":[{"value":"90W"},{"value":"100W"},{"value":"150W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Bombillo LED Vela',
    'bombillo-vela-led',
    'CHARATOOLS-BOMBILLO-VELA-LED',
    'Bombillo LED tipo vela decorativo disponible en roscas E-27 y E-14 para lámparas y apliques.',
    'Bombillo LED tipo vela decorativo disponible en roscas E-27 y E-14 para lámparas y apliques.',
    '{"imagen":"/iluminacion.webp","tags":["LED","vela","bombillo","E-27","E-14","decorativo"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Rosca / Base","variants":[{"value":"E-27"},{"value":"E-14"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Tubo LED',
    'tubo-led',
    'CHARATOOLS-TUBO-LED',
    'Tubo LED de alto rendimiento para iluminación lineal continua en oficinas, comercios y galpones.',
    'Tubo LED de alto rendimiento para iluminación lineal continua en oficinas, comercios y galpones.',
    '{"imagen":"/iluminacion.webp","tags":["LED","tubo","lineal","60cm","120cm","iluminación"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Longitud","variants":[{"value":"60 cm"},{"value":"120 cm"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Reflector LED',
    'reflector-led',
    'CHARATOOLS-REFLECTOR-LED',
    'Reflector LED estanco resistente al agua y a la intemperie para fachadas, patios e industria.',
    'Reflector LED estanco resistente al agua y a la intemperie para fachadas, patios e industria.',
    '{"imagen":"/iluminacion.webp","tags":["LED","reflector","exterior","IP65","proyector","potencia"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Potencia","variants":[{"value":"10W"},{"value":"20W"},{"value":"30W"},{"value":"40W"},{"value":"50W"},{"value":"100W"},{"value":"150W"},{"value":"200W"},{"value":"300W"},{"value":"400W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Reflector LED Panel Solar 100W',
    'reflector-led-panel-solar',
    'CHARATOOLS-REFLECTOR-LED-PANEL-SOLAR',
    'Reflector solar LED de 100W con panel solar independiente, encendido automático y control remoto.',
    'Reflector solar LED de 100W con panel solar independiente, encendido automático y control remoto.',
    '{"imagen":"/iluminacion.webp","tags":["LED","reflector","solar","panel solar","100W","autónomo"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Potencia","variants":[{"value":"100W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Bombillo Dicroico Bi-Pin',
    'bombillo-dicroico-bi-pin',
    'CHARATOOLS-BOMBILLO-DICROICO-BI-PIN',
    'Bombillo dicroico LED tipo Bi-Pin de luz dirigida para acento visual en nichos, techos y vitrinas.',
    'Bombillo dicroico LED tipo Bi-Pin de luz dirigida para acento visual en nichos, techos y vitrinas.',
    '{"imagen":"/iluminacion.webp","tags":["LED","dicroico","bi-pin","ojo de buey","spot","foco"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Potencia","variants":[{"value":"5W"},{"value":"7W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),
  (
    'Bombillo Dicroico GU-10',
    'bombillo-dicroico-gu-10',
    'CHARATOOLS-BOMBILLO-DICROICO-GU-10',
    'Bombillo dicroico LED base GU-10 de bajo consumo para iluminación direccional en ojos de buey.',
    'Bombillo dicroico LED base GU-10 de bajo consumo para iluminación direccional en ojos de buey.',
    '{"imagen":"/iluminacion.webp","tags":["LED","dicroico","GU10","ojo de buey","spot","foco"],"stockStatus":"available","unidad":"und","subcategory":"focos-led","subitem":"focos-led","variantLabel":"Potencia","variants":[{"value":"5W"},{"value":"7W"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
