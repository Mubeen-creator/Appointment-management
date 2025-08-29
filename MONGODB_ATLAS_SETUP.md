# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for the Hospital Management System.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Verify your email address

## Step 2: Create a New Cluster

1. After logging in, click "Create a New Cluster"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to your location
5. Name your cluster (e.g., "hospital-management-cluster")
6. Click "Create Cluster" (this may take 3-5 minutes)

## Step 3: Create Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Enter a username (e.g., "hospital_admin")
5. Generate a secure password or create your own
6. Under "Database User Privileges", select "Read and write to any database"
7. Click "Add User"

**⚠️ Important: Save your username and password - you'll need them for the connection string!**

## Step 4: Configure Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add your specific IP addresses
5. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Choose "Node.js" as the driver and select version 4.1 or later
5. Copy the connection string

## Step 6: Update Your .env File

Replace the placeholders in your `backend/.env` file:

```env
# Replace this:
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/hospital_management_system?retryWrites=true&w=majority&appName=HospitalManagementSystem

# With your actual values:
MONGO_URI=mongodb+srv://hospital_admin:your_password@hospital-management-cluster.abc123.mongodb.net/hospital_management_system?retryWrites=true&w=majority&appName=HospitalManagementSystem
```

## Step 7: Test the Connection

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. Look for the success message:
   ```
   ✅ Connected to MongoDB Atlas successfully!
   📊 Database: hospital_management_system
   🌐 Host: your-cluster-host
   ```

## Common Issues and Solutions

### Issue: "MongoServerSelectionError"
**Solution:** 
- Check your internet connection
- Verify your IP address is whitelisted in Network Access
- Ensure your cluster is running (not paused)

### Issue: "Authentication failed"
**Solution:**
- Double-check your username and password
- Ensure there are no special characters that need URL encoding
- Verify the user has proper database permissions

### Issue: "Connection string format error"
**Solution:**
- Ensure you're using the `mongodb+srv://` format
- Check that all placeholders are replaced with actual values
- Verify the database name is correct

## Security Best Practices

1. **Never commit credentials to version control**
   - Add `.env` to your `.gitignore` file
   - Use different credentials for development and production

2. **Use strong passwords**
   - Generate complex passwords for database users
   - Consider using MongoDB Atlas's password generator

3. **Restrict network access**
   - In production, only whitelist specific IP addresses
   - Avoid using 0.0.0.0/0 in production environments

4. **Monitor your usage**
   - Check your Atlas dashboard regularly
   - Set up alerts for unusual activity

## Production Deployment Notes

When deploying to production:

1. Create a separate cluster for production
2. Use environment-specific connection strings
3. Set up proper monitoring and alerts
4. Configure backup policies
5. Review and restrict network access

## Support

If you encounter issues:
1. Check the MongoDB Atlas documentation
2. Review the connection logs in your application
3. Use the MongoDB Atlas support resources
4. Check the MongoDB community forums

---

**Next Steps:** Once your MongoDB Atlas connection is working, you can proceed to set up the frontend and dashboard applications.