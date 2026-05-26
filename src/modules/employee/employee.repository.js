import db from "../../config/database.js";

const employeeRepository = {
  // Get all employees
  findAll: async () => {
    try {
      const query = "SELECT * FROM employees ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get employee by ID
  findById: async (id) => {
    try {
      const query = "SELECT * FROM employees WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Create new employee
  create: async (employeeData) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        joiningDate,
        birthday,
        endDate,
        salary,
        photo,
        address,
        emergencyContact,
        status,
      } = employeeData;

      const query = `
        INSERT INTO employees (
          first_name, last_name, email, phone, position, department,
          joining_date, birthday, end_date, salary, photo, address, emergency_contact, status,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        joiningDate,
        birthday || null,
        endDate || null,
        salary || null,
        photo || null,
        address || null,
        emergencyContact || null,
        status || "active",
      ]);

      return {
        id: result.insertId,
        ...employeeData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Update employee
  update: async (id, employeeData) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        joiningDate,
        birthday,
        endDate,
        salary,
        photo,
        address,
        emergencyContact,
        status,
      } = employeeData;

      const query = `
        UPDATE employees 
        SET first_name = ?, last_name = ?, email = ?, phone = ?, 
            position = ?, department = ?, joining_date = ?, birthday = ?,
            end_date = ?, salary = ?, photo = ?, address = ?, 
            emergency_contact = ?, status = ?, updated_at = NOW()
        WHERE id = ?
      `;

      const [result] = await db.query(query, [
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        joiningDate,
        birthday || null,
        endDate || null,
        salary || null,
        photo || null,
        address || null,
        emergencyContact || null,
        status || "active",
        id,
      ]);

      if (result.affectedRows === 0) {
        return null;
      }

      return await employeeRepository.findById(id);
    } catch (error) {
      throw error;
    }
  },

  // Delete employee
  delete: async (id) => {
    try {
      const query = "DELETE FROM employees WHERE id = ?";
      const [result] = await db.query(query, [id]);

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Get employees by department
  findByDepartment: async (department) => {
    try {
      const query =
        "SELECT * FROM employees WHERE department = ? ORDER BY created_at DESC";
      const [rows] = await db.query(query, [department]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get active employees
  findActive: async () => {
    try {
      const query =
        "SELECT * FROM employees WHERE status = 'active' ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

export default employeeRepository;
