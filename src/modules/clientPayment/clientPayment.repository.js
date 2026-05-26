import db from "../../config/database.js";

const clientPaymentRepository = {
  findAll: async ({ type, status, clientId, search } = {}) => {
    try {
      let query = "SELECT * FROM client_payments WHERE 1=1";
      const params = [];

      if (type) {
        query += " AND type = ?";
        params.push(type);
      }

      if (status) {
        query += " AND status = ?";
        params.push(status);
      }

      if (clientId) {
        query += " AND client_id = ?";
        params.push(clientId);
      }

      if (search) {
        query += " AND project LIKE ?";
        params.push(`%${search}%`);
      }

      query += " ORDER BY due_date ASC";
      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const query = "SELECT * FROM client_payments WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  create: async (paymentData) => {
    try {
      const { clientId, project, cost, type, dueDate, status } = paymentData;

      const query = `
        INSERT INTO client_payments (
          client_id, project, cost, type, due_date, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        clientId,
        project,
        cost,
        type,
        dueDate,
        status || "pending",
      ]);

      return { id: result.insertId };
    } catch (error) {
      throw error;
    }
  },

  update: async (id, paymentData) => {
    try {
      const { clientId, project, cost, type, dueDate, status } = paymentData;

      const query = `
        UPDATE client_payments
        SET client_id = ?, project = ?, cost = ?, type = ?, due_date = ?, status = ?, updated_at = NOW()
        WHERE id = ?
      `;

      await db.query(query, [
        clientId,
        project,
        cost,
        type,
        dueDate,
        status || "pending",
        id,
      ]);

      return { id, ...paymentData };
    } catch (error) {
      throw error;
    }
  },

  markPaid: async (id) => {
    try {
      const query = `
        UPDATE client_payments
        SET status = 'paid', updated_at = NOW()
        WHERE id = ?
      `;
      await db.query(query, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const query = "DELETE FROM client_payments WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },
};

export default clientPaymentRepository;
