import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api", routes);

// Error Handler (LAST)
app.use(errorMiddleware);

export default app;
