import bcrypt from "bcrypt";
import db from "./src/config/database.js";

// Script to add a new admin user to the database
// Usage: node addAdmin.js <username> <password>

const addAdmin = async (username, password) => {
  try {
    if (!username || !password) {
      console.error("❌ Error: Username and password are required");
      console.log("Usage: node addAdmin.js <username> <password>");
      process.exit(1);
    }

    // Check if username already exists
    const query1 = "SELECT * FROM admin WHERE username = ?";
    const [existingAdmin] = await db.query(query1, [username]);

    if (existingAdmin.length > 0) {
      console.error("❌ Error: Username already exists");
      process.exit(1);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    const query2 = "INSERT INTO admin (username, password) VALUES (?, ?)";
    const [result] = await db.query(query2, [username, hashedPassword]);

    console.log("✅ Admin user created successfully!");
    console.log(`   ID: ${result.insertId}`);
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password} (hashed in database)`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

// Get username and password from command line arguments
const args = process.argv.slice(2);
const username = args[0];
const password = args[1];

addAdmin(username, password);
