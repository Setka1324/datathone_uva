// src/components/Login.jsx
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Input from '../components/Input.jsx';   // Use relative path
import Button from '../components/Button.jsx'; // Use relative path
import { loginUser } from '../api-helper/auth.js'; // Use relative path

// --- Placeholder SVGs (reuse from Registration or define here) ---
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
    // Ensure PixelFont is loaded via CSS
    <svg className={className} viewBox="0 0 30 200" xmlns="http://www.w3.org/2000/svg">
        <text x="15" y="10" fill="black" fontFamily="'Press Start 2P', cursive" fontSize="24" textAnchor="middle" writingMode="vertical-rl" glyphOrientationVertical="0">
            {text}
        </text>
    </svg>
);
// --- End Placeholder SVGs ---

// Main Login Component
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false, // State for checkbox
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Generic handler for input changes
    const handleInputChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            // Handle checkbox separately
            [name]: type === 'checkbox' ? checked : value
        }));
        setError(null); // Clear error on input change
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Basic frontend validation
            if (!formData.email || !formData.password) {
                throw new Error("Email and Password are required.");
            }

            const credentials = {
                email: formData.email,
                password: formData.password,
            };
            const data = await loginUser(credentials); // Call API function

            // --- SUCCESS ---
            // Store tokens and user info (example using localStorage)
            // Adapt based on your auth strategy (Context API, Zustand, etc.)
            if (data.access_token) {
                localStorage.setItem('authToken', data.access_token); // Store access token
            }
            if (data.refresh_token) {
                localStorage.setItem('refreshToken', data.refresh_token); // Store refresh token
            }
            if (data.user && data.user.name) {
                localStorage.setItem('username', data.user.name); // Store username
            }
            if (data.user && data.user.id) {
                localStorage.setItem('userId', data.user.id); // Store user ID
            }

            // Redirect to dashboard or another protected route
            navigate('/'); // Redirect to homepage/dashboard after successful login

        } catch (err) {
            // Ensure error is a string
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage || 'Login failed.');
            console.error("Login Error:", err); // Log the full error for debugging
        } finally {
            setLoading(false);
        }
    };

    return (
        // Main container for the page section
        <div className="relative flex justify-center items-center min-h-screen py-10 px-4">
            {/* Decorative Elements */}
            <FlowerSVG className="absolute top-1/4 left-4 sm:left-10 md:left-20 h-20 w-20 sm:h-28 sm:w-28 text-black z-0 opacity-80 pointer-events-none" />
            <VerticalTextSVG text="WELCOME" className="absolute top-1/4 right-4 sm:right-10 md:right-20 h-40 sm:h-60 text-black z-0 opacity-80 hidden md:block pointer-events-none" />
            {/* Changed vertical text for login page */}
            <VerticalTextSVG text="BACK" className="absolute bottom-10 right-4 sm:right-10 md:right-20 h-40 sm:h-60 text-black z-0 opacity-80 hidden md:block pointer-events-none" />

            {/* Window Container */}
            <motion.div
                className="bg-gray-300 border-4 border-black shadow-2xl w-full max-w-sm rounded-lg relative z-10" // Adjusted max-width for login
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Title Bar */}
                <div className="bg-blue-300 text-black flex items-center justify-between px-3 py-1 border-b-4 border-black font-pixel">
                    <span className="font-bold text-sm uppercase">LOGIN</span>
                    <button
                        type="button"
                        onClick={() => console.log('Close clicked')}
                        className="p-0.5 hover:bg-red-500 hover:text-white border border-black focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Form Content Area */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* Email Input */}
                    <Input
                        // label="Email" // Label removed to match mockup more closely
                        id="login-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com" // Placeholder text from mockup
                        required
                    />

                    {/* Password Input */}
                    <Input
                        // label="Password" // Label removed to match mockup more closely
                        id="login-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password" // Placeholder text from mockup
                        required
                    />

                    {/* Remember Me & Forgot Password Row */}
                    <div className="flex justify-between items-center text-xs font-sans">
                        <label className="flex items-center space-x-1.5 cursor-pointer text-gray-700">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="form-checkbox h-3.5 w-3.5 text-blue-600 border-gray-500 focus:ring-blue-500 rounded-sm"
                            />
                            <span>Remember me</span>
                        </label>
                        {/* Placeholder link */}
                        <a href="#" className="text-blue-600 hover:underline">
                            Forgot password
                        </a>
                    </div>

                    {/* Display Login Error */}
                    {error && <p className="text-red-600 text-sm text-center font-semibold font-sans -mt-2 mb-2">{error}</p>}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        // Use default button style, add width
                        className="w-full mt-4"
                    >
                        {loading ? 'Logging In...' : 'LOGIN'}
                    </Button>

                    {/* Sign Up Link */}
                    <p className="text-center text-xs font-sans text-gray-700 pt-2">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                            Sign up here.
                        </Link>
                    </p>

                </form> {/* End Form */}

            </motion.div> {/* End Window Container */}
        </div> // End Main container
    );
};

export default Login;
