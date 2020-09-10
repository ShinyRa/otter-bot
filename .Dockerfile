FROM node:14.10.1

COPY . ./

RUN yarn install

RUN yarn test && yarn clean:logs && yarn start

EXPOSE 3000

