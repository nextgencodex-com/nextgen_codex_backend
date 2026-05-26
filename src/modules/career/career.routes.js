import { Router } from "express";
import careerController from "./career.controller.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// PUBLIC ROUTES (No authentication required)
// Get all careers
router.get("/", careerController.getAllCareers);

// Get active careers
router.get("/active", careerController.getActiveCareers);

// Get careers by department
router.get("/department/:department", careerController.getCareersByDepartment);

// Get career by ID
router.get("/:id", careerController.getCareerById);

// PROTECTED ROUTES (Requires JWT token)
// Create new career posting
router.post("/", verifyToken, careerController.createCareer);

// Update career posting
router.put("/:id", verifyToken, careerController.updateCareer);

// Delete career posting
router.delete("/:id", verifyToken, careerController.deleteCareer);

export default router;
