CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE public."3d" (
  id_0 SERIAL PRIMARY KEY,
  id TEXT,
  geom geometry(Polygon, 4326)
);

INSERT INTO public."3d" (id, geom)
VALUES (
  'مضلع تجريبي',
  ST_GeomFromText('POLYGON((31.5 30.6, 31.501 30.6, 31.501 30.601, 31.5 30.601, 31.5 30.6))', 4326)
);
