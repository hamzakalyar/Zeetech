const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.push('_scripts/fix_footers.js');
files.push('assets/js/main.js');

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace URLs
  content = content.replace(/portfolio\.html/g, 'projects.html');
  
  // Replace Nav Texts
  content = content.replace(/>Portfolio<\/a>/g, '>Projects</a>');
  content = content.replace(/> Portfolio<\/a>/g, '> Projects</a>');
  
  // Replace Title in the actual page if it's there
  content = content.replace(/Zeetech \| Portfolio/g, 'Zeetech | Projects');
  
  // Replace specific instances where it might be isolated
  content = content.replace(/Our Portfolio/g, 'Our Projects');
  content = content.replace(/Our <span class="text-zeetech">Portfolio<\/span>/g, 'Our <span class="text-zeetech">Projects</span>');

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}

// Rename the file
if (fs.existsSync('portfolio.html')) {
  fs.renameSync('portfolio.html', 'projects.html');
  console.log('Renamed portfolio.html to projects.html');
}
