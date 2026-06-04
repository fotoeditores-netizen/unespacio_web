-- Tabla de páginas dinámicas
CREATE TABLE IF NOT EXISTS paginas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text NOT NULL,
  slug text NOT NULL UNIQUE,
  estado text NOT NULL DEFAULT 'borrador' CHECK (estado IN ('borrador', 'publicada')),
  orden int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de bloques de contenido
CREATE TABLE IF NOT EXISTS bloques (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  pagina_id uuid NOT NULL REFERENCES paginas(id) ON DELETE CASCADE,
  tipo text NOT NULL CHECK (tipo IN ('texto', 'imagen_texto', 'hero', 'galeria')),
  orden int NOT NULL DEFAULT 0,
  contenido jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS bloques_pagina_id_idx ON bloques(pagina_id);
CREATE INDEX IF NOT EXISTS bloques_orden_idx ON bloques(pagina_id, orden);

-- RLS
ALTER TABLE paginas ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloques ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública paginas publicadas" ON paginas
  FOR SELECT USING (estado = 'publicada');

CREATE POLICY "Gestión autenticada paginas" ON paginas
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Lectura pública bloques" ON bloques
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM paginas p WHERE p.id = pagina_id AND p.estado = 'publicada'
    )
  );

CREATE POLICY "Gestión autenticada bloques" ON bloques
  FOR ALL USING (auth.role() = 'authenticated');
