import { Router } from "express";
import userRoutes from "../modules/user/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import projectRoutes from "../modules/project/project.routes.js";
import blogRoutes from "../modules/blog/blog.routes.js";
import clientRoutes from "../modules/client/client.routes.js";
import clientProjectRoutes from "../modules/clientProject/clientProject.routes.js";
import clientPaymentRoutes from "../modules/clientPayment/clientPayment.routes.js";
import clientDocumentRoutes from "../modules/clientDocument/clientDocument.routes.js";

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

export default routes;
