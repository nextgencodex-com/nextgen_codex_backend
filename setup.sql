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

-- Create clients table
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
);

-- Create client projects table
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
);

-- Create client payments table
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
);

-- Create client documents table
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
);
