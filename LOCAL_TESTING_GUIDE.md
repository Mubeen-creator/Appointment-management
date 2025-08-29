# 🧪 Local Production Testing Guide

Test your backend deployment setup locally before deploying to production.

## 🚀 Quick Start

### 1. Test Production Environment Setup
```bash
cd backend
npm run test-production
```

This will:
- ✅ Check all required environment variables
- ✅ Test MongoDB Atlas connection
- ✅ Start server with production configuration
- ✅ Display test endpoints

### 2. Test API Endpoints (in another terminal)
```bash
npm run test-api
```

This will test:
- ✅ GET endpoints (doctors, etc.)
- ✅ POST endpoints (messages, etc.)
- ✅ Response validation
- ✅ Error handling

## 📋 Detailed Testing Steps

### Step 1: Environment Variables Test
```bash
cd backend
node test-production-setup.js
```

**Expected Output:**
```
🧪 Testing Production Setup Locally...
──────────────────────────────────────────────────
📋 Environment Variables Check:
✅ MONGO_URI: mongodb+srv://mmaj8855...
✅ JWT_SECRET_KEY: ****
✅ FRONTEND_URL_ONE: https://zeecare-roan.vercel.app
✅ FRONTEND_URL_TWO: https://zeecareadmindashboaer.vercel.app
✅ CLOUDINARY_CLOUD_NAME: danpmrokt...
✅ CLOUDINARY_API_KEY: 911718244517845...
✅ CLOUDINARY_API_SECRET: ****

🔗 CORS Configuration:
Frontend URL 1: https://zeecare-roan.vercel.app
Frontend URL 2: https://zeecareadmindashboaer.vercel.app

🗄️  Testing Database Connection...
✅ Database connection successful!

🚀 Production test server running on port 5000
📡 API Base URL: http://localhost:5000
```

### Step 2: API Endpoints Test
```bash
# In another terminal
node test-api-endpoints.js
```

**Expected Output:**
```
🧪 Testing API Endpoints...
──────────────────────────────────────────────────

🔍 Testing: Get Doctors
✅ Get Doctors: Success (200)
   Response: {"success":true,"doctors":[]}...

🔍 Testing: Send Message
✅ Send Message: Success (200)
   Response: {"success":true,"message":"Message sent successfully"}...

🏁 API endpoint testing completed!
```

## 🔧 Manual Testing

### Test CORS Configuration
```bash
# Test CORS with curl
curl -H "Origin: https://zeecare-roan.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:5000/api/v1/user/doctors
```

**Expected Response Headers:**
```
Access-Control-Allow-Origin: https://zeecare-roan.vercel.app
Access-Control-Allow-Credentials: true
```

### Test Database Operations
```bash
# Test user creation
curl -X POST http://localhost:5000/api/v1/message/send \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "phone": "12345678901",
    "message": "Test message"
  }'
```

### Test File Upload (Cloudinary)
```bash
# This requires a multipart form - test via frontend or Postman
```

## 🐛 Troubleshooting

### Issue: Environment Variables Missing
**Solution:**
```bash
# Make sure .env.production exists
ls -la backend/.env.production

# Copy from example if needed
cp backend/.env.example backend/.env.production
# Then edit with your actual values
```

### Issue: Database Connection Failed
**Possible Causes:**
- MongoDB Atlas IP whitelist
- Incorrect connection string
- Network connectivity

**Test Connection:**
```bash
cd backend
npm run test-db
```

### Issue: CORS Errors
**Check CORS URLs:**
```bash
# Verify URLs in .env.production
cat backend/.env.production | grep FRONTEND_URL
```

### Issue: Port Already in Use
**Solution:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port
PORT=3001 npm run test-production
```

## ✅ Pre-Deployment Checklist

Before deploying to Vercel/Railway/Render:

- [ ] ✅ All environment variables present
- [ ] ✅ Database connection successful
- [ ] ✅ API endpoints responding correctly
- [ ] ✅ CORS configuration working
- [ ] ✅ File upload (Cloudinary) working
- [ ] ✅ Authentication endpoints working
- [ ] ✅ No console errors
- [ ] ✅ Server starts without issues

## 🚀 Ready for Deployment?

If all tests pass, your backend is ready for deployment!

### Next Steps:
1. **Push to GitHub** (if not already done)
2. **Deploy to Vercel/Railway/Render**
3. **Add environment variables** in deployment platform
4. **Update frontend/dashboard** with new backend URL
5. **Test production deployment**

## 📊 Performance Testing (Optional)

### Load Testing with curl
```bash
# Test multiple concurrent requests
for i in {1..10}; do
  curl -s http://localhost:5000/api/v1/user/doctors &
done
wait
```

### Memory Usage Monitoring
```bash
# Monitor Node.js memory usage
node --inspect test-production-setup.js
# Then open Chrome DevTools
```

---

**Remember**: Local testing simulates production but isn't identical. Always test the actual deployment after going live!