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

//Create blog table if it doesn't exist
export const initializeBlogTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT NOT NULL,
        excerpt TEXT,
        author VARCHAR(255),
        cover_image VARCHAR(255),
        category VARCHAR(100),
        tags JSON,
        featured BOOLEAN DEFAULT FALSE,
        status ENUM('draft', 'published') DEFAULT 'draft',
        published_at TIMESTAMP NULL,
        meta_title VARCHAR(255),
        meta_description TEXT,
        read_time INT,
        video_url VARCHAR(500) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await db.query(createTableQuery);
    console.log("✅ Blogs table initialized");
  } catch (error) {
    console.error("Error initializing blogs table:", error);
  }
};

// Create clients table if it doesn't exist
export const initializeClientsTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NULL,
        company VARCHAR(255) NULL,
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        last_interaction DATETIME NULL,
        notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_client_status (status),
        INDEX idx_client_name (name)
      )
    `;

    await db.query(createTableQuery);
    console.log("✅ Clients table initialized");
  } catch (error) {
    console.error("Error initializing clients table:", error);
  }
};

// Create client projects table if it doesn't exist
export const initializeClientProjectsTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS client_projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        status ENUM('Planning', 'In Progress', 'Pending', 'Completed', 'On Hold') DEFAULT 'Pending',
        start_date DATE NULL,
        end_date DATE NULL,
        progress INT DEFAULT 0,
        description TEXT NULL,
        approval_status ENUM('Approved', 'Rejected') NULL,
        approved_by VARCHAR(255) NULL,
        approved_date DATE NULL,
        rejection_reason TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_client_project_status (status),
        INDEX idx_client_project_client (client_id),
        CONSTRAINT fk_client_projects_client
          FOREIGN KEY (client_id) REFERENCES clients(id)
          ON DELETE CASCADE
      )
    `;

    await db.query(createTableQuery);
    console.log("✅ Client projects table initialized");
  } catch (error) {
    console.error("Error initializing client projects table:", error);
  }
};

// Create client payments table if it doesn't exist
export const initializeClientPaymentsTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS client_payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        project VARCHAR(255) NOT NULL,
        cost DECIMAL(12,2) NOT NULL,
        type ENUM('monthly', 'yearly') NOT NULL,
        due_date DATE NOT NULL,
        status ENUM('paid', 'pending') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_client_payment_client (client_id),
        INDEX idx_client_payment_status (status),
        CONSTRAINT fk_client_payments_client
          FOREIGN KEY (client_id) REFERENCES clients(id)
          ON DELETE CASCADE
      )
    `;

    await db.query(createTableQuery);
    console.log("✅ Client payments table initialized");
  } catch (error) {
    console.error("Error initializing client payments table:", error);
  }
};

// Create client documents table if it doesn't exist
export const initializeClientDocumentsTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS client_documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(100) NOT NULL,
        file_size INT NOT NULL,
        file_url VARCHAR(500) NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_client_documents_client (client_id),
        CONSTRAINT fk_client_documents_client
          FOREIGN KEY (client_id) REFERENCES clients(id)
          ON DELETE CASCADE
      )
    `;

    await db.query(createTableQuery);
    console.log("✅ Client documents table initialized");
  } catch (error) {
    console.error("Error initializing client documents table:", error);
  }
};
