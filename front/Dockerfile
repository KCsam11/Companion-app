# Étape 1: Utiliser une image de base Node.js officielle et légère
FROM node:20-alpine

# Étape 2: Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Étape 3: Copier les fichiers de gestion de dépendances
# Cela permet de tirer parti du cache de Docker. Si ces fichiers ne changent pas,
# les dépendances ne seront pas réinstallées à chaque build.
COPY package*.json ./

# Étape 4: Installer les dépendances du projet
RUN npm install

# Étape 5: Copier le reste du code source de l'application
COPY . .

# Étape 6: Exposer le port sur lequel l'application Next.js s'exécute
EXPOSE 3000

# Étape 7: Définir la commande pour démarrer le serveur de développement
CMD ["npm", "run", "dev"]