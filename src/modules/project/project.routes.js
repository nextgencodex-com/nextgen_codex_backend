import { Router } from "express";
import projectController from "./project.controller.js";
import upload from "../../config/multer.config.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// PUBLIC ROUTES (No authentication required)
// Get all projects
router.get("/", projectController.getAllProjects);

// Get featured projects
router.get("/featured", projectController.getFeaturedProjects);

// Get projects by status
router.get("/status/:status", projectController.getProjectsByStatus);

// Get projects by category
router.get("/category/:category", projectController.getProjectsByCategory);

// Get project by ID
router.get("/:id", projectController.getProjectById);

// PROTECTED ROUTES (Requires JWT token)
// Create new project with image upload
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  projectController.createProject
);

// Update project with optional image upload
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  projectController.updateProject
);

// Delete project
router.delete("/:id", verifyToken, projectController.deleteProject);

export default router;
