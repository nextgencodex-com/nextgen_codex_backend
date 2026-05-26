import attendanceRepository from "./attendance.repository.js";
import employeeRepository from "../employee/employee.repository.js";

const attendanceService = {
  // Get all attendance records
  getAllAttendance: async () => {
    try {
      const attendance = await attendanceRepository.findAll();

      return {
        success: true,
        data: attendance,
        message: "Attendance records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get attendance by date
  getAttendanceByDate: async (date) => {
    try {
      const attendance = await attendanceRepository.findByDate(date);

      return {
        success: true,
        data: attendance,
        message: "Attendance records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get attendance by employee
  getAttendanceByEmployee: async (employeeId) => {
    try {
      const employee = await employeeRepository.findById(employeeId);

      if (!employee) {
        return {
          success: false,
          data: null,
          message: "Employee not found",
        };
      }

      const attendance = await attendanceRepository.findByEmployeeId(employeeId);

      return {
        success: true,
        data: attendance,
        message: "Attendance records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Mark attendance
  markAttendance: async (attendanceData) => {
    try {
      const { employeeId, date } = attendanceData;

      // Check if employee exists
      const employee = await employeeRepository.findById(employeeId);
      if (!employee) {
        return {
          success: false,
          data: null,
          message: "Employee not found",
        };
      }

      // Check if attendance already marked for this date
      const existing = await attendanceRepository.findByEmployeeAndDate(
        employeeId,
        date
      );

      if (existing) {
        return {
          success: false,
          data: null,
          message: "Attendance already marked for this date",
        };
      }

      const attendance = await attendanceRepository.create(attendanceData);

      return {
        success: true,
        data: attendance,
        message: "Attendance marked successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Update attendance
  updateAttendance: async (id, attendanceData) => {
    try {
      const existing = await attendanceRepository.findById(id);

      if (!existing) {
        return {
          success: false,
          data: null,
          message: "Attendance record not found",
        };
      }

      const attendance = await attendanceRepository.update(id, attendanceData);

      return {
        success: true,
        data: attendance,
        message: "Attendance updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get attendance for date range
  getAttendanceByDateRange: async (startDate, endDate, employeeId = null) => {
    try {
      const attendance = await attendanceRepository.findByDateRange(
        startDate,
        endDate,
        employeeId
      );

      return {
        success: true,
        data: attendance,
        message: "Attendance records retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Delete attendance
  deleteAttendance: async (id) => {
    try {
      const existing = await attendanceRepository.findById(id);

      if (!existing) {
        return {
          success: false,
          data: null,
          message: "Attendance record not found",
        };
      }

      const deleted = await attendanceRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          data: null,
          message: "Failed to delete attendance record",
        };
      }

      return {
        success: true,
        data: null,
        message: "Attendance record deleted successfully",
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

export default attendanceService;
