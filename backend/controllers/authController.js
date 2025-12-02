// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // modèle utilisateur
require('dotenv').config();
const axios = require('axios');
const authLog = require('debug')('authRoutes:console')
//const sendEmail = require('../services/emailService');

/**
 * Authentifie un utilisateur
 * @param {Object} req - Requête Express
 * @param {Object} req.body - Corps de la requête
 * @param {string} req.body.username - Nom d'utilisateur
 * @param {string} req.body.password - Mot de passe
 * @param {Object} res - Réponse Express
 * @returns {Object} Token JWT et informations utilisateur
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  authLog(`username is ${username} password is ${password}`);

  if (!username || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    const user = await User.findOne({ username });
    authLog(`user is ${JSON.stringify(user)}`)
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    authLog(`token is ${token}`)

    res.json({ token, role: user.role, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


/**
 * Enregistre un nouvel utilisateur
 * @param {Object} req - Requête Express
 * @param {Object} req.body - Corps de la requête
 * @param {string} req.body.username - Nom d'utilisateur
 * @param {string} req.body.email - Email de l'utilisateur
 * @param {string} req.body.password - Mot de passe (sera hashé)
 * @param {Object} res - Réponse Express
 * @returns {Object} Message de succès
 */
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  authLog(`username is ${username} email is ${email} password is ${password}`);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      authLog(`user exist => ${JSON.stringify(existingUser)}`)
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const user = new User({ username, email, password });
    await user.save();

    authLog(`user after creation => ${JSON.stringify(user)}`)

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};