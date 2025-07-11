const fs = require("fs");
const path = require("path");

function addReactImportToFile(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  if (code.includes("import React")) return;

  const updated = `import React from 'react';\n${code}`;
  fs.writeFileSync(filePath, updated, "utf-8");
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith(".jsx") || fullPath.endsWith(".js")) {
      addReactImportToFile(fullPath);
    }
  });
}

// Change this to your src folder
walkDir(path.join(__dirname, "src"));

console.log("✅ All files processed!");
