const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'temp_about.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if it already has portfolio in the footer
  // Let's only do it if the footer is missing Portfolio
  
  // Quick Links usually start with <h4>Quick Links</h4>
  const quickLinksStart = content.indexOf('<h4>Quick Links</h4>');
  if (quickLinksStart !== -1) {
    const quickLinksEnd = content.indexOf('</div></div>', quickLinksStart);
    if (quickLinksEnd !== -1) {
      const quickLinksBlock = content.substring(quickLinksStart, quickLinksEnd);
      if (!quickLinksBlock.includes('projects.html')) {
        // Inject before about.html
        const aboutLinkRegex = /<a href="about.html" class="footer-link">\s*<i class="fa-solid fa-chevron-right"><\/i>\s*About( Us)?\s*<\/a>/;
        content = content.replace(aboutLinkRegex, (match) => {
          return `<a href="projects.html" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Projects</a>` + match;
        });
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
      } else {
        console.log(`Skipped ${file}, already has portfolio link.`);
      }
    }
  }
}
console.log('Done modifying footers');
