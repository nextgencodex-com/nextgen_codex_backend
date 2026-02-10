import { Router } from "express";
import clientPaymentController from "./clientPayment.controller.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// Public routes
router.get(
  "/export/csv",
  verifyToken,
  clientPaymentController.exportPaymentsCsv
);
router.get(
  "/:id/invoice/pdf",
  verifyToken,
  clientPaymentController.downloadInvoicePdf
);
router.get("/type/:type", clientPaymentController.getPaymentsByType);
router.get("/", clientPaymentController.getAllPayments);
router.get("/:id", clientPaymentController.getPaymentById);

// Protected routes
router.post("/", verifyToken, clientPaymentController.createPayment);
router.put("/:id", verifyToken, clientPaymentController.updatePayment);
router.patch("/:id/mark-paid", verifyToken, clientPaymentController.markPaid);
router.delete("/:id", verifyToken, clientPaymentController.deletePayment);

export default router;
