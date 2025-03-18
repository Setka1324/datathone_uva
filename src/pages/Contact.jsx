import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message submitted! (Placeholder functionality)');
    console.log('Submitted Contact Form:', formData);
  };

  return (
    <div className="min-h-screen p-6 text-midnight">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">Contact Us</h1>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <label className="block mb-2">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />

          <label className="block mt-4 mb-2">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full" required />

          <label className="block mt-4 mb-2">Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} className="border p-2 w-full" required />

          <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
