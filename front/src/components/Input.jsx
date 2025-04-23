// src/components/Input.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, required = true, className = '', ...props }) => {
  // Define shared styles applicable to both input and textarea
  const sharedStyles = `w-full px-3 py-2 bg-light-bg border-2 border-neon-blue text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:shadow-input-glow transition duration-300 ease-in-out ${className}`; // Append extra classNames passed via props

  return (
    <div className="mb-4 w-full">
      <label htmlFor={id} className="block text-neon-pink mb-1 text-sm uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      {/* Conditional Rendering: input vs textarea */}
      {type === 'textarea' ? (
        <motion.textarea
          id={id}
          name={id} // Ensure name attribute matches state key
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
          required={required}
          className={sharedStyles} // Apply shared styles
          whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          rows={props.rows || 3} // Default rows or allow passing via props
          {...props} // Pass rest of the props
        />
      ) : (
        <motion.input
          id={id}
          name={id} // Ensure name attribute matches state key
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
          required={required}
          className={sharedStyles} // Apply shared styles
          whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          {...props} // Pass rest of the props
        />
      )}
    </div>
  );
};

export default Input;