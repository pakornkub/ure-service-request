import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_URL;
// const TIMEOUT = 60 * 10000;

function getToken(): string | null {
  try {
    return JSON.parse(localStorage.getItem('accessToken') || 'null');
  } catch {
    return null;
  }
}

//* Add a request interceptor
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    config.baseURL = BASE_URL;
    // config.timeout = TIMEOUT;
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'multipart/form-data';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    // toast.error('An error occurred while sending the request', { position: 'bottom-right' });
    return Promise.reject(error);
  }
);

//* Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle Unauthorized case
      toast.error('Please log in again', { position: 'bottom-right' });
      // Add code for logout or redirect to login page here
      return;
    }

    // toast.error('An error occurred while fetching data', { position: 'bottom-right' });
    return Promise.reject(error);
  }
);

export const httpClient = axios;
