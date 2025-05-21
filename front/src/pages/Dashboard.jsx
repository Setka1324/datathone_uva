import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// In front/src/components/Dashboard.jsx (or wherever this component is)
const iconPaths = {
  when: '/assets/email-emoji-smile-smart--Streamline-Pixel.svg',
  where: '/assets/map-navigation-pin-location-1--Streamline-Pixel.svg',
  who: '/assets/user-man-love--Streamline-Pixel.svg',
  what: '/assets/search-coding--Streamline-Pixel.svg',
  trophy: '/assets/Frame 272.svg', // Assuming Frame 272.svg is also in public/assets
};

// Mock data for the track cards
const tracksData = [
  {
    id: 1,
    title: 'PSYCHOLOGY',
    datasetText: 'Anonymized survey data on student well-being and study habits. Includes metrics on stress levels, social interaction, and academic performance over three semesters.',
    directionsText: 'Develop an intervention to improve student mental health. Analyze patterns to predict burnout risk. Design a tool for personalized study recommendations.',
  },
  {
    id: 2,
    title: 'SOCIAL SCIENCES #1',
    datasetText: 'Publicly available data on urban mobility patterns in Amsterdam, including public transport usage, bike-sharing, and traffic flow before and after a new policy.',
    directionsText: 'Assess the impact of the new mobility policy. Propose solutions for reducing congestion. Design an app to promote sustainable transport choices.',
  },
  {
    id: 3,
    title: 'SUSTAINABILITY',
    datasetText: 'Data on energy consumption, waste generation, and recycling rates across different UvA campus buildings over the past five years. Includes building type and occupancy.',
    directionsText: 'Identify key areas for improving campus sustainability. Develop a gamified app to encourage eco-friendly behavior among students and staff. Model future impact.',
  },
  {
    id: 4,
    title: 'SUSTAINABILITY', // Mockup shows this title twice
    datasetText: 'Satellite imagery and sensor data related to green spaces and biodiversity within Amsterdam. Includes historical data on land use changes.',
    directionsText: 'Develop a tool to monitor urban greening efforts. Propose data-driven strategies for enhancing biodiversity in urban environments. Visualize impact.',
  },
];

// Reusable Track Card Component
const TrackCard = ({ track, index }) => {
  return (
    <motion.div
      className="bg-gray-100 border-2 border-black flex flex-col" // Added flex flex-col
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Card Title Bar */}
      <div className="bg-gray-200 text-black flex items-center justify-between px-2 py-1 border-b-2 border-black font-pixel">
        <span className="text-xs uppercase">TRACK #{index}</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white border border-black rounded-full"></div>
          <div className="w-2 h-2 bg-white border border-black rounded-full"></div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-grow flex flex-col"> {/* Added flex-grow and flex-col */}
        <h3 className="font-pixel text-md text-black text-center my-2 uppercase">
          {track.title}
        </h3>

        <div className="my-2">
          <h4 className="font-pixel text-sm text-black uppercase mb-1">DATASET</h4>
          <p className="font-sans text-xs text-gray-700 leading-snug">
            {track.datasetText}
          </p>
        </div>

        <div className="my-2 mb-4">
          <h4 className="font-pixel text-sm text-black uppercase mb-1">POTENTIAL DIRECTIONS</h4>
          <p className="font-sans text-xs text-gray-700 leading-snug">
            {track.directionsText}
          </p>
        </div>

        {/* Download Button - Pushed to bottom */}
        <div className="mt-auto pt-2 text-center">
          <button
            type="button"
            className="font-pixel uppercase text-xs bg-gray-200 text-black border-2 border-black hover:bg-gray-300 transition-colors px-4 py-2 shadow-sm"
          >
            DOWNLOAD DATASET
          </button>
        </div>
      </div>
    </motion.div>
  );
};


const Dashboard = () => {
  const blueGridBackgroundStyle = {
    backgroundColor: '#93c5fd', // A light blue, closer to mockup (Tailwind's blue-300)
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px', // Adjust grid size as needed
  };

  return (
    // Main outer container - removed pb-28 to let the new section define its own padding
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-full text-center px-4 pt-36" // Removed pb-28
    >
      {/* --- Main Title (Pixel Font) --- */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-white mb-8 uppercase tracking-wider" style={{ textShadow: '2px 2px #333' }}>
        Welcome to the
      </h1>

      {/* --- "Window" Container --- */}
      <div className="bg-gray-100 border-4 border-black shadow-lg w-full max-w-3xl relative">

        {/* Title Bar (Pixel Font) - No changes */}
        <div className="bg-purple-600 text-white flex items-center justify-between px-4 py-2 border-b-4 border-black font-pixel">
           <span className="font-bold text-sm md:text-base uppercase">D.I.C.E Impact-thon</span>
        </div>

        {/* Content Area (Stick No Bills Font) */}
        <div className="p-6 md:p-8 pb-16 sm:pb-24 md:pb-28 text-left text-sm md:text-base leading-relaxed text-black font-sticknobills">
          <p className="mb-6">
            The D.I.C.E. ImpactThon is a 2-day challenge where UvA students from all
            backgrounds come together to create data-driven, ethically grounded digital
            solutions for real-world problems.
          </p>
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
          <p className="text-center font-bold text-lg md:text-xl my-0 mb-0 uppercase font-pixel">
            Want to know more?
          </p>
        </div>
        {/* --- End Content Area --- */}

        {/* --- Absolutely Positioned Buttons --- */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full px-4 sm:px-0 sm:w-auto">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link
                    to="/about"
                    className="font-pixel uppercase
                               px-4 py-2 text-xs
                               sm:px-6 sm:py-3 sm:text-sm 
                               md:text-base
                               bg-gray-100 text-black border-2 border-black hover:bg-gray-300 transition-colors shadow-md whitespace-nowrap"
                >
                    Explore tracks
                </Link>
                <Link
                    to="/register"
                    className="font-pixel uppercase
                               px-4 py-2 text-xs
                               sm:px-6 sm:py-3 sm:text-sm 
                               md:text-base
                               bg-gray-100 text-black border-2 border-black hover:bg-gray-300 transition-colors shadow-md whitespace-nowrap"
                >
                    Register
                </Link>
            </div>
        </div>
        {/* --- End Buttons --- */}

        {/* --- Absolutely Positioned Trophy --- */}
        <div
          className="absolute bottom-0 right-2 sm:right-3 translate-y-1/2 translate-x-1/2 z-10 pointer-events-none"
        >
            <img
                src={iconPaths.trophy}
                alt="Trophy"
                className="h-16 w-16
                           sm:h-64 sm:w-64"
            />
        </div>
        {/* --- End Trophy --- */}
      </div> {/* <-- End "Window" Container */}

      {/* --- NEW SECTION: Explore Our Tracks --- */}
      <section 
        className="w-full py-16 mt-20 md:mt-28" // Added margin-top to space from window above, py-16 for vertical padding
        style={blueGridBackgroundStyle}
      >
        <div className="container mx-auto px-4"> {/* Inner container for content padding */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-pixel text-black mb-12 md:mb-16 uppercase text-center tracking-wider" style={{ textShadow: '2px 2px #A0A0A0' }}>
            Explore Our Tracks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {tracksData.map((track, index) => (
              <TrackCard key={track.id} track={track} index={index + 1} />
            ))}
          </div>
        </div>
      </section>
      {/* --- End NEW SECTION --- */}

    </motion.div> // End Main outer container
  );
};

export default Dashboard;
