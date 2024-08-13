FROM node:20

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV=production

RUN yarn build
ENTRYPOINT ["yarn", "start"]