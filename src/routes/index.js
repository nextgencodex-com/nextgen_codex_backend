import { Router } from "express";
import userRoutes from "../modules/user/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import projectRoutes from "../modules/project/project.routes.js";

const routes = Router();

// Auth routes
routes.use("/auth", authRoutes);

// User routes
routes.use("/users", userRoutes);

// Project routes
routes.use("/projects", projectRoutes);

export default routes;
