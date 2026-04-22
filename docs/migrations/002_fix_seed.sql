-- =============================================================================
-- Migración 002: Seed robusto con FK correctos (hotfix 001)
-- =============================================================================
-- Archivo: docs/migrations/002_fix_seed.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-04-22
--
-- PROBLEMA: El seed 001 asumía columnas planas (brand, category como text).
-- La tabla products tiene FK NOT NULL: brand_id (UUID) y category_id (UUID),
-- además de sku NOT NULL.
--
-- SOLUCIÓN: INSERT brands → INSERT categories → INSERT products con subqueries
-- que resuelven los UUIDs de brand_id y category_id automáticamente.
--
-- INSTRUCCIONES:
--   Supabase Dashboard → SQL Editor → New Query → Pegar → Run
--   Seguro repetir: todos los bloques usan ON CONFLICT DO NOTHING.
-- =============================================================================

BEGIN;

-- =============================================================================
-- PASO 1: Marcas (brands)
-- =============================================================================

INSERT INTO public.brands (name, slug, logo_url)
VALUES
  ('INGCO',             'ingco',             NULL),
  ('Stanley',           'stanley',           NULL),
  ('Dewalt',            'dewalt',            NULL),
  ('Truper',            'truper',            NULL),
  ('3M',                '3m',                NULL),
  ('Philips',           'philips',           NULL),
  ('Schneider Electric','schneider-electric', NULL)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- PASO 2: Categorías (categories)
-- =============================================================================

INSERT INTO public.categories (name, slug, description, parent_id)
VALUES
  ('Herramientas en General', 'herramientas-general',  'Taladros, esmeriles, sierras y herramientas manuales',         NULL),
  ('Plomería',                'plomeria',               'Tuberías, válvulas, bombas y accesorios PPR',                  NULL),
  ('Iluminación',             'iluminacion',            'LED, paneles, reflectores y bombillos',                        NULL),
  ('Electricidad',            'electricidad',           'Cables, breakers, tableros y conectores',                      NULL),
  ('Impermeabilización',      'impermeabilizacion',     'Mantos asfálticos, selladores e impermeabilizantes',           NULL)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- PASO 3: Productos — subqueries resuelven brand_id y category_id
-- =============================================================================
-- Estructura: (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
-- SKU = referencia comercial o slug truncado como identificador único de almacén

INSERT INTO public.products
  (name, slug, sku, short_desc, description, specs, is_casheable, brand_id, category_id)
VALUES

  -- ── HERRAMIENTAS EN GENERAL ───────────────────────────────────────────────

  (
    'Taladro Percutor 550W INGCO',
    'taladro-ingco-550w',
    'INGCO-ID2228VRE',
    'Taladro percutor profesional con 2 velocidades y chuck 13mm.',
    'Ideal para concreto y mampostería. Motor de 550W, mandril de 13mm, 2 velocidades seleccionables, función percutor activable. Incluye maletín y broca de prueba.',
    '{"referencia":"ID2228VRE","potenciaW":550,"voltaje":120,"pesoKg":1.8,"imagen":"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80","tags":["taladro","percutor","concreto","mampostería"],"stockStatus":"available","unidad":"und"}'::jsonb,
    true,
    (SELECT id FROM public.brands     WHERE slug = 'ingco'),
    (SELECT id FROM public.categories WHERE slug = 'herramientas-general')
  ),

  (
    'Esmeril Angular 820W 4½" INGCO',
    'esmeril-ingco-820w',
    'INGCO-AG7508',
    'Esmeril profesional con disco de 115mm y 11,000 RPM.',
    'Motor de cobre puro de 820W, velocidad sin carga 11,000 RPM. Ideal para cortar, desbastar y pulir metales y concreto. Empuñadura lateral ajustable.',
    '{"referencia":"AG7508","potenciaW":820,"voltaje":120,"pesoKg":1.9,"imagen":"https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80","tags":["esmeril","amoladora","corte","desbaste"],"stockStatus":"available","unidad":"und"}'::jsonb,
    true,
    (SELECT id FROM public.brands     WHERE slug = 'ingco'),
    (SELECT id FROM public.categories WHERE slug = 'herramientas-general')
  ),

  (
    'Sierra Caladora 550W DeWalt',
    'sierra-caladora-dewalt-550w',
    'DW-DW300',
    'Sierra caladora orbital con velocidad variable y corte biselado a 45°.',
    'Motor de 550W, corte máximo 65mm en madera y 6mm en acero. Velocidad variable 800-3100 CPM. Cambio de hoja sin herramientas.',
    '{"referencia":"DW300","potenciaW":550,"voltaje":120,"pesoKg":2.1,"imagen":"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80","tags":["sierra","caladora","madera","corte"],"stockStatus":"new-batch","unidad":"und"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'dewalt'),
    (SELECT id FROM public.categories WHERE slug = 'herramientas-general')
  ),

  (
    'Flexómetro Classic 5m Stanley',
    'flexometro-stanley-5m',
    'STAN-30497',
    'Cinta métrica resistente, bloqueo automático, gancho magnético.',
    'Cinta métrica de 5m con bloqueo automático, gancho magnético para uso en solitario y cuerpo ergonómico resistente a impactos.',
    '{"referencia":"30-497","pesoKg":0.3,"imagen":"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80","tags":["flexómetro","medida","cinta métrica"],"stockStatus":"available","unidad":"und"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'stanley'),
    (SELECT id FROM public.categories WHERE slug = 'herramientas-general')
  ),

  -- ── PLOMERÍA ─────────────────────────────────────────────────────────────

  (
    'Bomba de Agua Periférica ½ HP',
    'bomba-periferica-1-2hp',
    'INGCO-SPWP8001',
    'Bomba potente para riego y abastecimiento residencial.',
    'Carcasa en hierro fundido, impulsor de bronce. Caudal máximo 40L/min, altura máxima 35m. Protección térmica integrada.',
    '{"referencia":"SPWP8001","potenciaW":370,"voltaje":120,"imagen":"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80","tags":["bomba","agua","riego","presión"],"stockStatus":"high-demand","unidad":"und"}'::jsonb,
    true,
    (SELECT id FROM public.brands     WHERE slug = 'ingco'),
    (SELECT id FROM public.categories WHERE slug = 'plomeria')
  ),

  (
    'Tubería PPR ½" para Aguas Blancas (6m)',
    'tuberia-ppr-12',
    'TRU-PPR12-6M',
    'Tubería PPR PN20, resistente a altas temperaturas hasta 95°C.',
    'Tubería PPR de ½ pulgada, PN20, para instalaciones de aguas blancas calientes y frías. Longitud de 6m por varilla. Alta resistencia química.',
    '{"imagen":"https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80","tags":["tubería","PPR","aguas blancas","plomería"],"stockStatus":"available","unidad":"m"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'truper'),
    (SELECT id FROM public.categories WHERE slug = 'plomeria')
  ),

  (
    'Press Control Automático 1HP',
    'press-control-automatico',
    'INGCO-PRESSCTRL1HP',
    'Regulador de presión para sistemas de agua residencial.',
    'Encendido/apagado automático según flujo. Protección contra funcionamiento en seco. Compatible con bombas de ½ a 1HP.',
    '{"potenciaW":750,"imagen":"https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80","tags":["press control","presión","bomba","automático"],"stockStatus":"high-demand","unidad":"und"}'::jsonb,
    true,
    (SELECT id FROM public.brands     WHERE slug = 'ingco'),
    (SELECT id FROM public.categories WHERE slug = 'plomeria')
  ),

  -- ── ILUMINACIÓN ───────────────────────────────────────────────────────────

  (
    'Bombillo LED 9W Luz Cálida E27',
    'bombillo-led-9w',
    'PHI-LED927E27',
    'Bajo consumo, 800 lúmenes, vida útil 25,000 horas.',
    'Reemplazo de bombillo incandescente de 60W. Base E27, luz cálida 3000K. Sin mercurio, encendido instantáneo, apto para dimmers.',
    '{"referencia":"LED927E27","potenciaW":9,"voltaje":120,"imagen":"https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80","tags":["LED","bombillo","iluminación","E27"],"stockStatus":"available","unidad":"und"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'philips'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),

  (
    'Panel LED Rectangular 60W',
    'panel-led-60w',
    'PHI-PANEL60W',
    'Panel empotrado 60x60cm, luz blanca neutra, driver incluido.',
    'Panel LED de 60x60cm para cielo raso. 4200 lúmenes, color 4000K (blanco neutro). Factor de potencia >0.9. Vida útil 30,000 horas.',
    '{"potenciaW":60,"voltaje":120,"imagen":"https://images.unsplash.com/photo-1565631969034-0e5c0f0e8c59?w=400&q=80","tags":["panel","LED","empotrado","oficina"],"stockStatus":"high-demand","unidad":"und"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'philips'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),

  (
    'Reflector LED 50W IP65 INGCO',
    'reflector-led-50w',
    'INGCO-HLFL3501',
    'Reflector exterior resistente al agua, 4500 lúmenes, luz blanca.',
    'Carcasa de aluminio fundido, protección IP65, luz blanca 6500K. Ideal para patios, fachadas e iluminación industrial.',
    '{"referencia":"HLFL3501","potenciaW":50,"voltaje":120,"imagen":"https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80","tags":["reflector","LED","exterior","IP65"],"stockStatus":"available","unidad":"und"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'ingco'),
    (SELECT id FROM public.categories WHERE slug = 'iluminacion')
  ),

  -- ── ELECTRICIDAD ──────────────────────────────────────────────────────────

  (
    'Cable Eléctrico #12 AWG x 100m',
    'cable-electrico-12-100m',
    '3M-THW12-100M',
    'Cable THW calibre 12 AWG, certificado FONDONORMA, uso residencial.',
    'Cable de cobre sólido con aislamiento PVC THW. Temperatura máxima 75°C. Color según disponibilidad. Certificación FONDONORMA.',
    '{"voltaje":600,"imagen":"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","tags":["cable","eléctrico","THW","#12"],"stockStatus":"available","unidad":"rollo"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = '3m'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),

  (
    'Breaker Termomagnético 30A Schneider',
    'breaker-30a',
    'SCH-EZ9F34230',
    'Disyuntor monofásico para tableros eléctricos residenciales.',
    'Breaker de 30 amperios, monofásico, capacidad de interrupción 10kA. Montaje en riel DIN. Protección contra sobrecarga y cortocircuito.',
    '{"referencia":"EZ9F34230","voltaje":240,"imagen":"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","tags":["breaker","disyuntor","tablero","protección"],"stockStatus":"new-batch","unidad":"und"}'::jsonb,
    true,
    (SELECT id FROM public.brands     WHERE slug = 'schneider-electric'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),

  (
    'Cinta Aislante Temflex 1700 3M (x10 und)',
    'cinta-aislante-3m',
    '3M-TEMFLEX1700-10',
    'Cinta PVC negro, resistente hasta 600V, pack de 10 rollos.',
    'Cinta aislante PVC Temflex 1700, negro, pack de 10 unidades. Resistente hasta 600V. Temperatura de uso -18°C a +105°C.',
    '{"referencia":"TEMFLEX1700-10","imagen":"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","tags":["cinta","aislante","3M","eléctrico"],"stockStatus":"available","unidad":"pack"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = '3m'),
    (SELECT id FROM public.categories WHERE slug = 'electricidad')
  ),

  -- ── IMPERMEABILIZACIÓN ────────────────────────────────────────────────────

  (
    'Manto Asfáltico 3mm x 10m²',
    'manto-asfaltico-3mm',
    'TRU-MANTO3MM-10M2',
    'Manto prefabricado con polietileno, para techos y azoteas.',
    'Manto asfáltico modificado con APP, espesor 3mm, cobertura de 10m². Aplicación con soplete. Alta resistencia a la intemperie y UV.',
    '{"imagen":"https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80","tags":["manto","asfáltico","impermeabilización","techo"],"stockStatus":"available","unidad":"rollo"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'truper'),
    (SELECT id FROM public.categories WHERE slug = 'impermeabilizacion')
  ),

  (
    'Pintura Impermeabilizante Blanca 5 Gal',
    'pintura-impermeabilizante-5gal',
    'TRU-IMPERMEAB-5G',
    'Recubrimiento acrílico elastomérico para techos y paredes exteriores.',
    'Pintura base agua con elasticidad superior, refleja hasta 85% de rayos solares. Rendimiento 4-5 m²/galón. Aplicar 2 capas mínimo.',
    '{"imagen":"https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80","tags":["pintura","impermeabilizante","elastomérica","techo"],"stockStatus":"available","unidad":"cuñete"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = 'truper'),
    (SELECT id FROM public.categories WHERE slug = 'impermeabilizacion')
  ),

  (
    'Sellador de Silicona Transparente 280ml',
    'sellador-silicona-transparente',
    '3M-SILIC-280ML',
    'Silicona neutra para juntas de baño, cocina y ventanas.',
    'Sellador de silicona neutra 100%, no corrosivo. Resistente a moho y UV. Temperatura de servicio -40°C a +150°C. Fraguado 24 horas.',
    '{"imagen":"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80","tags":["sellador","silicona","baño","juntas"],"stockStatus":"available","unidad":"und"}'::jsonb,
    false,
    (SELECT id FROM public.brands     WHERE slug = '3m'),
    (SELECT id FROM public.categories WHERE slug = 'impermeabilizacion')
  )

ON CONFLICT (slug) DO NOTHING;

COMMIT;

-- =============================================================================
-- VERIFICACIÓN POST-SEED
-- =============================================================================
-- Ejecutar estas queries para confirmar:
--
-- SELECT count(*) FROM public.brands;       -- debe dar 7
-- SELECT count(*) FROM public.categories;   -- debe dar 5
-- SELECT count(*) FROM public.products;     -- debe dar 16
--
-- SELECT p.name, b.name AS brand, c.name AS category
--   FROM public.products p
--   JOIN public.brands b ON p.brand_id = b.id
--   JOIN public.categories c ON p.category_id = c.id
--   ORDER BY c.name, p.name;
