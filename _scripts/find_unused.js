const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      if (file !== '.git' && file !== 'node_modules') {
        arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(path.join(dirPath, file).replace(/\\/g, '/'));
    }
  });
  return arrayOfFiles;
}

const allImages = getAllFiles('assets/images');
const sourceFiles = getAllFiles('.').filter(f => f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js'));

let unusedImages = [...allImages];

sourceFiles.forEach(file => {
  if (file === 'find_unused.js') return;
  const content = fs.readFileSync(file, 'utf8');
  unusedImages = unusedImages.filter(imgPath => {
    const filename = path.basename(imgPath);
    // encode uri component to handle spaces in URLs just in case
    const encodedFilename = encodeURIComponent(filename);
    return !content.includes(filename) && !content.includes(encodedFilename);
  });
});

console.log(unusedImages.join('\n'));
