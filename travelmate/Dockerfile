FROM node:16.10-alpine
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
ENV NODE_ENV=dev
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start:dev"]