// src/components/Input.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Restyled Input component to match the mockup's window style
const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = true,
  className = '', // Allow passing additional classes
  name, // Ensure name prop is received
  ...props // Pass rest of the props like rows for textarea
}) => {
  // Styles for the input/textarea element itself
  const inputStyles = `
    w-full px-2 py-1 bg-white border border-black text-black text-sm font-sans
    placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
    transition duration-200 ease-in-out
    ${className}
  `; // Removed old styles, added new ones based on mockup

  return (
    <div className="mb-3 w-full"> {/* Reduced bottom margin */}
      {label && ( // Only render label if provided
        <label
          htmlFor={id}
          // Simple black, small text label
          className="block text-black mb-1 text-xs font-sans"
        >
          {label} {required && <span className="text-red-500">*</span>} {/* Optional required indicator */}
        </label>
      )}
      {type === 'textarea' ? (
        <motion.textarea
          id={id}
          name={name || id} // Use name prop or fallback to id
          value={value}
          onChange={onChange}
          placeholder={placeholder || ''} // Use placeholder prop directly
          required={required}
          className={inputStyles} // Apply new styles
          whileFocus={{ scale: 1.01, transition: { duration: 0.1 } }} // Subtle focus animation
          rows={props.rows || 3}
          {...props}
        />
      ) : (
        <motion.input
          id={id}
          name={name || id} // Use name prop or fallback to id
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder || ''} // Use placeholder prop directly
          required={required}
          className={inputStyles} // Apply new styles
          whileFocus={{ scale: 1.01, transition: { duration: 0.1 } }} // Subtle focus animation
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
