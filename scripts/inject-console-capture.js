const fs = require('fs');
const path = require('path');

const consoleScript = fs.readFileSync(
  path.join(__dirname, '../public/dashboard-console-capture.js'),
  'utf-8'
);

function injectScriptIntoHTML(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  if (html.includes('dashboard-console-capture.js')) {
    return;
  }
  
  const scriptTag = '<script>' + consoleScript + '</script>';
  
  if (html.includes('</head>')) {
    html = html.replace('</head>', scriptTag + '</head>');
  } else if (html.includes('<body>')) {
    html = html.replace('<body>', '<body>' + scriptTag);
  }
  
  fs.writeFileSync(htmlPath, html);
}

const outDir = path.join(__dirname, '../out');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScriptIntoHTML(filePath);
    }
  });
}

if (fs.existsSync(outDir)) {
  processDirectory(outDir);
  console.log('Console capture script injected into all HTML files');
}