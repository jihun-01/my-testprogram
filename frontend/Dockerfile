FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npx tailwindcss init -p

RUN npm run build

CMD ["npx", "serve", "-s", "build", "-l", "80", "--single"]
