// src/components/IndividualForm.jsx
import React from 'react';
import Input from './Input.jsx'; // Use relative path

// Adapted IndividualForm - Renders only the input fields
// Assumes submission logic and state are handled by the parent (Registration.jsx)
const IndividualForm = ({ formData, handleChange, error }) => {
  // Note: This component no longer handles its own state or submission.
  // It just receives data and callbacks via props from Registration.jsx

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
      <Input
        label="Password"
        id="individual-password" // Unique ID prefix
        name="password" // Matches state key in parent
        type="password"
        value={formData.password || ''}
        onChange={handleChange}
        placeholder="Choose a secure password"
        required
      />
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
