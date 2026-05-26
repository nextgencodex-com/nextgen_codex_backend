import db from "../../config/database.js";

const careerRepository = {
  // Get all careers
  findAll: async () => {
    try {
      const query = "SELECT * FROM careers ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get career by ID
  findById: async (id) => {
    try {
      const query = "SELECT * FROM careers WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get active careers
  findActive: async () => {
    try {
      const query =
        "SELECT * FROM careers WHERE status = 'active' ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get careers by department
  findByDepartment: async (department) => {
    try {
      const query =
        "SELECT * FROM careers WHERE department = ? ORDER BY created_at DESC";
      const [rows] = await db.query(query, [department]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Create new career
  create: async (careerData) => {
    try {
      const {
        title,
        department,
        location,
        type,
        description,
        requirements,
        technologies,
        status,
      } = careerData;

      const query = `
        INSERT INTO careers (
          title, department, location, type, description,
          requirements, technologies, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        title,
        department,
        location,
        type,
        description,
        JSON.stringify(requirements),
        JSON.stringify(technologies),
        status || "active",
      ]);

      return {
        id: result.insertId,
        ...careerData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Update career
  update: async (id, careerData) => {
    try {
      const {
        title,
        department,
        location,
        type,
        description,
        requirements,
        technologies,
        status,
      } = careerData;

      const query = `
        UPDATE careers 
        SET title = ?, department = ?, location = ?, type = ?, description = ?,
            requirements = ?, technologies = ?, status = ?, updated_at = NOW()
        WHERE id = ?
      `;

      await db.query(query, [
        title,
        department,
        location,
        type,
        description,
        JSON.stringify(requirements),
        JSON.stringify(technologies),
        status || "active",
        id,
      ]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  // Delete career
  delete: async (id) => {
    try {
      const query = "DELETE FROM careers WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },
};

export default careerRepository;
