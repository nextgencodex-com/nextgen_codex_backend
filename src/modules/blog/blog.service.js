import blogRepository from "./blog.repository.js";

const blogService = {
  // Get all blogs
  getAllBlogs: async () => {
    try {
      const blogs = await blogRepository.findAll();

      if (blogs && blogs.length > 0) {
        const parsedBlogs = blogs.map((blog) => ({
          ...blog,
          tags: blog.tags ? JSON.parse(blog.tags) : [],
        }));

        return {
          success: true,
          data: parsedBlogs,
          message: "Blogs retrieved successfully",
        };
      } else {
        return {
          success: true,
          data: [],
          message: "No blogs found",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get published blogs
  getPublishedBlogs: async () => {
    try {
      const blogs = await blogRepository.findPublished();

      if (blogs && blogs.length > 0) {
        const parsedBlogs = blogs.map((blog) => ({
          ...blog,
          tags: blog.tags ? JSON.parse(blog.tags) : [],
        }));

        return {
          success: true,
          data: parsedBlogs,
          message: "Published blogs retrieved successfully",
        };
      } else {
        return {
          success: true,
          data: [],
          message: "No published blogs found",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get blog by ID
  getBlogById: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: "Blog ID is required",
        };
      }

      const blog = await blogRepository.findById(id);

      if (blog) {
        return {
          success: true,
          data: {
            ...blog,
            tags: blog.tags ? JSON.parse(blog.tags) : [],
          },
          message: "Blog retrieved successfully",
        };
      } else {
        return {
          success: false,
          data: null,
          message: "Blog not found",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get blogs by category
  getBlogsByCategory: async (category) => {
    try {
      if (!category) {
        return {
          success: false,
          data: null,
          message: "Category is required",
        };
      }

      const blogs = await blogRepository.findByCategory(category);

      if (blogs && blogs.length > 0) {
        const parsedBlogs = blogs.map((blog) => ({
          ...blog,
          tags: blog.tags ? JSON.parse(blog.tags) : [],
        }));

        return {
          success: true,
          data: parsedBlogs,
          message: "Blogs retrieved successfully",
        };
      } else {
        return {
          success: true,
          data: [],
          message: "No blogs found in this category",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get featured blogs
  getFeaturedBlogs: async (limit = 6) => {
    try {
      const blogs = await blogRepository.findFeatured(limit);

      if (blogs && blogs.length > 0) {
        const parsedBlogs = blogs.map((blog) => ({
          ...blog,
          tags: blog.tags ? JSON.parse(blog.tags) : [],
        }));

        return {
          success: true,
          data: parsedBlogs,
          message: "Featured blogs retrieved successfully",
        };
      } else {
        return {
          success: true,
          data: [],
          message: "No featured blogs found",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Create new blog
  createBlog: async (blogData) => {
    try {
      const { title, slug, content, excerpt, author, category, status } =
        blogData;

      // Validation
      if (!title || !title.trim()) {
        return {
          success: false,
          data: null,
          message: "Title is required",
        };
      }

      if (!slug || !slug.trim()) {
        return {
          success: false,
          data: null,
          message: "Slug is required",
        };
      }

      if (!content || !content.trim()) {
        return {
          success: false,
          data: null,
          message: "Content is required",
        };
      }

      if (!author || !author.trim()) {
        return {
          success: false,
          data: null,
          message: "Author is required",
        };
      }

      if (!category) {
        return {
          success: false,
          data: null,
          message: "Category is required",
        };
      }

      const newBlog = await blogRepository.create(blogData);

      return {
        success: true,
        message: "Blog created successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Update blog
  updateBlog: async (id, blogData) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: "Blog ID is required",
        };
      }

      // Check if blog exists
      const existingBlog = await blogRepository.findById(id);
      if (!existingBlog) {
        return {
          success: false,
          data: null,
          message: "Blog not found",
        };
      }

      const updated = await blogRepository.update(id, blogData);

      if (updated) {
        const updatedBlog = await blogRepository.findById(id);
        return {
          success: true,
          message: "Blog updated successfully",
        };
      } else {
        return {
          success: false,
          data: null,
          message: "Failed to update blog",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Delete blog
  deleteBlog: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: "Blog ID is required",
        };
      }

      const deleted = await blogRepository.delete(id);

      if (deleted) {
        return {
          success: true,
          data: null,
          message: "Blog deleted successfully",
        };
      } else {
        return {
          success: false,
          data: null,
          message: "Blog not found",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Search blogs
  searchBlogs: async (searchTerm) => {
    try {
      if (!searchTerm || searchTerm.trim() === "") {
        return {
          success: false,
          data: null,
          message: "Search term is required",
        };
      }

      const blogs = await blogRepository.search(searchTerm);

      if (blogs && blogs.length > 0) {
        const parsedBlogs = blogs.map((blog) => ({
          ...blog,
          tags: blog.tags ? JSON.parse(blog.tags) : [],
        }));

        return {
          success: true,
          data: parsedBlogs,
          message: "Search results retrieved successfully",
        };
      } else {
        return {
          success: true,
          data: [],
          message: "No blogs found matching the search term",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get blogs by status
  getBlogsByStatus: async (status) => {
    try {
      if (!status) {
        return {
          success: false,
          data: null,
          message: "Status is required",
        };
      }

      const blogs = await blogRepository.findByStatus(status);

      if (blogs && blogs.length > 0) {
        const parsedBlogs = blogs.map((blog) => ({
          ...blog,
          tags: blog.tags ? JSON.parse(blog.tags) : [],
        }));

        return {
          success: true,
          data: parsedBlogs,
          message: `${status} blogs retrieved successfully`,
        };
      } else {
        return {
          success: true,
          data: [],
          message: `No ${status} blogs found`,
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },
};

export default blogService;
