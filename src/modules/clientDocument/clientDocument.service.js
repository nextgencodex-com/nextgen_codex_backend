import clientDocumentRepository from "./clientDocument.repository.js";

const clientDocumentService = {
  getDocumentsByClient: async (clientId) => {
    try {
      const documents = await clientDocumentRepository.findByClientId(clientId);
      return { success: true, data: documents };
    } catch (error) {
      throw error;
    }
  },

  getDocumentById: async (id) => {
    try {
      const document = await clientDocumentRepository.findById(id);
      if (!document) {
        return { success: false, message: "Document not found" };
      }
      return { success: true, data: document };
    } catch (error) {
      throw error;
    }
  },

  createDocument: async (docData) => {
    try {
      if (!docData.clientId || !docData.fileName || !docData.fileUrl) {
        return {
          success: false,
          message: "Client ID, file name, and file URL are required",
        };
      }

      const document = await clientDocumentRepository.create(docData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  deleteDocument: async (id) => {
    try {
      const existing = await clientDocumentRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Document not found" };
      }

      const deleted = await clientDocumentRepository.delete(id);
      if (!deleted) {
        return { success: false, message: "Failed to delete document" };
      }

      return { success: true, data: existing, message: "Document deleted" };
    } catch (error) {
      throw error;
    }
  },
};

export default clientDocumentService;
