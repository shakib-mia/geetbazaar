import React from 'react';
export const jsonToCsv = (jsonData) => {
  const array = typeof jsonData !== "object" ? JSON.parse(jsonData) : jsonData;
  let csvStr = "";

  // Extract keys from the first object as the header row
  const keys = Object.keys(array[0]);
  csvStr += keys.join(",") + "\n";

  // Iterate through the array to create CSV rows
  for (const obj of array) {
    const row = keys
      .map((key) => {
        let value = obj[key];
        // Escape double quotes by replacing " with ""
        if (typeof value === "string" && value.includes('"')) {
          value = value.replace(/"/g, '""');
        }
        // Wrap value in double quotes if it contains a comma or a newline
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes("\n"))
        ) {
          value = `"${value}"`;
        }
        return value;
      })
      .join(",");
    csvStr += row + "\n";
  }

  return csvStr;
};
