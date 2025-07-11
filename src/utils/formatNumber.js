import React from 'react';
// Helper function to format numbers with 'k', 'm', 'b'
export const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else {
    if (num.toString().includes(".")) {
      return num.toFixed(2);
    } else {
      return num;
    }
  }
};
