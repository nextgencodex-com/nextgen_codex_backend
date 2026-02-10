import PDFDocument from "pdfkit";
import clientPaymentRepository from "./clientPayment.repository.js";

const toCsvValue = (value) => {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

const formatDate = (value) => {
  if (!value) return "";
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }
  return String(value);
};

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "0";
  return amount.toLocaleString("en-US");
};

const clientPaymentService = {
  getAllPayments: async (filters) => {
    try {
      const payments = await clientPaymentRepository.findAll(filters);
      return { success: true, data: payments };
    } catch (error) {
      throw error;
    }
  },

  getPaymentById: async (id) => {
    try {
      const payment = await clientPaymentRepository.findById(id);
      if (!payment) {
        return { success: false, message: "Payment not found" };
      }
      return { success: true, data: payment };
    } catch (error) {
      throw error;
    }
  },

  createPayment: async (paymentData) => {
    try {
      if (
        !paymentData.clientId ||
        !paymentData.project ||
        paymentData.cost === undefined ||
        !paymentData.type ||
        !paymentData.dueDate
      ) {
        return {
          success: false,
          message: "Client ID, project, cost, type, and due date are required",
        };
      }

      const payment = await clientPaymentRepository.create(paymentData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  updatePayment: async (id, paymentData) => {
    try {
      const existing = await clientPaymentRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Payment not found" };
      }

      if (
        !paymentData.clientId ||
        !paymentData.project ||
        paymentData.cost === undefined ||
        !paymentData.type ||
        !paymentData.dueDate
      ) {
        return {
          success: false,
          message: "Client ID, project, cost, type, and due date are required",
        };
      }

      const updated = await clientPaymentRepository.update(id, paymentData);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  markPaid: async (id) => {
    try {
      const existing = await clientPaymentRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Payment not found" };
      }

      await clientPaymentRepository.markPaid(id);
      return { success: true, message: "Payment marked as paid" };
    } catch (error) {
      throw error;
    }
  },

  deletePayment: async (id) => {
    try {
      const existing = await clientPaymentRepository.findById(id);
      if (!existing) {
        return { success: false, message: "Payment not found" };
      }

      const deleted = await clientPaymentRepository.delete(id);
      if (!deleted) {
        return { success: false, message: "Failed to delete payment" };
      }

      return { success: true, message: "Payment deleted successfully" };
    } catch (error) {
      throw error;
    }
  },

  exportPaymentsCsv: async () => {
    try {
      const payments = await clientPaymentRepository.findAll();
      const headers = [
        "id",
        "client_id",
        "project",
        "cost",
        "type",
        "due_date",
        "status",
        "created_at",
        "updated_at",
      ];

      const csvRows = payments.map((payment) => {
        const row = {
          id: payment.id,
          client_id: payment.client_id,
          project: payment.project,
          cost: payment.cost,
          type: payment.type,
          due_date: formatDate(payment.due_date),
          status: payment.status,
          created_at: formatDate(payment.created_at),
          updated_at: formatDate(payment.updated_at),
        };

        return headers.map((header) => toCsvValue(row[header])).join(",");
      });

      return [headers.join(","), ...csvRows].join("\n");
    } catch (error) {
      throw error;
    }
  },

  generateInvoicePdf: async (id) => {
    try {
      const payment = await clientPaymentRepository.findById(id);
      if (!payment) {
        return { success: false, message: "Payment not found" };
      }

      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks = [];

      const pdfBuffer = await new Promise((resolve, reject) => {
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", (error) => reject(error));

        doc.fontSize(20).text("INVOICE", { align: "left" });
        doc.moveDown(0.5);
        doc
          .fontSize(10)
          .text("NextGen CodeX", { align: "left" })
          .text("123 Tech Street, Suite 456")
          .text("Innovation City, IC 12345");

        doc.moveDown(1);
        doc.fontSize(12).text(`Invoice ID: ${payment.id}`);
        doc.text(`Client ID: ${payment.client_id}`);
        doc.text(`Project: ${payment.project}`);
        doc.text(`Type: ${payment.type}`);
        doc.text(`Due Date: ${formatDate(payment.due_date)}`);
        doc.text(`Status: ${payment.status}`);
        doc.moveDown(0.5);
        doc.fontSize(14).text(`Amount: LKR ${formatCurrency(payment.cost)}`);

        doc.moveDown(1.5);
        doc
          .fontSize(10)
          .text("Thank you for your business!", { align: "center" })
          .text("support@nextgencodex.com", { align: "center" });

        doc.end();
      });

      return { success: true, data: pdfBuffer };
    } catch (error) {
      throw error;
    }
  },
};

export default clientPaymentService;
