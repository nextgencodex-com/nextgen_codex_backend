import db from "../../config/database.js";

const authRepository = {
  findAdminByUsername: async (username) => {
    try {
      const query = "SELECT * FROM admin WHERE username = ?";
      const [rows] = await db.query(query, [username]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  findAdminById: async (id) => {
    try {
      const query = "SELECT * FROM admin WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  createAdmin: async (adminData) => {
    try {
      const { username, password } = adminData;
      const query = `
        INSERT INTO admin (username, password) 
        VALUES (?, ?)
      `;
      const [result] = await db.query(query, [username, password]);

      return {
        id: result.insertId,
        username,
      };
    } catch (error) {
      throw error;
    }
  },

  updateAdmin: async (id, adminData) => {
    try {
      const { username } = adminData;
      const query = "UPDATE admin SET username = ? WHERE id = ?";
      await db.query(query, [username, id]);

      return { id, username };
    } catch (error) {
      throw error;
    }
  },

  deleteAdmin: async (id) => {
    try {
      const query = "DELETE FROM admin WHERE id = ?";
      await db.query(query, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },

  getAllAdmins: async () => {
    try {
      const query = "SELECT id, username, created_at FROM admin";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

export default authRepository;
