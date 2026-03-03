import userService from "./user.service.js";
import apiResponse from "../../utils/apiResponse.js";

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(apiResponse(200, users, "Users fetched successfully"));
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.json(apiResponse(200, user, "User fetched successfully"));
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const user = await userService.createUser(userData);
      res.status(201).json(apiResponse(201, user, "User created successfully"));
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await userService.updateUser(id, userData);
      res.json(apiResponse(200, user, "User updated successfully"));
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.json(apiResponse(200, null, "User deleted successfully"));
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default userController;
