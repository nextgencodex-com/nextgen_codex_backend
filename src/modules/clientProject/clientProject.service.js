import clientProjectRepository from "./clientProject.repository.js";

const clientProjectService = {
  getAllProjects: async (filters) => {
    try {
      const projects = await clientProjectRepository.findAll(filters);
      return { success: true, data: projects };
    } catch (error) {
      throw error;
    }
  },

  getProjectById: async (id) => {
    try {
      const project = await clientProjectRepository.findById(id);
      if (!project) {
        return { success: false, message: "Project not found" };
      }
      return { success: true, data: project };
    } catch (error) {
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      if (!projectData.clientId || !projectData.name) {
        return { success: false, message: "Client ID and name are required" };
      }

      const project = await clientProjectRepository.create(projectData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  updateProject: async (id, projectData) => {
    try {
      const existing = await clientProjectRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Project not found" };
      }

      if (!projectData.clientId || !projectData.name) {
        return { success: false, message: "Client ID and name are required" };
      }

      const updated = await clientProjectRepository.update(id, projectData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      const existing = await clientProjectRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Project not found" };
      }

      const deleted = await clientProjectRepository.delete(id);
      if (!deleted) {
        return { success: false, message: "Failed to delete project" };
      }

      return { success: true, message: "Project deleted successfully" };
    } catch (error) {
      throw error;
    }
  },

  approveProject: async ({ id, approvedBy }) => {
    try {
      const existing = await clientProjectRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Project not found" };
      }

      await clientProjectRepository.approve({ id, approvedBy });
      return { success: true, message: "Project approved successfully" };
    } catch (error) {
      throw error;
    }
  },

  rejectProject: async ({ id, approvedBy, rejectionReason }) => {
    try {
      const existing = await clientProjectRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Project not found" };
      }

      if (!rejectionReason || !rejectionReason.trim()) {
        return { success: false, message: "Rejection reason is required" };
      }

      await clientProjectRepository.reject({ id, approvedBy, rejectionReason });
      return { success: true, message: "Project rejected successfully" };
    } catch (error) {
      throw error;
    }
  },
};

export default clientProjectService;
