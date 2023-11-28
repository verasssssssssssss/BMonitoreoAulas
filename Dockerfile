FROM node:latest

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente del proyecto al contenedor
COPY . .

# Evita copiar archivos sensibles, asegúrate de que estén listados en .dockerignore
# Ejemplo: node_modules, .env, *.sql, etc.

# Exponer el puerto en el que la app va a correr
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
