// src/components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Restyled Button component
// Variants are simplified/removed; styling primarily driven by className now
const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '', // Primary way to style now
  // variant prop can be kept for semantic meaning but might not drive styles directly
}) => {
  // Base styles - minimal, relies on className for specific look
  const baseStyle = `
    font-pixel uppercase tracking-wider transition duration-200 ease-in-out
    disabled:opacity-60 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black
  `;

  // Default style for main action buttons (like REGISTER/LOGIN in mockup)
  // Can be overridden by className prop
  const defaultMockupStyle = `
    px-4 py-1 text-sm bg-gray-300 border-2 border-black text-black
    hover:bg-gray-400 active:bg-gray-500 shadow-md
  `;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // Apply base, default (if no specific style in className), and passed className
      className={`${baseStyle} ${!className.includes('bg-') ? defaultMockupStyle : ''} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.03 }} // Subtle hover
      whileTap={{ scale: disabled ? 1 : 0.97 }}   // Subtle tap
    >
      {children}
    </motion.button>
  );
};

export default Button;
