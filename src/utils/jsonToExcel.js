import React from 'react';
import { utils, write } from "xlsx";

export function jsonToExcel(jsonData, fileName) {
  //   console.log(jsonData);
  // Convert JSON to a worksheet
  const worksheet = utils.json_to_sheet(jsonData);

  // Create a new workbook
  const workbook = utils.book_new();

  // Append the worksheet to the workbook
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook and generate a binary string
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });

  // Convert binary string to Blob
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
