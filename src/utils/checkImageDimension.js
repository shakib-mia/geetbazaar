import React from 'react';
export const checkImageDimensions = (file, requiredWidth, requiredHeight) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // img.width, img.height;
        if (img.width === requiredWidth && img.height === requiredHeight) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
