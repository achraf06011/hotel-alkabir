# Hotel Alkabir — Site Web Hôtelier

Site web complet et moderne pour l'hôtel **Hotel Alkabir**, construit avec Next.js 15, TypeScript, Tailwind CSS, Prisma et Supabase.

## Stack technologique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript (strict mode)
- **Styles**: Tailwind CSS + CSS Variables
- **Composants UI**: Radix UI (pattern Shadcn/ui)
- **Base de données**: PostgreSQL via Supabase
- **ORM**: Prisma 5
- **Authentification**: NextAuth v4 (Credentials + Google OAuth)
- **Animations**: Framer Motion
- **Formulaires**: React Hook Form + Zod
- **Hébergement**: Vercel (frontend) + Supabase (base de données)

---

## Prérequis

- Node.js 18+
- npm ou yarn
- Un compte [Supabase](https://supabase.com) (gratuit)
- Un compte [Vercel](https://vercel.com) (gratuit)
- (Optionnel) Credentials Google OAuth

---

## Installation rapide

```bash
# 1. Cloner le projet
git clone <repo-url>
cd hotel-alkabir

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les variables dans .env.local (voir section ci-dessous)

# 4. Pousser le schéma Prisma vers la base de données
npx prisma db push

# 5. (Optionnel) Initialiser avec des données de démonstration
npx prisma db seed

# 6. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

**Credentials de démo:**
- Admin: `admin@hotelalkabir.com` / `Admin@123456`
- Client: `client@example.com` / `User@123456`

---

## Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:

### Base de données Supabase

1. Connectez-vous à [Supabase](https://supabase.com) et créez un nouveau projet
2. Dans **Project Settings → Database**, récupérez:
   - **Connection pooling URI** → `DATABASE_URL` (ajouter `?pgbouncer=true`)
   - **Direct connection URI** → `DIRECT_URL`

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

### NextAuth

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-tres-long-et-aleatoire"  # générer avec: openssl rand -base64 32
```

### Google OAuth (optionnel)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un projet → **APIs & Services → Credentials → OAuth 2.0 Client IDs**
3. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

```env
GOOGLE_CLIENT_ID="votre-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="votre-client-secret"
```

### Supabase (pour les fonctionnalités avancées)

```env
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
```

### Application

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Structure du projet

```
hotel-alkabir/
├── app/
│   ├── (main)/              # Pages publiques
│   │   ├── page.tsx         # Accueil
│   │   ├── rooms/           # Liste des chambres + détails
│   │   ├── booking/         # Formulaire de réservation
│   │   ├── services/        # Services de l'hôtel
│   │   ├── gallery/         # Galerie photos
│   │   ├── about/           # À propos
│   │   ├── contact/         # Contact + formulaire
│   │   ├── faq/             # FAQ
│   │   └── blog/            # Blog
│   ├── (auth)/              # Authentification
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/           # Espace client
│   │   ├── page.tsx         # Tableau de bord client
│   │   ├── bookings/        # Mes réservations
│   │   ├── profile/         # Mon profil
│   │   └── invoices/        # Mes factures
│   ├── admin/               # Administration (ADMIN only)
│   │   ├── page.tsx         # Dashboard admin
│   │   ├── rooms/           # Gestion des chambres
│   │   ├── bookings/        # Gestion des réservations
│   │   ├── guests/          # Gestion des clients
│   │   ├── gallery/         # Gestion de la galerie
│   │   ├── blog/            # Gestion du blog
│   │   ├── messages/        # Messages de contact
│   │   ├── reviews/         # Modération des avis
│   │   └── settings/        # Paramètres de l'hôtel
│   ├── api/                 # API Routes
│   │   ├── auth/            # NextAuth + register
│   │   ├── rooms/           # CRUD chambres
│   │   ├── bookings/        # CRUD réservations
│   │   ├── contact/         # Formulaire de contact
│   │   ├── reviews/         # Avis clients
│   │   ├── gallery/         # Images galerie
│   │   ├── blog/            # Articles de blog
│   │   ├── users/profile/   # Profil utilisateur
│   │   └── admin/stats/     # Statistiques admin
│   ├── sitemap.ts           # SEO Sitemap
│   └── robots.ts            # SEO robots.txt
├── components/
│   ├── ui/                  # Composants UI de base (Radix/Shadcn pattern)
│   ├── layout/              # Navbar, Footer
│   ├── home/                # Sections page d'accueil
│   ├── rooms/               # Composants chambres
│   ├── booking/             # Formulaire de réservation
│   └── providers.tsx        # Session + Theme providers
├── lib/
│   ├── prisma.ts            # Client Prisma (singleton)
│   ├── auth.ts              # Configuration NextAuth
│   ├── utils.ts             # Utilitaires (formatPrice, etc.)
│   └── validations.ts       # Schémas Zod
├── prisma/
│   ├── schema.prisma        # Schéma de base de données
│   └── seed.ts              # Données de démonstration
└── types/
    └── index.ts             # Types TypeScript globaux
```

---

## Déploiement sur Vercel

### 1. Préparation

```bash
# Construire le projet en local pour vérifier
npm run build
```

### 2. Déployer sur Vercel

1. Installez la CLI Vercel: `npm i -g vercel`
2. Connectez-vous: `vercel login`
3. Déployez: `vercel --prod`

Ou importez directement depuis GitHub sur [vercel.com/new](https://vercel.com/new)

### 3. Variables d'environnement Vercel

Dans Vercel Dashboard → Project → Settings → Environment Variables, ajoutez:

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | URI pooled Supabase |
| `DIRECT_URL` | URI directe Supabase |
| `NEXTAUTH_URL` | `https://votre-domaine.vercel.app` |
| `NEXTAUTH_SECRET` | Secret aléatoire sécurisé |
| `GOOGLE_CLIENT_ID` | (optionnel) |
| `GOOGLE_CLIENT_SECRET` | (optionnel) |
| `NEXT_PUBLIC_APP_URL` | `https://votre-domaine.vercel.app` |

### 4. Post-déploiement

Après le premier déploiement, exécutez les migrations et le seed depuis votre machine locale:

```bash
# Variables d'environnement pointant vers la production
DATABASE_URL="..." npx prisma db push
DATABASE_URL="..." npx prisma db seed
```

---

## Configuration Supabase

### Créer le projet

1. Allez sur [app.supabase.com](https://app.supabase.com)
2. **New project** → Choisissez un nom, mot de passe, région
3. Attendez la création (~2 minutes)

### Récupérer les connexions

Dans **Project Settings → Database**:
- Section **Connection pooling**: copiez l'URI et ajoutez `?pgbouncer=true` → `DATABASE_URL`
- Section **Direct connections**: copiez l'URI → `DIRECT_URL`

### Row Level Security (RLS)

Pour les applications de production, activez le RLS sur les tables sensibles dans Supabase:
- Table `users`: politique permettant aux utilisateurs de lire/modifier uniquement leurs propres données
- Table `bookings`: politique permettant aux utilisateurs de voir uniquement leurs réservations

---

## Commandes disponibles

```bash
npm run dev          # Serveur de développement (localhost:3000)
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
npx prisma studio    # Interface visuelle de la base de données
npx prisma db push   # Synchroniser le schéma avec la DB
npx prisma db seed   # Initialiser avec les données de démo
npx prisma generate  # Régénérer le client Prisma
```

---

## Fonctionnalités

### Pour les visiteurs
- Page d'accueil avec hero, chambres vedettes, services, témoignages, galerie
- Catalogue des chambres avec filtres (type, capacité, prix)
- Détails de chaque chambre: galerie, équipements, avis, widget de réservation
- Processus de réservation en 2 étapes avec confirmation
- Pages: Services, Galerie, À propos, Contact, FAQ, Blog

### Espace client (après connexion)
- Tableau de bord avec statistiques personnelles
- Historique des réservations avec statuts
- Annulation des réservations en attente/confirmées
- Factures téléchargeables (PDF)
- Gestion du profil

### Administration
- Dashboard avec KPIs: revenus, réservations, taux d'occupation
- CRUD complet des chambres
- Gestion des réservations avec actions (confirmer, check-in, check-out, annuler)
- Liste des clients enregistrés
- Gestion de la galerie photos
- Gestion du blog (articles, catégories)
- Messagerie de contact avec système de statuts
- Modération des avis clients
- Paramètres généraux de l'hôtel

---

## Design

- **Couleur principale**: Or `#D4AF37`
- **Polices**: Playfair Display (titres) + Inter (corps)
- **Mode sombre**: Supporté via next-themes
- **Animations**: Framer Motion pour les transitions fluides
- **Responsive**: Mobile-first, optimisé pour tous les écrans

---

## Licence

Projet propriétaire — Hotel Alkabir © 2025
