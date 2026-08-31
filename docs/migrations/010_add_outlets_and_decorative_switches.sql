-- =============================================================================
-- Migración 010: Tomacorrientes Estándar 270 (15A y 20A) e Interruptores Decorativos
-- =============================================================================
-- Archivo: docs/migrations/010_add_outlets_and_decorative_switches.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-31
-- =============================================================================

BEGIN;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Tomacorriente Doble 270 (15A)',
    'tomacorriente-doble-270-15a',
    'CHARATOOLS-TOMA-DOBLE-270-15A',
    'Tomacorriente doble estándar 270 de 15A a 125V para empotrar con terminales de tornillo.',
    'Mecanismo de tomacorriente doble estándar línea 270 con capacidad de 15 Amperios a 125V. Fabricado en policarbonato de alta resistencia con bornes de conexión seguros de tornillo. Ideal para reemplazo y montajes en cajetines rectangulares residenciales y comerciales.',
    '{"imagen":"/categoria-electricidad.webp","priority":1,"tags":["tomacorriente","toma doble","270","15A","125V","electricidad","interruptor"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"tomacorrientes"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tomacorriente Doble 270 (20A - Ranura en T)',
    'tomacorriente-doble-270-20a',
    'CHARATOOLS-TOMA-DOBLE-270-20A',
    'Tomacorriente doble reforzado 270 de 20A a 125V con ranura en T (NEMA 5-20R) para equipos de alto consumo.',
    'Tomacorriente doble línea 270 de uso pesado con capacidad de 20 Amperios a 125V (NEMA 5-20R con ranura en T). Diseñado para electrodomésticos y equipos comerciales que demandan mayor potencia sin recalentamiento.',
    '{"imagen":"/categoria-electricidad.webp","priority":2,"tags":["tomacorriente","toma doble","270","20A","NEMA 5-20","alto consumo","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"tomacorrientes"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tomacorrientes e Interruptores Decorativos (Línea Modular)',
    'tomas-e-interruptores-decorativos',
    'CHARATOOLS-TOMAS-DECORATIVAS',
    'Placas, tomacorrientes e interruptores decorativos de lujo en acabados Champagne, Grafito y Blanco.',
    'Línea de interruptores y tomacorrientes decorativos de diseño elegante y moderno para el hogar y oficinas. Placas modulares de acabado premium disponibles en variedad de configuraciones y acabados decorativos de alta estética.',
    '{"imagen":"/categoria-electricidad.webp","priority":3,"tags":["tomacorriente","interruptor","decorativo","placa","lujo","modular","champagne","grafito","blanco","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"linea-decorativa","variantLabel":"Configuración","variants":[{"value":"Tomacorriente Doble"},{"value":"Interruptor Simple"},{"value":"Interruptor Doble"},{"value":"Interruptor Triple"},{"value":"Toma + Interruptor Combinado"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'generico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
