FROM node:20-alpine as buildStage

WORKDIR /usr/app

COPY . .
COPY .env .

RUN yarn

RUN yarn test
RUN yarn build

FROM node:20-alpine

WORKDIR /usr/app/

COPY package.json .
COPY --from=buildStage /usr/app/dist /usr/app/dist
COPY .env .

RUN yarn --production

CMD yarn start