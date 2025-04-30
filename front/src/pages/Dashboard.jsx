import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Placeholder Icon/Image Paths ---
const iconPaths = {
  when: '/assets/email-emoji-smile-smart--Streamline-Pixel.svg',
  where: '/assets/map-navigation-pin-location-1--Streamline-Pixel.svg',
  who: '/assets/user-man-love--Streamline-Pixel.svg',
  what: '/assets/search-coding--Streamline-Pixel.svg',
  trophy: '/assets/Frame 272.svg',
};
// --- End Paths ---

const Dashboard = () => {
  return (
    // Main outer container
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Adjusted pb slightly more for potentially larger elements
      className="flex flex-col items-center justify-center min-h-full text-center px-4 pt-36 pb-28"
    >
      {/* --- Main Title (Pixel Font) --- */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-white mb-8 uppercase tracking-wider" style={{ textShadow: '2px 2px #333' }}>
        Welcome to the
      </h1>

      {/* --- "Window" Container --- */}
      {/* Removed overflow-hidden, kept relative */}
      <div className="bg-gray-100 border-4 border-black shadow-lg w-full max-w-3xl relative">

        {/* Title Bar (Pixel Font) - No changes */}
        <div className="bg-purple-600 text-white flex items-center justify-between px-4 py-2 border-b-4 border-black font-pixel">
           {/* ... title bar content ... */}
           <span className="font-bold text-sm md:text-base uppercase">D.I.C.E Impact-thon</span>
           {/* ... */}
        </div>

        {/* Content Area (Stick No Bills Font) */}
        {/* Added extra padding-bottom to prevent overlap */}
        <div className="p-6 md:p-8 pb-16 sm:pb-24 md:pb-28 text-left text-sm md:text-base leading-relaxed text-black font-sticknobills"> {/* Increased pb more */}
          {/* ... paragraph and list content ... */}
           {/* Paragraph inherits font-sticknobills */}
          <p className="mb-6">
            The D.I.C.E. ImpactThon is a 2-day challenge where UvA students from all
            backgrounds come together to create data-driven, ethically grounded digital
            solutions for real-world problems.
          </p>

          {/* Details List inherits font-sticknobills */}
          <ul className="space-y-3 mb-6">
             <li className="flex items-start">
              <img src={iconPaths.when} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">When:</span> 2-3 June 025</span>
            </li>
            <li className="flex items-start">
              <img src={iconPaths.where} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Where:</span> JK Building, Roeterselland Campus UvA</span>
            </li>
            <li className="flex items-start">
              <img src={iconPaths.who} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Who:</span> All UvA students welcome, no prior skills needed</span>
            </li>
            <li className="flex items-start">
              <img src={iconPaths.what} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">What:</span> Join solo or as a team, pick a role and co-create a digital intervention</span>
            </li>
          </ul>

          {/* Call to Action Text (Pixel Font) - No changes */}
          <p className="text-center font-bold text-lg md:text-xl my-0 mb-0 uppercase font-pixel">
            Want to know more?
          </p>
        </div>
        {/* --- End Content Area --- */}


        {/* --- Absolutely Positioned Buttons --- */}
        {/* Centered H, Overlapping Bottom Edge V */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full px-4 sm:px-0 sm:w-auto">
            {/* Flex Logic: Column default (mobile), Row on sm+ (tablet/desktop) */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link
                    to="/about"
                    // ADJUSTED Size classes for larger screens based on image
                    className="font-pixel uppercase
                               px-4 py-2 text-xs          // Mobile size (default)
                               sm:px-6 sm:py-3 sm:text-sm // Small screens and up size
                               md:text-base               // Medium screens and up text size (optional refinement)
                               bg-gray-100 text-black border-2 border-black hover:bg-gray-300 transition-colors shadow-md whitespace-nowrap"
                >
                    Explore tracks
                </Link>
                <Link
                    to="/register"
                    // ADJUSTED Size classes for larger screens based on image
                    className="font-pixel uppercase
                               px-4 py-2 text-xs          // Mobile size (default)
                               sm:px-6 sm:py-3 sm:text-sm // Small screens and up size
                               md:text-base               // Medium screens and up text size (optional refinement)
                               bg-gray-100 text-black border-2 border-black hover:bg-gray-300 transition-colors shadow-md whitespace-nowrap"
                >
                    Register
                </Link>
            </div>
        </div>
        {/* --- End Buttons --- */}


        {/* --- Absolutely Positioned Trophy --- */}
        {/* Bottom-Right Corner, Overlapping Bottom Edge V */}
        <div
          // Position bottom-right, translate down 50% for overlap
          // Adjusted right offset slightly for larger trophy
          className="absolute bottom-0 right-2 sm:right-3 translate-y-1/2 translate-x-1/2 z-10 pointer-events-none"
        >
            <img
                src={iconPaths.trophy}
                alt="Trophy"
                // ADJUSTED Responsive sizing for the trophy based on image
                className="h-16 w-16       // Mobile size (default)
                           sm:h-64 sm:w-64" // Small screens and up size (significantly larger)
            />
        </div>
        {/* --- End Trophy --- */}


      </div> {/* <-- End "Window" Container */}

    </motion.div> // End Main outer container
  );
};

export default Dashboard;