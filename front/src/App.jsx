import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "/src/components/Header.jsx";
import Footer from "/src/components/Footer.jsx";
import Dashboard from "/src/pages/Dashboard.jsx";
import Contact from "/src/pages/Contact.jsx";
import Faq from "/src/pages/Faq.jsx";
import Register from "/src/pages/Register.jsx";
import Login from '/src/pages/Login'; // Adjust path




// --- Define Background Image Path ---
// IMPORTANT: Use the correct path to the image you want as the background
// Needs to be accessible from the public folder or imported
const dashboardBackgroundUrl = '/assets/image1.png'; // Or .svg
// --- End Background Image Path ---


// Inner component to access location hook
function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    // Add 'relative' to allow absolute positioning of children
    // Keep flex structure for footer
    <div className="relative flex flex-col min-h-screen">

      {/* Conditionally render background ONLY on HomePage */}
      {isHomePage && (
        <img
          src={dashboardBackgroundUrl}
          alt="Homepage background"
          // Position absolute, full size, behind everything else (low z-index)
          className="absolute top-0 left-0 w-full h-auto object-cover z-0"
          // You might need min-h-screen if the image is shorter than the screen
          // and you want it to always cover the initial view height.
          // style={{ minHeight: '100vh' }} // Optional: If image needs to stretch vertically
        />
      )}

      {/* Header: Positioned absolutely, full width, high z-index */}
      {/* Ensure Header component itself has NO background style */}
      <div className="absolute top-0 left-0 w-full z-30"> {/* Increased z-index */}
         <Header />
      </div>


      {/* Main content area */}
      {/* Added pt-20 (adjust as needed) to prevent content on non-home pages
          from hiding under the absolute header.
          On the homepage, Dashboard content might intentionally render under
          the transparent header, so internal padding in Dashboard is key.
      */}
      <main className={`flex-grow z-10 ${!isHomePage ? 'pt-20 md:pt-24' : ''}`}> {/* Add padding only if NOT homepage */}
          {/* Removed specific pt for homepage - let dashboard handle its top space */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tracks" element={<Faq />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes like /login, /community */}
          {/* <Route path="/login" element={<Login />} /> */}
           {/* <Route path="/community" element={<Community />} />  Assuming Community component exists */}

        </Routes>
      </main>

      {/* Footer remains at the bottom */}
      <Footer />
    </div>
  );
}


// Main App component wraps Layout with Router
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;