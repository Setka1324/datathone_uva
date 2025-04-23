// src/components/TeamMemberInput.jsx
import React from 'react';
import Input from '/src/components/Input.jsx';
import Button from '/src/components/Button.jsx';

const TeamMemberInput = ({ index, memberData, onChange, onRemove }) => {
    // Handler to pass changes up to the parent TeamForm
    const handleInputChange = (e) => {
      onChange(index, e.target.name, e.target.value);
    };
  
    return (
      <div className="border border-background p-4 mb-4 relative bg-depth-grey bg-opacity-50">
         <h4 className="text-background mb-2 font-bold">Member #{index + 1}</h4>
         {/* Button to remove this member entry */}
         <Button
            onClick={() => onRemove(index)}
            variant="secondary" // Use a variant or specific className
            className="absolute top-2 right-2 !px-2 !py-1 text-xs !border-accent-pink !text-accent-pink hover:!bg-accent-pink hover:!text-depth-grey"
          >
            Remove
          </Button>
         {/* Grid layout for member details */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
           <Input
             label="Name"
             id={`member-name-${index}`}
             name="name" // Matches the key in the member state object
             value={memberData.name}
             onChange={handleInputChange}
             placeholder="Member's Name"
           />
           <Input
             label="Email"
             id={`member-email-${index}`}
             name="email" // Matches the key in the member state object
             type="email"
             value={memberData.email}
             onChange={handleInputChange}
             placeholder="Member's Email"
           />
           <Input
             label="Password"
             id={`member-password-${index}`}
             name="password" // Matches the key in the member state object
             type="password"
             value={memberData.password}
             onChange={handleInputChange}
             placeholder="Create a Password"
           />
           <Input
             label="Expertise"
             id={`member-expertise-${index}`}
             name="expertise" // Matches the key in the member state object
             value={memberData.expertise}
             onChange={handleInputChange}
             placeholder="e.g., Frontend Dev, Data Science"
           />
         </div>
      </div>
    );
  };
  
  export default TeamMemberInput;