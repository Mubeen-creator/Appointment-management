import mongoose from "mongoose";

export const dbConnection = () => {
  if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI not found, skipping database connection");
    return;
  }

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB Atlas successfully!");
      if (mongoose.connection.db) {
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
      }
    })
    .catch((err) => {
      console.error("❌ MongoDB Atlas connection error:", err.message);
      console.error("🔍 Please check your MONGO_URI and network connection");
      // Don't exit in serverless environment, just log the error
      if (process.env.NODE_ENV !== "production") {
        process.exit(1);
      }
    });

  // Handle connection events
  mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB Atlas');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB Atlas');
  });

  // Handle application termination gracefully
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('🛑 MongoDB Atlas connection closed due to application termination');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error closing MongoDB connection:', error);
      process.exit(1);
    }
  });
};
