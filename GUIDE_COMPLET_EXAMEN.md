# GUIDE COMPLET - EXAMEN CLOUD CAMPUS
## Situation Professionnelle de Mise en Production et Maintenance Applicative

---

## TABLE DES MATIÈRES

1. [Vue d'ensemble de l'examen](#vue-densemble)
2. [Architecture de l'application](#architecture)
3. [Session 1 - Questions E21 à E26 (Ce matin 9h30-12h30)](#session-1)
4. [Session 2 - Questions E27 à E29](#session-2)
5. [Stratégie globale de réponse](#stratégie)
6. [Checklist de validation](#checklist)

---

## VUE D'ENSEMBLE {#vue-densemble}

### Objectif de l'examen
Valider vos compétences en **gestion, mise en production et maintenance** d'une application web professionnelle.

### Structure de l'évaluation
- **Session 1** (3h - 9h30-12h30) : E21 à E26 - Infrastructure, hébergement, CI/CD, monitoring
- **Session 2** (2h) : E27 à E29 - Bugs, sécurité, documentation

### Livrables attendus
Un document contenant :
- Les différentes tâches effectuées sous forme de séquences détaillées
- Des explications approfondies
- Des captures d'écran illustratives
- Tous les accès et identifiants (serveurs, comptes d'accès)

---

## ARCHITECTURE DE L'APPLICATION {#architecture}

### Stack technique
```
MERN Stack + Microservices
├── Frontend: ReactJS (port 3000)
├── Backend: NodeJS/Express (port 5000)
├── Database: MongoDB (NoSQL)
├── Gateway: NodeJS (port 8000)
└── Microservices:
    ├── Notifications (NodeMailer)
    └── Stock Management
```

### Composants principaux

#### Backend (`/backend`)
```
backend/
├── config/          # Configuration DB (db.js)
├── controllers/     # admin, auth, order, product
├── middlewares/     # authMiddleware.js (authenticateToken, isAdmin)
├── models/          # Order, Product, User
├── routes/          # admin, auth, order, product
├── seeder.js        # Script de données de test
└── server.js        # Point d'entrée
```

#### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/  # Composants réutilisables
│   ├── context/     # Context API (panier global)
│   ├── pages/       # Pages de l'application
│   └── services/    # Appels API
└── package.json
```

#### Gateway (`/gateway`)
```
gateway/
├── routes/
│   ├── auth.js
│   ├── notif.js
│   └── stock.js
└── server.js        # Point d'entrée (port 8000)
```

#### Microservices (`/microservices`)
```
microservices/
├── auth-gateway/
├── notifications/   # Envoi d'emails (NodeMailer)
└── stock-management/
```

### Points d'entrée actuels
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Gateway: `http://localhost:8000`
  - `/notify` → Microservice notifications
  - `/update-stock` → Microservice stock

---

## SESSION 1 - E21 À E26 (CE MATIN) {#session-1}

### 🎯 E21 – Choisir une solution d'hébergement cloud adaptée

#### Objectif
Faire un **choix argumenté** d'une solution cloud et mettre en place un environnement de **pré-production**.

#### Critères d'évaluation d'un hébergeur

| Critère | Importance | À évaluer |
|---------|-----------|-----------|
| **Performance** | ⭐⭐⭐ | Latence, bande passante, localisation des serveurs |
| **Coût** | ⭐⭐⭐ | Pricing transparent, free tier, scalabilité des coûts |
| **Sécurité** | ⭐⭐⭐ | Certificats SSL, firewall, isolation, backups |
| **Scalabilité** | ⭐⭐ | Auto-scaling, load balancing |
| **Maintenance** | ⭐⭐⭐ | Managed services, monitoring intégré |
| **Support** | ⭐⭐ | Documentation, support technique |
| **Compliance** | ⭐⭐ | RGPD, certifications (ISO 27001) |

#### Options recommandées

##### Option 1: **AWS (Amazon Web Services)** ⭐ Recommandé pour production professionnelle

**Services à utiliser:**
- **EC2** : Serveurs virtuels pour backend/frontend/gateway
- **RDS ou MongoDB Atlas** : Base de données managée
- **S3** : Stockage de fichiers statiques
- **Elastic Load Balancer** : Répartition de charge
- **CloudWatch** : Monitoring
- **Route 53** : DNS

**Avantages:**
- ✅ Leader du marché cloud
- ✅ Très haute disponibilité (99.99%)
- ✅ Free tier généreux (12 mois)
- ✅ Outils de monitoring avancés
- ✅ Conformité RGPD

**Inconvénients:**
- ❌ Courbe d'apprentissage importante
- ❌ Coûts complexes à prévoir
- ❌ Interface intimidante

**Justification pour votre examen:**
*"AWS a été choisi car il représente 32% du marché cloud mondial et offre une infrastructure hautement scalable adaptée à une application e-commerce. La disponibilité de MongoDB Atlas (compatible AWS) permet une gestion simplifiée de la base de données. Le free tier permet de déployer l'environnement de pré-production sans coût initial."*

##### Option 2: **Render** ⭐⭐ Recommandé pour simplicité/rapidité

**Services:**
- **Web Services** : Backend Node.js
- **Static Sites** : Frontend React
- **PostgreSQL/MongoDB externe** : Via MongoDB Atlas
- **SSL automatique** : Let's Encrypt intégré

**Avantages:**
- ✅ Déploiement ultra-rapide (Git push)
- ✅ Free tier permanent
- ✅ SSL automatique
- ✅ Interface simple
- ✅ Pas de configuration serveur

**Inconvénients:**
- ❌ Moins de contrôle technique
- ❌ Services limités comparé AWS
- ❌ Performance moyenne sur free tier

**Justification:**
*"Render a été choisi pour sa simplicité de déploiement via Git et son SSL automatique. Adapté pour un environnement de pré-production rapide à mettre en place, il permet de se concentrer sur la correction des bugs plutôt que sur la configuration infrastructure."*

##### Option 3: **Scaleway** ⭐⭐ Alternative européenne

**Avantages:**
- ✅ Hébergeur français (serveurs en France)
- ✅ Conformité RGPD native
- ✅ Prix compétitifs
- ✅ Support en français

**Inconvénients:**
- ❌ Écosystème moins mature qu'AWS
- ❌ Moins de services managés

#### Réponse structurée pour E21

```markdown
## E21 - Choix de la solution d'hébergement

### 1. Analyse comparative

[Tableau comparatif AWS vs Render vs Scaleway avec scores]

### 2. Choix retenu : [NOM DE LA SOLUTION]

**Justification technique:**
- Critère 1: [Explication]
- Critère 2: [Explication]
- Critère 3: [Explication]

**Justification économique:**
- Coût estimé pré-production: [X€/mois]
- Coût estimé production: [Y€/mois]
- ROI: [Explication]

### 3. Architecture de l'environnement de pré-production

```
[Schéma ou description textuelle]

Environnement de PRÉ-PRODUCTION:
- URL: https://preprod.votredomaine.com
- Backend: [Instance type/plan]
- Frontend: [Instance type/plan]
- Database: MongoDB Atlas (M0 Free tier)
- Gateway: [Instance type/plan]
- Microservices: [Déploiement]
```

### 4. Plan de mise en œuvre

**Étape 1:** Création du compte et configuration initiale
**Étape 2:** Configuration réseau et sécurité
**Étape 3:** Déploiement des services
**Étape 4:** Tests de validation

### 5. Captures d'écran

[Screenshots de:]
- Dashboard hébergeur
- Configuration instances
- Réseau/sécurité configuré
```

---

### 🎯 E22 – Mettre en œuvre de manière sécurisée l'environnement de production

#### Objectif
Déployer l'environnement de **production** avec toutes les **bonnes pratiques de sécurité**.

#### Checklist de sécurité

##### 1. Sécurité Réseau

```markdown
☐ Firewall configuré (règles entrantes/sortantes)
  - Port 80 (HTTP) → Redirect vers 443
  - Port 443 (HTTPS) ✅
  - Port 22 (SSH) → Restreint à IP admin uniquement
  - Port 5000 (Backend API) → Accessible uniquement depuis frontend
  - Port 27017 (MongoDB) → Accessible uniquement depuis backend

☐ VPC/Réseau privé configuré
  - Backend dans subnet privé
  - Database dans subnet privé isolé
  - Frontend dans subnet public

☐ Rate limiting configuré
  - API: max 100 req/min par IP
  - Login: max 5 tentatives/15min
```

##### 2. Sécurité Applicative

```markdown
☐ Variables d'environnement (.env) sécurisées
  - Pas de secrets en clair dans le code
  - Utilisation de secrets manager (AWS Secrets Manager)

☐ JWT avec expiration courte
  - Access token: 15 minutes
  - Refresh token: 7 jours
  - Cookie HttpOnly + Secure

☐ CORS configuré strictement
  app.use(cors({
    origin: ['https://votredomaine.com'],
    credentials: true
  }));

☐ Helmet.js activé (headers sécurité)
  app.use(helmet());

☐ Validation des entrées (Joi)
  - Tous les endpoints publics
  - Sanitization des données

☐ Protection CSRF
☐ Protection contre injection NoSQL
```

##### 3. Sécurité Base de Données

```markdown
☐ MongoDB Atlas avec:
  - IP Whitelist configurée
  - Utilisateur avec privilèges minimaux
  - Connexion via SRV (DNS seedlist)
  - Encryption at rest activée

☐ Backups automatiques configurés
  - Rétention: 7 jours minimum
```

##### 4. Gestion des Secrets

```markdown
☐ .env fichiers:
  - .env.production (production)
  - .env.staging (pré-production)
  - Jamais commités sur Git

☐ Secrets stockés dans:
  - AWS Secrets Manager, ou
  - Variables d'environnement du service (Render)
  - Vault (pour architectures complexes)
```

##### 5. Monitoring de Sécurité

```markdown
☐ Logs d'accès configurés
☐ Alertes sur:
  - Tentatives de connexion multiples échouées
  - Requêtes suspectes (SQL injection patterns)
  - Accès non autorisés
```

#### Réponse structurée pour E22

```markdown
## E22 - Mise en œuvre sécurisée de l'environnement de production

### 1. Architecture réseau sécurisée

[Schéma montrant:]
- Internet Gateway
- Load Balancer (HTTPS uniquement)
- Frontend (subnet public)
- Backend + Gateway (subnet privé)
- Database (subnet privé isolé)
- Microservices (subnet privé)

### 2. Configuration firewall

**Règles entrantes:**
| Port | Source | Service | Action |
|------|--------|---------|--------|
| 443 | 0.0.0.0/0 | HTTPS | ACCEPT |
| 80 | 0.0.0.0/0 | HTTP redirect | ACCEPT |
| 22 | [IP admin] | SSH | ACCEPT |
| * | * | * | DROP |

**Règles sortantes:**
| Port | Destination | Service | Action |
|------|-------------|---------|--------|
| 443 | MongoDB Atlas | Database | ACCEPT |
| 25/587 | SMTP server | Email | ACCEPT |

### 3. Gestion des secrets

**Méthode utilisée:** [AWS Secrets Manager / Variables env service]

```bash
# Exemple de configuration backend/.env.production (VALEURS MASQUÉES)
MONGO_URI=mongodb+srv://[STOCKÉ SÉPARÉMENT]
JWT_SECRET=[STOCKÉ SÉPARÉMENT]
SMTP_PASSWORD=[STOCKÉ SÉPARÉMENT]
NODE_ENV=production
```

### 4. Sécurité applicative implémentée

**Modifications apportées au code:**

1. Installation des dépendances de sécurité:
```bash
npm install helmet cors express-rate-limit joi
```

2. Configuration dans backend/server.js:
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### 5. Captures d'écran

[Inclure:]
- Configuration firewall
- Secrets manager
- MongoDB Atlas - IP Whitelist
- Logs de sécurité
```

---

### 🎯 E23 – DNS, Nom de domaine et Certificats HTTPS

#### Objectif
Configurer un **nom de domaine**, les **DNS** et installer les **certificats SSL** pour pré-prod et prod.

#### Étapes détaillées

##### 1. Réservation du nom de domaine

**Options:**
- **Namecheap** (recommandé - pas cher, interface simple)
- **OVH** (français)
- **Google Domains**
- **AWS Route 53** (si tout sur AWS)

**Coût:** ~10-15€/an

##### 2. Architecture de domaines

```
Domaine principal: votredomaine.com (ou .fr)

Sous-domaines:
├── www.votredomaine.com → Frontend Production
├── api.votredomaine.com → Backend Production
├── gateway.votredomaine.com → Gateway Production
├── preprod.votredomaine.com → Frontend Pré-production
├── api-preprod.votredomaine.com → Backend Pré-production
└── gateway-preprod.votredomaine.com → Gateway Pré-production
```

##### 3. Configuration DNS

**Enregistrements à créer:**

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | [IP serveur prod frontend] | 3600 |
| A | www | [IP serveur prod frontend] | 3600 |
| A | api | [IP serveur prod backend] | 3600 |
| A | gateway | [IP serveur prod gateway] | 3600 |
| A | preprod | [IP serveur preprod frontend] | 3600 |
| A | api-preprod | [IP serveur preprod backend] | 3600 |
| CNAME | gateway-preprod | gateway-preprod.[hébergeur].com | 3600 |

**Si vous utilisez un CDN/Load Balancer:**
| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| CNAME | www | [load-balancer-url] | 3600 |

##### 4. Certificats SSL/TLS (HTTPS)

**Option 1: Let's Encrypt (Gratuit, recommandé)** ⭐

**Avec Certbot (si serveur Linux classique):**

```bash
# Installation Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtention certificat pour tous les domaines
sudo certbot --nginx -d votredomaine.com \
  -d www.votredomaine.com \
  -d api.votredomaine.com \
  -d gateway.votredomaine.com \
  -d preprod.votredomaine.com \
  -d api-preprod.votredomaine.com \
  -d gateway-preprod.votredomaine.com

# Auto-renouvellement (certificats valides 90 jours)
sudo certbot renew --dry-run
```

**Avec service managé (Render, AWS):**
- Les certificats sont automatiquement provisionnés
- Renouvellement automatique
- Configuration: activer HTTPS dans le dashboard

**Option 2: AWS Certificate Manager (si AWS)**

```bash
# Via AWS Console
1. Aller dans Certificate Manager
2. Request certificate
3. Add domain names: *.votredomaine.com (wildcard)
4. Validation DNS (ajouter enregistrement CNAME)
5. Attacher au Load Balancer
```

##### 5. Vérification des certificats

**Test en ligne:**
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- Score attendu: A ou A+

**Depuis le terminal:**
```bash
openssl s_client -connect votredomaine.com:443 -servername votredomaine.com

# Vérifier:
# - Certificate chain OK
# - Expiration date > 30 jours
# - CN (Common Name) correspond au domaine
```

**Depuis le navigateur:**
- Cliquer sur le cadenas
- Vérifier: "Connexion sécurisée"
- Certificat valide

##### 6. Redirection HTTP → HTTPS

**Configuration Nginx:**
```nginx
server {
    listen 80;
    server_name votredomaine.com www.votredomaine.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votredomaine.com www.votredomaine.com;

    ssl_certificate /etc/letsencrypt/live/votredomaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votredomaine.com/privkey.pem;

    # Configuration SSL moderne
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... reste de la configuration
}
```

**Configuration dans le code (Express):**
```javascript
// Middleware de redirection HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

#### Réponse structurée pour E23

```markdown
## E23 - Configuration DNS, Domaine et Certificats HTTPS

### 1. Nom de domaine réservé

**Domaine:** votredomaine.com
**Registrar:** [Namecheap/OVH/...]
**Date d'expiration:** [DATE]
**Coût:** [X€/an]

### 2. Architecture des sous-domaines

**Production:**
- Frontend: https://www.votredomaine.com
- Backend API: https://api.votredomaine.com
- Gateway: https://gateway.votredomaine.com

**Pré-production:**
- Frontend: https://preprod.votredomaine.com
- Backend API: https://api-preprod.votredomaine.com
- Gateway: https://gateway-preprod.votredomaine.com

### 3. Configuration DNS

[Tableau des enregistrements DNS créés]

**Capture d'écran:** Dashboard du registrar montrant les enregistrements

### 4. Certificats SSL/TLS

**Autorité de certification:** Let's Encrypt
**Type:** Domain Validated (DV)
**Wildcard:** *.votredomaine.com
**Expiration:** [DATE] (renouvellement automatique)

**Commande d'installation:**
```bash
[Commande certbot utilisée]
```

**Vérification:**
- SSL Labs Score: A+
- Protocoles supportés: TLSv1.2, TLSv1.3
- HSTS activé

### 5. Tests de validation

**Test 1: Redirection HTTP → HTTPS**
```bash
curl -I http://votredomaine.com
# Résultat: 301 Moved Permanently
# Location: https://votredomaine.com
```

**Test 2: Validité certificat**
```bash
curl -I https://api.votredomaine.com
# Résultat: 200 OK
# Certificate: Valid
```

### 6. Captures d'écran

[Inclure:]
- Configuration DNS (registrar)
- Certificat SSL dans le navigateur (cadenas vert)
- SSL Labs Test résultat
- Certbot liste des certificats
```

---

### 🎯 E24 – CI/CD (Déploiement automatisé)

#### Objectif
Mettre en place un **pipeline CI/CD** pour automatiser le déploiement vers pré-production et production.

#### Concepts clés

**CI (Continuous Integration):**
- Tests automatiques à chaque commit
- Build automatique
- Validation de la qualité du code

**CD (Continuous Deployment/Delivery):**
- Déploiement automatique en pré-production
- Déploiement semi-automatique (avec validation) en production

#### Architecture du pipeline

```
┌─────────────┐
│  Git Push   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│   CI/CD Pipeline        │
│   (GitHub Actions/      │
│    GitLab CI)           │
└──────┬──────────────────┘
       │
       ├─── Install dependencies
       │
       ├─── Run linters (ESLint)
       │
       ├─── Run tests (Jest)
       │
       ├─── Build application
       │
       ├─── Build Docker images
       │
       ├─── Push to Docker Hub
       │
       ▼
┌─────────────────────────┐
│  Branche: development   │
│  → Deploy PREPROD       │
└─────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Branche: main/master   │
│  → Deploy PRODUCTION    │
│  (avec validation)      │
└─────────────────────────┘
```

#### Option 1: GitHub Actions (recommandé)

##### Fichier `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [development, main]
  pull_request:
    branches: [main]

jobs:
  # ==========================================
  # JOB 1: Tests et Qualité du code
  # ==========================================
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      # Backend
      - name: Install backend dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run backend linter
        working-directory: ./backend
        run: npm run lint || true  # Ne pas bloquer si pas de script lint

      - name: Run backend tests
        working-directory: ./backend
        run: npm test || echo "No tests yet"

      # Frontend
      - name: Install frontend dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Run frontend linter
        working-directory: ./frontend
        run: npm run lint || true

      - name: Build frontend
        working-directory: ./frontend
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL_PREPROD }}

  # ==========================================
  # JOB 2: Build et Push Docker images
  # ==========================================
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push backend
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: true
          tags: |
            ${{ secrets.DOCKER_USERNAME }}/ecommerce-backend:${{ github.sha }}
            ${{ secrets.DOCKER_USERNAME }}/ecommerce-backend:latest

      - name: Build and push frontend
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          push: true
          tags: |
            ${{ secrets.DOCKER_USERNAME }}/ecommerce-frontend:${{ github.sha }}
            ${{ secrets.DOCKER_USERNAME }}/ecommerce-frontend:latest

      - name: Build and push gateway
        uses: docker/build-push-action@v4
        with:
          context: ./gateway
          push: true
          tags: |
            ${{ secrets.DOCKER_USERNAME }}/ecommerce-gateway:${{ github.sha }}
            ${{ secrets.DOCKER_USERNAME }}/ecommerce-gateway:latest

  # ==========================================
  # JOB 3: Déploiement PRÉ-PRODUCTION
  # ==========================================
  deploy-preprod:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/development'

    steps:
      - name: Deploy to preprod server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PREPROD_HOST }}
          username: ${{ secrets.PREPROD_USER }}
          key: ${{ secrets.PREPROD_SSH_KEY }}
          script: |
            cd /opt/ecommerce
            docker-compose pull
            docker-compose up -d
            docker-compose logs --tail=50

  # ==========================================
  # JOB 4: Déploiement PRODUCTION
  # ==========================================
  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://www.votredomaine.com

    steps:
      - name: Deploy to production server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /opt/ecommerce
            docker-compose pull
            docker-compose up -d
            docker-compose logs --tail=50

      - name: Health check
        run: |
          sleep 10
          curl -f https://api.votredomaine.com/health || exit 1
```

##### Secrets à configurer dans GitHub

```
Settings → Secrets and variables → Actions → New repository secret

Secrets nécessaires:
- DOCKER_USERNAME: [votre username Docker Hub]
- DOCKER_PASSWORD: [votre token Docker Hub]
- API_URL_PREPROD: https://api-preprod.votredomaine.com
- API_URL_PROD: https://api.votredomaine.com
- PREPROD_HOST: [IP serveur preprod]
- PREPROD_USER: [user SSH]
- PREPROD_SSH_KEY: [clé privée SSH]
- PROD_HOST: [IP serveur prod]
- PROD_USER: [user SSH]
- PROD_SSH_KEY: [clé privée SSH]
```

#### Option 2: GitLab CI/CD

##### Fichier `.gitlab-ci.yml`

```yaml
stages:
  - test
  - build
  - deploy-preprod
  - deploy-prod

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ""

# ==========================================
# STAGE: Tests
# ==========================================
test:backend:
  stage: test
  image: node:18
  cache:
    paths:
      - backend/node_modules/
  script:
    - cd backend
    - npm ci
    - npm run lint || true
    - npm test || echo "No tests"

test:frontend:
  stage: test
  image: node:18
  cache:
    paths:
      - frontend/node_modules/
  script:
    - cd frontend
    - npm ci
    - npm run lint || true
    - npm run build

# ==========================================
# STAGE: Build Docker
# ==========================================
build:docker:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
  script:
    - docker build -t $DOCKER_USERNAME/ecommerce-backend:$CI_COMMIT_SHA ./backend
    - docker build -t $DOCKER_USERNAME/ecommerce-frontend:$CI_COMMIT_SHA ./frontend
    - docker build -t $DOCKER_USERNAME/ecommerce-gateway:$CI_COMMIT_SHA ./gateway
    - docker push $DOCKER_USERNAME/ecommerce-backend:$CI_COMMIT_SHA
    - docker push $DOCKER_USERNAME/ecommerce-frontend:$CI_COMMIT_SHA
    - docker push $DOCKER_USERNAME/ecommerce-gateway:$CI_COMMIT_SHA
  only:
    - development
    - main

# ==========================================
# STAGE: Deploy Preprod
# ==========================================
deploy:preprod:
  stage: deploy-preprod
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$PREPROD_SSH_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - ssh -o StrictHostKeyChecking=no $PREPROD_USER@$PREPROD_HOST "
        cd /opt/ecommerce &&
        docker-compose pull &&
        docker-compose up -d
      "
  only:
    - development
  environment:
    name: preprod
    url: https://preprod.votredomaine.com

# ==========================================
# STAGE: Deploy Production
# ==========================================
deploy:production:
  stage: deploy-prod
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$PROD_SSH_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - ssh -o StrictHostKeyChecking=no $PROD_USER@$PROD_HOST "
        cd /opt/ecommerce &&
        docker-compose pull &&
        docker-compose up -d
      "
  only:
    - main
  when: manual  # Déploiement manuel en production
  environment:
    name: production
    url: https://www.votredomaine.com
```

#### Conteneurisation (Dockerfiles)

##### `backend/Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de production uniquement
RUN npm ci --only=production

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer l'application
CMD ["node", "server.js"]
```

##### `frontend/Dockerfile`

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copier le build
COPY --from=builder /app/build /usr/share/nginx/html

# Configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

##### `frontend/nginx.conf`

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gestion du routing React
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Sécurité headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

##### `gateway/Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:8000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
```

##### `docker-compose.yml` (pour déploiement)

```yaml
version: '3.8'

services:
  backend:
    image: ${DOCKER_USERNAME}/ecommerce-backend:latest
    container_name: ecommerce-backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
      - PORT=5000
    networks:
      - ecommerce-network
    depends_on:
      - mongodb

  frontend:
    image: ${DOCKER_USERNAME}/ecommerce-frontend:latest
    container_name: ecommerce-frontend
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    networks:
      - ecommerce-network
    depends_on:
      - backend

  gateway:
    image: ${DOCKER_USERNAME}/ecommerce-gateway:latest
    container_name: ecommerce-gateway
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - NOTIFICATION_SERVICE_URL=http://notification:3001
      - STOCK_SERVICE_URL=http://stock-management:3002
    networks:
      - ecommerce-network
    depends_on:
      - notification
      - stock-management

  notification:
    image: ${DOCKER_USERNAME}/ecommerce-notification:latest
    container_name: ecommerce-notification
    restart: unless-stopped
    environment:
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASSWORD=${SMTP_PASSWORD}
    networks:
      - ecommerce-network

  stock-management:
    image: ${DOCKER_USERNAME}/ecommerce-stock:latest
    container_name: ecommerce-stock
    restart: unless-stopped
    environment:
      - MONGO_URI=${MONGO_URI}
    networks:
      - ecommerce-network

  mongodb:
    image: mongo:6
    container_name: ecommerce-mongodb
    restart: unless-stopped
    volumes:
      - mongodb-data:/data/db
    networks:
      - ecommerce-network
    # NOTE: En production, utiliser MongoDB Atlas plutôt qu'un conteneur

networks:
  ecommerce-network:
    driver: bridge

volumes:
  mongodb-data:
```

#### Réponse structurée pour E24

```markdown
## E24 - Mise en œuvre CI/CD

### 1. Choix de la plateforme

**Plateforme:** GitHub Actions
**Justification:**
- Intégration native avec GitHub
- 2000 minutes gratuites/mois
- Large écosystème d'actions
- Documentation exhaustive

### 2. Architecture du pipeline

```
[Schéma du workflow présenté ci-dessus]
```

**Branches:**
- `development` → Déploiement automatique en PRÉ-PRODUCTION
- `main` → Déploiement manuel (avec validation) en PRODUCTION

### 3. Étapes du pipeline

**Phase 1: Intégration Continue (CI)**
1. Checkout du code
2. Installation des dépendances (npm ci)
3. Linting (ESLint)
4. Tests unitaires (Jest)
5. Build de l'application

**Phase 2: Livraison Continue (CD)**
6. Build des images Docker
7. Push vers Docker Hub
8. Déploiement selon la branche

### 4. Conteneurisation

**Images Docker créées:**
- `ecommerce-backend:latest`
- `ecommerce-frontend:latest`
- `ecommerce-gateway:latest`
- `ecommerce-notification:latest`
- `ecommerce-stock:latest`

[Inclure les Dockerfiles]

### 5. Configuration du déploiement

**Fichier docker-compose.yml:**
[Inclure le fichier]

**Variables d'environnement:**
[Liste des variables configurées]

### 6. Tests et validation

**Test 1: Push sur development**
```bash
git checkout development
git add .
git commit -m "Test CI/CD"
git push origin development
```
Résultat: ✅ Déployé automatiquement sur https://preprod.votredomaine.com

**Test 2: Merge vers main**
```bash
git checkout main
git merge development
git push origin main
```
Résultat: ⏸️ En attente de validation manuelle → Déploiement sur https://www.votredomaine.com

### 7. Captures d'écran

[Inclure:]
- Dashboard GitHub Actions (pipeline en cours)
- Détails d'un job réussi
- Docker Hub (images publiées)
- Logs de déploiement
```

---

### 🎯 E25 – Journalisation et Audit

#### Objectif
Mettre en place un système de **logs structurés** et des **outils d'audit** pour tracer les événements de l'application.

#### Pourquoi journaliser ?

- **Debugging** : Comprendre les erreurs en production
- **Audit** : Tracer les actions des utilisateurs (sécurité)
- **Monitoring** : Détecter les anomalies
- **Compliance** : RGPD exige de tracer l'accès aux données personnelles

#### Niveaux de logs

| Niveau | Usage | Exemple |
|--------|-------|---------|
| **error** | Erreurs critiques | Connexion DB échouée, crash service |
| **warn** | Situations anormales non-bloquantes | Tentative de login échouée, stock bas |
| **info** | Événements importants | User créé, commande validée |
| **http** | Requêtes HTTP | GET /api/products 200 |
| **debug** | Informations détaillées pour debug | Valeur d'une variable |

#### Implémentation avec Winston

##### Installation

```bash
cd backend
npm install winston winston-daily-rotate-file
```

##### Configuration (`backend/config/logger.js`)

```javascript
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Format personnalisé
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Transport: rotation quotidienne des fichiers
const fileRotateTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d', // Garder 14 jours
  level: 'info'
});

// Transport pour les erreurs uniquement
const errorFileTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d',
  level: 'error'
});

// Création du logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: customFormat,
  transports: [
    fileRotateTransport,
    errorFileTransport
  ]
});

// En développement: afficher aussi dans la console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
```

##### Utilisation dans le code

**Remplacer tous les `console.log` par `logger`:**

```javascript
// backend/server.js
const logger = require('./config/logger');

// Au lieu de:
// console.log('Serveur démarré sur le port 5000');

// Utiliser:
logger.info('Serveur démarré sur le port 5000', {
  port: process.env.PORT,
  environment: process.env.NODE_ENV
});

// Erreurs
app.use((err, req, res, next) => {
  logger.error('Erreur non gérée', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id
  });

  res.status(500).json({ error: 'Erreur serveur' });
});
```

**Dans les controllers:**

```javascript
// backend/controllers/authController.js
const logger = require('../config/logger');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    logger.info('Tentative de connexion', { email });

    const user = await User.findOne({ email });

    if (!user) {
      logger.warn('Tentative de connexion avec email inexistant', { email });
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn('Tentative de connexion avec mot de passe incorrect', {
        email,
        userId: user._id
      });
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    logger.info('Connexion réussie', {
      userId: user._id,
      email: user.email,
      role: user.role
    });

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });

  } catch (error) {
    logger.error('Erreur lors de la connexion', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
```

**Logging des requêtes HTTP (middleware):**

```javascript
// backend/middlewares/httpLogger.js
const logger = require('../config/logger');

module.exports = (req, res, next) => {
  const startTime = Date.now();

  // Log quand la réponse est envoyée
  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logger.http('Requête HTTP', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      userId: req.user?.id
    });
  });

  next();
};

// Dans server.js
const httpLogger = require('./middlewares/httpLogger');
app.use(httpLogger);
```

##### Logs d'audit spécifiques

**Tracer les actions sensibles:**

```javascript
// backend/utils/auditLog.js
const logger = require('../config/logger');

const auditLog = (action, userId, details = {}) => {
  logger.info('Audit', {
    type: 'AUDIT',
    action,
    userId,
    timestamp: new Date().toISOString(),
    ...details
  });
};

module.exports = auditLog;

// Utilisation:
const auditLog = require('../utils/auditLog');

// Exemple: Admin valide une commande
exports.validateOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findByIdAndUpdate(orderId, { status: 'Expédié' });

  auditLog('ORDER_VALIDATED', req.user.id, {
    orderId,
    previousStatus: order.status,
    newStatus: 'Expédié'
  });

  res.json(order);
};

// Exemple: Modification de produit
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  const product = await Product.findByIdAndUpdate(productId, updates);

  auditLog('PRODUCT_UPDATED', req.user.id, {
    productId,
    updatedFields: Object.keys(updates)
  });

  res.json(product);
};
```

#### Centralisation des logs (optionnel mais recommandé)

**Option 1: Envoyer vers un service de log management**

- **Loggly**
- **Papertrail**
- **AWS CloudWatch Logs**
- **Datadog**

**Exemple avec Winston transport HTTP:**

```javascript
const winston = require('winston');
require('winston-loggly-bulk');

logger.add(new winston.transports.Loggly({
  token: process.env.LOGGLY_TOKEN,
  subdomain: process.env.LOGGLY_SUBDOMAIN,
  tags: ['backend', 'production'],
  json: true
}));
```

**Option 2: Stack ELK (Elasticsearch + Logstash + Kibana)**

- Très puissant mais complexe à mettre en place
- Adapté pour grandes infrastructures

#### Réponse structurée pour E25

```markdown
## E25 - Journalisation et Audit

### 1. Stratégie de journalisation

**Objectifs:**
- Tracer toutes les erreurs pour faciliter le debugging
- Auditer les actions sensibles (connexion, modification données, validation commande)
- Monitorer les performances (temps de réponse)
- Conformité RGPD (traçabilité accès données personnelles)

### 2. Outil choisi: Winston

**Justification:**
- Bibliothèque Node.js la plus populaire (8M downloads/semaine)
- Support de multiples transports (fichier, console, services externes)
- Rotation automatique des fichiers
- Format JSON structuré (facilite l'analyse)

**Installation:**
```bash
npm install winston winston-daily-rotate-file
```

### 3. Configuration implémentée

[Inclure le fichier logger.js]

**Niveaux de logs configurés:**
- `error`: Erreurs critiques → fichier `logs/error-YYYY-MM-DD.log`
- `warn`: Situations anormales → fichier `logs/application-YYYY-MM-DD.log`
- `info`: Événements importants → fichier `logs/application-YYYY-MM-DD.log`
- `http`: Requêtes HTTP → fichier `logs/application-YYYY-MM-DD.log`

**Rétention:**
- Logs généraux: 14 jours
- Logs d'erreurs: 30 jours

### 4. Exemples de logs générés

**Log de connexion réussie:**
```json
{
  "level": "info",
  "message": "Connexion réussie",
  "timestamp": "2025-12-02 10:30:15",
  "userId": "673b492c76998205303247",
  "email": "user@example.com",
  "role": "user"
}
```

**Log d'erreur:**
```json
{
  "level": "error",
  "message": "Erreur connexion base de données",
  "timestamp": "2025-12-02 10:35:42",
  "error": "MongoNetworkError: connection timed out",
  "stack": "Error: ...\n at ..."
}
```

**Log d'audit (action sensible):**
```json
{
  "level": "info",
  "message": "Audit",
  "timestamp": "2025-12-02 11:15:00",
  "type": "AUDIT",
  "action": "ORDER_VALIDATED",
  "userId": "admin123",
  "orderId": "67c82c8b4de76a1aaad57290",
  "previousStatus": "En attente",
  "newStatus": "Expédié"
}
```

### 5. Modifications du code

**Fichiers modifiés:**
- `backend/config/logger.js` (créé)
- `backend/middlewares/httpLogger.js` (créé)
- `backend/utils/auditLog.js` (créé)
- `backend/server.js` (ajout middleware)
- `backend/controllers/*.js` (remplacement console.log → logger)

**Nombre de console.log remplacés:** [X]

### 6. Outils d'analyse des logs

**Localement:**
```bash
# Afficher les erreurs du jour
cat logs/error-$(date +%Y-%m-%d).log | jq '.'

# Chercher les logs d'un utilisateur spécifique
grep "userId\":\"673b492c" logs/application-*.log

# Compter les tentatives de connexion échouées
grep "Tentative de connexion avec mot de passe incorrect" logs/*.log | wc -l
```

**En production:**
- [Loggly/CloudWatch/...] configuré
- Dashboard de monitoring des logs
- Alertes configurées (voir E26)

### 7. Conformité RGPD

**Actions tracées:**
- Accès aux données utilisateur
- Modification de données utilisateur
- Suppression de compte (droit à l'oubli)
- Export de données (droit à la portabilité)

### 8. Captures d'écran

[Inclure:]
- Structure du dossier logs/
- Extrait de fichier de log
- Dashboard d'analyse (si service externe)
```

---

### 🎯 E26 – Supervision et Alertes

#### Objectif
Mettre en place un système de **monitoring** pour surveiller la santé de l'application et des **alertes** pour être notifié des problèmes.

#### Métriques à surveiller

##### 1. Disponibilité (Uptime)
- ✅ L'application est-elle accessible ?
- ⏱️ Temps de réponse acceptable ?

##### 2. Santé des services
- Backend API répond ?
- Gateway répond ?
- Microservices répondent ?
- Base de données accessible ?

##### 3. Performances
- Temps de réponse moyen
- Requêtes les plus lentes
- Utilisation CPU/RAM
- Utilisation disque

##### 4. Erreurs
- Taux d'erreurs 5xx
- Erreurs applicatives (logs)

##### 5. Métriques métier
- Nombre de commandes/jour
- Taux de conversion
- Produits en rupture de stock

#### Solution 1: Uptime Kuma (Simple, open-source) ⭐ Recommandé

**Avantages:**
- ✅ Installation simple (Docker)
- ✅ Interface claire et moderne
- ✅ Gratuit et open-source
- ✅ Multi-protocoles (HTTP, TCP, Ping, Docker)
- ✅ Notifications multiples (Email, Slack, Discord, Webhook)

##### Installation

```bash
# Via Docker
docker run -d --restart=always \
  -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma:1

# Accès: http://[IP-SERVEUR]:3001
```

##### Configuration des monitors

**Monitor 1: Frontend Production**
```
Type: HTTP(s)
URL: https://www.votredomaine.com
Method: GET
Interval: 60 secondes
Retries: 3
Expected Status: 200
```

**Monitor 2: Backend API Health**
```
Type: HTTP(s)
URL: https://api.votredomaine.com/health
Method: GET
Interval: 60 secondes
Expected Status: 200
Expected Response: {"status":"ok"}
```

**Monitor 3: Gateway**
```
Type: HTTP(s)
URL: https://gateway.votredomaine.com/health
Method: GET
Interval: 60 secondes
```

**Monitor 4: Microservice Notifications**
```
Type: HTTP(s)
URL: http://[IP-INTERNE]:3001/health
Interval: 120 secondes
```

**Monitor 5: MongoDB (via Backend)**
```
Type: HTTP(s)
URL: https://api.votredomaine.com/health/db
Method: GET
Interval: 120 secondes
```

##### Endpoints Health à créer

**`backend/routes/health.js`:**

```javascript
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../config/logger');

// Health check basique
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Health check avec vérification DB
router.get('/health/db', async (req, res) => {
  try {
    // Vérifier la connexion MongoDB
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    // Test simple de lecture
    await mongoose.connection.db.admin().ping();

    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Health check DB failed', { error: error.message });
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Health check détaillé
router.get('/health/detailed', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: 'ok',
    checks: {
      database: 'unknown',
      memory: 'unknown',
      disk: 'unknown'
    }
  };

  try {
    // Check database
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
      healthcheck.checks.database = 'ok';
    } else {
      healthcheck.checks.database = 'disconnected';
      healthcheck.status = 'degraded';
    }

    // Check memory
    const memUsage = process.memoryUsage();
    const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    healthcheck.checks.memory = {
      status: memUsagePercent < 90 ? 'ok' : 'high',
      usedMB: Math.round(memUsage.heapUsed / 1024 / 1024),
      totalMB: Math.round(memUsage.heapTotal / 1024 / 1024),
      percent: Math.round(memUsagePercent)
    };

    // Check disk (nécessite le package 'check-disk-space')
    // const diskSpace = await checkDiskSpace('/');
    // healthcheck.checks.disk = {
    //   status: diskSpace.free > 1000000000 ? 'ok' : 'low',
    //   freeMB: Math.round(diskSpace.free / 1024 / 1024)
    // };

    const statusCode = healthcheck.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(healthcheck);

  } catch (error) {
    logger.error('Detailed health check failed', { error: error.message });
    healthcheck.status = 'error';
    res.status(503).json(healthcheck);
  }
});

module.exports = router;
```

**Dans `backend/server.js`:**
```javascript
const healthRoutes = require('./routes/health');
app.use('/', healthRoutes);
```

**De même pour le gateway et les microservices.**

##### Configuration des notifications

**Email:**
- SMTP: [smtp.gmail.com] (ou votre serveur)
- Email destinataire: [votre-email@example.com]

**Webhook (optionnel, pour intégration Slack/Discord):**
```
Webhook URL: https://hooks.slack.com/services/...
Format: JSON
```

##### Alertes à configurer

| Événement | Seuil | Action |
|-----------|-------|--------|
| Service DOWN | Immédiat | Email + Notification |
| Temps de réponse élevé | > 5 secondes | Email |
| Certificat SSL expire | < 7 jours | Email |
| Uptime < 99% sur 24h | Quotidien | Rapport |

#### Solution 2: Prometheus + Grafana (Avancé)

**Pour aller plus loin (bonus):**

Prometheus collecte les métriques, Grafana les affiche.

##### Instrumentation du backend avec Prometheus

```bash
npm install prom-client
```

**`backend/utils/metrics.js`:**

```javascript
const client = require('prom-client');

// Créer un registre
const register = new client.Registry();

// Métriques par défaut (CPU, mémoire, etc.)
client.collectDefaultMetrics({ register });

// Métriques personnalisées
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});
register.registerMetric(httpRequestDuration);

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequestsTotal);

const ordersTotal = new client.Counter({
  name: 'orders_total',
  help: 'Total number of orders created',
  labelNames: ['status']
});
register.registerMetric(ordersTotal);

module.exports = {
  register,
  httpRequestDuration,
  httpRequestsTotal,
  ordersTotal
};
```

**Middleware pour tracer les requêtes:**

```javascript
// backend/middlewares/metricsMiddleware.js
const { httpRequestDuration, httpRequestsTotal } = require('../utils/metrics');

module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;

    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);

    httpRequestsTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });

  next();
};

// Dans server.js
const metricsMiddleware = require('./middlewares/metricsMiddleware');
app.use(metricsMiddleware);
```

**Endpoint pour Prometheus:**

```javascript
// backend/routes/metrics.js
const { register } = require('../utils/metrics');

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

**Configuration Prometheus (`prometheus.yml`):**

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['api.votredomaine.com:5000']
    metrics_path: '/metrics'
    scheme: https
```

**Grafana Dashboard:**
- Importer dashboard préconfiguré pour Node.js
- Créer graphiques personnalisés (requêtes/s, temps de réponse, etc.)

#### Réponse structurée pour E26

```markdown
## E26 - Supervision et Alertes

### 1. Stratégie de monitoring

**Objectifs:**
- Détecter les pannes immédiatement
- Monitorer les performances
- Anticiper les problèmes (espace disque, certificats)
- Mesurer la disponibilité (SLA)

### 2. Solution choisie: Uptime Kuma

**Justification:**
- Interface simple et intuitive
- Installation rapide (< 5 minutes)
- Open-source et gratuit
- Support multi-protocoles
- Notifications intégrées

**Installation:**
```bash
docker run -d --restart=always \
  -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma:1
```

**Accès:** https://monitoring.votredomaine.com

### 3. Monitors configurés

**Environnement PRÉ-PRODUCTION:**

| Service | URL | Intervalle | Seuil alerte |
|---------|-----|------------|--------------|
| Frontend | https://preprod.votredomaine.com | 60s | > 5s ou status ≠ 200 |
| Backend | https://api-preprod.votredomaine.com/health | 60s | > 3s ou status ≠ 200 |
| Gateway | https://gateway-preprod.votredomaine.com/health | 120s | status ≠ 200 |

**Environnement PRODUCTION:**

| Service | URL | Intervalle | Seuil alerte |
|---------|-----|------------|--------------|
| Frontend | https://www.votredomaine.com | 60s | > 5s ou status ≠ 200 |
| Backend | https://api.votredomaine.com/health | 60s | > 3s ou status ≠ 200 |
| Backend DB | https://api.votredomaine.com/health/db | 120s | status ≠ 200 |
| Gateway | https://gateway.votredomaine.com/health | 120s | status ≠ 200 |
| SSL Cert | https://www.votredomaine.com | 24h | < 7 jours avant expiration |

### 4. Endpoints Health créés

[Inclure le code des routes health]

**Tests des endpoints:**
```bash
# Test health basique
curl https://api.votredomaine.com/health
# Résultat: {"status":"ok","timestamp":"...","uptime":3600}

# Test health avec DB
curl https://api.votredomaine.com/health/db
# Résultat: {"status":"ok","database":"connected","timestamp":"..."}
```

### 5. Configuration des alertes

**Canaux de notification configurés:**
- **Email:** admin@votredomaine.com
- **Slack:** #alerts-production (webhook configuré)

**Règles d'alerte:**

| Événement | Délai | Notification | Priorité |
|-----------|-------|--------------|----------|
| Service DOWN | Immédiat | Email + Slack | 🔴 Critique |
| Service UP (résolu) | Immédiat | Email + Slack | 🟢 Info |
| Temps réponse > 5s | 5 minutes consécutives | Email | 🟠 Warning |
| Certificat SSL < 7 jours | Quotidien | Email | 🟠 Warning |
| Uptime < 99% sur 24h | Quotidien | Email | 🟡 Info |

### 6. Dashboard de supervision

**Métriques visibles:**
- Status de chaque service (UP/DOWN)
- Temps de réponse en temps réel
- Graphiques uptime sur 24h/7j/30j
- Historique des incidents
- Temps de résolution moyen

**SLA (Service Level Agreement) visé:**
- Disponibilité: 99.9% (< 43 minutes de downtime/mois)
- Temps de réponse: < 2 secondes (95e percentile)

### 7. Métriques business (bonus)

**Métriques suivies:**
- Nombre de commandes validées/jour
- Taux de conversion (visiteurs → commandes)
- Produits en alerte stock (< 10 unités)

**Implémentation:**
[Code des métriques Prometheus si implémenté]

### 8. Plan de réponse aux incidents

**Procédure en cas d'alerte:**
1. Réception alerte (Email/Slack)
2. Vérification dashboard Uptime Kuma
3. Consultation logs (Winston)
4. Diagnostic SSH sur le serveur concerné
5. Correction + redéploiement si nécessaire
6. Validation retour à la normale
7. Post-mortem (analyse cause)

### 9. Captures d'écran

[Inclure:]
- Dashboard Uptime Kuma (tous services UP)
- Configuration d'un monitor
- Graphique uptime sur 7 jours
- Exemple de notification d'alerte
- Grafana dashboard (si Prometheus implémenté)
```

---

## SESSION 2 - E27 À E29 {#session-2}

*(Ces questions seront pour une session ultérieure, mais voici un aperçu)*

### 🎯 E27 – Détection et correction des bugs

**À faire:**
- Tester l'application de bout en bout
- Lister les bugs identifiés
- Corriger chaque bug
- Documenter les corrections

**Bugs typiques à chercher:**
- Erreurs de validation de formulaires
- Gestion incorrecte des états (panier)
- Problèmes d'authentification/autorisation
- Erreurs de calcul (prix, stock)
- Requêtes non protégées

### 🎯 E28 – Détection et correction des failles de sécurité

**Failles à identifier:**
- Secrets en clair dans le code
- Pas de validation des entrées utilisateurs
- JWT stocké en localStorage
- CORS trop permissif
- Pas de rate limiting
- Injection NoSQL possible
- XSS possible

### 🎯 E29 – Documentation et Changelog

**À générer:**
- Documentation API (Swagger/Postman)
- Documentation du code (JSDoc)
- CHANGELOG.md (historique des versions)
- README.md (installation, utilisation)

---

## STRATÉGIE GLOBALE DE RÉPONSE {#stratégie}

### Comment structurer vos réponses (CE MATIN)

Pour chaque question E21-E26:

1. **Introduction (2-3 lignes)**
   - Objectif de la tâche
   - Importance pour le projet

2. **Analyse et choix (1 page max)**
   - Comparaison des options
   - Choix retenu avec justification argumentée

3. **Mise en œuvre (2-4 pages)**
   - Étapes détaillées
   - Code/configuration
   - Commandes exécutées

4. **Validation (1 page)**
   - Tests effectués
   - Résultats obtenus
   - Captures d'écran

5. **Conclusion et améliorations possibles (quelques lignes)**

### Conseils rédactionnels

✅ **À FAIRE:**
- Être **précis et technique**
- **Justifier** chaque choix
- Inclure **captures d'écran** de qualité
- Montrer les **commandes** exécutées
- Documenter les **difficultés** rencontrées
- Proposer des **améliorations**

❌ **À ÉVITER:**
- Paraphraser la question
- Réponses trop courtes sans détails
- Captures d'écran floues ou non pertinentes
- Oublier les accès/identifiants

### Gestion du temps (3h ce matin)

**Répartition recommandée:**

| Tâche | Temps |
|-------|-------|
| E21 - Choix hébergement | 30 min |
| E22 - Sécurisation production | 30 min |
| E23 - DNS et SSL | 30 min |
| E24 - CI/CD | 45 min |
| E25 - Logs | 30 min |
| E26 - Monitoring | 30 min |
| **Buffer / Relecture** | **15 min** |

---

## CHECKLIST DE VALIDATION {#checklist}

### Pour E21 (Hébergement)

```
☐ Tableau comparatif des hébergeurs créé
☐ Choix argumenté (au moins 3 critères)
☐ Environnement pré-prod créé et accessible
☐ Captures d'écran du dashboard hébergeur
☐ URLs pré-prod documentées
```

### Pour E22 (Sécurité)

```
☐ Firewall configuré (règles documentées)
☐ Secrets externalisés (.env)
☐ HTTPS forcé (redirect HTTP → HTTPS)
☐ CORS configuré strictement
☐ Headers de sécurité (Helmet.js)
☐ Backups configurés
☐ Captures d'écran configuration sécurité
```

### Pour E23 (DNS/SSL)

```
☐ Nom de domaine réservé
☐ Enregistrements DNS créés (A, CNAME)
☐ Certificats SSL installés (preprod + prod)
☐ SSL Labs test > A
☐ Tous les services accessibles en HTTPS
☐ Captures d'écran: DNS, certificats, SSL Labs
```

### Pour E24 (CI/CD)

```
☐ Dockerfiles créés (backend, frontend, gateway)
☐ docker-compose.yml créé
☐ Pipeline CI/CD configuré (GitHub Actions/GitLab CI)
☐ Test du pipeline (push sur development → deploy preprod)
☐ Images Docker sur Docker Hub
☐ Captures d'écran: pipeline réussi, images Docker
```

### Pour E25 (Logs)

```
☐ Winston installé et configuré
☐ Tous les console.log remplacés par logger
☐ Logs structurés (JSON)
☐ Rotation des fichiers configurée
☐ Logs d'audit pour actions sensibles
☐ Exemples de logs dans le document
```

### Pour E26 (Monitoring)

```
☐ Uptime Kuma installé (ou autre outil)
☐ Monitors configurés pour tous les services
☐ Endpoints /health créés et fonctionnels
☐ Alertes configurées (email minimum)
☐ Dashboard accessible
☐ Captures d'écran: dashboard, monitors, alerte
```

---

## ACCÈS À FOURNIR

**Dans votre document final, inclure:**

```markdown
## Accès et Identifiants

### Hébergement
- **Plateforme:** [AWS/Render/...]
- **URL Dashboard:** [URL]
- **Login:** [email]
- **Password:** [password]

### Environnements
- **Pré-production:**
  - Frontend: https://preprod.votredomaine.com
  - Backend: https://api-preprod.votredomaine.com
  - Admin: [login/password]

- **Production:**
  - Frontend: https://www.votredomaine.com
  - Backend: https://api.votredomaine.com
  - Admin: [login/password]

### Base de données
- **MongoDB Atlas:**
  - URL: [connection string]
  - User: [user]
  - Password: [password]

### Monitoring
- **Uptime Kuma:**
  - URL: https://monitoring.votredomaine.com
  - Login: [user]
  - Password: [password]

### Docker Hub
- **Username:** [username]
- **Images:**
  - [username]/ecommerce-backend:latest
  - [username]/ecommerce-frontend:latest
  - [username]/ecommerce-gateway:latest

### Serveurs SSH (si applicable)
- **Pré-production:**
  - Host: [IP]
  - User: [user]
  - Key: [chemin vers la clé]

- **Production:**
  - Host: [IP]
  - User: [user]
  - Key: [chemin vers la clé]

### Secrets GitHub/GitLab
- [Liste des secrets configurés]
```

---

## RESSOURCES UTILES

### Documentation officielle
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Winston Logger](https://github.com/winstonjs/winston)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)

### Outils en ligne
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- [DNS Checker](https://dnschecker.org/)
- [Docker Hub](https://hub.docker.com/)

---

## CONCLUSION

Ce guide vous donne **toutes les clés** pour réussir votre examen ce matin (E21-E26).

**Points clés à retenir:**

1. **Structurez vos réponses** : Analyse → Choix → Mise en œuvre → Validation
2. **Justifiez vos choix** : Critères techniques, économiques, sécurité
3. **Soyez concret** : Commandes, code, configurations réelles
4. **Documentez avec des captures** : Prouvez que ça fonctionne
5. **Fournissez les accès** : Permet la vérification de vos travaux

**Bon courage ! 🚀**

---

*Document créé le 2025-12-02 pour l'examen Cloud Campus*
*Promo Loki - Mise en production et maintenance applicative*
