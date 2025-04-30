// src/components/Registration.jsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndividualForm from './IndividualForm.jsx'; // Use relative path
import TeamForm from './TeamForm.jsx';         // Use relative path
import Button from './Button.jsx';           // Use relative path
import { registerIndividual, registerTeam } from '/Users/Skye/Downloads/datathone_uva/front/src/api-helper/auth.js'; // Adjust path

// --- Placeholder SVGs ---
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 1L11 11M1 11L11 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const FlowerSVG = ({ className = '' }) => (
    // Simple placeholder flower
    <svg className={className} viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
         <circle cx="50" cy="50" r="15"/>
         <ellipse cx="50" cy="25" rx="12" ry="20" transform="rotate(0 50 25)"/>
         <ellipse cx="75" cy="37.5" rx="12" ry="20" transform="rotate(60 75 37.5)"/>
         <ellipse cx="75" cy="62.5" rx="12" ry="20" transform="rotate(120 75 62.5)"/>
         <ellipse cx="50" cy="75" rx="12" ry="20" transform="rotate(180 50 75)"/>
         <ellipse cx="25" cy="62.5" rx="12" ry="20" transform="rotate(240 25 62.5)"/>
         <ellipse cx="25" cy="37.5" rx="12" ry="20" transform="rotate(300 25 37.5)"/>
    </svg>
);

const VerticalTextSVG = ({ text, className = '' }) => (
    // Simple placeholder for vertical text
    <svg className={className} viewBox="0 0 30 200" xmlns="http://www.w3.org/2000/svg">
        <text x="15" y="10" fill="black" fontFamily="PixelFont, cursive" fontSize="24" textAnchor="middle" writingMode="vertical-rl" glyphOrientationVertical="0">
            {text}
        </text>
    </svg>
);
// --- End Placeholder SVGs ---


// Define the maximum number of team members allowed
const MAX_TEAM_MEMBERS = 4;

// Main Registration Component - Recreates the window UI
const Registration = () => {
    // 'individual' or 'team'
    const [registrationType, setRegistrationType] = useState('individual');

    // Combined state for form data (individual or team specific)
    const [formData, setFormData] = useState({
        // Individual fields
        name: '',
        email: '',
        password: '',
        expertise: '',
        // Team fields
        teamName: '',
        description: '',
        members: [{ name: '', email: '', password: '', expertise: '' }], // Start with one member for team
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // General/API errors
    const [success, setSuccess] = useState(null);
    const [limitError, setLimitError] = useState(''); // Team member limit error

    // --- Handlers ---

    // Generic handler for top-level fields (name, email, password, expertise, teamName, description)
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null); // Clear error on input change
        setSuccess(null);
    }, []);

    // Handler for team member field changes
    const handleMemberChange = useCallback((index, fieldName, value) => {
        setFormData(prev => {
            const updatedMembers = prev.members.map((member, i) =>
                i === index ? { ...member, [fieldName]: value } : member
            );
            return { ...prev, members: updatedMembers };
        });
        setError(null);
        setSuccess(null);
    }, []);

    // Handler to add a new team member
    const addMember = useCallback(() => {
        setFormData(prev => {
            if (prev.members.length >= MAX_TEAM_MEMBERS) {
                setLimitError(`Teams are limited to a maximum of ${MAX_TEAM_MEMBERS} members.`);
                return prev; // Return previous state if limit reached
            }
            setLimitError(''); // Clear limit error
            return {
                ...prev,
                members: [...prev.members, { name: '', email: '', password: '', expertise: '' }]
            };
        });
    }, []);

    // Handler to remove a team member
    const removeMember = useCallback((index) => {
        setFormData(prev => {
            if (prev.members.length <= 1) {
                setError("A team must have at least one member.");
                // Keep existing members if only one left
                return prev;
            }
            const updatedMembers = prev.members.filter((_, i) => i !== index);
             // Clear limit error if removing brings count below max
            if (updatedMembers.length < MAX_TEAM_MEMBERS) {
                setLimitError('');
            }
            setError(null); // Clear general error
            return { ...prev, members: updatedMembers };
        });
    }, []);

    // Handle registration type change (radio buttons)
    const handleRegTypeChange = (e) => {
        setRegistrationType(e.target.value);
        // Clear errors/success when switching types
        setError(null);
        setSuccess(null);
        setLimitError('');
        // Optionally reset parts of formData, but might be better to keep inputs
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        setLimitError('');

        try {
            if (registrationType === 'individual') {
                // Validation for individual
                if (!formData.name || !formData.email || !formData.password || !formData.expertise) {
                    throw new Error("All individual fields are required.");
                }
                const individualData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    expertise: formData.expertise,
                };
                const data = await registerIndividual(individualData);
                setSuccess(data.message || 'Individual registration successful!');

            } else { // Team registration
                // Validation for team
                if (!formData.teamName) {
                    throw new Error("Team name is required.");
                }
                 if (formData.members.some(m => !m.name || !m.email || !m.password || !m.expertise)) {
                    throw new Error("All member fields (Name, Email, Password, Expertise) are required.");
                }
                if (formData.members.length > MAX_TEAM_MEMBERS) {
                    throw new Error(`Teams cannot exceed ${MAX_TEAM_MEMBERS} members.`);
                }
                const teamData = {
                    teamName: formData.teamName,
                    description: formData.description,
                    members: formData.members,
                };
                const data = await registerTeam(teamData);
                setSuccess(data.message || 'Team registration successful!');
            }
             // Optionally clear form data on success
             // setFormData({ ...initial empty state... });

        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Main container for the page section
        <div className="relative flex justify-center items-center py-10 px-4">
             {/* Decorative Elements (Positioned Absolutely) */}
             <FlowerSVG className="absolute top-1/4 left-4 sm:left-10 md:left-20 h-20 w-20 sm:h-28 sm:w-28 text-black z-0 opacity-80" />
             <VerticalTextSVG text="WELCOME" className="absolute top-1/4 right-4 sm:right-10 md:right-20 h-40 sm:h-60 text-black z-0 opacity-80 hidden md:block" />
             <VerticalTextSVG text="MAKE IMPACT" className="absolute bottom-10 right-4 sm:right-10 md:right-20 h-40 sm:h-60 text-black z-0 opacity-80 hidden md:block" />


             {/* Window Container */}
            <motion.div
                className="bg-gray-300 border-4 border-black shadow-2xl w-full max-w-lg relative z-10" // Increased max-width
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Title Bar */}
                <div className="bg-blue-300 text-black flex items-center justify-between px-3 py-1 border-b-4 border-black font-pixel">
                    <span className="font-bold text-sm uppercase">REGISTER</span>
                    {/* Placeholder for close button action */}
                    <button onClick={() => console.log('Close clicked')} className="p-0.5 hover:bg-red-500 hover:text-white border border-black">
                        <CloseIcon />
                    </button>
                </div>

                {/* Form Content Area */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4"> {/* Added space-y */}

                    {/* Participation Preference Radio Buttons */}
                    <fieldset className="mb-4">
                        <legend className="block text-black mb-2 text-sm font-sans font-semibold">
                            Participation preference <span className="text-red-500">*</span>
                        </legend>
                        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                            <label className="flex items-center space-x-2 text-sm font-sans cursor-pointer">
                                <input
                                    type="radio"
                                    name="registrationType"
                                    value="individual"
                                    checked={registrationType === 'individual'}
                                    onChange={handleRegTypeChange}
                                    className="form-radio text-blue-500 border-black focus:ring-blue-400"
                                />
                                <span>I will participate individually</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-sans cursor-pointer">
                                <input
                                    type="radio"
                                    name="registrationType"
                                    value="team"
                                    checked={registrationType === 'team'}
                                    onChange={handleRegTypeChange}
                                    className="form-radio text-blue-500 border-black focus:ring-blue-400"
                                />
                                <span>I have a team or want to participate as a team</span>
                            </label>
                        </div>
                    </fieldset>

                    {/* Conditional Form Fields */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={registrationType} // Key change triggers animation
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden" // Prevents content spill during animation
                        >
                            {registrationType === 'individual' ? (
                                <IndividualForm
                                    formData={formData}
                                    handleChange={handleInputChange}
                                    error={error && !success ? error : null} // Show error only if relevant
                                />
                            ) : (
                                <TeamForm
                                    teamName={formData.teamName}
                                    description={formData.description}
                                    members={formData.members}
                                    handleTeamInfoChange={handleInputChange} // Use generic handler
                                    handleMemberChange={handleMemberChange}
                                    addMember={addMember}
                                    removeMember={removeMember}
                                    error={error && !success ? error : null} // Show error only if relevant
                                    limitError={limitError}
                                    MAX_TEAM_MEMBERS={MAX_TEAM_MEMBERS}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                     {/* Display general/API errors (only if not success) */}
                    {error && !success && <p className="text-red-600 text-sm text-center font-semibold font-sans">{error}</p>}
                    {/* Display success message */}
                    {success && <p className="text-green-600 text-sm text-center font-semibold font-sans">{success}</p>}


                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading || success}
                        // Use default button style defined in Button.jsx
                        className="w-full mt-4"
                    >
                        {loading ? 'Registering...' : (success ? 'Registered!' : 'REGISTER')}
                    </Button>

                </form> {/* End Form */}

            </motion.div> {/* End Window Container */}
        </div> // End Main container
    );
};

export default Registration;
