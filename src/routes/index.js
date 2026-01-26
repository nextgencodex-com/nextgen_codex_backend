import { Router } from "express";
import userRoutes from "../modules/user/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const routes = Router();

// Auth routes
routes.use("/auth", authRoutes);

// User routes
routes.use("/users", userRoutes);

export default routes;
