-- Add birthday and end_date columns to employees table
ALTER TABLE employees 
ADD COLUMN birthday DATE AFTER joining_date,
ADD COLUMN end_date DATE AFTER birthday;

-- Create notifications table for admin notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('birthday', 'contract_ending', 'leave_request', 'other') NOT NULL,
  employee_id INT,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  INDEX idx_type (type),
  INDEX idx_read (is_read),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
