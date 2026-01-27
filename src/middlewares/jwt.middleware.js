import jwt from "jsonwebtoken";
import apiResponse from "../utils/apiResponse.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-env";

// Verify JWT Token Middleware
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      return res
        .status(401)
        .json(apiResponse(401, null, "No token provided. Please login."));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    req.username = decoded.username;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(apiResponse(401, null, "Token expired. Please login again."));
    }
    return res
      .status(401)
      .json(apiResponse(401, null, "Invalid token. Please login again."));
  }
};

export default verifyToken;
export { JWT_SECRET };
