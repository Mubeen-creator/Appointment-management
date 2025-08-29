# 🚀 Hospital Management System - Deployment Guide

## 📋 Current Deployment Status

- ✅ **Frontend**: https://zeecare-roan.vercel.app/
- ✅ **Dashboard**: https://zeecareadmindashboaer.vercel.app/login
- ⏳ **Backend**: Needs to be deployed

## 🔧 Backend Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. **Push backend to GitHub** (if not already done)
2. **Go to Vercel Dashboard** → Import Project
3. **Select your backend repository**
4. **Configure Environment Variables** in Vercel:
   ```
   MONGO_URI=mongodb+srv://mmaj8855_db_user:jSH2ng0l8TuwUMJ8@appointmentmanagement.i5wits9.mongodb.net/appointmentmanagement?retryWrites=true&w=majority
   JWT_SECRET_KEY=fhjl349r0ufjkj30q9wkw093jiwqj023jiwwi0fo
   JWT_EXPIRES=7d
   COOKIE_EXPIRE=7
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL_ONE=https://zeecare-roan.vercel.app
   FRONTEND_URL_TWO=https://zeecareadmindashboaer.vercel.app
   CLOUDINARY_CLOUD_NAME=danpmrokt
   CLOUDINARY_API_KEY=911718244517845
   CLOUDINARY_API_SECRET=N_UNsTDSqQWSO-RkKWNM6NnV-RY
   ```
5. **Deploy**

### Option 2: Deploy to Railway (Alternative)

1. **Go to Railway.app** → New Project
2. **Connect GitHub repository**
3. **Add environment variables** (same as above)
4. **Deploy automatically**

### Option 3: Deploy to Render (Free Tier)

1. **Go to Render.com** → New Web Service
2. **Connect GitHub repository**
3. **Set Build Command**: `npm install`
4. **Set Start Command**: `npm start`
5. **Add environment variables**

## 🔄 After Backend Deployment

### Step 1: Update Frontend Environment Variables

1. **Go to Vercel Dashboard** → Your Frontend Project → Settings → Environment Variables
2. **Update VITE_BACKEND_URL**:
   ```
   VITE_BACKEND_URL=https://your-backend-url.vercel.app
   ```
3. **Redeploy frontend**

### Step 2: Update Dashboard Environment Variables

1. **Go to Vercel Dashboard** → Your Dashboard Project → Settings → Environment Variables
2. **Update VITE_BACKEND_URL**:
   ```
   VITE_BACKEND_URL=https://your-backend-url.vercel.app
   ```
3. **Redeploy dashboard**

## 🛠️ Environment Variables Configuration

### Backend Environment Variables (Required)

```env
MONGO_URI=mongodb+srv://mmaj8855_db_user:jSH2ng0l8TuwUMJ8@appointmentmanagement.i5wits9.mongodb.net/appointmentmanagement?retryWrites=true&w=majority
JWT_SECRET_KEY=fhjl349r0ufjkj30q9wkw093jiwqj023jiwwi0fo
JWT_EXPIRES=7d
COOKIE_EXPIRE=7
PORT=5000
NODE_ENV=production
FRONTEND_URL_ONE=https://zeecare-roan.vercel.app
FRONTEND_URL_TWO=https://zeecareadmindashboaer.vercel.app
CLOUDINARY_CLOUD_NAME=danpmrokt
CLOUDINARY_API_KEY=911718244517845
CLOUDINARY_API_SECRET=N_UNsTDSqQWSO-RkKWNM6NnV-RY
```

### Frontend Environment Variables (Required)

```env
VITE_BACKEND_URL=https://your-backend-url.vercel.app
```

### Dashboard Environment Variables (Required)

```env
VITE_BACKEND_URL=https://your-backend-url.vercel.app
```

## 🔍 Testing After Deployment

1. **Test Backend API**:

   ```bash
   curl https://your-backend-url.vercel.app/api/v1/user/doctors
   ```

2. **Test Frontend**:

   - Visit: https://zeecare-roan.vercel.app/
   - Try booking an appointment
   - Check "My Appointments" page

3. **Test Dashboard**:
   - Visit: https://zeecareadmindashboaer.vercel.app/login
   - Login with: admin@hospital.com / admin123
   - Check appointments management

## 🚨 Common Issues & Solutions

### Issue 1: CORS Errors

**Solution**: Ensure FRONTEND_URL_ONE and FRONTEND_URL_TWO are correctly set in backend environment variables

### Issue 2: API Not Found (404)

**Solution**: Check if VITE_BACKEND_URL is correctly set in frontend/dashboard environment variables

### Issue 3: Database Connection Failed

**Solution**: Verify MONGO_URI is correctly set and MongoDB Atlas allows connections from 0.0.0.0/0

### Issue 4: Authentication Issues

**Solution**: Check JWT_SECRET_KEY is the same across all environments

## 📝 Deployment Checklist

- [ ] Backend deployed to Vercel/Railway/Render
- [ ] Backend environment variables configured
- [ ] Frontend VITE_BACKEND_URL updated
- [ ] Dashboard VITE_BACKEND_URL updated
- [ ] Frontend redeployed with new backend URL
- [ ] Dashboard redeployed with new backend URL
- [ ] Test all functionality end-to-end
- [ ] Verify CORS is working
- [ ] Test admin login and appointment management
- [ ] Test patient registration and appointment booking

## 🔗 Final URLs Structure

```
Frontend:  https://zeecare-roan.vercel.app/
Dashboard: https://zeecareadmindashboaer.vercel.app/
Backend:   https://your-backend-url.vercel.app/
```

## 🎯 Next Steps

1. Deploy backend using one of the options above
2. Update frontend and dashboard environment variables
3. Redeploy frontend and dashboard
4. Test the complete application flow
5. Monitor for any issues and fix as needed
