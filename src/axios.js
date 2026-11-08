import axios from 'axios';

// Otomatis mendeteksi apakah sedang diakses via localhost atau Ngrok
const getBaseUrl = () => {
  const hostname = window.location.hostname;
  
  // Kalau diakses lewat ngrok, arahkan ke /api domain ngrok tersebut
  if (hostname.includes('ngrok-free.dev') || hostname.includes('ngrok-free.app')) {
    return `${window.location.protocol}//${window.location.host}/api`;
  }
  
  // Default untuk development lokal
  return 'http://127.0.0.1:8000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
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

export default api;