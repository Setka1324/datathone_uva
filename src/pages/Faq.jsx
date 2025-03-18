import { Link } from "react-router-dom";

function Faq() {
  return (
    <main className="flex flex-col items-center p-5 text-gray-900 min-h-screen">
      {/* Title */}
      <h1 className="text-5xl font-bold text-green-600 mb-8 drop-shadow-md">
        Air Quality in Europe
      </h1>

      <ul className="w-full max-w-2xl space-y-6">
        <li className="bg-green-100 p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">What is Air Quality?</h2>
          <p className="text-gray-700">Air quality refers to the condition of the air in our environment. It is measured by the presence of pollutants such as PM2.5, PM10, NO2, and CO2.</p>
        </li>
        <li className="bg-green-100 p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">Why is Air Quality Important?</h2>
          <p className="text-gray-700">Poor air quality can cause respiratory diseases, heart conditions, and other health issues. It also affects climate change and biodiversity.</p>
        </li>
        <li className="bg-green-100 p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">What Are the Main Pollutants?</h2>
          <p className="text-gray-700">Common pollutants include particulate matter (PM2.5, PM10), nitrogen dioxide (NO2), carbon monoxide (CO), and volatile organic compounds (VOCs).</p>
        </li>
        <li className="bg-green-100 p-5 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700">How Can I Reduce My Exposure?</h2>
          <p className="text-gray-700">Stay informed about air quality levels, use air purifiers, avoid high-traffic areas, and support clean energy solutions.</p>
        </li>
      </ul>

      {/* Navigation */}
      <div className="mt-6 flex space-x-4">
        <Link
          to="/"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/contact"
          className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}

export default Faq;
