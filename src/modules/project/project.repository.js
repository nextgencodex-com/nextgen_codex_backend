import db from "../../config/database.js";

const projectRepository = {
  // Get all projects
  findAll: async () => {
    try {
      const query = "SELECT * FROM projects ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get project by ID
  findById: async (id) => {
    try {
      const query = "SELECT * FROM projects WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Create new project
  create: async (projectData) => {
    try {
      const {
        title,
        description,
        image,
        tags,
        category,
        featured,
        status,
        githubLink,
        websiteLink,
      } = projectData;

      const query = `
        INSERT INTO projects (
          title, description, image, tags, category, featured, status, 
          github_link, website_link, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        title,
        description,
        image,
        JSON.stringify(tags),
        JSON.stringify(category),
        featured ? 1 : 0,
        status,
        githubLink || null,
        websiteLink || null,
      ]);

      return {
        id: result.insertId,
        ...projectData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Update project
  update: async (id, projectData) => {
    try {
      const {
        title,
        description,
        image,
        tags,
        category,
        featured,
        status,
        githubLink,
        websiteLink,
      } = projectData;

      const query = `
        UPDATE projects 
        SET title = ?, description = ?, image = ?, tags = ?, category = ?, 
            featured = ?, status = ?, github_link = ?, website_link = ?, updated_at = NOW()
        WHERE id = ?
      `;

      await db.query(query, [
        title,
        description,
        image,
        JSON.stringify(tags),
        JSON.stringify(category),
        featured ? 1 : 0,
        status,
        githubLink || null,
        websiteLink || null,
        id,
      ]);

      return {
        id,
        ...projectData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const query = "DELETE FROM projects WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Get projects by category
  findByCategory: async (category) => {
    try {
      const query = "SELECT * FROM projects WHERE JSON_CONTAINS(category, ?)";
      const [rows] = await db.query(query, [JSON.stringify(category)]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get featured projects
  findFeatured: async () => {
    try {
      const query =
        "SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get projects by status
  findByStatus: async (status) => {
    try {
      const query =
        "SELECT * FROM projects WHERE status = ? ORDER BY created_at DESC";
      const [rows] = await db.query(query, [status]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

export default projectRepository;
