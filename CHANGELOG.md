# CHANGELOG

# 02/12/2025 - Corrections bugs et sécurité

# E27 - Bugs corrigés

**Frontend**
- Register.js : les erreurs ne s'affichaient pas, maintenant elles apparaissent en rouge
- Login.js : pareil, ajout du message d'erreur sous le titre

**Backend**
- authController.js : validation des champs vides ajoutée (username, email, password)
- authController.js : vérification que le mot de passe fait au moins 6 caractères

# E28 - Sécurité

**Protection XSS**
- Installé express-validator dans le backend
- authRoutes.js : ajout de .trim() et .escape() sur les champs pour éviter les injections HTML/JS
- email validé avec .isEmail()

**CORS**
- server.js : CORS configuré pour autoriser seulement localhost:3000 et le frontend Render

**Rate limiting**
- server.js : limite de 100 requêtes par IP toutes les 15 minutes (protection contre force brute)

**Vulnérabilités**
- Backend : npm audit fix → toutes les vulnérabilités corrigées
- Frontend : npm audit fix → quelques vulnérabilités restantes mais elles cassent react-scripts

**Routes protégées**
- productRoutes.js : la route PUT est protégée avec authenticateToken et isAdmin

**JWT**
- JWT_SECRET dans .env est sécurisé (64 caractères aléatoires)

# E29 - Documentation

**Backend**
- authController.js : JSDoc ajouté sur login() et register()
- authRoutes.js : commentaires sur les routes (POST /api/auth/login et register)
- productRoutes.js : commentaires sur GET et PUT /api/products

**Frontend**
- Login.js : commentaire explicatif du composant
- Register.js : commentaire explicatif du composant

**Changelog**
- Ce fichier créé avec toutes les modifications

---

# 02/12/2025 - Version initiale

**Backend**
- Authentification avec JWT
- Routes produits
- MongoDB Atlas
- Gateway
- Microservices notifications et stock

**Frontend**
- React avec pages Home, Login, Register, Products
- Authentification JWT
- Axios pour les appels API

**Déploiement**
- Backend sur Render : https://backend-cloudcampus.onrender.com
- Frontend sur Render :https://front-end-cloud-campus.onrender.com
- Base de données : MongoDB Atlas
- CI/CD avec GitHub Actions
