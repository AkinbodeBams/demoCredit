
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build




EXPOSE 80

CMD ["npm", "migrate"]
CMD ["npm", "start"]
