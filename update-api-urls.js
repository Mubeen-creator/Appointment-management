// Script to update hardcoded API URLs to use environment variables
// Run this script to update all localhost:5000 URLs in frontend and dashboard

const fs = require('fs');
const path = require('path');

const updateFile = (filePath, content) => {
  // Replace hardcoded localhost URLs with environment variable
  const updatedContent = content.replace(
    /http:\/\/localhost:5000/g,
    '${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}'
  );
  
  // Fix template literal syntax
  const finalContent = updatedContent.replace(
    /"\$\{import\.meta\.env\.VITE_BACKEND_URL \|\| "http:\/\/localhost:5000"\}"/g,
    '`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}`'
  );
  
  if (content !== finalContent) {
    fs.writeFileSync(filePath, finalContent);
    console.log(`✅ Updated: ${filePath}`);
    return true;
  }
  return false;
};

const processDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      updatedCount += processDirectory(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (updateFile(filePath, content)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
};

console.log('🔄 Updating API URLs in frontend and dashboard...');

// Update frontend
const frontendUpdated = processDirectory('./frontend/src');
console.log(`📱 Frontend: ${frontendUpdated} files updated`);

// Update dashboard
const dashboardUpdated = processDirectory('./dashboard/src');
console.log(`🖥️  Dashboard: ${dashboardUpdated} files updated`);

console.log(`\n🎉 Total files updated: ${frontendUpdated + dashboardUpdated}`);
console.log('\n📋 Next steps:');
console.log('1. Deploy your backend to Vercel/Railway/Render');
console.log('2. Update VITE_BACKEND_URL in Vercel environment variables');
console.log('3. Redeploy frontend and dashboard');