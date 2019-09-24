FROM node:10-alpine
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
RUN npm prune --production
CMD yarn start:prod


