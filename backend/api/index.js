import express from "express";
import { dbConnection } from "../database/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "../middlewares/error.js";
import messageRouter from "../router/messageRouter.js";
import userRouter from "../router/userRouter.js";
import appointmentRouter from "../router/appointmentRouter.js";
import cloudinary from "cloudinary";

const app = express();

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// CORS configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Root route for health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management System API is running successfully!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongodb: process.env.MONGO_URI ? "configured" : "not configured"
  });
});

// API routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Initialize database connection (with error handling for serverless)
try {
  if (process.env.MONGO_URI) {
    dbConnection();
  } else {
    console.warn("⚠️ MONGO_URI not found, database features will be limited");
  }
} catch (error) {
  console.error("Database connection error:", error.message);
}

app.use(errorMiddleware);

// Export the app as a serverless function
export default app;