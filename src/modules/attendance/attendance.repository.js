import db from "../../config/database.js";

const attendanceRepository = {
  // Get all attendance records
  findAll: async () => {
    try {
      const query = `
        SELECT a.*, e.first_name, e.last_name, e.position, e.department
        FROM attendance a
        LEFT JOIN employees e ON a.employee_id = e.id
        ORDER BY a.date DESC, a.created_at DESC
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance by date
  findByDate: async (date) => {
    try {
      const query = `
        SELECT a.*, e.first_name, e.last_name, e.position, e.department, e.photo
        FROM attendance a
        LEFT JOIN employees e ON a.employee_id = e.id
        WHERE a.date = ?
        ORDER BY e.first_name ASC
      `;
      const [rows] = await db.query(query, [date]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance by employee ID
  findByEmployeeId: async (employeeId) => {
    try {
      const query = `
        SELECT * FROM attendance 
        WHERE employee_id = ? 
        ORDER BY date DESC
      `;
      const [rows] = await db.query(query, [employeeId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance by employee and date
  findByEmployeeAndDate: async (employeeId, date) => {
    try {
      const query = `
        SELECT * FROM attendance 
        WHERE employee_id = ? AND date = ?
      `;
      const [rows] = await db.query(query, [employeeId, date]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Create attendance record
  create: async (attendanceData) => {
    try {
      const { employeeId, date, status, checkInTime, checkOutTime, notes } = attendanceData;

      const query = `
        INSERT INTO attendance (
          employee_id, date, status, check_in_time, check_out_time, notes, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        employeeId,
        date,
        status,
        checkInTime || null,
        checkOutTime || null,
        notes || null,
      ]);

      return {
        id: result.insertId,
        ...attendanceData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Update attendance
  update: async (id, attendanceData) => {
    try {
      const { status, checkInTime, checkOutTime, notes } = attendanceData;

      const query = `
        UPDATE attendance 
        SET status = ?, check_in_time = ?, check_out_time = ?, notes = ?, updated_at = NOW()
        WHERE id = ?
      `;

      const [result] = await db.query(query, [
        status,
        checkInTime || null,
        checkOutTime || null,
        notes || null,
        id,
      ]);

      if (result.affectedRows === 0) {
        return null;
      }

      return await attendanceRepository.findById(id);
    } catch (error) {
      throw error;
    }
  },

  // Find by ID
  findById: async (id) => {
    try {
      const query = "SELECT * FROM attendance WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance for date range
  findByDateRange: async (startDate, endDate, employeeId = null) => {
    try {
      let query = `
        SELECT a.*, e.first_name, e.last_name, e.position, e.department
        FROM attendance a
        LEFT JOIN employees e ON a.employee_id = e.id
        WHERE a.date BETWEEN ? AND ?
      `;
      const params = [startDate, endDate];

      if (employeeId) {
        query += " AND a.employee_id = ?";
        params.push(employeeId);
      }

      query += " ORDER BY a.date DESC, e.first_name ASC";

      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get attendance for employee within date range
  findByEmployeeAndDateRange: async (employeeId, startDate, endDate) => {
    try {
      return await attendanceRepository.findByDateRange(startDate, endDate, employeeId);
    } catch (error) {
      throw error;
    }
  },

  // Delete attendance
  delete: async (id) => {
    try {
      const query = "DELETE FROM attendance WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },
};

export default attendanceRepository;
