// Simple MongoDB Atlas Connection Test
import mongoose from 'mongoose';
import { config } from "dotenv";

config({ path: "./.env" });

const testConnection = async () => {
  try {
    console.log("🧪 Testing MongoDB Atlas connection...");
    console.log("🔗 Connection String:", process.env.MONGO_URI.replace(/:[^:@]*@/, ':****@'));
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Successfully connected to MongoDB Atlas!");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ test: 'connection successful' });
    await testDoc.save();
    console.log("✅ Test document created successfully!");
    
    await TestModel.deleteOne({ test: 'connection successful' });
    console.log("✅ Test document deleted successfully!");
    
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log("\n🔍 Authentication Troubleshooting:");
      console.log("1. Check your username and password in MongoDB Atlas");
      console.log("2. Ensure the database user has proper permissions");
      console.log("3. Verify your cluster is not paused");
    }
    
    if (error.message.includes('IP not in whitelist')) {
      console.log("\n🔍 Network Access Troubleshooting:");
      console.log("1. Add your IP address to Network Access in MongoDB Atlas");
      console.log("2. Or temporarily use 0.0.0.0/0 for development");
    }
    
    process.exit(1);
  }
};

testConnection();