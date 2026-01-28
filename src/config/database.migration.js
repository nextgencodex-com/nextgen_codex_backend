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
    console.log("✅ Admin table initialized");
  } catch (error) {
    console.error("Error initializing admin table:", error);
  }
};

// Create projects table if it doesn't exist
export const initializeProjectsTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description LONGTEXT NOT NULL,
        image VARCHAR(500) NOT NULL,
        tags JSON DEFAULT NULL,
        category JSON NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        status ENUM('completed', 'ongoing') DEFAULT 'ongoing',
        github_link VARCHAR(500) NULL,
        website_link VARCHAR(500) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_featured (featured),
        INDEX idx_created_at (created_at)
      )
    `;

    await db.query(createTableQuery);
    console.log("✅ Projects table initialized");
  } catch (error) {
    console.error("Error initializing projects table:", error);
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

