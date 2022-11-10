FROM node:16.10-alpine
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
ENV NODE_ENV=dev
COPY . .
ENTRYPOINT ["sh", "docker/dev/docker-entrypoint.sh"]
EXPOSE 8080
CMD ["npm", "run", "start:dev:ts-watch"]