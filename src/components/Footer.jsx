function Footer() {
  return (
    <footer className="bg-green-800 text-white py-4 mt-auto z-100">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Site Logo */}
        <span className="text-xl font-bold text-yellow-400">EcoVision</span>

        {/* Links */}
        <div className="flex space-x-6 my-2 md:my-0">
          <a href="https://climate.nasa.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">NASA Climate</a>
          <a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">IPCC Reports</a>
          <a href="https://www.un.org/en/climatechange" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">UN Climate</a>
        </div>

        {/* Copyright */}
        <small className="text-gray-300 text-sm text-center md:text-right">
          &copy; 2025 EcoVision. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
