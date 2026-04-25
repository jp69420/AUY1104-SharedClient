FROM node:20-alpine

WORKDIR /app

# Instalar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fuente
COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/index.js"]
