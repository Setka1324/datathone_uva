// src/components/IndividualForm.jsx
import React, { useState, useEffect } from 'react';
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

// Helper function to check password strength
const getPasswordStrengthFeedback = (password) => {
    const feedback = [];
    if (!password) return []; // No feedback if no password

    if (password.length < 10) {
        feedback.push("At least 10 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
        feedback.push("An uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        feedback.push("A lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
        feedback.push("A number.");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        feedback.push("A special character.");
    }
    return feedback;
};

const IndividualForm = ({ formData, handleChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState([]);

  const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

  // Update password feedback when formData.password changes
  useEffect(() => {
    if (formData.password) { // Only show feedback if there's a password attempt
        setPasswordFeedback(getPasswordStrengthFeedback(formData.password));
    } else {
        setPasswordFeedback([]); // Clear feedback if password field is empty
    }
  }, [formData.password]);

  return (
    <div className="space-y-3">
      {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

      <Input
        label="Name"
        id="individual-name"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        placeholder="Your Full Name"
        required
      />
      <Input
        label="Email"
        id="individual-email"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
        placeholder="your.email@example.com"
        required
      />
      <div> {/* Wrapper for password input and feedback */}
        <div className="relative w-full">
          <Input
            label="Password"
            id="individual-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password || ''}
            onChange={handleChange} // This updates formData in the parent
            placeholder="Choose a secure password"
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            // Adjusted button positioning: relies on label being present to push input down.
            // If label is sometimes absent, this might need conditional styling or a fixed height wrapper.
            className="absolute top-0 right-0 h-full pr-3 flex items-center text-gray-600 hover:text-gray-800 mt-[22px]" // mt-[22px] is an estimate if label height is approx 22px
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {/* Password Strength Feedback Display */}
        {formData.password && passwordFeedback.length > 0 && ( // Only show if password typed and feedback exists
          <div className="mt-1 pl-1">
            <p className="text-xs font-sans text-gray-600 mb-0.5">Password should contain:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {passwordFeedback.map((message, index) => (
                <li key={index} className="text-xs font-sans text-red-500">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
         {formData.password && passwordFeedback.length === 0 && ( // All criteria met
          <div className="mt-1 pl-1">
            <p className="text-xs font-sans text-green-600">✓ Password strength: Good</p>
          </div>
        )}
      </div>
       <Input
        label="Expertise"
        id="individual-expertise"
        name="expertise"
        value={formData.expertise || ''}
        onChange={handleChange}
        placeholder="e.g., AI Research, Web Dev"
        required
      />
    </div>
  );
};

export default IndividualForm;
