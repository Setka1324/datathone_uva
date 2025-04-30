// src/components/TeamMemberInput.jsx
import React from 'react';
import Input from './Input.jsx'; // Use relative path
import Button from './Button.jsx'; // Use relative path

// Corrected TeamMemberInput component to render Input fields
const TeamMemberInput = ({ index, memberData, onChange, onRemove }) => {
    // Handler to pass changes up to the parent Registration component
    const handleInputChange = (e) => {
      // Ensure name attribute is correctly used from the Input component
      onChange(index, e.target.name, e.target.value);
    };

    return (
      // Container for a single member's input fields
      // Added a subtle border for visual separation
      <div className="border-t border-gray-300 pt-4 mb-4 relative">
         {/* Member Title */}
         <h4 className="text-sm font-semibold text-black mb-2 font-sans">
           Member #{index + 1}
         </h4>

         {/* Remove Button - only shown for members after the first */}
         {index > 0 && (
             <Button
                type="button" // Explicitly set type
                onClick={() => onRemove(index)}
                // Minimal styling for the remove button
                className="absolute top-3 right-0 px-2 py-0.5 text-xs bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-400"
             >
                X Remove
             </Button>
         )}

         {/* Grid layout for the Input fields */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
           {/* --- Ensure these are Input components --- */}
           <Input
             label="Name"
             id={`member-name-${index}`}
             name="name" // This name is used in handleInputChange
             value={memberData.name || ''} // Use default empty string
             onChange={handleInputChange}
             placeholder="Member's Full Name"
             required // Assuming all member fields are required
           />
           <Input
             label="Email"
             id={`member-email-${index}`}
             name="email" // This name is used in handleInputChange
             type="email"
             value={memberData.email || ''} // Use default empty string
             onChange={handleInputChange}
             placeholder="Member's Email"
             required
           />
           <Input
             label="Password"
             id={`member-password-${index}`}
             name="password" // This name is used in handleInputChange
             type="password"
             value={memberData.password || ''} // Use default empty string
             onChange={handleInputChange}
             placeholder="Create Password"
             required
           />
           <Input
             label="Expertise"
             id={`member-expertise-${index}`}
             name="expertise" // This name is used in handleInputChange
             value={memberData.expertise || ''} // Use default empty string
             onChange={handleInputChange}
             placeholder="e.g., Frontend Dev"
             required
           />
           {/* --- End of Input components --- */}
         </div>
      </div>
    );
  };

export default TeamMemberInput;
