// src/components/Registration.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndividualForm from '/src/components/IndividualForm.jsx';
import TeamForm from '/src/components/TeamForm.jsx';
import Button from '/src/components/Button.jsx'; // Assuming Button handles variants or styles


const Registration = () => {
    const [registrationType, setRegistrationType] = useState('individual');
  
    // Removed shadow definition, assuming base button handles layout
    // Apply the base button class plus the specific active/inactive class
  
    return (
      // Use new container class, remove old Tailwind styling
      <motion.div
        className="registration-container" // Apply new container class
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "backOut" }}
      >
        <div className="flex justify-center space-x-4 mb-8"> {/* Keep flex layout */}
          <Button // Pass classes to Button component
            onClick={() => setRegistrationType('individual')}
            // Apply base button class + conditional active/inactive class
            className={`button-base ${registrationType === 'individual' ? 'button-reg-active' : 'button-reg-inactive'}`}
          >
            Register Individual
          </Button>
          <Button // Pass classes to Button component
            onClick={() => setRegistrationType('team')}
            // Apply base button class + conditional active/inactive class
            className={`button-base ${registrationType === 'team' ? 'button-reg-active' : 'button-reg-inactive'}`}
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