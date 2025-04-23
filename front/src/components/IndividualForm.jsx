// src/components/IndividualForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '/src/components/Input.jsx';
import Button from '/src/components/Button.jsx';
import { registerIndividual } from '/Users/Skye/Downloads/datathone_uva/front/src/api-helper/auth.js'; // Adjust path if needed

// Animation variants for the form container
const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };
  
  const IndividualForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      expertise: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const handleChange = (e) => {
      // Use name attribute from Input component to update state
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);
  
      // Basic Frontend Validation
      if (!formData.email || !formData.password || !formData.name || !formData.expertise) {
          setError("All fields are required.");
          setLoading(false);
          return;
      }
  
      try {
        const data = await registerIndividual(formData);
        setSuccess(data.message || 'Registration successful!');
        // Optionally clear form after successful registration:
        // setFormData({ name: '', email: '', password: '', expertise: '' });
      } catch (err) {
        // Display error message from API response or a generic one
        setError(err.message || 'Registration failed.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <motion.form
        onSubmit={handleSubmit}
        className="w-full"
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl text-accent-blue font-bold mb-6 text-center uppercase tracking-widest animation-flicker">
          Individual Registration
        </h2>
  
        {/* Display API/validation errors */}
        {error && <p className="text-red-500 bg-red-900 bg-opacity-50 border border-red-500 p-2 mb-4 text-center">{error}</p>}
        {/* Display success message */}
        {success && <p className="text-accent-blue bg-green-900 bg-opacity-50 border border-accent-blue p-2 mb-4 text-center">{success}</p>}
  
        {/* Input fields using the reusable Input component */}
        <Input
          label="Name"
          id="name"
          name="name" // Must match state key
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Full Name"
        />
        <Input
          label="Email"
          id="email"
          name="email" // Must match state key
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
        />
        <Input
          label="Password"
          id="password"
          name="password" // Must match state key
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Choose a secure password"
        />
         <Input
          label="Expertise"
          id="expertise"
          name="expertise" // Must match state key
          value={formData.expertise}
          onChange={handleChange}
          placeholder="e.g., AI Research, Web Development"
        />
  
        <Button type="submit" disabled={loading || success} className="w-full mt-4">
          {loading ? 'Registering...' : (success ? 'Registered!' : 'Register')}
        </Button>
      </motion.form>
    );
  };
  
  export default IndividualForm;