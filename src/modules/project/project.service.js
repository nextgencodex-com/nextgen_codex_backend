import projectRepository from "./project.repository.js";

const projectService = {
  // Get all projects
  getAllProjects: async () => {
    try {
      const projects = await projectRepository.findAll();

      // Parse JSON fields
      const parsedProjects = projects.map((project) => ({
        ...project,
        tags:
          typeof project.tags === "string"
            ? JSON.parse(project.tags)
            : project.tags,
        category:
          typeof project.category === "string"
            ? JSON.parse(project.category)
            : project.category,
        featured: Boolean(project.featured),
      }));

      return {
        success: true,
        data: parsedProjects,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      const project = await projectRepository.findById(id);

      if (!project) {
        return {
          success: false,
          message: "Project not found",
        };
      }

      // Parse JSON fields
      const parsedProject = {
        ...project,
        tags:
          typeof project.tags === "string"
            ? JSON.parse(project.tags)
            : project.tags,
        category:
          typeof project.category === "string"
            ? JSON.parse(project.category)
            : project.category,
        featured: Boolean(project.featured),
      };

      return {
        success: true,
        data: parsedProject,
      };
    } catch (error) {
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      // Validate required fields
      if (!projectData.title || !projectData.description) {
        return {
          success: false,
          message: "Title and description are required",
        };
      }

      // Image is now required (must be uploaded)
      if (!projectData.image) {
        return {
          success: false,
          message: "Project image is required. Please upload an image file.",
        };
      }

      if (
        !Array.isArray(projectData.category) ||
        projectData.category.length === 0
      ) {
        return {
          success: false,
          message: "At least one category is required",
        };
      }

      const newProject = await projectRepository.create(projectData);

      // Parse JSON fields
      const parsedProject = {
        ...newProject,
        tags: Array.isArray(newProject.tags) ? newProject.tags : [],
        category: Array.isArray(newProject.category) ? newProject.category : [],
        featured: Boolean(newProject.featured),
      };

      return {
        success: true,

      };
    } catch (error) {
      throw error;
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      // Check if project exists
      const existingProject = await projectRepository.findById(id);

      if (!existingProject) {
        return {
          success: false,
          message: "Project not found",
        };
      }

      // Validate required fields
      if (!projectData.title || !projectData.description) {
        return {
          success: false,
          message: "Title and description are required",
        };
      }


      if (
        !Array.isArray(projectData.category) ||
        projectData.category.length === 0
      ) {
        return {
          success: false,
          message: "At least one category is required",
        };
      }

      const updatedProject = await projectRepository.update(id, projectData);

      return {
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      // Check if project exists
      const existingProject = await projectRepository.findById(id);

      if (!existingProject) {
        return {
          success: false,
          message: "Project not found",
        };
      }

      const deleted = await projectRepository.delete(id);

      if (deleted) {
        return {
          success: true,
          message: "Project deleted successfully",
        };
      } else {
        return {
          success: false,
          message: "Failed to delete project",
        };
      }
    } catch (error) {
      throw error;
    }
  },

  // Get featured projects
  getFeaturedProjects: async () => {
    try {
      const projects = await projectRepository.findFeatured();

      // Parse JSON fields
      const parsedProjects = projects.map((project) => ({
        ...project,
        tags:
          typeof project.tags === "string"
            ? JSON.parse(project.tags)
            : project.tags,
        category:
          typeof project.category === "string"
            ? JSON.parse(project.category)
            : project.category,
        featured: Boolean(project.featured),
      }));

      return {
        success: true,
        data: parsedProjects,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get projects by status
  getProjectsByStatus: async (status) => {
    try {
      if (!["completed", "ongoing"].includes(status)) {
        return {
          success: false,
          message: "Invalid status. Must be 'completed' or 'ongoing'",
        };
      }

      const projects = await projectRepository.findByStatus(status);

      // Parse JSON fields
      const parsedProjects = projects.map((project) => ({
        ...project,
        tags:
          typeof project.tags === "string"
            ? JSON.parse(project.tags)
            : project.tags,
        category:
          typeof project.category === "string"
            ? JSON.parse(project.category)
            : project.category,
        featured: Boolean(project.featured),
      }));

      return {
        success: true,
        data: parsedProjects,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get projects by category
  getProjectsByCategory: async (category) => {
    try {
      const projects = await projectRepository.findByCategory(category);

      // Parse JSON fields
      const parsedProjects = projects.map((project) => ({
        ...project,
        tags:
          typeof project.tags === "string"
            ? JSON.parse(project.tags)
            : project.tags,
        category:
          typeof project.category === "string"
            ? JSON.parse(project.category)
            : project.category,
        featured: Boolean(project.featured),
      }));

      return {
        success: true,
        data: parsedProjects,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default projectService;
