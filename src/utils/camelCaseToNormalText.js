import React from 'react';
export function camelCaseToNormalText(camelCaseString) {
  let normalText = camelCaseString.replace(/([A-Z])/g, " $1").toLowerCase();
  normalText = normalText.replace(/\b\w/g, (char) => char.toUpperCase());
  return normalText;
}
