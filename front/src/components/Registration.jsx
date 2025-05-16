// src/components/Registration.jsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndividualForm from './IndividualForm.jsx';
import TeamForm from './TeamForm.jsx';
import Button from './Button.jsx';
import { registerIndividual, registerTeam } from '../api-helper/auth.js';

// --- Placeholder SVGs (Keep them as they are) ---
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 1L11 11M1 11L11 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
const FlowerSVG = ({ className = '' }) => (
    <svg className={className} viewBox="0 0 100 100" fill="black" xmlns="http://www.w3.org/2000/svg">
         <circle cx="50" cy="50" r="15"/><ellipse cx="50" cy="25" rx="12" ry="20" transform="rotate(0 50 25)"/><ellipse cx="75" cy="37.5" rx="12" ry="20" transform="rotate(60 75 37.5)"/><ellipse cx="75" cy="62.5" rx="12" ry="20" transform="rotate(120 75 62.5)"/><ellipse cx="50" cy="75" rx="12" ry="20" transform="rotate(180 50 75)"/><ellipse cx="25" cy="62.5" rx="12" ry="20" transform="rotate(240 25 62.5)"/><ellipse cx="25" cy="37.5" rx="12" ry="20" transform="rotate(300 25 37.5)"/>
    </svg>
);
const VerticalTextSVG = ({ text, className = '' }) => (
    <svg className={className} viewBox="0 0 30 200" xmlns="http://www.w3.org/2000/svg">
        <text x="15" y="10" fill="black" fontFamily="PixelFont, cursive" fontSize="24" textAnchor="middle" writingMode="vertical-rl" glyphOrientationVertical="0">
            {text}
        </text>
    </svg>
);
// --- End Placeholder SVGs ---

const MAX_TEAM_MEMBERS = 4;

const Registration = () => {
    const [registrationType, setRegistrationType] = useState('individual');
    const [formData, setFormData] = useState({
        // Individual fields
        name: '',
        email: '',
        password: '', // For individual registration
        expertise: '',
        // Team fields
        teamName: '',
        teamPassword: '', // <-- ADDED: For team's shared password
        description: '',
        members: [{ name: '', email: '', expertise: '' }], // MODIFIED: No password per member initially
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [limitError, setLimitError] = useState('');

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
        setSuccess(null);
    }, []);

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

    const addMember = useCallback(() => {
        setFormData(prev => {
            if (prev.members.length >= MAX_TEAM_MEMBERS) {
                setLimitError(`Teams are limited to a maximum of ${MAX_TEAM_MEMBERS} members.`);
                return prev;
            }
            setLimitError('');
            return {
                ...prev,
                // MODIFIED: New member object structure
                members: [...prev.members, { name: '', email: '', expertise: '' }]
            };
        });
    }, []);

    const removeMember = useCallback((index) => {
        setFormData(prev => {
            if (prev.members.length <= 1) {
                // MODIFIED: Changed error message slightly for clarity
                setError("A team must have at least one member to register.");
                return prev;
            }
            const updatedMembers = prev.members.filter((_, i) => i !== index);
            if (updatedMembers.length < MAX_TEAM_MEMBERS) {
                setLimitError('');
            }
            setError(null);
            return { ...prev, members: updatedMembers };
        });
    }, []);

    const handleRegTypeChange = (e) => {
        setRegistrationType(e.target.value);
        setError(null);
        setSuccess(null);
        setLimitError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        setLimitError('');

        try {
            if (registrationType === 'individual') {
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
                // MODIFIED: Validation for team
                if (!formData.teamName || !formData.teamPassword) { // <-- ADDED: Check for teamPassword
                    throw new Error("Team name and Team Password are required.");
                }
                if (formData.members.some(m => !m.name || !m.email || !m.expertise)) { // <-- MODIFIED: Removed m.password check
                    throw new Error("All member fields (Name, Email, Expertise) are required.");
                }
                if (formData.members.length === 0) { // Added check for at least one member
                    throw new Error("A team must have at least one member.");
                }
                if (formData.members.length > MAX_TEAM_MEMBERS) {
                    throw new Error(`Teams cannot exceed ${MAX_TEAM_MEMBERS} members.`);
                }

                // MODIFIED: Construct teamData according to new backend expectations
                const teamData = {
                    teamName: formData.teamName,
                    teamPassword: formData.teamPassword, // <-- ADDED
                    description: formData.description,
                    // Ensure members only contain name, email, expertise
                    members: formData.members.map(m => ({
                        name: m.name,
                        email: m.email,
                        expertise: m.expertise,
                    })),
                };
                const data = await registerTeam(teamData);
                setSuccess(data.message || 'Team registration successful!');
            }
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center items-center py-10 px-4">
            <FlowerSVG className="absolute top-1/4 left-4 sm:left-10 md:left-20 h-20 w-20 sm:h-28 sm:w-28 text-black z-0 opacity-80" />
            <VerticalTextSVG text="WELCOME" className="absolute top-1/4 right-4 sm:right-10 md:right-20 h-40 sm:h-60 text-black z-0 opacity-80 hidden md:block" />
            <VerticalTextSVG text="MAKE IMPACT" className="absolute bottom-10 right-4 sm:right-10 md:right-20 h-40 sm:h-60 text-black z-0 opacity-80 hidden md:block" />

            <motion.div
                className="bg-gray-300 border-4 border-black shadow-2xl w-full max-w-lg relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="bg-blue-300 text-black flex items-center justify-between px-3 py-1 border-b-4 border-black font-pixel">
                    <span className="font-bold text-sm uppercase">REGISTER</span>
                    <button onClick={() => console.log('Close clicked')} className="p-0.5 hover:bg-red-500 hover:text-white border border-black">
                        <CloseIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={registrationType}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {registrationType === 'individual' ? (
                                <IndividualForm
                                    formData={formData}
                                    handleChange={handleInputChange}
                                    error={error && !success ? error : null}
                                />
                            ) : (
                                <TeamForm
                                    teamName={formData.teamName}
                                    teamPassword={formData.teamPassword} // <-- PASS teamPassword prop
                                    description={formData.description}
                                    members={formData.members}
                                    handleTeamInfoChange={handleInputChange}
                                    handleMemberChange={handleMemberChange}
                                    addMember={addMember}
                                    removeMember={removeMember}
                                    error={error && !success ? error : null}
                                    limitError={limitError}
                                    MAX_TEAM_MEMBERS={MAX_TEAM_MEMBERS}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {error && !success && <p className="text-red-600 text-sm text-center font-semibold font-sans">{error}</p>}
                    {success && <p className="text-green-600 text-sm text-center font-semibold font-sans">{success}</p>}

                    <Button
                        type="submit"
                        disabled={loading || success}
                        className="w-full mt-4"
                    >
                        {loading ? 'Registering...' : (success ? 'Registered!' : 'REGISTER')}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default Registration;