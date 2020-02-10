FROM node:12.10.0-alpine

WORKDIR /usr/client

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000