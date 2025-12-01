FROM node:20.19.6-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --save

COPY . .

EXPOSE 5050

CMD ["npm", "run", "start"]