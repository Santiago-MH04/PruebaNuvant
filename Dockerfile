# Usa una imagen base de Node.js
FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]
