// src/components/Registration.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndividualForm from '/src/components/IndividualForm.jsx';
import TeamForm from '/src/components/TeamForm.jsx';
import Button from '/src/components/Button.jsx'; // Assuming Button handles variants or styles


const Registration = () => {
    const [registrationType, setRegistrationType] = useState('individual');
  
    // Define the shadow utility class separately (assuming it works from Tailwind config)
    const activeShadowClass = 'shadow-neon-glow-pink';
  
    return (
      <motion.div
        className="w-full max-w-2xl bg-dark-bg border-4 border-neon-blue p-6 md:p-10 shadow-neon-glow-blue" // Base container styles
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "backOut" }}
      >
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={() => setRegistrationType('individual')}
            // Apply custom CSS class names conditionally
            className={
              registrationType === 'individual'
                ? // Active state: Apply custom class + shadow utility
                  `button-active-pink ${activeShadowClass}`
                : // Inactive state: Apply custom class
                  `button-inactive-pink`
            }
          >
            Register Individual
          </Button>
          <Button
            onClick={() => setRegistrationType('team')}
             // Apply custom CSS class names conditionally
             className={
              registrationType === 'team'
                 ? // Active state: Apply custom class + shadow utility
                  `button-active-pink ${activeShadowClass}`
                : // Inactive state: Apply custom class
                  `button-inactive-pink`
             }
          >
            Register Team
          </Button>
        </div>
  
        <AnimatePresence mode="wait">
          {registrationType === 'individual' ? (
            <IndividualForm key="individual-form" />
          ) : (
            <TeamForm key="team-form" />
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  

export default Registration;