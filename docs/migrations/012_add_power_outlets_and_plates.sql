-- =============================================================================
-- Migración 012: Tomacorrientes de Potencia, Individuales, Adaptadores y Placas
-- =============================================================================
-- Archivo: docs/migrations/012_add_power_outlets_and_plates.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-31
-- =============================================================================

BEGIN;

INSERT INTO public.brands (name, slug, logo_url)
VALUES 
  ('Eagle', 'eagle', '/categoria-electricidad.webp'),
  ('Sunico', 'sunico', '/categoria-electricidad.webp')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Tomacorriente de Empotrar de Potencia NEMA 10-50R (50A 125/250V)',
    'tomacorriente-empotrar-nema-1050-50a',
    'CHARATOOLS-TOMA-NEMA-1050',
    'Tomacorriente de alta potencia para empotrar NEMA 10-50R de 50A 125/250V con chasis metálico para cocinas y soldadoras.',
    'Tomacorriente industrial de uso extra pesado para empotrar en cajetín cuadrado con placa de montaje en acero galvanizado. Capacidad nominal de 50 Amperios a 125/250V (configuración NEMA 10-50R). Diseñado para cocinas eléctricas de alto consumo, secadoras comerciales, hornos y máquinas de soldar.',
    '{"imagen":"/categoria-electricidad.webp","priority":9,"tags":["tomacorriente","empotrar","potencia","NEMA 10-50R","50A","250V","cocina eléctrica","soldadora","industrial"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"tomacorrientes"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'eagle'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tomacorriente Sencillo Redondo con Tierra (20A 125/250V)',
    'tomacorriente-sencillo-tierra-20a-250v',
    'CHARATOOLS-TOMA-SENCILLO-20A',
    'Tomacorriente individual redondo de 20A 125/250V con orejas metálicas de montaje para aires acondicionados y equipos 220V.',
    'Mecanismo de tomacorriente sencillo redondo de uso rudo con capacidad de 20 Amperios a 125/250V con polo a tierra. Equipado con orejas metálicas de fijación para cajetín estándar. Especialmente indicado para conexión de aires acondicionados, compresores y maquinaria de 220V.',
    '{"imagen":"/categoria-electricidad.webp","priority":10,"tags":["tomacorriente","sencillo","redondo","20A","250V","aire acondicionado","220V","tierra","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"tomacorrientes"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'sunico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Adaptador de Toma con Tierra (15A 125V)',
    'adaptador-toma-tierra-15a-125v',
    'CHARATOOLS-ADAPTADOR-TIERRA-15A',
    'Adaptador eléctrico de 3 a 2 clavijas con terminal de conexión a tierra para 15A 125V.',
    'Adaptador de enchufe con conversión de 3 clavijas con polo a tierra (NEMA 5-15P) a toma de 2 clavijas estándar. Cuenta con orejeta metálica para conexión a tierra mediante el tornillo del cajetín de pared. Capacidad máxima de 15 Amperios a 125V.',
    '{"imagen":"/categoria-electricidad.webp","priority":11,"tags":["adaptador","toma tierra","clavija","15A","125V","enchufe","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"enchufes-conectores"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'sunico'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Tapa Plástica para Tomacorriente Doble Línea 270',
    'tapa-plastica-tomacorriente-doble-270',
    'CHARATOOLS-TAPA-DOBLE-270',
    'Placa / tapa plástica de pared para tomacorriente doble estándar 270 en acabado Blanco y Marfil.',
    'Placa de pared estándar de 1 ventana doble para mecanismos de tomacorriente línea 270. Fabricada en termoplástico irrompible de alto impacto con tornillo de fijación central incluido. Acabado brillante fácil de limpiar disponible en colores Blanco y Marfil / Beige.',
    '{"imagen":"/categoria-electricidad.webp","priority":12,"tags":["tapa","placa","pared","tomacorriente","270","doble","blanco","marfil","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"placas-tapas","variantLabel":"Color","variants":[{"value":"Blanco"},{"value":"Marfil / Beige"}]}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'eagle'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
