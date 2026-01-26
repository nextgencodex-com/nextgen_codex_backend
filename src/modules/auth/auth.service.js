import bcrypt from "bcrypt";
import authRepository from "./auth.repository.js";

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

      return {
        success: true,
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
