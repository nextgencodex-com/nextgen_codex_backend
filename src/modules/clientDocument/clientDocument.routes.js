import { Router } from "express";
import clientDocumentController from "./clientDocument.controller.js";
import { uploadClientDocuments } from "../../config/multer.config.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// Public routes
router.get("/client/:clientId", clientDocumentController.getDocumentsByClient);
router.get("/:id", clientDocumentController.getDocumentById);

// Protected routes
router.post(
  "/client/:clientId",
  verifyToken,
  uploadClientDocuments.single("file"),
  clientDocumentController.uploadDocument
);
router.delete("/:id", verifyToken, clientDocumentController.deleteDocument);

export default router;
