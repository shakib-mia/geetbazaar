import React from 'react';
export function formatTime(time) {
  // console.log(time);
  // Get total seconds
  if (!isNaN(time)) {
    const totalSeconds = Math.floor(time);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds as two digits
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    // Return the formatted time string
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return "00:00";
  }
}
