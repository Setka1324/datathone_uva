import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [data, setData] = useState({
    tracks: [],
    submissions: [],
    stats: { totalTracks: 0, activeSubmissions: 0, pendingReviews: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch public endpoints first
        const [tracksRes, submissionsRes] = await Promise.all([
          fetch('/api/tracks'),
          fetch('/api/submissions')
        ]);

        // Handle HTTP errors
        if (!tracksRes.ok) throw new Error(`Tracks fetch failed: ${tracksRes.status}`);
        if (!submissionsRes.ok) throw new Error(`Submissions fetch failed: ${submissionsRes.status}`);

        const [tracks, submissions] = await Promise.all([
          tracksRes.json(),
          submissionsRes.json()
        ]);

        setData({
          tracks,
          submissions,
          stats: {
            totalTracks: tracks.length,
            activeSubmissions: submissions.length,
            pendingReviews: submissions.filter(s => s.status === 'Pending').length
          }
        });
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="animate-fade-in flex justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full"
      />
    </div>
  );

  if (error) return (
    <div className="animate-fade-in p-8 text-red-600">
      Error: {error}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8 animate-fade-in bg-gray-900 min-h-screen z-2"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 p-6 rounded-xl border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/70"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-cyan-300 mb-2 font-mono">TOTAL TRACKS</p>
              <p className="text-4xl font-bold text-cyan-400 neon-text">
                {data.stats.totalTracks}
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-cyan-400">🧙</span>
            </div>
          </div>
        </motion.div>

        {/* Add similar cyberpunk-style cards for other stats */}
      </div>

      {/* Tracks Section */}
      <motion.section 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-pink-400 mb-6 font-mono glitch-text" data-text="AVAILABLE TRACKS">
          AVAILABLE TRACKS
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.tracks.map(track => (
            <motion.div
              key={track.id}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl border-2 border-purple-400 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/70 transition-all"
            >
              <h3 className="text-xl font-bold text-purple-300 mb-2 font-mono">
                {track.name}
              </h3>
              <p className="text-cyan-200 mb-4">{track.description}</p>
              <Link
                to="/about"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:brightness-125 transition-all duration-300 font-mono text-sm uppercase tracking-wide"
              >
                ACCESS TERMINAL →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Submissions Section */}
      <motion.section 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-3xl font-bold text-green-400 mb-6 font-mono glitch-text" data-text="RECENT UPLOADS">
          RECENT UPLOADS
        </h2>
        <div className="bg-gray-800 rounded-xl border-2 border-green-400 shadow-lg shadow-green-500/20">
          {data.submissions.map(submission => (
            <motion.div
              key={submission.id}
              whileHover={{ x: 5 }}
              className="p-6 border-b border-green-900/50 last:border-b-0 hover:bg-gray-700/30 transition-colors group rounded-xl"
            >
              <div className="flex justify-between items-center rounded-xl">
                <div>
                  <h3 className="font-bold text-green-300 group-hover:text-green-200 transition-colors rounded-xl">
                    UPLOAD #{submission.id}
                  </h3>
                  <p className="text-cyan-300 text-sm mt-1 rounded-xl">
                    TRACK {submission.track_id} • 
                    {new Date(submission.submission_date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm font-mono rounded-xl ${
                  submission.status === 'Pending' 
                    ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-400/50' 
                    : 'bg-green-900/30 text-green-400 border border-green-400/50'
                }`}>
                  {submission.status.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;