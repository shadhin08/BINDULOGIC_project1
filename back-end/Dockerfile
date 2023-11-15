FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app

RUN npm install -g nodemon
COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm","run", "dev"]
