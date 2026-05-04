import pool from "../config/db.js";

export const getObat = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM obat");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getObatById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM obat WHERE id=$1",
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};