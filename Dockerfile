FROM node:slim

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 8000

CMD ["node", "backend/server.js"]