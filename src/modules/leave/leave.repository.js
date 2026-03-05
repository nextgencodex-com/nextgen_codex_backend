import db from "../../config/database.js";

const leaveRepository = {
  // Get all leave records
  findAll: async () => {
    try {
      const query = `
        SELECT l.*, e.first_name, e.last_name, e.position, e.department, e.photo
        FROM leave_records l
        LEFT JOIN employees e ON l.employee_id = e.id
        ORDER BY l.created_at DESC
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get leave by ID
  findById: async (id) => {
    try {
      const query = `
        SELECT l.*, e.first_name, e.last_name, e.position, e.department, e.photo
        FROM leave_records l
        LEFT JOIN employees e ON l.employee_id = e.id
        WHERE l.id = ?
      `;
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get leave by employee ID
  findByEmployeeId: async (employeeId) => {
    try {
      const query = `
        SELECT * FROM leave_records 
        WHERE employee_id = ? 
        ORDER BY start_date DESC
      `;
      const [rows] = await db.query(query, [employeeId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get leave by status
  findByStatus: async (status) => {
    try {
      const query = `
        SELECT l.*, e.first_name, e.last_name, e.position, e.department, e.photo
        FROM leave_records l
        LEFT JOIN employees e ON l.employee_id = e.id
        WHERE l.status = ?
        ORDER BY l.created_at DESC
      `;
      const [rows] = await db.query(query, [status]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Create leave record
  create: async (leaveData) => {
    try {
      const {
        employeeId,
        leaveType,
        startDate,
        endDate,
        reason,
        status,
        approvedBy,
      } = leaveData;

      const query = `
        INSERT INTO leave_records (
          employee_id, leave_type, start_date, end_date, reason, status, approved_by, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        employeeId,
        leaveType,
        startDate,
        endDate,
        reason || null,
        status || "pending",
        approvedBy || null,
      ]);

      return {
        id: result.insertId,
        ...leaveData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Update leave record
  update: async (id, leaveData) => {
    try {
      const {
        leaveType,
        startDate,
        endDate,
        reason,
        status,
        approvedBy,
      } = leaveData;

      const query = `
        UPDATE leave_records 
        SET leave_type = ?, start_date = ?, end_date = ?, reason = ?, 
            status = ?, approved_by = ?, updated_at = NOW()
        WHERE id = ?
      `;

      const [result] = await db.query(query, [
        leaveType,
        startDate,
        endDate,
        reason || null,
        status,
        approvedBy || null,
        id,
      ]);

      if (result.affectedRows === 0) {
        return null;
      }

      return await leaveRepository.findById(id);
    } catch (error) {
      throw error;
    }
  },

  // Delete leave record
  delete: async (id) => {
    try {
      const query = "DELETE FROM leave_records WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Get leave for date range
  findByDateRange: async (startDate, endDate, employeeId = null) => {
    try {
      let query = `
        SELECT l.*, e.first_name, e.last_name, e.position, e.department
        FROM leave_records l
        LEFT JOIN employees e ON l.employee_id = e.id
        WHERE (l.start_date BETWEEN ? AND ?) OR (l.end_date BETWEEN ? AND ?)
      `;
      const params = [startDate, endDate, startDate, endDate];

      if (employeeId) {
        query += " AND l.employee_id = ?";
        params.push(employeeId);
      }

      query += " ORDER BY l.start_date DESC";

      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get leave for employee within date range
  findByEmployeeAndDateRange: async (employeeId, startDate, endDate) => {
    try {
      return await leaveRepository.findByDateRange(startDate, endDate, employeeId);
    } catch (error) {
      throw error;
    }
  },
};

export default leaveRepository;
