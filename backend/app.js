import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// Load environment variables - Vercel handles this automatically in production
if (process.env.NODE_ENV !== "production") {
  config({ path: "./.env" });
}

// Validate required environment variables for MongoDB Atlas
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
}

if (!process.env.JWT_SECRET_KEY) {
  console.error("❌ JWT_SECRET_KEY is not defined in environment variables");
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
}

app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    method: ["GET", "POST", "DELETE", "PUT"],
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
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for MongoDB Atlas
  })
);
// Simple welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏥 Welcome to Hospital Management System API!",
    status: "Server is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Welcome route
app.get("/welcome", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to ZeeCare Hospital Management System",
    description: "Your trusted healthcare management solution",
    features: [
      "Patient Management",
      "Appointment Scheduling",
      "Medical Records",
      "Staff Management",
    ],
    version: "1.0.0",
  });
});

// API routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Initialize database connection with error handling
try {
  if (process.env.MONGO_URI) {
    dbConnection();
  } else {
    console.warn("⚠️ MONGO_URI not found, database features will be limited");
  }
} catch (error) {
  console.error("❌ Database connection error:", error.message);
}

app.use(errorMiddleware);
export default app;
