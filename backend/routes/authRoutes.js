// backend/routes/authRoutes.js
const express = require('express');
const { login, register } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @description Connexion utilisateur
 * @access Public
 */
router.post('/login', login);

/**
 * @route POST /api/auth/register
 * @description Inscription utilisateur
 * @access Public
 */
router.post('/register', [
    body('username').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').trim()
], register);

module.exports = router;
