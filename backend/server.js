// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./config/db');

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
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100
}));

// JSON parser
app.use(express.json());

// Routes API
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Endpoint de test /health
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});


// test pour autodeploy