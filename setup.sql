-- Create the database
CREATE DATABASE IF NOT EXISTS nextgen_codex;

-- Use the database
USE nextgen_codex;

-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial admin user (username: admin, password hashed for 'admin123')
INSERT INTO admin (username, password) VALUES ('admin', '$2b$10$5R6S0YZOWqSMLNhJ7zK8KOx1bF9K5J6K5J6K5J6K5J6K5J6K5J6K') ON DUPLICATE KEY UPDATE password=VALUES(password);
