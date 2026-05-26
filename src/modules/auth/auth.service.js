import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "./auth.repository.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-env";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

const authService = {
  login: async (username, password) => {
    try {
      const admin = await authRepository.findAdminByUsername(username);

      if (!admin) {
        return {
          success: false,
          message: "Invalid credentials. Please try again.",
        };
      }

      // Compare password with hashed password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: "Invalid credentials. Please try again.",
        };
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );

      return {
        success: true,
        data: {
          id: admin.id,
          username: admin.username,
          token: token,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  hashPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};

export default authService;
