import { Router } from "express";
// import blogController from "./blog.controller.js";
// import upload from "../../middlewares/upload.middleware.js";
// import verifyToken from "../../middlewares/jwt.middleware.js";

const router = Router();

// // Get all blogs
// router.get("/", blogController.getAllBlogs);

// // Get published blogs
// router.get("/published", blogController.getPublishedBlogs);

// // Get featured blogs
// router.get("/featured", blogController.getFeaturedBlogs);

// // Search blogs
// router.get("/search", blogController.searchBlogs);

// // Get blogs by status
// router.get("/status/:status", blogController.getBlogsByStatus);

// // Get blogs by category
// router.get("/category/:category", blogController.getBlogsByCategory);

// // Get blog by ID
// router.get("/:id", blogController.getBlogById);

// // Create new blog (with image upload)
// router.post("/", verifyToken, upload.single("coverImage"), blogController.createBlog);

// // Update blog (with image upload)
// router.put("/:id", verifyToken, upload.single("coverImage"), blogController.updateBlog);

// // Delete blog
// router.delete("/:id", verifyToken, blogController.deleteBlog);

export default router;
