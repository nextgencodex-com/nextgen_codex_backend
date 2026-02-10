import { Router } from "express";
import clientProjectController from "./clientProject.controller.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// Public routes
router.get("/", clientProjectController.getAllProjects);
router.get("/pending", (req, res, next) => {
  req.query.status = "Pending";
  return clientProjectController.getAllProjects(req, res, next);
});
router.get("/:id", clientProjectController.getProjectById);

// Protected routes
router.post("/", verifyToken, clientProjectController.createProject);
router.put("/:id", verifyToken, clientProjectController.updateProject);
router.delete("/:id", verifyToken, clientProjectController.deleteProject);
router.patch(
  "/:id/approve",
  verifyToken,
  clientProjectController.approveProject
);
router.patch("/:id/reject", verifyToken, clientProjectController.rejectProject);

export default router;
