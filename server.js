const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crops_2",
  password: "postgres", // ← غيّر دي بكلمة سر PostgreSQL بتاعتك
  port: 5432,
});

app.get("/data", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_0, id, height, ST_AsGeoJSON(geom)::json AS geometry FROM public."3d"
    `);

    const geojson = {
      type: "FeatureCollection",
      features: result.rows.map((row) => ({
        type: "Feature",
        geometry: row.geometry,
        properties: {
          id_0: row.id_0,
          id: row.id,
        },
      })),
    };

    res.json(geojson);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading data");
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000/data");
});
