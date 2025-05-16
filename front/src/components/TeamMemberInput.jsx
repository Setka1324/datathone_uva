// src/components/TeamMemberInput.jsx
import React from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';

const TeamMemberInput = ({ index, memberData, onChange, onRemove }) => {
    const handleInputChange = (e) => {
      onChange(index, e.target.name, e.target.value);
    };

    return (
      <div className="border-t border-gray-300 pt-4 mb-4 relative">
         <h4 className="text-sm font-semibold text-black mb-2 font-sans">
           Member #{index + 1}
         </h4>

         {index > 0 && ( // Only show remove for members after the first if there's more than one
             <Button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-3 right-0 px-2 py-0.5 text-xs bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-400"
             >
                X Remove
             </Button>
         )}

         {/* MODIFIED: Adjusted grid for potentially 3 items, or let it wrap.
             For 3 items, you might want grid-cols-1 sm:grid-cols-3 or make one span.
             Current sm:grid-cols-2 will make the last item take full width on sm screens if it's the 3rd.
         */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
           <Input
             label="Name"
             id={`member-name-${index}`}
             name="name"
             value={memberData.name || ''}
             onChange={handleInputChange}
             placeholder="Member's Full Name"
             required
           />
           <Input
             label="Email"
             id={`member-email-${index}`}
             name="email"
             type="email"
             value={memberData.email || ''}
             onChange={handleInputChange}
             placeholder="Member's Email"
             required
           />
           {/* REMOVED: Member Password Input */}
           <Input
             label="Expertise"
             id={`member-expertise-${index}`}
             name="expertise"
             value={memberData.expertise || ''}
             onChange={handleInputChange}
             placeholder="e.g., Frontend Dev"
             required
             className="sm:col-span-2" // Optional: make expertise span full width on sm screens if it's the last item
           />
         </div>
      </div>
    );
  };

export default TeamMemberInput;