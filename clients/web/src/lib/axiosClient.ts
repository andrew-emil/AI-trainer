/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokenStore } from '@/store/tokenStore';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const url = import.meta.env.VITE_API_URL;

export const axiosClient = axios.create({
  baseURL: `${url}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/* Queue to hold requests while refresh is in-progress */
type QueueItem = {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
};
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else {
      if (token && prom.config.headers) {
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      }
      prom.resolve(axiosClient(prom.config));
    }
  });
  failedQueue = [];
};

/* Attach access token to requests */
axiosClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

/* Response interceptor -> refresh flow */
axiosClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config?: AxiosRequestConfig }) => {
    const originalConfig = err.config!;
    if (!originalConfig) return Promise.reject(err);

    const status = err.response?.status;

    // If unauthorized and we didn't already retry this request
    if (status === 401 && !(originalConfig as any)._retry) {
      (originalConfig as any)._retry = true;

      if (isRefreshing) {
        // enqueue and wait
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig });
        });
      }

      isRefreshing = true;
      try {
        // call refresh endpoint (withCredentials true -> send cookie)
        const resp = await axios.post(
          `${url}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = (resp.data as any).accessToken;
        if (!newAccessToken) throw new Error("No access token in refresh response");

        tokenStore.set(newAccessToken);
        processQueue(null, newAccessToken);

        // retry original request with new token
        if (originalConfig.headers) {
          originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        return axiosClient(originalConfig);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // optionally: emit logout event here
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);
