// src/components/TeamForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '/src/components/Input.jsx';
import Button from '/src/components/Button.jsx';
import TeamMemberInput from '/src/components/TeamMemberInput.jsx';
import { registerTeam } from '/Users/Skye/Downloads/datathone_uva/front/src/api-helper/auth.js'; // Adjust path if needed

// Animation variants for the form container
const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };
  
  // Define the maximum number of team members allowed
  const MAX_TEAM_MEMBERS = 4;
  
  const TeamForm = () => {
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState([
      // Start with fields for one member
      { name: '', email: '', password: '', expertise: '' },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // For general/API errors
    const [success, setSuccess] = useState(null);
    const [limitError, setLimitError] = useState(''); // Specific message for member limit
  
    // Update specific field for a specific member
    const handleMemberChange = (index, fieldName, value) => {
      const updatedMembers = members.map((member, i) =>
        i === index ? { ...member, [fieldName]: value } : member
      );
      setMembers(updatedMembers);
    };
  
    // Add a new empty member entry if limit not reached
    const addMember = () => {
      if (members.length >= MAX_TEAM_MEMBERS) {
        setLimitError(`Teams are limited to a maximum of ${MAX_TEAM_MEMBERS} members.`);
        return; // Prevent adding more
      }
      setLimitError(''); // Clear any previous limit error
      setMembers([...members, { name: '', email: '', password: '', expertise: '' }]);
    };
  
    // Remove a member entry by index
    const removeMember = (index) => {
      // Prevent removing the last member
      if (members.length <= 1) {
          setError("A team must have at least one member.");
          // Optionally clear error after timeout
          // setTimeout(() => setError(null), 5000);
          return;
      }
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
      setError(null); // Clear general error if removal is successful
      // Clear limit error if removing brings count below max
      if (updatedMembers.length < MAX_TEAM_MEMBERS) {
          setLimitError('');
      }
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);
      setLimitError(''); // Clear errors on new submission attempt
  
      // Frontend Validation
      if (!teamName) {
          setError("Team name is required.");
          setLoading(false);
          return;
      }
      if (members.some(m => !m.name || !m.email || !m.password || !m.expertise)) {
          setError("All member fields (Name, Email, Password, Expertise) are required.");
          setLoading(false);
          return;
      }
       if (members.length > MAX_TEAM_MEMBERS) {
          // This check is belt-and-suspenders as `addMember` should prevent it
          setError(`Teams cannot exceed ${MAX_TEAM_MEMBERS} members.`);
          setLoading(false);
          return;
      }
  
      try {
        // Prepare data structure for the API
        const teamData = { teamName, description, members };
        const data = await registerTeam(teamData);
        setSuccess(data.message || 'Team registration successful!');
         // Optionally clear form or redirect after success
         // setTeamName('');
         // setDescription('');
         // setMembers([{ name: '', email: '', password: '', expertise: '' }]);
      } catch (err) {
        setError(err.message || 'Team registration failed.');
      } finally {
        setLoading(false);
      }
    };
  
    // Check if more members can be added
    const canAddMoreMembers = members.length < MAX_TEAM_MEMBERS;
  
    return (
      <motion.form
         onSubmit={handleSubmit}
         className="w-full"
         variants={formVariants}
         initial="hidden"
         animate="visible"
         exit="exit"
      >
        <h2 className="text-2xl text-neon-green font-bold mb-6 text-center uppercase tracking-widest animation-flicker">
          Team Registration
        </h2>
  
        {/* Display general/API errors */}
        {error && <p className="text-red-500 bg-red-900 bg-opacity-50 border border-red-500 p-2 mb-4 text-center">{error}</p>}
        {/* Display success message */}
        {success && <p className="text-neon-green bg-green-900 bg-opacity-50 border border-neon-green p-2 mb-4 text-center">{success}</p>}
  
        {/* Team Details Inputs */}
        <Input
          label="Team Name"
          id="teamName"
          name="teamName" // Matches state variable name
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Your Awesome Team Name"
        />
        <Input
          label="Team Description (Optional)"
          id="description"
          name="description" // Matches state variable name
          type="textarea" // Uses updated Input component for styling
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What your team is about"
          required={false}
          className="min-h-[80px]" // Specific height for textarea
        />
  
        {/* Member Section */}
        <h3 className="text-xl text-neon-purple font-bold mt-6 mb-2 uppercase">
          Team Members ({members.length}/{MAX_TEAM_MEMBERS})
        </h3>
        {/* Display member limit error if present */}
        {limitError && <p className="text-yellow-400 text-sm mb-3">{limitError}</p>}
  
        {/* Render input fields for each member */}
        <div className="mb-4 space-y-4">
           {members.map((member, index) => (
            <TeamMemberInput
              key={index} // Index as key is acceptable if list order doesn't change unexpectedly
              index={index}
              memberData={member}
              onChange={handleMemberChange} // Pass handler down
              onRemove={removeMember}       // Pass handler down
            />
          ))}
        </div>
  
        {/* Button to add more members */}
        <div className="flex justify-end mb-6">
          <Button
              type="button"
              onClick={addMember}
              variant="tertiary" // Use green neon style
              disabled={!canAddMoreMembers} // Disable if limit reached
              className={!canAddMoreMembers ? 'opacity-50 cursor-not-allowed' : ''} // Visual cue for disabled state
          >
            + Add Another Member
          </Button>
        </div>
  
        {/* Submit Button */}
        <Button type="submit" disabled={loading || success} className="w-full mt-4">
          {loading ? 'Registering Team...' : (success ? 'Registered!' : 'Register Team')}
        </Button>
      </motion.form>
    );
  };
  
  export default TeamForm;