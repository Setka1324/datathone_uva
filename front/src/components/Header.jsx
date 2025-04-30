import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

// --- Define SINGLE Icon Path ---
// IMPORTANT: Replace this with the ACTUAL path to your single folder SVG file
const folderIconPath = '/assets/File1.svg';
// --- End Icon Path ---





// --- Main Header Component ---
const Header = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Authentication Logic (Keep mostly as is) ---
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    if (savedToken && username) {
       setToken(savedToken);
       setIsLoggedIn(true);
    } else {
       localStorage.removeItem('authToken');
       localStorage.removeItem('username');
       setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setToken('');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    window.location.reload();
  };
  // --- End Authentication Logic ---

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Define Navigation Items (No need for 'icon' property anymore) ---
  const baseNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const loggedInNavItems = [
    ...baseNavItems,
    { name: 'Community', path: '/community' },
  ];

  const loggedOutNavItems = [...baseNavItems];

  const currentNavItems = isLoggedIn ? loggedInNavItems : loggedOutNavItems;
  // --- End Navigation Items ---


  return (
    <header className="relative z-30 pt-6 overflow-hidden">
      

      <nav className="relative z-10 container mx-auto px-4">

        {/* --- Mobile Menu Trigger (Top Right - Using the same folder icon) --- */}
        <div className="absolute top-0 right-4 md:hidden">
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center text-[#FFFFFA] focus:outline-none p-2"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {/* Use the single folder icon path here */}
            <img src={folderIconPath} alt="Menu" className="h-8 w-8" />
            <span className="text-xs mt-1">Menu</span>
          </button>
        </div>
        {/* --- End Mobile Menu Trigger --- */}


        {/* --- Desktop Navigation (Centered - Using the same folder icon) --- */}
        <ul className="hidden md:flex justify-center items-end space-x-12 lg:space-x-16">
          {/* Map through current navigation items */}
          {currentNavItems.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Link
                to={item.path}
                className="flex flex-col items-center text-[#FFFFFA] hover:text-[#FFCF53] transition-colors duration-200 group"
              >
                {/* Use the single folder icon path here */}
                <img
                  src={folderIconPath}
                  alt="" // Decorative icon
                  className="h-10 w-10 lg:h-12 lg:w-12 mb-2 transition-transform duration-200 group-hover:-translate-y-1"
                />
                <span className="text-lg">{item.name}</span>
              </Link>
            </motion.li>
          ))}

          {/* Desktop Authentication Links/Status (Also using the same folder icon) */}
          {isLoggedIn ? (
            <motion.li whileHover={{ scale: 1.05 }} className="text-center">
              <div className="flex items-center text-[#FFFFFA]">
                 {/* Use the single folder icon path here */}
                 <img src={folderIconPath} alt="" className="h-10 w-10 lg:h-12 lg:w-12 mb-2" />
                 <span className="text-xl">{localStorage.getItem("username")}</span>
                 
                 
              </div>
              <button
                   onClick={handleLogout}
                   className="text-xl text-[#FFFFFA] hover:text-[#FFCF53] focus:outline-none"
                 >
                   Logout
              </button>
            </motion.li>
            
          ) : (
            <>
              <motion.li whileHover={{ scale: 1.05 }} className="text-center">
                <Link to="/register" className="flex flex-col items-center text-[#FFFFFA] hover:text-[#FFCF53] transition-colors duration-200 group">
                   {/* Use the single folder icon path here */}
                   <img src={folderIconPath} alt="" className="h-10 w-10 lg:h-12 lg:w-12 mb-2 transition-transform duration-200 group-hover:-translate-y-1"/>
                   <span className="text-lg">Register</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }} className="text-center">
                 <Link to="/login" className="flex flex-col items-center text-[#FFFFFA] hover:text-[#FFCF53] transition-colors duration-200 group">
                   {/* Use the single folder icon path here */}
                   <img src={folderIconPath} alt="" className="h-10 w-10 lg:h-12 lg:w-12 mb-2 transition-transform duration-200 group-hover:-translate-y-1"/>
                   <span className="text-lg">Login</span>
                 </Link>
              </motion.li>
            </>
          )}
        </ul>
        {/* --- End Desktop Navigation --- */}

      </nav>

      {/* --- Mobile Menu Overlay (Using the same folder icon) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 p-8 pt-24 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-start space-y-6">

              {/* Map through current navigation items */}
              {currentNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center text-gray-800 hover:text-[#FFB703] text-xl w-full py-2"
                  onClick={toggleMenu}
                >
                  {/* Use the single folder icon path here */}
                  <img src={folderIconPath} alt="" className="h-6 w-6 mr-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Mobile Authentication Links (Also using the same folder icon) */}
              <div className="pt-6 border-t border-gray-200 w-full space-y-6">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center text-gray-700 pl-10"> {/* Indent to align with text */}
                       <span>Logged in as: {localStorage.getItem("username")}</span>
                    </div>
                    <button
                      onClick={() => { handleLogout(); toggleMenu(); }}
                      className="flex items-center text-red-600 hover:text-red-800 text-xl w-full py-2"
                    >
                      {/* Use the single folder icon path here */}
                      <img src={folderIconPath} alt="" className="h-6 w-6 mr-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="flex items-center text-gray-800 hover:text-[#FFB703] text-xl w-full py-2"
                      onClick={toggleMenu}
                    >
                      {/* Use the single folder icon path here */}
                      <img src={folderIconPath} alt="" className="h-6 w-6 mr-4" />
                      <span>Register</span>
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center text-gray-800 hover:text-[#FFB703] text-xl w-full py-2"
                      onClick={toggleMenu}
                    >
                      {/* Use the single folder icon path here */}
                      <img src={folderIconPath} alt="" className="h-6 w-6 mr-4" />
                      <span>Login</span>
                    </Link>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- End Mobile Menu Overlay --- */}

    </header>
  );
};

export default Header;