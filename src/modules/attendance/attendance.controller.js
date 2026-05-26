import attendanceService from "./attendance.service.js";
import apiResponse from "../../utils/apiResponse.js";

const attendanceController = {
  // Get all attendance records
  getAllAttendance: async (req, res) => {
    try {
      const result = await attendanceService.getAllAttendance();

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

  // Get attendance by date
  getAttendanceByDate: async (req, res) => {
    try {
      const { date } = req.params;

      const result = await attendanceService.getAttendanceByDate(date);

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

  // Get attendance by employee
  getAttendanceByEmployee: async (req, res) => {
    try {
      const { employeeId } = req.params;

      const result = await attendanceService.getAttendanceByEmployee(employeeId);

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

  // Mark attendance
  markAttendance: async (req, res) => {
    try {
      const attendanceData = req.body;

      const result = await attendanceService.markAttendance(attendanceData);

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

  // Update attendance
  updateAttendance: async (req, res) => {
    try {
      const { id } = req.params;
      const attendanceData = req.body;

      const result = await attendanceService.updateAttendance(id, attendanceData);

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

  // Get attendance by date range
  getAttendanceByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const { employeeId } = req.query;

      if (!startDate || !endDate) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Start date and end date are required"));
      }

      const result = await attendanceService.getAttendanceByDateRange(
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

  // Delete attendance
  deleteAttendance: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await attendanceService.deleteAttendance(id);

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
};

export default attendanceController;
