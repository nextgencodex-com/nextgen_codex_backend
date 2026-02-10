import db from "../../config/database.js";

const blogRepository = {
  // Get all blogs
  findAll: async () => {
    try {
      const query = "SELECT * FROM blogs ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get blog by ID
  findById: async (id) => {
    try {
      const query = "SELECT * FROM blogs WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get blogs by category
  findByCategory: async (category) => {
    try {
      const query =
        "SELECT * FROM blogs WHERE category = ? ORDER BY created_at DESC";
      const [rows] = await db.query(query, [category]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get featured blogs
  findFeatured: async (limit = 6) => {
    try {
      const query =
        "SELECT * FROM blogs WHERE featured = true AND status = 'published' ORDER BY created_at DESC LIMIT ?";
      const [rows] = await db.query(query, [limit]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Create new blog
  create: async (blogData) => {
    try {
      const {
        title,
        slug,
        content,
        excerpt,
        author,
        coverImage,
        category,
        tags,
        featured,
        status,
        publishedAt,
        metaTitle,
        metaDescription,
        readTime,
        videoUrl,
      } = blogData;

      const query = `
        INSERT INTO blogs (
          title, slug, content, excerpt, author, cover_image, category, tags, 
          featured, status, published_at, meta_title, meta_description, read_time, video_url, 
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await db.query(query, [
        title,
        slug,
        content,
        excerpt,
        author,
        coverImage,
        category,
        tags ? JSON.stringify(tags) : null,
        featured || false,
        status || "draft",
        publishedAt || null,
        metaTitle || null,
        metaDescription || null,
        readTime || null,
        videoUrl || null,
      ]);

      return {
        id: result.insertId,
        ...blogData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Update blog
  update: async (id, blogData) => {
    try {
      const {
        title,
        slug,
        content,
        excerpt,
        author,
        coverImage,
        category,
        tags,
        featured,
        status,
        publishedAt,
        metaTitle,
        metaDescription,
        readTime,
        videoUrl,
      } = blogData;

      const query = `
        UPDATE blogs SET 
          title = ?, slug = ?, content = ?, excerpt = ?, author = ?, 
          cover_image = ?, category = ?, tags = ?, featured = ?, status = ?, 
          published_at = ?, meta_title = ?, meta_description = ?, read_time = ?, 
          video_url = ?, updated_at = NOW()
        WHERE id = ?
      `;

      const [result] = await db.query(query, [
        title,
        slug,
        content,
        excerpt,
        author,
        coverImage,
        category,
        tags ? JSON.stringify(tags) : null,
        featured,
        status,
        publishedAt || null,
        metaTitle || null,
        metaDescription || null,
        readTime || null,
        videoUrl || null,
        id,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Delete blog
  delete: async (id) => {
    try {
      const query = "DELETE FROM blogs WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Search blogs
  search: async (searchTerm) => {
    try {
      const query = `
        SELECT * FROM blogs 
        WHERE title LIKE ? OR excerpt LIKE ? OR content LIKE ?
        ORDER BY created_at DESC
      `;
      const searchPattern = `%${searchTerm}%`;
      const [rows] = await db.query(query, [
        searchPattern,
        searchPattern,
        searchPattern,
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get published blogs
  findPublished: async () => {
    try {
      const query =
        "SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get blogs by status
  findByStatus: async (status) => {
    try {
      const query =
        "SELECT * FROM blogs WHERE status = ? ORDER BY created_at DESC";
      const [rows] = await db.query(query, [status]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

export default blogRepository;
