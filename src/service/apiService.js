import axios from 'axios';


// here is default base URL for all requests
const API_BASE_URL = import.meta.env.VITE_BASE_APP_URL;


// Instance of axios with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle GET requests
export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

// created for future use 
// Function to handle get Request with Params
// export const getRequestParams = async (endpoint, params = {}) => {
//   try {
//     const response = await api.get(endpoint, { params });
//     return response.data;
//   } catch (error) {
//     console.error('GET request error:', error);
//     throw error;
//   }
// };

// Function to handle POST requests
// created for future use 
// export const postRequest = async (endpoint, data) => {
//   try {
//     const response = await api.post(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error('POST request error:', error);
//     throw error;
//   }
// };

// Function to handle PUT requests
// created for future use 
// export const putRequest = async (endpoint, data) => {
//   try {
//     const response = await api.put(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error('PUT request error:', error);
//     throw error;
//   }
// };

// Function to handle DELETE requests
// created for future use 
// export const deleteRequest = async (endpoint) => {
//   try {
//     const response = await api.delete(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error('DELETE request error:', error);
//     throw error;
//   }
// };

