# Etape 1 : Utiliser une image Node.js v20.12.1 pour construire l'application
FROM node:20.12.1 AS build

# Répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY neh_frontend/package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code de l'application dans l'image
COPY neh_frontend/ ./

# Construire l'application pour la production
RUN npm run build --prod

# Etape 2 : Utiliser une image NGINX pour servir l'application Angular
FROM nginx:alpine

# Copier les fichiers générés par le build Angular dans le répertoire NGINX
COPY --from=build /app/dist/NEH-ecommerce-front-end /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 4200
EXPOSE 80

# Lancer NGINX
CMD ["nginx", "-g", "daemon off;"]
