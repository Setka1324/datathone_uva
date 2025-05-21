import React from 'react'; // Ensure React is imported
import { Link } from "react-router-dom";

// Example track data - in a real app, this might come from props or an API
const datathonTracks = [
  {
    id: 1,
    title: "Track 1: Predictive Maintenance for Industrial IoT",
    description: "Utilize sensor data from industrial equipment to build models that predict potential failures. Aim to optimize maintenance schedules, reduce downtime, and extend equipment lifespan. Datasets include time-series sensor readings, maintenance logs, and equipment specifications.",
    keywords: ["IoT", "Time Series", "Predictive Analytics", "Manufacturing"],
  },
  {
    id: 2,
    title: "Track 2: AI in Sustainable Agriculture",
    description: "Develop AI-driven solutions to enhance agricultural sustainability. Focus on optimizing crop yields, reducing water and pesticide usage, or improving soil health monitoring. Datasets may include satellite imagery, weather patterns, soil sensor data, and crop information.",
    keywords: ["Sustainability", "Computer Vision", "Environmental AI", "Agriculture Tech"],
  },
  {
    id: 3,
    title: "Track 3: Healthcare Data Anonymization & Insights",
    description: "Explore techniques for robustly anonymizing sensitive healthcare datasets while preserving their utility for research. Subsequently, derive meaningful insights from the anonymized data to improve patient outcomes or healthcare efficiency. Ethical considerations are paramount.",
    keywords: ["Healthcare", "Data Privacy", "Anonymization", "Machine Learning", "Ethics"],
  },
  {
    id: 4,
    title: "Track 4: Smart City Traffic Flow Optimization",
    description: "Leverage diverse urban datasets (traffic sensors, public transport schedules, event data) to create models that optimize traffic flow, reduce congestion, and minimize carbon emissions in a smart city context. Solutions could involve dynamic signal timing or route recommendations.",
    keywords: ["Smart Cities", "Urban Mobility", "Optimization", "Data Simulation"],
  },
];

function Faq() { // Component name remains Faq as requested
  return (
    <main className="flex flex-col items-center p-4 sm:p-6 md:p-8 text-black font-pixel min-h-screen">
      {/* Main Page Container - Light gray background, pixel font */}
      
      {/* Title - Styled like a window title bar */}
      <div className="w-full max-w-3xl mb-8">
        <div className="bg-[#000080] text-white flex items-center justify-center px-3 py-2 border-2 border-r-black border-b-black border-l-white border-t-white">
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider">
            DATATHON UVA - AVAILABLE TRACKS
          </h1>
        </div>
      </div>

      {/* Tracks List */}
      <ul className="w-full max-w-3xl space-y-6">
        {datathonTracks.map((track) => (
          <li 
            key={track.id} 
            className="bg-[#C0C0C0] p-4 border-2 border-r-black border-b-black border-l-white border-t-white"
            // Styling for each track item - similar to a window panel
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2 border-b border-gray-500 pb-1">
              {track.title}
            </h2>
            <p className="text-sm sm:text-base mb-3 leading-relaxed font-sans"> 
              {/* Using sans-serif for better readability of longer descriptions */}
              {track.description}
            </p>
            <div className="text-xs">
              <span className="font-semibold">Keywords:</span> 
              <span className="font-sans ml-1">{track.keywords.join(", ")}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Navigation Links - Styled like retro buttons */}
      <div className="mt-10 mb-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Link
          to="/" // Assuming "/" is your dashboard path
          className="bg-[#C0C0C0] text-black font-pixel text-sm px-6 py-2 border-2 border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-1 text-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default Faq;



// [/Users/Skye/.zshrc]