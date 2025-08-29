// Shared Configuration for Hospital Management System
// This file contains common configuration that can be used across backend, frontend, and dashboard

export const sharedConfig = {
  // Database Configuration
  database: {
    name: "appointmentmanagement",
    isAtlas: true,
    connectionString: "mongodb+srv://mmaj8855_db_user:jSH2ng0l8TuwUMJ8@appointmentmanagement.i5wits9.mongodb.net/?retryWrites=true&w=majority&appName=appointmentmanagement"
  },

  // Server Configuration
  server: {
    port: 5000,
    baseUrl: "http://localhost:5000"
  },

  // Frontend URLs
  frontend: {
    main: "http://localhost:5173",
    dashboard: "http://localhost:5174"
  },

  // JWT Configuration
  jwt: {
    secret: "fhjl349r0ufjkj30q9wkw093jiwqj023jiwwi0fo",
    expires: "7d",
    cookieExpire: 7
  },

  // Cloudinary Configuration
  cloudinary: {
    cloudName: "danpmrokt",
    apiKey: "911718244517845",
    apiSecret: "N_UNsTDSqQWSO-RkKWNM6NnV-RY"
  },

  // API Endpoints
  api: {
    base: "http://localhost:5000/api/v1",
    endpoints: {
      auth: {
        login: "/user/login",
        logout: "/user/patient/logout",
        adminLogout: "/user/admin/logout",
        register: "/user/patient/register",
        adminMe: "/user/admin/me",
        patientMe: "/user/patient/me"
      },
      users: {
        doctors: "/user/doctors",
        addDoctor: "/user/doctor/addnew",
        addAdmin: "/user/admin/addnew"
      },
      appointments: {
        getAll: "/appointment/getall",
        create: "/appointment/post",
        update: "/appointment/update",
        patientAppointments: "/appointment/patient/my-appointments",
        getById: "/appointment"
      },
      messages: {
        getAll: "/message/getall",
        send: "/message/send"
      }
    }
  }
};

// Environment-specific configurations
export const getEnvironmentConfig = (env = 'development') => {
  const configs = {
    development: {
      ...sharedConfig,
      server: {
        ...sharedConfig.server,
        baseUrl: "http://localhost:5000"
      }
    },
    production: {
      ...sharedConfig,
      server: {
        ...sharedConfig.server,
        baseUrl: process.env.PRODUCTION_URL || "https://your-production-url.com"
      },
      frontend: {
        main: process.env.PRODUCTION_FRONTEND_URL || "https://your-frontend-url.com",
        dashboard: process.env.PRODUCTION_DASHBOARD_URL || "https://your-dashboard-url.com"
      }
    }
  };

  return configs[env] || configs.development;
};

export default sharedConfig;