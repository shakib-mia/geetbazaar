import React from 'react';
/**
 * Get the duration of an audio file from a URL.
 * @param {string} audioUrl - The URL of the audio file.
 * @returns {Promise<number>} A promise that resolves with the duration in seconds.
 */
export const getAudioDuration = (audioUrl) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);
    // audio;
    // Event listener to capture when metadata is loaded (duration becomes available)
    audio.addEventListener("loadedmetadata", () => {
      if (isNaN(audio.duration)) {
        reject(new Error("Failed to retrieve audio duration"));
      } else {
        resolve(audio.duration);
      }
    });

    // Event listener to handle audio loading errors
    audio.addEventListener("error", () => {
      reject(new Error("Error loading audio file"));
    });
  });
};
