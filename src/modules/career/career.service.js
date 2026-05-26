import careerRepository from "./career.repository.js";

const careerService = {
  // Get all careers
  getAllCareers: async () => {
    try {
      const careers = await careerRepository.findAll();

      // Parse JSON fields
      const parsedCareers = careers.map((career) => ({
        ...career,
        requirements:
          typeof career.requirements === "string"
            ? JSON.parse(career.requirements)
            : career.requirements,
        technologies:
          typeof career.technologies === "string"
            ? JSON.parse(career.technologies)
            : career.technologies,
      }));

      return {
        success: true,
        data: parsedCareers,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get career by ID
  getCareerById: async (id) => {
    try {
      const career = await careerRepository.findById(id);

      if (!career) {
        return {
          success: false,
          message: "Career posting not found",
        };
      }

      // Parse JSON fields
      const parsedCareer = {
        ...career,
        requirements:
          typeof career.requirements === "string"
            ? JSON.parse(career.requirements)
            : career.requirements,
        technologies:
          typeof career.technologies === "string"
            ? JSON.parse(career.technologies)
            : career.technologies,
      };

      return {
        success: true,
        data: parsedCareer,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get active careers
  getActiveCareers: async () => {
    try {
      const careers = await careerRepository.findActive();

      // Parse JSON fields
      const parsedCareers = careers.map((career) => ({
        ...career,
        requirements:
          typeof career.requirements === "string"
            ? JSON.parse(career.requirements)
            : career.requirements,
        technologies:
          typeof career.technologies === "string"
            ? JSON.parse(career.technologies)
            : career.technologies,
      }));

      return {
        success: true,
        data: parsedCareers,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get careers by department
  getCareersByDepartment: async (department) => {
    try {
      const validDepartments = ["Engineering", "Design", "Business"];
      if (!validDepartments.includes(department)) {
        return {
          success: false,
          message:
            "Invalid department. Must be 'Engineering', 'Design', or 'Business'",
        };
      }

      const careers = await careerRepository.findByDepartment(department);

      // Parse JSON fields
      const parsedCareers = careers.map((career) => ({
        ...career,
        requirements:
          typeof career.requirements === "string"
            ? JSON.parse(career.requirements)
            : career.requirements,
        technologies:
          typeof career.technologies === "string"
            ? JSON.parse(career.technologies)
            : career.technologies,
      }));

      return {
        success: true,
        data: parsedCareers,
      };
    } catch (error) {
      throw error;
    }
  },

  // Create new career
  createCareer: async (careerData) => {
    try {
      // Validate required fields
      if (
        !careerData.title ||
        !careerData.department ||
        !careerData.location ||
        !careerData.type ||
        !careerData.description
      ) {
        return {
          success: false,
          message:
            "Title, department, location, type, and description are required",
        };
      }

      // Validate department enum
      const validDepartments = ["Engineering", "Design", "Business"];
      if (!validDepartments.includes(careerData.department)) {
        return {
          success: false,
          message:
            "Invalid department. Must be 'Engineering', 'Design', or 'Business'",
        };
      }

      // Validate requirements array
      if (
        !Array.isArray(careerData.requirements) ||
        careerData.requirements.length === 0
      ) {
        return {
          success: false,
          message: "At least one requirement is required",
        };
      }

      // Validate technologies array
      if (
        !Array.isArray(careerData.technologies) ||
        careerData.technologies.length === 0
      ) {
        return {
          success: false,
          message: "At least one technology is required",
        };
      }

      const newCareer = await careerRepository.create(careerData);

      return {
        success: true,
        data: newCareer,
      };
    } catch (error) {
      throw error;
    }
  },

  // Update career
  updateCareer: async (id, careerData) => {
    try {
      // Check if career exists
      const existingCareer = await careerRepository.findById(id);

      if (!existingCareer) {
        return {
          success: false,
          message: "Career posting not found",
        };
      }

      // Validate required fields
      if (
        !careerData.title ||
        !careerData.department ||
        !careerData.location ||
        !careerData.type ||
        !careerData.description
      ) {
        return {
          success: false,
          message:
            "Title, department, location, type, and description are required",
        };
      }

      // Validate department enum
      const validDepartments = ["Engineering", "Design", "Business"];
      if (!validDepartments.includes(careerData.department)) {
        return {
          success: false,
          message:
            "Invalid department. Must be 'Engineering', 'Design', or 'Business'",
        };
      }

      // Validate requirements array
      if (
        !Array.isArray(careerData.requirements) ||
        careerData.requirements.length === 0
      ) {
        return {
          success: false,
          message: "At least one requirement is required",
        };
      }

      // Validate technologies array
      if (
        !Array.isArray(careerData.technologies) ||
        careerData.technologies.length === 0
      ) {
        return {
          success: false,
          message: "At least one technology is required",
        };
      }

      const updatedCareer = await careerRepository.update(id, careerData);

      return {
        success: true,
        data: updatedCareer,
      };
    } catch (error) {
      throw error;
    }
  },

  // Delete career
  deleteCareer: async (id) => {
    try {
      // Check if career exists
      const existingCareer = await careerRepository.findById(id);

      if (!existingCareer) {
        return {
          success: false,
          message: "Career posting not found",
        };
      }

      const deleted = await careerRepository.delete(id);

      if (deleted) {
        return {
          success: true,
          message: "Career posting deleted successfully",
        };
      } else {
        return {
          success: false,
          message: "Failed to delete career posting",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};

export default careerService;
