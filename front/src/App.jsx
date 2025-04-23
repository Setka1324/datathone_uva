import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "/src/components/Header.jsx";
import Footer from "/src/components/Footer.jsx";
import Dashboard from "/src/pages/Dashboard.jsx";
import Contact from "/src/pages/Contact.jsx";
import Faq from "/src/pages/Faq.jsx";
import CyberBackground from "/src/components/CyberBackground.jsx";
import Register from "/src/pages/Register.jsx"




function App() {

  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <CyberBackground />
        <Header />
        <main className="flex-grow p-5 bg-gray-900">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<Faq />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
