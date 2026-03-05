import { Router } from "express";
import userRoutes from "../modules/user/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import projectRoutes from "../modules/project/project.routes.js";
import blogRoutes from "../modules/blog/blog.routes.js";
import clientRoutes from "../modules/client/client.routes.js";
import clientProjectRoutes from "../modules/clientProject/clientProject.routes.js";
import clientPaymentRoutes from "../modules/clientPayment/clientPayment.routes.js";
import clientDocumentRoutes from "../modules/clientDocument/clientDocument.routes.js";
import employeeRoutes from "../modules/employee/employee.routes.js";
import attendanceRoutes from "../modules/attendance/attendance.routes.js";
import leaveRoutes from "../modules/leave/leave.routes.js";
import reportRoutes from "../modules/report/report.routes.js";
import notificationRoutes from "../modules/notification/notification.routes.js";

const routes = Router();

// Auth routes
routes.use("/auth", authRoutes);

// User routes
routes.use("/users", userRoutes);

// Project routes
routes.use("/projects", projectRoutes);

// Blog routes
routes.use("/blogs", blogRoutes);

// Client management routes
routes.use("/clients", clientRoutes);
routes.use("/client-projects", clientProjectRoutes);
routes.use("/payments", clientPaymentRoutes);
routes.use("/client-documents", clientDocumentRoutes);

// Employee Management System routes
routes.use("/employees", employeeRoutes);
routes.use("/attendance", attendanceRoutes);
routes.use("/leaves", leaveRoutes);

// Notification routes
routes.use("/notifications", notificationRoutes);

// Report generation routes
routes.use("/reports", reportRoutes);

export default routes;
