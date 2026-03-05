import express from "express";
import leaveController from "./leave.controller.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all leave records
router.get("/", leaveController.getAllLeaves);

// Get leaves by date range (query params: startDate, endDate, employeeId optional)
router.get("/range", leaveController.getLeavesByDateRange);

// Get leaves by status
router.get("/status/:status", leaveController.getLeavesByStatus);

// Get leaves by employee
router.get("/employee/:employeeId", leaveController.getLeavesByEmployee);

// Get leave by ID
router.get("/:id", leaveController.getLeaveById);

// Create leave request
router.post("/", leaveController.createLeave);

// Update leave record
router.put("/:id", leaveController.updateLeave);

// Delete leave record
router.delete("/:id", leaveController.deleteLeave);

export default router;
