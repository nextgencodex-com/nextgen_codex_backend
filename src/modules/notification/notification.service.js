import notificationRepository from "./notification.repository.js";

const notificationService = {
  // Get all notifications
  getAllNotifications: async () => {
    try {
      const notifications = await notificationRepository.findAll();

      return {
        success: true,
        data: notifications,
        message: "Notifications retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get unread notifications
  getUnreadNotifications: async () => {
    try {
      const notifications = await notificationRepository.findUnread();

      return {
        success: true,
        data: notifications,
        count: notifications.length,
        message: "Unread notifications retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Create notification
  createNotification: async (notificationData) => {
    try {
      const notification = await notificationRepository.create(notificationData);

      return {
        success: true,
        data: notification,
        message: "Notification created successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Mark notification as read
  markAsRead: async (id) => {
    try {
      const result = await notificationRepository.markAsRead(id);

      if (!result) {
        return {
          success: false,
          data: null,
          message: "Notification not found",
        };
      }

      return {
        success: true,
        data: null,
        message: "Notification marked as read",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Mark all as read
  markAllAsRead: async () => {
    try {
      const count = await notificationRepository.markAllAsRead();

      return {
        success: true,
        data: { count },
        message: `${count} notification(s) marked as read`,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Delete notification
  deleteNotification: async (id) => {
    try {
      const result = await notificationRepository.delete(id);

      if (!result) {
        return {
          success: false,
          data: null,
          message: "Notification not found",
        };
      }

      return {
        success: true,
        data: null,
        message: "Notification deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Check and create birthday notifications
  checkBirthdayNotifications: async () => {
    try {
      const todayBirthdays = await notificationRepository.getTodayBirthdays();

      for (const employee of todayBirthdays) {
        await notificationRepository.create({
          type: "birthday",
          employeeId: employee.id,
          title: "Employee Birthday Today! 🎉",
          message: `Today is ${employee.first_name} ${employee.last_name}'s birthday! Don't forget to wish them well.`,
        });
      }

      return {
        success: true,
        data: { count: todayBirthdays.length },
        message: `Created ${todayBirthdays.length} birthday notification(s)`,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Check and create contract ending notifications
  checkContractEndingNotifications: async () => {
    try {
      const endingContracts = await notificationRepository.getContractsEndingSoon();

      for (const employee of endingContracts) {
        const daysUntilEnd = Math.ceil(
          (new Date(employee.end_date) - new Date()) / (1000 * 60 * 60 * 24)
        );

        await notificationRepository.create({
          type: "contract_ending",
          employeeId: employee.id,
          title: "Employee Contract Ending Soon ⚠️",
          message: `${employee.first_name} ${employee.last_name}'s contract (${employee.position}) ends in ${daysUntilEnd} days on ${new Date(employee.end_date).toLocaleDateString()}.`,
        });
      }

      return {
        success: true,
        data: { count: endingContracts.length },
        message: `Created ${endingContracts.length} contract ending notification(s)`,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get dashboard summary
  getDashboardSummary: async () => {
    try {
      const upcomingBirthdays = await notificationRepository.getUpcomingBirthdays();
      const contractsEnding = await notificationRepository.getContractsEndingSoon();
      const unreadNotifications = await notificationRepository.findUnread();

      return {
        success: true,
        data: {
          upcomingBirthdays,
          contractsEnding,
          unreadCount: unreadNotifications.length,
        },
        message: "Dashboard summary retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },
};

export default notificationService;
