import reportService from "./report.service.js";
import employeeRepository from "../employee/employee.repository.js";
import attendanceRepository from "../attendance/attendance.repository.js";
import leaveRepository from "../leave/leave.repository.js";
import ApiResponse from "../../utils/apiResponse.js";

class ReportController {
  /**
   * Generate monthly report for an employee
   * GET /api/reports/employee/:employeeId/monthly?year=2024&month=3
   */
  async generateMonthlyReport(req, res, next) {
    try {
      const { employeeId } = req.params;
      const { year, month } = req.query;

      // Validate parameters
      if (!year || !month) {
        return res
          .status(400)
          .json(
            ApiResponse.error(
              "Year and month are required query parameters"
            )
          );
      }

      const yearNum = parseInt(year);
      const monthNum = parseInt(month);

      if (
        isNaN(yearNum) ||
        isNaN(monthNum) ||
        monthNum < 1 ||
        monthNum > 12
      ) {
        return res
          .status(400)
          .json(ApiResponse.error("Invalid year or month"));
      }

      // Get employee data
      const employee = await employeeRepository.findById(employeeId);
      if (!employee) {
        return res
          .status(404)
          .json(ApiResponse.error("Employee not found"));
      }

      // Get attendance records for the month
      const startDate = new Date(yearNum, monthNum - 1, 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(yearNum, monthNum, 0)
        .toISOString()
        .split("T")[0];

      const attendanceRecords =
        await attendanceRepository.findByEmployeeAndDateRange(
          employeeId,
          startDate,
          endDate
        );

      // Get leave records for the month
      const leaveRecords = await leaveRepository.findByEmployeeAndDateRange(
        employeeId,
        startDate,
        endDate
      );

      // Generate PDF
      const pdfBuffer = await reportService.generateMonthlyReport(
        employee,
        attendanceRecords,
        leaveRecords,
        yearNum,
        monthNum
      );

      // Set headers for PDF download
      const fileName = `${employee.first_name}_${employee.last_name}_${yearNum}_${monthNum}.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );
      res.setHeader("Content-Length", pdfBuffer.length);

      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Generate attendance summary report for all employees
   * GET /api/reports/attendance/monthly?year=2024&month=3
   */
  async generateAttendanceSummary(req, res, next) {
    try {
      const { year, month } = req.query;

      if (!year || !month) {
        return res
          .status(400)
          .json(
            ApiResponse.error(
              "Year and month are required query parameters"
            )
          );
      }

      const yearNum = parseInt(year);
      const monthNum = parseInt(month);

      if (
        isNaN(yearNum) ||
        isNaN(monthNum) ||
        monthNum < 1 ||
        monthNum > 12
      ) {
        return res
          .status(400)
          .json(ApiResponse.error("Invalid year or month"));
      }

      const startDate = new Date(yearNum, monthNum - 1, 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(yearNum, monthNum, 0)
        .toISOString()
        .split("T")[0];

      const attendanceRecords = await attendanceRepository.findByDateRange(
        startDate,
        endDate
      );

      // Group by employee
      const employeeAttendance = {};
      attendanceRecords.forEach((record) => {
        if (!employeeAttendance[record.employee_id]) {
          employeeAttendance[record.employee_id] = {
            employee: record.employee,
            records: [],
          };
        }
        employeeAttendance[record.employee_id].records.push(record);
      });

      res.json(
        ApiResponse.success(
          {
            year: yearNum,
            month: monthNum,
            summary: employeeAttendance,
          },
          "Attendance summary retrieved successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new ReportController();
