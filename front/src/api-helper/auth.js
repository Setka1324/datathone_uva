// src/api-helper/auth.js
import axios from 'axios';

const TARGET_AUDIENCE_URL = '34.8.239.212'; // The URL of your backend service
const METADATA_SERVER_TOKEN_URL = `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${TARGET_AUDIENCE_URL}`;

// Fallback for local development where VITE_API_BASE_URL might be set,
// or when metadata server is not available.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dice-impact.com'; // Use your custom domain here

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the OIDC token from metadata server (when running on Cloud Run)
const getIdToken = async () => {
  // This environment variable is automatically set by Cloud Run
  if (import.meta.env.PROD && window.GoogleComputeEng) { // A way to check if running on GCP environment; window.GoogleComputeEng might not be reliable.
                                                         // A better check is if a specific Cloud Run env var is present, e.g., K_SERVICE.
                                                         // Or, more simply, attempt the fetch and fallback if it fails.
    try {
      const response = await fetch(METADATA_SERVER_TOKEN_URL, {
        headers: {
          'Metadata-Flavor': 'Google',
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch ID token from metadata server:', response.status);
        return null;
      }
      const token = await response.text();
      return token;
    } catch (error) {
      console.error('Error fetching ID token:', error);
      return null;
    }
  }
  return null; // Not on Cloud Run or error fetching
};

// Interceptor to add the token to requests
apiClient.interceptors.request.use(async (config) => {
  // Only add token if we are likely on Cloud Run and calling the production backend
  // This logic might need refinement based on how VITE_API_BASE_URL is used.
  // If API_BASE_URL is the production URL, try to get a token.
  if (config.baseURL === TARGET_AUDIENCE_URL) {
    const token = await getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Your existing API functions (registerIndividual, registerTeam, loginUser)
// remain largely the same but will now use the modified apiClient.

export const registerIndividual = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/register/individual', userData);
    if (!response.data || !response.data.success) {
        // Prefer backend's specific error message if available in response.data.errors (from Marshmallow)
        // or response.data.error (from your manual checks)
        const errorDetail = response.data?.errors || response.data?.error || response.data?.message || 'Registration failed: Unknown error';
        throw new Error(typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail));
    }
    return response.data;
  } catch (error) {
    console.error("API Error (Individual Reg):", error.response || error);
    const message = error.response?.data?.errors || error.response?.data?.error || error.response?.data?.message || `Request failed: ${error.message || 'Network Error or CORS issue'}`;
    // Ensure message is a string before throwing
    const finalMessage = typeof message === 'string' ? message : JSON.stringify(message);
    throw { message: finalMessage, status: error.response?.status || error.status };
   }
};

export const registerTeam = async (teamData) => {
  try {
    // Construct the payload to match backend expectations (TeamRegistrationSchema)
    const payload = {
        team_name: teamData.teamName,
        team_password: teamData.teamPassword, // This was missing
        description: teamData.description,
        members: teamData.members // The members array from teamData is already correctly structured
                                 // with { name, email, expertise }
    };
    const response = await apiClient.post('/api/auth/register/team', payload);
    if (!response.data || !response.data.success) {
        const errorDetail = response.data?.errors || response.data?.error || response.data?.message || 'Team registration failed: Unknown error';
        throw new Error(typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail));
    }
    return response.data;
  } catch (error) {
    console.error("API Error (Team Reg):", error.response || error);
    const message = error.response?.data?.errors || error.response?.data?.error || error.response?.data?.message || `Request failed: ${error.message || 'Network Error or CORS issue'}`;
    const finalMessage = typeof message === 'string' ? message : JSON.stringify(message);
    throw { message: finalMessage, status: error.response?.status || error.status };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    if (!response.data || !response.data.success) {
      const errorDetail = response.data?.errors || response.data?.error || response.data?.message || 'Login failed: Unknown error';
      throw new Error(typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail));
    }
    return response.data;
  } catch (error) {
    console.error("API Error (Login):", error.response || error);
    const message = error.response?.data?.errors || error.response?.data?.error || error.response?.data?.message || `Login failed: ${error.message || 'Network Error or CORS issue'}`;
    const finalMessage = typeof message === 'string' ? message : JSON.stringify(message);
    throw { message: finalMessage, status: error.response?.status || error.status };
  }
};