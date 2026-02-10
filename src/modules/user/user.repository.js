import db from "../../config/database.js";

const userRepository = {
  getAllUsers: async () => {
    try {
      const query = "SELECT * FROM users";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const query = "SELECT * FROM users WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const { name, email, password } = userData;
      const query =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      const [result] = await db.query(query, [name, email, password]);
      return { id: result.insertId, ...userData };
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const { name, email } = userData;
      const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
      await db.query(query, [name, email, id]);
      return { id, ...userData };
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const query = "DELETE FROM users WHERE id = ?";
      await db.query(query, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default userRepository;
