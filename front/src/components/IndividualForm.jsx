// src/components/IndividualForm.jsx
import React, {useState} from 'react';
import Input from './Input.jsx'; // Use relative path

const EyeIcon = ({ className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

const EyeOffIcon = ({ className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
);

// Adapted IndividualForm - Renders only the input fields
// Assumes submission logic and state are handled by the parent (Registration.jsx)
const IndividualForm = ({ formData, handleChange, error }) => {
  // Note: This component no longer handles its own state or submission.
  // It just receives data and callbacks via props from Registration.jsx
  const [showPassword, setShowPassword] = useState(false); 
  const togglePasswordVisibility = () => { // <-- ADDED: Function to toggle password visibility
        setShowPassword(prev => !prev);
    };

  return (
    // No outer form or motion tag here, just the fields
    <div className="space-y-3"> {/* Use space-y for consistent spacing */}
      {/* Display field-specific errors if needed (passed down) */}
      {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

      <Input
        label="Name"
        id="individual-name" // Unique ID prefix
        name="name" // Matches state key in parent
        value={formData.name || ''}
        onChange={handleChange}
        placeholder="Your Full Name"
        required
      />
      <Input
        label="Email"
        id="individual-email" // Unique ID prefix
        name="email" // Matches state key in parent
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
        placeholder="your.email@example.com"
        required
      />
      <div className="relative w-full">
      <Input
        label="Password"
        id="individual-password" // Unique ID prefix
        name="password" // Matches state key in parent
        type={showPassword ? "text" : "password"}
        value={formData.password || ''}
        onChange={handleChange}
        placeholder="Choose a secure password"
        required
        className="pr-10"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-1 mt-6 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
        aria-label={showPassword ? "Hide password" : "Show password"}
        >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
      </div>
       <Input
        label="Expertise"
        id="individual-expertise" // Unique ID prefix
        name="expertise" // Matches state key in parent
        value={formData.expertise || ''}
        onChange={handleChange}
        placeholder="e.g., AI Research, Web Dev"
        required
      />
       {/* The main submit button is rendered in Registration.jsx */}
    </div>
  );
};

export default IndividualForm;
