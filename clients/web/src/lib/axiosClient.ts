import { refreshAccessToken } from '@/services/auth';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

// Response Interceptor
// axiosClient.ts — interceptor sketch
axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      await refreshAccessToken(); // rotate cookie
      return axiosClient(error.config);  // retry original request
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
