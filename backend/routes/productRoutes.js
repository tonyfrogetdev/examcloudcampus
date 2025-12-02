// routes/productRoutes.js
const express = require('express');
const { getProducts, updateProductStock } = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @route GET /api/products
 * @description Récupère tous les produits
 * @access Public
 */
router.get('/', getProducts);

/**
 * @route PUT /api/products/:productId/stock
 * @description Met à jour le stock d'un produit
 * @access Privé (Admin uniquement)
 */
router.put("/:productId/stock", authenticateToken, isAdmin, updateProductStock);

module.exports = router;