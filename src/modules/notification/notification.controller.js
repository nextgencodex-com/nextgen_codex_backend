import notificationService from "./notification.service.js";
import ApiResponse from "../../utils/apiResponse.js";

const notificationController = {
  // Get all notifications
  getAllNotifications: async (req, res) => {
    try {
      const result = await notificationService.getAllNotifications();

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message);
      }

      return ApiResponse.error(res, result.message, 400);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },

  // Get unread notifications
  getUnreadNotifications: async (req, res) => {
    try {
      const result = await notificationService.getUnreadNotifications();

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message, {
          count: result.count,
        });
      }

      return ApiResponse.error(res, result.message, 400);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },

  // Mark notification as read
  markAsRead: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await notificationService.markAsRead(id);

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message);
      }

      return ApiResponse.error(res, result.message, 404);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },

  // Mark all as read
  markAllAsRead: async (req, res) => {
    try {
      const result = await notificationService.markAllAsRead();

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message);
      }

      return ApiResponse.error(res, result.message, 400);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },

  // Delete notification
  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await notificationService.deleteNotification(id);

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message);
      }

      return ApiResponse.error(res, result.message, 404);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },

  // Check birthday notifications
  checkBirthdayNotifications: async (req, res) => {
    try {
      const result = await notificationService.checkBirthdayNotifications();

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message);
      }

      return ApiResponse.error(res, result.message, 400);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },

  // Check contract ending notifications
  checkContractEndingNotifications: async (req, res) => {
    try {
      const result = await notificationService.checkContractEndingNotifications();

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message);
      }

      return ApiResponse.error(res, result.message, 400);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },

  // Get dashboard summary
  getDashboardSummary: async (req, res) => {
    try {
      const result = await notificationService.getDashboardSummary();

      if (result.success) {
        return ApiResponse.success(res, result.data, result.message);
      }

      return ApiResponse.error(res, result.message, 400);
    } catch (error) {
      return ApiResponse.error(res, error.message, 500);
    }
  },
};

export default notificationController;
