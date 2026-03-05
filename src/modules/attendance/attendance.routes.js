import express from "express";
import attendanceController from "./attendance.controller.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all attendance records
router.get("/", attendanceController.getAllAttendance);

// Get attendance by date range (query params: startDate, endDate, employeeId optional)
router.get("/range", attendanceController.getAttendanceByDateRange);

// Get attendance by specific date
router.get("/date/:date", attendanceController.getAttendanceByDate);

// Get attendance by employee
router.get("/employee/:employeeId", attendanceController.getAttendanceByEmployee);

// Mark attendance
router.post("/", attendanceController.markAttendance);

// Update attendance
router.put("/:id", attendanceController.updateAttendance);

// Delete attendance
router.delete("/:id", attendanceController.deleteAttendance);

export default router;
