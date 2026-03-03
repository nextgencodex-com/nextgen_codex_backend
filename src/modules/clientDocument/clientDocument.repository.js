import db from "../../config/database.js";

const clientDocumentRepository = {
  findById: async (id) => {
    try {
      const query = "SELECT * FROM client_documents WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  findByClientId: async (clientId) => {
    try {
      const query =
        "SELECT * FROM client_documents WHERE client_id = ? ORDER BY uploaded_at DESC";
      const [rows] = await db.query(query, [clientId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (docData) => {
    try {
      const { clientId, fileName, fileType, fileSize, fileUrl } = docData;
      const query = `
        INSERT INTO client_documents (
          client_id, file_name, file_type, file_size, file_url, uploaded_at
        ) VALUES (?, ?, ?, ?, ?, NOW())
      `;
      const [result] = await db.query(query, [
        clientId,
        fileName,
        fileType,
        fileSize,
        fileUrl,
      ]);
      return { id: result.insertId, ...docData };
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const query = "DELETE FROM client_documents WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },
};

export default clientDocumentRepository;
