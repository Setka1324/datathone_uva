// src/api-helper/auth.js
import axios from 'axios';

// Base URL for your Flask backend
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5001';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://datathon-backend-626383641337.europe-west4.run.app';

// Create an Axios instance for API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Registers an individual user.
 * @param {object} userData - Object containing name, email, password, expertise.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {object} - An error object with message and status.
 */
export const registerIndividual = async (userData) => {
  try {
    // Includes '/api/auth' prefix based on Flask Blueprint registration
    const response = await apiClient.post('/api/auth/register/individual', userData);
    // Check if the response indicates success based on your backend structure
    if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Registration failed: Unknown error');
    }
    return response.data;
  } catch (error) {
    console.error("API Error (Individual Reg):", error.response || error.message);
    // Prioritize backend error message if available
    const message = error.response?.data?.error || error.response?.data?.message || `Request failed: ${error.message || 'Network Error or CORS issue'}`;
    throw { message: message, status: error.response?.status };
   }
};

/**
 * Registers a team.
 * @param {object} teamData - Object containing teamName, description, and members array.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {object} - An error object with message and status.
 */
export const registerTeam = async (teamData) => {
  try {
    // Map frontend state names to backend expected names if necessary
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
     // Check if the response indicates success based on your backend structure
    if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Team registration failed: Unknown error');
    }
    return response.data;
  } catch (error) {
    console.error("API Error (Team Reg):", error.response || error.message);
    // Prioritize backend error message if available
    const message = error.response?.data?.error || error.response?.data?.message || `Request failed: ${error.message || 'Network Error or CORS issue'}`;
    throw { message: message, status: error.response?.status };
  }
};

/**
 * Logs in a user.
 * @param {object} credentials - Object containing email and password.
 * @returns {Promise<object>} - The response data from the API (including tokens and user info).
 * @throws {object} - An error object with message and status.
 */
export const loginUser = async (credentials) => {
  try {
    // Includes '/api/auth' prefix based on Flask Blueprint registration
    const response = await apiClient.post('/api/auth/login', credentials);
    // Check if the response indicates success based on your backend structure
    if (!response.data || !response.data.success) {
      // Use the specific error message from the backend if available
      throw new Error(response.data?.error || 'Login failed: Unknown error');
    }
    // Successful login, return the data (tokens, user info)
    return response.data;
  } catch (error) {
    console.error("API Error (Login):", error.response || error.message);
    // Prioritize backend error message ('Invalid credentials', 'Missing email or password')
    // Fallback to generic error message
    const message = error.response?.data?.error || error.response?.data?.message || `Login failed: ${error.message || 'Network Error or CORS issue'}`;
    throw { message: message, status: error.response?.status };
  }
};
