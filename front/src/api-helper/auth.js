// src/api/auth.js
import axios from 'axios';

// Base URL for your Flask backend
const API_BASE_URL = 'http://127.0.0.1:5001'; // Ensure this matches your running backend

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerIndividual = async (userData) => {
  try {
    // Includes '/api/auth' prefix based on Flask Blueprint registration
    const response = await apiClient.post('/api/auth/register/individual', userData);
    return response.data;
  } catch (error) {
    console.error("API Error (Individual Reg):", error.response || error.message);
    const message = error.response?.data?.message || `Request failed: ${error.message || 'Network Error or CORS issue'}`;
    throw { message: message, status: error.response?.status };
   }
};

export const registerTeam = async (teamData) => {
  try {
    const payload = {
        team_name: teamData.teamName,
        description: teamData.description,
        members: teamData.members.map(m => ({
            name: m.name,
            email: m.email,
            password: m.password,
            expertise: m.expertise
        }))
    };
    // Includes '/api/auth' prefix based on Flask Blueprint registration
    const response = await apiClient.post('/api/auth/register/team', payload);
    return response.data;
  } catch (error) {
    console.error("API Error (Team Reg):", error.response || error.message);
    const message = error.response?.data?.message || `Request failed: ${error.message || 'Network Error or CORS issue'}`;
    throw { message: message, status: error.response?.status };
  }
};