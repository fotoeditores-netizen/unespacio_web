CREATE TABLE IF NOT EXISTS menu_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  url text NOT NULL,
  parent_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  orden int NOT NULL DEFAULT 0,
  activo boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS menu_items_parent_idx ON menu_items(parent_id);
CREATE INDEX IF NOT EXISTS menu_items_orden_idx ON menu_items(orden);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública menu" ON menu_items
  FOR SELECT USING (activo = true);

CREATE POLICY "Gestión autenticada menu" ON menu_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Datos iniciales: menú actual del sitio
INSERT INTO menu_items (label, url, parent_id, orden, activo) VALUES
  ('Inicio',     '/',           null, 0, true),
  ('Estudio',    '/estudio',    null, 1, true),
  ('Portafolio', '/portafolio', null, 2, true),
  ('Servicios',  '/servicios',  null, 3, true)
ON CONFLICT DO NOTHING;
