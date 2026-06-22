FROM node:IMAGEN-INEXISTENTE-999

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/index.js"]