// Configuration centralisée des URLs API

// Détection automatique de l'environnement
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// URLs de base selon l'environnement
export const API_BASE_URL = isDevelopment
  ? 'http://localhost:5000/api'
  : 'https://backend-cloudcampus.onrender.com/api';

export const WS_BASE_URL = isDevelopment
  ? 'ws://localhost:3000/ws'
  : 'wss://backend-cloudcampus.onrender.com/ws'; 
export default API_BASE_URL;
