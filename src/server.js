import "dotenv/config.js";
import app from "./app.js";
import {
  initializeAdminTable,
  initializeProjectsTable,
  initializeBlogTable,
  initializeClientsTable,
  initializeClientProjectsTable,
  initializeClientPaymentsTable,
  initializeClientDocumentsTable,
  seedAdminUser,
} from "./config/database.migration.js";
import authService from "./modules/auth/auth.service.js";

const PORT = process.env.PORT || 5000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Initialize database on startup
const initializeApp = async () => {
  try {
    // Create admin table
    await initializeAdminTable();

    // Create projects table
    await initializeProjectsTable();

    // create blogs table
    await initializeBlogTable();

    // create client management tables
    await initializeClientsTable();
    await initializeClientProjectsTable();
    await initializeClientPaymentsTable();
    await initializeClientDocumentsTable();

    // Create initial admin user with hashed password (only if password is set in .env)
    if (ADMIN_PASSWORD) {
      const hashedPassword = await authService.hashPassword(ADMIN_PASSWORD);
      await seedAdminUser(ADMIN_USERNAME, hashedPassword);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize app:", error);
    process.exit(1);
  }
};

initializeApp();
