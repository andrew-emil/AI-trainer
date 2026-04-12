import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 Unauthorized and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to hit the refresh endpoint
        // We don't need to pass tokens, cookies are sent automatically
        await axios.post(`${baseURL}/api/auth/refresh`, {}, {
          withCredentials: true
        });

        // If successful, the new accessToken cookie is now set
        // Retry the original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // The refresh token is also expired or invalid
        // Redirect to login or clear auth state
        console.error("Session expired. Please log in again.");
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
