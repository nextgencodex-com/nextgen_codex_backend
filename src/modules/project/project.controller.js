import projectService from "./project.service.js";
import apiResponse from "../../utils/apiResponse.js";
import fs from "fs";

const projectController = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const result = await projectService.getAllProjects();

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(200, result.data, "Projects retrieved successfully")
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get project by ID
  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      const result = await projectService.getProjectById(id);

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(200, result.data, "Project retrieved successfully")
          );
      } else {
        return res.status(404).json(apiResponse(404, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Create new project
  createProject: async (req, res) => {
    try {
      const projectData = req.body;

      if (!projectData) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project data is required"));
      }

      // Handle file upload
      if (req.file) {
        projectData.image = `/uploads/projects/${req.file.filename}`;
      }

      const result = await projectService.createProject(projectData);

      if (result.success) {
        return res
          .status(201)
          .json(apiResponse(201, result.data, "Project created successfully"));
      } else {
        // Delete uploaded file if project creation fails
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

  // Update project
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const projectData = req.body;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      if (!projectData) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project data is required"));
      }

      // If new file is uploaded, handle it
      if (req.file) {
        projectData.image = `/uploads/projects/${req.file.filename}`;

        // Get old project to delete old image
        const existingProject = await projectService.getProjectById(id);
        if (existingProject.success && existingProject.data.image) {
          const oldImagePath = `./public${existingProject.data.image}`;
          fs.unlink(oldImagePath, (err) => {
            if (err) console.log("Error deleting old image:", err);
          });
        }
      }

      const result = await projectService.updateProject(id, projectData);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, "Project updated successfully"));
      } else {
        // Delete uploaded file if update fails
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.log("Error deleting file:", err);
          });
        }
        return res
          .status(result.message === "Project not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Project not found" ? 404 : 400,
              null,
              result.message
            )
          );
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

  // Delete project
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      // Get project to get image path before deletion
      const projectResult = await projectService.getProjectById(id);

      const result = await projectService.deleteProject(id);

      if (result.success) {
        // Delete image file if it exists
        if (projectResult.success && projectResult.data.image) {
          const imagePath = `./public${projectResult.data.image}`;
          fs.unlink(imagePath, (err) => {
            if (err) console.log("Error deleting image:", err);
          });
        }
        return res.status(200).json(apiResponse(200, null, result.message));
      } else {
        return res
          .status(result.message === "Project not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Project not found" ? 404 : 400,
              null,
              result.message
            )
          );
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get featured projects
  getFeaturedProjects: async (req, res) => {
    try {
      const result = await projectService.getFeaturedProjects();

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(
              200,
              result.data,
              "Featured projects retrieved successfully"
            )
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get projects by status
  getProjectsByStatus: async (req, res) => {
    try {
      const { status } = req.params;

      if (!status) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Status is required"));
      }

      const result = await projectService.getProjectsByStatus(status);

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(
              200,
              result.data,
              `Projects with status '${status}' retrieved successfully`
            )
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get projects by category
  getProjectsByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      if (!category) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Category is required"));
      }

      const result = await projectService.getProjectsByCategory(category);

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(
              200,
              result.data,
              `Projects in category '${category}' retrieved successfully`
            )
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default projectController;
