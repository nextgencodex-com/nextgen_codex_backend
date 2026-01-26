import db from "./database.js";

// Create admin table if it doesn't exist
export const initializeAdminTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await db.query(createTableQuery);

  } catch (error) {
    console.error("Error initializing admin table:", error);
  }
};

// Create initial admin if none exists
export const seedAdminUser = async (username, hashedPassword) => {
  try {
    const query = `
      INSERT INTO admin (username, password) 
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE password = ?
    `;

    await db.query(query, [username, hashedPassword, hashedPassword]);
 
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
