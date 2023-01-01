# install nodejs latest version
# cache package.json and lock files
# install npm packages and run npm build
# expose port 3000 and run npm start
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY . .

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start" ]
