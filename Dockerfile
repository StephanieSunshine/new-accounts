FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV PORT 3000
ENV MONGO_ENDPOINT mongodb://mongo:27017/new-accounts
CMD npm run build
CMD npm run server
EXPOSE 3000
