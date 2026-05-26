import employeeService from "./employee.service.js";
import apiResponse from "../../utils/apiResponse.js";
import fs from "fs";

const employeeController = {
  // Get all employees
  getAllEmployees: async (req, res) => {
    try {
      const result = await employeeService.getAllEmployees();

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get employee by ID
  getEmployeeById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await employeeService.getEmployeeById(id);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(404).json(apiResponse(404, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Create employee
  createEmployee: async (req, res) => {
    try {
      const employeeData = req.body;

      // Handle file upload
      if (req.file) {
        employeeData.photo = `/uploads/Employee/${req.file.filename}`;
      }

      const result = await employeeService.createEmployee(employeeData);

      if (result.success) {
        return res
          .status(201)
          .json(apiResponse(201, result.data, result.message));
      } else {
        // Delete uploaded file if employee creation fails
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.log("Error deleting file:", err);
          });
        }
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      // Delete uploaded file on error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.log("Error deleting file:", err);
        });
      }
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Update employee
  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const employeeData = req.body;

      // Handle file upload
      if (req.file) {
        employeeData.photo = `/uploads/Employee/${req.file.filename}`;
      }

      const result = await employeeService.updateEmployee(id, employeeData);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        // Delete uploaded file if update fails
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.log("Error deleting file:", err);
          });
        }
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      // Delete uploaded file on error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.log("Error deleting file:", err);
        });
      }
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Delete employee
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await employeeService.deleteEmployee(id);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, null, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get employees by department
  getEmployeesByDepartment: async (req, res) => {
    try {
      const { department } = req.params;

      const result = await employeeService.getEmployeesByDepartment(department);

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },

  // Get active employees
  getActiveEmployees: async (req, res) => {
    try {
      const result = await employeeService.getActiveEmployees();

      if (result.success) {
        return res
          .status(200)
          .json(apiResponse(200, result.data, result.message));
      } else {
        return res.status(400).json(apiResponse(400, null, result.message));
      }
    } catch (error) {
      res.status(500).json(apiResponse(500, null, error.message));
    }
  },
};

export default employeeController;
