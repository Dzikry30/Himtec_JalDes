import axios from 'axios';

// Pastikan port 8000 ini sama dengan yang muncul di terminal Laravel lo (php artisan serve)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;