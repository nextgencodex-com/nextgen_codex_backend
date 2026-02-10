import db from "../../config/database.js";

const clientProjectRepository = {
  findAll: async ({ status, clientId, approvalStatus } = {}) => {
    try {
      let query = "SELECT * FROM client_projects WHERE 1=1";
      const params = [];

      if (status) {
        query += " AND status = ?";
        params.push(status);
      }

      if (clientId) {
        query += " AND client_id = ?";
        params.push(clientId);
      }

      if (approvalStatus) {
        query += " AND approval_status = ?";
        params.push(approvalStatus);
      }

      query += " ORDER BY created_at DESC";
      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const query = "SELECT * FROM client_projects WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  create: async (projectData) => {
    try {
      const {
        clientId,
        name,
        status,
        startDate,
        endDate,
        progress,
        description,
      } = projectData;

      const query = `
        INSERT INTO client_projects (
          client_id, name, status, start_date, end_date, progress, description, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        clientId,
        name,
        status || "Pending",
        startDate || null,
        endDate || null,
        progress ?? 0,
        description || null,
      ]);

      return { id: result.insertId, ...projectData };
    } catch (error) {
      throw error;
    }
  },

  update: async (id, projectData) => {
    try {
      const {
        clientId,
        name,
        status,
        startDate,
        endDate,
        progress,
        description,
      } = projectData;

      const query = `
        UPDATE client_projects
        SET client_id = ?, name = ?, status = ?, start_date = ?, end_date = ?, progress = ?, description = ?, updated_at = NOW()
        WHERE id = ?
      `;

      await db.query(query, [
        clientId,
        name,
        status || "Pending",
        startDate || null,
        endDate || null,
        progress ?? 0,
        description || null,
        id,
      ]);

      return { id, ...projectData };
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const query = "DELETE FROM client_projects WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  approve: async ({ id, approvedBy }) => {
    try {
      const query = `
        UPDATE client_projects
        SET approval_status = 'Approved', approved_by = ?, approved_date = CURDATE(), rejection_reason = NULL, updated_at = NOW()
        WHERE id = ?
      `;
      await db.query(query, [approvedBy || null, id]);
      return true;
    } catch (error) {
      throw error;
    }
  },

  reject: async ({ id, approvedBy, rejectionReason }) => {
    try {
      const query = `
        UPDATE client_projects
        SET approval_status = 'Rejected', approved_by = ?, approved_date = CURDATE(), rejection_reason = ?, updated_at = NOW()
        WHERE id = ?
      `;
      await db.query(query, [approvedBy || null, rejectionReason || null, id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default clientProjectRepository;
