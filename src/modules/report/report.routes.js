import { Router } from "express";
import reportController from "./report.controller.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// All report routes require authentication
router.use(verifyToken);

// Generate monthly report for an employee
router.get(
  "/employee/:employeeId/monthly",
  reportController.generateMonthlyReport
);

// Generate attendance summary for all employees
router.get(
  "/attendance/monthly",
  reportController.generateAttendanceSummary
);

export default router;
