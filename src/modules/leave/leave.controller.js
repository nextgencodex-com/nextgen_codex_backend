import leaveService from "./leave.service.js";
import apiResponse from "../../utils/apiResponse.js";

const leaveController = {
  // Get all leave records
  getAllLeaves: async (req, res) => {
    try {
      const result = await leaveService.getAllLeaves();

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

  // Get leave by ID
  getLeaveById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await leaveService.getLeaveById(id);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(404).json(apiResponse(404, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get leaves by employee
  getLeavesByEmployee: async (req, res) => {
    try {
      const { employeeId } = req.params;

      const result = await leaveService.getLeavesByEmployee(employeeId);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(404).json(apiResponse(404, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get leaves by status
  getLeavesByStatus: async (req, res) => {
    try {
      const { status } = req.params;

      const result = await leaveService.getLeavesByStatus(status);

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

  // Create leave request
  createLeave: async (req, res) => {
    try {
      const leaveData = req.body;

      const result = await leaveService.createLeave(leaveData);

      if (result.success) {
        return res
          .status(201)
          .json(apiResponse(201, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Update leave record
  updateLeave: async (req, res) => {
    try {
      const { id } = req.params;
      const leaveData = req.body;

      const result = await leaveService.updateLeave(id, leaveData);

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

  // Delete leave record
  deleteLeave: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await leaveService.deleteLeave(id);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, null, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get leaves by date range
  getLeavesByDateRange: async (req, res) => {
    try {
      const { startDate, endDate, employeeId } = req.query;

      if (!startDate || !endDate) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Start date and end date are required"));
      }

      const result = await leaveService.getLeavesByDateRange(
        startDate,
        endDate,
        employeeId
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
};

export default leaveController;
