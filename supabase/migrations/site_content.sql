-- Tabla de contenido editable del sitio
CREATE TABLE IF NOT EXISTS site_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  seccion text NOT NULL,
  clave text NOT NULL,
  valor text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(seccion, clave)
);

-- RLS: solo usuarios autenticados pueden leer y escribir
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "Escritura autenticada" ON site_content
  FOR ALL USING (auth.role() = 'authenticated');

-- Datos iniciales: Hero
INSERT INTO site_content (seccion, clave, valor) VALUES
  ('hero', 'titulo_linea1', 'Diseñamos los lugares'),
  ('hero', 'titulo_linea2', 'donde ocurre la vida.'),
  ('hero', 'cta1', 'Ver Portafolio'),
  ('hero', 'cta2', 'Agendar Consulta Gratuita')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Datos iniciales: Estadísticas
INSERT INTO site_content (seccion, clave, valor) VALUES
  ('stats', 'stat1_value', '+20'),
  ('stats', 'stat1_unit', 'años'),
  ('stats', 'stat1_label', 'de experiencia\ncombinada'),
  ('stats', 'stat2_value', '6'),
  ('stats', 'stat2_unit', 'tipologías'),
  ('stats', 'stat2_label', 'de arquitectura\nespecializada'),
  ('stats', 'stat3_value', '41K'),
  ('stats', 'stat3_unit', 'm²'),
  ('stats', 'stat3_label', 'proyecto de\nmayor escala'),
  ('stats', 'stat4_value', '2021'),
  ('stats', 'stat4_unit', ''),
  ('stats', 'stat4_label', 'año de\nfundación')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Datos iniciales: Contacto
INSERT INTO site_content (seccion, clave, valor) VALUES
  ('contacto', 'email', 'hola@unespacio.com'),
  ('contacto', 'whatsapp', '+57 301 437 5950'),
  ('contacto', 'ciudad', 'Colombia')
ON CONFLICT (seccion, clave) DO NOTHING;
