// src/components/TeamForm.jsx
import React, { useState, useEffect } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';
import TeamMemberInput from './TeamMemberInput.jsx';

// Assuming EyeIcon and EyeOffIcon are defined here or imported
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

// Helper function to check password strength (can be moved to a utils file)
const getPasswordStrengthFeedback = (password) => {
    const feedback = [];
    if (!password) return [];

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


const TeamForm = ({
    teamName,
    teamPassword,
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
  const [showTeamPassword, setShowTeamPassword] = useState(false);
  const [teamPasswordFeedback, setTeamPasswordFeedback] = useState([]);

  const toggleTeamPasswordVisibility = () => {
    setShowTeamPassword(prev => !prev);
  };

  // Update team password feedback when teamPassword prop changes
  useEffect(() => {
    if (teamPassword) { // Only show feedback if there's a password attempt
        setTeamPasswordFeedback(getPasswordStrengthFeedback(teamPassword));
    } else {
        setTeamPasswordFeedback([]); // Clear feedback if password field is empty
    }
  }, [teamPassword]);

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
      <div> {/* Wrapper for team password input and feedback */}
        <div className="relative w-full">
          <Input
            label="Team Password"
            id="teamPassword"
            name="teamPassword"
            type={showTeamPassword ? "text" : "password"}
            value={teamPassword}
            onChange={handleTeamInfoChange} // This updates formData in the parent
            placeholder="Create a strong team password"
            required
            className="pr-10"
          />
          <button
              type="button"
              onClick={toggleTeamPasswordVisibility}
              // Adjusted button positioning to align with input field when label is present
              className="absolute top-0 right-0 h-full pr-3 flex items-center text-gray-600 hover:text-gray-800 mt-[22px]" // mt-[22px] is an estimate if label height is approx 22px
              aria-label={showTeamPassword ? "Hide team password" : "Show team password"}
          >
              {showTeamPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {/* Team Password Strength Feedback Display */}
        {teamPassword && teamPasswordFeedback.length > 0 && ( // Only show if password typed and feedback exists
          <div className="mt-1 pl-1">
            <p className="text-xs font-sans text-gray-600 mb-0.5">Team password should contain:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {teamPasswordFeedback.map((message, index) => (
                <li key={index} className="text-xs font-sans text-red-500">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
        {teamPassword && teamPasswordFeedback.length === 0 && ( // All criteria met
            <div className="mt-1 pl-1">
                <p className="text-xs font-sans text-green-600">✓ Team password strength: Good</p>
            </div>
        )}
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
