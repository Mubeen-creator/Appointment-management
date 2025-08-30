import app from "./app.js";
import cloudinary from "cloudinary";

// Configure Cloudinary only if environment variables are available
if (process.env.CLOUDINARY_CLOUD_NAME) {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("✅ Cloudinary configured successfully");
  } catch (error) {
    console.warn("⚠️ Cloudinary configuration failed:", error.message);
  }
} else {
  console.warn("⚠️ Cloudinary environment variables not found");
}

// Export the app for serverless deployment
export default app;