FROM node:alpine

WORKDIR /app
# RUN npm i yarn -g
COPY package.json .
RUN yarn install
COPY . .

CMD ["yarn", "start"]