import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
});

// Ensure database exists and switch to it
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(100),
        contact VARCHAR(20),
        image VARCHAR(255),
        email_id VARCHAR(100)
      )
    `;
    await connection.query(createTableQuery);

    console.log(`✅ Database "${process.env.DB_NAME}" and table "schools" are ready.`);
    connection.release();
  } catch (err) {
    console.error("❌ Error during DB setup:", err);
  }
})();

export default pool;
