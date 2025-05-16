// src/components/TeamForm.jsx
import React, { useState } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';
import TeamMemberInput from './TeamMemberInput.jsx';

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

const TeamForm = ({
    teamName,
    teamPassword, // <-- ADDED: Receive teamPassword prop
    description,
    members,
    handleTeamInfoChange,
    handleMemberChange,
    addMember,
    removeMember,
    error,
    limitError,
    MAX_TEAM_MEMBERS
}) => {

  const [showTeamPassword, setShowTeamPassword] = useState(false); // <-- ADDED: State for team password visibility

  const toggleTeamPasswordVisibility = () => { // <-- ADDED: Function to toggle
    setShowTeamPassword(prev => !prev);
  };

  const canAddMoreMembers = members.length < MAX_TEAM_MEMBERS;

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

      <Input
        label="Team Name"
        id="teamName"
        name="teamName"
        value={teamName}
        onChange={handleTeamInfoChange}
        placeholder="Your Awesome Team Name"
        required
      />
      {/* ADDED: Team Password Input Field */}
      <div className="relative w-full">
        <Input
          label="Team Password"
          id="teamPassword"
          name="teamPassword"
          type={showTeamPassword ? "text" : "password"} // <-- MODIFIED: Dynamic type
          value={teamPassword}
          onChange={handleTeamInfoChange}
          placeholder="Create a strong team password"
          required
          // Add padding to the right if icon is inside, or manage layout with parent
          className="pr-10" // Make space for the icon
        />
        <button
            type="button"
            onClick={toggleTeamPasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 top-[28px]" // Adjusted top for label presence
            aria-label={showTeamPassword ? "Hide team password" : "Show team password"}
            style={{ paddingTop: '0.25rem' }} // Manual adjustment if label pushes input down
        >
            {showTeamPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <Input
        label="Team Description (Optional)"
        id="description"
        name="description"
        type="textarea"
        value={description}
        onChange={handleTeamInfoChange}
        placeholder="What your team is about"
        required={false}
        className="min-h-[60px]"
      />

      <h3 className="text-base font-semibold text-black pt-2 font-sans">
        Team Members ({members.length}/{MAX_TEAM_MEMBERS})
      </h3>
      {limitError && <p className="text-yellow-600 text-xs mb-2">{limitError}</p>}

      <div className="space-y-4">
         {members.map((member, index) => (
          <TeamMemberInput
            key={index}
            index={index}
            memberData={member}
            onChange={handleMemberChange}
            onRemove={removeMember}
            // No need to pass MAX_TEAM_MEMBERS down if not used by TeamMemberInput directly
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button
            type="button"
            onClick={addMember}
            className="px-3 py-1 text-xs bg-blue-200 text-blue-800 border border-blue-400 hover:bg-blue-300"
            disabled={!canAddMoreMembers}
        >
          + Add Member
        </Button>
      </div>
    </div>
  );
};

export default TeamForm;