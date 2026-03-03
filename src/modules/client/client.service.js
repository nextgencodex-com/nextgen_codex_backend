import clientRepository from "./client.repository.js";

const clientService = {
  getAllClients: async (filters) => {
    try {
      const clients = await clientRepository.findAll(filters);
      return { success: true, data: clients };
    } catch (error) {
      throw error;
    }
  },

  getClientById: async (id) => {
    try {
      const client = await clientRepository.findById(id);
      if (!client) {
        return { success: false, message: "Client not found" };
      }
      return { success: true, data: client };
    } catch (error) {
      throw error;
    }
  },

  createClient: async (clientData) => {
    try {
      if (!clientData.name || !clientData.email) {
        return { success: false, message: "Name and email are required" };
      }

      const client = await clientRepository.create(clientData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  updateClient: async (id, clientData) => {
    try {
      const existing = await clientRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Client not found" };
      }

      if (!clientData.name || !clientData.email) {
        return { success: false, message: "Name and email are required" };
      }

      const updated = await clientRepository.update(id, clientData);
      return { success: true};
    } catch (error) {
      throw error;
    }
  },

  deleteClient: async (id) => {
    try {
      const existing = await clientRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Client not found" };
      }

      const deleted = await clientRepository.delete(id);
      if (!deleted) {
        return { success: false, message: "Failed to delete client" };
      }

      return { success: true, message: "Client deleted successfully" };
    } catch (error) {
      throw error;
    }
  },
};

export default clientService;
