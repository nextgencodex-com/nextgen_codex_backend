import clientService from "./client.service.js";
import apiResponse from "../../utils/apiResponse.js";

const clientController = {
  getAllClients: async (req, res) => {
    try {
      const { search, status } = req.query;
      const result = await clientService.getAllClients({ search, status });
      return res
        .status(200)
        .json(apiResponse(200, result.data, "Clients retrieved successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  getClientById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Client ID is required"));
      }

      const result = await clientService.getClientById(id);
      if (!result.success) {
        return res.status(404).json(apiResponse(404, null, result.message));
      }

      return res
        .status(200)
        .json(apiResponse(200, result.data, "Client retrieved successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  createClient: async (req, res) => {
    try {
      const clientData = req.body;
      const result = await clientService.createClient(clientData);

      if (!result.success) {
        return res.status(400).json(apiResponse(400, null, result.message));
      }

      return res
        .status(201)
        .json(apiResponse(201, "Client created successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  updateClient: async (req, res) => {
    try {
      const { id } = req.params;
      const clientData = req.body;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Client ID is required"));
      }

      const result = await clientService.updateClient(id, clientData);
      if (!result.success) {
        return res
          .status(result.message === "Client not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Client not found" ? 404 : 400,
              null,
              result.message
            )
          );
      }

      return res
        .status(200)
        .json(apiResponse(200, "Client updated successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  deleteClient: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Client ID is required"));
      }

      const result = await clientService.deleteClient(id);
      if (!result.success) {
        return res
          .status(result.message === "Client not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Client not found" ? 404 : 400,
              null,
              result.message
            )
          );
      }

      return res.status(200).json(apiResponse(200, null, result.message));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default clientController;
