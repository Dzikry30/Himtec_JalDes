import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Otomatis nempelin Token kalau user udah login
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Kalau token ditolak server (401), hapus sesi lalu kembali ke login
api.interceptors.response.use(
  response => response,
  error => {
    const isLoginRequest = error.config?.url?.includes('/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;