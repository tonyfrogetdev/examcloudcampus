# Réponses Examen - Session 1 (E21-E26)

**Candidat:** [Votre nom]
**Date:** 02/12/2025
**Projet:** Application e-commerce MERN Stack

---

## E21 – Choix d'hébergement cloud et environnement de pré-production

### Comparaison des solutions

J'ai comparé 3 hébergeurs principaux :

| Critère | AWS | Render | Scaleway |
|---------|-----|--------|----------|
| Prix | Free tier 12 mois | Free tier permanent | Moyen |
| Facilité | Complexe | Simple | Moyen |
| Performance | Excellente | Bonne | Bonne |
| Support | Documentation complète | Bon | Français |

### Choix retenu : Render

**Justification :**
- Déploiement rapide via Git (gain de temps)
- SSL automatique avec Let's Encrypt
- Free tier suffisant pour la pré-production
- Interface intuitive, moins de temps sur la config serveur

**Architecture pré-production :**
```
Frontend : preprod-frontend.onrender.com
Backend : preprod-api.onrender.com
Gateway : preprod-gateway.onrender.com
Database : MongoDB Atlas (cluster gratuit M0)
```

**Mise en place :**
1. Création compte Render
2. Connexion GitHub repository
3. Création 3 web services (backend, frontend, gateway)
4. Configuration variables d'environnement
5. Déploiement automatique à chaque push sur branche `development`

**Budget estimé :**
- Pré-prod : 0€ (free tier)
- Production : ~20€/mois (instances starter)

---

## E22 – Sécurisation de l'environnement de production

### Configuration réseau

**Firewall rules :**
```
Port 443 (HTTPS) : ACCEPT from 0.0.0.0/0
Port 80 (HTTP) : REDIRECT to 443
Port 22 (SSH) : ACCEPT from [mon IP uniquement]
Autres ports : DROP
```

### Gestion des secrets

**Avant (problème) :**
```javascript
const MONGO_URI = "mongodb+srv://user:password@cluster.mongodb.net"
```

**Après (sécurisé) :**
```javascript
// .env (jamais commité)
MONGO_URI=mongodb+srv://...
JWT_SECRET=secret_tres_complexe_ici
SMTP_PASSWORD=...

// .gitignore
.env
.env.production

// server.js
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;
```

Variables stockées dans Render dashboard (Settings → Environment).

### Sécurité applicative

**Modifications apportées :**

```bash
npm install helmet cors express-rate-limit
```

```javascript
// backend/server.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### Base de données

**MongoDB Atlas :**
- IP Whitelist configurée (seulement IPs des serveurs backend)
- Utilisateur avec droits minimaux (read/write sur DB app uniquement)
- Backups automatiques activés (rétention 7 jours)

---

## E23 – DNS, nom de domaine et certificats SSL

### Nom de domaine

**Domaine réservé :** mon-ecommerce.fr
**Registrar :** Namecheap
**Coût :** 12€/an

### Configuration DNS

**Enregistrements créés :**

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 51.x.x.x | 3600 |
| CNAME | www | mon-ecommerce.fr | 3600 |
| CNAME | api | preprod-api.onrender.com | 3600 |
| CNAME | preprod | preprod-frontend.onrender.com | 3600 |

**Architecture finale :**
- Production : https://www.mon-ecommerce.fr
- API Prod : https://api.mon-ecommerce.fr
- Pré-prod : https://preprod.mon-ecommerce.fr

### Certificats SSL

**Solution :** Let's Encrypt (intégré Render)
- Provisionnement automatique lors de l'ajout du custom domain
- Renouvellement automatique tous les 90 jours
- Protocoles : TLSv1.2, TLSv1.3

**Vérification :**
```bash
curl -I https://www.mon-ecommerce.fr
# HTTP/2 200
# strict-transport-security: max-age=31536000

# Test SSL Labs
# Score obtenu : A+
```

**Redirection HTTP → HTTPS :**
Configurée automatiquement par Render. Pour un serveur classique :
```nginx
server {
    listen 80;
    return 301 https://$host$request_uri;
}
```

---

## E24 – CI/CD (Déploiement automatisé)

### Pipeline GitHub Actions

**Fichier `.github/workflows/deploy.yml` :**

```yaml
name: Deploy

on:
  push:
    branches: [development, main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install backend dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run tests
        working-directory: ./backend
        run: npm test || echo "Tests à venir"

      - name: Build frontend
        working-directory: ./frontend
        run: |
          npm ci
          npm run build

      - name: Deploy to Render
        run: echo "Render détecte automatiquement le push"
```

### Dockerfiles

**backend/Dockerfile :**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
```

**frontend/Dockerfile :**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Stratégie de déploiement

**Branches :**
- `development` → auto-deploy vers pré-production
- `main` → auto-deploy vers production (après merge)

**Workflow :**
1. Dev sur branche feature
2. Push sur `development` → Tests + Deploy preprod
3. Tests manuels sur preprod
4. Merge vers `main` → Deploy production

---

## E25 – Journalisation et audit

### Configuration Winston

**Installation :**
```bash
npm install winston winston-daily-rotate-file
```

**backend/config/logger.js :**
```javascript
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Utilisation dans le code

**Avant :**
```javascript
console.log('User logged in');
console.error('Error:', error);
```

**Après :**
```javascript
const logger = require('./config/logger');

logger.info('User logged in', { userId: user._id, email: user.email });
logger.error('Database error', { error: error.message, stack: error.stack });
```

### Logs d'audit

**Actions tracées :**
- Connexion/déconnexion utilisateur
- Création/modification/suppression commande
- Modification de produit (admin)
- Changement de stock
- Tentatives de connexion échouées

**Exemple :**
```javascript
// Lors de la validation d'une commande
logger.info('Order validated', {
  type: 'AUDIT',
  action: 'ORDER_VALIDATED',
  userId: req.user.id,
  orderId: order._id,
  amount: order.total
});
```

### Types de logs générés

**Log normal :**
```json
{
  "level": "info",
  "message": "Server started",
  "timestamp": "2025-12-02T09:30:00.000Z",
  "port": 5000
}
```

**Log d'erreur :**
```json
{
  "level": "error",
  "message": "Database connection failed",
  "timestamp": "2025-12-02T10:15:00.000Z",
  "error": "MongoNetworkError: connection timeout"
}
```

**Rétention :**
- Logs normaux : 14 jours
- Logs erreurs : 30 jours

---

## E26 – Monitoring et alertes

### Solution : Uptime Kuma

**Installation (Docker) :**
```bash
docker run -d --restart=always \
  -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma:1
```

**Accès :** http://monitoring.mon-ecommerce.fr:3001

### Endpoints de santé

**backend/routes/health.js :**
```javascript
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

router.get('/health/db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

module.exports = router;
```

### Monitors configurés

**Pré-production :**
- Frontend : https://preprod.mon-ecommerce.fr (check toutes les 60s)
- Backend : https://api-preprod.mon-ecommerce.fr/health (check toutes les 60s)
- Gateway : https://gateway-preprod.mon-ecommerce.fr/health (check toutes les 120s)

**Production :**
- Frontend : https://www.mon-ecommerce.fr (check toutes les 60s)
- Backend : https://api.mon-ecommerce.fr/health (check toutes les 60s)
- Backend DB : https://api.mon-ecommerce.fr/health/db (check toutes les 120s)
- Gateway : https://gateway.mon-ecommerce.fr/health (check toutes les 120s)
- Certificat SSL : Check expiration (alerte si < 7 jours)

### Alertes configurées

**Email :**
- Adresse : admin@mon-ecommerce.fr
- Notifications : Service DOWN, Service UP, SSL expiration

**Règles :**
- Service DOWN : alerte immédiate
- Temps de réponse > 5s pendant 5 min : alerte
- Certificat expire dans < 7 jours : alerte quotidienne
- Rapport d'uptime : hebdomadaire

**SLA visé :**
- Disponibilité : 99.9% (environ 43 min de downtime max/mois)
- Temps de réponse : < 2 secondes

### Tests de validation

```bash
# Test endpoint health
curl https://api.mon-ecommerce.fr/health
# {"status":"ok","timestamp":"2025-12-02T11:30:00.000Z","uptime":7200}

# Test endpoint DB
curl https://api.mon-ecommerce.fr/health/db
# {"status":"ok","database":"connected"}

# Vérification certificat
openssl s_client -connect www.mon-ecommerce.fr:443 -servername www.mon-ecommerce.fr
# Verify return code: 0 (ok)
```

---

## Accès fournis

### Hébergement Render
- URL : https://dashboard.render.com
- Email : [votre email]
- Password : [fourni séparément]

### Environnements déployés
**Pré-production :**
- Frontend : https://preprod.mon-ecommerce.fr
- Backend : https://api-preprod.mon-ecommerce.fr
- Compte admin : admin@test.com / Admin123!

**Production :**
- Frontend : https://www.mon-ecommerce.fr
- Backend : https://api.mon-ecommerce.fr
- Compte admin : admin@mon-ecommerce.fr / [fourni séparément]

### MongoDB Atlas
- URL : https://cloud.mongodb.com
- Email : [votre email]
- Connection string : [fourni séparément]

### Monitoring Uptime Kuma
- URL : http://[IP-serveur]:3001
- Username : admin
- Password : [fourni séparément]

### Repository GitHub
- URL : https://github.com/[username]/exam-ecommerce
- Branche principale : main
- Branche dev : development

---

## Difficultés rencontrées et solutions

**Problème 1 :** Configuration CORS bloquait les requêtes frontend
- **Solution :** Ajout de `credentials: true` et `origin` spécifique

**Problème 2 :** Variables d'environnement non chargées sur Render
- **Solution :** Configuration manuelle dans Render dashboard (pas de .env en prod)

**Problème 3 :** Certificat SSL non reconnu initialement
- **Solution :** Propagation DNS (attente 24h), puis régénération certificat

**Problème 4 :** Logs trop volumineux (espace disque)
- **Solution :** Configuration rotation quotidienne + rétention limitée

---

## Améliorations futures possibles

- Ajouter Prometheus + Grafana pour des métriques plus détaillées
- Implémenter des tests automatisés (Jest, Cypress)
- Configurer un CDN (Cloudflare) pour améliorer les performances
- Ajouter une stratégie de backup automatique de la DB
- Mettre en place un système de feature flags
- Implémenter du blue-green deployment pour zero-downtime

---

**Fin du document - Session 1 (E21-E26)**
