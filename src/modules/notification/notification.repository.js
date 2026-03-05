import db from "../../config/database.js";

const notificationRepository = {
  // Get all notifications
  findAll: async () => {
    try {
      const query = `
        SELECT n.*, 
               CONCAT(e.first_name, ' ', e.last_name) as employee_name,
               e.photo as employee_photo
        FROM notifications n
        LEFT JOIN employees e ON n.employee_id = e.id
        ORDER BY n.created_at DESC
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get unread notifications
  findUnread: async () => {
    try {
      const query = `
        SELECT n.*, 
               CONCAT(e.first_name, ' ', e.last_name) as employee_name,
               e.photo as employee_photo
        FROM notifications n
        LEFT JOIN employees e ON n.employee_id = e.id
        WHERE n.is_read = FALSE
        ORDER BY n.created_at DESC
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Create notification
  create: async (notificationData) => {
    try {
      const { type, employeeId, title, message } = notificationData;

      const query = `
        INSERT INTO notifications (type, employee_id, title, message, created_at)
        VALUES (?, ?, ?, ?, NOW())
      `;

      const [result] = await db.query(query, [
        type,
        employeeId || null,
        title,
        message,
      ]);

      return {
        id: result.insertId,
        ...notificationData,
      };
    } catch (error) {
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (id) => {
    try {
      const query = "UPDATE notifications SET is_read = TRUE WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      const query = "UPDATE notifications SET is_read = TRUE WHERE is_read = FALSE";
      const [result] = await db.query(query);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  // Delete notification
  delete: async (id) => {
    try {
      const query = "DELETE FROM notifications WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Get upcoming birthdays (next 7 days)
  getUpcomingBirthdays: async () => {
    try {
      const query = `
        SELECT id, first_name, last_name, email, birthday, photo
        FROM employees
        WHERE status = 'active'
          AND birthday IS NOT NULL
          AND (
            (MONTH(birthday) = MONTH(CURDATE()) AND DAY(birthday) >= DAY(CURDATE()))
            OR (MONTH(birthday) = MONTH(DATE_ADD(CURDATE(), INTERVAL 7 DAY)) 
                AND DAY(birthday) <= DAY(DATE_ADD(CURDATE(), INTERVAL 7 DAY)))
          )
        ORDER BY MONTH(birthday), DAY(birthday)
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get contracts ending soon (within 2 weeks)
  getContractsEndingSoon: async () => {
    try {
      const query = `
        SELECT id, first_name, last_name, email, end_date, photo, position
        FROM employees
        WHERE status = 'active'
          AND end_date IS NOT NULL
          AND end_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 14 DAY)
        ORDER BY end_date ASC
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get today's birthdays
  getTodayBirthdays: async () => {
    try {
      const query = `
        SELECT id, first_name, last_name, email, birthday, photo
        FROM employees
        WHERE status = 'active'
          AND birthday IS NOT NULL
          AND MONTH(birthday) = MONTH(CURDATE())
          AND DAY(birthday) = DAY(CURDATE())
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

export default notificationRepository;
