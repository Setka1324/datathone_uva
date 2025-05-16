// src/components/Login.jsx
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Input from '../components/Input.jsx';   // Use relative path
import Button from '../components/Button.jsx'; // Use relative path
import VerticalText from '../components/VerticalText.jsx';
import { loginUser } from '../api-helper/auth.js'; // Use relative path

// --- Placeholder SVGs (reuse from Registration or define here) ---
const CloseIconMockup = () => (
    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10L10 2M2 2L10 10" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

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

// Restored inline FlowerSVG definition
const FlowerSVG = ({ className = '' }) => (
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
// --- End SVGs ---

// Main Login Component
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError(null);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!formData.email || !formData.password) {
                throw { message: "Email and Password are required." };
            }
            const credentials = { email: formData.email, password: formData.password };
            const data = await loginUser(credentials);
            if (data.access_token) localStorage.setItem('authToken', data.access_token);
            if (data.refresh_token) localStorage.setItem('refreshToken', data.refresh_token);
            if (data.user?.name) localStorage.setItem('username', data.user.name);
            if (data.user?.id) localStorage.setItem('userId', data.user.id);
            navigate('/');
        } catch (err) {
            const errorMessage = err?.message || 'Login failed. Please try again.';
            setError(errorMessage);
            console.error("Login Error Object:", err);
        } finally {
            setLoading(false);
        }
    };

    const sansSerifTextStyle = "font-sans text-xs text-black";

    const handleClose = () => {
        navigate('/');
    };

    const windowBorderStyle = "border-2 border-r-black border-b-black border-l-white border-t-white";
    const windowBgColor = "bg-[#C0C0C0]";

    return (
        <div className="flex justify-center items-center min-h-screen p-4 overflow-hidden">
            {/* Decorative Elements - Restored */}
            <FlowerSVG className="absolute top-1/4 left-4 sm:left-10 md:left-20 h-20 w-20 sm:h-28 sm:w-28 text-black z-0 opacity-80 pointer-events-none" />
            <FlowerSVG className="absolute bottom-1/4 left-4 sm:left-10 md:left-20 h-20 w-20 sm:h-28 sm:w-28 text-black z-0 opacity-80 pointer-events-none" />
            <VerticalText
                text="WELCOME BACK"
                className="font-pixel text-4xl text-black select-none absolute right-2 sm:right-5 md:right-10 h-auto z-0 opacity-80 hidden md:block pointer-events-none"
            />

            {/* Window Container - Applying refined stacked shadow effect */}
            <motion.div
                className="relative w-full max-w-sm" // Parent container for window and shadows
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Top-Left "Shadow" Layer 2 (Mimics window style, furthest) */}
                <div className={`absolute bottom-2 right-2 w-full h-full ${windowBgColor} ${windowBorderStyle} z-0`} aria-hidden="true"></div>
                {/* Top-Left "Shadow" Layer 1 (Mimics window style, closer) */}
                <div className={`absolute bottom-1 right-1 w-full h-full ${windowBgColor} ${windowBorderStyle} z-10`} aria-hidden="true"></div>

                {/* Bottom-Right Black Shadow Layer 2 (Furthest) */}
                <div className="absolute top-2 left-2 w-full h-full bg-black z-20" aria-hidden="true"></div>
                {/* Bottom-Right Black Shadow Layer 1 (Closer) */}
                <div className="absolute top-1 left-1 w-full h-full bg-black z-30" aria-hidden="true"></div>

                {/* Main Window Content (Top-most) */}
                <div className={`relative ${windowBgColor} ${windowBorderStyle} z-40 w-full h-full`}>
                    {/* Title Bar */}
                    <div className="bg-[#000080] flex items-center justify-between px-2 py-1 select-none">
                        <span className="font-pixel text-white text-sm uppercase tracking-wider">LOGIN</span>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-5 h-5 bg-[#C0C0C0] border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white focus:outline-none"
                            aria-label="Close"
                        >
                            <CloseIconMockup />
                        </button>
                    </div>

                    {/* Form Content Area */}
                    <div className="p-4">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label htmlFor="login-email" className={`${sansSerifTextStyle} mb-0.5 block select-none`}>Email</label>
                                <Input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="h-7 px-1.5 !py-0.5 bg-white border border-gray-500 focus:border-black text-xs font-sans"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="login-password" className={`${sansSerifTextStyle} mb-0.5 block select-none`}>Password</label>
                                <div className="relative">
                                    <Input
                                        id="login-password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="h-7 px-1.5 !py-0.5 bg-white border border-gray-500 focus:border-black text-xs font-sans pr-7"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-1.5 flex items-center text-gray-500 hover:text-black focus:outline-none"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <label className={`flex items-center space-x-1.5 cursor-pointer ${sansSerifTextStyle} select-none`}>
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="h-3 w-3 appearance-none border border-black bg-white checked:bg-black checked:border-black focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-[#000080]"
                                    />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className={`${sansSerifTextStyle} hover:underline`}>
                                    Forgot password
                                </a>
                            </div>
                            {error && <p className="text-red-500 text-xs text-center font-semibold py-1">{error}</p>}
                            <div className="pt-2 flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className={`!bg-[#C0C0C0] !text-black ${sansSerifTextStyle} !font-normal !border !border-t-white !border-l-white !border-b-black !border-r-black active:!border-t-black active:!border-l-black active:!border-b-white active:!border-r-white !px-6 !py-1 !shadow-none hover:!bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-1`}
                                >
                                    {loading ? 'Logging In...' : 'LOGIN'}
                                </Button>
                            </div>
                            <p className={`text-center ${sansSerifTextStyle} pt-2`}>
                                Don't have an account?{' '}
                                <Link to="/register" className="text-black font-bold hover:underline">
                                    Sign up here.
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;