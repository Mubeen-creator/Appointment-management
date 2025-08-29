// MongoDB Atlas Setup Utility
import mongoose from "mongoose";

export const validateMongoAtlasConnection = () => {
  const mongoUri = process.env.MONGO_URI;
  
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  if (!mongoUri.includes("mongodb+srv://")) {
    console.warn("⚠️  Warning: MONGO_URI doesn't appear to be a MongoDB Atlas connection string");
    console.warn("   Current URI starts with:", mongoUri.substring(0, 20) + "...");
  }

  // Check for common MongoDB Atlas connection string issues
  if (mongoUri.includes("<username>") || mongoUri.includes("<password>") || mongoUri.includes("<cluster-name>")) {
    throw new Error("Please replace placeholders in MONGO_URI with actual values");
  }

  console.log("✅ MongoDB Atlas connection string validation passed");
  return true;
};

export const getMongoAtlasConnectionOptions = () => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10 seconds timeout for Atlas
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0,
    bufferCommands: false,
    maxPoolSize: 10, // Maintain up to 10 socket connections for Atlas
    minPoolSize: 5,  // Maintain a minimum of 5 socket connections
    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    retryWrites: true,
    w: 'majority'
  };
};

export const handleAtlasConnectionErrors = (error) => {
  if (error.name === 'MongoServerSelectionError') {
    console.error("❌ Cannot connect to MongoDB Atlas cluster");
    console.error("🔍 Possible issues:");
    console.error("   - Check your internet connection");
    console.error("   - Verify your MongoDB Atlas cluster is running");
    console.error("   - Check if your IP address is whitelisted");
    console.error("   - Verify username and password in connection string");
  } else if (error.name === 'MongoParseError') {
    console.error("❌ Invalid MongoDB connection string format");
    console.error("🔍 Please check your MONGO_URI format");
  } else if (error.message.includes('Authentication failed')) {
    console.error("❌ MongoDB Atlas authentication failed");
    console.error("🔍 Please check your username and password");
  } else {
    console.error("❌ MongoDB Atlas connection error:", error.message);
  }
};