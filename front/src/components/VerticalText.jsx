// src/components/VerticalText.jsx
import React from 'react';

const VerticalText = ({ text, className = '' }) => {
  const baseStyle = {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed', // Keeps characters upright
    whiteSpace: 'nowrap',     // Important to prevent wrapping
    // If your font requires it, or if you want specific letter spacing in vertical:
    // letterSpacing: '0.1em', // Adjust as needed
  };

  return (
    <div
      // Ensure your pixel font ('Press Start 2P' or 'PixelFont') is in your global CSS or Tailwind config
      // text-2xl is an example, adjust size as needed.
      className={`font-pixel text-2xl text-black select-none ${className}`} // Added select-none
      style={baseStyle}
      aria-hidden="true" // Since it's decorative
    >
      {text}
    </div>
  );
};

export default VerticalText;