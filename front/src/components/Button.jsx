// src/components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Note: This component is flexible. The active/inactive styling for the registration type
// buttons is now handled directly via className overrides in Registration.jsx
// to simplify the logic here. Variants can still be used for other button types.
const Button = ({ children, onClick, type = 'button', disabled = false, className = '', variant = 'primary' }) => {
  const baseStyle = "px-6 py-2 font-bold uppercase tracking-wider transition duration-300 ease-in-out text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed";

  // Default variant styles (can be overridden by className)
  const primaryStyle = "bg-neon-pink text-dark-bg border-2 border-neon-pink hover:bg-opacity-80 hover:shadow-neon-glow-pink";
  const secondaryStyle = "bg-transparent text-neon-blue border-2 border-neon-blue hover:bg-neon-blue hover:text-dark-bg hover:shadow-neon-glow-blue";
  const tertiaryStyle = "bg-transparent text-neon-green border-2 border-neon-green hover:bg-neon-green hover:text-dark-bg hover:shadow-neon-glow-green";

  let style = primaryStyle; // Default to primary
  if (variant === 'secondary') style = secondaryStyle;
  if (variant === 'tertiary') style = tertiaryStyle;


  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // Combine base, variant (as default), and specific className overrides
      className={`${baseStyle} ${style} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;