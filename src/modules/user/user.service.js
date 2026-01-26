import userRepository from "./user.repository.js";

const userService = {
  getAllUsers: async () => {
    try {
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const user = await userRepository.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error("Name, email, and password are required");
      }
      const user = await userRepository.createUser(userData);
      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const user = await userRepository.updateUser(id, userData);
      return user;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await userRepository.deleteUser(id);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
