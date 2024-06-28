
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run migrate


EXPOSE 80

CMD ["npm", "start"]
