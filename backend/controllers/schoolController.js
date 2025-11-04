import pool from "../db.js";

// Add a new school (image link from frontend)
export const addSchool = async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id, image } = req.body;

    if (!name || !address || !city || !state || !contact || !email_id || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await pool.query(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, image, email_id]
    );

    res.json({ message: "School added successfully" });
  } catch (err) {
    console.error("Error adding school:", err);
    res.status(500).json({ error: "Server error while adding school" });
  }
};

// Fetch all schools
export const getSchools = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, address, city, image FROM schools`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
};
