const fs = require('fs');

// Rename CSS
if (fs.existsSync('assets/css/pages/portfolio.css')) {
  fs.renameSync('assets/css/pages/portfolio.css', 'assets/css/pages/projects.css');
  console.log('Renamed portfolio.css');
}

// Rename JS Modules
if (fs.existsSync('assets/js/modules/portfolio-gallery.js')) {
  fs.renameSync('assets/js/modules/portfolio-gallery.js', 'assets/js/modules/projects-gallery.js');
  console.log('Renamed portfolio-gallery.js');
}

// Rename JS Data
if (fs.existsSync('assets/js/data/portfolio.js')) {
  fs.renameSync('assets/js/data/portfolio.js', 'assets/js/data/projects.js');
  console.log('Renamed portfolio.js');
}

// Update projects.html
if (fs.existsSync('projects.html')) {
  let content = fs.readFileSync('projects.html', 'utf8');
  content = content.replace(/portfolio\.css/g, 'projects.css');
  content = content.replace(/portfolio-gallery\.js/g, 'projects-gallery.js');
  content = content.replace(/portfolio\.js/g, 'projects.js');
  // Also rename portfolio-grid to projects-grid
  content = content.replace(/portfolio-grid/g, 'projects-grid');
  content = content.replace(/portfolio-hero/g, 'projects-hero');
  fs.writeFileSync('projects.html', content);
}

// Update assets/css/pages/projects.css
if (fs.existsSync('assets/css/pages/projects.css')) {
  let content = fs.readFileSync('assets/css/pages/projects.css', 'utf8');
  content = content.replace(/portfolio-hero/g, 'projects-hero');
  content = content.replace(/portfolio-filters/g, 'projects-filters');
  content = content.replace(/portfolio-grid/g, 'projects-grid');
  content = content.replace(/portfolio-item/g, 'projects-item');
  fs.writeFileSync('assets/css/pages/projects.css', content);
}

// Update assets/js/modules/projects-gallery.js
if (fs.existsSync('assets/js/modules/projects-gallery.js')) {
  let content = fs.readFileSync('assets/js/modules/projects-gallery.js', 'utf8');
  content = content.replace(/portfolio\.js/g, 'projects.js');
  content = content.replace(/portfolioItems/g, 'projectsItems');
  content = content.replace(/portfolio-grid/g, 'projects-grid');
  content = content.replace(/portfolio-item/g, 'projects-item');
  fs.writeFileSync('assets/js/modules/projects-gallery.js', content);
}

// Update assets/js/data/projects.js
if (fs.existsSync('assets/js/data/projects.js')) {
  let content = fs.readFileSync('assets/js/data/projects.js', 'utf8');
  content = content.replace(/portfolioItems/g, 'projectsItems');
  fs.writeFileSync('assets/js/data/projects.js', content);
}

// Update assets/js/main.js
if (fs.existsSync('assets/js/main.js')) {
  let content = fs.readFileSync('assets/js/main.js', 'utf8');
  content = content.replace(/portfolio-gallery\.js/g, 'projects-gallery.js');
  content = content.replace(/initPortfolio/g, 'initProjects');
  content = content.replace(/portfolio-grid/g, 'projects-grid');
  fs.writeFileSync('assets/js/main.js', content);
}

console.log('Done deep renaming');
