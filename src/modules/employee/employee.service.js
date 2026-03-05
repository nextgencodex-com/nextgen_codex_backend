import employeeRepository from "./employee.repository.js";

const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const employees = await employeeRepository.findAll();

      return {
        success: true,
        data: employees,
        message: "Employees retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    try {
      const employee = await employeeRepository.findById(id);

      if (!employee) {
        return {
          success: false,
          data: null,
          message: "Employee not found",
        };
      }

      return {
        success: true,
        data: employee,
        message: "Employee retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      // Validate required fields
      if (!employeeData.firstName || !employeeData.lastName) {
        return {
          success: false,
          data: null,
          message: "First name and last name are required",
        };
      }

      if (!employeeData.email) {
        return {
          success: false,
          data: null,
          message: "Email is required",
        };
      }

      if (!employeeData.position) {
        return {
          success: false,
          data: null,
          message: "Position is required",
        };
      }

      const employee = await employeeRepository.create(employeeData);

      return {
        success: true,
        data: employee,
        message: "Employee created successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const existingEmployee = await employeeRepository.findById(id);

      if (!existingEmployee) {
        return {
          success: false,
          data: null,
          message: "Employee not found",
        };
      }

      const employee = await employeeRepository.update(id, employeeData);

      return {
        success: true,
        data: employee,
        message: "Employee updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const existingEmployee = await employeeRepository.findById(id);

      if (!existingEmployee) {
        return {
          success: false,
          data: null,
          message: "Employee not found",
        };
      }

      const deleted = await employeeRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          data: null,
          message: "Failed to delete employee",
        };
      }

      return {
        success: true,
        data: null,
        message: "Employee deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get employees by department
  getEmployeesByDepartment: async (department) => {
    try {
      const employees = await employeeRepository.findByDepartment(department);

      return {
        success: true,
        data: employees,
        message: "Employees retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },

  // Get active employees
  getActiveEmployees: async () => {
    try {
      const employees = await employeeRepository.findActive();

      return {
        success: true,
        data: employees,
        message: "Active employees retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  },
};

export default employeeService;
