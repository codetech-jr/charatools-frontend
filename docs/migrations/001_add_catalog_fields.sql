-- =============================================================================
-- Migración 001: Añadir columnas de catálogo a la tabla products
-- =============================================================================
-- Archivo: docs/migrations/001_add_catalog_fields.sql
-- Proyecto: CharaTools E-Commerce
-- Fecha: 2026-04-22
--
-- INSTRUCCIONES:
-- Ejecutar este script en: Supabase Dashboard → SQL Editor → New Query
--
-- Columnas actuales (pre-migración):
--   id, name, slug, short_desc, description, specs, is_casheable, created_at, updated_at
--
-- Columnas que este script añade:
--   tags, category, brand, unit, image, stock_status, is_outlet, combo_ids
-- =============================================================================

-- 1. Tags (array de strings para búsqueda y filtros)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- 2. Categoría (slug para filtrado en frontend)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS category text;

-- 3. Marca
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS brand text;

-- 4. Unidad de venta
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS unit text DEFAULT 'und';

-- 5. URL de imagen principal
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS image text;

-- 6. Estado de inventario
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS stock_status text DEFAULT 'available'
  CHECK (stock_status IN ('available', 'high-demand', 'new-batch', 'out-of-stock'));

-- 7. Flag outlet
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_outlet boolean DEFAULT false;

-- 8. IDs de combos relacionados (cross-selling)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS combo_ids text[] DEFAULT '{}';

-- =============================================================================
-- Índices para mejorar rendimiento de filtros
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_products_category   ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_brand       ON public.products (brand);
CREATE INDEX IF NOT EXISTS idx_products_stock       ON public.products (stock_status);
CREATE INDEX IF NOT EXISTS idx_products_tags        ON public.products USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_products_is_casheable ON public.products (is_casheable);

-- =============================================================================
-- Seed: productos iniciales del catálogo CharaTools
-- (Copiados de lib/mockCatalog.ts — base de datos de referencia)
-- =============================================================================

INSERT INTO public.products (name, slug, short_desc, description, category, brand, unit, image, stock_status, is_casheable, tags, specs)
VALUES
  (
    'Taladro Percutor 550W INGCO',
    'taladro-ingco-550w',
    'Taladro percutor profesional con 2 velocidades y chuck 13mm.',
    'Ideal para concreto y mampostería. Motor de 550W, mandril de 13mm, 2 velocidades seleccionables, función percutor activable. Incluye maletín y broca de prueba.',
    'herramientas-general', 'INGCO', 'und',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    'available', true,
    ARRAY['taladro','percutor','concreto','mampostería'],
    '{"referencia": "ID2228VRE", "potenciaW": 550, "voltaje": 120, "pesoKg": 1.8}'::jsonb
  ),
  (
    'Esmeril Angular 820W 4½" INGCO',
    'esmeril-ingco-820w',
    'Esmeril profesional con disco de 115mm y 11,000 RPM.',
    'Motor de cobre puro de 820W, velocidad sin carga 11,000 RPM. Ideal para cortar, desbastar y pulir metales y concreto.',
    'herramientas-general', 'INGCO', 'und',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80',
    'available', true,
    ARRAY['esmeril','amoladora','corte','desbaste'],
    '{"referencia": "AG7508", "potenciaW": 820, "voltaje": 120, "pesoKg": 1.9}'::jsonb
  ),
  (
    'Sierra Caladora 550W DeWalt',
    'sierra-caladora-dewalt-550w',
    'Sierra caladora orbital con velocidad variable y corte biselado a 45°.',
    'Motor de 550W, corte máximo 65mm en madera y 6mm en acero. Velocidad variable 800-3100 CPM.',
    'herramientas-general', 'Dewalt', 'und',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    'new-batch', false,
    ARRAY['sierra','caladora','madera','corte'],
    '{"referencia": "DW300", "potenciaW": 550, "voltaje": 120, "pesoKg": 2.1}'::jsonb
  ),
  (
    'Flexómetro Classic 5m Stanley',
    'flexometro-stanley-5m',
    'Cinta métrica resistente, bloqueo automático, gancho magnético.',
    NULL,
    'herramientas-general', 'Stanley', 'und',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    'available', false,
    ARRAY['flexómetro','medida','stanley','cinta métrica'],
    '{"referencia": "30-497", "pesoKg": 0.3}'::jsonb
  ),
  (
    'Bomba de Agua Periférica ½ HP',
    'bomba-periferica-1-2hp',
    'Bomba potente para riego y abastecimiento residencial.',
    'Carcasa en hierro fundido, impulsor de bronce. Caudal máximo 40L/min, altura máxima 35m.',
    'plomeria', 'INGCO', 'und',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    'high-demand', true,
    ARRAY['bomba','agua','riego','presión'],
    '{"referencia": "SPWP8001", "potenciaW": 370, "voltaje": 120}'::jsonb
  ),
  (
    'Tubería PPR ½" para Aguas Blancas (6m)',
    'tuberia-ppr-12',
    'Tubería PPR PN20, resistente a altas temperaturas hasta 95°C.',
    NULL,
    'plomeria', 'Truper', 'm',
    'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    'available', false,
    ARRAY['tubería','PPR','aguas blancas','plomería'],
    '{}'::jsonb
  ),
  (
    'Press Control Automático 1HP',
    'press-control-automatico',
    'Regulador de presión para sistemas de agua residencial.',
    'Encendido/apagado automático según flujo. Protección contra funcionamiento en seco.',
    'plomeria', 'INGCO', 'und',
    'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80',
    'high-demand', true,
    ARRAY['press control','presión','bomba','automático'],
    '{"potenciaW": 750}'::jsonb
  ),
  (
    'Bombillo LED 9W Luz Cálida E27',
    'bombillo-led-9w',
    'Bajo consumo, 800 lúmenes, vida útil 25,000 horas.',
    'Reemplazo de bombillo incandescente de 60W. Base E27, luz cálida 3000K. Sin mercurio.',
    'iluminacion', 'Philips', 'und',
    'https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80',
    'available', false,
    ARRAY['LED','bombillo','iluminación','E27'],
    '{"referencia": "LED927E27", "potenciaW": 9, "voltaje": 120}'::jsonb
  ),
  (
    'Panel LED Rectangular 60W',
    'panel-led-60w',
    'Panel empotrado 60x60cm, luz blanca neutra, driver incluido.',
    'Panel LED de 60x60cm. 4200 lúmenes, color 4000K. Factor de potencia >0.9.',
    'iluminacion', 'Philips', 'und',
    'https://images.unsplash.com/photo-1565631969034-0e5c0f0e8c59?w=400&q=80',
    'high-demand', false,
    ARRAY['panel','LED','empotrado','oficina'],
    '{"potenciaW": 60, "voltaje": 120}'::jsonb
  ),
  (
    'Reflector LED 50W IP65 INGCO',
    'reflector-led-50w',
    'Reflector exterior resistente al agua, 4500 lúmenes, luz blanca.',
    'Carcasa de aluminio fundido, protección IP65, luz blanca 6500K.',
    'iluminacion', 'INGCO', 'und',
    'https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80',
    'available', false,
    ARRAY['reflector','LED','exterior','IP65'],
    '{"referencia": "HLFL3501", "potenciaW": 50, "voltaje": 120}'::jsonb
  ),
  (
    'Cable Eléctrico #12 AWG x 100m',
    'cable-electrico-12-100m',
    'Cable THW calibre 12 AWG, certificado FONDONORMA, uso residencial.',
    'Cable de cobre sólido con aislamiento PVC THW. Temperatura máxima 75°C.',
    'electricidad', '3M', 'rollo',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    'available', false,
    ARRAY['cable','eléctrico','THW','#12'],
    '{"voltaje": 600}'::jsonb
  ),
  (
    'Breaker Termomagnético 30A Schneider',
    'breaker-30a',
    'Disyuntor monofásico para tableros eléctricos residenciales.',
    'Breaker de 30A, monofásico, capacidad 10kA. Montaje en riel DIN.',
    'electricidad', 'Schneider Electric', 'und',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    'new-batch', true,
    ARRAY['breaker','disyuntor','tablero','protección'],
    '{"referencia": "EZ9F34230", "voltaje": 240}'::jsonb
  ),
  (
    'Cinta Aislante Temflex 1700 3M (x10 und)',
    'cinta-aislante-3m',
    'Cinta PVC negro, resistente hasta 600V, pack de 10 rollos.',
    NULL,
    'electricidad', '3M', 'pack',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    'available', false,
    ARRAY['cinta','aislante','3M','eléctrico'],
    '{"referencia": "TEMFLEX1700-10"}'::jsonb
  ),
  (
    'Manto Asfáltico 3mm x 10m²',
    'manto-asfaltico-3mm',
    'Manto prefabricado con polietileno, para techos y azoteas.',
    'Manto asfáltico modificado con APP, espesor 3mm, cobertura 10m². Aplicación con soplete.',
    'impermeabilizacion', 'Truper', 'rollo',
    'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    'available', false,
    ARRAY['manto','asfáltico','impermeabilización','techo'],
    '{}'::jsonb
  ),
  (
    'Pintura Impermeabilizante Blanca 5 Gal',
    'pintura-impermeabilizante-5gal',
    'Recubrimiento acrílico elastomérico para techos y paredes exteriores.',
    'Pintura base agua con elasticidad superior. Rendimiento 4-5 m²/galón.',
    'impermeabilizacion', 'Truper', 'cuñete',
    'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    'available', false,
    ARRAY['pintura','impermeabilizante','elastomérica','techo'],
    '{}'::jsonb
  ),
  (
    'Sellador de Silicona Transparente 280ml',
    'sellador-silicona-transparente',
    'Silicona neutra para juntas de baño, cocina y ventanas.',
    'Sellador de silicona neutra 100%, no corrosivo. Resistente a moho y UV.',
    'impermeabilizacion', '3M', 'und',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    'available', false,
    ARRAY['sellador','silicona','baño','juntas'],
    '{}'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- VERIFICACIÓN: ejecutar después para confirmar el seed
-- =============================================================================
-- SELECT count(*) as total, category FROM public.products GROUP BY category ORDER BY category;
