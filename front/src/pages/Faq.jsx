import React from 'react'; // Ensure React is imported
import { Link } from "react-router-dom";

// Updated track data based on the Excel screenshot
const datathonTracks = [
  {
    id: 1,
    title: "Track 1: Psychology - Student Wellbeing and Movement Patterns",
    description: "For this track, you will use a dataset on student wellbeing and movement patterns. Analyse how wellbeing and campus environment relate and ultimately, how we can create an improved university for everyone. The dataset contains longitudinal data of over 200 students at Dartmouth College (USA), their movement data, types of locations visited, and mental health surveys.",
    potentialDirections: "How do movement and stress/anxiety levels affect each other? Consider movement interventions. Are there specific demographic factors or patterns over time?",
    considerations: "There is quite a lot of irregular time data, making it potentially difficult to find significant influences. It is also a relatively large dataset, so it takes a bit of time to get into. The alternative might be basic statistics on a much smaller dataset.",
    keywords: ["Psychology", "Wellbeing", "Movement Patterns", "Mental Health", "Student Life", "Data Analysis", "Campus Environment"],
    source: "https://studentlife.cs.dartmouth.edu/dataset.html",
  },
  {
    id: 2,
    title: "Track 2: Social Sciences - European Values and Anti-Democratic Trends",
    description: "A rise in anti-democratic values, increasing polarisation, and a perception of doom has evolved over recent decades, especially across Europe. How can this be explained by changes in individuals' values, and how can we combat it? This dataset covers almost 40 years of survey data from many European countries, on values about family, work, religion, politics, and society.",
    potentialDirections: "Explore changes in specific values over time. Correlate value changes with political or social trends. Identify factors contributing to shifts in democratic values.", // Inferred potential directions
    considerations: "It is a very complex dataset, but after selecting some interesting variables, it becomes more doable.",
    keywords: ["Social Sciences", "European Values", "Democracy", "Polarization", "Survey Data", "Sociology", "Political Science"],
    source: "https://search.gesis.org/research_data/ZA7503",
  },
  {
    id: 3,
    title: "Track 3: Social Sciences - News Headline Analysis (NLP)",
    description: "This track involves analysing headlines and descriptions of (political) news. It's an alternative dataset option to the European Values track.",
    potentialDirections: "Identify themes over time, track sentiment changes, and analyze polarization in news reporting. Could also involve scraping your own news data for a more targeted analysis.",
    considerations: "Requires some knowledge of Natural Language Processing (NLP). The provided dataset is US-focused, which might be a limitation or a specific area of focus.",
    keywords: ["Social Sciences", "NLP", "News Analysis", "Sentiment Analysis", "Polarization", "Media Studies"],
    source: "https://www.kaggle.com/datasets/rmisra/news-category-dataset",
  },
  // Kept one of the original tracks as an example if more are needed.
  // You can replace or add more based on your full list.
];

function Faq() { // Component name remains Faq as requested
  return (
    <main className="flex flex-col items-center p-4 sm:p-6 md:p-8 text-black font-pixel min-h-screen">
      {/* Main Page Container */}
      
      {/* Title - Styled like a window title bar */}
      <div className="w-full max-w-4xl mb-8"> {/* Increased max-width for better content fit */}
        <div className="bg-[#000080] text-white flex items-center justify-center px-3 py-2 border-2 border-r-black border-b-black border-l-white border-t-white">
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider">
            DATATHON UVA - AVAILABLE TRACKS
          </h1>
        </div>
      </div>

      {/* Tracks List */}
      <ul className="w-full max-w-4xl space-y-6"> {/* Increased max-width */}
        {datathonTracks.map((track) => (
          <li 
            key={track.id} 
            className="bg-[#C0C0C0] p-4 border-2 border-r-black border-b-black border-l-white border-t-white"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2 border-b border-gray-500 pb-1">
              {track.title}
            </h2>
            <p className="text-sm sm:text-base mb-3 leading-relaxed font-sans">
              {track.description}
            </p>
            {track.potentialDirections && (
              <div className="mb-3">
                <h3 className="text-sm font-semibold font-sans text-gray-700 mb-1">Potential Directions:</h3>
                <p className="text-sm font-sans leading-relaxed">{track.potentialDirections}</p>
              </div>
            )}
            {track.considerations && (
              <div className="mb-3">
                <h3 className="text-sm font-semibold font-sans text-gray-700 mb-1">Considerations:</h3>
                <p className="text-sm font-sans leading-relaxed">{track.considerations}</p>
              </div>
            )}
            <div className="text-xs mb-2">
              <span className="font-semibold">Keywords:</span> 
              <span className="font-sans ml-1">{track.keywords.join(", ")}</span>
            </div>
            {track.source && (
              <div className="text-xs">
                <span className="font-semibold">Source:</span> 
                <a 
                  href={track.source.startsWith("http") ? track.source.split(" ")[0] : undefined} // Attempt to get only the URL part
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans ml-1 text-blue-700 hover:underline break-all"
                >
                  {track.source}
                </a>
              </div>
            )}
             {track.usingIt && (
              <div className="text-xs mt-2 italic text-gray-600">
                <span className="font-semibold">Note:</span> 
                <span className="font-sans ml-1">{track.usingIt}</span>
              </div>
            )}
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
        {/* Removed Contact Us link as it wasn't in the original request for this page's content update */}
      </div>
    </main>
  );
}

export default Faq;




// [/Users/Skye/.zshrc]