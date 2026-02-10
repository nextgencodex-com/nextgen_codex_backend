import db from "../../config/database.js";

const clientRepository = {
  findAll: async ({ search, status } = {}) => {
    try {
      let query = "SELECT * FROM clients WHERE 1=1";
      const params = [];

      if (status) {
        query += " AND status = ?";
        params.push(status);
      }

      if (search) {
        query += " AND (name LIKE ? OR email LIKE ? OR company LIKE ?)";
        const like = `%${search}%`;
        params.push(like, like, like);
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
      const query = "SELECT * FROM clients WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  create: async (clientData) => {
    try {
      const { name, email, phone, company, status, lastInteraction, notes } =
        clientData;

      const query = `
        INSERT INTO clients (
          name, email, phone, company, status, last_interaction, notes, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        name,
        email,
        phone || null,
        company || null,
        status || "Active",
        lastInteraction || null,
        notes || null,
      ]);

      return { id: result.insertId };
    } catch (error) {
      throw error;
    }
  },

  update: async (id, clientData) => {
    try {
      const { name, email, phone, company, status, lastInteraction, notes } =
        clientData;

      const query = `
        UPDATE clients
        SET name = ?, email = ?, phone = ?, company = ?, status = ?, last_interaction = ?, notes = ?, updated_at = NOW()
        WHERE id = ?
      `;

      await db.query(query, [
        name,
        email,
        phone || null,
        company || null,
        status || "Active",
        lastInteraction || null,
        notes || null,
        id,
      ]);

      return { id};
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const query = "DELETE FROM clients WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },
};

export default clientRepository;
