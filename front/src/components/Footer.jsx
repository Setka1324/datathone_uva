import React from 'react'; // Make sure React is imported if not already



function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-dark-bg font-retro text-gray-200 py-4 mt-auto border-t-2 border-neon-blue shadow-neon-glow-blue">
      {/* Using shadow for a subtle top glow effect instead of just border */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Site Logo - Using a primary neon color */}
        <span className="text-lg md:text-xl font-bold text-neon-green mb-2 md:mb-0">
          EcoVision
        </span>

        {/* Links - Using a secondary neon color on hover */}
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 my-2 md:my-0">
          <a
            href="https://climate.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-pink transition-colors duration-300 ease-in-out"
          >
            NASA Climate
          </a>
          <a
            href="https://www.ipcc.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-pink transition-colors duration-300 ease-in-out"
          >
            IPCC Reports
          </a>
          <a
            href="https://www.un.org/en/climatechange"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-pink transition-colors duration-300 ease-in-out"
          >
            UN Climate
          </a>
        </div>

        {/* Copyright - Slightly dimmer text, updated year */}
        <small className="text-gray-400 mt-2 md:mt-0 text-center md:text-right">
          &copy; {currentYear} EcoVision. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;