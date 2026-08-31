-- =============================================================================
-- Migración 011: Enchufes Industriales y Tomas Aéreas de Potencia
-- =============================================================================
-- Archivo: docs/migrations/011_add_plugs_and_aerial_receptacles.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-08-31
-- =============================================================================

BEGIN;

INSERT INTO public.brands (name, slug, logo_url)
VALUES 
  ('Eagle', 'eagle', '/categoria-electricidad.webp'),
  ('Tania Wiring', 'tania-wiring', '/categoria-electricidad.webp')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES
  (
    'Enchufe Blindado con Abrazadera Metálica (15A 125V - NEMA 5-15P)',
    'enchufe-blindado-abrazadera-15a-125v',
    'CHARATOOLS-ENCHUFE-BLINDADO-15A',
    'Enchufe macho blindado de uso industrial con carcasa metálica y abrazadera prensa-cable para 15A 125V.',
    'Enchufe macho blindado NEMA 5-15P de 15 Amperios a 125V con polo a tierra. Equipado con coraza metálica de protección contra golpes y abrazadera de sujeción para cables de uso pesado en talleres, obras y extensiones eléctricas.',
    '{"imagen":"/categoria-electricidad.webp","priority":4,"tags":["enchufe","blindado","abrazadera","15A","125V","NEMA 5-15P","tierra","electricidad","industrial"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"enchufes-conectores"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'eagle'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Enchufe con Abrazadera y Polo a Tierra (15A 125V)',
    'enchufe-abrazadera-tierra-15a-125v',
    'CHARATOOLS-ENCHUFE-GOMA-15A',
    'Enchufe macho con polo a tierra y abrazadera metálica de ajuste para cable en talleres y hogar.',
    'Enchufe macho estándar de 15 Amperios a 125V con espiga de conexión a tierra y abrazadera de doble tornillo para fijación segura del cable de alimentación. Ideal para armado y reparación de extensiones y herramientas eléctricas.',
    '{"imagen":"/categoria-electricidad.webp","priority":5,"tags":["enchufe","macho","abrazadera","tierra","15A","125V","extensión","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"enchufes-conectores"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'tania-wiring'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Enchufe de Potencia Tripolar (30A 125/250V)',
    'enchufe-potencia-tripolar-30a-250v',
    'CHARATOOLS-ENCHUFE-POTENCIA-30A',
    'Enchufe macho de alta potencia tripolar en ángulo de 30A 125/250V para cocinas, secadoras y soldadoras.',
    'Enchufe macho industrial tripolar de 30 Amperios a 125/250V con cuerpo termoplástico de alta resistencia al impacto y al calor. Terminales de cobre macizo para conexión segura de equipos de alta potencia como aires acondicionados, secadoras, cocinas eléctricas y máquinas de soldar.',
    '{"imagen":"/categoria-electricidad.webp","priority":6,"tags":["enchufe","potencia","tripolar","30A","250V","secadora","soldadora","cocina eléctrica","industrial"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"enchufes-conectores"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'tania-wiring'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Toma Aérea Polarizada Blindada (15A 250V)',
    'toma-aerea-polarizada-blindada-15a-250v',
    'CHARATOOLS-TOMA-AEREA-BLINDADA-15A',
    'Conector hembra aéreo blindado con abrazadera de alta durabilidad para extensiones eléctricas de 15A 250V.',
    'Conector toma hembra aérea blindada de 15 Amperios a 250V polarizada con abrazadera metálica de alivio de tensión. Cuerpo en polímero amarillo de alta visibilidad y resistencia mecánica para entornos de trabajo exigentes.',
    '{"imagen":"/categoria-electricidad.webp","priority":7,"tags":["toma aérea","hembra","blindada","polarizada","15A","250V","extensión","taller","electricidad"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"enchufes-conectores"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'tania-wiring'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),
  (
    'Toma Aérea Tripolar de Potencia NEMA 10-30R (30A 125/250V)',
    'toma-aerea-tripolar-potencia-30a-250v',
    'CHARATOOLS-TOMA-AEREA-POTENCIA-30A',
    'Conector hembra aéreo de potencia tripolar 10-30R de 30A 125/250V en material fenólico para uso pesado.',
    'Toma aérea hembra tripolar de potencia configuración NEMA 10-30R de 30 Amperios a 125/250V. Fabricada en resina fenólica resistente a altas temperaturas y arcos eléctricos. Ideal para extensiones de maquinaria pesada, plantas eléctricas y conexiones industriales.',
    '{"imagen":"/categoria-electricidad.webp","priority":8,"tags":["toma aérea","hembra","potencia","tripolar","NEMA 10-30R","30A","250V","fenólica","industrial"],"stockStatus":"available","unidad":"und","subcategory":"tomacorrientes","subitem":"enchufes-conectores"}'::jsonb,
    false,
    (SELECT id FROM public.brands WHERE slug = 'tania-wiring'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  )
ON CONFLICT (slug) DO NOTHING;

COMMIT;
