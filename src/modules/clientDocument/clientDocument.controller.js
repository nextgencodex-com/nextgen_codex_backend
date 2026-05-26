import clientDocumentService from "./clientDocument.service.js";
import apiResponse from "../../utils/apiResponse.js";
import fs from "fs";

const clientDocumentController = {
  getDocumentsByClient: async (req, res) => {
    try {
      const { clientId } = req.params;
      if (!clientId) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Client ID is required"));
      }

      const result = await clientDocumentService.getDocumentsByClient(clientId);
      return res
        .status(200)
        .json(apiResponse(200, result.data, "Documents retrieved"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  getDocumentById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Document ID is required"));
      }

      const result = await clientDocumentService.getDocumentById(id);
      if (!result.success) {
        return res.status(404).json(apiResponse(404, null, result.message));
      }

      return res
        .status(200)
        .json(apiResponse(200, result.data, "Document retrieved"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  uploadDocument: async (req, res) => {
    try {
      const { clientId } = req.params;
      if (!clientId) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Client ID is required"));
      }

      if (!req.file) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Document file is required"));
      }

      const docData = {
        clientId,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        fileUrl: `/uploads/clients/${req.file.filename}`,
      };

      const result = await clientDocumentService.createDocument(docData);
      if (!result.success) {
        fs.unlink(req.file.path, () => {});
        return res.status(400).json(apiResponse(400, null, result.message));
      }

      return res
        .status(201)
        .json(apiResponse(201, result.data, "Document uploaded"));
    } catch (error) {
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  deleteDocument: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Document ID is required"));
      }

      const result = await clientDocumentService.deleteDocument(id);
      if (!result.success) {
        return res
          .status(result.message === "Document not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Document not found" ? 404 : 400,
              null,
              result.message
            )
          );
      }

      if (result.data?.file_url) {
        const filePath = `./public${result.data.file_url}`;
        fs.unlink(filePath, () => {});
      }

      return res.status(200).json(apiResponse(200, null, result.message));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default clientDocumentController;
