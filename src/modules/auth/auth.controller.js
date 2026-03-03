import authService from "./auth.service.js";
import apiResponse from "../../utils/apiResponse.js";

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Username and password are required"));
      }

      const result = await authService.login(username, password);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, "Login successful"));
      } else {
        return res.status(401).json(apiResponse(401, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  logout: async (req, res) => {
    try {
      res.status(200).json(apiResponse(200, null, "Logged out successfully"));
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default authController;
