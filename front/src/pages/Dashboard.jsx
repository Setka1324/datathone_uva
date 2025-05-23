import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// In front/src/components/Dashboard.jsx (or wherever this component is)
const iconPaths = {
  when: '/assets/email-emoji-smile-smart--Streamline-Pixel.svg',
  where: '/assets/map-navigation-pin-location-1--Streamline-Pixel.svg',
  who: '/assets/user-man-love--Streamline-Pixel.svg',
  what: '/assets/search-coding--Streamline-Pixel.svg',
  trophy: '/assets/Frame_272.svg', // Assuming Frame 272.svg is also in public/assets
};

// Mock data for the track cards
const tracksData = [
  {
    id: 1,
    title: 'Track 1 - Campus Wellbeing & Movement',
    datasetText: 'Explore the relationship between student wellbeing and their campus experience. This track uses longitudinal data from over 200 students, including their movement patterns, the types of locations they visited, and their responses to mental health surveys collected over time.',
    directionsText: 'How does movement correlate with student wellbeing? Are there patterns in movement and stress levels over time? Based on your analysis and additional research, design an intervention for a more supportive and healthy university environment.',
  },
  {
    id: 2,
    title: 'Track 2 - European Values & Societal Change',
    datasetText: 'This dataset covers almost 40 years of survey data from many European of values about family, work, religion, politics, and society.',
    directionsText: "In an era marked by rising anti-democratic sentiments and increasing polarization, can we trace these trends back to fundamental changes in individual values? How do these value shifts differ across European regions? By analysing the long-term (regional) trends and additional research, design an intervention to create more democratic societies.",
  },
  {
    id: 3,
    title: 'Track 3 - News Media & Societal Division',
    datasetText: 'For this track, you will be provided with a dataset containing thousands of news headlines/descriptions. Note: For the data analysis, NLP is required.',
    directionsText: 'What is the role of news media in reinforcing societal divisions? How are sentiments in headlines evolving over time? Based on your analysis and additonal research, design an intervention for less biased and divisive public discourse.',
  },
  {
    id: 4,
    title: 'Track 4 - Sustainability & Global Inequality', 
    datasetText: 'This dataset contains many variables related to sustainability, especially water, and how these have changed over time.',
    directionsText: 'In a world of climate change and ever intensifying extreme weather events, we need to be more sustainable with our limited resources. Water scarcity has been an increasing issue - what factors are contributing to it? Which areas are especially affected? And how can we make sure water is being shared fairly, across the globe? Using data analysis and additional research, design an intervention to improve fairness.',
  },
];

// Reusable Track Card Component
const TrackCard = ({ track, index }) => {
  return (
    <motion.div
      className="bg-gray-100 border-2 border-black flex flex-col" 
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
      <div className="p-4 flex-grow flex flex-col"> 
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

        <div className="mt-auto pt-2 text-center">
          <button
            type="button"
            className="font-pixel uppercase text-xs bg-gray-200 text-black border-2 border-black hover:bg-gray-300 transition-colors px-4 py-2 shadow-sm"
          >
            AVAILABLE SOON!
          </button>
        </div>
      </div>
    </motion.div>
  );
};


const Dashboard = () => {
  const blueGridBackgroundStyle = {
    backgroundColor: '#93c5fd', 
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px', 
  };

  // MODIFIED: Scroll handler to target the tracks section
  const handleScrollToTracks = () => {
    const tracksSection = document.getElementById('tracks-section');
    if (tracksSection) {
      tracksSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-full text-center px-4 pt-36" 
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-white mb-8 uppercase tracking-wider" style={{ textShadow: '2px 2px #333' }}>
        Welcome to the
      </h1>

      <div className="bg-gray-100 border-4 border-black shadow-lg w-full max-w-3xl relative">
        <div className="bg-purple-600 text-white flex items-center justify-between px-4 py-2 border-b-4 border-black font-pixel">
           <span className="font-bold text-sm md:text-base uppercase">D.I.C.E Impact-thon</span>
        </div>
        <div className="p-6 md:p-8 pb-16 sm:pb-24 md:pb-28 text-left text-sm md:text-base leading-relaxed text-black font-sticknobills">
          <p className="mb-6">
            The D.I.C.E. ImpactThon is a 3-day challenge where UvA students from all
            backgrounds come together to create data-driven, ethically grounded,
            digital interventions for real-world problems. You can choose between four different tracks: psychology, social science, political science and sustainability.
            We'll have food!
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <img src={iconPaths.when} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span>
                <span className="font-semibold">
                  When:
                </span> 2-4 June 2025
              </span>
            </li>
            <li className="flex items-start">
            <span>
                Opening event: Monday 2nd, 5pm. Closing event: Wednesday 4th, 5pm. Time in between can be scheduled to personal preference.
              </span>
            </li>
            <li className="flex items-start">
              <img src={iconPaths.where} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Where:</span> JK Building, Roeterselland Campus UvA</span>
            </li>
            <li className="flex items-start">
              <img src={iconPaths.who} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Who:</span> All UvA students welcome, prior skills in research, data analysis or design are welcome</span>
            </li>
            <li className="flex items-start">
              <img src={iconPaths.what} alt="" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">What:</span> Join solo or as a team, pick a role and co-create a digital intervention.
              During the event, you will choose a track, decide on a direction with your team, and by combining
              data analysis and research, you will design - or create - a suitable intervention.
              This could be a design/prototype for a tool (using e.g. Canva, Figma), or even the tool itself (using e.g. Lovable).<br/>
              More information will be provided during the introduction event.<br/>
              Snacks/food will be available during the introduction event (Monday, 5pm) and closing event (Wednesday, 5pm).<br/>
              Follow our <a href="https://www.instagram.com/dice_impact/">Instagram</a> for more up-to-date information.</span>
            </li>
          </ul>
          <p className="text-center font-bold text-lg md:text-xl my-0 mb-0 uppercase font-pixel">
            Want to know more?
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full px-4 sm:px-0 sm:w-auto">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link
                    // MODIFIED: Using onClick with the new handler.
                    // Note: If this Link component was meant to navigate elsewhere (e.g., to="/#tracks-section"),
                    // that would be a different approach using react-router-hash-link or similar.
                    // For now, assuming it's just a scroll trigger on the current page.
                    onClick={handleScrollToTracks}
                    className="font-pixel uppercase
                               px-4 py-2 text-xs
                               sm:px-6 sm:py-3 sm:text-sm 
                               md:text-base
                               bg-gray-100 text-black border-2 border-black hover:bg-gray-300 transition-colors shadow-md whitespace-nowrap cursor-pointer" // Added cursor-pointer
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
      </div>

      {/* --- NEW SECTION: Explore Our Tracks --- */}
      <section 
        id="tracks-section" // ADDED ID for scrolling target
        className="w-full py-16 mt-20 md:mt-28" 
        style={blueGridBackgroundStyle}
      >
        <div className="container mx-auto px-4"> 
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
    </motion.div>
  );
};

export default Dashboard;
