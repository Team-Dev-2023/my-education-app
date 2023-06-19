FROM node:18.16.0-alpine3.16 as builder
WORKDIR /app
COPY package*.json tsconfig.json /app/
RUN npm install -g node-gyp
RUN npm install glob rimraf
RUN npm install
COPY . /app
RUN npm run build

FROM node:18.16.0-alpine3.16
WORKDIR /app
COPY package*.json ./
# RUN npm install
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD npm run start:prod