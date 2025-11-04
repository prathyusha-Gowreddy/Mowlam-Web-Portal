// API Configuration
// IMPORTANT: Update the endpoint paths below based on your Swagger documentation at http://localhost:5000/swagger
export const API_BASE_URL = 'http://localhost:5000';

// API Endpoints
// Check your Swagger docs to find the exact login endpoint path
export const API_ENDPOINTS = {
  LOGIN: '/api/Auth/login',
  // Add other endpoints as needed:
  // LOGOUT: '/api/Auth/logout',
  // USER_PROFILE: '/api/user/profile',
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Handle body serialization if it's an object
  let body = options.body;
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  const config = {
    ...defaultOptions,
    ...options,
    body: body || options.body,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle empty responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    if (!response.ok) {
      const errorData = isJson 
        ? await response.json().catch(() => ({ message: 'An error occurred' }))
        : { message: `HTTP error! status: ${response.status}` };
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    // Return JSON if available, otherwise return text or empty
    if (isJson) {
      return await response.json();
    } else if (response.status === 204 || response.status === 201) {
      return { success: true };
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

