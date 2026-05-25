FROM node:24

WORKDIR /Backend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev:debug"]