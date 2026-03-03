import clientProjectService from "./clientProject.service.js";
import apiResponse from "../../utils/apiResponse.js";

const clientProjectController = {
  getAllProjects: async (req, res) => {
    try {
      const { status, clientId, approvalStatus } = req.query;
      const result = await clientProjectService.getAllProjects({
        status,
        clientId,
        approvalStatus,
      });
      return res
        .status(200)
        .json(apiResponse(200, result.data, "Client projects retrieved"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      const result = await clientProjectService.getProjectById(id);
      if (!result.success) {
        return res.status(404).json(apiResponse(404, null, result.message));
      }

      return res
        .status(200)
        .json(apiResponse(200, result.data, "Project retrieved successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  createProject: async (req, res) => {
    try {
      const projectData = req.body;
      const result = await clientProjectService.createProject(projectData);

      if (!result.success) {
        return res.status(400).json(apiResponse(400, null, result.message));
      }

      return res
        .status(201)
        .json(apiResponse(201, result.data, "Project created successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const projectData = req.body;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      const result = await clientProjectService.updateProject(id, projectData);
      if (!result.success) {
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

      return res
        .status(200)
        .json(apiResponse(200, result.data, "Project updated successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      const result = await clientProjectService.deleteProject(id);
      if (!result.success) {
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

      return res.status(200).json(apiResponse(200, null, result.message));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  approveProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { approvedBy } = req.body;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      const result = await clientProjectService.approveProject({
        id,
        approvedBy,
      });

      if (!result.success) {
        return res.status(404).json(apiResponse(404, null, result.message));
      }

      return res.status(200).json(apiResponse(200, null, result.message));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  rejectProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { approvedBy, rejectionReason } = req.body;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Project ID is required"));
      }

      const result = await clientProjectService.rejectProject({
        id,
        approvedBy,
        rejectionReason,
      });

      if (!result.success) {
        return res.status(400).json(apiResponse(400, null, result.message));
      }

      return res.status(200).json(apiResponse(200, null, result.message));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default clientProjectController;
