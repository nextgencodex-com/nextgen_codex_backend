import leaveRepository from "./leave.repository.js";
import employeeRepository from "../employee/employee.repository.js";

const leaveService = {
  // Get all leave records
  getAllLeaves: async () => {
    try {
      const leaves = await leaveRepository.findAll();

      return {
        success: true,
        data: leaves,
        message: "Leave records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get leave by ID
  getLeaveById: async (id) => {
    try {
      const leave = await leaveRepository.findById(id);

      if (!leave) {
        return {
          success: false,
          data: null,
          message: "Leave record not found",
        };
      }

      return {
        success: true,
        data: leave,
        message: "Leave record retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get leaves by employee
  getLeavesByEmployee: async (employeeId) => {
    try {
      const employee = await employeeRepository.findById(employeeId);

      if (!employee) {
        return {
          success: false,
          data: null,
          message: "Employee not found",
        };
      }

      const leaves = await leaveRepository.findByEmployeeId(employeeId);

      return {
        success: true,
        data: leaves,
        message: "Leave records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get leaves by status
  getLeavesByStatus: async (status) => {
    try {
      const leaves = await leaveRepository.findByStatus(status);

      return {
        success: true,
        data: leaves,
        message: "Leave records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Create leave request
  createLeave: async (leaveData) => {
    try {
      const { employeeId, startDate, endDate, leaveType } = leaveData;

      // Validate required fields
      if (!employeeId || !startDate || !endDate || !leaveType) {
        return {
          success: false,
          data: null,
          message: "Employee ID, start date, end date, and leave type are required",
        };
      }

      // Check if employee exists
      const employee = await employeeRepository.findById(employeeId);
      if (!employee) {
        return {
          success: false,
          data: null,
          message: "Employee not found",
        };
      }

      // Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        return {
          success: false,
          data: null,
          message: "Start date cannot be after end date",
        };
      }

      const leave = await leaveRepository.create(leaveData);

      return {
        success: true,
        data: leave,
        message: "Leave request created successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Update leave record
  updateLeave: async (id, leaveData) => {
    try {
      const existing = await leaveRepository.findById(id);

      if (!existing) {
        return {
          success: false,
          data: null,
          message: "Leave record not found",
        };
      }

      const leave = await leaveRepository.update(id, leaveData);

      return {
        success: true,
        data: leave,
        message: "Leave record updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Delete leave record
  deleteLeave: async (id) => {
    try {
      const existing = await leaveRepository.findById(id);

      if (!existing) {
        return {
          success: false,
          data: null,
          message: "Leave record not found",
        };
      }

      const deleted = await leaveRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          data: null,
          message: "Failed to delete leave record",
        };
      }

      return {
        success: true,
        data: null,
        message: "Leave record deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get leaves by date range
  getLeavesByDateRange: async (startDate, endDate, employeeId = null) => {
    try {
      const leaves = await leaveRepository.findByDateRange(
        startDate,
        endDate,
        employeeId
      );

      return {
        success: true,
        data: leaves,
        message: "Leave records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },
};

export default leaveService;
