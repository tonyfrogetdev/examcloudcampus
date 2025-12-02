// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./config/db');
const logger = require('./config/logger'); // Winston

const app = express();
connectDB();

// Sécurité HTTP
app.use(helmet());

// CORS uniquement pour le frontend Render
app.use(cors({
  origin: ["https://exam-frontend.onrender.com"],
  credentials: true
}));

// Limitation de requêtes
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}));

// JSON parser
app.use(express.json());

// Logs de démarrage
logger.info("Serveur initialisé", { env: process.env.NODE_ENV });

// Routes API
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Endpoint pour monitoring
app.get('/health', (req, res) => {
  logger.info("Health check effectué");
  res.json({ status: "ok" });
});

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Serveur en écoute`, { port: PORT });
});
