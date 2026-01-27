-- Create Projects Table
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
);
