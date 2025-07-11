import React from 'react';
export const dateSuffix = (day) => {
  if (day > 3 && day < 21) return `${day}th`; // Catch 11th-19th
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};
