const fs = require('fs');
const newCss = fs.readFileSync('C:\\Users\\hasni\\.gemini\\antigravity-ide\\brain\\b46508e0-71c2-4f85-8aa3-16cbf14b1c02\\scratch\\temp_hero.css', 'utf8');
const oldCss = fs.readFileSync('assets/css/pages/home.css', 'utf8');
const splitIndex = oldCss.indexOf('/* ----------------------------------------\r\n   3. REVIEWS');
let finalCss = '';
if (splitIndex === -1) {
  const altSplit = oldCss.indexOf('/* ----------------------------------------\n   3. REVIEWS');
  if (altSplit !== -1) {
    finalCss = `/* ========================================\n   HOME.CSS — Homepage-specific Styles\n   ======================================== */\n\n` + newCss + '\n\n' + oldCss.substring(altSplit);
  }
} else {
  finalCss = `/* ========================================\n   HOME.CSS — Homepage-specific Styles\n   ======================================== */\n\n` + newCss + '\n\n' + oldCss.substring(splitIndex);
}
if (finalCss) {
  fs.writeFileSync('assets/css/pages/home.css', finalCss);
  console.log("Success!");
} else {
  console.log("Failed to find marker.");
}
