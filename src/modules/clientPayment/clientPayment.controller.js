import clientPaymentService from "./clientPayment.service.js";
import apiResponse from "../../utils/apiResponse.js";

const clientPaymentController = {
  getAllPayments: async (req, res) => {
    try {
      const { type, status, clientId, search } = req.query;
      const result = await clientPaymentService.getAllPayments({
        type,
        status,
        clientId,
        search,
      });
      return res
        .status(200)
        .json(apiResponse(200, result.data, "Payments retrieved"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  getPaymentById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Payment ID is required"));
      }

      const result = await clientPaymentService.getPaymentById(id);
      if (!result.success) {
        return res.status(404).json(apiResponse(404, null, result.message));
      }

      return res
        .status(200)
        .json(apiResponse(200, result.data, "Payment retrieved successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  getPaymentsByType: async (req, res) => {
    try {
      const { type } = req.params;
      const normalizedType = String(type || "").toLowerCase();

      if (!normalizedType) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Payment type is required"));
      }

      if (!["all", "monthly", "yearly"].includes(normalizedType)) {
        return res
          .status(400)
          .json(
            apiResponse(
              400,
              null,
              "Payment type must be all, monthly, or yearly"
            )
          );
      }

      const result = await clientPaymentService.getAllPayments({
        type: normalizedType === "all" ? undefined : normalizedType,
      });

      return res
        .status(200)
        .json(apiResponse(200, result.data, "Payments retrieved"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  createPayment: async (req, res) => {
    try {
      const paymentData = req.body;
      const result = await clientPaymentService.createPayment(paymentData);

      if (!result.success) {
        return res.status(400).json(apiResponse(400, null, result.message));
      }

      return res
        .status(201)
        .json(apiResponse(201, result.data, "Payment created successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  updatePayment: async (req, res) => {
    try {
      const { id } = req.params;
      const paymentData = req.body;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Payment ID is required"));
      }

      const result = await clientPaymentService.updatePayment(id, paymentData);
      if (!result.success) {
        return res
          .status(result.message === "Payment not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Payment not found" ? 404 : 400,
              null,
              result.message
            )
          );
      }

      return res
        .status(200)
        .json(apiResponse(200, result.data, "Payment updated successfully"));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  markPaid: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Payment ID is required"));
      }

      const result = await clientPaymentService.markPaid(id);
      if (!result.success) {
        return res.status(404).json(apiResponse(404, null, result.message));
      }

      return res.status(200).json(apiResponse(200, null, result.message));
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  deletePayment: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Payment ID is required"));
      }

      const result = await clientPaymentService.deletePayment(id);
      if (!result.success) {
        return res
          .status(result.message === "Payment not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Payment not found" ? 404 : 400,
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

  exportPaymentsCsv: async (req, res) => {
    try {
      const csvData = await clientPaymentService.exportPaymentsCsv();
      const fileName = `client-payments-${
        new Date().toISOString().split("T")[0]
      }.csv`;

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=\"${fileName}\"`
      );
      return res.status(200).send(csvData);
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  downloadInvoicePdf: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Payment ID is required"));
      }

      const result = await clientPaymentService.generateInvoicePdf(id);
      if (!result.success) {
        return res.status(404).json(apiResponse(404, null, result.message));
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=\"invoice-${id}.pdf\"`
      );
      return res.status(200).send(result.data);
    } catch (error) {
      return res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default clientPaymentController;
