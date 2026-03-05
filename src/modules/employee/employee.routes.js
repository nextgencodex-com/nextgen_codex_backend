import express from "express";
import employeeController from "./employee.controller.js";
import { uploadEmployee } from "../../config/multer.config.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get active employees only
router.get("/active", employeeController.getActiveEmployees);

// Get employees by department
router.get("/department/:department", employeeController.getEmployeesByDepartment);

// Get employee by ID
router.get("/:id", employeeController.getEmployeeById);

// Create employee with photo upload
router.post("/", uploadEmployee.single("photo"), employeeController.createEmployee);

// Update employee with photo upload
router.put("/:id", uploadEmployee.single("photo"), employeeController.updateEmployee);

// Delete employee
router.delete("/:id", employeeController.deleteEmployee);

export default router;
