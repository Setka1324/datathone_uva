// src/components/TeamForm.jsx
import React from 'react';
import Input from './Input.jsx'; // Use relative path
import Button from './Button.jsx'; // Use relative path
import TeamMemberInput from './TeamMemberInput.jsx'; // Use relative path

// Adapted TeamForm - Renders team name/desc and member fields
// Assumes submission logic and state are handled by the parent (Registration.jsx)
const TeamForm = ({
    teamName,
    description,
    members,
    handleTeamInfoChange, // Callback for team name/desc
    handleMemberChange, // Callback for member changes
    addMember,          // Callback to add member
    removeMember,       // Callback to remove member
    error,              // General error message
    limitError,         // Member limit error message
    MAX_TEAM_MEMBERS    // Prop for max members
}) => {
  // Note: This component no longer handles its own state or submission.
  // It just receives data and callbacks via props from Registration.jsx

  const canAddMoreMembers = members.length < MAX_TEAM_MEMBERS;

  return (
    // No outer form or motion tag here
    <div className="space-y-4">
      {/* Display general errors if needed */}
      {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

      {/* Team Details Inputs */}
      <Input
        label="Team Name"
        id="teamName"
        name="teamName" // Matches state key in parent
        value={teamName}
        onChange={handleTeamInfoChange} // Use specific handler from parent
        placeholder="Your Awesome Team Name"
        required
      />
      <Input
        label="Team Description (Optional)"
        id="description"
        name="description" // Matches state key in parent
        type="textarea"
        value={description}
        onChange={handleTeamInfoChange} // Use specific handler from parent
        placeholder="What your team is about"
        required={false}
        className="min-h-[60px]" // Adjusted height
      />

      {/* Member Section */}
      <h3 className="text-base font-semibold text-black pt-2 font-sans">
        Team Members ({members.length}/{MAX_TEAM_MEMBERS})
      </h3>
      {/* Display member limit error if present */}
      {limitError && <p className="text-yellow-600 text-xs mb-2">{limitError}</p>}

      {/* Render input fields for each member */}
      <div className="space-y-4">
         {members.map((member, index) => (
          <TeamMemberInput
            key={index}
            index={index}
            memberData={member}
            onChange={handleMemberChange} // Pass handler down from parent
            onRemove={removeMember}       // Pass handler down from parent
          />
        ))}
      </div>

      {/* Button to add more members */}
      <div className="flex justify-end">
        <Button
            type="button"
            onClick={addMember}
            // Simple styling for add button
            className="px-3 py-1 text-xs bg-blue-200 text-blue-800 border border-blue-400 hover:bg-blue-300"
            disabled={!canAddMoreMembers}
        >
          + Add Member
        </Button>
      </div>
       {/* The main submit button is rendered in Registration.jsx */}
    </div>
  );
};

export default TeamForm;
