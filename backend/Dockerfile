FROM node:12.10.0-alpine

WORKDIR "/app"

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
