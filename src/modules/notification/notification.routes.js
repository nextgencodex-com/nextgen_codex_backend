import express from "express";
import notificationController from "./notification.controller.js";
import asyncHandler from "../../middlewares/async.middleware.js";
import verifyToken from "../../middlewares/jwt.middleware.js";

const router = express.Router();

// All notification routes require authentication
router.use(verifyToken);

// Get all notifications
router.get("/", asyncHandler(notificationController.getAllNotifications));

// Get unread notifications
router.get("/unread", asyncHandler(notificationController.getUnreadNotifications));

// Get dashboard summary (birthdays, contracts ending, etc.)
router.get("/dashboard", asyncHandler(notificationController.getDashboardSummary));

// Mark notification as read
router.patch("/:id/read", asyncHandler(notificationController.markAsRead));

// Mark all notifications as read
router.patch("/read-all", asyncHandler(notificationController.markAllAsRead));

// Delete notification
router.delete("/:id", asyncHandler(notificationController.deleteNotification));

// Trigger birthday notifications check (can be called by cron job)
router.post("/check-birthdays", asyncHandler(notificationController.checkBirthdayNotifications));

// Trigger contract ending notifications check (can be called by cron job)
router.post("/check-contracts", asyncHandler(notificationController.checkContractEndingNotifications));

export default router;
