import { Link, useNavigate } // MODIFIED: Added useNavigate
from "react-router-dom";
import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Not used in this component
import { motion } from "framer-motion"; // MODIFIED: Removed AnimatePresence as it's not needed

// --- Define SINGLE Icon Path ---
const folderIconPath = '/assets/File1.svg';
// --- End Icon Path ---

// --- Main Header Component ---
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Removed isMenuOpen and toggleMenu as they are no longer needed

  const navigate = useNavigate(); // MODIFIED: Added for logout navigation

  // --- Authentication Logic ---
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    // const username = localStorage.getItem('username'); // Username not directly used in nav items structure now
    if (savedToken) { // Simplified check
       setIsLoggedIn(true);
    } else {
       localStorage.removeItem('authToken'); // Ensure all relevant items are cleared
       localStorage.removeItem('username');
       localStorage.removeItem('userId'); // Assuming you might store userId too
       setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/'); // Navigate to home or login page after logout
    // window.location.reload(); // Reloading can be disruptive, navigate instead
  };
  // --- End Authentication Logic ---

  // --- Define Unified Navigation Items ---
  const baseNavItems = [
    { name: 'Home', path: '/' , type: 'link'},
    { name: 'Tracks', path: '/about', type: 'link' },
    { name: 'Contact', path: '/contact', type: 'link' },
  ];

  let navItemsToDisplay = [];

  if (isLoggedIn) {
    navItemsToDisplay = [
      ...baseNavItems,
      { name: 'Community', path: '/community', type: 'link' },
      // { name: localStorage.getItem('username') || 'Profile', path: '/profile', type: 'link' }, // Example Profile link
      { name: 'Logout', action: handleLogout, type: 'button' }
    ];
  } else {
    navItemsToDisplay = [
      ...baseNavItems,
      { name: 'Register', path: '/register', type: 'link' },
      { name: 'Login', path: '/login', type: 'link' }
    ];
  }
  // --- End Navigation Items ---

  return (
    <header className="relative z-30 pt-4 sm:pt-6 overflow-visible"> {/* Adjusted pt and overflow */}
      <nav className="relative z-10 container mx-auto px-2 sm:px-4">
        {/* --- Unified Navigation (Always Flex, Responsive Scaling) --- */}
        <ul className="flex justify-center items-end flex-wrap 
                       gap-x-1 gap-y-2 
                       sm:gap-x-2 
                       md:gap-x-4 
                       lg:gap-x-8 
                       xl:gap-x-12"> 
                       {/* Using gap for spacing, more robust with flex-wrap */}
          {navItemsToDisplay.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              {item.type === 'link' ? (
                <Link
                  to={item.path}
                  className="flex flex-col items-center text-[#FFFFFA] hover:text-[#FFCF53] transition-colors duration-200 group p-1"
                >
                  <img
                    src={folderIconPath}
                    alt="" // Decorative icon
                    className="h-6 w-6 mb-0.5 
                               sm:h-8 sm:w-8 sm:mb-1
                               md:h-10 md:w-10 md:mb-1
                               lg:h-12 lg:w-12 lg:mb-2 
                               transition-transform duration-200 group-hover:-translate-y-1"
                  />
                  <span className="text-[10px] leading-tight 
                                 sm:text-xs 
                                 md:text-sm 
                                 lg:text-base"> {/* Adjusted base text size */}
                    {item.name}
                  </span>
                </Link>
              ) : ( // item.type === 'button'
                <button
                  onClick={item.action}
                  className="flex flex-col items-center text-[#FFFFFA] hover:text-[#FFCF53] transition-colors duration-200 group p-1"
                >
                  <img
                    src={folderIconPath}
                    alt=""
                    className="h-6 w-6 mb-0.5 
                               sm:h-8 sm:w-8 sm:mb-1
                               md:h-10 md:w-10 md:mb-1
                               lg:h-12 lg:w-12 lg:mb-2 
                               transition-transform duration-200 group-hover:-translate-y-1"
                  />
                  <span className="text-[10px] leading-tight 
                                 sm:text-xs 
                                 md:text-sm 
                                 lg:text-base">
                    {item.name}
                  </span>
                </button>
              )}
            </motion.li>
          ))}
        </ul>
        {/* --- End Unified Navigation --- */}
      </nav>
      {/* Mobile Menu Overlay and Toggle Button have been removed */}
    </header>
  );
};

export default Header;
