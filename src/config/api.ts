import axios from 'axios';
import { Platform } from 'react-native';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from '../utils/authStorage';

const BASE_URL =
  Platform.OS === 'android'
    ? 'http://192.168.43.15:5000'
    : 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// === Interceptor Request ===
api.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// === Interceptor Response ===
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check jika error 401 dan bukan retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Jika sudah dalam proses refresh, tambahkan ke queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // PENTING: Kirim refresh token di header Authorization
        console.log('🔄 Attempting to refresh token...');

        const response = await axios.post(
          `${BASE_URL}/api/auth/refresh-token`,
          {}, // Body kosong
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        console.log('✅ Token refreshed successfully');

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        // Simpan token baru
        await saveTokens(
          accessToken,
          newRefreshToken || refreshToken, // Gunakan refresh token lama jika tidak ada yang baru
        );

        // Update default header
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // Process queue dengan token baru
        processQueue(null, accessToken);

        // Retry original request dengan token baru
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        // Jika refresh token juga gagal/expired
        console.error(
          '❌ Token refresh failed:',
          refreshError.response?.data || refreshError.message,
        );
        processQueue(refreshError, null);

        // Clear tokens dan redirect ke login
        await clearTokens();

        // Anda bisa emit event atau navigate ke login screen
        // EventEmitter.emit('SESSION_EXPIRED');

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
