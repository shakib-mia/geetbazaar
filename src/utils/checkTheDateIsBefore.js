import React from 'react';
export const checkTheDateIsBefore = (date) => {
  // The previous date in DD/MM/YYYY format
  //   const previousDateStr = date;

  if (date) {
    // Split the string into day, month, and year
    const [year, month, day] = date.split("/");
    console.log({ day, month, year });

    // Create a Date object for the previous date
    const previousDate = new Date(year, month - 1, day); // month - 1 because months are zero-indexed in JavaScript
    console.log({ previousDate });

    // Get the current date
    const currentDate = new Date();

    // Check if the current date is before the previous date
    const isBefore = currentDate < previousDate;

    // console.log(isBefore); // true if the current date is before 22/08/2025, false otherwise
    return isBefore;
  } else {
    return "no date";
  }
};
