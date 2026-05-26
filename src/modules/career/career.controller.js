import careerService from "./career.service.js";
import apiResponse from "../../utils/apiResponse.js";

const careerController = {
  // Get all careers
  getAllCareers: async (req, res) => {
    try {
      const result = await careerService.getAllCareers();

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(200, result.data, "Careers retrieved successfully")
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get career by ID
  getCareerById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Career ID is required"));
      }

      const result = await careerService.getCareerById(id);

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(200, result.data, "Career retrieved successfully")
          );
      } else {
        return res.status(404).json(apiResponse(404, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get active careers
  getActiveCareers: async (req, res) => {
    try {
      const result = await careerService.getActiveCareers();

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(
              200,
              result.data,
              "Active careers retrieved successfully"
            )
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get careers by department
  getCareersByDepartment: async (req, res) => {
    try {
      const { department } = req.params;

      if (!department) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Department is required"));
      }

      const result = await careerService.getCareersByDepartment(department);

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(
              200,
              result.data,
              `Careers in '${department}' department retrieved successfully`
            )
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Create new career
  createCareer: async (req, res) => {
    try {
      const careerData = req.body;

      if (!careerData) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Career data is required"));
      }

      // Parse JSON strings if sent as FormData
      if (typeof careerData.requirements === "string") {
        careerData.requirements = JSON.parse(careerData.requirements);
      }
      if (typeof careerData.technologies === "string") {
        careerData.technologies = JSON.parse(careerData.technologies);
      }

      const result = await careerService.createCareer(careerData);

      if (result.success) {
        return res
          .status(201)
          .json(
            apiResponse(201, result.data, "Career posting created successfully")
          );
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Update career
  updateCareer: async (req, res) => {
    try {
      const { id } = req.params;
      const careerData = req.body;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Career ID is required"));
      }

      if (!careerData) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Career data is required"));
      }

      // Parse JSON strings if sent as FormData
      if (typeof careerData.requirements === "string") {
        careerData.requirements = JSON.parse(careerData.requirements);
      }
      if (typeof careerData.technologies === "string") {
        careerData.technologies = JSON.parse(careerData.technologies);
      }

      const result = await careerService.updateCareer(id, careerData);

      if (result.success) {
        return res
          .status(200)
          .json(
            apiResponse(200, result.data, "Career posting updated successfully")
          );
      } else {
        return res
          .status(result.message === "Career posting not found" ? 404 : 400)
          .json(
            apiResponse(
              result.message === "Career posting not found" ? 404 : 400,
              null,
              result.message
            )
          );
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Delete career
  deleteCareer: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json(apiResponse(400, null, "Career ID is required"));
      }

      const result = await careerService.deleteCareer(id);

      if (result.success) {
        return res.status(200).json(apiResponse(200, null, result.message));
      } else {
        return res
          .status(
            result.message === "Career posting not found" ? 404 : 400
          )
          .json(
            apiResponse(
              result.message === "Career posting not found" ? 404 : 400,
              null,
              result.message
            )
          );
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default careerController;
