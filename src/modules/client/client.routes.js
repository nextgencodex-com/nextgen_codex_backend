import { Router } from "express";
import clientController from "./client.controller.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// Public routes
router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);

// Protected routes
router.post("/", verifyToken, clientController.createClient);
router.put("/:id", verifyToken, clientController.updateClient);
router.delete("/:id", verifyToken, clientController.deleteClient);

export default router;
