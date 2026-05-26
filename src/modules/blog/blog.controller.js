import blogService from "./blog.service.js";
import apiResponse from "../../utils/apiResponse.js";
import fs from "fs";

const blogController = {
  // Get all blogs
  getAllBlogs: async (req, res) => {
    try {
      const result = await blogService.getAllBlogs();

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, "Blogs retrieved successfully"));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get published blogs
  getPublishedBlogs: async (req, res) => {
    try {
      const result = await blogService.getPublishedBlogs();

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get blog by ID
  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Blog ID is required"));
      }

      const result = await blogService.getBlogById(id);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, "Blog retrieved successfully"));
      } else {
        return res.status(404).json(apiResponse(404, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get blogs by category
  getBlogsByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      if (!category) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Category is required"));
      }

      const result = await blogService.getBlogsByCategory(category);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get featured blogs
  getFeaturedBlogs: async (req, res) => {
    try {
      const { limit } = req.query;
      const result = await blogService.getFeaturedBlogs(
        limit ? parseInt(limit) : 6
      );

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Create new blog
  createBlog: async (req, res) => {
    try {
      const blogData = req.body;

      if (!blogData) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Blog data is required"));
      }

      // Parse JSON strings from FormData
      if (typeof blogData.tags === 'string') {
        blogData.tags = JSON.parse(blogData.tags);
      }

      // Handle file upload
      if (req.file) {
        blogData.coverImage = `/uploads/blogs/${req.file.filename}`;
      }

      const result = await blogService.createBlog(blogData);

      if (result.success) {
        return res
          .status(201)
          .json(apiResponse(201, result.data, "Blog created successfully"));
      } else {
        // Delete uploaded file if blog creation fails
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.log("Error deleting file:", err);
          });
        }
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      // Delete uploaded file on error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.log("Error deleting file:", err);
        });
      }
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Update blog
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const blogData = req.body;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Blog ID is required"));
      }

      if (!blogData) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Blog data is required"));
      }

      // Parse JSON strings from FormData
      if (typeof blogData.tags === 'string') {
        blogData.tags = JSON.parse(blogData.tags);
      }

      // Handle file upload
      if (req.file) {
        blogData.coverImage = `/uploads/blogs/${req.file.filename}`;
      }

      const result = await blogService.updateBlog(id, blogData);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, "Blog updated successfully"));
      } else {
        // Delete uploaded file if update fails
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.log("Error deleting file:", err);
          });
        }
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      // Delete uploaded file on error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.log("Error deleting file:", err);
        });
      }
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Delete blog
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Blog ID is required"));
      }

      const result = await blogService.deleteBlog(id);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, null, "Blog deleted successfully"));
      } else {
        return res.status(404).json(apiResponse(404, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Search blogs
  searchBlogs: async (req, res) => {
    try {
      const { query } = req.query;

      if (!query) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Search query is required"));
      }

      const result = await blogService.searchBlogs(query);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get blogs by status
  getBlogsByStatus: async (req, res) => {
    try {
      const { status } = req.params;

      if (!status) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Status is required"));
      }

      const result = await blogService.getBlogsByStatus(status);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default blogController;
