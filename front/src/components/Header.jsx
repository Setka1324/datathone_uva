import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "framer-motion";



const burgerVariants = {
  open: { 
    scale: 1.1,
    transition: { duration: 0.3 }
  },
  closed: { 
    scale: 1,
    transition: { duration: 0.3 }
  },
};

const line1Variants = {
  open: { rotate: 45, scaleX: 1.1, x: 9, y: 0},
  closed: { rotate: 0, y: 0, scaleX: 1 }
};

const line2Variants = {
  open: { opacity: 0, scaleX: 0 },
  closed: { opacity: 1, scaleX: 1 }
};

const line3Variants = {
  open: { rotate: -45, scaleX: 1.1, x: -10, y: 9},
  closed: { rotate: 0, y: 0, scaleX: 1 }
};

const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-80">
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <motion.svg
        key={i}
        viewBox="-500 0 1440 333"
        className="absolute -bottom-10"
        style={{ 
          filter: `blur(${i * 2 + 8}px)`,
          opacity: 0.7 - (i * 0.25)
        }}
        animate={{
          x: [-1920, 1920 ],
          transition: {
            x: {
              repeat: Infinity,
              duration: 10 + (i * 3),
              ease: "linear"
            }
          }
        }}
      >
        <path
          d="M1440 27.4774C1352.73 19.8184 1122.41 49.0556 899.331 227.276C620.48 450.052 354.282 355.647 170.328 185.318C23.165 49.0556 -4.21721 8.32998 0.487081 5"
          stroke={`hsl(45, 100%, ${70 - (i * 10)}%)`}
          strokeWidth={i * 10 + 5}
          fill="none"
        />
      </motion.svg>
    ))}
  </div>
);

const Header = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check on load whether the stored token is valid by fetching the valid token from the backend
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      // Fetch the valid token from the backend
      axios.get('http://127.0.0.1:5001/api/login')
        .then(response => {
          const validToken = response.data.token;
          if (savedToken === validToken) {
            setToken(savedToken);
            setIsLoggedIn(true);
          } else {
            // If the stored token doesn't match the valid one, ensure we're logged out
            setToken(savedToken);
            setIsLoggedIn(false);
          }
        })
        .catch(error => {
          console.error("Error fetching valid token:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  // Function to scramble token for logout (generates an 8-character random token)
  const tokenScrambler = () => {
    const randomToken = Math.random().toString(36).substring(2, 10); 
    setToken(randomToken);
    localStorage.setItem('authToken', randomToken); 
  };

  // Logout: scramble token so it doesn't match the valid token
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    tokenScrambler(); // Assign a random token that will never be valid
    setIsLoggedIn(false);
    window.location.reload()
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const controls = useAnimation();

  useEffect(() => {
    if (isMenuOpen) {
      controls.start("open");
    } else {
      controls.start("closed");
    }
  }, [isMenuOpen, controls]);

  return (
    <header className="relative z-50 overflow-hidden"
    style={{
      backgroundImage: "linear-gradient(to bottom, #181434 75%, #27292c 100%)",
    }}>
      <WaveBackground />
      
      <nav className="flex items-center justify-between h-16 px-4 relative z-50">
        {/* Improved Burger Button */}
        <motion.button
          animate={isMenuOpen ? "open" : "closed"}
          variants={burgerVariants}
          onClick={toggleMenu}
          className="md:hidden text-[#FFFFFA] p-2 focus:outline-none z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              variants={line1Variants}
              strokeLinecap="round"
              strokeWidth={2}
              d="M4 6h16"
            />
            <motion.path
              variants={line2Variants}
              strokeLinecap="round"
              strokeWidth={2}
              d="M4 12h16"
            />
            <motion.path
              variants={line3Variants}
              strokeLinecap="round"
              strokeWidth={2}
              d="M4 18h16"
            />
          </svg>
        </motion.button>

        {/* Enhanced Desktop Navigation with Idle Animations */}
      {/* Enhanced Desktop Navigation with Wave Effects */}
      <motion.ul className="hidden md:flex space-x-8 pl-6">
        {["Home", "About", "Contact", isLoggedIn && "Community"].map((item, index) => (
          item && (
            <motion.li
              key={item}
              className="relative group"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
            >
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-[#FFFFFA] text-lg flex flex-col items-center relative"
              >
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  variants={{
                    hover: { scale: 1.2 }
                  }}
                >
                  {/* Animated Waves on Hover */}
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    variants={{
                      hover: {
                        opacity: [0, 0.4, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity
                        }
                      }
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute w-8 h-8 rounded-full border-2 border-[#FFCF53]"
                          style={{ scale: 0 }}
                          variants={{
                            hover: {
                              scale: 0.75,
                              opacity: 1,
                              transition: {
                                delay: i * 0.2,
                                duration: 1.5,
                                ease: "easeOut"
                              }
                            }
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.span
                  className="relative z-10"
                  variants={{
                    hover: { color: "#FFCF53" }
                  }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFCF53]"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: 0,
                      transition: { 
                        duration: 0.5,
                        repeatType: "mirror",
                        delay: 0.05 + (index * 0.2)
                      } 
                    }}
                    variants={{
                      hover: { scaleX: 1 }
                    }}
                  />
                </motion.span>
              </Link>
            </motion.li>
          )
        ))}
      </motion.ul>

        {/* Auth Section */}
        <div className="flex items-center space-x-6 pr-4">
          {!isLoggedIn ? (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/register"
                className="hidden md:block text-[#FFFFFA] text-lg hover:text-[#FFCF53] transition-colors duration-300"
              >
                Register
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#FFFFFA] text-lg"
            >
              {localStorage.getItem("username")}
            </motion.div>
          )}
          
          <motion.div whileTap={{ scale: 0.95 }}>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-[#FFCF53] text-[#181434] px-6 py-2 rounded-lg hover:bg-[#00BF9C] transition-colors duration-300 text-lg font-medium"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-[#FFCF53] text-[#181434] px-6 py-2 rounded-lg hover:bg-[#FFB703] transition-colors duration-300 text-lg font-medium"
              >
                Logout
              </button>
            )}
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
      
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={burgerVariants}
            className="fixed inset-0 bg-[#181434]/95 z-40 flex items-center justify-center backdrop-blur-sm"
          >
            <WaveBackground />
            <div className="flex flex-col items-center space-y-8">
              {["Home", "About", "Contact", "Register", isLoggedIn && "Community"].map((item, index) => (
                item && (
                  <motion.div
                    key={item}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-2xl text-[#FFFFFA] hover:text-[#FFCF53] transition-colors relative"
                      onClick={toggleMenu}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="block px-4 py-2"
                      >
                        {item}
                      </motion.span>
                    </Link>
                  </motion.div>
                )
              ))}
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;