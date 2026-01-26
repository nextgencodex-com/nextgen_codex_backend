import "dotenv/config.js";
import app from "./app.js";
import {
  initializeAdminTable,
  seedAdminUser,
} from "./config/database.migration.js";
import authService from "./modules/auth/auth.service.js";

const PORT = process.env.PORT || 5000;

// Initialize database on startup
const initializeApp = async () => {
  try {
    // Create admin table
    await initializeAdminTable();

    // Create initial admin user with hashed password
    const hashedPassword = await authService.hashPassword("admin123");
    await seedAdminUser("admin", hashedPassword);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize app:", error);
    process.exit(1);
  }
};

initializeApp();
